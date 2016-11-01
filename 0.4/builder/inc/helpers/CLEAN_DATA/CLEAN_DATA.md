Should be called in:
  remove(), empty(), html(), replaceWith()

Note: Only removes on a single element (jQuery's cleanData method takes an array of elements)
WE CHANGE THAT SOOON

Here is code that cleans data in descendant AND current

<?php if ($hasPrivateData || $hasPublicData): ?>
    var elems = [[[ARG1]]];
    Array.prototype.push.apply(elems,[[ARG1]].getElementsByTagName("*"));
    for (z=0; elems[z] != null; z++ ) {
      console.log('cleaning data:', elems[z]);
      elems[z].__picoquerydata = <?php if ($hasPublicData): ?>elems[i]._picoquerydata = <?php endif; ?>void 0;
    }
<?php endif; ?>

Here is code that cleans data in descendants only

<?php if ($hasPrivateData || $hasPublicData): ?>
    var elems = [[ARG1]].getElementsByTagName("*");
    for (z=0; elems[z] != null; z++ ) {
      console.log('cleaning data:', elems[z]);
      elems[z].__picoquerydata = <?php if ($hasPublicData): ?>elems[i]._picoquerydata = <?php endif; ?>void 0;
    }
<?php endif; ?>

in empty() we can use the latter, in remove(), we can use the former



TODO: 
remove events

https://www.nczonline.net/blog/2010/09/28/why-is-getelementsbytagname-faster-that-queryselectorall/

It seems it is much faster to use getElementsByTagName("*") than querySelectorAll("*"), when some operation
is going to be performed on all elements. See test: https://jsperf.com/getelementsbytagname-vs-queryselectorall-3


### jQuery implementation (2.2.4):

All cleanData calls performs a getAll() call.
For example, empty method do this:
jQuery.cleanData( getAll( elem, false ) );


function getAll( context, tag ) {

	// Support: IE9-11+
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}


  var acceptData = function( owner ) {

	  // Accepts only:
	  //  - Node
	  //    - Node.ELEMENT_NODE
	  //    - Node.DOCUMENT_NODE
	  //  - Object
	  //    - Any
	  /* jshint -W018 */
	  return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
  };

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );




### jQuery implementation (1.12.4):


	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}



// The following elements (space-suffixed to avoid Object.prototype collisions)
// throw uncatchable exceptions if you attempt to set expando properties
noData: {
	"applet ": true,
	"embed ": true,

	// ...but Flash objects (which have this classid) *can* handle expandos
	"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
},


var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};

cleanData: function( elems, /* internal */ forceAcceptData ) {
	var elem, type, id, data,
		i = 0,
		internalKey = jQuery.expando,
		cache = jQuery.cache,
		attributes = support.attributes,
		special = jQuery.event.special;

	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		if ( forceAcceptData || acceptData( elem ) ) {

			id = elem[ internalKey ];
			data = id && cache[ id ];

			if ( data ) {
				if ( data.events ) {
					for ( type in data.events ) {
						if ( special[ type ] ) {
							jQuery.event.remove( elem, type );

						// This is a shortcut to avoid jQuery.event.remove's overhead
						} else {
							jQuery.removeEvent( elem, type, data.handle );
						}
					}
				}

				// Remove cache only if it was not already removed by jQuery.event.remove
				if ( cache[ id ] ) {

					delete cache[ id ];

					// Support: IE<9
					// IE does not allow us to delete expando properties from nodes
					// IE creates expando attributes along with the property
					// IE does not have a removeAttribute function on Document nodes
					if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
						elem.removeAttribute( internalKey );

					// Webkit & Blink performance suffers when deleting properties
					// from DOM nodes, so set to undefined instead
					// https://code.google.com/p/chromium/issues/detail?id=378607
					} else {
						elem[ internalKey ] = undefined;
					}

					deletedIds.push( id );
				}
			}
		}
	}
}
