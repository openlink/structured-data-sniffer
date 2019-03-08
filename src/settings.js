/*
 *  This file is part of the OpenLink Structured Data Sniffer
 *
 *  Copyright (C) 2015-2019 OpenLink Software
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

class Settings {
  constructor(data) {
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
                            "      } LIMIT 100\n";

    this.def_sparql_qry_eav = "DEFINE get:soft \"soft\" \n"+
                            "SELECT DISTINCT ?s AS ?entity  ?p AS ?attribute ?o AS ?value \n"+
                            "FROM <{url}> \n"+
                            "WHERE { ?s ?p ?o \n"+
                            "       FILTER (CONTAINS(str(?p),'mainEntity') \n"+
                            "               OR CONTAINS(str(?p),'primaryTopic')\n"+
                            "               OR CONTAINS(str(?p),'topic')\n"+
                            "               OR CONTAINS(str(?p),'mentions')) \n"+
                            "      } LIMIT 100\n";

    this.def_super_links_timeout = 30000000;

    this.def_super_links_query = ''
  +'PREFIX oplattr: <http://www.openlinksw.com/schema/attribution#> \n'
  +'PREFIX schema: <http://schema.org/> \n'
  +' \n'
  +'SELECT DISTINCT  sample(?extract) as ?sample ?extract ?extractLabel ?associationLabel ?entityTypeLabel ?entityType ?p as ?association ?providerLabel ?provider \n'
  +'WHERE {  \n'
  +'       GRAPH <{url}>  \n'
  +'         {  \n'
  +'           # ?source ( skos:related|schema:about|schema:mentions ) ?extract .  \n'
  +'           ?source ?p ?extract.  \n'
  +'           # filter (?source = <https://linkeddata.uriburner.com/about/id/entity/https/www.microstrategy.com/us/product/analytics/hypercards>)  \n'
  +'           filter (?p in ( skos:related, schema:about, schema:mentions)) \n'
  +'           # ?source ( skos:related|schema:about) ?extract .  \n'
  +'           ?extract a ?entityType ;  \n'
  +'           # ?extract a oplattr:NamedEntity ;  \n'
  +'  \n'
  +'           <http://www.openlinksw.com/schema/attribution#providedBy> ?provider ;  \n'
  +'           (rdfs:label | schema:name | foaf:name | schema:headline) ?extractLabel .  \n'
  +'  \n'
  +'           OPTIONAL {?provider foaf:name|schema:name ?providerLabel} .  \n'
  +'  \n'
  +'           # FILTER (?p in (skos:related, schema:about, schema:mentions))  \n'
  +'           FILTER (! contains(str(?entityType),"Tag"))  \n'
  +'         }  \n'
  +'  \n'
  +'         ## Subquery for obtaining relation (statement predicate) labels  \n'
  +'  \n'
  +'         { SELECT ?p ?associationLabel  \n'
  +'           WHERE { \n'
  +'                  GRAPH ?g1 \n'
  +'                    { \n'
  +'                       ?p rdfs:label|schema:name ?associationLabel . \n'
  +'                       FILTER (?p in (skos:related, schema:about, schema:mentions))  \n'
  +'                       FILTER (LANG(?associationLabel) = "{lang}")  \n'
  +'                    }  \n'
  +'                 }  \n'
  +'         }  \n'
  +'  \n'
  +'         ## Subquery for obtaining type-oriented relation (statement predicate) labels  \n'
  +'  \n'
  +'         { SELECT ?entityType ?entityTypeLabel  \n'
  +'           WHERE { \n' 
  +'                  GRAPH ?g2 \n'
  +'                    { \n'
  +'                      ?entityType rdfs:label|schema:name ?entityTypeLabel .  \n'
  +'                      FILTER (LANG(?entityTypeLabel) = "{lang}")  \n'
  +'                    }  \n'
  +'                 }  \n'
  +'           }  \n'
  +' }  \n'
  +'GROUP BY  ?extractLabel ?extract ?entityType ?p ?association ?associationLabel ?entityTypeLabel ?providerLabel ?provider  \n'
  +'ORDER BY DESC (2) \n';

    this._data = (data!== undefined && data!==null) ? data:null;
  }

  getSparqlQueryDefault(mode)
  {
    if (mode===null)
      mode = this.getValue("ext.osds.uiterm.mode");

    if (mode === "ui-eav")
      return this.def_sparql_qry_eav;
    else
      return this.def_sparql_qry_spo;
  }

  getValue(id)
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
      case "ext.osds.pref.show_action":
          val = "1";
          break;
      case "ext.osds.handle_xml":
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
      case "ext.osds.super_links.query":
          val = this.def_super_links_query;
          break;
      case "ext.osds.super_links.timeout":
          val = this.def_super_links_timeout;
          break;
    }
    return val;
  }

  setValue(id, val)
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

  createRwwUrl(curUrl, data)
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
  }


  createSparqlUrl(curUrl)
  {
    var sparql_url = this.getValue('ext.osds.sparql.url');
    var query = this.getValue('ext.osds.sparql.query');

    query = encodeURIComponent(query.replace(/{url}/g, curUrl));
    return sparql_url.replace(/{query}/g, query);
  }

  createSuperLinksQuery(query, curUrl, lang)
  {
//    var query = this.getValue('ext.osds.super_links.query');
    return query.replace(/{url}/g, curUrl).replace(/{lang}/g, lang);
  }


  createImportUrl(curUrl)
  {
    var handle_url = this.getValue('ext.osds.import.url');
    var srv = this.getValue('ext.osds.import.srv');
    return this._createImportUrl_1(curUrl, handle_url, srv)
  }

  _createImportUrl_1(curUrl, handle_url, srv)
  {
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


  createDefaultImportCmdFor(srv, _url)
  {
    var url = new URL(_url);
    var h_url = "";

    switch (srv) {
      case 'describe':
        url.protocol = 'http:';
        url.pathname = '/describe/';
        url.search = '';
        url.hash = '';
        h_url = url.toString();
        h_url += '?url={url}&sponger:get=add';
        break;
      case 'describe-ssl':
        url.protocol = 'https:';
        url.pathname = '/describe/';
        url.search = '';
        url.hash = '';
        h_url = url.toString();
        h_url += '?url={url}&sponger:get=add';
        break;
      case 'about':
        url.protocol = 'http:';
        url.pathname = '/about/html/';
        url.search = '';
        url.hash = '';
        h_url = url.toString();
        break;
      case 'about-ssl':
        url.protocol = 'https:';
        url.pathname = '/about/html/';
        url.search = '';
        url.hash = '';
        h_url = url.toString();
        break;
      case 'ode':
        url.protocol = 'http:';
        url.pathname = '/ode/';
        url.search = '?uri=';
        url.hash = '';
        h_url = url.toString();
        break;
      case 'ode-ssl':
        url.protocol = 'https:';
        url.pathname = '/ode/';
        url.search = '?uri=';
        url.hash = '';
        h_url = url.toString();
        break;
      case 'custom':
        h_url = _url;
        break;
    }
    return h_url;
  }


  createSpongeCmdFor(srv, mode, _url)
  {
    var h_url = '';
    var docURL;
    var _mode = '';

    if (mode === 'soft')
      _mode = 'sponger:get=soft';
    else if (mode === 'add')
      _mode = 'sponger:get=add';
    else if (mode === 'replace')
      _mode = 'sponger:get=replace';

    function createProxyURI(srv, url)
    {
      var proxyurl = encodeURIComponent(url);

      if (srv==='describe' || srv==='describe-ssl') {
        var rc = url.match(/^((\w+):\/)?\/?(.*)$/);
        if (rc) {
          url = rc[2] + '/' + rc[3];
          if (srv==='describe')
            proxyurl = 'http://linkeddata.uriburner.com/about/id/entity/'+url;
          else if (srv==='describe-ssl')
            proxyurl = 'https://linkeddata.uriburner.com/about/id/entity/'+url;
        }
      }
      return proxyurl;      
    }


    if (srv==='describe' || srv==='describe-ssl') {
//      docURL = encodeURIComponent(createProxyURI(srv, _url));
      docURL = encodeURIComponent(_url);
    }
    else {
        var rc = _url.match(/^((\w+):\/)?\/?(.*)$/);
        if (!rc)
          docURL = encodeURIComponent(_url);
        else
          docURL = rc[2] + '/' + rc[3];
    }

    switch (srv) {
      case 'describe':
        h_url = 'http://linkeddata.uriburner.com/describe/?url={url}';
        if (_mode)
          h_url += '&'+_mode;
        break;
      case 'describe-ssl':
        h_url = 'https://linkeddata.uriburner.com/describe/?url={url}';
        if (_mode)
          h_url += '&'+_mode;
        break;
      case 'about':
        h_url = 'http://linkeddata.uriburner.com/about/html/{url}';
        if (_mode)
          h_url += '?'+_mode;
        break;
      case 'about-ssl':
      default:
        h_url = 'https://linkeddata.uriburner.com/about/html/{url}';
        if (_mode)
          h_url += '?'+_mode;
        break;
    }

    if (h_url.indexOf("{url}")!=-1)
       return h_url.replace("{url}",docURL);
    else
       return h_url + docURL;
  }


}


class SettingsProxy {
  constructor() {
    this.settings = new Settings();
  }

  async getValue(key) 
  {
    if (Browser.isChromeWebExt) {
      return new Promise(function (resolve, reject) {
        Browser.api.runtime.sendMessage({'cmd': 'getPref', 'key':key},
          function(resp) {
            var val = null;
            if (resp.val && resp.key === key)
              val = resp.val
            resolve(resp.val);
          });
        });
    } else {

      var resp = await Browser.api.runtime.sendMessage({'cmd': 'getPref', 'key':key});
      var val = null;
      if (resp.val && resp.key === key)
        val = resp.val;
      return val;
    }
  }

  async createImportUrl(curUrl)
  {
    var handle_url = await this.getValue('ext.osds.import.url');
    var srv = await this.getValue('ext.osds.import.srv');
    return this.settings._createImportUrl_1(curUrl, handle_url, srv)
  }

  createDefaultImportCmdFor(srv, _url)
  {
    return this.settings.createDefaultImportCmdFor(srv, _url);
  }

  createSpongeCmdFor(srv, mode, _url)
  {
    return this.settings.createSpongeCmdFor(srv, mode, _url)
  }

}



