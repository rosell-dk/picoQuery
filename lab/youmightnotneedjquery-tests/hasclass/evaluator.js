window.evaluator = function(candidate, test) {
  var hasClass = candidate.implementation;

  try {
    var el=$(test.html).get(0);
    eval("var result = " + test.code);
    return result;
  }
  catch (e) {
    return e;
  }
}
