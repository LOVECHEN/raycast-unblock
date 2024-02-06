// Why rewrite node-fetch?
// The upstream library whatwg-url uses the punycode module, but the punycode module will be deprecated in node21
// As a result, we need to rewrite node-fetch to remove the dependency on the punycode module
// The rewrite is only for the export of fetch.

module.exports = fetch
module.exports.default = fetch
