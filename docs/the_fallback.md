# The fallback to jQuery

picoQuery automatically falls back to jQuery for older browsers, unless you deliberately turned that option off in the builder.
"Older browsers" in practise means IE6-8, which currently have about 0.43% market share. 
Its not many users, but the cost of taking care of them is low, so you might as well.

You probably do not need to know how the fallback works. It just works, and you do not have
to do anything for it to just work. 

But in case you are interested, keep on reading...


## Under the hood
Basically the fallback is implemented like this:

```
if (Array.isArray) {
  [picoQuery code]
}
else {
  document.write('<scrip' + 't src=https://code.jquery.com/jquery-1.12.4.min.js><' + '/script>'));
}

```

There are three things to notice here:

1. The fallback is achieved with document.write
2. The criteria for falling back is whether the browser supports an EcmaScript 5 feature: Array.isArray
3. The fallback library is jQuery 1.12.4


## document.write
document.write is muched frowned upon, because the browser needs to wait for the code to load before 
it can continue executing code. But in our case, this is exactly what we want. Because this ensures
that jQuery will be ready to use after picoQuery code block, just like picoQuery will be ready.

A disadvantage of this approach though, is that old browsers will need to load both picoQuery and 
jQuery. As picoQuery is very light and most browsers is supported with picoQuery, this is a minor concern.


## Array.isArray

Array.isArray is a carefully selected criteria.
Of course other features are required for picoQuery to work.

To mention a few:
- [querySelectorAll](http://caniuse.com/#feat=queryselector)
- [addEventListener](http://caniuse.com/#feat=addeventlistener)
- [dispatchevent](http://caniuse.com/#feat=dispatchevent)
- [Array.prototype.indexOf](http://kangax.github.io/compat-table/es5/) - needed for .filter(), etc
- [Array.prototype.some](http://kangax.github.io/compat-table/es5/) - needed .find()

But it so happens that any browser that supports Array.isArray, also supports the above.

Browser support for isArray is: FF4+, IE9+, Safari 5+, Opera 10.5+, Konq 4.9+, Chrome 5+ and all modern browsers. [[1]](http://kangax.github.io/compat-table/es5/)[[2]](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)

In other words, all modern browsers are supported.
If you sum up browser usage of unsupported browsers, it is currently (December the 5th, 2016):
- FF2-3: 0.1%
- IE6-8: 0.43%
- Safari 3-4: 0.02%
- Opera 10.1: 0.01%
- Konqueror 1-4.4: 0.01% 
- Chrome 1-4: 0%

IE6-8 is dominant here with 0.43% browser usage globally.
If you want to avoid the overhead of loading picoQuery for those users, you can use conditional comments.
Ie:

```
<!--[if lt IE 9]>
    <script src="http://cdn.picoquery.com/picoquery-0.5.0-addClass-css-get.min.js"></script>
<![endif]-->
<!--[if gte IE 9]><!-->
    <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<!--<![endif]-->
```

## jQuery 1.12.4
jQuery 1.12.4 is chosen because it is the newest version of jQuery, with support for older browsers.


## Consequence
A consequence of using jQuery as a fallback is that picoQuery needs to have same API and behaviour as 
jQuery, which in turn means that picoQuery overrides both window.$ and window.jQuery (unlike Zepto and Cash)

This can be an issue if you on some pages (accidently?) include both jQuery and picoQuery.
In that case, I recommend using jQuery.noConflict.
When the jQuery.noConflict method is part of the picoQuery build, picoQuery stores references to window.$
and window.jQuery. Calling jQuery.noConflict reverts the references. Well it works exactly 
[the same way](http://api.jquery.com/jQuery.noConflict/) as in jQuery, of course.

So if you for example do this:
```
<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
<script src="http://cdn.picoquery.com/picoquery-0.5.0-addClass-css-get-~noConflict.min.js"></script>
<script>
// Store reference to picoQuery in pico$ and revert window.$ and window.jQuery to jQuery 2.2.4
pico$ = jQuery.noConflict();

// pico$ now points to picoQuery, and $ points to jQuery

pico$(function($) {
  // In here, $ points to picoQuery
})
</script>
```

If you have no control over whether there is jQuery on the page, and do not want it
to be overriden, you can do this:

```
<script src="http://cdn.picoquery.com/picoquery-0.5.0-full.min.js"></script>
<script>
jQuery.noConflict()(function($) {
  // In here, $ points to picoQuery
})
</script>

 




