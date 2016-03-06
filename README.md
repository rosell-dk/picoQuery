# picoQuery
An ultra lightweight alternative to jQuery, with jQuery fallback for unmodern browsers

DOM manipulation libraries such as jQuery do a great job of providing browser compatibility. But the expense is a big download - and rendering time - for all clients, even though the compatibility is only needed for a few percent.

picoQuery has an alternative approach. The library itself is written only for modern browsers. But the twist is that everything that works in picoQuery works in jQuery too. Hence, it allows us to fallback to jQuery. Bottom line: Great performance for modern browsers AND browser compatibility

Here is how this is achieved:

	<script src="src/picoquery.js"></script>
	<script>
	function domReady(){
		// Your code goes here:
  		p$('.clickable').css('cursor', 'pointer').css('background-color', '#ccc');
	}

	if ((!document.querySelectorAll) || (!document.addEventListener)) {
  		// Unmodern browser fallback to jQuery

  		// JQuery 1.12.0 on Google CDN
  		document.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"><' + '/script>');

		// the jQuery "ready" function fires at different times, depending
		// on browser. But it will be earliest on DOMContentLoaded, and always before the "onload"
		document.write('<script>$(document).ready(function() {p$ = jQuery;domReady()})<' + '/script>');
	}
	else {
  		// For stuff that should be there on the first render, you want to
  		// hook on to the "DOMContentLoaded" event, which fires before the onLoad.
		document.addEventListener( "DOMContentLoaded", domReady, false );
	}


Here are some more examples with what you can do with picoQuery:

<h3>Selectors - including css3 selectors</h3>

	p$('#contact_form .column a').addClass('selected');

<h3>You can chain:</h3>
  
	p$('div .column').addClass('selected').addClass('big');

<h3>You can wrap a DOM element and a DOM list</h3>

	p$(elm);

<h3>You can do a custom each loop:</h3>

	p$('div .column').each(function(node) {
		p$(node).addClass('big');
	})

<h3>You can add event handler:</h3>

	p$('#clickme').click(function(e) {
		alert('thanks, man.\n\nThe event object is same as in jQuery: ' + e);
	});

Also, "css", "get", "first", "addClass" and "removeClass" are supported. Many more are on the way - I'm very actively developing this library these days. And the library is easily extended.

As the library grows, I will provide a builder, so you can build a custom picoQuery with only the methods you need for your project - to keep it as small as possible


picoQuery is based on picoCSS, available here: https://github.com/vladocar/picoCSS

Here is a resource for writing code without jQuery: http://youmightnotneedjquery.com/

