
// React when the browser action's icon is clicked.
var icon_active   = 'icon48.png';
var items;
var $ = jQuery;
var gData = null;
var gData_showed = false;

$(document).ready(function() 
{
  $('#tabs a[href=#micro]').click(function(){
      selectTab('#micro');
      return false;
  });
  $('#tabs a[href=#jsonld]').click(function(){
      selectTab('#jsonld');
      return false;
  });
  $('#tabs a[href=#turtle]').click(function(){
      selectTab('#turtle');
      return false;
  });
  $('#tabs a[href=#rdfa]').click(function(){
      selectTab('#rdfa');
      return false;
  });


  jQuery('#ext_ver').text('ver: '+ chrome.runtime.getManifest().version);

//  chrome.tabs.query({active:true}, function(tabs) {
  chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
      if (tabs.length > 0) {
        //?? Request the microdata items in JSON format from the client (foreground) tab.
        chrome.tabs.sendMessage(tabs[0].id, {
            property: 'doc_data'
          }, 
          function(response) {
          });
      }
    });

});


// Trap any link clicks and open them in the current tab.
$('a').live('click', function(e) {
  var href = e.currentTarget.href;

//  chrome.tabs.query({active:true}, function(tabs) {
//      if (tabs.length > 0)
//        chrome.tabs.update(tabs[0].id, {url: href});
//    });
//  window.close(); /* close popup */
  window.open(href);
});


function selectTab(tab)
{
  var tab_data = $('#micro_items');
  var tab_id = $('#tabs a[href=#micro]');

  if (tab==='#micro') {
    tab_data.show()
    tab_id.addClass('selected');
  } else {
    tab_data.hide()
    tab_id.removeClass('selected');
  }

  tab_data = $('#jsonld_items');
  tab_id = $('#tabs a[href=#jsonld]');

  if (tab==='#jsonld') {
    tab_data.show()
    tab_id.addClass('selected');
  } else {
    tab_data.hide()
    tab_id.removeClass('selected');
  }

  tab_data = $('#turtle_items');
  tab_id = $('#tabs a[href=#turtle]');

  if (tab==='#turtle') {
    tab_data.show()
    tab_id.addClass('selected');
  } else {
    tab_data.hide()
    tab_id.removeClass('selected');
  }

  tab_data = $('#rdfa_items');
  tab_id = $('#tabs a[href=#rdfa]');

  if (tab==='#rdfa') {
    tab_data.show()
    tab_id.addClass('selected');
  } else {
    tab_data.hide()
    tab_id.removeClass('selected');
  }

}



function show_Data()
{
  var micro = false;
  var jsonld = false;
  var turtle = false;
  var rdfa = false;


  $('#micro_items').append("<div id='docdata_view' class='alignleft'/>");
  if (gData.micro.expanded) {
      $('#micro_items #docdata_view').append(gData.micro.expanded);
      micro = true;
  }
  else if (gData.micro.error) {
      $('#micro_items #docdata_view').append("<div id='docdata'><i><p>Microdata discovered, but fails syntax checking by parser.<p><span id='micro_error'/></i></div>");
      $('#micro_items #micro_error').text(gData.micro.error);
      micro = true;
  }
  else
      $('#micro_items #docdata_view').append("<div id='docdata'><i>No data found.</i></div>");


  $('#jsonld_items').append("<div id='docdata_view' class='alignleft'/>");
  if (gData.jsonld.expanded) {
      $('#jsonld_items #docdata_view').append(gData.jsonld.expanded);
      jsonld = true;
  }
  else if (gData.jsonld.error) {
      $('#jsonld_items #docdata_view').append("<div id='docdata'><i><p>JSON-LD discovered, but fails syntax checking by parser:<p><span id='jsonld_error'/></i></div>");
      $('#jsonld_items #jsonld_error').text(gData.jsonld.error);
      jsonld = true;
  }
  else
      $('#jsonld_items #docdata_view').append("<div id='docdata'><i>No data found.</i></div>");


  $('#turtle_items').append("<div id='docdata_view' class='alignleft'/>");
  if (gData.turtle.expanded) {
      $('#turtle_items #docdata_view').append(gData.turtle.expanded);
      turtle = true;
  }
  else if (gData.turtle.error) {
      $('#turtle_items #docdata_view').append("<div id='docdata'><i><p>Turtle discovered, but fails syntax checking by parser:<p><span id='turtle_error'/></i></div>");
      $('#turtle_items #turtle_error').text(gData.turtle.error);
      turtle = true;
  }
  else
      $('#turtle_items #docdata_view').append("<div id='docdata'><i>No data found.</i></div>");


  $('#rdfa_items').append("<div id='docdata_view' class='alignleft'/>");
  if (gData.rdfa.expanded) {
      $('#rdfa_items #docdata_view').append(gData.rdfa.expanded);
      rdfa = true;
  }
  else if (gData.rdfa.error) {
      $('#rdfa_items #docdata_view').append("<div id='docdata'><i><p>RDFa discovered, but fails syntax checking by parser:<p><span id='rdfa_error'/></i></div>");
      $('#rdfa_items #rdfa_error').text(gData.rdfa.error);
      rdfa = true;
  }
  else
      $('#rdfa_items #docdata_view').append("<div id='docdata'><i>No data found.</i></div>");


  if (micro && !gData.micro.error)
    selectTab('#micro');
  else if (jsonld && !gData.jsonld.error)
    selectTab('#jsonld');
  else if (turtle && !gData.turtle.error)
    selectTab('#turtle');
  else if (rdfa && !gData.rdfa.error)
    selectTab('#rdfa');



  if (!micro)
    $('#tabs a[href=#micro]').hide();
  if (!jsonld)
    $('#tabs a[href=#jsonld]').hide();
  if (!turtle)
    $('#tabs a[href=#turtle]').hide();
  if (!rdfa)
    $('#tabs a[href=#rdfa]').hide();

  gData_showed = true;
}



function check_Microdata() 
{
  if (gData.micro.data)
  {
    var handler = new Handle_Microdata();
    handler.parse(gData.micro.data, gData.docURL,
      function(error, html_data) 
      {
        if (error)
          gData.micro.error = error.toString();
        else
          gData.micro.expanded = html_data;

      check_JSON_LD();
    });
  }
  else
  {
    check_JSON_LD();
  }
}




function check_JSON_LD() 
{
  if (gData.jsonld.text && gData.jsonld.text.length > 0)
  {
    var handler = new Handle_JSONLD();
    handler.parse(gData.jsonld.text, 
      function(error, html_data) {
        if (error)
          gData.jsonld.error = error;
        else
          gData.jsonld.expanded = html_data;

        check_Turtle();
    });
  }
  else
  {
    check_Turtle();
  }
}




function check_Turtle() 
{
  if (gData.turtle.text && gData.turtle.text.length > 0)
  {
    var handler = new Handle_Turtle();
    handler.parse(gData.turtle.text, gData.docURL, 
      function(error, html_data) {
        if (error)
          gData.turtle.error = error;
        else
          gData.turtle.expanded = html_data;

        check_RDFa();
    });
  }
  else
  {
    check_RDFa();
  }
}



function check_RDFa() 
{
  if (gData.rdfa.data)
  {
    var handler = new Handle_RDFa();
    handler.parse(gData.rdfa.data, 
      function(error, html_data) {
        if (error)
          gData.rdfa.error = error;
        else
          gData.rdfa.expanded = html_data;

        show_Data();
    });
  }
  else
  {
    show_Data();
  }
}



chrome.extension.onMessage.addListener(function(request, sender, sendResponse) 
{
  if (request.property == "status")
  {
    var show_action = request.data_exists;
    if (show_action)
      chrome.pageAction.show(sender.tab.id);
    else
      chrome.pageAction.hide(sender.tab.id);

    chrome.tabs.sendMessage(sender.tab.id, 
        { property: 'doc_data' }, 
        function(response) {
        });
  } 
  else if (request.property == "doc_data")
  {
    gData = $.parseJSON(request.data);
    gData.micro.expanded = null;
    gData.micro.error = null;
    gData.jsonld.expanded = null;
    gData.jsonld.error = null;
    gData.rdfa.expanded = null;
    gData.turtle.expanded = null;
    gData.turtle.error = null;
    gData.rdfa.expanded = null;
    gData.rdfa.error = null;

    check_Microdata();

  }
  else
  {
    sendResponse({}); /* stop */
  }

});






