window.evaluator = function(candidate, test) {
  var toggleClass = candidate.implementation;

  try {
    var el=$(test.html).get(0);
    eval("result = " + test.code);
    return $(el).get(0).className;
  }
  catch (e) {
    return e;
  }
}
