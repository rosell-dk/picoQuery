/*
.addClass() 

Description:
  Adds the specified class(es) to each element in the set of matched elements.
  http://api.jquery.com/addClass/

Signatures: 
  .addClass( className ) => $
     className [String]: 
        One or more space-separated classes to be added to the class attribute of each matched element.

  .addClass( function ) => $
     function [Function( Integer index, String currentClassName ) => String]:
       A function returning one or more space-separated class names to be added to the existing class 
       name(s). Receives the index position of the element in the set and the existing class name(s) as
       arguments. Within the function, this refers to the current element in the set.

Support:
  .addClass( className ) is fully supported
  .addClass( function ) is not supported

*/
addClass: function(value) {
  this.e.forEach(function(el, i) {
    //  For very very loose compliance, we could just do this:
    //  el.className += ' ' + value;

    // classList.add() is unfortunately not supported in IE9 and Safari 5.

/*
		if ( typeof value == "function" ) {
			this.e.forEach(function(item, index){
        $(
      })
    )
      return this.each( function( j ) {
				$( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}*/

    if (el.nodeType === 1) {

  //      el.className += ' ' + value;
      var a = [];
//      var s = el.className + ' ' + value;
      var s = el.className + ' ' + ((typeof value == "function") ? value.call(el, i, el.className) : value);

      // jQuery actually removes newlines, tabs, etc from the 'value'
      // ( " " + curValue + " " ).replace( /[\t\r\n\f]/g, " " )
      // I find it a bit over-the-top.
      // But for strict compliance, we must... (maybe we can add a 
      // "loose compliance" optimization flag) in the future
      s = s.replace( /[\t\r\n\f]/g, " " );
      var arr = s.split(' ');
      arr.forEach(function(item){
        // When there are no classes defined, s will begin with a space, and item will be empty string.
        // Therefore we test that item is not empty string
        if ((item!='') && a.indexOf(item)<0) {
          a.push(item);
        } 
      });
      el.className = a.join(' ');

      /*
      if (el.classList) {
        value.split(' ').forEach(function(item){el.classList.add(item)});
  //      el.classList.add(value);
      } 
      else {
        el.className += ' ' + value;
      }*/
    }
  });
  return this;
}

