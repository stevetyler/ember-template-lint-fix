module.exports = function({ source, path }, { parse, visit }) {
  const ast = parse(source);

  return visit(ast, env => {
    let { builders: b } = env.syntax;

    return {
      MustacheStatement() {
        console.log(ast);
        //return b.mustache(b.path('debugger'));
      },
    };
  });
};

// ember-template-recast hbs -t transform.js
