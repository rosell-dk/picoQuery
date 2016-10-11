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

