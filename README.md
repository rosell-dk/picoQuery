# picoQuery - A down to 1k replacement of jQuery

<h3>Everything that works in picoQuery works in jQuery too</h3>
picoQuery has is designed to be compatible with jQuery. This has interesting benefits. Significantly, it allows <i>swapping to jQuery</i> for older browsers. This is trick #1 that enables picoQuery to be uncomparingly small. Of course, visitors that have older browsers (IE8 and below, as a rough generalization) will not enjoy the performance gain of not having to download and render jQuery, but this only amounts to about 4% of all traffic, and falling.

<h3>picoQuery comes with a builder</h3>
The other trick that allows picoQuery to be lightweight is that it comes (work in progress!) with a builder, allowing you to select just the subset of jQuery functionality you need. If you need only very basic DOM manipulation, the size will be as small as 1k uncompressed. With 1k, you can for example do stuff like this: $('#main > div p:last-child').addClass('big').css('color', 'green');

<h3>Before you get too excited</h3>
I should mention that picoQuery currently only supports a small subset of jQuery functionality. I'm however working hard these days to expand it. And perhaps you want to join in?

The following methods is currently supported: 
.addClass(), .css(), .get(), .each(), .append(), .appendTo(), .first(), .on(), .removeClass(), .trigger(), .click(), .focus(), .keyup(), .hide(),


<h3>Here is how fallback to jQuery is achieved</h3>

	<script src="src/picoquery.js"></script>
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

Here are some examples of what you can currently do with picoQuery:

<h3>Selectors - including css3 selectors</h3>

	p$('#contact_form .column a').addClass('selected');

<h3>You can chain:</h3>
  
	p$('div .column').addClass('selected').addClass('big');

<h3>You can wrap a DOM element and a DOM list</h3>

	p$(elm);

<h3>You can do a custom each loop:</h3>

	p$('div .column').each(function(i, elm) {
		p$(elm).addClass('big');
	})

<h3>You can add event handler:</h3>

	p$('#clickme').click(function(e) {
		alert('thanks, man.\n\nThe event object is same as in jQuery: ' + e);
	});


picoQuery is originally based on picoCSS, available here: https://github.com/vladocar/picoCSS

Here is a resource for writing code without jQuery: http://youmightnotneedjquery.com/

