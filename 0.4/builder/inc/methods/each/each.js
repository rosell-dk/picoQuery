/*
.each() 

Description:
  Iterate over a jQuery object, executing a function for each matched element.
  http://api.jquery.com/each/

Fully supported signatures: 
  
  .each( function ) => jQuery
     function [Function( Integer index, Element element )]
      A function to execute for each matched element
     
*/
each: function(fn) {    
  __EACH__(this, function(el, index) {
    fn.call(el, index, el);
  });
  return this
}

