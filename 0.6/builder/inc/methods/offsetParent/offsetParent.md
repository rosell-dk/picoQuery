We just converted the jQuery function.

The Cash 1.3.0 implementation seemed great, but does not comply with tables
So, we need to skip those elements returned by offsetParent, which have position == static.

Note: Surprisingly, jQuery returns document.documentElement, not elem.ownerDocument.documentElement.
      We must do the same


The implementation is this:

```
offsetParent: function() {
  __RETURN_PUSH_STACK_JQ__(<@ $(__MAP__(<@ this.e @>, <@ function(el) {
		var offsetParent = el.offsetParent;

		while ( offsetParent && getComputedStyle(offsetParent)["position"] == "static" ) {
			offsetParent = offsetParent.offsetParent;
		}

		return offsetParent || d.documentElement;
  } @>)) @>)
}
```

We *could* use the css() method when enabled, and *maybe* save a few bytes
Actually, it saves just 1 byte in the gzip.
We choose not to.

<?php if (isFeatureEnabled('css')) {echo '$(a).css("position")';} else {echo 'getComputedStyle(a).position';} ?>
<?php if (isFeatureEnabled('css')) {echo '$(offsetParent).css("position")';} else {echo 'getComputedStyle(offsetParent)["position"]';} ?>

--------


### implementation in picoQuery0.4.0.min:
offsetParent:function() {
  __RETURN_PUSH_STACK_JQ__(<@ $(__MAP__(<@ this.e @>, <@ function(b) {
    return z && "static" != getComputedStyle(z).position ? z : b.ownerDocument.documentElement;
  } @>)) @>);
}



The only problem found with just doing this:
return (el.offsetParent || el.ownerDocument.documentElement);
       
- is that it does not comply strictly in a single case.
el.offsetParent returns the body element, when no parents to an element are
positioned - EVEN THOUGH the body element has position:static.

To address this, we do not have to do the while loop which jQuery does,
but we can do this: (when CSS feature is enabled)

```
var offsetParent = el.offsetParent;
if (!offsetParent || $(offsetParent).css("position") == "static") {
  return el.ownerDocument.documentElement
}
return offsetParent;
```

When css is not enabled:
```
var offsetParent = el.offsetParent;
if (!offsetParent || getComputedStyle(offsetParent)["position"] == "static") {
  return el.ownerDocument.documentElement
}
return offsetParent;
```



or we can test if it is the body element.
No sorry, its not good enough, because then it does not comply, when body element is positioned

like this:
```
var offsetParent = el.offsetParent;
if (!offsetParent || offsetParent.tagName.toLowerCase() == "body") {
  return el.ownerDocument.documentElement
}
return offsetParent;
```

or this:

```
    var offsetParent = el.offsetParent;
    if (!offsetParent || offsetParent.tagName.match(/^body$/i)) {
      return el.ownerDocument.documentElement
    }
    return offsetParent;
```

or this:

```
    var offsetParent = el.offsetParent;
    if (!offsetParent || offsetParent == offsetParent.ownerDocument.body) {
      return el.ownerDocument.documentElement
    }
    return offsetParent;
```


If we later find more reasons, we can adopt the while loop.
The code would look like this (when CSS feature is enabled):
```
var offsetParent = el.offsetParent;
while ( offsetParent && ($(offsetParent).css("position") == "static" )) {
	offsetParent = offsetParent.offsetParent;
}
return offsetParent || el.ownerDocument.documentElement;
```


Optimization idea:
Now with pushstack, it might be better to use the .map() method (if available).
But only when pushstack is enabled

  
/* If only one element, we can do like this:
var el = this.e[0];
return $(el.offsetParent || el);*/


// youmightnotneedjquery.com says we can do this:
// return (el.offsetParent || el);
// However, if current element is hidden, that will return current element,
// but jQuery will return document element

// Its a riddle to me why jQuery and zepto checks if offsetParent is "static", because
// Element.offsetParent() is supposed to return nearest anchestor that has a position
// OTHER than static (http://www.w3schools.com/jsref/prop_element_offsetparent.asp)
// a guess is that some browsers fails to do so.

 
### jQuery 1.12.4 implementation:

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}

### jQuery 2.2.4 implementation:,picoquery-0.5.0-full.js
	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}


###  zepto implementation:

offsetParent: function() {
  return this.map(function(){
    var parent = this.offsetParent || document.body
    while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
      parent = parent.offsetParent
    return parent
  })
}

### old picoquery implementation:

offsetParent: function() {
/*  return $(__MAP__(<@ this.e @>, <@ function(el) {
    return (el.offsetParent || el.ownerDocument.documentElement);
  } @>));*/

  __RETURN_PUSH_STACK_JQ__(<@ $(__MAP__(<@ this.e @>, <@ function(el) {
      var offsetParent = el.offsetParent;

      if (!offsetParent || <?php if (isFeatureEnabled('css')) {echo '$(offsetParent).css("position")';} else {echo 'getComputedStyle(offsetParent)["position"]';} ?> == "static") {
      
      
        return el.ownerDocument.documentElement
      }
      return offsetParent;

/*    var offsetParent = el.offsetParent;
    if (!offsetParent || offsetParent == offsetParent.ownerDocument.body) {
      return el.ownerDocument.documentElement
    }
    return offsetParent;*/

//    return (el.offsetParent || el.ownerDocument.documentElement);
  } @>)) @>)
}


