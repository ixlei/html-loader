const loaderUtils = require('loader-utils');
const attrParser = require('./lib/attr-parser');

module.exports = function(content) {
    this.cacheable && this.cacheable();

}