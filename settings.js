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

Settings = function(data) {
  this.def_import_url = "http://linkeddata.uriburner.com/describe/?url={url}&sponger:get=add";
  this.def_import_srv = "describe";
//  this.def_rww_edit_url = "http://ods-qa.openlinksw.com/rdf-editor/#/editor?newDocument=true";
  this.def_rww_edit_url = "http://ods-qa.openlinksw.com/rdf-editor/#/editor?newDocument=true&statement:subject={url}";
  this.def_sparql_url = "http://linkeddata.uriburner.com/sparql/?query={query}";
  this.def_sparql_cmd = "select";

  this.def_sparql_qry_spo = 'DEFINE get:soft "add"\nSELECT <{url}> as ?subject, ?p as ?predicate, ?o as ?object\nFROM <{url}>\nWHERE { <{url}> ?p ?o } LIMIT 100';
  this.def_sparql_qry_eav = 'DEFINE get:soft "add"\nSELECT <{url}> as ?entity, ?p as ?attribute, ?o as ?value\nFROM <{url}>\nWHERE { <{url}> ?p ?o } LIMIT 100';
  this._data = (data!== undefined && data!==null) ? data:null;
}


Settings.prototype = {
  getSparqlQueryDefault : function(mode)
  {
    if (mode===null)
      mode = this.getValue("ext.osds.uiterm.mode");

    if (mode === "ui-eav")
      return this.def_sparql_qry_eav;
    else
      return this.def_sparql_qry_spo;
  },
  
  getValue : function(id)
  {
    var val = null;

    try {
/**
      if (Browser.isFirefox)
        val = this._data[id];
      else
**/
      val = localStorage.getItem(id);

      if (val===undefined)
        val = null;
    } catch(e) {
      console.log(e);
    }

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
      case "ext.osds.rww.edit.url":
          val = this.def_rww_edit_url;
          break;
      case "ext.osds.sparql.url":
          val = this.def_sparql_url;
          break;
      case "ext.osds.sparql.cmd":
          val = this.def_sparql_cmd;
          break;
      case "ext.osds.sparql.query":
          val = this.getSparqlQueryDefault(null);
          break;
    }
    return val;
  },

  setValue : function(id, val)
  {
    try {
/**
      if (Browser.isFirefox) {
        this._data[id] = val;
      } else {
**/
        localStorage.removeItem(id);
        localStorage.setItem(id, val);
//      }
    } catch(e) {
      console.log(e);
    }
  }
}
  
