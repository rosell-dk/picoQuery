# picoQuery

picoQuery is a customizable subset of jQuery. Its written for modern browsers and automatically falls back to jQuery on older browsers.

This approach has several benefits:
- picoQuery is <i>ultra</i>-light. Even if you choose the largest subset currently available (41 methods), its only 2.4kb zipped
- If you know jQuery, there is nothing new to learn
- If your project grows and turns out to require advanced features, migration to jQuery is as easy as including jQuery instead of picoQuery
- jQuery syntax is very expressive, so not only is picoQuery light, but your code that relies on picoQuery, will probably also be light. Plus you get the job done quickly with "jQuery"
- The fallback to jQuery 1.12.4 ensures that it works in older browsers, such as IE6-8

### How to use

1. Build your picoQuery here: http://picoquery.com/builder/<br>
2. Simply include that custom script instead of jQuery.

### Current subset
The following methods is currently supported: 
.addClass(), .after(), .append(), .appendTo(), .attr(), .before(), .children(), .click(), .clone(), .closest(), .css(), .each(), .empty(), .eq(), .filter(), .find(), .first(), .focus(), .get(), .hide(), .html(), .insertAfter(), .insertBefore(), jQuery.noConflict(), .keyup(), .map(), .next(), .offset(), .offsetParent(), .on(), .parent(), .prepend(), .prependTo(), .prev(), .ready(), .remove(), .removeAttr(), .removeClass(), .text(), .trigger()

Focus in the 0.4 release will be to support even more of the jQuery API. Please let me know if there is a specific method you wish to be supported.

If you cannot wait for support of a certain method, you can add instance methods this way:

```javascript
// Add ".animate" method
$.fn.animate = function() {
  // Implement animate method.
  // You can of course take advantage of existing methods, such as this.each()
}
```

If you *do* implement methods this way, please consider sharing them on [this page](https://github.com/rosell-dk/picoQuery/wiki/Shared-code) on the wiki


### Compliance
Generally all signatures of the methods are implemented, but there are a few exceptions. In the builder, you can learn more about these exceptions by hovering the small warning icon next to partially supported methods.

picoQuery does not support the special [jQuery-selectors](http://api.jquery.com/category/selectors/jquery-selector-extensions/), such as :visible. It does however support all CSS selectors, including [CSS3 selectors](http://www.456bereastreet.com/archive/200601/css_3_selectors_explained/), such as :enabled

When nodes are cloned, event handlers are not copied. Beware that cloning can happen behind the scene if you for example .append() the same content to several nodes.

The jQuery() constructor supports all signatures, except [jQuery(html, attributes)](http://api.jquery.com/jQuery/#jQuery-html-attributes).

You can learn more about compliance by running our [online compliance test](http://picoquery.com/lab/compliance-test/). As a side note, you can also test jquery compliance of other jQuery reimplementations with this tool.


### Usecase: picoQuery is your "jQuery" for render-blocking scripts
There are times, when you want some of your script to manipulate the document before its displayed. This means that you will want you script to load, parse and execute very quickly. Its blocking the page rendering. People are waiting! Fastest load-time is achieved by keeping your script small and inlining it directly in the HTML. Fast parsing is also achieved by keeping the script small. To keep the script small, you of course need to move all the code that can be defered into another script. That defered script can use jQuery without noticable penalty, but you cannot afford to use jQuery for the render-blocking scripting. If you love the expressiveness and how quickly you get things done in jQuery, you will experience a loss. If you are optimizing a site that already uses jQuery, you will experience plain tediousness. But ta-dah, not anymore. You can now turn to picoQuery, as you can build your own little picoQuery, which suits your needs, and it will be very small. As the render-blocking scripting you need to do is probably limited, it is not too big a drawback that picoQuery currently only supports a small subset of jQuery.

They say that you should avoid render-blocking scripts, but actually, when your script can get the job done quickly, you here have a tool to increase the overall performance of your site. Imagine the unlikely case that you want to display the current time in the top of the document. Dynamic content is much more expensive for the server than static content. Say that you do it in a Wordpress theme - you will then effectively have ruined the possibility to use page caching, which is one of the most effective ways to boost up the speed of a Wordpress site. Also, browsers cannot be allowed to cache the page either. But push the job to the client, and your servers will serve you well. Using cookies, you can maintain sessions and store things such as the content of a shopping cart.

### Usecase: Limiting bandwith usage on mobile browsers
jQuery is quite a download (37k compressed). If you want to be friendly to your mobile users, and you do not have too much coding to do, you may want to do everything in picoQuery. Or you may perhaps be able to limit jQuery usage to some pages. 

### Future usecase: Run jQuery plugins on picoQuery
When more API is supported, it will be possible to run jQuery plugins on picoQuery. To ease this process, you can use the feature-detect tool which logs the jQuery methods used in an application real-time. When your application requires multiple plugins, you will be able to merge build ids with a new tool.

### Future usecase: Vanilla versions of jQuery plugins
When more API is supported, it will be possible for plugin developers to create a vanilla version of their jQuery plugin, by bundling their plugin with with picoQuery (using the .noConflict() method)

#### Tools
- I have build a small tool that logs the jQuery methods used in an application real-time. Its available [here](picoquery.com/lab/feature-detect/). The purpose is of course to find out what methods are required in the picoQuery build. For the tool to be more useful, I plan to have it calculate the picoquery build id (right now it just outputs the methods used). It consist of a script that you include after you include jQuery. The script intercepts all jQuery methods in order to record the usage.
- Future tool: A tool to merge two build ids.

#### New in 0.3:
- More API: jQuery.noConflict(), .after(), .before(), .closest(), .eq(), .insertAfter(), .insertBefore(), .offset(), .offsetParent(), .remove(), .replaceWith(), .text(), .prependTo()
- picoQuery now defines window.jQuery, and overwrites it if it exist. Also, picoQuery no longer cowardly steps aside when $ is already defined. Like in jQuery, you can get $ restored with jQuery.noConflict(). The philosophy behind this change is that picoQuery should behave exactly like jQuery, so they can be used interchangably. This ensures that swapping between jQuery and picoQuery really is just a matter of changing the library and also ensures that there will be no unpleasant surprises when picoQuery falls back to jQuery.
- Improved compatibility of constructor, .append(), .appendTo, .prepend() and events
- build id encoding has changed. In v0.2, options are encoded in base 16. In v0.3, first char specifies the encoding. A=base 16, B=base64. With "B" encoding, we get a bit shorter URLs.
- CDN... Yes CDN!... -- but with picoQuery, there are literally millions of possible builds! I know. Its a good thing picoQuery is so small, otherwise it might get expensive. I have set up a "pull server", which means that when an uncached build is requested, the CDN grabs the builder result from picoquery.com. While best practice is that you either inline picoquery directly in HTML or concatenate it with your other scripts, its often handy just to point to a CDN. The real point of providing a CDN though, is to offload the online builder and protect the server against some site with many visitors linking directly to the build script. The builds will be available on URLs like this: http://cdn.picoquery.com/picoquery0.3.0-B2ga.min.js when 0.3 is released. I implemented in 0.2 too. I have set cache time to 100 years, so you can rely on CDN working even if the builder is temporarily down
- New handy CDN URL format with method names. Ie, to create a build which has .addClass() and .css(), you enter: http://cdn.picoquery.com/picoquery0.3.0-addClass-css.min.js. Should you later want to use ie the .attr() method, you simply change src to cdn.picoquery.com/picoquery0.3.0-addClass-css-attr.min.js
- New handy CDN URL format for full version. Ie: http://cdn.picoquery.com/picoquery0.3.0-full.min.js for the minified version
- Reordered internal build option list, which is used for encoding and decoding build IDs. Purpose was to order it by relevance, such that build ids for most projects will be smaller


### Roadmap

#### Features planned for 0.4:
- Even more API! Please let me know if there is a particular method you wish to be included. You can enter wishes on [this page](https://github.com/rosell-dk/picoQuery/wiki/Wishes-for-new-methods-in-0.4) on the wiki. Done: .hasClass(), .data(), jQuery.data(), jQuery.camelCase(), jQuery.merge() (though the data methods involves risk for memory leak)

#### Features planned for 0.5:
- Option to granularly downgrade functionality for each method. If you know you never use certain signatures/features of a method, you can deselect the signature/feature in order to get size down. It will also be visible when there are features that picoQuery does not support.
- Possibility to see the code that will be generated for each method, depending on what sub-functionality are selected
- Browser tests. I will apply for a free "open source" account on browsershack.com
- picoQuery.com and the CDN must run on HTTPS

#### Features planned for 0.6:
- Optionally optimize library for execution speed rather than gzip size.

### Links
- picoQuery is originally based on picoCSS, available here: https://github.com/vladocar/picoCSS
- Here is a resource for writing code without jQuery: http://youmightnotneedjquery.com/
- There exists a library called *Zepto.js*, which also implements a subset of jQuery. *Zepto.js* implements almost the full jQuery api. Its also modular, but the feature selector is not as fine grained as picoquery, and its not possible to get below ~10k gzipped (picoQuery is ~1k, jQuery 1.9.1 is ~37k). http://zeptojs.com/

### A beer challenge
picoQuery aims to be as lightweight as almost theoretically possible. I literally spend hours to find ways to save a few bytes - it's become a sport. Find a way to squeze more bytes out, and I'll buy you a beer! - Write me: beerchallenge[at]rosell.dk

### Examples of what you can currently do with picoQuery:

```javascript
// Construct from selector, HTML-text, DOM element, HTMLCollection or picoQuery object (cloning)
// , and optionally with a context
$('#contact_form .column a');
$('<p>some <b>HTML</b></p>');
$(document.getElementById('main'));
$(document.getElementsByTagName('div'));
$($('div .column'));
$('li', $('#math').get(0));

// Chaining:
$('.some-class').css('color', 'blue').first().removeClass('some-class');

// Each loop:
$('div .column').each(function(i, elm) {
	$(elm).addClass('big');
})

// Add event handler:
$('#clickme').click(function(e) {
	alert('thanks, man.\n\nThe event object is same as in jQuery: ' + e);
});

// Append with "appendTo()" and "append()"
$('<b>bold</b>').appendTo($('body'));
$('body').append('<b>bold</b>', '<i>italic</i>');

// Access the jQuery object like an array
var numItems = $('li').length;
var firstItem = $('li')[0];

// Filter results:
$('span').filter(':nth-of-type(odd)').addClass('red-text');

// Various tree traversal
$('li').parent('ol').next().prev('ol');

// Extend the prototype
$.fn.bgColor = function(bgColor) {
  this.css('background-color', bgColor);
}
$('li').bgColor('blue');

```





