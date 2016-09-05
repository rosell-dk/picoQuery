/*
.css()

Description:
  Get the value of a computed style property for the first element in the set of matched elements or set one or more CSS properties for every matched element.
  http://api.jquery.com/css/

Signatures: 
  .css( propertyName ) => String
    propertyName [String]: 
      A CSS property.

  .css( propertyNames ) => String
    propertyNames [Array]: 
      An array of one or more CSS properties.

  .css( propertyName, value ) => $
    propertyName [String]: 
      A CSS property.
    value [String | Number]
      A value to set for the property.

  .css( propertyName, function ) => $
    propertyName [String]: 
      A CSS property.
    function [ Function( Integer index, String value ) => String or Number]
      A function returning the value to set. this is the current element. Receives the index position
      of the element in the set and the old value as arguments.

  .css( properties ) => String
    properties [PlainObject]
      An object of property-value pairs to set.


Support: Partial
  The following signatures are fully supported:
    .css( propertyName ) => String
    .css( propertyName, value ) => jQuery

  The following signatures are not supported:
    .css( propertyNames ) => String
    .css( propertyName, function ) => jQuery
    .css( properties ) => String

*/
/**
 * Get the value of a computed style property for the first element in the set of matched elements or set one or more CSS properties for every matched element.
 *
 * @feature .css()
 * @support_level partial
 * @jquery_docs http://api.jquery.com/css/
 *
 * @param {(string|Object<string,*>)} arg1
 * @param {(string|number|function(number,*))=} arg2
 * @return {(string|!jQuery)}
 *
 */
css: function(name, value) {
  if (value === undefined) {
    this.e[0].style[name];
  } 
  else {
    __EACH__(this, function(el) {
      el.style[name] = value;
    });
  }
  return this;
}

// OPTIMIZED_VERSION //
css:function(a,b) {
  __IS_UNDEFINED__(b)?this.e[0].style[a]:__EACH__(this,function(c) {
    c.style[a]=b
  });
  return this;
}
