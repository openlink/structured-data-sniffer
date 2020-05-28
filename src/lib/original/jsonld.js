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


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _require = __webpack_require__(/*! ./types */ "./lib/types.js"),
    _isArray = _require.isArray,
    _isObject = _require.isObject,
    _isString = _require.isString;

var _require2 = __webpack_require__(/*! ./util */ "./lib/util.js"),
    _asArray = _require2.asArray;

var _require3 = __webpack_require__(/*! ./url */ "./lib/url.js"),
    prependBase = _require3.prependBase;

var JsonLdError = __webpack_require__(/*! ./JsonLdError */ "./lib/JsonLdError.js");

var ResolvedContext = __webpack_require__(/*! ./ResolvedContext */ "./lib/ResolvedContext.js");

var MAX_CONTEXT_URLS = 10;

module.exports = /*#__PURE__*/function () {
  /**
   * Creates a ContextResolver.
   *
   * @param sharedCache a shared LRU cache with `get` and `set` APIs.
   */
  function ContextResolver(_ref) {
    var sharedCache = _ref.sharedCache;
    (0, _classCallCheck2["default"])(this, ContextResolver);
    this.perOpCache = new Map();
    this.sharedCache = sharedCache;
  }

  (0, _createClass2["default"])(ContextResolver, [{
    key: "resolve",
    value: function () {
      var _resolve = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref2) {
        var activeCtx, context, documentLoader, base, _ref2$cycles, cycles, allResolved, _iterator, _step, ctx, _resolved, key, resolved;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                activeCtx = _ref2.activeCtx, context = _ref2.context, documentLoader = _ref2.documentLoader, base = _ref2.base, _ref2$cycles = _ref2.cycles, cycles = _ref2$cycles === void 0 ? new Set() : _ref2$cycles;

                // process `@context`
                if (context && _isObject(context) && context['@context']) {
                  context = context['@context'];
                } // context is one or more contexts


                context = _asArray(context); // resolve each context in the array

                allResolved = [];
                _iterator = _createForOfIteratorHelper(context);
                _context.prev = 5;

                _iterator.s();

              case 7:
                if ((_step = _iterator.n()).done) {
                  _context.next = 27;
                  break;
                }

                ctx = _step.value;

                if (!_isString(ctx)) {
                  _context.next = 17;
                  break;
                }

                // see if `ctx` has been resolved before...
                _resolved = this._get(ctx);

                if (_resolved) {
                  _context.next = 15;
                  break;
                }

                _context.next = 14;
                return this._resolveRemoteContext({
                  activeCtx: activeCtx,
                  url: ctx,
                  documentLoader: documentLoader,
                  base: base,
                  cycles: cycles
                });

              case 14:
                _resolved = _context.sent;

              case 15:
                // add to output and continue
                if (_isArray(_resolved)) {
                  allResolved.push.apply(allResolved, (0, _toConsumableArray2["default"])(_resolved));
                } else {
                  allResolved.push(_resolved);
                }

                return _context.abrupt("continue", 25);

              case 17:
                if (!(ctx === null)) {
                  _context.next = 20;
                  break;
                }

                // handle `null` context, nothing to cache
                allResolved.push(new ResolvedContext({
                  document: null
                }));
                return _context.abrupt("continue", 25);

              case 20:
                if (!_isObject(ctx)) {
                  _throwInvalidLocalContext(context);
                } // context is an object, get/create `ResolvedContext` for it


                key = JSON.stringify(ctx);
                resolved = this._get(key);

                if (!resolved) {
                  // create a new static `ResolvedContext` and cache it
                  resolved = new ResolvedContext({
                    document: ctx
                  });

                  this._cacheResolvedContext({
                    key: key,
                    resolved: resolved,
                    tag: 'static'
                  });
                }

                allResolved.push(resolved);

              case 25:
                _context.next = 7;
                break;

              case 27:
                _context.next = 32;
                break;

              case 29:
                _context.prev = 29;
                _context.t0 = _context["catch"](5);

                _iterator.e(_context.t0);

              case 32:
                _context.prev = 32;

                _iterator.f();

                return _context.finish(32);

              case 35:
                return _context.abrupt("return", allResolved);

              case 36:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 29, 32, 35]]);
      }));

      function resolve(_x) {
        return _resolve.apply(this, arguments);
      }

      return resolve;
    }()
  }, {
    key: "_get",
    value: function _get(key) {
      // get key from per operation cache; no `tag` is used with this cache so
      // any retrieved context will always be the same during a single operation
      var resolved = this.perOpCache.get(key);

      if (!resolved) {
        // see if the shared cache has a `static` entry for this URL
        var tagMap = this.sharedCache.get(key);

        if (tagMap) {
          resolved = tagMap.get('static');

          if (resolved) {
            this.perOpCache.set(key, resolved);
          }
        }
      }

      return resolved;
    }
  }, {
    key: "_cacheResolvedContext",
    value: function _cacheResolvedContext(_ref3) {
      var key = _ref3.key,
          resolved = _ref3.resolved,
          tag = _ref3.tag;
      this.perOpCache.set(key, resolved);

      if (tag !== undefined) {
        var tagMap = this.sharedCache.get(key);

        if (!tagMap) {
          tagMap = new Map();
          this.sharedCache.set(key, tagMap);
        }

        tagMap.set(tag, resolved);
      }

      return resolved;
    }
  }, {
    key: "_resolveRemoteContext",
    value: function () {
      var _resolveRemoteContext2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref4) {
        var activeCtx, url, documentLoader, base, cycles, _yield$this$_fetchCon, context, remoteDoc, resolved;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                activeCtx = _ref4.activeCtx, url = _ref4.url, documentLoader = _ref4.documentLoader, base = _ref4.base, cycles = _ref4.cycles;
                // resolve relative URL and fetch context
                url = prependBase(base, url);
                _context2.next = 4;
                return this._fetchContext({
                  activeCtx: activeCtx,
                  url: url,
                  documentLoader: documentLoader,
                  cycles: cycles
                });

              case 4:
                _yield$this$_fetchCon = _context2.sent;
                context = _yield$this$_fetchCon.context;
                remoteDoc = _yield$this$_fetchCon.remoteDoc;
                // update base according to remote document and resolve any relative URLs
                base = remoteDoc.documentUrl || url;

                _resolveContextUrls({
                  context: context,
                  base: base
                }); // resolve, cache, and return context


                _context2.next = 11;
                return this.resolve({
                  activeCtx: activeCtx,
                  context: context,
                  documentLoader: documentLoader,
                  base: base,
                  cycles: cycles
                });

              case 11:
                resolved = _context2.sent;

                this._cacheResolvedContext({
                  key: url,
                  resolved: resolved,
                  tag: remoteDoc.tag
                });

                return _context2.abrupt("return", resolved);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _resolveRemoteContext(_x2) {
        return _resolveRemoteContext2.apply(this, arguments);
      }

      return _resolveRemoteContext;
    }()
  }, {
    key: "_fetchContext",
    value: function () {
      var _fetchContext2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref5) {
        var activeCtx, url, documentLoader, cycles, context, remoteDoc;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                activeCtx = _ref5.activeCtx, url = _ref5.url, documentLoader = _ref5.documentLoader, cycles = _ref5.cycles;

                if (!(cycles.size > MAX_CONTEXT_URLS)) {
                  _context3.next = 3;
                  break;
                }

                throw new JsonLdError('Maximum number of @context URLs exceeded.', 'jsonld.ContextUrlError', {
                  code: activeCtx.processingMode === 'json-ld-1.0' ? 'loading remote context failed' : 'context overflow',
                  max: MAX_CONTEXT_URLS
                });

              case 3:
                if (!cycles.has(url)) {
                  _context3.next = 5;
                  break;
                }

                throw new JsonLdError('Cyclical @context URLs detected.', 'jsonld.ContextUrlError', {
                  code: activeCtx.processingMode === 'json-ld-1.0' ? 'recursive context inclusion' : 'context overflow',
                  url: url
                });

              case 5:
                // track cycles
                cycles.add(url);
                _context3.prev = 6;
                _context3.next = 9;
                return documentLoader(url);

              case 9:
                remoteDoc = _context3.sent;
                context = remoteDoc.document || null; // parse string context as JSON

                if (_isString(context)) {
                  context = JSON.parse(context);
                }

                _context3.next = 17;
                break;

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](6);
                throw new JsonLdError('Dereferencing a URL did not result in a valid JSON-LD object. ' + 'Possible causes are an inaccessible URL perhaps due to ' + 'a same-origin policy (ensure the server uses CORS if you are ' + 'using client-side JavaScript), too many redirects, a ' + 'non-JSON response, or more than one HTTP Link Header was ' + 'provided for a remote context.', 'jsonld.InvalidUrl', {
                  code: 'loading remote context failed',
                  url: url,
                  cause: _context3.t0
                });

              case 17:
                if (_isObject(context)) {
                  _context3.next = 19;
                  break;
                }

                throw new JsonLdError('Dereferencing a URL did not result in a JSON object. The ' + 'response was valid JSON, but it was not a JSON object.', 'jsonld.InvalidUrl', {
                  code: 'invalid remote context',
                  url: url
                });

              case 19:
                // use empty context if no @context key is present
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

                return _context3.abrupt("return", {
                  context: context,
                  remoteDoc: remoteDoc
                });

              case 22:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[6, 14]]);
      }));

      function _fetchContext(_x3) {
        return _fetchContext2.apply(this, arguments);
      }

      return _fetchContext;
    }()
  }]);
  return ContextResolver;
}();

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


function _resolveContextUrls(_ref6) {
  var context = _ref6.context,
      base = _ref6.base;

  if (!context) {
    return;
  }

  var ctx = context['@context'];

  if (_isString(ctx)) {
    context['@context'] = prependBase(base, ctx);
    return;
  }

  if (_isArray(ctx)) {
    for (var i = 0; i < ctx.length; ++i) {
      var element = ctx[i];

      if (_isString(element)) {
        ctx[i] = prependBase(base, element);
        continue;
      }

      if (_isObject(element)) {
        _resolveContextUrls({
          context: {
            '@context': element
          },
          base: base
        });
      }
    }

    return;
  }

  if (!_isObject(ctx)) {
    // no @context URLs can be found in non-object
    return;
  } // ctx is an object, resolve any context URLs in terms


  for (var term in ctx) {
    _resolveContextUrls({
      context: ctx[term],
      base: base
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


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _wrapNativeSuper2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "./node_modules/@babel/runtime/helpers/wrapNativeSuper.js"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

module.exports = /*#__PURE__*/function (_Error) {
  (0, _inherits2["default"])(JsonLdError, _Error);

  var _super = _createSuper(JsonLdError);

  /**
   * Creates a JSON-LD Error.
   *
   * @param msg the error message.
   * @param type the error type.
   * @param details the error details.
   */
  function JsonLdError() {
    var _this;

    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'An unspecified JSON-LD error occurred.';
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'jsonld.Error';
    var details = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck2["default"])(this, JsonLdError);
    _this = _super.call(this, message);
    _this.name = name;
    _this.message = message;
    _this.details = details;
    return _this;
  }

  return JsonLdError;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));

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


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

module.exports = function (jsonld) {
  var JsonLdProcessor = /*#__PURE__*/function () {
    function JsonLdProcessor() {
      (0, _classCallCheck2["default"])(this, JsonLdProcessor);
    }

    (0, _createClass2["default"])(JsonLdProcessor, [{
      key: "toString",
      value: function toString() {
        return '[object JsonLdProcessor]';
      }
    }]);
    return JsonLdProcessor;
  }();

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

module.exports = __webpack_require__(/*! rdf-canonize */ "./node_modules/rdf-canonize/lib/index.js").NQuads;

/***/ }),

/***/ "./lib/Rdfa.js":
/*!*********************!*\
  !*** ./lib/Rdfa.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */

/* global Node, XMLSerializer */


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _require = __webpack_require__(/*! ./constants */ "./lib/constants.js"),
    RDF_LANGSTRING = _require.RDF_LANGSTRING,
    RDF_PLAIN_LITERAL = _require.RDF_PLAIN_LITERAL,
    RDF_OBJECT = _require.RDF_OBJECT,
    RDF_XML_LITERAL = _require.RDF_XML_LITERAL,
    XSD_STRING = _require.XSD_STRING;

var _Node;

if (typeof Node !== 'undefined') {
  _Node = Node;
} else {
  _Node = {
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    ENTITY_REFERENCE_NODE: 5,
    ENTITY_NODE: 6,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11,
    NOTATION_NODE: 12
  };
}

module.exports = /*#__PURE__*/function () {
  function Rdfa() {
    (0, _classCallCheck2["default"])(this, Rdfa);
  }

  (0, _createClass2["default"])(Rdfa, [{
    key: "parse",

    /**
     * Parses the RDF dataset found via the data object from the RDFa API.
     *
     * @param data the RDFa API data object.
     *
     * @return the RDF dataset.
     */
    value: function parse(data) {
      var dataset = {};
      dataset['@default'] = [];
      var subjects = data.getSubjects();

      for (var si = 0; si < subjects.length; ++si) {
        var subject = subjects[si];

        if (subject === null) {
          continue;
        } // get all related triples


        var triples = data.getSubjectTriples(subject);

        if (triples === null) {
          continue;
        }

        var predicates = triples.predicates;

        for (var predicate in predicates) {
          // iterate over objects
          var objects = predicates[predicate].objects;

          for (var oi = 0; oi < objects.length; ++oi) {
            var object = objects[oi]; // create RDF triple

            var triple = {}; // add subject

            if (subject.indexOf('_:') === 0) {
              triple.subject = {
                type: 'blank node',
                value: subject
              };
            } else {
              triple.subject = {
                type: 'IRI',
                value: subject
              };
            } // add predicate


            if (predicate.indexOf('_:') === 0) {
              triple.predicate = {
                type: 'blank node',
                value: predicate
              };
            } else {
              triple.predicate = {
                type: 'IRI',
                value: predicate
              };
            } // serialize XML literal


            var value = object.value;

            if (object.type === RDF_XML_LITERAL) {
              // initialize XMLSerializer
              var _XMLSerializer = getXMLSerializerClass();

              var serializer = new _XMLSerializer();
              value = '';

              for (var x = 0; x < object.value.length; x++) {
                if (object.value[x].nodeType === _Node.ELEMENT_NODE) {
                  value += serializer.serializeToString(object.value[x]);
                } else if (object.value[x].nodeType === _Node.TEXT_NODE) {
                  value += object.value[x].nodeValue;
                }
              }
            } // add object


            triple.object = {}; // object is an IRI

            if (object.type === RDF_OBJECT) {
              if (object.value.indexOf('_:') === 0) {
                triple.object.type = 'blank node';
              } else {
                triple.object.type = 'IRI';
              }
            } else {
              // object is a literal
              triple.object.type = 'literal';

              if (object.type === RDF_PLAIN_LITERAL) {
                if (object.language) {
                  triple.object.datatype = RDF_LANGSTRING;
                  triple.object.language = object.language;
                } else {
                  triple.object.datatype = XSD_STRING;
                }
              } else {
                triple.object.datatype = object.type;
              }
            }

            triple.object.value = value; // add triple to dataset in default graph

            dataset['@default'].push(triple);
          }
        }
      }

      return dataset;
    }
  }]);
  return Rdfa;
}();

function getXMLSerializerClass() {
  if (typeof XMLSerializer === 'undefined') {
    return __webpack_require__(/*! xmldom */ 2).XMLSerializer;
  }

  return XMLSerializer;
}

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


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

module.exports = /*#__PURE__*/function () {
  /**
   * Creates a simple queue for requesting documents.
   */
  function RequestQueue() {
    (0, _classCallCheck2["default"])(this, RequestQueue);
    this._requests = {};
  }

  (0, _createClass2["default"])(RequestQueue, [{
    key: "wrapLoader",
    value: function wrapLoader(loader) {
      var self = this;
      self._loader = loader;
      return function ()
      /* url */
      {
        return self.add.apply(self, arguments);
      };
    }
  }, {
    key: "add",
    value: function () {
      var _add = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(url) {
        var promise;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                promise = this._requests[url];

                if (!promise) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", Promise.resolve(promise));

              case 3:
                // queue URL and load it
                promise = this._requests[url] = this._loader(url);
                _context.prev = 4;
                _context.next = 7;
                return promise;

              case 7:
                return _context.abrupt("return", _context.sent);

              case 8:
                _context.prev = 8;
                delete this._requests[url];
                return _context.finish(8);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4,, 8, 11]]);
      }));

      function add(_x) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }]);
  return RequestQueue;
}();

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


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var LRU = __webpack_require__(/*! lru-cache */ "./node_modules/lru-cache/index.js");

var MAX_ACTIVE_CONTEXTS = 10;

module.exports = /*#__PURE__*/function () {
  /**
   * Creates a ResolvedContext.
   *
   * @param document the context document.
   */
  function ResolvedContext(_ref) {
    var document = _ref.document;
    (0, _classCallCheck2["default"])(this, ResolvedContext);
    this.document = document; // TODO: enable customization of processed context cache
    // TODO: limit based on size of processed contexts vs. number of them

    this.cache = new LRU({
      max: MAX_ACTIVE_CONTEXTS
    });
  }

  (0, _createClass2["default"])(ResolvedContext, [{
    key: "getProcessed",
    value: function getProcessed(activeCtx) {
      return this.cache.get(activeCtx);
    }
  }, {
    key: "setProcessed",
    value: function setProcessed(activeCtx, processedCtx) {
      this.cache.set(activeCtx, processedCtx);
    }
  }]);
  return ResolvedContext;
}();

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


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js"));

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));

var _toArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toArray */ "./node_modules/@babel/runtime/helpers/toArray.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var JsonLdError = __webpack_require__(/*! ./JsonLdError */ "./lib/JsonLdError.js");

var _require = __webpack_require__(/*! ./types */ "./lib/types.js"),
    _isArray = _require.isArray,
    _isObject = _require.isObject,
    _isString = _require.isString,
    _isUndefined = _require.isUndefined;

var _require2 = __webpack_require__(/*! ./graphTypes */ "./lib/graphTypes.js"),
    _isList = _require2.isList,
    _isValue = _require2.isValue,
    _isGraph = _require2.isGraph,
    _isSimpleGraph = _require2.isSimpleGraph,
    _isSubjectReference = _require2.isSubjectReference;

var _require3 = __webpack_require__(/*! ./context */ "./lib/context.js"),
    _expandIri = _require3.expandIri,
    _getContextValue = _require3.getContextValue,
    _isKeyword = _require3.isKeyword,
    _processContext = _require3.process,
    _processingMode = _require3.processingMode;

var _require4 = __webpack_require__(/*! ./url */ "./lib/url.js"),
    _removeBase = _require4.removeBase,
    _prependBase = _require4.prependBase;

var _require5 = __webpack_require__(/*! ./util */ "./lib/util.js"),
    _addValue = _require5.addValue,
    _asArray = _require5.asArray,
    _compareShortestLeast = _require5.compareShortestLeast;

var api = {};
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

api.compact = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref) {
    var activeCtx, _ref$activeProperty, activeProperty, element, _ref$options, options, _ref$compactionMap, compactionMap, rval, i, compacted, container, ctx, _ret;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            activeCtx = _ref.activeCtx, _ref$activeProperty = _ref.activeProperty, activeProperty = _ref$activeProperty === void 0 ? null : _ref$activeProperty, element = _ref.element, _ref$options = _ref.options, options = _ref$options === void 0 ? {} : _ref$options, _ref$compactionMap = _ref.compactionMap, compactionMap = _ref$compactionMap === void 0 ? function () {
              return undefined;
            } : _ref$compactionMap;

            if (!_isArray(element)) {
              _context2.next = 20;
              break;
            }

            rval = [];
            i = 0;

          case 4:
            if (!(i < element.length)) {
              _context2.next = 18;
              break;
            }

            _context2.next = 7;
            return api.compact({
              activeCtx: activeCtx,
              activeProperty: activeProperty,
              element: element[i],
              options: options,
              compactionMap: compactionMap
            });

          case 7:
            compacted = _context2.sent;

            if (!(compacted === null)) {
              _context2.next = 14;
              break;
            }

            _context2.next = 11;
            return compactionMap({
              unmappedValue: element[i],
              activeCtx: activeCtx,
              activeProperty: activeProperty,
              parent: element,
              index: i,
              options: options
            });

          case 11:
            compacted = _context2.sent;

            if (!(compacted === undefined)) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("continue", 15);

          case 14:
            rval.push(compacted);

          case 15:
            ++i;
            _context2.next = 4;
            break;

          case 18:
            if (options.compactArrays && rval.length === 1) {
              // use single element if no container is specified
              container = _getContextValue(activeCtx, activeProperty, '@container') || [];

              if (container.length === 0) {
                rval = rval[0];
              }
            }

            return _context2.abrupt("return", rval);

          case 20:
            // use any scoped context on activeProperty
            ctx = _getContextValue(activeCtx, activeProperty, '@context');

            if (_isUndefined(ctx)) {
              _context2.next = 25;
              break;
            }

            _context2.next = 24;
            return _processContext({
              activeCtx: activeCtx,
              localCtx: ctx,
              propagate: true,
              overrideProtected: true,
              options: options
            });

          case 24:
            activeCtx = _context2.sent;

          case 25:
            if (!_isObject(element)) {
              _context2.next = 30;
              break;
            }

            return _context2.delegateYield( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
              var linked, _i, _rval, _container, insideReverse, rval, inputCtx, propertyScopedCtx, types, typeContext, _iterator, _step, type, compactedType, _ctx, keys, _iterator2, _step2, expandedProperty, expandedValue, compactedValue, alias, _compactedValue, _alias, _container2, typeAsSet, isArray, _compactedValue2, compactedProperty, value, _container3, useArray, _alias2, _compactedValue3, _container4, _alias3, _alias4, itemActiveProperty, nestProperty, nestResult, _iterator3, _step3, expandedItem, _itemActiveProperty, _nestProperty, _nestResult, _container5, isGraph, isList, inner, compactedItem, mapObject, key, _mapObject, _key, indexKey, containerKey, others, _asArray2, _asArray3, idKey, typeKey, _types, _asArray4, _asArray5, _isArray2;

              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!(options.link && '@id' in element && options.link.hasOwnProperty(element['@id']))) {
                        _context.next = 9;
                        break;
                      }

                      // check for a linked element to reuse
                      linked = options.link[element['@id']];
                      _i = 0;

                    case 3:
                      if (!(_i < linked.length)) {
                        _context.next = 9;
                        break;
                      }

                      if (!(linked[_i].expanded === element)) {
                        _context.next = 6;
                        break;
                      }

                      return _context.abrupt("return", {
                        v: linked[_i].compacted
                      });

                    case 6:
                      ++_i;
                      _context.next = 3;
                      break;

                    case 9:
                      if (!(_isValue(element) || _isSubjectReference(element))) {
                        _context.next = 13;
                        break;
                      }

                      _rval = api.compactValue({
                        activeCtx: activeCtx,
                        activeProperty: activeProperty,
                        value: element,
                        options: options
                      });

                      if (options.link && _isSubjectReference(element)) {
                        // store linked element
                        if (!options.link.hasOwnProperty(element['@id'])) {
                          options.link[element['@id']] = [];
                        }

                        options.link[element['@id']].push({
                          expanded: element,
                          compacted: _rval
                        });
                      }

                      return _context.abrupt("return", {
                        v: _rval
                      });

                    case 13:
                      if (!_isList(element)) {
                        _context.next = 17;
                        break;
                      }

                      _container = _getContextValue(activeCtx, activeProperty, '@container') || [];

                      if (!_container.includes('@list')) {
                        _context.next = 17;
                        break;
                      }

                      return _context.abrupt("return", {
                        v: api.compact({
                          activeCtx: activeCtx,
                          activeProperty: activeProperty,
                          element: element['@list'],
                          options: options,
                          compactionMap: compactionMap
                        })
                      });

                    case 17:
                      // FIXME: avoid misuse of active property as an expanded property?
                      insideReverse = activeProperty === '@reverse';
                      rval = {}; // original context before applying property-scoped and local contexts

                      inputCtx = activeCtx; // revert to previous context, if there is one,
                      // and element is not a value object or a node reference

                      if (!_isValue(element) && !_isSubjectReference(element)) {
                        activeCtx = activeCtx.revertToPreviousContext();
                      } // apply property-scoped context after reverting term-scoped context


                      propertyScopedCtx = _getContextValue(inputCtx, activeProperty, '@context');

                      if (_isUndefined(propertyScopedCtx)) {
                        _context.next = 26;
                        break;
                      }

                      _context.next = 25;
                      return _processContext({
                        activeCtx: activeCtx,
                        localCtx: propertyScopedCtx,
                        propagate: true,
                        overrideProtected: true,
                        options: options
                      });

                    case 25:
                      activeCtx = _context.sent;

                    case 26:
                      if (options.link && '@id' in element) {
                        // store linked element
                        if (!options.link.hasOwnProperty(element['@id'])) {
                          options.link[element['@id']] = [];
                        }

                        options.link[element['@id']].push({
                          expanded: element,
                          compacted: rval
                        });
                      } // apply any context defined on an alias of @type
                      // if key is @type and any compacted value is a term having a local
                      // context, overlay that context


                      types = element['@type'] || [];

                      if (types.length > 1) {
                        types = Array.from(types).sort();
                      } // find all type-scoped contexts based on current context, prior to
                      // updating it


                      typeContext = activeCtx;
                      _iterator = _createForOfIteratorHelper(types);
                      _context.prev = 31;

                      _iterator.s();

                    case 33:
                      if ((_step = _iterator.n()).done) {
                        _context.next = 43;
                        break;
                      }

                      type = _step.value;
                      compactedType = api.compactIri({
                        activeCtx: typeContext,
                        iri: type,
                        relativeTo: {
                          vocab: true
                        }
                      }); // Use any type-scoped context defined on this value

                      _ctx = _getContextValue(inputCtx, compactedType, '@context');

                      if (_isUndefined(_ctx)) {
                        _context.next = 41;
                        break;
                      }

                      _context.next = 40;
                      return _processContext({
                        activeCtx: activeCtx,
                        localCtx: _ctx,
                        options: options,
                        propagate: false
                      });

                    case 40:
                      activeCtx = _context.sent;

                    case 41:
                      _context.next = 33;
                      break;

                    case 43:
                      _context.next = 48;
                      break;

                    case 45:
                      _context.prev = 45;
                      _context.t0 = _context["catch"](31);

                      _iterator.e(_context.t0);

                    case 48:
                      _context.prev = 48;

                      _iterator.f();

                      return _context.finish(48);

                    case 51:
                      // process element keys in order
                      keys = Object.keys(element).sort();
                      _iterator2 = _createForOfIteratorHelper(keys);
                      _context.prev = 53;

                      _iterator2.s();

                    case 55:
                      if ((_step2 = _iterator2.n()).done) {
                        _context.next = 211;
                        break;
                      }

                      expandedProperty = _step2.value;
                      expandedValue = element[expandedProperty]; // compact @id

                      if (!(expandedProperty === '@id')) {
                        _context.next = 64;
                        break;
                      }

                      compactedValue = _asArray(expandedValue).map(function (expandedIri) {
                        return api.compactIri({
                          activeCtx: activeCtx,
                          iri: expandedIri,
                          relativeTo: {
                            vocab: false
                          },
                          base: options.base
                        });
                      });

                      if (compactedValue.length === 1) {
                        compactedValue = compactedValue[0];
                      } // use keyword alias and add value


                      alias = api.compactIri({
                        activeCtx: activeCtx,
                        iri: '@id',
                        relativeTo: {
                          vocab: true
                        }
                      });
                      rval[alias] = compactedValue;
                      return _context.abrupt("continue", 209);

                    case 64:
                      if (!(expandedProperty === '@type')) {
                        _context.next = 73;
                        break;
                      }

                      // resolve type values against previous context
                      _compactedValue = _asArray(expandedValue).map(function (expandedIri) {
                        return api.compactIri({
                          activeCtx: inputCtx,
                          iri: expandedIri,
                          relativeTo: {
                            vocab: true
                          }
                        });
                      });

                      if (_compactedValue.length === 1) {
                        _compactedValue = _compactedValue[0];
                      } // use keyword alias and add value


                      _alias = api.compactIri({
                        activeCtx: activeCtx,
                        iri: '@type',
                        relativeTo: {
                          vocab: true
                        }
                      });
                      _container2 = _getContextValue(activeCtx, _alias, '@container') || []; // treat as array for @type if @container includes @set

                      typeAsSet = _container2.includes('@set') && _processingMode(activeCtx, 1.1);
                      isArray = typeAsSet || _isArray(_compactedValue) && expandedValue.length === 0;

                      _addValue(rval, _alias, _compactedValue, {
                        propertyIsArray: isArray
                      });

                      return _context.abrupt("continue", 209);

                    case 73:
                      if (!(expandedProperty === '@reverse')) {
                        _context.next = 80;
                        break;
                      }

                      _context.next = 76;
                      return api.compact({
                        activeCtx: activeCtx,
                        activeProperty: '@reverse',
                        element: expandedValue,
                        options: options,
                        compactionMap: compactionMap
                      });

                    case 76:
                      _compactedValue2 = _context.sent;

                      // handle double-reversed properties
                      for (compactedProperty in _compactedValue2) {
                        if (activeCtx.mappings.has(compactedProperty) && activeCtx.mappings.get(compactedProperty).reverse) {
                          value = _compactedValue2[compactedProperty];
                          _container3 = _getContextValue(activeCtx, compactedProperty, '@container') || [];
                          useArray = _container3.includes('@set') || !options.compactArrays;

                          _addValue(rval, compactedProperty, value, {
                            propertyIsArray: useArray
                          });

                          delete _compactedValue2[compactedProperty];
                        }
                      }

                      if (Object.keys(_compactedValue2).length > 0) {
                        // use keyword alias and add value
                        _alias2 = api.compactIri({
                          activeCtx: activeCtx,
                          iri: expandedProperty,
                          relativeTo: {
                            vocab: true
                          }
                        });

                        _addValue(rval, _alias2, _compactedValue2);
                      }

                      return _context.abrupt("continue", 209);

                    case 80:
                      if (!(expandedProperty === '@preserve')) {
                        _context.next = 86;
                        break;
                      }

                      _context.next = 83;
                      return api.compact({
                        activeCtx: activeCtx,
                        activeProperty: activeProperty,
                        element: expandedValue,
                        options: options,
                        compactionMap: compactionMap
                      });

                    case 83:
                      _compactedValue3 = _context.sent;

                      if (!(_isArray(_compactedValue3) && _compactedValue3.length === 0)) {
                        _addValue(rval, expandedProperty, _compactedValue3);
                      }

                      return _context.abrupt("continue", 209);

                    case 86:
                      if (!(expandedProperty === '@index')) {
                        _context.next = 93;
                        break;
                      }

                      // drop @index if inside an @index container
                      _container4 = _getContextValue(activeCtx, activeProperty, '@container') || [];

                      if (!_container4.includes('@index')) {
                        _context.next = 90;
                        break;
                      }

                      return _context.abrupt("continue", 209);

                    case 90:
                      // use keyword alias and add value
                      _alias3 = api.compactIri({
                        activeCtx: activeCtx,
                        iri: expandedProperty,
                        relativeTo: {
                          vocab: true
                        }
                      });

                      _addValue(rval, _alias3, expandedValue);

                      return _context.abrupt("continue", 209);

                    case 93:
                      if (!(expandedProperty !== '@graph' && expandedProperty !== '@list' && expandedProperty !== '@included' && _isKeyword(expandedProperty))) {
                        _context.next = 97;
                        break;
                      }

                      // use keyword alias and add value as is
                      _alias4 = api.compactIri({
                        activeCtx: activeCtx,
                        iri: expandedProperty,
                        relativeTo: {
                          vocab: true
                        }
                      });

                      _addValue(rval, _alias4, expandedValue);

                      return _context.abrupt("continue", 209);

                    case 97:
                      if (_isArray(expandedValue)) {
                        _context.next = 99;
                        break;
                      }

                      throw new JsonLdError('JSON-LD expansion error; expanded value must be an array.', 'jsonld.SyntaxError');

                    case 99:
                      // preserve empty arrays
                      if (expandedValue.length === 0) {
                        itemActiveProperty = api.compactIri({
                          activeCtx: activeCtx,
                          iri: expandedProperty,
                          value: expandedValue,
                          relativeTo: {
                            vocab: true
                          },
                          reverse: insideReverse
                        });
                        nestProperty = activeCtx.mappings.has(itemActiveProperty) ? activeCtx.mappings.get(itemActiveProperty)['@nest'] : null;
                        nestResult = rval;

                        if (nestProperty) {
                          _checkNestProperty(activeCtx, nestProperty, options);

                          if (!_isObject(rval[nestProperty])) {
                            rval[nestProperty] = {};
                          }

                          nestResult = rval[nestProperty];
                        }

                        _addValue(nestResult, itemActiveProperty, expandedValue, {
                          propertyIsArray: true
                        });
                      } // recusively process array values


                      _iterator3 = _createForOfIteratorHelper(expandedValue);
                      _context.prev = 101;

                      _iterator3.s();

                    case 103:
                      if ((_step3 = _iterator3.n()).done) {
                        _context.next = 201;
                        break;
                      }

                      expandedItem = _step3.value;
                      // compact property and get container type
                      _itemActiveProperty = api.compactIri({
                        activeCtx: activeCtx,
                        iri: expandedProperty,
                        value: expandedItem,
                        relativeTo: {
                          vocab: true
                        },
                        reverse: insideReverse
                      }); // if itemActiveProperty is a @nest property, add values to nestResult,
                      // otherwise rval

                      _nestProperty = activeCtx.mappings.has(_itemActiveProperty) ? activeCtx.mappings.get(_itemActiveProperty)['@nest'] : null;
                      _nestResult = rval;

                      if (_nestProperty) {
                        _checkNestProperty(activeCtx, _nestProperty, options);

                        if (!_isObject(rval[_nestProperty])) {
                          rval[_nestProperty] = {};
                        }

                        _nestResult = rval[_nestProperty];
                      }

                      _container5 = _getContextValue(activeCtx, _itemActiveProperty, '@container') || []; // get simple @graph or @list value if appropriate

                      isGraph = _isGraph(expandedItem);
                      isList = _isList(expandedItem);
                      inner = void 0;

                      if (isList) {
                        inner = expandedItem['@list'];
                      } else if (isGraph) {
                        inner = expandedItem['@graph'];
                      } // recursively compact expanded item


                      _context.next = 116;
                      return api.compact({
                        activeCtx: activeCtx,
                        activeProperty: _itemActiveProperty,
                        element: isList || isGraph ? inner : expandedItem,
                        options: options,
                        compactionMap: compactionMap
                      });

                    case 116:
                      compactedItem = _context.sent;

                      if (!isList) {
                        _context.next = 126;
                        break;
                      }

                      // ensure @list value is an array
                      if (!_isArray(compactedItem)) {
                        compactedItem = [compactedItem];
                      }

                      if (_container5.includes('@list')) {
                        _context.next = 124;
                        break;
                      }

                      // wrap using @list alias
                      compactedItem = (0, _defineProperty2["default"])({}, api.compactIri({
                        activeCtx: activeCtx,
                        iri: '@list',
                        relativeTo: {
                          vocab: true
                        }
                      }), compactedItem); // include @index from expanded @list, if any

                      if ('@index' in expandedItem) {
                        compactedItem[api.compactIri({
                          activeCtx: activeCtx,
                          iri: '@index',
                          relativeTo: {
                            vocab: true
                          }
                        })] = expandedItem['@index'];
                      }

                      _context.next = 126;
                      break;

                    case 124:
                      _addValue(_nestResult, _itemActiveProperty, compactedItem, {
                        valueIsArray: true,
                        allowDuplicate: true
                      });

                      return _context.abrupt("continue", 199);

                    case 126:
                      if (!isGraph) {
                        _context.next = 130;
                        break;
                      }

                      if (_container5.includes('@graph') && (_container5.includes('@id') || _container5.includes('@index') && _isSimpleGraph(expandedItem))) {
                        // get or create the map object
                        mapObject = void 0;

                        if (_nestResult.hasOwnProperty(_itemActiveProperty)) {
                          mapObject = _nestResult[_itemActiveProperty];
                        } else {
                          _nestResult[_itemActiveProperty] = mapObject = {};
                        } // index on @id or @index or alias of @none


                        key = (_container5.includes('@id') ? expandedItem['@id'] : expandedItem['@index']) || api.compactIri({
                          activeCtx: activeCtx,
                          iri: '@none',
                          relativeTo: {
                            vocab: true
                          }
                        }); // add compactedItem to map, using value of `@id` or a new blank
                        // node identifier

                        _addValue(mapObject, key, compactedItem, {
                          propertyIsArray: !options.compactArrays || _container5.includes('@set')
                        });
                      } else if (_container5.includes('@graph') && _isSimpleGraph(expandedItem)) {
                        // container includes @graph but not @id or @index and value is a
                        // simple graph object add compact value
                        // if compactedItem contains multiple values, it is wrapped in
                        // `@included`
                        if (_isArray(compactedItem) && compactedItem.length > 1) {
                          compactedItem = {
                            '@included': compactedItem
                          };
                        }

                        _addValue(_nestResult, _itemActiveProperty, compactedItem, {
                          propertyIsArray: !options.compactArrays || _container5.includes('@set')
                        });
                      } else {
                        // wrap using @graph alias, remove array if only one item and
                        // compactArrays not set
                        if (_isArray(compactedItem) && compactedItem.length === 1 && options.compactArrays) {
                          compactedItem = compactedItem[0];
                        }

                        compactedItem = (0, _defineProperty2["default"])({}, api.compactIri({
                          activeCtx: activeCtx,
                          iri: '@graph',
                          relativeTo: {
                            vocab: true
                          }
                        }), compactedItem); // include @id from expanded graph, if any

                        if ('@id' in expandedItem) {
                          compactedItem[api.compactIri({
                            activeCtx: activeCtx,
                            iri: '@id',
                            relativeTo: {
                              vocab: true
                            }
                          })] = expandedItem['@id'];
                        } // include @index from expanded graph, if any


                        if ('@index' in expandedItem) {
                          compactedItem[api.compactIri({
                            activeCtx: activeCtx,
                            iri: '@index',
                            relativeTo: {
                              vocab: true
                            }
                          })] = expandedItem['@index'];
                        }

                        _addValue(_nestResult, _itemActiveProperty, compactedItem, {
                          propertyIsArray: !options.compactArrays || _container5.includes('@set')
                        });
                      }

                      _context.next = 199;
                      break;

                    case 130:
                      if (!(_container5.includes('@language') || _container5.includes('@index') || _container5.includes('@id') || _container5.includes('@type'))) {
                        _context.next = 197;
                        break;
                      }

                      // handle language and index maps
                      // get or create the map object
                      _mapObject = void 0;

                      if (_nestResult.hasOwnProperty(_itemActiveProperty)) {
                        _mapObject = _nestResult[_itemActiveProperty];
                      } else {
                        _nestResult[_itemActiveProperty] = _mapObject = {};
                      }

                      _key = void 0;

                      if (!_container5.includes('@language')) {
                        _context.next = 139;
                        break;
                      }

                      // if container is a language map, simplify compacted value to
                      // a simple string
                      if (_isValue(compactedItem)) {
                        compactedItem = compactedItem['@value'];
                      }

                      _key = expandedItem['@language'];
                      _context.next = 193;
                      break;

                    case 139:
                      if (!_container5.includes('@index')) {
                        _context.next = 167;
                        break;
                      }

                      indexKey = _getContextValue(activeCtx, _itemActiveProperty, '@index') || '@index';
                      containerKey = api.compactIri({
                        activeCtx: activeCtx,
                        iri: indexKey,
                        relativeTo: {
                          vocab: true
                        }
                      });

                      if (!(indexKey === '@index')) {
                        _context.next = 147;
                        break;
                      }

                      _key = expandedItem['@index'];
                      delete compactedItem[containerKey];
                      _context.next = 165;
                      break;

                    case 147:
                      others = void 0;
                      _asArray2 = _asArray(compactedItem[indexKey] || []);
                      _asArray3 = (0, _toArray2["default"])(_asArray2);
                      _key = _asArray3[0];
                      others = _asArray3.slice(1);

                      if (_isString(_key)) {
                        _context.next = 156;
                        break;
                      }

                      // Will use @none if it isn't a string.
                      _key = null;
                      _context.next = 165;
                      break;

                    case 156:
                      _context.t1 = others.length;
                      _context.next = _context.t1 === 0 ? 159 : _context.t1 === 1 ? 161 : 163;
                      break;

                    case 159:
                      delete compactedItem[indexKey];
                      return _context.abrupt("break", 165);

                    case 161:
                      compactedItem[indexKey] = others[0];
                      return _context.abrupt("break", 165);

                    case 163:
                      compactedItem[indexKey] = others;
                      return _context.abrupt("break", 165);

                    case 165:
                      _context.next = 193;
                      break;

                    case 167:
                      if (!_container5.includes('@id')) {
                        _context.next = 173;
                        break;
                      }

                      idKey = api.compactIri({
                        activeCtx: activeCtx,
                        iri: '@id',
                        relativeTo: {
                          vocab: true
                        }
                      });
                      _key = compactedItem[idKey];
                      delete compactedItem[idKey];
                      _context.next = 193;
                      break;

                    case 173:
                      if (!_container5.includes('@type')) {
                        _context.next = 193;
                        break;
                      }

                      typeKey = api.compactIri({
                        activeCtx: activeCtx,
                        iri: '@type',
                        relativeTo: {
                          vocab: true
                        }
                      });
                      _types = void 0;
                      _asArray4 = _asArray(compactedItem[typeKey] || []);
                      _asArray5 = (0, _toArray2["default"])(_asArray4);
                      _key = _asArray5[0];
                      _types = _asArray5.slice(1);
                      _context.t2 = _types.length;
                      _context.next = _context.t2 === 0 ? 183 : _context.t2 === 1 ? 185 : 187;
                      break;

                    case 183:
                      delete compactedItem[typeKey];
                      return _context.abrupt("break", 189);

                    case 185:
                      compactedItem[typeKey] = _types[0];
                      return _context.abrupt("break", 189);

                    case 187:
                      compactedItem[typeKey] = _types;
                      return _context.abrupt("break", 189);

                    case 189:
                      if (!(Object.keys(compactedItem).length === 1 && '@id' in expandedItem)) {
                        _context.next = 193;
                        break;
                      }

                      _context.next = 192;
                      return api.compact({
                        activeCtx: activeCtx,
                        activeProperty: _itemActiveProperty,
                        element: {
                          '@id': expandedItem['@id']
                        },
                        options: options,
                        compactionMap: compactionMap
                      });

                    case 192:
                      compactedItem = _context.sent;

                    case 193:
                      // if compacting this value which has no key, index on @none
                      if (!_key) {
                        _key = api.compactIri({
                          activeCtx: activeCtx,
                          iri: '@none',
                          relativeTo: {
                            vocab: true
                          }
                        });
                      } // add compact value to map object using key from expanded value
                      // based on the container type


                      _addValue(_mapObject, _key, compactedItem, {
                        propertyIsArray: _container5.includes('@set')
                      });

                      _context.next = 199;
                      break;

                    case 197:
                      // use an array if: compactArrays flag is false,
                      // @container is @set or @list , value is an empty
                      // array, or key is @graph
                      _isArray2 = !options.compactArrays || _container5.includes('@set') || _container5.includes('@list') || _isArray(compactedItem) && compactedItem.length === 0 || expandedProperty === '@list' || expandedProperty === '@graph'; // add compact value

                      _addValue(_nestResult, _itemActiveProperty, compactedItem, {
                        propertyIsArray: _isArray2
                      });

                    case 199:
                      _context.next = 103;
                      break;

                    case 201:
                      _context.next = 206;
                      break;

                    case 203:
                      _context.prev = 203;
                      _context.t3 = _context["catch"](101);

                      _iterator3.e(_context.t3);

                    case 206:
                      _context.prev = 206;

                      _iterator3.f();

                      return _context.finish(206);

                    case 209:
                      _context.next = 55;
                      break;

                    case 211:
                      _context.next = 216;
                      break;

                    case 213:
                      _context.prev = 213;
                      _context.t4 = _context["catch"](53);

                      _iterator2.e(_context.t4);

                    case 216:
                      _context.prev = 216;

                      _iterator2.f();

                      return _context.finish(216);

                    case 219:
                      return _context.abrupt("return", {
                        v: rval
                      });

                    case 220:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, null, [[31, 45, 48, 51], [53, 213, 216, 219], [101, 203, 206, 209]]);
            })(), "t0", 27);

          case 27:
            _ret = _context2.t0;

            if (!((0, _typeof2["default"])(_ret) === "object")) {
              _context2.next = 30;
              break;
            }

            return _context2.abrupt("return", _ret.v);

          case 30:
            return _context2.abrupt("return", element);

          case 31:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();
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


api.compactIri = function (_ref3) {
  var activeCtx = _ref3.activeCtx,
      iri = _ref3.iri,
      _ref3$value = _ref3.value,
      value = _ref3$value === void 0 ? null : _ref3$value,
      _ref3$relativeTo = _ref3.relativeTo,
      relativeTo = _ref3$relativeTo === void 0 ? {
    vocab: false
  } : _ref3$relativeTo,
      _ref3$reverse = _ref3.reverse,
      reverse = _ref3$reverse === void 0 ? false : _ref3$reverse,
      _ref3$base = _ref3.base,
      base = _ref3$base === void 0 ? null : _ref3$base;

  // can't compact null
  if (iri === null) {
    return iri;
  } // if context is from a property term scoped context composed with a
  // type-scoped context, then use the previous context instead


  if (activeCtx.isPropertyTermScoped && activeCtx.previousContext) {
    activeCtx = activeCtx.previousContext;
  }

  var inverseCtx = activeCtx.getInverse(); // if term is a keyword, it may be compacted to a simple alias

  if (_isKeyword(iri) && iri in inverseCtx && '@none' in inverseCtx[iri] && '@type' in inverseCtx[iri]['@none'] && '@none' in inverseCtx[iri]['@none']['@type']) {
    return inverseCtx[iri]['@none']['@type']['@none'];
  } // use inverse context to pick a term if iri is relative to vocab


  if (relativeTo.vocab && iri in inverseCtx) {
    var defaultLanguage = activeCtx['@language'] || '@none'; // prefer @index if available in value

    var containers = [];

    if (_isObject(value) && '@index' in value && !('@graph' in value)) {
      containers.push('@index', '@index@set');
    } // if value is a preserve object, use its value


    if (_isObject(value) && '@preserve' in value) {
      value = value['@preserve'][0];
    } // prefer most specific container including @graph, prefering @set
    // variations


    if (_isGraph(value)) {
      // favor indexmap if the graph is indexed
      if ('@index' in value) {
        containers.push('@graph@index', '@graph@index@set', '@index', '@index@set');
      } // favor idmap if the graph is has an @id


      if ('@id' in value) {
        containers.push('@graph@id', '@graph@id@set');
      }

      containers.push('@graph', '@graph@set', '@set'); // allow indexmap if the graph is not indexed

      if (!('@index' in value)) {
        containers.push('@graph@index', '@graph@index@set', '@index', '@index@set');
      } // allow idmap if the graph does not have an @id


      if (!('@id' in value)) {
        containers.push('@graph@id', '@graph@id@set');
      }
    } else if (_isObject(value) && !_isValue(value)) {
      containers.push('@id', '@id@set', '@type', '@set@type');
    } // defaults for term selection based on type/language


    var typeOrLanguage = '@language';
    var typeOrLanguageValue = '@null';

    if (reverse) {
      typeOrLanguage = '@type';
      typeOrLanguageValue = '@reverse';
      containers.push('@set');
    } else if (_isList(value)) {
      // choose the most specific term that works for all elements in @list
      // only select @list containers if @index is NOT in value
      if (!('@index' in value)) {
        containers.push('@list');
      }

      var list = value['@list'];

      if (list.length === 0) {
        // any empty list can be matched against any term that uses the
        // @list container regardless of @type or @language
        typeOrLanguage = '@any';
        typeOrLanguageValue = '@none';
      } else {
        var commonLanguage = list.length === 0 ? defaultLanguage : null;
        var commonType = null;

        for (var i = 0; i < list.length; ++i) {
          var item = list[i];
          var itemLanguage = '@none';
          var itemType = '@none';

          if (_isValue(item)) {
            if ('@direction' in item) {
              var lang = (item['@language'] || '').toLowerCase();
              var dir = item['@direction'];
              itemLanguage = "".concat(lang, "_").concat(dir);
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
      if (_isValue(value)) {
        if ('@language' in value && !('@index' in value)) {
          containers.push('@language', '@language@set');
          typeOrLanguageValue = value['@language'];
          var _dir = value['@direction'];

          if (_dir) {
            typeOrLanguageValue = "".concat(typeOrLanguageValue, "_").concat(_dir);
          }
        } else if ('@direction' in value && !('@index' in value)) {
          typeOrLanguageValue = "_".concat(value['@direction']);
        } else if ('@type' in value) {
          typeOrLanguage = '@type';
          typeOrLanguageValue = value['@type'];
        }
      } else {
        typeOrLanguage = '@type';
        typeOrLanguageValue = '@id';
      }

      containers.push('@set');
    } // do term selection


    containers.push('@none'); // an index map can be used to index values using @none, so add as a low
    // priority

    if (_isObject(value) && !('@index' in value)) {
      // allow indexing even if no @index present
      containers.push('@index', '@index@set');
    } // values without type or language can use @language map


    if (_isValue(value) && Object.keys(value).length === 1) {
      // allow indexing even if no @index present
      containers.push('@language', '@language@set');
    }

    var term = _selectTerm(activeCtx, iri, value, containers, typeOrLanguage, typeOrLanguageValue);

    if (term !== null) {
      return term;
    }
  } // no term match, use @vocab if available


  if (relativeTo.vocab) {
    if ('@vocab' in activeCtx) {
      // determine if vocab is a prefix of the iri
      var vocab = activeCtx['@vocab'];

      if (iri.indexOf(vocab) === 0 && iri !== vocab) {
        // use suffix as relative iri if it is not a term in the active context
        var suffix = iri.substr(vocab.length);

        if (!activeCtx.mappings.has(suffix)) {
          return suffix;
        }
      }
    }
  } // no term or @vocab match, check for possible CURIEs


  var choice = null; // TODO: make FastCurieMap a class with a method to do this lookup

  var partialMatches = [];
  var iriMap = activeCtx.fastCurieMap; // check for partial matches of against `iri`, which means look until
  // iri.length - 1, not full length

  var maxPartialLength = iri.length - 1;

  for (var _i2 = 0; _i2 < maxPartialLength && iri[_i2] in iriMap; ++_i2) {
    iriMap = iriMap[iri[_i2]];

    if ('' in iriMap) {
      partialMatches.push(iriMap[''][0]);
    }
  } // check partial matches in reverse order to prefer longest ones first


  for (var _i3 = partialMatches.length - 1; _i3 >= 0; --_i3) {
    var entry = partialMatches[_i3];
    var terms = entry.terms;

    var _iterator4 = _createForOfIteratorHelper(terms),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _term = _step4.value;
        // a CURIE is usable if:
        // 1. it has no mapping, OR
        // 2. value is null, which means we're not compacting an @value, AND
        //   the mapping matches the IRI
        var curie = _term + ':' + iri.substr(entry.iri.length);
        var isUsableCurie = activeCtx.mappings.get(_term)._prefix && (!activeCtx.mappings.has(curie) || value === null && activeCtx.mappings.get(curie)['@id'] === iri); // select curie if it is shorter or the same length but lexicographically
        // less than the current choice

        if (isUsableCurie && (choice === null || _compareShortestLeast(curie, choice) < 0)) {
          choice = curie;
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  } // return chosen curie


  if (choice !== null) {
    return choice;
  } // If iri could be confused with a compact IRI using a term in this context,
  // signal an error


  var _iterator5 = _createForOfIteratorHelper(activeCtx.mappings),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var _step5$value = (0, _slicedToArray2["default"])(_step5.value, 2),
          _term2 = _step5$value[0],
          td = _step5$value[1];

      if (td && td._prefix && iri.startsWith(_term2 + ':')) {
        throw new JsonLdError("Absolute IRI \"".concat(iri, "\" confused with prefix \"").concat(_term2, "\"."), 'jsonld.SyntaxError', {
          code: 'IRI confused with prefix',
          context: activeCtx
        });
      }
    } // compact IRI relative to base

  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }

  if (!relativeTo.vocab) {
    if ('@base' in activeCtx) {
      if (!activeCtx['@base']) {
        // The None case preserves rval as potentially relative
        return iri;
      } else {
        return _removeBase(_prependBase(base, activeCtx['@base']), iri);
      }
    } else {
      return _removeBase(base, iri);
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


api.compactValue = function (_ref4) {
  var activeCtx = _ref4.activeCtx,
      activeProperty = _ref4.activeProperty,
      value = _ref4.value,
      options = _ref4.options;

  // value is a @value
  if (_isValue(value)) {
    // get context rules
    var _type = _getContextValue(activeCtx, activeProperty, '@type');

    var language = _getContextValue(activeCtx, activeProperty, '@language');

    var direction = _getContextValue(activeCtx, activeProperty, '@direction');

    var container = _getContextValue(activeCtx, activeProperty, '@container') || []; // whether or not the value has an @index that must be preserved

    var preserveIndex = '@index' in value && !container.includes('@index'); // if there's no @index to preserve ...

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


    var keyCount = Object.keys(value).length;
    var isValueOnlyKey = keyCount === 1 || keyCount === 2 && '@index' in value && !preserveIndex;
    var hasDefaultLanguage = ('@language' in activeCtx);

    var isValueString = _isString(value['@value']);

    var hasNullMapping = activeCtx.mappings.has(activeProperty) && activeCtx.mappings.get(activeProperty)['@language'] === null;

    if (isValueOnlyKey && _type !== '@none' && (!hasDefaultLanguage || !isValueString || hasNullMapping)) {
      return value['@value'];
    }

    var rval = {}; // preserve @index

    if (preserveIndex) {
      rval[api.compactIri({
        activeCtx: activeCtx,
        iri: '@index',
        relativeTo: {
          vocab: true
        }
      })] = value['@index'];
    }

    if ('@type' in value) {
      // compact @type IRI
      rval[api.compactIri({
        activeCtx: activeCtx,
        iri: '@type',
        relativeTo: {
          vocab: true
        }
      })] = api.compactIri({
        activeCtx: activeCtx,
        iri: value['@type'],
        relativeTo: {
          vocab: true
        }
      });
    } else if ('@language' in value) {
      // alias @language
      rval[api.compactIri({
        activeCtx: activeCtx,
        iri: '@language',
        relativeTo: {
          vocab: true
        }
      })] = value['@language'];
    }

    if ('@direction' in value) {
      // alias @direction
      rval[api.compactIri({
        activeCtx: activeCtx,
        iri: '@direction',
        relativeTo: {
          vocab: true
        }
      })] = value['@direction'];
    } // alias @value


    rval[api.compactIri({
      activeCtx: activeCtx,
      iri: '@value',
      relativeTo: {
        vocab: true
      }
    })] = value['@value'];
    return rval;
  } // value is a subject reference


  var expandedProperty = _expandIri(activeCtx, activeProperty, {
    vocab: true
  }, options);

  var type = _getContextValue(activeCtx, activeProperty, '@type');

  var compacted = api.compactIri({
    activeCtx: activeCtx,
    iri: value['@id'],
    relativeTo: {
      vocab: type === '@vocab'
    },
    base: options.base
  }); // compact to scalar

  if (type === '@id' || type === '@vocab' || expandedProperty === '@graph') {
    return compacted;
  }

  return (0, _defineProperty2["default"])({}, api.compactIri({
    activeCtx: activeCtx,
    iri: '@id',
    relativeTo: {
      vocab: true
    }
  }), compacted);
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


  var prefs = []; // determine prefs for @id based on whether or not value compacts to a term

  if ((typeOrLanguageValue === '@id' || typeOrLanguageValue === '@reverse') && _isObject(value) && '@id' in value) {
    // prefer @reverse first
    if (typeOrLanguageValue === '@reverse') {
      prefs.push('@reverse');
    } // try to compact value to a term


    var term = api.compactIri({
      activeCtx: activeCtx,
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

    var langDir = prefs.find(function (el) {
      return el.includes('_');
    });

    if (langDir) {
      // consider _dir portion
      prefs.push(langDir.replace(/^[^_]+_/, '_'));
    }
  }

  prefs.push('@none');
  var containerMap = activeCtx.inverse[iri];

  var _iterator6 = _createForOfIteratorHelper(containers),
      _step6;

  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var container = _step6.value;

      // if container not available in the map, continue
      if (!(container in containerMap)) {
        continue;
      }

      var typeOrLanguageValueMap = containerMap[container][typeOrLanguage];

      var _iterator7 = _createForOfIteratorHelper(prefs),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var pref = _step7.value;

          // if type/language option not available in the map, continue
          if (!(pref in typeOrLanguageValueMap)) {
            continue;
          } // select term


          return typeOrLanguageValueMap[pref];
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
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


var RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
var XSD = 'http://www.w3.org/2001/XMLSchema#';
module.exports = {
  // TODO: Deprecated and will be removed later. Use LINK_HEADER_CONTEXT.
  LINK_HEADER_REL: 'http://www.w3.org/ns/json-ld#context',
  LINK_HEADER_CONTEXT: 'http://www.w3.org/ns/json-ld#context',
  RDF: RDF,
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
  XSD: XSD,
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


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js"));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js"));

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var util = __webpack_require__(/*! ./util */ "./lib/util.js");

var JsonLdError = __webpack_require__(/*! ./JsonLdError */ "./lib/JsonLdError.js");

var _require = __webpack_require__(/*! ./types */ "./lib/types.js"),
    _isArray = _require.isArray,
    _isObject = _require.isObject,
    _isString = _require.isString,
    _isUndefined = _require.isUndefined;

var _require2 = __webpack_require__(/*! ./url */ "./lib/url.js"),
    _isAbsoluteIri = _require2.isAbsolute,
    _isRelativeIri = _require2.isRelative,
    prependBase = _require2.prependBase,
    parseUrl = _require2.parse;

var _require3 = __webpack_require__(/*! ./util */ "./lib/util.js"),
    _asArray = _require3.asArray,
    _compareShortestLeast = _require3.compareShortestLeast;

var INITIAL_CONTEXT_CACHE = new Map();
var INITIAL_CONTEXT_CACHE_MAX_SIZE = 10000;
var KEYWORD_PATTERN = /^@[a-zA-Z]+$/;
var api = {};
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

api.process = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var activeCtx, localCtx, options, _ref$propagate, propagate, _ref$overrideProtecte, overrideProtected, _ref$cycles, cycles, ctxs, resolved, rval, _iterator, _step, resolvedContext, ctx, protectedMode, _processed, oldActiveCtx, _i, _Object$entries, _Object$entries$_i, term, _protected, processed, defined, base, value, _value, _value2, _value3, _value4, resolvedImport, processedImport, importCtx, key, _key, keyCtx, process, url;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            activeCtx = _ref.activeCtx, localCtx = _ref.localCtx, options = _ref.options, _ref$propagate = _ref.propagate, propagate = _ref$propagate === void 0 ? true : _ref$propagate, _ref$overrideProtecte = _ref.overrideProtected, overrideProtected = _ref$overrideProtecte === void 0 ? false : _ref$overrideProtecte, _ref$cycles = _ref.cycles, cycles = _ref$cycles === void 0 ? new Set() : _ref$cycles;

            // normalize local context to an array of @context objects
            if (_isObject(localCtx) && '@context' in localCtx && _isArray(localCtx['@context'])) {
              localCtx = localCtx['@context'];
            }

            ctxs = _asArray(localCtx); // no contexts in array, return current active context w/o changes

            if (!(ctxs.length === 0)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", activeCtx);

          case 5:
            _context.next = 7;
            return options.contextResolver.resolve({
              activeCtx: activeCtx,
              context: localCtx,
              documentLoader: options.documentLoader,
              base: options.base
            });

          case 7:
            resolved = _context.sent;

            // override propagate if first resolved context has `@propagate`
            if (_isObject(resolved[0].document) && typeof resolved[0].document['@propagate'] === 'boolean') {
              // retrieve early, error checking done later
              propagate = resolved[0].document['@propagate'];
            } // process each context in order, update active context
            // on each iteration to ensure proper caching


            rval = activeCtx; // track the previous context
            // if not propagating, make sure rval has a previous context

            if (!propagate && !rval.previousContext) {
              // clone `rval` context before updating
              rval = rval.clone();
              rval.previousContext = activeCtx;
            }

            _iterator = _createForOfIteratorHelper(resolved);
            _context.prev = 12;

            _iterator.s();

          case 14:
            if ((_step = _iterator.n()).done) {
              _context.next = 164;
              break;
            }

            resolvedContext = _step.value;
            ctx = resolvedContext.document; // update active context to one computed from last iteration

            activeCtx = rval; // reset to initial context

            if (!(ctx === null)) {
              _context.next = 40;
              break;
            }

            if (!(!overrideProtected && Object.keys(activeCtx["protected"]).length !== 0)) {
              _context.next = 38;
              break;
            }

            protectedMode = options && options.protectedMode || 'error';

            if (!(protectedMode === 'error')) {
              _context.next = 25;
              break;
            }

            throw new JsonLdError('Tried to nullify a context with protected terms outside of ' + 'a term definition.', 'jsonld.SyntaxError', {
              code: 'invalid context nullification'
            });

          case 25:
            if (!(protectedMode === 'warn')) {
              _context.next = 37;
              break;
            }

            // FIXME: remove logging and use a handler
            console.warn('WARNING: invalid context nullification'); // get processed context from cache if available

            _processed = resolvedContext.getProcessed(activeCtx);

            if (!_processed) {
              _context.next = 31;
              break;
            }

            rval = activeCtx = _processed;
            return _context.abrupt("continue", 162);

          case 31:
            oldActiveCtx = activeCtx; // copy all protected term definitions to fresh initial context

            rval = activeCtx = api.getInitialContext(options).clone();

            for (_i = 0, _Object$entries = Object.entries(oldActiveCtx["protected"]); _i < _Object$entries.length; _i++) {
              _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2), term = _Object$entries$_i[0], _protected = _Object$entries$_i[1];

              if (_protected) {
                activeCtx.mappings[term] = util.clone(oldActiveCtx.mappings[term]);
              }
            }

            activeCtx["protected"] = util.clone(oldActiveCtx["protected"]); // cache processed result

            resolvedContext.setProcessed(oldActiveCtx, rval);
            return _context.abrupt("continue", 162);

          case 37:
            throw new JsonLdError('Invalid protectedMode.', 'jsonld.SyntaxError', {
              code: 'invalid protected mode',
              context: localCtx,
              protectedMode: protectedMode
            });

          case 38:
            rval = activeCtx = api.getInitialContext(options).clone();
            return _context.abrupt("continue", 162);

          case 40:
            // get processed context from cache if available
            processed = resolvedContext.getProcessed(activeCtx);

            if (!processed) {
              _context.next = 44;
              break;
            }

            rval = activeCtx = processed;
            return _context.abrupt("continue", 162);

          case 44:
            // dereference @context key if present
            if (_isObject(ctx) && '@context' in ctx) {
              ctx = ctx['@context'];
            } // context must be an object by now, all URLs retrieved before this call


            if (_isObject(ctx)) {
              _context.next = 47;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; @context must be an object.', 'jsonld.SyntaxError', {
              code: 'invalid local context',
              context: ctx
            });

          case 47:
            // TODO: there is likely a `previousContext` cloning optimization that
            // could be applied here (no need to copy it under certain conditions)
            // clone context before updating it
            rval = rval.clone(); // define context mappings for keys in local context

            defined = new Map(); // handle @version

            if (!('@version' in ctx)) {
              _context.next = 57;
              break;
            }

            if (!(ctx['@version'] !== 1.1)) {
              _context.next = 52;
              break;
            }

            throw new JsonLdError('Unsupported JSON-LD version: ' + ctx['@version'], 'jsonld.UnsupportedVersion', {
              code: 'invalid @version value',
              context: ctx
            });

          case 52:
            if (!(activeCtx.processingMode && activeCtx.processingMode === 'json-ld-1.0')) {
              _context.next = 54;
              break;
            }

            throw new JsonLdError('@version: ' + ctx['@version'] + ' not compatible with ' + activeCtx.processingMode, 'jsonld.ProcessingModeConflict', {
              code: 'processing mode conflict',
              context: ctx
            });

          case 54:
            rval.processingMode = 'json-ld-1.1';
            rval['@version'] = ctx['@version'];
            defined.set('@version', true);

          case 57:
            // if not set explicitly, set processingMode to "json-ld-1.1"
            rval.processingMode = rval.processingMode || activeCtx.processingMode; // handle @base

            if (!('@base' in ctx)) {
              _context.next = 70;
              break;
            }

            base = ctx['@base'];

            if (!(base === null || _isAbsoluteIri(base))) {
              _context.next = 63;
              break;
            }

            _context.next = 68;
            break;

          case 63:
            if (!_isRelativeIri(base)) {
              _context.next = 67;
              break;
            }

            base = prependBase(rval['@base'], base);
            _context.next = 68;
            break;

          case 67:
            throw new JsonLdError('Invalid JSON-LD syntax; the value of "@base" in a ' + '@context must be an absolute IRI, a relative IRI, or null.', 'jsonld.SyntaxError', {
              code: 'invalid base IRI',
              context: ctx
            });

          case 68:
            rval['@base'] = base;
            defined.set('@base', true);

          case 70:
            if (!('@vocab' in ctx)) {
              _context.next = 86;
              break;
            }

            value = ctx['@vocab'];

            if (!(value === null)) {
              _context.next = 76;
              break;
            }

            delete rval['@vocab'];
            _context.next = 85;
            break;

          case 76:
            if (_isString(value)) {
              _context.next = 80;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; the value of "@vocab" in a ' + '@context must be a string or null.', 'jsonld.SyntaxError', {
              code: 'invalid vocab mapping',
              context: ctx
            });

          case 80:
            if (!(!_isAbsoluteIri(value) && api.processingMode(rval, 1.0))) {
              _context.next = 84;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; the value of "@vocab" in a ' + '@context must be an absolute IRI.', 'jsonld.SyntaxError', {
              code: 'invalid vocab mapping',
              context: ctx
            });

          case 84:
            rval['@vocab'] = _expandIri(rval, value, {
              vocab: true,
              base: true
            }, undefined, undefined, options);

          case 85:
            defined.set('@vocab', true);

          case 86:
            if (!('@language' in ctx)) {
              _context.next = 98;
              break;
            }

            _value = ctx['@language'];

            if (!(_value === null)) {
              _context.next = 92;
              break;
            }

            delete rval['@language'];
            _context.next = 97;
            break;

          case 92:
            if (_isString(_value)) {
              _context.next = 96;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; the value of "@language" in a ' + '@context must be a string or null.', 'jsonld.SyntaxError', {
              code: 'invalid default language',
              context: ctx
            });

          case 96:
            rval['@language'] = _value.toLowerCase();

          case 97:
            defined.set('@language', true);

          case 98:
            if (!('@direction' in ctx)) {
              _context.next = 112;
              break;
            }

            _value2 = ctx['@direction'];

            if (!(activeCtx.processingMode === 'json-ld-1.0')) {
              _context.next = 102;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; @direction not compatible with ' + activeCtx.processingMode, 'jsonld.SyntaxError', {
              code: 'invalid context member',
              context: ctx
            });

          case 102:
            if (!(_value2 === null)) {
              _context.next = 106;
              break;
            }

            delete rval['@direction'];
            _context.next = 111;
            break;

          case 106:
            if (!(_value2 !== 'ltr' && _value2 !== 'rtl')) {
              _context.next = 110;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; the value of "@direction" in a ' + '@context must be null, "ltr", or "rtl".', 'jsonld.SyntaxError', {
              code: 'invalid base direction',
              context: ctx
            });

          case 110:
            rval['@direction'] = _value2;

          case 111:
            defined.set('@direction', true);

          case 112:
            if (!('@propagate' in ctx)) {
              _context.next = 119;
              break;
            }

            _value3 = ctx['@propagate'];

            if (!(activeCtx.processingMode === 'json-ld-1.0')) {
              _context.next = 116;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; @propagate not compatible with ' + activeCtx.processingMode, 'jsonld.SyntaxError', {
              code: 'invalid context entry',
              context: ctx
            });

          case 116:
            if (!(typeof _value3 !== 'boolean')) {
              _context.next = 118;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; @propagate value must be a boolean.', 'jsonld.SyntaxError', {
              code: 'invalid @propagate value',
              context: localCtx
            });

          case 118:
            defined.set('@propagate', true);

          case 119:
            if (!('@import' in ctx)) {
              _context.next = 141;
              break;
            }

            _value4 = ctx['@import'];

            if (!(activeCtx.processingMode === 'json-ld-1.0')) {
              _context.next = 123;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; @import not compatible with ' + activeCtx.processingMode, 'jsonld.SyntaxError', {
              code: 'invalid context entry',
              context: ctx
            });

          case 123:
            if (_isString(_value4)) {
              _context.next = 125;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; @import must be a string.', 'jsonld.SyntaxError', {
              code: 'invalid @import value',
              context: localCtx
            });

          case 125:
            _context.next = 127;
            return options.contextResolver.resolve({
              activeCtx: activeCtx,
              context: _value4,
              documentLoader: options.documentLoader,
              base: options.base
            });

          case 127:
            resolvedImport = _context.sent;

            if (!(resolvedImport.length !== 1)) {
              _context.next = 130;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; @import must reference a single context.', 'jsonld.SyntaxError', {
              code: 'invalid remote context',
              context: localCtx
            });

          case 130:
            processedImport = resolvedImport[0].getProcessed(activeCtx);

            if (!processedImport) {
              _context.next = 135;
              break;
            }

            // Note: if the same context were used in this active context
            // as a reference context, then processed_input might not
            // be a dict.
            ctx = processedImport;
            _context.next = 140;
            break;

          case 135:
            importCtx = resolvedImport[0].document;

            if (!('@import' in importCtx)) {
              _context.next = 138;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax: ' + 'imported context must not include @import.', 'jsonld.SyntaxError', {
              code: 'invalid context entry',
              context: localCtx
            });

          case 138:
            // merge ctx into importCtx and replace rval with the result
            for (key in importCtx) {
              if (!ctx.hasOwnProperty(key)) {
                ctx[key] = importCtx[key];
              }
            } // Note: this could potenially conflict if the import
            // were used in the same active context as a referenced
            // context and an import. In this case, we
            // could override the cached result, but seems unlikely.


            resolvedImport[0].setProcessed(activeCtx, ctx);

          case 140:
            defined.set('@import', true);

          case 141:
            // handle @protected; determine whether this sub-context is declaring
            // all its terms to be "protected" (exceptions can be made on a
            // per-definition basis)
            defined.set('@protected', ctx['@protected'] || false); // process all other keys

            _context.t0 = _regenerator["default"].keys(ctx);

          case 143:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 161;
              break;
            }

            _key = _context.t1.value;
            api.createTermDefinition({
              activeCtx: rval,
              localCtx: ctx,
              term: _key,
              defined: defined,
              options: options,
              overrideProtected: overrideProtected
            });

            if (!(_isObject(ctx[_key]) && '@context' in ctx[_key])) {
              _context.next = 159;
              break;
            }

            keyCtx = ctx[_key]['@context'];
            process = true;

            if (_isString(keyCtx)) {
              url = prependBase(options.base, keyCtx); // track processed contexts to avoid scoped context recursion

              if (cycles.has(url)) {
                process = false;
              } else {
                cycles.add(url);
              }
            } // parse context to validate


            if (!process) {
              _context.next = 159;
              break;
            }

            _context.prev = 151;
            _context.next = 154;
            return api.process({
              activeCtx: rval,
              localCtx: ctx[_key]['@context'],
              overrideProtected: true,
              options: options,
              cycles: cycles
            });

          case 154:
            _context.next = 159;
            break;

          case 156:
            _context.prev = 156;
            _context.t2 = _context["catch"](151);
            throw new JsonLdError('Invalid JSON-LD syntax; invalid scoped context.', 'jsonld.SyntaxError', {
              code: 'invalid scoped context',
              context: ctx[_key]['@context'],
              term: _key
            });

          case 159:
            _context.next = 143;
            break;

          case 161:
            // cache processed result
            resolvedContext.setProcessed(activeCtx, rval);

          case 162:
            _context.next = 14;
            break;

          case 164:
            _context.next = 169;
            break;

          case 166:
            _context.prev = 166;
            _context.t3 = _context["catch"](12);

            _iterator.e(_context.t3);

          case 169:
            _context.prev = 169;

            _iterator.f();

            return _context.finish(169);

          case 172:
            return _context.abrupt("return", rval);

          case 173:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[12, 166, 169, 172], [151, 156]]);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();
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


api.createTermDefinition = function (_ref3) {
  var activeCtx = _ref3.activeCtx,
      localCtx = _ref3.localCtx,
      term = _ref3.term,
      defined = _ref3.defined,
      options = _ref3.options,
      _ref3$overrideProtect = _ref3.overrideProtected,
      overrideProtected = _ref3$overrideProtect === void 0 ? false : _ref3$overrideProtect;

  if (defined.has(term)) {
    // term already defined
    if (defined.get(term)) {
      return;
    } // cycle detected


    throw new JsonLdError('Cyclical context definition detected.', 'jsonld.CyclicalContext', {
      code: 'cyclic IRI mapping',
      context: localCtx,
      term: term
    });
  } // now defining term


  defined.set(term, false); // get context term value

  var value;

  if (localCtx.hasOwnProperty(term)) {
    value = localCtx[term];
  }

  if (term === '@type' && _isObject(value) && (value['@container'] || '@set') === '@set' && api.processingMode(activeCtx, 1.1)) {
    var _validKeys = ['@container', '@id', '@protected'];
    var keys = Object.keys(value);

    if (keys.length === 0 || keys.some(function (k) {
      return !_validKeys.includes(k);
    })) {
      throw new JsonLdError('Invalid JSON-LD syntax; keywords cannot be overridden.', 'jsonld.SyntaxError', {
        code: 'keyword redefinition',
        context: localCtx,
        term: term
      });
    }
  } else if (api.isKeyword(term)) {
    throw new JsonLdError('Invalid JSON-LD syntax; keywords cannot be overridden.', 'jsonld.SyntaxError', {
      code: 'keyword redefinition',
      context: localCtx,
      term: term
    });
  } else if (term.match(KEYWORD_PATTERN)) {
    // FIXME: remove logging and use a handler
    console.warn('WARNING: terms beginning with "@" are reserved' + ' for future use and ignored', {
      term: term
    });
    return;
  } else if (term === '') {
    throw new JsonLdError('Invalid JSON-LD syntax; a term cannot be an empty string.', 'jsonld.SyntaxError', {
      code: 'invalid term definition',
      context: localCtx
    });
  } // keep reference to previous mapping for potential `@protected` check


  var previousMapping = activeCtx.mappings.get(term); // remove old mapping

  if (activeCtx.mappings.has(term)) {
    activeCtx.mappings["delete"](term);
  } // convert short-hand value to object w/@id


  var simpleTerm = false;

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


  var mapping = {};
  activeCtx.mappings.set(term, mapping);
  mapping.reverse = false; // make sure term definition only has expected keywords

  var validKeys = ['@container', '@id', '@language', '@reverse', '@type']; // JSON-LD 1.1 support

  if (api.processingMode(activeCtx, 1.1)) {
    validKeys.push('@context', '@direction', '@index', '@nest', '@prefix', '@protected');
  }

  for (var kw in value) {
    if (!validKeys.includes(kw)) {
      throw new JsonLdError('Invalid JSON-LD syntax; a term definition must not contain ' + kw, 'jsonld.SyntaxError', {
        code: 'invalid term definition',
        context: localCtx
      });
    }
  } // always compute whether term has a colon as an optimization for
  // _compactIri


  var colon = term.indexOf(':');
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

    var reverse = value['@reverse'];

    if (!_isString(reverse)) {
      throw new JsonLdError('Invalid JSON-LD syntax; a @context @reverse value must be a string.', 'jsonld.SyntaxError', {
        code: 'invalid IRI mapping',
        context: localCtx
      });
    }

    if (!api.isKeyword(reverse) && reverse.match(KEYWORD_PATTERN)) {
      // FIXME: remove logging and use a handler
      console.warn('WARNING: values beginning with "@" are reserved' + ' for future use and ignored', {
        reverse: reverse
      });

      if (previousMapping) {
        activeCtx.mappings.set(term, previousMapping);
      } else {
        activeCtx.mappings["delete"](term);
      }

      return;
    } // expand and add @id mapping


    var _id = _expandIri(activeCtx, reverse, {
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
    var _id2 = value['@id'];

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
        activeCtx.mappings["delete"](term);
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
        var termDefined = new Map(defined).set(term, true);

        var termIri = _expandIri(activeCtx, term, {
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
      var prefix = term.substr(0, colon);

      if (localCtx.hasOwnProperty(prefix)) {
        // define parent prefix
        api.createTermDefinition({
          activeCtx: activeCtx,
          localCtx: localCtx,
          term: prefix,
          defined: defined,
          options: options
        });
      }

      if (activeCtx.mappings.has(prefix)) {
        // set @id based on prefix parent
        var suffix = term.substr(colon + 1);
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
          term: term
        });
      } // prepend vocab to term


      mapping['@id'] = activeCtx['@vocab'] + term;
    }
  } // Handle term protection


  if (value['@protected'] === true || defined.get('@protected') === true && value['@protected'] !== false) {
    activeCtx["protected"][term] = true;
    mapping["protected"] = true;
  } // IRI mapping now defined


  defined.set(term, true);

  if ('@type' in value) {
    var type = value['@type'];

    if (!_isString(type)) {
      throw new JsonLdError('Invalid JSON-LD syntax; an @context @type value must be a string.', 'jsonld.SyntaxError', {
        code: 'invalid type mapping',
        context: localCtx
      });
    }

    if (type === '@json' || type === '@none') {
      if (api.processingMode(activeCtx, 1.0)) {
        throw new JsonLdError('Invalid JSON-LD syntax; an @context @type value must not be ' + "\"".concat(type, "\" in JSON-LD 1.0 mode."), 'jsonld.SyntaxError', {
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
    var container = _isString(value['@container']) ? [value['@container']] : value['@container'] || [];
    var validContainers = ['@list', '@set', '@index', '@language'];
    var isValid = true;
    var hasSet = container.includes('@set'); // JSON-LD 1.1 support

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
        if (container.some(function (key) {
          return key !== '@graph' && key !== '@id' && key !== '@index' && key !== '@set';
        })) {
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


    isValid &= container.every(function (c) {
      return validContainers.includes(c);
    }); // @set not allowed with @list

    isValid &= !(hasSet && container.includes('@list'));

    if (!isValid) {
      throw new JsonLdError('Invalid JSON-LD syntax; @context @container value must be ' + 'one of the following: ' + validContainers.join(', '), 'jsonld.SyntaxError', {
        code: 'invalid container mapping',
        context: localCtx
      });
    }

    if (mapping.reverse && !container.every(function (c) {
      return ['@index', '@set'].includes(c);
    })) {
      throw new JsonLdError('Invalid JSON-LD syntax; @context @container value for a @reverse ' + 'type definition must be @index or @set.', 'jsonld.SyntaxError', {
        code: 'invalid reverse property',
        context: localCtx
      });
    } // add @container to mapping


    mapping['@container'] = container;
  } // property indexing


  if ('@index' in value) {
    if (!('@container' in value) || !mapping['@container'].includes('@index')) {
      throw new JsonLdError('Invalid JSON-LD syntax; @index without @index in @container: ' + "\"".concat(value['@index'], "\" on term \"").concat(term, "\"."), 'jsonld.SyntaxError', {
        code: 'invalid term definition',
        context: localCtx
      });
    }

    if (!_isString(value['@index']) || value['@index'].indexOf('@') === 0) {
      throw new JsonLdError('Invalid JSON-LD syntax; @index must expand to an IRI: ' + "\"".concat(value['@index'], "\" on term \"").concat(term, "\"."), 'jsonld.SyntaxError', {
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
    var language = value['@language'];

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
    var direction = value['@direction'];

    if (direction !== null && direction !== 'ltr' && direction !== 'rtl') {
      throw new JsonLdError('Invalid JSON-LD syntax; @direction value must be ' + 'null, "ltr", or "rtl".', 'jsonld.SyntaxError', {
        code: 'invalid base direction',
        context: localCtx
      });
    }

    mapping['@direction'] = direction;
  }

  if ('@nest' in value) {
    var nest = value['@nest'];

    if (!_isString(nest) || nest !== '@nest' && nest.indexOf('@') === 0) {
      throw new JsonLdError('Invalid JSON-LD syntax; @context @nest value must be ' + 'a string which is not a keyword other than @nest.', 'jsonld.SyntaxError', {
        code: 'invalid @nest value',
        context: localCtx
      });
    }

    mapping['@nest'] = nest;
  } // disallow aliasing @context and @preserve


  var id = mapping['@id'];

  if (id === '@context' || id === '@preserve') {
    throw new JsonLdError('Invalid JSON-LD syntax; @context and @preserve cannot be aliased.', 'jsonld.SyntaxError', {
      code: 'invalid keyword alias',
      context: localCtx
    });
  } // Check for overriding protected terms


  if (previousMapping && previousMapping["protected"] && !overrideProtected) {
    // force new term to continue to be protected and see if the mappings would
    // be equal
    activeCtx["protected"][term] = true;
    mapping["protected"] = true;

    if (!_deepCompare(previousMapping, mapping)) {
      var protectedMode = options && options.protectedMode || 'error';

      if (protectedMode === 'error') {
        throw new JsonLdError('Invalid JSON-LD syntax; tried to redefine a protected term.', 'jsonld.SyntaxError', {
          code: 'protected term redefinition',
          context: localCtx,
          term: term
        });
      } else if (protectedMode === 'warn') {
        // FIXME: remove logging and use a handler
        console.warn('WARNING: protected term redefinition', {
          term: term
        });
        return;
      }

      throw new JsonLdError('Invalid protectedMode.', 'jsonld.SyntaxError', {
        code: 'invalid protected mode',
        context: localCtx,
        term: term,
        protectedMode: protectedMode
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


api.expandIri = function (activeCtx, value, relativeTo, options) {
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
      activeCtx: activeCtx,
      localCtx: localCtx,
      term: value,
      defined: defined,
      options: options
    });
  }

  relativeTo = relativeTo || {};

  if (relativeTo.vocab) {
    var mapping = activeCtx.mappings.get(value); // value is explicitly ignored with a null mapping

    if (mapping === null) {
      return null;
    }

    if (_isObject(mapping) && '@id' in mapping) {
      // value is a term
      return mapping['@id'];
    }
  } // split value into prefix:suffix


  var colon = value.indexOf(':');

  if (colon > 0) {
    var prefix = value.substr(0, colon);
    var suffix = value.substr(colon + 1); // do not expand blank nodes (prefix of '_') or already-absolute
    // IRIs (suffix of '//')

    if (prefix === '_' || suffix.indexOf('//') === 0) {
      return value;
    } // prefix dependency not defined, define it


    if (localCtx && localCtx.hasOwnProperty(prefix)) {
      api.createTermDefinition({
        activeCtx: activeCtx,
        localCtx: localCtx,
        term: prefix,
        defined: defined,
        options: options
      });
    } // use mapping if prefix is defined


    var _mapping = activeCtx.mappings.get(prefix);

    if (_mapping && _mapping._prefix) {
      return _mapping['@id'] + suffix;
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


api.getInitialContext = function (options) {
  var key = JSON.stringify({
    processingMode: options.processingMode
  });
  var cached = INITIAL_CONTEXT_CACHE.get(key);

  if (cached) {
    return cached;
  }

  var initialContext = {
    processingMode: options.processingMode,
    mappings: new Map(),
    inverse: null,
    getInverse: _createInverseContext,
    clone: _cloneActiveContext,
    revertToPreviousContext: _revertToPreviousContext,
    "protected": {}
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
    var activeCtx = this; // lazily create inverse

    if (activeCtx.inverse) {
      return activeCtx.inverse;
    }

    var inverse = activeCtx.inverse = {}; // variables for building fast CURIE map

    var fastCurieMap = activeCtx.fastCurieMap = {};
    var irisToTerms = {}; // handle default language

    var defaultLanguage = (activeCtx['@language'] || '@none').toLowerCase(); // handle default direction

    var defaultDirection = activeCtx['@direction']; // create term selections for each mapping in the context, ordered by
    // shortest and then lexicographically least

    var mappings = activeCtx.mappings;
    var terms = (0, _toConsumableArray2["default"])(mappings.keys()).sort(_compareShortestLeast);

    var _iterator2 = _createForOfIteratorHelper(terms),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var term = _step2.value;
        var mapping = mappings.get(term);

        if (mapping === null) {
          continue;
        }

        var container = mapping['@container'] || '@none';
        container = [].concat(container).sort().join('');

        if (mapping['@id'] === null) {
          continue;
        } // iterate over every IRI in the mapping


        var ids = _asArray(mapping['@id']);

        var _iterator3 = _createForOfIteratorHelper(ids),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var iri = _step3.value;
            var entry = inverse[iri];
            var isKeyword = api.isKeyword(iri);

            if (!entry) {
              // initialize entry
              inverse[iri] = entry = {};

              if (!isKeyword && !mapping._termHasColon) {
                // init IRI to term map and fast CURIE prefixes
                irisToTerms[iri] = [term];
                var fastCurieEntry = {
                  iri: iri,
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
              var language = mapping['@language'];
              var direction = mapping['@direction'];

              if (language && direction) {
                _addPreferredTerm(term, entry['@language'], "".concat(language, "_").concat(direction).toLowerCase());
              } else if (language) {
                _addPreferredTerm(term, entry['@language'], language.toLowerCase());
              } else if (direction) {
                _addPreferredTerm(term, entry['@language'], "_".concat(direction));
              } else {
                _addPreferredTerm(term, entry['@language'], '@null');
              }
            } else if ('@language' in mapping) {
              _addPreferredTerm(term, entry['@language'], (mapping['@language'] || '@null').toLowerCase());
            } else if ('@direction' in mapping) {
              if (mapping['@direction']) {
                _addPreferredTerm(term, entry['@language'], "_".concat(mapping['@direction']));
              } else {
                _addPreferredTerm(term, entry['@language'], '@none');
              }
            } else if (defaultDirection) {
              _addPreferredTerm(term, entry['@language'], "_".concat(defaultDirection));

              _addPreferredTerm(term, entry['@language'], '@none');

              _addPreferredTerm(term, entry['@type'], '@none');
            } else {
              // add entries for no type and no language
              _addPreferredTerm(term, entry['@language'], defaultLanguage);

              _addPreferredTerm(term, entry['@language'], '@none');

              _addPreferredTerm(term, entry['@type'], '@none');
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      } // build fast CURIE map

    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    for (var _key2 in fastCurieMap) {
      _buildIriMap(fastCurieMap, _key2, 1);
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
    var entries = iriMap[key];
    var next = iriMap[key] = {};
    var iri;
    var letter;

    var _iterator4 = _createForOfIteratorHelper(entries),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var entry = _step4.value;
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
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    for (var _key3 in next) {
      if (_key3 === '') {
        continue;
      }

      _buildIriMap(next, _key3, idx + 1);
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
    var child = {};
    child.mappings = util.clone(this.mappings);
    child.clone = this.clone;
    child.inverse = null;
    child.getInverse = this.getInverse;
    child["protected"] = util.clone(this["protected"]);

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


api.getContextValue = function (ctx, key, type) {
  // invalid key
  if (key === null) {
    if (type === '@context') {
      return undefined;
    }

    return null;
  } // get specific entry information


  if (ctx.mappings.has(key)) {
    var entry = ctx.mappings.get(key);

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


api.processingMode = function (activeCtx, version) {
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


api.isKeyword = function (v) {
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
  if (!(x1 && (0, _typeof2["default"])(x1) === 'object') || !(x2 && (0, _typeof2["default"])(x2) === 'object')) {
    return x1 === x2;
  } // x1 and x2 are objects (also potentially arrays)


  var x1Array = Array.isArray(x1);

  if (x1Array !== Array.isArray(x2)) {
    return false;
  }

  if (x1Array) {
    if (x1.length !== x2.length) {
      return false;
    }

    for (var i = 0; i < x1.length; ++i) {
      if (!_deepCompare(x1[i], x2[i])) {
        return false;
      }
    }

    return true;
  } // x1 and x2 are non-array objects


  var k1s = Object.keys(x1);
  var k2s = Object.keys(x2);

  if (k1s.length !== k2s.length) {
    return false;
  }

  for (var k1 in x1) {
    var v1 = x1[k1];
    var v2 = x2[k1]; // special case: `@container` can be in any order

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

/***/ "./lib/documentLoaders/node.js":
/*!*************************************!*\
  !*** ./lib/documentLoaders/node.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

var _require = __webpack_require__(/*! ../util */ "./lib/util.js"),
    parseLinkHeader = _require.parseLinkHeader,
    buildHeaders = _require.buildHeaders;

var _require2 = __webpack_require__(/*! ../constants */ "./lib/constants.js"),
    LINK_HEADER_CONTEXT = _require2.LINK_HEADER_CONTEXT;

var JsonLdError = __webpack_require__(/*! ../JsonLdError */ "./lib/JsonLdError.js");

var RequestQueue = __webpack_require__(/*! ../RequestQueue */ "./lib/RequestQueue.js");

var _require3 = __webpack_require__(/*! ../url */ "./lib/url.js"),
    prependBase = _require3.prependBase;
/**
 * Creates a built-in node document loader.
 *
 * @param options the options to use:
 *          secure: require all URLs to use HTTPS.
 *          strictSSL: true to require SSL certificates to be valid,
 *            false not to (default: true).
 *          maxRedirects: the maximum number of redirects to permit, none by
 *            default.
 *          request: the object which will make the request, default is
 *            provided by `https://www.npmjs.com/package/request`.
 *          headers: an object (map) of headers which will be passed as request
 *            headers for the requested document. Accept is not allowed.
 *
 * @return the node document loader.
 */


module.exports = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    strictSSL: true,
    maxRedirects: -1,
    headers: {}
  },
      secure = _ref.secure,
      _ref$strictSSL = _ref.strictSSL,
      strictSSL = _ref$strictSSL === void 0 ? true : _ref$strictSSL,
      _ref$maxRedirects = _ref.maxRedirects,
      maxRedirects = _ref$maxRedirects === void 0 ? -1 : _ref$maxRedirects,
      request = _ref.request,
      _ref$headers = _ref.headers,
      headers = _ref$headers === void 0 ? {} : _ref$headers;

  headers = buildHeaders(headers); // TODO: use `axios`

  request = request || __webpack_require__(/*! request */ 3);

  var http = __webpack_require__(/*! http */ 4);

  var queue = new RequestQueue();
  return queue.wrapLoader(function (url) {
    return loadDocument(url, []);
  });

  function loadDocument(_x, _x2) {
    return _loadDocument.apply(this, arguments);
  }

  function _loadDocument() {
    _loadDocument = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(url, redirects) {
      var doc, result, alternate, _result, res, body, statusText, linkHeaders, linkedContext;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(url.indexOf('http:') !== 0 && url.indexOf('https:') !== 0)) {
                _context.next = 2;
                break;
              }

              throw new JsonLdError('URL could not be dereferenced; only "http" and "https" URLs are ' + 'supported.', 'jsonld.InvalidUrl', {
                code: 'loading document failed',
                url: url
              });

            case 2:
              if (!(secure && url.indexOf('https') !== 0)) {
                _context.next = 4;
                break;
              }

              throw new JsonLdError('URL could not be dereferenced; secure mode is enabled and ' + 'the URL\'s scheme is not "https".', 'jsonld.InvalidUrl', {
                code: 'loading document failed',
                url: url
              });

            case 4:
              // TODO: disable cache until HTTP caching implemented
              doc = null; //cache.get(url);

              if (!(doc !== null)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", doc);

            case 7:
              alternate = null;
              _context.prev = 8;
              _context.next = 11;
              return _request(request, {
                url: url,
                headers: headers,
                strictSSL: strictSSL,
                followRedirect: false
              });

            case 11:
              result = _context.sent;
              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](8);
              throw new JsonLdError('URL could not be dereferenced, an error occurred.', 'jsonld.LoadDocumentError', {
                code: 'loading document failed',
                url: url,
                cause: _context.t0
              });

            case 17:
              _result = result, res = _result.res, body = _result.body;
              doc = {
                contextUrl: null,
                documentUrl: url,
                document: body || null
              }; // handle error

              statusText = http.STATUS_CODES[res.statusCode];

              if (!(res.statusCode >= 400)) {
                _context.next = 22;
                break;
              }

              throw new JsonLdError("URL \"".concat(url, "\" could not be dereferenced: ").concat(statusText), 'jsonld.InvalidUrl', {
                code: 'loading document failed',
                url: url,
                httpStatusCode: res.statusCode
              });

            case 22:
              if (!(res.headers.link && res.headers['content-type'] !== 'application/ld+json')) {
                _context.next = 30;
                break;
              }

              // only 1 related link header permitted
              linkHeaders = parseLinkHeader(res.headers.link);
              linkedContext = linkHeaders[LINK_HEADER_CONTEXT];

              if (!Array.isArray(linkedContext)) {
                _context.next = 27;
                break;
              }

              throw new JsonLdError('URL could not be dereferenced, it has more than one associated ' + 'HTTP Link Header.', 'jsonld.InvalidUrl', {
                code: 'multiple context link headers',
                url: url
              });

            case 27:
              if (linkedContext) {
                doc.contextUrl = linkedContext.target;
              } // "alternate" link header is a redirect


              alternate = linkHeaders['alternate'];

              if (alternate && alternate.type == 'application/ld+json' && !(res.headers['content-type'] || '').match(/^application\/(\w*\+)?json$/)) {
                res.headers.location = prependBase(url, alternate.target);
              }

            case 30:
              if (!((alternate || res.statusCode >= 300 && res.statusCode < 400) && res.headers.location)) {
                _context.next = 37;
                break;
              }

              if (!(redirects.length === maxRedirects)) {
                _context.next = 33;
                break;
              }

              throw new JsonLdError('URL could not be dereferenced; there were too many redirects.', 'jsonld.TooManyRedirects', {
                code: 'loading document failed',
                url: url,
                httpStatusCode: res.statusCode,
                redirects: redirects
              });

            case 33:
              if (!(redirects.indexOf(url) !== -1)) {
                _context.next = 35;
                break;
              }

              throw new JsonLdError('URL could not be dereferenced; infinite redirection was detected.', 'jsonld.InfiniteRedirectDetected', {
                code: 'recursive context inclusion',
                url: url,
                httpStatusCode: res.statusCode,
                redirects: redirects
              });

            case 35:
              redirects.push(url);
              return _context.abrupt("return", loadDocument(res.headers.location, redirects));

            case 37:
              // cache for each redirected URL
              redirects.push(url); // TODO: disable cache until HTTP caching implemented

              /*
              for(let i = 0; i < redirects.length; ++i) {
                cache.set(
                  redirects[i],
                  {contextUrl: null, documentUrl: redirects[i], document: body});
              }
              */

              return _context.abrupt("return", doc);

            case 39:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[8, 14]]);
    }));
    return _loadDocument.apply(this, arguments);
  }
};

function _request(request, options) {
  return new Promise(function (resolve, reject) {
    request(options, function (err, res, body) {
      if (err) {
        reject(err);
      } else {
        resolve({
          res: res,
          body: body
        });
      }
    });
  });
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


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

var _require = __webpack_require__(/*! ../util */ "./lib/util.js"),
    parseLinkHeader = _require.parseLinkHeader,
    buildHeaders = _require.buildHeaders;

var _require2 = __webpack_require__(/*! ../constants */ "./lib/constants.js"),
    LINK_HEADER_CONTEXT = _require2.LINK_HEADER_CONTEXT;

var JsonLdError = __webpack_require__(/*! ../JsonLdError */ "./lib/JsonLdError.js");

var RequestQueue = __webpack_require__(/*! ../RequestQueue */ "./lib/RequestQueue.js");

var _require3 = __webpack_require__(/*! ../url */ "./lib/url.js"),
    prependBase = _require3.prependBase;

var REGEX_LINK_HEADER = /(^|(\r\n))link:/i;
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

module.exports = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    headers: {}
  },
      secure = _ref.secure,
      _ref$headers = _ref.headers,
      headers = _ref$headers === void 0 ? {} : _ref$headers,
      xhr = _ref.xhr;

  headers = buildHeaders(headers);
  var queue = new RequestQueue();
  return queue.wrapLoader(loader);

  function loader(_x) {
    return _loader.apply(this, arguments);
  }

  function _loader() {
    _loader = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(url) {
      var req, doc, alternate, contentType, linkHeader, linkHeaders, linkedContext;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(url.indexOf('http:') !== 0 && url.indexOf('https:') !== 0)) {
                _context.next = 2;
                break;
              }

              throw new JsonLdError('URL could not be dereferenced; only "http" and "https" URLs are ' + 'supported.', 'jsonld.InvalidUrl', {
                code: 'loading document failed',
                url: url
              });

            case 2:
              if (!(secure && url.indexOf('https') !== 0)) {
                _context.next = 4;
                break;
              }

              throw new JsonLdError('URL could not be dereferenced; secure mode is enabled and ' + 'the URL\'s scheme is not "https".', 'jsonld.InvalidUrl', {
                code: 'loading document failed',
                url: url
              });

            case 4:
              _context.prev = 4;
              _context.next = 7;
              return _get(xhr, url, headers);

            case 7:
              req = _context.sent;
              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](4);
              throw new JsonLdError('URL could not be dereferenced, an error occurred.', 'jsonld.LoadDocumentError', {
                code: 'loading document failed',
                url: url,
                cause: _context.t0
              });

            case 13:
              if (!(req.status >= 400)) {
                _context.next = 15;
                break;
              }

              throw new JsonLdError('URL could not be dereferenced: ' + req.statusText, 'jsonld.LoadDocumentError', {
                code: 'loading document failed',
                url: url,
                httpStatusCode: req.status
              });

            case 15:
              doc = {
                contextUrl: null,
                documentUrl: url,
                document: req.response
              };
              alternate = null; // handle Link Header (avoid unsafe header warning by existence testing)

              contentType = req.getResponseHeader('Content-Type');

              if (REGEX_LINK_HEADER.test(req.getAllResponseHeaders())) {
                linkHeader = req.getResponseHeader('Link');
              }

              if (!(linkHeader && contentType !== 'application/ld+json')) {
                _context.next = 30;
                break;
              }

              // only 1 related link header permitted
              linkHeaders = parseLinkHeader(linkHeader);
              linkedContext = linkHeaders[LINK_HEADER_CONTEXT];

              if (!Array.isArray(linkedContext)) {
                _context.next = 24;
                break;
              }

              throw new JsonLdError('URL could not be dereferenced, it has more than one ' + 'associated HTTP Link Header.', 'jsonld.InvalidUrl', {
                code: 'multiple context link headers',
                url: url
              });

            case 24:
              if (linkedContext) {
                doc.contextUrl = linkedContext.target;
              } // "alternate" link header is a redirect


              alternate = linkHeaders['alternate'];

              if (!(alternate && alternate.type == 'application/ld+json' && !(contentType || '').match(/^application\/(\w*\+)?json$/))) {
                _context.next = 30;
                break;
              }

              _context.next = 29;
              return loader(prependBase(url, alternate.target));

            case 29:
              doc = _context.sent;

            case 30:
              return _context.abrupt("return", doc);

            case 31:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 10]]);
    }));
    return _loader.apply(this, arguments);
  }
};

function _get(xhr, url, headers) {
  xhr = xhr || XMLHttpRequest;
  var req = new xhr();
  return new Promise(function (resolve, reject) {
    req.onload = function () {
      return resolve(req);
    };

    req.onerror = function (err) {
      return reject(err);
    };

    req.open('GET', url, true);

    for (var k in headers) {
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


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js"));

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var JsonLdError = __webpack_require__(/*! ./JsonLdError */ "./lib/JsonLdError.js");

var _require = __webpack_require__(/*! ./types */ "./lib/types.js"),
    _isArray = _require.isArray,
    _isObject = _require.isObject,
    _isEmptyObject = _require.isEmptyObject,
    _isString = _require.isString,
    _isUndefined = _require.isUndefined;

var _require2 = __webpack_require__(/*! ./graphTypes */ "./lib/graphTypes.js"),
    _isList = _require2.isList,
    _isValue = _require2.isValue,
    _isGraph = _require2.isGraph,
    _isSubject = _require2.isSubject;

var _require3 = __webpack_require__(/*! ./context */ "./lib/context.js"),
    _expandIri = _require3.expandIri,
    _getContextValue = _require3.getContextValue,
    _isKeyword = _require3.isKeyword,
    _processContext = _require3.process,
    _processingMode = _require3.processingMode;

var _require4 = __webpack_require__(/*! ./url */ "./lib/url.js"),
    _isAbsoluteIri = _require4.isAbsolute;

var _require5 = __webpack_require__(/*! ./util */ "./lib/util.js"),
    _addValue = _require5.addValue,
    _asArray = _require5.asArray,
    _getValues = _require5.getValues,
    _validateTypeValue = _require5.validateTypeValue;

var api = {};
module.exports = api;
var REGEX_BCP47 = /^[a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*$/;
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

api.expand = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var activeCtx, _ref$activeProperty, activeProperty, element, _ref$options, options, _ref$insideList, insideList, _ref$insideIndex, insideIndex, _ref$typeScopedContex, typeScopedContext, _ref$expansionMap, expansionMap, mapped, _rval, container, i, e, expandedActiveProperty, propertyScopedCtx, keys, mustRevert, _iterator, _step, key, expandedProperty, typeKey, _iterator2, _step2, _key, _expandedProperty, value, _types, _iterator3, _step3, type, ctx, rval, count, validCount, values, types, _mapped, _mapped2, _mapped3;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            activeCtx = _ref.activeCtx, _ref$activeProperty = _ref.activeProperty, activeProperty = _ref$activeProperty === void 0 ? null : _ref$activeProperty, element = _ref.element, _ref$options = _ref.options, options = _ref$options === void 0 ? {} : _ref$options, _ref$insideList = _ref.insideList, insideList = _ref$insideList === void 0 ? false : _ref$insideList, _ref$insideIndex = _ref.insideIndex, insideIndex = _ref$insideIndex === void 0 ? false : _ref$insideIndex, _ref$typeScopedContex = _ref.typeScopedContext, typeScopedContext = _ref$typeScopedContex === void 0 ? null : _ref$typeScopedContex, _ref$expansionMap = _ref.expansionMap, expansionMap = _ref$expansionMap === void 0 ? function () {
              return undefined;
            } : _ref$expansionMap;

            if (!(element === null || element === undefined)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", null);

          case 3:
            // disable framing if activeProperty is @default
            if (activeProperty === '@default') {
              options = Object.assign({}, options, {
                isFrame: false
              });
            }

            if (!(!_isArray(element) && !_isObject(element))) {
              _context.next = 13;
              break;
            }

            if (!(!insideList && (activeProperty === null || _expandIri(activeCtx, activeProperty, {
              vocab: true
            }, options) === '@graph'))) {
              _context.next = 12;
              break;
            }

            _context.next = 8;
            return expansionMap({
              unmappedValue: element,
              activeCtx: activeCtx,
              activeProperty: activeProperty,
              options: options,
              insideList: insideList
            });

          case 8:
            mapped = _context.sent;

            if (!(mapped === undefined)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", null);

          case 11:
            return _context.abrupt("return", mapped);

          case 12:
            return _context.abrupt("return", _expandValue({
              activeCtx: activeCtx,
              activeProperty: activeProperty,
              value: element,
              options: options
            }));

          case 13:
            if (!_isArray(element)) {
              _context.next = 34;
              break;
            }

            _rval = [];
            container = _getContextValue(activeCtx, activeProperty, '@container') || [];
            insideList = insideList || container.includes('@list');
            i = 0;

          case 18:
            if (!(i < element.length)) {
              _context.next = 33;
              break;
            }

            _context.next = 21;
            return api.expand({
              activeCtx: activeCtx,
              activeProperty: activeProperty,
              element: element[i],
              options: options,
              expansionMap: expansionMap,
              insideIndex: insideIndex,
              typeScopedContext: typeScopedContext
            });

          case 21:
            e = _context.sent;

            if (insideList && _isArray(e)) {
              e = {
                '@list': e
              };
            }

            if (!(e === null)) {
              _context.next = 29;
              break;
            }

            _context.next = 26;
            return expansionMap({
              unmappedValue: element[i],
              activeCtx: activeCtx,
              activeProperty: activeProperty,
              parent: element,
              index: i,
              options: options,
              expandedParent: _rval,
              insideList: insideList
            });

          case 26:
            e = _context.sent;

            if (!(e === undefined)) {
              _context.next = 29;
              break;
            }

            return _context.abrupt("continue", 30);

          case 29:
            if (_isArray(e)) {
              _rval = _rval.concat(e);
            } else {
              _rval.push(e);
            }

          case 30:
            ++i;
            _context.next = 18;
            break;

          case 33:
            return _context.abrupt("return", _rval);

          case 34:
            // recursively expand object:
            // first, expand the active property
            expandedActiveProperty = _expandIri(activeCtx, activeProperty, {
              vocab: true
            }, options); // Get any property-scoped context for activeProperty

            propertyScopedCtx = _getContextValue(activeCtx, activeProperty, '@context'); // second, determine if any type-scoped context should be reverted; it
            // should only be reverted when the following are all true:
            // 1. `element` is not a value or subject reference
            // 2. `insideIndex` is false

            typeScopedContext = typeScopedContext || (activeCtx.previousContext ? activeCtx : null);
            keys = Object.keys(element).sort();
            mustRevert = !insideIndex;

            if (!(mustRevert && typeScopedContext && keys.length <= 2 && !keys.includes('@context'))) {
              _context.next = 63;
              break;
            }

            _iterator = _createForOfIteratorHelper(keys);
            _context.prev = 41;

            _iterator.s();

          case 43:
            if ((_step = _iterator.n()).done) {
              _context.next = 55;
              break;
            }

            key = _step.value;
            expandedProperty = _expandIri(typeScopedContext, key, {
              vocab: true
            }, options);

            if (!(expandedProperty === '@value')) {
              _context.next = 50;
              break;
            }

            // value found, ensure type-scoped context is used to expand it
            mustRevert = false;
            activeCtx = typeScopedContext;
            return _context.abrupt("break", 55);

          case 50:
            if (!(expandedProperty === '@id' && keys.length === 1)) {
              _context.next = 53;
              break;
            }

            // subject reference found, do not revert
            mustRevert = false;
            return _context.abrupt("break", 55);

          case 53:
            _context.next = 43;
            break;

          case 55:
            _context.next = 60;
            break;

          case 57:
            _context.prev = 57;
            _context.t0 = _context["catch"](41);

            _iterator.e(_context.t0);

          case 60:
            _context.prev = 60;

            _iterator.f();

            return _context.finish(60);

          case 63:
            if (mustRevert) {
              // revert type scoped context
              activeCtx = activeCtx.revertToPreviousContext();
            } // apply property-scoped context after reverting term-scoped context


            if (_isUndefined(propertyScopedCtx)) {
              _context.next = 68;
              break;
            }

            _context.next = 67;
            return _processContext({
              activeCtx: activeCtx,
              localCtx: propertyScopedCtx,
              propagate: true,
              overrideProtected: true,
              options: options
            });

          case 67:
            activeCtx = _context.sent;

          case 68:
            if (!('@context' in element)) {
              _context.next = 72;
              break;
            }

            _context.next = 71;
            return _processContext({
              activeCtx: activeCtx,
              localCtx: element['@context'],
              options: options
            });

          case 71:
            activeCtx = _context.sent;

          case 72:
            // set the type-scoped context to the context on input, for use later
            typeScopedContext = activeCtx; // Remember the first key found expanding to @type

            typeKey = null; // look for scoped contexts on `@type`

            _iterator2 = _createForOfIteratorHelper(keys);
            _context.prev = 75;

            _iterator2.s();

          case 77:
            if ((_step2 = _iterator2.n()).done) {
              _context.next = 106;
              break;
            }

            _key = _step2.value;
            _expandedProperty = _expandIri(activeCtx, _key, {
              vocab: true
            }, options);

            if (!(_expandedProperty === '@type')) {
              _context.next = 104;
              break;
            }

            // set scoped contexts from @type
            // avoid sorting if possible
            typeKey = typeKey || _key;
            value = element[_key];
            _types = Array.isArray(value) ? value.length > 1 ? value.slice().sort() : value : [value];
            _iterator3 = _createForOfIteratorHelper(_types);
            _context.prev = 85;

            _iterator3.s();

          case 87:
            if ((_step3 = _iterator3.n()).done) {
              _context.next = 96;
              break;
            }

            type = _step3.value;
            ctx = _getContextValue(typeScopedContext, type, '@context');

            if (_isUndefined(ctx)) {
              _context.next = 94;
              break;
            }

            _context.next = 93;
            return _processContext({
              activeCtx: activeCtx,
              localCtx: ctx,
              options: options,
              propagate: false
            });

          case 93:
            activeCtx = _context.sent;

          case 94:
            _context.next = 87;
            break;

          case 96:
            _context.next = 101;
            break;

          case 98:
            _context.prev = 98;
            _context.t1 = _context["catch"](85);

            _iterator3.e(_context.t1);

          case 101:
            _context.prev = 101;

            _iterator3.f();

            return _context.finish(101);

          case 104:
            _context.next = 77;
            break;

          case 106:
            _context.next = 111;
            break;

          case 108:
            _context.prev = 108;
            _context.t2 = _context["catch"](75);

            _iterator2.e(_context.t2);

          case 111:
            _context.prev = 111;

            _iterator2.f();

            return _context.finish(111);

          case 114:
            // process each key and value in element, ignoring @nest content
            rval = {};
            _context.next = 117;
            return _expandObject({
              activeCtx: activeCtx,
              activeProperty: activeProperty,
              expandedActiveProperty: expandedActiveProperty,
              element: element,
              expandedParent: rval,
              options: options,
              insideList: insideList,
              typeKey: typeKey,
              typeScopedContext: typeScopedContext,
              expansionMap: expansionMap
            });

          case 117:
            // get property count on expanded output
            keys = Object.keys(rval);
            count = keys.length;

            if (!('@value' in rval)) {
              _context.next = 149;
              break;
            }

            if (!('@type' in rval && ('@language' in rval || '@direction' in rval))) {
              _context.next = 122;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; an element containing "@value" may not ' + 'contain both "@type" and either "@language" or "@direction".', 'jsonld.SyntaxError', {
              code: 'invalid value object',
              element: rval
            });

          case 122:
            validCount = count - 1;

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

            if (!(validCount !== 0)) {
              _context.next = 129;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; an element containing "@value" may only ' + 'have an "@index" property and either "@type" ' + 'or either or both "@language" or "@direction".', 'jsonld.SyntaxError', {
              code: 'invalid value object',
              element: rval
            });

          case 129:
            values = rval['@value'] === null ? [] : _asArray(rval['@value']);
            types = _getValues(rval, '@type'); // drop null @values unless custom mapped

            if (!(_processingMode(activeCtx, 1.1) && types.includes('@json') && types.length === 1)) {
              _context.next = 134;
              break;
            }

            _context.next = 147;
            break;

          case 134:
            if (!(values.length === 0)) {
              _context.next = 141;
              break;
            }

            _context.next = 137;
            return expansionMap({
              unmappedValue: rval,
              activeCtx: activeCtx,
              activeProperty: activeProperty,
              element: element,
              options: options,
              insideList: insideList
            });

          case 137:
            _mapped = _context.sent;

            if (_mapped !== undefined) {
              rval = _mapped;
            } else {
              rval = null;
            }

            _context.next = 147;
            break;

          case 141:
            if (!(!values.every(function (v) {
              return _isString(v) || _isEmptyObject(v);
            }) && '@language' in rval)) {
              _context.next = 145;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; only strings may be language-tagged.', 'jsonld.SyntaxError', {
              code: 'invalid language-tagged value',
              element: rval
            });

          case 145:
            if (types.every(function (t) {
              return _isAbsoluteIri(t) && !(_isString(t) && t.indexOf('_:') === 0) || _isEmptyObject(t);
            })) {
              _context.next = 147;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; an element containing "@value" and "@type" ' + 'must have an absolute IRI for the value of "@type".', 'jsonld.SyntaxError', {
              code: 'invalid typed value',
              element: rval
            });

          case 147:
            _context.next = 164;
            break;

          case 149:
            if (!('@type' in rval && !_isArray(rval['@type']))) {
              _context.next = 153;
              break;
            }

            // convert @type to an array
            rval['@type'] = [rval['@type']];
            _context.next = 164;
            break;

          case 153:
            if (!('@set' in rval || '@list' in rval)) {
              _context.next = 159;
              break;
            }

            if (!(count > 1 && !(count === 2 && '@index' in rval))) {
              _context.next = 156;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; if an element has the property "@set" ' + 'or "@list", then it can have at most one other property that is ' + '"@index".', 'jsonld.SyntaxError', {
              code: 'invalid set or list object',
              element: rval
            });

          case 156:
            // optimize away @set
            if ('@set' in rval) {
              rval = rval['@set'];
              keys = Object.keys(rval);
              count = keys.length;
            }

            _context.next = 164;
            break;

          case 159:
            if (!(count === 1 && '@language' in rval)) {
              _context.next = 164;
              break;
            }

            _context.next = 162;
            return expansionMap(rval, {
              unmappedValue: rval,
              activeCtx: activeCtx,
              activeProperty: activeProperty,
              element: element,
              options: options,
              insideList: insideList
            });

          case 162:
            _mapped2 = _context.sent;

            if (_mapped2 !== undefined) {
              rval = _mapped2;
            } else {
              rval = null;
            }

          case 164:
            if (!(_isObject(rval) && !options.keepFreeFloatingNodes && !insideList && (activeProperty === null || expandedActiveProperty === '@graph'))) {
              _context.next = 170;
              break;
            }

            if (!(count === 0 || '@value' in rval || '@list' in rval || count === 1 && '@id' in rval)) {
              _context.next = 170;
              break;
            }

            _context.next = 168;
            return expansionMap({
              unmappedValue: rval,
              activeCtx: activeCtx,
              activeProperty: activeProperty,
              element: element,
              options: options,
              insideList: insideList
            });

          case 168:
            _mapped3 = _context.sent;

            if (_mapped3 !== undefined) {
              rval = _mapped3;
            } else {
              rval = null;
            }

          case 170:
            return _context.abrupt("return", rval);

          case 171:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[41, 57, 60, 63], [75, 108, 111, 114], [85, 98, 101, 104]]);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();
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


function _expandObject(_x2) {
  return _expandObject2.apply(this, arguments);
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


function _expandObject2() {
  _expandObject2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref3) {
    var activeCtx, activeProperty, expandedActiveProperty, element, expandedParent, _ref3$options, options, insideList, typeKey, typeScopedContext, expansionMap, keys, nests, unexpandedValue, isJsonType, _iterator6, _step6, _key2, value, expandedValue, expandedProperty, includedResult, _iterator8, _step8, lang, _iterator9, _step9, dir, property, reverseMap, _property, items, ii, item, termCtx, ctx, container, direction, asGraph, indexKey, propertyIndex, _asGraph, isList, nextActiveProperty, _reverseMap, _ii, _item, _i, _nests, key, nestedValues, _iterator7, _step7, nv;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            activeCtx = _ref3.activeCtx, activeProperty = _ref3.activeProperty, expandedActiveProperty = _ref3.expandedActiveProperty, element = _ref3.element, expandedParent = _ref3.expandedParent, _ref3$options = _ref3.options, options = _ref3$options === void 0 ? {} : _ref3$options, insideList = _ref3.insideList, typeKey = _ref3.typeKey, typeScopedContext = _ref3.typeScopedContext, expansionMap = _ref3.expansionMap;
            keys = Object.keys(element).sort();
            nests = [];
            // Figure out if this is the type for a JSON literal
            isJsonType = element[typeKey] && _expandIri(activeCtx, _isArray(element[typeKey]) ? element[typeKey][0] : element[typeKey], {
              vocab: true
            }, options) === '@json';
            _iterator6 = _createForOfIteratorHelper(keys);
            _context2.prev = 5;

            _iterator6.s();

          case 7:
            if ((_step6 = _iterator6.n()).done) {
              _context2.next = 202;
              break;
            }

            _key2 = _step6.value;
            value = element[_key2];
            expandedValue = void 0; // skip @context

            if (!(_key2 === '@context')) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("continue", 200);

          case 13:
            // expand property
            expandedProperty = _expandIri(activeCtx, _key2, {
              vocab: true
            }, options); // drop non-absolute IRI keys that aren't keywords unless custom mapped

            if (!(expandedProperty === null || !(_isAbsoluteIri(expandedProperty) || _isKeyword(expandedProperty)))) {
              _context2.next = 18;
              break;
            }

            // TODO: use `await` to support async
            expandedProperty = expansionMap({
              unmappedProperty: _key2,
              activeCtx: activeCtx,
              activeProperty: activeProperty,
              parent: element,
              options: options,
              insideList: insideList,
              value: value,
              expandedParent: expandedParent
            });

            if (!(expandedProperty === undefined)) {
              _context2.next = 18;
              break;
            }

            return _context2.abrupt("continue", 200);

          case 18:
            if (!_isKeyword(expandedProperty)) {
              _context2.next = 23;
              break;
            }

            if (!(expandedActiveProperty === '@reverse')) {
              _context2.next = 21;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; a keyword cannot be used as a @reverse ' + 'property.', 'jsonld.SyntaxError', {
              code: 'invalid reverse property map',
              value: value
            });

          case 21:
            if (!(expandedProperty in expandedParent && expandedProperty !== '@included' && expandedProperty !== '@type')) {
              _context2.next = 23;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; colliding keywords detected.', 'jsonld.SyntaxError', {
              code: 'colliding keywords',
              keyword: expandedProperty
            });

          case 23:
            if (!(expandedProperty === '@id')) {
              _context2.next = 40;
              break;
            }

            if (_isString(value)) {
              _context2.next = 38;
              break;
            }

            if (options.isFrame) {
              _context2.next = 27;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; "@id" value must a string.', 'jsonld.SyntaxError', {
              code: 'invalid @id value',
              value: value
            });

          case 27:
            if (!_isObject(value)) {
              _context2.next = 32;
              break;
            }

            if (_isEmptyObject(value)) {
              _context2.next = 30;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; "@id" value an empty object or array ' + 'of strings, if framing', 'jsonld.SyntaxError', {
              code: 'invalid @id value',
              value: value
            });

          case 30:
            _context2.next = 38;
            break;

          case 32:
            if (!_isArray(value)) {
              _context2.next = 37;
              break;
            }

            if (value.every(function (v) {
              return _isString(v);
            })) {
              _context2.next = 35;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; "@id" value an empty object or array ' + 'of strings, if framing', 'jsonld.SyntaxError', {
              code: 'invalid @id value',
              value: value
            });

          case 35:
            _context2.next = 38;
            break;

          case 37:
            throw new JsonLdError('Invalid JSON-LD syntax; "@id" value an empty object or array ' + 'of strings, if framing', 'jsonld.SyntaxError', {
              code: 'invalid @id value',
              value: value
            });

          case 38:
            _addValue(expandedParent, '@id', _asArray(value).map(function (v) {
              return _isString(v) ? _expandIri(activeCtx, v, {
                base: true
              }, options) : v;
            }), {
              propertyIsArray: options.isFrame
            });

            return _context2.abrupt("continue", 200);

          case 40:
            if (!(expandedProperty === '@type')) {
              _context2.next = 45;
              break;
            }

            // if framing, can be a default object, but need to expand
            // key to determine that
            if (_isObject(value)) {
              value = Object.fromEntries(Object.entries(value).map(function (_ref6) {
                var _ref7 = (0, _slicedToArray2["default"])(_ref6, 2),
                    k = _ref7[0],
                    v = _ref7[1];

                return [_expandIri(typeScopedContext, k, {
                  vocab: true
                }), _asArray(v).map(function (vv) {
                  return _expandIri(typeScopedContext, vv, {
                    base: true,
                    vocab: true
                  });
                })];
              }));
            }

            _validateTypeValue(value, options.isFrame);

            _addValue(expandedParent, '@type', _asArray(value).map(function (v) {
              return _isString(v) ? _expandIri(typeScopedContext, v, {
                base: true,
                vocab: true
              }, options) : v;
            }), {
              propertyIsArray: options.isFrame
            });

            return _context2.abrupt("continue", 200);

          case 45:
            if (!(expandedProperty === '@included' && _processingMode(activeCtx, 1.1))) {
              _context2.next = 55;
              break;
            }

            _context2.t0 = _asArray;
            _context2.next = 49;
            return api.expand({
              activeCtx: activeCtx,
              activeProperty: activeProperty,
              element: value,
              options: options,
              expansionMap: expansionMap
            });

          case 49:
            _context2.t1 = _context2.sent;
            includedResult = (0, _context2.t0)(_context2.t1);

            if (includedResult.every(function (v) {
              return _isSubject(v);
            })) {
              _context2.next = 53;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; ' + 'values of @included must expand to node objects.', 'jsonld.SyntaxError', {
              code: 'invalid @included value',
              value: value
            });

          case 53:
            _addValue(expandedParent, '@included', includedResult, {
              propertyIsArray: true
            });

            return _context2.abrupt("continue", 200);

          case 55:
            if (!(expandedProperty === '@graph' && !(_isObject(value) || _isArray(value)))) {
              _context2.next = 57;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; "@graph" value must not be an ' + 'object or an array.', 'jsonld.SyntaxError', {
              code: 'invalid @graph value',
              value: value
            });

          case 57:
            if (!(expandedProperty === '@value')) {
              _context2.next = 61;
              break;
            }

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

            return _context2.abrupt("continue", 200);

          case 61:
            if (!(expandedProperty === '@language')) {
              _context2.next = 71;
              break;
            }

            if (!(value === null)) {
              _context2.next = 64;
              break;
            }

            return _context2.abrupt("continue", 200);

          case 64:
            if (!(!_isString(value) && !options.isFrame)) {
              _context2.next = 66;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; "@language" value must be a string.', 'jsonld.SyntaxError', {
              code: 'invalid language-tagged string',
              value: value
            });

          case 66:
            // ensure language value is lowercase
            value = _asArray(value).map(function (v) {
              return _isString(v) ? v.toLowerCase() : v;
            }); // ensure language tag matches BCP47

            _iterator8 = _createForOfIteratorHelper(value);

            try {
              for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                lang = _step8.value;

                if (_isString(lang) && !lang.match(REGEX_BCP47)) {
                  console.warn("@language must be valid BCP47: ".concat(lang));
                }
              }
            } catch (err) {
              _iterator8.e(err);
            } finally {
              _iterator8.f();
            }

            _addValue(expandedParent, '@language', value, {
              propertyIsArray: options.isFrame
            });

            return _context2.abrupt("continue", 200);

          case 71:
            if (!(expandedProperty === '@direction')) {
              _context2.next = 94;
              break;
            }

            if (!(!_isString(value) && !options.isFrame)) {
              _context2.next = 74;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; "@direction" value must be a string.', 'jsonld.SyntaxError', {
              code: 'invalid base direction',
              value: value
            });

          case 74:
            value = _asArray(value); // ensure direction is "ltr" or "rtl"

            _iterator9 = _createForOfIteratorHelper(value);
            _context2.prev = 76;

            _iterator9.s();

          case 78:
            if ((_step9 = _iterator9.n()).done) {
              _context2.next = 84;
              break;
            }

            dir = _step9.value;

            if (!(_isString(dir) && dir !== 'ltr' && dir !== 'rtl')) {
              _context2.next = 82;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; "@direction" must be "ltr" or "rtl".', 'jsonld.SyntaxError', {
              code: 'invalid base direction',
              value: value
            });

          case 82:
            _context2.next = 78;
            break;

          case 84:
            _context2.next = 89;
            break;

          case 86:
            _context2.prev = 86;
            _context2.t2 = _context2["catch"](76);

            _iterator9.e(_context2.t2);

          case 89:
            _context2.prev = 89;

            _iterator9.f();

            return _context2.finish(89);

          case 92:
            _addValue(expandedParent, '@direction', value, {
              propertyIsArray: options.isFrame
            });

            return _context2.abrupt("continue", 200);

          case 94:
            if (!(expandedProperty === '@index')) {
              _context2.next = 99;
              break;
            }

            if (_isString(value)) {
              _context2.next = 97;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; "@index" value must be a string.', 'jsonld.SyntaxError', {
              code: 'invalid @index value',
              value: value
            });

          case 97:
            _addValue(expandedParent, '@index', value);

            return _context2.abrupt("continue", 200);

          case 99:
            if (!(expandedProperty === '@reverse')) {
              _context2.next = 127;
              break;
            }

            if (_isObject(value)) {
              _context2.next = 102;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; "@reverse" value must be an object.', 'jsonld.SyntaxError', {
              code: 'invalid @reverse value',
              value: value
            });

          case 102:
            _context2.next = 104;
            return api.expand({
              activeCtx: activeCtx,
              activeProperty: '@reverse',
              element: value,
              options: options,
              expansionMap: expansionMap
            });

          case 104:
            expandedValue = _context2.sent;

            // properties double-reversed
            if ('@reverse' in expandedValue) {
              for (property in expandedValue['@reverse']) {
                _addValue(expandedParent, property, expandedValue['@reverse'][property], {
                  propertyIsArray: true
                });
              }
            } // FIXME: can this be merged with code below to simplify?
            // merge in all reversed properties


            reverseMap = expandedParent['@reverse'] || null;
            _context2.t3 = _regenerator["default"].keys(expandedValue);

          case 108:
            if ((_context2.t4 = _context2.t3()).done) {
              _context2.next = 126;
              break;
            }

            _property = _context2.t4.value;

            if (!(_property === '@reverse')) {
              _context2.next = 112;
              break;
            }

            return _context2.abrupt("continue", 108);

          case 112:
            if (reverseMap === null) {
              reverseMap = expandedParent['@reverse'] = {};
            }

            _addValue(reverseMap, _property, [], {
              propertyIsArray: true
            });

            items = expandedValue[_property];
            ii = 0;

          case 116:
            if (!(ii < items.length)) {
              _context2.next = 124;
              break;
            }

            item = items[ii];

            if (!(_isValue(item) || _isList(item))) {
              _context2.next = 120;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; "@reverse" value must not be a ' + '@value or an @list.', 'jsonld.SyntaxError', {
              code: 'invalid reverse property value',
              value: expandedValue
            });

          case 120:
            _addValue(reverseMap, _property, item, {
              propertyIsArray: true
            });

          case 121:
            ++ii;
            _context2.next = 116;
            break;

          case 124:
            _context2.next = 108;
            break;

          case 126:
            return _context2.abrupt("continue", 200);

          case 127:
            if (!(expandedProperty === '@nest')) {
              _context2.next = 130;
              break;
            }

            nests.push(_key2);
            return _context2.abrupt("continue", 200);

          case 130:
            // use potential scoped context for key
            termCtx = activeCtx;
            ctx = _getContextValue(activeCtx, _key2, '@context');

            if (_isUndefined(ctx)) {
              _context2.next = 136;
              break;
            }

            _context2.next = 135;
            return _processContext({
              activeCtx: activeCtx,
              localCtx: ctx,
              propagate: true,
              overrideProtected: true,
              options: options
            });

          case 135:
            termCtx = _context2.sent;

          case 136:
            container = _getContextValue(termCtx, _key2, '@container') || [];

            if (!(container.includes('@language') && _isObject(value))) {
              _context2.next = 142;
              break;
            }

            direction = _getContextValue(termCtx, _key2, '@direction'); // handle language map container (skip if value is not an object)

            expandedValue = _expandLanguageMap(termCtx, value, direction, options);
            _context2.next = 180;
            break;

          case 142:
            if (!(container.includes('@index') && _isObject(value))) {
              _context2.next = 151;
              break;
            }

            // handle index container (skip if value is not an object)
            asGraph = container.includes('@graph');
            indexKey = _getContextValue(termCtx, _key2, '@index') || '@index';
            propertyIndex = indexKey !== '@index' && _expandIri(activeCtx, indexKey, {
              vocab: true
            }, options);
            _context2.next = 148;
            return _expandIndexMap({
              activeCtx: termCtx,
              options: options,
              activeProperty: _key2,
              value: value,
              expansionMap: expansionMap,
              asGraph: asGraph,
              indexKey: indexKey,
              propertyIndex: propertyIndex
            });

          case 148:
            expandedValue = _context2.sent;
            _context2.next = 180;
            break;

          case 151:
            if (!(container.includes('@id') && _isObject(value))) {
              _context2.next = 158;
              break;
            }

            // handle id container (skip if value is not an object)
            _asGraph = container.includes('@graph');
            _context2.next = 155;
            return _expandIndexMap({
              activeCtx: termCtx,
              options: options,
              activeProperty: _key2,
              value: value,
              expansionMap: expansionMap,
              asGraph: _asGraph,
              indexKey: '@id'
            });

          case 155:
            expandedValue = _context2.sent;
            _context2.next = 180;
            break;

          case 158:
            if (!(container.includes('@type') && _isObject(value))) {
              _context2.next = 164;
              break;
            }

            _context2.next = 161;
            return _expandIndexMap({
              // since container is `@type`, revert type scoped context when expanding
              activeCtx: termCtx.revertToPreviousContext(),
              options: options,
              activeProperty: _key2,
              value: value,
              expansionMap: expansionMap,
              asGraph: false,
              indexKey: '@type'
            });

          case 161:
            expandedValue = _context2.sent;
            _context2.next = 180;
            break;

          case 164:
            // recurse into @list or @set
            isList = expandedProperty === '@list';

            if (!(isList || expandedProperty === '@set')) {
              _context2.next = 173;
              break;
            }

            nextActiveProperty = activeProperty;

            if (isList && expandedActiveProperty === '@graph') {
              nextActiveProperty = null;
            }

            _context2.next = 170;
            return api.expand({
              activeCtx: termCtx,
              activeProperty: nextActiveProperty,
              element: value,
              options: options,
              insideList: isList,
              expansionMap: expansionMap
            });

          case 170:
            expandedValue = _context2.sent;
            _context2.next = 180;
            break;

          case 173:
            if (!(_getContextValue(activeCtx, _key2, '@type') === '@json')) {
              _context2.next = 177;
              break;
            }

            expandedValue = {
              '@type': '@json',
              '@value': value
            };
            _context2.next = 180;
            break;

          case 177:
            _context2.next = 179;
            return api.expand({
              activeCtx: termCtx,
              activeProperty: _key2,
              element: value,
              options: options,
              insideList: false,
              expansionMap: expansionMap
            });

          case 179:
            expandedValue = _context2.sent;

          case 180:
            if (!(expandedValue === null && expandedProperty !== '@value')) {
              _context2.next = 184;
              break;
            }

            // TODO: use `await` to support async
            expandedValue = expansionMap({
              unmappedValue: value,
              expandedProperty: expandedProperty,
              activeCtx: termCtx,
              activeProperty: activeProperty,
              parent: element,
              options: options,
              insideList: insideList,
              key: _key2,
              expandedParent: expandedParent
            });

            if (!(expandedValue === undefined)) {
              _context2.next = 184;
              break;
            }

            return _context2.abrupt("continue", 200);

          case 184:
            // convert expanded value to @list if container specifies it
            if (expandedProperty !== '@list' && !_isList(expandedValue) && container.includes('@list')) {
              // ensure expanded value in @list is an array
              expandedValue = {
                '@list': _asArray(expandedValue)
              };
            } // convert expanded value to @graph if container specifies it
            // and value is not, itself, a graph
            // index cases handled above


            if (container.includes('@graph') && !container.some(function (key) {
              return key === '@id' || key === '@index';
            })) {
              // ensure expanded values are arrays
              expandedValue = _asArray(expandedValue).map(function (v) {
                return {
                  '@graph': _asArray(v)
                };
              });
            } // FIXME: can this be merged with code above to simplify?
            // merge in reverse properties


            if (!(termCtx.mappings.has(_key2) && termCtx.mappings.get(_key2).reverse)) {
              _context2.next = 199;
              break;
            }

            _reverseMap = expandedParent['@reverse'] = expandedParent['@reverse'] || {};
            expandedValue = _asArray(expandedValue);
            _ii = 0;

          case 190:
            if (!(_ii < expandedValue.length)) {
              _context2.next = 198;
              break;
            }

            _item = expandedValue[_ii];

            if (!(_isValue(_item) || _isList(_item))) {
              _context2.next = 194;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; "@reverse" value must not be a ' + '@value or an @list.', 'jsonld.SyntaxError', {
              code: 'invalid reverse property value',
              value: expandedValue
            });

          case 194:
            _addValue(_reverseMap, expandedProperty, _item, {
              propertyIsArray: true
            });

          case 195:
            ++_ii;
            _context2.next = 190;
            break;

          case 198:
            return _context2.abrupt("continue", 200);

          case 199:
            // add value for property
            // special keywords handled above
            _addValue(expandedParent, expandedProperty, expandedValue, {
              propertyIsArray: true
            });

          case 200:
            _context2.next = 7;
            break;

          case 202:
            _context2.next = 207;
            break;

          case 204:
            _context2.prev = 204;
            _context2.t5 = _context2["catch"](5);

            _iterator6.e(_context2.t5);

          case 207:
            _context2.prev = 207;

            _iterator6.f();

            return _context2.finish(207);

          case 210:
            if (!('@value' in expandedParent)) {
              _context2.next = 216;
              break;
            }

            if (!(expandedParent['@type'] === '@json' && _processingMode(activeCtx, 1.1))) {
              _context2.next = 214;
              break;
            }

            _context2.next = 216;
            break;

          case 214:
            if (!((_isObject(unexpandedValue) || _isArray(unexpandedValue)) && !options.isFrame)) {
              _context2.next = 216;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; "@value" value must not be an ' + 'object or an array.', 'jsonld.SyntaxError', {
              code: 'invalid value object value',
              value: unexpandedValue
            });

          case 216:
            _i = 0, _nests = nests;

          case 217:
            if (!(_i < _nests.length)) {
              _context2.next = 242;
              break;
            }

            key = _nests[_i];
            nestedValues = _isArray(element[key]) ? element[key] : [element[key]];
            _iterator7 = _createForOfIteratorHelper(nestedValues);
            _context2.prev = 221;

            _iterator7.s();

          case 223:
            if ((_step7 = _iterator7.n()).done) {
              _context2.next = 231;
              break;
            }

            nv = _step7.value;

            if (!(!_isObject(nv) || Object.keys(nv).some(function (k) {
              return _expandIri(activeCtx, k, {
                vocab: true
              }, options) === '@value';
            }))) {
              _context2.next = 227;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; nested value must be a node object.', 'jsonld.SyntaxError', {
              code: 'invalid @nest value',
              value: nv
            });

          case 227:
            _context2.next = 229;
            return _expandObject({
              activeCtx: activeCtx,
              activeProperty: activeProperty,
              expandedActiveProperty: expandedActiveProperty,
              element: nv,
              expandedParent: expandedParent,
              options: options,
              insideList: insideList,
              typeScopedContext: typeScopedContext,
              typeKey: typeKey,
              expansionMap: expansionMap
            });

          case 229:
            _context2.next = 223;
            break;

          case 231:
            _context2.next = 236;
            break;

          case 233:
            _context2.prev = 233;
            _context2.t6 = _context2["catch"](221);

            _iterator7.e(_context2.t6);

          case 236:
            _context2.prev = 236;

            _iterator7.f();

            return _context2.finish(236);

          case 239:
            _i++;
            _context2.next = 217;
            break;

          case 242:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 204, 207, 210], [76, 86, 89, 92], [221, 233, 236, 239]]);
  }));
  return _expandObject2.apply(this, arguments);
}

function _expandValue(_ref4) {
  var activeCtx = _ref4.activeCtx,
      activeProperty = _ref4.activeProperty,
      value = _ref4.value,
      options = _ref4.options;

  // nothing to expand
  if (value === null || value === undefined) {
    return null;
  } // special-case expand @id and @type (skips '@id' expansion)


  var expandedProperty = _expandIri(activeCtx, activeProperty, {
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


  var type = _getContextValue(activeCtx, activeProperty, '@type'); // do @id expansion (automatic for @graph)


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

  var rval = {};

  if (type && !['@id', '@vocab', '@none'].includes(type)) {
    // other type
    rval['@type'] = type;
  } else if (_isString(value)) {
    // check for language tagging for strings
    var language = _getContextValue(activeCtx, activeProperty, '@language');

    if (language !== null) {
      rval['@language'] = language;
    }

    var direction = _getContextValue(activeCtx, activeProperty, '@direction');

    if (direction !== null) {
      rval['@direction'] = direction;
    }
  } // do conversion of values that aren't basic JSON types to strings


  if (!['boolean', 'number', 'string'].includes((0, _typeof2["default"])(value))) {
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
  var rval = [];
  var keys = Object.keys(languageMap).sort();

  var _iterator4 = _createForOfIteratorHelper(keys),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var key = _step4.value;

      var expandedKey = _expandIri(activeCtx, key, {
        vocab: true
      }, options);

      var val = languageMap[key];

      if (!_isArray(val)) {
        val = [val];
      }

      var _iterator5 = _createForOfIteratorHelper(val),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var item = _step5.value;

          if (item === null) {
            // null values are allowed (8.5) but ignored (3.1)
            continue;
          }

          if (!_isString(item)) {
            throw new JsonLdError('Invalid JSON-LD syntax; language map values must be strings.', 'jsonld.SyntaxError', {
              code: 'invalid language map value',
              languageMap: languageMap
            });
          }

          var _val = {
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
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  return rval;
}

function _expandIndexMap(_x3) {
  return _expandIndexMap2.apply(this, arguments);
}

function _expandIndexMap2() {
  _expandIndexMap2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref5) {
    var activeCtx, options, activeProperty, value, expansionMap, asGraph, indexKey, propertyIndex, rval, keys, isTypeIndex, _iterator10, _step10, key, ctx, val, expandedKey, _iterator11, _step11, item;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            activeCtx = _ref5.activeCtx, options = _ref5.options, activeProperty = _ref5.activeProperty, value = _ref5.value, expansionMap = _ref5.expansionMap, asGraph = _ref5.asGraph, indexKey = _ref5.indexKey, propertyIndex = _ref5.propertyIndex;
            rval = [];
            keys = Object.keys(value).sort();
            isTypeIndex = indexKey === '@type';
            _iterator10 = _createForOfIteratorHelper(keys);
            _context3.prev = 5;

            _iterator10.s();

          case 7:
            if ((_step10 = _iterator10.n()).done) {
              _context3.next = 51;
              break;
            }

            key = _step10.value;

            if (!isTypeIndex) {
              _context3.next = 15;
              break;
            }

            ctx = _getContextValue(activeCtx, key, '@context');

            if (_isUndefined(ctx)) {
              _context3.next = 15;
              break;
            }

            _context3.next = 14;
            return _processContext({
              activeCtx: activeCtx,
              localCtx: ctx,
              propagate: false,
              options: options
            });

          case 14:
            activeCtx = _context3.sent;

          case 15:
            val = value[key];

            if (!_isArray(val)) {
              val = [val];
            }

            _context3.next = 19;
            return api.expand({
              activeCtx: activeCtx,
              activeProperty: activeProperty,
              element: val,
              options: options,
              insideList: false,
              insideIndex: true,
              expansionMap: expansionMap
            });

          case 19:
            val = _context3.sent;
            // expand for @type, but also for @none
            expandedKey = void 0;

            if (propertyIndex) {
              if (key === '@none') {
                expandedKey = '@none';
              } else {
                expandedKey = _expandValue({
                  activeCtx: activeCtx,
                  activeProperty: indexKey,
                  value: key,
                  options: options
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

            _iterator11 = _createForOfIteratorHelper(val);
            _context3.prev = 24;

            _iterator11.s();

          case 26:
            if ((_step11 = _iterator11.n()).done) {
              _context3.next = 41;
              break;
            }

            item = _step11.value;

            // If this is also a @graph container, turn items into graphs
            if (asGraph && !_isGraph(item)) {
              item = {
                '@graph': [item]
              };
            }

            if (!(indexKey === '@type')) {
              _context3.next = 33;
              break;
            }

            if (expandedKey === '@none') {// ignore @none
            } else if (item['@type']) {
              item['@type'] = [key].concat(item['@type']);
            } else {
              item['@type'] = [key];
            }

            _context3.next = 38;
            break;

          case 33:
            if (!(_isValue(item) && !['@language', '@type', '@index'].includes(indexKey))) {
              _context3.next = 37;
              break;
            }

            throw new JsonLdError('Invalid JSON-LD syntax; Attempt to add illegal key to value ' + "object: \"".concat(indexKey, "\"."), 'jsonld.SyntaxError', {
              code: 'invalid value object',
              value: item
            });

          case 37:
            if (propertyIndex) {
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

          case 38:
            rval.push(item);

          case 39:
            _context3.next = 26;
            break;

          case 41:
            _context3.next = 46;
            break;

          case 43:
            _context3.prev = 43;
            _context3.t0 = _context3["catch"](24);

            _iterator11.e(_context3.t0);

          case 46:
            _context3.prev = 46;

            _iterator11.f();

            return _context3.finish(46);

          case 49:
            _context3.next = 7;
            break;

          case 51:
            _context3.next = 56;
            break;

          case 53:
            _context3.prev = 53;
            _context3.t1 = _context3["catch"](5);

            _iterator10.e(_context3.t1);

          case 56:
            _context3.prev = 56;

            _iterator10.f();

            return _context3.finish(56);

          case 59:
            return _context3.abrupt("return", rval);

          case 60:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[5, 53, 56, 59], [24, 43, 46, 49]]);
  }));
  return _expandIndexMap2.apply(this, arguments);
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


var _require = __webpack_require__(/*! ./graphTypes */ "./lib/graphTypes.js"),
    _isSubjectReference = _require.isSubjectReference;

var _require2 = __webpack_require__(/*! ./nodeMap */ "./lib/nodeMap.js"),
    _createMergedNodeMap = _require2.createMergedNodeMap;

var api = {};
module.exports = api;
/**
 * Performs JSON-LD flattening.
 *
 * @param input the expanded JSON-LD to flatten.
 *
 * @return the flattened output.
 */

api.flatten = function (input) {
  var defaultGraph = _createMergedNodeMap(input); // produce flattened output


  var flattened = [];
  var keys = Object.keys(defaultGraph).sort();

  for (var ki = 0; ki < keys.length; ++ki) {
    var node = defaultGraph[keys[ki]]; // only add full subjects to top-level

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

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _require = __webpack_require__(/*! ./context */ "./lib/context.js"),
    isKeyword = _require.isKeyword;

var graphTypes = __webpack_require__(/*! ./graphTypes */ "./lib/graphTypes.js");

var types = __webpack_require__(/*! ./types */ "./lib/types.js");

var util = __webpack_require__(/*! ./util */ "./lib/util.js");

var url = __webpack_require__(/*! ./url */ "./lib/url.js");

var JsonLdError = __webpack_require__(/*! ./JsonLdError */ "./lib/JsonLdError.js");

var _require2 = __webpack_require__(/*! ./nodeMap */ "./lib/nodeMap.js"),
    _createNodeMap = _require2.createNodeMap,
    _mergeNodeMapGraphs = _require2.mergeNodeMapGraphs;

var api = {};
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

api.frameMergedOrDefault = function (input, frame, options) {
  // create framing state
  var state = {
    options: options,
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

  var issuer = new util.IdentifierIssuer('_:b');

  _createNodeMap(input, state.graphMap, '@default', issuer);

  if (options.merged) {
    state.graphMap['@merged'] = _mergeNodeMapGraphs(state.graphMap);
    state.graph = '@merged';
  }

  state.subjects = state.graphMap[state.graph]; // frame the subjects

  var framed = [];
  api.frame(state, Object.keys(state.subjects).sort(), frame, framed); // If pruning blank nodes, find those to prune

  if (options.pruneBlankNodeIdentifiers) {
    // remove all blank nodes appearing only once, done in compaction
    options.bnodesToClear = Object.keys(state.bnodeMap).filter(function (id) {
      return state.bnodeMap[id].length === 1;
    });
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


api.frame = function (state, subjects, frame, parent) {
  var property = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  // validate the frame
  _validateFrame(frame);

  frame = frame[0]; // get flags for current frame

  var options = state.options;
  var flags = {
    embed: _getFrameFlag(frame, options, 'embed'),
    explicit: _getFrameFlag(frame, options, 'explicit'),
    requireAll: _getFrameFlag(frame, options, 'requireAll')
  }; // get link for current graph

  if (!state.link.hasOwnProperty(state.graph)) {
    state.link[state.graph] = {};
  }

  var link = state.link[state.graph]; // filter out subjects that match the frame

  var matches = _filterSubjects(state, subjects, frame, flags); // add matches to output


  var ids = Object.keys(matches).sort();

  var _iterator = _createForOfIteratorHelper(ids),
      _step;

  try {
    var _loop = function _loop() {
      var id = _step.value;
      var subject = matches[id];
      /* Note: In order to treat each top-level match as a compartmentalized
      result, clear the unique embedded subjects map when the property is null,
      which only occurs at the top-level. */

      if (property === null) {
        state.uniqueEmbeds = (0, _defineProperty2["default"])({}, state.graph, {});
      } else {
        state.uniqueEmbeds[state.graph] = state.uniqueEmbeds[state.graph] || {};
      }

      if (flags.embed === '@link' && id in link) {
        // TODO: may want to also match an existing linked subject against
        // the current frame ... so different frames could produce different
        // subjects that are only shared in-memory when the frames are the same
        // add existing linked subject
        _addFrameOutput(parent, property, link[id]);

        return "continue";
      } // start output for subject


      var output = {
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
          frame: frame
        });
      }

      if (!state.embedded && state.uniqueEmbeds[state.graph].hasOwnProperty(id)) {
        // skip adding this node object to the top level, as it was
        // already included in another node object
        return "continue";
      } // if embed is @never or if a circular reference would be created by an
      // embed, the subject cannot be embedded, just add the reference;
      // note that a circular reference won't occur when the embed flag is
      // `@link` as the above check will short-circuit before reaching this point


      if (state.embedded && (flags.embed === '@never' || _createsCircularReference(subject, state.graph, state.subjectStack))) {
        _addFrameOutput(parent, property, output);

        return "continue";
      } // if only the first (or once) should be embedded


      if (state.embedded && (flags.embed == '@first' || flags.embed == '@once') && state.uniqueEmbeds[state.graph].hasOwnProperty(id)) {
        _addFrameOutput(parent, property, output);

        return "continue";
      } // if only the last match should be embedded


      if (flags.embed === '@last') {
        // remove any existing embed
        if (id in state.uniqueEmbeds[state.graph]) {
          _removeEmbed(state, id);
        }
      }

      state.uniqueEmbeds[state.graph][id] = {
        parent: parent,
        property: property
      }; // push matching subject onto stack to enable circular embed checks

      state.subjectStack.push({
        subject: subject,
        graph: state.graph
      }); // subject is also the name of a graph

      if (id in state.graphMap) {
        var recurse = false;
        var subframe = null;

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


      var _iterator2 = _createForOfIteratorHelper(Object.keys(subject).sort()),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var prop = _step2.value;

          // copy keywords to output
          if (isKeyword(prop)) {
            output[prop] = util.clone(subject[prop]);

            if (prop === '@type') {
              // count bnode values of @type
              var _iterator5 = _createForOfIteratorHelper(subject['@type']),
                  _step5;

              try {
                for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                  var type = _step5.value;

                  if (type.indexOf('_:') === 0) {
                    util.addValue(state.bnodeMap, type, output, {
                      propertyIsArray: true
                    });
                  }
                }
              } catch (err) {
                _iterator5.e(err);
              } finally {
                _iterator5.f();
              }
            }

            continue;
          } // explicit is on and property isn't in the frame, skip processing


          if (flags.explicit && !(prop in frame)) {
            continue;
          } // add objects


          var _iterator6 = _createForOfIteratorHelper(subject[prop]),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var o = _step6.value;

              var _subframe = prop in frame ? frame[prop] : _createImplicitFrame(flags); // recurse into list


              if (graphTypes.isList(o)) {
                var _subframe2 = frame[prop] && frame[prop][0] && frame[prop][0]['@list'] ? frame[prop][0]['@list'] : _createImplicitFrame(flags); // add empty list


                var list = {
                  '@list': []
                };

                _addFrameOutput(output, prop, list); // add list objects


                var src = o['@list'];

                var _iterator7 = _createForOfIteratorHelper(src),
                    _step7;

                try {
                  for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                    var oo = _step7.value;

                    if (graphTypes.isSubjectReference(oo)) {
                      // recurse into subject reference
                      api.frame(_objectSpread(_objectSpread({}, state), {}, {
                        embedded: true
                      }), [oo['@id']], _subframe2, list, '@list');
                    } else {
                      // include other values automatically
                      _addFrameOutput(list, '@list', util.clone(oo));
                    }
                  }
                } catch (err) {
                  _iterator7.e(err);
                } finally {
                  _iterator7.f();
                }
              } else if (graphTypes.isSubjectReference(o)) {
                // recurse into subject reference
                api.frame(_objectSpread(_objectSpread({}, state), {}, {
                  embedded: true
                }), [o['@id']], _subframe, output, prop);
              } else if (_valueMatch(_subframe[0], o)) {
                // include other values, if they match
                _addFrameOutput(output, prop, util.clone(o));
              }
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        } // handle defaults

      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var _iterator3 = _createForOfIteratorHelper(Object.keys(frame).sort()),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _prop = _step3.value;

          // skip keywords
          if (_prop === '@type') {
            if (!types.isObject(frame[_prop][0]) || !('@default' in frame[_prop][0])) {
              continue;
            } // allow through default types

          } else if (isKeyword(_prop)) {
            continue;
          } // if omit default is off, then include default values for properties
          // that appear in the next frame but are not in the matching subject


          var next = frame[_prop][0] || {};

          var omitDefaultOn = _getFrameFlag(next, options, 'omitDefault');

          if (!omitDefaultOn && !(_prop in output)) {
            var preserve = '@null';

            if ('@default' in next) {
              preserve = util.clone(next['@default']);
            }

            if (!types.isArray(preserve)) {
              preserve = [preserve];
            }

            output[_prop] = [{
              '@preserve': preserve
            }];
          }
        } // if embed reverse values by finding nodes having this subject as a value
        // of the associated property

      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      var _iterator4 = _createForOfIteratorHelper(Object.keys(frame['@reverse'] || {}).sort()),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var reverseProp = _step4.value;
          var _subframe3 = frame['@reverse'][reverseProp];

          for (var _i = 0, _Object$keys = Object.keys(state.subjects); _i < _Object$keys.length; _i++) {
            var _subject = _Object$keys[_i];
            var nodeValues = util.getValues(state.subjects[_subject], reverseProp);

            if (nodeValues.some(function (v) {
              return v['@id'] === id;
            })) {
              // node has property referencing this subject, recurse
              output['@reverse'] = output['@reverse'] || {};
              util.addValue(output['@reverse'], reverseProp, [], {
                propertyIsArray: true
              });
              api.frame(_objectSpread(_objectSpread({}, state), {}, {
                embedded: true
              }), [_subject], _subframe3, output['@reverse'][reverseProp], property);
            }
          }
        } // add output to parent

      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      _addFrameOutput(parent, property, output); // pop matching subject from circular ref-checking stack


      state.subjectStack.pop();
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _ret = _loop();

      if (_ret === "continue") continue;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
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


api.cleanupNull = function (input, options) {
  // recurse through arrays
  if (types.isArray(input)) {
    var noNulls = input.map(function (v) {
      return api.cleanupNull(v, options);
    });
    return noNulls.filter(function (v) {
      return v;
    }); // removes nulls from array
  }

  if (input === '@null') {
    return null;
  }

  if (types.isObject(input)) {
    // handle in-memory linked nodes
    if ('@id' in input) {
      var id = input['@id'];

      if (options.link.hasOwnProperty(id)) {
        var idx = options.link[id].indexOf(input);

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

    for (var key in input) {
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
  var frame = {};

  for (var key in flags) {
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
  for (var i = subjectStack.length - 1; i >= 0; --i) {
    var subject = subjectStack[i];

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
  var flag = '@' + name;
  var rval = flag in frame ? frame[flag][0] : options[name];

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
        frame: frame
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
      frame: frame
    });
  }

  if ('@id' in frame[0]) {
    var _iterator8 = _createForOfIteratorHelper(util.asArray(frame[0]['@id'])),
        _step8;

    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var id = _step8.value;

        // @id must be wildcard or an IRI
        if (!(types.isObject(id) || url.isAbsolute(id)) || types.isString(id) && id.indexOf('_:') === 0) {
          throw new JsonLdError('Invalid JSON-LD syntax; invalid @id in frame.', 'jsonld.SyntaxError', {
            code: 'invalid frame',
            frame: frame
          });
        }
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }
  }

  if ('@type' in frame[0]) {
    var _iterator9 = _createForOfIteratorHelper(util.asArray(frame[0]['@type'])),
        _step9;

    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
        var type = _step9.value;

        // @id must be wildcard or an IRI
        if (!(types.isObject(type) || url.isAbsolute(type)) || types.isString(type) && type.indexOf('_:') === 0) {
          throw new JsonLdError('Invalid JSON-LD syntax; invalid @type in frame.', 'jsonld.SyntaxError', {
            code: 'invalid frame',
            frame: frame
          });
        }
      }
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
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
  var rval = {};

  var _iterator10 = _createForOfIteratorHelper(subjects),
      _step10;

  try {
    for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
      var id = _step10.value;
      var subject = state.graphMap[state.graph][id];

      if (_filterSubject(state, subject, frame, flags)) {
        rval[id] = subject;
      }
    }
  } catch (err) {
    _iterator10.e(err);
  } finally {
    _iterator10.f();
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
  var wildcard = true;
  var matchesSome = false;

  for (var key in frame) {
    var matchThis = false;
    var nodeValues = util.getValues(subject, key);
    var isEmpty = util.getValues(frame, key).length === 0;

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
        var _iterator11 = _createForOfIteratorHelper(frame['@type']),
            _step11;

        try {
          var _loop2 = function _loop2() {
            var type = _step11.value;

            if (types.isObject(type) && '@default' in type) {
              // match on default object
              matchThis = true;
            } else {
              matchThis = matchThis || nodeValues.some(function (tt) {
                return tt === type;
              });
            }
          };

          for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
            _loop2();
          }
        } catch (err) {
          _iterator11.e(err);
        } finally {
          _iterator11.f();
        }
      }

      if (!flags.requireAll) {
        return matchThis;
      }
    } else if (isKeyword(key)) {
      continue;
    } else {
      var _ret2 = function () {
        // Force a copy of this frame entry so it can be manipulated
        var thisFrame = util.getValues(frame, key)[0];
        var hasDefault = false;

        if (thisFrame) {
          _validateFrame([thisFrame]);

          hasDefault = '@default' in thisFrame;
        } // no longer a wildcard pattern if frame has any non-keyword properties


        wildcard = false; // skip, but allow match if node has no value for property, and frame has
        // a default value

        if (nodeValues.length === 0 && hasDefault) {
          return "continue";
        } // if frame value is empty, don't match if subject has any value


        if (nodeValues.length > 0 && isEmpty) {
          return {
            v: false
          };
        }

        if (thisFrame === undefined) {
          // node does not match if values is not empty and the value of property
          // in frame is match none.
          if (nodeValues.length > 0) {
            return {
              v: false
            };
          }

          matchThis = true;
        } else {
          if (graphTypes.isList(thisFrame)) {
            var listValue = thisFrame['@list'][0];

            if (graphTypes.isList(nodeValues[0])) {
              var nodeListValues = nodeValues[0]['@list'];

              if (graphTypes.isValue(listValue)) {
                // match on any matching value
                matchThis = nodeListValues.some(function (lv) {
                  return _valueMatch(listValue, lv);
                });
              } else if (graphTypes.isSubject(listValue) || graphTypes.isSubjectReference(listValue)) {
                matchThis = nodeListValues.some(function (lv) {
                  return _nodeMatch(state, listValue, lv, flags);
                });
              }
            }
          } else if (graphTypes.isValue(thisFrame)) {
            matchThis = nodeValues.some(function (nv) {
              return _valueMatch(thisFrame, nv);
            });
          } else if (graphTypes.isSubjectReference(thisFrame)) {
            matchThis = nodeValues.some(function (nv) {
              return _nodeMatch(state, thisFrame, nv, flags);
            });
          } else if (types.isObject(thisFrame)) {
            matchThis = nodeValues.length > 0;
          } else {
            matchThis = false;
          }
        }
      }();

      switch (_ret2) {
        case "continue":
          continue;

        default:
          if ((0, _typeof2["default"])(_ret2) === "object") return _ret2.v;
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
  var embeds = state.uniqueEmbeds[state.graph];
  var embed = embeds[id];
  var parent = embed.parent;
  var property = embed.property; // create reference to replace embed

  var subject = {
    '@id': id
  }; // remove existing embed

  if (types.isArray(parent)) {
    // replace subject with reference
    for (var i = 0; i < parent.length; ++i) {
      if (util.compareValues(parent[i], subject)) {
        parent[i] = subject;
        break;
      }
    }
  } else {
    // replace subject with reference
    var useArray = types.isArray(parent[property]);
    util.removeValue(parent, property, subject, {
      propertyIsArray: useArray
    });
    util.addValue(parent, property, subject, {
      propertyIsArray: useArray
    });
  } // recursively remove dependent dangling embeds


  var removeDependents = function removeDependents(id) {
    // get embed keys as a separate array to enable deleting keys in map
    var ids = Object.keys(embeds);

    for (var _i2 = 0, _ids = ids; _i2 < _ids.length; _i2++) {
      var next = _ids[_i2];

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
    return input.map(function (value) {
      return _cleanupPreserve(value, options);
    });
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
      var id = input['@id'];

      if (options.link.hasOwnProperty(id)) {
        var idx = options.link[id].indexOf(input);

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


    for (var prop in input) {
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

  var nodeObject = state.subjects[value['@id']];
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
  var v1 = value['@value'];
  var t1 = value['@type'];
  var l1 = value['@language'];
  var v2 = pattern['@value'] ? types.isArray(pattern['@value']) ? pattern['@value'] : [pattern['@value']] : [];
  var t2 = pattern['@type'] ? types.isArray(pattern['@type']) ? pattern['@type'] : [pattern['@type']] : [];
  var l2 = pattern['@language'] ? types.isArray(pattern['@language']) ? pattern['@language'] : [pattern['@language']] : [];

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


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var JsonLdError = __webpack_require__(/*! ./JsonLdError */ "./lib/JsonLdError.js");

var graphTypes = __webpack_require__(/*! ./graphTypes */ "./lib/graphTypes.js");

var types = __webpack_require__(/*! ./types */ "./lib/types.js");

var util = __webpack_require__(/*! ./util */ "./lib/util.js"); // constants


var _require = __webpack_require__(/*! ./constants */ "./lib/constants.js"),
    RDF_LIST = _require.RDF_LIST,
    RDF_FIRST = _require.RDF_FIRST,
    RDF_REST = _require.RDF_REST,
    RDF_NIL = _require.RDF_NIL,
    RDF_TYPE = _require.RDF_TYPE,
    RDF_JSON_LITERAL = _require.RDF_JSON_LITERAL,
    XSD_BOOLEAN = _require.XSD_BOOLEAN,
    XSD_DOUBLE = _require.XSD_DOUBLE,
    XSD_INTEGER = _require.XSD_INTEGER,
    XSD_STRING = _require.XSD_STRING;

var REGEX_BCP47 = /^[a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*$/;
var api = {};
module.exports = api;
/**
 * Converts an RDF dataset to JSON-LD.
 *
 * @param dataset the RDF dataset.
 * @param options the RDF serialization options.
 *
 * @return a Promise that resolves to the JSON-LD output.
 */

api.fromRDF = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(dataset, _ref) {
    var _ref$useRdfType, useRdfType, _ref$useNativeTypes, useNativeTypes, _ref$rdfDirection, rdfDirection, defaultGraph, graphMap, referencedOnce, _iterator, _step, quad, _name, nodeMap, s, p, o, _node, objectIsNode, value, object, name, graphObject, nil, _iterator2, _step2, usage, node, property, head, list, listNodes, nodeKeyCount, _i, _listNodes, listNode, result, subjects, _iterator3, _step3, subject, _node2, graph, _graphObject, graphSubjects, _iterator4, _step4, graphSubject, _node3;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref$useRdfType = _ref.useRdfType, useRdfType = _ref$useRdfType === void 0 ? false : _ref$useRdfType, _ref$useNativeTypes = _ref.useNativeTypes, useNativeTypes = _ref$useNativeTypes === void 0 ? false : _ref$useNativeTypes, _ref$rdfDirection = _ref.rdfDirection, rdfDirection = _ref$rdfDirection === void 0 ? null : _ref$rdfDirection;
            defaultGraph = {};
            graphMap = {
              '@default': defaultGraph
            };
            referencedOnce = {};
            _iterator = _createForOfIteratorHelper(dataset);
            _context.prev = 5;

            _iterator.s();

          case 7:
            if ((_step = _iterator.n()).done) {
              _context.next = 28;
              break;
            }

            quad = _step.value;
            // TODO: change 'name' to 'graph'
            _name = quad.graph.termType === 'DefaultGraph' ? '@default' : quad.graph.value;

            if (!(_name in graphMap)) {
              graphMap[_name] = {};
            }

            if (_name !== '@default' && !(_name in defaultGraph)) {
              defaultGraph[_name] = {
                '@id': _name
              };
            }

            nodeMap = graphMap[_name]; // get subject, predicate, object

            s = quad.subject.value;
            p = quad.predicate.value;
            o = quad.object;

            if (!(s in nodeMap)) {
              nodeMap[s] = {
                '@id': s
              };
            }

            _node = nodeMap[s];
            objectIsNode = o.termType.endsWith('Node');

            if (objectIsNode && !(o.value in nodeMap)) {
              nodeMap[o.value] = {
                '@id': o.value
              };
            }

            if (!(p === RDF_TYPE && !useRdfType && objectIsNode)) {
              _context.next = 23;
              break;
            }

            util.addValue(_node, '@type', o.value, {
              propertyIsArray: true
            });
            return _context.abrupt("continue", 26);

          case 23:
            value = _RDFToObject(o, useNativeTypes, rdfDirection);
            util.addValue(_node, p, value, {
              propertyIsArray: true
            }); // object may be an RDF list/partial list node but we can't know easily
            // until all triples are read

            if (objectIsNode) {
              if (o.value === RDF_NIL) {
                // track rdf:nil uniquely per graph
                object = nodeMap[o.value];

                if (!('usages' in object)) {
                  object.usages = [];
                }

                object.usages.push({
                  node: _node,
                  property: p,
                  value: value
                });
              } else if (o.value in referencedOnce) {
                // object referenced more than once
                referencedOnce[o.value] = false;
              } else {
                // keep track of single reference
                referencedOnce[o.value] = {
                  node: _node,
                  property: p,
                  value: value
                };
              }
            }

          case 26:
            _context.next = 7;
            break;

          case 28:
            _context.next = 33;
            break;

          case 30:
            _context.prev = 30;
            _context.t0 = _context["catch"](5);

            _iterator.e(_context.t0);

          case 33:
            _context.prev = 33;

            _iterator.f();

            return _context.finish(33);

          case 36:
            _context.t1 = _regenerator["default"].keys(graphMap);

          case 37:
            if ((_context.t2 = _context.t1()).done) {
              _context.next = 84;
              break;
            }

            name = _context.t2.value;
            graphObject = graphMap[name]; // no @lists to be converted, continue

            if (RDF_NIL in graphObject) {
              _context.next = 42;
              break;
            }

            return _context.abrupt("continue", 37);

          case 42:
            // iterate backwards through each RDF list
            nil = graphObject[RDF_NIL];

            if (nil.usages) {
              _context.next = 45;
              break;
            }

            return _context.abrupt("continue", 37);

          case 45:
            _iterator2 = _createForOfIteratorHelper(nil.usages);
            _context.prev = 46;

            _iterator2.s();

          case 48:
            if ((_step2 = _iterator2.n()).done) {
              _context.next = 73;
              break;
            }

            usage = _step2.value;
            node = usage.node;
            property = usage.property;
            head = usage.value;
            list = [];
            listNodes = []; // ensure node is a well-formed list node; it must:
            // 1. Be referenced only once.
            // 2. Have an array for rdf:first that has 1 item.
            // 3. Have an array for rdf:rest that has 1 item.
            // 4. Have no keys other than: @id, rdf:first, rdf:rest, and,
            //   optionally, @type where the value is rdf:List.

            nodeKeyCount = Object.keys(node).length;

          case 56:
            if (!(property === RDF_REST && types.isObject(referencedOnce[node['@id']]) && types.isArray(node[RDF_FIRST]) && node[RDF_FIRST].length === 1 && types.isArray(node[RDF_REST]) && node[RDF_REST].length === 1 && (nodeKeyCount === 3 || nodeKeyCount === 4 && types.isArray(node['@type']) && node['@type'].length === 1 && node['@type'][0] === RDF_LIST))) {
              _context.next = 68;
              break;
            }

            list.push(node[RDF_FIRST][0]);
            listNodes.push(node['@id']); // get next node, moving backwards through list

            usage = referencedOnce[node['@id']];
            node = usage.node;
            property = usage.property;
            head = usage.value;
            nodeKeyCount = Object.keys(node).length; // if node is not a blank node, then list head found

            if (graphTypes.isBlankNode(node)) {
              _context.next = 66;
              break;
            }

            return _context.abrupt("break", 68);

          case 66:
            _context.next = 56;
            break;

          case 68:
            // transform list into @list object
            delete head['@id'];
            head['@list'] = list.reverse();

            for (_i = 0, _listNodes = listNodes; _i < _listNodes.length; _i++) {
              listNode = _listNodes[_i];
              delete graphObject[listNode];
            }

          case 71:
            _context.next = 48;
            break;

          case 73:
            _context.next = 78;
            break;

          case 75:
            _context.prev = 75;
            _context.t3 = _context["catch"](46);

            _iterator2.e(_context.t3);

          case 78:
            _context.prev = 78;

            _iterator2.f();

            return _context.finish(78);

          case 81:
            delete nil.usages;
            _context.next = 37;
            break;

          case 84:
            result = [];
            subjects = Object.keys(defaultGraph).sort();
            _iterator3 = _createForOfIteratorHelper(subjects);

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                subject = _step3.value;
                _node2 = defaultGraph[subject];

                if (subject in graphMap) {
                  graph = _node2['@graph'] = [];
                  _graphObject = graphMap[subject];
                  graphSubjects = Object.keys(_graphObject).sort();
                  _iterator4 = _createForOfIteratorHelper(graphSubjects);

                  try {
                    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                      graphSubject = _step4.value;
                      _node3 = _graphObject[graphSubject]; // only add full subjects to top-level

                      if (!graphTypes.isSubjectReference(_node3)) {
                        graph.push(_node3);
                      }
                    }
                  } catch (err) {
                    _iterator4.e(err);
                  } finally {
                    _iterator4.f();
                  }
                } // only add full subjects to top-level


                if (!graphTypes.isSubjectReference(_node2)) {
                  result.push(_node2);
                }
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }

            return _context.abrupt("return", result);

          case 89:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 30, 33, 36], [46, 75, 78, 81]]);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();
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


  var rval = {
    '@value': o.value
  }; // add language

  if (o.language) {
    rval['@language'] = o.language;
  } else {
    var type = o.datatype.value;

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
          var i = parseInt(rval['@value'], 10);

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
      var _type$split = type.split(/[#_]/),
          _type$split2 = (0, _slicedToArray2["default"])(_type$split, 3),
          language = _type$split2[1],
          direction = _type$split2[2];

      if (language.length > 0) {
        rval['@language'] = language;

        if (!language.match(REGEX_BCP47)) {
          console.warn("@language must be valid BCP47: ".concat(language));
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


var types = __webpack_require__(/*! ./types */ "./lib/types.js");

var api = {};
module.exports = api;
/**
 * Returns true if the given value is a subject with properties.
 *
 * @param v the value to check.
 *
 * @return true if the value is a subject with properties, false if not.
 */

api.isSubject = function (v) {
  // Note: A value is a subject if all of these hold true:
  // 1. It is an Object.
  // 2. It is not a @value, @set, or @list.
  // 3. It has more than 1 key OR any existing key is not @id.
  if (types.isObject(v) && !('@value' in v || '@set' in v || '@list' in v)) {
    var keyCount = Object.keys(v).length;
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


api.isSubjectReference = function (v) {
  return (// Note: A value is a subject reference if all of these hold true:
    // 1. It is an Object.
    // 2. It has a single key: @id.
    types.isObject(v) && Object.keys(v).length === 1 && '@id' in v
  );
};
/**
 * Returns true if the given value is a @value.
 *
 * @param v the value to check.
 *
 * @return true if the value is a @value, false if not.
 */


api.isValue = function (v) {
  return (// Note: A value is a @value if all of these hold true:
    // 1. It is an Object.
    // 2. It has the @value property.
    types.isObject(v) && '@value' in v
  );
};
/**
 * Returns true if the given value is a @list.
 *
 * @param v the value to check.
 *
 * @return true if the value is a @list, false if not.
 */


api.isList = function (v) {
  return (// Note: A value is a @list if all of these hold true:
    // 1. It is an Object.
    // 2. It has the @list property.
    types.isObject(v) && '@list' in v
  );
};
/**
 * Returns true if the given value is a @graph.
 *
 * @return true if the value is a @graph, false if not.
 */


api.isGraph = function (v) {
  // Note: A value is a graph if all of these hold true:
  // 1. It is an object.
  // 2. It has an `@graph` key.
  // 3. It may have '@id' or '@index'
  return types.isObject(v) && '@graph' in v && Object.keys(v).filter(function (key) {
    return key !== '@id' && key !== '@index';
  }).length === 1;
};
/**
 * Returns true if the given value is a simple @graph.
 *
 * @return true if the value is a simple @graph, false if not.
 */


api.isSimpleGraph = function (v) {
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


api.isBlankNode = function (v) {
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
/* WEBPACK VAR INJECTION */(function(global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
var canonize = __webpack_require__(/*! rdf-canonize */ "./node_modules/rdf-canonize/lib/index.js");

var util = __webpack_require__(/*! ./util */ "./lib/util.js");

var ContextResolver = __webpack_require__(/*! ./ContextResolver */ "./lib/ContextResolver.js");

var IdentifierIssuer = util.IdentifierIssuer;

var JsonLdError = __webpack_require__(/*! ./JsonLdError */ "./lib/JsonLdError.js");

var LRU = __webpack_require__(/*! lru-cache */ "./node_modules/lru-cache/index.js");

var NQuads = __webpack_require__(/*! ./NQuads */ "./lib/NQuads.js");

var Rdfa = __webpack_require__(/*! ./Rdfa */ "./lib/Rdfa.js");

var _require = __webpack_require__(/*! ./expand */ "./lib/expand.js"),
    _expand = _require.expand;

var _require2 = __webpack_require__(/*! ./flatten */ "./lib/flatten.js"),
    _flatten = _require2.flatten;

var _require3 = __webpack_require__(/*! ./fromRdf */ "./lib/fromRdf.js"),
    _fromRDF = _require3.fromRDF;

var _require4 = __webpack_require__(/*! ./toRdf */ "./lib/toRdf.js"),
    _toRDF = _require4.toRDF;

var _require5 = __webpack_require__(/*! ./frame */ "./lib/frame.js"),
    _frameMergedOrDefault = _require5.frameMergedOrDefault,
    _cleanupNull = _require5.cleanupNull;

var _require6 = __webpack_require__(/*! ./types */ "./lib/types.js"),
    _isArray = _require6.isArray,
    _isObject = _require6.isObject,
    _isString = _require6.isString;

var _require7 = __webpack_require__(/*! ./graphTypes */ "./lib/graphTypes.js"),
    _isSubjectReference = _require7.isSubjectReference;

var _require8 = __webpack_require__(/*! ./context */ "./lib/context.js"),
    _expandIri = _require8.expandIri,
    _getInitialContext = _require8.getInitialContext,
    _processContext = _require8.process,
    _processingMode = _require8.processingMode;

var _require9 = __webpack_require__(/*! ./compact */ "./lib/compact.js"),
    _compact = _require9.compact,
    _compactIri = _require9.compactIri;

var _require10 = __webpack_require__(/*! ./nodeMap */ "./lib/nodeMap.js"),
    _createNodeMap = _require10.createNodeMap,
    _createMergedNodeMap = _require10.createMergedNodeMap,
    _mergeNodeMaps = _require10.mergeNodeMaps; // determine if in-browser or using Node.js


var _nodejs = typeof process !== 'undefined' && process.versions && process.versions.node;

var _browser = !_nodejs && (typeof window !== 'undefined' || typeof self !== 'undefined');
/* eslint-disable indent */
// attaches jsonld API to the given object


var wrapper = function wrapper(jsonld) {
  /** Registered RDF dataset parsers hashed by content-type. */
  var _rdfParsers = {}; // resolved context cache
  // TODO: consider basing max on context size rather than number

  var RESOLVED_CONTEXT_CACHE_MAX_SIZE = 100;

  var _resolvedContextCache = new LRU({
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


  jsonld.compact = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(input, ctx, options) {
      var expanded,
          activeCtx,
          compacted,
          tmp,
          i,
          hasContext,
          graphAlias,
          graph,
          _graph,
          key,
          _args = arguments;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(_args.length < 2)) {
                _context.next = 2;
                break;
              }

              throw new TypeError('Could not compact, too few arguments.');

            case 2:
              if (!(ctx === null)) {
                _context.next = 4;
                break;
              }

              throw new JsonLdError('The compaction context must not be null.', 'jsonld.CompactError', {
                code: 'invalid local context'
              });

            case 4:
              if (!(input === null)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", null);

            case 6:
              // set default options
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


              if (!options.skipExpansion) {
                _context.next = 13;
                break;
              }

              expanded = input;
              _context.next = 16;
              break;

            case 13:
              _context.next = 15;
              return jsonld.expand(input, options);

            case 15:
              expanded = _context.sent;

            case 16:
              _context.next = 18;
              return jsonld.processContext(_getInitialContext(options), ctx, options);

            case 18:
              activeCtx = _context.sent;
              _context.next = 21;
              return _compact({
                activeCtx: activeCtx,
                element: expanded,
                options: options,
                compactionMap: options.compactionMap
              });

            case 21:
              compacted = _context.sent;

              // perform clean up
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


              tmp = ctx;
              ctx = [];

              for (i = 0; i < tmp.length; ++i) {
                if (!_isObject(tmp[i]) || Object.keys(tmp[i]).length > 0) {
                  ctx.push(tmp[i]);
                }
              } // remove array if only one context


              hasContext = ctx.length > 0;

              if (ctx.length === 1) {
                ctx = ctx[0];
              } // add context and/or @graph


              if (_isArray(compacted)) {
                // use '@graph' keyword
                graphAlias = _compactIri({
                  activeCtx: activeCtx,
                  iri: '@graph',
                  relativeTo: {
                    vocab: true
                  }
                });
                graph = compacted;
                compacted = {};

                if (hasContext) {
                  compacted['@context'] = ctx;
                }

                compacted[graphAlias] = graph;
              } else if (_isObject(compacted) && hasContext) {
                // reorder keys so @context is first
                _graph = compacted;
                compacted = {
                  '@context': ctx
                };

                for (key in _graph) {
                  compacted[key] = _graph[key];
                }
              }

              return _context.abrupt("return", compacted);

            case 33:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
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


  jsonld.expand = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(input, options) {
      var toResolve,
          contextsToProcess,
          expandContext,
          defaultBase,
          remoteDoc,
          activeCtx,
          _i,
          _contextsToProcess,
          localCtx,
          expanded,
          _args2 = arguments;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(_args2.length < 1)) {
                _context2.next = 2;
                break;
              }

              throw new TypeError('Could not expand, too few arguments.');

            case 2:
              // set default options
              options = _setDefaults(options, {
                keepFreeFloatingNodes: false,
                contextResolver: new ContextResolver({
                  sharedCache: _resolvedContextCache
                })
              });

              if (options.expansionMap === false) {
                options.expansionMap = undefined;
              } // build set of objects that may have @contexts to resolve


              toResolve = {}; // build set of contexts to process prior to expansion

              contextsToProcess = []; // if an `expandContext` has been given ensure it gets resolved

              if ('expandContext' in options) {
                expandContext = util.clone(options.expandContext);

                if (_isObject(expandContext) && '@context' in expandContext) {
                  toResolve.expandContext = expandContext;
                } else {
                  toResolve.expandContext = {
                    '@context': expandContext
                  };
                }

                contextsToProcess.push(toResolve.expandContext);
              } // if input is a string, attempt to dereference remote document


              if (_isString(input)) {
                _context2.next = 11;
                break;
              }

              // input is not a URL, do not need to retrieve it first
              toResolve.input = util.clone(input);
              _context2.next = 17;
              break;

            case 11:
              _context2.next = 13;
              return jsonld.get(input, options);

            case 13:
              remoteDoc = _context2.sent;
              defaultBase = remoteDoc.documentUrl;
              toResolve.input = remoteDoc.document;

              if (remoteDoc.contextUrl) {
                // context included in HTTP link header and must be resolved
                toResolve.remoteContext = {
                  '@context': remoteDoc.contextUrl
                };
                contextsToProcess.push(toResolve.remoteContext);
              }

            case 17:
              // set default base
              if (!('base' in options)) {
                options.base = defaultBase || '';
              } // process any additional contexts


              activeCtx = _getInitialContext(options);
              _i = 0, _contextsToProcess = contextsToProcess;

            case 20:
              if (!(_i < _contextsToProcess.length)) {
                _context2.next = 28;
                break;
              }

              localCtx = _contextsToProcess[_i];
              _context2.next = 24;
              return _processContext({
                activeCtx: activeCtx,
                localCtx: localCtx,
                options: options
              });

            case 24:
              activeCtx = _context2.sent;

            case 25:
              _i++;
              _context2.next = 20;
              break;

            case 28:
              _context2.next = 30;
              return _expand({
                activeCtx: activeCtx,
                element: toResolve.input,
                options: options,
                expansionMap: options.expansionMap
              });

            case 30:
              expanded = _context2.sent;

              // optimize away @graph with no other properties
              if (_isObject(expanded) && '@graph' in expanded && Object.keys(expanded).length === 1) {
                expanded = expanded['@graph'];
              } else if (expanded === null) {
                expanded = [];
              } // normalize to an array


              if (!_isArray(expanded)) {
                expanded = [expanded];
              }

              return _context2.abrupt("return", expanded);

            case 34:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }();
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


  jsonld.flatten = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(input, ctx, options) {
      var expanded,
          flattened,
          compacted,
          _args3 = arguments;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(_args3.length < 1)) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return", new TypeError('Could not flatten, too few arguments.'));

            case 2:
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

              _context3.next = 6;
              return jsonld.expand(input, options);

            case 6:
              expanded = _context3.sent;
              // do flattening
              flattened = _flatten(expanded);

              if (!(ctx === null)) {
                _context3.next = 10;
                break;
              }

              return _context3.abrupt("return", flattened);

            case 10:
              // compact result (force @graph option to true, skip expansion)
              options.graph = true;
              options.skipExpansion = true;
              _context3.next = 14;
              return jsonld.compact(flattened, ctx, options);

            case 14:
              compacted = _context3.sent;
              return _context3.abrupt("return", compacted);

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x6, _x7, _x8) {
      return _ref3.apply(this, arguments);
    };
  }();
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


  jsonld.frame = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(input, frame, options) {
      var remoteDoc,
          ctx,
          frameContext,
          activeCtx,
          expanded,
          opts,
          expandedFrame,
          frameKeys,
          framed,
          compacted,
          _args4 = arguments;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(_args4.length < 2)) {
                _context4.next = 2;
                break;
              }

              throw new TypeError('Could not frame, too few arguments.');

            case 2:
              // set default options
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

              if (!_isString(frame)) {
                _context4.next = 9;
                break;
              }

              _context4.next = 6;
              return jsonld.get(frame, options);

            case 6:
              remoteDoc = _context4.sent;
              frame = remoteDoc.document;

              if (remoteDoc.contextUrl) {
                // inject link header @context into frame
                ctx = frame['@context'];

                if (!ctx) {
                  ctx = remoteDoc.contextUrl;
                } else if (_isArray(ctx)) {
                  ctx.push(remoteDoc.contextUrl);
                } else {
                  ctx = [ctx, remoteDoc.contextUrl];
                }

                frame['@context'] = ctx;
              }

            case 9:
              frameContext = frame ? frame['@context'] || {} : {}; // process context

              _context4.next = 12;
              return jsonld.processContext(_getInitialContext(options), frameContext, options);

            case 12:
              activeCtx = _context4.sent;

              // mode specific defaults
              if (!options.hasOwnProperty('omitGraph')) {
                options.omitGraph = _processingMode(activeCtx, 1.1);
              }

              if (!options.hasOwnProperty('pruneBlankNodeIdentifiers')) {
                options.pruneBlankNodeIdentifiers = _processingMode(activeCtx, 1.1);
              } // expand input


              _context4.next = 17;
              return jsonld.expand(input, options);

            case 17:
              expanded = _context4.sent;
              // expand frame
              opts = _objectSpread({}, options);
              opts.isFrame = true;
              opts.keepFreeFloatingNodes = true;
              _context4.next = 23;
              return jsonld.expand(frame, opts);

            case 23:
              expandedFrame = _context4.sent;
              // if the unexpanded frame includes a key expanding to @graph, frame the
              // default graph, otherwise, the merged graph
              frameKeys = Object.keys(frame).map(function (key) {
                return _expandIri(activeCtx, key, {
                  vocab: true
                });
              });
              opts.merged = !frameKeys.includes('@graph');
              opts.is11 = _processingMode(activeCtx, 1.1); // do framing

              framed = _frameMergedOrDefault(expanded, expandedFrame, opts);
              opts.graph = !options.omitGraph;
              opts.skipExpansion = true;
              opts.link = {};
              opts.framing = true;
              _context4.next = 34;
              return jsonld.compact(framed, frameContext, opts);

            case 34:
              compacted = _context4.sent;
              // replace @null with null, compacting arrays
              opts.link = {};
              compacted = _cleanupNull(compacted, opts);
              return _context4.abrupt("return", compacted);

            case 38:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x9, _x10, _x11) {
      return _ref4.apply(this, arguments);
    };
  }();
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


  jsonld.link = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(input, ctx, options) {
      var frame;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              // API matches running frame with a wildcard frame and embed: '@link'
              // get arguments
              frame = {};

              if (ctx) {
                frame['@context'] = ctx;
              }

              frame['@embed'] = '@link';
              return _context5.abrupt("return", jsonld.frame(input, frame, options));

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x12, _x13, _x14) {
      return _ref5.apply(this, arguments);
    };
  }();
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


  jsonld.normalize = jsonld.canonize = /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(input, options) {
      var parsedInput,
          opts,
          dataset,
          _args6 = arguments;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(_args6.length < 1)) {
                _context6.next = 2;
                break;
              }

              throw new TypeError('Could not canonize, too few arguments.');

            case 2:
              // set default options
              options = _setDefaults(options, {
                base: _isString(input) ? input : '',
                algorithm: 'URDNA2015',
                skipExpansion: false,
                contextResolver: new ContextResolver({
                  sharedCache: _resolvedContextCache
                })
              });

              if (!('inputFormat' in options)) {
                _context6.next = 8;
                break;
              }

              if (!(options.inputFormat !== 'application/n-quads' && options.inputFormat !== 'application/nquads')) {
                _context6.next = 6;
                break;
              }

              throw new JsonLdError('Unknown canonicalization input format.', 'jsonld.CanonizeError');

            case 6:
              // TODO: `await` for async parsers
              parsedInput = NQuads.parse(input); // do canonicalization

              return _context6.abrupt("return", canonize.canonize(parsedInput, options));

            case 8:
              // convert to RDF dataset then do normalization
              opts = _objectSpread({}, options);
              delete opts.format;
              opts.produceGeneralizedRdf = false;
              _context6.next = 13;
              return jsonld.toRDF(input, opts);

            case 13:
              dataset = _context6.sent;
              return _context6.abrupt("return", canonize.canonize(dataset, options));

            case 15:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x15, _x16) {
      return _ref6.apply(this, arguments);
    };
  }();
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


  jsonld.fromRDF = /*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(dataset, options) {
      var _options,
          format,
          _options2,
          rdfParser,
          parsedDataset,
          _args7 = arguments;

      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!(_args7.length < 1)) {
                _context7.next = 2;
                break;
              }

              throw new TypeError('Could not convert from RDF, too few arguments.');

            case 2:
              // set default options
              options = _setDefaults(options, {
                format: _isString(dataset) ? 'application/n-quads' : undefined
              });
              _options = options, format = _options.format;
              _options2 = options, rdfParser = _options2.rdfParser; // handle special format

              if (!format) {
                _context7.next = 11;
                break;
              }

              // check supported formats
              rdfParser = rdfParser || _rdfParsers[format];

              if (rdfParser) {
                _context7.next = 9;
                break;
              }

              throw new JsonLdError('Unknown input format.', 'jsonld.UnknownFormat', {
                format: format
              });

            case 9:
              _context7.next = 12;
              break;

            case 11:
              // no-op parser, assume dataset already parsed
              rdfParser = function rdfParser() {
                return dataset;
              };

            case 12:
              _context7.next = 14;
              return rdfParser(dataset);

            case 14:
              parsedDataset = _context7.sent;
              return _context7.abrupt("return", _fromRDF(parsedDataset, options));

            case 16:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function (_x17, _x18) {
      return _ref7.apply(this, arguments);
    };
  }();
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


  jsonld.toRDF = /*#__PURE__*/function () {
    var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(input, options) {
      var expanded,
          dataset,
          _args8 = arguments;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (!(_args8.length < 1)) {
                _context8.next = 2;
                break;
              }

              throw new TypeError('Could not convert to RDF, too few arguments.');

            case 2:
              // set default options
              options = _setDefaults(options, {
                base: _isString(input) ? input : '',
                skipExpansion: false,
                contextResolver: new ContextResolver({
                  sharedCache: _resolvedContextCache
                })
              }); // TODO: support toRDF custom map?

              if (!options.skipExpansion) {
                _context8.next = 7;
                break;
              }

              expanded = input;
              _context8.next = 10;
              break;

            case 7:
              _context8.next = 9;
              return jsonld.expand(input, options);

            case 9:
              expanded = _context8.sent;

            case 10:
              // output RDF dataset
              dataset = _toRDF(expanded, options);

              if (!options.format) {
                _context8.next = 17;
                break;
              }

              if (!(options.format === 'application/n-quads' || options.format === 'application/nquads')) {
                _context8.next = 16;
                break;
              }

              _context8.next = 15;
              return NQuads.serialize(dataset);

            case 15:
              return _context8.abrupt("return", _context8.sent);

            case 16:
              throw new JsonLdError('Unknown output format.', 'jsonld.UnknownFormat', {
                format: options.format
              });

            case 17:
              return _context8.abrupt("return", dataset);

            case 18:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function (_x19, _x20) {
      return _ref8.apply(this, arguments);
    };
  }();
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


  jsonld.createNodeMap = /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(input, options) {
      var expanded,
          _args9 = arguments;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (!(_args9.length < 1)) {
                _context9.next = 2;
                break;
              }

              throw new TypeError('Could not create node map, too few arguments.');

            case 2:
              // set default options
              options = _setDefaults(options, {
                base: _isString(input) ? input : '',
                contextResolver: new ContextResolver({
                  sharedCache: _resolvedContextCache
                })
              }); // expand input

              _context9.next = 5;
              return jsonld.expand(input, options);

            case 5:
              expanded = _context9.sent;
              return _context9.abrupt("return", _createMergedNodeMap(expanded, options));

            case 7:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function (_x21, _x22) {
      return _ref9.apply(this, arguments);
    };
  }();
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


  jsonld.merge = /*#__PURE__*/function () {
    var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(docs, ctx, options) {
      var expanded,
          mergeNodes,
          issuer,
          graphs,
          i,
          doc,
          _graphs,
          graphName,
          _nodeMap,
          nodeMap,
          key,
          defaultGraph,
          flattened,
          keys,
          ki,
          node,
          compacted,
          _args10 = arguments;

      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (!(_args10.length < 1)) {
                _context10.next = 2;
                break;
              }

              throw new TypeError('Could not merge, too few arguments.');

            case 2:
              if (_isArray(docs)) {
                _context10.next = 4;
                break;
              }

              throw new TypeError('Could not merge, "docs" must be an array.');

            case 4:
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

              _context10.next = 8;
              return Promise.all(docs.map(function (doc) {
                var opts = _objectSpread({}, options);

                return jsonld.expand(doc, opts);
              }));

            case 8:
              expanded = _context10.sent;
              mergeNodes = true;

              if ('mergeNodes' in options) {
                mergeNodes = options.mergeNodes;
              }

              issuer = options.issuer || new IdentifierIssuer('_:b');
              graphs = {
                '@default': {}
              };
              i = 0;

            case 14:
              if (!(i < expanded.length)) {
                _context10.next = 33;
                break;
              }

              // uniquely relabel blank nodes
              doc = util.relabelBlankNodes(expanded[i], {
                issuer: new IdentifierIssuer('_:b' + i + '-')
              }); // add nodes to the shared node map graphs if merging nodes, to a
              // separate graph set if not

              _graphs = mergeNodes || i === 0 ? graphs : {
                '@default': {}
              };

              _createNodeMap(doc, _graphs, '@default', issuer);

              if (!(_graphs !== graphs)) {
                _context10.next = 30;
                break;
              }

              _context10.t0 = _regenerator["default"].keys(_graphs);

            case 20:
              if ((_context10.t1 = _context10.t0()).done) {
                _context10.next = 30;
                break;
              }

              graphName = _context10.t1.value;
              _nodeMap = _graphs[graphName];

              if (graphName in graphs) {
                _context10.next = 26;
                break;
              }

              graphs[graphName] = _nodeMap;
              return _context10.abrupt("continue", 20);

            case 26:
              nodeMap = graphs[graphName];

              for (key in _nodeMap) {
                if (!(key in nodeMap)) {
                  nodeMap[key] = _nodeMap[key];
                }
              }

              _context10.next = 20;
              break;

            case 30:
              ++i;
              _context10.next = 14;
              break;

            case 33:
              // add all non-default graphs to default graph
              defaultGraph = _mergeNodeMaps(graphs); // produce flattened output

              flattened = [];
              keys = Object.keys(defaultGraph).sort();

              for (ki = 0; ki < keys.length; ++ki) {
                node = defaultGraph[keys[ki]]; // only add full subjects to top-level

                if (!_isSubjectReference(node)) {
                  flattened.push(node);
                }
              }

              if (!(ctx === null)) {
                _context10.next = 39;
                break;
              }

              return _context10.abrupt("return", flattened);

            case 39:
              // compact result (force @graph option to true, skip expansion)
              options.graph = true;
              options.skipExpansion = true;
              _context10.next = 43;
              return jsonld.compact(flattened, ctx, options);

            case 43:
              compacted = _context10.sent;
              return _context10.abrupt("return", compacted);

            case 45:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    return function (_x23, _x24, _x25) {
      return _ref10.apply(this, arguments);
    };
  }();
  /**
   * The default document loader for external documents.
   *
   * @param url the URL to load.
   *
   * @return a promise that resolves to the remote document.
   */


  Object.defineProperty(jsonld, 'documentLoader', {
    get: function get() {
      return jsonld._documentLoader;
    },
    set: function set(v) {
      return jsonld._documentLoader = v;
    }
  }); // default document loader not implemented

  jsonld.documentLoader = /*#__PURE__*/function () {
    var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(url) {
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              throw new JsonLdError('Could not retrieve a JSON-LD document from the URL. URL ' + 'dereferencing not implemented.', 'jsonld.LoadDocumentError', {
                code: 'loading document failed',
                url: url
              });

            case 1:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    return function (_x26) {
      return _ref11.apply(this, arguments);
    };
  }();
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


  jsonld.get = /*#__PURE__*/function () {
    var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(url, options) {
      var load, remoteDoc;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              if (typeof options.documentLoader === 'function') {
                load = options.documentLoader;
              } else {
                load = jsonld.documentLoader;
              }

              _context12.next = 3;
              return load(url);

            case 3:
              remoteDoc = _context12.sent;
              _context12.prev = 4;

              if (remoteDoc.document) {
                _context12.next = 7;
                break;
              }

              throw new JsonLdError('No remote document found at the given URL.', 'jsonld.NullRemoteDocument');

            case 7:
              if (_isString(remoteDoc.document)) {
                remoteDoc.document = JSON.parse(remoteDoc.document);
              }

              _context12.next = 13;
              break;

            case 10:
              _context12.prev = 10;
              _context12.t0 = _context12["catch"](4);
              throw new JsonLdError('Could not retrieve a JSON-LD document from the URL.', 'jsonld.LoadDocumentError', {
                code: 'loading document failed',
                cause: _context12.t0,
                remoteDoc: remoteDoc
              });

            case 13:
              return _context12.abrupt("return", remoteDoc);

            case 14:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, null, [[4, 10]]);
    }));

    return function (_x27, _x28) {
      return _ref12.apply(this, arguments);
    };
  }();
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


  jsonld.processContext = /*#__PURE__*/function () {
    var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(activeCtx, localCtx, options) {
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              // set default options
              options = _setDefaults(options, {
                base: '',
                contextResolver: new ContextResolver({
                  sharedCache: _resolvedContextCache
                })
              }); // return initial context early for null context

              if (!(localCtx === null)) {
                _context13.next = 3;
                break;
              }

              return _context13.abrupt("return", _getInitialContext(options));

            case 3:
              // get URLs in localCtx
              localCtx = util.clone(localCtx);

              if (!(_isObject(localCtx) && '@context' in localCtx)) {
                localCtx = {
                  '@context': localCtx
                };
              }

              return _context13.abrupt("return", _processContext({
                activeCtx: activeCtx,
                localCtx: localCtx,
                options: options
              }));

            case 6:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }));

    return function (_x29, _x30, _x31) {
      return _ref13.apply(this, arguments);
    };
  }(); // backwards compatibility


  jsonld.getContextValue = __webpack_require__(/*! ./context */ "./lib/context.js").getContextValue;
  /**
   * Document loaders.
   */

  jsonld.documentLoaders = {};
  jsonld.documentLoaders.node = __webpack_require__(/*! ./documentLoaders/node */ "./lib/documentLoaders/node.js");
  jsonld.documentLoaders.xhr = __webpack_require__(/*! ./documentLoaders/xhr */ "./lib/documentLoaders/xhr.js");
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
        type: type
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
  jsonld.registerRDFParser('application/nquads', NQuads.parse); // register the RDFa API RDF parser

  jsonld.registerRDFParser('rdfa-api', Rdfa.parse);
  /* URL API */

  jsonld.url = __webpack_require__(/*! ./url */ "./lib/url.js");
  /* Utility API */

  jsonld.util = util; // backwards compatibility

  Object.assign(jsonld, util); // reexpose API as jsonld.promises for backwards compatability

  jsonld.promises = jsonld; // backwards compatibility

  jsonld.RequestQueue = __webpack_require__(/*! ./RequestQueue */ "./lib/RequestQueue.js");
  /* WebIDL API */

  jsonld.JsonLdProcessor = __webpack_require__(/*! ./JsonLdProcessor */ "./lib/JsonLdProcessor.js")(jsonld); // setup browser global JsonLdProcessor

  if (_browser && typeof global.JsonLdProcessor === 'undefined') {
    Object.defineProperty(global, 'JsonLdProcessor', {
      writable: true,
      enumerable: false,
      configurable: true,
      value: jsonld.JsonLdProcessor
    });
  } // set platform-specific defaults/APIs


  if (_nodejs) {
    // use node document loader by default
    jsonld.useDocumentLoader('node');
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // use xhr document loader by default
    jsonld.useDocumentLoader('xhr');
  }

  function _setDefaults(options, _ref14) {
    var _ref14$documentLoader = _ref14.documentLoader,
        documentLoader = _ref14$documentLoader === void 0 ? jsonld.documentLoader : _ref14$documentLoader,
        defaults = (0, _objectWithoutProperties2["default"])(_ref14, ["documentLoader"]);
    return Object.assign({}, {
      documentLoader: documentLoader
    }, defaults, options);
  } // end of jsonld API `wrapper` factory


  return jsonld;
}; // external APIs:
// used to generate a new jsonld API instance


var factory = function factory() {
  return wrapper(function () {
    return factory();
  });
}; // wrap the main jsonld API instance


wrapper(factory); // export API

module.exports = factory;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

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


function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _require = __webpack_require__(/*! ./context */ "./lib/context.js"),
    isKeyword = _require.isKeyword;

var graphTypes = __webpack_require__(/*! ./graphTypes */ "./lib/graphTypes.js");

var types = __webpack_require__(/*! ./types */ "./lib/types.js");

var util = __webpack_require__(/*! ./util */ "./lib/util.js");

var JsonLdError = __webpack_require__(/*! ./JsonLdError */ "./lib/JsonLdError.js");

var api = {};
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

api.createMergedNodeMap = function (input, options) {
  options = options || {}; // produce a map of all subjects and name each bnode

  var issuer = options.issuer || new util.IdentifierIssuer('_:b');
  var graphs = {
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


api.createNodeMap = function (input, graphs, graph, issuer, name, list) {
  // recurse through array
  if (types.isArray(input)) {
    var _iterator = _createForOfIteratorHelper(input),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var node = _step.value;
        api.createNodeMap(node, graphs, graph, issuer, undefined, list);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
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
      var type = input['@type']; // rename @type blank node

      if (type.indexOf('_:') === 0) {
        input['@type'] = type = issuer.getId(type);
      }
    }

    if (list) {
      list.push(input);
    }

    return;
  } else if (list && graphTypes.isList(input)) {
    var _list = [];
    api.createNodeMap(input['@list'], graphs, graph, issuer, name, _list);
    list.push({
      '@list': _list
    });
    return;
  } // Note: At this point, input must be a subject.
  // spec requires @type to be named first, so assign names early


  if ('@type' in input) {
    var _types = input['@type'];

    var _iterator2 = _createForOfIteratorHelper(_types),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _type = _step2.value;

        if (_type.indexOf('_:') === 0) {
          issuer.getId(_type);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
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


  var subjects = graphs[graph];
  var subject = subjects[name] = subjects[name] || {};
  subject['@id'] = name;
  var properties = Object.keys(input).sort();

  var _iterator3 = _createForOfIteratorHelper(properties),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var property = _step3.value;

      // skip @id
      if (property === '@id') {
        continue;
      } // handle reverse properties


      if (property === '@reverse') {
        var referencedNode = {
          '@id': name
        };
        var reverseMap = input['@reverse'];

        for (var reverseProperty in reverseMap) {
          var items = reverseMap[reverseProperty];

          var _iterator4 = _createForOfIteratorHelper(items),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var item = _step4.value;
              var itemName = item['@id'];

              if (graphTypes.isBlankNode(item)) {
                itemName = issuer.getId(itemName);
              }

              api.createNodeMap(item, graphs, graph, issuer, itemName);
              util.addValue(subjects[itemName], reverseProperty, referencedNode, {
                propertyIsArray: true,
                allowDuplicate: false
              });
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
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
            subject: subject
          });
        }

        subject[property] = input[property];
        continue;
      } // iterate over objects


      var objects = input[property]; // if property is a bnode, assign it a new id

      if (property.indexOf('_:') === 0) {
        property = issuer.getId(property);
      } // ensure property is added for empty arrays


      if (objects.length === 0) {
        util.addValue(subject, property, [], {
          propertyIsArray: true
        });
        continue;
      }

      var _iterator5 = _createForOfIteratorHelper(objects),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var o = _step5.value;

          if (property === '@type') {
            // rename @type blank nodes
            o = o.indexOf('_:') === 0 ? issuer.getId(o) : o;
          } // handle embedded subject or subject reference


          if (graphTypes.isSubject(o) || graphTypes.isSubjectReference(o)) {
            // skip null @id
            if ('@id' in o && !o['@id']) {
              continue;
            } // relabel blank node @id


            var id = graphTypes.isBlankNode(o) ? issuer.getId(o['@id']) : o['@id']; // add reference and recurse

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
            var _list2 = [];
            api.createNodeMap(o['@list'], graphs, graph, issuer, name, _list2);
            o = {
              '@list': _list2
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
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
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


api.mergeNodeMapGraphs = function (graphs) {
  var merged = {};

  var _iterator6 = _createForOfIteratorHelper(Object.keys(graphs).sort()),
      _step6;

  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var name = _step6.value;

      var _iterator7 = _createForOfIteratorHelper(Object.keys(graphs[name]).sort()),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var id = _step7.value;
          var node = graphs[name][id];

          if (!(id in merged)) {
            merged[id] = {
              '@id': id
            };
          }

          var mergedNode = merged[id];

          var _iterator8 = _createForOfIteratorHelper(Object.keys(node).sort()),
              _step8;

          try {
            for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
              var property = _step8.value;

              if (isKeyword(property) && property !== '@type') {
                // copy keywords
                mergedNode[property] = util.clone(node[property]);
              } else {
                // merge objects
                var _iterator9 = _createForOfIteratorHelper(node[property]),
                    _step9;

                try {
                  for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                    var value = _step9.value;
                    util.addValue(mergedNode, property, util.clone(value), {
                      propertyIsArray: true,
                      allowDuplicate: false
                    });
                  }
                } catch (err) {
                  _iterator9.e(err);
                } finally {
                  _iterator9.f();
                }
              }
            }
          } catch (err) {
            _iterator8.e(err);
          } finally {
            _iterator8.f();
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }

  return merged;
};

api.mergeNodeMaps = function (graphs) {
  // add all non-default graphs to default graph
  var defaultGraph = graphs['@default'];
  var graphNames = Object.keys(graphs).sort();

  var _iterator10 = _createForOfIteratorHelper(graphNames),
      _step10;

  try {
    for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
      var graphName = _step10.value;

      if (graphName === '@default') {
        continue;
      }

      var nodeMap = graphs[graphName];
      var subject = defaultGraph[graphName];

      if (!subject) {
        defaultGraph[graphName] = subject = {
          '@id': graphName,
          '@graph': []
        };
      } else if (!('@graph' in subject)) {
        subject['@graph'] = [];
      }

      var graph = subject['@graph'];

      var _iterator11 = _createForOfIteratorHelper(Object.keys(nodeMap).sort()),
          _step11;

      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var id = _step11.value;
          var node = nodeMap[id]; // only add full subjects

          if (!graphTypes.isSubjectReference(node)) {
            graph.push(node);
          }
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }
    }
  } catch (err) {
    _iterator10.e(err);
  } finally {
    _iterator10.f();
  }

  return defaultGraph;
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


function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _require = __webpack_require__(/*! ./nodeMap */ "./lib/nodeMap.js"),
    createNodeMap = _require.createNodeMap;

var _require2 = __webpack_require__(/*! ./context */ "./lib/context.js"),
    isKeyword = _require2.isKeyword;

var graphTypes = __webpack_require__(/*! ./graphTypes */ "./lib/graphTypes.js");

var jsonCanonicalize = __webpack_require__(/*! canonicalize */ "./node_modules/canonicalize/lib/canonicalize.js");

var types = __webpack_require__(/*! ./types */ "./lib/types.js");

var util = __webpack_require__(/*! ./util */ "./lib/util.js");

var _require3 = __webpack_require__(/*! ./constants */ "./lib/constants.js"),
    RDF_FIRST = _require3.RDF_FIRST,
    RDF_REST = _require3.RDF_REST,
    RDF_NIL = _require3.RDF_NIL,
    RDF_TYPE = _require3.RDF_TYPE,
    RDF_JSON_LITERAL = _require3.RDF_JSON_LITERAL,
    RDF_LANGSTRING = _require3.RDF_LANGSTRING,
    XSD_BOOLEAN = _require3.XSD_BOOLEAN,
    XSD_DOUBLE = _require3.XSD_DOUBLE,
    XSD_INTEGER = _require3.XSD_INTEGER,
    XSD_STRING = _require3.XSD_STRING;

var _require4 = __webpack_require__(/*! ./url */ "./lib/url.js"),
    _isAbsoluteIri = _require4.isAbsolute;

var api = {};
module.exports = api;
/**
 * Outputs an RDF dataset for the expanded JSON-LD input.
 *
 * @param input the expanded JSON-LD input.
 * @param options the RDF serialization options.
 *
 * @return the RDF dataset.
 */

api.toRDF = function (input, options) {
  // create node map for default graph (and any named graphs)
  var issuer = new util.IdentifierIssuer('_:b');
  var nodeMap = {
    '@default': {}
  };
  createNodeMap(input, nodeMap, '@default', issuer);
  var dataset = [];
  var graphNames = Object.keys(nodeMap).sort();

  var _iterator = _createForOfIteratorHelper(graphNames),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var graphName = _step.value;
      var graphTerm = void 0;

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
      } else {
        // skip relative IRIs (not valid RDF)
        continue;
      }

      _graphToRDF(dataset, nodeMap[graphName], graphTerm, issuer, options);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
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
  var ids = Object.keys(graph).sort();

  var _iterator2 = _createForOfIteratorHelper(ids),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var id = _step2.value;
      var node = graph[id];
      var properties = Object.keys(node).sort();

      var _iterator3 = _createForOfIteratorHelper(properties),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var property = _step3.value;
          var items = node[property];

          if (property === '@type') {
            property = RDF_TYPE;
          } else if (isKeyword(property)) {
            continue;
          }

          var _iterator4 = _createForOfIteratorHelper(items),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var item = _step4.value;
              // RDF subject
              var subject = {
                termType: id.startsWith('_:') ? 'BlankNode' : 'NamedNode',
                value: id
              }; // skip relative IRI subjects (not valid RDF)

              if (!_isAbsoluteIri(id)) {
                continue;
              } // RDF predicate


              var predicate = {
                termType: property.startsWith('_:') ? 'BlankNode' : 'NamedNode',
                value: property
              }; // skip relative IRI predicates (not valid RDF)

              if (!_isAbsoluteIri(property)) {
                continue;
              } // skip blank node predicates unless producing generalized RDF


              if (predicate.termType === 'BlankNode' && !options.produceGeneralizedRdf) {
                continue;
              } // convert list, value or node object to triple


              var object = _objectToRDF(item, issuer, dataset, graphTerm, options.rdfDirection); // skip null objects (they are relative IRIs)


              if (object) {
                dataset.push({
                  subject: subject,
                  predicate: predicate,
                  object: object,
                  graph: graphTerm
                });
              }
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
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
  var first = {
    termType: 'NamedNode',
    value: RDF_FIRST
  };
  var rest = {
    termType: 'NamedNode',
    value: RDF_REST
  };
  var nil = {
    termType: 'NamedNode',
    value: RDF_NIL
  };
  var last = list.pop(); // Result is the head of the list

  var result = last ? {
    termType: 'BlankNode',
    value: issuer.getId()
  } : nil;
  var subject = result;

  var _iterator5 = _createForOfIteratorHelper(list),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var item = _step5.value;

      var _object = _objectToRDF(item, issuer, dataset, graphTerm, rdfDirection);

      var next = {
        termType: 'BlankNode',
        value: issuer.getId()
      };
      dataset.push({
        subject: subject,
        predicate: first,
        object: _object,
        graph: graphTerm
      });
      dataset.push({
        subject: subject,
        predicate: rest,
        object: next,
        graph: graphTerm
      });
      subject = next;
    } // Tail of list

  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }

  if (last) {
    var object = _objectToRDF(last, issuer, dataset, graphTerm, rdfDirection);

    dataset.push({
      subject: subject,
      predicate: first,
      object: object,
      graph: graphTerm
    });
    dataset.push({
      subject: subject,
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
  var object = {}; // convert value object to RDF

  if (graphTypes.isValue(item)) {
    object.termType = 'Literal';
    object.value = undefined;
    object.datatype = {
      termType: 'NamedNode'
    };
    var value = item['@value'];
    var datatype = item['@type'] || null; // convert to XSD/JSON datatypes as appropriate

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


      object.value = value.toExponential(15).replace(/(\d)0*e\+?/, '$1E');
      object.datatype.value = datatype || XSD_DOUBLE;
    } else if (types.isNumber(value)) {
      object.value = value.toFixed(0);
      object.datatype.value = datatype || XSD_INTEGER;
    } else if (rdfDirection === 'i18n-datatype' && '@direction' in item) {
      var _datatype = 'https://www.w3.org/ns/i18n#' + (item['@language'] || '') + "_".concat(item['@direction']);

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
    var _list = _listToRDF(item['@list'], issuer, dataset, graphTerm, rdfDirection);

    object.termType = _list.termType;
    object.value = _list.value;
  } else {
    // convert string/node object to RDF
    var id = types.isObject(item) ? item['@id'] : item;
    object.termType = id.startsWith('_:') ? 'BlankNode' : 'NamedNode';
    object.value = id;
  } // skip relative IRIs, not valid RDF


  if (object.termType === 'NamedNode' && !_isAbsoluteIri(object.value)) {
    return null;
  }

  return object;
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


var api = {};
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

api.isBoolean = function (v) {
  return typeof v === 'boolean' || Object.prototype.toString.call(v) === '[object Boolean]';
};
/**
 * Returns true if the given value is a double.
 *
 * @param v the value to check.
 *
 * @return true if the value is a double, false if not.
 */


api.isDouble = function (v) {
  return api.isNumber(v) && (String(v).indexOf('.') !== -1 || Math.abs(v) >= 1e21);
};
/**
 * Returns true if the given value is an empty Object.
 *
 * @param v the value to check.
 *
 * @return true if the value is an empty Object, false if not.
 */


api.isEmptyObject = function (v) {
  return api.isObject(v) && Object.keys(v).length === 0;
};
/**
 * Returns true if the given value is a Number.
 *
 * @param v the value to check.
 *
 * @return true if the value is a Number, false if not.
 */


api.isNumber = function (v) {
  return typeof v === 'number' || Object.prototype.toString.call(v) === '[object Number]';
};
/**
 * Returns true if the given value is numeric.
 *
 * @param v the value to check.
 *
 * @return true if the value is numeric, false if not.
 */


api.isNumeric = function (v) {
  return !isNaN(parseFloat(v)) && isFinite(v);
};
/**
 * Returns true if the given value is an Object.
 *
 * @param v the value to check.
 *
 * @return true if the value is an Object, false if not.
 */


api.isObject = function (v) {
  return Object.prototype.toString.call(v) === '[object Object]';
};
/**
 * Returns true if the given value is a String.
 *
 * @param v the value to check.
 *
 * @return true if the value is a String, false if not.
 */


api.isString = function (v) {
  return typeof v === 'string' || Object.prototype.toString.call(v) === '[object String]';
};
/**
 * Returns true if the given value is undefined.
 *
 * @param v the value to check.
 *
 * @return true if the value is undefined, false if not.
 */


api.isUndefined = function (v) {
  return typeof v === 'undefined';
};

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


var types = __webpack_require__(/*! ./types */ "./lib/types.js");

var api = {};
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

api.parse = function (str, parser) {
  var parsed = {};
  var o = api.parsers[parser || 'full'];
  var m = o.regex.exec(str);
  var i = o.keys.length;

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


api.prependBase = function (base, iri) {
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


  var rel = api.parse(iri); // per RFC3986 5.2.2

  var transform = {
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
        var path = base.path; // append relative path to the end of the last directory from base

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


  var rval = transform.protocol;

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


api.removeBase = function (base, iri) {
  // skip IRI processing
  if (base === null) {
    return iri;
  }

  if (!base || types.isString(base)) {
    base = api.parse(base || '');
  } // establish base root


  var root = '';

  if (base.href !== '') {
    root += (base.protocol || '') + '//' + (base.authority || '');
  } else if (iri.indexOf('//')) {
    // support network-path reference with empty base
    root += '//';
  } // IRI not relative to base


  if (iri.indexOf(root) !== 0) {
    return iri;
  } // remove root from IRI and parse remainder


  var rel = api.parse(iri.substr(root.length)); // remove path segments that match (do not remove last segment unless there
  // is a hash or query)

  var baseSegments = base.normalizedPath.split('/');
  var iriSegments = rel.normalizedPath.split('/');
  var last = rel.fragment || rel.query ? 0 : 1;

  while (baseSegments.length > 0 && iriSegments.length > last) {
    if (baseSegments[0] !== iriSegments[0]) {
      break;
    }

    baseSegments.shift();
    iriSegments.shift();
  } // use '../' for each non-matching base segment


  var rval = '';

  if (baseSegments.length > 0) {
    // don't count the last segment (if it ends with '/' last path doesn't
    // count and if it doesn't end with '/' it isn't a path)
    baseSegments.pop();

    for (var i = 0; i < baseSegments.length; ++i) {
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


api.removeDotSegments = function (path) {
  // RFC 3986 5.2.4 (reworked)
  // empty path shortcut
  if (path.length === 0) {
    return '';
  }

  var input = path.split('/');
  var output = [];

  while (input.length > 0) {
    var next = input.shift();
    var done = input.length === 0;

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


var isAbsoluteRegex = /^([A-Za-z][A-Za-z0-9+-.]*|_):[^\s]*$/;
/**
 * Returns true if the given value is an absolute IRI or blank node IRI, false
 * if not.
 * Note: This weak check only checks for a correct starting scheme.
 *
 * @param v the value to check.
 *
 * @return true if the value is an absolute IRI, false if not.
 */

api.isAbsolute = function (v) {
  return types.isString(v) && isAbsoluteRegex.test(v);
};
/**
 * Returns true if the given value is a relative IRI, false if not.
 * Note: this is a weak check.
 *
 * @param v the value to check.
 *
 * @return true if the value is a relative IRI, false if not.
 */


api.isRelative = function (v) {
  return types.isString(v);
};

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


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js"));

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var graphTypes = __webpack_require__(/*! ./graphTypes */ "./lib/graphTypes.js");

var types = __webpack_require__(/*! ./types */ "./lib/types.js"); // TODO: move `IdentifierIssuer` to its own package


var IdentifierIssuer = __webpack_require__(/*! rdf-canonize */ "./node_modules/rdf-canonize/lib/index.js").IdentifierIssuer;

var JsonLdError = __webpack_require__(/*! ./JsonLdError */ "./lib/JsonLdError.js"); // constants


var REGEX_LINK_HEADERS = /(?:<[^>]*?>|"[^"]*?"|[^,])+/g;
var REGEX_LINK_HEADER = /\s*<([^>]*?)>\s*(?:;\s*(.*))?/;
var REGEX_LINK_HEADER_PARAMS = /(.*?)=(?:(?:"([^"]*?)")|([^"]*?))\s*(?:(?:;\s*)|$)/g;
var DEFAULTS = {
  headers: {
    accept: 'application/ld+json, application/json'
  }
};
var api = {};
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
  if (value && (0, _typeof2["default"])(value) === 'object') {
    var rval;

    if (types.isArray(value)) {
      rval = [];

      for (var i = 0; i < value.length; ++i) {
        rval[i] = api.clone(value[i]);
      }
    } else if (value instanceof Map) {
      rval = new Map();

      var _iterator = _createForOfIteratorHelper(value),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
              k = _step$value[0],
              v = _step$value[1];

          rval.set(k, api.clone(v));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } else if (value instanceof Set) {
      rval = new Set();

      var _iterator2 = _createForOfIteratorHelper(value),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _v = _step2.value;
          rval.add(api.clone(_v));
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    } else if (types.isObject(value)) {
      rval = {};

      for (var key in value) {
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


api.buildHeaders = function () {
  var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var hasAccept = Object.keys(headers).some(function (h) {
    return h.toLowerCase() === 'accept';
  });

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


api.parseLinkHeader = function (header) {
  var rval = {}; // split on unbracketed/unquoted commas

  var entries = header.match(REGEX_LINK_HEADERS);

  for (var i = 0; i < entries.length; ++i) {
    var match = entries[i].match(REGEX_LINK_HEADER);

    if (!match) {
      continue;
    }

    var result = {
      target: match[1]
    };
    var params = match[2];

    while (match = REGEX_LINK_HEADER_PARAMS.exec(params)) {
      result[match[1]] = match[2] === undefined ? match[3] : match[2];
    }

    var rel = result['rel'] || '';

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


api.validateTypeValue = function (v, isFrame) {
  if (types.isString(v)) {
    return;
  }

  if (types.isArray(v) && v.every(function (vv) {
    return types.isString(vv);
  })) {
    return;
  }

  if (isFrame && types.isObject(v)) {
    switch (Object.keys(v).length) {
      case 0:
        // empty object is wildcard
        return;

      case 1:
        // default entry is all strings
        if ('@default' in v && api.asArray(v['@default']).every(function (vv) {
          return types.isString(vv);
        })) {
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


api.hasProperty = function (subject, property) {
  if (subject.hasOwnProperty(property)) {
    var value = subject[property];
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


api.hasValue = function (subject, property, value) {
  if (api.hasProperty(subject, property)) {
    var val = subject[property];
    var isList = graphTypes.isList(val);

    if (types.isArray(val) || isList) {
      if (isList) {
        val = val['@list'];
      }

      for (var i = 0; i < val.length; ++i) {
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


api.addValue = function (subject, property, value, options) {
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

    for (var i = 0; i < value.length; ++i) {
      api.addValue(subject, property, value[i], options);
    }
  } else if (subject.hasOwnProperty(property)) {
    // check if subject already has value if duplicates not allowed
    var hasValue = !options.allowDuplicate && api.hasValue(subject, property, value); // make property an array if value not present or always an array

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


api.getValues = function (subject, property) {
  return [].concat(subject[property] || []);
};
/**
 * Removes a property from a subject.
 *
 * @param subject the subject.
 * @param property the property.
 */


api.removeProperty = function (subject, property) {
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


api.removeValue = function (subject, property, value, options) {
  options = options || {};

  if (!('propertyIsArray' in options)) {
    options.propertyIsArray = false;
  } // filter out value


  var values = api.getValues(subject, property).filter(function (e) {
    return !api.compareValues(e, value);
  });

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


api.relabelBlankNodes = function (input, options) {
  options = options || {};
  var issuer = options.issuer || new IdentifierIssuer('_:b');
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


api.compareValues = function (v1, v2) {
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


api.compareShortestLeast = function (a, b) {
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
    for (var i = 0; i < element.length; ++i) {
      element[i] = _labelBlankNodes(issuer, element[i]);
    }
  } else if (graphTypes.isList(element)) {
    element['@list'] = _labelBlankNodes(issuer, element['@list']);
  } else if (types.isObject(element)) {
    // relabel blank node
    if (graphTypes.isBlankNode(element)) {
      element['@id'] = issuer.getId(element['@id']);
    } // recursively apply to all keys


    var keys = Object.keys(element).sort();

    for (var ki = 0; ki < keys.length; ++ki) {
      var key = keys[ki];

      if (key !== '@id') {
        element[key] = _labelBlankNodes(issuer, element[key]);
      }
    }
  }

  return element;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray */ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/construct.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");

var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct */ "./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js");

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

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

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

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

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/isNativeFunction.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeFunction.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

module.exports = _isNativeFunction;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = _isNativeReflectConstruct;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/objectWithoutProperties.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectWithoutProperties.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var objectWithoutPropertiesLoose = __webpack_require__(/*! ./objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");

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

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles */ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js");

var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit */ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js");

var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray */ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");

var nonIterableRest = __webpack_require__(/*! ./nonIterableRest */ "./node_modules/@babel/runtime/helpers/nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toArray.js":
/*!********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toArray.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles */ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js");

var iterableToArray = __webpack_require__(/*! ./iterableToArray */ "./node_modules/@babel/runtime/helpers/iterableToArray.js");

var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray */ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");

var nonIterableRest = __webpack_require__(/*! ./nonIterableRest */ "./node_modules/@babel/runtime/helpers/nonIterableRest.js");

function _toArray(arr) {
  return arrayWithHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableRest();
}

module.exports = _toArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles */ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js");

var iterableToArray = __webpack_require__(/*! ./iterableToArray */ "./node_modules/@babel/runtime/helpers/iterableToArray.js");

var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray */ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");

var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread */ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray */ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/wrapNativeSuper.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/wrapNativeSuper.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");

var isNativeFunction = __webpack_require__(/*! ./isNativeFunction */ "./node_modules/@babel/runtime/helpers/isNativeFunction.js");

var construct = __webpack_require__(/*! ./construct */ "./node_modules/@babel/runtime/helpers/construct.js");

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return construct(Class, arguments, getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

module.exports = _wrapNativeSuper;

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


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


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js"));

module.exports = function (object) {
  return serialize(object);

  function serialize(object) {
    if (object === null || (0, _typeof2["default"])(object) !== 'object' || object.toJSON != null) {
      return JSON.stringify(object);
    }

    if (Array.isArray(object) && object.length === 0) {
      return '[]';
    }

    if (Array.isArray(object) && object.length === 1) {
      return '[' + serialize(object[0]) + ']';
    }

    if (Array.isArray(object)) {
      return '[' + object.reduce(function (t, cv, ci) {
        t = ci === 1 ? serialize(t) : t;
        return t + ',' + serialize(cv);
      }) + ']';
    }

    var keys = Object.keys(object);

    if (keys.length === 0) {
      return '{}';
    }

    if (keys.length === 1) {
      return '{' + serialize(keys[0]) + ':' + serialize(object[keys[0]]) + '}';
    }

    return '{' + keys.sort().reduce(function (t, cv, ci) {
      t = ci === 1 ? serialize(t) + ':' + serialize(object[t]) : t;
      return t + ',' + serialize(cv) + ':' + serialize(object[cv]);
    }) + '}';
  }
};

/***/ }),

/***/ "./node_modules/core-js/fn/array/from.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/fn/array/from.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.string.iterator */ "./node_modules/core-js/modules/es6.string.iterator.js");
__webpack_require__(/*! ../../modules/es6.array.from */ "./node_modules/core-js/modules/es6.array.from.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/modules/_core.js").Array.from;


/***/ }),

/***/ "./node_modules/core-js/fn/array/includes.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/fn/array/includes.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es7.array.includes */ "./node_modules/core-js/modules/es7.array.includes.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/modules/_core.js").Array.includes;


/***/ }),

/***/ "./node_modules/core-js/fn/map.js":
/*!****************************************!*\
  !*** ./node_modules/core-js/fn/map.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.object.to-string */ "./node_modules/core-js/modules/es6.object.to-string.js");
__webpack_require__(/*! ../modules/es6.string.iterator */ "./node_modules/core-js/modules/es6.string.iterator.js");
__webpack_require__(/*! ../modules/web.dom.iterable */ "./node_modules/core-js/modules/web.dom.iterable.js");
__webpack_require__(/*! ../modules/es6.map */ "./node_modules/core-js/modules/es6.map.js");
__webpack_require__(/*! ../modules/es7.map.to-json */ "./node_modules/core-js/modules/es7.map.to-json.js");
__webpack_require__(/*! ../modules/es7.map.of */ "./node_modules/core-js/modules/es7.map.of.js");
__webpack_require__(/*! ../modules/es7.map.from */ "./node_modules/core-js/modules/es7.map.from.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/core-js/modules/_core.js").Map;


/***/ }),

/***/ "./node_modules/core-js/fn/object/assign.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/fn/object/assign.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.assign */ "./node_modules/core-js/modules/es6.object.assign.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/modules/_core.js").Object.assign;


/***/ }),

/***/ "./node_modules/core-js/fn/object/entries.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/fn/object/entries.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es7.object.entries */ "./node_modules/core-js/modules/es7.object.entries.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/modules/_core.js").Object.entries;


/***/ }),

/***/ "./node_modules/core-js/fn/promise.js":
/*!********************************************!*\
  !*** ./node_modules/core-js/fn/promise.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.object.to-string */ "./node_modules/core-js/modules/es6.object.to-string.js");
__webpack_require__(/*! ../modules/es6.string.iterator */ "./node_modules/core-js/modules/es6.string.iterator.js");
__webpack_require__(/*! ../modules/web.dom.iterable */ "./node_modules/core-js/modules/web.dom.iterable.js");
__webpack_require__(/*! ../modules/es6.promise */ "./node_modules/core-js/modules/es6.promise.js");
__webpack_require__(/*! ../modules/es7.promise.finally */ "./node_modules/core-js/modules/es7.promise.finally.js");
__webpack_require__(/*! ../modules/es7.promise.try */ "./node_modules/core-js/modules/es7.promise.try.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/core-js/modules/_core.js").Promise;


/***/ }),

/***/ "./node_modules/core-js/fn/set.js":
/*!****************************************!*\
  !*** ./node_modules/core-js/fn/set.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.object.to-string */ "./node_modules/core-js/modules/es6.object.to-string.js");
__webpack_require__(/*! ../modules/es6.string.iterator */ "./node_modules/core-js/modules/es6.string.iterator.js");
__webpack_require__(/*! ../modules/web.dom.iterable */ "./node_modules/core-js/modules/web.dom.iterable.js");
__webpack_require__(/*! ../modules/es6.set */ "./node_modules/core-js/modules/es6.set.js");
__webpack_require__(/*! ../modules/es7.set.to-json */ "./node_modules/core-js/modules/es7.set.to-json.js");
__webpack_require__(/*! ../modules/es7.set.of */ "./node_modules/core-js/modules/es7.set.of.js");
__webpack_require__(/*! ../modules/es7.set.from */ "./node_modules/core-js/modules/es7.set.from.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/core-js/modules/_core.js").Set;


/***/ }),

/***/ "./node_modules/core-js/fn/string/starts-with.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/fn/string/starts-with.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.string.starts-with */ "./node_modules/core-js/modules/es6.string.starts-with.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/modules/_core.js").String.startsWith;


/***/ }),

/***/ "./node_modules/core-js/fn/symbol/index.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/fn/symbol/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.symbol */ "./node_modules/core-js/modules/es6.symbol.js");
__webpack_require__(/*! ../../modules/es6.object.to-string */ "./node_modules/core-js/modules/es6.object.to-string.js");
__webpack_require__(/*! ../../modules/es7.symbol.async-iterator */ "./node_modules/core-js/modules/es7.symbol.async-iterator.js");
__webpack_require__(/*! ../../modules/es7.symbol.observable */ "./node_modules/core-js/modules/es7.symbol.observable.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/core-js/modules/_core.js").Symbol;


/***/ }),

/***/ "./node_modules/core-js/modules/_a-function.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_a-function.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_add-to-unscopables.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_add-to-unscopables.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_an-instance.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_an-instance.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_an-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_an-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-from-iterable.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-from-iterable.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-includes.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-includes.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_classof.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_classof.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_cof.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_cof.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_collection-strong.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-strong.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var redefineAll = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");
var $iterDefine = __webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/modules/_iter-define.js");
var step = __webpack_require__(/*! ./_iter-step */ "./node_modules/core-js/modules/_iter-step.js");
var setSpecies = __webpack_require__(/*! ./_set-species */ "./node_modules/core-js/modules/_set-species.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var fastKey = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").fastKey;
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_collection-to-json.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-to-json.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/modules/_classof.js");
var from = __webpack_require__(/*! ./_array-from-iterable */ "./node_modules/core-js/modules/_array-from-iterable.js");
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_collection.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_collection.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var redefineAll = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js");
var meta = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var $iterDetect = __webpack_require__(/*! ./_iter-detect */ "./node_modules/core-js/modules/_iter-detect.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ "./node_modules/core-js/modules/_inherit-if-required.js");

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_core.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_create-property.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_create-property.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_ctx.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_ctx.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
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

/***/ "./node_modules/core-js/modules/_defined.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_defined.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_descriptors.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_descriptors.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_dom-create.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_dom-create.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/modules/_enum-bug-keys.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-bug-keys.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "./node_modules/core-js/modules/_enum-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-keys.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_export.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_export.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "./node_modules/core-js/modules/_fails-is-regexp.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_fails-is-regexp.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_fails.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_fails.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_for-of.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_for-of.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var call = __webpack_require__(/*! ./_iter-call */ "./node_modules/core-js/modules/_iter-call.js");
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "./node_modules/core-js/modules/_is-array-iter.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/core-js/modules/core.get-iterator-method.js");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "./node_modules/core-js/modules/_function-to-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_function-to-string.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('native-function-to-string', Function.toString);


/***/ }),

/***/ "./node_modules/core-js/modules/_global.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_has.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_has.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_hide.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_hide.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_html.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_html.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "./node_modules/core-js/modules/_ie8-dom-define.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_ie8-dom-define.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_inherit-if-required.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_inherit-if-required.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var setPrototypeOf = __webpack_require__(/*! ./_set-proto */ "./node_modules/core-js/modules/_set-proto.js").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_invoke.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_invoke.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iobject.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_iobject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-array-iter.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array-iter.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-array.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-regexp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-regexp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var MATCH = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-call.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-call.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-create.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-create.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var descriptor = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")(IteratorPrototype, __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-define.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-define.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var $iterCreate = __webpack_require__(/*! ./_iter-create */ "./node_modules/core-js/modules/_iter-create.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-detect.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-detect.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-step.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-step.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iterators.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iterators.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/modules/_library.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_library.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/modules/_meta.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_meta.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('meta');
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var setDesc = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "./node_modules/core-js/modules/_microtask.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_microtask.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var macrotask = __webpack_require__(/*! ./_task */ "./node_modules/core-js/modules/_task.js").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
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

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_new-promise-capability.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/_new-promise-capability.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-assign.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-assign.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-create.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-create.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var dPs = __webpack_require__(/*! ./_object-dps */ "./node_modules/core-js/modules/_object-dps.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ "./node_modules/core-js/modules/_html.js").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dps.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dps.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");

module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopd.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopd.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopn-ext.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn-ext.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopn.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/modules/_object-keys-internal.js");
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gops.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gops.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gpo.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gpo.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys-internal.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys-internal.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-pie.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-pie.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-to-array.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-to-array.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var isEnum = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js").f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || isEnum.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_perform.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_perform.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_promise-resolve.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_promise-resolve.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ "./node_modules/core-js/modules/_new-promise-capability.js");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_property-desc.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_property-desc.js ***!
  \********************************************************/
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

/***/ "./node_modules/core-js/modules/_redefine-all.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine-all.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_redefine.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var SRC = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('src');
var $toString = __webpack_require__(/*! ./_function-to-string */ "./node_modules/core-js/modules/_function-to-string.js");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "./node_modules/core-js/modules/_set-collection-from.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-collection-from.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-collection-of.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-collection-of.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-proto.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_set-proto.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js")(Function.call, __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-species.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_set-species.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-to-string-tag.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-to-string-tag.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared-key.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_shared-key.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('keys');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_shared.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/modules/_species-constructor.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_species-constructor.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_string-at.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-at.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_string-context.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-context.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(/*! ./_is-regexp */ "./node_modules/core-js/modules/_is-regexp.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_task.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_task.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var invoke = __webpack_require__(/*! ./_invoke */ "./node_modules/core-js/modules/_invoke.js");
var html = __webpack_require__(/*! ./_html */ "./node_modules/core-js/modules/_html.js");
var cel = __webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-absolute-index.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_to-absolute-index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-integer.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-integer.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-iobject.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-iobject.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-length.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-length.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-primitive.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_to-primitive.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/modules/_uid.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_uid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_user-agent.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_user-agent.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "./node_modules/core-js/modules/_validate-collection.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_validate-collection.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_wks-define.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-define.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/core-js/modules/_wks-ext.js");
var defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_wks-ext.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-ext.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");


/***/ }),

/***/ "./node_modules/core-js/modules/_wks.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_wks.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('wks');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
var Symbol = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "./node_modules/core-js/modules/core.get-iterator-method.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/core.get-iterator-method.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/modules/_classof.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
module.exports = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.from.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.from.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var call = __webpack_require__(/*! ./_iter-call */ "./node_modules/core-js/modules/_iter-call.js");
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "./node_modules/core-js/modules/_is-array-iter.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var createProperty = __webpack_require__(/*! ./_create-property */ "./node_modules/core-js/modules/_create-property.js");
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/core-js/modules/core.get-iterator-method.js");

$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ "./node_modules/core-js/modules/_iter-detect.js")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.iterator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js");
var step = __webpack_require__(/*! ./_iter-step */ "./node_modules/core-js/modules/_iter-step.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/modules/_iter-define.js")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "./node_modules/core-js/modules/es6.map.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.map.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ "./node_modules/core-js/modules/_collection-strong.js");
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(/*! ./_collection */ "./node_modules/core-js/modules/_collection.js")(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.assign.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.assign.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ "./node_modules/core-js/modules/_object-assign.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.to-string.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.to-string.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/modules/_classof.js");
var test = {};
test[__webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js")(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),

/***/ "./node_modules/core-js/modules/es6.promise.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.promise.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/modules/_classof.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "./node_modules/core-js/modules/_species-constructor.js");
var task = __webpack_require__(/*! ./_task */ "./node_modules/core-js/modules/_task.js").set;
var microtask = __webpack_require__(/*! ./_microtask */ "./node_modules/core-js/modules/_microtask.js")();
var newPromiseCapabilityModule = __webpack_require__(/*! ./_new-promise-capability */ "./node_modules/core-js/modules/_new-promise-capability.js");
var perform = __webpack_require__(/*! ./_perform */ "./node_modules/core-js/modules/_perform.js");
var userAgent = __webpack_require__(/*! ./_user-agent */ "./node_modules/core-js/modules/_user-agent.js");
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ "./node_modules/core-js/modules/_promise-resolve.js");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
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
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js")($Promise, PROMISE);
__webpack_require__(/*! ./_set-species */ "./node_modules/core-js/modules/_set-species.js")(PROMISE);
Wrapper = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./_iter-detect */ "./node_modules/core-js/modules/_iter-detect.js")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.set.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.set.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ "./node_modules/core-js/modules/_collection-strong.js");
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(/*! ./_collection */ "./node_modules/core-js/modules/_collection.js")(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.iterator.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.iterator.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ "./node_modules/core-js/modules/_string-at.js")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/modules/_iter-define.js")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.starts-with.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.starts-with.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var context = __webpack_require__(/*! ./_string-context */ "./node_modules/core-js/modules/_string-context.js");
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ "./node_modules/core-js/modules/_fails-is-regexp.js")(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.symbol.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.symbol.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var META = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").KEY;
var $fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/core-js/modules/_wks-ext.js");
var wksDefine = __webpack_require__(/*! ./_wks-define */ "./node_modules/core-js/modules/_wks-define.js");
var enumKeys = __webpack_require__(/*! ./_enum-keys */ "./node_modules/core-js/modules/_enum-keys.js");
var isArray = __webpack_require__(/*! ./_is-array */ "./node_modules/core-js/modules/_is-array.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var _create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ "./node_modules/core-js/modules/_object-gopn-ext.js");
var $GOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js");
var $GOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js");
var $DP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var $keys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js").f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "./node_modules/core-js/modules/es7.array.includes.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.includes.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $includes = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/modules/_array-includes.js")(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")('includes');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.map.from.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.from.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(/*! ./_set-collection-from */ "./node_modules/core-js/modules/_set-collection-from.js")('Map');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.map.of.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.of.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(/*! ./_set-collection-of */ "./node_modules/core-js/modules/_set-collection-of.js")('Map');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.map.to-json.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.to-json.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(/*! ./_collection-to-json */ "./node_modules/core-js/modules/_collection-to-json.js")('Map') });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.object.entries.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.entries.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $entries = __webpack_require__(/*! ./_object-to-array */ "./node_modules/core-js/modules/_object-to-array.js")(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es7.promise.finally.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.promise.finally.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "./node_modules/core-js/modules/_species-constructor.js");
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ "./node_modules/core-js/modules/_promise-resolve.js");

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.promise.try.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.promise.try.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ "./node_modules/core-js/modules/_new-promise-capability.js");
var perform = __webpack_require__(/*! ./_perform */ "./node_modules/core-js/modules/_perform.js");

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.set.from.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.from.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(/*! ./_set-collection-from */ "./node_modules/core-js/modules/_set-collection-from.js")('Set');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.set.of.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.of.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(/*! ./_set-collection-of */ "./node_modules/core-js/modules/_set-collection-of.js")('Set');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.set.to-json.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.to-json.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(/*! ./_collection-to-json */ "./node_modules/core-js/modules/_collection-to-json.js")('Set') });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.symbol.async-iterator.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.symbol.async-iterator.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ "./node_modules/core-js/modules/_wks-define.js")('asyncIterator');


/***/ }),

/***/ "./node_modules/core-js/modules/es7.symbol.observable.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.symbol.observable.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ "./node_modules/core-js/modules/_wks-define.js")('observable');


/***/ }),

/***/ "./node_modules/core-js/modules/web.dom.iterable.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom.iterable.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(/*! ./es6.array.iterator */ "./node_modules/core-js/modules/es6.array.iterator.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "./node_modules/lru-cache/index.js":
/*!*****************************************!*\
  !*** ./node_modules/lru-cache/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// A linked list to keep track of recently-used-ness
const Yallist = __webpack_require__(/*! yallist */ "./node_modules/yallist/yallist.js")

const MAX = Symbol('max')
const LENGTH = Symbol('length')
const LENGTH_CALCULATOR = Symbol('lengthCalculator')
const ALLOW_STALE = Symbol('allowStale')
const MAX_AGE = Symbol('maxAge')
const DISPOSE = Symbol('dispose')
const NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet')
const LRU_LIST = Symbol('lruList')
const CACHE = Symbol('cache')
const UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet')

const naiveLength = () => 1

// lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.
class LRUCache {
  constructor (options) {
    if (typeof options === 'number')
      options = { max: options }

    if (!options)
      options = {}

    if (options.max && (typeof options.max !== 'number' || options.max < 0))
      throw new TypeError('max must be a non-negative number')
    // Kind of weird to have a default max of Infinity, but oh well.
    const max = this[MAX] = options.max || Infinity

    const lc = options.length || naiveLength
    this[LENGTH_CALCULATOR] = (typeof lc !== 'function') ? naiveLength : lc
    this[ALLOW_STALE] = options.stale || false
    if (options.maxAge && typeof options.maxAge !== 'number')
      throw new TypeError('maxAge must be a number')
    this[MAX_AGE] = options.maxAge || 0
    this[DISPOSE] = options.dispose
    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false
    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false
    this.reset()
  }

  // resize the cache when the max changes.
  set max (mL) {
    if (typeof mL !== 'number' || mL < 0)
      throw new TypeError('max must be a non-negative number')

    this[MAX] = mL || Infinity
    trim(this)
  }
  get max () {
    return this[MAX]
  }

  set allowStale (allowStale) {
    this[ALLOW_STALE] = !!allowStale
  }
  get allowStale () {
    return this[ALLOW_STALE]
  }

  set maxAge (mA) {
    if (typeof mA !== 'number')
      throw new TypeError('maxAge must be a non-negative number')

    this[MAX_AGE] = mA
    trim(this)
  }
  get maxAge () {
    return this[MAX_AGE]
  }

  // resize the cache when the lengthCalculator changes.
  set lengthCalculator (lC) {
    if (typeof lC !== 'function')
      lC = naiveLength

    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC
      this[LENGTH] = 0
      this[LRU_LIST].forEach(hit => {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key)
        this[LENGTH] += hit.length
      })
    }
    trim(this)
  }
  get lengthCalculator () { return this[LENGTH_CALCULATOR] }

  get length () { return this[LENGTH] }
  get itemCount () { return this[LRU_LIST].length }

  rforEach (fn, thisp) {
    thisp = thisp || this
    for (let walker = this[LRU_LIST].tail; walker !== null;) {
      const prev = walker.prev
      forEachStep(this, fn, walker, thisp)
      walker = prev
    }
  }

  forEach (fn, thisp) {
    thisp = thisp || this
    for (let walker = this[LRU_LIST].head; walker !== null;) {
      const next = walker.next
      forEachStep(this, fn, walker, thisp)
      walker = next
    }
  }

  keys () {
    return this[LRU_LIST].toArray().map(k => k.key)
  }

  values () {
    return this[LRU_LIST].toArray().map(k => k.value)
  }

  reset () {
    if (this[DISPOSE] &&
        this[LRU_LIST] &&
        this[LRU_LIST].length) {
      this[LRU_LIST].forEach(hit => this[DISPOSE](hit.key, hit.value))
    }

    this[CACHE] = new Map() // hash of items by key
    this[LRU_LIST] = new Yallist() // list of items in order of use recency
    this[LENGTH] = 0 // length of items in the list
  }

  dump () {
    return this[LRU_LIST].map(hit =>
      isStale(this, hit) ? false : {
        k: hit.key,
        v: hit.value,
        e: hit.now + (hit.maxAge || 0)
      }).toArray().filter(h => h)
  }

  dumpLru () {
    return this[LRU_LIST]
  }

  set (key, value, maxAge) {
    maxAge = maxAge || this[MAX_AGE]

    if (maxAge && typeof maxAge !== 'number')
      throw new TypeError('maxAge must be a number')

    const now = maxAge ? Date.now() : 0
    const len = this[LENGTH_CALCULATOR](value, key)

    if (this[CACHE].has(key)) {
      if (len > this[MAX]) {
        del(this, this[CACHE].get(key))
        return false
      }

      const node = this[CACHE].get(key)
      const item = node.value

      // dispose of the old one before overwriting
      // split out into 2 ifs for better coverage tracking
      if (this[DISPOSE]) {
        if (!this[NO_DISPOSE_ON_SET])
          this[DISPOSE](key, item.value)
      }

      item.now = now
      item.maxAge = maxAge
      item.value = value
      this[LENGTH] += len - item.length
      item.length = len
      this.get(key)
      trim(this)
      return true
    }

    const hit = new Entry(key, value, len, now, maxAge)

    // oversized objects fall out of cache automatically.
    if (hit.length > this[MAX]) {
      if (this[DISPOSE])
        this[DISPOSE](key, value)

      return false
    }

    this[LENGTH] += hit.length
    this[LRU_LIST].unshift(hit)
    this[CACHE].set(key, this[LRU_LIST].head)
    trim(this)
    return true
  }

  has (key) {
    if (!this[CACHE].has(key)) return false
    const hit = this[CACHE].get(key).value
    return !isStale(this, hit)
  }

  get (key) {
    return get(this, key, true)
  }

  peek (key) {
    return get(this, key, false)
  }

  pop () {
    const node = this[LRU_LIST].tail
    if (!node)
      return null

    del(this, node)
    return node.value
  }

  del (key) {
    del(this, this[CACHE].get(key))
  }

  load (arr) {
    // reset the cache
    this.reset()

    const now = Date.now()
    // A previous serialized cache has the most recent items first
    for (let l = arr.length - 1; l >= 0; l--) {
      const hit = arr[l]
      const expiresAt = hit.e || 0
      if (expiresAt === 0)
        // the item was created without expiration in a non aged cache
        this.set(hit.k, hit.v)
      else {
        const maxAge = expiresAt - now
        // dont add already expired items
        if (maxAge > 0) {
          this.set(hit.k, hit.v, maxAge)
        }
      }
    }
  }

  prune () {
    this[CACHE].forEach((value, key) => get(this, key, false))
  }
}

const get = (self, key, doUse) => {
  const node = self[CACHE].get(key)
  if (node) {
    const hit = node.value
    if (isStale(self, hit)) {
      del(self, node)
      if (!self[ALLOW_STALE])
        return undefined
    } else {
      if (doUse) {
        if (self[UPDATE_AGE_ON_GET])
          node.value.now = Date.now()
        self[LRU_LIST].unshiftNode(node)
      }
    }
    return hit.value
  }
}

const isStale = (self, hit) => {
  if (!hit || (!hit.maxAge && !self[MAX_AGE]))
    return false

  const diff = Date.now() - hit.now
  return hit.maxAge ? diff > hit.maxAge
    : self[MAX_AGE] && (diff > self[MAX_AGE])
}

const trim = self => {
  if (self[LENGTH] > self[MAX]) {
    for (let walker = self[LRU_LIST].tail;
      self[LENGTH] > self[MAX] && walker !== null;) {
      // We know that we're about to delete this one, and also
      // what the next least recently used key will be, so just
      // go ahead and set it now.
      const prev = walker.prev
      del(self, walker)
      walker = prev
    }
  }
}

const del = (self, node) => {
  if (node) {
    const hit = node.value
    if (self[DISPOSE])
      self[DISPOSE](hit.key, hit.value)

    self[LENGTH] -= hit.length
    self[CACHE].delete(hit.key)
    self[LRU_LIST].removeNode(node)
  }
}

class Entry {
  constructor (key, value, length, now, maxAge) {
    this.key = key
    this.value = value
    this.length = length
    this.now = now
    this.maxAge = maxAge || 0
  }
}

const forEachStep = (self, fn, node, thisp) => {
  let hit = node.value
  if (isStale(self, hit)) {
    del(self, node)
    if (!self[ALLOW_STALE])
      hit = undefined
  }
  if (hit)
    fn.call(thisp, hit.value, hit.key, self)
}

module.exports = LRUCache


/***/ }),

/***/ "./node_modules/node-forge/lib/baseN.js":
/*!**********************************************!*\
  !*** ./node_modules/node-forge/lib/baseN.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Base-N/Base-X encoding/decoding functions.
 *
 * Original implementation from base-x:
 * https://github.com/cryptocoinjs/base-x
 *
 * Which is MIT licensed:
 *
 * The MIT License (MIT)
 *
 * Copyright base-x contributors (c) 2016
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
var api = {};
module.exports = api;

// baseN alphabet indexes
var _reverseAlphabets = {};

/**
 * BaseN-encodes a Uint8Array using the given alphabet.
 *
 * @param input the Uint8Array to encode.
 * @param maxline the maximum number of encoded characters per line to use,
 *          defaults to none.
 *
 * @return the baseN-encoded output string.
 */
api.encode = function(input, alphabet, maxline) {
  if(typeof alphabet !== 'string') {
    throw new TypeError('"alphabet" must be a string.');
  }
  if(maxline !== undefined && typeof maxline !== 'number') {
    throw new TypeError('"maxline" must be a number.');
  }

  var output = '';

  if(!(input instanceof Uint8Array)) {
    // assume forge byte buffer
    output = _encodeWithByteBuffer(input, alphabet);
  } else {
    var i = 0;
    var base = alphabet.length;
    var first = alphabet.charAt(0);
    var digits = [0];
    for(i = 0; i < input.length; ++i) {
      for(var j = 0, carry = input[i]; j < digits.length; ++j) {
        carry += digits[j] << 8;
        digits[j] = carry % base;
        carry = (carry / base) | 0;
      }

      while(carry > 0) {
        digits.push(carry % base);
        carry = (carry / base) | 0;
      }
    }

    // deal with leading zeros
    for(i = 0; input[i] === 0 && i < input.length - 1; ++i) {
      output += first;
    }
    // convert digits to a string
    for(i = digits.length - 1; i >= 0; --i) {
      output += alphabet[digits[i]];
    }
  }

  if(maxline) {
    var regex = new RegExp('.{1,' + maxline + '}', 'g');
    output = output.match(regex).join('\r\n');
  }

  return output;
};

/**
 * Decodes a baseN-encoded (using the given alphabet) string to a
 * Uint8Array.
 *
 * @param input the baseN-encoded input string.
 *
 * @return the Uint8Array.
 */
api.decode = function(input, alphabet) {
  if(typeof input !== 'string') {
    throw new TypeError('"input" must be a string.');
  }
  if(typeof alphabet !== 'string') {
    throw new TypeError('"alphabet" must be a string.');
  }

  var table = _reverseAlphabets[alphabet];
  if(!table) {
    // compute reverse alphabet
    table = _reverseAlphabets[alphabet] = [];
    for(var i = 0; i < alphabet.length; ++i) {
      table[alphabet.charCodeAt(i)] = i;
    }
  }

  // remove whitespace characters
  input = input.replace(/\s/g, '');

  var base = alphabet.length;
  var first = alphabet.charAt(0);
  var bytes = [0];
  for(var i = 0; i < input.length; i++) {
    var value = table[input.charCodeAt(i)];
    if(value === undefined) {
      return;
    }

    for(var j = 0, carry = value; j < bytes.length; ++j) {
      carry += bytes[j] * base;
      bytes[j] = carry & 0xff;
      carry >>= 8;
    }

    while(carry > 0) {
      bytes.push(carry & 0xff);
      carry >>= 8;
    }
  }

  // deal with leading zeros
  for(var k = 0; input[k] === first && k < input.length - 1; ++k) {
    bytes.push(0);
  }

  if(typeof Buffer !== 'undefined') {
    return Buffer.from(bytes.reverse());
  }

  return new Uint8Array(bytes.reverse());
};

function _encodeWithByteBuffer(input, alphabet) {
  var i = 0;
  var base = alphabet.length;
  var first = alphabet.charAt(0);
  var digits = [0];
  for(i = 0; i < input.length(); ++i) {
    for(var j = 0, carry = input.at(i); j < digits.length; ++j) {
      carry += digits[j] << 8;
      digits[j] = carry % base;
      carry = (carry / base) | 0;
    }

    while(carry > 0) {
      digits.push(carry % base);
      carry = (carry / base) | 0;
    }
  }

  var output = '';

  // deal with leading zeros
  for(i = 0; input.at(i) === 0 && i < input.length() - 1; ++i) {
    output += first;
  }
  // convert digits to a string
  for(i = digits.length - 1; i >= 0; --i) {
    output += alphabet[digits[i]];
  }

  return output;
}


/***/ }),

/***/ "./node_modules/node-forge/lib/forge.js":
/*!**********************************************!*\
  !*** ./node_modules/node-forge/lib/forge.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Node.js module for Forge.
 *
 * @author Dave Longley
 *
 * Copyright 2011-2016 Digital Bazaar, Inc.
 */
module.exports = {
  // default options
  options: {
    usePureJavaScript: false
  }
};


/***/ }),

/***/ "./node_modules/node-forge/lib/md.js":
/*!*******************************************!*\
  !*** ./node_modules/node-forge/lib/md.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Node.js module for Forge message digests.
 *
 * @author Dave Longley
 *
 * Copyright 2011-2017 Digital Bazaar, Inc.
 */
var forge = __webpack_require__(/*! ./forge */ "./node_modules/node-forge/lib/forge.js");

module.exports = forge.md = forge.md || {};
forge.md.algorithms = forge.md.algorithms || {};


/***/ }),

/***/ "./node_modules/node-forge/lib/sha1.js":
/*!*********************************************!*\
  !*** ./node_modules/node-forge/lib/sha1.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Secure Hash Algorithm with 160-bit digest (SHA-1) implementation.
 *
 * @author Dave Longley
 *
 * Copyright (c) 2010-2015 Digital Bazaar, Inc.
 */
var forge = __webpack_require__(/*! ./forge */ "./node_modules/node-forge/lib/forge.js");
__webpack_require__(/*! ./md */ "./node_modules/node-forge/lib/md.js");
__webpack_require__(/*! ./util */ "./node_modules/node-forge/lib/util.js");

var sha1 = module.exports = forge.sha1 = forge.sha1 || {};
forge.md.sha1 = forge.md.algorithms.sha1 = sha1;

/**
 * Creates a SHA-1 message digest object.
 *
 * @return a message digest object.
 */
sha1.create = function() {
  // do initialization as necessary
  if(!_initialized) {
    _init();
  }

  // SHA-1 state contains five 32-bit integers
  var _state = null;

  // input buffer
  var _input = forge.util.createBuffer();

  // used for word storage
  var _w = new Array(80);

  // message digest object
  var md = {
    algorithm: 'sha1',
    blockLength: 64,
    digestLength: 20,
    // 56-bit length of message so far (does not including padding)
    messageLength: 0,
    // true message length
    fullMessageLength: null,
    // size of message length in bytes
    messageLengthSize: 8
  };

  /**
   * Starts the digest.
   *
   * @return this digest object.
   */
  md.start = function() {
    // up to 56-bit message length for convenience
    md.messageLength = 0;

    // full message length (set md.messageLength64 for backwards-compatibility)
    md.fullMessageLength = md.messageLength64 = [];
    var int32s = md.messageLengthSize / 4;
    for(var i = 0; i < int32s; ++i) {
      md.fullMessageLength.push(0);
    }
    _input = forge.util.createBuffer();
    _state = {
      h0: 0x67452301,
      h1: 0xEFCDAB89,
      h2: 0x98BADCFE,
      h3: 0x10325476,
      h4: 0xC3D2E1F0
    };
    return md;
  };
  // start digest automatically for first time
  md.start();

  /**
   * Updates the digest with the given message input. The given input can
   * treated as raw input (no encoding will be applied) or an encoding of
   * 'utf8' maybe given to encode the input using UTF-8.
   *
   * @param msg the message input to update with.
   * @param encoding the encoding to use (default: 'raw', other: 'utf8').
   *
   * @return this digest object.
   */
  md.update = function(msg, encoding) {
    if(encoding === 'utf8') {
      msg = forge.util.encodeUtf8(msg);
    }

    // update message length
    var len = msg.length;
    md.messageLength += len;
    len = [(len / 0x100000000) >>> 0, len >>> 0];
    for(var i = md.fullMessageLength.length - 1; i >= 0; --i) {
      md.fullMessageLength[i] += len[1];
      len[1] = len[0] + ((md.fullMessageLength[i] / 0x100000000) >>> 0);
      md.fullMessageLength[i] = md.fullMessageLength[i] >>> 0;
      len[0] = ((len[1] / 0x100000000) >>> 0);
    }

    // add bytes to input buffer
    _input.putBytes(msg);

    // process bytes
    _update(_state, _w, _input);

    // compact input buffer every 2K or if empty
    if(_input.read > 2048 || _input.length() === 0) {
      _input.compact();
    }

    return md;
  };

  /**
   * Produces the digest.
   *
   * @return a byte buffer containing the digest value.
   */
  md.digest = function() {
    /* Note: Here we copy the remaining bytes in the input buffer and
    add the appropriate SHA-1 padding. Then we do the final update
    on a copy of the state so that if the user wants to get
    intermediate digests they can do so. */

    /* Determine the number of bytes that must be added to the message
    to ensure its length is congruent to 448 mod 512. In other words,
    the data to be digested must be a multiple of 512 bits (or 128 bytes).
    This data includes the message, some padding, and the length of the
    message. Since the length of the message will be encoded as 8 bytes (64
    bits), that means that the last segment of the data must have 56 bytes
    (448 bits) of message and padding. Therefore, the length of the message
    plus the padding must be congruent to 448 mod 512 because
    512 - 128 = 448.

    In order to fill up the message length it must be filled with
    padding that begins with 1 bit followed by all 0 bits. Padding
    must *always* be present, so if the message length is already
    congruent to 448 mod 512, then 512 padding bits must be added. */

    var finalBlock = forge.util.createBuffer();
    finalBlock.putBytes(_input.bytes());

    // compute remaining size to be digested (include message length size)
    var remaining = (
      md.fullMessageLength[md.fullMessageLength.length - 1] +
      md.messageLengthSize);

    // add padding for overflow blockSize - overflow
    // _padding starts with 1 byte with first bit is set (byte value 128), then
    // there may be up to (blockSize - 1) other pad bytes
    var overflow = remaining & (md.blockLength - 1);
    finalBlock.putBytes(_padding.substr(0, md.blockLength - overflow));

    // serialize message length in bits in big-endian order; since length
    // is stored in bytes we multiply by 8 and add carry from next int
    var next, carry;
    var bits = md.fullMessageLength[0] * 8;
    for(var i = 0; i < md.fullMessageLength.length - 1; ++i) {
      next = md.fullMessageLength[i + 1] * 8;
      carry = (next / 0x100000000) >>> 0;
      bits += carry;
      finalBlock.putInt32(bits >>> 0);
      bits = next >>> 0;
    }
    finalBlock.putInt32(bits);

    var s2 = {
      h0: _state.h0,
      h1: _state.h1,
      h2: _state.h2,
      h3: _state.h3,
      h4: _state.h4
    };
    _update(s2, _w, finalBlock);
    var rval = forge.util.createBuffer();
    rval.putInt32(s2.h0);
    rval.putInt32(s2.h1);
    rval.putInt32(s2.h2);
    rval.putInt32(s2.h3);
    rval.putInt32(s2.h4);
    return rval;
  };

  return md;
};

// sha-1 padding bytes not initialized yet
var _padding = null;
var _initialized = false;

/**
 * Initializes the constant tables.
 */
function _init() {
  // create padding
  _padding = String.fromCharCode(128);
  _padding += forge.util.fillString(String.fromCharCode(0x00), 64);

  // now initialized
  _initialized = true;
}

/**
 * Updates a SHA-1 state with the given byte buffer.
 *
 * @param s the SHA-1 state to update.
 * @param w the array to use to store words.
 * @param bytes the byte buffer to update with.
 */
function _update(s, w, bytes) {
  // consume 512 bit (64 byte) chunks
  var t, a, b, c, d, e, f, i;
  var len = bytes.length();
  while(len >= 64) {
    // the w array will be populated with sixteen 32-bit big-endian words
    // and then extended into 80 32-bit words according to SHA-1 algorithm
    // and for 32-79 using Max Locktyukhin's optimization

    // initialize hash value for this chunk
    a = s.h0;
    b = s.h1;
    c = s.h2;
    d = s.h3;
    e = s.h4;

    // round 1
    for(i = 0; i < 16; ++i) {
      t = bytes.getInt32();
      w[i] = t;
      f = d ^ (b & (c ^ d));
      t = ((a << 5) | (a >>> 27)) + f + e + 0x5A827999 + t;
      e = d;
      d = c;
      // `>>> 0` necessary to avoid iOS/Safari 10 optimization bug
      c = ((b << 30) | (b >>> 2)) >>> 0;
      b = a;
      a = t;
    }
    for(; i < 20; ++i) {
      t = (w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16]);
      t = (t << 1) | (t >>> 31);
      w[i] = t;
      f = d ^ (b & (c ^ d));
      t = ((a << 5) | (a >>> 27)) + f + e + 0x5A827999 + t;
      e = d;
      d = c;
      // `>>> 0` necessary to avoid iOS/Safari 10 optimization bug
      c = ((b << 30) | (b >>> 2)) >>> 0;
      b = a;
      a = t;
    }
    // round 2
    for(; i < 32; ++i) {
      t = (w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16]);
      t = (t << 1) | (t >>> 31);
      w[i] = t;
      f = b ^ c ^ d;
      t = ((a << 5) | (a >>> 27)) + f + e + 0x6ED9EBA1 + t;
      e = d;
      d = c;
      // `>>> 0` necessary to avoid iOS/Safari 10 optimization bug
      c = ((b << 30) | (b >>> 2)) >>> 0;
      b = a;
      a = t;
    }
    for(; i < 40; ++i) {
      t = (w[i - 6] ^ w[i - 16] ^ w[i - 28] ^ w[i - 32]);
      t = (t << 2) | (t >>> 30);
      w[i] = t;
      f = b ^ c ^ d;
      t = ((a << 5) | (a >>> 27)) + f + e + 0x6ED9EBA1 + t;
      e = d;
      d = c;
      // `>>> 0` necessary to avoid iOS/Safari 10 optimization bug
      c = ((b << 30) | (b >>> 2)) >>> 0;
      b = a;
      a = t;
    }
    // round 3
    for(; i < 60; ++i) {
      t = (w[i - 6] ^ w[i - 16] ^ w[i - 28] ^ w[i - 32]);
      t = (t << 2) | (t >>> 30);
      w[i] = t;
      f = (b & c) | (d & (b ^ c));
      t = ((a << 5) | (a >>> 27)) + f + e + 0x8F1BBCDC + t;
      e = d;
      d = c;
      // `>>> 0` necessary to avoid iOS/Safari 10 optimization bug
      c = ((b << 30) | (b >>> 2)) >>> 0;
      b = a;
      a = t;
    }
    // round 4
    for(; i < 80; ++i) {
      t = (w[i - 6] ^ w[i - 16] ^ w[i - 28] ^ w[i - 32]);
      t = (t << 2) | (t >>> 30);
      w[i] = t;
      f = b ^ c ^ d;
      t = ((a << 5) | (a >>> 27)) + f + e + 0xCA62C1D6 + t;
      e = d;
      d = c;
      // `>>> 0` necessary to avoid iOS/Safari 10 optimization bug
      c = ((b << 30) | (b >>> 2)) >>> 0;
      b = a;
      a = t;
    }

    // update hash state
    s.h0 = (s.h0 + a) | 0;
    s.h1 = (s.h1 + b) | 0;
    s.h2 = (s.h2 + c) | 0;
    s.h3 = (s.h3 + d) | 0;
    s.h4 = (s.h4 + e) | 0;

    len -= 64;
  }
}


/***/ }),

/***/ "./node_modules/node-forge/lib/sha256.js":
/*!***********************************************!*\
  !*** ./node_modules/node-forge/lib/sha256.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Secure Hash Algorithm with 256-bit digest (SHA-256) implementation.
 *
 * See FIPS 180-2 for details.
 *
 * @author Dave Longley
 *
 * Copyright (c) 2010-2015 Digital Bazaar, Inc.
 */
var forge = __webpack_require__(/*! ./forge */ "./node_modules/node-forge/lib/forge.js");
__webpack_require__(/*! ./md */ "./node_modules/node-forge/lib/md.js");
__webpack_require__(/*! ./util */ "./node_modules/node-forge/lib/util.js");

var sha256 = module.exports = forge.sha256 = forge.sha256 || {};
forge.md.sha256 = forge.md.algorithms.sha256 = sha256;

/**
 * Creates a SHA-256 message digest object.
 *
 * @return a message digest object.
 */
sha256.create = function() {
  // do initialization as necessary
  if(!_initialized) {
    _init();
  }

  // SHA-256 state contains eight 32-bit integers
  var _state = null;

  // input buffer
  var _input = forge.util.createBuffer();

  // used for word storage
  var _w = new Array(64);

  // message digest object
  var md = {
    algorithm: 'sha256',
    blockLength: 64,
    digestLength: 32,
    // 56-bit length of message so far (does not including padding)
    messageLength: 0,
    // true message length
    fullMessageLength: null,
    // size of message length in bytes
    messageLengthSize: 8
  };

  /**
   * Starts the digest.
   *
   * @return this digest object.
   */
  md.start = function() {
    // up to 56-bit message length for convenience
    md.messageLength = 0;

    // full message length (set md.messageLength64 for backwards-compatibility)
    md.fullMessageLength = md.messageLength64 = [];
    var int32s = md.messageLengthSize / 4;
    for(var i = 0; i < int32s; ++i) {
      md.fullMessageLength.push(0);
    }
    _input = forge.util.createBuffer();
    _state = {
      h0: 0x6A09E667,
      h1: 0xBB67AE85,
      h2: 0x3C6EF372,
      h3: 0xA54FF53A,
      h4: 0x510E527F,
      h5: 0x9B05688C,
      h6: 0x1F83D9AB,
      h7: 0x5BE0CD19
    };
    return md;
  };
  // start digest automatically for first time
  md.start();

  /**
   * Updates the digest with the given message input. The given input can
   * treated as raw input (no encoding will be applied) or an encoding of
   * 'utf8' maybe given to encode the input using UTF-8.
   *
   * @param msg the message input to update with.
   * @param encoding the encoding to use (default: 'raw', other: 'utf8').
   *
   * @return this digest object.
   */
  md.update = function(msg, encoding) {
    if(encoding === 'utf8') {
      msg = forge.util.encodeUtf8(msg);
    }

    // update message length
    var len = msg.length;
    md.messageLength += len;
    len = [(len / 0x100000000) >>> 0, len >>> 0];
    for(var i = md.fullMessageLength.length - 1; i >= 0; --i) {
      md.fullMessageLength[i] += len[1];
      len[1] = len[0] + ((md.fullMessageLength[i] / 0x100000000) >>> 0);
      md.fullMessageLength[i] = md.fullMessageLength[i] >>> 0;
      len[0] = ((len[1] / 0x100000000) >>> 0);
    }

    // add bytes to input buffer
    _input.putBytes(msg);

    // process bytes
    _update(_state, _w, _input);

    // compact input buffer every 2K or if empty
    if(_input.read > 2048 || _input.length() === 0) {
      _input.compact();
    }

    return md;
  };

  /**
   * Produces the digest.
   *
   * @return a byte buffer containing the digest value.
   */
  md.digest = function() {
    /* Note: Here we copy the remaining bytes in the input buffer and
    add the appropriate SHA-256 padding. Then we do the final update
    on a copy of the state so that if the user wants to get
    intermediate digests they can do so. */

    /* Determine the number of bytes that must be added to the message
    to ensure its length is congruent to 448 mod 512. In other words,
    the data to be digested must be a multiple of 512 bits (or 128 bytes).
    This data includes the message, some padding, and the length of the
    message. Since the length of the message will be encoded as 8 bytes (64
    bits), that means that the last segment of the data must have 56 bytes
    (448 bits) of message and padding. Therefore, the length of the message
    plus the padding must be congruent to 448 mod 512 because
    512 - 128 = 448.

    In order to fill up the message length it must be filled with
    padding that begins with 1 bit followed by all 0 bits. Padding
    must *always* be present, so if the message length is already
    congruent to 448 mod 512, then 512 padding bits must be added. */

    var finalBlock = forge.util.createBuffer();
    finalBlock.putBytes(_input.bytes());

    // compute remaining size to be digested (include message length size)
    var remaining = (
      md.fullMessageLength[md.fullMessageLength.length - 1] +
      md.messageLengthSize);

    // add padding for overflow blockSize - overflow
    // _padding starts with 1 byte with first bit is set (byte value 128), then
    // there may be up to (blockSize - 1) other pad bytes
    var overflow = remaining & (md.blockLength - 1);
    finalBlock.putBytes(_padding.substr(0, md.blockLength - overflow));

    // serialize message length in bits in big-endian order; since length
    // is stored in bytes we multiply by 8 and add carry from next int
    var next, carry;
    var bits = md.fullMessageLength[0] * 8;
    for(var i = 0; i < md.fullMessageLength.length - 1; ++i) {
      next = md.fullMessageLength[i + 1] * 8;
      carry = (next / 0x100000000) >>> 0;
      bits += carry;
      finalBlock.putInt32(bits >>> 0);
      bits = next >>> 0;
    }
    finalBlock.putInt32(bits);

    var s2 = {
      h0: _state.h0,
      h1: _state.h1,
      h2: _state.h2,
      h3: _state.h3,
      h4: _state.h4,
      h5: _state.h5,
      h6: _state.h6,
      h7: _state.h7
    };
    _update(s2, _w, finalBlock);
    var rval = forge.util.createBuffer();
    rval.putInt32(s2.h0);
    rval.putInt32(s2.h1);
    rval.putInt32(s2.h2);
    rval.putInt32(s2.h3);
    rval.putInt32(s2.h4);
    rval.putInt32(s2.h5);
    rval.putInt32(s2.h6);
    rval.putInt32(s2.h7);
    return rval;
  };

  return md;
};

// sha-256 padding bytes not initialized yet
var _padding = null;
var _initialized = false;

// table of constants
var _k = null;

/**
 * Initializes the constant tables.
 */
function _init() {
  // create padding
  _padding = String.fromCharCode(128);
  _padding += forge.util.fillString(String.fromCharCode(0x00), 64);

  // create K table for SHA-256
  _k = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
    0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
    0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
    0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
    0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];

  // now initialized
  _initialized = true;
}

/**
 * Updates a SHA-256 state with the given byte buffer.
 *
 * @param s the SHA-256 state to update.
 * @param w the array to use to store words.
 * @param bytes the byte buffer to update with.
 */
function _update(s, w, bytes) {
  // consume 512 bit (64 byte) chunks
  var t1, t2, s0, s1, ch, maj, i, a, b, c, d, e, f, g, h;
  var len = bytes.length();
  while(len >= 64) {
    // the w array will be populated with sixteen 32-bit big-endian words
    // and then extended into 64 32-bit words according to SHA-256
    for(i = 0; i < 16; ++i) {
      w[i] = bytes.getInt32();
    }
    for(; i < 64; ++i) {
      // XOR word 2 words ago rot right 17, rot right 19, shft right 10
      t1 = w[i - 2];
      t1 =
        ((t1 >>> 17) | (t1 << 15)) ^
        ((t1 >>> 19) | (t1 << 13)) ^
        (t1 >>> 10);
      // XOR word 15 words ago rot right 7, rot right 18, shft right 3
      t2 = w[i - 15];
      t2 =
        ((t2 >>> 7) | (t2 << 25)) ^
        ((t2 >>> 18) | (t2 << 14)) ^
        (t2 >>> 3);
      // sum(t1, word 7 ago, t2, word 16 ago) modulo 2^32
      w[i] = (t1 + w[i - 7] + t2 + w[i - 16]) | 0;
    }

    // initialize hash value for this chunk
    a = s.h0;
    b = s.h1;
    c = s.h2;
    d = s.h3;
    e = s.h4;
    f = s.h5;
    g = s.h6;
    h = s.h7;

    // round function
    for(i = 0; i < 64; ++i) {
      // Sum1(e)
      s1 =
        ((e >>> 6) | (e << 26)) ^
        ((e >>> 11) | (e << 21)) ^
        ((e >>> 25) | (e << 7));
      // Ch(e, f, g) (optimized the same way as SHA-1)
      ch = g ^ (e & (f ^ g));
      // Sum0(a)
      s0 =
        ((a >>> 2) | (a << 30)) ^
        ((a >>> 13) | (a << 19)) ^
        ((a >>> 22) | (a << 10));
      // Maj(a, b, c) (optimized the same way as SHA-1)
      maj = (a & b) | (c & (a ^ b));

      // main algorithm
      t1 = h + s1 + ch + _k[i] + w[i];
      t2 = s0 + maj;
      h = g;
      g = f;
      f = e;
      // `>>> 0` necessary to avoid iOS/Safari 10 optimization bug
      // can't truncate with `| 0`
      e = (d + t1) >>> 0;
      d = c;
      c = b;
      b = a;
      // `>>> 0` necessary to avoid iOS/Safari 10 optimization bug
      // can't truncate with `| 0`
      a = (t1 + t2) >>> 0;
    }

    // update hash state
    s.h0 = (s.h0 + a) | 0;
    s.h1 = (s.h1 + b) | 0;
    s.h2 = (s.h2 + c) | 0;
    s.h3 = (s.h3 + d) | 0;
    s.h4 = (s.h4 + e) | 0;
    s.h5 = (s.h5 + f) | 0;
    s.h6 = (s.h6 + g) | 0;
    s.h7 = (s.h7 + h) | 0;
    len -= 64;
  }
}


/***/ }),

/***/ "./node_modules/node-forge/lib/util.js":
/*!*********************************************!*\
  !*** ./node_modules/node-forge/lib/util.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Utility functions for web applications.
 *
 * @author Dave Longley
 *
 * Copyright (c) 2010-2018 Digital Bazaar, Inc.
 */
var forge = __webpack_require__(/*! ./forge */ "./node_modules/node-forge/lib/forge.js");
var baseN = __webpack_require__(/*! ./baseN */ "./node_modules/node-forge/lib/baseN.js");

/* Utilities API */
var util = module.exports = forge.util = forge.util || {};

// define setImmediate and nextTick
(function() {
  // use native nextTick (unless we're in webpack)
  // webpack (or better node-libs-browser polyfill) sets process.browser.
  // this way we can detect webpack properly
  if(typeof process !== 'undefined' && process.nextTick && !process.browser) {
    util.nextTick = process.nextTick;
    if(typeof setImmediate === 'function') {
      util.setImmediate = setImmediate;
    } else {
      // polyfill setImmediate with nextTick, older versions of node
      // (those w/o setImmediate) won't totally starve IO
      util.setImmediate = util.nextTick;
    }
    return;
  }

  // polyfill nextTick with native setImmediate
  if(typeof setImmediate === 'function') {
    util.setImmediate = function() { return setImmediate.apply(undefined, arguments); };
    util.nextTick = function(callback) {
      return setImmediate(callback);
    };
    return;
  }

  /* Note: A polyfill upgrade pattern is used here to allow combining
  polyfills. For example, MutationObserver is fast, but blocks UI updates,
  so it needs to allow UI updates periodically, so it falls back on
  postMessage or setTimeout. */

  // polyfill with setTimeout
  util.setImmediate = function(callback) {
    setTimeout(callback, 0);
  };

  // upgrade polyfill to use postMessage
  if(typeof window !== 'undefined' &&
    typeof window.postMessage === 'function') {
    var msg = 'forge.setImmediate';
    var callbacks = [];
    util.setImmediate = function(callback) {
      callbacks.push(callback);
      // only send message when one hasn't been sent in
      // the current turn of the event loop
      if(callbacks.length === 1) {
        window.postMessage(msg, '*');
      }
    };
    function handler(event) {
      if(event.source === window && event.data === msg) {
        event.stopPropagation();
        var copy = callbacks.slice();
        callbacks.length = 0;
        copy.forEach(function(callback) {
          callback();
        });
      }
    }
    window.addEventListener('message', handler, true);
  }

  // upgrade polyfill to use MutationObserver
  if(typeof MutationObserver !== 'undefined') {
    // polyfill with MutationObserver
    var now = Date.now();
    var attr = true;
    var div = document.createElement('div');
    var callbacks = [];
    new MutationObserver(function() {
      var copy = callbacks.slice();
      callbacks.length = 0;
      copy.forEach(function(callback) {
        callback();
      });
    }).observe(div, {attributes: true});
    var oldSetImmediate = util.setImmediate;
    util.setImmediate = function(callback) {
      if(Date.now() - now > 15) {
        now = Date.now();
        oldSetImmediate(callback);
      } else {
        callbacks.push(callback);
        // only trigger observer when it hasn't been triggered in
        // the current turn of the event loop
        if(callbacks.length === 1) {
          div.setAttribute('a', attr = !attr);
        }
      }
    };
  }

  util.nextTick = util.setImmediate;
})();

// check if running under Node.js
util.isNodejs =
  typeof process !== 'undefined' && process.versions && process.versions.node;


// 'self' will also work in Web Workers (instance of WorkerGlobalScope) while
// it will point to `window` in the main thread.
// To remain compatible with older browsers, we fall back to 'window' if 'self'
// is not available.
util.globalScope = (function() {
  if(util.isNodejs) {
    return global;
  }

  return typeof self === 'undefined' ? window : self;
})();

// define isArray
util.isArray = Array.isArray || function(x) {
  return Object.prototype.toString.call(x) === '[object Array]';
};

// define isArrayBuffer
util.isArrayBuffer = function(x) {
  return typeof ArrayBuffer !== 'undefined' && x instanceof ArrayBuffer;
};

// define isArrayBufferView
util.isArrayBufferView = function(x) {
  return x && util.isArrayBuffer(x.buffer) && x.byteLength !== undefined;
};

/**
 * Ensure a bits param is 8, 16, 24, or 32. Used to validate input for
 * algorithms where bit manipulation, JavaScript limitations, and/or algorithm
 * design only allow for byte operations of a limited size.
 *
 * @param n number of bits.
 *
 * Throw Error if n invalid.
 */
function _checkBitsParam(n) {
  if(!(n === 8 || n === 16 || n === 24 || n === 32)) {
    throw new Error('Only 8, 16, 24, or 32 bits supported: ' + n);
  }
}

// TODO: set ByteBuffer to best available backing
util.ByteBuffer = ByteStringBuffer;

/** Buffer w/BinaryString backing */

/**
 * Constructor for a binary string backed byte buffer.
 *
 * @param [b] the bytes to wrap (either encoded as string, one byte per
 *          character, or as an ArrayBuffer or Typed Array).
 */
function ByteStringBuffer(b) {
  // TODO: update to match DataBuffer API

  // the data in this buffer
  this.data = '';
  // the pointer for reading from this buffer
  this.read = 0;

  if(typeof b === 'string') {
    this.data = b;
  } else if(util.isArrayBuffer(b) || util.isArrayBufferView(b)) {
    if(typeof Buffer !== 'undefined' && b instanceof Buffer) {
      this.data = b.toString('binary');
    } else {
      // convert native buffer to forge buffer
      // FIXME: support native buffers internally instead
      var arr = new Uint8Array(b);
      try {
        this.data = String.fromCharCode.apply(null, arr);
      } catch(e) {
        for(var i = 0; i < arr.length; ++i) {
          this.putByte(arr[i]);
        }
      }
    }
  } else if(b instanceof ByteStringBuffer ||
    (typeof b === 'object' && typeof b.data === 'string' &&
    typeof b.read === 'number')) {
    // copy existing buffer
    this.data = b.data;
    this.read = b.read;
  }

  // used for v8 optimization
  this._constructedStringLength = 0;
}
util.ByteStringBuffer = ByteStringBuffer;

/* Note: This is an optimization for V8-based browsers. When V8 concatenates
  a string, the strings are only joined logically using a "cons string" or
  "constructed/concatenated string". These containers keep references to one
  another and can result in very large memory usage. For example, if a 2MB
  string is constructed by concatenating 4 bytes together at a time, the
  memory usage will be ~44MB; so ~22x increase. The strings are only joined
  together when an operation requiring their joining takes place, such as
  substr(). This function is called when adding data to this buffer to ensure
  these types of strings are periodically joined to reduce the memory
  footprint. */
var _MAX_CONSTRUCTED_STRING_LENGTH = 4096;
util.ByteStringBuffer.prototype._optimizeConstructedString = function(x) {
  this._constructedStringLength += x;
  if(this._constructedStringLength > _MAX_CONSTRUCTED_STRING_LENGTH) {
    // this substr() should cause the constructed string to join
    this.data.substr(0, 1);
    this._constructedStringLength = 0;
  }
};

/**
 * Gets the number of bytes in this buffer.
 *
 * @return the number of bytes in this buffer.
 */
util.ByteStringBuffer.prototype.length = function() {
  return this.data.length - this.read;
};

/**
 * Gets whether or not this buffer is empty.
 *
 * @return true if this buffer is empty, false if not.
 */
util.ByteStringBuffer.prototype.isEmpty = function() {
  return this.length() <= 0;
};

/**
 * Puts a byte in this buffer.
 *
 * @param b the byte to put.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putByte = function(b) {
  return this.putBytes(String.fromCharCode(b));
};

/**
 * Puts a byte in this buffer N times.
 *
 * @param b the byte to put.
 * @param n the number of bytes of value b to put.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.fillWithByte = function(b, n) {
  b = String.fromCharCode(b);
  var d = this.data;
  while(n > 0) {
    if(n & 1) {
      d += b;
    }
    n >>>= 1;
    if(n > 0) {
      b += b;
    }
  }
  this.data = d;
  this._optimizeConstructedString(n);
  return this;
};

/**
 * Puts bytes in this buffer.
 *
 * @param bytes the bytes (as a binary encoded string) to put.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putBytes = function(bytes) {
  this.data += bytes;
  this._optimizeConstructedString(bytes.length);
  return this;
};

/**
 * Puts a UTF-16 encoded string into this buffer.
 *
 * @param str the string to put.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putString = function(str) {
  return this.putBytes(util.encodeUtf8(str));
};

/**
 * Puts a 16-bit integer in this buffer in big-endian order.
 *
 * @param i the 16-bit integer.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putInt16 = function(i) {
  return this.putBytes(
    String.fromCharCode(i >> 8 & 0xFF) +
    String.fromCharCode(i & 0xFF));
};

/**
 * Puts a 24-bit integer in this buffer in big-endian order.
 *
 * @param i the 24-bit integer.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putInt24 = function(i) {
  return this.putBytes(
    String.fromCharCode(i >> 16 & 0xFF) +
    String.fromCharCode(i >> 8 & 0xFF) +
    String.fromCharCode(i & 0xFF));
};

/**
 * Puts a 32-bit integer in this buffer in big-endian order.
 *
 * @param i the 32-bit integer.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putInt32 = function(i) {
  return this.putBytes(
    String.fromCharCode(i >> 24 & 0xFF) +
    String.fromCharCode(i >> 16 & 0xFF) +
    String.fromCharCode(i >> 8 & 0xFF) +
    String.fromCharCode(i & 0xFF));
};

/**
 * Puts a 16-bit integer in this buffer in little-endian order.
 *
 * @param i the 16-bit integer.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putInt16Le = function(i) {
  return this.putBytes(
    String.fromCharCode(i & 0xFF) +
    String.fromCharCode(i >> 8 & 0xFF));
};

/**
 * Puts a 24-bit integer in this buffer in little-endian order.
 *
 * @param i the 24-bit integer.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putInt24Le = function(i) {
  return this.putBytes(
    String.fromCharCode(i & 0xFF) +
    String.fromCharCode(i >> 8 & 0xFF) +
    String.fromCharCode(i >> 16 & 0xFF));
};

/**
 * Puts a 32-bit integer in this buffer in little-endian order.
 *
 * @param i the 32-bit integer.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putInt32Le = function(i) {
  return this.putBytes(
    String.fromCharCode(i & 0xFF) +
    String.fromCharCode(i >> 8 & 0xFF) +
    String.fromCharCode(i >> 16 & 0xFF) +
    String.fromCharCode(i >> 24 & 0xFF));
};

/**
 * Puts an n-bit integer in this buffer in big-endian order.
 *
 * @param i the n-bit integer.
 * @param n the number of bits in the integer (8, 16, 24, or 32).
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putInt = function(i, n) {
  _checkBitsParam(n);
  var bytes = '';
  do {
    n -= 8;
    bytes += String.fromCharCode((i >> n) & 0xFF);
  } while(n > 0);
  return this.putBytes(bytes);
};

/**
 * Puts a signed n-bit integer in this buffer in big-endian order. Two's
 * complement representation is used.
 *
 * @param i the n-bit integer.
 * @param n the number of bits in the integer (8, 16, 24, or 32).
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putSignedInt = function(i, n) {
  // putInt checks n
  if(i < 0) {
    i += 2 << (n - 1);
  }
  return this.putInt(i, n);
};

/**
 * Puts the given buffer into this buffer.
 *
 * @param buffer the buffer to put into this one.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putBuffer = function(buffer) {
  return this.putBytes(buffer.getBytes());
};

/**
 * Gets a byte from this buffer and advances the read pointer by 1.
 *
 * @return the byte.
 */
util.ByteStringBuffer.prototype.getByte = function() {
  return this.data.charCodeAt(this.read++);
};

/**
 * Gets a uint16 from this buffer in big-endian order and advances the read
 * pointer by 2.
 *
 * @return the uint16.
 */
util.ByteStringBuffer.prototype.getInt16 = function() {
  var rval = (
    this.data.charCodeAt(this.read) << 8 ^
    this.data.charCodeAt(this.read + 1));
  this.read += 2;
  return rval;
};

/**
 * Gets a uint24 from this buffer in big-endian order and advances the read
 * pointer by 3.
 *
 * @return the uint24.
 */
util.ByteStringBuffer.prototype.getInt24 = function() {
  var rval = (
    this.data.charCodeAt(this.read) << 16 ^
    this.data.charCodeAt(this.read + 1) << 8 ^
    this.data.charCodeAt(this.read + 2));
  this.read += 3;
  return rval;
};

/**
 * Gets a uint32 from this buffer in big-endian order and advances the read
 * pointer by 4.
 *
 * @return the word.
 */
util.ByteStringBuffer.prototype.getInt32 = function() {
  var rval = (
    this.data.charCodeAt(this.read) << 24 ^
    this.data.charCodeAt(this.read + 1) << 16 ^
    this.data.charCodeAt(this.read + 2) << 8 ^
    this.data.charCodeAt(this.read + 3));
  this.read += 4;
  return rval;
};

/**
 * Gets a uint16 from this buffer in little-endian order and advances the read
 * pointer by 2.
 *
 * @return the uint16.
 */
util.ByteStringBuffer.prototype.getInt16Le = function() {
  var rval = (
    this.data.charCodeAt(this.read) ^
    this.data.charCodeAt(this.read + 1) << 8);
  this.read += 2;
  return rval;
};

/**
 * Gets a uint24 from this buffer in little-endian order and advances the read
 * pointer by 3.
 *
 * @return the uint24.
 */
util.ByteStringBuffer.prototype.getInt24Le = function() {
  var rval = (
    this.data.charCodeAt(this.read) ^
    this.data.charCodeAt(this.read + 1) << 8 ^
    this.data.charCodeAt(this.read + 2) << 16);
  this.read += 3;
  return rval;
};

/**
 * Gets a uint32 from this buffer in little-endian order and advances the read
 * pointer by 4.
 *
 * @return the word.
 */
util.ByteStringBuffer.prototype.getInt32Le = function() {
  var rval = (
    this.data.charCodeAt(this.read) ^
    this.data.charCodeAt(this.read + 1) << 8 ^
    this.data.charCodeAt(this.read + 2) << 16 ^
    this.data.charCodeAt(this.read + 3) << 24);
  this.read += 4;
  return rval;
};

/**
 * Gets an n-bit integer from this buffer in big-endian order and advances the
 * read pointer by ceil(n/8).
 *
 * @param n the number of bits in the integer (8, 16, 24, or 32).
 *
 * @return the integer.
 */
util.ByteStringBuffer.prototype.getInt = function(n) {
  _checkBitsParam(n);
  var rval = 0;
  do {
    // TODO: Use (rval * 0x100) if adding support for 33 to 53 bits.
    rval = (rval << 8) + this.data.charCodeAt(this.read++);
    n -= 8;
  } while(n > 0);
  return rval;
};

/**
 * Gets a signed n-bit integer from this buffer in big-endian order, using
 * two's complement, and advances the read pointer by n/8.
 *
 * @param n the number of bits in the integer (8, 16, 24, or 32).
 *
 * @return the integer.
 */
util.ByteStringBuffer.prototype.getSignedInt = function(n) {
  // getInt checks n
  var x = this.getInt(n);
  var max = 2 << (n - 2);
  if(x >= max) {
    x -= max << 1;
  }
  return x;
};

/**
 * Reads bytes out as a binary encoded string and clears them from the
 * buffer. Note that the resulting string is binary encoded (in node.js this
 * encoding is referred to as `binary`, it is *not* `utf8`).
 *
 * @param count the number of bytes to read, undefined or null for all.
 *
 * @return a binary encoded string of bytes.
 */
util.ByteStringBuffer.prototype.getBytes = function(count) {
  var rval;
  if(count) {
    // read count bytes
    count = Math.min(this.length(), count);
    rval = this.data.slice(this.read, this.read + count);
    this.read += count;
  } else if(count === 0) {
    rval = '';
  } else {
    // read all bytes, optimize to only copy when needed
    rval = (this.read === 0) ? this.data : this.data.slice(this.read);
    this.clear();
  }
  return rval;
};

/**
 * Gets a binary encoded string of the bytes from this buffer without
 * modifying the read pointer.
 *
 * @param count the number of bytes to get, omit to get all.
 *
 * @return a string full of binary encoded characters.
 */
util.ByteStringBuffer.prototype.bytes = function(count) {
  return (typeof(count) === 'undefined' ?
    this.data.slice(this.read) :
    this.data.slice(this.read, this.read + count));
};

/**
 * Gets a byte at the given index without modifying the read pointer.
 *
 * @param i the byte index.
 *
 * @return the byte.
 */
util.ByteStringBuffer.prototype.at = function(i) {
  return this.data.charCodeAt(this.read + i);
};

/**
 * Puts a byte at the given index without modifying the read pointer.
 *
 * @param i the byte index.
 * @param b the byte to put.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.setAt = function(i, b) {
  this.data = this.data.substr(0, this.read + i) +
    String.fromCharCode(b) +
    this.data.substr(this.read + i + 1);
  return this;
};

/**
 * Gets the last byte without modifying the read pointer.
 *
 * @return the last byte.
 */
util.ByteStringBuffer.prototype.last = function() {
  return this.data.charCodeAt(this.data.length - 1);
};

/**
 * Creates a copy of this buffer.
 *
 * @return the copy.
 */
util.ByteStringBuffer.prototype.copy = function() {
  var c = util.createBuffer(this.data);
  c.read = this.read;
  return c;
};

/**
 * Compacts this buffer.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.compact = function() {
  if(this.read > 0) {
    this.data = this.data.slice(this.read);
    this.read = 0;
  }
  return this;
};

/**
 * Clears this buffer.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.clear = function() {
  this.data = '';
  this.read = 0;
  return this;
};

/**
 * Shortens this buffer by triming bytes off of the end of this buffer.
 *
 * @param count the number of bytes to trim off.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.truncate = function(count) {
  var len = Math.max(0, this.length() - count);
  this.data = this.data.substr(this.read, len);
  this.read = 0;
  return this;
};

/**
 * Converts this buffer to a hexadecimal string.
 *
 * @return a hexadecimal string.
 */
util.ByteStringBuffer.prototype.toHex = function() {
  var rval = '';
  for(var i = this.read; i < this.data.length; ++i) {
    var b = this.data.charCodeAt(i);
    if(b < 16) {
      rval += '0';
    }
    rval += b.toString(16);
  }
  return rval;
};

/**
 * Converts this buffer to a UTF-16 string (standard JavaScript string).
 *
 * @return a UTF-16 string.
 */
util.ByteStringBuffer.prototype.toString = function() {
  return util.decodeUtf8(this.bytes());
};

/** End Buffer w/BinaryString backing */

/** Buffer w/UInt8Array backing */

/**
 * FIXME: Experimental. Do not use yet.
 *
 * Constructor for an ArrayBuffer-backed byte buffer.
 *
 * The buffer may be constructed from a string, an ArrayBuffer, DataView, or a
 * TypedArray.
 *
 * If a string is given, its encoding should be provided as an option,
 * otherwise it will default to 'binary'. A 'binary' string is encoded such
 * that each character is one byte in length and size.
 *
 * If an ArrayBuffer, DataView, or TypedArray is given, it will be used
 * *directly* without any copying. Note that, if a write to the buffer requires
 * more space, the buffer will allocate a new backing ArrayBuffer to
 * accommodate. The starting read and write offsets for the buffer may be
 * given as options.
 *
 * @param [b] the initial bytes for this buffer.
 * @param options the options to use:
 *          [readOffset] the starting read offset to use (default: 0).
 *          [writeOffset] the starting write offset to use (default: the
 *            length of the first parameter).
 *          [growSize] the minimum amount, in bytes, to grow the buffer by to
 *            accommodate writes (default: 1024).
 *          [encoding] the encoding ('binary', 'utf8', 'utf16', 'hex') for the
 *            first parameter, if it is a string (default: 'binary').
 */
function DataBuffer(b, options) {
  // default options
  options = options || {};

  // pointers for read from/write to buffer
  this.read = options.readOffset || 0;
  this.growSize = options.growSize || 1024;

  var isArrayBuffer = util.isArrayBuffer(b);
  var isArrayBufferView = util.isArrayBufferView(b);
  if(isArrayBuffer || isArrayBufferView) {
    // use ArrayBuffer directly
    if(isArrayBuffer) {
      this.data = new DataView(b);
    } else {
      // TODO: adjust read/write offset based on the type of view
      // or specify that this must be done in the options ... that the
      // offsets are byte-based
      this.data = new DataView(b.buffer, b.byteOffset, b.byteLength);
    }
    this.write = ('writeOffset' in options ?
      options.writeOffset : this.data.byteLength);
    return;
  }

  // initialize to empty array buffer and add any given bytes using putBytes
  this.data = new DataView(new ArrayBuffer(0));
  this.write = 0;

  if(b !== null && b !== undefined) {
    this.putBytes(b);
  }

  if('writeOffset' in options) {
    this.write = options.writeOffset;
  }
}
util.DataBuffer = DataBuffer;

/**
 * Gets the number of bytes in this buffer.
 *
 * @return the number of bytes in this buffer.
 */
util.DataBuffer.prototype.length = function() {
  return this.write - this.read;
};

/**
 * Gets whether or not this buffer is empty.
 *
 * @return true if this buffer is empty, false if not.
 */
util.DataBuffer.prototype.isEmpty = function() {
  return this.length() <= 0;
};

/**
 * Ensures this buffer has enough empty space to accommodate the given number
 * of bytes. An optional parameter may be given that indicates a minimum
 * amount to grow the buffer if necessary. If the parameter is not given,
 * the buffer will be grown by some previously-specified default amount
 * or heuristic.
 *
 * @param amount the number of bytes to accommodate.
 * @param [growSize] the minimum amount, in bytes, to grow the buffer by if
 *          necessary.
 */
util.DataBuffer.prototype.accommodate = function(amount, growSize) {
  if(this.length() >= amount) {
    return this;
  }
  growSize = Math.max(growSize || this.growSize, amount);

  // grow buffer
  var src = new Uint8Array(
    this.data.buffer, this.data.byteOffset, this.data.byteLength);
  var dst = new Uint8Array(this.length() + growSize);
  dst.set(src);
  this.data = new DataView(dst.buffer);

  return this;
};

/**
 * Puts a byte in this buffer.
 *
 * @param b the byte to put.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putByte = function(b) {
  this.accommodate(1);
  this.data.setUint8(this.write++, b);
  return this;
};

/**
 * Puts a byte in this buffer N times.
 *
 * @param b the byte to put.
 * @param n the number of bytes of value b to put.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.fillWithByte = function(b, n) {
  this.accommodate(n);
  for(var i = 0; i < n; ++i) {
    this.data.setUint8(b);
  }
  return this;
};

/**
 * Puts bytes in this buffer. The bytes may be given as a string, an
 * ArrayBuffer, a DataView, or a TypedArray.
 *
 * @param bytes the bytes to put.
 * @param [encoding] the encoding for the first parameter ('binary', 'utf8',
 *          'utf16', 'hex'), if it is a string (default: 'binary').
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putBytes = function(bytes, encoding) {
  if(util.isArrayBufferView(bytes)) {
    var src = new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    var len = src.byteLength - src.byteOffset;
    this.accommodate(len);
    var dst = new Uint8Array(this.data.buffer, this.write);
    dst.set(src);
    this.write += len;
    return this;
  }

  if(util.isArrayBuffer(bytes)) {
    var src = new Uint8Array(bytes);
    this.accommodate(src.byteLength);
    var dst = new Uint8Array(this.data.buffer);
    dst.set(src, this.write);
    this.write += src.byteLength;
    return this;
  }

  // bytes is a util.DataBuffer or equivalent
  if(bytes instanceof util.DataBuffer ||
    (typeof bytes === 'object' &&
    typeof bytes.read === 'number' && typeof bytes.write === 'number' &&
    util.isArrayBufferView(bytes.data))) {
    var src = new Uint8Array(bytes.data.byteLength, bytes.read, bytes.length());
    this.accommodate(src.byteLength);
    var dst = new Uint8Array(bytes.data.byteLength, this.write);
    dst.set(src);
    this.write += src.byteLength;
    return this;
  }

  if(bytes instanceof util.ByteStringBuffer) {
    // copy binary string and process as the same as a string parameter below
    bytes = bytes.data;
    encoding = 'binary';
  }

  // string conversion
  encoding = encoding || 'binary';
  if(typeof bytes === 'string') {
    var view;

    // decode from string
    if(encoding === 'hex') {
      this.accommodate(Math.ceil(bytes.length / 2));
      view = new Uint8Array(this.data.buffer, this.write);
      this.write += util.binary.hex.decode(bytes, view, this.write);
      return this;
    }
    if(encoding === 'base64') {
      this.accommodate(Math.ceil(bytes.length / 4) * 3);
      view = new Uint8Array(this.data.buffer, this.write);
      this.write += util.binary.base64.decode(bytes, view, this.write);
      return this;
    }

    // encode text as UTF-8 bytes
    if(encoding === 'utf8') {
      // encode as UTF-8 then decode string as raw binary
      bytes = util.encodeUtf8(bytes);
      encoding = 'binary';
    }

    // decode string as raw binary
    if(encoding === 'binary' || encoding === 'raw') {
      // one byte per character
      this.accommodate(bytes.length);
      view = new Uint8Array(this.data.buffer, this.write);
      this.write += util.binary.raw.decode(view);
      return this;
    }

    // encode text as UTF-16 bytes
    if(encoding === 'utf16') {
      // two bytes per character
      this.accommodate(bytes.length * 2);
      view = new Uint16Array(this.data.buffer, this.write);
      this.write += util.text.utf16.encode(view);
      return this;
    }

    throw new Error('Invalid encoding: ' + encoding);
  }

  throw Error('Invalid parameter: ' + bytes);
};

/**
 * Puts the given buffer into this buffer.
 *
 * @param buffer the buffer to put into this one.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putBuffer = function(buffer) {
  this.putBytes(buffer);
  buffer.clear();
  return this;
};

/**
 * Puts a string into this buffer.
 *
 * @param str the string to put.
 * @param [encoding] the encoding for the string (default: 'utf16').
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putString = function(str) {
  return this.putBytes(str, 'utf16');
};

/**
 * Puts a 16-bit integer in this buffer in big-endian order.
 *
 * @param i the 16-bit integer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putInt16 = function(i) {
  this.accommodate(2);
  this.data.setInt16(this.write, i);
  this.write += 2;
  return this;
};

/**
 * Puts a 24-bit integer in this buffer in big-endian order.
 *
 * @param i the 24-bit integer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putInt24 = function(i) {
  this.accommodate(3);
  this.data.setInt16(this.write, i >> 8 & 0xFFFF);
  this.data.setInt8(this.write, i >> 16 & 0xFF);
  this.write += 3;
  return this;
};

/**
 * Puts a 32-bit integer in this buffer in big-endian order.
 *
 * @param i the 32-bit integer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putInt32 = function(i) {
  this.accommodate(4);
  this.data.setInt32(this.write, i);
  this.write += 4;
  return this;
};

/**
 * Puts a 16-bit integer in this buffer in little-endian order.
 *
 * @param i the 16-bit integer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putInt16Le = function(i) {
  this.accommodate(2);
  this.data.setInt16(this.write, i, true);
  this.write += 2;
  return this;
};

/**
 * Puts a 24-bit integer in this buffer in little-endian order.
 *
 * @param i the 24-bit integer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putInt24Le = function(i) {
  this.accommodate(3);
  this.data.setInt8(this.write, i >> 16 & 0xFF);
  this.data.setInt16(this.write, i >> 8 & 0xFFFF, true);
  this.write += 3;
  return this;
};

/**
 * Puts a 32-bit integer in this buffer in little-endian order.
 *
 * @param i the 32-bit integer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putInt32Le = function(i) {
  this.accommodate(4);
  this.data.setInt32(this.write, i, true);
  this.write += 4;
  return this;
};

/**
 * Puts an n-bit integer in this buffer in big-endian order.
 *
 * @param i the n-bit integer.
 * @param n the number of bits in the integer (8, 16, 24, or 32).
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putInt = function(i, n) {
  _checkBitsParam(n);
  this.accommodate(n / 8);
  do {
    n -= 8;
    this.data.setInt8(this.write++, (i >> n) & 0xFF);
  } while(n > 0);
  return this;
};

/**
 * Puts a signed n-bit integer in this buffer in big-endian order. Two's
 * complement representation is used.
 *
 * @param i the n-bit integer.
 * @param n the number of bits in the integer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putSignedInt = function(i, n) {
  _checkBitsParam(n);
  this.accommodate(n / 8);
  if(i < 0) {
    i += 2 << (n - 1);
  }
  return this.putInt(i, n);
};

/**
 * Gets a byte from this buffer and advances the read pointer by 1.
 *
 * @return the byte.
 */
util.DataBuffer.prototype.getByte = function() {
  return this.data.getInt8(this.read++);
};

/**
 * Gets a uint16 from this buffer in big-endian order and advances the read
 * pointer by 2.
 *
 * @return the uint16.
 */
util.DataBuffer.prototype.getInt16 = function() {
  var rval = this.data.getInt16(this.read);
  this.read += 2;
  return rval;
};

/**
 * Gets a uint24 from this buffer in big-endian order and advances the read
 * pointer by 3.
 *
 * @return the uint24.
 */
util.DataBuffer.prototype.getInt24 = function() {
  var rval = (
    this.data.getInt16(this.read) << 8 ^
    this.data.getInt8(this.read + 2));
  this.read += 3;
  return rval;
};

/**
 * Gets a uint32 from this buffer in big-endian order and advances the read
 * pointer by 4.
 *
 * @return the word.
 */
util.DataBuffer.prototype.getInt32 = function() {
  var rval = this.data.getInt32(this.read);
  this.read += 4;
  return rval;
};

/**
 * Gets a uint16 from this buffer in little-endian order and advances the read
 * pointer by 2.
 *
 * @return the uint16.
 */
util.DataBuffer.prototype.getInt16Le = function() {
  var rval = this.data.getInt16(this.read, true);
  this.read += 2;
  return rval;
};

/**
 * Gets a uint24 from this buffer in little-endian order and advances the read
 * pointer by 3.
 *
 * @return the uint24.
 */
util.DataBuffer.prototype.getInt24Le = function() {
  var rval = (
    this.data.getInt8(this.read) ^
    this.data.getInt16(this.read + 1, true) << 8);
  this.read += 3;
  return rval;
};

/**
 * Gets a uint32 from this buffer in little-endian order and advances the read
 * pointer by 4.
 *
 * @return the word.
 */
util.DataBuffer.prototype.getInt32Le = function() {
  var rval = this.data.getInt32(this.read, true);
  this.read += 4;
  return rval;
};

/**
 * Gets an n-bit integer from this buffer in big-endian order and advances the
 * read pointer by n/8.
 *
 * @param n the number of bits in the integer (8, 16, 24, or 32).
 *
 * @return the integer.
 */
util.DataBuffer.prototype.getInt = function(n) {
  _checkBitsParam(n);
  var rval = 0;
  do {
    // TODO: Use (rval * 0x100) if adding support for 33 to 53 bits.
    rval = (rval << 8) + this.data.getInt8(this.read++);
    n -= 8;
  } while(n > 0);
  return rval;
};

/**
 * Gets a signed n-bit integer from this buffer in big-endian order, using
 * two's complement, and advances the read pointer by n/8.
 *
 * @param n the number of bits in the integer (8, 16, 24, or 32).
 *
 * @return the integer.
 */
util.DataBuffer.prototype.getSignedInt = function(n) {
  // getInt checks n
  var x = this.getInt(n);
  var max = 2 << (n - 2);
  if(x >= max) {
    x -= max << 1;
  }
  return x;
};

/**
 * Reads bytes out as a binary encoded string and clears them from the
 * buffer.
 *
 * @param count the number of bytes to read, undefined or null for all.
 *
 * @return a binary encoded string of bytes.
 */
util.DataBuffer.prototype.getBytes = function(count) {
  // TODO: deprecate this method, it is poorly named and
  // this.toString('binary') replaces it
  // add a toTypedArray()/toArrayBuffer() function
  var rval;
  if(count) {
    // read count bytes
    count = Math.min(this.length(), count);
    rval = this.data.slice(this.read, this.read + count);
    this.read += count;
  } else if(count === 0) {
    rval = '';
  } else {
    // read all bytes, optimize to only copy when needed
    rval = (this.read === 0) ? this.data : this.data.slice(this.read);
    this.clear();
  }
  return rval;
};

/**
 * Gets a binary encoded string of the bytes from this buffer without
 * modifying the read pointer.
 *
 * @param count the number of bytes to get, omit to get all.
 *
 * @return a string full of binary encoded characters.
 */
util.DataBuffer.prototype.bytes = function(count) {
  // TODO: deprecate this method, it is poorly named, add "getString()"
  return (typeof(count) === 'undefined' ?
    this.data.slice(this.read) :
    this.data.slice(this.read, this.read + count));
};

/**
 * Gets a byte at the given index without modifying the read pointer.
 *
 * @param i the byte index.
 *
 * @return the byte.
 */
util.DataBuffer.prototype.at = function(i) {
  return this.data.getUint8(this.read + i);
};

/**
 * Puts a byte at the given index without modifying the read pointer.
 *
 * @param i the byte index.
 * @param b the byte to put.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.setAt = function(i, b) {
  this.data.setUint8(i, b);
  return this;
};

/**
 * Gets the last byte without modifying the read pointer.
 *
 * @return the last byte.
 */
util.DataBuffer.prototype.last = function() {
  return this.data.getUint8(this.write - 1);
};

/**
 * Creates a copy of this buffer.
 *
 * @return the copy.
 */
util.DataBuffer.prototype.copy = function() {
  return new util.DataBuffer(this);
};

/**
 * Compacts this buffer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.compact = function() {
  if(this.read > 0) {
    var src = new Uint8Array(this.data.buffer, this.read);
    var dst = new Uint8Array(src.byteLength);
    dst.set(src);
    this.data = new DataView(dst);
    this.write -= this.read;
    this.read = 0;
  }
  return this;
};

/**
 * Clears this buffer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.clear = function() {
  this.data = new DataView(new ArrayBuffer(0));
  this.read = this.write = 0;
  return this;
};

/**
 * Shortens this buffer by triming bytes off of the end of this buffer.
 *
 * @param count the number of bytes to trim off.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.truncate = function(count) {
  this.write = Math.max(0, this.length() - count);
  this.read = Math.min(this.read, this.write);
  return this;
};

/**
 * Converts this buffer to a hexadecimal string.
 *
 * @return a hexadecimal string.
 */
util.DataBuffer.prototype.toHex = function() {
  var rval = '';
  for(var i = this.read; i < this.data.byteLength; ++i) {
    var b = this.data.getUint8(i);
    if(b < 16) {
      rval += '0';
    }
    rval += b.toString(16);
  }
  return rval;
};

/**
 * Converts this buffer to a string, using the given encoding. If no
 * encoding is given, 'utf8' (UTF-8) is used.
 *
 * @param [encoding] the encoding to use: 'binary', 'utf8', 'utf16', 'hex',
 *          'base64' (default: 'utf8').
 *
 * @return a string representation of the bytes in this buffer.
 */
util.DataBuffer.prototype.toString = function(encoding) {
  var view = new Uint8Array(this.data, this.read, this.length());
  encoding = encoding || 'utf8';

  // encode to string
  if(encoding === 'binary' || encoding === 'raw') {
    return util.binary.raw.encode(view);
  }
  if(encoding === 'hex') {
    return util.binary.hex.encode(view);
  }
  if(encoding === 'base64') {
    return util.binary.base64.encode(view);
  }

  // decode to text
  if(encoding === 'utf8') {
    return util.text.utf8.decode(view);
  }
  if(encoding === 'utf16') {
    return util.text.utf16.decode(view);
  }

  throw new Error('Invalid encoding: ' + encoding);
};

/** End Buffer w/UInt8Array backing */

/**
 * Creates a buffer that stores bytes. A value may be given to populate the
 * buffer with data. This value can either be string of encoded bytes or a
 * regular string of characters. When passing a string of binary encoded
 * bytes, the encoding `raw` should be given. This is also the default. When
 * passing a string of characters, the encoding `utf8` should be given.
 *
 * @param [input] a string with encoded bytes to store in the buffer.
 * @param [encoding] (default: 'raw', other: 'utf8').
 */
util.createBuffer = function(input, encoding) {
  // TODO: deprecate, use new ByteBuffer() instead
  encoding = encoding || 'raw';
  if(input !== undefined && encoding === 'utf8') {
    input = util.encodeUtf8(input);
  }
  return new util.ByteBuffer(input);
};

/**
 * Fills a string with a particular value. If you want the string to be a byte
 * string, pass in String.fromCharCode(theByte).
 *
 * @param c the character to fill the string with, use String.fromCharCode
 *          to fill the string with a byte value.
 * @param n the number of characters of value c to fill with.
 *
 * @return the filled string.
 */
util.fillString = function(c, n) {
  var s = '';
  while(n > 0) {
    if(n & 1) {
      s += c;
    }
    n >>>= 1;
    if(n > 0) {
      c += c;
    }
  }
  return s;
};

/**
 * Performs a per byte XOR between two byte strings and returns the result as a
 * string of bytes.
 *
 * @param s1 first string of bytes.
 * @param s2 second string of bytes.
 * @param n the number of bytes to XOR.
 *
 * @return the XOR'd result.
 */
util.xorBytes = function(s1, s2, n) {
  var s3 = '';
  var b = '';
  var t = '';
  var i = 0;
  var c = 0;
  for(; n > 0; --n, ++i) {
    b = s1.charCodeAt(i) ^ s2.charCodeAt(i);
    if(c >= 10) {
      s3 += t;
      t = '';
      c = 0;
    }
    t += String.fromCharCode(b);
    ++c;
  }
  s3 += t;
  return s3;
};

/**
 * Converts a hex string into a 'binary' encoded string of bytes.
 *
 * @param hex the hexadecimal string to convert.
 *
 * @return the binary-encoded string of bytes.
 */
util.hexToBytes = function(hex) {
  // TODO: deprecate: "Deprecated. Use util.binary.hex.decode instead."
  var rval = '';
  var i = 0;
  if(hex.length & 1 == 1) {
    // odd number of characters, convert first character alone
    i = 1;
    rval += String.fromCharCode(parseInt(hex[0], 16));
  }
  // convert 2 characters (1 byte) at a time
  for(; i < hex.length; i += 2) {
    rval += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return rval;
};

/**
 * Converts a 'binary' encoded string of bytes to hex.
 *
 * @param bytes the byte string to convert.
 *
 * @return the string of hexadecimal characters.
 */
util.bytesToHex = function(bytes) {
  // TODO: deprecate: "Deprecated. Use util.binary.hex.encode instead."
  return util.createBuffer(bytes).toHex();
};

/**
 * Converts an 32-bit integer to 4-big-endian byte string.
 *
 * @param i the integer.
 *
 * @return the byte string.
 */
util.int32ToBytes = function(i) {
  return (
    String.fromCharCode(i >> 24 & 0xFF) +
    String.fromCharCode(i >> 16 & 0xFF) +
    String.fromCharCode(i >> 8 & 0xFF) +
    String.fromCharCode(i & 0xFF));
};

// base64 characters, reverse mapping
var _base64 =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var _base64Idx = [
/*43 -43 = 0*/
/*'+',  1,  2,  3,'/' */
   62, -1, -1, -1, 63,

/*'0','1','2','3','4','5','6','7','8','9' */
   52, 53, 54, 55, 56, 57, 58, 59, 60, 61,

/*15, 16, 17,'=', 19, 20, 21 */
  -1, -1, -1, 64, -1, -1, -1,

/*65 - 43 = 22*/
/*'A','B','C','D','E','F','G','H','I','J','K','L','M', */
   0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12,

/*'N','O','P','Q','R','S','T','U','V','W','X','Y','Z' */
   13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,

/*91 - 43 = 48 */
/*48, 49, 50, 51, 52, 53 */
  -1, -1, -1, -1, -1, -1,

/*97 - 43 = 54*/
/*'a','b','c','d','e','f','g','h','i','j','k','l','m' */
   26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,

/*'n','o','p','q','r','s','t','u','v','w','x','y','z' */
   39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
];

// base58 characters (Bitcoin alphabet)
var _base58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

/**
 * Base64 encodes a 'binary' encoded string of bytes.
 *
 * @param input the binary encoded string of bytes to base64-encode.
 * @param maxline the maximum number of encoded characters per line to use,
 *          defaults to none.
 *
 * @return the base64-encoded output.
 */
util.encode64 = function(input, maxline) {
  // TODO: deprecate: "Deprecated. Use util.binary.base64.encode instead."
  var line = '';
  var output = '';
  var chr1, chr2, chr3;
  var i = 0;
  while(i < input.length) {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);

    // encode 4 character group
    line += _base64.charAt(chr1 >> 2);
    line += _base64.charAt(((chr1 & 3) << 4) | (chr2 >> 4));
    if(isNaN(chr2)) {
      line += '==';
    } else {
      line += _base64.charAt(((chr2 & 15) << 2) | (chr3 >> 6));
      line += isNaN(chr3) ? '=' : _base64.charAt(chr3 & 63);
    }

    if(maxline && line.length > maxline) {
      output += line.substr(0, maxline) + '\r\n';
      line = line.substr(maxline);
    }
  }
  output += line;
  return output;
};

/**
 * Base64 decodes a string into a 'binary' encoded string of bytes.
 *
 * @param input the base64-encoded input.
 *
 * @return the binary encoded string.
 */
util.decode64 = function(input) {
  // TODO: deprecate: "Deprecated. Use util.binary.base64.decode instead."

  // remove all non-base64 characters
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

  var output = '';
  var enc1, enc2, enc3, enc4;
  var i = 0;

  while(i < input.length) {
    enc1 = _base64Idx[input.charCodeAt(i++) - 43];
    enc2 = _base64Idx[input.charCodeAt(i++) - 43];
    enc3 = _base64Idx[input.charCodeAt(i++) - 43];
    enc4 = _base64Idx[input.charCodeAt(i++) - 43];

    output += String.fromCharCode((enc1 << 2) | (enc2 >> 4));
    if(enc3 !== 64) {
      // decoded at least 2 bytes
      output += String.fromCharCode(((enc2 & 15) << 4) | (enc3 >> 2));
      if(enc4 !== 64) {
        // decoded 3 bytes
        output += String.fromCharCode(((enc3 & 3) << 6) | enc4);
      }
    }
  }

  return output;
};

/**
 * Encodes the given string of characters (a standard JavaScript
 * string) as a binary encoded string where the bytes represent
 * a UTF-8 encoded string of characters. Non-ASCII characters will be
 * encoded as multiple bytes according to UTF-8.
 *
 * @param str a standard string of characters to encode.
 *
 * @return the binary encoded string.
 */
util.encodeUtf8 = function(str) {
  return unescape(encodeURIComponent(str));
};

/**
 * Decodes a binary encoded string that contains bytes that
 * represent a UTF-8 encoded string of characters -- into a
 * string of characters (a standard JavaScript string).
 *
 * @param str the binary encoded string to decode.
 *
 * @return the resulting standard string of characters.
 */
util.decodeUtf8 = function(str) {
  return decodeURIComponent(escape(str));
};

// binary encoding/decoding tools
// FIXME: Experimental. Do not use yet.
util.binary = {
  raw: {},
  hex: {},
  base64: {},
  base58: {},
  baseN : {
    encode: baseN.encode,
    decode: baseN.decode
  }
};

/**
 * Encodes a Uint8Array as a binary-encoded string. This encoding uses
 * a value between 0 and 255 for each character.
 *
 * @param bytes the Uint8Array to encode.
 *
 * @return the binary-encoded string.
 */
util.binary.raw.encode = function(bytes) {
  return String.fromCharCode.apply(null, bytes);
};

/**
 * Decodes a binary-encoded string to a Uint8Array. This encoding uses
 * a value between 0 and 255 for each character.
 *
 * @param str the binary-encoded string to decode.
 * @param [output] an optional Uint8Array to write the output to; if it
 *          is too small, an exception will be thrown.
 * @param [offset] the start offset for writing to the output (default: 0).
 *
 * @return the Uint8Array or the number of bytes written if output was given.
 */
util.binary.raw.decode = function(str, output, offset) {
  var out = output;
  if(!out) {
    out = new Uint8Array(str.length);
  }
  offset = offset || 0;
  var j = offset;
  for(var i = 0; i < str.length; ++i) {
    out[j++] = str.charCodeAt(i);
  }
  return output ? (j - offset) : out;
};

/**
 * Encodes a 'binary' string, ArrayBuffer, DataView, TypedArray, or
 * ByteBuffer as a string of hexadecimal characters.
 *
 * @param bytes the bytes to convert.
 *
 * @return the string of hexadecimal characters.
 */
util.binary.hex.encode = util.bytesToHex;

/**
 * Decodes a hex-encoded string to a Uint8Array.
 *
 * @param hex the hexadecimal string to convert.
 * @param [output] an optional Uint8Array to write the output to; if it
 *          is too small, an exception will be thrown.
 * @param [offset] the start offset for writing to the output (default: 0).
 *
 * @return the Uint8Array or the number of bytes written if output was given.
 */
util.binary.hex.decode = function(hex, output, offset) {
  var out = output;
  if(!out) {
    out = new Uint8Array(Math.ceil(hex.length / 2));
  }
  offset = offset || 0;
  var i = 0, j = offset;
  if(hex.length & 1) {
    // odd number of characters, convert first character alone
    i = 1;
    out[j++] = parseInt(hex[0], 16);
  }
  // convert 2 characters (1 byte) at a time
  for(; i < hex.length; i += 2) {
    out[j++] = parseInt(hex.substr(i, 2), 16);
  }
  return output ? (j - offset) : out;
};

/**
 * Base64-encodes a Uint8Array.
 *
 * @param input the Uint8Array to encode.
 * @param maxline the maximum number of encoded characters per line to use,
 *          defaults to none.
 *
 * @return the base64-encoded output string.
 */
util.binary.base64.encode = function(input, maxline) {
  var line = '';
  var output = '';
  var chr1, chr2, chr3;
  var i = 0;
  while(i < input.byteLength) {
    chr1 = input[i++];
    chr2 = input[i++];
    chr3 = input[i++];

    // encode 4 character group
    line += _base64.charAt(chr1 >> 2);
    line += _base64.charAt(((chr1 & 3) << 4) | (chr2 >> 4));
    if(isNaN(chr2)) {
      line += '==';
    } else {
      line += _base64.charAt(((chr2 & 15) << 2) | (chr3 >> 6));
      line += isNaN(chr3) ? '=' : _base64.charAt(chr3 & 63);
    }

    if(maxline && line.length > maxline) {
      output += line.substr(0, maxline) + '\r\n';
      line = line.substr(maxline);
    }
  }
  output += line;
  return output;
};

/**
 * Decodes a base64-encoded string to a Uint8Array.
 *
 * @param input the base64-encoded input string.
 * @param [output] an optional Uint8Array to write the output to; if it
 *          is too small, an exception will be thrown.
 * @param [offset] the start offset for writing to the output (default: 0).
 *
 * @return the Uint8Array or the number of bytes written if output was given.
 */
util.binary.base64.decode = function(input, output, offset) {
  var out = output;
  if(!out) {
    out = new Uint8Array(Math.ceil(input.length / 4) * 3);
  }

  // remove all non-base64 characters
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

  offset = offset || 0;
  var enc1, enc2, enc3, enc4;
  var i = 0, j = offset;

  while(i < input.length) {
    enc1 = _base64Idx[input.charCodeAt(i++) - 43];
    enc2 = _base64Idx[input.charCodeAt(i++) - 43];
    enc3 = _base64Idx[input.charCodeAt(i++) - 43];
    enc4 = _base64Idx[input.charCodeAt(i++) - 43];

    out[j++] = (enc1 << 2) | (enc2 >> 4);
    if(enc3 !== 64) {
      // decoded at least 2 bytes
      out[j++] = ((enc2 & 15) << 4) | (enc3 >> 2);
      if(enc4 !== 64) {
        // decoded 3 bytes
        out[j++] = ((enc3 & 3) << 6) | enc4;
      }
    }
  }

  // make sure result is the exact decoded length
  return output ? (j - offset) : out.subarray(0, j);
};

// add support for base58 encoding/decoding with Bitcoin alphabet
util.binary.base58.encode = function(input, maxline) {
  return util.binary.baseN.encode(input, _base58, maxline);
};
util.binary.base58.decode = function(input, maxline) {
  return util.binary.baseN.decode(input, _base58, maxline);
};

// text encoding/decoding tools
// FIXME: Experimental. Do not use yet.
util.text = {
  utf8: {},
  utf16: {}
};

/**
 * Encodes the given string as UTF-8 in a Uint8Array.
 *
 * @param str the string to encode.
 * @param [output] an optional Uint8Array to write the output to; if it
 *          is too small, an exception will be thrown.
 * @param [offset] the start offset for writing to the output (default: 0).
 *
 * @return the Uint8Array or the number of bytes written if output was given.
 */
util.text.utf8.encode = function(str, output, offset) {
  str = util.encodeUtf8(str);
  var out = output;
  if(!out) {
    out = new Uint8Array(str.length);
  }
  offset = offset || 0;
  var j = offset;
  for(var i = 0; i < str.length; ++i) {
    out[j++] = str.charCodeAt(i);
  }
  return output ? (j - offset) : out;
};

/**
 * Decodes the UTF-8 contents from a Uint8Array.
 *
 * @param bytes the Uint8Array to decode.
 *
 * @return the resulting string.
 */
util.text.utf8.decode = function(bytes) {
  return util.decodeUtf8(String.fromCharCode.apply(null, bytes));
};

/**
 * Encodes the given string as UTF-16 in a Uint8Array.
 *
 * @param str the string to encode.
 * @param [output] an optional Uint8Array to write the output to; if it
 *          is too small, an exception will be thrown.
 * @param [offset] the start offset for writing to the output (default: 0).
 *
 * @return the Uint8Array or the number of bytes written if output was given.
 */
util.text.utf16.encode = function(str, output, offset) {
  var out = output;
  if(!out) {
    out = new Uint8Array(str.length * 2);
  }
  var view = new Uint16Array(out.buffer);
  offset = offset || 0;
  var j = offset;
  var k = offset;
  for(var i = 0; i < str.length; ++i) {
    view[k++] = str.charCodeAt(i);
    j += 2;
  }
  return output ? (j - offset) : out;
};

/**
 * Decodes the UTF-16 contents from a Uint8Array.
 *
 * @param bytes the Uint8Array to decode.
 *
 * @return the resulting string.
 */
util.text.utf16.decode = function(bytes) {
  return String.fromCharCode.apply(null, new Uint16Array(bytes.buffer));
};

/**
 * Deflates the given data using a flash interface.
 *
 * @param api the flash interface.
 * @param bytes the data.
 * @param raw true to return only raw deflate data, false to include zlib
 *          header and trailer.
 *
 * @return the deflated data as a string.
 */
util.deflate = function(api, bytes, raw) {
  bytes = util.decode64(api.deflate(util.encode64(bytes)).rval);

  // strip zlib header and trailer if necessary
  if(raw) {
    // zlib header is 2 bytes (CMF,FLG) where FLG indicates that
    // there is a 4-byte DICT (alder-32) block before the data if
    // its 5th bit is set
    var start = 2;
    var flg = bytes.charCodeAt(1);
    if(flg & 0x20) {
      start = 6;
    }
    // zlib trailer is 4 bytes of adler-32
    bytes = bytes.substring(start, bytes.length - 4);
  }

  return bytes;
};

/**
 * Inflates the given data using a flash interface.
 *
 * @param api the flash interface.
 * @param bytes the data.
 * @param raw true if the incoming data has no zlib header or trailer and is
 *          raw DEFLATE data.
 *
 * @return the inflated data as a string, null on error.
 */
util.inflate = function(api, bytes, raw) {
  // TODO: add zlib header and trailer if necessary/possible
  var rval = api.inflate(util.encode64(bytes)).rval;
  return (rval === null) ? null : util.decode64(rval);
};

/**
 * Sets a storage object.
 *
 * @param api the storage interface.
 * @param id the storage ID to use.
 * @param obj the storage object, null to remove.
 */
var _setStorageObject = function(api, id, obj) {
  if(!api) {
    throw new Error('WebStorage not available.');
  }

  var rval;
  if(obj === null) {
    rval = api.removeItem(id);
  } else {
    // json-encode and base64-encode object
    obj = util.encode64(JSON.stringify(obj));
    rval = api.setItem(id, obj);
  }

  // handle potential flash error
  if(typeof(rval) !== 'undefined' && rval.rval !== true) {
    var error = new Error(rval.error.message);
    error.id = rval.error.id;
    error.name = rval.error.name;
    throw error;
  }
};

/**
 * Gets a storage object.
 *
 * @param api the storage interface.
 * @param id the storage ID to use.
 *
 * @return the storage object entry or null if none exists.
 */
var _getStorageObject = function(api, id) {
  if(!api) {
    throw new Error('WebStorage not available.');
  }

  // get the existing entry
  var rval = api.getItem(id);

  /* Note: We check api.init because we can't do (api == localStorage)
    on IE because of "Class doesn't support Automation" exception. Only
    the flash api has an init method so this works too, but we need a
    better solution in the future. */

  // flash returns item wrapped in an object, handle special case
  if(api.init) {
    if(rval.rval === null) {
      if(rval.error) {
        var error = new Error(rval.error.message);
        error.id = rval.error.id;
        error.name = rval.error.name;
        throw error;
      }
      // no error, but also no item
      rval = null;
    } else {
      rval = rval.rval;
    }
  }

  // handle decoding
  if(rval !== null) {
    // base64-decode and json-decode data
    rval = JSON.parse(util.decode64(rval));
  }

  return rval;
};

/**
 * Stores an item in local storage.
 *
 * @param api the storage interface.
 * @param id the storage ID to use.
 * @param key the key for the item.
 * @param data the data for the item (any javascript object/primitive).
 */
var _setItem = function(api, id, key, data) {
  // get storage object
  var obj = _getStorageObject(api, id);
  if(obj === null) {
    // create a new storage object
    obj = {};
  }
  // update key
  obj[key] = data;

  // set storage object
  _setStorageObject(api, id, obj);
};

/**
 * Gets an item from local storage.
 *
 * @param api the storage interface.
 * @param id the storage ID to use.
 * @param key the key for the item.
 *
 * @return the item.
 */
var _getItem = function(api, id, key) {
  // get storage object
  var rval = _getStorageObject(api, id);
  if(rval !== null) {
    // return data at key
    rval = (key in rval) ? rval[key] : null;
  }

  return rval;
};

/**
 * Removes an item from local storage.
 *
 * @param api the storage interface.
 * @param id the storage ID to use.
 * @param key the key for the item.
 */
var _removeItem = function(api, id, key) {
  // get storage object
  var obj = _getStorageObject(api, id);
  if(obj !== null && key in obj) {
    // remove key
    delete obj[key];

    // see if entry has no keys remaining
    var empty = true;
    for(var prop in obj) {
      empty = false;
      break;
    }
    if(empty) {
      // remove entry entirely if no keys are left
      obj = null;
    }

    // set storage object
    _setStorageObject(api, id, obj);
  }
};

/**
 * Clears the local disk storage identified by the given ID.
 *
 * @param api the storage interface.
 * @param id the storage ID to use.
 */
var _clearItems = function(api, id) {
  _setStorageObject(api, id, null);
};

/**
 * Calls a storage function.
 *
 * @param func the function to call.
 * @param args the arguments for the function.
 * @param location the location argument.
 *
 * @return the return value from the function.
 */
var _callStorageFunction = function(func, args, location) {
  var rval = null;

  // default storage types
  if(typeof(location) === 'undefined') {
    location = ['web', 'flash'];
  }

  // apply storage types in order of preference
  var type;
  var done = false;
  var exception = null;
  for(var idx in location) {
    type = location[idx];
    try {
      if(type === 'flash' || type === 'both') {
        if(args[0] === null) {
          throw new Error('Flash local storage not available.');
        }
        rval = func.apply(this, args);
        done = (type === 'flash');
      }
      if(type === 'web' || type === 'both') {
        args[0] = localStorage;
        rval = func.apply(this, args);
        done = true;
      }
    } catch(ex) {
      exception = ex;
    }
    if(done) {
      break;
    }
  }

  if(!done) {
    throw exception;
  }

  return rval;
};

/**
 * Stores an item on local disk.
 *
 * The available types of local storage include 'flash', 'web', and 'both'.
 *
 * The type 'flash' refers to flash local storage (SharedObject). In order
 * to use flash local storage, the 'api' parameter must be valid. The type
 * 'web' refers to WebStorage, if supported by the browser. The type 'both'
 * refers to storing using both 'flash' and 'web', not just one or the
 * other.
 *
 * The location array should list the storage types to use in order of
 * preference:
 *
 * ['flash']: flash only storage
 * ['web']: web only storage
 * ['both']: try to store in both
 * ['flash','web']: store in flash first, but if not available, 'web'
 * ['web','flash']: store in web first, but if not available, 'flash'
 *
 * The location array defaults to: ['web', 'flash']
 *
 * @param api the flash interface, null to use only WebStorage.
 * @param id the storage ID to use.
 * @param key the key for the item.
 * @param data the data for the item (any javascript object/primitive).
 * @param location an array with the preferred types of storage to use.
 */
util.setItem = function(api, id, key, data, location) {
  _callStorageFunction(_setItem, arguments, location);
};

/**
 * Gets an item on local disk.
 *
 * Set setItem() for details on storage types.
 *
 * @param api the flash interface, null to use only WebStorage.
 * @param id the storage ID to use.
 * @param key the key for the item.
 * @param location an array with the preferred types of storage to use.
 *
 * @return the item.
 */
util.getItem = function(api, id, key, location) {
  return _callStorageFunction(_getItem, arguments, location);
};

/**
 * Removes an item on local disk.
 *
 * Set setItem() for details on storage types.
 *
 * @param api the flash interface.
 * @param id the storage ID to use.
 * @param key the key for the item.
 * @param location an array with the preferred types of storage to use.
 */
util.removeItem = function(api, id, key, location) {
  _callStorageFunction(_removeItem, arguments, location);
};

/**
 * Clears the local disk storage identified by the given ID.
 *
 * Set setItem() for details on storage types.
 *
 * @param api the flash interface if flash is available.
 * @param id the storage ID to use.
 * @param location an array with the preferred types of storage to use.
 */
util.clearItems = function(api, id, location) {
  _callStorageFunction(_clearItems, arguments, location);
};

/**
 * Parses the scheme, host, and port from an http(s) url.
 *
 * @param str the url string.
 *
 * @return the parsed url object or null if the url is invalid.
 */
util.parseUrl = function(str) {
  // FIXME: this regex looks a bit broken
  var regex = /^(https?):\/\/([^:&^\/]*):?(\d*)(.*)$/g;
  regex.lastIndex = 0;
  var m = regex.exec(str);
  var url = (m === null) ? null : {
    full: str,
    scheme: m[1],
    host: m[2],
    port: m[3],
    path: m[4]
  };
  if(url) {
    url.fullHost = url.host;
    if(url.port) {
      if(url.port !== 80 && url.scheme === 'http') {
        url.fullHost += ':' + url.port;
      } else if(url.port !== 443 && url.scheme === 'https') {
        url.fullHost += ':' + url.port;
      }
    } else if(url.scheme === 'http') {
      url.port = 80;
    } else if(url.scheme === 'https') {
      url.port = 443;
    }
    url.full = url.scheme + '://' + url.fullHost;
  }
  return url;
};

/* Storage for query variables */
var _queryVariables = null;

/**
 * Returns the window location query variables. Query is parsed on the first
 * call and the same object is returned on subsequent calls. The mapping
 * is from keys to an array of values. Parameters without values will have
 * an object key set but no value added to the value array. Values are
 * unescaped.
 *
 * ...?k1=v1&k2=v2:
 * {
 *   "k1": ["v1"],
 *   "k2": ["v2"]
 * }
 *
 * ...?k1=v1&k1=v2:
 * {
 *   "k1": ["v1", "v2"]
 * }
 *
 * ...?k1=v1&k2:
 * {
 *   "k1": ["v1"],
 *   "k2": []
 * }
 *
 * ...?k1=v1&k1:
 * {
 *   "k1": ["v1"]
 * }
 *
 * ...?k1&k1:
 * {
 *   "k1": []
 * }
 *
 * @param query the query string to parse (optional, default to cached
 *          results from parsing window location search query).
 *
 * @return object mapping keys to variables.
 */
util.getQueryVariables = function(query) {
  var parse = function(q) {
    var rval = {};
    var kvpairs = q.split('&');
    for(var i = 0; i < kvpairs.length; i++) {
      var pos = kvpairs[i].indexOf('=');
      var key;
      var val;
      if(pos > 0) {
        key = kvpairs[i].substring(0, pos);
        val = kvpairs[i].substring(pos + 1);
      } else {
        key = kvpairs[i];
        val = null;
      }
      if(!(key in rval)) {
        rval[key] = [];
      }
      // disallow overriding object prototype keys
      if(!(key in Object.prototype) && val !== null) {
        rval[key].push(unescape(val));
      }
    }
    return rval;
  };

   var rval;
   if(typeof(query) === 'undefined') {
     // set cached variables if needed
     if(_queryVariables === null) {
       if(typeof(window) !== 'undefined' && window.location && window.location.search) {
          // parse window search query
          _queryVariables = parse(window.location.search.substring(1));
       } else {
          // no query variables available
          _queryVariables = {};
       }
     }
     rval = _queryVariables;
   } else {
     // parse given query
     rval = parse(query);
   }
   return rval;
};

/**
 * Parses a fragment into a path and query. This method will take a URI
 * fragment and break it up as if it were the main URI. For example:
 *    /bar/baz?a=1&b=2
 * results in:
 *    {
 *       path: ["bar", "baz"],
 *       query: {"k1": ["v1"], "k2": ["v2"]}
 *    }
 *
 * @return object with a path array and query object.
 */
util.parseFragment = function(fragment) {
  // default to whole fragment
  var fp = fragment;
  var fq = '';
  // split into path and query if possible at the first '?'
  var pos = fragment.indexOf('?');
  if(pos > 0) {
    fp = fragment.substring(0, pos);
    fq = fragment.substring(pos + 1);
  }
  // split path based on '/' and ignore first element if empty
  var path = fp.split('/');
  if(path.length > 0 && path[0] === '') {
    path.shift();
  }
  // convert query into object
  var query = (fq === '') ? {} : util.getQueryVariables(fq);

  return {
    pathString: fp,
    queryString: fq,
    path: path,
    query: query
  };
};

/**
 * Makes a request out of a URI-like request string. This is intended to
 * be used where a fragment id (after a URI '#') is parsed as a URI with
 * path and query parts. The string should have a path beginning and
 * delimited by '/' and optional query parameters following a '?'. The
 * query should be a standard URL set of key value pairs delimited by
 * '&'. For backwards compatibility the initial '/' on the path is not
 * required. The request object has the following API, (fully described
 * in the method code):
 *    {
 *       path: <the path string part>.
 *       query: <the query string part>,
 *       getPath(i): get part or all of the split path array,
 *       getQuery(k, i): get part or all of a query key array,
 *       getQueryLast(k, _default): get last element of a query key array.
 *    }
 *
 * @return object with request parameters.
 */
util.makeRequest = function(reqString) {
  var frag = util.parseFragment(reqString);
  var req = {
    // full path string
    path: frag.pathString,
    // full query string
    query: frag.queryString,
    /**
     * Get path or element in path.
     *
     * @param i optional path index.
     *
     * @return path or part of path if i provided.
     */
    getPath: function(i) {
      return (typeof(i) === 'undefined') ? frag.path : frag.path[i];
    },
    /**
     * Get query, values for a key, or value for a key index.
     *
     * @param k optional query key.
     * @param i optional query key index.
     *
     * @return query, values for a key, or value for a key index.
     */
    getQuery: function(k, i) {
      var rval;
      if(typeof(k) === 'undefined') {
        rval = frag.query;
      } else {
        rval = frag.query[k];
        if(rval && typeof(i) !== 'undefined') {
           rval = rval[i];
        }
      }
      return rval;
    },
    getQueryLast: function(k, _default) {
      var rval;
      var vals = req.getQuery(k);
      if(vals) {
        rval = vals[vals.length - 1];
      } else {
        rval = _default;
      }
      return rval;
    }
  };
  return req;
};

/**
 * Makes a URI out of a path, an object with query parameters, and a
 * fragment. Uses jQuery.param() internally for query string creation.
 * If the path is an array, it will be joined with '/'.
 *
 * @param path string path or array of strings.
 * @param query object with query parameters. (optional)
 * @param fragment fragment string. (optional)
 *
 * @return string object with request parameters.
 */
util.makeLink = function(path, query, fragment) {
  // join path parts if needed
  path = jQuery.isArray(path) ? path.join('/') : path;

  var qstr = jQuery.param(query || {});
  fragment = fragment || '';
  return path +
    ((qstr.length > 0) ? ('?' + qstr) : '') +
    ((fragment.length > 0) ? ('#' + fragment) : '');
};

/**
 * Follows a path of keys deep into an object hierarchy and set a value.
 * If a key does not exist or it's value is not an object, create an
 * object in it's place. This can be destructive to a object tree if
 * leaf nodes are given as non-final path keys.
 * Used to avoid exceptions from missing parts of the path.
 *
 * @param object the starting object.
 * @param keys an array of string keys.
 * @param value the value to set.
 */
util.setPath = function(object, keys, value) {
  // need to start at an object
  if(typeof(object) === 'object' && object !== null) {
    var i = 0;
    var len = keys.length;
    while(i < len) {
      var next = keys[i++];
      if(i == len) {
        // last
        object[next] = value;
      } else {
        // more
        var hasNext = (next in object);
        if(!hasNext ||
          (hasNext && typeof(object[next]) !== 'object') ||
          (hasNext && object[next] === null)) {
          object[next] = {};
        }
        object = object[next];
      }
    }
  }
};

/**
 * Follows a path of keys deep into an object hierarchy and return a value.
 * If a key does not exist, create an object in it's place.
 * Used to avoid exceptions from missing parts of the path.
 *
 * @param object the starting object.
 * @param keys an array of string keys.
 * @param _default value to return if path not found.
 *
 * @return the value at the path if found, else default if given, else
 *         undefined.
 */
util.getPath = function(object, keys, _default) {
  var i = 0;
  var len = keys.length;
  var hasNext = true;
  while(hasNext && i < len &&
    typeof(object) === 'object' && object !== null) {
    var next = keys[i++];
    hasNext = next in object;
    if(hasNext) {
      object = object[next];
    }
  }
  return (hasNext ? object : _default);
};

/**
 * Follow a path of keys deep into an object hierarchy and delete the
 * last one. If a key does not exist, do nothing.
 * Used to avoid exceptions from missing parts of the path.
 *
 * @param object the starting object.
 * @param keys an array of string keys.
 */
util.deletePath = function(object, keys) {
  // need to start at an object
  if(typeof(object) === 'object' && object !== null) {
    var i = 0;
    var len = keys.length;
    while(i < len) {
      var next = keys[i++];
      if(i == len) {
        // last
        delete object[next];
      } else {
        // more
        if(!(next in object) ||
          (typeof(object[next]) !== 'object') ||
          (object[next] === null)) {
           break;
        }
        object = object[next];
      }
    }
  }
};

/**
 * Check if an object is empty.
 *
 * Taken from:
 * http://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object-from-json/679937#679937
 *
 * @param object the object to check.
 */
util.isEmpty = function(obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
};

/**
 * Format with simple printf-style interpolation.
 *
 * %%: literal '%'
 * %s,%o: convert next argument into a string.
 *
 * @param format the string to format.
 * @param ... arguments to interpolate into the format string.
 */
util.format = function(format) {
  var re = /%./g;
  // current match
  var match;
  // current part
  var part;
  // current arg index
  var argi = 0;
  // collected parts to recombine later
  var parts = [];
  // last index found
  var last = 0;
  // loop while matches remain
  while((match = re.exec(format))) {
    part = format.substring(last, re.lastIndex - 2);
    // don't add empty strings (ie, parts between %s%s)
    if(part.length > 0) {
      parts.push(part);
    }
    last = re.lastIndex;
    // switch on % code
    var code = match[0][1];
    switch(code) {
    case 's':
    case 'o':
      // check if enough arguments were given
      if(argi < arguments.length) {
        parts.push(arguments[argi++ + 1]);
      } else {
        parts.push('<?>');
      }
      break;
    // FIXME: do proper formating for numbers, etc
    //case 'f':
    //case 'd':
    case '%':
      parts.push('%');
      break;
    default:
      parts.push('<%' + code + '?>');
    }
  }
  // add trailing part of format string
  parts.push(format.substring(last));
  return parts.join('');
};

/**
 * Formats a number.
 *
 * http://snipplr.com/view/5945/javascript-numberformat--ported-from-php/
 */
util.formatNumber = function(number, decimals, dec_point, thousands_sep) {
  // http://kevin.vanzonneveld.net
  // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +     bugfix by: Michael White (http://crestidg.com)
  // +     bugfix by: Benjamin Lupton
  // +     bugfix by: Allan Jensen (http://www.winternet.no)
  // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // *     example 1: number_format(1234.5678, 2, '.', '');
  // *     returns 1: 1234.57

  var n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
  var d = dec_point === undefined ? ',' : dec_point;
  var t = thousands_sep === undefined ?
   '.' : thousands_sep, s = n < 0 ? '-' : '';
  var i = parseInt((n = Math.abs(+n || 0).toFixed(c)), 10) + '';
  var j = (i.length > 3) ? i.length % 3 : 0;
  return s + (j ? i.substr(0, j) + t : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) +
    (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
};

/**
 * Formats a byte size.
 *
 * http://snipplr.com/view/5949/format-humanize-file-byte-size-presentation-in-javascript/
 */
util.formatSize = function(size) {
  if(size >= 1073741824) {
    size = util.formatNumber(size / 1073741824, 2, '.', '') + ' GiB';
  } else if(size >= 1048576) {
    size = util.formatNumber(size / 1048576, 2, '.', '') + ' MiB';
  } else if(size >= 1024) {
    size = util.formatNumber(size / 1024, 0) + ' KiB';
  } else {
    size = util.formatNumber(size, 0) + ' bytes';
  }
  return size;
};

/**
 * Converts an IPv4 or IPv6 string representation into bytes (in network order).
 *
 * @param ip the IPv4 or IPv6 address to convert.
 *
 * @return the 4-byte IPv6 or 16-byte IPv6 address or null if the address can't
 *         be parsed.
 */
util.bytesFromIP = function(ip) {
  if(ip.indexOf('.') !== -1) {
    return util.bytesFromIPv4(ip);
  }
  if(ip.indexOf(':') !== -1) {
    return util.bytesFromIPv6(ip);
  }
  return null;
};

/**
 * Converts an IPv4 string representation into bytes (in network order).
 *
 * @param ip the IPv4 address to convert.
 *
 * @return the 4-byte address or null if the address can't be parsed.
 */
util.bytesFromIPv4 = function(ip) {
  ip = ip.split('.');
  if(ip.length !== 4) {
    return null;
  }
  var b = util.createBuffer();
  for(var i = 0; i < ip.length; ++i) {
    var num = parseInt(ip[i], 10);
    if(isNaN(num)) {
      return null;
    }
    b.putByte(num);
  }
  return b.getBytes();
};

/**
 * Converts an IPv6 string representation into bytes (in network order).
 *
 * @param ip the IPv6 address to convert.
 *
 * @return the 16-byte address or null if the address can't be parsed.
 */
util.bytesFromIPv6 = function(ip) {
  var blanks = 0;
  ip = ip.split(':').filter(function(e) {
    if(e.length === 0) ++blanks;
    return true;
  });
  var zeros = (8 - ip.length + blanks) * 2;
  var b = util.createBuffer();
  for(var i = 0; i < 8; ++i) {
    if(!ip[i] || ip[i].length === 0) {
      b.fillWithByte(0, zeros);
      zeros = 0;
      continue;
    }
    var bytes = util.hexToBytes(ip[i]);
    if(bytes.length < 2) {
      b.putByte(0);
    }
    b.putBytes(bytes);
  }
  return b.getBytes();
};

/**
 * Converts 4-bytes into an IPv4 string representation or 16-bytes into
 * an IPv6 string representation. The bytes must be in network order.
 *
 * @param bytes the bytes to convert.
 *
 * @return the IPv4 or IPv6 string representation if 4 or 16 bytes,
 *         respectively, are given, otherwise null.
 */
util.bytesToIP = function(bytes) {
  if(bytes.length === 4) {
    return util.bytesToIPv4(bytes);
  }
  if(bytes.length === 16) {
    return util.bytesToIPv6(bytes);
  }
  return null;
};

/**
 * Converts 4-bytes into an IPv4 string representation. The bytes must be
 * in network order.
 *
 * @param bytes the bytes to convert.
 *
 * @return the IPv4 string representation or null for an invalid # of bytes.
 */
util.bytesToIPv4 = function(bytes) {
  if(bytes.length !== 4) {
    return null;
  }
  var ip = [];
  for(var i = 0; i < bytes.length; ++i) {
    ip.push(bytes.charCodeAt(i));
  }
  return ip.join('.');
};

/**
 * Converts 16-bytes into an IPv16 string representation. The bytes must be
 * in network order.
 *
 * @param bytes the bytes to convert.
 *
 * @return the IPv16 string representation or null for an invalid # of bytes.
 */
util.bytesToIPv6 = function(bytes) {
  if(bytes.length !== 16) {
    return null;
  }
  var ip = [];
  var zeroGroups = [];
  var zeroMaxGroup = 0;
  for(var i = 0; i < bytes.length; i += 2) {
    var hex = util.bytesToHex(bytes[i] + bytes[i + 1]);
    // canonicalize zero representation
    while(hex[0] === '0' && hex !== '0') {
      hex = hex.substr(1);
    }
    if(hex === '0') {
      var last = zeroGroups[zeroGroups.length - 1];
      var idx = ip.length;
      if(!last || idx !== last.end + 1) {
        zeroGroups.push({start: idx, end: idx});
      } else {
        last.end = idx;
        if((last.end - last.start) >
          (zeroGroups[zeroMaxGroup].end - zeroGroups[zeroMaxGroup].start)) {
          zeroMaxGroup = zeroGroups.length - 1;
        }
      }
    }
    ip.push(hex);
  }
  if(zeroGroups.length > 0) {
    var group = zeroGroups[zeroMaxGroup];
    // only shorten group of length > 0
    if(group.end - group.start > 0) {
      ip.splice(group.start, group.end - group.start + 1, '');
      if(group.start === 0) {
        ip.unshift('');
      }
      if(group.end === 7) {
        ip.push('');
      }
    }
  }
  return ip.join(':');
};

/**
 * Estimates the number of processes that can be run concurrently. If
 * creating Web Workers, keep in mind that the main JavaScript process needs
 * its own core.
 *
 * @param options the options to use:
 *          update true to force an update (not use the cached value).
 * @param callback(err, max) called once the operation completes.
 */
util.estimateCores = function(options, callback) {
  if(typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  if('cores' in util && !options.update) {
    return callback(null, util.cores);
  }
  if(typeof navigator !== 'undefined' &&
    'hardwareConcurrency' in navigator &&
    navigator.hardwareConcurrency > 0) {
    util.cores = navigator.hardwareConcurrency;
    return callback(null, util.cores);
  }
  if(typeof Worker === 'undefined') {
    // workers not available
    util.cores = 1;
    return callback(null, util.cores);
  }
  if(typeof Blob === 'undefined') {
    // can't estimate, default to 2
    util.cores = 2;
    return callback(null, util.cores);
  }

  // create worker concurrency estimation code as blob
  var blobUrl = URL.createObjectURL(new Blob(['(',
    function() {
      self.addEventListener('message', function(e) {
        // run worker for 4 ms
        var st = Date.now();
        var et = st + 4;
        while(Date.now() < et);
        self.postMessage({st: st, et: et});
      });
    }.toString(),
  ')()'], {type: 'application/javascript'}));

  // take 5 samples using 16 workers
  sample([], 5, 16);

  function sample(max, samples, numWorkers) {
    if(samples === 0) {
      // get overlap average
      var avg = Math.floor(max.reduce(function(avg, x) {
        return avg + x;
      }, 0) / max.length);
      util.cores = Math.max(1, avg);
      URL.revokeObjectURL(blobUrl);
      return callback(null, util.cores);
    }
    map(numWorkers, function(err, results) {
      max.push(reduce(numWorkers, results));
      sample(max, samples - 1, numWorkers);
    });
  }

  function map(numWorkers, callback) {
    var workers = [];
    var results = [];
    for(var i = 0; i < numWorkers; ++i) {
      var worker = new Worker(blobUrl);
      worker.addEventListener('message', function(e) {
        results.push(e.data);
        if(results.length === numWorkers) {
          for(var i = 0; i < numWorkers; ++i) {
            workers[i].terminate();
          }
          callback(null, results);
        }
      });
      workers.push(worker);
    }
    for(var i = 0; i < numWorkers; ++i) {
      workers[i].postMessage(i);
    }
  }

  function reduce(numWorkers, results) {
    // find overlapping time windows
    var overlaps = [];
    for(var n = 0; n < numWorkers; ++n) {
      var r1 = results[n];
      var overlap = overlaps[n] = [];
      for(var i = 0; i < numWorkers; ++i) {
        if(n === i) {
          continue;
        }
        var r2 = results[i];
        if((r1.st > r2.st && r1.st < r2.et) ||
          (r2.st > r1.st && r2.st < r1.et)) {
          overlap.push(i);
        }
      }
    }
    // get maximum overlaps ... don't include overlapping worker itself
    // as the main JS process was also being scheduled during the work and
    // would have to be subtracted from the estimate anyway
    return overlaps.reduce(function(max, overlap) {
      return Math.max(max, overlap.length);
    }, 0);
  }
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/rdf-canonize/lib/AsyncAlgorithm.js":
/*!*********************************************************!*\
  !*** ./node_modules/rdf-canonize/lib/AsyncAlgorithm.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var util = __webpack_require__(/*! ./util */ "./node_modules/rdf-canonize/lib/util.js");

module.exports = /*#__PURE__*/function () {
  function AsyncAlgorithm() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$maxCallStackDept = _ref.maxCallStackDepth,
        maxCallStackDepth = _ref$maxCallStackDept === void 0 ? 500 : _ref$maxCallStackDept,
        _ref$maxTotalCallStac = _ref.maxTotalCallStackDepth,
        maxTotalCallStackDepth = _ref$maxTotalCallStac === void 0 ? 0xFFFFFFFF : _ref$maxTotalCallStac,
        _ref$timeSlice = _ref.timeSlice,
        timeSlice = _ref$timeSlice === void 0 ? 10 : _ref$timeSlice;

    (0, _classCallCheck2["default"])(this, AsyncAlgorithm);
    this.schedule = {};
    this.schedule.MAX_DEPTH = maxCallStackDepth;
    this.schedule.MAX_TOTAL_DEPTH = maxTotalCallStackDepth;
    this.schedule.depth = 0;
    this.schedule.totalDepth = 0;
    this.schedule.timeSlice = timeSlice;
  } // do some work in a time slice, but in serial


  (0, _createClass2["default"])(AsyncAlgorithm, [{
    key: "doWork",
    value: function doWork(fn, callback) {
      var schedule = this.schedule;

      if (schedule.totalDepth >= schedule.MAX_TOTAL_DEPTH) {
        return callback(new Error('Maximum total call stack depth exceeded; canonicalization aborting.'));
      }

      (function work() {
        if (schedule.depth === schedule.MAX_DEPTH) {
          // stack too deep, run on next tick
          schedule.depth = 0;
          schedule.running = false;
          return util.nextTick(work);
        } // if not yet running, force run


        var now = Date.now();

        if (!schedule.running) {
          schedule.start = Date.now();
          schedule.deadline = schedule.start + schedule.timeSlice;
        } // TODO: should also include an estimate of expectedWorkTime


        if (now < schedule.deadline) {
          schedule.running = true;
          schedule.depth++;
          schedule.totalDepth++;
          return fn(function (err, result) {
            schedule.depth--;
            schedule.totalDepth--;
            callback(err, result);
          });
        } // not enough time left in this slice, run after letting browser
        // do some other things


        schedule.depth = 0;
        schedule.running = false;
        util.setImmediate(work);
      })();
    } // asynchronously loop

  }, {
    key: "forEach",
    value: function forEach(iterable, fn, callback) {
      var self = this;

      var _iterator2;

      var idx = 0;
      var length;

      if (Array.isArray(iterable)) {
        length = iterable.length;

        _iterator2 = function iterator() {
          if (idx === length) {
            return false;
          }

          _iterator2.value = iterable[idx++];
          _iterator2.key = idx;
          return true;
        };
      } else {
        var keys = Object.keys(iterable);
        length = keys.length;

        _iterator2 = function _iterator() {
          if (idx === length) {
            return false;
          }

          _iterator2.key = keys[idx++];
          _iterator2.value = iterable[_iterator2.key];
          return true;
        };
      }

      (function iterate(err) {
        if (err) {
          return callback(err);
        }

        if (_iterator2()) {
          return self.doWork(function () {
            return fn(_iterator2.value, _iterator2.key, iterate);
          });
        }

        callback();
      })();
    } // asynchronous waterfall

  }, {
    key: "waterfall",
    value: function waterfall(fns, callback) {
      var self = this;
      self.forEach(fns, function (fn, idx, callback) {
        return self.doWork(fn, callback);
      }, callback);
    } // asynchronous while

  }, {
    key: "whilst",
    value: function whilst(condition, fn, callback) {
      var self = this;

      (function loop(err) {
        if (err) {
          return callback(err);
        }

        if (!condition()) {
          return callback();
        }

        self.doWork(fn, loop);
      })();
    }
  }]);
  return AsyncAlgorithm;
}();

/***/ }),

/***/ "./node_modules/rdf-canonize/lib/IdentifierIssuer.js":
/*!***********************************************************!*\
  !*** ./node_modules/rdf-canonize/lib/IdentifierIssuer.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var util = __webpack_require__(/*! ./util */ "./node_modules/rdf-canonize/lib/util.js");

module.exports = /*#__PURE__*/function () {
  /**
   * Creates a new IdentifierIssuer. A IdentifierIssuer issues unique
   * identifiers, keeping track of any previously issued identifiers.
   *
   * @param prefix the prefix to use ('<prefix><counter>').
   */
  function IdentifierIssuer(prefix) {
    (0, _classCallCheck2["default"])(this, IdentifierIssuer);
    this.prefix = prefix;
    this.counter = 0;
    this.existing = {};
  }
  /**
   * Copies this IdentifierIssuer.
   *
   * @return a copy of this IdentifierIssuer.
   */


  (0, _createClass2["default"])(IdentifierIssuer, [{
    key: "clone",
    value: function clone() {
      var copy = new IdentifierIssuer(this.prefix);
      copy.counter = this.counter;
      copy.existing = util.clone(this.existing);
      return copy;
    }
    /**
     * Gets the new identifier for the given old identifier, where if no old
     * identifier is given a new identifier will be generated.
     *
     * @param [old] the old identifier to get the new identifier for.
     *
     * @return the new identifier.
     */

  }, {
    key: "getId",
    value: function getId(old) {
      // return existing old identifier
      if (old && old in this.existing) {
        return this.existing[old];
      } // get next identifier


      var identifier = this.prefix + this.counter;
      this.counter += 1; // save mapping

      if (old) {
        this.existing[old] = identifier;
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

  }, {
    key: "hasId",
    value: function hasId(old) {
      return old in this.existing;
    }
  }]);
  return IdentifierIssuer;
}();

/***/ }),

/***/ "./node_modules/rdf-canonize/lib/MessageDigest-browser.js":
/*!****************************************************************!*\
  !*** ./node_modules/rdf-canonize/lib/MessageDigest-browser.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var forge = __webpack_require__(/*! node-forge/lib/forge */ "./node_modules/node-forge/lib/forge.js");

__webpack_require__(/*! node-forge/lib/md */ "./node_modules/node-forge/lib/md.js");

__webpack_require__(/*! node-forge/lib/sha1 */ "./node_modules/node-forge/lib/sha1.js");

__webpack_require__(/*! node-forge/lib/sha256 */ "./node_modules/node-forge/lib/sha256.js");

module.exports = /*#__PURE__*/function () {
  /**
   * Creates a new MessageDigest.
   *
   * @param algorithm the algorithm to use.
   */
  function MessageDigest(algorithm) {
    (0, _classCallCheck2["default"])(this, MessageDigest);
    this.md = forge.md[algorithm].create();
  }

  (0, _createClass2["default"])(MessageDigest, [{
    key: "update",
    value: function update(msg) {
      this.md.update(msg, 'utf8');
    }
  }, {
    key: "digest",
    value: function digest() {
      return this.md.digest().toHex();
    }
  }]);
  return MessageDigest;
}();

/***/ }),

/***/ "./node_modules/rdf-canonize/lib/NQuads.js":
/*!*************************************************!*\
  !*** ./node_modules/rdf-canonize/lib/NQuads.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var TERMS = ['subject', 'predicate', 'object', 'graph'];
var RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
var RDF_LANGSTRING = RDF + 'langString';
var XSD_STRING = 'http://www.w3.org/2001/XMLSchema#string'; // build regexes

var REGEX = {};

(function () {
  var iri = '(?:<([^:]+:[^>]*)>)'; // https://www.w3.org/TR/turtle/#grammar-production-BLANK_NODE_LABEL

  var PN_CHARS_BASE = 'A-Z' + 'a-z' + "\xC0-\xD6" + "\xD8-\xF6" + "\xF8-\u02FF" + "\u0370-\u037D" + "\u037F-\u1FFF" + "\u200C-\u200D" + "\u2070-\u218F" + "\u2C00-\u2FEF" + "\u3001-\uD7FF" + "\uF900-\uFDCF" + "\uFDF0-\uFFFD"; // TODO:
  //'\u10000-\uEFFFF';

  var PN_CHARS_U = PN_CHARS_BASE + '_';
  var PN_CHARS = PN_CHARS_U + '0-9' + '-' + "\xB7" + "\u0300-\u036F" + "\u203F-\u2040";
  var BLANK_NODE_LABEL = '(_:' + '(?:[' + PN_CHARS_U + '0-9])' + '(?:(?:[' + PN_CHARS + '.])*(?:[' + PN_CHARS + ']))?' + ')';
  var bnode = BLANK_NODE_LABEL;
  var plain = '"([^"\\\\]*(?:\\\\.[^"\\\\]*)*)"';
  var datatype = '(?:\\^\\^' + iri + ')';
  var language = '(?:@([a-zA-Z]+(?:-[a-zA-Z0-9]+)*))';
  var literal = '(?:' + plain + '(?:' + datatype + '|' + language + ')?)';
  var ws = '[ \\t]+';
  var wso = '[ \\t]*'; // define quad part regexes

  var subject = '(?:' + iri + '|' + bnode + ')' + ws;
  var property = iri + ws;
  var object = '(?:' + iri + '|' + bnode + '|' + literal + ')' + wso;
  var graphName = '(?:\\.|(?:(?:' + iri + '|' + bnode + ')' + wso + '\\.))'; // end of line and empty regexes

  REGEX.eoln = /(?:\r\n)|(?:\n)|(?:\r)/g;
  REGEX.empty = new RegExp('^' + wso + '$'); // full quad regex

  REGEX.quad = new RegExp('^' + wso + subject + property + object + graphName + wso + '$');
})();

module.exports = /*#__PURE__*/function () {
  function NQuads() {
    (0, _classCallCheck2["default"])(this, NQuads);
  }

  (0, _createClass2["default"])(NQuads, null, [{
    key: "parse",

    /**
     * Parses RDF in the form of N-Quads.
     *
     * @param input the N-Quads input to parse.
     *
     * @return an RDF dataset (an array of quads per http://rdf.js.org/).
     */
    value: function parse(input) {
      // build RDF dataset
      var dataset = [];
      var graphs = {}; // split N-Quad input into lines

      var lines = input.split(REGEX.eoln);
      var lineNumber = 0;

      var _iterator = _createForOfIteratorHelper(lines),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var line = _step.value;
          lineNumber++; // skip empty lines

          if (REGEX.empty.test(line)) {
            continue;
          } // parse quad


          var match = line.match(REGEX.quad);

          if (match === null) {
            throw new Error('N-Quads parse error on line ' + lineNumber + '.');
          } // create RDF quad


          var quad = {}; // get subject

          if (match[1] !== undefined) {
            quad.subject = {
              termType: 'NamedNode',
              value: match[1]
            };
          } else {
            quad.subject = {
              termType: 'BlankNode',
              value: match[2]
            };
          } // get predicate


          quad.predicate = {
            termType: 'NamedNode',
            value: match[3]
          }; // get object

          if (match[4] !== undefined) {
            quad.object = {
              termType: 'NamedNode',
              value: match[4]
            };
          } else if (match[5] !== undefined) {
            quad.object = {
              termType: 'BlankNode',
              value: match[5]
            };
          } else {
            quad.object = {
              termType: 'Literal',
              value: undefined,
              datatype: {
                termType: 'NamedNode'
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
              termType: 'NamedNode',
              value: match[9]
            };
          } else if (match[10] !== undefined) {
            quad.graph = {
              termType: 'BlankNode',
              value: match[10]
            };
          } else {
            quad.graph = {
              termType: 'DefaultGraph',
              value: ''
            };
          } // only add quad if it is unique in its graph


          if (!(quad.graph.value in graphs)) {
            graphs[quad.graph.value] = [quad];
            dataset.push(quad);
          } else {
            var unique = true;
            var quads = graphs[quad.graph.value];

            var _iterator2 = _createForOfIteratorHelper(quads),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var q = _step2.value;

                if (_compareTriples(q, quad)) {
                  unique = false;
                  break;
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            if (unique) {
              quads.push(quad);
              dataset.push(quad);
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
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

  }, {
    key: "serialize",
    value: function serialize(dataset) {
      if (!Array.isArray(dataset)) {
        dataset = NQuads.legacyDatasetToQuads(dataset);
      }

      var quads = [];

      var _iterator3 = _createForOfIteratorHelper(dataset),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var quad = _step3.value;
          quads.push(NQuads.serializeQuad(quad));
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
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

  }, {
    key: "serializeQuad",
    value: function serializeQuad(quad) {
      var s = quad.subject;
      var p = quad.predicate;
      var o = quad.object;
      var g = quad.graph;
      var nquad = ''; // subject and predicate can only be NamedNode or BlankNode

      [s, p].forEach(function (term) {
        if (term.termType === 'NamedNode') {
          nquad += '<' + term.value + '>';
        } else {
          nquad += term.value;
        }

        nquad += ' ';
      }); // object is NamedNode, BlankNode, or Literal

      if (o.termType === 'NamedNode') {
        nquad += '<' + o.value + '>';
      } else if (o.termType === 'BlankNode') {
        nquad += o.value;
      } else {
        nquad += '"' + _escape(o.value) + '"';

        if (o.datatype.value === RDF_LANGSTRING) {
          if (o.language) {
            nquad += '@' + o.language;
          }
        } else if (o.datatype.value !== XSD_STRING) {
          nquad += '^^<' + o.datatype.value + '>';
        }
      } // graph can only be NamedNode or BlankNode (or DefaultGraph, but that
      // does not add to `nquad`)


      if (g.termType === 'NamedNode') {
        nquad += ' <' + g.value + '>';
      } else if (g.termType === 'BlankNode') {
        nquad += ' ' + g.value;
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

  }, {
    key: "legacyDatasetToQuads",
    value: function legacyDatasetToQuads(dataset) {
      var quads = [];
      var termTypeMap = {
        'blank node': 'BlankNode',
        'IRI': 'NamedNode',
        'literal': 'Literal'
      };

      var _loop = function _loop(graphName) {
        var triples = dataset[graphName];
        triples.forEach(function (triple) {
          var quad = {};

          for (var componentName in triple) {
            var oldComponent = triple[componentName];
            var newComponent = {
              termType: termTypeMap[oldComponent.type],
              value: oldComponent.value
            };

            if (newComponent.termType === 'Literal') {
              newComponent.datatype = {
                termType: 'NamedNode'
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
              termType: 'DefaultGraph',
              value: ''
            };
          } else {
            quad.graph = {
              termType: graphName.startsWith('_:') ? 'BlankNode' : 'NamedNode',
              value: graphName
            };
          }

          quads.push(quad);
        });
      };

      for (var graphName in dataset) {
        _loop(graphName);
      }

      return quads;
    }
  }]);
  return NQuads;
}();
/**
 * Compares two RDF triples for equality.
 *
 * @param t1 the first triple.
 * @param t2 the second triple.
 *
 * @return true if the triples are the same, false if not.
 */


function _compareTriples(t1, t2) {
  for (var k in t1) {
    if (t1[k].termType !== t2[k].termType || t1[k].value !== t2[k].value) {
      return false;
    }
  }

  if (t1.object.termType !== 'Literal') {
    return true;
  }

  return t1.object.datatype.termType === t2.object.datatype.termType && t1.object.datatype.value === t2.object.datatype.value && t1.object.language === t2.object.language;
}

var _escapeRegex = /["\\\n\r]/g;
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

var _unescapeRegex = /(?:\\([tbnrf"'\\]))|(?:\\u([0-9A-Fa-f]{4}))|(?:\\U([0-9A-Fa-f]{8}))/g;
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

/***/ "./node_modules/rdf-canonize/lib/Permutator.js":
/*!*****************************************************!*\
  !*** ./node_modules/rdf-canonize/lib/Permutator.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
 // TODO: convert to ES6 iterable

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

module.exports = /*#__PURE__*/function () {
  /**
   * A Permutator iterates over all possible permutations of the given array
   * of elements.
   *
   * @param list the array of elements to iterate over.
   */
  function Permutator(list) {
    (0, _classCallCheck2["default"])(this, Permutator);
    // original array
    this.list = list.sort(); // indicates whether there are more permutations

    this.done = false; // directional info for permutation algorithm

    this.left = {};

    for (var i = 0; i < list.length; ++i) {
      this.left[list[i]] = true;
    }
  }
  /**
   * Returns true if there is another permutation.
   *
   * @return true if there is another permutation, false if not.
   */


  (0, _createClass2["default"])(Permutator, [{
    key: "hasNext",
    value: function hasNext() {
      return !this.done;
    }
    /**
     * Gets the next permutation. Call hasNext() to ensure there is another one
     * first.
     *
     * @return the next permutation.
     */

  }, {
    key: "next",
    value: function next() {
      // copy current permutation
      var rval = this.list.slice();
      /* Calculate the next permutation using the Steinhaus-Johnson-Trotter
       permutation algorithm. */
      // get largest mobile element k
      // (mobile: element is greater than the one it is looking at)

      var k = null;
      var pos = 0;
      var length = this.list.length;

      for (var i = 0; i < length; ++i) {
        var element = this.list[i];
        var left = this.left[element];

        if ((k === null || element > k) && (left && i > 0 && element > this.list[i - 1] || !left && i < length - 1 && element > this.list[i + 1])) {
          k = element;
          pos = i;
        }
      } // no more permutations


      if (k === null) {
        this.done = true;
      } else {
        // swap k and the element it is looking at
        var swap = this.left[k] ? pos - 1 : pos + 1;
        this.list[pos] = this.list[swap];
        this.list[swap] = k; // reverse the direction of all elements larger than k

        for (var _i = 0; _i < length; ++_i) {
          if (this.list[_i] > k) {
            this.left[this.list[_i]] = !this.left[this.list[_i]];
          }
        }
      }

      return rval;
    }
  }]);
  return Permutator;
}();

/***/ }),

/***/ "./node_modules/rdf-canonize/lib/URDNA2015.js":
/*!****************************************************!*\
  !*** ./node_modules/rdf-canonize/lib/URDNA2015.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var AsyncAlgorithm = __webpack_require__(/*! ./AsyncAlgorithm */ "./node_modules/rdf-canonize/lib/AsyncAlgorithm.js");

var IdentifierIssuer = __webpack_require__(/*! ./IdentifierIssuer */ "./node_modules/rdf-canonize/lib/IdentifierIssuer.js");

var MessageDigest = __webpack_require__(/*! ./MessageDigest */ "./node_modules/rdf-canonize/lib/MessageDigest-browser.js");

var Permutator = __webpack_require__(/*! ./Permutator */ "./node_modules/rdf-canonize/lib/Permutator.js");

var NQuads = __webpack_require__(/*! ./NQuads */ "./node_modules/rdf-canonize/lib/NQuads.js");

var util = __webpack_require__(/*! ./util */ "./node_modules/rdf-canonize/lib/util.js");

var POSITIONS = {
  subject: 's',
  object: 'o',
  graph: 'g'
};

module.exports = /*#__PURE__*/function (_AsyncAlgorithm) {
  (0, _inherits2["default"])(URDNA2015, _AsyncAlgorithm);

  var _super = _createSuper(URDNA2015);

  function URDNA2015(options) {
    var _this;

    (0, _classCallCheck2["default"])(this, URDNA2015);
    options = options || {};
    _this = _super.call(this, options);
    _this.name = 'URDNA2015';
    _this.options = Object.assign({}, options);
    _this.blankNodeInfo = {};
    _this.hashToBlankNodes = {};
    _this.canonicalIssuer = new IdentifierIssuer('_:c14n');
    _this.hashAlgorithm = 'sha256';
    _this.quads;
    return _this;
  } // 4.4) Normalization Algorithm


  (0, _createClass2["default"])(URDNA2015, [{
    key: "main",
    value: function main(dataset, callback) {
      var self = this;
      self.schedule.start = Date.now();
      var result;
      self.quads = dataset; // 1) Create the normalization state.
      // Note: Optimize by generating non-normalized blank node map concurrently.

      var nonNormalized = {};
      self.waterfall([function (callback) {
        // 2) For every quad in input dataset:
        self.forEach(dataset, function (quad, idx, callback) {
          // 2.1) For each blank node that occurs in the quad, add a reference
          // to the quad using the blank node identifier in the blank node to
          // quads map, creating a new entry if necessary.
          self.forEachComponent(quad, function (component) {
            if (component.termType !== 'BlankNode') {
              return;
            }

            var id = component.value;

            if (id in self.blankNodeInfo) {
              self.blankNodeInfo[id].quads.push(quad);
            } else {
              nonNormalized[id] = true;
              self.blankNodeInfo[id] = {
                quads: [quad]
              };
            }
          });
          callback();
        }, callback);
      }, function (callback) {
        // 3) Create a list of non-normalized blank node identifiers
        // non-normalized identifiers and populate it using the keys from the
        // blank node to quads map.
        // Note: We use a map here and it was generated during step 2.
        // 4) Initialize simple, a boolean flag, to true.
        var simple = true; // 5) While simple is true, issue canonical identifiers for blank nodes:

        self.whilst(function () {
          return simple;
        }, function (callback) {
          // 5.1) Set simple to false.
          simple = false; // 5.2) Clear hash to blank nodes map.

          self.hashToBlankNodes = {};
          self.waterfall([function (callback) {
            // 5.3) For each blank node identifier identifier in
            // non-normalized identifiers:
            self.forEach(nonNormalized, function (value, id, callback) {
              // 5.3.1) Create a hash, hash, according to the Hash First
              // Degree Quads algorithm.
              self.hashFirstDegreeQuads(id, function (err, hash) {
                if (err) {
                  return callback(err);
                } // 5.3.2) Add hash and identifier to hash to blank nodes map,
                // creating a new entry if necessary.


                if (hash in self.hashToBlankNodes) {
                  self.hashToBlankNodes[hash].push(id);
                } else {
                  self.hashToBlankNodes[hash] = [id];
                }

                callback();
              });
            }, callback);
          }, function (callback) {
            // 5.4) For each hash to identifier list mapping in hash to blank
            // nodes map, lexicographically-sorted by hash:
            var hashes = Object.keys(self.hashToBlankNodes).sort();
            self.forEach(hashes, function (hash, i, callback) {
              // 5.4.1) If the length of identifier list is greater than 1,
              // continue to the next mapping.
              var idList = self.hashToBlankNodes[hash];

              if (idList.length > 1) {
                return callback();
              } // 5.4.2) Use the Issue Identifier algorithm, passing canonical
              // issuer and the single blank node identifier in identifier
              // list, identifier, to issue a canonical replacement identifier
              // for identifier.
              // TODO: consider changing `getId` to `issue`


              var id = idList[0];
              self.canonicalIssuer.getId(id); // 5.4.3) Remove identifier from non-normalized identifiers.

              delete nonNormalized[id]; // 5.4.4) Remove hash from the hash to blank nodes map.

              delete self.hashToBlankNodes[hash]; // 5.4.5) Set simple to true.

              simple = true;
              callback();
            }, callback);
          }], callback);
        }, callback);
      }, function (callback) {
        // 6) For each hash to identifier list mapping in hash to blank nodes
        // map, lexicographically-sorted by hash:
        var hashes = Object.keys(self.hashToBlankNodes).sort();
        self.forEach(hashes, function (hash, idx, callback) {
          // 6.1) Create hash path list where each item will be a result of
          // running the Hash N-Degree Quads algorithm.
          var hashPathList = []; // 6.2) For each blank node identifier identifier in identifier list:

          var idList = self.hashToBlankNodes[hash];
          self.waterfall([function (callback) {
            self.forEach(idList, function (id, idx, callback) {
              // 6.2.1) If a canonical identifier has already been issued for
              // identifier, continue to the next identifier.
              if (self.canonicalIssuer.hasId(id)) {
                return callback();
              } // 6.2.2) Create temporary issuer, an identifier issuer
              // initialized with the prefix _:b.


              var issuer = new IdentifierIssuer('_:b'); // 6.2.3) Use the Issue Identifier algorithm, passing temporary
              // issuer and identifier, to issue a new temporary blank node
              // identifier for identifier.

              issuer.getId(id); // 6.2.4) Run the Hash N-Degree Quads algorithm, passing
              // temporary issuer, and append the result to the hash path
              // list.

              self.hashNDegreeQuads(id, issuer, function (err, result) {
                if (err) {
                  return callback(err);
                }

                hashPathList.push(result);
                callback();
              });
            }, callback);
          }, function (callback) {
            // 6.3) For each result in the hash path list,
            // lexicographically-sorted by the hash in result:
            // TODO: use `String.localeCompare`?
            hashPathList.sort(function (a, b) {
              return a.hash < b.hash ? -1 : a.hash > b.hash ? 1 : 0;
            });
            self.forEach(hashPathList, function (result, idx, callback) {
              // 6.3.1) For each blank node identifier, existing identifier,
              // that was issued a temporary identifier by identifier issuer
              // in result, issue a canonical identifier, in the same order,
              // using the Issue Identifier algorithm, passing canonical
              // issuer and existing identifier.
              for (var existing in result.issuer.existing) {
                self.canonicalIssuer.getId(existing);
              }

              callback();
            }, callback);
          }], callback);
        }, callback);
      }, function (callback) {
        /* Note: At this point all blank nodes in the set of RDF quads have been
        assigned canonical identifiers, which have been stored in the canonical
        issuer. Here each quad is updated by assigning each of its blank nodes
        its new identifier. */
        // 7) For each quad, quad, in input dataset:
        var normalized = [];
        self.waterfall([function (callback) {
          self.forEach(self.quads, function (quad, idx, callback) {
            // 7.1) Create a copy, quad copy, of quad and replace any existing
            // blank node identifiers using the canonical identifiers
            // previously issued by canonical issuer.
            // Note: We optimize away the copy here.
            self.forEachComponent(quad, function (component) {
              if (component.termType === 'BlankNode' && !component.value.startsWith(self.canonicalIssuer.prefix)) {
                component.value = self.canonicalIssuer.getId(component.value);
              }
            }); // 7.2) Add quad copy to the normalized dataset.

            normalized.push(NQuads.serializeQuad(quad));
            callback();
          }, callback);
        }, function (callback) {
          // sort normalized output
          normalized.sort(); // 8) Return the normalized dataset.

          result = normalized.join('');
          return callback();
        }], callback);
      }], function (err) {
        return callback(err, result);
      });
    } // 4.6) Hash First Degree Quads

  }, {
    key: "hashFirstDegreeQuads",
    value: function hashFirstDegreeQuads(id, callback) {
      var self = this; // return cached hash

      var info = self.blankNodeInfo[id];

      if ('hash' in info) {
        return callback(null, info.hash);
      } // 1) Initialize nquads to an empty list. It will be used to store quads in
      // N-Quads format.


      var nquads = []; // 2) Get the list of quads quads associated with the reference blank node
      // identifier in the blank node to quads map.

      var quads = info.quads; // 3) For each quad quad in quads:

      self.forEach(quads, function (quad, idx, callback) {
        // 3.1) Serialize the quad in N-Quads format with the following special
        // rule:
        // 3.1.1) If any component in quad is an blank node, then serialize it
        // using a special identifier as follows:
        var copy = {
          predicate: quad.predicate
        };
        self.forEachComponent(quad, function (component, key) {
          // 3.1.2) If the blank node's existing blank node identifier matches the
          // reference blank node identifier then use the blank node identifier
          // _:a, otherwise, use the blank node identifier _:z.
          copy[key] = self.modifyFirstDegreeComponent(id, component, key);
        });
        nquads.push(NQuads.serializeQuad(copy));
        callback();
      }, function (err) {
        if (err) {
          return callback(err);
        } // 4) Sort nquads in lexicographical order.


        nquads.sort(); // 5) Return the hash that results from passing the sorted, joined nquads
        // through the hash algorithm.

        var md = new MessageDigest(self.hashAlgorithm);

        for (var i = 0; i < nquads.length; ++i) {
          md.update(nquads[i]);
        } // TODO: represent as byte buffer instead to cut memory usage in half


        info.hash = md.digest();
        callback(null, info.hash);
      });
    } // 4.7) Hash Related Blank Node

  }, {
    key: "hashRelatedBlankNode",
    value: function hashRelatedBlankNode(related, quad, issuer, position, callback) {
      var self = this; // 1) Set the identifier to use for related, preferring first the canonical
      // identifier for related if issued, second the identifier issued by issuer
      // if issued, and last, if necessary, the result of the Hash First Degree
      // Quads algorithm, passing related.

      var id;
      self.waterfall([function (callback) {
        if (self.canonicalIssuer.hasId(related)) {
          id = self.canonicalIssuer.getId(related);
          return callback();
        }

        if (issuer.hasId(related)) {
          id = issuer.getId(related);
          return callback();
        }

        self.hashFirstDegreeQuads(related, function (err, hash) {
          if (err) {
            return callback(err);
          }

          id = hash;
          callback();
        });
      }], function (err) {
        if (err) {
          return callback(err);
        } // 2) Initialize a string input to the value of position.
        // Note: We use a hash object instead.


        var md = new MessageDigest(self.hashAlgorithm);
        md.update(position); // 3) If position is not g, append <, the value of the predicate in quad,
        // and > to input.

        if (position !== 'g') {
          md.update(self.getRelatedPredicate(quad));
        } // 4) Append identifier to input.


        md.update(id); // 5) Return the hash that results from passing input through the hash
        // algorithm.
        // TODO: represent as byte buffer instead to cut memory usage in half

        return callback(null, md.digest());
      });
    } // 4.8) Hash N-Degree Quads

  }, {
    key: "hashNDegreeQuads",
    value: function hashNDegreeQuads(id, issuer, callback) {
      var self = this; // 1) Create a hash to related blank nodes map for storing hashes that
      // identify related blank nodes.
      // Note: 2) and 3) handled within `createHashToRelated`

      var hashToRelated;
      var md = new MessageDigest(self.hashAlgorithm);
      self.waterfall([function (callback) {
        return self.createHashToRelated(id, issuer, function (err, result) {
          if (err) {
            return callback(err);
          }

          hashToRelated = result;
          callback();
        });
      }, function (callback) {
        // 4) Create an empty string, data to hash.
        // Note: We created a hash object `md` above instead.
        // 5) For each related hash to blank node list mapping in hash to
        // related blank nodes map, sorted lexicographically by related hash:
        var hashes = Object.keys(hashToRelated).sort();
        self.forEach(hashes, function (hash, idx, callback) {
          // 5.1) Append the related hash to the data to hash.
          md.update(hash); // 5.2) Create a string chosen path.

          var chosenPath = ''; // 5.3) Create an unset chosen issuer variable.

          var chosenIssuer; // 5.4) For each permutation of blank node list:

          var permutator = new Permutator(hashToRelated[hash]);
          self.whilst(function () {
            return permutator.hasNext();
          }, function (nextPermutation) {
            var permutation = permutator.next(); // 5.4.1) Create a copy of issuer, issuer copy.

            var issuerCopy = issuer.clone(); // 5.4.2) Create a string path.

            var path = ''; // 5.4.3) Create a recursion list, to store blank node identifiers
            // that must be recursively processed by this algorithm.

            var recursionList = [];
            self.waterfall([function (callback) {
              // 5.4.4) For each related in permutation:
              self.forEach(permutation, function (related, idx, callback) {
                // 5.4.4.1) If a canonical identifier has been issued for
                // related, append it to path.
                if (self.canonicalIssuer.hasId(related)) {
                  path += self.canonicalIssuer.getId(related);
                } else {
                  // 5.4.4.2) Otherwise:
                  // 5.4.4.2.1) If issuer copy has not issued an identifier
                  // for related, append related to recursion list.
                  if (!issuerCopy.hasId(related)) {
                    recursionList.push(related);
                  } // 5.4.4.2.2) Use the Issue Identifier algorithm, passing
                  // issuer copy and related and append the result to path.


                  path += issuerCopy.getId(related);
                } // 5.4.4.3) If chosen path is not empty and the length of path
                // is greater than or equal to the length of chosen path and
                // path is lexicographically greater than chosen path, then
                // skip to the next permutation.
                // Note: Comparing path length to chosen path length can be
                // optimized away; only compare lexicographically.


                if (chosenPath.length !== 0 && path > chosenPath) {
                  // FIXME: may cause inaccurate total depth calculation
                  return nextPermutation();
                }

                callback();
              }, callback);
            }, function (callback) {
              // 5.4.5) For each related in recursion list:
              self.forEach(recursionList, function (related, idx, callback) {
                // 5.4.5.1) Set result to the result of recursively executing
                // the Hash N-Degree Quads algorithm, passing related for
                // identifier and issuer copy for path identifier issuer.
                self.hashNDegreeQuads(related, issuerCopy, function (err, result) {
                  if (err) {
                    return callback(err);
                  } // 5.4.5.2) Use the Issue Identifier algorithm, passing
                  // issuer copy and related and append the result to path.


                  path += issuerCopy.getId(related); // 5.4.5.3) Append <, the hash in result, and > to path.

                  path += '<' + result.hash + '>'; // 5.4.5.4) Set issuer copy to the identifier issuer in
                  // result.

                  issuerCopy = result.issuer; // 5.4.5.5) If chosen path is not empty and the length of
                  // path is greater than or equal to the length of chosen
                  // path and path is lexicographically greater than chosen
                  // path, then skip to the next permutation.
                  // Note: Comparing path length to chosen path length can be
                  // optimized away; only compare lexicographically.

                  if (chosenPath.length !== 0 && path > chosenPath) {
                    // FIXME: may cause inaccurate total depth calculation
                    return nextPermutation();
                  }

                  callback();
                });
              }, callback);
            }, function (callback) {
              // 5.4.6) If chosen path is empty or path is lexicographically
              // less than chosen path, set chosen path to path and chosen
              // issuer to issuer copy.
              if (chosenPath.length === 0 || path < chosenPath) {
                chosenPath = path;
                chosenIssuer = issuerCopy;
              }

              callback();
            }], nextPermutation);
          }, function (err) {
            if (err) {
              return callback(err);
            } // 5.5) Append chosen path to data to hash.


            md.update(chosenPath); // 5.6) Replace issuer, by reference, with chosen issuer.

            issuer = chosenIssuer;
            callback();
          });
        }, callback);
      }], function (err) {
        // 6) Return issuer and the hash that results from passing data to hash
        // through the hash algorithm.
        callback(err, {
          hash: md.digest(),
          issuer: issuer
        });
      });
    } // helper for modifying component during Hash First Degree Quads

  }, {
    key: "modifyFirstDegreeComponent",
    value: function modifyFirstDegreeComponent(id, component) {
      if (component.termType !== 'BlankNode') {
        return component;
      }

      component = util.clone(component);
      component.value = component.value === id ? '_:a' : '_:z';
      return component;
    } // helper for getting a related predicate

  }, {
    key: "getRelatedPredicate",
    value: function getRelatedPredicate(quad) {
      return '<' + quad.predicate.value + '>';
    } // helper for creating hash to related blank nodes map

  }, {
    key: "createHashToRelated",
    value: function createHashToRelated(id, issuer, callback) {
      var self = this; // 1) Create a hash to related blank nodes map for storing hashes that
      // identify related blank nodes.

      var hashToRelated = {}; // 2) Get a reference, quads, to the list of quads in the blank node to
      // quads map for the key identifier.

      var quads = self.blankNodeInfo[id].quads; // 3) For each quad in quads:

      self.forEach(quads, function (quad, idx, callback) {
        // 3.1) For each component in quad, if component is the subject, object,
        // and graph name and it is a blank node that is not identified by
        // identifier:
        self.forEach(quad, function (component, key, callback) {
          if (key === 'predicate' || !(component.termType === 'BlankNode' && component.value !== id)) {
            return callback();
          } // 3.1.1) Set hash to the result of the Hash Related Blank Node
          // algorithm, passing the blank node identifier for component as
          // related, quad, path identifier issuer as issuer, and position as
          // either s, o, or g based on whether component is a subject, object,
          // graph name, respectively.


          var related = component.value;
          var position = POSITIONS[key];
          self.hashRelatedBlankNode(related, quad, issuer, position, function (err, hash) {
            if (err) {
              return callback(err);
            } // 3.1.2) Add a mapping of hash to the blank node identifier for
            // component to hash to related blank nodes map, adding an entry as
            // necessary.


            if (hash in hashToRelated) {
              hashToRelated[hash].push(related);
            } else {
              hashToRelated[hash] = [related];
            }

            callback();
          });
        }, callback);
      }, function (err) {
        return callback(err, hashToRelated);
      });
    } // helper that iterates over quad components (skips predicate)

  }, {
    key: "forEachComponent",
    value: function forEachComponent(quad, op) {
      for (var key in quad) {
        // skip `predicate`
        if (key === 'predicate') {
          continue;
        }

        op(quad[key], key, quad);
      }
    }
  }]);
  return URDNA2015;
}(AsyncAlgorithm);

/***/ }),

/***/ "./node_modules/rdf-canonize/lib/URDNA2015Sync.js":
/*!********************************************************!*\
  !*** ./node_modules/rdf-canonize/lib/URDNA2015Sync.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var IdentifierIssuer = __webpack_require__(/*! ./IdentifierIssuer */ "./node_modules/rdf-canonize/lib/IdentifierIssuer.js");

var MessageDigest = __webpack_require__(/*! ./MessageDigest */ "./node_modules/rdf-canonize/lib/MessageDigest-browser.js");

var Permutator = __webpack_require__(/*! ./Permutator */ "./node_modules/rdf-canonize/lib/Permutator.js");

var NQuads = __webpack_require__(/*! ./NQuads */ "./node_modules/rdf-canonize/lib/NQuads.js");

var util = __webpack_require__(/*! ./util */ "./node_modules/rdf-canonize/lib/util.js");

var POSITIONS = {
  subject: 's',
  object: 'o',
  graph: 'g'
};

module.exports = /*#__PURE__*/function () {
  function URDNA2015Sync() {
    (0, _classCallCheck2["default"])(this, URDNA2015Sync);
    this.name = 'URDNA2015';
    this.blankNodeInfo = {};
    this.hashToBlankNodes = {};
    this.canonicalIssuer = new IdentifierIssuer('_:c14n');
    this.hashAlgorithm = 'sha256';
    this.quads;
  } // 4.4) Normalization Algorithm


  (0, _createClass2["default"])(URDNA2015Sync, [{
    key: "main",
    value: function main(dataset) {
      var self = this;
      self.quads = dataset; // 1) Create the normalization state.
      // Note: Optimize by generating non-normalized blank node map concurrently.

      var nonNormalized = {}; // 2) For every quad in input dataset:

      var _iterator = _createForOfIteratorHelper(dataset),
          _step;

      try {
        var _loop = function _loop() {
          var quad = _step.value;
          // 2.1) For each blank node that occurs in the quad, add a reference
          // to the quad using the blank node identifier in the blank node to
          // quads map, creating a new entry if necessary.
          self.forEachComponent(quad, function (component) {
            if (component.termType !== 'BlankNode') {
              return;
            }

            var id = component.value;

            if (id in self.blankNodeInfo) {
              self.blankNodeInfo[id].quads.push(quad);
            } else {
              nonNormalized[id] = true;
              self.blankNodeInfo[id] = {
                quads: [quad]
              };
            }
          });
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        } // 3) Create a list of non-normalized blank node identifiers
        // non-normalized identifiers and populate it using the keys from the
        // blank node to quads map.
        // Note: We use a map here and it was generated during step 2.
        // 4) Initialize simple, a boolean flag, to true.

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var simple = true; // 5) While simple is true, issue canonical identifiers for blank nodes:

      while (simple) {
        // 5.1) Set simple to false.
        simple = false; // 5.2) Clear hash to blank nodes map.

        self.hashToBlankNodes = {}; // 5.3) For each blank node identifier identifier in non-normalized
        // identifiers:

        for (var id in nonNormalized) {
          // 5.3.1) Create a hash, hash, according to the Hash First Degree
          // Quads algorithm.
          var hash = self.hashFirstDegreeQuads(id); // 5.3.2) Add hash and identifier to hash to blank nodes map,
          // creating a new entry if necessary.

          if (hash in self.hashToBlankNodes) {
            self.hashToBlankNodes[hash].push(id);
          } else {
            self.hashToBlankNodes[hash] = [id];
          }
        } // 5.4) For each hash to identifier list mapping in hash to blank
        // nodes map, lexicographically-sorted by hash:


        var _hashes = Object.keys(self.hashToBlankNodes).sort();

        for (var i = 0; i < _hashes.length; ++i) {
          // 5.4.1) If the length of identifier list is greater than 1,
          // continue to the next mapping.
          var _hash = _hashes[i];
          var idList = self.hashToBlankNodes[_hash];

          if (idList.length > 1) {
            continue;
          } // 5.4.2) Use the Issue Identifier algorithm, passing canonical
          // issuer and the single blank node identifier in identifier
          // list, identifier, to issue a canonical replacement identifier
          // for identifier.
          // TODO: consider changing `getId` to `issue`


          var _id = idList[0];
          self.canonicalIssuer.getId(_id); // 5.4.3) Remove identifier from non-normalized identifiers.

          delete nonNormalized[_id]; // 5.4.4) Remove hash from the hash to blank nodes map.

          delete self.hashToBlankNodes[_hash]; // 5.4.5) Set simple to true.

          simple = true;
        }
      } // 6) For each hash to identifier list mapping in hash to blank nodes map,
      // lexicographically-sorted by hash:


      var hashes = Object.keys(self.hashToBlankNodes).sort();

      for (var _i = 0; _i < hashes.length; ++_i) {
        // 6.1) Create hash path list where each item will be a result of
        // running the Hash N-Degree Quads algorithm.
        var hashPathList = []; // 6.2) For each blank node identifier identifier in identifier list:

        var _hash2 = hashes[_i];
        var _idList = self.hashToBlankNodes[_hash2];

        for (var j = 0; j < _idList.length; ++j) {
          // 6.2.1) If a canonical identifier has already been issued for
          // identifier, continue to the next identifier.
          var _id2 = _idList[j];

          if (self.canonicalIssuer.hasId(_id2)) {
            continue;
          } // 6.2.2) Create temporary issuer, an identifier issuer
          // initialized with the prefix _:b.


          var issuer = new IdentifierIssuer('_:b'); // 6.2.3) Use the Issue Identifier algorithm, passing temporary
          // issuer and identifier, to issue a new temporary blank node
          // identifier for identifier.

          issuer.getId(_id2); // 6.2.4) Run the Hash N-Degree Quads algorithm, passing
          // temporary issuer, and append the result to the hash path list.

          var result = self.hashNDegreeQuads(_id2, issuer);
          hashPathList.push(result);
        } // 6.3) For each result in the hash path list,
        // lexicographically-sorted by the hash in result:
        // TODO: use `String.localeCompare`?


        hashPathList.sort(function (a, b) {
          return a.hash < b.hash ? -1 : a.hash > b.hash ? 1 : 0;
        });

        for (var _j = 0; _j < hashPathList.length; ++_j) {
          // 6.3.1) For each blank node identifier, existing identifier,
          // that was issued a temporary identifier by identifier issuer
          // in result, issue a canonical identifier, in the same order,
          // using the Issue Identifier algorithm, passing canonical
          // issuer and existing identifier.
          var _result = hashPathList[_j];

          for (var existing in _result.issuer.existing) {
            self.canonicalIssuer.getId(existing);
          }
        }
      }
      /* Note: At this point all blank nodes in the set of RDF quads have been
      assigned canonical identifiers, which have been stored in the canonical
      issuer. Here each quad is updated by assigning each of its blank nodes
      its new identifier. */
      // 7) For each quad, quad, in input dataset:


      var normalized = [];

      for (var _i2 = 0; _i2 < self.quads.length; ++_i2) {
        // 7.1) Create a copy, quad copy, of quad and replace any existing
        // blank node identifiers using the canonical identifiers
        // previously issued by canonical issuer.
        // Note: We optimize away the copy here.
        var quad = self.quads[_i2];
        self.forEachComponent(quad, function (component) {
          if (component.termType === 'BlankNode' && !component.value.startsWith(self.canonicalIssuer.prefix)) {
            component.value = self.canonicalIssuer.getId(component.value);
          }
        }); // 7.2) Add quad copy to the normalized dataset.

        normalized.push(NQuads.serializeQuad(quad));
      } // sort normalized output


      normalized.sort(); // 8) Return the normalized dataset.

      return normalized.join('');
    } // 4.6) Hash First Degree Quads

  }, {
    key: "hashFirstDegreeQuads",
    value: function hashFirstDegreeQuads(id) {
      var self = this; // return cached hash

      var info = self.blankNodeInfo[id];

      if ('hash' in info) {
        return info.hash;
      } // 1) Initialize nquads to an empty list. It will be used to store quads in
      // N-Quads format.


      var nquads = []; // 2) Get the list of quads `quads` associated with the reference blank node
      // identifier in the blank node to quads map.

      var quads = info.quads; // 3) For each quad `quad` in `quads`:

      var _loop2 = function _loop2(i) {
        var quad = quads[i]; // 3.1) Serialize the quad in N-Quads format with the following special
        // rule:
        // 3.1.1) If any component in quad is an blank node, then serialize it
        // using a special identifier as follows:

        var copy = {
          predicate: quad.predicate
        };
        self.forEachComponent(quad, function (component, key) {
          // 3.1.2) If the blank node's existing blank node identifier matches
          // the reference blank node identifier then use the blank node
          // identifier _:a, otherwise, use the blank node identifier _:z.
          copy[key] = self.modifyFirstDegreeComponent(id, component, key);
        });
        nquads.push(NQuads.serializeQuad(copy));
      };

      for (var i = 0; i < quads.length; ++i) {
        _loop2(i);
      } // 4) Sort nquads in lexicographical order.


      nquads.sort(); // 5) Return the hash that results from passing the sorted, joined nquads
      // through the hash algorithm.

      var md = new MessageDigest(self.hashAlgorithm);

      for (var _i3 = 0; _i3 < nquads.length; ++_i3) {
        md.update(nquads[_i3]);
      } // TODO: represent as byte buffer instead to cut memory usage in half


      info.hash = md.digest();
      return info.hash;
    } // 4.7) Hash Related Blank Node

  }, {
    key: "hashRelatedBlankNode",
    value: function hashRelatedBlankNode(related, quad, issuer, position) {
      var self = this; // 1) Set the identifier to use for related, preferring first the canonical
      // identifier for related if issued, second the identifier issued by issuer
      // if issued, and last, if necessary, the result of the Hash First Degree
      // Quads algorithm, passing related.

      var id;

      if (self.canonicalIssuer.hasId(related)) {
        id = self.canonicalIssuer.getId(related);
      } else if (issuer.hasId(related)) {
        id = issuer.getId(related);
      } else {
        id = self.hashFirstDegreeQuads(related);
      } // 2) Initialize a string input to the value of position.
      // Note: We use a hash object instead.


      var md = new MessageDigest(self.hashAlgorithm);
      md.update(position); // 3) If position is not g, append <, the value of the predicate in quad,
      // and > to input.

      if (position !== 'g') {
        md.update(self.getRelatedPredicate(quad));
      } // 4) Append identifier to input.


      md.update(id); // 5) Return the hash that results from passing input through the hash
      // algorithm.
      // TODO: represent as byte buffer instead to cut memory usage in half

      return md.digest();
    } // 4.8) Hash N-Degree Quads

  }, {
    key: "hashNDegreeQuads",
    value: function hashNDegreeQuads(id, issuer) {
      var self = this; // 1) Create a hash to related blank nodes map for storing hashes that
      // identify related blank nodes.
      // Note: 2) and 3) handled within `createHashToRelated`

      var md = new MessageDigest(self.hashAlgorithm);
      var hashToRelated = self.createHashToRelated(id, issuer); // 4) Create an empty string, data to hash.
      // Note: We created a hash object `md` above instead.
      // 5) For each related hash to blank node list mapping in hash to related
      // blank nodes map, sorted lexicographically by related hash:

      var hashes = Object.keys(hashToRelated).sort();

      for (var i = 0; i < hashes.length; ++i) {
        // 5.1) Append the related hash to the data to hash.
        var hash = hashes[i];
        md.update(hash); // 5.2) Create a string chosen path.

        var chosenPath = ''; // 5.3) Create an unset chosen issuer variable.

        var chosenIssuer = void 0; // 5.4) For each permutation of blank node list:

        var permutator = new Permutator(hashToRelated[hash]);

        while (permutator.hasNext()) {
          var permutation = permutator.next(); // 5.4.1) Create a copy of issuer, issuer copy.

          var issuerCopy = issuer.clone(); // 5.4.2) Create a string path.

          var path = ''; // 5.4.3) Create a recursion list, to store blank node identifiers
          // that must be recursively processed by this algorithm.

          var recursionList = []; // 5.4.4) For each related in permutation:

          var nextPermutation = false;

          for (var j = 0; j < permutation.length; ++j) {
            // 5.4.4.1) If a canonical identifier has been issued for
            // related, append it to path.
            var related = permutation[j];

            if (self.canonicalIssuer.hasId(related)) {
              path += self.canonicalIssuer.getId(related);
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


          for (var _j2 = 0; _j2 < recursionList.length; ++_j2) {
            // 5.4.5.1) Set result to the result of recursively executing
            // the Hash N-Degree Quads algorithm, passing related for
            // identifier and issuer copy for path identifier issuer.
            var _related = recursionList[_j2];
            var result = self.hashNDegreeQuads(_related, issuerCopy); // 5.4.5.2) Use the Issue Identifier algorithm, passing issuer
            // copy and related and append the result to path.

            path += issuerCopy.getId(_related); // 5.4.5.3) Append <, the hash in result, and > to path.

            path += '<' + result.hash + '>'; // 5.4.5.4) Set issuer copy to the identifier issuer in
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
        issuer: issuer
      };
    } // helper for modifying component during Hash First Degree Quads

  }, {
    key: "modifyFirstDegreeComponent",
    value: function modifyFirstDegreeComponent(id, component) {
      if (component.termType !== 'BlankNode') {
        return component;
      }

      component = util.clone(component);
      component.value = component.value === id ? '_:a' : '_:z';
      return component;
    } // helper for getting a related predicate

  }, {
    key: "getRelatedPredicate",
    value: function getRelatedPredicate(quad) {
      return '<' + quad.predicate.value + '>';
    } // helper for creating hash to related blank nodes map

  }, {
    key: "createHashToRelated",
    value: function createHashToRelated(id, issuer) {
      var self = this; // 1) Create a hash to related blank nodes map for storing hashes that
      // identify related blank nodes.

      var hashToRelated = {}; // 2) Get a reference, quads, to the list of quads in the blank node to
      // quads map for the key identifier.

      var quads = self.blankNodeInfo[id].quads; // 3) For each quad in quads:

      for (var i = 0; i < quads.length; ++i) {
        // 3.1) For each component in quad, if component is the subject, object,
        // and graph name and it is a blank node that is not identified by
        // identifier:
        var quad = quads[i];

        for (var key in quad) {
          var component = quad[key];

          if (key === 'predicate' || !(component.termType === 'BlankNode' && component.value !== id)) {
            continue;
          } // 3.1.1) Set hash to the result of the Hash Related Blank Node
          // algorithm, passing the blank node identifier for component as
          // related, quad, path identifier issuer as issuer, and position as
          // either s, o, or g based on whether component is a subject, object,
          // graph name, respectively.


          var related = component.value;
          var position = POSITIONS[key];
          var hash = self.hashRelatedBlankNode(related, quad, issuer, position); // 3.1.2) Add a mapping of hash to the blank node identifier for
          // component to hash to related blank nodes map, adding an entry as
          // necessary.

          if (hash in hashToRelated) {
            hashToRelated[hash].push(related);
          } else {
            hashToRelated[hash] = [related];
          }
        }
      }

      return hashToRelated;
    } // helper that iterates over quad components (skips predicate)

  }, {
    key: "forEachComponent",
    value: function forEachComponent(quad, op) {
      for (var key in quad) {
        // skip `predicate`
        if (key === 'predicate') {
          continue;
        }

        op(quad[key], key, quad);
      }
    }
  }]);
  return URDNA2015Sync;
}();

/***/ }),

/***/ "./node_modules/rdf-canonize/lib/URGNA2012.js":
/*!****************************************************!*\
  !*** ./node_modules/rdf-canonize/lib/URGNA2012.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var URDNA2015 = __webpack_require__(/*! ./URDNA2015 */ "./node_modules/rdf-canonize/lib/URDNA2015.js");

var util = __webpack_require__(/*! ./util */ "./node_modules/rdf-canonize/lib/util.js");

module.exports = /*#__PURE__*/function (_URDNA) {
  (0, _inherits2["default"])(URDNA2012, _URDNA);

  var _super = _createSuper(URDNA2012);

  function URDNA2012(options) {
    var _this;

    (0, _classCallCheck2["default"])(this, URDNA2012);
    _this = _super.call(this, options);
    _this.name = 'URGNA2012';
    _this.hashAlgorithm = 'sha1';
    return _this;
  } // helper for modifying component during Hash First Degree Quads


  (0, _createClass2["default"])(URDNA2012, [{
    key: "modifyFirstDegreeComponent",
    value: function modifyFirstDegreeComponent(id, component, key) {
      if (component.termType !== 'BlankNode') {
        return component;
      }

      component = util.clone(component);

      if (key === 'name') {
        component.value = '_:g';
      } else {
        component.value = component.value === id ? '_:a' : '_:z';
      }

      return component;
    } // helper for getting a related predicate

  }, {
    key: "getRelatedPredicate",
    value: function getRelatedPredicate(quad) {
      return quad.predicate.value;
    } // helper for creating hash to related blank nodes map

  }, {
    key: "createHashToRelated",
    value: function createHashToRelated(id, issuer, callback) {
      var self = this; // 1) Create a hash to related blank nodes map for storing hashes that
      // identify related blank nodes.

      var hashToRelated = {}; // 2) Get a reference, quads, to the list of quads in the blank node to
      // quads map for the key identifier.

      var quads = self.blankNodeInfo[id].quads; // 3) For each quad in quads:

      self.forEach(quads, function (quad, idx, callback) {
        // 3.1) If the quad's subject is a blank node that does not match
        // identifier, set hash to the result of the Hash Related Blank Node
        // algorithm, passing the blank node identifier for subject as related,
        // quad, path identifier issuer as issuer, and p as position.
        var position;
        var related;

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
          return callback();
        } // 3.4) Add a mapping of hash to the blank node identifier for the
        // component that matched (subject or object) to hash to related blank
        // nodes map, adding an entry as necessary.


        self.hashRelatedBlankNode(related, quad, issuer, position, function (err, hash) {
          if (err) {
            return callback(err);
          }

          if (hash in hashToRelated) {
            hashToRelated[hash].push(related);
          } else {
            hashToRelated[hash] = [related];
          }

          callback();
        });
      }, function (err) {
        return callback(err, hashToRelated);
      });
    }
  }]);
  return URDNA2012;
}(URDNA2015);

/***/ }),

/***/ "./node_modules/rdf-canonize/lib/URGNA2012Sync.js":
/*!********************************************************!*\
  !*** ./node_modules/rdf-canonize/lib/URGNA2012Sync.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var URDNA2015Sync = __webpack_require__(/*! ./URDNA2015Sync */ "./node_modules/rdf-canonize/lib/URDNA2015Sync.js");

var util = __webpack_require__(/*! ./util */ "./node_modules/rdf-canonize/lib/util.js");

module.exports = /*#__PURE__*/function (_URDNA2015Sync) {
  (0, _inherits2["default"])(URDNA2012Sync, _URDNA2015Sync);

  var _super = _createSuper(URDNA2012Sync);

  function URDNA2012Sync() {
    var _this;

    (0, _classCallCheck2["default"])(this, URDNA2012Sync);
    _this = _super.call(this);
    _this.name = 'URGNA2012';
    _this.hashAlgorithm = 'sha1';
    return _this;
  } // helper for modifying component during Hash First Degree Quads


  (0, _createClass2["default"])(URDNA2012Sync, [{
    key: "modifyFirstDegreeComponent",
    value: function modifyFirstDegreeComponent(id, component, key) {
      if (component.termType !== 'BlankNode') {
        return component;
      }

      component = util.clone(component);

      if (key === 'name') {
        component.value = '_:g';
      } else {
        component.value = component.value === id ? '_:a' : '_:z';
      }

      return component;
    } // helper for getting a related predicate

  }, {
    key: "getRelatedPredicate",
    value: function getRelatedPredicate(quad) {
      return quad.predicate.value;
    } // helper for creating hash to related blank nodes map

  }, {
    key: "createHashToRelated",
    value: function createHashToRelated(id, issuer) {
      var self = this; // 1) Create a hash to related blank nodes map for storing hashes that
      // identify related blank nodes.

      var hashToRelated = {}; // 2) Get a reference, quads, to the list of quads in the blank node to
      // quads map for the key identifier.

      var quads = self.blankNodeInfo[id].quads; // 3) For each quad in quads:

      for (var i = 0; i < quads.length; ++i) {
        // 3.1) If the quad's subject is a blank node that does not match
        // identifier, set hash to the result of the Hash Related Blank Node
        // algorithm, passing the blank node identifier for subject as related,
        // quad, path identifier issuer as issuer, and p as position.
        var quad = quads[i];
        var position = void 0;
        var related = void 0;

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


        var hash = self.hashRelatedBlankNode(related, quad, issuer, position);

        if (hash in hashToRelated) {
          hashToRelated[hash].push(related);
        } else {
          hashToRelated[hash] = [related];
        }
      }

      return hashToRelated;
    }
  }]);
  return URDNA2012Sync;
}(URDNA2015Sync);

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
 * Copyright (c) 2016-2017 Digital Bazaar, Inc.
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


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

var util = __webpack_require__(/*! ./util */ "./node_modules/rdf-canonize/lib/util.js");

var URDNA2015 = __webpack_require__(/*! ./URDNA2015 */ "./node_modules/rdf-canonize/lib/URDNA2015.js");

var URGNA2012 = __webpack_require__(/*! ./URGNA2012 */ "./node_modules/rdf-canonize/lib/URGNA2012.js");

var URDNA2015Sync = __webpack_require__(/*! ./URDNA2015Sync */ "./node_modules/rdf-canonize/lib/URDNA2015Sync.js");

var URGNA2012Sync = __webpack_require__(/*! ./URGNA2012Sync */ "./node_modules/rdf-canonize/lib/URGNA2012Sync.js"); // optional native support


var rdfCanonizeNative;

try {
  rdfCanonizeNative = __webpack_require__(/*! rdf-canonize-native */ 1);
} catch (e) {}

var api = {};
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
 * @param [callback(err, canonical)] called once the operation completes.
 *
 * @return a Promise that resolves to the canonicalized RDF Dataset.
 */


api.canonize = util.callbackify( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(dataset, options) {
    var callback, promise;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            promise = new Promise(function (resolve, reject) {
              callback = function callback(err, canonical) {
                if (err) {
                  return reject(err);
                }
                /*if(options.format === 'application/n-quads') {
                  canonical = canonical.join('');
                }
                canonical = _parseNQuads(canonical.join(''));*/


                resolve(canonical);
              };
            }); // back-compat with legacy dataset

            if (!Array.isArray(dataset)) {
              dataset = api.NQuads.legacyDatasetToQuads(dataset);
            } // TODO: convert algorithms to Promise-based async


            if (!options.useNative) {
              _context.next = 10;
              break;
            }

            if (!rdfCanonizeNative) {
              _context.next = 7;
              break;
            }

            rdfCanonizeNative.canonize(dataset, options, callback);
            _context.next = 8;
            break;

          case 7:
            throw new Error('rdf-canonize-native not available');

          case 8:
            _context.next = 23;
            break;

          case 10:
            if (!(options.algorithm === 'URDNA2015')) {
              _context.next = 14;
              break;
            }

            new URDNA2015(options).main(dataset, callback);
            _context.next = 23;
            break;

          case 14:
            if (!(options.algorithm === 'URGNA2012')) {
              _context.next = 18;
              break;
            }

            new URGNA2012(options).main(dataset, callback);
            _context.next = 23;
            break;

          case 18:
            if ('algorithm' in options) {
              _context.next = 22;
              break;
            }

            throw new Error('No RDF Dataset Canonicalization algorithm specified.');

          case 22:
            throw new Error('Invalid RDF Dataset Canonicalization algorithm: ' + options.algorithm);

          case 23:
            return _context.abrupt("return", promise);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
/**
 * Synchronously canonizes an RDF dataset.
 *
 * @param dataset the dataset to canonize.
 * @param options the options to use:
 *          algorithm the canonicalization algorithm to use, `URDNA2015` or
 *            `URGNA2012`.
 *          [useNative] use native implementation (default: false).
 *
 * @return the RDF dataset in canonical form.
 */

api.canonizeSync = function (dataset, options) {
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
  } else if (options.algorithm === 'URGNA2012') {
    return new URGNA2012Sync(options).main(dataset);
  }

  if (!('algorithm' in options)) {
    throw new Error('No RDF Dataset Canonicalization algorithm specified.');
  }

  throw new Error('Invalid RDF Dataset Canonicalization algorithm: ' + options.algorithm);
};

/***/ }),

/***/ "./node_modules/rdf-canonize/lib/util.js":
/*!***********************************************!*\
  !*** ./node_modules/rdf-canonize/lib/util.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js"));

var api = {};
module.exports = api; // define setImmediate and nextTick
//// nextTick implementation with browser-compatible fallback ////
// from https://github.com/caolan/async/blob/master/lib/async.js
// capture the global reference to guard against fakeTimer mocks

var _setImmediate = typeof setImmediate === 'function' && setImmediate;

var _delay = _setImmediate ? // not a direct alias (for IE10 compatibility)
function (fn) {
  return _setImmediate(fn);
} : function (fn) {
  return setTimeout(fn, 0);
};

if ((typeof process === "undefined" ? "undefined" : (0, _typeof2["default"])(process)) === 'object' && typeof process.nextTick === 'function') {
  api.nextTick = process.nextTick;
} else {
  api.nextTick = _delay;
}

api.setImmediate = _setImmediate ? _delay : api.nextTick;
/**
 * Clones an object, array, or string/number. If a typed JavaScript object
 * is given, such as a Date, it will be converted to a string.
 *
 * @param value the value to clone.
 *
 * @return the cloned value.
 */

api.clone = function (value) {
  if (value && (0, _typeof2["default"])(value) === 'object') {
    var rval;

    if (Array.isArray(value)) {
      rval = [];

      for (var i = 0; i < value.length; ++i) {
        rval[i] = api.clone(value[i]);
      }
    } else if (api.isObject(value)) {
      rval = {};

      for (var key in value) {
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
 * Returns true if the given value is an Object.
 *
 * @param v the value to check.
 *
 * @return true if the value is an Object, false if not.
 */


api.isObject = function (v) {
  return Object.prototype.toString.call(v) === '[object Object]';
};
/**
 * Returns true if the given value is undefined.
 *
 * @param v the value to check.
 *
 * @return true if the value is undefined, false if not.
 */


api.isUndefined = function (v) {
  return typeof v === 'undefined';
};

api.callbackify = function (fn) {
  return /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var _len,
        args,
        _key,
        callback,
        result,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = _args[_key];
            }

            callback = args[args.length - 1];

            if (typeof callback === 'function') {
              args.pop();
            }

            _context.prev = 3;
            _context.next = 6;
            return fn.apply(null, args);

          case 6:
            result = _context.sent;
            _context.next = 14;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](3);

            if (!(typeof callback === 'function')) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", _invokeCallback(callback, _context.t0));

          case 13:
            throw _context.t0;

          case 14:
            if (!(typeof callback === 'function')) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", _invokeCallback(callback, null, result));

          case 16:
            return _context.abrupt("return", result);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 9]]);
  }));
};

function _invokeCallback(callback, err, result) {
  try {
    return callback(err, result);
  } catch (unhandledError) {
    // throw unhandled errors to prevent "unhandled rejected promise"
    // and simulate what would have happened in a promiseless API
    process.nextTick(function () {
      throw unhandledError;
    });
  }
}

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


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

module.exports = function (Yallist) {
  Yallist.prototype[Symbol.iterator] = function* () {
    for (let walker = this.head; walker; walker = walker.next) {
      yield walker.value
    }
  }
}


/***/ }),

/***/ "./node_modules/yallist/yallist.js":
/*!*****************************************!*\
  !*** ./node_modules/yallist/yallist.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Yallist

Yallist.Node = Node
Yallist.create = Yallist

function Yallist (list) {
  var self = this
  if (!(self instanceof Yallist)) {
    self = new Yallist()
  }

  self.tail = null
  self.head = null
  self.length = 0

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item)
    })
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i])
    }
  }

  return self
}

Yallist.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list')
  }

  var next = node.next
  var prev = node.prev

  if (next) {
    next.prev = prev
  }

  if (prev) {
    prev.next = next
  }

  if (node === this.head) {
    this.head = next
  }
  if (node === this.tail) {
    this.tail = prev
  }

  node.list.length--
  node.next = null
  node.prev = null
  node.list = null

  return next
}

Yallist.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var head = this.head
  node.list = this
  node.next = head
  if (head) {
    head.prev = node
  }

  this.head = node
  if (!this.tail) {
    this.tail = node
  }
  this.length++
}

Yallist.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var tail = this.tail
  node.list = this
  node.prev = tail
  if (tail) {
    tail.next = node
  }

  this.tail = node
  if (!this.head) {
    this.head = node
  }
  this.length++
}

Yallist.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.pop = function () {
  if (!this.tail) {
    return undefined
  }

  var res = this.tail.value
  this.tail = this.tail.prev
  if (this.tail) {
    this.tail.next = null
  } else {
    this.head = null
  }
  this.length--
  return res
}

Yallist.prototype.shift = function () {
  if (!this.head) {
    return undefined
  }

  var res = this.head.value
  this.head = this.head.next
  if (this.head) {
    this.head.prev = null
  } else {
    this.tail = null
  }
  this.length--
  return res
}

Yallist.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.next
  }
}

Yallist.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.prev
  }
}

Yallist.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.map = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.next
  }
  return res
}

Yallist.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.prev
  }
  return res
}

Yallist.prototype.reduce = function (fn, initial) {
  var acc
  var walker = this.head
  if (arguments.length > 1) {
    acc = initial
  } else if (this.head) {
    walker = this.head.next
    acc = this.head.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i)
    walker = walker.next
  }

  return acc
}

Yallist.prototype.reduceReverse = function (fn, initial) {
  var acc
  var walker = this.tail
  if (arguments.length > 1) {
    acc = initial
  } else if (this.tail) {
    walker = this.tail.prev
    acc = this.tail.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i)
    walker = walker.prev
  }

  return acc
}

Yallist.prototype.toArray = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.next
  }
  return arr
}

Yallist.prototype.toArrayReverse = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.prev
  }
  return arr
}

Yallist.prototype.slice = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.sliceReverse = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.splice = function (start, deleteCount /*, ...nodes */) {
  if (start > this.length) {
    start = this.length - 1
  }
  if (start < 0) {
    start = this.length + start;
  }

  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next
  }

  var ret = []
  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value)
    walker = this.removeNode(walker)
  }
  if (walker === null) {
    walker = this.tail
  }

  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev
  }

  for (var i = 2; i < arguments.length; i++) {
    walker = insert(this, walker, arguments[i])
  }
  return ret;
}

Yallist.prototype.reverse = function () {
  var head = this.head
  var tail = this.tail
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev
    walker.prev = walker.next
    walker.next = p
  }
  this.head = tail
  this.tail = head
  return this
}

function insert (self, node, value) {
  var inserted = node === self.head ?
    new Node(value, null, node, self) :
    new Node(value, node, node.next, self)

  if (inserted.next === null) {
    self.tail = inserted
  }
  if (inserted.prev === null) {
    self.head = inserted
  }

  self.length++

  return inserted
}

function push (self, item) {
  self.tail = new Node(item, self.tail, null, self)
  if (!self.head) {
    self.head = self.tail
  }
  self.length++
}

function unshift (self, item) {
  self.head = new Node(item, null, self.head, self)
  if (!self.tail) {
    self.tail = self.head
  }
  self.length++
}

function Node (value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list)
  }

  this.list = list
  this.value = value

  if (prev) {
    prev.next = this
    this.prev = prev
  } else {
    this.prev = null
  }

  if (next) {
    next.prev = this
    this.next = next
  } else {
    this.next = null
  }
}

try {
  // add if support for Symbol.iterator is present
  __webpack_require__(/*! ./iterator.js */ "./node_modules/yallist/iterator.js")(Yallist)
} catch (er) {}


/***/ }),

/***/ 0:
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** multi core-js/fn/array/from core-js/fn/array/includes core-js/fn/map core-js/fn/object/assign core-js/fn/object/entries core-js/fn/promise core-js/fn/set core-js/fn/string/starts-with core-js/fn/symbol ./lib/index.js ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! core-js/fn/array/from */"./node_modules/core-js/fn/array/from.js");
__webpack_require__(/*! core-js/fn/array/includes */"./node_modules/core-js/fn/array/includes.js");
__webpack_require__(/*! core-js/fn/map */"./node_modules/core-js/fn/map.js");
__webpack_require__(/*! core-js/fn/object/assign */"./node_modules/core-js/fn/object/assign.js");
__webpack_require__(/*! core-js/fn/object/entries */"./node_modules/core-js/fn/object/entries.js");
__webpack_require__(/*! core-js/fn/promise */"./node_modules/core-js/fn/promise.js");
__webpack_require__(/*! core-js/fn/set */"./node_modules/core-js/fn/set.js");
__webpack_require__(/*! core-js/fn/string/starts-with */"./node_modules/core-js/fn/string/starts-with.js");
__webpack_require__(/*! core-js/fn/symbol */"./node_modules/core-js/fn/symbol/index.js");
module.exports = __webpack_require__(/*! ./lib/index.js */"./lib/jsonld.js");


/***/ }),

/***/ 1:
/*!*************************************!*\
  !*** rdf-canonize-native (ignored) ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!************************!*\
  !*** xmldom (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!*************************!*\
  !*** request (ignored) ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/*!**********************!*\
  !*** http (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
});
//# sourceMappingURL=jsonld.js.map