/*
  We could consider:
    if (typeof value)[0] == "f" ) {
  instead of 
  	if ( typeof value == "function" ) {

  But as "function" appears elsewhere in the code, the gzip is probably not much smaller
*/
(a) {
  return (typeof a == "function");
}

[[INLINE_VERSION]]
typeof [[ARG1]] == "function"


