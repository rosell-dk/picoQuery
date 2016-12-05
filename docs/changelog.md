# Changelog

### 0.5.0
*Released 05 Dec 2016*
Focus has been to improve compliance with jQuery. Compliance went from being better than Zepto (within the supported subset!) to being way better

- jQuery( html, ownerDocument ) signature is now supported
- jQuery( Array-like-structure), ie jQuery( [HTMLCollection] ) is now supported
- jQuery( html, attributes ) signature is now supported
- jQuery( html ) now expands selfclosing container-tags
- jQuery( html ) now accepts text nodes at root level
- .offsetParent() is now fully compliant
- .removeClass() is now fully compliant
- .find() is now fully compliant
- .show(), .hide() and .toggle() are now much more compliant
- .attr( attributes ) signature is now supported
- .attr( attributeName, value ) now handles when attributeName is a string class instead of a string literal
- .filter() is now fully compliant
- .css() is now much more compliant
- .offset() is now fully compliant 
- added .detach() method
- added .position() method
- added jQuery.removeEvent() method
- Event handlers are now removed when elements are removed with .empty(), .replaceWith(), .remove() or .html() methods

### 0.4.0
*Released 01 Nov 2016* 
- More API: .hasClass(), .data(), jQuery.data(), .show(), .toggle(), .toArray(), .end(), .pushStack(), jQuery.camelCase(), jQuery.merge(), .add(), .addBack(), .andSelf(), .last()
- Optionally optimize library for execution speed rather than gzip size.
- Added option for inlining of helpers
- Added alternative CDN url in builder
- Much faster build time (optimization of code which inlines helpers)
- Restructure of include files: optimized code is moved to separate file
- Added help texts

### 0.3.0 (13 new methods in 13 days, released the 13'th)
*Released 13 Oct 2016* 
- More API: jQuery.noConflict(), .after(), .before(), .closest(), .eq(), .insertAfter(), .insertBefore(), .offset(), .offsetParent(), .remove(), .replaceWith(), .text(), .prependTo()
- picoQuery now defines window.jQuery, and overwrites it if it exist. Also, picoQuery no longer cowardly steps aside when $ is already defined. Like in jQuery, you can get $ restored with jQuery.noConflict(). The philosophy behind this change is that picoQuery should behave exactly like jQuery, so they can be used interchangably. This ensures that swapping between jQuery and picoQuery really is just a matter of changing the library and also ensures that there will be no unpleasant surprises when picoQuery falls back to jQuery.
- Improved compatibility of constructor, .append(), .appendTo, .prepend() and events
- build id encoding has changed. In v0.2, options are encoded in base 16. In v0.3, first char specifies the encoding. A=base 16, B=base64. With "B" encoding, we get a bit shorter URLs.
- CDN... Yes CDN!... -- but with picoQuery, there are literally millions of possible builds! I know. Its a good thing picoQuery is so small, otherwise it might get expensive. I have set up a "pull server", which means that when an uncached build is requested, the CDN grabs the builder result from picoquery.com. While best practice is that you either inline picoquery directly in HTML or concatenate it with your other scripts, its often handy just to point to a CDN. The real point of providing a CDN though, is to offload the online builder and protect the server against some site with many visitors linking directly to the build script. The builds will be available on URLs like this: http://cdn.picoquery.com/picoquery0.3.0-B2ga.min.js when 0.3 is released. I implemented in 0.2 too. I have set cache time to 100 years, so you can rely on CDN working even if the builder is temporarily down
- New handy CDN URL format with method names. Ie, to create a build which has .addClass() and .css(), you enter: http://cdn.picoquery.com/picoquery0.3.0-addClass-css.min.js. Should you later want to use ie the .attr() method, you simply change src to cdn.picoquery.com/picoquery0.3.0-addClass-css-attr.min.js
- New handy CDN URL format for full version. Ie: http://cdn.picoquery.com/picoquery0.3.0-full.min.js for the minified version
- Reordered internal build option list, which is used for encoding and decoding build IDs. Purpose was to order it by relevance, such that build ids for most projects will be smaller

### 0.2.1 (bugfix release)
*Released 30 Sep 2016*
- Scope. When .find() is based on querySelectorAll, special meassurements has to be taken, otherwise code like the following unexpectedly finds nodes: $​("body li", $​("li"​)​.get​(0​)​). It also affects .find(), as it uses the constructor, so this did also return nodes: $​("li"​)​.find​("body li"​). I basically implemented the following shim to fix it (without actually shimming): https://github.com/lazd/scopedQuerySelectorShim

### 0.2.0
*Released 25 Aug 2016*
- Uses "$" instead of "p$", so picoQuery can be a drop-in replacement of jQuery
- Automatically falls back to jQuery (can be disabled in builder)
- Defines $.fn, so you can easily extend the picoQuery prototype with yet unsupported methods
- picoQuery object is now array-like, like jQuery (can be disabled)
- In order to easily change picoQuery build on a project, there now is an URL in the beginning of the generated code, which loads the builder and initializes it with he selected build options (can be disabled)
- Instead of a fine-grain selection of what which type of comments should be included and which parts that should be minified, you now select between 4 versions
- Non-minified code is more readable
- New methods: .filter(), .next(), .parent(), .prev(), .map(), .children(), .attr(), .removeAttr(), .empty(), .html(), .find(), .prepend()
- Optimization. Various tricks has been applied to get the code even smaller
- Created framework for testing compliance. http://picoquery.com/lab/compliance-test/
- Made existing methods more compliant

### 0.1.0
*Released 3 Mar 2016*

