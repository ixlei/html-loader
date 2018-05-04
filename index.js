const loaderUtils = require('loader-utils');
const attrParser = require('./lib/attr-parser');
const makeHelpers = require('./lib/helper');
const constants = require('./lib/constants');

module.exports = function(content) {
    this.cacheable && this.cacheable();
    const options = loaderUtils.getOptions(this) || {};
    const resourcePath = this.resourcePath;
    const loaderContext = this;
    const defaultTag = options.tag || ['img'];

    const {
        getRawRequest,
        placeholderUrl,
        makePlaceHolder,
        getSimpleRequire,
        validateRequestUrl
    } = makeHelpers(loaderContext);

    const res = attrParser(content, function(type, tag) {
        return !!~defaultTag.indexOf(tag);
    });

    let _content = [content];
    const urlHash = {};
    res.reverse();
    res.forEach(item => {
        switch (item.type) {
            case constants.ATTR:
                if (!validateRequestUrl(item.value, resourcePath)) {
                    return;
                }
                let placeholderUrl;
                do {
                    placeholderUrl = makePlaceHolder();
                } while (urlHash[placeholderUrl]);
                urlHash[placeholderUrl] = item.value;

                let _temp = _content.pop();
                _content.push(_temp.substr(item.start + item.length));
                _content.push(placeholderUrl);
                _content.push(_temp.substr(0, item.start));
                break;
        }

    });

    _content.reverse();
    _content = _content.join('');

    let exportsString = "module.exports = ";
    if (options.exportAsDefault) {
        exportsString = "exports.default = ";

    } else if (options.exportAsEs6Default) {
        exportsString = "export default ";
    }
    _content = JSON.stringify(_content);

    content = exportsString +
        _content.replace(placeholderUrl, (match) => {
            if (!urlHash[match]) {
                return match;
            }

            let urlToRequest = getSimpleRequire(urlHash[match], resourcePath);

            return urlToRequest;
        }) + ";";
    return content;

}