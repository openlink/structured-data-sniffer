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

class SPARQL_Upload {
  constructor(tab, messages, req)
  {
    this.data = req.data;
    this.sparql_ep = req.sparql_ep;
    this.baseURI = req.baseURI;
    this.sparql_graph = req.sparql_graph;
    this.sparql_check = req.sparql_check;

    this.tab = tab;
    this.messages = messages;
    this.state = 'init';
    this.oidc = new OidcWeb();
    var u = new URL(this.sparql_ep);
    this.idp_url = u.origin;

    this.save2sparql = new Save2Sparql(this.sparql_ep, this.sparql_graph, this.baseURI, this.oidc, true, this.messages);
  }


  async check_login(relogin)
  {
    try {
      this.messages.throbber_show("&nbsp;Initializing...");

      if (relogin) 
      {
        await this.oidc.logout();
        this.state = 'login';
        this.oidc.login2(this.idp_url);
        return false;
      } 
      else 
      {
        await this.oidc.checkSession();
        if (this.oidc.webid) {
          if (!this.oidc.isSessionForIdp(this.idp_url))
            await this.oidc.logout();
        }
        if (!this.oidc.webid) {
          this.state = 'login';
          this.oidc.login2(this.idp_url);
          return false;
        }
      }
      return true;
    } finally {
      this.messages.throbber_hide();
    }
  }

  
  async logout()
  {
    await this.oidc.logout();
  }

  
  async reexec()
  {
    if (this.state === 'init') {
      var rc = await slinks.check_login();
      if (rc) {
        return await this.mexec();
      }
    } 
    else if (this.state === 'login' || this.state === 'query') 
    {
      return await this.mexec();
    } 
    return false;
  }


  async mexec()
  {
    this.state = `query`;

    var handler = new Convert_Turtle();
    try {
      for(var v of this.data) {
        this.messages.throbber_show('&nbsp;Preparing&nbsp;data...');

        if (v.error.length > 0) {
          
          this.messages.snackbar_show('Unable prepare data:' +v.error);

        } else if (v.txt.length > 0) {
          
          var ttl_data = await handler.prepare_query(v.txt, this.baseURI);
          for(var i=0; i < ttl_data.length; i++) {

            var ret = await this.save2sparql.exec_sparql(ttl_data[i].prefixes, ttl_data[i].triples);

            this.messages.throbber_hide();

            if (!ret.rc) {
              if (ret.status === 401 || ret.status === 403) {
                 this.logout();
                 this.check_login(true); // Browser.openTab(REDIR_URL);
                 return false;

              } else {
                 this.messages.snackbar_show('Unable to save:' +ret.error);
                 this.state = 'init';
                 return false;
              }
            }
          }

        }

      }
      if (this.sparql_check) {
        if (this.tab)
          Browser.api.tabs.create({'url':this.sparql_check, 'index': this.tab.index+1});
        else
          Browser.api.tabs.create({'url':this.sparql_check});
      }
      
    } finally {
      this.messages.throbber_hide();
    }
  
    return true;
  }

}



class SuperLinks {
  constructor(url, tabId, messages)
  {
    this.oidc = new OidcWeb();
    this.doc_url = url;
    this.tabId = tabId;
    this.messages = messages;
    this.state = 'init';
    this.ss_idp = 'https://linkeddata.uriburner.com';
  }

  async check_login(relogin)
  {
    try {
      this.messages.throbber_show("&nbsp;Initializing...");

      if (relogin) 
      {
        await this.oidc.logout();
        this.state = 'login';
        this.oidc.login2(this.ss_idp);
        return false;
      } 
      else 
      {
        await this.oidc.checkSession();
        if (this.oidc.webid) {
          if (!this.oidc.isSessionForIdp(this.ss_idp))
            await this.oidc.logout();
        }
        if (!this.oidc.webid) {
          this.state = 'login';
          this.oidc.login2(this.ss_idp);
          return false;
        }
      }
      return true;
    } finally {
      this.messages.throbber_hide();
    }
  }

  
  async logout()
  {
    await this.oidc.logout();
  }

  
  fetchWithTimeout(url, options, timeout) 
  {
    return Promise.race([
      this.oidc.fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), timeout)
      )
    ]);
  }



  async request_superlinks(iter)
  {
    this.state = 'sponge';

    var LOGIN_URL = "https://linkeddata.uriburner.com/rdfdesc/login.vsp";
    
    var setting = new Settings();
    var sponge_type = setting.getValue('ext.osds.super-links-sponge');
    var sponge_mode = setting.getValue('ext.osds.super-links-sponge-mode');
    var links_timeout = parseInt(setting.getValue("ext.osds.super_links.timeout"), 10);
    var url_sponge;
  
    if (sponge_type) {
      url_sponge = setting.createSpongeCmdFor(sponge_type, sponge_mode, this.doc_url);
    } else {
      var rc = this.doc_url.match(/^((\w+):\/)?\/?(.*)$/);
      url_sponge = "https://linkeddata.uriburner.com/about/html/http/"+rc[3]+"?sponger:get=add";
    }
  

    this.messages.throbber_show("&nbsp;Retrieving&nbsp;Information");

    var options = {
         headers: {
            'Accept': 'text/html',
            'Cache-control': 'no-cache'
         },
         credentials: 'include',
        };
  
    try  {
      var rc = await this.fetchWithTimeout(url_sponge, options, 60000);  //links_timeout); //  30000);
      if (rc.ok && rc.status == 200) {
        if (rc.redirected && rc.url.lastIndexOf(LOGIN_URL, 0) === 0) {
          this.messages.throbber_hide();
          this.messages.snackbar_show("Could not retrieving information for current page with: "+url_sponge,"Trying Relogin and execute sponge again"); 
          this.logout();
          this.check_login(true); // Browser.openTab(REDIR_URL);
          return null;
        }
        return await this.exec_super_links_query(iter);
  
      } else {
        if (rc.status==401 || rc.status==403) {
          this.messages.throbber_hide();
          this.messages.snackbar_show("Sponge error:"+rc.status,"Trying Relogin and execute sponge again"); 
          this.logout();
          this.check_login(true); // Browser.openTab(REDIR_URL);
          return null;
        } else {
          this.messages.snackbar_show("Sponge error:"+rc.status, rc.statusText); 
          return await this.exec_super_links_query(iter);
        }
      }
  
    } catch(e) {
      this.messages.throbber_hide();
      if (e.statusCode == 403 || e.statusCode == 401) {
        this.logout();
        this.messages.snackbar_show("Sponge error:"+e.statusCode,"Trying Relogin and execute sponge again"); 
        this.check_login(true); // Browser.openTab(REDIR_URL);
      } else {
        this.messages.snackbar_show("Sponge error:"+e.toString(), null); 
      }
      console.log(e);
    }
  
    return null;
  }


  async exec_super_links_query(iter)
  {
    this.state = 'query';

    var SPARQL_URL = "https://linkeddata.uriburner.com/sparql";

    var setting = new Settings();
    var links_query = setting.getValue("ext.osds.super_links.query");
    var links_timeout = parseInt(setting.getValue("ext.osds.super_links.timeout"), 10);

    
    var url = new URL(this.doc_url);
    url.hash = '';
    //url.search = '';
    var iri = url.toString();
  
    var br_lang = navigator.language || navigator.userLanguage;
    if (br_lang && br_lang.length>0) {
      var i = br_lang.indexOf('-');
      if (i!=-1)
         br_lang = br_lang.substr(0,i);
    } else {
      br_lang = 'en';
    }
  
    var links_sparql_query = (new Settings()).createSuperLinksQuery(links_query, iri, br_lang);
  
    this.messages.throbber_show("&nbsp;Preparing&nbsp;Super&nbsp;Links&nbsp;"+iter);
  
    var get_url = new URL(SPARQL_URL);
    var params = get_url.searchParams;
    params.append('format', 'application/json');
    params.append('query', links_sparql_query);
    params.append('CXML_redir_for_subjs', 121);
    params.append('timeout', links_timeout);
    params.append('_', Date.now());
  
    var options = {
          headers: {
            'Accept': 'application/json',
            'Cache-control': 'no-cache'
          },
          credentials: 'include',
        };
  
    try  {
      var rc = await this.fetchWithTimeout(get_url, options, links_timeout);
      if (rc.ok && rc.status == 200) {
        var data;
        try {
          data = await rc.text();
        } catch(e) {
          console.log(e);
        } finally {
          this.messages.throbber_hide();
        }
  
        if (data) {
          try {
            var val = JSON.parse(data);
            var links = val.results.bindings;
            if (links.length == 0) {
//              alert("Empty SuperLinks resultSet was received from server");
              return null;
            }
          } catch(e) {
            console.log(e);
          }
        }
        
        this.state = null;
        return data;
  
      } else {
        this.messages.throbber_hide();
        if (rc.status==401 || rc.status==403) {
          this.logout();
          this.check_login(true); // Browser.openTab(REDIR_URL);
          return null;
        } else {
          this.state = 'init';
          this.messages.snackbar_show("Could not load data from: "+SPARQL_URL, "Error:"+rc.status); 
          return null;
        }
      }
  
    } catch(e) {
      this.messages.throbber_hide();
      this.state = 'init';
      if (e.statusCode == 403 || e.statusCode == 401) {
        this.logout();
        this.messages.snackbar_show("Fetch SuperLinks error:"+e.statusCode,"Trying Relogin and call SupeLinks again"); 
        this.check_login(true); // Browser.openTab(REDIR_URL);
      } else {
        this.messages.snackbar_show("Could not load data from: "+SPARQL_URL, e.toString());
      }
      return null;
    } finally {
      this.messages.throbber_hide();
    }
  }

  apply_super_links(data)
  {
    if (data)
      Browser.api.tabs.sendMessage(this.tabId, { property: 'super_links_data', data : data });
  }

  async reexec()
  {
    if (this.state === 'init') {
      var rc = await slinks.check_login();
      if (rc) {
        return await this.mexec();
      }
    } 
    else if (this.state === 'sponge' || this.state === 'login') 
    {
      return await this.mexec();
    } 
    else if (this.state === 'query') 
    {
      return await this.mexec_query();
    }
    return false;
  }


  async mexec()
  {
    var setting = new Settings();
    var retries = setting.getValue("ext.osds.super_links.retries");
    var rtimeout = setting.getValue("ext.osds.super_links.retries_timeout");

    if (retries < 3)
      retries = 3;

    if (rtimeout < 2)
      rtimeout = 2;

    var data = null;

    for(var i=0; i < retries; i++)
    {
      if (i == 0)
         data = await this.request_superlinks(i+1);
      else
         data = await this.exec_super_links_query(i+1);

      if (this.state === 'login' || this.state === 'init')
        break;

      if (data) {
        this.apply_super_links(data);
        return true;
      } 
      else {
        await sleep(rtimeout * 1000);
      }
    }

    if (!data) {
      this.logout();
      this.check_login(true);
    }

    return false;
  }

  async mexec_query()
  {
    var setting = new Settings();
    var retries = setting.getValue("ext.osds.super_links.retries");
    var rtimeout = setting.getValue("ext.osds.super_links.retries_timeout");

    if (retries < 3)
      retries = 3;

    if (rtimeout < 2)
      rtimeout = 2;

    var data = null;

    for(var i=0; i < retries; i++)
    {
      data = await this.exec_super_links_query(i+1);

      if (this.state === 'login')
        break;

      if (data) {
        this.apply_super_links(data);
        return true;
      } 
      else {
        await sleep(rtimeout * 1000);
      }
    }

    if (!data) {
//??--      alert("Empty SuperLinks resultSet was received from server");
      this.logout();
      this.check_login(true);
    }

    return false;
  }

}



