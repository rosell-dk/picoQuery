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

