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

  .css( propertyName, value ) => jQuery
    propertyName [String]: 
      A CSS property.
    value [String | Number]
      A value to set for the property.

  .css( propertyName, function ) => jQuery
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
  // Considering if(!value). 
  // - But I guess we should support setting a property to an empty string
  if (__IS_UNDEFINED__(<@ value @>)) {

    // In picoQuery 0.1, we just return this.e[0].style[name]
    // However, we need to support javascript properties as well

    // There is a little quirk with 'float', because its a reserved word
    // Therefore, its called 'cssFloat' instead of 'float' (its called styleFloat in IE8, but we
    // needn't worry about that)
    // http://stackoverflow.com/questions/606470/is-there-a-cross-browser-way-of-setting-style-float-in-javascript

    // We should also support cssHooks, as plugins may add new ones: https://api.jquery.com/jQuery.cssHooks/
//console.log(getComputedStyle(this.e[0]).getPropertyValue(name));

    var computed = getComputedStyle(this.e[0]);   
    if (!this.e[0]) return;
    return this.e[0].style[name] || computed.getPropertyValue(name) || computed[name];

    // TODO: zepto and jQuery camelCases the property. But it seems unneccessary, as
    // getComputedStyle() returns an object with both ie "backgroundColor" and "background-color"
    // console.log(getComputedStyle(this.e[0]));
    // But does all modern browsers do that?
    // getComputedStyle() also has the property 'float' - so no need to handle that (todo: browser-test it)

  } 
  else {
    __ITERATE__(<@ this.e @>, <@ function(el) {
      // Well, well, it seems that el.style has both variants (ie 'background-color' and 'backgroundColor')
      // so we do not need to dasherize or camelCase.
      // TODO: Browser-test it

      // Although... this does not work with vender prefixes - there is ie no: el.style.-moz-user-select
      // To set that, we need: el.style.MozUserSelect
      // console.log(el.style);
      //console.log (value + (typeof value));
      //console.log ( == 'number' ? 'px' : '')
      el.style[name] = value;

      // btw, zepto sets the style with style.cssText
      // jQuery sets the style with el.style[camelCasedPropertyName]
    } @>);
  }
  return this;
}

