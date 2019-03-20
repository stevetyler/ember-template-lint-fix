const { getParser } = require('codemod-cli').jscodeshift;
const { getOptions } = require('codemod-cli');

module.exports = function transformer(file, api) {
  const j = getParser(api);
  const options = getOptions();

  const root = j(file.source)
  const callExpressions = root.find(j.CallExpression, {
    callee: {
      type: 'MustacheStatement',
      path: { type: 'PathExpression', original: 'debugger' },
    }
  })

  callExpressions.remove();

  return root.toSource();
}


// query file.json for debugger and delete nodes
/* {
  "type": "MustacheStatement",
  "path": {
    "type": "PathExpression",
    "original": "debugger",
    "this": false,
    "parts": [
      "debugger"
    ],
    "data": false,
    "loc": {
      "start": {
        "line": 3,
        "column": 4
      },
      "end": {
        "line": 3,
        "column": 12
      }
    }
  }
} */
