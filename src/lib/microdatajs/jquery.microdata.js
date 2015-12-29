/* -*- mode: js; js-indent-level: 2; indent-tabs-mode: nil -*- */

'use strict';

(function(){
  var $ = jQuery;

  $.microdata = {};

  // http://www.whatwg.org/specs/web-apps/current-work/multipage/common-microsyntaxes.html#valid-time-string
  function validTimeStringLength(s) {
    var m = /^(\d\d):(\d\d)(:(\d\d)(\.\d+)?)?/.exec(s);
    if (m && m[1]<=23 && m[2]<=59 && (!m[4] || m[4]<=59))
      return m[0].length;
    return 0;
  }

  function isValidTimeString(s) {
    return s && validTimeStringLength(s) == s.length;
  }

  // http://www.whatwg.org/specs/web-apps/current-work/multipage/common-microsyntaxes.html#number-of-days-in-month-month-of-year-year
  function daysInMonth(year, month) {
    if (month==1 || month==3 || month==5 || month==7 ||
        month==8 || month==10 || month==12) {
      return 31;
    } else if (month==4 || month==6 || month==9 || month==11) {
      return 30;
    } else if (month == 2 && (year%400==0 || (year%4==0 && year%100!=0))) {
      return 29;
    } else {
      return 28;
    }
  }

  // http://www.whatwg.org/specs/web-apps/current-work/multipage/common-microsyntaxes.html#valid-date-string
  function validDateStringLength(s) {
    var m = /^(\d{4,})-(\d\d)-(\d\d)/.exec(s);
    if (m && m[1]>=1 && m[2]>=1 && m[2]<=12 && m[3]>=1 && m[3]<=daysInMonth(m[1],m[2]))
      return m[0].length;
    return 0;
  }

  function isValidDateString(s) {
    return s && validDateStringLength(s) == s.length;
  }

  // http://www.whatwg.org/specs/web-apps/current-work/multipage/common-microsyntaxes.html#valid-global-date-and-time-string
  function isValidGlobalDateAndTimeString(s) {
    var skip = validDateStringLength(s);
    if (skip && s[skip] == 'T') {
      s = s.substr(skip+1);
      skip = validTimeStringLength(s);
      if (skip) {
        s = s.substr(skip);
        if (s == 'Z')
          return true;
        var m = /^[+-](\d\d):(\d\d)$/.exec(s);
        if (m && m[1]<=23 && m[2]<=59)
          return true;
      }
    }
    return false;
  }

  $.microdata.isValidGlobalDateAndTimeString = isValidGlobalDateAndTimeString;
  $.microdata.isValidDateString = isValidDateString;

  function splitTokens(s) {
    if (s && /\S/.test(s))
      return s.replace(/^\s+|\s+$/g,'').split(/\s+/);
    return [];
  }

  function getItems(types) {
    var selector = $.map(splitTokens(types), function(t) {
      return '[itemtype~="'+t.replace(/"/g, '\\"')+'"]';
    }).join('') || '*';
    // filter results to only match top-level items.
    // because [attr] selector doesn't work in IE we have to
    // filter the elements. http://dev.jquery.com/ticket/5637
    return $(selector, this).filter(function() {
      return (this.getAttribute('itemscope') != null &&
              this.getAttribute('itemprop') == null);
    });
  }

  // find the furthest ancestor (usually Document)
  function ancestor(node) {
    while (node.parentNode)
      node = node.parentNode;
    return node;
  }

  function resolve(elm, attr) {
    // in order to handle <base> and attributes which aren't properly
    // reflected as URLs, insert a temporary <a> element just before
    // elm and resolve using its href property. the <a> element must
    // be created using the parent document due IE security policy.
    var url = elm.getAttribute(attr);
    if (!url)
      return '';
    var a = ancestor(elm);
    var p = elm.parentNode;
    var div = (a.createElement ? a : document).createElement('div');
    try {
      // Setting the href attribute/property on an <a> element
      // directly doesn't trigger resolution against the base URL in
      // IE, but creating an <a> element with innerHTML does. We have
      // to do some acrobatics to avoid having to HTML-escape the URL.
      // See http://stackoverflow.com/a/22918332/250798
      div.innerHTML = '<a></a>';
      div.firstChild.href = url;
      div.innerHTML = div.innerHTML;
      if (p)
        p.insertBefore(div, elm);
      url = div.firstChild.href;
      if (p)
        p.removeChild(div);
    } catch (e) {
      // IE>6 throws "TypeError: Access is denied." for mailto:
      // URLs. This is annoying, but harmless to ignore.
    }
    return url;
  }

  function tokenList(attr) {
    return function() {
      var list = splitTokens(this.attr(attr));
      list.contains = function(token) {
        return $.inArray(token, this) != -1;
      };
      return list;
    };
  }

  function itemValue() {
    var elm = this[0];
    if (elm.getAttribute('itemprop') == null)
      return null;
    if (this.itemScope()) {
      return elm; // or a new jQuery object?
    }
    switch (elm.tagName.toUpperCase()) {
    case 'META':
      return this.attr('content') || '';
    case 'AUDIO':
    case 'EMBED':
    case 'IFRAME':
    case 'IMG':
    case 'SOURCE':
    case 'TRACK':
    case 'VIDEO':
      return resolve(elm, 'src');
    case 'A':
    case 'AREA':
    case 'LINK':
      return resolve(elm, 'href');
    case 'OBJECT':
      return resolve(elm, 'data');
    case 'DATA':
      return this.attr('value') || '';
    case 'TIME':
      var datetime = elm.getAttribute('datetime');
      if (datetime != null)
        return datetime;
    default:
      return this.text();
    }
  }

  function properties(name) {
    // Find all elements that add properties to the item, optionally
    // filtered by a property name. Look in the subtrees rooted at the
    // item itself and any itemref'd elements. An item can never have
    // itself as a property, but circular reference is possible.

    var props = [];

    function crawl(root) {
      var toTraverse = [root];

      function traverse(node) {
        for (var i = 0; i < toTraverse.length; i++) {
          if (toTraverse[i] == node)
            toTraverse.splice(i--, 1);
        }
        var $node = $(node);
        if (node != root) {
          var names = $node.itemProp();
          if (names.length) {
            if (!name || names.contains(name))
              props.push(node);
          }
          if ($node.itemScope())
            return;
        }
        $node.children().each(function() {
          traverse(this);
        });
      }

      var context = ancestor(root);
      $.each($(root).itemRef(), function(i, id) {
        var $ref = $('#'+id, context);
        if ($ref.length)
          toTraverse.push($ref[0]);
      });
      $.unique(toTraverse);

      while (toTraverse.length) {
        traverse(toTraverse[0]);
      }
    }

    if (this.itemScope())
      crawl(this[0]);

    // properties are already sorted in tree order
    return $(props);
  }

  $.fn.extend({
    items: getItems,
    itemScope: function () {
      return this[0].getAttribute('itemscope') != null;
    },
    itemType: tokenList('itemtype'),
    itemId: function () {
      return resolve(this[0], 'itemid');
    },
    itemProp: tokenList('itemprop'),
    itemRef: tokenList('itemref'),
    itemValue: itemValue,
    properties: properties
  });
})();
