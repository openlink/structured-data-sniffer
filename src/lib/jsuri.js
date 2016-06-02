/*!
 * jsUri v1.1.1
 * https://github.com/derek-watson/jsUri
 *
 * Copyright 2011, Derek Watson
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Includes parseUri regular expressions
 * http://blog.stevenlevithan.com/archives/parseuri
 * Copyright 2007, Steven Levithan
 * Released under the MIT license.
 *
 * Date: Mon Nov 14 20:06:34 2011 -0800
 */

var Query = function (queryString) {

    // query string parsing, parameter manipulation and stringification

    'use strict';

    var // parseQuery(q) parses the uri query string and returns a multi-dimensional array of the components
        parseQuery = function (q) {
            var arr = [], i, ps, p, keyval;

            if (typeof (q) === 'undefined' || q === null || q === '') {
                return arr;
            }

            if (q.indexOf('?') === 0) {
                q = q.substring(1);
            }

            ps = q.toString().split(/[&;]/);

            for (i = 0; i < ps.length; i++) {
                p = ps[i];
                keyval = p.split('=');
                arr.push([keyval[0], keyval[1]]);
            }

            return arr;
        },

        params = parseQuery(queryString),

        // toString() returns a string representation of the internal state of the object
        toString = function () {
            var s = '', i, param;
            for (i = 0; i < params.length; i++) {
                param = params[i];
                if (s.length > 0) {
                    s += '&';
                }
                s += param.join('=');
            }
            return s.length > 0 ? '?' + s : s;
        },

        decode = function (s) {
            s = decodeURIComponent(s);
            s = s.replace('+', ' ');
            return s;
        },

        // getParamValues(key) returns the first query param value found for the key 'key'
        getParamValue = function (key) {
            var param, i;
            for (i = 0; i < params.length; i++) {
                param = params[i];
                if (decode(key) === decode(param[0])) {
                    return param[1];
                }
            }
        },

        // getParamValues(key) returns an array of query param values for the key 'key'
        getParamValues = function (key) {
            var arr = [], i, param;
            for (i = 0; i < params.length; i++) {
                param = params[i];
                if (decode(key) === decode(param[0])) {
                    arr.push(param[1]);
                }
            }
            return arr;
        },

        // deleteParam(key) removes all instances of parameters named (key)
        // deleteParam(key, val) removes all instances where the value matches (val)
        deleteParam = function (key, val) {

            var arr = [], i, param, keyMatchesFilter, valMatchesFilter;

            for (i = 0; i < params.length; i++) {

                param = params[i];
                keyMatchesFilter = decode(param[0]) === decode(key);
                valMatchesFilter = decode(param[1]) === decode(val);

                if ((arguments.length === 1 && !keyMatchesFilter) || (arguments.length === 2 && !keyMatchesFilter && !valMatchesFilter)) {
                    arr.push(param);
                }
            }

            params = arr;

            return this;
        },

        // addParam(key, val) Adds an element to the end of the list of query parameters
        // addParam(key, val, index) adds the param at the specified position (index)
        addParam = function (key, val, index) {

            if (arguments.length === 3 && index !== -1) {
                index = Math.min(index, params.length);
                params.splice(index, 0, [key, val]);
            } else if (arguments.length > 0) {
                params.push([key, val]);
            }
            return this;
        },

        // replaceParam(key, newVal) deletes all instances of params named (key) and replaces them with the new single value
        // replaceParam(key, newVal, oldVal) deletes only instances of params named (key) with the value (val) and replaces them with the new single value
        // this function attempts to preserve query param ordering
        replaceParam = function (key, newVal, oldVal) {

            var index = -1, i, param;

            if (arguments.length === 3) {
                for (i = 0; i < params.length; i++) {
                    param = params[i];
                    if (decode(param[0]) === decode(key) && decodeURIComponent(param[1]) === decode(oldVal)) {
                        index = i;
                        break;
                    }
                }
                deleteParam(key, oldVal).addParam(key, newVal, index);
            } else {
                for (i = 0; i < params.length; i++) {
                    param = params[i];
                    if (decode(param[0]) === decode(key)) {
                        index = i;
                        break;
                    }
                }
                deleteParam(key);
                addParam(key, newVal, index);
            }
            return this;
        };

    // public api
    return {
        getParamValue: getParamValue,
        getParamValues: getParamValues,
        deleteParam: deleteParam,
        addParam: addParam,
        replaceParam: replaceParam,
        params: params,
        
        toString: toString
    };
};


var Uri = (function () {

  'use strict';

  /*jslint white: true, plusplus: true, regexp: true, indent: 2 */
  /*global Query: true */

  function is(s) {
    return (s !== null && s !== '');
  }

  function Uri(uriStr) {

    uriStr = uriStr || '';

    var parser = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
      keys = [
        "source",
        "protocol",
        "authority",
        "userInfo",
        "user",
        "password",
        "host",
        "port",
        "relative",
        "path",
        "directory",
        "file",
        "query",
        "anchor"
      ],
      q = {
        name: 'queryKey',
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
      },
      m = parser.exec(uriStr),
      i = 14,
      self = this;

    this.uriParts = {};

    while (i--) {
      this.uriParts[keys[i]] = m[i] || "";
    }

    this.uriParts[q.name] = {};
    this.uriParts[keys[12]].replace(q.parser, function ($0, $1, $2) {
      if ($1) {
        self.uriParts[q.name][$1] = $2;
      }
    });

    this.queryObj = new Query(this.uriParts.query);

    this.hasAuthorityPrefixUserPref = null;
  }


  /*
    Basic get/set functions for all properties
  */

  Uri.prototype.protocol = function (val) {
    if (typeof val !== 'undefined') {
      this.uriParts.protocol = val;
    }
    return this.uriParts.protocol;
  };

  // hasAuthorityPrefix: if there is no protocol, the leading // can be enabled or disabled
  Uri.prototype.hasAuthorityPrefix = function (val) {

    if (typeof val !== 'undefined') {
      this.hasAuthorityPrefixUserPref = val;
    }

    if (this.hasAuthorityPrefixUserPref === null) {
      return (this.uriParts.source.indexOf('//') !== -1);
    } else {
      return this.hasAuthorityPrefixUserPref;
    }
  };

  Uri.prototype.userInfo = function (val) {
    if (typeof val !== 'undefined') {
      this.uriParts.userInfo = val;
    }
    return this.uriParts.userInfo;
  };

  Uri.prototype.host = function (val) {
    if (typeof val !== 'undefined') {
      this.uriParts.host = val;
    }
    return this.uriParts.host;
  };

  Uri.prototype.port = function (val) {
    if (typeof val !== 'undefined') {
      this.uriParts.port = val;
    }
    return this.uriParts.port;
  };

  Uri.prototype.path = function (val) {
    if (typeof val !== 'undefined') {
      this.uriParts.path = val;
    }
    return this.uriParts.path;
  };

  Uri.prototype.query = function (val) {
    if (typeof val !== 'undefined') {
      this.queryObj = new Query(val);
    }
    return this.queryObj;
  };

  Uri.prototype.anchor = function (val) {
    if (typeof val !== 'undefined') {
      this.uriParts.anchor = val;
    }
    return this.uriParts.anchor;
  };

  /*
      Fluent setters for Uri properties
  */
  Uri.prototype.setProtocol = function (val) {
    this.protocol(val);
    return this;
  };

  Uri.prototype.setHasAuthorityPrefix = function (val) {
    this.hasAuthorityPrefix(val);
    return this;
  };

  Uri.prototype.setUserInfo = function (val) {
    this.userInfo(val);
    return this;
  };

  Uri.prototype.setHost = function (val) {
    this.host(val);
    return this;
  };

  Uri.prototype.setPort = function (val) {
    this.port(val);
    return this;
  };

  Uri.prototype.setPath = function (val) {
    this.path(val);
    return this;
  };

  Uri.prototype.setQuery = function (val) {
    this.query(val);
    return this;
  };

  Uri.prototype.setAnchor = function (val) {
    this.anchor(val);
    return this;
  };


  /*
      Query method wrappers
  */
  Uri.prototype.getQueryParamValue = function (key) {
    return this.query().getParamValue(key);
  };

  Uri.prototype.getQueryParamValues = function (key) {
    return this.query().getParamValues(key);
  };

  Uri.prototype.deleteQueryParam = function (key, val) {
    if (arguments.length === 2) {
      this.query().deleteParam(key, val);
    } else {
      this.query().deleteParam(key);
    }

    return this;
  };

  Uri.prototype.addQueryParam = function (key, val, index) {
    if (arguments.length === 3) {
      this.query().addParam(key, val, index);
    } else {
      this.query().addParam(key, val);
    }
    return this;
  };

  Uri.prototype.replaceQueryParam = function (key, newVal, oldVal) {
    if (arguments.length === 3) {
      this.query().replaceParam(key, newVal, oldVal);
    } else {
      this.query().replaceParam(key, newVal);
    }

    return this;
  };


  /*
    Serialization
  */    
  Uri.prototype.scheme = function () {

    var s = '';

    if (is(this.protocol())) {
      s += this.protocol();
      if (this.protocol().indexOf(':') !== this.protocol().length - 1) {
        s += ':';
      }
      s += '//';
    } else {
      if (this.hasAuthorityPrefix() && is(this.host())) {
        s += '//';
      }
    }

    return s;
  };

  /*
    Same as Mozilla nsIURI.prePath
    cf. https://developer.mozilla.org/en/nsIURI
  */
  Uri.prototype.origin = function () {

    var s = this.scheme();

    if (is(this.userInfo()) && is(this.host())) {
      s += this.userInfo();
      if (this.userInfo().indexOf('@') !== this.userInfo().length - 1) {
        s += '@';
      }
    }

    if (is(this.host())) {
      s += this.host();
      if (is(this.port())) {
        s += ':' + this.port();
      }
    }

    return s;
  };


  // toString() stringifies the current state of the uri
  Uri.prototype.toString = function () {

    var s = this.origin();

    if (is(this.path())) {
      s += this.path();
    } else {
      if (is(this.host()) && (is(this.query().toString()) || is(this.anchor()))) {
        s += '/';
      }
    }
    if (is(this.query().toString())) {
      if (this.query().toString().indexOf('?') !== 0) {
        s += '?';
      }
      s += this.query().toString();
    }

    if (is(this.anchor())) {
      if (this.anchor().indexOf('#') !== 0) {
        s += '#';
      }
      s += this.anchor();
    }

    return s;
  };

  /*
    Cloning
  */
  Uri.prototype.clone = function () {
    return new Uri(this.toString());
  };

  return Uri;
}());
