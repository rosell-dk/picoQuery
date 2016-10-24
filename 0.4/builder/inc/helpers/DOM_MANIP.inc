/*
In our helpers, we only have optimized version.
The following was optimized in Google Closure Compiler:

(collection, args, inside, targetCallback) {
  var l = collection.e.length;
  __ITERATE__(collection.e, function(item, index) {
    var noClone = (l-index-2);
    var arr = (__IS_FUNCTION__(args[0]) ? [args[0].call(item, index, item.innerHTML)] : __TO_ARRAY__(args));

    // Get the custom target by callback
    // Target will be set to the following:
    //   after:   item.nextSibling
    //   before:  item
    //   prepend: item.firstChild
    //   append:  null

    // Instead of callback, we could consider a number 0-4
    // implementation:
    //   target = [item.nextSibling, item, item.firstChild,null][targetType]
    // or we could take a variable "before", which evaluates to true for before and prepend:
    //   target = (inside ? (before ? item : item.nextSibling) : (before ? item.firstChild : null))

    // comparison of minimized alternatives:
    // t=(c?(d?e:e.nextSibling):(d?e.firstChild:null)); / M(this,arguments,1,0); / M(this,arguments,1,1); / ...
    // t=[e.nextSibling,e,e.firstChild,null][b] / M(this,arguments,3); / M(this,arguments,2); / ...
    // t=d(e) / M(this,arguments,1,function(a){return a.firstChild}); / M(this,arguments,1,function(a){return a}); / ..
    // (while the last is longest ungzipped, its very gzip-friendly)

    // When we get to do aggressive optimization, we can take advantage of the fact, 
    // that we know which methods that are going to be supported.
    // If for example only "inside" functions are needed, we can cut down a bit on the code

    // string, ie "nextSibling" for after
    // target = item[targetProp]

    var target = targetCallback(item);
    var parent = (inside ? item : item.parentNode);
    __ITERATE__(arr, function(content) {
        if (__IS_STRING__(content) && (content[0] != '<')) {
          parent.insertBefore(d.createTextNode(content), target);
        }
        else {
          __ITERATE__($(content).e, function(el) {
            // Iterate again in order to support when content is an array
            __ITERATE__($(el).e, function(el) {
              // TODO: Copy event handlers into new clone
//noClone = false;
              parent.insertBefore(noClone ? el : el.cloneNode( true ), target);
            });
          });
        }
    });
  });
}*/


(a, c, g, h) {
  var k = a.e.length;
  __ITERATE__(<@ a.e @>, <@ function(b, a) {
    var l = k - a - 2, m = __IS_FUNCTION__(<@ c[0] @>) ? [c[0].call(b, a, b.innerHTML)] : __TO_ARRAY__(<@ c @>), e = h.call(0, b), f = g ? b : b.parentNode;
    __ITERATE__(<@ m @>, <@ function(a) {
      __IS_STRING__(<@ a @>) && "<" != a[0] ? f.insertBefore(d.createTextNode(a), e) : __ITERATE__(<@ $(a).e @>, <@ function(a) {
        __ITERATE__(<@ $(a).e @>, <@ function(a) {
          f.insertBefore(l ? a : a.cloneNode(!0), e);
        } @>);
      } @>);
    } @>);
  } @>);
}



/*

864 bytes minified:
(function (a,c,g,h){var k=a.e.length;__ITERATE__(a.e,function(b,a){var l=k-a-2,m=__IS_FUNCTION__(c[0])?[c[0].call(b,a,b.innerHTML)]:__TO_ARRAY__(c),e=h.call(0,b),f=g?b:b.parentNode;__ITERATE__(m,function(a){__IS_STRING__(a)&&"<"!=a[0]?f.insertBefore(d.createTextNode(a),e):__ITERATE__($(a).e,function(a){__ITERATE__($(a).e,function(a){f.insertBefore(l?a:a.cloneNode(!0),e)})})})})})([[ARG1]],[[ARG2]],[[ARG3]],[[ARG4]])

851 bytes minified - but doesn't work for some reason I havent time to figure out right now
var a=this,c=arguments,k=a.e.length;__ITERATE__(a.e,function(b,a){var l=k-a-2,m=__IS_FUNCTION__(c[0])?[c[0].call(b,a,b.innerHTML)]:__TO_ARRAY__(c),e=([[ARG4]])(b),f=[[ARG3]]?b:b.parentNode;__ITERATE__(m,function(a){__IS_STRING__(a)&&"<"!=a[0]?f.insertBefore(d.createTextNode(a),e):__ITERATE__($(a).e,function(a){__ITERATE__($(a).e,function(a){f.insertBefore(l?a:a.cloneNode(!0),e)})})})})
*/

[[INLINE_VERSION]]
(function (a,c,g,h){var k=a.e.length;__ITERATE__(<@ a.e @>,<@ function(b,a){var l=k-a-2,m=__IS_FUNCTION__(<@ c[0] @>)?[c[0].call(b,a,b.innerHTML)]:__TO_ARRAY__(<@ c @>),e=h(b),f=g?b:b.parentNode;__ITERATE__(<@ m @>,<@ function(a){__IS_STRING__(<@ a @>)&&"<"!=a[0]?f.insertBefore(d.createTextNode(a),e):__ITERATE__(<@ $(a).e @>,<@ function(a){__ITERATE__(<@ $(a).e @>,<@ function(a){f.insertBefore(l?a:a.cloneNode(!0),e)} @>)} @>)} @>)} @>)} @>)([[ARG1]],[[ARG2]],[[ARG3]],[[ARG4]])
