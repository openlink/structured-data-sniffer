/*
 *  This file is part of the OpenLink Structured Data Sniffer
 *
 *  Copyright (C) 2015-2021 OpenLink Software
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

  
  function makeResizableTable(tableId, columns_css, containerId) {
     var table = DOM.qSel(tableId);
     var popup = DOM.qSel(containerId);
     var headerResized;
     const columns = [];

     table.style.gridTemplateColumns = columns_css.join(' ');

     function onMouseMove(e)
     {
       window.requestAnimationFrame(() => {
         // Calculate the desired width
         if (headerResized===null)
           return;

         var horizontalScrollOffset = document.documentElement.scrollLeft;
         const width = (horizontalScrollOffset + e.clientX) - popup.offsetLeft - headerResized.offsetLeft;
       
         // Update the column object with the new size value
         const column = columns.find(({ header }) => header === headerResized);
         column.size = Math.max(100, width) + 'px'; // Enforce our minimum
  
         // For the other headers which don't have a set width, fix it to their computed width
         columns.forEach((column) => {
           if(column.size.startsWith('minmax')){ // isn't fixed yet (it would be a pixel value otherwise)
             column.size = parseInt(column.header.clientWidth, 10) + 'px';
           }
         })

         // Update the column sizes
         // Reminder: grid-template-columns sets the width for all columns in one value
         table.style.gridTemplateColumns = columns
           .map(({ header, size }) => size)
           .join(' ');
       });
     }

     function onMouseUp(e)
     {
        if (headerResized)
           headerResized.classList.remove('super_links_table-header--being-resized');

        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        headerResized.classList.remove('super_links_table-header--being-resized');
        headerResized = null;
     }


     var lst = DOM.qSelAll(tableId+' th');
     var i = 0;

     for(const header of lst)
     {
       columns.push({ 
         header, 
         size: columns_css[i],
       });

       header.querySelector('.super_links_table-resize-handle').onmousedown = (e) => {
          headerResized = e.target.parentNode;
          window.addEventListener('mousemove', onMouseMove);
          window.addEventListener('mouseup', onMouseUp);
          headerResized.classList.add('super_links_table-header--being-resized');
       } 
     }
  }


  function dragElement(el, elHeader) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    if (elHeader) {
      // if present, the header is where you move the DIV from:
      elHeader.onmousedown = onMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      el.onmousedown = onMouseDown;
    }

    function onMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }

    function onMouseMove(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      el.style.top = (el.offsetTop - pos2) + "px";
      el.style.left = (el.offsetLeft - pos1) + "px";
    }

    function onMouseUp() {
      // stop moving when mouse button is released:
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }
  }

  function makeResizable(el, elResizer) 
  {
    var orig_height = 0;
    var orig_width = 0;
    var orig_mouse_x = 0;
    var orig_mouse_y = 0;

    elResizer.onmousedown = (e) => {
        e.preventDefault();
        orig_width = parseFloat(getComputedStyle(el, null).getPropertyValue('width').replace('px', ''));
        orig_height = parseFloat(getComputedStyle(el, null).getPropertyValue('height').replace('px', ''));
        orig_mouse_x = e.pageX;
        orig_mouse_y = e.pageY;

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }
    
    function onMouseMove(e) {
      el.style.width = Math.max(orig_width + (e.pageX - orig_mouse_x), 600) + 'px';
      el.style.height = Math.max(orig_height + (e.pageY - orig_mouse_y), 150) + 'px';
    }
    
    function onMouseUp() {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }
  }

