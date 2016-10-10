# picoQuery

picoQuery is a customizable subset of jQuery. Its written for modern browsers and automatically falls back to jQuery on older browsers.

This approach has several benefits:
- picoQuery is <i>ultra</i>-light. Even if you choose the largest subset currently available (29 methods), its only 1.7kb zipped
- If you know jQuery, there is nothing new to learn
- If your project grows and turns out to require advanced features, migration to jQuery is as easy as including jQuery instead of picoQuery
- jQuery syntax is very expressive, so not only is picoQuery light, but your code that relies on picoQuery, will probably also be light. Plus you get the job done quickly with "jQuery"
- The fallback to jQuery ensures that it also works in older browsers

<h3>Lets get started!</h3>
You build your picoQuery here: http://picoquery.com/builder/

<h3>Before you get too excited</h3>
I should mention that picoQuery currently only supports a small subset of jQuery functionality. It is however enough for basic DOM manipulation, and I'm working to expand it (perhaps you want to join in? Or simply spread the word!). Also, without too much efford, you can expand it yourself through $.fn (see the examples below)

The following methods is currently supported: 
.addClass(), .append(), .appendTo(), .attr(), .children(), .click(), .css(), .each(), .empty(), .first(), .find(), .focous(), .get(), .hide(), .html(), .keyup(), .map(), .next(), .on(), .parent()., .prev(), .ready(), .removeAttr(), .removeClass(), .trigger()


<h3>Examples of what you can currently do with picoQuery:</h3>

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

<h3>Usecase: picoQuery is your "jQuery" for render-blocking scripts</h3>
There are times, when you want some of your script to manipulate the document before its displayed. This means that you will want you script to load, parse and execute very quickly. Its blocking the page rendering. People are waiting! Fastest load-time is achieved by keeping your script small and inlining it directly in the HTML. Fast parsing is also achieved by keeping the script small. To keep the script small, you of course need to move all the code that can be defered into another script. That defered script can use jQuery without noticable penalty, but you cannot afford to use jQuery for the render-blocking scripting. If you love the expressiveness and how quickly you get things done in jQuery, you will experience a loss. If you are optimizing a site that already uses jQuery, you will experience plain tediousness. But ta-dah, not anymore. You can now turn to picoQuery, as you can build your own little picoQuery, which suits your needs, and it will be very small. As the render-blocking scripting you need to do is probably limited, it is not too big a drawback that picoQuery currently only supports a small subset of jQuery.

They say that you should avoid render-blocking scripts, but actually, when your script can get the job done quickly, you here have a tool to increase the overall performance of your site. Imagine the unlikely case that you want to display the current time in the top of the document. Dynamic content is much more expensive for the server than static content. Say that you do it in a Wordpress theme - you will then effectively have ruined the possibility to use page caching, which is one of the most effective ways to boost up the speed of a Wordpress site. Also, browsers cannot be allowed to cache the page either. But push the job to the client, and your servers will serve you well. Using cookies, you can maintain sessions and store things such as the content of a shopping cart.

<h3>Usecase: Limiting bandwith usage on mobile browsers</h3>
jQuery is quite a download (37k compressed). If you want to be friendly to your mobile users, and you do not have too much coding to do, you may want to do everything in picoQuery. Or you may perhaps be able to limit jQuery usage to some pages. 

<h3>A beer challenge</h3>
picoQuery aims to be as lightweight as almost theoretically possible. I literally spend hours to find ways to save a few bytes - it's become a sport. Find a way to squeze more bytes out, and I'll buy you a beer! - Write me: beerchallenge[at]rosell.dk

<h3>Links</h3>
- picoQuery is originally based on picoCSS, available here: https://github.com/vladocar/picoCSS
- Here is a resource for writing code without jQuery: http://youmightnotneedjquery.com/
- There exists a library called *Zepto.js*, which also implements a subset of jQuery. *Zepto.js* implements almost the full jQuery api. Its also modular, but the feature selector is not as fine grained as picoquery, and its not possible to get below ~10k gzipped (picoQuery is ~1k, jQuery 1.9.1 is ~37k). http://zeptojs.com/

<h3>New in 0.2.0</h3>
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

<h3>0.2.1 bugfix release</h3>
- Scope. When .find() is based on querySelectorAll, special meassurements has to be taken, otherwise code like the following unexpectedly finds nodes: $​("body li", $​("li"​)​.get​(0​)​). It also affects .find(), as it uses the constructor, so this did also return nodes: $​("li"​)​.find​("body li"​). I basically implemented the following shim to fix it (without actually shimming): https://github.com/lazd/scopedQuerySelectorShim


<h3>Roadmap</h3>
Features planned for 0.3:
- More API: .after(), .before(), .closest(), .eq(), .insertAfter(), .insertBefore(), .remove(), .replaceWith(), .text(), .prependTo(), jQuery.noConflict() -and probably more. Please let me know if there is a method you would like to see included
- Improved compatibility of .append(), .appendTo, and .prepend()
- build id will change. Right now, the selected methods are encoded with 4 bits (0-f). It will be increased to 6 bits in order to get even shorter URLs.
- CDN. Not just full versions - ALL combinations! (a pull server). It will probably be on URLs like these: https://cdn.picoquery.com/picoquery0.2-A2fa0.min.js. I will also allow URLs like these: https://cdn.picoquery.com/picoquery0.2-addClass-css.min.js. That is: You can specify the build options directly in the URL, so you don't have to go to the builder in order to add a feaure.
- picoQuery.com and the CDN must run on HTTPS
The supported api for 0.3 will be:
.addClass(), .after(), .append(), .appendTo(), .attr(), .before(), .children(), .click(), .clone(), .closest(), .css(), .each(), .empty(), .eq(), .filter(), .find(), .first(), .focus(), .get(), .hide(), .html(), .insertAfter(), .insertBefore(), jQuery.noConflict(), .keyup(), .map(), .next(), .on(), .parent(), .prepend(), .prependTo(), .prev(), .ready(), .remove(), .removeAttr(), .removeClass(), .text(), .trigger()

Features planned for 0.4:
- Option to granularly downgrade functionality for each method. If you know you never use certain signatures/features of a method, you can deselect the signature/feature in order to get size down. It will also be visible when there are features that picoQuery does not support.
- Possibility to see the code that will be generated for each method, depending on what sub-functionality are selected
- Browser tests. I will apply for a free "open source" account on browsershack.com

Features planned for 0.5:
- Optionally optimize library for execution speed rather than gzip size.





