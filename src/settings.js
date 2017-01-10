/*
 *  This file is part of the OpenLink Structured Data Sniffer
 *
 *  Copyright (C) 2015-2017 OpenLink Software
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
//  this.def_rww_edit_url = "http://linkeddata.uriburner.com/rdf-editor/#/editor?newDocument=true&statement:entity={url}&view=statements";
  this.def_rww_edit_url = "http://linkeddata.uriburner.com/rdf-editor/#/editor?data={data}&view=statements";

  this.def_sparql_url = "http://linkeddata.uriburner.com/sparql/?query={query}";
  this.def_sparql_cmd = "select";

  this.def_sparql_qry_spo = "DEFINE get:soft \"soft\" \n"+
                            "SELECT DISTINCT ?s AS ?subject  ?p AS ?predicate ?o AS ?object \n"+
                            "FROM <{url}> \n"+
                            "WHERE { ?s ?p ?o \n"+
                            "       FILTER (CONTAINS(str(?p),'mainEntity') \n"+
                            "               OR CONTAINS(str(?p),'primaryTopic')\n"+ 
                            "               OR CONTAINS(str(?p),'topic')\n"+
                            "               OR CONTAINS(str(?p),'mentions')) \n"+
                            "      } LIMIT 100";

  this.def_sparql_qry_eav = "DEFINE get:soft \"soft\" \n"+
                            "SELECT DISTINCT ?s AS ?entity  ?p AS ?attribute ?o AS ?value \n"+
                            "FROM <{url}> \n"+
                            "WHERE { ?s ?p ?o \n"+
                            "       FILTER (CONTAINS(str(?p),'mainEntity') \n"+
                            "               OR CONTAINS(str(?p),'primaryTopic')\n"+ 
                            "               OR CONTAINS(str(?p),'topic')\n"+
                            "               OR CONTAINS(str(?p),'mentions')) \n"+
                            "      } LIMIT 100";

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
      case "ext.osds.pref.user.chk":
          val = "1";
          break;
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
  },

  createRwwUrl : function (curUrl, data) 
  {
    var edit_url = this.getValue('ext.osds.rww.edit.url');
    var store_url = this.getValue('ext.osds.rww.store.url');
    var docURL = encodeURIComponent(curUrl);

    if (store_url!==null && store_url.length>0) {
      if (edit_url.indexOf("?")!=-1)
        edit_url += "&uri="+encodeURIComponent(store_url);
      else
        edit_url += "?uri="+encodeURIComponent(store_url);
    }

    if (edit_url.indexOf("{url}")!=-1)
      edit_url = edit_url.replace("{url}",docURL);

    if (edit_url.indexOf("{data}")!=-1) 
      edit_url = edit_url.replace("{data}", encodeURIComponent(data?data:""));

    return edit_url;
  },


  createSparqlUrl : function (curUrl) 
  {
    var sparql_url = this.getValue('ext.osds.sparql.url');
    var query = this.getValue('ext.osds.sparql.query');

    var query = encodeURIComponent(query.replace(/{url}/g, curUrl));
    return sparql_url.replace(/{query}/g, query);
  },


  createImportUrl : function (curUrl) 
  {
    var handle_url = this.getValue('ext.osds.import.url');
    var srv = this.getValue('ext.osds.import.srv');
    var docURL = encodeURIComponent(curUrl);

    switch(srv) {
      case 'about':
      case 'about-ssl':
        var result = curUrl.match(/^((\w+):\/)?\/?(.*)$/);
        if (!result) {
          throw 'Invalid url:\n' + curUrl;
          return null;
        }
//        var protocol = result[2]=="https"?"http":result[2];
        var protocol = result[2];
        docURL = protocol + '/' + result[3];
        break;

      case 'ode':
      case 'ode-ssl':
      case 'describe':
      case 'describe-ssl':
      default:
        break;
    }

    if (handle_url.indexOf("{url}")!=-1)
       return handle_url.replace("{url}",docURL);
    else
       return handle_url + docURL;
  }





}
  
