const Parser = require('fastparse');
const constants = require('./constants');

function Process(tagHandleHook) {
    this.currentTag = null;
    this.results = [];
    this.tagHandleHook = tagHandleHook;
}

Process.code = function(match, p1, content, tag, index) {
    if (this.tagHandleHook(constants.CODE, tag, content)) {
        this.results.push({
            type: constants.CODE,
            start: index,
            code: content,
            tag: tag
        });
    }
    return 'tag';
}

Process.match = function(match, strUntilValue, name, value, index) {
    if (!this.tagHandleHook(constants.ATTR, this.currentTag, name)) return;
    this.results.push({
        type: constants.ATTR,
        start: index + strUntilValue.length,
        length: value.length,
        value: value
    });
}

Process.tag = function(match, tagName) {
    this.currentTag = tagName;
    return "attr";
}


const description = {
    attr: {
        "\\s+": true,
        "(>([^<\/]*))?(?=(<\/[^>]+>))/g": Process.code,
        "(([0-9a-zA-Z\\-:]+)\\s*=\\s*\")([^\"]*)\"": Process.match,
        "(([0-9a-zA-Z\\-:]+)\\s*=\\s*\')([^\']*)\'": Process.match,
        "(([0-9a-zA-Z\\-:]+)\\s*=\\s*)([^\\s>]+)": Process.match
    },

    tag: {
        "<!--.*?-->": true,
        "<![CDATA[.*?]]>": true,
        "<[!\\?].*?>": true,
        "<([a-zA-Z\\-:]+)\\s*": Process.tag,
    }

};

const parser = new Parser(description);

module.exports = function parse(html, tagHandleHook) {
    let process = new Process(tagHandleHook);
    return parser.parse('tag', html, process).results;
}