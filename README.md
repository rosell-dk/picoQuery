# picoQuery - A 1k alternative to jQuery

picoQuery is a <i>ultra small</i> DOM manipulation library. It has the same syntax as jQuery, so nothing new to learn. For IE8 and other older browsers, it automatically falls back to jQuery.

<h3>Why is this smart?</h3>
&dash; Because this strategy alows picoQuery to be written for modern browsers without leaving older browsers behind. For new browsers, the benefit is ultra lightweight code (~1k). For old browsers, the benefit is simply that the webpage works (unlike other DOM-libraries written for modern browsers)

Further, of course, the benefit is that you probably already know jQuery. And if your project grows and turns out to require advanced features, migration to jQuery is as easy as including jQuery instead of picoQuery. Also, jQuery syntax is very expressive, so not only is picoQuery light, but your code that relies on picoQuery, will probably also be light.

<h3>picoQuery web builder</h3>
Another trick that allows picoQuery to be lightweight is that you can specify the subset of jQuery functionality you need. If you need only very basic DOM manipulation, the size will be as small as 600 bytes gzipped.

Take a look! 
http://picoquery.com/builder/

<h3>Before you get too excited</h3>
I should mention that picoQuery currently only supports a small subset of jQuery functionality. It is however enough for basic DOM manipulation, and I'm working to expand it (perhaps you want to join in? Or simply spread the word!). Also, without too much efford, you can expand it yourself through $.fn (see the examples below)

The following methods is currently supported: 
.addClass(), .css(), .get(), .each(), .append(), .appendTo(), .first(), .on(), .removeClass(), .trigger(), .click(), .ready(), filter(), prev(), next(), parent().


<h3>Examples of what you can currently do with picoQuery:</h3>

```javascript
// Construct from selector, HTML-text, DOM element, HTMLCollection or picoQuery object (cloning), and optionally with a context
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

<h3>Usecase: Above-the-fold scripting</h3>
When optimizing for performance, you want to avoid what is called 'render-blocking' javascript. When you put in a script-tag, be it in head or in body, the browser needs to get the script (download it or get it from cache) and parse it (this is always needed). Many times, you actually find that none of the things you do in your script is so critical, that it cannot wait til after onload. You can then just defer your javascript, and your good to go - the download and rendering is done after the page is displayed, and if the browser is running on some decent hardware, it will not affect the perceived performance.

However, there are times, when you want some of your script to run before the page is displayed. If for example you create some of the elements dynamically, and they are placed in top of the document (meaning that they are in the viewport). What you do is split up the script in parts that needs to be done when DOM is ready, and parts that can be defered til after document is loaded. The bulk of the scripting can probably be defered. As it is not too bad for performance to use jQuery for the defered part, this means that most of your script can use jQuery. The first part is often so small, that it can be put inline in the HTML, in order to avoid making it render-blocking. You want to keep this script as small as possible, as it is downloaded on each page request. Until now, this has meant turning to vanilla javascript, probably pasting in some convinience functions for DOM manipulation. But with picoQuery, you have a library small enough to justify being inserted inline. And when set up with jQuery fallback, you have full browser compatibility, and you have the convinience of working with a syntax you already learned. As the above-the-fold scripting you need to do is probably limited, it is not too big a drawback, that picoQuery currently only have a small subset of jQuery implemented.

<h3>Usecase: Limiting bandwith usage on mobile browsers</h3>
jQuery is quite a download (37k compressed). If you want to be friendly to your mobile users, and you do not have too much coding to do, you may want to do everything in picoQuery. Or you may perhaps be able to limit jQuery usage to some pages. 

<h3>A beer challenge</h3>
picoQuery aims to be as lightweight as almost theoretically possible. I literally spend hours to find ways to save a few bytes - it's become a sport. Find a way to squeze more bytes out, and I'll buy you a beer! - Write me: beerchallenge[at]rosell.dk

<h3>Links</h3>
- picoQuery is originally based on picoCSS, available here: https://github.com/vladocar/picoCSS
- Here is a resource for writing code without jQuery: http://youmightnotneedjquery.com/
- There exists a library called *Zepto.js*, which also implements a subset of jQuery. *Zepto.js* implements almost the full jQuery api. Its also modular, but the feature selector is not as fine grained as picoquery, and its not possible to get below ~10k gzipped (picoQuery is ~1k, jQuery 1.9.1 is ~37k). http://zeptojs.com/

<h3>New in 0.2</h3>
- Uses "$" instead of "p$", so picoQuery can be a drop-in replacement of jQuery
- Automatically falls back to jQuery (can be disabled in builder)
- Defines $.fn, so you can easily extend the picoQuery prototype with yet unsupported methods
- picoQuery object is now array-like, like jQuery (can be disabled)
- In order to easily change picoQuery build on a project, there now is an URL in the top of the code, which loads the builder and initializes it with he selected build options (can be disabled)
- Instead of a fine-grain selection of what which type of comments should be included and which parts that should be minified, you now select between 4 versions
- Non-minified code is more readable
- New methods: .filter(), .next(), .parent(), prev()
- Optimization. Various tricks has been applied to get the code even smaller

- TODO: CDN. Not just full versions - ALL combinations! (a pull server). It will probably be on URLs like these: https://cdn.picoquery.com/picoquery0.2-A2fa0.min.js. I will also allow URLs like these: https://cdn.picoquery.com/picoquery0.2-addClass-css.min.js. That is: You can specify the build options directly in the URL, so you don't have to go to the builder in order to add a feaure.
- TODO: HTTPS, i guess


<h3>Roadmap</h3>
- 0.3: A lot of efford has already gone into making the library as small as possible. In version 0.3, focus will be on getting the gzip even smaller. Lessons learned can be applied when writing upcomming methods.
- 0.4: Focus will be unit tests
- 0.5: Focus will be browser tests. I will apply for a free "open source" account on browsershack.com


