# picoQuery - A down to 1k replacement of jQuery

<h3>Everything that works in picoQuery works in jQuery too</h3>
picoQuery is designed to be compatible with jQuery. This has interesting benefits. Significantly, it allows <i>fallback to jQuery</i>, which means picoQuery can rely on modern DOM manipulation techniques and delegate the burden of the old browsers to jQuery.

<h3>picoQuery comes with a builder</h3>
Another trick that allows picoQuery to be lightweight is that it comes with a builder, allowing you to select just the subset of jQuery functionality you need. If you need only very basic DOM manipulation, the size will be as small as 600 bytes. With 600 bytes, you can for example do stuff like this: $('#main > div p:last-child').addClass('big').css('color', 'green');

Take a look! 
http://picoquery.com/builder/

<h3>Before you get too excited</h3>
I should mention that picoQuery currently only supports a small subset of jQuery functionality. I'm however working hard these days to expand it. And perhaps you want to join in? Or simply spread the word!

The following methods is currently supported: 
.addClass(), .css(), .get(), .each(), .append(), .appendTo(), .first(), .on(), .removeClass(), .trigger(), .click(), .ready()


<h3>Examples of what you can currently do with picoQuery:</h3>

```javascript
// Construct from selector, HTML-text, DOM element, HTMLCollection or picoQuery object (cloning):
$('#contact_form .column a');
$('<p>some <b>HTML</b></p>');
$(document.getElementById('main'));
$(document.getElementsByTagName('div'));
$($('div .column'));

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
```

<h3>Usecase: Above-the-fold scripting</h3>
When optimizing for performance, you want to avoid what is called 'render-blocking' javascript. When you put in a script-tag, be it in head or in body, the browser needs to get the script (download it or get it from cache) and parse it (this is always needed). Many times, you actually find that none of the things you do in your script is so critical, that it cannot wait til after onload. You can then just defer your javascript, and your good to go - the download and rendering is done after the page is displayed, and if the browser is running on some decent hardware, it will not affect the perceived performance.

However, there are times, when you want some of your script to run before the page is displayed. If for example you create some of the elements dynamically, and they are placed in top of the document (meaning that they are in the viewport). What you do is split up the script in parts that needs to be done when DOM is ready, and parts that can be defered til after document is loaded. The bulk of the scripting can probably be defered. As it is not too bad for performance to use jQuery for the defered part, this means that most of your script can use jQuery. The first part is often so small, that it can be put inline in the HTML, in order to avoid making it render-blocking. You want to keep this script as small as possible, as it is downloaded on each page request. Until now, this has meant turning to vanilla javascript, probably pasting in some convinience functions for DOM manipulation. But with picoQuery, you have a library small enough to justify being inserted inline. And when set up with jQuery fallback, you have full browser compatibility, and you have the convinience of working with a syntax you already learned. As the above-the-fold scripting you need to do is probably limited, it is not too big a drawback, that picoQuery currently only have a small subset of jQuery implemented.

<h3>Usecase: Limiting bandwith usage on mobile browsers</h3>
jQuery is quite a download (100k compressed). If you want to be friendly to your mobile users, and you do not have too much coding to do, you may want to do everything in picoQuery. Or you may perhaps be able to limit jQuery usage to some pages. 

<h3>Challenge</h3>
picoQuery aims to be as lightweight as almost theoretically possible. The developer literally spend hours to find ways to save a few bytes - it's become a sport. Find a way to squeze more bytes out, and I'll by you a beer!

picoQuery is originally based on picoCSS, available here: https://github.com/vladocar/picoCSS

Here is a resource for writing code without jQuery: http://youmightnotneedjquery.com/

