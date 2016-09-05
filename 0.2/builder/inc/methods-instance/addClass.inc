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
/**
 * Adds the specified class(es) to each element in the set of matched elements.
 *
 * @feature .addClass()
 * @support_level partial
 * @support .addClass( className ) is fully supported. .addClass( function ) is not supported
 *
 * @param {(string|function(number,String))} arg1
 * @return {!jQuery}
 *
 * @signature `addClass(className)`
 * @param {String} One or more space-separated classes to be added to the class attribute of each matched element.
 * @return {!jQuery}
 * 
 * @signature `addClass(function)`
 * @param {function)
 *   [NOT SUPPORTED]
 *   A function returning one or more space-separated class names to be added to the existing class 
 *   name(s). Receives the index position of the element in the set and the existing class name(s) as
 *   arguments. Within the function, this refers to the current element in the set.
 *   function [Function( Integer index, String currentClassName ) => String]
 * @return {!jQuery}
 * 
 * @see {@link http://api.jquery.com/addClass/|jQuery api}
 *
 */
addClass: function(value) {
  return __EACH__(this, function(el) {
    if (el.classList) {
      el.classList.add(value);
    } 
    else {
      el.className += ' ' + value;
    }
  });
}

/**
 * @callback addClassCallback
 * @param {number} index
 * @param {string} currentClassName
 * @return {string}
 * @this {Element} The current element in the set
 * 
 */

// OPTIMIZED_VERSION //
addClass: function(a) {
	__EACH__(this, function(b) {
    b.classList ? b.classList.add(a) : b.className += " " + a
  });
  return this
}
