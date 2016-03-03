# picoQuery
An ultra lightweight alternative to jQuery.

jQuery is a big download. But on top of that, it takes time for the client browser to render it - on EACH page.
picoQuery is designed to assist in the task of migrating code from jQuery. picoQuery has the very same syntax. Ie to add a class to all a-tags, you will write:

	p$('a').addClass('selected');

But picoQuery only implements a bare essentials subset of jQuery functionality. This is how we keep it ultra-lightweight. So it is not a drop-in replacement.

However, near-future plan is to provide a picoquery-migrate.js, which can be used while migrating, and which will tell you when an unsupported jQuery-method is called, and in some cases, how to extend picoQuery with the needed functionality. This way, your'e workflow of migrating will actually start with drop-in-replacement

Here are some more examples with what you can do with the basic feature set of picoQuery:

<h3>Like in jQuery, you can use id-selectors, class selectors, etc</h3>

	p$('#contact_form .column a').addClass('selected');

<h3>Like in jQuery, you can chain:</h3>
  
	p$('div .column').addClass('selected').addClass('big');

<h3>Like in jQuery, you can get an underlying DOM element with the "get" function:</h3>

	var elm = p$('div .column').get(0)

<h3>Like in jQuery, you can wrap a DOM element and a DOM list</h3>

	p$(elm);
)

<h3>Like in jQuery, you can do a custom each loop:</h3>

	p$('div .column').each(function(node) {
		p$(node).addClass('big');
	})

picoQuery has only a very limited number of functions, but is very easy to extend
For example (if it wasn't there already, the addClass method could be added like this:

	picoQueryClass.prototype.addClass = function(v) {
		return this.each(function (n) {
			if (n.classList) {
				n.classList.add(v);
			} 
			else {
				n.className += ' ' + v;
			}
		});
	}


I'm very actively developing this library these days. More methods will be added.

Near-future plans:
- Provide instructions on how to switch to real jQuery for the few browsers that are unsupported (ie8)
- Provide a library of replacements for a wide range of jQuery-methods. This will allow you to copy/paste the functions you need

