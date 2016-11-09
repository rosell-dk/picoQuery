/*
.html()

Description:
  Get the HTML contents of the first element in the set of matched elements or set the HTML contents of every matched element.
  http://api.jquery.com/html/


Fully supported signatures: 
  .html() => String
  .html( htmlString ) => jQuery
  .html( function ) => jQuery
    function
      Type: Function( Integer index, htmlString oldhtml ) => htmlString
      A function returning the HTML content to set. Receives the index position of the element in the set and the old HTML value as arguments. jQuery empties the element before calling the function; use the oldhtml argument to reference the previous content. Within the function, this refers to the current element in the set.

*/
html: function( value ) {
  if (__IS_UNDEFINED__(<@ value @>)) {
    // Return undefined if no item
    return (this.e[0] && this.e[0].innerHTML);
  }
  __ITERATE__(<@ this.e @>, <@ function(el, index) {
    // TODO: Our constructor should support wrapMap functionality (search for "wrapMap" in jQuery source)
    // When it does, we should use that

    // TODO: jQuery has a fix for IE10-11
	    // Support: IE 10-11, Edge 10240+
	    // In IE/Edge using regex groups here causes severe slowdowns.
	    // See https://connect.microsoft.com/IE/feedback/details/1736512/
      //	rnoInnerhtml = /<script|<style|<link/i,
      
      // When these tags are found in source, or tag should be wrapped, jQuery reverts to:
			// this.empty().append( value );

    __CLEAN_DATA__(<@ el @>);

    if (__IS_FUNCTION__(<@ value @>)) {
      el.innerHTML = value.call(el, index, el.innerHTML);
    }
    else {
  		el.innerHTML = value;
    }
  } @>);
  return this;
}

