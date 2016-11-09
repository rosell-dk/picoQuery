//  __MAP__(this.e, function(item){ return item.cloneNode(true) });
//  return this;


### Zepto implementation:
     -- (I don't get this. Mapping destroys the original elements...)
  return this.map(function(){ return this.cloneNode(true) })
  */
}

### Cash implementation:
```
clone: function () {
  return cash(this.map(function (v) {
    return v.cloneNode(true);
  }));
},
```
