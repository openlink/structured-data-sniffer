/*
 *  This file is part of the OpenLink Structured Data Sniffer
 *
 *  Copyright (C) 2015 OpenLink Software
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

Settings = function() {
  this.def_import_url = "http://linkeddata.uriburner.com/describe?url={url}&sponger:get=add";
  this.def_import_srv = "describe";
  this.def_rww_url = "http://ods-qa.openlinksw.com/rdf-editor/#/editor?uri={url}&newDocument=true";
  this.def_sparql_url = "http://linkeddata.uriburner.com/sparql/?query={query}";
  this.def_sparql_cmd = "select";
  this.def_sparql_qry = "SELECT * \nWHERE {  {<{url}> ?p ?o} union {?s ?p <{url}> } filter (! isblank(?s)) }";
}


Settings.prototype = {
  getValue : function(id)
  {
    var val = localStorage.getItem(id);
    if (val!==null)
      return val;

    switch(id) {
      case "ext.osds.uiterm.mode":
          val = "ui-eav"
          break;
      case "ext.osds.import.url":
          val = this.def_import_url;
          break;
      case "ext.osds.import.srv":
          val = this.def_import_srv; 
          break;
      case "ext.osds.rww.url":
          val = this.def_rww_url;
          break;
      case "ext.osds.sparql.url":
          val = this.def_sparql_url;
          break;
      case "ext.osds.sparql.cmd":
          val = this.def_sparql_cmd;
          break;
      case "ext.osds.sparql.query":
          val = this.def_sparql_qry;
          break;
    }
    return val;
  },

  setValue : function(id, val)
  {
    localStorage.removeItem(id);
    localStorage.setItem(id, val);
  }
}
  
  
