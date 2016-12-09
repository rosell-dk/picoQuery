We have three different implementations to choose from.
The "first map, then flatten-approach" right now results in the heaviest
gzip. But it may change if other functions start using it

### First map, then flatten-approach (1034/550 bytes)
__RETURN_PUSH_STACK_JQ__(<@ $(__FLATTEN__(<@ __MAP__(<@ this.e @>, <@ function(b){return __TO_ARRAY__(<@ b["children"] @>)} @>) @>)).filter(a||"*") @>);
__RETURN_PUSH_STACK_JQ__(<@ $(__FLATTEN__(<@ this.e.map(function(b){return __TO_ARRAY__(<@ b["children"] @>)}) @>)).filter(a||"*") @>);
__RETURN_PUSH_STACK_JQ__(<@ $([].concat.apply([], this.e.map(function(b){return __TO_ARRAY__(<@ b["children"] @>)}))).filter(a||"*") @>);
return $([].concat.apply([], this.e.map(function(b){return __TO_ARRAY__(<@ b["children"] @>)}))).filter(a||"*");


### Simple implementation using one forEach and concating multiple times (1028/550 bytes)
z = [];
this.e.forEach(function(b) {
  z = z.concat(__TO_ARRAY__(<@ b.children @>));
});
return $(z).filter(a||'*');

### Simple implementation using two forEach (1027/550 bytes)
z = [];
this.e.forEach(function(b) {__TO_ARRAY__(<@ b.children @>).forEach(function(c) {z.push(c)})});
return $(z);


