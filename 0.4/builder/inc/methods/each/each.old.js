each: function(a) {    
  __EACH__(<@ this @>, <@ function(b, c) {
    a.call(b, c, b);
  } @>);
  return this
}

