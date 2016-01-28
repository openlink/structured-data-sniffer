/*
 *  This file is part of the OpenLink Structured Data Sniffer
 *
 *  Copyright (C) 2015-2016 OpenLink Software
 *
 *  This project is free software; you can redistribute it and/or modify it
 *  under the terms of the GNU General Public License as published by the
 *  Free Software Foundation; only version 2 of the License, dated June 1991.
 *
 *  This program is distributed in the hope that it will be useful, but
 *  WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 *  General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License along
 *  with this program; if not, write to the Free Software Foundation, Inc.,
 *  51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA
 *
 */
var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var tabs = require("sdk/tabs");
var workers = require("sdk/content/worker");
var ss = require("sdk/simple-storage");
var sniff_panel = null;



var button = ToggleButton({
  id: "odsd",
  label: "Show Document Metadata",
  icon: {
    "16": "./images/icon16.png",
    "32": "./images/icon32.png",
    "64": "./images/icon64.png"
  },
  onChange: handleChange
});

button.state('window', {disabled: true});


function handleChange(state) 
{
  if (state.checked) {
    createSniffPanel();
    sniff_panel.show({
      position: button
    });
  } else {
    destroySniffPanel();
  }
}




/**
function loadUrlbarButton(doc, urlBtnClick) {
    var urlBarIcons = doc.getElementById('urlbar-icons')
    var btn = doc.createElement('toolbarbutton');
    btn.setAttribute('id', 'odsd1');
    btn.setAttribute('image', self.data.url('./images/icon16.png'));
    btn.addEventListener('command', urlBtnClick, false);
    urlBarIcons.appendChild(btn);
    return btn;
}

var doc = require('sdk/window/utils').getMostRecentBrowserWindow().document;

var onBtnClick = function(event) {
    //do something when URL bar button is clicked
    createSniffPanel();
    sniff_panel.show();
}

var urlbarButton = loadUrlbarButton(doc, onBtnClick);
**/






function destroySniffPanel()
{
  if (sniff_panel)
    sniff_panel.destroy();
  sniff_panel = null;
}


function createSniffPanel()
{
  destroySniffPanel();
  sniff_panel = panels.Panel({
    width: 630,
    height: 600,
    contentURL: "./panel_ff.html", // the same : self.data.url("panel.html"),
    contentScriptFile: ["./lib/jquery-1.11.3.min.js", 
   		      "./lib/jquery-migrate-1.2.1.min.js",
   		      "./lib/jquery-ui.min.js",
		      "./lib/microdatajs/jquery.microdata.js",
		      "./lib/microdatajs/jquery.microdata.json.js",
		      "./lib/jsonld.js",
		      "./lib/n3-browser.js",
		      "./lib/jsuri.js",
                      "./lib/FileSaver.js",
		      "./browser_ff.js",
		      "./settings.js",
		      "./handlers.js",
		      "./html_gen.js",
		      "./panel.js"
      		     ],
    contentScriptOptions : { ver: self.version },
    onHide: function() {
       button.state('window', {checked: false});
    }
  });


  // received request from panel, when it has been loaded
  sniff_panel.port.on("doc_data", function(msg)
  {
    try {
      if (tabs.activeTab._osds_data_exists 
          && tabs.activeTab._osds_worker !==undefined) 
      {
          var worker = tabs.activeTab._osds_worker;

          // send req to activeTab 
          worker.port.emit("doc_data", "");
          // wait data fro active tab
          worker.port.on("doc_data", function(msg)
            {
              //send data to panel
              sniff_panel.port.emit("doc_data", msg);
            });
      } 
    } catch(e) {
      console.log(e);
    }
  });

  sniff_panel.port.on("prefs", function(msg)
  {
    try {
      createPrefPanel();
    } catch(e) {
      console.log(e);
    }
  });
}



tabs.on('load', function(tab) {
  var worker = tab.attach({
      contentScriptFile: ["./lib/jquery-1.11.3.min.js", 
       			  "./lib/jquery-migrate-1.2.1.min.js",
                          "./lib/jsonld.js", 
                          "./lib/microdatajs/jquery.microdata.js", 
                          "./lib/microdatajs/jquery.microdata.json.js", 
                          "./lib/RDFa.js", 
		          "./browser_ff.js",
                          "./sniffer.js"
      			  ]
  });

  button.state('tab', {disabled: true});
  tab._osds_worker = worker;
  tab._osds_data_exists = false;

  worker.port.on("content_status", function(msg){

//  console.log("receive content_status="+msg.data_exists);
    if (msg.data_exists) 
    {
       tab._osds_data_exists = true;
       button.state('tab', {disabled: false});
    }
  });
});


tabs.on('close', function(tab) {
  tab._osds_worker = null;
  tab._osds_data_exists = null;
});




/// Preferense Panel ////////////////////////////////////////
function createPrefPanel()
{
  var pref_panel = panels.Panel({
    width: 550,
    height: 690,
    contentURL: "./options_ff.html",
    contentScriptFile: ["./lib/jquery-1.11.3.min.js", 
   		      "./lib/jquery-migrate-1.2.1.min.js",
   		      "./lib/jquery-ui.min.js",
		      "./lib/jsuri.js",
		      "./browser_ff.js",
		      "./settings.js",
		      "./options.js"
      		     ],
    contentScriptOptions : { ver: self.version}
  });

  pref_panel.port.on("close", function(msg)
  {
    try {
      pref_panel.destroy();
    } catch(e) {
      console.log(e);
    }
  });


  pref_panel.show();
}



