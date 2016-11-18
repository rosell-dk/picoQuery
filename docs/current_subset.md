# Current subset
The following methods are currently supported (55 methods):

.add(), .addBack, .addClass(), .after(), .andSelf(), .append(), .appendTo(), .attr(), .before(), .children(), .click(), .clone(), .closest(), .css(), .data(), .each(), .empty(), .end(), .eq(), .filter(), .find(), .first(), .focus(), .get(), .hasClass(), .hide(), .html(), .insertAfter(), .insertBefore(), jQuery.camelCase(), jQuery.data(), jQuery.merge(), jQuery.noConflict(), .keyup(), .last(), .map(), .next(), .offset(), .offsetParent(), .on(), .parent(), .prepend(), .prependTo(), .prev(), .pushStack(), .ready(), .remove(), .removeAttr(), .removeClass(), .replaceWith(), .show(), .text(), .toArray(), .toggle(), .trigger()

And its rapidly growing at a rate about one new method per day.
Focus in the 0.5 release will be to support even more of the jQuery API. Please let me know if there is a specific method you wish to be supported. You can enter wishes on [this page](https://github.com/rosell-dk/picoQuery/wiki/Wishlist) on the wiki.

If you cannot wait for support of a certain method, you can add instance methods this way:

```javascript
// Add ".animate" method
$.fn.animate = function() {
  // Implement animate method.
  // You can of course take advantage of existing methods, such as this.each()
}
```

If you *do* implement methods this way, please consider sharing them on [this page](https://github.com/rosell-dk/picoQuery/wiki/Shared-code) on the wiki

