We have two variants to choose from:

### Variant #1  (does not work in prototype 1.7)
```
a.filter(function(item,i,r){return item && r.indexOf(item) == i});
```

### Variant #2  (works in prototype 1.7)
```
a = a.filter(function(item,i){return item && a.indexOf(item) == i});
```

### But variant #2 isn't good for inlining:
Variant 1 is inlined like this:
[[ARG1]].filter(function(b,c,d){return b && d.indexOf(b) == c})

We cannot inline variant 2 like this:.
[[ARG1]].filter(function(b,c){return b && [[ARG1]].indexOf(b) == c})
(It works if ARG1 is for example "a", but if ARG1 is long, it makes no sense, and if it contains "this", it breaks

And we cannot do like this either:
var zz = [[ARG1]]; zz.filter(function(b,c){return b && zz.indexOf(b) == c})

We need to wrap in function
(function(a) {return a.filter(function(b,c){return b && a.indexOf(b) == c})})([[ARG1]])

- Which in effect means that it doesn't pay off to inline variant #2

### The problem in prototype 1.7:
The problem is that prototype 1.7 overrides Array.prototype.filter (even though it already
exists) and that it forgets the third argument (even though its ES5 standard)
Both these problems seems fixed in prototype 1.7.2

The risk of running with prototype 1.7 is higher, when jQuery.noConflict is enabled.
Therefore we choose variant #2, when jQuery.noConflict is enabled.

Otherwise, we choose the one that produces the smallest gzip
Variant #1 produces the smallest gzip when inlining (unless its only inlined once)
- because there is a long string, which is the same for each inline:
".filter(function(item,i,r){return item && r.indexOf(item) == i});"
Variant #2 produces the smallest gzip, when the helper is a function.
Variant #1 is slightly faster, I expect

If we swap the order, such that
a = a.filter(function(item,i,r){return item && r.indexOf(item) == i});
became:
a = a.filter(function(item,i,r){return r.indexOf(item) == i && item});
then the gzip will be smaller, when REMOVE_DUPLICATES is inlined,
because they will share a longer string:
".filter(function(item,i,r){return r.indexOf(item) == i"

### Variant #1b  (does not work in prototype 1.7)
```
a = a.filter(function(item,i,r){return r.indexOf(item) == i && item});
```

### Variant #2b  (works in prototype 1.7)
```
a = a.filter(function(item,i){return a.indexOf(item) == i && item});
```


