const loaderUtils = require('loader-utils');

function makeHelpers(loaderContext) {
    function getRawRequest(loaderContext) {
        return loaderUtils.getRemainingRequest(loaderContext);
    }

}