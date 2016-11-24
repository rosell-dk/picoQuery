The helper returns same value as this jQuery statement:
```
(jQuery.type( a ) === "object")
```

A notably difference between  typeof obj and jQuery.type(obj) is this:

                         jQuery.type(obj)   typeof obj    
obj = new String("")     "string"           "object"
obj = new Number(10)     "number"           "object"
obj = new Date()         "date"             "object"
obj = new Boolean()      "boolean"          "object"

                         jQuery.type(obj)   typeof obj    
obj = ""                  "string"          "string"
obj = {}                  "object"          "object"
obj = 10                  "number"          "number"
obj = new CustomObj()     "object"          "object"
obj = true                "boolean"         "boolean"


### jQuery 1.12.4 implementation


To prepare for determining type, jQuery populates a class2type map:

```
// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );
```

class2type contains properties such as "[object String]":"string"

The type function is defined as follows:

```
type: function( obj ) {
	if ( obj == null ) {
		return obj + "";
	}
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
},
```



