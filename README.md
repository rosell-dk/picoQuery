# picoQuery - A down to 1k replacement of jQuery

<h3>Everything that works in picoQuery works in jQuery too</h3>
picoQuery has is designed to be compatible with jQuery. This has interesting benefits. Significantly, it allows <i>swapping to jQuery</i> for older browsers. This is trick #1 that enables picoQuery to be uncomparingly small. Of course, visitors that have older browsers (IE8 and below, as a rough generalization) will not enjoy the performance gain of not having to download and render jQuery, but this only amounts to about 4% of all traffic, and falling.

<h3>picoQuery comes with a builder</h3>
The other trick that allows picoQuery to be lightweight is that it comes with a builder, allowing you to select just the subset of jQuery functionality you need. If you need only very basic DOM manipulation, the size will be as small as 1k uncompressed. With 1k, you can for example do stuff like this: $('#main > div p:last-child').addClass('big').css('color', 'green');

Take a look! 
http://picoquery.com/builder/

<h3>Before you get too excited</h3>
I should mention that picoQuery currently only supports a small subset of jQuery functionality. I'm however working hard these days to expand it. And perhaps you want to join in? Or simply spread the word!

The following methods is currently supported: 
.addClass(), .css(), .get(), .each(), .append(), .appendTo(), .first(), .on(), .removeClass(), .trigger(), .click()


<h3>Here is how fallback to jQuery is achieved</h3>

	<script src="builder/picoquery.js.php?build=0.1-1-1-fff3"></script>
	<script>
	function domReady(){
		// Your code goes here:
		$ = p$;
		$('.clickable').css('cursor', 'pointer').css('background-color', '#ccc');
	}

	if ((!document.querySelectorAll) || (!document.addEventListener)) {
		// fallback to jQuery
		document.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"><' + '/script>');
		document.write('<script>$(document).ready(function() {p$ = jQuery;domReady()})<' + '/script>');
	}
	else {
		document.addEventListener( "DOMContentLoaded", domReady, false );
    // this will later be:
    // $(document).ready(domReady);
	}


Thus, the line between "old" browsers and "new" browsers in this context, is whether the browser support both "querySelectorAll" and "addEventListener". picoQuery will only need to take care for compatibilility for the browsers that meet this criteria. This mounts to the following browsers:

- IE9+
- Edge 12+
- Firefox 3.5+
- Chrome 4+
- Safari 3.1+
- IOS Safari 3.2+
- Opera Mini 8+
- Android Browser 2.1+
- Blackberry browser 10+
- Chrome for Android 47+
- Firefox for Android 44+
- IE mobile 10+
- UC Browser for Android 9.9+

(source: http://caniuse.com/#feat=queryselector and http://caniuse.com/#feat=addeventlistener)
According to caniuse.com, this collection of browsers are currently used for about 96% of all visits globally. 

Note that IE8 is treated as an "old" browser here, as it does not support "addEventListener". As a happy coincidence, IE8 is the only browser where querySelectorAll does not support CSS3 selectors. The criteria thus ensures that querySelectorAll is only used on browsers that supports CSS3 selectors.

<h3>Examples of what you can currently do with picoQuery:</h3>

	// Construct from selector, HTML-text, DOM element, HTMLCollection or picoQuery object (cloning):
	p$('#contact_form .column a');
	p$('<p>some <b>HTML</b></p>');
	p$(document.getElementById('main'));
	p$(document.getElementsByTagName('div'));
	p$(p$('div .column'));

	// Chaining:
	p$('.some-class').css('color', 'blue').first().removeClass('some-class');

	// Each loop:
	p$('div .column').each(function(i, elm) {
		p$(elm).addClass('big');
	})

	// Add event handler:
	p$('#clickme').click(function(e) {
		alert('thanks, man.\n\nThe event object is same as in jQuery: ' + e);
	});

	// Append with "appendTo" and "append"
	p$('<b>bold</b>').appendTo(p$('body'));
  $('body').append('<b>bold</b>', '<i>italic</i>');

<h3>Usecase: Above-the-fold scripting</h3>
When optimizing for performance, you want to avoid what is called 'render-blocking' javascript. When you put in a script-tag, be it in head or in body, the browser needs to get the script (download it or get it from cache) and parse it (this is always needed). Many times, you actually find that none of the things you do in your script is so critical, that it cannot wait til after onload. You can then just defer your javascript, and your good to go - the download and rendering is done after the page is displayed, and if the browser is running on some decent hardware, it will not affect the perceived performance.

However, there are times, when you want some of your script to run before the page is displayed. If for example you create some of the elements dynamically, and they are placed in top of the document (meaning that they are in the viewport). What you do is split up the script in parts that needs to be done when DOM is ready, and parts that can be defered til after document is loaded. The bulk of the scripting can probably be defered. As it is not too bad for performance to use jQuery for the defered part, this means that most of your script can use jQuery. The first part is often so small, that it can be put inline in the HTML, in order to avoid making it render-blocking. You want to keep this script as small as possible, as it is downloaded on each page request. Until now, this has meant turning to vanilla javascript, probably pasting in some convinience functions for DOM manipulation. But with picoQuery, you have a library small enough to justify being inserted inline. And when set up with jQuery fallback, you have full browser compatibility, and you have the convinience of working with a syntax you already learned. As the above-the-fold scripting you need to do is probably limited, it is not too big a drawback, that picoQuery currently only have a small subset of jQuery implemented.

<h3>Usecase: Limiting bandwith usage on mobile browsers</h3>
jQuery is quite a download. If you want to be friendly to your mobile users, and you do not have too much coding to do, you may want to do everything in picoQuery. Or you may perhaps be able to limit jQuery usage to some pages. 


picoQuery is originally based on picoCSS, available here: https://github.com/vladocar/picoCSS

Here is a resource for writing code without jQuery: http://youmightnotneedjquery.com/

