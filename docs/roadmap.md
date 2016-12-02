# Roadmap

### Features planned for 0.5 (release date: ~2/12-2016)
Goal of this release: To improve compliance of the current subset

Done:
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

### Features planned for 0.6:
- Improve the builder UI a bit (especially the method selection part)
- More API. I expect to work on animation methods, such as slideDown(). Please let me know if there is a particular method you wish to be included. You can enter wishes on [this page](https://github.com/rosell-dk/picoQuery/wiki/Wishlist) on the wiki.
- Use Piwik instead of GA (https://piwik.org/)

### Features planned for 0.7, 0.8 and 0.9:
- More API

### Features planned for 1.0:
- Option to granularly downgrade functionality for each method. If you know you never use certain signatures/features of a method, you can deselect the signature/feature in order to get size down. It will also be visible when there are features that picoQuery does not support.
- Possibility to see the code that will be generated for each method, depending on what sub-functionality are selected
- Browser tests. I will apply for a free "open source" account on browsershack.com
- picoQuery.com and the CDN must run on HTTPS


### Features planned for 2.0:
- Support *all* jQuery methods

