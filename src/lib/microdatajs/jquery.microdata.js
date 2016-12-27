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

  function getSubItems(types) {
    var selector = $.map(splitTokens(types), function(t) {
      return '[itemtype~="'+t.replace(/"/g, '\\"')+'"]';
    }).join('') || '*';
    // filter results to only match top-level items.
    // because [attr] selector doesn't work in IE we have to
    // filter the elements. http://dev.jquery.com/ticket/5637
    return $(this).children(selector).filter(function() {
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
    // reflected as URLs, insert a temporary <img> element just before
    // elm and resolve using its src attribute. the <img> element must
    // be created using the parent document due IE security policy.
    var url = elm.getAttribute(attr);
    if (!url)
      return '';
    var a = ancestor(elm);
    var p = elm.parentNode;
    var img = (a.createElement ? a : document).createElement('img');
    try {
      img.setAttribute('src', url);
      if (p)
        p.insertBefore(img, elm);
      url = img.src;
      if (p)
        p.removeChild(img);
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

  // feature detection to use native support where available
  var t = $('<data itemscope itemtype="type" itemid="id" itemprop="prop" itemref="ref" value="value">')[0];

  $.fn.extend({
    items: document.getItems && t.itemType && t.itemType.contains ? function(types) {
      var doc = this[0];
      if (doc.getItems)
        return $(types ? doc.getItems(types) : doc.getItems());
      return getItems.call(this, types);
    } : getItems,
    sub_items: getSubItems,
    itemScope: t.itemScope ? function() {
      return this[0].itemScope;
    } : function () {
      return this[0].getAttribute('itemscope') != null;
    },
    itemType: t.itemType && t.itemType.contains ? function() {
      return this[0].itemType;
    } : tokenList('itemtype'),
    itemId: t.itemId == 'id' ? function() {
      return this[0].itemId;
    } : function () {
      return resolve(this[0], 'itemid');
    },
    itemProp: t.itemProp && t.itemProp.contains ? function() {
      return this[0].itemProp;
    } : tokenList('itemprop'),
    itemRef: t.itemRef && t.itemRef.contains ? function() {
      return this[0].itemRef;
    } : tokenList('itemref'),
    itemValue: t.itemValue == t && t.value == 'value' ? function() {
      return this[0].itemValue;
    } : itemValue,
    properties: t.properties && t.properties.namedItem ? function(name) {
      return $(name ? this[0].properties.namedItem(name) : this[0].properties);
    } : properties
  });
})();
