###  Developer notes




### jQuery implementation

toggle: function( state ) {
	if ( typeof state === "boolean" ) {
		return state ? this.show() : this.hide();
	}

	return this.each( function() {
		if ( isHidden( this ) ) {
			jQuery( this ).show();
		} else {
			jQuery( this ).hide();
		}
	} );
}
var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};

The animation is added with this code:

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );


### zepto implementation:

```
toggle: function(setting){
  return this.each(function(){
    var el = $(this)
    ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
  })
},

```


