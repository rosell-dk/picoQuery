/* picoquery.com/builder/0.2/?3-fff7 */
(function(w,d,u,z) {

  // constructor
  function P(a,c){if(typeof a>"s")if("<"==a[0]){z=d.createElement("div");z.innerHTML=a;this.e=[z.firstChild]}else this.e=[].slice.call(d.querySelectorAll(a));else{if(typeof a == "function")return $(d).ready(a);this.e=a.nodeType?[a]:a instanceof P?a.e:a.length?[].slice.call(a):[]}};


  if (!w.$) {

    $ = function() {
      // Allow to create new instances without new
      return function(a,b) {
        return new P(a,b);
      };
    }();

    // prototype methods
    $.fn = P.prototype = {
      addClass:function(a){this.e.forEach(function(b){b.classList?b.classList.add(a):b.className+=" "+a});return this},
      append:function(){z=[].slice.call(arguments);this.e.forEach(function(b){z.forEach(function(a){$(a).e.forEach(function(c){b.appendChild(c)})})});return this},
      appendTo:function(t){this.e.forEach(function(el){$(t).append(el)});return this},
      css:function(a,b){u===b?this.e[0].style[a]:this.e.forEach(function(c){c.style[a]=b});return this},
      each:function(a){this.e.forEach(function(b,c){a.call(b,c,b)});return this},
      first:function(){return $(this.e[0])},
      get:function(a){return u===a?this.e:this.e[a]},
      hide:function(fn){this.css('display','none')},
      on:function(a,b){this.e.forEach(function(c){c.addEventListener(a,b,!1)});return this},
      ready:function(a){if(/^u|ng/.test(document.readyState))this.on("DOMContentLoaded",function(){a($)});else a($);return this},
      removeClass:function(b){this.e.forEach(function(a){a.className=a.className.replace(new RegExp("\b"+b.replace(" ","\b|\b")+"\b","g")," ")});return this},
      trigger:function(a){this.e.forEach(function(b){z=d.createEvent('HTMLEvents');z.initEvent(a,!0,!1);b.dispatchEvent(z)});return this}
    }

    // Standard events
    ;['click', 'focus', 'keyup'].forEach(function(a) {
      $.fn[a] = function(b){
        return b ? this.on(a,b) : this.trigger(a)
      }
    });

    

    // Fallback to jQuery
    if ((!d.querySelectorAll) || (!d.addEventListener)) {
      document.write('<scrip' + 't src="https://code.jquery.com/jquery-1.9.1.min.js"><' + '/script>');
    }

    
  }
})(window,document)

$.fn.test = function() {
  alert(d);
}

