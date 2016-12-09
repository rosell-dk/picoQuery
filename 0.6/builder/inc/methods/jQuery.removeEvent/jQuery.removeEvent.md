picoQuery browser support: Any browser that supports isArray
  FF4+, IE9+, Safari 5+, Opera 10.5+, Konq 4.9+, Chrome 5+ and all modern browsers.

removeEventListener browser support:
  https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
  We are OK, but...
    but note that useCapture is not optional in Opera 10.5 - 11.60
    So it would be safest to specify it as false, otherwise Opera 10.5 - 11.60 will not remove it
    (according to here: https://dev.opera.com/blog/what-s-new-in-opera-development-snapshots-28-september-2011-edition/)
    But jQuery 1.12.4 does not do that.
    We will neither.




### jQuery 2.2.4:
```
jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};
```

### jQuery 1.12.4:
jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

