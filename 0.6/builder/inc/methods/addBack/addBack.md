jQuery sorts the result in Document order, picoQuery doesnt yet (because .add() doesnt yet)



### jQuery implementation (1.12.4)
```
	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}

```


### zepto implementation:
Not implemented in zepto 2.1.4
