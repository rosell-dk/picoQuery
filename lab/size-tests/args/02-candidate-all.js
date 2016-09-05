/* picoquery.com/builder/0.2/?3-ffff1 */
(function(w,d,u,z) {
  if (d.querySelectorAll && d.addEventListener) {
    if (!w.$) {

      $ = function() {
        // Allow to create new instances without new
        return function(a,aa) {
          return new P(a,aa);
        };
      }();

      // constructor
      function P(a,aa){if("s"<typeof a)if("<"==a[0]){z=d.createElement("div");z.innerHTML=a;this.e=[z.firstChild]}else this.e=[].slice.call(d.querySelectorAll(a));else{if(typeof a == "function")return $(d).ready(a);this.e=a.nodeType?[a]:a instanceof P?a.e:a.length?[].slice.call(a):[]}for(b=0;b<this.e.length;b++)this[b]=this.e[b];this.length=this.e.length};

      // methods
      $.fn = P.prototype = {
        addClass:function(a,aa){this.e.forEach(function(b){b.classList?b.classList.add(a):b.className+=" "+a});return this},
        append:function(a,aa){z=[].slice.call(arguments);this.e.forEach(function(b){z.forEach(function(a){$(a).e.forEach(function(c){b.appendChild(c)})})});return this},
        appendTo:function(a,aa){this.e.forEach(function(el){$(a).append(el)});return this},
        css:function(a,aa){u===aa?this.e[0].style[a]:this.e.forEach(function(b){b.style[a]=aa});return this},
        each:function(a,aa){this.e.forEach(function(b,bb){a.call(b,bb,b)});return this},
        first:function(a,aa){return $(this.e[0])},
        get:function(a,aa){return u===a?this.e:this.e[a]},
        hide:function(a,aa){return this.css('display','none')},
        next:function(a,aa){return $(this.e.map(function(b){return b['nextElementSibling']}))},
        on:function(a,aa){this.e.forEach(function(b){b.addEventListener(a,aa,!1)});return this},
        parent:function(a,aa){return $(this.e.map(function(b){return b['parentElement']}))},
        ready:function(a,aa){/^u|ng/.test(d.readyState)?this.on("DOMContentLoaded",function(){a($)}):a($);return this},
        removeClass:function(a,aa){this.e.forEach(function(b){b.className=b.className.replace(new RegExp("\b"+a.replace(" ","\b|\b")+"\b","g")," ")});return this},
        trigger:function(a,aa){this.e.forEach(function(b){z=d.createEvent('HTMLEvents');z.initEvent(a,!0,!1);b.dispatchEvent(z)});return this}
      }

      // Standard events
      ;['click', 'focus', 'keyup'].forEach(function(a) {
        $.fn[a] = function(b){
          return b ? this.on(a,b) : this.trigger(a)
        }
      });

    }        
  }
  else {
    // jQuery fallback
    d.write('<scrip' + 't src="http://code.jquery.com/jquery-1.9.1.min.js"><' + '/script>');
  }
})(window,document)
