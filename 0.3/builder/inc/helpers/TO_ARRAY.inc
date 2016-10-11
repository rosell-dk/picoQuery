(a) {
// Turn an array-like object into a clean array
// http://stackoverflow.com/questions/16053357/what-does-foreach-call-do-in-javascript
// Note: Array.prototype.slice.call() is faster
  return [].slice.call(a);
}

[[INLINE_VERSION]]
[].slice.call([[ARG1]])


