(a, c, g, h) {
  var k = a.e.length;
  __ITERATE__(<@ a.e @>, <@ function(b, a) {
    var l = k - a - 2, m = __IS_FUNCTION__(<@ c[0] @>) ? [c[0].call(b, a, b.innerHTML)] : __TO_ARRAY__(<@ c @>), e = h.call(0, b), f = g ? b : b.parentNode;
    __ITERATE__(<@ m @>, <@ function(a) {
      __IS_STRING__(<@ a @>) && "<" != a[0] ? f.insertBefore(d.createTextNode(a), e) : __ITERATE__(<@ $(a).e @>, <@ function(a) {
        __ITERATE__(<@ $(a).e @>, <@ function(a) {
          f.insertBefore(l ? a : a.cloneNode(!0), e);
        } @>);
      } @>);
    } @>);
  } @>);
}

[[INLINE_VERSION]]
(function (a,c,g,h){var k=a.e.length;__ITERATE__(<@ a.e @>,<@ function(b,a){var l=k-a-2,m=__IS_FUNCTION__(<@ c[0] @>)?[c[0].call(b,a,b.innerHTML)]:__TO_ARRAY__(<@ c @>),e=h(b),f=g?b:b.parentNode;__ITERATE__(<@ m @>,<@ function(a){__IS_STRING__(<@ a @>)&&"<"!=a[0]?f.insertBefore(d.createTextNode(a),e):__ITERATE__(<@ $(a).e @>,<@ function(a){__ITERATE__(<@ $(a).e @>,<@ function(a){f.insertBefore(l?a:a.cloneNode(!0),e)} @>)} @>)} @>)} @>)} @>)([[ARG1]],[[ARG2]],[[ARG3]],[[ARG4]])
