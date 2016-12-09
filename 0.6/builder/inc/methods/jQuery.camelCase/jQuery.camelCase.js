/*
jQuery.camelCase()

Description:  
  Convert dashed to camelCase; used by the css and data modules
  (This function is not in the API reference)

*/
$.camelCase = function(string) {
	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	return string.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi, function( all, letter ) {
		return letter.toUpperCase();
	});
}

