
css: function(name, value) {
  if (__IS_OBJECT__(<@ name @>)) {
    for (key in name) {
      this.css(key, name[key]);
    }
    return this;
  }
  if (__IS_ARRAY__(<@ name @>)) {    
    var o = {}, _this = this;
    __ITERATE__(<@ name @>, <@ function(prop) {
      o[prop] = _this.css(prop);
    } @>);
    return o;
  }

  function setCSS(el, value) {
    // Maybe add px
    // For some specified properties, do not add
    // For width and height, add it even though the number is a string
    if (!({'column-count':1, 'columns':1, 'font-weight':1, 'line-height':1,'opacity':1, 'z-index':1, 'zoom':1 }[name]) && ((typeof(value) == 'number') || (((name == 'width') || (name == 'height')) && (value.match(/^[\d\.]+$/))))) {
      value = value + 'px';
    }
    el.style[name] = value + (+ (!({'column-count':1, 'columns':1, 'font-weight':1, 'line-height':1,'opacity':1, 'z-index':1, 'zoom':1 }[name]) && ((typeof(value) == 'number') || (((name == 'width') || (name == 'height')) && (value.match(/^[\d\.]+$/))))) ? 'px' : '');
  }

//  if (!(1 in arguments) && (__IS_STRING__(<@ name @>))) {
//  if (__IS_UNDEFINED__(<@ value @>)) {
  if (!(1 in arguments)) {
    if (!this.e[0]) return;
    var computed = getComputedStyle(this.e[0]);

//    console.log(name, computed[name], this.e[0].style[name], computed.getPropertyValue(name));

    // camelCase
    var origName = name.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi, function( all, letter ) {
		  return letter.toUpperCase();
	  });

    if (origName == "marginLeft") {
      var left1 = this.e[0].getBoundingClientRect().left,  
        oldVal = this.e[0].style["margin-left"],
        left2;

      this.e[0].style["margin-left"] = 0;
      left2 = this.e[0].getBoundingClientRect().left;
      this.e[0].style["margin-left"] = oldVal;
      return left1 - left2 + 'px';
    }

    return computed[name] || this.e[0].style[name];
  } 
  else {
    __ITERATE__(<@ this.e @>, <@ function(el, index) {

      if (__IS_FUNCTION__(<@ value @>)) {    
        setCSS(el, value.call(el, index, $(el).css(name)));
      }
      else {
        setCSS(el, value);
      }


    } @>);
  }
  return this;
}

