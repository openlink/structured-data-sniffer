(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jsonld"] = factory();
	else
		root["jsonld"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/ContextResolver.js":
/*!********************************!*\
  !*** ./lib/ContextResolver.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */


__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

__webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");

const {
  isArray: _isArray,
  isObject: _isObject,
  isString: _isString
} = __webpack_require__(/*! ./types */ "./lib/types.js");

const {
  asArray: _asArray
} = __webpack_require__(/*! ./util */ "./lib/util.js");

const {
  prependBase
} = __webpack_require__(/*! ./url */ "./lib/url.js");

const JsonLdError = __webpack_require__(/*! ./JsonLdError */ "./lib/JsonLdError.js");

const ResolvedContext = __webpack_require__(/*! ./ResolvedContext */ "./lib/ResolvedContext.js");

const MAX_CONTEXT_URLS = 10;
module.exports = class ContextResolver {
  /**
   * Creates a ContextResolver.
   *
   * @param sharedCache a shared LRU cache with `get` and `set` APIs.
   */
  constructor({
    sharedCache
  }) {
    this.perOpCache = new Map();
    this.sharedCache = sharedCache;
  }

  async resolve({
    activeCtx,
    context,
    documentLoader,
    base,
    cycles = new Set()
  }) {
    // process `@context`
    if (context && _isObject(context) && context['@context']) {
      context = context['@context'];
    } // context is one or more contexts


    context = _asArray(context); // resolve each context in the array

    const allResolved = [];

    for (const ctx of context) {
      if (_isString(ctx)) {
        // see if `ctx` has been resolved before...
        let _resolved = this._get(ctx);

        if (!_resolved) {
          // not resolved yet, resolve
          _resolved = await this._resolveRemoteContext({
            activeCtx,
            url: ctx,
            documentLoader,
            base,
            cycles
          });
        } // add to output and continue


        if (_isArray(_resolved)) {
          allResolved.push(..._resolved);
        } else {
          allResolved.push(_resolved);
        }

        continue;
      }

      if (ctx === null) {
        // handle `null` context, nothing to cache
        allResolved.push(new ResolvedContext({
          document: null
        }));
        continue;
      }

      if (!_isObject(ctx)) {
        _throwInvalidLocalContext(context);
      } // context is an object, get/create `ResolvedContext` for it


      const key = JSON.stringify(ctx);

      let resolved = this._get(key);

      if (!resolved) {
        // create a new static `ResolvedContext` and cache it
        resolved = new ResolvedContext({
          document: ctx
        });

        this._cacheResolvedContext({
          key,
          resolved,
          tag: 'static'
        });
      }

      allResolved.push(resolved);
    }

    return allResolved;
  }

  _get(key) {
    // get key from per operation cache; no `tag` is used with this cache so
    // any retrieved context will always be the same during a single operation
    let resolved = this.perOpCache.get(key);

    if (!resolved) {
      // see if the shared cache has a `static` entry for this URL
      const tagMap = this.sharedCache.get(key);

      if (tagMap) {
        resolved = tagMap.get('static');

        if (resolved) {
          this.perOpCache.set(key, resolved);
        }
      }
    }

    return resolved;
  }

  _cacheResolvedContext({
    key,
    resolved,
    tag
  }) {
    this.perOpCache.set(key, resolved);

    if (tag !== undefined) {
      let tagMap = this.sharedCache.get(key);

      if (!tagMap) {
        tagMap = new Map();
        this.sharedCache.set(key, tagMap);
      }

      tagMap.set(tag, resolved);
    }

    return resolved;
  }

  async _resolveRemoteContext({
    activeCtx,
    url,
    documentLoader,
    base,
    cycles
  }) {
    // resolve relative URL and fetch context
    url = prependBase(base, url);
    const {
      context,
      remoteDoc
    } = await this._fetchContext({
      activeCtx,
      url,
      documentLoader,
      cycles
    }); // update base according to remote document and resolve any relative URLs

    base = remoteDoc.documentUrl || url;

    _resolveContextUrls({
      context,
      base
    }); // resolve, cache, and return context


    const resolved = await this.resolve({
      activeCtx,
      context,
      documentLoader,
      base,
      cycles
    });

    this._cacheResolvedContext({
      key: url,
      resolved,
      tag: remoteDoc.tag
    });

    return resolved;
  }

  async _fetchContext({
    activeCtx,
    url,
    documentLoader,
    cycles
  }) {
    // check for max context URLs fetched during a resolve operation
    if (cycles.size > MAX_CONTEXT_URLS) {
      throw new JsonLdError('Maximum number of @context URLs exceeded.', 'jsonld.ContextUrlError', {
        code: activeCtx.processingMode === 'json-ld-1.0' ? 'loading remote context failed' : 'context overflow',
        max: MAX_CONTEXT_URLS
      });
    } // check for context URL cycle
    // shortcut to avoid extra work that would eventually hit the max above


    if (cycles.has(url)) {
      throw new JsonLdError('Cyclical @context URLs detected.', 'jsonld.ContextUrlError', {
        code: activeCtx.processingMode === 'json-ld-1.0' ? 'recursive context inclusion' : 'context overflow',
        url
      });
    } // track cycles


    cycles.add(url);
    let context;
    let remoteDoc;

    try {
      remoteDoc = await documentLoader(url);
      context = remoteDoc.document || null; // parse string context as JSON

      if (_isString(context)) {
        context = JSON.parse(context);
      }
    } catch (e) {
      throw new JsonLdError('Dereferencing a URL did not result in a valid JSON-LD object. ' + 'Possible causes are an inaccessible URL perhaps due to ' + 'a same-origin policy (ensure the server uses CORS if you are ' + 'using client-side JavaScript), too many redirects, a ' + 'non-JSON response, or more than one HTTP Link Header was ' + 'provided for a remote context.', 'jsonld.InvalidUrl', {
        code: 'loading remote context failed',
        url,
        cause: e
      });
    } // ensure ctx is an object


    if (!_isObject(context)) {
      throw new JsonLdError('Dereferencing a URL did not result in a JSON object. The ' + 'response was valid JSON, but it was not a JSON object.', 'jsonld.InvalidUrl', {
        code: 'invalid remote context',
        url
      });
    } // use empty context if no @context key is present


    if (!('@context' in context)) {
      context = {
        '@context': {}
      };
    } else {
      context = {
        '@context': context['@context']
      };
    } // append @context URL to context if given


    if (remoteDoc.contextUrl) {
      if (!_isArray(context['@context'])) {
        context['@context'] = [context['@context']];
      }

      context['@context'].push(remoteDoc.contextUrl);
    }

    return {
      context,
      remoteDoc
    };
  }

};

function _throwInvalidLocalContext(ctx) {
  throw new JsonLdError('Invalid JSON-LD syntax; @context must be an object.', 'jsonld.SyntaxError', {
    code: 'invalid local context',
    context: ctx
  });
}
/**
 * Resolve all relative `@context` URLs in the given context by inline
 * replacing them with absolute URLs.
 *
 * @param context the context.
 * @param base the base IRI to use to resolve relative IRIs.
 */


function _resolveContextUrls({
  context,
  base
}) {
  if (!context) {
    return;
  }

  const ctx = context['@context'];

  if (_isString(ctx)) {
    context['@context'] = prependBase(base, ctx);
    return;
  }

  if (_isArray(ctx)) {
    for (let i = 0; i < ctx.length; ++i) {
      const element = ctx[i];

      if (_isString(element)) {
        ctx[i] = prependBase(base, element);
        continue;
      }

      if (_isObject(element)) {
        _resolveContextUrls({
          context: {
            '@context': element
          },
          base
        });
      }
    }

    return;
  }

  if (!_isObject(ctx)) {
    // no @context URLs can be found in non-object
    return;
  } // ctx is an object, resolve any context URLs in terms


  for (const term in ctx) {
    _resolveContextUrls({
      context: ctx[term],
      base
    });
  }
}

/***/ }),

/***/ "./lib/JsonLdError.js":
/*!****************************!*\
  !*** ./lib/JsonLdError.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


module.exports = class JsonLdError extends Error {
  /**
   * Creates a JSON-LD Error.
   *
   * @param msg the error message.
   * @param type the error type.
   * @param details the error details.
   */
  constructor(message = 'An unspecified JSON-LD error occurred.', name = 'jsonld.Error', details = {}) {
    super(message);
    this.name = name;
    this.message = message;
    this.details = details;
  }

};

/***/ }),

/***/ "./lib/JsonLdProcessor.js":
/*!********************************!*\
  !*** ./lib/JsonLdProcessor.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


__webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");

module.exports = jsonld => {
  class JsonLdProcessor {
    toString() {
      return '[object JsonLdProcessor]';
    }

  }

  Object.defineProperty(JsonLdProcessor, 'prototype', {
    writable: false,
    enumerable: false
  });
  Object.defineProperty(JsonLdProcessor.prototype, 'constructor', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: JsonLdProcessor
  }); // The Web IDL test harness will check the number of parameters defined in
  // the functions below. The number of parameters must exactly match the
  // required (non-optional) parameters of the JsonLdProcessor interface as
  // defined here:
  // https://www.w3.org/TR/json-ld-api/#the-jsonldprocessor-interface

  JsonLdProcessor.compact = function (input, ctx) {
    if (arguments.length < 2) {
      return Promise.reject(new TypeError('Could not compact, too few arguments.'));
    }

    return jsonld.compact(input, ctx);
  };

  JsonLdProcessor.expand = function (input) {
    if (arguments.length < 1) {
      return Promise.reject(new TypeError('Could not expand, too few arguments.'));
    }

    return jsonld.expand(input);
  };

  JsonLdProcessor.flatten = function (input) {
    if (arguments.length < 1) {
      return Promise.reject(new TypeError('Could not flatten, too few arguments.'));
    }

    return jsonld.flatten(input);
  };

  return JsonLdProcessor;
};

/***/ }),

/***/ "./lib/NQuads.js":
/*!***********************!*\
  !*** ./lib/NQuads.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
 // TODO: move `NQuads` to its own package

module.exports = __webpack_require__(/*! rdf-canonize */ "./node_modules/rdf-canonize/index.js").NQuads;

/***/ }),

/***/ "./lib/RequestQueue.js":
/*!*****************************!*\
  !*** ./lib/RequestQueue.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017-2019 Digital Bazaar, Inc. All rights reserved.
 */


__webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");

module.exports = class RequestQueue {
  /**
   * Creates a simple queue for requesting documents.
   */
  constructor() {
    this._requests = {};
  }

  wrapLoader(loader) {
    const self = this;
    self._loader = loader;
    return function ()
    /* url */
    {
      return self.add.apply(self, arguments);
    };
  }

  async add(url) {
    let promise = this._requests[url];

    if (promise) {
      // URL already queued, wait for it to load
      return Promise.resolve(promise);
    } // queue URL and load it


    promise = this._requests[url] = this._loader(url);

    try {
      return await promise;
    } finally {
      delete this._requests[url];
    }
  }

};

/***/ }),

/***/ "./lib/ResolvedContext.js":
/*!********************************!*\
  !*** ./lib/ResolvedContext.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */


const LRU = __webpack_require__(/*! lru-cache */ "./node_modules/lru-cache/index.js");

const MAX_ACTIVE_CONTEXTS = 10;
module.exports = class ResolvedContext {
  /**
   * Creates a ResolvedContext.
   *
   * @param document the context document.
   */
  constructor({
    document
  }) {
    this.document = document; // TODO: enable customization of processed context cache
    // TODO: limit based on size of processed contexts vs. number of them

    this.cache = new LRU({
      max: MAX_ACTIVE_CONTEXTS
    });
  }

  getProcessed(activeCtx) {
    return this.cache.get(activeCtx);
  }

  setProcessed(activeCtx, processedCtx) {
    this.cache.set(activeCtx, processedCtx);
  }

};

/***/ }),

/***/ "./lib/compact.js":
/*!************************!*\
  !*** ./lib/compact.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


__webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");

__webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");

__webpack_require__(/*! core-js/modules/es.array.sort.js */ "./node_modules/core-js/modules/es.array.sort.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

__webpack_require__(/*! core-js/modules/es.array.reverse.js */ "./node_modules/core-js/modules/es.array.reverse.js");

__webpack_require__(/*! core-js/modules/es.string.starts-with.js */ "./node_modules/core-js/modules/es.string.starts-with.js");

__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");

const JsonLdError = __webpack_require__(/*! ./JsonLdError */ "./lib/JsonLdError.js");

const {
  isArray: _isArray,
  isObject: _isObject,
  isString: _isString,
  isUndefined: _isUndefined
} = __webpack_require__(/*! ./types */ "./lib/types.js");

const {
  isList: _isList,
  isValue: _isValue,
  isGraph: _isGraph,
  isSimpleGraph: _isSimpleGraph,
  isSubjectReference: _isSubjectReference
} = __webpack_require__(/*! ./graphTypes */ "./lib/graphTypes.js");

const {
  expandIri: _expandIri,
  getContextValue: _getContextValue,
  isKeyword: _isKeyword,
  process: _processContext,
  processingMode: _processingMode
} = __webpack_require__(/*! ./context */ "./lib/context.js");

const {
  removeBase: _removeBase,
  prependBase: _prependBase
} = __webpack_require__(/*! ./url */ "./lib/url.js");

const {
  addValue: _addValue,
  asArray: _asArray,
  compareShortestLeast: _compareShortestLeast
} = __webpack_require__(/*! ./util */ "./lib/util.js");

const api = {};
module.exports = api;
/**
 * Recursively compacts an element using the given active context. All values
 * must be in expanded form before this method is called.
 *
 * @param activeCtx the active context to use.
 * @param activeProperty the compacted property associated with the element
 *          to compact, null for none.
 * @param element the element to compact.
 * @param options the compaction options.
 * @param compactionMap the compaction map to use.
 *
 * @return a promise that resolves to the compacted value.
 */

api.compact = async ({
  activeCtx,
  activeProperty: _activeProperty = null,
  element,
  options: _options = {},
  compactionMap: _compactionMap = () => undefined
}) => {
  // recursively compact array
  if (_isArray(element)) {
    let rval = [];

    for (let i = 0; i < element.length; ++i) {
      // compact, dropping any null values unless custom mapped
      let compacted = await api.compact({
        activeCtx,
        activeProperty: _activeProperty,
        element: element[i],
        options: _options,
        compactionMap: _compactionMap
      });

      if (compacted === null) {
        compacted = await _compactionMap({
          unmappedValue: element[i],
          activeCtx,
          activeProperty: _activeProperty,
          parent: element,
          index: i,
          options: _options
        });

        if (compacted === undefined) {
          continue;
        }
      }

      rval.push(compacted);
    }

    if (_options.compactArrays && rval.length === 1) {
      // use single element if no container is specified
      const container = _getContextValue(activeCtx, _activeProperty, '@container') || [];

      if (container.length === 0) {
        rval = rval[0];
      }
    }

    return rval;
  } // use any scoped context on activeProperty


  const ctx = _getContextValue(activeCtx, _activeProperty, '@context');

  if (!_isUndefined(ctx)) {
    activeCtx = await _processContext({
      activeCtx,
      localCtx: ctx,
      propagate: true,
      overrideProtected: true,
      options: _options
    });
  } // recursively compact object


  if (_isObject(element)) {
    if (_options.link && '@id' in element && _options.link.hasOwnProperty(element['@id'])) {
      // check for a linked element to reuse
      const linked = _options.link[element['@id']];

      for (let i = 0; i < linked.length; ++i) {
        if (linked[i].expanded === element) {
          return linked[i].compacted;
        }
      }
    } // do value compaction on @values and subject references


    if (_isValue(element) || _isSubjectReference(element)) {
      const _rval = api.compactValue({
        activeCtx,
        activeProperty: _activeProperty,
        value: element,
        options: _options
      });

      if (_options.link && _isSubjectReference(element)) {
        // store linked element
        if (!_options.link.hasOwnProperty(element['@id'])) {
          _options.link[element['@id']] = [];
        }

        _options.link[element['@id']].push({
          expanded: element,
          compacted: _rval
        });
      }

      return _rval;
    } // if expanded property is @list and we're contained within a list
    // container, recursively compact this item to an array


    if (_isList(element)) {
      const container = _getContextValue(activeCtx, _activeProperty, '@container') || [];

      if (container.includes('@list')) {
        return api.compact({
          activeCtx,
          activeProperty: _activeProperty,
          element: element['@list'],
          options: _options,
          compactionMap: _compactionMap
        });
      }
    } // FIXME: avoid misuse of active property as an expanded property?


    const insideReverse = _activeProperty === '@reverse';
    const rval = {}; // original context before applying property-scoped and local contexts

    const inputCtx = activeCtx; // revert to previous context, if there is one,
    // and element is not a value object or a node reference

    if (!_isValue(element) && !_isSubjectReference(element)) {
      activeCtx = activeCtx.revertToPreviousContext();
    } // apply property-scoped context after reverting term-scoped context


    const propertyScopedCtx = _getContextValue(inputCtx, _activeProperty, '@context');

    if (!_isUndefined(propertyScopedCtx)) {
      activeCtx = await _processContext({
        activeCtx,
        localCtx: propertyScopedCtx,
        propagate: true,
        overrideProtected: true,
        options: _options
      });
    }

    if (_options.link && '@id' in element) {
      // store linked element
      if (!_options.link.hasOwnProperty(element['@id'])) {
        _options.link[element['@id']] = [];
      }

      _options.link[element['@id']].push({
        expanded: element,
        compacted: rval
      });
    } // apply any context defined on an alias of @type
    // if key is @type and any compacted value is a term having a local
    // context, overlay that context


    let types = element['@type'] || [];

    if (types.length > 1) {
      types = Array.from(types).sort();
    } // find all type-scoped contexts based on current context, prior to
    // updating it


    const typeContext = activeCtx;

    for (const type of types) {
      const compactedType = api.compactIri({
        activeCtx: typeContext,
        iri: type,
        relativeTo: {
          vocab: true
        }
      }); // Use any type-scoped context defined on this value

      const _ctx = _getContextValue(inputCtx, compactedType, '@context');

      if (!_isUndefined(_ctx)) {
        activeCtx = await _processContext({
          activeCtx,
          localCtx: _ctx,
          options: _options,
          propagate: false
        });
      }
    } // process element keys in order


    const keys = Object.keys(element).sort();

    for (const expandedProperty of keys) {
      const expandedValue = element[expandedProperty]; // compact @id

      if (expandedProperty === '@id') {
        let compactedValue = _asArray(expandedValue).map(expandedIri => api.compactIri({
          activeCtx,
          iri: expandedIri,
          relativeTo: {
            vocab: false
          },
          base: _options.base
        }));

        if (compactedValue.length === 1) {
          compactedValue = compactedValue[0];
        } // use keyword alias and add value


        const alias = api.compactIri({
          activeCtx,
          iri: '@id',
          relativeTo: {
            vocab: true
          }
        });
        rval[alias] = compactedValue;
        continue;
      } // compact @type(s)


      if (expandedProperty === '@type') {
        // resolve type values against previous context
        let compactedValue = _asArray(expandedValue).map(expandedIri => api.compactIri({
          activeCtx: inputCtx,
          iri: expandedIri,
          relativeTo: {
            vocab: true
          }
        }));

        if (compactedValue.length === 1) {
          compactedValue = compactedValue[0];
        } // use keyword alias and add value


        const alias = api.compactIri({
          activeCtx,
          iri: '@type',
          relativeTo: {
            vocab: true
          }
        });
        const container = _getContextValue(activeCtx, alias, '@container') || []; // treat as array for @type if @container includes @set

        const typeAsSet = container.includes('@set') && _processingMode(activeCtx, 1.1);

        const isArray = typeAsSet || _isArray(compactedValue) && expandedValue.length === 0;

        _addValue(rval, alias, compactedValue, {
          propertyIsArray: isArray
        });

        continue;
      } // handle @reverse


      if (expandedProperty === '@reverse') {
        // recursively compact expanded value
        const compactedValue = await api.compact({
          activeCtx,
          activeProperty: '@reverse',
          element: expandedValue,
          options: _options,
          compactionMap: _compactionMap
        }); // handle double-reversed properties

        for (const compactedProperty in compactedValue) {
          if (activeCtx.mappings.has(compactedProperty) && activeCtx.mappings.get(compactedProperty).reverse) {
            const value = compactedValue[compactedProperty];
            const container = _getContextValue(activeCtx, compactedProperty, '@container') || [];
            const useArray = container.includes('@set') || !_options.compactArrays;

            _addValue(rval, compactedProperty, value, {
              propertyIsArray: useArray
            });

            delete compactedValue[compactedProperty];
          }
        }

        if (Object.keys(compactedValue).length > 0) {
          // use keyword alias and add value
          const alias = api.compactIri({
            activeCtx,
            iri: expandedProperty,
            relativeTo: {
              vocab: true
            }
          });

          _addValue(rval, alias, compactedValue);
        }

        continue;
      }

      if (expandedProperty === '@preserve') {
        // compact using activeProperty
        const compactedValue = await api.compact({
          activeCtx,
          activeProperty: _activeProperty,
          element: expandedValue,
          options: _options,
          compactionMap: _compactionMap
        });

        if (!(_isArray(compactedValue) && compactedValue.length === 0)) {
          _addValue(rval, expandedProperty, compactedValue);
        }

        continue;
      } // handle @index property


      if (expandedProperty === '@index') {
        // drop @index if inside an @index container
        const container = _getContextValue(activeCtx, _activeProperty, '@container') || [];

        if (container.includes('@index')) {
          continue;
        } // use keyword alias and add value


        const alias = api.compactIri({
          activeCtx,
          iri: expandedProperty,
          relativeTo: {
            vocab: true
          }
        });

        _addValue(rval, alias, expandedValue);

        continue;
      } // skip array processing for keywords that aren't
      // @graph, @list, or @included


      if (expandedProperty !== '@graph' && expandedProperty !== '@list' && expandedProperty !== '@included' && _isKeyword(expandedProperty)) {
        // use keyword alias and add value as is
        const alias = api.compactIri({
          activeCtx,
          iri: expandedProperty,
          relativeTo: {
            vocab: true
          }
        });

        _addValue(rval, alias, expandedValue);

        continue;
      } // Note: expanded value must be an array due to expansion algorithm.


      if (!_isArray(expandedValue)) {
        throw new JsonLdError('JSON-LD expansion error; expanded value must be an array.', 'jsonld.SyntaxError');
      } // preserve empty arrays


      if (expandedValue.length === 0) {
        const itemActiveProperty = api.compactIri({
          activeCtx,
          iri: expandedProperty,
          value: expandedValue,
          relativeTo: {
            vocab: true
          },
          reverse: insideReverse
        });
        const nestProperty = activeCtx.mappings.has(itemActiveProperty) ? activeCtx.mappings.get(itemActiveProperty)['@nest'] : null;
        let nestResult = rval;

        if (nestProperty) {
          _checkNestProperty(activeCtx, nestProperty, _options);

          if (!_isObject(rval[nestProperty])) {
            rval[nestProperty] = {};
          }

          nestResult = rval[nestProperty];
        }

        _addValue(nestResult, itemActiveProperty, expandedValue, {
          propertyIsArray: true
        });
      } // recusively process array values


      for (const expandedItem of expandedValue) {
        // compact property and get container type
        const itemActiveProperty = api.compactIri({
          activeCtx,
          iri: expandedProperty,
          value: expandedItem,
          relativeTo: {
            vocab: true
          },
          reverse: insideReverse
        }); // if itemActiveProperty is a @nest property, add values to nestResult,
        // otherwise rval

        const nestProperty = activeCtx.mappings.has(itemActiveProperty) ? activeCtx.mappings.get(itemActiveProperty)['@nest'] : null;
        let nestResult = rval;

        if (nestProperty) {
          _checkNestProperty(activeCtx, nestProperty, _options);

          if (!_isObject(rval[nestProperty])) {
            rval[nestProperty] = {};
          }

          nestResult = rval[nestProperty];
        }

        const container = _getContextValue(activeCtx, itemActiveProperty, '@container') || []; // get simple @graph or @list value if appropriate

        const isGraph = _isGraph(expandedItem);

        const isList = _isList(expandedItem);

        let inner;

        if (isList) {
          inner = expandedItem['@list'];
        } else if (isGraph) {
          inner = expandedItem['@graph'];
        } // recursively compact expanded item


        let compactedItem = await api.compact({
          activeCtx,
          activeProperty: itemActiveProperty,
          element: isList || isGraph ? inner : expandedItem,
          options: _options,
          compactionMap: _compactionMap
        }); // handle @list

        if (isList) {
          // ensure @list value is an array
          if (!_isArray(compactedItem)) {
            compactedItem = [compactedItem];
          }

          if (!container.includes('@list')) {
            // wrap using @list alias
            compactedItem = {
              [api.compactIri({
                activeCtx,
                iri: '@list',
                relativeTo: {
                  vocab: true
                }
              })]: compactedItem
            }; // include @index from expanded @list, if any

            if ('@index' in expandedItem) {
              compactedItem[api.compactIri({
                activeCtx,
                iri: '@index',
                relativeTo: {
                  vocab: true
                }
              })] = expandedItem['@index'];
            }
          } else {
            _addValue(nestResult, itemActiveProperty, compactedItem, {
              valueIsArray: true,
              allowDuplicate: true
            });

            continue;
          }
        } // Graph object compaction cases


        if (isGraph) {
          if (container.includes('@graph') && (container.includes('@id') || container.includes('@index') && _isSimpleGraph(expandedItem))) {
            // get or create the map object
            let mapObject;

            if (nestResult.hasOwnProperty(itemActiveProperty)) {
              mapObject = nestResult[itemActiveProperty];
            } else {
              nestResult[itemActiveProperty] = mapObject = {};
            } // index on @id or @index or alias of @none


            const key = (container.includes('@id') ? expandedItem['@id'] : expandedItem['@index']) || api.compactIri({
              activeCtx,
              iri: '@none',
              relativeTo: {
                vocab: true
              }
            }); // add compactedItem to map, using value of `@id` or a new blank
            // node identifier

            _addValue(mapObject, key, compactedItem, {
              propertyIsArray: !_options.compactArrays || container.includes('@set')
            });
          } else if (container.includes('@graph') && _isSimpleGraph(expandedItem)) {
            // container includes @graph but not @id or @index and value is a
            // simple graph object add compact value
            // if compactedItem contains multiple values, it is wrapped in
            // `@included`
            if (_isArray(compactedItem) && compactedItem.length > 1) {
              compactedItem = {
                '@included': compactedItem
              };
            }

            _addValue(nestResult, itemActiveProperty, compactedItem, {
              propertyIsArray: !_options.compactArrays || container.includes('@set')
            });
          } else {
            // wrap using @graph alias, remove array if only one item and
            // compactArrays not set
            if (_isArray(compactedItem) && compactedItem.length === 1 && _options.compactArrays) {
              compactedItem = compactedItem[0];
            }

            compactedItem = {
              [api.compactIri({
                activeCtx,
                iri: '@graph',
                relativeTo: {
                  vocab: true
                }
              })]: compactedItem
            }; // include @id from expanded graph, if any

            if ('@id' in expandedItem) {
              compactedItem[api.compactIri({
                activeCtx,
                iri: '@id',
                relativeTo: {
                  vocab: true
                }
              })] = expandedItem['@id'];
            } // include @index from expanded graph, if any


            if ('@index' in expandedItem) {
              compactedItem[api.compactIri({
                activeCtx,
                iri: '@index',
                relativeTo: {
                  vocab: true
                }
              })] = expandedItem['@index'];
            }

            _addValue(nestResult, itemActiveProperty, compactedItem, {
              propertyIsArray: !_options.compactArrays || container.includes('@set')
            });
          }
        } else if (container.includes('@language') || container.includes('@index') || container.includes('@id') || container.includes('@type')) {
          // handle language and index maps
          // get or create the map object
          let mapObject;

          if (nestResult.hasOwnProperty(itemActiveProperty)) {
            mapObject = nestResult[itemActiveProperty];
          } else {
            nestResult[itemActiveProperty] = mapObject = {};
          }

          let key;

          if (container.includes('@language')) {
            // if container is a language map, simplify compacted value to
            // a simple string
            if (_isValue(compactedItem)) {
              compactedItem = compactedItem['@value'];
            }

            key = expandedItem['@language'];
          } else if (container.includes('@index')) {
            const indexKey = _getContextValue(activeCtx, itemActiveProperty, '@index') || '@index';
            const containerKey = api.compactIri({
              activeCtx,
              iri: indexKey,
              relativeTo: {
                vocab: true
              }
            });

            if (indexKey === '@index') {
              key = expandedItem['@index'];
              delete compactedItem[containerKey];
            } else {
              let others;
              [key, ...others] = _asArray(compactedItem[indexKey] || []);

              if (!_isString(key)) {
                // Will use @none if it isn't a string.
                key = null;
              } else {
                switch (others.length) {
                  case 0:
                    delete compactedItem[indexKey];
                    break;

                  case 1:
                    compactedItem[indexKey] = others[0];
                    break;

                  default:
                    compactedItem[indexKey] = others;
                    break;
                }
              }
            }
          } else if (container.includes('@id')) {
            const idKey = api.compactIri({
              activeCtx,
              iri: '@id',
              relativeTo: {
                vocab: true
              }
            });
            key = compactedItem[idKey];
            delete compactedItem[idKey];
          } else if (container.includes('@type')) {
            const typeKey = api.compactIri({
              activeCtx,
              iri: '@type',
              relativeTo: {
                vocab: true
              }
            });

            let _types;

            [key, ..._types] = _asArray(compactedItem[typeKey] || []);

            switch (_types.length) {
              case 0:
                delete compactedItem[typeKey];
                break;

              case 1:
                compactedItem[typeKey] = _types[0];
                break;

              default:
                compactedItem[typeKey] = _types;
                break;
            } // If compactedItem contains a single entry
            // whose key maps to @id, recompact without @type


            if (Object.keys(compactedItem).length === 1 && '@id' in expandedItem) {
              compactedItem = await api.compact({
                activeCtx,
                activeProperty: itemActiveProperty,
                element: {
                  '@id': expandedItem['@id']
                },
                options: _options,
                compactionMap: _compactionMap
              });
            }
          } // if compacting this value which has no key, index on @none


          if (!key) {
            key = api.compactIri({
              activeCtx,
              iri: '@none',
              relativeTo: {
                vocab: true
              }
            });
          } // add compact value to map object using key from expanded value
          // based on the container type


          _addValue(mapObject, key, compactedItem, {
            propertyIsArray: container.includes('@set')
          });
        } else {
          // use an array if: compactArrays flag is false,
          // @container is @set or @list , value is an empty
          // array, or key is @graph
          const isArray = !_options.compactArrays || container.includes('@set') || container.includes('@list') || _isArray(compactedItem) && compactedItem.length === 0 || expandedProperty === '@list' || expandedProperty === '@graph'; // add compact value

          _addValue(nestResult, itemActiveProperty, compactedItem, {
            propertyIsArray: isArray
          });
        }
      }
    }

    return rval;
  } // only primitives remain which are already compact


  return element;
};
/**
 * Compacts an IRI or keyword into a term or prefix if it can be. If the
 * IRI has an associated value it may be passed.
 *
 * @param activeCtx the active context to use.
 * @param iri the IRI to compact.
 * @param value the value to check or null.
 * @param relativeTo options for how to compact IRIs:
 *          vocab: true to split after @vocab, false not to.
 * @param reverse true if a reverse property is being compacted, false if not.
 * @param base the absolute URL to use for compacting document-relative IRIs.
 *
 * @return the compacted term, prefix, keyword alias, or the original IRI.
 */


api.compactIri = ({
  activeCtx,
  iri,
  value: _value = null,
  relativeTo: _relativeTo = {
    vocab: false
  },
  reverse: _reverse = false,
  base: _base = null
}) => {
  // can't compact null
  if (iri === null) {
    return iri;
  } // if context is from a property term scoped context composed with a
  // type-scoped context, then use the previous context instead


  if (activeCtx.isPropertyTermScoped && activeCtx.previousContext) {
    activeCtx = activeCtx.previousContext;
  }

  const inverseCtx = activeCtx.getInverse(); // if term is a keyword, it may be compacted to a simple alias

  if (_isKeyword(iri) && iri in inverseCtx && '@none' in inverseCtx[iri] && '@type' in inverseCtx[iri]['@none'] && '@none' in inverseCtx[iri]['@none']['@type']) {
    return inverseCtx[iri]['@none']['@type']['@none'];
  } // use inverse context to pick a term if iri is relative to vocab


  if (_relativeTo.vocab && iri in inverseCtx) {
    const defaultLanguage = activeCtx['@language'] || '@none'; // prefer @index if available in value

    const containers = [];

    if (_isObject(_value) && '@index' in _value && !('@graph' in _value)) {
      containers.push('@index', '@index@set');
    } // if value is a preserve object, use its value


    if (_isObject(_value) && '@preserve' in _value) {
      _value = _value['@preserve'][0];
    } // prefer most specific container including @graph, prefering @set
    // variations


    if (_isGraph(_value)) {
      // favor indexmap if the graph is indexed
      if ('@index' in _value) {
        containers.push('@graph@index', '@graph@index@set', '@index', '@index@set');
      } // favor idmap if the graph is has an @id


      if ('@id' in _value) {
        containers.push('@graph@id', '@graph@id@set');
      }

      containers.push('@graph', '@graph@set', '@set'); // allow indexmap if the graph is not indexed

      if (!('@index' in _value)) {
        containers.push('@graph@index', '@graph@index@set', '@index', '@index@set');
      } // allow idmap if the graph does not have an @id


      if (!('@id' in _value)) {
        containers.push('@graph@id', '@graph@id@set');
      }
    } else if (_isObject(_value) && !_isValue(_value)) {
      containers.push('@id', '@id@set', '@type', '@set@type');
    } // defaults for term selection based on type/language


    let typeOrLanguage = '@language';
    let typeOrLanguageValue = '@null';

    if (_reverse) {
      typeOrLanguage = '@type';
      typeOrLanguageValue = '@reverse';
      containers.push('@set');
    } else if (_isList(_value)) {
      // choose the most specific term that works for all elements in @list
      // only select @list containers if @index is NOT in value
      if (!('@index' in _value)) {
        containers.push('@list');
      }

      const list = _value['@list'];

      if (list.length === 0) {
        // any empty list can be matched against any term that uses the
        // @list container regardless of @type or @language
        typeOrLanguage = '@any';
        typeOrLanguageValue = '@none';
      } else {
        let commonLanguage = list.length === 0 ? defaultLanguage : null;
        let commonType = null;

        for (let i = 0; i < list.length; ++i) {
          const item = list[i];
          let itemLanguage = '@none';
          let itemType = '@none';

          if (_isValue(item)) {
            if ('@direction' in item) {
              const lang = (item['@language'] || '').toLowerCase();
              const dir = item['@direction'];
              itemLanguage = `${lang}_${dir}`;
            } else if ('@language' in item) {
              itemLanguage = item['@language'].toLowerCase();
            } else if ('@type' in item) {
              itemType = item['@type'];
            } else {
              // plain literal
              itemLanguage = '@null';
            }
          } else {
            itemType = '@id';
          }

          if (commonLanguage === null) {
            commonLanguage = itemLanguage;
          } else if (itemLanguage !== commonLanguage && _isValue(item)) {
            commonLanguage = '@none';
          }

          if (commonType === null) {
            commonType = itemType;
          } else if (itemType !== commonType) {
            commonType = '@none';
          } // there are different languages and types in the list, so choose
          // the most generic term, no need to keep iterating the list


          if (commonLanguage === '@none' && commonType === '@none') {
            break;
          }
        }

        commonLanguage = commonLanguage || '@none';
        commonType = commonType || '@none';

        if (commonType !== '@none') {
          typeOrLanguage = '@type';
          typeOrLanguageValue = commonType;
        } else {
          typeOrLanguageValue = commonLanguage;
        }
      }
    } else {
      if (_isValue(_value)) {
        if ('@language' in _value && !('@index' in _value)) {
          containers.push('@language', '@language@set');
          typeOrLanguageValue = _value['@language'];
          const dir = _value['@direction'];

          if (dir) {
            typeOrLanguageValue = `${typeOrLanguageValue}_${dir}`;
          }
        } else if ('@direction' in _value && !('@index' in _value)) {
          typeOrLanguageValue = `_${_value['@direction']}`;
        } else if ('@type' in _value) {
          typeOrLanguage = '@type';
          typeOrLanguageValue = _value['@type'];
        }
      } else {
        typeOrLanguage = '@type';
        typeOrLanguageValue = '@id';
      }

      containers.push('@set');
    } // do term selection


    containers.push('@none'); // an index map can be used to index values using @none, so add as a low
    // priority

    if (_isObject(_value) && !('@index' in _value)) {
      // allow indexing even if no @index present
      containers.push('@index', '@index@set');
    } // values without type or language can use @language map


    if (_isValue(_value) && Object.keys(_value).length === 1) {
      // allow indexing even if no @index present
      containers.push('@language', '@language@set');
    }

    const term = _selectTerm(activeCtx, iri, _value, containers, typeOrLanguage, typeOrLanguageValue);

    if (term !== null) {
      return term;
    }
  } // no term match, use @vocab if available


  if (_relativeTo.vocab) {
    if ('@vocab' in activeCtx) {
      // determine if vocab is a prefix of the iri
      const vocab = activeCtx['@vocab'];

      if (iri.indexOf(vocab) === 0 && iri !== vocab) {
        // use suffix as relative iri if it is not a term in the active context
        const suffix = iri.substr(vocab.length);

        if (!activeCtx.mappings.has(suffix)) {
          return suffix;
        }
      }
    }
  } // no term or @vocab match, check for possible CURIEs


  let choice = null; // TODO: make FastCurieMap a class with a method to do this lookup

  const partialMatches = [];
  let iriMap = activeCtx.fastCurieMap; // check for partial matches of against `iri`, which means look until
  // iri.length - 1, not full length

  const maxPartialLength = iri.length - 1;

  for (let i = 0; i < maxPartialLength && iri[i] in iriMap; ++i) {
    iriMap = iriMap[iri[i]];

    if ('' in iriMap) {
      partialMatches.push(iriMap[''][0]);
    }
  } // check partial matches in reverse order to prefer longest ones first


  for (let i = partialMatches.length - 1; i >= 0; --i) {
    const entry = partialMatches[i];
    const terms = entry.terms;

    for (const term of terms) {
      // a CURIE is usable if:
      // 1. it has no mapping, OR
      // 2. value is null, which means we're not compacting an @value, AND
      //   the mapping matches the IRI
      const curie = term + ':' + iri.substr(entry.iri.length);
      const isUsableCurie = activeCtx.mappings.get(term)._prefix && (!activeCtx.mappings.has(curie) || _value === null && activeCtx.mappings.get(curie)['@id'] === iri); // select curie if it is shorter or the same length but lexicographically
      // less than the current choice

      if (isUsableCurie && (choice === null || _compareShortestLeast(curie, choice) < 0)) {
        choice = curie;
      }
    }
  } // return chosen curie


  if (choice !== null) {
    return choice;
  } // If iri could be confused with a compact IRI using a term in this context,
  // signal an error


  for (const [term, td] of activeCtx.mappings) {
    if (td && td._prefix && iri.startsWith(term + ':')) {
      throw new JsonLdError(`Absolute IRI "${iri}" confused with prefix "${term}".`, 'jsonld.SyntaxError', {
        code: 'IRI confused with prefix',
        context: activeCtx
      });
    }
  } // compact IRI relative to base


  if (!_relativeTo.vocab) {
    if ('@base' in activeCtx) {
      if (!activeCtx['@base']) {
        // The None case preserves rval as potentially relative
        return iri;
      } else {
        return _removeBase(_prependBase(_base, activeCtx['@base']), iri);
      }
    } else {
      return _removeBase(_base, iri);
    }
  } // return IRI as is


  return iri;
};
/**
 * Performs value compaction on an object with '@value' or '@id' as the only
 * property.
 *
 * @param activeCtx the active context.
 * @param activeProperty the active property that points to the value.
 * @param value the value to compact.
 * @param {Object} [options] - processing options.
 *
 * @return the compaction result.
 */


api.compactValue = ({
  activeCtx,
  activeProperty,
  value,
  options
}) => {
  // value is a @value
  if (_isValue(value)) {
    // get context rules
    const _type = _getContextValue(activeCtx, activeProperty, '@type');

    const language = _getContextValue(activeCtx, activeProperty, '@language');

    const direction = _getContextValue(activeCtx, activeProperty, '@direction');

    const container = _getContextValue(activeCtx, activeProperty, '@container') || []; // whether or not the value has an @index that must be preserved

    const preserveIndex = '@index' in value && !container.includes('@index'); // if there's no @index to preserve ...

    if (!preserveIndex && _type !== '@none') {
      // matching @type or @language specified in context, compact value
      if (value['@type'] === _type) {
        return value['@value'];
      }

      if ('@language' in value && value['@language'] === language && '@direction' in value && value['@direction'] === direction) {
        return value['@value'];
      }

      if ('@language' in value && value['@language'] === language) {
        return value['@value'];
      }

      if ('@direction' in value && value['@direction'] === direction) {
        return value['@value'];
      }
    } // return just the value of @value if all are true:
    // 1. @value is the only key or @index isn't being preserved
    // 2. there is no default language or @value is not a string or
    //   the key has a mapping with a null @language


    const keyCount = Object.keys(value).length;
    const isValueOnlyKey = keyCount === 1 || keyCount === 2 && '@index' in value && !preserveIndex;
    const hasDefaultLanguage = ('@language' in activeCtx);

    const isValueString = _isString(value['@value']);

    const hasNullMapping = activeCtx.mappings.has(activeProperty) && activeCtx.mappings.get(activeProperty)['@language'] === null;

    if (isValueOnlyKey && _type !== '@none' && (!hasDefaultLanguage || !isValueString || hasNullMapping)) {
      return value['@value'];
    }

    const rval = {}; // preserve @index

    if (preserveIndex) {
      rval[api.compactIri({
        activeCtx,
        iri: '@index',
        relativeTo: {
          vocab: true
        }
      })] = value['@index'];
    }

    if ('@type' in value) {
      // compact @type IRI
      rval[api.compactIri({
        activeCtx,
        iri: '@type',
        relativeTo: {
          vocab: true
        }
      })] = api.compactIri({
        activeCtx,
        iri: value['@type'],
        relativeTo: {
          vocab: true
        }
      });
    } else if ('@language' in value) {
      // alias @language
      rval[api.compactIri({
        activeCtx,
        iri: '@language',
        relativeTo: {
          vocab: true
        }
      })] = value['@language'];
    }

    if ('@direction' in value) {
      // alias @direction
      rval[api.compactIri({
        activeCtx,
        iri: '@direction',
        relativeTo: {
          vocab: true
        }
      })] = value['@direction'];
    } // alias @value


    rval[api.compactIri({
      activeCtx,
      iri: '@value',
      relativeTo: {
        vocab: true
      }
    })] = value['@value'];
    return rval;
  } // value is a subject reference


  const expandedProperty = _expandIri(activeCtx, activeProperty, {
    vocab: true
  }, options);

  const type = _getContextValue(activeCtx, activeProperty, '@type');

  const compacted = api.compactIri({
    activeCtx,
    iri: value['@id'],
    relativeTo: {
      vocab: type === '@vocab'
    },
    base: options.base
  }); // compact to scalar

  if (type === '@id' || type === '@vocab' || expandedProperty === '@graph') {
    return compacted;
  }

  return {
    [api.compactIri({
      activeCtx,
      iri: '@id',
      relativeTo: {
        vocab: true
      }
    })]: compacted
  };
};
/**
 * Picks the preferred compaction term from the given inverse context entry.
 *
 * @param activeCtx the active context.
 * @param iri the IRI to pick the term for.
 * @param value the value to pick the term for.
 * @param containers the preferred containers.
 * @param typeOrLanguage either '@type' or '@language'.
 * @param typeOrLanguageValue the preferred value for '@type' or '@language'.
 *
 * @return the preferred term.
 */


function _selectTerm(activeCtx, iri, value, containers, typeOrLanguage, typeOrLanguageValue) {
  if (typeOrLanguageValue === null) {
    typeOrLanguageValue = '@null';
  } // preferences for the value of @type or @language


  const prefs = []; // determine prefs for @id based on whether or not value compacts to a term

  if ((typeOrLanguageValue === '@id' || typeOrLanguageValue === '@reverse') && _isObject(value) && '@id' in value) {
    // prefer @reverse first
    if (typeOrLanguageValue === '@reverse') {
      prefs.push('@reverse');
    } // try to compact value to a term


    const term = api.compactIri({
      activeCtx,
      iri: value['@id'],
      relativeTo: {
        vocab: true
      }
    });

    if (activeCtx.mappings.has(term) && activeCtx.mappings.get(term) && activeCtx.mappings.get(term)['@id'] === value['@id']) {
      // prefer @vocab
      prefs.push.apply(prefs, ['@vocab', '@id']);
    } else {
      // prefer @id
      prefs.push.apply(prefs, ['@id', '@vocab']);
    }
  } else {
    prefs.push(typeOrLanguageValue); // consider direction only

    const langDir = prefs.find(el => el.includes('_'));

    if (langDir) {
      // consider _dir portion
      prefs.push(langDir.replace(/^[^_]+_/, '_'));
    }
  }

  prefs.push('@none');
  const containerMap = activeCtx.inverse[iri];

  for (const container of containers) {
    // if container not available in the map, continue
    if (!(container in containerMap)) {
      continue;
    }

    const typeOrLanguageValueMap = containerMap[container][typeOrLanguage];

    for (const pref of prefs) {
      // if type/language option not available in the map, continue
      if (!(pref in typeOrLanguageValueMap)) {
        continue;
      } // select term


      return typeOrLanguageValueMap[pref];
    }
  }

  return null;
}
/**
 * The value of `@nest` in the term definition must either be `@nest`, or a term
 * which resolves to `@nest`.
 *
 * @param activeCtx the active context.
 * @param nestProperty a term in the active context or `@nest`.
 * @param {Object} [options] - processing options.
 */


function _checkNestProperty(activeCtx, nestProperty, options) {
  if (_expandIri(activeCtx, nestProperty, {
    vocab: true
  }, options) !== '@nest') {
    throw new JsonLdError('JSON-LD compact error; nested property must have an @nest value ' + 'resolving to @nest.', 'jsonld.SyntaxError', {
      code: 'invalid @nest value'
    });
  }
}

/***/ }),

/***/ "./lib/constants.js":
/*!**************************!*\
  !*** ./lib/constants.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


const RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
const XSD = 'http://www.w3.org/2001/XMLSchema#';
module.exports = {
  // TODO: Deprecated and will be removed later. Use LINK_HEADER_CONTEXT.
  LINK_HEADER_REL: 'http://www.w3.org/ns/json-ld#context',
  LINK_HEADER_CONTEXT: 'http://www.w3.org/ns/json-ld#context',
  RDF,
  RDF_LIST: RDF + 'List',
  RDF_FIRST: RDF + 'first',
  RDF_REST: RDF + 'rest',
  RDF_NIL: RDF + 'nil',
  RDF_TYPE: RDF + 'type',
  RDF_PLAIN_LITERAL: RDF + 'PlainLiteral',
  RDF_XML_LITERAL: RDF + 'XMLLiteral',
  RDF_JSON_LITERAL: RDF + 'JSON',
  RDF_OBJECT: RDF + 'object',
  RDF_LANGSTRING: RDF + 'langString',
  XSD,
  XSD_BOOLEAN: XSD + 'boolean',
  XSD_DOUBLE: XSD + 'double',
  XSD_INTEGER: XSD + 'integer',
  XSD_STRING: XSD + 'string'
};

/***/ }),

/***/ "./lib/context.js":
/*!************************!*\
  !*** ./lib/context.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017-2019 Digital Bazaar, Inc. All rights reserved.
 */


__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

__webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");

__webpack_require__(/*! core-js/modules/es.string.match.js */ "./node_modules/core-js/modules/es.string.match.js");

__webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");

__webpack_require__(/*! core-js/modules/es.array.sort.js */ "./node_modules/core-js/modules/es.array.sort.js");

__webpack_require__(/*! core-js/modules/es.array.reverse.js */ "./node_modules/core-js/modules/es.array.reverse.js");

__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");

const util = __webpack_require__(/*! ./util */ "./lib/util.js");

const JsonLdError = __webpack_require__(/*! ./JsonLdError */ "./lib/JsonLdError.js");

const {
  isArray: _isArray,
  isObject: _isObject,
  isString: _isString,
  isUndefined: _isUndefined
} = __webpack_require__(/*! ./types */ "./lib/types.js");

const {
  isAbsolute: _isAbsoluteIri,
  isRelative: _isRelativeIri,
  prependBase
} = __webpack_require__(/*! ./url */ "./lib/url.js");

const {
  asArray: _asArray,
  compareShortestLeast: _compareShortestLeast
} = __webpack_require__(/*! ./util */ "./lib/util.js");

const INITIAL_CONTEXT_CACHE = new Map();
const INITIAL_CONTEXT_CACHE_MAX_SIZE = 10000;
const KEYWORD_PATTERN = /^@[a-zA-Z]+$/;
const api = {};
module.exports = api;
/**
 * Processes a local context and returns a new active context.
 *
 * @param activeCtx the current active context.
 * @param localCtx the local context to process.
 * @param options the context processing options.
 * @param propagate `true` if `false`, retains any previously defined term,
 *   which can be rolled back when the descending into a new node object.
 * @param overrideProtected `false` allows protected terms to be modified.
 *
 * @return a Promise that resolves to the new active context.
 */

api.process = async ({
  activeCtx,
  localCtx,
  options,
  propagate: _propagate = true,
  overrideProtected: _overrideProtected = false,
  cycles: _cycles = new Set()
}) => {
  // normalize local context to an array of @context objects
  if (_isObject(localCtx) && '@context' in localCtx && _isArray(localCtx['@context'])) {
    localCtx = localCtx['@context'];
  }

  const ctxs = _asArray(localCtx); // no contexts in array, return current active context w/o changes


  if (ctxs.length === 0) {
    return activeCtx;
  } // resolve contexts


  const resolved = await options.contextResolver.resolve({
    activeCtx,
    context: localCtx,
    documentLoader: options.documentLoader,
    base: options.base
  }); // override propagate if first resolved context has `@propagate`

  if (_isObject(resolved[0].document) && typeof resolved[0].document['@propagate'] === 'boolean') {
    // retrieve early, error checking done later
    _propagate = resolved[0].document['@propagate'];
  } // process each context in order, update active context
  // on each iteration to ensure proper caching


  let rval = activeCtx; // track the previous context
  // if not propagating, make sure rval has a previous context

  if (!_propagate && !rval.previousContext) {
    // clone `rval` context before updating
    rval = rval.clone();
    rval.previousContext = activeCtx;
  }

  for (const resolvedContext of resolved) {
    let {
      document: ctx
    } = resolvedContext; // update active context to one computed from last iteration

    activeCtx = rval; // reset to initial context

    if (ctx === null) {
      // We can't nullify if there are protected terms and we're
      // not allowing overrides (e.g. processing a property term scoped context)
      if (!_overrideProtected && Object.keys(activeCtx.protected).length !== 0) {
        const protectedMode = options && options.protectedMode || 'error';

        if (protectedMode === 'error') {
          throw new JsonLdError('Tried to nullify a context with protected terms outside of ' + 'a term definition.', 'jsonld.SyntaxError', {
            code: 'invalid context nullification'
          });
        } else if (protectedMode === 'warn') {
          // FIXME: remove logging and use a handler
          console.warn('WARNING: invalid context nullification'); // get processed context from cache if available

          const _processed = resolvedContext.getProcessed(activeCtx);

          if (_processed) {
            rval = activeCtx = _processed;
            continue;
          }

          const oldActiveCtx = activeCtx; // copy all protected term definitions to fresh initial context

          rval = activeCtx = api.getInitialContext(options).clone();

          for (const [term, _protected] of Object.entries(oldActiveCtx.protected)) {
            if (_protected) {
              activeCtx.mappings[term] = util.clone(oldActiveCtx.mappings[term]);
            }
          }

          activeCtx.protected = util.clone(oldActiveCtx.protected); // cache processed result

          resolvedContext.setProcessed(oldActiveCtx, rval);
          continue;
        }

        throw new JsonLdError('Invalid protectedMode.', 'jsonld.SyntaxError', {
          code: 'invalid protected mode',
          context: localCtx,
          protectedMode
        });
      }

      rval = activeCtx = api.getInitialContext(options).clone();
      continue;
    } // get processed context from cache if available


    const processed = resolvedContext.getProcessed(activeCtx);

    if (processed) {
      rval = activeCtx = processed;
      continue;
    } // dereference @context key if present


    if (_isObject(ctx) && '@context' in ctx) {
      ctx = ctx['@context'];
    } // context must be an object by now, all URLs retrieved before this call


    if (!_isObject(ctx)) {
      throw new JsonLdError('Invalid JSON-LD syntax; @context must be an object.', 'jsonld.SyntaxError', {
        code: 'invalid local context',
        context: ctx
      });
    } // TODO: there is likely a `previousContext` cloning optimization that
    // could be applied here (no need to copy it under certain conditions)
    // clone context before updating it


    rval = rval.clone(); // define context mappings for keys in local context

    const defined = new Map(); // handle @version

    if ('@version' in ctx) {
      if (ctx['@version'] !== 1.1) {
        throw new JsonLdError('Unsupported JSON-LD version: ' + ctx['@version'], 'jsonld.UnsupportedVersion', {
          code: 'invalid @version value',
          context: ctx
        });
      }

      if (activeCtx.processingMode && activeCtx.processingMode === 'json-ld-1.0') {
        throw new JsonLdError('@version: ' + ctx['@version'] + ' not compatible with ' + activeCtx.processingMode, 'jsonld.ProcessingModeConflict', {
          code: 'processing mode conflict',
          context: ctx
        });
      }

      rval.processingMode = 'json-ld-1.1';
      rval['@version'] = ctx['@version'];
      defined.set('@version', true);
    } // if not set explicitly, set processingMode to "json-ld-1.1"


    rval.processingMode = rval.processingMode || activeCtx.processingMode; // handle @base

    if ('@base' in ctx) {
      let base = ctx['@base'];

      if (base === null || _isAbsoluteIri(base)) {// no action
      } else if (_isRelativeIri(base)) {
        var _base = rval['@base'] || options.base;

        base = prependBase(_base, base);
      } else {
        throw new JsonLdError('Invalid JSON-LD syntax; the value of "@base" in a ' + '@context must be an absolute IRI, a relative IRI, or null.', 'jsonld.SyntaxError', {
          code: 'invalid base IRI',
          context: ctx
        });
      }

      rval['@base'] = base;
      defined.set('@base', true);
    } // handle @vocab


    if ('@vocab' in ctx) {
      const value = ctx['@vocab'];

      if (value === null) {
        delete rval['@vocab'];
      } else if (!_isString(value)) {
        throw new JsonLdError('Invalid JSON-LD syntax; the value of "@vocab" in a ' + '@context must be a string or null.', 'jsonld.SyntaxError', {
          code: 'invalid vocab mapping',
          context: ctx
        });
      } else if (!_isAbsoluteIri(value) && api.processingMode(rval, 1.0)) {
        throw new JsonLdError('Invalid JSON-LD syntax; the value of "@vocab" in a ' + '@context must be an absolute IRI.', 'jsonld.SyntaxError', {
          code: 'invalid vocab mapping',
          context: ctx
        });
      } else {
        rval['@vocab'] = _expandIri(rval, value, {
          vocab: true,
          base: true
        }, undefined, undefined, options);
      }

      defined.set('@vocab', true);
    } // handle @language


    if ('@language' in ctx) {
      const value = ctx['@language'];

      if (value === null) {
        delete rval['@language'];
      } else if (!_isString(value)) {
        throw new JsonLdError('Invalid JSON-LD syntax; the value of "@language" in a ' + '@context must be a string or null.', 'jsonld.SyntaxError', {
          code: 'invalid default language',
          context: ctx
        });
      } else {
        rval['@language'] = value.toLowerCase();
      }

      defined.set('@language', true);
    } // handle @direction


    if ('@direction' in ctx) {
      const value = ctx['@direction'];

      if (activeCtx.processingMode === 'json-ld-1.0') {
        throw new JsonLdError('Invalid JSON-LD syntax; @direction not compatible with ' + activeCtx.processingMode, 'jsonld.SyntaxError', {
          code: 'invalid context member',
          context: ctx
        });
      }

      if (value === null) {
        delete rval['@direction'];
      } else if (value !== 'ltr' && value !== 'rtl') {
        throw new JsonLdError('Invalid JSON-LD syntax; the value of "@direction" in a ' + '@context must be null, "ltr", or "rtl".', 'jsonld.SyntaxError', {
          code: 'invalid base direction',
          context: ctx
        });
      } else {
        rval['@direction'] = value;
      }

      defined.set('@direction', true);
    } // handle @propagate
    // note: we've already extracted it, here we just do error checking


    if ('@propagate' in ctx) {
      const value = ctx['@propagate'];

      if (activeCtx.processingMode === 'json-ld-1.0') {
        throw new JsonLdError('Invalid JSON-LD syntax; @propagate not compatible with ' + activeCtx.processingMode, 'jsonld.SyntaxError', {
          code: 'invalid context entry',
          context: ctx
        });
      }

      if (typeof value !== 'boolean') {
        throw new JsonLdError('Invalid JSON-LD syntax; @propagate value must be a boolean.', 'jsonld.SyntaxError', {
          code: 'invalid @propagate value',
          context: localCtx
        });
      }

      defined.set('@propagate', true);
    } // handle @import


    if ('@import' in ctx) {
      const value = ctx['@import'];

      if (activeCtx.processingMode === 'json-ld-1.0') {
        throw new JsonLdError('Invalid JSON-LD syntax; @import not compatible with ' + activeCtx.processingMode, 'jsonld.SyntaxError', {
          code: 'invalid context entry',
          context: ctx
        });
      }

      if (!_isString(value)) {
        throw new JsonLdError('Invalid JSON-LD syntax; @import must be a string.', 'jsonld.SyntaxError', {
          code: 'invalid @import value',
          context: localCtx
        });
      } // resolve contexts


      const resolvedImport = await options.contextResolver.resolve({
        activeCtx,
        context: value,
        documentLoader: options.documentLoader,
        base: options.base
      });

      if (resolvedImport.length !== 1) {
        throw new JsonLdError('Invalid JSON-LD syntax; @import must reference a single context.', 'jsonld.SyntaxError', {
          code: 'invalid remote context',
          context: localCtx
        });
      }

      const processedImport = resolvedImport[0].getProcessed(activeCtx);

      if (processedImport) {
        // Note: if the same context were used in this active context
        // as a reference context, then processed_input might not
        // be a dict.
        ctx = processedImport;
      } else {
        const importCtx = resolvedImport[0].document;

        if ('@import' in importCtx) {
          throw new JsonLdError('Invalid JSON-LD syntax: ' + 'imported context must not include @import.', 'jsonld.SyntaxError', {
            code: 'invalid context entry',
            context: localCtx
          });
        } // merge ctx into importCtx and replace rval with the result


        for (const key in importCtx) {
          if (!ctx.hasOwnProperty(key)) {
            ctx[key] = importCtx[key];
          }
        } // Note: this could potenially conflict if the import
        // were used in the same active context as a referenced
        // context and an import. In this case, we
        // could override the cached result, but seems unlikely.


        resolvedImport[0].setProcessed(activeCtx, ctx);
      }

      defined.set('@import', true);
    } // handle @protected; determine whether this sub-context is declaring
    // all its terms to be "protected" (exceptions can be made on a
    // per-definition basis)


    defined.set('@protected', ctx['@protected'] || false); // process all other keys

    for (const key in ctx) {
      api.createTermDefinition({
        activeCtx: rval,
        localCtx: ctx,
        term: key,
        defined,
        options,
        overrideProtected: _overrideProtected
      });

      if (_isObject(ctx[key]) && '@context' in ctx[key]) {
        const keyCtx = ctx[key]['@context'];
        let process = true;

        if (_isString(keyCtx)) {
          const url = prependBase(options.base, keyCtx); // track processed contexts to avoid scoped context recursion

          if (_cycles.has(url)) {
            process = false;
          } else {
            _cycles.add(url);
          }
        } // parse context to validate


        if (process) {
          try {
            await api.process({
              activeCtx: rval.clone(),
              localCtx: ctx[key]['@context'],
              overrideProtected: true,
              options,
              cycles: _cycles
            });
          } catch (e) {
            throw new JsonLdError('Invalid JSON-LD syntax; invalid scoped context.', 'jsonld.SyntaxError', {
              code: 'invalid scoped context',
              context: ctx[key]['@context'],
              term: key
            });
          }
        }
      }
    } // cache processed result


    resolvedContext.setProcessed(activeCtx, rval);
  }

  return rval;
};
/**
 * Creates a term definition during context processing.
 *
 * @param activeCtx the current active context.
 * @param localCtx the local context being processed.
 * @param term the term in the local context to define the mapping for.
 * @param defined a map of defining/defined keys to detect cycles and prevent
 *          double definitions.
 * @param {Object} [options] - creation options.
 * @param {string} [options.protectedMode="error"] - "error" to throw error
 *   on `@protected` constraint violation, "warn" to allow violations and
 *   signal a warning.
 * @param overrideProtected `false` allows protected terms to be modified.
 */


api.createTermDefinition = ({
  activeCtx,
  localCtx,
  term,
  defined,
  options,
  overrideProtected: _overrideProtected2 = false
}) => {
  if (defined.has(term)) {
    // term already defined
    if (defined.get(term)) {
      return;
    } // cycle detected


    throw new JsonLdError('Cyclical context definition detected.', 'jsonld.CyclicalContext', {
      code: 'cyclic IRI mapping',
      context: localCtx,
      term
    });
  } // now defining term


  defined.set(term, false); // get context term value

  let value;

  if (localCtx.hasOwnProperty(term)) {
    value = localCtx[term];
  }

  if (term === '@type' && _isObject(value) && (value['@container'] || '@set') === '@set' && api.processingMode(activeCtx, 1.1)) {
    const _validKeys = ['@container', '@id', '@protected'];
    const keys = Object.keys(value);

    if (keys.length === 0 || keys.some(k => !_validKeys.includes(k))) {
      throw new JsonLdError('Invalid JSON-LD syntax; keywords cannot be overridden.', 'jsonld.SyntaxError', {
        code: 'keyword redefinition',
        context: localCtx,
        term
      });
    }
  } else if (api.isKeyword(term)) {
    throw new JsonLdError('Invalid JSON-LD syntax; keywords cannot be overridden.', 'jsonld.SyntaxError', {
      code: 'keyword redefinition',
      context: localCtx,
      term
    });
  } else if (term.match(KEYWORD_PATTERN)) {
    // FIXME: remove logging and use a handler
    console.warn('WARNING: terms beginning with "@" are reserved' + ' for future use and ignored', {
      term
    });
    return;
  } else if (term === '') {
    throw new JsonLdError('Invalid JSON-LD syntax; a term cannot be an empty string.', 'jsonld.SyntaxError', {
      code: 'invalid term definition',
      context: localCtx
    });
  } // keep reference to previous mapping for potential `@protected` check


  const previousMapping = activeCtx.mappings.get(term); // remove old mapping

  if (activeCtx.mappings.has(term)) {
    activeCtx.mappings.delete(term);
  } // convert short-hand value to object w/@id


  let simpleTerm = false;

  if (_isString(value) || value === null) {
    simpleTerm = true;
    value = {
      '@id': value
    };
  }

  if (!_isObject(value)) {
    throw new JsonLdError('Invalid JSON-LD syntax; @context term values must be ' + 'strings or objects.', 'jsonld.SyntaxError', {
      code: 'invalid term definition',
      context: localCtx
    });
  } // create new mapping


  const mapping = {};
  activeCtx.mappings.set(term, mapping);
  mapping.reverse = false; // make sure term definition only has expected keywords

  const validKeys = ['@container', '@id', '@language', '@reverse', '@type']; // JSON-LD 1.1 support

  if (api.processingMode(activeCtx, 1.1)) {
    validKeys.push('@context', '@direction', '@index', '@nest', '@prefix', '@protected');
  }

  for (const kw in value) {
    if (!validKeys.includes(kw)) {
      throw new JsonLdError('Invalid JSON-LD syntax; a term definition must not contain ' + kw, 'jsonld.SyntaxError', {
        code: 'invalid term definition',
        context: localCtx
      });
    }
  } // always compute whether term has a colon as an optimization for
  // _compactIri


  const colon = term.indexOf(':');
  mapping._termHasColon = colon > 0;

  if ('@reverse' in value) {
    if ('@id' in value) {
      throw new JsonLdError('Invalid JSON-LD syntax; a @reverse term definition must not ' + 'contain @id.', 'jsonld.SyntaxError', {
        code: 'invalid reverse property',
        context: localCtx
      });
    }

    if ('@nest' in value) {
      throw new JsonLdError('Invalid JSON-LD syntax; a @reverse term definition must not ' + 'contain @nest.', 'jsonld.SyntaxError', {
        code: 'invalid reverse property',
        context: localCtx
      });
    }

    const reverse = value['@reverse'];

    if (!_isString(reverse)) {
      throw new JsonLdError('Invalid JSON-LD syntax; a @context @reverse value must be a string.', 'jsonld.SyntaxError', {
        code: 'invalid IRI mapping',
        context: localCtx
      });
    }

    if (!api.isKeyword(reverse) && reverse.match(KEYWORD_PATTERN)) {
      // FIXME: remove logging and use a handler
      console.warn('WARNING: values beginning with "@" are reserved' + ' for future use and ignored', {
        reverse
      });

      if (previousMapping) {
        activeCtx.mappings.set(term, previousMapping);
      } else {
        activeCtx.mappings.delete(term);
      }

      return;
    } // expand and add @id mapping


    const _id = _expandIri(activeCtx, reverse, {
      vocab: true,
      base: false
    }, localCtx, defined, options);

    if (!_isAbsoluteIri(_id)) {
      throw new JsonLdError('Invalid JSON-LD syntax; a @context @reverse value must be an ' + 'absolute IRI or a blank node identifier.', 'jsonld.SyntaxError', {
        code: 'invalid IRI mapping',
        context: localCtx
      });
    }

    mapping['@id'] = _id;
    mapping.reverse = true;
  } else if ('@id' in value) {
    let _id2 = value['@id'];

    if (_id2 && !_isString(_id2)) {
      throw new JsonLdError('Invalid JSON-LD syntax; a @context @id value must be an array ' + 'of strings or a string.', 'jsonld.SyntaxError', {
        code: 'invalid IRI mapping',
        context: localCtx
      });
    }

    if (_id2 === null) {
      // reserve a null term, which may be protected
      mapping['@id'] = null;
    } else if (!api.isKeyword(_id2) && _id2.match(KEYWORD_PATTERN)) {
      // FIXME: remove logging and use a handler
      console.warn('WARNING: values beginning with "@" are reserved' + ' for future use and ignored', {
        id: _id2
      });

      if (previousMapping) {
        activeCtx.mappings.set(term, previousMapping);
      } else {
        activeCtx.mappings.delete(term);
      }

      return;
    } else if (_id2 !== term) {
      // expand and add @id mapping
      _id2 = _expandIri(activeCtx, _id2, {
        vocab: true,
        base: false
      }, localCtx, defined, options);

      if (!_isAbsoluteIri(_id2) && !api.isKeyword(_id2)) {
        throw new JsonLdError('Invalid JSON-LD syntax; a @context @id value must be an ' + 'absolute IRI, a blank node identifier, or a keyword.', 'jsonld.SyntaxError', {
          code: 'invalid IRI mapping',
          context: localCtx
        });
      } // if term has the form of an IRI it must map the same


      if (term.match(/(?::[^:])|\//)) {
        const termDefined = new Map(defined).set(term, true);

        const termIri = _expandIri(activeCtx, term, {
          vocab: true,
          base: false
        }, localCtx, termDefined, options);

        if (termIri !== _id2) {
          throw new JsonLdError('Invalid JSON-LD syntax; term in form of IRI must ' + 'expand to definition.', 'jsonld.SyntaxError', {
            code: 'invalid IRI mapping',
            context: localCtx
          });
        }
      }

      mapping['@id'] = _id2; // indicate if this term may be used as a compact IRI prefix

      mapping._prefix = simpleTerm && !mapping._termHasColon && _id2.match(/[:\/\?#\[\]@]$/);
    }
  }

  if (!('@id' in mapping)) {
    // see if the term has a prefix
    if (mapping._termHasColon) {
      const prefix = term.substr(0, colon);

      if (localCtx.hasOwnProperty(prefix)) {
        // define parent prefix
        api.createTermDefinition({
          activeCtx,
          localCtx,
          term: prefix,
          defined,
          options
        });
      }

      if (activeCtx.mappings.has(prefix)) {
        // set @id based on prefix parent
        const suffix = term.substr(colon + 1);
        mapping['@id'] = activeCtx.mappings.get(prefix)['@id'] + suffix;
      } else {
        // term is an absolute IRI
        mapping['@id'] = term;
      }
    } else if (term === '@type') {
      // Special case, were we've previously determined that container is @set
      mapping['@id'] = term;
    } else {
      // non-IRIs *must* define @ids if @vocab is not available
      if (!('@vocab' in activeCtx)) {
        throw new JsonLdError('Invalid JSON-LD syntax; @context terms must define an @id.', 'jsonld.SyntaxError', {
          code: 'invalid IRI mapping',
          context: localCtx,
          term
        });
      } // prepend vocab to term


      mapping['@id'] = activeCtx['@vocab'] + term;
    }
  } // Handle term protection


  if (value['@protected'] === true || defined.get('@protected') === true && value['@protected'] !== false) {
    activeCtx.protected[term] = true;
    mapping.protected = true;
  } // IRI mapping now defined


  defined.set(term, true);

  if ('@type' in value) {
    let type = value['@type'];

    if (!_isString(type)) {
      throw new JsonLdError('Invalid JSON-LD syntax; an @context @type value must be a string.', 'jsonld.SyntaxError', {
        code: 'invalid type mapping',
        context: localCtx
      });
    }

    if (type === '@json' || type === '@none') {
      if (api.processingMode(activeCtx, 1.0)) {
        throw new JsonLdError('Invalid JSON-LD syntax; an @context @type value must not be ' + `"${type}" in JSON-LD 1.0 mode.`, 'jsonld.SyntaxError', {
          code: 'invalid type mapping',
          context: localCtx
        });
      }
    } else if (type !== '@id' && type !== '@vocab') {
      // expand @type to full IRI
      type = _expandIri(activeCtx, type, {
        vocab: true,
        base: false
      }, localCtx, defined, options);

      if (!_isAbsoluteIri(type)) {
        throw new JsonLdError('Invalid JSON-LD syntax; an @context @type value must be an ' + 'absolute IRI.', 'jsonld.SyntaxError', {
          code: 'invalid type mapping',
          context: localCtx
        });
      }

      if (type.indexOf('_:') === 0) {
        throw new JsonLdError('Invalid JSON-LD syntax; an @context @type value must be an IRI, ' + 'not a blank node identifier.', 'jsonld.SyntaxError', {
          code: 'invalid type mapping',
          context: localCtx
        });
      }
    } // add @type to mapping


    mapping['@type'] = type;
  }

  if ('@container' in value) {
    // normalize container to an array form
    const container = _isString(value['@container']) ? [value['@container']] : value['@container'] || [];
    const validContainers = ['@list', '@set', '@index', '@language'];
    let isValid = true;
    const hasSet = container.includes('@set'); // JSON-LD 1.1 support

    if (api.processingMode(activeCtx, 1.1)) {
      validContainers.push('@graph', '@id', '@type'); // check container length

      if (container.includes('@list')) {
        if (container.length !== 1) {
          throw new JsonLdError('Invalid JSON-LD syntax; @context @container with @list must ' + 'have no other values', 'jsonld.SyntaxError', {
            code: 'invalid container mapping',
            context: localCtx
          });
        }
      } else if (container.includes('@graph')) {
        if (container.some(key => key !== '@graph' && key !== '@id' && key !== '@index' && key !== '@set')) {
          throw new JsonLdError('Invalid JSON-LD syntax; @context @container with @graph must ' + 'have no other values other than @id, @index, and @set', 'jsonld.SyntaxError', {
            code: 'invalid container mapping',
            context: localCtx
          });
        }
      } else {
        // otherwise, container may also include @set
        isValid &= container.length <= (hasSet ? 2 : 1);
      }

      if (container.includes('@type')) {
        // If mapping does not have an @type,
        // set it to @id
        mapping['@type'] = mapping['@type'] || '@id'; // type mapping must be either @id or @vocab

        if (!['@id', '@vocab'].includes(mapping['@type'])) {
          throw new JsonLdError('Invalid JSON-LD syntax; container: @type requires @type to be ' + '@id or @vocab.', 'jsonld.SyntaxError', {
            code: 'invalid type mapping',
            context: localCtx
          });
        }
      }
    } else {
      // in JSON-LD 1.0, container must not be an array (it must be a string,
      // which is one of the validContainers)
      isValid &= !_isArray(value['@container']); // check container length

      isValid &= container.length <= 1;
    } // check against valid containers


    isValid &= container.every(c => validContainers.includes(c)); // @set not allowed with @list

    isValid &= !(hasSet && container.includes('@list'));

    if (!isValid) {
      throw new JsonLdError('Invalid JSON-LD syntax; @context @container value must be ' + 'one of the following: ' + validContainers.join(', '), 'jsonld.SyntaxError', {
        code: 'invalid container mapping',
        context: localCtx
      });
    }

    if (mapping.reverse && !container.every(c => ['@index', '@set'].includes(c))) {
      throw new JsonLdError('Invalid JSON-LD syntax; @context @container value for a @reverse ' + 'type definition must be @index or @set.', 'jsonld.SyntaxError', {
        code: 'invalid reverse property',
        context: localCtx
      });
    } // add @container to mapping


    mapping['@container'] = container;
  } // property indexing


  if ('@index' in value) {
    if (!('@container' in value) || !mapping['@container'].includes('@index')) {
      throw new JsonLdError('Invalid JSON-LD syntax; @index without @index in @container: ' + `"${value['@index']}" on term "${term}".`, 'jsonld.SyntaxError', {
        code: 'invalid term definition',
        context: localCtx
      });
    }

    if (!_isString(value['@index']) || value['@index'].indexOf('@') === 0) {
      throw new JsonLdError('Invalid JSON-LD syntax; @index must expand to an IRI: ' + `"${value['@index']}" on term "${term}".`, 'jsonld.SyntaxError', {
        code: 'invalid term definition',
        context: localCtx
      });
    }

    mapping['@index'] = value['@index'];
  } // scoped contexts


  if ('@context' in value) {
    mapping['@context'] = value['@context'];
  }

  if ('@language' in value && !('@type' in value)) {
    let language = value['@language'];

    if (language !== null && !_isString(language)) {
      throw new JsonLdError('Invalid JSON-LD syntax; @context @language value must be ' + 'a string or null.', 'jsonld.SyntaxError', {
        code: 'invalid language mapping',
        context: localCtx
      });
    } // add @language to mapping


    if (language !== null) {
      language = language.toLowerCase();
    }

    mapping['@language'] = language;
  } // term may be used as a prefix


  if ('@prefix' in value) {
    if (term.match(/:|\//)) {
      throw new JsonLdError('Invalid JSON-LD syntax; @context @prefix used on a compact IRI term', 'jsonld.SyntaxError', {
        code: 'invalid term definition',
        context: localCtx
      });
    }

    if (api.isKeyword(mapping['@id'])) {
      throw new JsonLdError('Invalid JSON-LD syntax; keywords may not be used as prefixes', 'jsonld.SyntaxError', {
        code: 'invalid term definition',
        context: localCtx
      });
    }

    if (typeof value['@prefix'] === 'boolean') {
      mapping._prefix = value['@prefix'] === true;
    } else {
      throw new JsonLdError('Invalid JSON-LD syntax; @context value for @prefix must be boolean', 'jsonld.SyntaxError', {
        code: 'invalid @prefix value',
        context: localCtx
      });
    }
  }

  if ('@direction' in value) {
    const direction = value['@direction'];

    if (direction !== null && direction !== 'ltr' && direction !== 'rtl') {
      throw new JsonLdError('Invalid JSON-LD syntax; @direction value must be ' + 'null, "ltr", or "rtl".', 'jsonld.SyntaxError', {
        code: 'invalid base direction',
        context: localCtx
      });
    }

    mapping['@direction'] = direction;
  }

  if ('@nest' in value) {
    const nest = value['@nest'];

    if (!_isString(nest) || nest !== '@nest' && nest.indexOf('@') === 0) {
      throw new JsonLdError('Invalid JSON-LD syntax; @context @nest value must be ' + 'a string which is not a keyword other than @nest.', 'jsonld.SyntaxError', {
        code: 'invalid @nest value',
        context: localCtx
      });
    }

    mapping['@nest'] = nest;
  } // disallow aliasing @context and @preserve


  const id = mapping['@id'];

  if (id === '@context' || id === '@preserve') {
    throw new JsonLdError('Invalid JSON-LD syntax; @context and @preserve cannot be aliased.', 'jsonld.SyntaxError', {
      code: 'invalid keyword alias',
      context: localCtx
    });
  } // Check for overriding protected terms


  if (previousMapping && previousMapping.protected && !_overrideProtected2) {
    // force new term to continue to be protected and see if the mappings would
    // be equal
    activeCtx.protected[term] = true;
    mapping.protected = true;

    if (!_deepCompare(previousMapping, mapping)) {
      const protectedMode = options && options.protectedMode || 'error';

      if (protectedMode === 'error') {
        throw new JsonLdError(`Invalid JSON-LD syntax; tried to redefine "${term}" which is a ` + 'protected term.', 'jsonld.SyntaxError', {
          code: 'protected term redefinition',
          context: localCtx,
          term
        });
      } else if (protectedMode === 'warn') {
        // FIXME: remove logging and use a handler
        console.warn('WARNING: protected term redefinition', {
          term
        });
        return;
      }

      throw new JsonLdError('Invalid protectedMode.', 'jsonld.SyntaxError', {
        code: 'invalid protected mode',
        context: localCtx,
        term,
        protectedMode
      });
    }
  }
};
/**
 * Expands a string to a full IRI. The string may be a term, a prefix, a
 * relative IRI, or an absolute IRI. The associated absolute IRI will be
 * returned.
 *
 * @param activeCtx the current active context.
 * @param value the string to expand.
 * @param relativeTo options for how to resolve relative IRIs:
 *          base: true to resolve against the base IRI, false not to.
 *          vocab: true to concatenate after @vocab, false not to.
 * @param {Object} [options] - processing options.
 *
 * @return the expanded value.
 */


api.expandIri = (activeCtx, value, relativeTo, options) => {
  return _expandIri(activeCtx, value, relativeTo, undefined, undefined, options);
};
/**
 * Expands a string to a full IRI. The string may be a term, a prefix, a
 * relative IRI, or an absolute IRI. The associated absolute IRI will be
 * returned.
 *
 * @param activeCtx the current active context.
 * @param value the string to expand.
 * @param relativeTo options for how to resolve relative IRIs:
 *          base: true to resolve against the base IRI, false not to.
 *          vocab: true to concatenate after @vocab, false not to.
 * @param localCtx the local context being processed (only given if called
 *          during context processing).
 * @param defined a map for tracking cycles in context definitions (only given
 *          if called during context processing).
 * @param {Object} [options] - processing options.
 *
 * @return the expanded value.
 */


function _expandIri(activeCtx, value, relativeTo, localCtx, defined, options) {
  // already expanded
  if (value === null || !_isString(value) || api.isKeyword(value)) {
    return value;
  } // ignore non-keyword things that look like a keyword


  if (value.match(KEYWORD_PATTERN)) {
    return null;
  } // define term dependency if not defined


  if (localCtx && localCtx.hasOwnProperty(value) && defined.get(value) !== true) {
    api.createTermDefinition({
      activeCtx,
      localCtx,
      term: value,
      defined,
      options
    });
  }

  relativeTo = relativeTo || {};

  if (relativeTo.vocab) {
    const mapping = activeCtx.mappings.get(value); // value is explicitly ignored with a null mapping

    if (mapping === null) {
      return null;
    }

    if (_isObject(mapping) && '@id' in mapping) {
      // value is a term
      return mapping['@id'];
    }
  } // split value into prefix:suffix


  const colon = value.indexOf(':');

  if (colon > 0) {
    const prefix = value.substr(0, colon);
    const suffix = value.substr(colon + 1); // do not expand blank nodes (prefix of '_') or already-absolute
    // IRIs (suffix of '//')

    if (prefix === '_' || suffix.indexOf('//') === 0) {
      return value;
    } // prefix dependency not defined, define it


    if (localCtx && localCtx.hasOwnProperty(prefix)) {
      api.createTermDefinition({
        activeCtx,
        localCtx,
        term: prefix,
        defined,
        options
      });
    } // use mapping if prefix is defined


    const mapping = activeCtx.mappings.get(prefix);

    if (mapping && mapping._prefix) {
      return mapping['@id'] + suffix;
    } else if (prefix === "") {
      throw new JsonLdError('Invalid JSON-LD syntax; the empty prefix is used, but it was not defined.', 'jsonld.SyntaxError', {
        code: 'empty prefix was not defined',
        value: value
      });
    } // already absolute IRI


    if (_isAbsoluteIri(value)) {
      return value;
    }
  } // prepend vocab


  if (relativeTo.vocab && '@vocab' in activeCtx) {
    return activeCtx['@vocab'] + value;
  } // prepend base


  if (relativeTo.base && '@base' in activeCtx) {
    if (activeCtx['@base']) {
      // The null case preserves value as potentially relative
      return prependBase(prependBase(options.base, activeCtx['@base']), value);
    }
  } else if (relativeTo.base) {
    return prependBase(options.base, value);
  }

  return value;
}
/**
 * Gets the initial context.
 *
 * @param options the options to use:
 *          [base] the document base IRI.
 *
 * @return the initial context.
 */


api.getInitialContext = options => {
  const key = JSON.stringify({
    processingMode: options.processingMode
  });
  const cached = INITIAL_CONTEXT_CACHE.get(key);

  if (cached) {
    return cached;
  }

  const initialContext = {
    processingMode: options.processingMode,
    '@base': options.base,
    mappings: new Map(),
    inverse: null,
    getInverse: _createInverseContext,
    clone: _cloneActiveContext,
    revertToPreviousContext: _revertToPreviousContext,
    protected: {}
  }; // TODO: consider using LRU cache instead

  if (INITIAL_CONTEXT_CACHE.size === INITIAL_CONTEXT_CACHE_MAX_SIZE) {
    // clear whole cache -- assumes scenario where the cache fills means
    // the cache isn't being used very efficiently anyway
    INITIAL_CONTEXT_CACHE.clear();
  }

  INITIAL_CONTEXT_CACHE.set(key, initialContext);
  return initialContext;
  /**
   * Generates an inverse context for use in the compaction algorithm, if
   * not already generated for the given active context.
   *
   * @return the inverse context.
   */

  function _createInverseContext() {
    const activeCtx = this; // lazily create inverse

    if (activeCtx.inverse) {
      return activeCtx.inverse;
    }

    const inverse = activeCtx.inverse = {}; // variables for building fast CURIE map

    const fastCurieMap = activeCtx.fastCurieMap = {};
    const irisToTerms = {}; // handle default language

    const defaultLanguage = (activeCtx['@language'] || '@none').toLowerCase(); // handle default direction

    const defaultDirection = activeCtx['@direction']; // create term selections for each mapping in the context, ordered by
    // shortest and then lexicographically least

    const mappings = activeCtx.mappings;
    const terms = [...mappings.keys()].sort(_compareShortestLeast);

    for (const term of terms) {
      const mapping = mappings.get(term);

      if (mapping === null) {
        continue;
      }

      let container = mapping['@container'] || '@none';
      container = [].concat(container).sort().join('');

      if (mapping['@id'] === null) {
        continue;
      } // iterate over every IRI in the mapping


      const ids = _asArray(mapping['@id']);

      for (const iri of ids) {
        let entry = inverse[iri];
        const isKeyword = api.isKeyword(iri);

        if (!entry) {
          // initialize entry
          inverse[iri] = entry = {};

          if (!isKeyword && !mapping._termHasColon) {
            // init IRI to term map and fast CURIE prefixes
            irisToTerms[iri] = [term];
            const fastCurieEntry = {
              iri,
              terms: irisToTerms[iri]
            };

            if (iri[0] in fastCurieMap) {
              fastCurieMap[iri[0]].push(fastCurieEntry);
            } else {
              fastCurieMap[iri[0]] = [fastCurieEntry];
            }
          }
        } else if (!isKeyword && !mapping._termHasColon) {
          // add IRI to term match
          irisToTerms[iri].push(term);
        } // add new entry


        if (!entry[container]) {
          entry[container] = {
            '@language': {},
            '@type': {},
            '@any': {}
          };
        }

        entry = entry[container];

        _addPreferredTerm(term, entry['@any'], '@none');

        if (mapping.reverse) {
          // term is preferred for values using @reverse
          _addPreferredTerm(term, entry['@type'], '@reverse');
        } else if (mapping['@type'] === '@none') {
          _addPreferredTerm(term, entry['@any'], '@none');

          _addPreferredTerm(term, entry['@language'], '@none');

          _addPreferredTerm(term, entry['@type'], '@none');
        } else if ('@type' in mapping) {
          // term is preferred for values using specific type
          _addPreferredTerm(term, entry['@type'], mapping['@type']);
        } else if ('@language' in mapping && '@direction' in mapping) {
          // term is preferred for values using specific language and direction
          const language = mapping['@language'];
          const direction = mapping['@direction'];

          if (language && direction) {
            _addPreferredTerm(term, entry['@language'], `${language}_${direction}`.toLowerCase());
          } else if (language) {
            _addPreferredTerm(term, entry['@language'], language.toLowerCase());
          } else if (direction) {
            _addPreferredTerm(term, entry['@language'], `_${direction}`);
          } else {
            _addPreferredTerm(term, entry['@language'], '@null');
          }
        } else if ('@language' in mapping) {
          _addPreferredTerm(term, entry['@language'], (mapping['@language'] || '@null').toLowerCase());
        } else if ('@direction' in mapping) {
          if (mapping['@direction']) {
            _addPreferredTerm(term, entry['@language'], `_${mapping['@direction']}`);
          } else {
            _addPreferredTerm(term, entry['@language'], '@none');
          }
        } else if (defaultDirection) {
          _addPreferredTerm(term, entry['@language'], `_${defaultDirection}`);

          _addPreferredTerm(term, entry['@language'], '@none');

          _addPreferredTerm(term, entry['@type'], '@none');
        } else {
          // add entries for no type and no language
          _addPreferredTerm(term, entry['@language'], defaultLanguage);

          _addPreferredTerm(term, entry['@language'], '@none');

          _addPreferredTerm(term, entry['@type'], '@none');
        }
      }
    } // build fast CURIE map


    for (const key in fastCurieMap) {
      _buildIriMap(fastCurieMap, key, 1);
    }

    return inverse;
  }
  /**
   * Runs a recursive algorithm to build a lookup map for quickly finding
   * potential CURIEs.
   *
   * @param iriMap the map to build.
   * @param key the current key in the map to work on.
   * @param idx the index into the IRI to compare.
   */


  function _buildIriMap(iriMap, key, idx) {
    const entries = iriMap[key];
    const next = iriMap[key] = {};
    let iri;
    let letter;

    for (const entry of entries) {
      iri = entry.iri;

      if (idx >= iri.length) {
        letter = '';
      } else {
        letter = iri[idx];
      }

      if (letter in next) {
        next[letter].push(entry);
      } else {
        next[letter] = [entry];
      }
    }

    for (const _key in next) {
      if (_key === '') {
        continue;
      }

      _buildIriMap(next, _key, idx + 1);
    }
  }
  /**
   * Adds the term for the given entry if not already added.
   *
   * @param term the term to add.
   * @param entry the inverse context typeOrLanguage entry to add to.
   * @param typeOrLanguageValue the key in the entry to add to.
   */


  function _addPreferredTerm(term, entry, typeOrLanguageValue) {
    if (!entry.hasOwnProperty(typeOrLanguageValue)) {
      entry[typeOrLanguageValue] = term;
    }
  }
  /**
   * Clones an active context, creating a child active context.
   *
   * @return a clone (child) of the active context.
   */


  function _cloneActiveContext() {
    const child = {};
    child.mappings = util.clone(this.mappings);
    child.clone = this.clone;
    child.inverse = null;
    child.getInverse = this.getInverse;
    child.protected = util.clone(this.protected);

    if (this.previousContext) {
      child.previousContext = this.previousContext.clone();
    }

    child.revertToPreviousContext = this.revertToPreviousContext;

    if ('@base' in this) {
      child['@base'] = this['@base'];
    }

    if ('@language' in this) {
      child['@language'] = this['@language'];
    }

    if ('@vocab' in this) {
      child['@vocab'] = this['@vocab'];
    }

    return child;
  }
  /**
   * Reverts any type-scoped context in this active context to the previous
   * context.
   */


  function _revertToPreviousContext() {
    if (!this.previousContext) {
      return this;
    }

    return this.previousContext.clone();
  }
};
/**
 * Gets the value for the given active context key and type, null if none is
 * set or undefined if none is set and type is '@context'.
 *
 * @param ctx the active context.
 * @param key the context key.
 * @param [type] the type of value to get (eg: '@id', '@type'), if not
 *          specified gets the entire entry for a key, null if not found.
 *
 * @return the value, null, or undefined.
 */


api.getContextValue = (ctx, key, type) => {
  // invalid key
  if (key === null) {
    if (type === '@context') {
      return undefined;
    }

    return null;
  } // get specific entry information


  if (ctx.mappings.has(key)) {
    const entry = ctx.mappings.get(key);

    if (_isUndefined(type)) {
      // return whole entry
      return entry;
    }

    if (entry.hasOwnProperty(type)) {
      // return entry value for type
      return entry[type];
    }
  } // get default language


  if (type === '@language' && type in ctx) {
    return ctx[type];
  } // get default direction


  if (type === '@direction' && type in ctx) {
    return ctx[type];
  }

  if (type === '@context') {
    return undefined;
  }

  return null;
};
/**
 * Processing Mode check.
 *
 * @param activeCtx the current active context.
 * @param version the string or numeric version to check.
 *
 * @return boolean.
 */


api.processingMode = (activeCtx, version) => {
  if (version.toString() >= '1.1') {
    return !activeCtx.processingMode || activeCtx.processingMode >= 'json-ld-' + version.toString();
  } else {
    return activeCtx.processingMode === 'json-ld-1.0';
  }
};
/**
 * Returns whether or not the given value is a keyword.
 *
 * @param v the value to check.
 *
 * @return true if the value is a keyword, false if not.
 */


api.isKeyword = v => {
  if (!_isString(v) || v[0] !== '@') {
    return false;
  }

  switch (v) {
    case '@base':
    case '@container':
    case '@context':
    case '@default':
    case '@direction':
    case '@embed':
    case '@explicit':
    case '@graph':
    case '@id':
    case '@included':
    case '@index':
    case '@json':
    case '@language':
    case '@list':
    case '@nest':
    case '@none':
    case '@omitDefault':
    case '@prefix':
    case '@preserve':
    case '@protected':
    case '@requireAll':
    case '@reverse':
    case '@set':
    case '@type':
    case '@value':
    case '@version':
    case '@vocab':
      return true;
  }

  return false;
};

function _deepCompare(x1, x2) {
  // compare `null` or primitive types directly
  if (!(x1 && typeof x1 === 'object') || !(x2 && typeof x2 === 'object')) {
    return x1 === x2;
  } // x1 and x2 are objects (also potentially arrays)


  const x1Array = Array.isArray(x1);

  if (x1Array !== Array.isArray(x2)) {
    return false;
  }

  if (x1Array) {
    if (x1.length !== x2.length) {
      return false;
    }

    for (let i = 0; i < x1.length; ++i) {
      if (!_deepCompare(x1[i], x2[i])) {
        return false;
      }
    }

    return true;
  } // x1 and x2 are non-array objects


  const k1s = Object.keys(x1);
  const k2s = Object.keys(x2);

  if (k1s.length !== k2s.length) {
    return false;
  }

  for (const k1 in x1) {
    let v1 = x1[k1];
    let v2 = x2[k1]; // special case: `@container` can be in any order

    if (k1 === '@container') {
      if (Array.isArray(v1) && Array.isArray(v2)) {
        v1 = v1.slice().sort();
        v2 = v2.slice().sort();
      }
    }

    if (!_deepCompare(v1, v2)) {
      return false;
    }
  }

  return true;
}

/***/ }),

/***/ "./lib/documentLoaders/xhr.js":
/*!************************************!*\
  !*** ./lib/documentLoaders/xhr.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


__webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");

__webpack_require__(/*! core-js/modules/es.string.match.js */ "./node_modules/core-js/modules/es.string.match.js");

const {
  parseLinkHeader,
  buildHeaders
} = __webpack_require__(/*! ../util */ "./lib/util.js");

const {
  LINK_HEADER_CONTEXT
} = __webpack_require__(/*! ../constants */ "./lib/constants.js");

const JsonLdError = __webpack_require__(/*! ../JsonLdError */ "./lib/JsonLdError.js");

const RequestQueue = __webpack_require__(/*! ../RequestQueue */ "./lib/RequestQueue.js");

const {
  prependBase
} = __webpack_require__(/*! ../url */ "./lib/url.js");

const REGEX_LINK_HEADER = /(^|(\r\n))link:/i;
/**
 * Creates a built-in XMLHttpRequest document loader.
 *
 * @param options the options to use:
 *          secure: require all URLs to use HTTPS.
 *          headers: an object (map) of headers which will be passed as request
 *            headers for the requested document. Accept is not allowed.
 *          [xhr]: the XMLHttpRequest API to use.
 *
 * @return the XMLHttpRequest document loader.
 */

module.exports = ({
  secure,
  headers: _headers = {},
  xhr
} = {
  headers: {}
}) => {
  _headers = buildHeaders(_headers);
  const queue = new RequestQueue();
  return queue.wrapLoader(loader);

  async function loader(url) {
    if (url.indexOf('http:') !== 0 && url.indexOf('https:') !== 0) {
      throw new JsonLdError('URL could not be dereferenced; only "http" and "https" URLs are ' + 'supported.', 'jsonld.InvalidUrl', {
        code: 'loading document failed',
        url
      });
    }

    if (secure && url.indexOf('https') !== 0) {
      throw new JsonLdError('URL could not be dereferenced; secure mode is enabled and ' + 'the URL\'s scheme is not "https".', 'jsonld.InvalidUrl', {
        code: 'loading document failed',
        url
      });
    }

    let req;

    try {
      req = await _get(xhr, url, _headers);
    } catch (e) {
      throw new JsonLdError('URL could not be dereferenced, an error occurred.', 'jsonld.LoadDocumentError', {
        code: 'loading document failed',
        url,
        cause: e
      });
    }

    if (req.status >= 400) {
      throw new JsonLdError('URL could not be dereferenced: ' + req.statusText, 'jsonld.LoadDocumentError', {
        code: 'loading document failed',
        url,
        httpStatusCode: req.status
      });
    }

    let doc = {
      contextUrl: null,
      documentUrl: url,
      document: req.response
    };
    let alternate = null; // handle Link Header (avoid unsafe header warning by existence testing)

    const contentType = req.getResponseHeader('Content-Type');
    let linkHeader;

    if (REGEX_LINK_HEADER.test(req.getAllResponseHeaders())) {
      linkHeader = req.getResponseHeader('Link');
    }

    if (linkHeader && contentType !== 'application/ld+json') {
      // only 1 related link header permitted
      const linkHeaders = parseLinkHeader(linkHeader);
      const linkedContext = linkHeaders[LINK_HEADER_CONTEXT];

      if (Array.isArray(linkedContext)) {
        throw new JsonLdError('URL could not be dereferenced, it has more than one ' + 'associated HTTP Link Header.', 'jsonld.InvalidUrl', {
          code: 'multiple context link headers',
          url
        });
      }

      if (linkedContext) {
        doc.contextUrl = linkedContext.target;
      } // "alternate" link header is a redirect


      alternate = linkHeaders['alternate'];

      if (alternate && alternate.type == 'application/ld+json' && !(contentType || '').match(/^application\/(\w*\+)?json$/)) {
        doc = await loader(prependBase(url, alternate.target));
      }
    }

    return doc;
  }
};

function _get(xhr, url, headers) {
  xhr = xhr || XMLHttpRequest;
  const req = new xhr();
  return new Promise((resolve, reject) => {
    req.onload = () => resolve(req);

    req.onerror = err => reject(err);

    req.open('GET', url, true);

    for (const k in headers) {
      req.setRequestHeader(k, headers[k]);
    }

    req.send();
  });
}

/***/ }),

/***/ "./lib/expand.js":
/*!***********************!*\
  !*** ./lib/expand.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


__webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");

__webpack_require__(/*! core-js/modules/es.object.assign.js */ "./node_modules/core-js/modules/es.object.assign.js");

__webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");

__webpack_require__(/*! core-js/modules/es.array.sort.js */ "./node_modules/core-js/modules/es.array.sort.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

__webpack_require__(/*! core-js/modules/es.object.from-entries.js */ "./node_modules/core-js/modules/es.object.from-entries.js");

__webpack_require__(/*! core-js/modules/es.string.match.js */ "./node_modules/core-js/modules/es.string.match.js");

__webpack_require__(/*! core-js/modules/es.array.reverse.js */ "./node_modules/core-js/modules/es.array.reverse.js");

__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");

const JsonLdError = __webpack_require__(/*! ./JsonLdError */ "./lib/JsonLdError.js");

const {
  isArray: _isArray,
  isObject: _isObject,
  isEmptyObject: _isEmptyObject,
  isString: _isString,
  isUndefined: _isUndefined
} = __webpack_require__(/*! ./types */ "./lib/types.js");

const {
  isList: _isList,
  isValue: _isValue,
  isGraph: _isGraph,
  isSubject: _isSubject
} = __webpack_require__(/*! ./graphTypes */ "./lib/graphTypes.js");

const {
  expandIri: _expandIri,
  getContextValue: _getContextValue,
  isKeyword: _isKeyword,
  process: _processContext,
  processingMode: _processingMode
} = __webpack_require__(/*! ./context */ "./lib/context.js");

const {
  isAbsolute: _isAbsoluteIri
} = __webpack_require__(/*! ./url */ "./lib/url.js");

const {
  addValue: _addValue,
  asArray: _asArray,
  getValues: _getValues,
  validateTypeValue: _validateTypeValue
} = __webpack_require__(/*! ./util */ "./lib/util.js");

const api = {};
module.exports = api;
const REGEX_BCP47 = /^[a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*$/;
/**
 * Recursively expands an element using the given context. Any context in
 * the element will be removed. All context URLs must have been retrieved
 * before calling this method.
 *
 * @param activeCtx the context to use.
 * @param activeProperty the property for the element, null for none.
 * @param element the element to expand.
 * @param options the expansion options.
 * @param insideList true if the element is a list, false if not.
 * @param insideIndex true if the element is inside an index container,
 *          false if not.
 * @param typeScopedContext an optional type-scoped active context for
 *          expanding values of nodes that were expressed according to
 *          a type-scoped context.
 * @param expansionMap(info) a function that can be used to custom map
 *          unmappable values (or to throw an error when they are detected);
 *          if this function returns `undefined` then the default behavior
 *          will be used.
 *
 * @return a Promise that resolves to the expanded value.
 */

api.expand = async ({
  activeCtx,
  activeProperty: _activeProperty = null,
  element,
  options: _options = {},
  insideList: _insideList = false,
  insideIndex: _insideIndex = false,
  typeScopedContext: _typeScopedContext = null,
  expansionMap: _expansionMap = () => undefined
}) => {
  // nothing to expand
  if (element === null || element === undefined) {
    return null;
  } // disable framing if activeProperty is @default


  if (_activeProperty === '@default') {
    _options = Object.assign({}, _options, {
      isFrame: false
    });
  }

  if (!_isArray(element) && !_isObject(element)) {
    // drop free-floating scalars that are not in lists unless custom mapped
    if (!_insideList && (_activeProperty === null || _expandIri(activeCtx, _activeProperty, {
      vocab: true
    }, _options) === '@graph')) {
      const mapped = await _expansionMap({
        unmappedValue: element,
        activeCtx,
        activeProperty: _activeProperty,
        options: _options,
        insideList: _insideList
      });

      if (mapped === undefined) {
        return null;
      }

      return mapped;
    } // expand element according to value expansion rules


    return _expandValue({
      activeCtx,
      activeProperty: _activeProperty,
      value: element,
      options: _options
    });
  } // recursively expand array


  if (_isArray(element)) {
    let _rval = [];
    const container = _getContextValue(activeCtx, _activeProperty, '@container') || [];
    _insideList = _insideList || container.includes('@list');

    for (let i = 0; i < element.length; ++i) {
      // expand element
      let e = await api.expand({
        activeCtx,
        activeProperty: _activeProperty,
        element: element[i],
        options: _options,
        expansionMap: _expansionMap,
        insideIndex: _insideIndex,
        typeScopedContext: _typeScopedContext
      });

      if (_insideList && _isArray(e)) {
        e = {
          '@list': e
        };
      }

      if (e === null) {
        e = await _expansionMap({
          unmappedValue: element[i],
          activeCtx,
          activeProperty: _activeProperty,
          parent: element,
          index: i,
          options: _options,
          expandedParent: _rval,
          insideList: _insideList
        });

        if (e === undefined) {
          continue;
        }
      }

      if (_isArray(e)) {
        _rval = _rval.concat(e);
      } else {
        _rval.push(e);
      }
    }

    return _rval;
  } // recursively expand object:
  // first, expand the active property


  const expandedActiveProperty = _expandIri(activeCtx, _activeProperty, {
    vocab: true,
    base: true
  }, _options); // Get any property-scoped context for activeProperty


  const propertyScopedCtx = _getContextValue(activeCtx, _activeProperty, '@context'); // second, determine if any type-scoped context should be reverted; it
  // should only be reverted when the following are all true:
  // 1. `element` is not a value or subject reference
  // 2. `insideIndex` is false


  _typeScopedContext = _typeScopedContext || (activeCtx.previousContext ? activeCtx : null);
  let keys = Object.keys(element).sort();
  let mustRevert = !_insideIndex;

  if (mustRevert && _typeScopedContext && keys.length <= 2 && !keys.includes('@context')) {
    for (const key of keys) {
      const expandedProperty = _expandIri(_typeScopedContext, key, {
        vocab: true,
        base: true
      }, _options);

      if (expandedProperty === '@value') {
        // value found, ensure type-scoped context is used to expand it
        mustRevert = false;
        activeCtx = _typeScopedContext;
        break;
      }

      if (expandedProperty === '@id' && keys.length === 1) {
        // subject reference found, do not revert
        mustRevert = false;
        break;
      }
    }
  }

  if (mustRevert) {
    // revert type scoped context
    activeCtx = activeCtx.revertToPreviousContext();
  } // apply property-scoped context after reverting term-scoped context


  if (!_isUndefined(propertyScopedCtx)) {
    activeCtx = await _processContext({
      activeCtx,
      localCtx: propertyScopedCtx,
      propagate: true,
      overrideProtected: true,
      options: _options
    });
  } // if element has a context, process it


  if ('@context' in element) {
    activeCtx = await _processContext({
      activeCtx,
      localCtx: element['@context'],
      options: _options
    });
  } // set the type-scoped context to the context on input, for use later


  _typeScopedContext = activeCtx; // Remember the first key found expanding to @type

  let typeKey = null; // look for scoped contexts on `@type`

  for (const key of keys) {
    const expandedProperty = _expandIri(activeCtx, key, {
      vocab: true,
      base: true
    }, _options);

    if (expandedProperty === '@type') {
      // set scoped contexts from @type
      // avoid sorting if possible
      typeKey = typeKey || key;
      const value = element[key];
      const types = Array.isArray(value) ? value.length > 1 ? value.slice().sort() : value : [value];

      for (const type of types) {
        const ctx = _getContextValue(_typeScopedContext, type, '@context');

        if (!_isUndefined(ctx)) {
          activeCtx = await _processContext({
            activeCtx,
            localCtx: ctx,
            options: _options,
            propagate: false
          });
        }
      }
    }
  } // process each key and value in element, ignoring @nest content


  let rval = {};
  await _expandObject({
    activeCtx,
    activeProperty: _activeProperty,
    expandedActiveProperty,
    element,
    expandedParent: rval,
    options: _options,
    insideList: _insideList,
    typeKey,
    typeScopedContext: _typeScopedContext,
    expansionMap: _expansionMap
  }); // get property count on expanded output

  keys = Object.keys(rval);
  let count = keys.length;

  if ('@value' in rval) {
    // @value must only have @language or @type
    if ('@type' in rval && ('@language' in rval || '@direction' in rval)) {
      throw new JsonLdError('Invalid JSON-LD syntax; an element containing "@value" may not ' + 'contain both "@type" and either "@language" or "@direction".', 'jsonld.SyntaxError', {
        code: 'invalid value object',
        element: rval
      });
    }

    let validCount = count - 1;

    if ('@type' in rval) {
      validCount -= 1;
    }

    if ('@index' in rval) {
      validCount -= 1;
    }

    if ('@language' in rval) {
      validCount -= 1;
    }

    if ('@direction' in rval) {
      validCount -= 1;
    }

    if (validCount !== 0) {
      throw new JsonLdError('Invalid JSON-LD syntax; an element containing "@value" may only ' + 'have an "@index" property and either "@type" ' + 'or either or both "@language" or "@direction".', 'jsonld.SyntaxError', {
        code: 'invalid value object',
        element: rval
      });
    }

    const values = rval['@value'] === null ? [] : _asArray(rval['@value']);

    const types = _getValues(rval, '@type'); // drop null @values unless custom mapped


    if (_processingMode(activeCtx, 1.1) && types.includes('@json') && types.length === 1) {// Any value of @value is okay if @type: @json
    } else if (values.length === 0) {
      const mapped = await _expansionMap({
        unmappedValue: rval,
        activeCtx,
        activeProperty: _activeProperty,
        element,
        options: _options,
        insideList: _insideList
      });

      if (mapped !== undefined) {
        rval = mapped;
      } else {
        rval = null;
      }
    } else if (!values.every(v => _isString(v) || _isEmptyObject(v)) && '@language' in rval) {
      // if @language is present, @value must be a string
      throw new JsonLdError('Invalid JSON-LD syntax; only strings may be language-tagged.', 'jsonld.SyntaxError', {
        code: 'invalid language-tagged value',
        element: rval
      });
    } else if (!types.every(t => _isAbsoluteIri(t) && !(_isString(t) && t.indexOf('_:') === 0) || _isEmptyObject(t))) {
      throw new JsonLdError('Invalid JSON-LD syntax; an element containing "@value" and "@type" ' + 'must have an absolute IRI for the value of "@type".', 'jsonld.SyntaxError', {
        code: 'invalid typed value',
        element: rval
      });
    }
  } else if ('@type' in rval && !_isArray(rval['@type'])) {
    // convert @type to an array
    rval['@type'] = [rval['@type']];
  } else if ('@set' in rval || '@list' in rval) {
    // handle @set and @list
    if (count > 1 && !(count === 2 && '@index' in rval)) {
      throw new JsonLdError('Invalid JSON-LD syntax; if an element has the property "@set" ' + 'or "@list", then it can have at most one other property that is ' + '"@index".', 'jsonld.SyntaxError', {
        code: 'invalid set or list object',
        element: rval
      });
    } // optimize away @set


    if ('@set' in rval) {
      rval = rval['@set'];
      keys = Object.keys(rval);
      count = keys.length;
    }
  } else if (count === 1 && '@language' in rval) {
    // drop objects with only @language unless custom mapped
    const mapped = await _expansionMap(rval, {
      unmappedValue: rval,
      activeCtx,
      activeProperty: _activeProperty,
      element,
      options: _options,
      insideList: _insideList
    });

    if (mapped !== undefined) {
      rval = mapped;
    } else {
      rval = null;
    }
  } // drop certain top-level objects that do not occur in lists, unless custom
  // mapped


  if (_isObject(rval) && !_options.keepFreeFloatingNodes && !_insideList && (_activeProperty === null || expandedActiveProperty === '@graph')) {
    // drop empty object, top-level @value/@list, or object with only @id
    if (count === 0 || '@value' in rval || '@list' in rval || count === 1 && '@id' in rval) {
      const mapped = await _expansionMap({
        unmappedValue: rval,
        activeCtx,
        activeProperty: _activeProperty,
        element,
        options: _options,
        insideList: _insideList
      });

      if (mapped !== undefined) {
        rval = mapped;
      } else {
        rval = null;
      }
    }
  }

  return rval;
};
/**
 * Expand each key and value of element adding to result
 *
 * @param activeCtx the context to use.
 * @param activeProperty the property for the element.
 * @param expandedActiveProperty the expansion of activeProperty
 * @param element the element to expand.
 * @param expandedParent the expanded result into which to add values.
 * @param options the expansion options.
 * @param insideList true if the element is a list, false if not.
 * @param typeKey first key found expanding to @type.
 * @param typeScopedContext the context before reverting.
 * @param expansionMap(info) a function that can be used to custom map
 *          unmappable values (or to throw an error when they are detected);
 *          if this function returns `undefined` then the default behavior
 *          will be used.
 */


async function _expandObject({
  activeCtx,
  activeProperty,
  expandedActiveProperty,
  element,
  expandedParent,
  options = {},
  insideList,
  typeKey,
  typeScopedContext,
  expansionMap
}) {
  const keys = Object.keys(element).sort();
  const nests = [];
  let unexpandedValue; // Figure out if this is the type for a JSON literal

  const isJsonType = element[typeKey] && _expandIri(activeCtx, _isArray(element[typeKey]) ? element[typeKey][0] : element[typeKey], {
    vocab: true,
    base: true
  }, options) === '@json';

  for (const key of keys) {
    let value = element[key];
    let expandedValue; // skip @context

    if (key === '@context') {
      continue;
    } // expand property


    let expandedProperty = _expandIri(activeCtx, key, {
      vocab: true,
      base: true
    }, options); // drop non-absolute IRI keys that aren't keywords unless custom mapped


    if (expandedProperty === null || !(_isAbsoluteIri(expandedProperty) || _isKeyword(expandedProperty))) {
      // TODO: use `await` to support async
      expandedProperty = expansionMap({
        unmappedProperty: key,
        activeCtx,
        activeProperty,
        parent: element,
        options,
        insideList,
        value,
        expandedParent
      });

      if (expandedProperty === undefined) {
        continue;
      }
    }

    if (_isKeyword(expandedProperty)) {
      if (expandedActiveProperty === '@reverse') {
        throw new JsonLdError('Invalid JSON-LD syntax; a keyword cannot be used as a @reverse ' + 'property.', 'jsonld.SyntaxError', {
          code: 'invalid reverse property map',
          value
        });
      }

      if (expandedProperty in expandedParent && expandedProperty !== '@included' && expandedProperty !== '@type') {
        throw new JsonLdError('Invalid JSON-LD syntax; colliding keywords detected.', 'jsonld.SyntaxError', {
          code: 'colliding keywords',
          keyword: expandedProperty
        });
      }
    } // syntax error if @id is not a string


    if (expandedProperty === '@id') {
      if (!_isString(value)) {
        if (!options.isFrame) {
          throw new JsonLdError('Invalid JSON-LD syntax; "@id" value must a string.', 'jsonld.SyntaxError', {
            code: 'invalid @id value',
            value
          });
        }

        if (_isObject(value)) {
          // empty object is a wildcard
          if (!_isEmptyObject(value)) {
            throw new JsonLdError('Invalid JSON-LD syntax; "@id" value an empty object or array ' + 'of strings, if framing', 'jsonld.SyntaxError', {
              code: 'invalid @id value',
              value
            });
          }
        } else if (_isArray(value)) {
          if (!value.every(v => _isString(v))) {
            throw new JsonLdError('Invalid JSON-LD syntax; "@id" value an empty object or array ' + 'of strings, if framing', 'jsonld.SyntaxError', {
              code: 'invalid @id value',
              value
            });
          }
        } else {
          throw new JsonLdError('Invalid JSON-LD syntax; "@id" value an empty object or array ' + 'of strings, if framing', 'jsonld.SyntaxError', {
            code: 'invalid @id value',
            value
          });
        }
      }

      _addValue(expandedParent, '@id', _asArray(value).map(v => _isString(v) ? _expandIri(activeCtx, v, {
        base: true
      }, options) : v), {
        propertyIsArray: options.isFrame
      });

      continue;
    }

    if (expandedProperty === '@type') {
      // if framing, can be a default object, but need to expand
      // key to determine that
      if (_isObject(value)) {
        value = Object.fromEntries(Object.entries(value).map(([k, v]) => [_expandIri(typeScopedContext, k, {
          vocab: true
        }), _asArray(v).map(vv => _expandIri(typeScopedContext, vv, {
          base: true,
          vocab: true
        }))]));
      }

      _validateTypeValue(value, options.isFrame);

      _addValue(expandedParent, '@type', _asArray(value).map(v => _isString(v) ? _expandIri(typeScopedContext, v, {
        base: true,
        vocab: true
      }, options) : v), {
        propertyIsArray: options.isFrame
      });

      continue;
    } // Included blocks are treated as an array of separate object nodes sharing
    // the same referencing active_property.
    // For 1.0, it is skipped as are other unknown keywords


    if (expandedProperty === '@included' && _processingMode(activeCtx, 1.1)) {
      const includedResult = _asArray(await api.expand({
        activeCtx,
        activeProperty,
        element: value,
        options,
        expansionMap
      })); // Expanded values must be node objects


      if (!includedResult.every(v => _isSubject(v))) {
        throw new JsonLdError('Invalid JSON-LD syntax; ' + 'values of @included must expand to node objects.', 'jsonld.SyntaxError', {
          code: 'invalid @included value',
          value
        });
      }

      _addValue(expandedParent, '@included', includedResult, {
        propertyIsArray: true
      });

      continue;
    } // @graph must be an array or an object


    if (expandedProperty === '@graph' && !(_isObject(value) || _isArray(value))) {
      throw new JsonLdError('Invalid JSON-LD syntax; "@graph" value must not be an ' + 'object or an array.', 'jsonld.SyntaxError', {
        code: 'invalid @graph value',
        value
      });
    }

    if (expandedProperty === '@value') {
      // capture value for later
      // "colliding keywords" check prevents this from being set twice
      unexpandedValue = value;

      if (isJsonType && _processingMode(activeCtx, 1.1)) {
        // no coercion to array, and retain all values
        expandedParent['@value'] = value;
      } else {
        _addValue(expandedParent, '@value', value, {
          propertyIsArray: options.isFrame
        });
      }

      continue;
    } // @language must be a string
    // it should match BCP47


    if (expandedProperty === '@language') {
      if (value === null) {
        // drop null @language values, they expand as if they didn't exist
        continue;
      }

      if (!_isString(value) && !options.isFrame) {
        throw new JsonLdError('Invalid JSON-LD syntax; "@language" value must be a string.', 'jsonld.SyntaxError', {
          code: 'invalid language-tagged string',
          value
        });
      } // ensure language value is lowercase


      value = _asArray(value).map(v => _isString(v) ? v.toLowerCase() : v); // ensure language tag matches BCP47

      for (const lang of value) {
        if (_isString(lang) && !lang.match(REGEX_BCP47)) {
          console.warn(`@language must be valid BCP47: ${lang}`);
        }
      }

      _addValue(expandedParent, '@language', value, {
        propertyIsArray: options.isFrame
      });

      continue;
    } // @direction must be "ltr" or "rtl"


    if (expandedProperty === '@direction') {
      if (!_isString(value) && !options.isFrame) {
        throw new JsonLdError('Invalid JSON-LD syntax; "@direction" value must be a string.', 'jsonld.SyntaxError', {
          code: 'invalid base direction',
          value
        });
      }

      value = _asArray(value); // ensure direction is "ltr" or "rtl"

      for (const dir of value) {
        if (_isString(dir) && dir !== 'ltr' && dir !== 'rtl') {
          throw new JsonLdError('Invalid JSON-LD syntax; "@direction" must be "ltr" or "rtl".', 'jsonld.SyntaxError', {
            code: 'invalid base direction',
            value
          });
        }
      }

      _addValue(expandedParent, '@direction', value, {
        propertyIsArray: options.isFrame
      });

      continue;
    } // @index must be a string


    if (expandedProperty === '@index') {
      if (!_isString(value)) {
        throw new JsonLdError('Invalid JSON-LD syntax; "@index" value must be a string.', 'jsonld.SyntaxError', {
          code: 'invalid @index value',
          value
        });
      }

      _addValue(expandedParent, '@index', value);

      continue;
    } // @reverse must be an object


    if (expandedProperty === '@reverse') {
      if (!_isObject(value)) {
        throw new JsonLdError('Invalid JSON-LD syntax; "@reverse" value must be an object.', 'jsonld.SyntaxError', {
          code: 'invalid @reverse value',
          value
        });
      }

      expandedValue = await api.expand({
        activeCtx,
        activeProperty: '@reverse',
        element: value,
        options,
        expansionMap
      }); // properties double-reversed

      if ('@reverse' in expandedValue) {
        for (const property in expandedValue['@reverse']) {
          _addValue(expandedParent, property, expandedValue['@reverse'][property], {
            propertyIsArray: true
          });
        }
      } // FIXME: can this be merged with code below to simplify?
      // merge in all reversed properties


      let reverseMap = expandedParent['@reverse'] || null;

      for (const property in expandedValue) {
        if (property === '@reverse') {
          continue;
        }

        if (reverseMap === null) {
          reverseMap = expandedParent['@reverse'] = {};
        }

        _addValue(reverseMap, property, [], {
          propertyIsArray: true
        });

        const items = expandedValue[property];

        for (let ii = 0; ii < items.length; ++ii) {
          const item = items[ii];

          if (_isValue(item) || _isList(item)) {
            throw new JsonLdError('Invalid JSON-LD syntax; "@reverse" value must not be a ' + '@value or an @list.', 'jsonld.SyntaxError', {
              code: 'invalid reverse property value',
              value: expandedValue
            });
          }

          _addValue(reverseMap, property, item, {
            propertyIsArray: true
          });
        }
      }

      continue;
    } // nested keys


    if (expandedProperty === '@nest') {
      nests.push(key);
      continue;
    } // use potential scoped context for key


    let termCtx = activeCtx;

    const ctx = _getContextValue(activeCtx, key, '@context');

    if (!_isUndefined(ctx)) {
      termCtx = await _processContext({
        activeCtx,
        localCtx: ctx,
        propagate: true,
        overrideProtected: true,
        options
      });
    }

    const container = _getContextValue(termCtx, key, '@container') || [];

    if (container.includes('@language') && _isObject(value)) {
      const direction = _getContextValue(termCtx, key, '@direction'); // handle language map container (skip if value is not an object)


      expandedValue = _expandLanguageMap(termCtx, value, direction, options);
    } else if (container.includes('@index') && _isObject(value)) {
      // handle index container (skip if value is not an object)
      const asGraph = container.includes('@graph');
      const indexKey = _getContextValue(termCtx, key, '@index') || '@index';

      const propertyIndex = indexKey !== '@index' && _expandIri(activeCtx, indexKey, {
        vocab: true,
        base: true
      }, options);

      expandedValue = await _expandIndexMap({
        activeCtx: termCtx,
        options,
        activeProperty: key,
        value,
        expansionMap,
        asGraph,
        indexKey,
        propertyIndex
      });
    } else if (container.includes('@id') && _isObject(value)) {
      // handle id container (skip if value is not an object)
      const asGraph = container.includes('@graph');
      expandedValue = await _expandIndexMap({
        activeCtx: termCtx,
        options,
        activeProperty: key,
        value,
        expansionMap,
        asGraph,
        indexKey: '@id'
      });
    } else if (container.includes('@type') && _isObject(value)) {
      // handle type container (skip if value is not an object)
      expandedValue = await _expandIndexMap({
        // since container is `@type`, revert type scoped context when expanding
        activeCtx: termCtx.revertToPreviousContext(),
        options,
        activeProperty: key,
        value,
        expansionMap,
        asGraph: false,
        indexKey: '@type'
      });
    } else {
      // recurse into @list or @set
      const isList = expandedProperty === '@list';

      if (isList || expandedProperty === '@set') {
        let nextActiveProperty = activeProperty;

        if (isList && expandedActiveProperty === '@graph') {
          nextActiveProperty = null;
        }

        expandedValue = await api.expand({
          activeCtx: termCtx,
          activeProperty: nextActiveProperty,
          element: value,
          options,
          insideList: isList,
          expansionMap
        });
      } else if (_getContextValue(activeCtx, key, '@type') === '@json') {
        expandedValue = {
          '@type': '@json',
          '@value': value
        };
      } else {
        // recursively expand value with key as new active property
        expandedValue = await api.expand({
          activeCtx: termCtx,
          activeProperty: key,
          element: value,
          options,
          insideList: false,
          expansionMap
        });
      }
    } // drop null values if property is not @value


    if (expandedValue === null && expandedProperty !== '@value') {
      // TODO: use `await` to support async
      expandedValue = expansionMap({
        unmappedValue: value,
        expandedProperty,
        activeCtx: termCtx,
        activeProperty,
        parent: element,
        options,
        insideList,
        key,
        expandedParent
      });

      if (expandedValue === undefined) {
        continue;
      }
    } // convert expanded value to @list if container specifies it


    if (expandedProperty !== '@list' && !_isList(expandedValue) && container.includes('@list')) {
      // ensure expanded value in @list is an array
      expandedValue = {
        '@list': _asArray(expandedValue)
      };
    } // convert expanded value to @graph if container specifies it
    // and value is not, itself, a graph
    // index cases handled above


    if (container.includes('@graph') && !container.some(key => key === '@id' || key === '@index')) {
      // ensure expanded values are arrays
      expandedValue = _asArray(expandedValue).map(v => ({
        '@graph': _asArray(v)
      }));
    } // FIXME: can this be merged with code above to simplify?
    // merge in reverse properties


    if (termCtx.mappings.has(key) && termCtx.mappings.get(key).reverse) {
      const reverseMap = expandedParent['@reverse'] = expandedParent['@reverse'] || {};
      expandedValue = _asArray(expandedValue);

      for (let ii = 0; ii < expandedValue.length; ++ii) {
        const item = expandedValue[ii];

        if (_isValue(item) || _isList(item)) {
          throw new JsonLdError('Invalid JSON-LD syntax; "@reverse" value must not be a ' + '@value or an @list.', 'jsonld.SyntaxError', {
            code: 'invalid reverse property value',
            value: expandedValue
          });
        }

        _addValue(reverseMap, expandedProperty, item, {
          propertyIsArray: true
        });
      }

      continue;
    } // add value for property
    // special keywords handled above


    _addValue(expandedParent, expandedProperty, expandedValue, {
      propertyIsArray: true
    });
  } // @value must not be an object or an array (unless framing) or if @type is
  // @json


  if ('@value' in expandedParent) {
    if (expandedParent['@type'] === '@json' && _processingMode(activeCtx, 1.1)) {// allow any value, to be verified when the object is fully expanded and
      // the @type is @json.
    } else if ((_isObject(unexpandedValue) || _isArray(unexpandedValue)) && !options.isFrame) {
      throw new JsonLdError('Invalid JSON-LD syntax; "@value" value must not be an ' + 'object or an array.', 'jsonld.SyntaxError', {
        code: 'invalid value object value',
        value: unexpandedValue
      });
    }
  } // expand each nested key


  for (const key of nests) {
    const nestedValues = _isArray(element[key]) ? element[key] : [element[key]];

    for (const nv of nestedValues) {
      if (!_isObject(nv) || Object.keys(nv).some(k => _expandIri(activeCtx, k, {
        vocab: true
      }, options) === '@value')) {
        throw new JsonLdError('Invalid JSON-LD syntax; nested value must be a node object.', 'jsonld.SyntaxError', {
          code: 'invalid @nest value',
          value: nv
        });
      }

      await _expandObject({
        activeCtx,
        activeProperty,
        expandedActiveProperty,
        element: nv,
        expandedParent,
        options,
        insideList,
        typeScopedContext,
        typeKey,
        expansionMap
      });
    }
  }
}
/**
 * Expands the given value by using the coercion and keyword rules in the
 * given context.
 *
 * @param activeCtx the active context to use.
 * @param activeProperty the active property the value is associated with.
 * @param value the value to expand.
 * @param {Object} [options] - processing options.
 *
 * @return the expanded value.
 */


function _expandValue({
  activeCtx,
  activeProperty,
  value,
  options
}) {
  // nothing to expand
  if (value === null || value === undefined) {
    return null;
  } // special-case expand @id and @type (skips '@id' expansion)


  const expandedProperty = _expandIri(activeCtx, activeProperty, {
    vocab: true
  }, options);

  if (expandedProperty === '@id') {
    return _expandIri(activeCtx, value, {
      base: true
    }, options);
  } else if (expandedProperty === '@type') {
    return _expandIri(activeCtx, value, {
      vocab: true,
      base: true
    }, options);
  } // get type definition from context


  const type = _getContextValue(activeCtx, activeProperty, '@type'); // do @id expansion (automatic for @graph)


  if ((type === '@id' || expandedProperty === '@graph') && _isString(value)) {
    return {
      '@id': _expandIri(activeCtx, value, {
        base: true
      }, options)
    };
  } // do @id expansion w/vocab


  if (type === '@vocab' && _isString(value)) {
    return {
      '@id': _expandIri(activeCtx, value, {
        vocab: true,
        base: true
      }, options)
    };
  } // do not expand keyword values


  if (_isKeyword(expandedProperty)) {
    return value;
  }

  const rval = {};

  if (type && !['@id', '@vocab', '@none'].includes(type)) {
    // other type
    rval['@type'] = type;
  } else if (_isString(value)) {
    // check for language tagging for strings
    const language = _getContextValue(activeCtx, activeProperty, '@language');

    if (language !== null) {
      rval['@language'] = language;
    }

    const direction = _getContextValue(activeCtx, activeProperty, '@direction');

    if (direction !== null) {
      rval['@direction'] = direction;
    }
  } // do conversion of values that aren't basic JSON types to strings


  if (!['boolean', 'number', 'string'].includes(typeof value)) {
    value = value.toString();
  }

  rval['@value'] = value;
  return rval;
}
/**
 * Expands a language map.
 *
 * @param activeCtx the active context to use.
 * @param languageMap the language map to expand.
 * @param direction the direction to apply to values.
 * @param {Object} [options] - processing options.
 *
 * @return the expanded language map.
 */


function _expandLanguageMap(activeCtx, languageMap, direction, options) {
  const rval = [];
  const keys = Object.keys(languageMap).sort();

  for (const key of keys) {
    const expandedKey = _expandIri(activeCtx, key, {
      vocab: true
    }, options);

    let val = languageMap[key];

    if (!_isArray(val)) {
      val = [val];
    }

    for (const item of val) {
      if (item === null) {
        // null values are allowed (8.5) but ignored (3.1)
        continue;
      }

      if (!_isString(item)) {
        throw new JsonLdError('Invalid JSON-LD syntax; language map values must be strings.', 'jsonld.SyntaxError', {
          code: 'invalid language map value',
          languageMap
        });
      }

      const _val = {
        '@value': item
      };

      if (expandedKey !== '@none') {
        _val['@language'] = key.toLowerCase();
      }

      if (direction) {
        _val['@direction'] = direction;
      }

      rval.push(_val);
    }
  }

  return rval;
}

async function _expandIndexMap({
  activeCtx,
  options,
  activeProperty,
  value,
  expansionMap,
  asGraph,
  indexKey,
  propertyIndex
}) {
  const rval = [];
  const keys = Object.keys(value).sort();
  const isTypeIndex = indexKey === '@type';

  for (let key of keys) {
    // if indexKey is @type, there may be a context defined for it
    if (isTypeIndex) {
      const ctx = _getContextValue(activeCtx, key, '@context');

      if (!_isUndefined(ctx)) {
        activeCtx = await _processContext({
          activeCtx,
          localCtx: ctx,
          propagate: false,
          options
        });
      }
    }

    let val = value[key];

    if (!_isArray(val)) {
      val = [val];
    }

    val = await api.expand({
      activeCtx,
      activeProperty,
      element: val,
      options,
      insideList: false,
      insideIndex: true,
      expansionMap
    }); // expand for @type, but also for @none

    let expandedKey;

    if (propertyIndex) {
      if (key === '@none') {
        expandedKey = '@none';
      } else {
        expandedKey = _expandValue({
          activeCtx,
          activeProperty: indexKey,
          value: key,
          options
        });
      }
    } else {
      expandedKey = _expandIri(activeCtx, key, {
        vocab: true
      }, options);
    }

    if (indexKey === '@id') {
      // expand document relative
      key = _expandIri(activeCtx, key, {
        base: true
      }, options);
    } else if (isTypeIndex) {
      key = expandedKey;
    }

    for (let item of val) {
      // If this is also a @graph container, turn items into graphs
      if (asGraph && !_isGraph(item)) {
        item = {
          '@graph': [item]
        };
      }

      if (indexKey === '@type') {
        if (expandedKey === '@none') {// ignore @none
        } else if (item['@type']) {
          item['@type'] = [key].concat(item['@type']);
        } else {
          item['@type'] = [key];
        }
      } else if (_isValue(item) && !['@language', '@type', '@index'].includes(indexKey)) {
        throw new JsonLdError('Invalid JSON-LD syntax; Attempt to add illegal key to value ' + `object: "${indexKey}".`, 'jsonld.SyntaxError', {
          code: 'invalid value object',
          value: item
        });
      } else if (propertyIndex) {
        // index is a property to be expanded, and values interpreted for that
        // property
        if (expandedKey !== '@none') {
          // expand key as a value
          _addValue(item, propertyIndex, expandedKey, {
            propertyIsArray: true,
            prependValue: true
          });
        }
      } else if (expandedKey !== '@none' && !(indexKey in item)) {
        item[indexKey] = key;
      }

      rval.push(item);
    }
  }

  return rval;
}

/***/ }),

/***/ "./lib/flatten.js":
/*!************************!*\
  !*** ./lib/flatten.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


__webpack_require__(/*! core-js/modules/es.array.sort.js */ "./node_modules/core-js/modules/es.array.sort.js");

const {
  isSubjectReference: _isSubjectReference
} = __webpack_require__(/*! ./graphTypes */ "./lib/graphTypes.js");

const {
  createMergedNodeMap: _createMergedNodeMap
} = __webpack_require__(/*! ./nodeMap */ "./lib/nodeMap.js");

const api = {};
module.exports = api;
/**
 * Performs JSON-LD flattening.
 *
 * @param input the expanded JSON-LD to flatten.
 *
 * @return the flattened output.
 */

api.flatten = input => {
  const defaultGraph = _createMergedNodeMap(input); // produce flattened output


  const flattened = [];
  const keys = Object.keys(defaultGraph).sort();

  for (let ki = 0; ki < keys.length; ++ki) {
    const node = defaultGraph[keys[ki]]; // only add full subjects to top-level

    if (!_isSubjectReference(node)) {
      flattened.push(node);
    }
  }

  return flattened;
};

/***/ }),

/***/ "./lib/frame.js":
/*!**********************!*\
  !*** ./lib/frame.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

__webpack_require__(/*! core-js/modules/es.array.sort.js */ "./node_modules/core-js/modules/es.array.sort.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

__webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const {
  isKeyword
} = __webpack_require__(/*! ./context */ "./lib/context.js");

const graphTypes = __webpack_require__(/*! ./graphTypes */ "./lib/graphTypes.js");

const types = __webpack_require__(/*! ./types */ "./lib/types.js");

const util = __webpack_require__(/*! ./util */ "./lib/util.js");

const url = __webpack_require__(/*! ./url */ "./lib/url.js");

const JsonLdError = __webpack_require__(/*! ./JsonLdError */ "./lib/JsonLdError.js");

const {
  createNodeMap: _createNodeMap,
  mergeNodeMapGraphs: _mergeNodeMapGraphs
} = __webpack_require__(/*! ./nodeMap */ "./lib/nodeMap.js");

const api = {};
module.exports = api;
/**
 * Performs JSON-LD `merged` framing.
 *
 * @param input the expanded JSON-LD to frame.
 * @param frame the expanded JSON-LD frame to use.
 * @param options the framing options.
 *
 * @return the framed output.
 */

api.frameMergedOrDefault = (input, frame, options) => {
  // create framing state
  const state = {
    options,
    embedded: false,
    graph: '@default',
    graphMap: {
      '@default': {}
    },
    subjectStack: [],
    link: {},
    bnodeMap: {}
  }; // produce a map of all graphs and name each bnode
  // FIXME: currently uses subjects from @merged graph only

  const issuer = new util.IdentifierIssuer('_:b');

  _createNodeMap(input, state.graphMap, '@default', issuer);

  if (options.merged) {
    state.graphMap['@merged'] = _mergeNodeMapGraphs(state.graphMap);
    state.graph = '@merged';
  }

  state.subjects = state.graphMap[state.graph]; // frame the subjects

  const framed = [];
  api.frame(state, Object.keys(state.subjects).sort(), frame, framed); // If pruning blank nodes, find those to prune

  if (options.pruneBlankNodeIdentifiers) {
    // remove all blank nodes appearing only once, done in compaction
    options.bnodesToClear = Object.keys(state.bnodeMap).filter(id => state.bnodeMap[id].length === 1);
  } // remove @preserve from results


  options.link = {};
  return _cleanupPreserve(framed, options);
};
/**
 * Frames subjects according to the given frame.
 *
 * @param state the current framing state.
 * @param subjects the subjects to filter.
 * @param frame the frame.
 * @param parent the parent subject or top-level array.
 * @param property the parent property, initialized to null.
 */


api.frame = (state, subjects, frame, parent, property = null) => {
  // validate the frame
  _validateFrame(frame);

  frame = frame[0]; // get flags for current frame

  const options = state.options;
  const flags = {
    embed: _getFrameFlag(frame, options, 'embed'),
    explicit: _getFrameFlag(frame, options, 'explicit'),
    requireAll: _getFrameFlag(frame, options, 'requireAll')
  }; // get link for current graph

  if (!state.link.hasOwnProperty(state.graph)) {
    state.link[state.graph] = {};
  }

  const link = state.link[state.graph]; // filter out subjects that match the frame

  const matches = _filterSubjects(state, subjects, frame, flags); // add matches to output


  const ids = Object.keys(matches).sort();

  for (const id of ids) {
    const subject = matches[id];
    /* Note: In order to treat each top-level match as a compartmentalized
    result, clear the unique embedded subjects map when the property is null,
    which only occurs at the top-level. */

    if (property === null) {
      state.uniqueEmbeds = {
        [state.graph]: {}
      };
    } else {
      state.uniqueEmbeds[state.graph] = state.uniqueEmbeds[state.graph] || {};
    }

    if (flags.embed === '@link' && id in link) {
      // TODO: may want to also match an existing linked subject against
      // the current frame ... so different frames could produce different
      // subjects that are only shared in-memory when the frames are the same
      // add existing linked subject
      _addFrameOutput(parent, property, link[id]);

      continue;
    } // start output for subject


    const output = {
      '@id': id
    };

    if (id.indexOf('_:') === 0) {
      util.addValue(state.bnodeMap, id, output, {
        propertyIsArray: true
      });
    }

    link[id] = output; // validate @embed

    if ((flags.embed === '@first' || flags.embed === '@last') && state.is11) {
      throw new JsonLdError('Invalid JSON-LD syntax; invalid value of @embed.', 'jsonld.SyntaxError', {
        code: 'invalid @embed value',
        frame
      });
    }

    if (!state.embedded && state.uniqueEmbeds[state.graph].hasOwnProperty(id)) {
      // skip adding this node object to the top level, as it was
      // already included in another node object
      continue;
    } // if embed is @never or if a circular reference would be created by an
    // embed, the subject cannot be embedded, just add the reference;
    // note that a circular reference won't occur when the embed flag is
    // `@link` as the above check will short-circuit before reaching this point


    if (state.embedded && (flags.embed === '@never' || _createsCircularReference(subject, state.graph, state.subjectStack))) {
      _addFrameOutput(parent, property, output);

      continue;
    } // if only the first (or once) should be embedded


    if (state.embedded && (flags.embed == '@first' || flags.embed == '@once') && state.uniqueEmbeds[state.graph].hasOwnProperty(id)) {
      _addFrameOutput(parent, property, output);

      continue;
    } // if only the last match should be embedded


    if (flags.embed === '@last') {
      // remove any existing embed
      if (id in state.uniqueEmbeds[state.graph]) {
        _removeEmbed(state, id);
      }
    }

    state.uniqueEmbeds[state.graph][id] = {
      parent,
      property
    }; // push matching subject onto stack to enable circular embed checks

    state.subjectStack.push({
      subject,
      graph: state.graph
    }); // subject is also the name of a graph

    if (id in state.graphMap) {
      let recurse = false;
      let subframe = null;

      if (!('@graph' in frame)) {
        recurse = state.graph !== '@merged';
        subframe = {};
      } else {
        subframe = frame['@graph'][0];
        recurse = !(id === '@merged' || id === '@default');

        if (!types.isObject(subframe)) {
          subframe = {};
        }
      }

      if (recurse) {
        // recurse into graph
        api.frame(_objectSpread(_objectSpread({}, state), {}, {
          graph: id,
          embedded: false
        }), Object.keys(state.graphMap[id]).sort(), [subframe], output, '@graph');
      }
    } // if frame has @included, recurse over its sub-frame


    if ('@included' in frame) {
      api.frame(_objectSpread(_objectSpread({}, state), {}, {
        embedded: false
      }), subjects, frame['@included'], output, '@included');
    } // iterate over subject properties


    for (const prop of Object.keys(subject).sort()) {
      // copy keywords to output
      if (isKeyword(prop)) {
        output[prop] = util.clone(subject[prop]);

        if (prop === '@type') {
          // count bnode values of @type
          for (const type of subject['@type']) {
            if (type.indexOf('_:') === 0) {
              util.addValue(state.bnodeMap, type, output, {
                propertyIsArray: true
              });
            }
          }
        }

        continue;
      } // explicit is on and property isn't in the frame, skip processing


      if (flags.explicit && !(prop in frame)) {
        continue;
      } // add objects


      for (const o of subject[prop]) {
        const subframe = prop in frame ? frame[prop] : _createImplicitFrame(flags); // recurse into list

        if (graphTypes.isList(o)) {
          const _subframe = frame[prop] && frame[prop][0] && frame[prop][0]['@list'] ? frame[prop][0]['@list'] : _createImplicitFrame(flags); // add empty list


          const list = {
            '@list': []
          };

          _addFrameOutput(output, prop, list); // add list objects


          const src = o['@list'];

          for (const oo of src) {
            if (graphTypes.isSubjectReference(oo)) {
              // recurse into subject reference
              api.frame(_objectSpread(_objectSpread({}, state), {}, {
                embedded: true
              }), [oo['@id']], _subframe, list, '@list');
            } else {
              // include other values automatically
              _addFrameOutput(list, '@list', util.clone(oo));
            }
          }
        } else if (graphTypes.isSubjectReference(o)) {
          // recurse into subject reference
          api.frame(_objectSpread(_objectSpread({}, state), {}, {
            embedded: true
          }), [o['@id']], subframe, output, prop);
        } else if (_valueMatch(subframe[0], o)) {
          // include other values, if they match
          _addFrameOutput(output, prop, util.clone(o));
        }
      }
    } // handle defaults


    for (const prop of Object.keys(frame).sort()) {
      // skip keywords
      if (prop === '@type') {
        if (!types.isObject(frame[prop][0]) || !('@default' in frame[prop][0])) {
          continue;
        } // allow through default types

      } else if (isKeyword(prop)) {
        continue;
      } // if omit default is off, then include default values for properties
      // that appear in the next frame but are not in the matching subject


      const next = frame[prop][0] || {};

      const omitDefaultOn = _getFrameFlag(next, options, 'omitDefault');

      if (!omitDefaultOn && !(prop in output)) {
        let preserve = '@null';

        if ('@default' in next) {
          preserve = util.clone(next['@default']);
        }

        if (!types.isArray(preserve)) {
          preserve = [preserve];
        }

        output[prop] = [{
          '@preserve': preserve
        }];
      }
    } // if embed reverse values by finding nodes having this subject as a value
    // of the associated property


    for (const reverseProp of Object.keys(frame['@reverse'] || {}).sort()) {
      const subframe = frame['@reverse'][reverseProp];

      for (const _subject of Object.keys(state.subjects)) {
        const nodeValues = util.getValues(state.subjects[_subject], reverseProp);

        if (nodeValues.some(v => v['@id'] === id)) {
          // node has property referencing this subject, recurse
          output['@reverse'] = output['@reverse'] || {};
          util.addValue(output['@reverse'], reverseProp, [], {
            propertyIsArray: true
          });
          api.frame(_objectSpread(_objectSpread({}, state), {}, {
            embedded: true
          }), [_subject], subframe, output['@reverse'][reverseProp], property);
        }
      }
    } // add output to parent


    _addFrameOutput(parent, property, output); // pop matching subject from circular ref-checking stack


    state.subjectStack.pop();
  }
};
/**
 * Replace `@null` with `null`, removing it from arrays.
 *
 * @param input the framed, compacted output.
 * @param options the framing options used.
 *
 * @return the resulting output.
 */


api.cleanupNull = (input, options) => {
  // recurse through arrays
  if (types.isArray(input)) {
    const noNulls = input.map(v => api.cleanupNull(v, options));
    return noNulls.filter(v => v); // removes nulls from array
  }

  if (input === '@null') {
    return null;
  }

  if (types.isObject(input)) {
    // handle in-memory linked nodes
    if ('@id' in input) {
      const id = input['@id'];

      if (options.link.hasOwnProperty(id)) {
        const idx = options.link[id].indexOf(input);

        if (idx !== -1) {
          // already visited
          return options.link[id][idx];
        } // prevent circular visitation


        options.link[id].push(input);
      } else {
        // prevent circular visitation
        options.link[id] = [input];
      }
    }

    for (const key in input) {
      input[key] = api.cleanupNull(input[key], options);
    }
  }

  return input;
};
/**
 * Creates an implicit frame when recursing through subject matches. If
 * a frame doesn't have an explicit frame for a particular property, then
 * a wildcard child frame will be created that uses the same flags that the
 * parent frame used.
 *
 * @param flags the current framing flags.
 *
 * @return the implicit frame.
 */


function _createImplicitFrame(flags) {
  const frame = {};

  for (const key in flags) {
    if (flags[key] !== undefined) {
      frame['@' + key] = [flags[key]];
    }
  }

  return [frame];
}
/**
 * Checks the current subject stack to see if embedding the given subject
 * would cause a circular reference.
 *
 * @param subjectToEmbed the subject to embed.
 * @param graph the graph the subject to embed is in.
 * @param subjectStack the current stack of subjects.
 *
 * @return true if a circular reference would be created, false if not.
 */


function _createsCircularReference(subjectToEmbed, graph, subjectStack) {
  for (let i = subjectStack.length - 1; i >= 0; --i) {
    const subject = subjectStack[i];

    if (subject.graph === graph && subject.subject['@id'] === subjectToEmbed['@id']) {
      return true;
    }
  }

  return false;
}
/**
 * Gets the frame flag value for the given flag name.
 *
 * @param frame the frame.
 * @param options the framing options.
 * @param name the flag name.
 *
 * @return the flag value.
 */


function _getFrameFlag(frame, options, name) {
  const flag = '@' + name;
  let rval = flag in frame ? frame[flag][0] : options[name];

  if (name === 'embed') {
    // default is "@last"
    // backwards-compatibility support for "embed" maps:
    // true => "@last"
    // false => "@never"
    if (rval === true) {
      rval = '@once';
    } else if (rval === false) {
      rval = '@never';
    } else if (rval !== '@always' && rval !== '@never' && rval !== '@link' && rval !== '@first' && rval !== '@last' && rval !== '@once') {
      throw new JsonLdError('Invalid JSON-LD syntax; invalid value of @embed.', 'jsonld.SyntaxError', {
        code: 'invalid @embed value',
        frame
      });
    }
  }

  return rval;
}
/**
 * Validates a JSON-LD frame, throwing an exception if the frame is invalid.
 *
 * @param frame the frame to validate.
 */


function _validateFrame(frame) {
  if (!types.isArray(frame) || frame.length !== 1 || !types.isObject(frame[0])) {
    throw new JsonLdError('Invalid JSON-LD syntax; a JSON-LD frame must be a single object.', 'jsonld.SyntaxError', {
      frame
    });
  }

  if ('@id' in frame[0]) {
    for (const id of util.asArray(frame[0]['@id'])) {
      // @id must be wildcard or an IRI
      if (!(types.isObject(id) || url.isAbsolute(id)) || types.isString(id) && id.indexOf('_:') === 0) {
        throw new JsonLdError('Invalid JSON-LD syntax; invalid @id in frame.', 'jsonld.SyntaxError', {
          code: 'invalid frame',
          frame
        });
      }
    }
  }

  if ('@type' in frame[0]) {
    for (const type of util.asArray(frame[0]['@type'])) {
      // @id must be wildcard or an IRI
      if (!(types.isObject(type) || url.isAbsolute(type)) || types.isString(type) && type.indexOf('_:') === 0) {
        throw new JsonLdError('Invalid JSON-LD syntax; invalid @type in frame.', 'jsonld.SyntaxError', {
          code: 'invalid frame',
          frame
        });
      }
    }
  }
}
/**
 * Returns a map of all of the subjects that match a parsed frame.
 *
 * @param state the current framing state.
 * @param subjects the set of subjects to filter.
 * @param frame the parsed frame.
 * @param flags the frame flags.
 *
 * @return all of the matched subjects.
 */


function _filterSubjects(state, subjects, frame, flags) {
  // filter subjects in @id order
  const rval = {};

  for (const id of subjects) {
    const subject = state.graphMap[state.graph][id];

    if (_filterSubject(state, subject, frame, flags)) {
      rval[id] = subject;
    }
  }

  return rval;
}
/**
 * Returns true if the given subject matches the given frame.
 *
 * Matches either based on explicit type inclusion where the node has any
 * type listed in the frame. If the frame has empty types defined matches
 * nodes not having a @type. If the frame has a type of {} defined matches
 * nodes having any type defined.
 *
 * Otherwise, does duck typing, where the node must have all of the
 * properties defined in the frame.
 *
 * @param state the current framing state.
 * @param subject the subject to check.
 * @param frame the frame to check.
 * @param flags the frame flags.
 *
 * @return true if the subject matches, false if not.
 */


function _filterSubject(state, subject, frame, flags) {
  // check ducktype
  let wildcard = true;
  let matchesSome = false;

  for (const key in frame) {
    let matchThis = false;
    const nodeValues = util.getValues(subject, key);
    const isEmpty = util.getValues(frame, key).length === 0;

    if (key === '@id') {
      // match on no @id or any matching @id, including wildcard
      if (types.isEmptyObject(frame['@id'][0] || {})) {
        matchThis = true;
      } else if (frame['@id'].length >= 0) {
        matchThis = frame['@id'].includes(nodeValues[0]);
      }

      if (!flags.requireAll) {
        return matchThis;
      }
    } else if (key === '@type') {
      // check @type (object value means 'any' type,
      // fall through to ducktyping)
      wildcard = false;

      if (isEmpty) {
        if (nodeValues.length > 0) {
          // don't match on no @type
          return false;
        }

        matchThis = true;
      } else if (frame['@type'].length === 1 && types.isEmptyObject(frame['@type'][0])) {
        // match on wildcard @type if there is a type
        matchThis = nodeValues.length > 0;
      } else {
        // match on a specific @type
        for (const type of frame['@type']) {
          if (types.isObject(type) && '@default' in type) {
            // match on default object
            matchThis = true;
          } else {
            matchThis = matchThis || nodeValues.some(tt => tt === type);
          }
        }
      }

      if (!flags.requireAll) {
        return matchThis;
      }
    } else if (isKeyword(key)) {
      continue;
    } else {
      // Force a copy of this frame entry so it can be manipulated
      const thisFrame = util.getValues(frame, key)[0];
      let hasDefault = false;

      if (thisFrame) {
        _validateFrame([thisFrame]);

        hasDefault = '@default' in thisFrame;
      } // no longer a wildcard pattern if frame has any non-keyword properties


      wildcard = false; // skip, but allow match if node has no value for property, and frame has
      // a default value

      if (nodeValues.length === 0 && hasDefault) {
        continue;
      } // if frame value is empty, don't match if subject has any value


      if (nodeValues.length > 0 && isEmpty) {
        return false;
      }

      if (thisFrame === undefined) {
        // node does not match if values is not empty and the value of property
        // in frame is match none.
        if (nodeValues.length > 0) {
          return false;
        }

        matchThis = true;
      } else {
        if (graphTypes.isList(thisFrame)) {
          const listValue = thisFrame['@list'][0];

          if (graphTypes.isList(nodeValues[0])) {
            const nodeListValues = nodeValues[0]['@list'];

            if (graphTypes.isValue(listValue)) {
              // match on any matching value
              matchThis = nodeListValues.some(lv => _valueMatch(listValue, lv));
            } else if (graphTypes.isSubject(listValue) || graphTypes.isSubjectReference(listValue)) {
              matchThis = nodeListValues.some(lv => _nodeMatch(state, listValue, lv, flags));
            }
          }
        } else if (graphTypes.isValue(thisFrame)) {
          matchThis = nodeValues.some(nv => _valueMatch(thisFrame, nv));
        } else if (graphTypes.isSubjectReference(thisFrame)) {
          matchThis = nodeValues.some(nv => _nodeMatch(state, thisFrame, nv, flags));
        } else if (types.isObject(thisFrame)) {
          matchThis = nodeValues.length > 0;
        } else {
          matchThis = false;
        }
      }
    } // all non-defaulted values must match if requireAll is set


    if (!matchThis && flags.requireAll) {
      return false;
    }

    matchesSome = matchesSome || matchThis;
  } // return true if wildcard or subject matches some properties


  return wildcard || matchesSome;
}
/**
 * Removes an existing embed.
 *
 * @param state the current framing state.
 * @param id the @id of the embed to remove.
 */


function _removeEmbed(state, id) {
  // get existing embed
  const embeds = state.uniqueEmbeds[state.graph];
  const embed = embeds[id];
  const parent = embed.parent;
  const property = embed.property; // create reference to replace embed

  const subject = {
    '@id': id
  }; // remove existing embed

  if (types.isArray(parent)) {
    // replace subject with reference
    for (let i = 0; i < parent.length; ++i) {
      if (util.compareValues(parent[i], subject)) {
        parent[i] = subject;
        break;
      }
    }
  } else {
    // replace subject with reference
    const useArray = types.isArray(parent[property]);
    util.removeValue(parent, property, subject, {
      propertyIsArray: useArray
    });
    util.addValue(parent, property, subject, {
      propertyIsArray: useArray
    });
  } // recursively remove dependent dangling embeds


  const removeDependents = id => {
    // get embed keys as a separate array to enable deleting keys in map
    const ids = Object.keys(embeds);

    for (const next of ids) {
      if (next in embeds && types.isObject(embeds[next].parent) && embeds[next].parent['@id'] === id) {
        delete embeds[next];
        removeDependents(next);
      }
    }
  };

  removeDependents(id);
}
/**
 * Removes the @preserve keywords from expanded result of framing.
 *
 * @param input the framed, framed output.
 * @param options the framing options used.
 *
 * @return the resulting output.
 */


function _cleanupPreserve(input, options) {
  // recurse through arrays
  if (types.isArray(input)) {
    return input.map(value => _cleanupPreserve(value, options));
  }

  if (types.isObject(input)) {
    // remove @preserve
    if ('@preserve' in input) {
      return input['@preserve'][0];
    } // skip @values


    if (graphTypes.isValue(input)) {
      return input;
    } // recurse through @lists


    if (graphTypes.isList(input)) {
      input['@list'] = _cleanupPreserve(input['@list'], options);
      return input;
    } // handle in-memory linked nodes


    if ('@id' in input) {
      const id = input['@id'];

      if (options.link.hasOwnProperty(id)) {
        const idx = options.link[id].indexOf(input);

        if (idx !== -1) {
          // already visited
          return options.link[id][idx];
        } // prevent circular visitation


        options.link[id].push(input);
      } else {
        // prevent circular visitation
        options.link[id] = [input];
      }
    } // recurse through properties


    for (const prop in input) {
      // potentially remove the id, if it is an unreference bnode
      if (prop === '@id' && options.bnodesToClear.includes(input[prop])) {
        delete input['@id'];
        continue;
      }

      input[prop] = _cleanupPreserve(input[prop], options);
    }
  }

  return input;
}
/**
 * Adds framing output to the given parent.
 *
 * @param parent the parent to add to.
 * @param property the parent property.
 * @param output the output to add.
 */


function _addFrameOutput(parent, property, output) {
  if (types.isObject(parent)) {
    util.addValue(parent, property, output, {
      propertyIsArray: true
    });
  } else {
    parent.push(output);
  }
}
/**
 * Node matches if it is a node, and matches the pattern as a frame.
 *
 * @param state the current framing state.
 * @param pattern used to match value
 * @param value to check
 * @param flags the frame flags.
 */


function _nodeMatch(state, pattern, value, flags) {
  if (!('@id' in value)) {
    return false;
  }

  const nodeObject = state.subjects[value['@id']];
  return nodeObject && _filterSubject(state, nodeObject, pattern, flags);
}
/**
 * Value matches if it is a value and matches the value pattern
 *
 * * `pattern` is empty
 * * @values are the same, or `pattern[@value]` is a wildcard, and
 * * @types are the same or `value[@type]` is not null
 *   and `pattern[@type]` is `{}`, or `value[@type]` is null
 *   and `pattern[@type]` is null or `[]`, and
 * * @languages are the same or `value[@language]` is not null
 *   and `pattern[@language]` is `{}`, or `value[@language]` is null
 *   and `pattern[@language]` is null or `[]`.
 *
 * @param pattern used to match value
 * @param value to check
 */


function _valueMatch(pattern, value) {
  const v1 = value['@value'];
  const t1 = value['@type'];
  const l1 = value['@language'];
  const v2 = pattern['@value'] ? types.isArray(pattern['@value']) ? pattern['@value'] : [pattern['@value']] : [];
  const t2 = pattern['@type'] ? types.isArray(pattern['@type']) ? pattern['@type'] : [pattern['@type']] : [];
  const l2 = pattern['@language'] ? types.isArray(pattern['@language']) ? pattern['@language'] : [pattern['@language']] : [];

  if (v2.length === 0 && t2.length === 0 && l2.length === 0) {
    return true;
  }

  if (!(v2.includes(v1) || types.isEmptyObject(v2[0]))) {
    return false;
  }

  if (!(!t1 && t2.length === 0 || t2.includes(t1) || t1 && types.isEmptyObject(t2[0]))) {
    return false;
  }

  if (!(!l1 && l2.length === 0 || l2.includes(l1) || l1 && types.isEmptyObject(l2[0]))) {
    return false;
  }

  return true;
}

/***/ }),

/***/ "./lib/fromRdf.js":
/*!************************!*\
  !*** ./lib/fromRdf.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


__webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

__webpack_require__(/*! core-js/modules/es.string.ends-with.js */ "./node_modules/core-js/modules/es.string.ends-with.js");

__webpack_require__(/*! core-js/modules/es.array.reverse.js */ "./node_modules/core-js/modules/es.array.reverse.js");

__webpack_require__(/*! core-js/modules/es.array.sort.js */ "./node_modules/core-js/modules/es.array.sort.js");

__webpack_require__(/*! core-js/modules/es.number.to-fixed.js */ "./node_modules/core-js/modules/es.number.to-fixed.js");

__webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");

__webpack_require__(/*! core-js/modules/es.string.starts-with.js */ "./node_modules/core-js/modules/es.string.starts-with.js");

__webpack_require__(/*! core-js/modules/es.string.split.js */ "./node_modules/core-js/modules/es.string.split.js");

__webpack_require__(/*! core-js/modules/es.string.match.js */ "./node_modules/core-js/modules/es.string.match.js");

const JsonLdError = __webpack_require__(/*! ./JsonLdError */ "./lib/JsonLdError.js");

const graphTypes = __webpack_require__(/*! ./graphTypes */ "./lib/graphTypes.js");

const types = __webpack_require__(/*! ./types */ "./lib/types.js");

const util = __webpack_require__(/*! ./util */ "./lib/util.js"); // constants


const {
  // RDF,
  RDF_LIST,
  RDF_FIRST,
  RDF_REST,
  RDF_NIL,
  RDF_TYPE,
  // RDF_PLAIN_LITERAL,
  // RDF_XML_LITERAL,
  RDF_JSON_LITERAL,
  // RDF_OBJECT,
  // RDF_LANGSTRING,
  // XSD,
  XSD_BOOLEAN,
  XSD_DOUBLE,
  XSD_INTEGER,
  XSD_STRING
} = __webpack_require__(/*! ./constants */ "./lib/constants.js");

const REGEX_BCP47 = /^[a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*$/;
const api = {};
module.exports = api;
/**
 * Converts an RDF dataset to JSON-LD.
 *
 * @param dataset the RDF dataset.
 * @param options the RDF serialization options.
 *
 * @return a Promise that resolves to the JSON-LD output.
 */

api.fromRDF = async (dataset, {
  useRdfType: _useRdfType = false,
  useNativeTypes: _useNativeTypes = false,
  rdfDirection: _rdfDirection = null
}) => {
  const defaultGraph = {};
  const graphMap = {
    '@default': defaultGraph
  };
  const referencedOnce = {};

  for (const quad of dataset) {
    // TODO: change 'name' to 'graph'
    const name = quad.graph.termType === 'DefaultGraph' ? '@default' : quad.graph.value;

    if (!(name in graphMap)) {
      graphMap[name] = {};
    }

    if (name !== '@default' && !(name in defaultGraph)) {
      defaultGraph[name] = {
        '@id': name
      };
    }

    const nodeMap = graphMap[name]; // get subject, predicate, object

    const s = quad.subject.value;
    const p = quad.predicate.value;
    const o = quad.object;

    if (!(s in nodeMap)) {
      nodeMap[s] = {
        '@id': s
      };
    }

    const node = nodeMap[s];
    const objectIsNode = o.termType.endsWith('Node');

    if (objectIsNode && !(o.value in nodeMap)) {
      nodeMap[o.value] = {
        '@id': o.value
      };
    }

    if (p === RDF_TYPE && !_useRdfType && objectIsNode) {
      util.addValue(node, '@type', o.value, {
        propertyIsArray: true
      });
      continue;
    }

    const value = _RDFToObject(o, _useNativeTypes, _rdfDirection);

    util.addValue(node, p, value, {
      propertyIsArray: true
    }); // object may be an RDF list/partial list node but we can't know easily
    // until all triples are read

    if (objectIsNode) {
      if (o.value === RDF_NIL) {
        // track rdf:nil uniquely per graph
        const object = nodeMap[o.value];

        if (!('usages' in object)) {
          object.usages = [];
        }

        object.usages.push({
          node,
          property: p,
          value
        });
      } else if (o.value in referencedOnce) {
        // object referenced more than once
        referencedOnce[o.value] = false;
      } else {
        // keep track of single reference
        referencedOnce[o.value] = {
          node,
          property: p,
          value
        };
      }
    }
  }
  /*
  for(let name in dataset) {
    const graph = dataset[name];
    if(!(name in graphMap)) {
      graphMap[name] = {};
    }
    if(name !== '@default' && !(name in defaultGraph)) {
      defaultGraph[name] = {'@id': name};
    }
    const nodeMap = graphMap[name];
    for(let ti = 0; ti < graph.length; ++ti) {
      const triple = graph[ti];
       // get subject, predicate, object
      const s = triple.subject.value;
      const p = triple.predicate.value;
      const o = triple.object;
       if(!(s in nodeMap)) {
        nodeMap[s] = {'@id': s};
      }
      const node = nodeMap[s];
       const objectIsId = (o.type === 'IRI' || o.type === 'blank node');
      if(objectIsId && !(o.value in nodeMap)) {
        nodeMap[o.value] = {'@id': o.value};
      }
       if(p === RDF_TYPE && !useRdfType && objectIsId) {
        util.addValue(node, '@type', o.value, {propertyIsArray: true});
        continue;
      }
       const value = _RDFToObject(o, useNativeTypes);
      util.addValue(node, p, value, {propertyIsArray: true});
       // object may be an RDF list/partial list node but we can't know easily
      // until all triples are read
      if(objectIsId) {
        if(o.value === RDF_NIL) {
          // track rdf:nil uniquely per graph
          const object = nodeMap[o.value];
          if(!('usages' in object)) {
            object.usages = [];
          }
          object.usages.push({
            node: node,
            property: p,
            value: value
          });
        } else if(o.value in referencedOnce) {
          // object referenced more than once
          referencedOnce[o.value] = false;
        } else {
          // keep track of single reference
          referencedOnce[o.value] = {
            node: node,
            property: p,
            value: value
          };
        }
      }
    }
  }*/
  // convert linked lists to @list arrays


  for (const name in graphMap) {
    const graphObject = graphMap[name]; // no @lists to be converted, continue

    if (!(RDF_NIL in graphObject)) {
      continue;
    } // iterate backwards through each RDF list


    const nil = graphObject[RDF_NIL];

    if (!nil.usages) {
      continue;
    }

    for (let usage of nil.usages) {
      let node = usage.node;
      let property = usage.property;
      let head = usage.value;
      const list = [];
      const listNodes = []; // ensure node is a well-formed list node; it must:
      // 1. Be referenced only once.
      // 2. Have an array for rdf:first that has 1 item.
      // 3. Have an array for rdf:rest that has 1 item.
      // 4. Have no keys other than: @id, rdf:first, rdf:rest, and,
      //   optionally, @type where the value is rdf:List.

      let nodeKeyCount = Object.keys(node).length;

      while (property === RDF_REST && types.isObject(referencedOnce[node['@id']]) && types.isArray(node[RDF_FIRST]) && node[RDF_FIRST].length === 1 && types.isArray(node[RDF_REST]) && node[RDF_REST].length === 1 && (nodeKeyCount === 3 || nodeKeyCount === 4 && types.isArray(node['@type']) && node['@type'].length === 1 && node['@type'][0] === RDF_LIST)) {
        list.push(node[RDF_FIRST][0]);
        listNodes.push(node['@id']); // get next node, moving backwards through list

        usage = referencedOnce[node['@id']];
        node = usage.node;
        property = usage.property;
        head = usage.value;
        nodeKeyCount = Object.keys(node).length; // if node is not a blank node, then list head found

        if (!graphTypes.isBlankNode(node)) {
          break;
        }
      } // transform list into @list object


      delete head['@id'];
      head['@list'] = list.reverse();

      for (const listNode of listNodes) {
        delete graphObject[listNode];
      }
    }

    delete nil.usages;
  }

  const result = [];
  const subjects = Object.keys(defaultGraph).sort();

  for (const subject of subjects) {
    const node = defaultGraph[subject];

    if (subject in graphMap) {
      const graph = node['@graph'] = [];
      const graphObject = graphMap[subject];
      const graphSubjects = Object.keys(graphObject).sort();

      for (const graphSubject of graphSubjects) {
        const _node = graphObject[graphSubject]; // only add full subjects to top-level

        if (!graphTypes.isSubjectReference(_node)) {
          graph.push(_node);
        }
      }
    } // only add full subjects to top-level


    if (!graphTypes.isSubjectReference(node)) {
      result.push(node);
    }
  }

  return result;
};
/**
 * Converts an RDF triple object to a JSON-LD object.
 *
 * @param o the RDF triple object to convert.
 * @param useNativeTypes true to output native types, false not to.
 *
 * @return the JSON-LD object.
 */


function _RDFToObject(o, useNativeTypes, rdfDirection) {
  // convert NamedNode/BlankNode object to JSON-LD
  if (o.termType.endsWith('Node')) {
    return {
      '@id': o.value
    };
  } // convert literal to JSON-LD


  const rval = {
    '@value': o.value
  }; // add language

  if (o.language) {
    rval['@language'] = o.language;
  } else {
    let type = o.datatype.value;

    if (!type) {
      type = XSD_STRING;
    }

    if (type === RDF_JSON_LITERAL) {
      type = '@json';

      try {
        rval['@value'] = JSON.parse(rval['@value']);
      } catch (e) {
        throw new JsonLdError('JSON literal could not be parsed.', 'jsonld.InvalidJsonLiteral', {
          code: 'invalid JSON literal',
          value: rval['@value'],
          cause: e
        });
      }
    } // use native types for certain xsd types


    if (useNativeTypes) {
      if (type === XSD_BOOLEAN) {
        if (rval['@value'] === 'true') {
          rval['@value'] = true;
        } else if (rval['@value'] === 'false') {
          rval['@value'] = false;
        }
      } else if (types.isNumeric(rval['@value'])) {
        if (type === XSD_INTEGER) {
          const i = parseInt(rval['@value'], 10);

          if (i.toFixed(0) === rval['@value']) {
            rval['@value'] = i;
          }
        } else if (type === XSD_DOUBLE) {
          rval['@value'] = parseFloat(rval['@value']);
        }
      } // do not add native type


      if (![XSD_BOOLEAN, XSD_INTEGER, XSD_DOUBLE, XSD_STRING].includes(type)) {
        rval['@type'] = type;
      }
    } else if (rdfDirection === 'i18n-datatype' && type.startsWith('https://www.w3.org/ns/i18n#')) {
      const [, language, direction] = type.split(/[#_]/);

      if (language.length > 0) {
        rval['@language'] = language;

        if (!language.match(REGEX_BCP47)) {
          console.warn(`@language must be valid BCP47: ${language}`);
        }
      }

      rval['@direction'] = direction;
    } else if (type !== XSD_STRING) {
      rval['@type'] = type;
    }
  }

  return rval;
}

/***/ }),

/***/ "./lib/graphTypes.js":
/*!***************************!*\
  !*** ./lib/graphTypes.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


const types = __webpack_require__(/*! ./types */ "./lib/types.js");

const api = {};
module.exports = api;
/**
 * Returns true if the given value is a subject with properties.
 *
 * @param v the value to check.
 *
 * @return true if the value is a subject with properties, false if not.
 */

api.isSubject = v => {
  // Note: A value is a subject if all of these hold true:
  // 1. It is an Object.
  // 2. It is not a @value, @set, or @list.
  // 3. It has more than 1 key OR any existing key is not @id.
  if (types.isObject(v) && !('@value' in v || '@set' in v || '@list' in v)) {
    const keyCount = Object.keys(v).length;
    return keyCount > 1 || !('@id' in v);
  }

  return false;
};
/**
 * Returns true if the given value is a subject reference.
 *
 * @param v the value to check.
 *
 * @return true if the value is a subject reference, false if not.
 */


api.isSubjectReference = v => // Note: A value is a subject reference if all of these hold true:
// 1. It is an Object.
// 2. It has a single key: @id.
types.isObject(v) && Object.keys(v).length === 1 && '@id' in v;
/**
 * Returns true if the given value is a @value.
 *
 * @param v the value to check.
 *
 * @return true if the value is a @value, false if not.
 */


api.isValue = v => // Note: A value is a @value if all of these hold true:
// 1. It is an Object.
// 2. It has the @value property.
types.isObject(v) && '@value' in v;
/**
 * Returns true if the given value is a @list.
 *
 * @param v the value to check.
 *
 * @return true if the value is a @list, false if not.
 */


api.isList = v => // Note: A value is a @list if all of these hold true:
// 1. It is an Object.
// 2. It has the @list property.
types.isObject(v) && '@list' in v;
/**
 * Returns true if the given value is a @graph.
 *
 * @return true if the value is a @graph, false if not.
 */


api.isGraph = v => {
  // Note: A value is a graph if all of these hold true:
  // 1. It is an object.
  // 2. It has an `@graph` key.
  // 3. It may have '@id' or '@index'
  return types.isObject(v) && '@graph' in v && Object.keys(v).filter(key => key !== '@id' && key !== '@index').length === 1;
};
/**
 * Returns true if the given value is a simple @graph.
 *
 * @return true if the value is a simple @graph, false if not.
 */


api.isSimpleGraph = v => {
  // Note: A value is a simple graph if all of these hold true:
  // 1. It is an object.
  // 2. It has an `@graph` key.
  // 3. It has only 1 key or 2 keys where one of them is `@index`.
  return api.isGraph(v) && !('@id' in v);
};
/**
 * Returns true if the given value is a blank node.
 *
 * @param v the value to check.
 *
 * @return true if the value is a blank node, false if not.
 */


api.isBlankNode = v => {
  // Note: A value is a blank node if all of these hold true:
  // 1. It is an Object.
  // 2. If it has an @id key its value begins with '_:'.
  // 3. It has no keys OR is not a @value, @set, or @list.
  if (types.isObject(v)) {
    if ('@id' in v) {
      return v['@id'].indexOf('_:') === 0;
    }

    return Object.keys(v).length === 0 || !('@value' in v || '@set' in v || '@list' in v);
  }

  return false;
};

/***/ }),

/***/ "./lib/jsonld.js":
/*!***********************!*\
  !*** ./lib/jsonld.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

__webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

__webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");

__webpack_require__(/*! core-js/modules/es.array.sort.js */ "./node_modules/core-js/modules/es.array.sort.js");

__webpack_require__(/*! core-js/modules/es.object.assign.js */ "./node_modules/core-js/modules/es.object.assign.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * A JavaScript implementation of the JSON-LD API.
 *
 * @author Dave Longley
 *
 * @license BSD 3-Clause License
 * Copyright (c) 2011-2019 Digital Bazaar, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 *
 * Neither the name of the Digital Bazaar, Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 * TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
const canonize = __webpack_require__(/*! rdf-canonize */ "./node_modules/rdf-canonize/index.js");

const platform = __webpack_require__(/*! ./platform */ "./lib/platform-browser.js");

const util = __webpack_require__(/*! ./util */ "./lib/util.js");

const ContextResolver = __webpack_require__(/*! ./ContextResolver */ "./lib/ContextResolver.js");

const IdentifierIssuer = util.IdentifierIssuer;

const JsonLdError = __webpack_require__(/*! ./JsonLdError */ "./lib/JsonLdError.js");

const LRU = __webpack_require__(/*! lru-cache */ "./node_modules/lru-cache/index.js");

const NQuads = __webpack_require__(/*! ./NQuads */ "./lib/NQuads.js");

const {
  expand: _expand
} = __webpack_require__(/*! ./expand */ "./lib/expand.js");

const {
  flatten: _flatten
} = __webpack_require__(/*! ./flatten */ "./lib/flatten.js");

const {
  fromRDF: _fromRDF
} = __webpack_require__(/*! ./fromRdf */ "./lib/fromRdf.js");

const {
  toRDF: _toRDF
} = __webpack_require__(/*! ./toRdf */ "./lib/toRdf.js");

const {
  frameMergedOrDefault: _frameMergedOrDefault,
  cleanupNull: _cleanupNull
} = __webpack_require__(/*! ./frame */ "./lib/frame.js");

const {
  isArray: _isArray,
  isObject: _isObject,
  isString: _isString
} = __webpack_require__(/*! ./types */ "./lib/types.js");

const {
  isSubjectReference: _isSubjectReference
} = __webpack_require__(/*! ./graphTypes */ "./lib/graphTypes.js");

const {
  expandIri: _expandIri,
  getInitialContext: _getInitialContext,
  process: _processContext,
  processingMode: _processingMode
} = __webpack_require__(/*! ./context */ "./lib/context.js");

const {
  compact: _compact,
  compactIri: _compactIri
} = __webpack_require__(/*! ./compact */ "./lib/compact.js");

const {
  createNodeMap: _createNodeMap,
  createMergedNodeMap: _createMergedNodeMap,
  mergeNodeMaps: _mergeNodeMaps
} = __webpack_require__(/*! ./nodeMap */ "./lib/nodeMap.js");
/* eslint-disable indent */
// attaches jsonld API to the given object


const wrapper = function wrapper(jsonld) {
  /** Registered RDF dataset parsers hashed by content-type. */
  const _rdfParsers = {}; // resolved context cache
  // TODO: consider basing max on context size rather than number

  const RESOLVED_CONTEXT_CACHE_MAX_SIZE = 100;

  const _resolvedContextCache = new LRU({
    max: RESOLVED_CONTEXT_CACHE_MAX_SIZE
  });
  /* Core API */

  /**
   * Performs JSON-LD compaction.
   *
   * @param input the JSON-LD input to compact.
   * @param ctx the context to compact with.
   * @param [options] options to use:
   *          [base] the base IRI to use.
   *          [compactArrays] true to compact arrays to single values when
   *            appropriate, false not to (default: true).
   *          [compactToRelative] true to compact IRIs to be relative to document
   *            base, false to keep absolute (default: true)
   *          [graph] true to always output a top-level graph (default: false).
   *          [expandContext] a context to expand with.
   *          [skipExpansion] true to assume the input is expanded and skip
   *            expansion, false not to, defaults to false.
   *          [documentLoader(url, options)] the document loader.
   *          [expansionMap(info)] a function that can be used to custom map
   *            unmappable values (or to throw an error when they are detected);
   *            if this function returns `undefined` then the default behavior
   *            will be used.
   *          [framing] true if compaction is occuring during a framing operation.
   *          [compactionMap(info)] a function that can be used to custom map
   *            unmappable values (or to throw an error when they are detected);
   *            if this function returns `undefined` then the default behavior
   *            will be used.
   *          [contextResolver] internal use only.
   *
   * @return a Promise that resolves to the compacted output.
   */


  jsonld.compact = async function (input, ctx, options) {
    if (arguments.length < 2) {
      throw new TypeError('Could not compact, too few arguments.');
    }

    if (ctx === null) {
      throw new JsonLdError('The compaction context must not be null.', 'jsonld.CompactError', {
        code: 'invalid local context'
      });
    } // nothing to compact


    if (input === null) {
      return null;
    } // set default options


    options = _setDefaults(options, {
      base: _isString(input) ? input : '',
      compactArrays: true,
      compactToRelative: true,
      graph: false,
      skipExpansion: false,
      link: false,
      issuer: new IdentifierIssuer('_:b'),
      contextResolver: new ContextResolver({
        sharedCache: _resolvedContextCache
      })
    });

    if (options.link) {
      // force skip expansion when linking, "link" is not part of the public
      // API, it should only be called from framing
      options.skipExpansion = true;
    }

    if (!options.compactToRelative) {
      delete options.base;
    } // expand input


    let expanded;

    if (options.skipExpansion) {
      expanded = input;
    } else {
      expanded = await jsonld.expand(input, options);
    } // process context


    const activeCtx = await jsonld.processContext(_getInitialContext(options), ctx, options); // do compaction

    let compacted = await _compact({
      activeCtx,
      element: expanded,
      options,
      compactionMap: options.compactionMap
    }); // perform clean up

    if (options.compactArrays && !options.graph && _isArray(compacted)) {
      if (compacted.length === 1) {
        // simplify to a single item
        compacted = compacted[0];
      } else if (compacted.length === 0) {
        // simplify to an empty object
        compacted = {};
      }
    } else if (options.graph && _isObject(compacted)) {
      // always use array if graph option is on
      compacted = [compacted];
    } // follow @context key


    if (_isObject(ctx) && '@context' in ctx) {
      ctx = ctx['@context'];
    } // build output context


    ctx = util.clone(ctx);

    if (!_isArray(ctx)) {
      ctx = [ctx];
    } // remove empty contexts


    const tmp = ctx;
    ctx = [];

    for (let i = 0; i < tmp.length; ++i) {
      if (!_isObject(tmp[i]) || Object.keys(tmp[i]).length > 0) {
        ctx.push(tmp[i]);
      }
    } // remove array if only one context


    const hasContext = ctx.length > 0;

    if (ctx.length === 1) {
      ctx = ctx[0];
    } // add context and/or @graph


    if (_isArray(compacted)) {
      // use '@graph' keyword
      const graphAlias = _compactIri({
        activeCtx,
        iri: '@graph',
        relativeTo: {
          vocab: true
        }
      });

      const graph = compacted;
      compacted = {};

      if (hasContext) {
        compacted['@context'] = ctx;
      }

      compacted[graphAlias] = graph;
    } else if (_isObject(compacted) && hasContext) {
      // reorder keys so @context is first
      const graph = compacted;
      compacted = {
        '@context': ctx
      };

      for (const key in graph) {
        compacted[key] = graph[key];
      }
    }

    return compacted;
  };
  /**
   * Performs JSON-LD expansion.
   *
   * @param input the JSON-LD input to expand.
   * @param [options] the options to use:
   *          [base] the base IRI to use.
   *          [expandContext] a context to expand with.
   *          [keepFreeFloatingNodes] true to keep free-floating nodes,
   *            false not to, defaults to false.
   *          [documentLoader(url, options)] the document loader.
   *          [expansionMap(info)] a function that can be used to custom map
   *            unmappable values (or to throw an error when they are detected);
   *            if this function returns `undefined` then the default behavior
   *            will be used.
   *          [contextResolver] internal use only.
   *
   * @return a Promise that resolves to the expanded output.
   */


  jsonld.expand = async function (input, options) {
    if (arguments.length < 1) {
      throw new TypeError('Could not expand, too few arguments.');
    } // set default options


    options = _setDefaults(options, {
      keepFreeFloatingNodes: false,
      contextResolver: new ContextResolver({
        sharedCache: _resolvedContextCache
      })
    });

    if (options.expansionMap === false) {
      options.expansionMap = undefined;
    } // build set of objects that may have @contexts to resolve


    const toResolve = {}; // build set of contexts to process prior to expansion

    const contextsToProcess = []; // if an `expandContext` has been given ensure it gets resolved

    if ('expandContext' in options) {
      const expandContext = util.clone(options.expandContext);

      if (_isObject(expandContext) && '@context' in expandContext) {
        toResolve.expandContext = expandContext;
      } else {
        toResolve.expandContext = {
          '@context': expandContext
        };
      }

      contextsToProcess.push(toResolve.expandContext);
    } // if input is a string, attempt to dereference remote document


    let defaultBase;

    if (!_isString(input)) {
      // input is not a URL, do not need to retrieve it first
      toResolve.input = util.clone(input);
    } else {
      // load remote doc
      const remoteDoc = await jsonld.get(input, options);
      defaultBase = remoteDoc.documentUrl;
      toResolve.input = remoteDoc.document;

      if (remoteDoc.contextUrl) {
        // context included in HTTP link header and must be resolved
        toResolve.remoteContext = {
          '@context': remoteDoc.contextUrl
        };
        contextsToProcess.push(toResolve.remoteContext);
      }
    } // set default base


    if (!('base' in options)) {
      options.base = defaultBase || '';
    } // process any additional contexts


    let activeCtx = _getInitialContext(options);

    for (const localCtx of contextsToProcess) {
      activeCtx = await _processContext({
        activeCtx,
        localCtx,
        options
      });
    } // expand resolved input


    let expanded = await _expand({
      activeCtx,
      element: toResolve.input,
      options,
      expansionMap: options.expansionMap
    }); // optimize away @graph with no other properties

    if (_isObject(expanded) && '@graph' in expanded && Object.keys(expanded).length === 1) {
      expanded = expanded['@graph'];
    } else if (expanded === null) {
      expanded = [];
    } // normalize to an array


    if (!_isArray(expanded)) {
      expanded = [expanded];
    }

    return expanded;
  };
  /**
   * Performs JSON-LD flattening.
   *
   * @param input the JSON-LD to flatten.
   * @param ctx the context to use to compact the flattened output, or null.
   * @param [options] the options to use:
   *          [base] the base IRI to use.
   *          [expandContext] a context to expand with.
   *          [documentLoader(url, options)] the document loader.
   *          [contextResolver] internal use only.
   *
   * @return a Promise that resolves to the flattened output.
   */


  jsonld.flatten = async function (input, ctx, options) {
    if (arguments.length < 1) {
      return new TypeError('Could not flatten, too few arguments.');
    }

    if (typeof ctx === 'function') {
      ctx = null;
    } else {
      ctx = ctx || null;
    } // set default options


    options = _setDefaults(options, {
      base: _isString(input) ? input : '',
      contextResolver: new ContextResolver({
        sharedCache: _resolvedContextCache
      })
    }); // expand input

    const expanded = await jsonld.expand(input, options); // do flattening

    const flattened = _flatten(expanded);

    if (ctx === null) {
      // no compaction required
      return flattened;
    } // compact result (force @graph option to true, skip expansion)


    options.graph = true;
    options.skipExpansion = true;
    const compacted = await jsonld.compact(flattened, ctx, options);
    return compacted;
  };
  /**
   * Performs JSON-LD framing.
   *
   * @param input the JSON-LD input to frame.
   * @param frame the JSON-LD frame to use.
   * @param [options] the framing options.
   *          [base] the base IRI to use.
   *          [expandContext] a context to expand with.
   *          [embed] default @embed flag: '@last', '@always', '@never', '@link'
   *            (default: '@last').
   *          [explicit] default @explicit flag (default: false).
   *          [requireAll] default @requireAll flag (default: true).
   *          [omitDefault] default @omitDefault flag (default: false).
   *          [documentLoader(url, options)] the document loader.
   *          [contextResolver] internal use only.
   *
   * @return a Promise that resolves to the framed output.
   */


  jsonld.frame = async function (input, frame, options) {
    if (arguments.length < 2) {
      throw new TypeError('Could not frame, too few arguments.');
    } // set default options


    options = _setDefaults(options, {
      base: _isString(input) ? input : '',
      embed: '@once',
      explicit: false,
      requireAll: false,
      omitDefault: false,
      bnodesToClear: [],
      contextResolver: new ContextResolver({
        sharedCache: _resolvedContextCache
      })
    }); // if frame is a string, attempt to dereference remote document

    if (_isString(frame)) {
      // load remote doc
      const remoteDoc = await jsonld.get(frame, options);
      frame = remoteDoc.document;

      if (remoteDoc.contextUrl) {
        // inject link header @context into frame
        let ctx = frame['@context'];

        if (!ctx) {
          ctx = remoteDoc.contextUrl;
        } else if (_isArray(ctx)) {
          ctx.push(remoteDoc.contextUrl);
        } else {
          ctx = [ctx, remoteDoc.contextUrl];
        }

        frame['@context'] = ctx;
      }
    }

    const frameContext = frame ? frame['@context'] || {} : {}; // process context

    const activeCtx = await jsonld.processContext(_getInitialContext(options), frameContext, options); // mode specific defaults

    if (!options.hasOwnProperty('omitGraph')) {
      options.omitGraph = _processingMode(activeCtx, 1.1);
    }

    if (!options.hasOwnProperty('pruneBlankNodeIdentifiers')) {
      options.pruneBlankNodeIdentifiers = _processingMode(activeCtx, 1.1);
    } // expand input


    const expanded = await jsonld.expand(input, options); // expand frame

    const opts = _objectSpread({}, options);

    opts.isFrame = true;
    opts.keepFreeFloatingNodes = true;
    const expandedFrame = await jsonld.expand(frame, opts); // if the unexpanded frame includes a key expanding to @graph, frame the
    // default graph, otherwise, the merged graph

    const frameKeys = Object.keys(frame).map(key => _expandIri(activeCtx, key, {
      vocab: true
    }));
    opts.merged = !frameKeys.includes('@graph');
    opts.is11 = _processingMode(activeCtx, 1.1); // do framing

    const framed = _frameMergedOrDefault(expanded, expandedFrame, opts);

    opts.graph = !options.omitGraph;
    opts.skipExpansion = true;
    opts.link = {};
    opts.framing = true;
    let compacted = await jsonld.compact(framed, frameContext, opts); // replace @null with null, compacting arrays

    opts.link = {};
    compacted = _cleanupNull(compacted, opts);
    return compacted;
  };
  /**
   * **Experimental**
   *
   * Links a JSON-LD document's nodes in memory.
   *
   * @param input the JSON-LD document to link.
   * @param [ctx] the JSON-LD context to apply.
   * @param [options] the options to use:
   *          [base] the base IRI to use.
   *          [expandContext] a context to expand with.
   *          [documentLoader(url, options)] the document loader.
   *          [contextResolver] internal use only.
   *
   * @return a Promise that resolves to the linked output.
   */


  jsonld.link = async function (input, ctx, options) {
    // API matches running frame with a wildcard frame and embed: '@link'
    // get arguments
    const frame = {};

    if (ctx) {
      frame['@context'] = ctx;
    }

    frame['@embed'] = '@link';
    return jsonld.frame(input, frame, options);
  };
  /**
   * Performs RDF dataset normalization on the given input. The input is JSON-LD
   * unless the 'inputFormat' option is used. The output is an RDF dataset
   * unless the 'format' option is used.
   *
   * @param input the input to normalize as JSON-LD or as a format specified by
   *          the 'inputFormat' option.
   * @param [options] the options to use:
   *          [algorithm] the normalization algorithm to use, `URDNA2015` or
   *            `URGNA2012` (default: `URDNA2015`).
   *          [base] the base IRI to use.
   *          [expandContext] a context to expand with.
   *          [skipExpansion] true to assume the input is expanded and skip
   *            expansion, false not to, defaults to false.
   *          [inputFormat] the format if input is not JSON-LD:
   *            'application/n-quads' for N-Quads.
   *          [format] the format if output is a string:
   *            'application/n-quads' for N-Quads.
   *          [documentLoader(url, options)] the document loader.
   *          [useNative] true to use a native canonize algorithm
   *          [contextResolver] internal use only.
   *
   * @return a Promise that resolves to the normalized output.
   */


  jsonld.normalize = jsonld.canonize = async function (input, options) {
    if (arguments.length < 1) {
      throw new TypeError('Could not canonize, too few arguments.');
    } // set default options


    options = _setDefaults(options, {
      base: _isString(input) ? input : '',
      algorithm: 'URDNA2015',
      skipExpansion: false,
      contextResolver: new ContextResolver({
        sharedCache: _resolvedContextCache
      })
    });

    if ('inputFormat' in options) {
      if (options.inputFormat !== 'application/n-quads' && options.inputFormat !== 'application/nquads') {
        throw new JsonLdError('Unknown canonicalization input format.', 'jsonld.CanonizeError');
      } // TODO: `await` for async parsers


      const parsedInput = NQuads.parse(input); // do canonicalization

      return canonize.canonize(parsedInput, options);
    } // convert to RDF dataset then do normalization


    const opts = _objectSpread({}, options);

    delete opts.format;
    opts.produceGeneralizedRdf = false;
    const dataset = await jsonld.toRDF(input, opts); // do canonicalization

    return canonize.canonize(dataset, options);
  };
  /**
   * Converts an RDF dataset to JSON-LD.
   *
   * @param dataset a serialized string of RDF in a format specified by the
   *          format option or an RDF dataset to convert.
   * @param [options] the options to use:
   *          [format] the format if dataset param must first be parsed:
   *            'application/n-quads' for N-Quads (default).
   *          [rdfParser] a custom RDF-parser to use to parse the dataset.
   *          [useRdfType] true to use rdf:type, false to use @type
   *            (default: false).
   *          [useNativeTypes] true to convert XSD types into native types
   *            (boolean, integer, double), false not to (default: false).
   *
   * @return a Promise that resolves to the JSON-LD document.
   */


  jsonld.fromRDF = async function (dataset, options) {
    if (arguments.length < 1) {
      throw new TypeError('Could not convert from RDF, too few arguments.');
    } // set default options


    options = _setDefaults(options, {
      format: _isString(dataset) ? 'application/n-quads' : undefined
    });
    const {
      format
    } = options;
    let {
      rdfParser
    } = options; // handle special format

    if (format) {
      // check supported formats
      rdfParser = rdfParser || _rdfParsers[format];

      if (!rdfParser) {
        throw new JsonLdError('Unknown input format.', 'jsonld.UnknownFormat', {
          format
        });
      }
    } else {
      // no-op parser, assume dataset already parsed
      rdfParser = () => dataset;
    } // rdfParser must be synchronous or return a promise, no callback support


    const parsedDataset = await rdfParser(dataset);
    return _fromRDF(parsedDataset, options);
  };
  /**
   * Outputs the RDF dataset found in the given JSON-LD object.
   *
   * @param input the JSON-LD input.
   * @param [options] the options to use:
   *          [base] the base IRI to use.
   *          [expandContext] a context to expand with.
   *          [skipExpansion] true to assume the input is expanded and skip
   *            expansion, false not to, defaults to false.
   *          [format] the format to use to output a string:
   *            'application/n-quads' for N-Quads.
   *          [produceGeneralizedRdf] true to output generalized RDF, false
   *            to produce only standard RDF (default: false).
   *          [documentLoader(url, options)] the document loader.
   *          [contextResolver] internal use only.
   *
   * @return a Promise that resolves to the RDF dataset.
   */


  jsonld.toRDF = async function (input, options) {
    if (arguments.length < 1) {
      throw new TypeError('Could not convert to RDF, too few arguments.');
    } // set default options


    options = _setDefaults(options, {
      base: _isString(input) ? input : '',
      skipExpansion: false,
      includeRelativeUrls: false,
      contextResolver: new ContextResolver({
        sharedCache: _resolvedContextCache
      })
    }); // TODO: support toRDF custom map?

    let expanded;

    if (options.skipExpansion) {
      expanded = input;
    } else {
      // expand input
      expanded = await jsonld.expand(input, options);
    } // output RDF dataset


    const dataset = _toRDF(expanded, options);

    if (options.format) {
      if (options.format === 'application/n-quads' || options.format === 'application/nquads') {
        return NQuads.serialize(dataset);
      }

      throw new JsonLdError('Unknown output format.', 'jsonld.UnknownFormat', {
        format: options.format
      });
    }

    return dataset;
  };
  /**
   * **Experimental**
   *
   * Recursively flattens the nodes in the given JSON-LD input into a merged
   * map of node ID => node. All graphs will be merged into the default graph.
   *
   * @param input the JSON-LD input.
   * @param [options] the options to use:
   *          [base] the base IRI to use.
   *          [expandContext] a context to expand with.
   *          [issuer] a jsonld.IdentifierIssuer to use to label blank nodes.
   *          [documentLoader(url, options)] the document loader.
   *          [contextResolver] internal use only.
   *
   * @return a Promise that resolves to the merged node map.
   */


  jsonld.createNodeMap = async function (input, options) {
    if (arguments.length < 1) {
      throw new TypeError('Could not create node map, too few arguments.');
    } // set default options


    options = _setDefaults(options, {
      base: _isString(input) ? input : '',
      contextResolver: new ContextResolver({
        sharedCache: _resolvedContextCache
      })
    }); // expand input

    const expanded = await jsonld.expand(input, options);
    return _createMergedNodeMap(expanded, options);
  };
  /**
   * **Experimental**
   *
   * Merges two or more JSON-LD documents into a single flattened document.
   *
   * @param docs the JSON-LD documents to merge together.
   * @param ctx the context to use to compact the merged result, or null.
   * @param [options] the options to use:
   *          [base] the base IRI to use.
   *          [expandContext] a context to expand with.
   *          [issuer] a jsonld.IdentifierIssuer to use to label blank nodes.
   *          [mergeNodes] true to merge properties for nodes with the same ID,
   *            false to ignore new properties for nodes with the same ID once
   *            the ID has been defined; note that this may not prevent merging
   *            new properties where a node is in the `object` position
   *            (default: true).
   *          [documentLoader(url, options)] the document loader.
   *          [contextResolver] internal use only.
   *
   * @return a Promise that resolves to the merged output.
   */


  jsonld.merge = async function (docs, ctx, options) {
    if (arguments.length < 1) {
      throw new TypeError('Could not merge, too few arguments.');
    }

    if (!_isArray(docs)) {
      throw new TypeError('Could not merge, "docs" must be an array.');
    }

    if (typeof ctx === 'function') {
      ctx = null;
    } else {
      ctx = ctx || null;
    } // set default options


    options = _setDefaults(options, {
      contextResolver: new ContextResolver({
        sharedCache: _resolvedContextCache
      })
    }); // expand all documents

    const expanded = await Promise.all(docs.map(doc => {
      const opts = _objectSpread({}, options);

      return jsonld.expand(doc, opts);
    }));
    let mergeNodes = true;

    if ('mergeNodes' in options) {
      mergeNodes = options.mergeNodes;
    }

    const issuer = options.issuer || new IdentifierIssuer('_:b');
    const graphs = {
      '@default': {}
    };

    for (let i = 0; i < expanded.length; ++i) {
      // uniquely relabel blank nodes
      const doc = util.relabelBlankNodes(expanded[i], {
        issuer: new IdentifierIssuer('_:b' + i + '-')
      }); // add nodes to the shared node map graphs if merging nodes, to a
      // separate graph set if not

      const _graphs = mergeNodes || i === 0 ? graphs : {
        '@default': {}
      };

      _createNodeMap(doc, _graphs, '@default', issuer);

      if (_graphs !== graphs) {
        // merge document graphs but don't merge existing nodes
        for (const graphName in _graphs) {
          const _nodeMap = _graphs[graphName];

          if (!(graphName in graphs)) {
            graphs[graphName] = _nodeMap;
            continue;
          }

          const nodeMap = graphs[graphName];

          for (const key in _nodeMap) {
            if (!(key in nodeMap)) {
              nodeMap[key] = _nodeMap[key];
            }
          }
        }
      }
    } // add all non-default graphs to default graph


    const defaultGraph = _mergeNodeMaps(graphs); // produce flattened output


    const flattened = [];
    const keys = Object.keys(defaultGraph).sort();

    for (let ki = 0; ki < keys.length; ++ki) {
      const node = defaultGraph[keys[ki]]; // only add full subjects to top-level

      if (!_isSubjectReference(node)) {
        flattened.push(node);
      }
    }

    if (ctx === null) {
      return flattened;
    } // compact result (force @graph option to true, skip expansion)


    options.graph = true;
    options.skipExpansion = true;
    const compacted = await jsonld.compact(flattened, ctx, options);
    return compacted;
  };
  /**
   * The default document loader for external documents.
   *
   * @param url the URL to load.
   *
   * @return a promise that resolves to the remote document.
   */


  Object.defineProperty(jsonld, 'documentLoader', {
    get: () => jsonld._documentLoader,
    set: v => jsonld._documentLoader = v
  }); // default document loader not implemented

  jsonld.documentLoader = async url => {
    throw new JsonLdError('Could not retrieve a JSON-LD document from the URL. URL ' + 'dereferencing not implemented.', 'jsonld.LoadDocumentError', {
      code: 'loading document failed',
      url
    });
  };
  /**
   * Gets a remote JSON-LD document using the default document loader or
   * one given in the passed options.
   *
   * @param url the URL to fetch.
   * @param [options] the options to use:
   *          [documentLoader] the document loader to use.
   *
   * @return a Promise that resolves to the retrieved remote document.
   */


  jsonld.get = async function (url, options) {
    let load;

    if (typeof options.documentLoader === 'function') {
      load = options.documentLoader;
    } else {
      load = jsonld.documentLoader;
    }

    const remoteDoc = await load(url);

    try {
      if (!remoteDoc.document) {
        throw new JsonLdError('No remote document found at the given URL.', 'jsonld.NullRemoteDocument');
      }

      if (_isString(remoteDoc.document)) {
        remoteDoc.document = JSON.parse(remoteDoc.document);
      }
    } catch (e) {
      throw new JsonLdError('Could not retrieve a JSON-LD document from the URL.', 'jsonld.LoadDocumentError', {
        code: 'loading document failed',
        cause: e,
        remoteDoc
      });
    }

    return remoteDoc;
  };
  /**
   * Processes a local context, resolving any URLs as necessary, and returns a
   * new active context.
   *
   * @param activeCtx the current active context.
   * @param localCtx the local context to process.
   * @param [options] the options to use:
   *          [documentLoader(url, options)] the document loader.
   *          [contextResolver] internal use only.
   *
   * @return a Promise that resolves to the new active context.
   */


  jsonld.processContext = async function (activeCtx, localCtx, options) {
    // set default options
    options = _setDefaults(options, {
      base: '',
      contextResolver: new ContextResolver({
        sharedCache: _resolvedContextCache
      })
    }); // return initial context early for null context

    if (localCtx === null) {
      return _getInitialContext(options);
    } // get URLs in localCtx


    localCtx = util.clone(localCtx);

    if (!(_isObject(localCtx) && '@context' in localCtx)) {
      localCtx = {
        '@context': localCtx
      };
    }

    return _processContext({
      activeCtx,
      localCtx,
      options
    });
  }; // backwards compatibility


  jsonld.getContextValue = __webpack_require__(/*! ./context */ "./lib/context.js").getContextValue;
  /**
   * Document loaders.
   */

  jsonld.documentLoaders = {};
  /**
   * Assigns the default document loader for external document URLs to a built-in
   * default. Supported types currently include: 'xhr' and 'node'.
   *
   * @param type the type to set.
   * @param [params] the parameters required to use the document loader.
   */

  jsonld.useDocumentLoader = function (type) {
    if (!(type in jsonld.documentLoaders)) {
      throw new JsonLdError('Unknown document loader type: "' + type + '"', 'jsonld.UnknownDocumentLoader', {
        type
      });
    } // set document loader


    jsonld.documentLoader = jsonld.documentLoaders[type].apply(jsonld, Array.prototype.slice.call(arguments, 1));
  };
  /**
   * Registers an RDF dataset parser by content-type, for use with
   * jsonld.fromRDF. An RDF dataset parser will always be given one parameter,
   * a string of input. An RDF dataset parser can be synchronous or
   * asynchronous (by returning a promise).
   *
   * @param contentType the content-type for the parser.
   * @param parser(input) the parser function (takes a string as a parameter
   *          and either returns an RDF dataset or a Promise that resolves to one.
   */


  jsonld.registerRDFParser = function (contentType, parser) {
    _rdfParsers[contentType] = parser;
  };
  /**
   * Unregisters an RDF dataset parser by content-type.
   *
   * @param contentType the content-type for the parser.
   */


  jsonld.unregisterRDFParser = function (contentType) {
    delete _rdfParsers[contentType];
  }; // register the N-Quads RDF parser


  jsonld.registerRDFParser('application/n-quads', NQuads.parse);
  jsonld.registerRDFParser('application/nquads', NQuads.parse);
  /* URL API */

  jsonld.url = __webpack_require__(/*! ./url */ "./lib/url.js");
  /* Utility API */

  jsonld.util = util; // backwards compatibility

  Object.assign(jsonld, util); // reexpose API as jsonld.promises for backwards compatability

  jsonld.promises = jsonld; // backwards compatibility

  jsonld.RequestQueue = __webpack_require__(/*! ./RequestQueue */ "./lib/RequestQueue.js");
  /* WebIDL API */

  jsonld.JsonLdProcessor = __webpack_require__(/*! ./JsonLdProcessor */ "./lib/JsonLdProcessor.js")(jsonld);
  platform.setupGlobals(jsonld);
  platform.setupDocumentLoaders(jsonld);

  function _setDefaults(options, _ref) {
    let {
      documentLoader = jsonld.documentLoader
    } = _ref,
        defaults = (0, _objectWithoutProperties2.default)(_ref, ["documentLoader"]);
    return Object.assign({}, {
      documentLoader
    }, defaults, options);
  } // end of jsonld API `wrapper` factory


  return jsonld;
}; // external APIs:
// used to generate a new jsonld API instance


const factory = function factory() {
  return wrapper(function () {
    return factory();
  });
}; // wrap the main jsonld API instance


wrapper(factory); // export API

module.exports = factory;

/***/ }),

/***/ "./lib/nodeMap.js":
/*!************************!*\
  !*** ./lib/nodeMap.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

__webpack_require__(/*! core-js/modules/es.array.sort.js */ "./node_modules/core-js/modules/es.array.sort.js");

const {
  isKeyword
} = __webpack_require__(/*! ./context */ "./lib/context.js");

const graphTypes = __webpack_require__(/*! ./graphTypes */ "./lib/graphTypes.js");

const types = __webpack_require__(/*! ./types */ "./lib/types.js");

const util = __webpack_require__(/*! ./util */ "./lib/util.js");

const JsonLdError = __webpack_require__(/*! ./JsonLdError */ "./lib/JsonLdError.js");

const api = {};
module.exports = api;
/**
 * Creates a merged JSON-LD node map (node ID => node).
 *
 * @param input the expanded JSON-LD to create a node map of.
 * @param [options] the options to use:
 *          [issuer] a jsonld.IdentifierIssuer to use to label blank nodes.
 *
 * @return the node map.
 */

api.createMergedNodeMap = (input, options) => {
  options = options || {}; // produce a map of all subjects and name each bnode

  const issuer = options.issuer || new util.IdentifierIssuer('_:b');
  const graphs = {
    '@default': {}
  };
  api.createNodeMap(input, graphs, '@default', issuer); // add all non-default graphs to default graph

  return api.mergeNodeMaps(graphs);
};
/**
 * Recursively flattens the subjects in the given JSON-LD expanded input
 * into a node map.
 *
 * @param input the JSON-LD expanded input.
 * @param graphs a map of graph name to subject map.
 * @param graph the name of the current graph.
 * @param issuer the blank node identifier issuer.
 * @param name the name assigned to the current input if it is a bnode.
 * @param list the list to append to, null for none.
 */


api.createNodeMap = (input, graphs, graph, issuer, name, list) => {
  // recurse through array
  if (types.isArray(input)) {
    for (const node of input) {
      api.createNodeMap(node, graphs, graph, issuer, undefined, list);
    }

    return;
  } // add non-object to list


  if (!types.isObject(input)) {
    if (list) {
      list.push(input);
    }

    return;
  } // add values to list


  if (graphTypes.isValue(input)) {
    if ('@type' in input) {
      let type = input['@type']; // rename @type blank node

      if (type.indexOf('_:') === 0) {
        input['@type'] = type = issuer.getId(type);
      }
    }

    if (list) {
      list.push(input);
    }

    return;
  } else if (list && graphTypes.isList(input)) {
    const _list = [];
    api.createNodeMap(input['@list'], graphs, graph, issuer, name, _list);
    list.push({
      '@list': _list
    });
    return;
  } // Note: At this point, input must be a subject.
  // spec requires @type to be named first, so assign names early


  if ('@type' in input) {
    const types = input['@type'];

    for (const type of types) {
      if (type.indexOf('_:') === 0) {
        issuer.getId(type);
      }
    }
  } // get name for subject


  if (types.isUndefined(name)) {
    name = graphTypes.isBlankNode(input) ? issuer.getId(input['@id']) : input['@id'];
  } // add subject reference to list


  if (list) {
    list.push({
      '@id': name
    });
  } // create new subject or merge into existing one


  const subjects = graphs[graph];
  const subject = subjects[name] = subjects[name] || {};
  subject['@id'] = name;
  const properties = Object.keys(input).sort();

  for (let property of properties) {
    // skip @id
    if (property === '@id') {
      continue;
    } // handle reverse properties


    if (property === '@reverse') {
      const referencedNode = {
        '@id': name
      };
      const reverseMap = input['@reverse'];

      for (const reverseProperty in reverseMap) {
        const items = reverseMap[reverseProperty];

        for (const item of items) {
          let itemName = item['@id'];

          if (graphTypes.isBlankNode(item)) {
            itemName = issuer.getId(itemName);
          }

          api.createNodeMap(item, graphs, graph, issuer, itemName);
          util.addValue(subjects[itemName], reverseProperty, referencedNode, {
            propertyIsArray: true,
            allowDuplicate: false
          });
        }
      }

      continue;
    } // recurse into graph


    if (property === '@graph') {
      // add graph subjects map entry
      if (!(name in graphs)) {
        graphs[name] = {};
      }

      api.createNodeMap(input[property], graphs, name, issuer);
      continue;
    } // recurse into included


    if (property === '@included') {
      api.createNodeMap(input[property], graphs, graph, issuer);
      continue;
    } // copy non-@type keywords


    if (property !== '@type' && isKeyword(property)) {
      if (property === '@index' && property in subject && (input[property] !== subject[property] || input[property]['@id'] !== subject[property]['@id'])) {
        throw new JsonLdError('Invalid JSON-LD syntax; conflicting @index property detected.', 'jsonld.SyntaxError', {
          code: 'conflicting indexes',
          subject
        });
      }

      subject[property] = input[property];
      continue;
    } // iterate over objects


    const objects = input[property]; // if property is a bnode, assign it a new id

    if (property.indexOf('_:') === 0) {
      property = issuer.getId(property);
    } // ensure property is added for empty arrays


    if (objects.length === 0) {
      util.addValue(subject, property, [], {
        propertyIsArray: true
      });
      continue;
    }

    for (let o of objects) {
      if (property === '@type') {
        // rename @type blank nodes
        o = o.indexOf('_:') === 0 ? issuer.getId(o) : o;
      } // handle embedded subject or subject reference


      if (graphTypes.isSubject(o) || graphTypes.isSubjectReference(o)) {
        // skip null @id
        if ('@id' in o && !o['@id']) {
          continue;
        } // relabel blank node @id


        const id = graphTypes.isBlankNode(o) ? issuer.getId(o['@id']) : o['@id']; // add reference and recurse

        util.addValue(subject, property, {
          '@id': id
        }, {
          propertyIsArray: true,
          allowDuplicate: false
        });
        api.createNodeMap(o, graphs, graph, issuer, id);
      } else if (graphTypes.isValue(o)) {
        util.addValue(subject, property, o, {
          propertyIsArray: true,
          allowDuplicate: false
        });
      } else if (graphTypes.isList(o)) {
        // handle @list
        const _list = [];
        api.createNodeMap(o['@list'], graphs, graph, issuer, name, _list);
        o = {
          '@list': _list
        };
        util.addValue(subject, property, o, {
          propertyIsArray: true,
          allowDuplicate: false
        });
      } else {
        // handle @value
        api.createNodeMap(o, graphs, graph, issuer, name);
        util.addValue(subject, property, o, {
          propertyIsArray: true,
          allowDuplicate: false
        });
      }
    }
  }
};
/**
 * Merge separate named graphs into a single merged graph including
 * all nodes from the default graph and named graphs.
 *
 * @param graphs a map of graph name to subject map.
 *
 * @return the merged graph map.
 */


api.mergeNodeMapGraphs = graphs => {
  const merged = {};

  for (const name of Object.keys(graphs).sort()) {
    for (const id of Object.keys(graphs[name]).sort()) {
      const node = graphs[name][id];

      if (!(id in merged)) {
        merged[id] = {
          '@id': id
        };
      }

      const mergedNode = merged[id];

      for (const property of Object.keys(node).sort()) {
        if (isKeyword(property) && property !== '@type') {
          // copy keywords
          mergedNode[property] = util.clone(node[property]);
        } else {
          // merge objects
          for (const value of node[property]) {
            util.addValue(mergedNode, property, util.clone(value), {
              propertyIsArray: true,
              allowDuplicate: false
            });
          }
        }
      }
    }
  }

  return merged;
};

api.mergeNodeMaps = graphs => {
  // add all non-default graphs to default graph
  const defaultGraph = graphs['@default'];
  const graphNames = Object.keys(graphs).sort();

  for (const graphName of graphNames) {
    if (graphName === '@default') {
      continue;
    }

    const nodeMap = graphs[graphName];
    let subject = defaultGraph[graphName];

    if (!subject) {
      defaultGraph[graphName] = subject = {
        '@id': graphName,
        '@graph': []
      };
    } else if (!('@graph' in subject)) {
      subject['@graph'] = [];
    }

    const graph = subject['@graph'];

    for (const id of Object.keys(nodeMap).sort()) {
      const node = nodeMap[id]; // only add full subjects

      if (!graphTypes.isSubjectReference(node)) {
        graph.push(node);
      }
    }
  }

  return defaultGraph;
};

/***/ }),

/***/ "./lib/platform-browser.js":
/*!*********************************!*\
  !*** ./lib/platform-browser.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */


__webpack_require__(/*! core-js/modules/es.global-this.js */ "./node_modules/core-js/modules/es.global-this.js");

const xhrLoader = __webpack_require__(/*! ./documentLoaders/xhr */ "./lib/documentLoaders/xhr.js");

const api = {};
module.exports = api;
/**
 * Setup browser document loaders.
 *
 * @param jsonld the jsonld api.
 */

api.setupDocumentLoaders = function (jsonld) {
  if (typeof XMLHttpRequest !== 'undefined') {
    jsonld.documentLoaders.xhr = xhrLoader; // use xhr document loader by default

    jsonld.useDocumentLoader('xhr');
  }
};
/**
 * Setup browser globals.
 *
 * @param jsonld the jsonld api.
 */


api.setupGlobals = function (jsonld) {
  // setup browser global JsonLdProcessor
  if (typeof globalThis.JsonLdProcessor === 'undefined') {
    Object.defineProperty(globalThis, 'JsonLdProcessor', {
      writable: true,
      enumerable: false,
      configurable: true,
      value: jsonld.JsonLdProcessor
    });
  }
};

/***/ }),

/***/ "./lib/toRdf.js":
/*!**********************!*\
  !*** ./lib/toRdf.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


__webpack_require__(/*! core-js/modules/es.array.sort.js */ "./node_modules/core-js/modules/es.array.sort.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

__webpack_require__(/*! core-js/modules/es.string.starts-with.js */ "./node_modules/core-js/modules/es.string.starts-with.js");

__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");

__webpack_require__(/*! core-js/modules/es.number.to-fixed.js */ "./node_modules/core-js/modules/es.number.to-fixed.js");

__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");

const {
  createNodeMap
} = __webpack_require__(/*! ./nodeMap */ "./lib/nodeMap.js");

const {
  isKeyword
} = __webpack_require__(/*! ./context */ "./lib/context.js");

const graphTypes = __webpack_require__(/*! ./graphTypes */ "./lib/graphTypes.js");

const jsonCanonicalize = __webpack_require__(/*! canonicalize */ "./node_modules/canonicalize/lib/canonicalize.js");

const types = __webpack_require__(/*! ./types */ "./lib/types.js");

const util = __webpack_require__(/*! ./util */ "./lib/util.js");

const {
  // RDF,
  // RDF_LIST,
  RDF_FIRST,
  RDF_REST,
  RDF_NIL,
  RDF_TYPE,
  // RDF_PLAIN_LITERAL,
  // RDF_XML_LITERAL,
  RDF_JSON_LITERAL,
  // RDF_OBJECT,
  RDF_LANGSTRING,
  // XSD,
  XSD_BOOLEAN,
  XSD_DOUBLE,
  XSD_INTEGER,
  XSD_STRING
} = __webpack_require__(/*! ./constants */ "./lib/constants.js");

const {
  isAbsolute: _isAbsoluteIri
} = __webpack_require__(/*! ./url */ "./lib/url.js");

const api = {};
module.exports = api;
/**
 * Outputs an RDF dataset for the expanded JSON-LD input.
 *
 * @param input the expanded JSON-LD input.
 * @param options the RDF serialization options.
 *
 * @return the RDF dataset.
 */

api.toRDF = (input, options) => {
  // create node map for default graph (and any named graphs)
  const issuer = new util.IdentifierIssuer('_:b');
  const nodeMap = {
    '@default': {}
  };
  createNodeMap(input, nodeMap, '@default', issuer);
  const dataset = [];
  const graphNames = Object.keys(nodeMap).sort();

  for (const graphName of graphNames) {
    let graphTerm;

    if (graphName === '@default') {
      graphTerm = {
        termType: 'DefaultGraph',
        value: ''
      };
    } else if (_isAbsoluteIri(graphName)) {
      if (graphName.startsWith('_:')) {
        graphTerm = {
          termType: 'BlankNode'
        };
      } else {
        graphTerm = {
          termType: 'NamedNode'
        };
      }

      graphTerm.value = graphName;
    } else if (!options.includeRelativeUrls) {
      // skip relative IRIs (not valid RDF)
      continue;
    }

    _graphToRDF(dataset, nodeMap[graphName], graphTerm, issuer, options);
  }

  return dataset;
};
/**
 * Adds RDF quads for a particular graph to the given dataset.
 *
 * @param dataset the dataset to append RDF quads to.
 * @param graph the graph to create RDF quads for.
 * @param graphTerm the graph term for each quad.
 * @param issuer a IdentifierIssuer for assigning blank node names.
 * @param options the RDF serialization options.
 *
 * @return the array of RDF triples for the given graph.
 */


function _graphToRDF(dataset, graph, graphTerm, issuer, options) {
  const ids = Object.keys(graph).sort();

  for (const id of ids) {
    const node = graph[id];
    const properties = Object.keys(node).sort();

    for (let property of properties) {
      const items = node[property];

      if (property === '@type') {
        property = RDF_TYPE;
      } else if (isKeyword(property)) {
        continue;
      }

      for (const item of items) {
        // RDF subject
        const subject = {
          termType: id.startsWith('_:') ? 'BlankNode' : 'NamedNode',
          value: _escapeIri(id)
        }; // skip relative IRI subjects (not valid RDF)

        if (!_isAbsoluteIri(id)) {
          continue;
        } // RDF predicate


        const predicate = {
          termType: property.startsWith('_:') ? 'BlankNode' : 'NamedNode',
          value: _escapeIri(property)
        }; // skip relative IRI predicates (not valid RDF)

        if (!_isAbsoluteIri(property) && !options.includeRelativeUrls) {
          continue;
        } // skip blank node predicates unless producing generalized RDF


        if (predicate.termType === 'BlankNode' && !options.produceGeneralizedRdf) {
          continue;
        } // convert list, value or node object to triple


        const object = _objectToRDF(item, issuer, dataset, graphTerm, options.rdfDirection); // skip null objects (they are relative IRIs)


        if (options.includeRelativeUrls || object) {
          dataset.push({
            subject,
            predicate,
            object,
            graph: graphTerm
          });
        }
      }
    }
  }
}
/**
 * Converts a @list value into linked list of blank node RDF quads
 * (an RDF collection).
 *
 * @param list the @list value.
 * @param issuer a IdentifierIssuer for assigning blank node names.
 * @param dataset the array of quads to append to.
 * @param graphTerm the graph term for each quad.
 *
 * @return the head of the list.
 */


function _listToRDF(list, issuer, dataset, graphTerm, rdfDirection) {
  const first = {
    termType: 'NamedNode',
    value: RDF_FIRST
  };
  const rest = {
    termType: 'NamedNode',
    value: RDF_REST
  };
  const nil = {
    termType: 'NamedNode',
    value: RDF_NIL
  };
  const last = list.pop(); // Result is the head of the list

  const result = last ? {
    termType: 'BlankNode',
    value: issuer.getId()
  } : nil;
  let subject = result;

  for (const item of list) {
    const object = _objectToRDF(item, issuer, dataset, graphTerm, rdfDirection);

    const next = {
      termType: 'BlankNode',
      value: issuer.getId()
    };
    dataset.push({
      subject,
      predicate: first,
      object,
      graph: graphTerm
    });
    dataset.push({
      subject,
      predicate: rest,
      object: next,
      graph: graphTerm
    });
    subject = next;
  } // Tail of list


  if (last) {
    const object = _objectToRDF(last, issuer, dataset, graphTerm, rdfDirection);

    dataset.push({
      subject,
      predicate: first,
      object,
      graph: graphTerm
    });
    dataset.push({
      subject,
      predicate: rest,
      object: nil,
      graph: graphTerm
    });
  }

  return result;
}
/**
 * Converts a JSON-LD value object to an RDF literal or a JSON-LD string,
 * node object to an RDF resource, or adds a list.
 *
 * @param item the JSON-LD value or node object.
 * @param issuer a IdentifierIssuer for assigning blank node names.
 * @param dataset the dataset to append RDF quads to.
 * @param graphTerm the graph term for each quad.
 *
 * @return the RDF literal or RDF resource.
 */


function _objectToRDF(item, issuer, dataset, graphTerm, rdfDirection) {
  const object = {}; // convert value object to RDF

  if (graphTypes.isValue(item)) {
    object.termType = 'Literal';
    object.value = undefined;
    object.datatype = {
      termType: 'NamedNode'
    };
    let value = item['@value'];
    const datatype = item['@type'] || null; // convert to XSD/JSON datatypes as appropriate

    if (datatype === '@json') {
      object.value = jsonCanonicalize(value);
      object.datatype.value = RDF_JSON_LITERAL;
    } else if (types.isBoolean(value)) {
      object.value = value.toString();
      object.datatype.value = datatype || XSD_BOOLEAN;
    } else if (types.isDouble(value) || datatype === XSD_DOUBLE) {
      if (!types.isDouble(value)) {
        value = parseFloat(value);
      } // canonical double representation
      //??    object.value = value.toExponential(15).replace(/(\d)0*e\+?/, '$1E');


      object.value = value.toString();
      object.datatype.value = datatype || XSD_DOUBLE;
    } else if (types.isNumber(value)) {
      object.value = value.toFixed(0);
      object.datatype.value = datatype || XSD_INTEGER;
    } else if (rdfDirection === 'i18n-datatype' && '@direction' in item) {
      const _datatype = 'https://www.w3.org/ns/i18n#' + (item['@language'] || '') + `_${item['@direction']}`;

      object.datatype.value = _datatype;
      object.value = value;
    } else if ('@language' in item) {
      object.value = value;
      object.datatype.value = datatype || RDF_LANGSTRING;
      object.language = item['@language'];
    } else {
      object.value = value;
      object.datatype.value = datatype || XSD_STRING;
    }
  } else if (graphTypes.isList(item)) {
    const _list = _listToRDF(item['@list'], issuer, dataset, graphTerm, rdfDirection);

    object.termType = _list.termType;
    object.value = _list.value;
  } else {
    // convert string/node object to RDF
    const id = types.isObject(item) ? item['@id'] : item;
    object.termType = id.startsWith('_:') ? 'BlankNode' : 'NamedNode';
    object.value = _escapeIri(id);
  } // skip relative IRIs, not valid RDF


  if (object.termType === 'NamedNode' && !_isAbsoluteIri(object.value)) {
    return null;
  }

  return object;
}

const escape = /["\\\t\n\r\b\f\u0000-\u0019\ud800-\udbff]/;
const escapeAll = /["\\\t\n\r\b\f\u0000-\u0019]|[\ud800-\udbff][\udc00-\udfff]/g;
const escapeReplacements = {
  '\\': '\\\\',
  '"': '\\"',
  '\t': '\\t',
  '\n': '\\n',
  '\r': '\\r',
  '\b': '\\b',
  '\f': '\\f'
};

function _characterReplacer(character) {
  // Replace a single character by its escaped version
  var result = escapeReplacements[character];

  if (result === undefined) {
    // Replace a single character with its 4-bit unicode escape sequence
    if (character.length === 1) {
      result = character.charCodeAt(0).toString(16);
      result = '\\u0000'.substr(0, 6 - result.length) + result;
    } // Replace a surrogate pair with its 8-bit unicode escape sequence
    else {
        result = ((character.charCodeAt(0) - 0xD800) * 0x400 + character.charCodeAt(1) + 0x2400).toString(16);
        result = '\\U00000000'.substr(0, 10 - result.length) + result;
      }
  }

  return result;
}

function _escapeVal(value) {
  if (escape.test(value)) value = value.replace(this.escapeAll, _characterReplacer);
  return value;
}

function _escapeIri(value) {
  return _escapeVal(value).replace(' ', '%20');
}

/***/ }),

/***/ "./lib/types.js":
/*!**********************!*\
  !*** ./lib/types.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


const api = {};
module.exports = api;
/**
 * Returns true if the given value is an Array.
 *
 * @param v the value to check.
 *
 * @return true if the value is an Array, false if not.
 */

api.isArray = Array.isArray;
/**
 * Returns true if the given value is a Boolean.
 *
 * @param v the value to check.
 *
 * @return true if the value is a Boolean, false if not.
 */

api.isBoolean = v => typeof v === 'boolean' || Object.prototype.toString.call(v) === '[object Boolean]';
/**
 * Returns true if the given value is a double.
 *
 * @param v the value to check.
 *
 * @return true if the value is a double, false if not.
 */


api.isDouble = v => api.isNumber(v) && (String(v).indexOf('.') !== -1 || Math.abs(v) >= 1e21);
/**
 * Returns true if the given value is an empty Object.
 *
 * @param v the value to check.
 *
 * @return true if the value is an empty Object, false if not.
 */


api.isEmptyObject = v => api.isObject(v) && Object.keys(v).length === 0;
/**
 * Returns true if the given value is a Number.
 *
 * @param v the value to check.
 *
 * @return true if the value is a Number, false if not.
 */


api.isNumber = v => typeof v === 'number' || Object.prototype.toString.call(v) === '[object Number]';
/**
 * Returns true if the given value is numeric.
 *
 * @param v the value to check.
 *
 * @return true if the value is numeric, false if not.
 */


api.isNumeric = v => !isNaN(parseFloat(v)) && isFinite(v);
/**
 * Returns true if the given value is an Object.
 *
 * @param v the value to check.
 *
 * @return true if the value is an Object, false if not.
 */


api.isObject = v => Object.prototype.toString.call(v) === '[object Object]';
/**
 * Returns true if the given value is a String.
 *
 * @param v the value to check.
 *
 * @return true if the value is a String, false if not.
 */


api.isString = v => typeof v === 'string' || Object.prototype.toString.call(v) === '[object String]';
/**
 * Returns true if the given value is undefined.
 *
 * @param v the value to check.
 *
 * @return true if the value is undefined, false if not.
 */


api.isUndefined = v => typeof v === 'undefined';

/***/ }),

/***/ "./lib/url.js":
/*!********************!*\
  !*** ./lib/url.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");

__webpack_require__(/*! core-js/modules/es.string.split.js */ "./node_modules/core-js/modules/es.string.split.js");

const types = __webpack_require__(/*! ./types */ "./lib/types.js");

const api = {};
module.exports = api; // define URL parser
// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
// with local jsonld.js modifications

api.parsers = {
  simple: {
    // RFC 3986 basic parts
    keys: ['href', 'scheme', 'authority', 'path', 'query', 'fragment'],

    /* eslint-disable-next-line max-len */
    regex: /^(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/
  },
  full: {
    keys: ['href', 'protocol', 'scheme', 'authority', 'auth', 'user', 'password', 'hostname', 'port', 'path', 'directory', 'file', 'query', 'fragment'],

    /* eslint-disable-next-line max-len */
    regex: /^(([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?(?:(((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/
  }
};

api.parse = (str, parser) => {
  const parsed = {};
  const o = api.parsers[parser || 'full'];
  const m = o.regex.exec(str);
  let i = o.keys.length;

  while (i--) {
    parsed[o.keys[i]] = m[i] === undefined ? null : m[i];
  } // remove default ports in found in URLs


  if (parsed.scheme === 'https' && parsed.port === '443' || parsed.scheme === 'http' && parsed.port === '80') {
    parsed.href = parsed.href.replace(':' + parsed.port, '');
    parsed.authority = parsed.authority.replace(':' + parsed.port, '');
    parsed.port = null;
  }

  parsed.normalizedPath = api.removeDotSegments(parsed.path);
  return parsed;
};
/**
 * Prepends a base IRI to the given relative IRI.
 *
 * @param base the base IRI.
 * @param iri the relative IRI.
 *
 * @return the absolute IRI.
 */


api.prependBase = (base, iri) => {
  // skip IRI processing
  if (base === null) {
    return iri;
  } // already an absolute IRI


  if (api.isAbsolute(iri)) {
    return iri;
  } // parse base if it is a string


  if (!base || types.isString(base)) {
    base = api.parse(base || '');
  } // parse given IRI


  const rel = api.parse(iri); // per RFC3986 5.2.2

  const transform = {
    protocol: base.protocol || ''
  };

  if (rel.authority !== null) {
    transform.authority = rel.authority;
    transform.path = rel.path;
    transform.query = rel.query;
  } else {
    transform.authority = base.authority;

    if (rel.path === '') {
      transform.path = base.path;

      if (rel.query !== null) {
        transform.query = rel.query;
      } else {
        transform.query = base.query;
      }
    } else {
      if (rel.path.indexOf('/') === 0) {
        // IRI represents an absolute path
        transform.path = rel.path;
      } else {
        // merge paths
        let path = base.path; // append relative path to the end of the last directory from base

        path = path.substr(0, path.lastIndexOf('/') + 1);

        if ((path.length > 0 || base.authority) && path.substr(-1) !== '/') {
          path += '/';
        }

        path += rel.path;
        transform.path = path;
      }

      transform.query = rel.query;
    }
  }

  if (rel.path !== '') {
    // remove slashes and dots in path
    transform.path = api.removeDotSegments(transform.path);
  } // construct URL


  let rval = transform.protocol;

  if (transform.authority !== null) {
    rval += '//' + transform.authority;
  }

  rval += transform.path;

  if (transform.query !== null) {
    rval += '?' + transform.query;
  }

  if (rel.fragment !== null) {
    rval += '#' + rel.fragment;
  } // handle empty base


  if (rval === '') {
    rval = './';
  }

  return rval;
};
/**
 * Removes a base IRI from the given absolute IRI.
 *
 * @param base the base IRI.
 * @param iri the absolute IRI.
 *
 * @return the relative IRI if relative to base, otherwise the absolute IRI.
 */


api.removeBase = (base, iri) => {
  // skip IRI processing
  if (base === null) {
    return iri;
  }

  if (!base || types.isString(base)) {
    base = api.parse(base || '');
  } // establish base root


  let root = '';

  if (base.href !== '') {
    root += (base.protocol || '') + '//' + (base.authority || '');
  } else if (iri.indexOf('//')) {
    // support network-path reference with empty base
    root += '//';
  } // IRI not relative to base


  if (iri.indexOf(root) !== 0) {
    return iri;
  } // remove root from IRI and parse remainder


  const rel = api.parse(iri.substr(root.length)); // remove path segments that match (do not remove last segment unless there
  // is a hash or query)

  const baseSegments = base.normalizedPath.split('/');
  const iriSegments = rel.normalizedPath.split('/');
  const last = rel.fragment || rel.query ? 0 : 1;

  while (baseSegments.length > 0 && iriSegments.length > last) {
    if (baseSegments[0] !== iriSegments[0]) {
      break;
    }

    baseSegments.shift();
    iriSegments.shift();
  } // use '../' for each non-matching base segment


  let rval = '';

  if (baseSegments.length > 0) {
    // don't count the last segment (if it ends with '/' last path doesn't
    // count and if it doesn't end with '/' it isn't a path)
    baseSegments.pop();

    for (let i = 0; i < baseSegments.length; ++i) {
      rval += '../';
    }
  } // prepend remaining segments


  rval += iriSegments.join('/'); // add query and hash

  if (rel.query !== null) {
    rval += '?' + rel.query;
  }

  if (rel.fragment !== null) {
    rval += '#' + rel.fragment;
  } // handle empty base


  if (rval === '') {
    rval = './';
  }

  return rval;
};
/**
 * Removes dot segments from a URL path.
 *
 * @param path the path to remove dot segments from.
 */


api.removeDotSegments = path => {
  // RFC 3986 5.2.4 (reworked)
  // empty path shortcut
  if (path.length === 0) {
    return '';
  }

  const input = path.split('/');
  const output = [];

  while (input.length > 0) {
    const next = input.shift();
    const done = input.length === 0;

    if (next === '.') {
      if (done) {
        // ensure output has trailing /
        output.push('');
      }

      continue;
    }

    if (next === '..') {
      output.pop();

      if (done) {
        // ensure output has trailing /
        output.push('');
      }

      continue;
    }

    output.push(next);
  } // if path was absolute, ensure output has leading /


  if (path[0] === '/' && output.length > 0 && output[0] !== '') {
    output.unshift('');
  }

  if (output.length === 1 && output[0] === '') {
    return '/';
  }

  return output.join('/');
}; // TODO: time better isAbsolute/isRelative checks using full regexes:
// http://jmrware.com/articles/2009/uri_regexp/URI_regex.html
// regex to check for absolute IRI (starting scheme and ':') or blank node IRI


const isAbsoluteRegex = /^([A-Za-z][A-Za-z0-9+-.]*|_):[^\s]*$/;
/**
 * Returns true if the given value is an absolute IRI or blank node IRI, false
 * if not.
 * Note: This weak check only checks for a correct starting scheme.
 *
 * @param v the value to check.
 *
 * @return true if the value is an absolute IRI, false if not.
 */

api.isAbsolute = v => types.isString(v) && isAbsoluteRegex.test(v);
/**
 * Returns true if the given value is a relative IRI, false if not.
 * Note: this is a weak check.
 *
 * @param v the value to check.
 *
 * @return true if the value is a relative IRI, false if not.
 */


api.isRelative = v => types.isString(v);

/***/ }),

/***/ "./lib/util.js":
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017-2019 Digital Bazaar, Inc. All rights reserved.
 */


__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");

__webpack_require__(/*! core-js/modules/es.object.assign.js */ "./node_modules/core-js/modules/es.object.assign.js");

__webpack_require__(/*! core-js/modules/es.string.match.js */ "./node_modules/core-js/modules/es.string.match.js");

__webpack_require__(/*! core-js/modules/es.array.sort.js */ "./node_modules/core-js/modules/es.array.sort.js");

const graphTypes = __webpack_require__(/*! ./graphTypes */ "./lib/graphTypes.js");

const types = __webpack_require__(/*! ./types */ "./lib/types.js"); // TODO: move `IdentifierIssuer` to its own package


const IdentifierIssuer = __webpack_require__(/*! rdf-canonize */ "./node_modules/rdf-canonize/index.js").IdentifierIssuer;

const JsonLdError = __webpack_require__(/*! ./JsonLdError */ "./lib/JsonLdError.js"); // constants


const REGEX_LINK_HEADERS = /(?:<[^>]*?>|"[^"]*?"|[^,])+/g;
const REGEX_LINK_HEADER = /\s*<([^>]*?)>\s*(?:;\s*(.*))?/;
const REGEX_LINK_HEADER_PARAMS = /(.*?)=(?:(?:"([^"]*?)")|([^"]*?))\s*(?:(?:;\s*)|$)/g;
const DEFAULTS = {
  headers: {
    accept: 'application/ld+json, application/json'
  }
};
const api = {};
module.exports = api;
api.IdentifierIssuer = IdentifierIssuer;
/**
 * Clones an object, array, Map, Set, or string/number. If a typed JavaScript
 * object is given, such as a Date, it will be converted to a string.
 *
 * @param value the value to clone.
 *
 * @return the cloned value.
 */

api.clone = function (value) {
  if (value && typeof value === 'object') {
    let rval;

    if (types.isArray(value)) {
      rval = [];

      for (let i = 0; i < value.length; ++i) {
        rval[i] = api.clone(value[i]);
      }
    } else if (value instanceof Map) {
      rval = new Map();

      for (const [k, v] of value) {
        rval.set(k, api.clone(v));
      }
    } else if (value instanceof Set) {
      rval = new Set();

      for (const v of value) {
        rval.add(api.clone(v));
      }
    } else if (types.isObject(value)) {
      rval = {};

      for (const key in value) {
        rval[key] = api.clone(value[key]);
      }
    } else {
      rval = value.toString();
    }

    return rval;
  }

  return value;
};
/**
 * Ensure a value is an array. If the value is an array, it is returned.
 * Otherwise, it is wrapped in an array.
 *
 * @param value the value to return as an array.
 *
 * @return the value as an array.
 */


api.asArray = function (value) {
  return Array.isArray(value) ? value : [value];
};
/**
 * Builds an HTTP headers object for making a JSON-LD request from custom
 * headers and asserts the `accept` header isn't overridden.
 *
 * @param headers an object of headers with keys as header names and values
 *          as header values.
 *
 * @return an object of headers with a valid `accept` header.
 */


api.buildHeaders = (headers = {}) => {
  const hasAccept = Object.keys(headers).some(h => h.toLowerCase() === 'accept');

  if (hasAccept) {
    throw new RangeError('Accept header may not be specified; only "' + DEFAULTS.headers.accept + '" is supported.');
  }

  return Object.assign({
    Accept: DEFAULTS.headers.accept
  }, headers);
};
/**
 * Parses a link header. The results will be key'd by the value of "rel".
 *
 * Link: <http://json-ld.org/contexts/person.jsonld>;
 * rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"
 *
 * Parses as: {
 *   'http://www.w3.org/ns/json-ld#context': {
 *     target: http://json-ld.org/contexts/person.jsonld,
 *     type: 'application/ld+json'
 *   }
 * }
 *
 * If there is more than one "rel" with the same IRI, then entries in the
 * resulting map for that "rel" will be arrays.
 *
 * @param header the link header to parse.
 */


api.parseLinkHeader = header => {
  const rval = {}; // split on unbracketed/unquoted commas

  const entries = header.match(REGEX_LINK_HEADERS);

  for (let i = 0; i < entries.length; ++i) {
    let match = entries[i].match(REGEX_LINK_HEADER);

    if (!match) {
      continue;
    }

    const result = {
      target: match[1]
    };
    const params = match[2];

    while (match = REGEX_LINK_HEADER_PARAMS.exec(params)) {
      result[match[1]] = match[2] === undefined ? match[3] : match[2];
    }

    const rel = result['rel'] || '';

    if (Array.isArray(rval[rel])) {
      rval[rel].push(result);
    } else if (rval.hasOwnProperty(rel)) {
      rval[rel] = [rval[rel], result];
    } else {
      rval[rel] = result;
    }
  }

  return rval;
};
/**
 * Throws an exception if the given value is not a valid @type value.
 *
 * @param v the value to check.
 */


api.validateTypeValue = (v, isFrame) => {
  if (types.isString(v)) {
    return;
  }

  if (types.isArray(v) && v.every(vv => types.isString(vv))) {
    return;
  }

  if (isFrame && types.isObject(v)) {
    switch (Object.keys(v).length) {
      case 0:
        // empty object is wildcard
        return;

      case 1:
        // default entry is all strings
        if ('@default' in v && api.asArray(v['@default']).every(vv => types.isString(vv))) {
          return;
        }

    }
  }

  throw new JsonLdError('Invalid JSON-LD syntax; "@type" value must a string, an array of ' + 'strings, an empty object, ' + 'or a default object.', 'jsonld.SyntaxError', {
    code: 'invalid type value',
    value: v
  });
};
/**
 * Returns true if the given subject has the given property.
 *
 * @param subject the subject to check.
 * @param property the property to look for.
 *
 * @return true if the subject has the given property, false if not.
 */


api.hasProperty = (subject, property) => {
  if (subject.hasOwnProperty(property)) {
    const value = subject[property];
    return !types.isArray(value) || value.length > 0;
  }

  return false;
};
/**
 * Determines if the given value is a property of the given subject.
 *
 * @param subject the subject to check.
 * @param property the property to check.
 * @param value the value to check.
 *
 * @return true if the value exists, false if not.
 */


api.hasValue = (subject, property, value) => {
  if (api.hasProperty(subject, property)) {
    let val = subject[property];
    const isList = graphTypes.isList(val);

    if (types.isArray(val) || isList) {
      if (isList) {
        val = val['@list'];
      }

      for (let i = 0; i < val.length; ++i) {
        if (api.compareValues(value, val[i])) {
          return true;
        }
      }
    } else if (!types.isArray(value)) {
      // avoid matching the set of values with an array value parameter
      return api.compareValues(value, val);
    }
  }

  return false;
};
/**
 * Adds a value to a subject. If the value is an array, all values in the
 * array will be added.
 *
 * @param subject the subject to add the value to.
 * @param property the property that relates the value to the subject.
 * @param value the value to add.
 * @param [options] the options to use:
 *        [propertyIsArray] true if the property is always an array, false
 *          if not (default: false).
 *        [valueIsArray] true if the value to be added should be preserved as
 *          an array (lists) (default: false).
 *        [allowDuplicate] true to allow duplicates, false not to (uses a
 *          simple shallow comparison of subject ID or value) (default: true).
 *        [prependValue] false to prepend value to any existing values.
 *          (default: false)
 */


api.addValue = (subject, property, value, options) => {
  options = options || {};

  if (!('propertyIsArray' in options)) {
    options.propertyIsArray = false;
  }

  if (!('valueIsArray' in options)) {
    options.valueIsArray = false;
  }

  if (!('allowDuplicate' in options)) {
    options.allowDuplicate = true;
  }

  if (!('prependValue' in options)) {
    options.prependValue = false;
  }

  if (options.valueIsArray) {
    subject[property] = value;
  } else if (types.isArray(value)) {
    if (value.length === 0 && options.propertyIsArray && !subject.hasOwnProperty(property)) {
      subject[property] = [];
    }

    if (options.prependValue) {
      value = value.concat(subject[property]);
      subject[property] = [];
    }

    for (let i = 0; i < value.length; ++i) {
      api.addValue(subject, property, value[i], options);
    }
  } else if (subject.hasOwnProperty(property)) {
    // check if subject already has value if duplicates not allowed
    const hasValue = !options.allowDuplicate && api.hasValue(subject, property, value); // make property an array if value not present or always an array

    if (!types.isArray(subject[property]) && (!hasValue || options.propertyIsArray)) {
      subject[property] = [subject[property]];
    } // add new value


    if (!hasValue) {
      if (options.prependValue) {
        subject[property].unshift(value);
      } else {
        subject[property].push(value);
      }
    }
  } else {
    // add new value as set or single value
    subject[property] = options.propertyIsArray ? [value] : value;
  }
};
/**
 * Gets all of the values for a subject's property as an array.
 *
 * @param subject the subject.
 * @param property the property.
 *
 * @return all of the values for a subject's property as an array.
 */


api.getValues = (subject, property) => [].concat(subject[property] || []);
/**
 * Removes a property from a subject.
 *
 * @param subject the subject.
 * @param property the property.
 */


api.removeProperty = (subject, property) => {
  delete subject[property];
};
/**
 * Removes a value from a subject.
 *
 * @param subject the subject.
 * @param property the property that relates the value to the subject.
 * @param value the value to remove.
 * @param [options] the options to use:
 *          [propertyIsArray] true if the property is always an array, false
 *            if not (default: false).
 */


api.removeValue = (subject, property, value, options) => {
  options = options || {};

  if (!('propertyIsArray' in options)) {
    options.propertyIsArray = false;
  } // filter out value


  const values = api.getValues(subject, property).filter(e => !api.compareValues(e, value));

  if (values.length === 0) {
    api.removeProperty(subject, property);
  } else if (values.length === 1 && !options.propertyIsArray) {
    subject[property] = values[0];
  } else {
    subject[property] = values;
  }
};
/**
 * Relabels all blank nodes in the given JSON-LD input.
 *
 * @param input the JSON-LD input.
 * @param [options] the options to use:
 *          [issuer] an IdentifierIssuer to use to label blank nodes.
 */


api.relabelBlankNodes = (input, options) => {
  options = options || {};
  const issuer = options.issuer || new IdentifierIssuer('_:b');
  return _labelBlankNodes(issuer, input);
};
/**
 * Compares two JSON-LD values for equality. Two JSON-LD values will be
 * considered equal if:
 *
 * 1. They are both primitives of the same type and value.
 * 2. They are both @values with the same @value, @type, @language,
 *   and @index, OR
 * 3. They both have @ids they are the same.
 *
 * @param v1 the first value.
 * @param v2 the second value.
 *
 * @return true if v1 and v2 are considered equal, false if not.
 */


api.compareValues = (v1, v2) => {
  // 1. equal primitives
  if (v1 === v2) {
    return true;
  } // 2. equal @values


  if (graphTypes.isValue(v1) && graphTypes.isValue(v2) && v1['@value'] === v2['@value'] && v1['@type'] === v2['@type'] && v1['@language'] === v2['@language'] && v1['@index'] === v2['@index']) {
    return true;
  } // 3. equal @ids


  if (types.isObject(v1) && '@id' in v1 && types.isObject(v2) && '@id' in v2) {
    return v1['@id'] === v2['@id'];
  }

  return false;
};
/**
 * Compares two strings first based on length and then lexicographically.
 *
 * @param a the first string.
 * @param b the second string.
 *
 * @return -1 if a < b, 1 if a > b, 0 if a === b.
 */


api.compareShortestLeast = (a, b) => {
  if (a.length < b.length) {
    return -1;
  }

  if (b.length < a.length) {
    return 1;
  }

  if (a === b) {
    return 0;
  }

  return a < b ? -1 : 1;
};
/**
 * Labels the blank nodes in the given value using the given IdentifierIssuer.
 *
 * @param issuer the IdentifierIssuer to use.
 * @param element the element with blank nodes to rename.
 *
 * @return the element.
 */


function _labelBlankNodes(issuer, element) {
  if (types.isArray(element)) {
    for (let i = 0; i < element.length; ++i) {
      element[i] = _labelBlankNodes(issuer, element[i]);
    }
  } else if (graphTypes.isList(element)) {
    element['@list'] = _labelBlankNodes(issuer, element['@list']);
  } else if (types.isObject(element)) {
    // relabel blank node
    if (graphTypes.isBlankNode(element)) {
      element['@id'] = issuer.getId(element['@id']);
    } // recursively apply to all keys


    const keys = Object.keys(element).sort();

    for (let ki = 0; ki < keys.length; ++ki) {
      const key = keys[ki];

      if (key !== '@id') {
        element[key] = _labelBlankNodes(issuer, element[key]);
      }
    }
  }

  return element;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectWithoutProperties.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var objectWithoutPropertiesLoose = __webpack_require__(/*! ./objectWithoutPropertiesLoose.js */ "./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

module.exports = _objectWithoutProperties;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/canonicalize/lib/canonicalize.js":
/*!*******************************************************!*\
  !*** ./node_modules/canonicalize/lib/canonicalize.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* jshint esversion: 6 */

/* jslint node: true */


__webpack_require__(/*! core-js/modules/web.url.to-json.js */ "./node_modules/core-js/modules/web.url.to-json.js");

__webpack_require__(/*! core-js/modules/es.array.reduce.js */ "./node_modules/core-js/modules/es.array.reduce.js");

__webpack_require__(/*! core-js/modules/es.array.sort.js */ "./node_modules/core-js/modules/es.array.sort.js");

module.exports = function serialize(object) {
  if (object === null || typeof object !== 'object' || object.toJSON != null) {
    return JSON.stringify(object);
  }

  if (Array.isArray(object)) {
    return '[' + object.reduce((t, cv, ci) => {
      const comma = ci === 0 ? '' : ',';
      const value = cv === undefined || typeof cv === 'symbol' ? null : cv;
      return t + comma + serialize(value);
    }, '') + ']';
  }

  return '{' + Object.keys(object).sort().reduce((t, cv, ci) => {
    if (object[cv] === undefined || typeof object[cv] === 'symbol') {
      return t;
    }

    const comma = t.length === 0 ? '' : ',';
    return t + comma + serialize(cv) + ':' + serialize(object[cv]);
  }, '') + '}';
};

/***/ }),

/***/ "./node_modules/core-js/internals/a-function.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/a-function.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/a-possible-prototype.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/a-possible-prototype.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/add-to-unscopables.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/add-to-unscopables.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "./node_modules/core-js/internals/advance-string-index.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/advance-string-index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(/*! ../internals/string-multibyte */ "./node_modules/core-js/internals/string-multibyte.js").charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "./node_modules/core-js/internals/an-instance.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/an-instance.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/an-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/an-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-buffer-native.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/array-buffer-native.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// eslint-disable-next-line es/no-typed-arrays -- safe
module.exports = typeof ArrayBuffer !== 'undefined' && typeof DataView !== 'undefined';


/***/ }),

/***/ "./node_modules/core-js/internals/array-buffer-view-core.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/array-buffer-view-core.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var NATIVE_ARRAY_BUFFER = __webpack_require__(/*! ../internals/array-buffer-native */ "./node_modules/core-js/internals/array-buffer-native.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");

var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var Uint8ClampedArray = global.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array && getPrototypeOf(Int8Array);
var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var isPrototypeOf = ObjectPrototype.isPrototypeOf;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(global.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQIRED = false;
var NAME;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var BigIntArrayConstructorsList = {
  BigInt64Array: 8,
  BigUint64Array: 8
};

var isView = function isView(it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return klass === 'DataView'
    || has(TypedArrayConstructorsList, klass)
    || has(BigIntArrayConstructorsList, klass);
};

var isTypedArray = function (it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return has(TypedArrayConstructorsList, klass)
    || has(BigIntArrayConstructorsList, klass);
};

var aTypedArray = function (it) {
  if (isTypedArray(it)) return it;
  throw TypeError('Target is not a typed array');
};

var aTypedArrayConstructor = function (C) {
  if (setPrototypeOf) {
    if (isPrototypeOf.call(TypedArray, C)) return C;
  } else for (var ARRAY in TypedArrayConstructorsList) if (has(TypedArrayConstructorsList, NAME)) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (C === TypedArrayConstructor || isPrototypeOf.call(TypedArrayConstructor, C))) {
      return C;
    }
  } throw TypeError('Target is not a typed array constructor');
};

var exportTypedArrayMethod = function (KEY, property, forced) {
  if (!DESCRIPTORS) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && has(TypedArrayConstructor.prototype, KEY)) try {
      delete TypedArrayConstructor.prototype[KEY];
    } catch (error) { /* empty */ }
  }
  if (!TypedArrayPrototype[KEY] || forced) {
    redefine(TypedArrayPrototype, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property);
  }
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS) return;
  if (setPrototypeOf) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global[ARRAY];
      if (TypedArrayConstructor && has(TypedArrayConstructor, KEY)) try {
        delete TypedArrayConstructor[KEY];
      } catch (error) { /* empty */ }
    }
    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return redefine(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && TypedArray[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      redefine(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  if (!global[NAME]) NATIVE_ARRAY_BUFFER_VIEWS = false;
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || typeof TypedArray != 'function' || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow -- safe
  TypedArray = function TypedArray() {
    throw TypeError('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME].prototype, TypedArrayPrototype);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (DESCRIPTORS && !has(TypedArrayPrototype, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQIRED = true;
  defineProperty(TypedArrayPrototype, TO_STRING_TAG, { get: function () {
    return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
  } });
  for (NAME in TypedArrayConstructorsList) if (global[NAME]) {
    createNonEnumerableProperty(global[NAME], TYPED_ARRAY_TAG, NAME);
  }
}

module.exports = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportTypedArrayMethod: exportTypedArrayMethod,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-buffer.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/array-buffer.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var NATIVE_ARRAY_BUFFER = __webpack_require__(/*! ../internals/array-buffer-native */ "./node_modules/core-js/internals/array-buffer-native.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "./node_modules/core-js/internals/redefine-all.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "./node_modules/core-js/internals/an-instance.js");
var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var toIndex = __webpack_require__(/*! ../internals/to-index */ "./node_modules/core-js/internals/to-index.js");
var IEEE754 = __webpack_require__(/*! ../internals/ieee754 */ "./node_modules/core-js/internals/ieee754.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");
var getOwnPropertyNames = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js").f;
var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;
var arrayFill = __webpack_require__(/*! ../internals/array-fill */ "./node_modules/core-js/internals/array-fill.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length';
var WRONG_INDEX = 'Wrong index';
var NativeArrayBuffer = global[ARRAY_BUFFER];
var $ArrayBuffer = NativeArrayBuffer;
var $DataView = global[DATA_VIEW];
var $DataViewPrototype = $DataView && $DataView[PROTOTYPE];
var ObjectPrototype = Object.prototype;
var RangeError = global.RangeError;

var packIEEE754 = IEEE754.pack;
var unpackIEEE754 = IEEE754.unpack;

var packInt8 = function (number) {
  return [number & 0xFF];
};

var packInt16 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF];
};

var packInt32 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
};

var unpackInt32 = function (buffer) {
  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};

var packFloat32 = function (number) {
  return packIEEE754(number, 23, 4);
};

var packFloat64 = function (number) {
  return packIEEE754(number, 52, 8);
};

var addGetter = function (Constructor, key) {
  defineProperty(Constructor[PROTOTYPE], key, { get: function () { return getInternalState(this)[key]; } });
};

var get = function (view, count, index, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = bytes.slice(start, start + count);
  return isLittleEndian ? pack : pack.reverse();
};

var set = function (view, count, index, conversion, value, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = conversion(+value);
  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
};

if (!NATIVE_ARRAY_BUFFER) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    setInternalState(this, {
      bytes: arrayFill.call(new Array(byteLength), 0),
      byteLength: byteLength
    });
    if (!DESCRIPTORS) this.byteLength = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = getInternalState(buffer).byteLength;
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    setInternalState(this, {
      buffer: buffer,
      byteLength: byteLength,
      byteOffset: offset
    });
    if (!DESCRIPTORS) {
      this.buffer = buffer;
      this.byteLength = byteLength;
      this.byteOffset = offset;
    }
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, 'byteLength');
    addGetter($DataView, 'buffer');
    addGetter($DataView, 'byteLength');
    addGetter($DataView, 'byteOffset');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
    }
  });
} else {
  /* eslint-disable no-new -- required for testing */
  if (!fails(function () {
    NativeArrayBuffer(1);
  }) || !fails(function () {
    new NativeArrayBuffer(-1);
  }) || fails(function () {
    new NativeArrayBuffer();
    new NativeArrayBuffer(1.5);
    new NativeArrayBuffer(NaN);
    return NativeArrayBuffer.name != ARRAY_BUFFER;
  })) {
  /* eslint-enable no-new -- required for testing */
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new NativeArrayBuffer(toIndex(length));
    };
    var ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE] = NativeArrayBuffer[PROTOTYPE];
    for (var keys = getOwnPropertyNames(NativeArrayBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) {
        createNonEnumerableProperty($ArrayBuffer, key, NativeArrayBuffer[key]);
      }
    }
    ArrayBufferPrototype.constructor = $ArrayBuffer;
  }

  // WebKit bug - the same parent prototype for typed arrays and data view
  if (setPrototypeOf && getPrototypeOf($DataViewPrototype) !== ObjectPrototype) {
    setPrototypeOf($DataViewPrototype, ObjectPrototype);
  }

  // iOS Safari 7.x bug
  var testView = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataViewPrototype.setInt8;
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll($DataViewPrototype, {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, { unsafe: true });
}

setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);

module.exports = {
  ArrayBuffer: $ArrayBuffer,
  DataView: $DataView
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-fill.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/array-fill.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

// `Array.prototype.fill` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.fill
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-includes.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-includes.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-iteration.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/array-iteration.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js/internals/array-species-create.js");

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_OUT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push.call(target, value); // filterOut
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterOut` method
  // https://github.com/tc39/proposal-array-filtering
  filterOut: createMethod(7)
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-method-is-strict.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/array-method-is-strict.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-reduce.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/array-reduce.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-species-create.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/array-species-create.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/check-correctness-of-iteration.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/check-correctness-of-iteration.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof-raw.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/classof-raw.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/classof.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js/internals/to-string-tag-support.js");
var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/copy-constructor-properties.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "./node_modules/core-js/internals/own-keys.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/correct-is-regexp-logic.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/correct-is-regexp-logic.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};


/***/ }),

/***/ "./node_modules/core-js/internals/correct-prototype-getter.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/correct-prototype-getter.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "./node_modules/core-js/internals/create-iterator-constructor.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-iterator-constructor.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js").IteratorPrototype;
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-non-enumerable-property.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/create-non-enumerable-property.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-property-descriptor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-property.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/create-property.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "./node_modules/core-js/internals/define-iterator.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/define-iterator.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var createIteratorConstructor = __webpack_require__(/*! ../internals/create-iterator-constructor */ "./node_modules/core-js/internals/create-iterator-constructor.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
var IteratorsCore = __webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js");

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),

/***/ "./node_modules/core-js/internals/descriptors.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/descriptors.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/document-create-element.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/document-create-element.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/internals/dom-iterables.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/dom-iterables.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "./node_modules/core-js/internals/engine-is-browser.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-is-browser.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = typeof window == 'object';


/***/ }),

/***/ "./node_modules/core-js/internals/engine-is-ios.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/engine-is-ios.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");

module.exports = /(?:iphone|ipod|ipad).*applewebkit/i.test(userAgent);


/***/ }),

/***/ "./node_modules/core-js/internals/engine-is-node.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/engine-is-node.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = classof(global.process) == 'process';


/***/ }),

/***/ "./node_modules/core-js/internals/engine-is-webos-webkit.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-is-webos-webkit.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");

module.exports = /web0s(?!.*chrome)/i.test(userAgent);


/***/ }),

/***/ "./node_modules/core-js/internals/engine-user-agent.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-user-agent.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "./node_modules/core-js/internals/engine-v8-version.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-v8-version.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] < 4 ? 1 : match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),

/***/ "./node_modules/core-js/internals/enum-bug-keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "./node_modules/core-js/internals/export.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/export.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f;
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "./node_modules/core-js/internals/copy-constructor-properties.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/fails.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/internals/fails.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(/*! ../modules/es.regexp.exec */ "./node_modules/core-js/modules/es.regexp.exec.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

var SPECIES = wellKnownSymbol('species');
var RegExpPrototype = RegExp.prototype;

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var $exec = regexp.exec;
      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExpPrototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-bind-context.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-bind-context.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-built-in.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-built-in.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js/internals/path.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-iterator-method.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/get-iterator-method.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-substitution.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/get-substitution.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var floor = Math.floor;
var replace = ''.replace;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace.call(replacement, symbols, function (match, ch) {
    var capture;
    switch (ch.charAt(0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return str.slice(0, position);
      case "'": return str.slice(tailPos);
      case '<':
        capture = namedCaptures[ch.slice(1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/global.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/global.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/core-js/internals/has.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/has.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function hasOwn(it, key) {
  return hasOwnProperty.call(toObject(it), key);
};


/***/ }),

/***/ "./node_modules/core-js/internals/hidden-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/hidden-keys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/internals/host-report-errors.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/host-report-errors.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/html.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/html.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "./node_modules/core-js/internals/ie8-dom-define.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/ieee754.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/ieee754.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IEEE754 conversions based on https://github.com/feross/ieee754
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;

var pack = function (number, mantissaLength, bytes) {
  var buffer = new Array(bytes);
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
  var index = 0;
  var exponent, mantissa, c;
  number = abs(number);
  // eslint-disable-next-line no-self-compare -- NaN check
  if (number != number || number === Infinity) {
    // eslint-disable-next-line no-self-compare -- NaN check
    mantissa = number != number ? 1 : 0;
    exponent = eMax;
  } else {
    exponent = floor(log(number) / LN2);
    if (number * (c = pow(2, -exponent)) < 1) {
      exponent--;
      c *= 2;
    }
    if (exponent + eBias >= 1) {
      number += rt / c;
    } else {
      number += rt * pow(2, 1 - eBias);
    }
    if (number * c >= 2) {
      exponent++;
      c /= 2;
    }
    if (exponent + eBias >= eMax) {
      mantissa = 0;
      exponent = eMax;
    } else if (exponent + eBias >= 1) {
      mantissa = (number * c - 1) * pow(2, mantissaLength);
      exponent = exponent + eBias;
    } else {
      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
      exponent = 0;
    }
  }
  for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);
  exponent = exponent << mantissaLength | mantissa;
  exponentLength += mantissaLength;
  for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);
  buffer[--index] |= sign * 128;
  return buffer;
};

var unpack = function (buffer, mantissaLength) {
  var bytes = buffer.length;
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var nBits = exponentLength - 7;
  var index = bytes - 1;
  var sign = buffer[index--];
  var exponent = sign & 127;
  var mantissa;
  sign >>= 7;
  for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);
  mantissa = exponent & (1 << -nBits) - 1;
  exponent >>= -nBits;
  nBits += mantissaLength;
  for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);
  if (exponent === 0) {
    exponent = 1 - eBias;
  } else if (exponent === eMax) {
    return mantissa ? NaN : sign ? -Infinity : Infinity;
  } else {
    mantissa = mantissa + pow(2, mantissaLength);
    exponent = exponent - eBias;
  } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
};

module.exports = {
  pack: pack,
  unpack: unpack
};


/***/ }),

/***/ "./node_modules/core-js/internals/indexed-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/indexed-object.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "./node_modules/core-js/internals/inherit-if-required.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/inherit-if-required.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "./node_modules/core-js/internals/inspect-source.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/inspect-source.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "./node_modules/core-js/internals/internal-state.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/internal-state.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "./node_modules/core-js/internals/native-weak-map.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var objectHas = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var shared = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-array-iterator-method.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/is-array-iterator-method.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-array.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/is-array.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-forced.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-forced.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "./node_modules/core-js/internals/is-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-pure.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/is-pure.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/internals/is-regexp.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-regexp.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ "./node_modules/core-js/internals/iterate.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/iterate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ "./node_modules/core-js/internals/is-array-iterator-method.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "./node_modules/core-js/internals/get-iterator-method.js");
var iteratorClose = __webpack_require__(/*! ../internals/iterator-close */ "./node_modules/core-js/internals/iterator-close.js");

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator);
      throw error;
    }
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};


/***/ }),

/***/ "./node_modules/core-js/internals/iterator-close.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/iterator-close.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

module.exports = function (iterator) {
  var returnMethod = iterator['return'];
  if (returnMethod !== undefined) {
    return anObject(returnMethod.call(iterator)).value;
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/iterators-core.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/iterators-core.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if ((!IS_PURE || NEW_ITERATOR_PROTOTYPE) && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "./node_modules/core-js/internals/iterators.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/iterators.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/internals/microtask.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/microtask.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f;
var macrotask = __webpack_require__(/*! ../internals/task */ "./node_modules/core-js/internals/task.js").set;
var IS_IOS = __webpack_require__(/*! ../internals/engine-is-ios */ "./node_modules/core-js/internals/engine-is-ios.js");
var IS_WEBOS_WEBKIT = __webpack_require__(/*! ../internals/engine-is-webos-webkit */ "./node_modules/core-js/internals/engine-is-webos-webkit.js");
var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ "./node_modules/core-js/internals/engine-is-node.js");

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var document = global.document;
var process = global.process;
var Promise = global.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise;
    then = promise.then;
    notify = function () {
      then.call(promise, flush);
    };
  // Node.js without promises
  } else if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};


/***/ }),

/***/ "./node_modules/core-js/internals/native-promise-constructor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/native-promise-constructor.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = global.Promise;


/***/ }),

/***/ "./node_modules/core-js/internals/native-symbol.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/native-symbol.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js/internals/engine-v8-version.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  return !String(Symbol()) ||
    // Chrome 38 Symbol has incorrect toString conversion
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ "./node_modules/core-js/internals/native-weak-map.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/native-weak-map.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "./node_modules/core-js/internals/new-promise-capability.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/new-promise-capability.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
};

// 25.4.1.5 NewPromiseCapability(C)
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "./node_modules/core-js/internals/not-a-regexp.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/not-a-regexp.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isRegExp = __webpack_require__(/*! ../internals/is-regexp */ "./node_modules/core-js/internals/is-regexp.js");

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-assign.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-assign.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty = Object.defineProperty;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
module.exports = !$assign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es/no-symbol -- safe
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ "./node_modules/core-js/internals/object-create.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-create.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var defineProperties = __webpack_require__(/*! ../internals/object-define-properties */ "./node_modules/core-js/internals/object-define-properties.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");
var html = __webpack_require__(/*! ../internals/html */ "./node_modules/core-js/internals/html.js");
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject -- old IE */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-properties.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-properties.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-property.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-names.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-prototype-of.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "./node_modules/core-js/internals/correct-prototype-getter.js");

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys-internal.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var indexOf = __webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js").indexOf;
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-property-is-enumerable.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/internals/object-set-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-set-prototype-of.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var aPossiblePrototype = __webpack_require__(/*! ../internals/a-possible-prototype */ "./node_modules/core-js/internals/a-possible-prototype.js");

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "./node_modules/core-js/internals/own-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/own-keys.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "./node_modules/core-js/internals/path.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/path.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = global;


/***/ }),

/***/ "./node_modules/core-js/internals/perform.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/perform.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/promise-resolve.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/promise-resolve.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var newPromiseCapability = __webpack_require__(/*! ../internals/new-promise-capability */ "./node_modules/core-js/internals/new-promise-capability.js");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "./node_modules/core-js/internals/redefine-all.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/redefine-all.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ "./node_modules/core-js/internals/redefine.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/redefine.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) {
      createNonEnumerableProperty(value, 'name', key);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-exec-abstract.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-exec-abstract.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var regexpExec = __webpack_require__(/*! ./regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),

/***/ "./node_modules/core-js/internals/regexp-exec.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-exec.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var regexpFlags = __webpack_require__(/*! ./regexp-flags */ "./node_modules/core-js/internals/regexp-flags.js");
var stickyHelpers = __webpack_require__(/*! ./regexp-sticky-helpers */ "./node_modules/core-js/internals/regexp-sticky-helpers.js");
var shared = __webpack_require__(/*! ./shared */ "./node_modules/core-js/internals/shared.js");

var nativeExec = RegExp.prototype.exec;
var nativeReplace = shared('native-string-replace', String.prototype.replace);

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-flags.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-flags.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/regexp-sticky-helpers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-sticky-helpers.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(/*! ./fails */ "./node_modules/core-js/internals/fails.js");

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ "./node_modules/core-js/internals/require-object-coercible.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-global.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/set-global.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-species.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/set-species.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-to-string-tag.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/set-to-string-tag.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared-key.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/shared-key.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared-store.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/shared-store.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "./node_modules/core-js/internals/shared.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/shared.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.12.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/internals/species-constructor.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/species-constructor.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),

/***/ "./node_modules/core-js/internals/string-multibyte.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/string-multibyte.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "./node_modules/core-js/internals/string-pad-webkit-bug.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/string-pad-webkit-bug.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/zloirock/core-js/issues/280
var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");

// eslint-disable-next-line unicorn/no-unsafe-regex -- safe
module.exports = /Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(userAgent);


/***/ }),

/***/ "./node_modules/core-js/internals/string-pad.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/string-pad.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var repeat = __webpack_require__(/*! ../internals/string-repeat */ "./node_modules/core-js/internals/string-repeat.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

var ceil = Math.ceil;

// `String.prototype.{ padStart, padEnd }` methods implementation
var createMethod = function (IS_END) {
  return function ($this, maxLength, fillString) {
    var S = String(requireObjectCoercible($this));
    var stringLength = S.length;
    var fillStr = fillString === undefined ? ' ' : String(fillString);
    var intMaxLength = toLength(maxLength);
    var fillLen, stringFiller;
    if (intMaxLength <= stringLength || fillStr == '') return S;
    fillLen = intMaxLength - stringLength;
    stringFiller = repeat.call(fillStr, ceil(fillLen / fillStr.length));
    if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
    return IS_END ? S + stringFiller : stringFiller + S;
  };
};

module.exports = {
  // `String.prototype.padStart` method
  // https://tc39.es/ecma262/#sec-string.prototype.padstart
  start: createMethod(false),
  // `String.prototype.padEnd` method
  // https://tc39.es/ecma262/#sec-string.prototype.padend
  end: createMethod(true)
};


/***/ }),

/***/ "./node_modules/core-js/internals/string-repeat.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/string-repeat.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

// `String.prototype.repeat` method implementation
// https://tc39.es/ecma262/#sec-string.prototype.repeat
module.exports = function repeat(count) {
  var str = String(requireObjectCoercible(this));
  var result = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/task.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/task.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
var html = __webpack_require__(/*! ../internals/html */ "./node_modules/core-js/internals/html.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");
var IS_IOS = __webpack_require__(/*! ../internals/engine-is-ios */ "./node_modules/core-js/internals/engine-is-ios.js");
var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ "./node_modules/core-js/internals/engine-is-node.js");

var location = global.location;
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins -- safe
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(id + '', location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global.addEventListener &&
    typeof postMessage == 'function' &&
    !global.importScripts &&
    location && location.protocol !== 'file:' &&
    !fails(post)
  ) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};


/***/ }),

/***/ "./node_modules/core-js/internals/this-number-value.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/this-number-value.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
module.exports = function (value) {
  if (typeof value != 'number' && classof(value) != 'Number') {
    throw TypeError('Incorrect invocation');
  }
  return +value;
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-absolute-index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-index.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/to-index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

// `ToIndex` abstract operation
// https://tc39.es/ecma262/#sec-toindex
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length or index');
  return length;
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-indexed-object.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-integer.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/to-integer.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-length.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-length.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-offset.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-offset.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPositiveInteger = __webpack_require__(/*! ../internals/to-positive-integer */ "./node_modules/core-js/internals/to-positive-integer.js");

module.exports = function (it, BYTES) {
  var offset = toPositiveInteger(it);
  if (offset % BYTES) throw RangeError('Wrong offset');
  return offset;
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-positive-integer.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/to-positive-integer.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

module.exports = function (it) {
  var result = toInteger(it);
  if (result < 0) throw RangeError("The argument can't be less than 0");
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-primitive.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/to-primitive.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-string-tag-support.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/to-string-tag-support.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "./node_modules/core-js/internals/typed-array-constructor.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/typed-array-constructor.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = __webpack_require__(/*! ../internals/typed-array-constructors-require-wrappers */ "./node_modules/core-js/internals/typed-array-constructors-require-wrappers.js");
var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "./node_modules/core-js/internals/array-buffer-view-core.js");
var ArrayBufferModule = __webpack_require__(/*! ../internals/array-buffer */ "./node_modules/core-js/internals/array-buffer.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "./node_modules/core-js/internals/an-instance.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var toIndex = __webpack_require__(/*! ../internals/to-index */ "./node_modules/core-js/internals/to-index.js");
var toOffset = __webpack_require__(/*! ../internals/to-offset */ "./node_modules/core-js/internals/to-offset.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");
var getOwnPropertyNames = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js").f;
var typedArrayFrom = __webpack_require__(/*! ../internals/typed-array-from */ "./node_modules/core-js/internals/typed-array-from.js");
var forEach = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").forEach;
var setSpecies = __webpack_require__(/*! ../internals/set-species */ "./node_modules/core-js/internals/set-species.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
var inheritIfRequired = __webpack_require__(/*! ../internals/inherit-if-required */ "./node_modules/core-js/internals/inherit-if-required.js");

var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var round = Math.round;
var RangeError = global.RangeError;
var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
var DataView = ArrayBufferModule.DataView;
var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
var TYPED_ARRAY_TAG = ArrayBufferViewCore.TYPED_ARRAY_TAG;
var TypedArray = ArrayBufferViewCore.TypedArray;
var TypedArrayPrototype = ArrayBufferViewCore.TypedArrayPrototype;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var isTypedArray = ArrayBufferViewCore.isTypedArray;
var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
var WRONG_LENGTH = 'Wrong length';

var fromList = function (C, list) {
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
};

var addGetter = function (it, key) {
  nativeDefineProperty(it, key, { get: function () {
    return getInternalState(this)[key];
  } });
};

var isArrayBuffer = function (it) {
  var klass;
  return it instanceof ArrayBuffer || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
};

var isTypedArrayIndex = function (target, key) {
  return isTypedArray(target)
    && typeof key != 'symbol'
    && key in target
    && String(+key) == String(key);
};

var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
  return isTypedArrayIndex(target, key = toPrimitive(key, true))
    ? createPropertyDescriptor(2, target[key])
    : nativeGetOwnPropertyDescriptor(target, key);
};

var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
  if (isTypedArrayIndex(target, key = toPrimitive(key, true))
    && isObject(descriptor)
    && has(descriptor, 'value')
    && !has(descriptor, 'get')
    && !has(descriptor, 'set')
    // TODO: add validation descriptor w/o calling accessors
    && !descriptor.configurable
    && (!has(descriptor, 'writable') || descriptor.writable)
    && (!has(descriptor, 'enumerable') || descriptor.enumerable)
  ) {
    target[key] = descriptor.value;
    return target;
  } return nativeDefineProperty(target, key, descriptor);
};

if (DESCRIPTORS) {
  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
    getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
    definePropertyModule.f = wrappedDefineProperty;
    addGetter(TypedArrayPrototype, 'buffer');
    addGetter(TypedArrayPrototype, 'byteOffset');
    addGetter(TypedArrayPrototype, 'byteLength');
    addGetter(TypedArrayPrototype, 'length');
  }

  $({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
    defineProperty: wrappedDefineProperty
  });

  module.exports = function (TYPE, wrapper, CLAMPED) {
    var BYTES = TYPE.match(/\d+$/)[0] / 8;
    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + TYPE;
    var SETTER = 'set' + TYPE;
    var NativeTypedArrayConstructor = global[CONSTRUCTOR_NAME];
    var TypedArrayConstructor = NativeTypedArrayConstructor;
    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
    var exported = {};

    var getter = function (that, index) {
      var data = getInternalState(that);
      return data.view[GETTER](index * BYTES + data.byteOffset, true);
    };

    var setter = function (that, index, value) {
      var data = getInternalState(that);
      if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
    };

    var addElement = function (that, index) {
      nativeDefineProperty(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };

    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
        anInstance(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
        var index = 0;
        var byteOffset = 0;
        var buffer, byteLength, length;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new ArrayBuffer(byteLength);
        } else if (isArrayBuffer(data)) {
          buffer = data;
          byteOffset = toOffset(offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - byteOffset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (isTypedArray(data)) {
          return fromList(TypedArrayConstructor, data);
        } else {
          return typedArrayFrom.call(TypedArrayConstructor, data);
        }
        setInternalState(that, {
          buffer: buffer,
          byteOffset: byteOffset,
          byteLength: byteLength,
          length: length,
          view: new DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype);
    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
        anInstance(dummy, TypedArrayConstructor, CONSTRUCTOR_NAME);
        return inheritIfRequired(function () {
          if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
          if (isArrayBuffer(data)) return $length !== undefined
            ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length)
            : typedArrayOffset !== undefined
              ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES))
              : new NativeTypedArrayConstructor(data);
          if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
          return typedArrayFrom.call(TypedArrayConstructor, data);
        }(), dummy, TypedArrayConstructor);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
        if (!(key in TypedArrayConstructor)) {
          createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
        }
      });
      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
    }

    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
    }

    if (TYPED_ARRAY_TAG) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
    }

    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

    $({
      global: true, forced: TypedArrayConstructor != NativeTypedArrayConstructor, sham: !NATIVE_ARRAY_BUFFER_VIEWS
    }, exported);

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
      createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
    }

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
    }

    setSpecies(CONSTRUCTOR_NAME);
  };
} else module.exports = function () { /* empty */ };


/***/ }),

/***/ "./node_modules/core-js/internals/typed-array-constructors-require-wrappers.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/core-js/internals/typed-array-constructors-require-wrappers.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-new -- required for testing */
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ "./node_modules/core-js/internals/check-correctness-of-iteration.js");
var NATIVE_ARRAY_BUFFER_VIEWS = __webpack_require__(/*! ../internals/array-buffer-view-core */ "./node_modules/core-js/internals/array-buffer-view-core.js").NATIVE_ARRAY_BUFFER_VIEWS;

var ArrayBuffer = global.ArrayBuffer;
var Int8Array = global.Int8Array;

module.exports = !NATIVE_ARRAY_BUFFER_VIEWS || !fails(function () {
  Int8Array(1);
}) || !fails(function () {
  new Int8Array(-1);
}) || !checkCorrectnessOfIteration(function (iterable) {
  new Int8Array();
  new Int8Array(null);
  new Int8Array(1.5);
  new Int8Array(iterable);
}, true) || fails(function () {
  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
  return new Int8Array(new ArrayBuffer(2), 1, undefined).length !== 1;
});


/***/ }),

/***/ "./node_modules/core-js/internals/typed-array-from.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/typed-array-from.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "./node_modules/core-js/internals/get-iterator-method.js");
var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ "./node_modules/core-js/internals/is-array-iterator-method.js");
var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
var aTypedArrayConstructor = __webpack_require__(/*! ../internals/array-buffer-view-core */ "./node_modules/core-js/internals/array-buffer-view-core.js").aTypedArrayConstructor;

module.exports = function from(source /* , mapfn, thisArg */) {
  var O = toObject(source);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var i, length, result, step, iterator, next;
  if (iteratorMethod != undefined && !isArrayIteratorMethod(iteratorMethod)) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    O = [];
    while (!(step = next.call(iterator)).done) {
      O.push(step.value);
    }
  }
  if (mapping && argumentsLength > 2) {
    mapfn = bind(mapfn, arguments[2], 2);
  }
  length = toLength(O.length);
  result = new (aTypedArrayConstructor(this))(length);
  for (i = 0; length > i; i++) {
    result[i] = mapping ? mapfn(O[i], i) : O[i];
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/uid.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/uid.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "./node_modules/core-js/internals/use-symbol-as-uid.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/use-symbol-as-uid.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "./node_modules/core-js/internals/well-known-symbol.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js/internals/use-symbol-as-uid.js");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (NATIVE_SYMBOL && has(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.array-buffer.slice.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es.array-buffer.slice.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var ArrayBufferModule = __webpack_require__(/*! ../internals/array-buffer */ "./node_modules/core-js/internals/array-buffer.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "./node_modules/core-js/internals/species-constructor.js");

var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
var DataView = ArrayBufferModule.DataView;
var nativeArrayBufferSlice = ArrayBuffer.prototype.slice;

var INCORRECT_SLICE = fails(function () {
  return !new ArrayBuffer(2).slice(1, undefined).byteLength;
});

// `ArrayBuffer.prototype.slice` method
// https://tc39.es/ecma262/#sec-arraybuffer.prototype.slice
$({ target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
  slice: function slice(start, end) {
    if (nativeArrayBufferSlice !== undefined && end === undefined) {
      return nativeArrayBufferSlice.call(anObject(this), start); // FF fix
    }
    var length = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    var result = new (speciesConstructor(this, ArrayBuffer))(toLength(fin - first));
    var viewSource = new DataView(this);
    var viewTarget = new DataView(result);
    var index = 0;
    while (first < fin) {
      viewTarget.setUint8(index++, viewSource.getUint8(first++));
    } return result;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.iterator.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.iterator.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "./node_modules/core-js/internals/define-iterator.js");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.reduce.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.reduce.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $reduce = __webpack_require__(/*! ../internals/array-reduce */ "./node_modules/core-js/internals/array-reduce.js").left;
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "./node_modules/core-js/internals/array-method-is-strict.js");
var CHROME_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js/internals/engine-v8-version.js");
var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ "./node_modules/core-js/internals/engine-is-node.js");

var STRICT_METHOD = arrayMethodIsStrict('reduce');
// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;

// `Array.prototype.reduce` method
// https://tc39.es/ecma262/#sec-array.prototype.reduce
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || CHROME_BUG }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.reverse.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.reverse.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");

var nativeReverse = [].reverse;
var test = [1, 2];

// `Array.prototype.reverse` method
// https://tc39.es/ecma262/#sec-array.prototype.reverse
// fix for Safari 12.0 bug
// https://bugs.webkit.org/show_bug.cgi?id=188794
$({ target: 'Array', proto: true, forced: String(test) === String(test.reverse()) }, {
  reverse: function reverse() {
    // eslint-disable-next-line no-self-assign -- dirty hack
    if (isArray(this)) this.length = this.length;
    return nativeReverse.call(this);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.sort.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.sort.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "./node_modules/core-js/internals/array-method-is-strict.js");

var test = [];
var nativeSort = test.sort;

// IE8-
var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails(function () {
  test.sort(null);
});
// Old WebKit
var STRICT_METHOD = arrayMethodIsStrict('sort');

var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD;

// `Array.prototype.sort` method
// https://tc39.es/ecma262/#sec-array.prototype.sort
$({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? nativeSort.call(toObject(this))
      : nativeSort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.global-this.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.global-this.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

// `globalThis` object
// https://tc39.es/ecma262/#sec-globalthis
$({ global: true }, {
  globalThis: global
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.number.to-fixed.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es.number.to-fixed.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");
var thisNumberValue = __webpack_require__(/*! ../internals/this-number-value */ "./node_modules/core-js/internals/this-number-value.js");
var repeat = __webpack_require__(/*! ../internals/string-repeat */ "./node_modules/core-js/internals/string-repeat.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var nativeToFixed = 1.0.toFixed;
var floor = Math.floor;

var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

var multiply = function (data, n, c) {
  var index = -1;
  var c2 = c;
  while (++index < 6) {
    c2 += n * data[index];
    data[index] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};

var divide = function (data, n) {
  var index = 6;
  var c = 0;
  while (--index >= 0) {
    c += data[index];
    data[index] = floor(c / n);
    c = (c % n) * 1e7;
  }
};

var dataToString = function (data) {
  var index = 6;
  var s = '';
  while (--index >= 0) {
    if (s !== '' || index === 0 || data[index] !== 0) {
      var t = String(data[index]);
      s = s === '' ? t : s + repeat.call('0', 7 - t.length) + t;
    }
  } return s;
};

var FORCED = nativeToFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !fails(function () {
  // V8 ~ Android 4.3-
  nativeToFixed.call({});
});

// `Number.prototype.toFixed` method
// https://tc39.es/ecma262/#sec-number.prototype.tofixed
$({ target: 'Number', proto: true, forced: FORCED }, {
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toInteger(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k;

    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits');
    // eslint-disable-next-line no-self-compare -- NaN check
    if (number != number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return String(number);
    if (number < 0) {
      sign = '-';
      number = -number;
    }
    if (number > 1e-21) {
      e = log(number * pow(2, 69, 1)) - 69;
      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(data, 0, z);
        j = fractDigits;
        while (j >= 7) {
          multiply(data, 1e7, 0);
          j -= 7;
        }
        multiply(data, pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(data, 1 << 23);
          j -= 23;
        }
        divide(data, 1 << j);
        multiply(data, 1, 1);
        divide(data, 2);
        result = dataToString(data);
      } else {
        multiply(data, 0, z);
        multiply(data, 1 << -e, 0);
        result = dataToString(data) + repeat.call('0', fractDigits);
      }
    }
    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits
        ? '0.' + repeat.call('0', fractDigits - k) + result
        : result.slice(0, k - fractDigits) + '.' + result.slice(k - fractDigits));
    } else {
      result = sign + result;
    } return result;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.object.assign.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.assign.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var assign = __webpack_require__(/*! ../internals/object-assign */ "./node_modules/core-js/internals/object-assign.js");

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.object.from-entries.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.from-entries.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");

// `Object.fromEntries` method
// https://github.com/tc39/proposal-object-from-entries
$({ target: 'Object', stat: true }, {
  fromEntries: function fromEntries(iterable) {
    var obj = {};
    iterate(iterable, function (k, v) {
      createProperty(obj, k, v);
    }, { AS_ENTRIES: true });
    return obj;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.promise.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es.promise.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var NativePromise = __webpack_require__(/*! ../internals/native-promise-constructor */ "./node_modules/core-js/internals/native-promise-constructor.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "./node_modules/core-js/internals/redefine-all.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var setSpecies = __webpack_require__(/*! ../internals/set-species */ "./node_modules/core-js/internals/set-species.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "./node_modules/core-js/internals/an-instance.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");
var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");
var checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ "./node_modules/core-js/internals/check-correctness-of-iteration.js");
var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "./node_modules/core-js/internals/species-constructor.js");
var task = __webpack_require__(/*! ../internals/task */ "./node_modules/core-js/internals/task.js").set;
var microtask = __webpack_require__(/*! ../internals/microtask */ "./node_modules/core-js/internals/microtask.js");
var promiseResolve = __webpack_require__(/*! ../internals/promise-resolve */ "./node_modules/core-js/internals/promise-resolve.js");
var hostReportErrors = __webpack_require__(/*! ../internals/host-report-errors */ "./node_modules/core-js/internals/host-report-errors.js");
var newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ "./node_modules/core-js/internals/new-promise-capability.js");
var perform = __webpack_require__(/*! ../internals/perform */ "./node_modules/core-js/internals/perform.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var IS_BROWSER = __webpack_require__(/*! ../internals/engine-is-browser */ "./node_modules/core-js/internals/engine-is-browser.js");
var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ "./node_modules/core-js/internals/engine-is-node.js");
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js/internals/engine-v8-version.js");

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var NativePromisePrototype = NativePromise && NativePromise.prototype;
var PromiseConstructor = NativePromise;
var PromiseConstructorPrototype = NativePromisePrototype;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var SUBCLASSING = false;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We need Promise#finally in the pure version for preventing prototype pollution
  if (IS_PURE && !PromiseConstructorPrototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = new PromiseConstructor(function (resolve) { resolve(1); });
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
  if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_REJECTION_EVENT && (handler = global['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  task.call(global, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  task.call(global, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, wrapper, state),
            bind(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };
  PromiseConstructorPrototype = PromiseConstructor.prototype;
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructorPrototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && typeof NativePromise == 'function' && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          nativeThen.call(that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });

      // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
      redefine(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromiseConstructorPrototype);
    }
  }
}

$({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
$({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.regexp.constructor.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es.regexp.constructor.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");
var inheritIfRequired = __webpack_require__(/*! ../internals/inherit-if-required */ "./node_modules/core-js/internals/inherit-if-required.js");
var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;
var getOwnPropertyNames = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js").f;
var isRegExp = __webpack_require__(/*! ../internals/is-regexp */ "./node_modules/core-js/internals/is-regexp.js");
var getFlags = __webpack_require__(/*! ../internals/regexp-flags */ "./node_modules/core-js/internals/regexp-flags.js");
var stickyHelpers = __webpack_require__(/*! ../internals/regexp-sticky-helpers */ "./node_modules/core-js/internals/regexp-sticky-helpers.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var enforceInternalState = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js").enforce;
var setSpecies = __webpack_require__(/*! ../internals/set-species */ "./node_modules/core-js/internals/set-species.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var MATCH = wellKnownSymbol('match');
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;

var FORCED = DESCRIPTORS && isForced('RegExp', (!CORRECT_NEW || UNSUPPORTED_Y || fails(function () {
  re2[MATCH] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
})));

// `RegExp` constructor
// https://tc39.es/ecma262/#sec-regexp-constructor
if (FORCED) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    var sticky;

    if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
      return pattern;
    }

    if (CORRECT_NEW) {
      if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
    } else if (pattern instanceof RegExpWrapper) {
      if (flagsAreUndefined) flags = getFlags.call(pattern);
      pattern = pattern.source;
    }

    if (UNSUPPORTED_Y) {
      sticky = !!flags && flags.indexOf('y') > -1;
      if (sticky) flags = flags.replace(/y/g, '');
    }

    var result = inheritIfRequired(
      CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags),
      thisIsRegExp ? this : RegExpPrototype,
      RegExpWrapper
    );

    if (UNSUPPORTED_Y && sticky) {
      var state = enforceInternalState(result);
      state.sticky = true;
    }

    return result;
  };
  var proxy = function (key) {
    key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
      configurable: true,
      get: function () { return NativeRegExp[key]; },
      set: function (it) { NativeRegExp[key] = it; }
    });
  };
  var keys = getOwnPropertyNames(NativeRegExp);
  var index = 0;
  while (keys.length > index) proxy(keys[index++]);
  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global, 'RegExp', RegExpWrapper);
}

// https://tc39.es/ecma262/#sec-get-regexp-@@species
setSpecies('RegExp');


/***/ }),

/***/ "./node_modules/core-js/modules/es.regexp.exec.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.regexp.exec.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var exec = __webpack_require__(/*! ../internals/regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.regexp.to-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es.regexp.to-string.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var flags = __webpack_require__(/*! ../internals/regexp-flags */ "./node_modules/core-js/internals/regexp-flags.js");

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.ends-with.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.ends-with.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f;
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var notARegExp = __webpack_require__(/*! ../internals/not-a-regexp */ "./node_modules/core-js/internals/not-a-regexp.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
var correctIsRegExpLogic = __webpack_require__(/*! ../internals/correct-is-regexp-logic */ "./node_modules/core-js/internals/correct-is-regexp-logic.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");

// eslint-disable-next-line es/no-string-prototype-endswith -- safe
var $endsWith = ''.endsWith;
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('endsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'endsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.endsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.endswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = String(requireObjectCoercible(this));
    notARegExp(searchString);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.includes.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.includes.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var notARegExp = __webpack_require__(/*! ../internals/not-a-regexp */ "./node_modules/core-js/internals/not-a-regexp.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
var correctIsRegExpLogic = __webpack_require__(/*! ../internals/correct-is-regexp-logic */ "./node_modules/core-js/internals/correct-is-regexp-logic.js");

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~String(requireObjectCoercible(this))
      .indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.match.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.match.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ "./node_modules/core-js/internals/advance-string-index.js");
var regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "./node_modules/core-js/internals/regexp-exec-abstract.js");

// @@match logic
fixRegExpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative(nativeMatch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.pad-start.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.pad-start.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $padStart = __webpack_require__(/*! ../internals/string-pad */ "./node_modules/core-js/internals/string-pad.js").start;
var WEBKIT_BUG = __webpack_require__(/*! ../internals/string-pad-webkit-bug */ "./node_modules/core-js/internals/string-pad-webkit-bug.js");

// `String.prototype.padStart` method
// https://tc39.es/ecma262/#sec-string.prototype.padstart
$({ target: 'String', proto: true, forced: WEBKIT_BUG }, {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.replace.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.replace.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ "./node_modules/core-js/internals/advance-string-index.js");
var getSubstitution = __webpack_require__(/*! ../internals/get-substitution */ "./node_modules/core-js/internals/get-substitution.js");
var regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "./node_modules/core-js/internals/regexp-exec-abstract.js");

var max = Math.max;
var min = Math.min;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.split.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.split.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js");
var isRegExp = __webpack_require__(/*! ../internals/is-regexp */ "./node_modules/core-js/internals/is-regexp.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "./node_modules/core-js/internals/species-constructor.js");
var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ "./node_modules/core-js/internals/advance-string-index.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var callRegExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "./node_modules/core-js/internals/regexp-exec-abstract.js");
var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");
var stickyHelpers = __webpack_require__(/*! ../internals/regexp-sticky-helpers */ "./node_modules/core-js/internals/regexp-sticky-helpers.js");

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// @@split logic
fixRegExpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    // eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (UNSUPPORTED_Y ? 'g' : 'y');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? S.slice(q) : S);
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, UNSUPPORTED_Y);


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.starts-with.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.starts-with.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f;
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var notARegExp = __webpack_require__(/*! ../internals/not-a-regexp */ "./node_modules/core-js/internals/not-a-regexp.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");
var correctIsRegExpLogic = __webpack_require__(/*! ../internals/correct-is-regexp-logic */ "./node_modules/core-js/internals/correct-is-regexp-logic.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");

// eslint-disable-next-line es/no-string-prototype-startswith -- safe
var $startsWith = ''.startsWith;
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.startsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.startswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = String(requireObjectCoercible(this));
    notARegExp(searchString);
    var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.symbol.description.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es.symbol.description.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.es/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "./node_modules/core-js/internals/copy-constructor-properties.js");

var NativeSymbol = global.Symbol;

if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es.typed-array.to-locale-string.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/modules/es.typed-array.to-locale-string.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "./node_modules/core-js/internals/array-buffer-view-core.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var Int8Array = global.Int8Array;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $toLocaleString = [].toLocaleString;
var $slice = [].slice;

// iOS Safari 6.x fails here
var TO_LOCALE_STRING_BUG = !!Int8Array && fails(function () {
  $toLocaleString.call(new Int8Array(1));
});

var FORCED = fails(function () {
  return [1, 2].toLocaleString() != new Int8Array([1, 2]).toLocaleString();
}) || !fails(function () {
  Int8Array.prototype.toLocaleString.call([1, 2]);
});

// `%TypedArray%.prototype.toLocaleString` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tolocalestring
exportTypedArrayMethod('toLocaleString', function toLocaleString() {
  return $toLocaleString.apply(TO_LOCALE_STRING_BUG ? $slice.call(aTypedArray(this)) : aTypedArray(this), arguments);
}, FORCED);


/***/ }),

/***/ "./node_modules/core-js/modules/es.typed-array.uint8-array.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es.typed-array.uint8-array.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__(/*! ../internals/typed-array-constructor */ "./node_modules/core-js/internals/typed-array-constructor.js");

// `Uint8Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint8', function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/web.dom-collections.iterator.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom-collections.iterator.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ "./node_modules/core-js/internals/dom-iterables.js");
var ArrayIteratorMethods = __webpack_require__(/*! ../modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}


/***/ }),

/***/ "./node_modules/core-js/modules/web.immediate.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/web.immediate.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var task = __webpack_require__(/*! ../internals/task */ "./node_modules/core-js/internals/task.js");

var FORCED = !global.setImmediate || !global.clearImmediate;

// http://w3c.github.io/setImmediate/
$({ global: true, bind: true, enumerable: true, forced: FORCED }, {
  // `setImmediate` method
  // http://w3c.github.io/setImmediate/#si-setImmediate
  setImmediate: task.set,
  // `clearImmediate` method
  // http://w3c.github.io/setImmediate/#si-clearImmediate
  clearImmediate: task.clear
});


/***/ }),

/***/ "./node_modules/core-js/modules/web.url.to-json.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/web.url.to-json.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
$({ target: 'URL', proto: true, enumerable: true }, {
  toJSON: function toJSON() {
    return URL.prototype.toString.call(this);
  }
});


/***/ }),

/***/ "./node_modules/lru-cache/index.js":
/*!*****************************************!*\
  !*** ./node_modules/lru-cache/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // A linked list to keep track of recently-used-ness

__webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

const Yallist = __webpack_require__(/*! yallist */ "./node_modules/yallist/yallist.js");

const MAX = Symbol('max');
const LENGTH = Symbol('length');
const LENGTH_CALCULATOR = Symbol('lengthCalculator');
const ALLOW_STALE = Symbol('allowStale');
const MAX_AGE = Symbol('maxAge');
const DISPOSE = Symbol('dispose');
const NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet');
const LRU_LIST = Symbol('lruList');
const CACHE = Symbol('cache');
const UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet');

const naiveLength = () => 1; // lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.


class LRUCache {
  constructor(options) {
    if (typeof options === 'number') options = {
      max: options
    };
    if (!options) options = {};
    if (options.max && (typeof options.max !== 'number' || options.max < 0)) throw new TypeError('max must be a non-negative number'); // Kind of weird to have a default max of Infinity, but oh well.

    const max = this[MAX] = options.max || Infinity;
    const lc = options.length || naiveLength;
    this[LENGTH_CALCULATOR] = typeof lc !== 'function' ? naiveLength : lc;
    this[ALLOW_STALE] = options.stale || false;
    if (options.maxAge && typeof options.maxAge !== 'number') throw new TypeError('maxAge must be a number');
    this[MAX_AGE] = options.maxAge || 0;
    this[DISPOSE] = options.dispose;
    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
    this.reset();
  } // resize the cache when the max changes.


  set max(mL) {
    if (typeof mL !== 'number' || mL < 0) throw new TypeError('max must be a non-negative number');
    this[MAX] = mL || Infinity;
    trim(this);
  }

  get max() {
    return this[MAX];
  }

  set allowStale(allowStale) {
    this[ALLOW_STALE] = !!allowStale;
  }

  get allowStale() {
    return this[ALLOW_STALE];
  }

  set maxAge(mA) {
    if (typeof mA !== 'number') throw new TypeError('maxAge must be a non-negative number');
    this[MAX_AGE] = mA;
    trim(this);
  }

  get maxAge() {
    return this[MAX_AGE];
  } // resize the cache when the lengthCalculator changes.


  set lengthCalculator(lC) {
    if (typeof lC !== 'function') lC = naiveLength;

    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC;
      this[LENGTH] = 0;
      this[LRU_LIST].forEach(hit => {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
        this[LENGTH] += hit.length;
      });
    }

    trim(this);
  }

  get lengthCalculator() {
    return this[LENGTH_CALCULATOR];
  }

  get length() {
    return this[LENGTH];
  }

  get itemCount() {
    return this[LRU_LIST].length;
  }

  rforEach(fn, thisp) {
    thisp = thisp || this;

    for (let walker = this[LRU_LIST].tail; walker !== null;) {
      const prev = walker.prev;
      forEachStep(this, fn, walker, thisp);
      walker = prev;
    }
  }

  forEach(fn, thisp) {
    thisp = thisp || this;

    for (let walker = this[LRU_LIST].head; walker !== null;) {
      const next = walker.next;
      forEachStep(this, fn, walker, thisp);
      walker = next;
    }
  }

  keys() {
    return this[LRU_LIST].toArray().map(k => k.key);
  }

  values() {
    return this[LRU_LIST].toArray().map(k => k.value);
  }

  reset() {
    if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
      this[LRU_LIST].forEach(hit => this[DISPOSE](hit.key, hit.value));
    }

    this[CACHE] = new Map(); // hash of items by key

    this[LRU_LIST] = new Yallist(); // list of items in order of use recency

    this[LENGTH] = 0; // length of items in the list
  }

  dump() {
    return this[LRU_LIST].map(hit => isStale(this, hit) ? false : {
      k: hit.key,
      v: hit.value,
      e: hit.now + (hit.maxAge || 0)
    }).toArray().filter(h => h);
  }

  dumpLru() {
    return this[LRU_LIST];
  }

  set(key, value, maxAge) {
    maxAge = maxAge || this[MAX_AGE];
    if (maxAge && typeof maxAge !== 'number') throw new TypeError('maxAge must be a number');
    const now = maxAge ? Date.now() : 0;
    const len = this[LENGTH_CALCULATOR](value, key);

    if (this[CACHE].has(key)) {
      if (len > this[MAX]) {
        del(this, this[CACHE].get(key));
        return false;
      }

      const node = this[CACHE].get(key);
      const item = node.value; // dispose of the old one before overwriting
      // split out into 2 ifs for better coverage tracking

      if (this[DISPOSE]) {
        if (!this[NO_DISPOSE_ON_SET]) this[DISPOSE](key, item.value);
      }

      item.now = now;
      item.maxAge = maxAge;
      item.value = value;
      this[LENGTH] += len - item.length;
      item.length = len;
      this.get(key);
      trim(this);
      return true;
    }

    const hit = new Entry(key, value, len, now, maxAge); // oversized objects fall out of cache automatically.

    if (hit.length > this[MAX]) {
      if (this[DISPOSE]) this[DISPOSE](key, value);
      return false;
    }

    this[LENGTH] += hit.length;
    this[LRU_LIST].unshift(hit);
    this[CACHE].set(key, this[LRU_LIST].head);
    trim(this);
    return true;
  }

  has(key) {
    if (!this[CACHE].has(key)) return false;
    const hit = this[CACHE].get(key).value;
    return !isStale(this, hit);
  }

  get(key) {
    return get(this, key, true);
  }

  peek(key) {
    return get(this, key, false);
  }

  pop() {
    const node = this[LRU_LIST].tail;
    if (!node) return null;
    del(this, node);
    return node.value;
  }

  del(key) {
    del(this, this[CACHE].get(key));
  }

  load(arr) {
    // reset the cache
    this.reset();
    const now = Date.now(); // A previous serialized cache has the most recent items first

    for (let l = arr.length - 1; l >= 0; l--) {
      const hit = arr[l];
      const expiresAt = hit.e || 0;
      if (expiresAt === 0) // the item was created without expiration in a non aged cache
        this.set(hit.k, hit.v);else {
        const maxAge = expiresAt - now; // dont add already expired items

        if (maxAge > 0) {
          this.set(hit.k, hit.v, maxAge);
        }
      }
    }
  }

  prune() {
    this[CACHE].forEach((value, key) => get(this, key, false));
  }

}

const get = (self, key, doUse) => {
  const node = self[CACHE].get(key);

  if (node) {
    const hit = node.value;

    if (isStale(self, hit)) {
      del(self, node);
      if (!self[ALLOW_STALE]) return undefined;
    } else {
      if (doUse) {
        if (self[UPDATE_AGE_ON_GET]) node.value.now = Date.now();
        self[LRU_LIST].unshiftNode(node);
      }
    }

    return hit.value;
  }
};

const isStale = (self, hit) => {
  if (!hit || !hit.maxAge && !self[MAX_AGE]) return false;
  const diff = Date.now() - hit.now;
  return hit.maxAge ? diff > hit.maxAge : self[MAX_AGE] && diff > self[MAX_AGE];
};

const trim = self => {
  if (self[LENGTH] > self[MAX]) {
    for (let walker = self[LRU_LIST].tail; self[LENGTH] > self[MAX] && walker !== null;) {
      // We know that we're about to delete this one, and also
      // what the next least recently used key will be, so just
      // go ahead and set it now.
      const prev = walker.prev;
      del(self, walker);
      walker = prev;
    }
  }
};

const del = (self, node) => {
  if (node) {
    const hit = node.value;
    if (self[DISPOSE]) self[DISPOSE](hit.key, hit.value);
    self[LENGTH] -= hit.length;
    self[CACHE].delete(hit.key);
    self[LRU_LIST].removeNode(node);
  }
};

class Entry {
  constructor(key, value, length, now, maxAge) {
    this.key = key;
    this.value = value;
    this.length = length;
    this.now = now;
    this.maxAge = maxAge || 0;
  }

}

const forEachStep = (self, fn, node, thisp) => {
  let hit = node.value;

  if (isStale(self, hit)) {
    del(self, node);
    if (!self[ALLOW_STALE]) hit = undefined;
  }

  if (hit) fn.call(thisp, hit.value, hit.key, self);
};

module.exports = LRUCache;

/***/ }),

/***/ "./node_modules/rdf-canonize/index.js":
/*!********************************************!*\
  !*** ./node_modules/rdf-canonize/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * An implementation of the RDF Dataset Normalization specification.
 *
 * @author Dave Longley
 *
 * Copyright 2010-2021 Digital Bazaar, Inc.
 */
module.exports = __webpack_require__(/*! ./lib */ "./node_modules/rdf-canonize/lib/index.js");

/***/ }),

/***/ "./node_modules/rdf-canonize/lib/IdentifierIssuer.js":
/*!***********************************************************!*\
  !*** ./node_modules/rdf-canonize/lib/IdentifierIssuer.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016-2021 Digital Bazaar, Inc. All rights reserved.
 */


__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

module.exports = class IdentifierIssuer {
  /**
   * Creates a new IdentifierIssuer. A IdentifierIssuer issues unique
   * identifiers, keeping track of any previously issued identifiers.
   *
   * @param prefix the prefix to use ('<prefix><counter>').
   * @param existing an existing Map to use.
   * @param counter the counter to use.
   */
  constructor(prefix, existing = new Map(), counter = 0) {
    this.prefix = prefix;
    this._existing = existing;
    this.counter = counter;
  }
  /**
   * Copies this IdentifierIssuer.
   *
   * @return a copy of this IdentifierIssuer.
   */


  clone() {
    const {
      prefix,
      _existing,
      counter
    } = this;
    return new IdentifierIssuer(prefix, new Map(_existing), counter);
  }
  /**
   * Gets the new identifier for the given old identifier, where if no old
   * identifier is given a new identifier will be generated.
   *
   * @param [old] the old identifier to get the new identifier for.
   *
   * @return the new identifier.
   */


  getId(old) {
    // return existing old identifier
    const existing = old && this._existing.get(old);

    if (existing) {
      return existing;
    } // get next identifier


    const identifier = this.prefix + this.counter;
    this.counter++; // save mapping

    if (old) {
      this._existing.set(old, identifier);
    }

    return identifier;
  }
  /**
   * Returns true if the given old identifer has already been assigned a new
   * identifier.
   *
   * @param old the old identifier to check.
   *
   * @return true if the old identifier has been assigned a new identifier,
   *   false if not.
   */


  hasId(old) {
    return this._existing.has(old);
  }
  /**
   * Returns all of the IDs that have been issued new IDs in the order in
   * which they were issued new IDs.
   *
   * @return the list of old IDs that has been issued new IDs in order.
   */


  getOldIds() {
    return [...this._existing.keys()];
  }

};

/***/ }),

/***/ "./node_modules/rdf-canonize/lib/MessageDigest-browser.js":
/*!****************************************************************!*\
  !*** ./node_modules/rdf-canonize/lib/MessageDigest-browser.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016-2021 Digital Bazaar, Inc. All rights reserved.
 */


__webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/es.array-buffer.slice.js */ "./node_modules/core-js/modules/es.array-buffer.slice.js");

__webpack_require__(/*! core-js/modules/es.typed-array.uint8-array.js */ "./node_modules/core-js/modules/es.typed-array.uint8-array.js");

__webpack_require__(/*! core-js/modules/es.typed-array.to-locale-string.js */ "./node_modules/core-js/modules/es.typed-array.to-locale-string.js");

__webpack_require__(/*! core-js/modules/es.string.pad-start.js */ "./node_modules/core-js/modules/es.string.pad-start.js");

__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");

const crypto = self.crypto || self.msCrypto;
module.exports = class MessageDigest {
  /**
   * Creates a new MessageDigest.
   *
   * @param algorithm the algorithm to use.
   */
  constructor(algorithm) {
    // check if crypto.subtle is available
    // check is here rather than top-level to only fail if class is used
    if (!(crypto && crypto.subtle)) {
      throw new Error('crypto.subtle not found.');
    }

    if (algorithm === 'sha256') {
      this.algorithm = {
        name: 'SHA-256'
      };
    } else if (algorithm === 'sha1') {
      this.algorithm = {
        name: 'SHA-1'
      };
    } else {
      throw new Error(`Unsupported algorithm "${algorithm}".`);
    }

    this._content = '';
  }

  update(msg) {
    this._content += msg;
  }

  async digest() {
    const data = new TextEncoder().encode(this._content);
    const buffer = new Uint8Array(await crypto.subtle.digest(this.algorithm, data)); // return digest in hex

    let hex = '';

    for (let i = 0; i < buffer.length; ++i) {
      hex += buffer[i].toString(16).padStart(2, '0');
    }

    return hex;
  }

};

/***/ }),

/***/ "./node_modules/rdf-canonize/lib/NQuads.js":
/*!*************************************************!*\
  !*** ./node_modules/rdf-canonize/lib/NQuads.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016-2021 Digital Bazaar, Inc. All rights reserved.
 */
 // eslint-disable-next-line no-unused-vars

__webpack_require__(/*! core-js/modules/es.regexp.constructor.js */ "./node_modules/core-js/modules/es.regexp.constructor.js");

__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");

__webpack_require__(/*! core-js/modules/es.string.split.js */ "./node_modules/core-js/modules/es.string.split.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

__webpack_require__(/*! core-js/modules/es.string.match.js */ "./node_modules/core-js/modules/es.string.match.js");

__webpack_require__(/*! core-js/modules/es.array.sort.js */ "./node_modules/core-js/modules/es.array.sort.js");

__webpack_require__(/*! core-js/modules/es.string.starts-with.js */ "./node_modules/core-js/modules/es.string.starts-with.js");

__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");

const TERMS = ['subject', 'predicate', 'object', 'graph'];
const RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
const RDF_LANGSTRING = RDF + 'langString';
const XSD_STRING = 'http://www.w3.org/2001/XMLSchema#string';
const TYPE_NAMED_NODE = 'NamedNode';
const TYPE_BLANK_NODE = 'BlankNode';
const TYPE_LITERAL = 'Literal';
const TYPE_DEFAULT_GRAPH = 'DefaultGraph'; // build regexes

const REGEX = {};

(() => {
  const iri = '(?:<([^:]+:[^>]*)>)'; // https://www.w3.org/TR/turtle/#grammar-production-BLANK_NODE_LABEL

  const PN_CHARS_BASE = 'A-Z' + 'a-z' + '\u00C0-\u00D6' + '\u00D8-\u00F6' + '\u00F8-\u02FF' + '\u0370-\u037D' + '\u037F-\u1FFF' + '\u200C-\u200D' + '\u2070-\u218F' + '\u2C00-\u2FEF' + '\u3001-\uD7FF' + '\uF900-\uFDCF' + '\uFDF0-\uFFFD'; // TODO:
  //'\u10000-\uEFFFF';

  const PN_CHARS_U = PN_CHARS_BASE + '_';
  const PN_CHARS = PN_CHARS_U + '0-9' + '-' + '\u00B7' + '\u0300-\u036F' + '\u203F-\u2040';
  const BLANK_NODE_LABEL = '(_:' + '(?:[' + PN_CHARS_U + '0-9])' + '(?:(?:[' + PN_CHARS + '.])*(?:[' + PN_CHARS + ']))?' + ')';
  const bnode = BLANK_NODE_LABEL;
  const plain = '"([^"\\\\]*(?:\\\\.[^"\\\\]*)*)"';
  const datatype = '(?:\\^\\^' + iri + ')';
  const language = '(?:@([a-zA-Z]+(?:-[a-zA-Z0-9]+)*))';
  const literal = '(?:' + plain + '(?:' + datatype + '|' + language + ')?)';
  const ws = '[ \\t]+';
  const wso = '[ \\t]*'; // define quad part regexes

  const subject = '(?:' + iri + '|' + bnode + ')' + ws;
  const property = iri + ws;
  const object = '(?:' + iri + '|' + bnode + '|' + literal + ')' + wso;
  const graphName = '(?:\\.|(?:(?:' + iri + '|' + bnode + ')' + wso + '\\.))'; // end of line and empty regexes

  REGEX.eoln = /(?:\r\n)|(?:\n)|(?:\r)/g;
  REGEX.empty = new RegExp('^' + wso + '$'); // full quad regex

  REGEX.quad = new RegExp('^' + wso + subject + property + object + graphName + wso + '$');
})();

module.exports = class NQuads {
  /**
   * Parses RDF in the form of N-Quads.
   *
   * @param input the N-Quads input to parse.
   *
   * @return an RDF dataset (an array of quads per http://rdf.js.org/).
   */
  static parse(input) {
    // build RDF dataset
    const dataset = [];
    const graphs = {}; // split N-Quad input into lines

    const lines = input.split(REGEX.eoln);
    let lineNumber = 0;

    for (const line of lines) {
      lineNumber++; // skip empty lines

      if (REGEX.empty.test(line)) {
        continue;
      } // parse quad


      const match = line.match(REGEX.quad);

      if (match === null) {
        throw new Error('N-Quads parse error on line ' + lineNumber + '.');
      } // create RDF quad


      const quad = {
        subject: null,
        predicate: null,
        object: null,
        graph: null
      }; // get subject

      if (match[1] !== undefined) {
        quad.subject = {
          termType: TYPE_NAMED_NODE,
          value: match[1]
        };
      } else {
        quad.subject = {
          termType: TYPE_BLANK_NODE,
          value: match[2]
        };
      } // get predicate


      quad.predicate = {
        termType: TYPE_NAMED_NODE,
        value: match[3]
      }; // get object

      if (match[4] !== undefined) {
        quad.object = {
          termType: TYPE_NAMED_NODE,
          value: match[4]
        };
      } else if (match[5] !== undefined) {
        quad.object = {
          termType: TYPE_BLANK_NODE,
          value: match[5]
        };
      } else {
        quad.object = {
          termType: TYPE_LITERAL,
          value: undefined,
          datatype: {
            termType: TYPE_NAMED_NODE
          }
        };

        if (match[7] !== undefined) {
          quad.object.datatype.value = match[7];
        } else if (match[8] !== undefined) {
          quad.object.datatype.value = RDF_LANGSTRING;
          quad.object.language = match[8];
        } else {
          quad.object.datatype.value = XSD_STRING;
        }

        quad.object.value = _unescape(match[6]);
      } // get graph


      if (match[9] !== undefined) {
        quad.graph = {
          termType: TYPE_NAMED_NODE,
          value: match[9]
        };
      } else if (match[10] !== undefined) {
        quad.graph = {
          termType: TYPE_BLANK_NODE,
          value: match[10]
        };
      } else {
        quad.graph = {
          termType: TYPE_DEFAULT_GRAPH,
          value: ''
        };
      } // only add quad if it is unique in its graph


      if (!(quad.graph.value in graphs)) {
        graphs[quad.graph.value] = [quad];
        dataset.push(quad);
      } else {
        let unique = true;
        const quads = graphs[quad.graph.value];

        for (const q of quads) {
          if (_compareTriples(q, quad)) {
            unique = false;
            break;
          }
        }

        if (unique) {
          quads.push(quad);
          dataset.push(quad);
        }
      }
    }

    return dataset;
  }
  /**
   * Converts an RDF dataset to N-Quads.
   *
   * @param dataset (array of quads) the RDF dataset to convert.
   *
   * @return the N-Quads string.
   */


  static serialize(dataset) {
    if (!Array.isArray(dataset)) {
      dataset = NQuads.legacyDatasetToQuads(dataset);
    }

    const quads = [];

    for (const quad of dataset) {
      quads.push(NQuads.serializeQuad(quad));
    }

    return quads.sort().join('');
  }
  /**
   * Converts an RDF quad to an N-Quad string (a single quad).
   *
   * @param quad the RDF quad convert.
   *
   * @return the N-Quad string.
   */


  static serializeQuad(quad) {
    const s = quad.subject;
    const p = quad.predicate;
    const o = quad.object;
    const g = quad.graph;
    let nquad = ''; // subject can only be NamedNode or BlankNode

    if (s.termType === TYPE_NAMED_NODE) {
      nquad += `<${s.value}>`;
    } else {
      nquad += `${s.value}`;
    } // predicate can only be NamedNode


    nquad += ` <${p.value}> `; // object is NamedNode, BlankNode, or Literal

    if (o.termType === TYPE_NAMED_NODE) {
      nquad += `<${o.value}>`;
    } else if (o.termType === TYPE_BLANK_NODE) {
      nquad += o.value;
    } else {
      nquad += `"${_escape(o.value)}"`;

      if (o.datatype.value === RDF_LANGSTRING) {
        if (o.language) {
          nquad += `@${o.language}`;
        }
      } else if (o.datatype.value !== XSD_STRING) {
        nquad += `^^<${o.datatype.value}>`;
      }
    } // graph can only be NamedNode or BlankNode (or DefaultGraph, but that
    // does not add to `nquad`)


    if (g.termType === TYPE_NAMED_NODE) {
      nquad += ` <${g.value}>`;
    } else if (g.termType === TYPE_BLANK_NODE) {
      nquad += ` ${g.value}`;
    }

    nquad += ' .\n';
    return nquad;
  }
  /**
   * Converts a legacy-formatted dataset to an array of quads dataset per
   * http://rdf.js.org/.
   *
   * @param dataset the legacy dataset to convert.
   *
   * @return the array of quads dataset.
   */


  static legacyDatasetToQuads(dataset) {
    const quads = [];
    const termTypeMap = {
      'blank node': TYPE_BLANK_NODE,
      IRI: TYPE_NAMED_NODE,
      literal: TYPE_LITERAL
    };

    for (const graphName in dataset) {
      const triples = dataset[graphName];
      triples.forEach(triple => {
        const quad = {};

        for (const componentName in triple) {
          const oldComponent = triple[componentName];
          const newComponent = {
            termType: termTypeMap[oldComponent.type],
            value: oldComponent.value
          };

          if (newComponent.termType === TYPE_LITERAL) {
            newComponent.datatype = {
              termType: TYPE_NAMED_NODE
            };

            if ('datatype' in oldComponent) {
              newComponent.datatype.value = oldComponent.datatype;
            }

            if ('language' in oldComponent) {
              if (!('datatype' in oldComponent)) {
                newComponent.datatype.value = RDF_LANGSTRING;
              }

              newComponent.language = oldComponent.language;
            } else if (!('datatype' in oldComponent)) {
              newComponent.datatype.value = XSD_STRING;
            }
          }

          quad[componentName] = newComponent;
        }

        if (graphName === '@default') {
          quad.graph = {
            termType: TYPE_DEFAULT_GRAPH,
            value: ''
          };
        } else {
          quad.graph = {
            termType: graphName.startsWith('_:') ? TYPE_BLANK_NODE : TYPE_NAMED_NODE,
            value: graphName
          };
        }

        quads.push(quad);
      });
    }

    return quads;
  }

};
/**
 * Compares two RDF triples for equality.
 *
 * @param t1 the first triple.
 * @param t2 the second triple.
 *
 * @return true if the triples are the same, false if not.
 */

function _compareTriples(t1, t2) {
  // compare subject and object types first as it is the quickest check
  if (!(t1.subject.termType === t2.subject.termType && t1.object.termType === t2.object.termType)) {
    return false;
  } // compare values


  if (!(t1.subject.value === t2.subject.value && t1.predicate.value === t2.predicate.value && t1.object.value === t2.object.value)) {
    return false;
  }

  if (t1.object.termType !== TYPE_LITERAL) {
    // no `datatype` or `language` to check
    return true;
  }

  return t1.object.datatype.termType === t2.object.datatype.termType && t1.object.language === t2.object.language && t1.object.datatype.value === t2.object.datatype.value;
}

const _escapeRegex = /["\\\n\r]/g;
/**
 * Escape string to N-Quads literal
 */

function _escape(s) {
  return s.replace(_escapeRegex, function (match) {
    switch (match) {
      case '"':
        return '\\"';

      case '\\':
        return '\\\\';

      case '\n':
        return '\\n';

      case '\r':
        return '\\r';
    }
  });
}

const _unescapeRegex = /(?:\\([tbnrf"'\\]))|(?:\\u([0-9A-Fa-f]{4}))|(?:\\U([0-9A-Fa-f]{8}))/g;
/**
 * Unescape N-Quads literal to string
 */

function _unescape(s) {
  return s.replace(_unescapeRegex, function (match, code, u, U) {
    if (code) {
      switch (code) {
        case 't':
          return '\t';

        case 'b':
          return '\b';

        case 'n':
          return '\n';

        case 'r':
          return '\r';

        case 'f':
          return '\f';

        case '"':
          return '"';

        case '\'':
          return '\'';

        case '\\':
          return '\\';
      }
    }

    if (u) {
      return String.fromCharCode(parseInt(u, 16));
    }

    if (U) {
      // FIXME: support larger values
      throw new Error('Unsupported U escape');
    }
  });
}

/***/ }),

/***/ "./node_modules/rdf-canonize/lib/Permuter.js":
/*!***************************************************!*\
  !*** ./node_modules/rdf-canonize/lib/Permuter.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016-2021 Digital Bazaar, Inc. All rights reserved.
 */
 // TODO: convert to ES6 iterable?

__webpack_require__(/*! core-js/modules/es.array.sort.js */ "./node_modules/core-js/modules/es.array.sort.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

module.exports = class Permuter {
  /**
   * A Permuter iterates over all possible permutations of the given array
   * of elements.
   *
   * @param list the array of elements to iterate over.
   */
  constructor(list) {
    // original array
    this.current = list.sort(); // indicates whether there are more permutations

    this.done = false; // directional info for permutation algorithm

    this.dir = new Map();

    for (let i = 0; i < list.length; ++i) {
      this.dir.set(list[i], true);
    }
  }
  /**
   * Returns true if there is another permutation.
   *
   * @return true if there is another permutation, false if not.
   */


  hasNext() {
    return !this.done;
  }
  /**
   * Gets the next permutation. Call hasNext() to ensure there is another one
   * first.
   *
   * @return the next permutation.
   */


  next() {
    // copy current permutation to return it
    const {
      current,
      dir
    } = this;
    const rval = current.slice();
    /* Calculate the next permutation using the Steinhaus-Johnson-Trotter
     permutation algorithm. */
    // get largest mobile element k
    // (mobile: element is greater than the one it is looking at)

    let k = null;
    let pos = 0;
    const length = current.length;

    for (let i = 0; i < length; ++i) {
      const element = current[i];
      const left = dir.get(element);

      if ((k === null || element > k) && (left && i > 0 && element > current[i - 1] || !left && i < length - 1 && element > current[i + 1])) {
        k = element;
        pos = i;
      }
    } // no more permutations


    if (k === null) {
      this.done = true;
    } else {
      // swap k and the element it is looking at
      const swap = dir.get(k) ? pos - 1 : pos + 1;
      current[pos] = current[swap];
      current[swap] = k; // reverse the direction of all elements larger than k

      for (const element of current) {
        if (element > k) {
          dir.set(element, !dir.get(element));
        }
      }
    }

    return rval;
  }

};

/***/ }),

/***/ "./node_modules/rdf-canonize/lib/URDNA2015.js":
/*!****************************************************!*\
  !*** ./node_modules/rdf-canonize/lib/URDNA2015.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016-2021 Digital Bazaar, Inc. All rights reserved.
 */


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

__webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");

__webpack_require__(/*! core-js/modules/es.array.sort.js */ "./node_modules/core-js/modules/es.array.sort.js");

__webpack_require__(/*! core-js/modules/es.string.starts-with.js */ "./node_modules/core-js/modules/es.string.starts-with.js");

__webpack_require__(/*! core-js/modules/web.immediate.js */ "./node_modules/core-js/modules/web.immediate.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const IdentifierIssuer = __webpack_require__(/*! ./IdentifierIssuer */ "./node_modules/rdf-canonize/lib/IdentifierIssuer.js");

const MessageDigest = __webpack_require__(/*! ./MessageDigest */ "./node_modules/rdf-canonize/lib/MessageDigest-browser.js");

const Permuter = __webpack_require__(/*! ./Permuter */ "./node_modules/rdf-canonize/lib/Permuter.js");

const NQuads = __webpack_require__(/*! ./NQuads */ "./node_modules/rdf-canonize/lib/NQuads.js");

module.exports = class URDNA2015 {
  constructor() {
    this.name = 'URDNA2015';
    this.blankNodeInfo = new Map();
    this.canonicalIssuer = new IdentifierIssuer('_:c14n');
    this.hashAlgorithm = 'sha256';
    this.quads = null;
  } // 4.4) Normalization Algorithm


  async main(dataset) {
    this.quads = dataset; // 1) Create the normalization state.
    // 2) For every quad in input dataset:

    for (const quad of dataset) {
      // 2.1) For each blank node that occurs in the quad, add a reference
      // to the quad using the blank node identifier in the blank node to
      // quads map, creating a new entry if necessary.
      this._addBlankNodeQuadInfo({
        quad,
        component: quad.subject
      });

      this._addBlankNodeQuadInfo({
        quad,
        component: quad.object
      });

      this._addBlankNodeQuadInfo({
        quad,
        component: quad.graph
      });
    } // 3) Create a list of non-normalized blank node identifiers
    // non-normalized identifiers and populate it using the keys from the
    // blank node to quads map.
    // Note: We use a map here and it was generated during step 2.
    // 4) `simple` flag is skipped -- loop is optimized away. This optimization
    // is permitted because there was a typo in the hash first degree quads
    // algorithm in the URDNA2015 spec that was implemented widely making it
    // such that it could not be fixed; the result was that the loop only
    // needs to be run once and the first degree quad hashes will never change.
    // 5.1-5.2 are skipped; first degree quad hashes are generated just once
    // for all non-normalized blank nodes.
    // 5.3) For each blank node identifier identifier in non-normalized
    // identifiers:


    const hashToBlankNodes = new Map();
    const nonNormalized = [...this.blankNodeInfo.keys()];
    let i = 0;

    for (const id of nonNormalized) {
      // Note: batch hashing first degree quads 100 at a time
      if (++i % 100 === 0) {
        await this._yield();
      } // steps 5.3.1 and 5.3.2:


      await this._hashAndTrackBlankNode({
        id,
        hashToBlankNodes
      });
    } // 5.4) For each hash to identifier list mapping in hash to blank
    // nodes map, lexicographically-sorted by hash:


    const hashes = [...hashToBlankNodes.keys()].sort(); // optimize away second sort, gather non-unique hashes in order as we go

    const nonUnique = [];

    for (const hash of hashes) {
      // 5.4.1) If the length of identifier list is greater than 1,
      // continue to the next mapping.
      const idList = hashToBlankNodes.get(hash);

      if (idList.length > 1) {
        nonUnique.push(idList);
        continue;
      } // 5.4.2) Use the Issue Identifier algorithm, passing canonical
      // issuer and the single blank node identifier in identifier
      // list, identifier, to issue a canonical replacement identifier
      // for identifier.


      const id = idList[0];
      this.canonicalIssuer.getId(id); // Note: These steps are skipped, optimized away since the loop
      // only needs to be run once.
      // 5.4.3) Remove identifier from non-normalized identifiers.
      // 5.4.4) Remove hash from the hash to blank nodes map.
      // 5.4.5) Set simple to true.
    } // 6) For each hash to identifier list mapping in hash to blank nodes map,
    // lexicographically-sorted by hash:
    // Note: sort optimized away, use `nonUnique`.


    for (const idList of nonUnique) {
      // 6.1) Create hash path list where each item will be a result of
      // running the Hash N-Degree Quads algorithm.
      const hashPathList = []; // 6.2) For each blank node identifier identifier in identifier list:

      for (const id of idList) {
        // 6.2.1) If a canonical identifier has already been issued for
        // identifier, continue to the next identifier.
        if (this.canonicalIssuer.hasId(id)) {
          continue;
        } // 6.2.2) Create temporary issuer, an identifier issuer
        // initialized with the prefix _:b.


        const issuer = new IdentifierIssuer('_:b'); // 6.2.3) Use the Issue Identifier algorithm, passing temporary
        // issuer and identifier, to issue a new temporary blank node
        // identifier for identifier.

        issuer.getId(id); // 6.2.4) Run the Hash N-Degree Quads algorithm, passing
        // temporary issuer, and append the result to the hash path list.

        const result = await this.hashNDegreeQuads(id, issuer);
        hashPathList.push(result);
      } // 6.3) For each result in the hash path list,
      // lexicographically-sorted by the hash in result:


      hashPathList.sort(_stringHashCompare);

      for (const result of hashPathList) {
        // 6.3.1) For each blank node identifier, existing identifier,
        // that was issued a temporary identifier by identifier issuer
        // in result, issue a canonical identifier, in the same order,
        // using the Issue Identifier algorithm, passing canonical
        // issuer and existing identifier.
        const oldIds = result.issuer.getOldIds();

        for (const id of oldIds) {
          this.canonicalIssuer.getId(id);
        }
      }
    }
    /* Note: At this point all blank nodes in the set of RDF quads have been
    assigned canonical identifiers, which have been stored in the canonical
    issuer. Here each quad is updated by assigning each of its blank nodes
    its new identifier. */
    // 7) For each quad, quad, in input dataset:


    const normalized = [];

    for (const quad of this.quads) {
      // 7.1) Create a copy, quad copy, of quad and replace any existing
      // blank node identifiers using the canonical identifiers
      // previously issued by canonical issuer.
      // Note: We optimize with shallow copies here.
      const q = _objectSpread({}, quad);

      q.subject = this._useCanonicalId({
        component: q.subject
      });
      q.object = this._useCanonicalId({
        component: q.object
      });
      q.graph = this._useCanonicalId({
        component: q.graph
      }); // 7.2) Add quad copy to the normalized dataset.

      normalized.push(NQuads.serializeQuad(q));
    } // sort normalized output


    normalized.sort(); // 8) Return the normalized dataset.

    return normalized.join('');
  } // 4.6) Hash First Degree Quads


  async hashFirstDegreeQuads(id) {
    // 1) Initialize nquads to an empty list. It will be used to store quads in
    // N-Quads format.
    const nquads = []; // 2) Get the list of quads `quads` associated with the reference blank node
    // identifier in the blank node to quads map.

    const info = this.blankNodeInfo.get(id);
    const quads = info.quads; // 3) For each quad `quad` in `quads`:

    for (const quad of quads) {
      // 3.1) Serialize the quad in N-Quads format with the following special
      // rule:
      // 3.1.1) If any component in quad is an blank node, then serialize it
      // using a special identifier as follows:
      const copy = {
        subject: null,
        predicate: quad.predicate,
        object: null,
        graph: null
      }; // 3.1.2) If the blank node's existing blank node identifier matches
      // the reference blank node identifier then use the blank node
      // identifier _:a, otherwise, use the blank node identifier _:z.

      copy.subject = this.modifyFirstDegreeComponent(id, quad.subject, 'subject');
      copy.object = this.modifyFirstDegreeComponent(id, quad.object, 'object');
      copy.graph = this.modifyFirstDegreeComponent(id, quad.graph, 'graph');
      nquads.push(NQuads.serializeQuad(copy));
    } // 4) Sort nquads in lexicographical order.


    nquads.sort(); // 5) Return the hash that results from passing the sorted, joined nquads
    // through the hash algorithm.

    const md = new MessageDigest(this.hashAlgorithm);

    for (const nquad of nquads) {
      md.update(nquad);
    }

    info.hash = await md.digest();
    return info.hash;
  } // 4.7) Hash Related Blank Node


  async hashRelatedBlankNode(related, quad, issuer, position) {
    // 1) Set the identifier to use for related, preferring first the canonical
    // identifier for related if issued, second the identifier issued by issuer
    // if issued, and last, if necessary, the result of the Hash First Degree
    // Quads algorithm, passing related.
    let id;

    if (this.canonicalIssuer.hasId(related)) {
      id = this.canonicalIssuer.getId(related);
    } else if (issuer.hasId(related)) {
      id = issuer.getId(related);
    } else {
      id = this.blankNodeInfo.get(related).hash;
    } // 2) Initialize a string input to the value of position.
    // Note: We use a hash object instead.


    const md = new MessageDigest(this.hashAlgorithm);
    md.update(position); // 3) If position is not g, append <, the value of the predicate in quad,
    // and > to input.

    if (position !== 'g') {
      md.update(this.getRelatedPredicate(quad));
    } // 4) Append identifier to input.


    md.update(id); // 5) Return the hash that results from passing input through the hash
    // algorithm.

    return md.digest();
  } // 4.8) Hash N-Degree Quads


  async hashNDegreeQuads(id, issuer) {
    // 1) Create a hash to related blank nodes map for storing hashes that
    // identify related blank nodes.
    // Note: 2) and 3) handled within `createHashToRelated`
    const md = new MessageDigest(this.hashAlgorithm);
    const hashToRelated = await this.createHashToRelated(id, issuer); // 4) Create an empty string, data to hash.
    // Note: We created a hash object `md` above instead.
    // 5) For each related hash to blank node list mapping in hash to related
    // blank nodes map, sorted lexicographically by related hash:

    const hashes = [...hashToRelated.keys()].sort();

    for (const hash of hashes) {
      // 5.1) Append the related hash to the data to hash.
      md.update(hash); // 5.2) Create a string chosen path.

      let chosenPath = ''; // 5.3) Create an unset chosen issuer variable.

      let chosenIssuer; // 5.4) For each permutation of blank node list:

      const permuter = new Permuter(hashToRelated.get(hash));
      let i = 0;

      while (permuter.hasNext()) {
        const permutation = permuter.next(); // Note: batch permutations 3 at a time

        if (++i % 3 === 0) {
          await this._yield();
        } // 5.4.1) Create a copy of issuer, issuer copy.


        let issuerCopy = issuer.clone(); // 5.4.2) Create a string path.

        let path = ''; // 5.4.3) Create a recursion list, to store blank node identifiers
        // that must be recursively processed by this algorithm.

        const recursionList = []; // 5.4.4) For each related in permutation:

        let nextPermutation = false;

        for (const related of permutation) {
          // 5.4.4.1) If a canonical identifier has been issued for
          // related, append it to path.
          if (this.canonicalIssuer.hasId(related)) {
            path += this.canonicalIssuer.getId(related);
          } else {
            // 5.4.4.2) Otherwise:
            // 5.4.4.2.1) If issuer copy has not issued an identifier for
            // related, append related to recursion list.
            if (!issuerCopy.hasId(related)) {
              recursionList.push(related);
            } // 5.4.4.2.2) Use the Issue Identifier algorithm, passing
            // issuer copy and related and append the result to path.


            path += issuerCopy.getId(related);
          } // 5.4.4.3) If chosen path is not empty and the length of path
          // is greater than or equal to the length of chosen path and
          // path is lexicographically greater than chosen path, then
          // skip to the next permutation.
          // Note: Comparing path length to chosen path length can be optimized
          // away; only compare lexicographically.


          if (chosenPath.length !== 0 && path > chosenPath) {
            nextPermutation = true;
            break;
          }
        }

        if (nextPermutation) {
          continue;
        } // 5.4.5) For each related in recursion list:


        for (const related of recursionList) {
          // 5.4.5.1) Set result to the result of recursively executing
          // the Hash N-Degree Quads algorithm, passing related for
          // identifier and issuer copy for path identifier issuer.
          const result = await this.hashNDegreeQuads(related, issuerCopy); // 5.4.5.2) Use the Issue Identifier algorithm, passing issuer
          // copy and related and append the result to path.

          path += issuerCopy.getId(related); // 5.4.5.3) Append <, the hash in result, and > to path.

          path += `<${result.hash}>`; // 5.4.5.4) Set issuer copy to the identifier issuer in
          // result.

          issuerCopy = result.issuer; // 5.4.5.5) If chosen path is not empty and the length of path
          // is greater than or equal to the length of chosen path and
          // path is lexicographically greater than chosen path, then
          // skip to the next permutation.
          // Note: Comparing path length to chosen path length can be optimized
          // away; only compare lexicographically.

          if (chosenPath.length !== 0 && path > chosenPath) {
            nextPermutation = true;
            break;
          }
        }

        if (nextPermutation) {
          continue;
        } // 5.4.6) If chosen path is empty or path is lexicographically
        // less than chosen path, set chosen path to path and chosen
        // issuer to issuer copy.


        if (chosenPath.length === 0 || path < chosenPath) {
          chosenPath = path;
          chosenIssuer = issuerCopy;
        }
      } // 5.5) Append chosen path to data to hash.


      md.update(chosenPath); // 5.6) Replace issuer, by reference, with chosen issuer.

      issuer = chosenIssuer;
    } // 6) Return issuer and the hash that results from passing data to hash
    // through the hash algorithm.


    return {
      hash: await md.digest(),
      issuer
    };
  } // helper for modifying component during Hash First Degree Quads


  modifyFirstDegreeComponent(id, component) {
    if (component.termType !== 'BlankNode') {
      return component;
    }
    /* Note: A mistake in the URDNA2015 spec that made its way into
    implementations (and therefore must stay to avoid interop breakage)
    resulted in an assigned canonical ID, if available for
    `component.value`, not being used in place of `_:a`/`_:z`, so
    we don't use it here. */


    return {
      termType: 'BlankNode',
      value: component.value === id ? '_:a' : '_:z'
    };
  } // helper for getting a related predicate


  getRelatedPredicate(quad) {
    return `<${quad.predicate.value}>`;
  } // helper for creating hash to related blank nodes map


  async createHashToRelated(id, issuer) {
    // 1) Create a hash to related blank nodes map for storing hashes that
    // identify related blank nodes.
    const hashToRelated = new Map(); // 2) Get a reference, quads, to the list of quads in the blank node to
    // quads map for the key identifier.

    const quads = this.blankNodeInfo.get(id).quads; // 3) For each quad in quads:

    let i = 0;

    for (const quad of quads) {
      // Note: batch hashing related blank node quads 100 at a time
      if (++i % 100 === 0) {
        await this._yield();
      } // 3.1) For each component in quad, if component is the subject, object,
      // and graph name and it is a blank node that is not identified by
      // identifier:
      // steps 3.1.1 and 3.1.2 occur in helpers:


      await Promise.all([this._addRelatedBlankNodeHash({
        quad,
        component: quad.subject,
        position: 's',
        id,
        issuer,
        hashToRelated
      }), this._addRelatedBlankNodeHash({
        quad,
        component: quad.object,
        position: 'o',
        id,
        issuer,
        hashToRelated
      }), this._addRelatedBlankNodeHash({
        quad,
        component: quad.graph,
        position: 'g',
        id,
        issuer,
        hashToRelated
      })]);
    }

    return hashToRelated;
  }

  async _hashAndTrackBlankNode({
    id,
    hashToBlankNodes
  }) {
    // 5.3.1) Create a hash, hash, according to the Hash First Degree
    // Quads algorithm.
    const hash = await this.hashFirstDegreeQuads(id); // 5.3.2) Add hash and identifier to hash to blank nodes map,
    // creating a new entry if necessary.

    const idList = hashToBlankNodes.get(hash);

    if (!idList) {
      hashToBlankNodes.set(hash, [id]);
    } else {
      idList.push(id);
    }
  }

  _addBlankNodeQuadInfo({
    quad,
    component
  }) {
    if (component.termType !== 'BlankNode') {
      return;
    }

    const id = component.value;
    const info = this.blankNodeInfo.get(id);

    if (info) {
      info.quads.add(quad);
    } else {
      this.blankNodeInfo.set(id, {
        quads: new Set([quad]),
        hash: null
      });
    }
  }

  async _addRelatedBlankNodeHash({
    quad,
    component,
    position,
    id,
    issuer,
    hashToRelated
  }) {
    if (!(component.termType === 'BlankNode' && component.value !== id)) {
      return;
    } // 3.1.1) Set hash to the result of the Hash Related Blank Node
    // algorithm, passing the blank node identifier for component as
    // related, quad, path identifier issuer as issuer, and position as
    // either s, o, or g based on whether component is a subject, object,
    // graph name, respectively.


    const related = component.value;
    const hash = await this.hashRelatedBlankNode(related, quad, issuer, position); // 3.1.2) Add a mapping of hash to the blank node identifier for
    // component to hash to related blank nodes map, adding an entry as
    // necessary.

    const entries = hashToRelated.get(hash);

    if (entries) {
      entries.push(related);
    } else {
      hashToRelated.set(hash, [related]);
    }
  }

  _useCanonicalId({
    component
  }) {
    if (component.termType === 'BlankNode' && !component.value.startsWith(this.canonicalIssuer.prefix)) {
      return {
        termType: 'BlankNode',
        value: this.canonicalIssuer.getId(component.value)
      };
    }

    return component;
  }

  async _yield() {
    return new Promise(resolve => setImmediate(resolve));
  }

};

function _stringHashCompare(a, b) {
  return a.hash < b.hash ? -1 : a.hash > b.hash ? 1 : 0;
}

/***/ }),

/***/ "./node_modules/rdf-canonize/lib/URDNA2015Sync.js":
/*!********************************************************!*\
  !*** ./node_modules/rdf-canonize/lib/URDNA2015Sync.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016-2021 Digital Bazaar, Inc. All rights reserved.
 */


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

__webpack_require__(/*! core-js/modules/es.array.sort.js */ "./node_modules/core-js/modules/es.array.sort.js");

__webpack_require__(/*! core-js/modules/es.string.starts-with.js */ "./node_modules/core-js/modules/es.string.starts-with.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const IdentifierIssuer = __webpack_require__(/*! ./IdentifierIssuer */ "./node_modules/rdf-canonize/lib/IdentifierIssuer.js");

const MessageDigest = __webpack_require__(/*! ./MessageDigest */ "./node_modules/rdf-canonize/lib/MessageDigest-browser.js");

const Permuter = __webpack_require__(/*! ./Permuter */ "./node_modules/rdf-canonize/lib/Permuter.js");

const NQuads = __webpack_require__(/*! ./NQuads */ "./node_modules/rdf-canonize/lib/NQuads.js");

module.exports = class URDNA2015Sync {
  constructor() {
    this.name = 'URDNA2015';
    this.blankNodeInfo = new Map();
    this.canonicalIssuer = new IdentifierIssuer('_:c14n');
    this.hashAlgorithm = 'sha256';
    this.quads = null;
  } // 4.4) Normalization Algorithm


  main(dataset) {
    this.quads = dataset; // 1) Create the normalization state.
    // 2) For every quad in input dataset:

    for (const quad of dataset) {
      // 2.1) For each blank node that occurs in the quad, add a reference
      // to the quad using the blank node identifier in the blank node to
      // quads map, creating a new entry if necessary.
      this._addBlankNodeQuadInfo({
        quad,
        component: quad.subject
      });

      this._addBlankNodeQuadInfo({
        quad,
        component: quad.object
      });

      this._addBlankNodeQuadInfo({
        quad,
        component: quad.graph
      });
    } // 3) Create a list of non-normalized blank node identifiers
    // non-normalized identifiers and populate it using the keys from the
    // blank node to quads map.
    // Note: We use a map here and it was generated during step 2.
    // 4) `simple` flag is skipped -- loop is optimized away. This optimization
    // is permitted because there was a typo in the hash first degree quads
    // algorithm in the URDNA2015 spec that was implemented widely making it
    // such that it could not be fixed; the result was that the loop only
    // needs to be run once and the first degree quad hashes will never change.
    // 5.1-5.2 are skipped; first degree quad hashes are generated just once
    // for all non-normalized blank nodes.
    // 5.3) For each blank node identifier identifier in non-normalized
    // identifiers:


    const hashToBlankNodes = new Map();
    const nonNormalized = [...this.blankNodeInfo.keys()];

    for (const id of nonNormalized) {
      // steps 5.3.1 and 5.3.2:
      this._hashAndTrackBlankNode({
        id,
        hashToBlankNodes
      });
    } // 5.4) For each hash to identifier list mapping in hash to blank
    // nodes map, lexicographically-sorted by hash:


    const hashes = [...hashToBlankNodes.keys()].sort(); // optimize away second sort, gather non-unique hashes in order as we go

    const nonUnique = [];

    for (const hash of hashes) {
      // 5.4.1) If the length of identifier list is greater than 1,
      // continue to the next mapping.
      const idList = hashToBlankNodes.get(hash);

      if (idList.length > 1) {
        nonUnique.push(idList);
        continue;
      } // 5.4.2) Use the Issue Identifier algorithm, passing canonical
      // issuer and the single blank node identifier in identifier
      // list, identifier, to issue a canonical replacement identifier
      // for identifier.


      const id = idList[0];
      this.canonicalIssuer.getId(id); // Note: These steps are skipped, optimized away since the loop
      // only needs to be run once.
      // 5.4.3) Remove identifier from non-normalized identifiers.
      // 5.4.4) Remove hash from the hash to blank nodes map.
      // 5.4.5) Set simple to true.
    } // 6) For each hash to identifier list mapping in hash to blank nodes map,
    // lexicographically-sorted by hash:
    // Note: sort optimized away, use `nonUnique`.


    for (const idList of nonUnique) {
      // 6.1) Create hash path list where each item will be a result of
      // running the Hash N-Degree Quads algorithm.
      const hashPathList = []; // 6.2) For each blank node identifier identifier in identifier list:

      for (const id of idList) {
        // 6.2.1) If a canonical identifier has already been issued for
        // identifier, continue to the next identifier.
        if (this.canonicalIssuer.hasId(id)) {
          continue;
        } // 6.2.2) Create temporary issuer, an identifier issuer
        // initialized with the prefix _:b.


        const issuer = new IdentifierIssuer('_:b'); // 6.2.3) Use the Issue Identifier algorithm, passing temporary
        // issuer and identifier, to issue a new temporary blank node
        // identifier for identifier.

        issuer.getId(id); // 6.2.4) Run the Hash N-Degree Quads algorithm, passing
        // temporary issuer, and append the result to the hash path list.

        const result = this.hashNDegreeQuads(id, issuer);
        hashPathList.push(result);
      } // 6.3) For each result in the hash path list,
      // lexicographically-sorted by the hash in result:


      hashPathList.sort(_stringHashCompare);

      for (const result of hashPathList) {
        // 6.3.1) For each blank node identifier, existing identifier,
        // that was issued a temporary identifier by identifier issuer
        // in result, issue a canonical identifier, in the same order,
        // using the Issue Identifier algorithm, passing canonical
        // issuer and existing identifier.
        const oldIds = result.issuer.getOldIds();

        for (const id of oldIds) {
          this.canonicalIssuer.getId(id);
        }
      }
    }
    /* Note: At this point all blank nodes in the set of RDF quads have been
    assigned canonical identifiers, which have been stored in the canonical
    issuer. Here each quad is updated by assigning each of its blank nodes
    its new identifier. */
    // 7) For each quad, quad, in input dataset:


    const normalized = [];

    for (const quad of this.quads) {
      // 7.1) Create a copy, quad copy, of quad and replace any existing
      // blank node identifiers using the canonical identifiers
      // previously issued by canonical issuer.
      // Note: We optimize with shallow copies here.
      const q = _objectSpread({}, quad);

      q.subject = this._useCanonicalId({
        component: q.subject
      });
      q.object = this._useCanonicalId({
        component: q.object
      });
      q.graph = this._useCanonicalId({
        component: q.graph
      }); // 7.2) Add quad copy to the normalized dataset.

      normalized.push(NQuads.serializeQuad(q));
    } // sort normalized output


    normalized.sort(); // 8) Return the normalized dataset.

    return normalized.join('');
  } // 4.6) Hash First Degree Quads


  hashFirstDegreeQuads(id) {
    // 1) Initialize nquads to an empty list. It will be used to store quads in
    // N-Quads format.
    const nquads = []; // 2) Get the list of quads `quads` associated with the reference blank node
    // identifier in the blank node to quads map.

    const info = this.blankNodeInfo.get(id);
    const quads = info.quads; // 3) For each quad `quad` in `quads`:

    for (const quad of quads) {
      // 3.1) Serialize the quad in N-Quads format with the following special
      // rule:
      // 3.1.1) If any component in quad is an blank node, then serialize it
      // using a special identifier as follows:
      const copy = {
        subject: null,
        predicate: quad.predicate,
        object: null,
        graph: null
      }; // 3.1.2) If the blank node's existing blank node identifier matches
      // the reference blank node identifier then use the blank node
      // identifier _:a, otherwise, use the blank node identifier _:z.

      copy.subject = this.modifyFirstDegreeComponent(id, quad.subject, 'subject');
      copy.object = this.modifyFirstDegreeComponent(id, quad.object, 'object');
      copy.graph = this.modifyFirstDegreeComponent(id, quad.graph, 'graph');
      nquads.push(NQuads.serializeQuad(copy));
    } // 4) Sort nquads in lexicographical order.


    nquads.sort(); // 5) Return the hash that results from passing the sorted, joined nquads
    // through the hash algorithm.

    const md = new MessageDigest(this.hashAlgorithm);

    for (const nquad of nquads) {
      md.update(nquad);
    }

    info.hash = md.digest();
    return info.hash;
  } // 4.7) Hash Related Blank Node


  hashRelatedBlankNode(related, quad, issuer, position) {
    // 1) Set the identifier to use for related, preferring first the canonical
    // identifier for related if issued, second the identifier issued by issuer
    // if issued, and last, if necessary, the result of the Hash First Degree
    // Quads algorithm, passing related.
    let id;

    if (this.canonicalIssuer.hasId(related)) {
      id = this.canonicalIssuer.getId(related);
    } else if (issuer.hasId(related)) {
      id = issuer.getId(related);
    } else {
      id = this.blankNodeInfo.get(related).hash;
    } // 2) Initialize a string input to the value of position.
    // Note: We use a hash object instead.


    const md = new MessageDigest(this.hashAlgorithm);
    md.update(position); // 3) If position is not g, append <, the value of the predicate in quad,
    // and > to input.

    if (position !== 'g') {
      md.update(this.getRelatedPredicate(quad));
    } // 4) Append identifier to input.


    md.update(id); // 5) Return the hash that results from passing input through the hash
    // algorithm.

    return md.digest();
  } // 4.8) Hash N-Degree Quads


  hashNDegreeQuads(id, issuer) {
    // 1) Create a hash to related blank nodes map for storing hashes that
    // identify related blank nodes.
    // Note: 2) and 3) handled within `createHashToRelated`
    const md = new MessageDigest(this.hashAlgorithm);
    const hashToRelated = this.createHashToRelated(id, issuer); // 4) Create an empty string, data to hash.
    // Note: We created a hash object `md` above instead.
    // 5) For each related hash to blank node list mapping in hash to related
    // blank nodes map, sorted lexicographically by related hash:

    const hashes = [...hashToRelated.keys()].sort();

    for (const hash of hashes) {
      // 5.1) Append the related hash to the data to hash.
      md.update(hash); // 5.2) Create a string chosen path.

      let chosenPath = ''; // 5.3) Create an unset chosen issuer variable.

      let chosenIssuer; // 5.4) For each permutation of blank node list:

      const permuter = new Permuter(hashToRelated.get(hash));

      while (permuter.hasNext()) {
        const permutation = permuter.next(); // 5.4.1) Create a copy of issuer, issuer copy.

        let issuerCopy = issuer.clone(); // 5.4.2) Create a string path.

        let path = ''; // 5.4.3) Create a recursion list, to store blank node identifiers
        // that must be recursively processed by this algorithm.

        const recursionList = []; // 5.4.4) For each related in permutation:

        let nextPermutation = false;

        for (const related of permutation) {
          // 5.4.4.1) If a canonical identifier has been issued for
          // related, append it to path.
          if (this.canonicalIssuer.hasId(related)) {
            path += this.canonicalIssuer.getId(related);
          } else {
            // 5.4.4.2) Otherwise:
            // 5.4.4.2.1) If issuer copy has not issued an identifier for
            // related, append related to recursion list.
            if (!issuerCopy.hasId(related)) {
              recursionList.push(related);
            } // 5.4.4.2.2) Use the Issue Identifier algorithm, passing
            // issuer copy and related and append the result to path.


            path += issuerCopy.getId(related);
          } // 5.4.4.3) If chosen path is not empty and the length of path
          // is greater than or equal to the length of chosen path and
          // path is lexicographically greater than chosen path, then
          // skip to the next permutation.
          // Note: Comparing path length to chosen path length can be optimized
          // away; only compare lexicographically.


          if (chosenPath.length !== 0 && path > chosenPath) {
            nextPermutation = true;
            break;
          }
        }

        if (nextPermutation) {
          continue;
        } // 5.4.5) For each related in recursion list:


        for (const related of recursionList) {
          // 5.4.5.1) Set result to the result of recursively executing
          // the Hash N-Degree Quads algorithm, passing related for
          // identifier and issuer copy for path identifier issuer.
          const result = this.hashNDegreeQuads(related, issuerCopy); // 5.4.5.2) Use the Issue Identifier algorithm, passing issuer
          // copy and related and append the result to path.

          path += issuerCopy.getId(related); // 5.4.5.3) Append <, the hash in result, and > to path.

          path += `<${result.hash}>`; // 5.4.5.4) Set issuer copy to the identifier issuer in
          // result.

          issuerCopy = result.issuer; // 5.4.5.5) If chosen path is not empty and the length of path
          // is greater than or equal to the length of chosen path and
          // path is lexicographically greater than chosen path, then
          // skip to the next permutation.
          // Note: Comparing path length to chosen path length can be optimized
          // away; only compare lexicographically.

          if (chosenPath.length !== 0 && path > chosenPath) {
            nextPermutation = true;
            break;
          }
        }

        if (nextPermutation) {
          continue;
        } // 5.4.6) If chosen path is empty or path is lexicographically
        // less than chosen path, set chosen path to path and chosen
        // issuer to issuer copy.


        if (chosenPath.length === 0 || path < chosenPath) {
          chosenPath = path;
          chosenIssuer = issuerCopy;
        }
      } // 5.5) Append chosen path to data to hash.


      md.update(chosenPath); // 5.6) Replace issuer, by reference, with chosen issuer.

      issuer = chosenIssuer;
    } // 6) Return issuer and the hash that results from passing data to hash
    // through the hash algorithm.


    return {
      hash: md.digest(),
      issuer
    };
  } // helper for modifying component during Hash First Degree Quads


  modifyFirstDegreeComponent(id, component) {
    if (component.termType !== 'BlankNode') {
      return component;
    }
    /* Note: A mistake in the URDNA2015 spec that made its way into
    implementations (and therefore must stay to avoid interop breakage)
    resulted in an assigned canonical ID, if available for
    `component.value`, not being used in place of `_:a`/`_:z`, so
    we don't use it here. */


    return {
      termType: 'BlankNode',
      value: component.value === id ? '_:a' : '_:z'
    };
  } // helper for getting a related predicate


  getRelatedPredicate(quad) {
    return `<${quad.predicate.value}>`;
  } // helper for creating hash to related blank nodes map


  createHashToRelated(id, issuer) {
    // 1) Create a hash to related blank nodes map for storing hashes that
    // identify related blank nodes.
    const hashToRelated = new Map(); // 2) Get a reference, quads, to the list of quads in the blank node to
    // quads map for the key identifier.

    const quads = this.blankNodeInfo.get(id).quads; // 3) For each quad in quads:

    for (const quad of quads) {
      // 3.1) For each component in quad, if component is the subject, object,
      // or graph name and it is a blank node that is not identified by
      // identifier:
      // steps 3.1.1 and 3.1.2 occur in helpers:
      this._addRelatedBlankNodeHash({
        quad,
        component: quad.subject,
        position: 's',
        id,
        issuer,
        hashToRelated
      });

      this._addRelatedBlankNodeHash({
        quad,
        component: quad.object,
        position: 'o',
        id,
        issuer,
        hashToRelated
      });

      this._addRelatedBlankNodeHash({
        quad,
        component: quad.graph,
        position: 'g',
        id,
        issuer,
        hashToRelated
      });
    }

    return hashToRelated;
  }

  _hashAndTrackBlankNode({
    id,
    hashToBlankNodes
  }) {
    // 5.3.1) Create a hash, hash, according to the Hash First Degree
    // Quads algorithm.
    const hash = this.hashFirstDegreeQuads(id); // 5.3.2) Add hash and identifier to hash to blank nodes map,
    // creating a new entry if necessary.

    const idList = hashToBlankNodes.get(hash);

    if (!idList) {
      hashToBlankNodes.set(hash, [id]);
    } else {
      idList.push(id);
    }
  }

  _addBlankNodeQuadInfo({
    quad,
    component
  }) {
    if (component.termType !== 'BlankNode') {
      return;
    }

    const id = component.value;
    const info = this.blankNodeInfo.get(id);

    if (info) {
      info.quads.add(quad);
    } else {
      this.blankNodeInfo.set(id, {
        quads: new Set([quad]),
        hash: null
      });
    }
  }

  _addRelatedBlankNodeHash({
    quad,
    component,
    position,
    id,
    issuer,
    hashToRelated
  }) {
    if (!(component.termType === 'BlankNode' && component.value !== id)) {
      return;
    } // 3.1.1) Set hash to the result of the Hash Related Blank Node
    // algorithm, passing the blank node identifier for component as
    // related, quad, path identifier issuer as issuer, and position as
    // either s, o, or g based on whether component is a subject, object,
    // graph name, respectively.


    const related = component.value;
    const hash = this.hashRelatedBlankNode(related, quad, issuer, position); // 3.1.2) Add a mapping of hash to the blank node identifier for
    // component to hash to related blank nodes map, adding an entry as
    // necessary.

    const entries = hashToRelated.get(hash);

    if (entries) {
      entries.push(related);
    } else {
      hashToRelated.set(hash, [related]);
    }
  }

  _useCanonicalId({
    component
  }) {
    if (component.termType === 'BlankNode' && !component.value.startsWith(this.canonicalIssuer.prefix)) {
      return {
        termType: 'BlankNode',
        value: this.canonicalIssuer.getId(component.value)
      };
    }

    return component;
  }

};

function _stringHashCompare(a, b) {
  return a.hash < b.hash ? -1 : a.hash > b.hash ? 1 : 0;
}

/***/ }),

/***/ "./node_modules/rdf-canonize/lib/URGNA2012.js":
/*!****************************************************!*\
  !*** ./node_modules/rdf-canonize/lib/URGNA2012.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016-2021 Digital Bazaar, Inc. All rights reserved.
 */


__webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

const URDNA2015 = __webpack_require__(/*! ./URDNA2015 */ "./node_modules/rdf-canonize/lib/URDNA2015.js");

module.exports = class URDNA2012 extends URDNA2015 {
  constructor() {
    super();
    this.name = 'URGNA2012';
    this.hashAlgorithm = 'sha1';
  } // helper for modifying component during Hash First Degree Quads


  modifyFirstDegreeComponent(id, component, key) {
    if (component.termType !== 'BlankNode') {
      return component;
    }

    if (key === 'graph') {
      return {
        termType: 'BlankNode',
        value: '_:g'
      };
    }

    return {
      termType: 'BlankNode',
      value: component.value === id ? '_:a' : '_:z'
    };
  } // helper for getting a related predicate


  getRelatedPredicate(quad) {
    return quad.predicate.value;
  } // helper for creating hash to related blank nodes map


  async createHashToRelated(id, issuer) {
    // 1) Create a hash to related blank nodes map for storing hashes that
    // identify related blank nodes.
    const hashToRelated = new Map(); // 2) Get a reference, quads, to the list of quads in the blank node to
    // quads map for the key identifier.

    const quads = this.blankNodeInfo.get(id).quads; // 3) For each quad in quads:

    let i = 0;

    for (const quad of quads) {
      // 3.1) If the quad's subject is a blank node that does not match
      // identifier, set hash to the result of the Hash Related Blank Node
      // algorithm, passing the blank node identifier for subject as related,
      // quad, path identifier issuer as issuer, and p as position.
      let position;
      let related;

      if (quad.subject.termType === 'BlankNode' && quad.subject.value !== id) {
        related = quad.subject.value;
        position = 'p';
      } else if (quad.object.termType === 'BlankNode' && quad.object.value !== id) {
        // 3.2) Otherwise, if quad's object is a blank node that does not match
        // identifier, to the result of the Hash Related Blank Node algorithm,
        // passing the blank node identifier for object as related, quad, path
        // identifier issuer as issuer, and r as position.
        related = quad.object.value;
        position = 'r';
      } else {
        // 3.3) Otherwise, continue to the next quad.
        continue;
      } // Note: batch hashing related blank nodes 100 at a time


      if (++i % 100 === 0) {
        await this._yield();
      } // 3.4) Add a mapping of hash to the blank node identifier for the
      // component that matched (subject or object) to hash to related blank
      // nodes map, adding an entry as necessary.


      const hash = await this.hashRelatedBlankNode(related, quad, issuer, position);
      const entries = hashToRelated.get(hash);

      if (entries) {
        entries.push(related);
      } else {
        hashToRelated.set(hash, [related]);
      }
    }

    return hashToRelated;
  }

};

/***/ }),

/***/ "./node_modules/rdf-canonize/lib/URGNA2012Sync.js":
/*!********************************************************!*\
  !*** ./node_modules/rdf-canonize/lib/URGNA2012Sync.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016-2021 Digital Bazaar, Inc. All rights reserved.
 */


__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

const URDNA2015Sync = __webpack_require__(/*! ./URDNA2015Sync */ "./node_modules/rdf-canonize/lib/URDNA2015Sync.js");

module.exports = class URDNA2012Sync extends URDNA2015Sync {
  constructor() {
    super();
    this.name = 'URGNA2012';
    this.hashAlgorithm = 'sha1';
  } // helper for modifying component during Hash First Degree Quads


  modifyFirstDegreeComponent(id, component, key) {
    if (component.termType !== 'BlankNode') {
      return component;
    }

    if (key === 'graph') {
      return {
        termType: 'BlankNode',
        value: '_:g'
      };
    }

    return {
      termType: 'BlankNode',
      value: component.value === id ? '_:a' : '_:z'
    };
  } // helper for getting a related predicate


  getRelatedPredicate(quad) {
    return quad.predicate.value;
  } // helper for creating hash to related blank nodes map


  createHashToRelated(id, issuer) {
    // 1) Create a hash to related blank nodes map for storing hashes that
    // identify related blank nodes.
    const hashToRelated = new Map(); // 2) Get a reference, quads, to the list of quads in the blank node to
    // quads map for the key identifier.

    const quads = this.blankNodeInfo.get(id).quads; // 3) For each quad in quads:

    for (const quad of quads) {
      // 3.1) If the quad's subject is a blank node that does not match
      // identifier, set hash to the result of the Hash Related Blank Node
      // algorithm, passing the blank node identifier for subject as related,
      // quad, path identifier issuer as issuer, and p as position.
      let position;
      let related;

      if (quad.subject.termType === 'BlankNode' && quad.subject.value !== id) {
        related = quad.subject.value;
        position = 'p';
      } else if (quad.object.termType === 'BlankNode' && quad.object.value !== id) {
        // 3.2) Otherwise, if quad's object is a blank node that does not match
        // identifier, to the result of the Hash Related Blank Node algorithm,
        // passing the blank node identifier for object as related, quad, path
        // identifier issuer as issuer, and r as position.
        related = quad.object.value;
        position = 'r';
      } else {
        // 3.3) Otherwise, continue to the next quad.
        continue;
      } // 3.4) Add a mapping of hash to the blank node identifier for the
      // component that matched (subject or object) to hash to related blank
      // nodes map, adding an entry as necessary.


      const hash = this.hashRelatedBlankNode(related, quad, issuer, position);
      const entries = hashToRelated.get(hash);

      if (entries) {
        entries.push(related);
      } else {
        hashToRelated.set(hash, [related]);
      }
    }

    return hashToRelated;
  }

};

/***/ }),

/***/ "./node_modules/rdf-canonize/lib/index.js":
/*!************************************************!*\
  !*** ./node_modules/rdf-canonize/lib/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * An implementation of the RDF Dataset Normalization specification.
 * This library works in the browser and node.js.
 *
 * BSD 3-Clause License
 * Copyright (c) 2016-2021 Digital Bazaar, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 *
 * Neither the name of the Digital Bazaar, Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 * TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


__webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");

const URDNA2015 = __webpack_require__(/*! ./URDNA2015 */ "./node_modules/rdf-canonize/lib/URDNA2015.js");

const URGNA2012 = __webpack_require__(/*! ./URGNA2012 */ "./node_modules/rdf-canonize/lib/URGNA2012.js");

const URDNA2015Sync = __webpack_require__(/*! ./URDNA2015Sync */ "./node_modules/rdf-canonize/lib/URDNA2015Sync.js");

const URGNA2012Sync = __webpack_require__(/*! ./URGNA2012Sync */ "./node_modules/rdf-canonize/lib/URGNA2012Sync.js"); // optional native support


let rdfCanonizeNative;

try {
  rdfCanonizeNative = __webpack_require__(/*! rdf-canonize-native */ 1);
} catch (e) {}

const api = {};
module.exports = api; // expose helpers

api.NQuads = __webpack_require__(/*! ./NQuads */ "./node_modules/rdf-canonize/lib/NQuads.js");
api.IdentifierIssuer = __webpack_require__(/*! ./IdentifierIssuer */ "./node_modules/rdf-canonize/lib/IdentifierIssuer.js");
/**
 * Get or set native API.
 *
 * @param api the native API.
 *
 * @return the currently set native API.
 */

api._rdfCanonizeNative = function (api) {
  if (api) {
    rdfCanonizeNative = api;
  }

  return rdfCanonizeNative;
};
/**
 * Asynchronously canonizes an RDF dataset.
 *
 * @param dataset the dataset to canonize.
 * @param options the options to use:
 *          algorithm the canonicalization algorithm to use, `URDNA2015` or
 *            `URGNA2012`.
 *          [useNative] use native implementation (default: false).
 *
 * @return a Promise that resolves to the canonicalized RDF Dataset.
 */


api.canonize = async function (dataset, options) {
  // back-compat with legacy dataset
  if (!Array.isArray(dataset)) {
    dataset = api.NQuads.legacyDatasetToQuads(dataset);
  }

  if (options.useNative) {
    if (!rdfCanonizeNative) {
      throw new Error('rdf-canonize-native not available');
    } // TODO: convert native algorithm to Promise-based async


    return new Promise((resolve, reject) => rdfCanonizeNative.canonize(dataset, options, (err, canonical) => err ? reject(err) : resolve(canonical)));
  }

  if (options.algorithm === 'URDNA2015') {
    return new URDNA2015(options).main(dataset);
  }

  if (options.algorithm === 'URGNA2012') {
    return new URGNA2012(options).main(dataset);
  }

  if (!('algorithm' in options)) {
    throw new Error('No RDF Dataset Canonicalization algorithm specified.');
  }

  throw new Error('Invalid RDF Dataset Canonicalization algorithm: ' + options.algorithm);
};
/**
 * This method is no longer available in the public API, it is for testing
 * only. It synchronously canonizes an RDF dataset and does not work in the
 * browser.
 *
 * @param dataset the dataset to canonize.
 * @param options the options to use:
 *          algorithm the canonicalization algorithm to use, `URDNA2015` or
 *            `URGNA2012`.
 *          [useNative] use native implementation (default: false).
 *
 * @return the RDF dataset in canonical form.
 */


api._canonizeSync = function (dataset, options) {
  // back-compat with legacy dataset
  if (!Array.isArray(dataset)) {
    dataset = api.NQuads.legacyDatasetToQuads(dataset);
  }

  if (options.useNative) {
    if (rdfCanonizeNative) {
      return rdfCanonizeNative.canonizeSync(dataset, options);
    }

    throw new Error('rdf-canonize-native not available');
  }

  if (options.algorithm === 'URDNA2015') {
    return new URDNA2015Sync(options).main(dataset);
  }

  if (options.algorithm === 'URGNA2012') {
    return new URGNA2012Sync(options).main(dataset);
  }

  if (!('algorithm' in options)) {
    throw new Error('No RDF Dataset Canonicalization algorithm specified.');
  }

  throw new Error('Invalid RDF Dataset Canonicalization algorithm: ' + options.algorithm);
};

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/yallist/iterator.js":
/*!******************************************!*\
  !*** ./node_modules/yallist/iterator.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

__webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");

module.exports = function (Yallist) {
  Yallist.prototype[Symbol.iterator] = function* () {
    for (let walker = this.head; walker; walker = walker.next) {
      yield walker.value;
    }
  };
};

/***/ }),

/***/ "./node_modules/yallist/yallist.js":
/*!*****************************************!*\
  !*** ./node_modules/yallist/yallist.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! core-js/modules/es.array.reduce.js */ "./node_modules/core-js/modules/es.array.reduce.js");

__webpack_require__(/*! core-js/modules/es.array.reverse.js */ "./node_modules/core-js/modules/es.array.reverse.js");

module.exports = Yallist;
Yallist.Node = Node;
Yallist.create = Yallist;

function Yallist(list) {
  var self = this;

  if (!(self instanceof Yallist)) {
    self = new Yallist();
  }

  self.tail = null;
  self.head = null;
  self.length = 0;

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item);
    });
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i]);
    }
  }

  return self;
}

Yallist.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list');
  }

  var next = node.next;
  var prev = node.prev;

  if (next) {
    next.prev = prev;
  }

  if (prev) {
    prev.next = next;
  }

  if (node === this.head) {
    this.head = next;
  }

  if (node === this.tail) {
    this.tail = prev;
  }

  node.list.length--;
  node.next = null;
  node.prev = null;
  node.list = null;
  return next;
};

Yallist.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return;
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var head = this.head;
  node.list = this;
  node.next = head;

  if (head) {
    head.prev = node;
  }

  this.head = node;

  if (!this.tail) {
    this.tail = node;
  }

  this.length++;
};

Yallist.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return;
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var tail = this.tail;
  node.list = this;
  node.prev = tail;

  if (tail) {
    tail.next = node;
  }

  this.tail = node;

  if (!this.head) {
    this.head = node;
  }

  this.length++;
};

Yallist.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i]);
  }

  return this.length;
};

Yallist.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i]);
  }

  return this.length;
};

Yallist.prototype.pop = function () {
  if (!this.tail) {
    return undefined;
  }

  var res = this.tail.value;
  this.tail = this.tail.prev;

  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head = null;
  }

  this.length--;
  return res;
};

Yallist.prototype.shift = function () {
  if (!this.head) {
    return undefined;
  }

  var res = this.head.value;
  this.head = this.head.next;

  if (this.head) {
    this.head.prev = null;
  } else {
    this.tail = null;
  }

  this.length--;
  return res;
};

Yallist.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;

  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.next;
  }
};

Yallist.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this;

  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.prev;
  }
};

Yallist.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next;
  }

  if (i === n && walker !== null) {
    return walker.value;
  }
};

Yallist.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev;
  }

  if (i === n && walker !== null) {
    return walker.value;
  }
};

Yallist.prototype.map = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist();

  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.next;
  }

  return res;
};

Yallist.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist();

  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.prev;
  }

  return res;
};

Yallist.prototype.reduce = function (fn, initial) {
  var acc;
  var walker = this.head;

  if (arguments.length > 1) {
    acc = initial;
  } else if (this.head) {
    walker = this.head.next;
    acc = this.head.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value');
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i);
    walker = walker.next;
  }

  return acc;
};

Yallist.prototype.reduceReverse = function (fn, initial) {
  var acc;
  var walker = this.tail;

  if (arguments.length > 1) {
    acc = initial;
  } else if (this.tail) {
    walker = this.tail.prev;
    acc = this.tail.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value');
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i);
    walker = walker.prev;
  }

  return acc;
};

Yallist.prototype.toArray = function () {
  var arr = new Array(this.length);

  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.next;
  }

  return arr;
};

Yallist.prototype.toArrayReverse = function () {
  var arr = new Array(this.length);

  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.prev;
  }

  return arr;
};

Yallist.prototype.slice = function (from, to) {
  to = to || this.length;

  if (to < 0) {
    to += this.length;
  }

  from = from || 0;

  if (from < 0) {
    from += this.length;
  }

  var ret = new Yallist();

  if (to < from || to < 0) {
    return ret;
  }

  if (from < 0) {
    from = 0;
  }

  if (to > this.length) {
    to = this.length;
  }

  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next;
  }

  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value);
  }

  return ret;
};

Yallist.prototype.sliceReverse = function (from, to) {
  to = to || this.length;

  if (to < 0) {
    to += this.length;
  }

  from = from || 0;

  if (from < 0) {
    from += this.length;
  }

  var ret = new Yallist();

  if (to < from || to < 0) {
    return ret;
  }

  if (from < 0) {
    from = 0;
  }

  if (to > this.length) {
    to = this.length;
  }

  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev;
  }

  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value);
  }

  return ret;
};

Yallist.prototype.splice = function (start, deleteCount, ...nodes) {
  if (start > this.length) {
    start = this.length - 1;
  }

  if (start < 0) {
    start = this.length + start;
  }

  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next;
  }

  var ret = [];

  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value);
    walker = this.removeNode(walker);
  }

  if (walker === null) {
    walker = this.tail;
  }

  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev;
  }

  for (var i = 0; i < nodes.length; i++) {
    walker = insert(this, walker, nodes[i]);
  }

  return ret;
};

Yallist.prototype.reverse = function () {
  var head = this.head;
  var tail = this.tail;

  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev;
    walker.prev = walker.next;
    walker.next = p;
  }

  this.head = tail;
  this.tail = head;
  return this;
};

function insert(self, node, value) {
  var inserted = node === self.head ? new Node(value, null, node, self) : new Node(value, node, node.next, self);

  if (inserted.next === null) {
    self.tail = inserted;
  }

  if (inserted.prev === null) {
    self.head = inserted;
  }

  self.length++;
  return inserted;
}

function push(self, item) {
  self.tail = new Node(item, self.tail, null, self);

  if (!self.head) {
    self.head = self.tail;
  }

  self.length++;
}

function unshift(self, item) {
  self.head = new Node(item, null, self.head, self);

  if (!self.tail) {
    self.tail = self.head;
  }

  self.length++;
}

function Node(value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list);
  }

  this.list = list;
  this.value = value;

  if (prev) {
    prev.next = this;
    this.prev = prev;
  } else {
    this.prev = null;
  }

  if (next) {
    next.prev = this;
    this.next = next;
  } else {
    this.next = null;
  }
}

try {
  // add if support for Symbol.iterator is present
  __webpack_require__(/*! ./iterator.js */ "./node_modules/yallist/iterator.js")(Yallist);
} catch (er) {}

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./lib/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/index.js */"./lib/jsonld.js");


/***/ }),

/***/ 1:
/*!*************************************!*\
  !*** rdf-canonize-native (ignored) ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
});
//# sourceMappingURL=jsonld.esm.js.map