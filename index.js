const loaderUtils = require('loader-utils');
const attrParser = require('./lib/attr-parser');
const makeHelpers = require('./lib/helper');
const constants = require('./lib/constants');

module.exports = function(content) {
    this.cacheable && this.cacheable();
    const options = loaderUtils.getOptions(this) || {};
    const resourcePath = this.resourcePath;
    const loaderContext = this;

    const {
        getRawRequest,
        placeholderUrl,
        makePlaceHolder,
        getSimpleRequire,
        validateRequestUrl
    } = makeHelpers(loaderContext);

    const res = attrParser(content);

    let _content = [content];
    const urlHash = {};

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
                _content.push(_temp.substr(item.start));
                _content.push(placeholderUrl);
                _content.push(_temp.substr(0, item.start));
                break;
        }

    });

    _content.reverse();
    _content = _content.join('');

    let exportsString = "module.exports = ";
    if (config.exportAsDefault) {
        exportsString = "exports.default = ";

    } else if (config.exportAsEs6Default) {
        exportsString = "export default ";
    }

    return exportsString +
        _content.replace(placeholderUrl, (match) => {
            if (urlHash[match]) {
                return match;
            }

            let urlToRequest = getSimpleRequire(urlHash[match], resourcePath);

            return urlToRequest;
        })


}