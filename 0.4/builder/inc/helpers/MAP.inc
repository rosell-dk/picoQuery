($,f) {
  // Array.prototype.map works fine in all browsers, but IE8
  // - according to http://kangax.github.io/compat-table/es5
  return a.map(f);
}

[[INLINE_VERSION]]
[[ARG1]].map([[ARG2]])

