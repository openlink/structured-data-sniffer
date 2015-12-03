/* -*- mode: js; js-indent-level: 2; indent-tabs-mode: nil -*- */

'use strict';

// http://www.whatwg.org/specs/web-apps/current-work/multipage/microdata.html#json
jQuery.microdata.json = function(selector, format) {
  var $ = jQuery;

  function getObject(item, memory) {
    var $item = $(item);
    var result = {};
    var types = $item.itemType();
    if (types.length)
      result.type = $(types).toArray();
    if ($item.itemId())
      result.id = $item.itemId();
    result.properties = {};
    $item.properties().each(function(i, elem) {
      var $elem = $(elem);
      var value;
      if ($elem.itemScope()) {
        if ($.inArray(elem, memory) != -1) {
          value = 'ERROR';
        } else {
          memory.push(item);
          value = getObject(elem, memory);
          memory.pop();
        }
      } else {
        value = $elem.itemValue();
      }
      $.each($elem.itemProp(), function(i, prop) {
        if (!result.properties[prop])
          result.properties[prop] = [];
        result.properties[prop].push(value);
      });
    });
    return result;
  }

  function processItemScope($items, result) {
   $items.each(function(i, item) {
      var $item = $(item);
      if ($item.itemScope()) {
        result.items.push(getObject(item, []));
        // JCD: Process any top-level descendant itemscopes, but where the node doesn't directly contain an itemprop attribute.
        var descendants = $item.find('[itemscope]').not($item.find('[itemscope] [itemscope]')).not($item.find('[itemprop]'));
        processItemScope(descendants, result);
      }
    });
    return result;
  }

  var result = {};
  result.items = [];
  var $items = selector ? $(selector) : $(document).items();

  result = processItemScope($items, result);

  return format ? format(result) : JSON.stringify(result);
};
