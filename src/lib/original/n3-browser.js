/** @license MIT - N3.js 1.0.1 (browser build) - ©Ruben Verborgh */
(function (N3) {
(function () {
var RDF  = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    XSD  = 'http://www.w3.org/2001/XMLSchema#',
    SWAP = 'http://www.w3.org/2000/10/swap/';


N3.IRIs = {
  xsd: {
    decimal: XSD + 'decimal',
    boolean: XSD + 'boolean',
    double:  XSD + 'double',
    integer: XSD + 'integer',
    string:  XSD + 'string',
  },
  rdf: {
    type:       RDF + 'type',
    nil:        RDF + 'nil',
    first:      RDF + 'first',
    rest:       RDF + 'rest',
    langString: RDF + 'langString',
  },
  owl: {
    sameAs: 'http://www.w3.org/2002/07/owl#sameAs',
  },
  r: {
    forSome: SWAP + 'reify#forSome',
    forAll:  SWAP + 'reify#forAll',
  },
  log: {
    implies: SWAP + 'log#implies',
  },
};

})();
(function () {
// N3.js implementations of the RDF/JS core data types
// See https://github.com/rdfjs/representation-task-force/blob/master/interface-spec.md

var namespaces = N3.IRIs;
var rdf = namespaces.rdf,
    xsd = namespaces.xsd;

var DataFactory, DEFAULTGRAPH;

var _blankNodeCounter = 0;

// ## Term constructor
function Term(id) {
  if (!(this instanceof Term))
    return new Term(id);
  this.id = id;
}
// ### Makes this class a subclass of the given type
Term.subclass = function subclass(Type, name) {
  Type.prototype = Object.create(this.prototype, {
    constructor: { value: Type },
    termType:    { value: name || Type.name },
  });
  Type.subclass = subclass;
};

// ### Returns whether this object represents the same term as the other
Term.prototype.equals = function (other) {
  // If both terms were created by this library,
  // equality can be computed through ids
  if (other instanceof Term)
    return this.id === other.id;
  // Otherwise, compare term type and value
  return !!other && this.termType === other.termType &&
                    this.value    === other.value;
};

// ### Returns a plain object representation of this term
Term.prototype.toJSON = function () {
  return {
    termType: this.termType,
    value:    this.value,
  };
};

// ### Constructs a term from the given internal string ID
function fromId(id, factory) {
  factory = factory || DataFactory;

  // Falsy value or empty string indicate the default graph
  if (!id)
    return factory.defaultGraph();

  // Identify the term type based on the first character
  switch (id[0]) {
  case '_': return factory.blankNode(id.substr(2));
  case '?': return factory.variable(id.substr(1));
  case '"':
    // Shortcut for internal literals
    if (factory === DataFactory)
      return new Literal(id);
    // Literal without datatype or language
    if (id[id.length - 1] === '"')
      return factory.literal(id.substr(1, id.length - 2));
    // Literal with datatype or language
    var endPos = id.lastIndexOf('"', id.length - 1);
    return factory.literal(id.substr(1, endPos - 1),
            id[endPos + 1] === '@' ? id.substr(endPos + 2)
                                   : factory.namedNode(id.substr(endPos + 3)));
  default:  return factory.namedNode(id);
  }
}

// ### Constructs an internal string ID from the given term or ID string
function toId(term) {
  if (typeof term === 'string')
    return term;
  if (term instanceof Term)
    return term.id;
  if (!term)
    return DEFAULTGRAPH.value;

  // Term instantiated with another library
  switch (term.termType) {
  case 'NamedNode':    return term.value;
  case 'BlankNode':    return '_:' + term.value;
  case 'Variable':     return '?' + term.value;
  case 'DefaultGraph': return '';
  case 'Literal':      return '"' + term.value + '"' +
    (term.language ? '@' + term.language :
      (term.datatype && term.datatype.value !== xsd.string ? '^^' + term.datatype.value : ''));
  default: throw new Error('Unexpected termType: ' + term.termType);
  }
}

// ## NamedNode constructor
function NamedNode(iri) {
  if (!(this instanceof NamedNode))
    return new NamedNode(iri);
  this.id = iri;
}
Term.subclass(NamedNode, 'NamedNode');

// ### The IRI of this named node
Object.defineProperty(NamedNode.prototype, 'value', {
  get: function () { return this.id; },
});


// ## BlankNode constructor
function BlankNode(name) {
  if (!(this instanceof BlankNode))
    return new BlankNode(name);
  this.id = '_:' + name;
}
Term.subclass(BlankNode, 'BlankNode');

// ### The name of this blank node
Object.defineProperty(BlankNode.prototype, 'value', {
  get: function () { return this.id.substr(2); },
});


// ## Variable constructor
function Variable(name) {
  if (!(this instanceof Variable))
    return new Variable(name);
  this.id = '?' + name;
}
Term.subclass(Variable, 'Variable');

// ### The name of this variable
Object.defineProperty(Variable.prototype, 'value', {
  get: function () { return this.id.substr(1); },
});


// ## Literal constructor
function Literal(id) {
  if (!(this instanceof Literal))
    return new Literal(id);
  this.id = id;
}
Term.subclass(Literal, 'Literal');

// ### The text value of this literal
Object.defineProperty(Literal.prototype, 'value', {
  get: function () {
    return this.id.substring(1, this.id.lastIndexOf('"'));
  },
});

// ### The language of this literal
Object.defineProperty(Literal.prototype, 'language', {
  get: function () {
    // Find the last quotation mark (e.g., '"abc"@en-us')
    var id = this.id, atPos = id.lastIndexOf('"') + 1;
    // If "@" it follows, return the remaining substring; empty otherwise
    return atPos < id.length && id[atPos++] === '@' ? id.substr(atPos).toLowerCase() : '';
  },
});

// ### The datatype IRI of this literal
Object.defineProperty(Literal.prototype, 'datatype', {
  get: function () {
    return new NamedNode(this.datatypeString);
  },
});

// ### The datatype string of this literal
Object.defineProperty(Literal.prototype, 'datatypeString', {
  get: function () {
    // Find the last quotation mark (e.g., '"abc"^^http://ex.org/types#t')
    var id = this.id, dtPos = id.lastIndexOf('"') + 1, ch;
    // If "^" it follows, return the remaining substring
    return dtPos < id.length && (ch = id[dtPos]) === '^' ? id.substr(dtPos + 2) :
           // If "@" follows, return rdf:langString; xsd:string otherwise
           (ch !== '@' ? xsd.string : rdf.langString);
  },
});

// ### Returns whether this object represents the same term as the other
Literal.prototype.equals = function (other) {
  // If both literals were created by this library,
  // equality can be computed through ids
  if (other instanceof Literal)
    return this.id === other.id;
  // Otherwise, compare term type, value, language, and datatype
  return !!other && !!other.datatype &&
                    this.termType === other.termType &&
                    this.value    === other.value    &&
                    this.language === other.language &&
                    this.datatype.value === other.datatype.value;
};

// ### Returns a plain object representation of this term
Literal.prototype.toJSON = function () {
  return {
    termType: this.termType,
    value:    this.value,
    language: this.language,
    datatype: { termType: 'NamedNode', value: this.datatypeString },
  };
};


// ## DefaultGraph singleton
function DefaultGraph() {
  return DEFAULTGRAPH || this;
}
Term.subclass(DefaultGraph, 'DefaultGraph');

// Initialize singleton
DEFAULTGRAPH = new DefaultGraph();
DEFAULTGRAPH.id = '';

// ### The empty string
Object.defineProperty(DefaultGraph.prototype, 'value', { value: '' });

// ### Returns whether this object represents the same term as the other
DefaultGraph.prototype.equals = function (other) {
  // If both terms were created by this library,
  // equality can be computed through strict equality;
  // otherwise, compare term types.
  return (this === other) || (!!other && (this.termType === other.termType));
};


// ## Quad constructor
function Quad(subject, predicate, object, graph) {
  if (!(this instanceof Quad))
    return new Quad(subject, predicate, object, graph);
  this.subject   = subject;
  this.predicate = predicate;
  this.object    = object;
  this.graph     = graph || DEFAULTGRAPH;
}

// ### Returns a plain object representation of this quad
Quad.prototype.toJSON = function () {
  return {
    subject:   this.subject.toJSON(),
    predicate: this.predicate.toJSON(),
    object:    this.object.toJSON(),
    graph:     this.graph.toJSON(),
  };
};

// ### Returns whether this object represents the same quad as the other
Quad.prototype.equals = function (other) {
  return !!other && this.subject.equals(other.subject)     &&
                    this.predicate.equals(other.predicate) &&
                    this.object.equals(other.object)       &&
                    this.graph.equals(other.graph);
};


// ## DataFactory functions

// ### Creates an IRI
function namedNode(iri) {
  return new NamedNode(iri);
}

// ### Creates a blank node
function blankNode(name) {
  if (!name)
    name = 'n3-' + _blankNodeCounter++;
  return new BlankNode(name);
}

// ### Creates a literal
function literal(value, languageOrDataType) {
  // Create a language-tagged string
  if (typeof languageOrDataType === 'string')
    return new Literal('"' + value + '"@' + languageOrDataType.toLowerCase());

  // Create a datatyped literal
  var datatype = languageOrDataType && languageOrDataType.value || '';
  if (!datatype) {
    switch (typeof value) {
    // Convert a boolean
    case 'boolean':
      datatype = xsd.boolean;
      break;
    // Convert an integer or double
    case 'number':
      if (Number.isFinite(value))
        datatype = Number.isInteger(value) ? xsd.integer : xsd.double;
      else {
        datatype = xsd.double;
        if (!Number.isNaN(value))
          value = value > 0 ? 'INF' : '-INF';
      }
      break;
    // No datatype, so convert a plain string
    default:
      return new Literal('"' + value + '"');
    }
  }
  return new Literal('"' + value + '"^^' + datatype);
}

// ### Creates a variable
function variable(name) {
  return new Variable(name);
}

// ### Returns the default graph
function defaultGraph() {
  return DEFAULTGRAPH;
}

// ### Creates a quad
function quad(subject, predicate, object, graph) {
  return new Quad(subject, predicate, object, graph);
}


// ## Module exports

N3.DataFactory = DataFactory = {
  // ### Public factory functions
  namedNode: namedNode,
  blankNode: blankNode,
  variable:  variable,
  literal:   literal,
  defaultGraph: defaultGraph,
  quad:      quad,
  triple:    quad,

  // ### Internal datatype constructors
  internal: {
    Term:      Term,
    NamedNode: NamedNode,
    BlankNode: BlankNode,
    Variable:  Variable,
    Literal:   Literal,
    DefaultGraph: DefaultGraph,
    Quad:      Quad,
    Triple:    Quad,
    fromId:    fromId,
    toId:      toId,
  },
};

})();
(function () {
// **N3Util** provides N3 utility functions.

var DataFactory = N3.DataFactory;

var N3Util = {
  // Tests whether the given term represents an IRI
  isNamedNode: function (term) {
    return !!term && term.termType === 'NamedNode';
  },

  // Tests whether the given term represents a blank node
  isBlankNode: function (term) {
    return !!term && term.termType === 'BlankNode';
  },

  // Tests whether the given term represents a literal
  isLiteral: function (term) {
    return !!term && term.termType === 'Literal';
  },

  // Tests whether the given term represents a variable
  isVariable: function (term) {
    return !!term && term.termType === 'Variable';
  },

  // Tests whether the given term represents the default graph
  isDefaultGraph: function (term) {
    return !!term && term.termType === 'DefaultGraph';
  },

  // Tests whether the given quad is in the default graph
  inDefaultGraph: function (quad) {
    return N3Util.isDefaultGraph(quad.graph);
  },

  // Creates a function that prepends the given IRI to a local name
  prefix: function (iri, factory) {
    return N3Util.prefixes({ '': iri }, factory)('');
  },

  // Creates a function that allows registering and expanding prefixes
  prefixes: function (defaultPrefixes, factory) {
    // Add all of the default prefixes
    var prefixes = Object.create(null);
    for (var prefix in defaultPrefixes)
      processPrefix(prefix, defaultPrefixes[prefix]);
    // Set the default factory if none was specified
    factory = factory || DataFactory;

    // Registers a new prefix (if an IRI was specified)
    // or retrieves a function that expands an existing prefix (if no IRI was specified)
    function processPrefix(prefix, iri) {
      // Create a new prefix if an IRI is specified or the prefix doesn't exist
      if (typeof iri === 'string') {
        // Create a function that expands the prefix
        var cache = Object.create(null);
        prefixes[prefix] = function (local) {
          return cache[local] || (cache[local] = factory.namedNode(iri + local));
        };
      }
      else if (!(prefix in prefixes)) {
        throw new Error('Unknown prefix: ' + prefix);
      }
      return prefixes[prefix];
    }
    return processPrefix;
  },
};

// ## Exports

N3.Util = N3Util;

})();
(function () {
// **N3Lexer** tokenizes N3 documents.
var xsd = N3.IRIs.xsd;

var fromCharCode = String.fromCharCode;
var immediately = typeof setImmediate === 'function' ? setImmediate :
                  function setImmediate(func) { setTimeout(func, 0); };

// Regular expression and replacement string to escape N3 strings.
// Note how we catch invalid unicode sequences separately (they will trigger an error).
var escapeSequence = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{8})|\\[uU]|\\(.)/g;
var escapeReplacements = {
  '\\': '\\', "'": "'", '"': '"',
  'n': '\n', 'r': '\r', 't': '\t', 'f': '\f', 'b': '\b',
  '_': '_', '~': '~', '.': '.', '-': '-', '!': '!', '$': '$', '&': '&',
  '(': '(', ')': ')', '*': '*', '+': '+', ',': ',', ';': ';', '=': '=',
  '/': '/', '?': '?', '#': '#', '@': '@', '%': '%',
};
var illegalIriChars = /[\x00-\x20<>\\"\{\}\|\^\`]/;

// ## Constructor
function N3Lexer(options) {
  if (!(this instanceof N3Lexer))
    return new N3Lexer(options);
  options = options || {};

  // In line mode (N-Triples or N-Quads), only simple features may be parsed
  if (options.lineMode) {
    // Don't tokenize special literals
    this._tripleQuotedString = this._number = this._boolean = /$0^/;
    // Swap the tokenize method for a restricted version
    var self = this;
    this._tokenize = this.tokenize;
    this.tokenize = function (input, callback) {
      this._tokenize(input, function (error, token) {
        if (!error && /^(?:IRI|blank|literal|langcode|typeIRI|\.|eof)$/.test(token.type))
          callback && callback(error, token);
        else
          callback && callback(error || self._syntaxError(token.type, callback = null));
      });
    };
  }
  // Enable N3 functionality by default
  this._n3Mode = options.n3 !== false;
  // Disable comment tokens by default
  this._comments = !!options.comments;
}

N3Lexer.prototype = {
  // ## Regular expressions
  // It's slightly faster to have these as properties than as in-scope variables

  _iri: /^<((?:[^ <>{}\\]|\\[uU])+)>[ \t]*/, // IRI with escape sequences; needs sanity check after unescaping
  _unescapedIri: /^<([^\x00-\x20<>\\"\{\}\|\^\`]*)>[ \t]*/, // IRI without escape sequences; no unescaping
  _unescapedQuote: /^"([^"\\\r\n]+)"/, // non-empty string without escape sequences
  _unescapedApos:  /^'([^'\\\r\n]+)'/,
  _singleQuote: /^"((?:[^"\\\r\n]|\\.)*)"(?=[^"])/,
  _singleApos:  /^'((?:[^'\\\r\n]|\\.)*)'(?=[^'])/,
  _tripleQuote: /^"""([^"\\]*(?:(?:\\.|"(?!""))[^"\\]*)*)"""/,
  _tripleApos:  /^'''([^'\\]*(?:(?:\\.|'(?!''))[^'\\]*)*)'''/,
  _langcode: /^@([a-z]+(?:-[a-z0-9]+)*)(?=[^a-z0-9\-])/i,
  _prefix: /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:(?=[#\s<])/,
  _prefixed: /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:((?:(?:[0-:A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])(?:(?:[\.\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])*(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~]))?)?)(?:[ \t]+|(?=\.?[,;!\^\s#()\[\]\{\}"'<]))/,
  _variable: /^\?(?:(?:[A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?=[.,;!\^\s#()\[\]\{\}"'<])/,
  _blank: /^_:((?:[0-9A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?:[ \t]+|(?=\.?[,;:\s#()\[\]\{\}"'<]))/,
  _number: /^[\-+]?(?:\d+\.?\d*([eE](?:[\-\+])?\d+)|\d*\.?\d+)(?=\.?[,;:\s#()\[\]\{\}"'<])/,
  _boolean: /^(?:true|false)(?=[.,;\s#()\[\]\{\}"'<])/,
  _keyword: /^@[a-z]+(?=[\s#<:])/i,
  _sparqlKeyword: /^(?:PREFIX|BASE|GRAPH)(?=[\s#<])/i,
  _shortPredicates: /^a(?=\s+|<)/,
  _newline: /^[ \t]*(?:#[^\n\r]*)?(?:\r\n|\n|\r)[ \t]*/,
  _comment: /#([^\n\r]*)/,
  _whitespace: /^[ \t]+/,
  _endOfFile: /^(?:#[^\n\r]*)?$/,

  // ## Private methods

  // ### `_tokenizeToEnd` tokenizes as for as possible, emitting tokens through the callback
  _tokenizeToEnd: function (callback, inputFinished) {
    // Continue parsing as far as possible; the loop will return eventually
    var input = this._input, outputComments = this._comments;
    while (true) {
      // Count and skip whitespace lines
      var whiteSpaceMatch, comment;
      while (whiteSpaceMatch = this._newline.exec(input)) {
        // Try to find a comment
        if (outputComments && (comment = this._comment.exec(whiteSpaceMatch[0])))
          callback(null, { line: this._line, type: 'comment', value: comment[1], prefix: '' });
        // Advance the input
        input = input.substr(whiteSpaceMatch[0].length, input.length);
        this._line++;
      }
      // Skip whitespace on current line
      if (whiteSpaceMatch = this._whitespace.exec(input))
        input = input.substr(whiteSpaceMatch[0].length, input.length);

      // Stop for now if we're at the end
      if (this._endOfFile.test(input)) {
        // If the input is finished, emit EOF
        if (inputFinished) {
          // Try to find a final comment
          if (outputComments && (comment = this._comment.exec(input)))
            callback(null, { line: this._line, type: 'comment', value: comment[1], prefix: '' });
          callback(input = null, { line: this._line, type: 'eof', value: '', prefix: '' });
        }
        return this._input = input;
      }

      // Look for specific token types based on the first character
      var line = this._line, type = '', value = '', prefix = '',
          firstChar = input[0], match = null, matchLength = 0, inconclusive = false;
      switch (firstChar) {
      case '^':
        // We need at least 3 tokens lookahead to distinguish ^^<IRI> and ^^pre:fixed
        if (input.length < 3)
          break;
        // Try to match a type
        else if (input[1] === '^') {
          this._previousMarker = '^^';
          // Move to type IRI or prefixed name
          input = input.substr(2);
          if (input[0] !== '<') {
            inconclusive = true;
            break;
          }
        }
        // If no type, it must be a path expression
        else {
          if (this._n3Mode) {
            matchLength = 1;
            type = '^';
          }
          break;
        }
        // Fall through in case the type is an IRI
      case '<':
        // Try to find a full IRI without escape sequences
        if (match = this._unescapedIri.exec(input))
          type = 'IRI', value = match[1];
        // Try to find a full IRI with escape sequences
        else if (match = this._iri.exec(input)) {
          value = this._unescape(match[1]);
          if (value === null || illegalIriChars.test(value))
            return reportSyntaxError(this);
          type = 'IRI';
        }
        // Try to find a backwards implication arrow
        else if (this._n3Mode && input.length > 1 && input[1] === '=')
          type = 'inverse', matchLength = 2, value = '>';
        break;

      case '_':
        // Try to find a blank node. Since it can contain (but not end with) a dot,
        // we always need a non-dot character before deciding it is a blank node.
        // Therefore, try inserting a space if we're at the end of the input.
        if ((match = this._blank.exec(input)) ||
            inputFinished && (match = this._blank.exec(input + ' ')))
          type = 'blank', prefix = '_', value = match[1];
        break;

      case '"':
        // Try to find a literal without escape sequences
        if (match = this._unescapedQuote.exec(input))
          value = match[1];
        // Before attempting more complex string patterns, try to detect a closing quote
        else if (input.indexOf('"', 1) > 0) {
          // Try to find any other literal wrapped in a pair of quotes
          if (match = this._singleQuote.exec(input))
            value = this._unescape(match[1]);
          // Try to find a literal wrapped in three pairs of quotes
          else if (match = this._tripleQuote.exec(input)) {
            value = match[1];
            // Advance line counter
            this._line += value.split(/\r\n|\r|\n/).length - 1;
            value = this._unescape(value);
          }
          if (value === null)
            return reportSyntaxError(this);
        }
        if (match !== null)
          type = 'literal';
        break;

      case "'":
        // Try to find a literal without escape sequences
        if (match = this._unescapedApos.exec(input))
          value = match[1];
        // Before attempting more complex string patterns, try to detect a closing apostrophe
        else if (input.indexOf("'", 1) > 0) {
          // Try to find any other literal wrapped in a pair of apostrophes
          if (match = this._singleApos.exec(input))
            value = this._unescape(match[1]);
          // Try to find a literal wrapped in three pairs of apostrophes
          else if (match = this._tripleApos.exec(input)) {
            value = match[1];
            // Advance line counter
            this._line += value.split(/\r\n|\r|\n/).length - 1;
            value = this._unescape(value);
          }
          if (value === null)
            return reportSyntaxError(this);
        }
        if (match !== null)
          type = 'literal';
        break;

      case '?':
        // Try to find a variable
        if (this._n3Mode && (match = this._variable.exec(input)))
          type = 'var', value = match[0];
        break;

      case '@':
        // Try to find a language code
        if (this._previousMarker === 'literal' && (match = this._langcode.exec(input)))
          type = 'langcode', value = match[1];
        // Try to find a keyword
        else if (match = this._keyword.exec(input))
          type = match[0];
        break;

      case '.':
        // Try to find a dot as punctuation
        if (input.length === 1 ? inputFinished : (input[1] < '0' || input[1] > '9')) {
          type = '.';
          matchLength = 1;
          break;
        }
        // Fall through to numerical case (could be a decimal dot)

      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '+':
      case '-':
        // Try to find a number. Since it can contain (but not end with) a dot,
        // we always need a non-dot character before deciding it is a number.
        // Therefore, try inserting a space if we're at the end of the input.
        if (match = this._number.exec(input) ||
            inputFinished && (match = this._number.exec(input + ' '))) {
          type = 'literal', value = match[0];
          prefix = (match[1] ? xsd.double :
                    (/^[+\-]?\d+$/.test(match[0]) ? xsd.integer : xsd.decimal));
        }
        break;

      case 'B':
      case 'b':
      case 'p':
      case 'P':
      case 'G':
      case 'g':
        // Try to find a SPARQL-style keyword
        if (match = this._sparqlKeyword.exec(input))
          type = match[0].toUpperCase();
        else
          inconclusive = true;
        break;

      case 'f':
      case 't':
        // Try to match a boolean
        if (match = this._boolean.exec(input))
          type = 'literal', value = match[0], prefix = xsd.boolean;
        else
          inconclusive = true;
        break;

      case 'a':
        // Try to find an abbreviated predicate
        if (match = this._shortPredicates.exec(input))
          type = 'abbreviation', value = 'a';
        else
          inconclusive = true;
        break;

      case '=':
        // Try to find an implication arrow or equals sign
        if (this._n3Mode && input.length > 1) {
          type = 'abbreviation';
          if (input[1] !== '>')
            matchLength = 1, value = '=';
          else
            matchLength = 2, value = '>';
        }
        break;

      case '!':
        if (!this._n3Mode)
          break;
      case ',':
      case ';':
      case '[':
      case ']':
      case '(':
      case ')':
      case '{':
      case '}':
        // The next token is punctuation
        matchLength = 1;
        type = firstChar;
        break;

      default:
        inconclusive = true;
      }

      // Some first characters do not allow an immediate decision, so inspect more
      if (inconclusive) {
        // Try to find a prefix
        if ((this._previousMarker === '@prefix' || this._previousMarker === 'PREFIX') &&
            (match = this._prefix.exec(input)))
          type = 'prefix', value = match[1] || '';
        // Try to find a prefixed name. Since it can contain (but not end with) a dot,
        // we always need a non-dot character before deciding it is a prefixed name.
        // Therefore, try inserting a space if we're at the end of the input.
        else if ((match = this._prefixed.exec(input)) ||
                 inputFinished && (match = this._prefixed.exec(input + ' ')))
          type = 'prefixed', prefix = match[1] || '', value = this._unescape(match[2]);
      }

      // A type token is special: it can only be emitted after an IRI or prefixed name is read
      if (this._previousMarker === '^^') {
        switch (type) {
        case 'prefixed': type = 'type';    break;
        case 'IRI':      type = 'typeIRI'; break;
        default:         type = '';
        }
      }

      // What if nothing of the above was found?
      if (!type) {
        // We could be in streaming mode, and then we just wait for more input to arrive.
        // Otherwise, a syntax error has occurred in the input.
        // One exception: error on an unaccounted linebreak (= not inside a triple-quoted literal).
        if (inputFinished || (!/^'''|^"""/.test(input) && /\n|\r/.test(input)))
          return reportSyntaxError(this);
        else
          return this._input = input;
      }

      // Emit the parsed token
      var token = { line: line, type: type, value: value, prefix: prefix };
      callback(null, token);
      this.previousToken = token;
      this._previousMarker = type;
      // Advance to next part to tokenize
      input = input.substr(matchLength || match[0].length, input.length);
    }

    // Signals the syntax error through the callback
    function reportSyntaxError(self) { callback(self._syntaxError(/^\S*/.exec(input)[0])); }
  },

  // ### `_unescape` replaces N3 escape codes by their corresponding characters
  _unescape: function (item) {
    try {
      return item.replace(escapeSequence, function (sequence, unicode4, unicode8, escapedChar) {
        var charCode;
        if (unicode4) {
          charCode = parseInt(unicode4, 16);
          if (isNaN(charCode)) throw new Error(); // can never happen (regex), but helps performance
          return fromCharCode(charCode);
        }
        else if (unicode8) {
          charCode = parseInt(unicode8, 16);
          if (isNaN(charCode)) throw new Error(); // can never happen (regex), but helps performance
          if (charCode <= 0xFFFF) return fromCharCode(charCode);
          return fromCharCode(0xD800 + ((charCode -= 0x10000) / 0x400), 0xDC00 + (charCode & 0x3FF));
        }
        else {
          var replacement = escapeReplacements[escapedChar];
          if (!replacement)
            throw new Error();
          return replacement;
        }
      });
    }
    catch (error) { return null; }
  },

  // ### `_syntaxError` creates a syntax error for the given issue
  _syntaxError: function (issue) {
    this._input = null;
    var err = new Error('Unexpected "' + issue + '" on line ' + this._line + '.');
    err.context = {
      token: undefined,
      line: this._line,
      previousToken: this.previousToken,
    };
    return err;
  },


  // ## Public methods

  // ### `tokenize` starts the transformation of an N3 document into an array of tokens.
  // The input can be a string or a stream.
  tokenize: function (input, callback) {
    var self = this;
    this._line = 1;

    // If the input is a string, continuously emit tokens through the callback until the end
    if (typeof input === 'string') {
      this._input = input;
      // If a callback was passed, asynchronously call it
      if (typeof callback === 'function')
        immediately(function () { self._tokenizeToEnd(callback, true); });
      // If no callback was passed, tokenize synchronously and return
      else {
        var tokens = [], error;
        this._tokenizeToEnd(function (e, t) { e ? (error = e) : tokens.push(t); }, true);
        if (error) throw error;
        return tokens;
      }
    }
    // Otherwise, the input must be a stream
    else {
      this._input = '';
      this._pendingBuffer = null;
      if (typeof input.setEncoding === 'function')
        input.setEncoding('utf8');
      // Adds the data chunk to the buffer and parses as far as possible
      input.on('data', function (data) {
        if (self._input !== null && data.length !== 0) {
          // Prepend any previous pending writes
          if (self._pendingBuffer) {
            data = Buffer.concat([self._pendingBuffer, data]);
            self._pendingBuffer = null;
          }
          // Hold if the buffer ends in an incomplete unicode sequence
          if (data[data.length - 1] & 0x80) {
            self._pendingBuffer = data;
          }
          // Otherwise, tokenize as far as possible
          else {
            self._input += data;
            self._tokenizeToEnd(callback, false);
          }
        }
      });
      // Parses until the end
      input.on('end', function () {
        if (self._input !== null)
          self._tokenizeToEnd(callback, true);
      });
      input.on('error', callback);
    }
  },
};

// ## Exports

N3.Lexer = N3Lexer;

})();
(function () {
// **N3Parser** parses N3 documents.
var N3Lexer = N3.Lexer,
    DataFactory = N3.DataFactory,
    namespaces = N3.IRIs;

// The next ID for new blank nodes
var blankNodePrefix = 0, blankNodeCount = 0;

// ## Constructor
function N3Parser(options) {
  if (!(this instanceof N3Parser))
    return new N3Parser(options);
  this._contextStack = [];
  this._graph = null;

  // Set the document IRI
  options = options || {};
  this._setBase(options.baseIRI);
  options.factory && initDataFactory(this, options.factory);

  // Set supported features depending on the format
  var format = (typeof options.format === 'string') ?
               options.format.match(/\w*$/)[0].toLowerCase() : '',
      isTurtle = format === 'turtle', isTriG = format === 'trig',
      isNTriples = /triple/.test(format), isNQuads = /quad/.test(format),
      isN3 = this._n3Mode = /n3/.test(format),
      isLineMode = isNTriples || isNQuads;
  if (!(this._supportsNamedGraphs = !(isTurtle || isN3)))
    this._readPredicateOrNamedGraph = this._readPredicate;
  this._supportsQuads = !(isTurtle || isTriG || isNTriples || isN3);
  // Disable relative IRIs in N-Triples or N-Quads mode
  if (isLineMode)
    this._resolveRelativeIRI = function (iri) { return ''; };
  this._blankNodePrefix = typeof options.blankNodePrefix !== 'string' ? '' :
                            options.blankNodePrefix.replace(/^(?!_:)/, '_:');
  this._lexer = options.lexer || new N3Lexer({ lineMode: isLineMode, n3: isN3 });
  // Disable explicit quantifiers by default
  this._explicitQuantifiers = !!options.explicitQuantifiers;
}

// ## Private class methods

// ### `_resetBlankNodeIds` restarts blank node identification
N3Parser._resetBlankNodeIds = function () {
  blankNodePrefix = blankNodeCount = 0;
};

N3Parser.prototype = {
  // ## Private methods

  // ### `_blank` creates a new blank node
  _blank: function () {
    return this._blankNode('b' + blankNodeCount++);
  },

  // ### `_setBase` sets the base IRI to resolve relative IRIs
  _setBase: function (baseIRI) {
    if (!baseIRI)
      this._base = null;
    else {
      // Remove fragment if present
      var fragmentPos = baseIRI.indexOf('#');
      if (fragmentPos >= 0)
        baseIRI = baseIRI.substr(0, fragmentPos);
      // Set base IRI and its components
      this._base = baseIRI;
      this._basePath   = baseIRI.indexOf('/') < 0 ? baseIRI :
                         baseIRI.replace(/[^\/?]*(?:\?.*)?$/, '');
      baseIRI = baseIRI.match(/^(?:([a-z][a-z0-9+.-]*:))?(?:\/\/[^\/]*)?/i);
      this._baseRoot   = baseIRI[0];
      this._baseScheme = baseIRI[1];
    }
  },

  // ### `_saveContext` stores the current parsing context
  // when entering a new scope (list, blank node, formula)
  _saveContext: function (type, graph, subject, predicate, object) {
    var n3Mode = this._n3Mode;
    this._contextStack.push({
      subject: subject, predicate: predicate, object: object,
      graph: graph, type: type,
      inverse: n3Mode ? this._inversePredicate : false,
      blankPrefix: n3Mode ? this._prefixes._ : '',
      quantified: n3Mode ? this._quantified : null,
    });
    // The settings below only apply to N3 streams
    if (n3Mode) {
      // Every new scope resets the predicate direction
      this._inversePredicate = false;
      // In N3, blank nodes are scoped to a formula
      // (using a dot as separator, as a blank node label cannot start with it)
      this._prefixes._ = (this._graph ? this._graph.id.substr(2) + '.' : '.');
      // Quantifiers are scoped to a formula
      this._quantified = Object.create(this._quantified);
    }
  },

  // ### `_restoreContext` restores the parent context
  // when leaving a scope (list, blank node, formula)
  _restoreContext: function () {
    var context = this._contextStack.pop(), n3Mode = this._n3Mode;
    this._subject   = context.subject;
    this._predicate = context.predicate;
    this._object    = context.object;
    this._graph     = context.graph;
    // The settings below only apply to N3 streams
    if (n3Mode) {
      this._inversePredicate = context.inverse;
      this._prefixes._ = context.blankPrefix;
      this._quantified = context.quantified;
    }
  },

  // ### `_readInTopContext` reads a token when in the top context
  _readInTopContext: function (token) {
    switch (token.type) {
    // If an EOF token arrives in the top context, signal that we're done
    case 'eof':
      if (this._graph !== null)
        return this._error('Unclosed graph', token);
      delete this._prefixes._;
      return this._callback(null, null, this._prefixes);
    // It could be a prefix declaration
    case 'PREFIX':
      this._sparqlStyle = true;
    case '@prefix':
      return this._readPrefix;
    // It could be a base declaration
    case 'BASE':
      this._sparqlStyle = true;
    case '@base':
      return this._readBaseIRI;
    // It could be a graph
    case '{':
      if (this._supportsNamedGraphs) {
        this._graph = '';
        this._subject = null;
        return this._readSubject;
      }
    case 'GRAPH':
      if (this._supportsNamedGraphs)
        return this._readNamedGraphLabel;
    // Otherwise, the next token must be a subject
    default:
      return this._readSubject(token);
    }
  },

  // ### `_readEntity` reads an IRI, prefixed name, blank node, or variable
  _readEntity: function (token, quantifier) {
    var value;
    switch (token.type) {
    // Read a relative or absolute IRI
    case 'IRI':
    case 'typeIRI':
      var iri = this._resolveIRI(token.value);
      if (iri === '')
        return this._error('Invalid IRI', token);
      value = this._namedNode(iri);
      break;
    // Read a prefixed name
    case 'type':
    case 'prefixed':
      var prefix = this._prefixes[token.prefix];
      if (prefix === undefined)
        return this._error('Undefined prefix "' + token.prefix + ':"', token);
      value = this._namedNode(prefix + token.value);
      break;
    // Read a blank node
    case 'blank':
      value = this._blankNode(this._prefixes[token.prefix] + token.value);
      break;
    // Read a variable
    case 'var':
      value = this._variable(token.value.substr(1));
      break;
    // Everything else is not an entity
    default:
      return this._error('Expected entity but got ' + token.type, token);
    }
    // In N3 mode, replace the entity if it is quantified
    if (!quantifier && this._n3Mode && (value.id in this._quantified))
      value = this._quantified[value.id];
    return value;
  },

  // ### `_readSubject` reads a quad's subject
  _readSubject: function (token) {
    this._predicate = null;
    switch (token.type) {
    case '[':
      // Start a new quad with a new blank node as subject
      this._saveContext('blank', this._graph,
                        this._subject = this._blank(), null, null);
      return this._readBlankNodeHead;
    case '(':
      // Start a new list
      this._saveContext('list', this._graph, this.RDF_NIL, null, null);
      this._subject = null;
      return this._readListItem;
    case '{':
      // Start a new formula
      if (!this._n3Mode)
        return this._error('Unexpected graph', token);
      this._saveContext('formula', this._graph,
                        this._graph = this._blank(), null, null);
      return this._readSubject;
    case '}':
       // No subject; the graph in which we are reading is closed instead
      return this._readPunctuation(token);
    case '@forSome':
      if (!this._n3Mode)
        return this._error('Unexpected "@forSome"', token);
      this._subject = null;
      this._predicate = this.N3_FORSOME;
      this._quantifier = this._blankNode;
      return this._readQuantifierList;
    case '@forAll':
      if (!this._n3Mode)
        return this._error('Unexpected "@forAll"', token);
      this._subject = null;
      this._predicate = this.N3_FORALL;
      this._quantifier = this._variable;
      return this._readQuantifierList;
    default:
      // Read the subject entity
      if ((this._subject = this._readEntity(token)) === undefined)
        return;
      // In N3 mode, the subject might be a path
      if (this._n3Mode)
        return this._getPathReader(this._readPredicateOrNamedGraph);
    }

    // The next token must be a predicate,
    // or, if the subject was actually a graph IRI, a named graph
    return this._readPredicateOrNamedGraph;
  },

  // ### `_readPredicate` reads a quad's predicate
  _readPredicate: function (token) {
    var type = token.type;
    switch (type) {
    case 'inverse':
      this._inversePredicate = true;
    case 'abbreviation':
      this._predicate = this.ABBREVIATIONS[token.value];
      break;
    case '.':
    case ']':
    case '}':
      // Expected predicate didn't come, must have been trailing semicolon
      if (this._predicate === null)
        return this._error('Unexpected ' + type, token);
      this._subject = null;
      return type === ']' ? this._readBlankNodeTail(token) : this._readPunctuation(token);
    case ';':
      // Additional semicolons can be safely ignored
      return this._predicate !== null ? this._readPredicate :
             this._error('Expected predicate but got ;', token);
    case 'blank':
      if (!this._n3Mode)
        return this._error('Disallowed blank node as predicate', token);
    default:
      if ((this._predicate = this._readEntity(token)) === undefined)
        return;
    }
    // The next token must be an object
    return this._readObject;
  },

  // ### `_readObject` reads a quad's object
  _readObject: function (token) {
    switch (token.type) {
    case 'literal':
      // Regular literal, can still get a datatype or language
      if (token.prefix.length === 0) {
        this._literalValue = token.value;
        return this._readDataTypeOrLang;
      }
      // Pre-datatyped string literal (prefix stores the datatype)
      else
        this._object = this._literal(token.value, this._namedNode(token.prefix));
      break;
    case '[':
      // Start a new quad with a new blank node as subject
      this._saveContext('blank', this._graph, this._subject, this._predicate,
                        this._subject = this._blank());
      return this._readBlankNodeHead;
    case '(':
      // Start a new list
      this._saveContext('list', this._graph, this._subject, this._predicate, this.RDF_NIL);
      this._subject = null;
      return this._readListItem;
    case '{':
      // Start a new formula
      if (!this._n3Mode)
        return this._error('Unexpected graph', token);
      this._saveContext('formula', this._graph, this._subject, this._predicate,
                        this._graph = this._blank());
      return this._readSubject;
    default:
      // Read the object entity
      if ((this._object = this._readEntity(token)) === undefined)
        return;
      // In N3 mode, the object might be a path
      if (this._n3Mode)
        return this._getPathReader(this._getContextEndReader());
    }
    return this._getContextEndReader();
  },

  // ### `_readPredicateOrNamedGraph` reads a quad's predicate, or a named graph
  _readPredicateOrNamedGraph: function (token) {
    return token.type === '{' ? this._readGraph(token) : this._readPredicate(token);
  },

  // ### `_readGraph` reads a graph
  _readGraph: function (token) {
    if (token.type !== '{')
      return this._error('Expected graph but got ' + token.type, token);
    // The "subject" we read is actually the GRAPH's label
    this._graph = this._subject, this._subject = null;
    return this._readSubject;
  },

  // ### `_readBlankNodeHead` reads the head of a blank node
  _readBlankNodeHead: function (token) {
    if (token.type === ']') {
      this._subject = null;
      return this._readBlankNodeTail(token);
    }
    else {
      this._predicate = null;
      return this._readPredicate(token);
    }
  },

  // ### `_readBlankNodeTail` reads the end of a blank node
  _readBlankNodeTail: function (token) {
    if (token.type !== ']')
      return this._readBlankNodePunctuation(token);

    // Store blank node quad
    if (this._subject !== null)
      this._emit(this._subject, this._predicate, this._object, this._graph);

    // Restore the parent context containing this blank node
    var empty = this._predicate === null;
    this._restoreContext();
    // If the blank node was the subject, continue reading the predicate
    if (this._object === null)
      // If the blank node was empty, it could be a named graph label
      return empty ? this._readPredicateOrNamedGraph : this._readPredicateAfterBlank;
    // If the blank node was the object, restore previous context and read punctuation
    else
      return this._getContextEndReader();
  },

  // ### `_readPredicateAfterBlank` reads a predicate after an anonymous blank node
  _readPredicateAfterBlank: function (token) {
    // If a dot follows a blank node in top context, there is no predicate
    if (token.type === '.' && !this._contextStack.length) {
      this._subject = null; // cancel the current quad
      return this._readPunctuation(token);
    }
    return this._readPredicate(token);
  },

  // ### `_readListItem` reads items from a list
  _readListItem: function (token) {
    var item = null,                      // The item of the list
        list = null,                      // The list itself
        prevList = this._subject,         // The previous list that contains this list
        stack = this._contextStack,       // The stack of parent contexts
        parent = stack[stack.length - 1], // The parent containing the current list
        next = this._readListItem;        // The next function to execute

    switch (token.type) {
    case '[':
      // Stack the current list quad and start a new quad with a blank node as subject
      this._saveContext('blank', this._graph,
                        list = this._blank(), this.RDF_FIRST,
                        this._subject = item = this._blank());
      next = this._readBlankNodeHead;
      break;
    case '(':
      // Stack the current list quad and start a new list
      this._saveContext('list', this._graph,
                        list = this._blank(), this.RDF_FIRST, this.RDF_NIL);
      this._subject = null;
      break;
    case ')':
      // Closing the list; restore the parent context
      this._restoreContext();
      // If this list is contained within a parent list, return the membership quad here.
      // This will be `<parent list element> rdf:first <this list>.`.
      if (stack.length !== 0 && stack[stack.length - 1].type === 'list')
        this._emit(this._subject, this._predicate, this._object, this._graph);
      // Was this list the parent's subject?
      if (this._predicate === null) {
        // The next token is the predicate
        next = this._readPredicate;
        // No list tail if this was an empty list
        if (this._subject === this.RDF_NIL)
          return next;
      }
      // The list was in the parent context's object
      else {
        next = this._getContextEndReader();
        // No list tail if this was an empty list
        if (this._object === this.RDF_NIL)
          return next;
      }
      // Close the list by making the head nil
      list = this.RDF_NIL;
      break;
    case 'literal':
      // Regular literal, can still get a datatype or language
      if (token.prefix.length === 0) {
        this._literalValue = token.value;
        next = this._readListItemDataTypeOrLang;
      }
      // Pre-datatyped string literal (prefix stores the datatype)
      else {
        item = this._literal(token.value, this._namedNode(token.prefix));
        next = this._getContextEndReader();
      }
      break;
    default:
      if ((item = this._readEntity(token)) === undefined)
        return;
    }

     // Create a new blank node if no item head was assigned yet
    if (list === null)
      this._subject = list = this._blank();

    // Is this the first element of the list?
    if (prevList === null) {
      // This list is either the subject or the object of its parent
      if (parent.predicate === null)
        parent.subject = list;
      else
        parent.object = list;
    }
    else {
      // Continue the previous list with the current list
      this._emit(prevList, this.RDF_REST, list, this._graph);
    }
    // If an item was read, add it to the list
    if (item !== null) {
      // In N3 mode, the item might be a path
      if (this._n3Mode && (token.type === 'IRI' || token.type === 'prefixed')) {
        // Create a new context to add the item's path
        this._saveContext('item', this._graph, list, this.RDF_FIRST, item);
        this._subject = item, this._predicate = null;
        // _readPath will restore the context and output the item
        return this._getPathReader(this._readListItem);
      }
      // Output the item
      this._emit(list, this.RDF_FIRST, item, this._graph);
    }
    return next;
  },

  // ### `_readDataTypeOrLang` reads an _optional_ datatype or language
  _readDataTypeOrLang: function (token) {
    return this._completeLiteral(token, false);
  },

  // ### `_readListItemDataTypeOrLang` reads an _optional_ datatype or language in a list
  _readListItemDataTypeOrLang: function (token) {
    return this._completeLiteral(token, true);
  },

  // ### `_completeLiteral` completes a literal with an optional datatype or language
  _completeLiteral: function (token, listItem) {
    switch (token.type) {
    // Create a datatyped literal
    case 'type':
    case 'typeIRI':
      var datatype = this._readEntity(token);
      if (datatype === undefined) return; // No datatype means an error occurred
      this._object = this._literal(this._literalValue, datatype);
      token = null;
      break;
    // Create a language-tagged string
    case 'langcode':
      this._object = this._literal(this._literalValue, token.value);
      token = null;
      break;
    // Create a simple string literal
    default:
      this._object = this._literal(this._literalValue);
    }
    // If this literal was part of a list, write the item
    // (we could also check the context stack, but passing in a flag is faster)
    if (listItem)
      this._emit(this._subject, this.RDF_FIRST, this._object, this._graph);
    // If the token was consumed, continue with the rest of the input
    if (token === null)
      return this._getContextEndReader();
    // Otherwise, consume the token now
    else {
      this._readCallback = this._getContextEndReader();
      return this._readCallback(token);
    }
  },

  // ### `_readFormulaTail` reads the end of a formula
  _readFormulaTail: function (token) {
    if (token.type !== '}')
      return this._readPunctuation(token);

    // Store the last quad of the formula
    if (this._subject !== null)
      this._emit(this._subject, this._predicate, this._object, this._graph);

    // Restore the parent context containing this formula
    this._restoreContext();
    // If the formula was the subject, continue reading the predicate.
    // If the formula was the object, read punctuation.
    return this._object === null ? this._readPredicate : this._getContextEndReader();
  },

  // ### `_readPunctuation` reads punctuation between quads or quad parts
  _readPunctuation: function (token) {
    var next, subject = this._subject, graph = this._graph,
        inversePredicate = this._inversePredicate;
    switch (token.type) {
    // A closing brace ends a graph
    case '}':
      if (this._graph === null)
        return this._error('Unexpected graph closing', token);
      if (this._n3Mode)
        return this._readFormulaTail(token);
      this._graph = null;
    // A dot just ends the statement, without sharing anything with the next
    case '.':
      this._subject = null;
      next = this._contextStack.length ? this._readSubject : this._readInTopContext;
      if (inversePredicate) this._inversePredicate = false;
      break;
    // Semicolon means the subject is shared; predicate and object are different
    case ';':
      next = this._readPredicate;
      break;
    // Comma means both the subject and predicate are shared; the object is different
    case ',':
      next = this._readObject;
      break;
    default:
      // An entity means this is a quad (only allowed if not already inside a graph)
      if (this._supportsQuads && this._graph === null && (graph = this._readEntity(token)) !== undefined) {
        next = this._readQuadPunctuation;
        break;
      }
      return this._error('Expected punctuation to follow "' + this._object.id + '"', token);
    }
    // A quad has been completed now, so return it
    if (subject !== null) {
      var predicate = this._predicate, object = this._object;
      if (!inversePredicate)
        this._emit(subject, predicate, object,  graph);
      else
        this._emit(object,  predicate, subject, graph);
    }
    return next;
  },

    // ### `_readBlankNodePunctuation` reads punctuation in a blank node
  _readBlankNodePunctuation: function (token) {
    var next;
    switch (token.type) {
    // Semicolon means the subject is shared; predicate and object are different
    case ';':
      next = this._readPredicate;
      break;
    // Comma means both the subject and predicate are shared; the object is different
    case ',':
      next = this._readObject;
      break;
    default:
      return this._error('Expected punctuation to follow "' + this._object.id + '"', token);
    }
    // A quad has been completed now, so return it
    this._emit(this._subject, this._predicate, this._object, this._graph);
    return next;
  },

  // ### `_readQuadPunctuation` reads punctuation after a quad
  _readQuadPunctuation: function (token) {
    if (token.type !== '.')
      return this._error('Expected dot to follow quad', token);
    return this._readInTopContext;
  },

  // ### `_readPrefix` reads the prefix of a prefix declaration
  _readPrefix: function (token) {
    if (token.type !== 'prefix')
      return this._error('Expected prefix to follow @prefix', token);
    this._prefix = token.value;
    return this._readPrefixIRI;
  },

  // ### `_readPrefixIRI` reads the IRI of a prefix declaration
  _readPrefixIRI: function (token) {
    if (token.type !== 'IRI')
      return this._error('Expected IRI to follow prefix "' + this._prefix + ':"', token);
    var prefixNode = this._readEntity(token);
    this._prefixes[this._prefix] = prefixNode.value;
    this._prefixCallback(this._prefix, prefixNode);
    return this._readDeclarationPunctuation;
  },

  // ### `_readBaseIRI` reads the IRI of a base declaration
  _readBaseIRI: function (token) {
    var iri = token.type === 'IRI' && this._resolveIRI(token.value);
    if (!iri)
      return this._error('Expected valid IRI to follow base declaration', token);
    this._setBase(iri);
    return this._readDeclarationPunctuation;
  },

  // ### `_readNamedGraphLabel` reads the label of a named graph
  _readNamedGraphLabel: function (token) {
    switch (token.type) {
    case 'IRI':
    case 'blank':
    case 'prefixed':
      return this._readSubject(token), this._readGraph;
    case '[':
      return this._readNamedGraphBlankLabel;
    default:
      return this._error('Invalid graph label', token);
    }
  },

  // ### `_readNamedGraphLabel` reads a blank node label of a named graph
  _readNamedGraphBlankLabel: function (token) {
    if (token.type !== ']')
      return this._error('Invalid graph label', token);
    this._subject = this._blank();
    return this._readGraph;
  },

  // ### `_readDeclarationPunctuation` reads the punctuation of a declaration
  _readDeclarationPunctuation: function (token) {
    // SPARQL-style declarations don't have punctuation
    if (this._sparqlStyle) {
      this._sparqlStyle = false;
      return this._readInTopContext(token);
    }

    if (token.type !== '.')
      return this._error('Expected declaration to end with a dot', token);
    return this._readInTopContext;
  },

  // Reads a list of quantified symbols from a @forSome or @forAll statement
  _readQuantifierList: function (token) {
    var entity;
    switch (token.type) {
    case 'IRI':
    case 'prefixed':
      if ((entity = this._readEntity(token, true)) !== undefined)
        break;
    default:
      return this._error('Unexpected ' + token.type, token);
    }
    // Without explicit quantifiers, map entities to a quantified entity
    if (!this._explicitQuantifiers)
      this._quantified[entity.id] = this._quantifier('b' + blankNodeCount++);
    // With explicit quantifiers, output the reified quantifier
    else {
      // If this is the first item, start a new quantifier list
      if (this._subject === null)
        this._emit(this._graph || this.DEFAULTGRAPH, this._predicate,
                   this._subject = this._blank(), this.QUANTIFIERS_GRAPH);
      // Otherwise, continue the previous list
      else
        this._emit(this._subject, this.RDF_REST,
                   this._subject = this._blank(), this.QUANTIFIERS_GRAPH);
      // Output the list item
      this._emit(this._subject, this.RDF_FIRST, entity, this.QUANTIFIERS_GRAPH);
    }
    return this._readQuantifierPunctuation;
  },

  // Reads punctuation from a @forSome or @forAll statement
  _readQuantifierPunctuation: function (token) {
    // Read more quantifiers
    if (token.type === ',')
      return this._readQuantifierList;
    // End of the quantifier list
    else {
      // With explicit quantifiers, close the quantifier list
      if (this._explicitQuantifiers) {
        this._emit(this._subject, this.RDF_REST, this.RDF_NIL, this.QUANTIFIERS_GRAPH);
        this._subject = null;
      }
      // Read a dot
      this._readCallback = this._getContextEndReader();
      return this._readCallback(token);
    }
  },

  // ### `_getPathReader` reads a potential path and then resumes with the given function
  _getPathReader: function (afterPath) {
    this._afterPath = afterPath;
    return this._readPath;
  },

  // ### `_readPath` reads a potential path
  _readPath: function (token) {
    switch (token.type) {
    // Forward path
    case '!': return this._readForwardPath;
    // Backward path
    case '^': return this._readBackwardPath;
    // Not a path; resume reading where we left off
    default:
      var stack = this._contextStack, parent = stack.length && stack[stack.length - 1];
      // If we were reading a list item, we still need to output it
      if (parent && parent.type === 'item') {
        // The list item is the remaining subejct after reading the path
        var item = this._subject;
        // Switch back to the context of the list
        this._restoreContext();
        // Output the list item
        this._emit(this._subject, this.RDF_FIRST, item, this._graph);
      }
      return this._afterPath(token);
    }
  },

  // ### `_readForwardPath` reads a '!' path
  _readForwardPath: function (token) {
    var subject, predicate, object = this._blank();
    // The next token is the predicate
    if ((predicate = this._readEntity(token)) === undefined)
      return;
    // If we were reading a subject, replace the subject by the path's object
    if (this._predicate === null)
      subject = this._subject, this._subject = object;
    // If we were reading an object, replace the subject by the path's object
    else
      subject = this._object,  this._object  = object;
    // Emit the path's current quad and read its next section
    this._emit(subject, predicate, object, this._graph);
    return this._readPath;
  },

  // ### `_readBackwardPath` reads a '^' path
  _readBackwardPath: function (token) {
    var subject = this._blank(), predicate, object;
    // The next token is the predicate
    if ((predicate = this._readEntity(token)) === undefined)
      return;
    // If we were reading a subject, replace the subject by the path's subject
    if (this._predicate === null)
      object = this._subject, this._subject = subject;
    // If we were reading an object, replace the subject by the path's subject
    else
      object = this._object,  this._object  = subject;
    // Emit the path's current quad and read its next section
    this._emit(subject, predicate, object, this._graph);
    return this._readPath;
  },

  // ### `_getContextEndReader` gets the next reader function at the end of a context
  _getContextEndReader: function () {
    var contextStack = this._contextStack;
    if (!contextStack.length)
      return this._readPunctuation;

    switch (contextStack[contextStack.length - 1].type) {
    case 'blank':
      return this._readBlankNodeTail;
    case 'list':
      return this._readListItem;
    case 'formula':
      return this._readFormulaTail;
    }
  },

  // ### `_emit` sends a quad through the callback
  _emit: function (subject, predicate, object, graph) {
    this._callback(null, this._quad(subject, predicate, object, graph || this.DEFAULTGRAPH));
  },

  // ### `_error` emits an error message through the callback
  _error: function (message, token) {
    var err = new Error(message + ' on line ' + token.line + '.');
    err.context = {
      token: token,
      line: token.line,
      previousToken: this._lexer.previousToken,
    };
    this._callback(err);
    this._callback = noop;
  },

  // ### `_resolveIRI` resolves an IRI against the base path
  _resolveIRI: function (iri) {
    return /^[a-z][a-z0-9+.-]*:/i.test(iri) ? iri : this._resolveRelativeIRI(iri);
  },

  // ### `_resolveRelativeIRI` resolves an IRI against the base path,
  // assuming that a base path has been set and that the IRI is indeed relative
  _resolveRelativeIRI: function (iri) {
    // An empty relative IRI indicates the base IRI
    if (!iri.length)
      return this._base;
    // Decide resolving strategy based in the first character
    switch (iri[0]) {
    // Resolve relative fragment IRIs against the base IRI
    case '#': return this._base + iri;
    // Resolve relative query string IRIs by replacing the query string
    case '?': return this._base.replace(/(?:\?.*)?$/, iri);
    // Resolve root-relative IRIs at the root of the base IRI
    case '/':
      // Resolve scheme-relative IRIs to the scheme
      return (iri[1] === '/' ? this._baseScheme : this._baseRoot) + this._removeDotSegments(iri);
    // Resolve all other IRIs at the base IRI's path
    default:
      // Relative IRIs cannot contain a colon in the first path segment
      return (/^[^/:]*:/.test(iri)) ? '' : this._removeDotSegments(this._basePath + iri);
    }
  },

  // ### `_removeDotSegments` resolves './' and '../' path segments in an IRI as per RFC3986
  _removeDotSegments: function (iri) {
    // Don't modify the IRI if it does not contain any dot segments
    if (!/(^|\/)\.\.?($|[/#?])/.test(iri))
      return iri;

    // Start with an imaginary slash before the IRI in order to resolve trailing './' and '../'
    var result = '', length = iri.length, i = -1, pathStart = -1, segmentStart = 0, next = '/';

    while (i < length) {
      switch (next) {
      // The path starts with the first slash after the authority
      case ':':
        if (pathStart < 0) {
          // Skip two slashes before the authority
          if (iri[++i] === '/' && iri[++i] === '/')
            // Skip to slash after the authority
            while ((pathStart = i + 1) < length && iri[pathStart] !== '/')
              i = pathStart;
        }
        break;
      // Don't modify a query string or fragment
      case '?':
      case '#':
        i = length;
        break;
      // Handle '/.' or '/..' path segments
      case '/':
        if (iri[i + 1] === '.') {
          next = iri[++i + 1];
          switch (next) {
          // Remove a '/.' segment
          case '/':
            result += iri.substring(segmentStart, i - 1);
            segmentStart = i + 1;
            break;
          // Remove a trailing '/.' segment
          case undefined:
          case '?':
          case '#':
            return result + iri.substring(segmentStart, i) + iri.substr(i + 1);
          // Remove a '/..' segment
          case '.':
            next = iri[++i + 1];
            if (next === undefined || next === '/' || next === '?' || next === '#') {
              result += iri.substring(segmentStart, i - 2);
              // Try to remove the parent path from result
              if ((segmentStart = result.lastIndexOf('/')) >= pathStart)
                result = result.substr(0, segmentStart);
              // Remove a trailing '/..' segment
              if (next !== '/')
                return result + '/' + iri.substr(i + 1);
              segmentStart = i + 1;
            }
          }
        }
      }
      next = iri[++i];
    }
    return result + iri.substring(segmentStart);
  },

  // ## Public methods

  // ### `parse` parses the N3 input and emits each parsed quad through the callback
  parse: function (input, quadCallback, prefixCallback) {
    var self = this;
    // The read callback is the next function to be executed when a token arrives.
    // We start reading in the top context.
    this._readCallback = this._readInTopContext;
    this._sparqlStyle = false;
    this._prefixes = Object.create(null);
    this._prefixes._ = this._blankNodePrefix ? this._blankNodePrefix.substr(2)
                                             : 'b' + blankNodePrefix++ + '_';
    this._prefixCallback = prefixCallback || noop;
    this._inversePredicate = false;
    this._quantified = Object.create(null);

    // Parse synchronously if no quad callback is given
    if (!quadCallback) {
      var quads = [], error;
      this._callback = function (e, t) { e ? (error = e) : t && quads.push(t); };
      this._lexer.tokenize(input).every(function (token) {
        return self._readCallback = self._readCallback(token);
      });
      if (error) throw error;
      return quads;
    }

    // Parse asynchronously otherwise, executing the read callback when a token arrives
    this._callback = quadCallback;
    this._lexer.tokenize(input, function (error, token) {
      if (error !== null)
        self._callback(error), self._callback = noop;
      else if (self._readCallback)
        self._readCallback = self._readCallback(token);
    });
  },
};

// The empty function
function noop() {}

// Initializes the parser with the given data factory
function initDataFactory(parser, factory) {
  // Set factory methods
  var namedNode = factory.namedNode;
  parser._namedNode   = namedNode;
  parser._blankNode   = factory.blankNode;
  parser._literal     = factory.literal;
  parser._variable    = factory.variable;
  parser._quad        = factory.quad;
  parser.DEFAULTGRAPH = factory.defaultGraph();

  // Set common named nodes
  parser.RDF_FIRST  = namedNode(namespaces.rdf.first);
  parser.RDF_REST   = namedNode(namespaces.rdf.rest);
  parser.RDF_NIL    = namedNode(namespaces.rdf.nil);
  parser.N3_FORALL  = namedNode(namespaces.r.forAll);
  parser.N3_FORSOME = namedNode(namespaces.r.forSome);
  parser.ABBREVIATIONS = {
    'a': namedNode(namespaces.rdf.type),
    '=': namedNode(namespaces.owl.sameAs),
    '>': namedNode(namespaces.log.implies),
  };
  parser.QUANTIFIERS_GRAPH = namedNode('urn:n3:quantifiers');
}
initDataFactory(N3Parser.prototype, DataFactory);

// ## Exports

N3.Parser = N3Parser;

})();
(function () {
// **N3Writer** writes N3 documents.

var namespaces = N3.IRIs,
    DataFactory = N3.DataFactory;

var DEFAULTGRAPH = DataFactory.defaultGraph();

var rdf = namespaces.rdf,
    xsd = namespaces.xsd;

// Characters in literals that require escaping
var escape    = /["\\\t\n\r\b\f\u0000-\u0019\ud800-\udbff]/,
    escapeAll = /["\\\t\n\r\b\f\u0000-\u0019]|[\ud800-\udbff][\udc00-\udfff]/g,
    escapedCharacters = {
      '\\': '\\\\', '"': '\\"', '\t': '\\t',
      '\n': '\\n', '\r': '\\r', '\b': '\\b', '\f': '\\f',
    };

// ## Constructor
function N3Writer(outputStream, options) {
  if (!(this instanceof N3Writer))
    return new N3Writer(outputStream, options);

  // Shift arguments if the first argument is not a stream
  if (outputStream && typeof outputStream.write !== 'function')
    options = outputStream, outputStream = null;
  options = options || {};

  // If no output stream given, send the output as string through the end callback
  if (!outputStream) {
    var output = '';
    this._outputStream = {
      write: function (chunk, encoding, done) { output += chunk; done && done(); },
      end:   function (done) { done && done(null, output); },
    };
    this._endStream = true;
  }
  else {
    this._outputStream = outputStream;
    this._endStream = options.end === undefined ? true : !!options.end;
  }

  // Initialize writer, depending on the format
  this._subject = null;
  if (!(/triple|quad/i).test(options.format)) {
    this._graph = DEFAULTGRAPH;
    this._prefixIRIs = Object.create(null);
    options.prefixes && this.addPrefixes(options.prefixes);
  }
  else {
    this._writeQuad = this._writeQuadLine;
  }
}

N3Writer.prototype = {
  // ## Private methods

  // ### Whether the current graph is the default graph
  get _inDefaultGraph() {
    return DEFAULTGRAPH.equals(this._graph);
  },

  // ### `_write` writes the argument to the output stream
  _write: function (string, callback) {
    this._outputStream.write(string, 'utf8', callback);
  },

  // ### `_writeQuad` writes the quad to the output stream
  _writeQuad: function (subject, predicate, object, graph, done) {
    try {
      // Write the graph's label if it has changed
      if (!graph.equals(this._graph)) {
        // Close the previous graph and start the new one
        this._write((this._subject === null ? '' : (this._inDefaultGraph ? '.\n' : '\n}\n')) +
                    (DEFAULTGRAPH.equals(graph) ? '' : this._encodeIriOrBlank(graph) + ' {\n'));
        this._graph = graph;
        this._subject = null;
      }
      // Don't repeat the subject if it's the same
      if (subject.equals(this._subject)) {
        // Don't repeat the predicate if it's the same
        if (predicate.equals(this._predicate))
          this._write(', ' + this._encodeObject(object), done);
        // Same subject, different predicate
        else
          this._write(';\n    ' +
                      this._encodePredicate(this._predicate = predicate) + ' ' +
                      this._encodeObject(object), done);
      }
      // Different subject; write the whole quad
      else
        this._write((this._subject === null ? '' : '.\n') +
                    this._encodeIriOrBlank(this._subject = subject) + ' ' +
                    this._encodePredicate(this._predicate = predicate) + ' ' +
                    this._encodeObject(object), done);
    }
    catch (error) { done && done(error); }
  },

  // ### `_writeQuadLine` writes the quad to the output stream as a single line
  _writeQuadLine: function (subject, predicate, object, graph, done) {
    // Write the quad without prefixes
    delete this._prefixMatch;
    this._write(this.quadToString(subject, predicate, object, graph), done);
  },

  // ### `quadToString` serializes a quad as a string
  quadToString: function (subject, predicate, object, graph) {
    return  this._encodeIriOrBlank(subject)   + ' ' +
            this._encodeIriOrBlank(predicate) + ' ' +
            this._encodeObject(object) +
            (graph && graph.value ? ' ' + this._encodeIriOrBlank(graph) + '.\n' : '.\n');
  },

  // ### `quadsToString` serializes an array of quads as a string
  quadsToString: function (quads) {
    return quads.map(function (t) {
      return this.quadToString(t.subject, t.predicate, t.object, t.graph);
    }, this).join('');
  },

  // ### `_encodeIriOrBlank` represents an IRI or blank node
  _encodeIriOrBlank: function (entity) {
    // A blank node or list is represented as-is
    if (entity.termType !== 'NamedNode')
      return 'id' in entity ? entity.id : '_:' + entity.value;
    // Escape special characters
    var iri = entity.value;
    if (escape.test(iri))
      iri = iri.replace(escapeAll, characterReplacer);
    // Try to represent the IRI as prefixed name
    var prefixMatch = this._prefixRegex.exec(iri);
    return !prefixMatch ? '<' + iri + '>' :
           (!prefixMatch[1] ? iri : this._prefixIRIs[prefixMatch[1]] + prefixMatch[2]);
  },

  // ### `_encodeLiteral` represents a literal
  _encodeLiteral: function (literal) {
    // Escape special characters
    var value = literal.value;
    if (escape.test(value))
      value = value.replace(escapeAll, characterReplacer);
    // Write the literal, possibly with type or language
    if (literal.language)
      return '"' + value + '"@' + literal.language;
    else if (literal.datatype.value !== xsd.string)
      return '"' + value + '"^^' + this._encodeIriOrBlank(literal.datatype);
    else
      return '"' + value + '"';
  },

  // ### `_encodePredicate` represents a predicate
  _encodePredicate: function (predicate) {
    return predicate.value === rdf.type ? 'a' : this._encodeIriOrBlank(predicate);
  },

  // ### `_encodeObject` represents an object
  _encodeObject: function (object) {
    return object.termType === 'Literal' ? this._encodeLiteral(object) : this._encodeIriOrBlank(object);
  },

  // ### `_blockedWrite` replaces `_write` after the writer has been closed
  _blockedWrite: function () {
    throw new Error('Cannot write because the writer has been closed.');
  },

  // ### `addQuad` adds the quad to the output stream
  addQuad: function (subject, predicate, object, graph, done) {
    // The quad was given as an object, so shift parameters
    if (object === undefined)
      this._writeQuad(subject.subject, subject.predicate, subject.object, subject.graph, predicate);
    // The optional `graph` parameter was not provided
    else if (typeof graph === 'function')
      this._writeQuad(subject, predicate, object, DEFAULTGRAPH, graph);
    // The `graph` parameter was provided
    else
      this._writeQuad(subject, predicate, object, graph || DEFAULTGRAPH, done);
  },

  // ### `addQuads` adds the quads to the output stream
  addQuads: function (quads) {
    for (var i = 0; i < quads.length; i++)
      this.addQuad(quads[i]);
  },

  // ### `addPrefix` adds the prefix to the output stream
  addPrefix: function (prefix, iri, done) {
    var prefixes = {};
    prefixes[prefix] = iri;
    this.addPrefixes(prefixes, done);
  },

  // ### `addPrefixes` adds the prefixes to the output stream
  addPrefixes: function (prefixes, done) {
    // Add all useful prefixes
    var prefixIRIs = this._prefixIRIs, hasPrefixes = false;
    for (var prefix in prefixes) {
      // Verify whether the prefix can be used and does not exist yet
      var iri = prefixes[prefix];
      if (typeof iri !== 'string')
        iri = iri.value;
      if (/[#\/]$/.test(iri) && prefixIRIs[iri] !== (prefix += ':')) {
        hasPrefixes = true;
        prefixIRIs[iri] = prefix;
        // Finish a possible pending quad
        if (this._subject !== null) {
          this._write(this._inDefaultGraph ? '.\n' : '\n}\n');
          this._subject = null, this._graph = '';
        }
        // Write prefix
        this._write('@prefix ' + prefix + ' <' + iri + '>.\n');
      }
    }
    // Recreate the prefix matcher
    if (hasPrefixes) {
      var IRIlist = '', prefixList = '';
      for (var prefixIRI in prefixIRIs) {
        IRIlist += IRIlist ? '|' + prefixIRI : prefixIRI;
        prefixList += (prefixList ? '|' : '') + prefixIRIs[prefixIRI];
      }
      IRIlist = IRIlist.replace(/[\]\/\(\)\*\+\?\.\\\$]/g, '\\$&');
      this._prefixRegex = new RegExp('^(?:' + prefixList + ')[^\/]*$|' +
                                     '^(' + IRIlist + ')([a-zA-Z][\\-_a-zA-Z0-9]*)$');
    }
    // End a prefix block with a newline
    this._write(hasPrefixes ? '\n' : '', done);
  },

  // ### `blank` creates a blank node with the given content
  blank: function (predicate, object) {
    var children = predicate, child, length;
    // Empty blank node
    if (predicate === undefined)
      children = [];
    // Blank node passed as blank(Term("predicate"), Term("object"))
    else if (predicate.termType)
      children = [{ predicate: predicate, object: object }];
    // Blank node passed as blank({ predicate: predicate, object: object })
    else if (!('length' in predicate))
      children = [predicate];

    switch (length = children.length) {
    // Generate an empty blank node
    case 0:
      return new SerializedTerm('[]');
    // Generate a non-nested one-triple blank node
    case 1:
      child = children[0];
      if (!(child.object instanceof SerializedTerm))
        return new SerializedTerm('[ ' + this._encodePredicate(child.predicate) + ' ' +
                                  this._encodeObject(child.object) + ' ]');
    // Generate a multi-triple or nested blank node
    default:
      var contents = '[';
      // Write all triples in order
      for (var i = 0; i < length; i++) {
        child = children[i];
        // Write only the object is the predicate is the same as the previous
        if (child.predicate.equals(predicate))
          contents += ', ' + this._encodeObject(child.object);
        // Otherwise, write the predicate and the object
        else {
          contents += (i ? ';\n  ' : '\n  ') +
                      this._encodePredicate(child.predicate) + ' ' +
                      this._encodeObject(child.object);
          predicate = child.predicate;
        }
      }
      return new SerializedTerm(contents + '\n]');
    }
  },

  // ### `list` creates a list node with the given content
  list: function (elements) {
    var length = elements && elements.length || 0, contents = new Array(length);
    for (var i = 0; i < length; i++)
      contents[i] = this._encodeObject(elements[i]);
    return new SerializedTerm('(' + contents.join(' ') + ')');
  },

  // ### `_prefixRegex` matches a prefixed name or IRI that begins with one of the added prefixes
  _prefixRegex: /$0^/,

  // ### `end` signals the end of the output stream
  end: function (done) {
    // Finish a possible pending quad
    if (this._subject !== null) {
      this._write(this._inDefaultGraph ? '.\n' : '\n}\n');
      this._subject = null;
    }
    // Disallow further writing
    this._write = this._blockedWrite;

    // Try to end the underlying stream, ensuring done is called exactly one time
    var singleDone = done && function (error, result) { singleDone = null, done(error, result); };
    if (this._endStream) {
      try { return this._outputStream.end(singleDone); }
      catch (error) { /* error closing stream */ }
    }
    singleDone && singleDone();
  },
};

// Replaces a character by its escaped version
function characterReplacer(character) {
  // Replace a single character by its escaped version
  var result = escapedCharacters[character];
  if (result === undefined) {
    // Replace a single character with its 4-bit unicode escape sequence
    if (character.length === 1) {
      result = character.charCodeAt(0).toString(16);
      result = '\\u0000'.substr(0, 6 - result.length) + result;
    }
    // Replace a surrogate pair with its 8-bit unicode escape sequence
    else {
      result = ((character.charCodeAt(0) - 0xD800) * 0x400 +
                 character.charCodeAt(1) + 0x2400).toString(16);
      result = '\\U00000000'.substr(0, 10 - result.length) + result;
    }
  }
  return result;
}

// ## Placeholder class to represent already pretty-printed terms
function SerializedTerm(value) {
  this.id = value;
}
DataFactory.internal.Term.subclass(SerializedTerm);

// Pretty-printed nodes are not equal to any other node
// (e.g., [] does not equal [])
SerializedTerm.prototype.equals = function () { return false; };

// ## Exports

N3.Writer = N3Writer;

})();
(function () {
// **N3Store** objects store N3 quads by graph in memory.

var DataFactory = N3.DataFactory;
var toId = DataFactory.internal.toId,
    fromId = DataFactory.internal.fromId;

// ## Constructor
function N3Store(quads, options) {
  if (!(this instanceof N3Store))
    return new N3Store(quads, options);

  // The number of quads is initially zero
  this._size = 0;
  // `_graphs` contains subject, predicate, and object indexes per graph
  this._graphs = Object.create(null);
  // `_ids` maps entities such as `http://xmlns.com/foaf/0.1/name` to numbers,
  // saving memory by using only numbers as keys in `_graphs`
  this._id = 0;
  this._ids = Object.create(null);
  this._ids['><'] = 0; // dummy entry, so the first actual key is non-zero
  this._entities = Object.create(null); // inverse of `_ids`
  // `_blankNodeIndex` is the index of the last automatically named blank node
  this._blankNodeIndex = 0;

  // Shift parameters if `quads` is not given
  if (!options && quads && !quads[0])
    options = quads, quads = null;
  options = options || {};
  this._factory = options.factory || DataFactory;

  // Add quads if passed
  if (quads)
    this.addQuads(quads);
}

N3Store.prototype = {
  // ## Public properties

  // ### `size` returns the number of quads in the store
  get size() {
    // Return the quad count if if was cached
    var size = this._size;
    if (size !== null)
      return size;

    // Calculate the number of quads by counting to the deepest level
    size = 0;
    var graphs = this._graphs, subjects, subject;
    for (var graphKey in graphs)
      for (var subjectKey in (subjects = graphs[graphKey].subjects))
        for (var predicateKey in (subject = subjects[subjectKey]))
          size += Object.keys(subject[predicateKey]).length;
    return this._size = size;
  },

  // ## Private methods

  // ### `_addToIndex` adds a quad to a three-layered index.
  // Returns if the index has changed, if the entry did not already exist.
  _addToIndex: function (index0, key0, key1, key2) {
    // Create layers as necessary
    var index1 = index0[key0] || (index0[key0] = {});
    var index2 = index1[key1] || (index1[key1] = {});
    // Setting the key to _any_ value signals the presence of the quad
    var existed = key2 in index2;
    if (!existed)
      index2[key2] = null;
    return !existed;
  },

  // ### `_removeFromIndex` removes a quad from a three-layered index
  _removeFromIndex: function (index0, key0, key1, key2) {
    // Remove the quad from the index
    var index1 = index0[key0], index2 = index1[key1], key;
    delete index2[key2];

    // Remove intermediary index layers if they are empty
    for (key in index2) return;
    delete index1[key1];
    for (key in index1) return;
    delete index0[key0];
  },

  // ### `_findInIndex` finds a set of quads in a three-layered index.
  // The index base is `index0` and the keys at each level are `key0`, `key1`, and `key2`.
  // Any of these keys can be undefined, which is interpreted as a wildcard.
  // `name0`, `name1`, and `name2` are the names of the keys at each level,
  // used when reconstructing the resulting quad
  // (for instance: _subject_, _predicate_, and _object_).
  // Finally, `graph` will be the graph of the created quads.
  // If `callback` is given, each result is passed through it
  // and iteration halts when it returns truthy for any quad.
  // If instead `array` is given, each result is added to the array.
  _findInIndex: function (index0, key0, key1, key2, name0, name1, name2, graph, callback, array) {
    var tmp, index1, index2, varCount = !key0 + !key1 + !key2,
        // depending on the number of variables, keys or reverse index are faster
        entityKeys = varCount > 1 ? Object.keys(this._ids) : this._entities;

    // If a key is specified, use only that part of index 0.
    if (key0) (tmp = index0, index0 = {})[key0] = tmp[key0];
    for (var value0 in index0) {
      var entity0 = entityKeys[value0];

      if (index1 = index0[value0]) {
        // If a key is specified, use only that part of index 1.
        if (key1) (tmp = index1, index1 = {})[key1] = tmp[key1];
        for (var value1 in index1) {
          var entity1 = entityKeys[value1];

          if (index2 = index1[value1]) {
            // If a key is specified, use only that part of index 2, if it exists.
            var values = key2 ? (key2 in index2 ? [key2] : []) : Object.keys(index2);
            // Create quads for all items found in index 2.
            for (var l = 0; l < values.length; l++) {
              var parts = { subject: null, predicate: null, object: null };
              parts[name0] = fromId(entity0, this._factory);
              parts[name1] = fromId(entity1, this._factory);
              parts[name2] = fromId(entityKeys[values[l]], this._factory);
              var quad = this._factory.quad(
                parts.subject, parts.predicate, parts.object, fromId(graph, this._factory));
              if (array)
                array.push(quad);
              else if (callback(quad))
                return true;
            }
          }
        }
      }
    }
    return array;
  },

  // ### `_loop` executes the callback on all keys of index 0
  _loop: function (index0, callback) {
    for (var key0 in index0)
      callback(key0);
  },

  // ### `_loopByKey0` executes the callback on all keys of a certain entry in index 0
  _loopByKey0: function (index0, key0, callback) {
    var index1, key1;
    if (index1 = index0[key0]) {
      for (key1 in index1)
        callback(key1);
    }
  },

  // ### `_loopByKey1` executes the callback on given keys of all entries in index 0
  _loopByKey1: function (index0, key1, callback) {
    var key0, index1;
    for (key0 in index0) {
      index1 = index0[key0];
      if (index1[key1])
        callback(key0);
    }
  },

  // ### `_loopBy2Keys` executes the callback on given keys of certain entries in index 2
  _loopBy2Keys: function (index0, key0, key1, callback) {
    var index1, index2, key2;
    if ((index1 = index0[key0]) && (index2 = index1[key1])) {
      for (key2 in index2)
        callback(key2);
    }
  },

  // ### `_countInIndex` counts matching quads in a three-layered index.
  // The index base is `index0` and the keys at each level are `key0`, `key1`, and `key2`.
  // Any of these keys can be undefined, which is interpreted as a wildcard.
  _countInIndex: function (index0, key0, key1, key2) {
    var count = 0, tmp, index1, index2;

    // If a key is specified, count only that part of index 0
    if (key0) (tmp = index0, index0 = {})[key0] = tmp[key0];
    for (var value0 in index0) {
      if (index1 = index0[value0]) {
        // If a key is specified, count only that part of index 1
        if (key1) (tmp = index1, index1 = {})[key1] = tmp[key1];
        for (var value1 in index1) {
          if (index2 = index1[value1]) {
            // If a key is specified, count the quad if it exists
            if (key2) (key2 in index2) && count++;
            // Otherwise, count all quads
            else count += Object.keys(index2).length;
          }
        }
      }
    }
    return count;
  },

  // ### `_getGraphs` returns an array with the given graph,
  // or all graphs if the argument is null or undefined.
  _getGraphs: function (graph) {
    if (!isString(graph))
      return this._graphs;
    var graphs = {};
    graphs[graph] = this._graphs[graph];
    return graphs;
  },

  // ### `_uniqueEntities` returns a function that accepts an entity ID
  // and passes the corresponding entity to callback if it hasn't occurred before.
  _uniqueEntities: function (callback) {
    var uniqueIds = Object.create(null), entities = this._entities;
    return function (id) {
      if (!(id in uniqueIds)) {
        uniqueIds[id] = true;
        callback(fromId(entities[id]));
      }
    };
  },

  // ## Public methods

  // ### `addQuad` adds a new quad to the store.
  // Returns if the quad index has changed, if the quad did not already exist.
  addQuad: function (subject, predicate, object, graph) {
    // Shift arguments if a quad object is given instead of components
    if (!predicate)
      graph = subject.graph, object = subject.object,
        predicate = subject.predicate, subject = subject.subject;

    // Convert terms to internal string representation
    subject = toId(subject);
    predicate = toId(predicate);
    object = toId(object);
    graph = toId(graph);

    // Find the graph that will contain the triple
    var graphItem = this._graphs[graph];
    // Create the graph if it doesn't exist yet
    if (!graphItem) {
      graphItem = this._graphs[graph] = { subjects: {}, predicates: {}, objects: {} };
      // Freezing a graph helps subsequent `add` performance,
      // and properties will never be modified anyway
      Object.freeze(graphItem);
    }

    // Since entities can often be long IRIs, we avoid storing them in every index.
    // Instead, we have a separate index that maps entities to numbers,
    // which are then used as keys in the other indexes.
    var ids = this._ids;
    var entities = this._entities;
    subject   = ids[subject]   || (ids[entities[++this._id] = subject]   = this._id);
    predicate = ids[predicate] || (ids[entities[++this._id] = predicate] = this._id);
    object    = ids[object]    || (ids[entities[++this._id] = object]    = this._id);

    var changed = this._addToIndex(graphItem.subjects,   subject,   predicate, object);
    this._addToIndex(graphItem.predicates, predicate, object,    subject);
    this._addToIndex(graphItem.objects,    object,    subject,   predicate);

    // The cached quad count is now invalid
    this._size = null;
    return changed;
  },

  // ### `addQuads` adds multiple quads to the store
  addQuads: function (quads) {
    for (var i = 0; i < quads.length; i++)
      this.addQuad(quads[i]);
  },

  // ### `import` adds a stream of quads to the store
  import: function (stream) {
    var self = this;
    stream.on('data', function (quad) { self.addQuad(quad); });
    return stream;
  },

  // ### `removeQuad` removes a quad from the store if it exists
  removeQuad: function (subject, predicate, object, graph) {
    // Shift arguments if a quad object is given instead of components
    if (!predicate)
      graph = subject.graph, object = subject.object,
        predicate = subject.predicate, subject = subject.subject;

    // Convert terms to internal string representation
    subject = toId(subject);
    predicate = toId(predicate);
    object = toId(object);
    graph = toId(graph);

    // Find internal identifiers for all components
    // and verify the quad exists.
    var graphItem, ids = this._ids, graphs = this._graphs, subjects, predicates;
    if (!(subject    = ids[subject]) || !(predicate = ids[predicate]) ||
        !(object     = ids[object])  || !(graphItem = graphs[graph])  ||
        !(subjects   = graphItem.subjects[subject]) ||
        !(predicates = subjects[predicate]) ||
        !(object in predicates))
      return false;

    // Remove it from all indexes
    this._removeFromIndex(graphItem.subjects,   subject,   predicate, object);
    this._removeFromIndex(graphItem.predicates, predicate, object,    subject);
    this._removeFromIndex(graphItem.objects,    object,    subject,   predicate);
    if (this._size !== null) this._size--;

    // Remove the graph if it is empty
    for (subject in graphItem.subjects) return true;
    delete graphs[graph];
    return true;
  },

  // ### `removeQuads` removes multiple quads from the store
  removeQuads: function (quads) {
    for (var i = 0; i < quads.length; i++)
      this.removeQuad(quads[i]);
  },

  // ### `remove` removes a stream of quads from the store
  remove: function (stream) {
    var self = this;
    stream.on('data', function (quad) { self.removeQuad(quad); });
    return stream;
  },

  // ### `getQuads` returns an array of quads matching a pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  getQuads: function (subject, predicate, object, graph) {
    // Convert terms to internal string representation
    subject = subject && toId(subject);
    predicate = predicate && toId(predicate);
    object = object && toId(object);
    graph = graph && toId(graph);

    var quads = [], graphs = this._getGraphs(graph), content,
        ids = this._ids, subjectId, predicateId, objectId;

    // Translate IRIs to internal index keys.
    if (isString(subject)   && !(subjectId   = ids[subject])   ||
        isString(predicate) && !(predicateId = ids[predicate]) ||
        isString(object)    && !(objectId    = ids[object]))
      return quads;

    for (var graphId in graphs) {
      // Only if the specified graph contains triples, there can be results
      if (content = graphs[graphId]) {
        // Choose the optimal index, based on what fields are present
        if (subjectId) {
          if (objectId)
            // If subject and object are given, the object index will be the fastest
            this._findInIndex(content.objects, objectId, subjectId, predicateId,
                              'object', 'subject', 'predicate', graphId, null, quads);
          else
            // If only subject and possibly predicate are given, the subject index will be the fastest
            this._findInIndex(content.subjects, subjectId, predicateId, null,
                              'subject', 'predicate', 'object', graphId, null, quads);
        }
        else if (predicateId)
          // If only predicate and possibly object are given, the predicate index will be the fastest
          this._findInIndex(content.predicates, predicateId, objectId, null,
                            'predicate', 'object', 'subject', graphId, null, quads);
        else if (objectId)
          // If only object is given, the object index will be the fastest
          this._findInIndex(content.objects, objectId, null, null,
                            'object', 'subject', 'predicate', graphId, null, quads);
        else
          // If nothing is given, iterate subjects and predicates first
          this._findInIndex(content.subjects, null, null, null,
                            'subject', 'predicate', 'object', graphId, null, quads);
      }
    }
    return quads;
  },

  // ### `countQuads` returns the number of quads matching a pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  countQuads: function (subject, predicate, object, graph) {
    // Convert terms to internal string representation
    subject = subject && toId(subject);
    predicate = predicate && toId(predicate);
    object = object && toId(object);
    graph = graph && toId(graph);

    var count = 0, graphs = this._getGraphs(graph), content,
        ids = this._ids, subjectId, predicateId, objectId;

    // Translate IRIs to internal index keys.
    if (isString(subject)   && !(subjectId   = ids[subject])   ||
        isString(predicate) && !(predicateId = ids[predicate]) ||
        isString(object)    && !(objectId    = ids[object]))
      return 0;

    for (var graphId in graphs) {
      // Only if the specified graph contains triples, there can be results
      if (content = graphs[graphId]) {
        // Choose the optimal index, based on what fields are present
        if (subject) {
          if (object)
            // If subject and object are given, the object index will be the fastest
            count += this._countInIndex(content.objects, objectId, subjectId, predicateId);
          else
            // If only subject and possibly predicate are given, the subject index will be the fastest
            count += this._countInIndex(content.subjects, subjectId, predicateId, objectId);
        }
        else if (predicate) {
          // If only predicate and possibly object are given, the predicate index will be the fastest
          count += this._countInIndex(content.predicates, predicateId, objectId, subjectId);
        }
        else {
          // If only object is possibly given, the object index will be the fastest
          count += this._countInIndex(content.objects, objectId, subjectId, predicateId);
        }
      }
    }
    return count;
  },

  // ### `forEach` executes the callback on all quads.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  forEach: function (callback, subject, predicate, object, graph) {
    this.some(function (quad) {
      callback(quad);
      return false;
    }, subject, predicate, object, graph);
  },

  // ### `every` executes the callback on all quads,
  // and returns `true` if it returns truthy for all them.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  every: function (callback, subject, predicate, object, graph) {
    var some = false;
    var every = !this.some(function (quad) {
      some = true;
      return !callback(quad);
    }, subject, predicate, object, graph);
    return some && every;
  },

  // ### `some` executes the callback on all quads,
  // and returns `true` if it returns truthy for any of them.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  some: function (callback, subject, predicate, object, graph) {
    // Convert terms to internal string representation
    subject = subject && toId(subject);
    predicate = predicate && toId(predicate);
    object = object && toId(object);
    graph = graph && toId(graph);

    var graphs = this._getGraphs(graph), content,
        ids = this._ids, subjectId, predicateId, objectId;

    // Translate IRIs to internal index keys.
    if (isString(subject)   && !(subjectId   = ids[subject])   ||
        isString(predicate) && !(predicateId = ids[predicate]) ||
        isString(object)    && !(objectId    = ids[object]))
      return false;

    for (var graphId in graphs) {
      // Only if the specified graph contains triples, there can be results
      if (content = graphs[graphId]) {
        // Choose the optimal index, based on what fields are present
        if (subjectId) {
          if (objectId) {
          // If subject and object are given, the object index will be the fastest
            if (this._findInIndex(content.objects, objectId, subjectId, predicateId,
                                  'object', 'subject', 'predicate', graphId, callback, null))
              return true;
          }
          else
            // If only subject and possibly predicate are given, the subject index will be the fastest
            if (this._findInIndex(content.subjects, subjectId, predicateId, null,
                                  'subject', 'predicate', 'object', graphId, callback, null))
              return true;
        }
        else if (predicateId) {
          // If only predicate and possibly object are given, the predicate index will be the fastest
          if (this._findInIndex(content.predicates, predicateId, objectId, null,
                                'predicate', 'object', 'subject', graphId, callback, null)) {
            return true;
          }
        }
        else if (objectId) {
          // If only object is given, the object index will be the fastest
          if (this._findInIndex(content.objects, objectId, null, null,
                                'object', 'subject', 'predicate', graphId, callback, null)) {
            return true;
          }
        }
        else
        // If nothing is given, iterate subjects and predicates first
        if (this._findInIndex(content.subjects, null, null, null,
                              'subject', 'predicate', 'object', graphId, callback, null)) {
          return true;
        }
      }
    }
    return false;
  },

  // ### `getSubjects` returns all subjects that match the pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  getSubjects: function (predicate, object, graph) {
    var results = [];
    this.forSubjects(function (s) { results.push(s); }, predicate, object, graph);
    return results;
  },

  // ### `forSubjects` executes the callback on all subjects that match the pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  forSubjects: function (callback, predicate, object, graph) {
    // Convert terms to internal string representation
    predicate = predicate && toId(predicate);
    object = object && toId(object);
    graph = graph && toId(graph);

    var ids = this._ids, graphs = this._getGraphs(graph), content, predicateId, objectId;
    callback = this._uniqueEntities(callback);

    // Translate IRIs to internal index keys.
    if (isString(predicate) && !(predicateId = ids[predicate]) ||
        isString(object)    && !(objectId    = ids[object]))
      return;

    for (graph in graphs) {
      // Only if the specified graph contains triples, there can be results
      if (content = graphs[graph]) {
        // Choose optimal index based on which fields are wildcards
        if (predicateId) {
          if (objectId)
            // If predicate and object are given, the POS index is best.
            this._loopBy2Keys(content.predicates, predicateId, objectId, callback);
          else
            // If only predicate is given, the SPO index is best.
            this._loopByKey1(content.subjects, predicateId, callback);
        }
        else if (objectId)
          // If only object is given, the OSP index is best.
          this._loopByKey0(content.objects, objectId, callback);
        else
          // If no params given, iterate all the subjects
          this._loop(content.subjects, callback);
      }
    }
  },

  // ### `getPredicates` returns all predicates that match the pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  getPredicates: function (subject, object, graph) {
    var results = [];
    this.forPredicates(function (p) { results.push(p); }, subject, object, graph);
    return results;
  },

  // ### `forPredicates` executes the callback on all predicates that match the pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  forPredicates: function (callback, subject, object, graph) {
    // Convert terms to internal string representation
    subject = subject && toId(subject);
    object = object && toId(object);
    graph = graph && toId(graph);

    var ids = this._ids, graphs = this._getGraphs(graph), content, subjectId, objectId;
    callback = this._uniqueEntities(callback);

    // Translate IRIs to internal index keys.
    if (isString(subject) && !(subjectId = ids[subject]) ||
        isString(object)  && !(objectId  = ids[object]))
      return;

    for (graph in graphs) {
      // Only if the specified graph contains triples, there can be results
      if (content = graphs[graph]) {
        // Choose optimal index based on which fields are wildcards
        if (subjectId) {
          if (objectId)
            // If subject and object are given, the OSP index is best.
            this._loopBy2Keys(content.objects, objectId, subjectId, callback);
          else
            // If only subject is given, the SPO index is best.
            this._loopByKey0(content.subjects, subjectId, callback);
        }
        else if (objectId)
          // If only object is given, the POS index is best.
          this._loopByKey1(content.predicates, objectId, callback);
        else
          // If no params given, iterate all the predicates.
          this._loop(content.predicates, callback);
      }
    }
  },

  // ### `getObjects` returns all objects that match the pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  getObjects: function (subject, predicate, graph) {
    var results = [];
    this.forObjects(function (o) { results.push(o); }, subject, predicate, graph);
    return results;
  },

  // ### `forObjects` executes the callback on all objects that match the pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  forObjects: function (callback, subject, predicate, graph) {
    // Convert terms to internal string representation
    subject = subject && toId(subject);
    predicate = predicate && toId(predicate);
    graph = graph && toId(graph);

    var ids = this._ids, graphs = this._getGraphs(graph), content, subjectId, predicateId;
    callback = this._uniqueEntities(callback);

    // Translate IRIs to internal index keys.
    if (isString(subject)   && !(subjectId   = ids[subject]) ||
        isString(predicate) && !(predicateId = ids[predicate]))
      return;

    for (graph in graphs) {
      // Only if the specified graph contains triples, there can be results
      if (content = graphs[graph]) {
        // Choose optimal index based on which fields are wildcards
        if (subjectId) {
          if (predicateId)
            // If subject and predicate are given, the SPO index is best.
            this._loopBy2Keys(content.subjects, subjectId, predicateId, callback);
          else
            // If only subject is given, the OSP index is best.
            this._loopByKey1(content.objects, subjectId, callback);
        }
        else if (predicateId)
          // If only predicate is given, the POS index is best.
          this._loopByKey0(content.predicates, predicateId, callback);
        else
          // If no params given, iterate all the objects.
          this._loop(content.objects, callback);
      }
    }
  },

  // ### `getGraphs` returns all graphs that match the pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  getGraphs: function (subject, predicate, object) {
    var results = [];
    this.forGraphs(function (g) { results.push(g); }, subject, predicate, object);
    return results;
  },

  // ### `forGraphs` executes the callback on all graphs that match the pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  forGraphs: function (callback, subject, predicate, object) {
    for (var graph in this._graphs) {
      this.some(function (quad) {
        callback(quad.graph);
        return true; // Halt iteration of some()
      }, subject, predicate, object, graph);
    }
  },

  // ### `createBlankNode` creates a new blank node, returning its name
  createBlankNode: function (suggestedName) {
    var name, index;
    // Generate a name based on the suggested name
    if (suggestedName) {
      name = suggestedName = '_:' + suggestedName, index = 1;
      while (this._ids[name])
        name = suggestedName + index++;
    }
    // Generate a generic blank node name
    else {
      do { name = '_:b' + this._blankNodeIndex++; }
      while (this._ids[name]);
    }
    // Add the blank node to the entities, avoiding the generation of duplicates
    this._ids[name] = ++this._id;
    this._entities[this._id] = name;
    return this._factory.blankNode(name.substr(2));
  },
};

// Determines whether the argument is a string
function isString(s) {
  return typeof s === 'string' || s instanceof String;
}

// ## Exports

N3.Store = N3Store;

})();
})(typeof exports !== "undefined" ? exports : this.N3 = {});
