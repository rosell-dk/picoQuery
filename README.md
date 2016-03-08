# picoQuery
An ultra lightweight subset of jQuery functionality

picoQuery is designed such that everything that works in picoQuery works in jQuery too. This has interesting benefits:

- It allows fallback to jQuery on older browsers
- It eases the process of migrating jQuery-code to something lightweight
- If you start a project in picoQuery and it later turns out that you need full-flegded jQuery functionality, it just works

picoQuery will come with a builder allowing you to select just the subset of jQuery functionality you need. If you need only very basic DOM manipulation, the size will be as small as 1k uncompressed. With 1k, you can for example do stuff like this: $('#main > div p:last-child').addClass('big').css('color', 'green');

Here is how you can achieve fallback to jQuery for older browsers:

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


Here are some examples of what you can currently do with picoQuery:

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

Also, "each", "css", "get", "first", "addClass", "removeClass", "append", "appendTo" are supported. Many more are on the way - I'm very actively developing this library these days. And the library is easily extended.


picoQuery is based on picoCSS, available here: https://github.com/vladocar/picoCSS

Here is a resource for writing code without jQuery: http://youmightnotneedjquery.com/

