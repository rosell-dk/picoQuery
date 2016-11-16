```
// Test if b is a plain object
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto
if (b && (b.__proto__ == Object.prototype)) {
```


### jQuery implementation
```
isPlainObject: function( obj ) {
	var key;

	// Must be an Object.
	// Because of IE, we also have to check the presence of the constructor property.
	// Make sure that DOM nodes and window objects don't pass through, as well
	if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
		return false;
	}

	try {

		// Not own constructor property must be Object
		if ( obj.constructor &&
			!hasOwn.call( obj, "constructor" ) &&
			!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}
	} catch ( e ) {

		// IE8,9 Will throw exceptions on certain host objects #9897
		return false;
	}

	// Support: IE<9
	// Handle iteration over inherited properties before own properties.
	if ( !support.ownFirst ) {
		for ( key in obj ) {
			return hasOwn.call( obj, key );
		}
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	for ( key in obj ) {}

	return key === undefined || hasOwn.call( obj, key );
},

type: function( obj ) {
	if ( obj == null ) {
		return obj + "";
	}
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
},
```

### Zepto implementation
```
function isWindow(obj)     { return obj != null && obj == obj.window }
function isObject(obj)     { return type(obj) == "object" }
function isPlainObject(obj) {
  return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
}
```
