const loaderUtils = require('loader-utils');

function makeHelpers(loaderContext) {
    function getRawRequest(loaderContext) {
        return loaderUtils.getRemainingRequest(loaderContext);
    }

    function getSimpleRequire(url, root) {
        const request = loaderUtils.urlToRequest(url, root);
        return `" + require(${JSON.stringify(request)}) + "`;
    }

    function validateRequestUrl(url, root) {
        if (!loaderUtils.isUrlRequest(url, root)) {
            return false;
        }

        if (/mailto:/g.test(url)) {
            return false;
        }

        return true;
    }

    function makePlaceHolder() {
        return `__html_loader${Math.random()}${Math.random()}_placeholder`;
    }

    const placeholderUrl = /__html_loader[0-9\.]+_placeholder/g;

    return {
        getRawRequest,
        getSimpleRequire,
        validateRequestUrl,
        placeholderUrl,
        makePlaceHolder
    };

}

module.exports = makeHelpers;