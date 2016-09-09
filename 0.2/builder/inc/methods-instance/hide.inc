/*
.hide()

Description:
  Hide the matched elements.
  http://api.jquery.com/hide/

Fully supported signatures: 
  .hide( ) => jQuery

Unsupported signatures: 
  .hide( [ duration ][, complete ]) => jQuery
  .hide( options) => jQuery
  .hide( [ duration ][, easing][, complete ]) => jQuery

 */
hide: function() {
  return this.css('display','none');
}

// OPTIMIZED_VERSION //
hide: function(a,b) {
  /*
  Its a dilemma which of these to choose:

  return this.css('display','none');
  this.css('display','none');return this;

  The latter is 2 bytes lighter in gzip, when 'hide()' is the only
  method than is choosen.
  Its however 1 byte heavier, when all methods are selected

  When the latter is lighter, its because it shares a string with the 'on'
  method (which is always enabled).
  on:function(a,b){this.e.forEach(function(c){c.addEventListener(a,b,!1)});return this},

  Both contains "){this."

  In next release, all functions will however probably always have two arguments defined,
  as this gives us smaller gzip, as all starts with ":function(a,aa)", and some starts with
  ":function(a,aa){return ", and some with ":function(a,aa){this.e.", etc.
  In that version, it turns out that the latter is 2 bytes lighter when all methods are selected,
  but 1 byte heavier when only 'hide()' is selected
  

*/
  this.css("display","none");return this;
}

