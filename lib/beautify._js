(function (src) {
  var ast = jsp.parse(src);
  print(uglify.gen_code(ast, { indent_level: 2 }));
})(arguments[0]);
