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


function frame_getSelectionString(el, win) {
    win = win || window;
    var doc = win.document, sel, range, prevRange, selString;

    if (win.getSelection && doc.createRange) {
        sel = win.getSelection();
        if (sel.rangeCount) {
          prevRange = sel.getRangeAt(0);
        }
        range = doc.createRange();
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
        selString = sel.toString();
        sel.removeAllRanges();
        prevRange && sel.addRange(prevRange);
    } 
    else if (doc.body.createTextRange) {
        range = doc.body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
    return selString;
}




function recvMessage(event)
{
  var ev_data;

  if (event.data.lastIndexOf("osds:",0)!==0)
    return;

  try {
    ev_data = JSON.parse(event.data.substr(5));
  } catch(e) {
    console.log(e);
  }

  
  if (window._osds_isTop) {
    if (ev_data && ev_data.sendBack && ev_data.data && ev_data.frame) {
//      console.log("from frame =>"+event.data);
      window._osds_frames[ev_data.frame] = ev_data.data;
    }
  } 
  else {

    if (ev_data && ev_data.sniff && ev_data.frame) {
//       console.log("from top =>"+event.data);

       var txt = document.body.innerText;

       if (txt === undefined || (txt!==null && txt.length==0))
         txt = frame_getSelectionString(document.body);

       txt = txt? txt : " ";

       var id = ev_data.frame;
       var msg = JSON.stringify({sendBack:true, frame:id, data:txt}, undefined, 2);

       event.source.postMessage("osds:"+msg, event.origin);
    }
  }
}


window.addEventListener("message", recvMessage, false);

