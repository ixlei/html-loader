const fs = require('fs');
const path = require('path');

const attrParser = require('../lib/attr-parser');

let exampleHtmlPath = path.join(__dirname, './example/index.html');
let content = fs.readFileSync(exampleHtmlPath, 'utf-8');

let res = attrParser(content, function(type, tag) {
    console.log(tag);
    return tag === 'script' || tag === 'img';
});

console.log(res);