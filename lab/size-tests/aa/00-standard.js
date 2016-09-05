/* picoquery.com/builder/0.2/?3-ffff1 */
(function(w,d,u,z) {
  if (d.querySelectorAll && d.addEventListener) {
    if (!w.$) {

      $ = function() {
        // Allow to create new instances without new
        return function(a,b) {
          return new P(a,b);
        };
      }();

      // constructor
      function P(a,c){if("s"<typeof a)if("<"==a[0]){z=d.createElement("div");z.innerHTML=a;this.e=[z.firstChild]}else this.e=[].slice.call(d.querySelectorAll(a));else{if(typeof a == "function")return $(d).ready(a);this.e=a.nodeType?[a]:a instanceof P?a.e:a.length?[].slice.call(a):[]}for(b=0;b<this.e.length;b++)this[b]=this.e[b];this.length=this.e.length};

      // methods
      $.fn = P.prototype = {
        addClass:function(a){this.e.forEach(function(b){b.classList?b.classList.add(a):b.className+=" "+a});return this},
        append:function(){z=[].slice.call(arguments);this.e.forEach(function(b){z.forEach(function(a){$(a).e.forEach(function(c){b.appendChild(c)})})});return this},
        appendTo:function(a){this.e.forEach(function(el){$(a).append(el)});return this},
        css:function(a,b){u===b?this.e[0].style[a]:this.e.forEach(function(c){c.style[a]=b});return this},
        each:function(a){this.e.forEach(function(b,c){a.call(b,c,b)});return this},
        first:function(){return $(this.e[0])},
        get:function(a){return u===a?this.e:this.e[a]},
        hide:function(){this.css('display','none')},
        next:function(selector){return $(this.e.map(function(a){return a['nextElementSibling']}))},
        on:function(a,b){this.e.forEach(function(c){c.addEventListener(a,b,!1)});return this},
        parent:function(selector){return $(this.e.map(function(a){return a['parentElement']}))},
        ready:function(a){/^u|ng/.test(d.readyState)?this.on("DOMContentLoaded",function(){a($)}):a($);return this},
        removeClass:function(b){this.e.forEach(function(a){a.className=a.className.replace(new RegExp("\b"+b.replace(" ","\b|\b")+"\b","g")," ")});return this},
        trigger:function(a){this.e.forEach(function(b){z=d.createEvent('HTMLEvents');z.initEvent(a,!0,!1);b.dispatchEvent(z)});return this}
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
