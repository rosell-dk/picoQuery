We have two variants to choose from:

### Variant #1  (does not work in prototype 1.7)
```
a = a.filter(function(item,i,r){return r.indexOf(item) == i});
```

### Variant #2  (works in prototype 1.7)
```
a = a.filter(function(item,i){return a.indexOf(item) == i});
```


The problem is that prototype 1.7 overrides Array.prototype.filter (even though it already
exists) and that it forgets the third argument (even though its ES5 standard)
Both these problems seems fixed in prototype 1.7.2

If it was not for the prototype 1.7 issue, the choice would be easy.
Variant #1 produces the smallest gzip when inlining (unless its only inlined once)
- because there is a long string, which is the same for each inline:
".filter(function(item,i,r){return item && r.indexOf(item) == i});"
Variant #2 produces the smallest gzip, when the helper is a function.
Variant #1 is slightly faster, I expect

The risk of running with prototype 1.7 is higher, when jQuery.noConflict is enabled.
Therefore we choose variant #2, when jQuery.noConflict is enabled.

