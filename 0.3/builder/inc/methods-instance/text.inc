/*
.text() 

Description:
  Get the combined text contents of each element in the set of matched elements, including their descendants, or set the text contents of the matched elements.
  http://api.jquery.com/text/

Signatures: 
  .text( ) => String

  .text( text ) => jQuery
    text
      Type: String or Number or Boolean
      The text to set as the content of each matched element. When Number or Boolean is supplied, it will be converted to a String representation.

  .text( function ) => jQuery
    function
      Type: Function( Integer index, String text ) => String
      A function returning the text content to set. Receives the index position of the element in the set and the old text value as arguments.

*/
text: function(a) {
  // If only .text() should be supported, and only first item, this would be enough:
//  return this.e[0].textContent;

  // It seems we have met something similar to this entire structure.
  // Perhaps it can be reused
  if (__IS_UNDEFINED__(a)) {
    return __MAP__(this.e, function(el){return el.textContent}).join(""); 
  }
  else {
    __ITERATE__(this.e, function(item, index) {
      item.textContent = __IS_FUNCTION__(a) ? a.call(item, index, item.textContent) : a;
    });
    return this;
  }

//  return __ITERATE__(this.e.textContent, function() {};


/* zepto implementation:
    text: function(text){
      return 0 in arguments ?
        this.each(function(idx){
          var newText = funcArg(this, text, idx, this.textContent)
          this.textContent = newText == null ? '' : ''+newText
        }) :
        (0 in this ? this.pluck('textContent').join("") : null)
    },
 */

/* jQuery implementation:
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},*/

    

}

// OPTIMIZED_VERSION //

text:function() {
}
