/* picoquery.com/builder/0.2/?3-ffff1 */
(function(w,d,u,z) {
  if (d.querySelectorAll && d.addEventListener) {
    if (!w.$) {

      $ = function() {
        // allow to create new instances without new
        return function(b,bb) {
          return new P(b,bb);
        };
      }();

      // constructor
      function P(b,bb){if("s"<typeof b)if("<"==b[0]){z=d.createElement("div");z.innerHTML=b;this.e=[z.firstChild]}else this.e=[].slice.call(d.querySelectorAll(b));else{if(typeof b == "function")return $(d).ready(b);this.e=b.nodeType?[b]:b instanceof P?b.e:b.length?[].slice.call(b):[]}for(b=0;b<this.e.length;b++)this[b]=this.e[b];this.length=this.e.length};

      // methods
      $.fn = P.prototype = {
        addClass:function(b){this.e.forEach(function(B){B.classList?B.classList.add(b):B.className+=" "+b});return this},
        append:function(){z=[].slice.call(arguments);this.e.forEach(function(B){z.forEach(function(b){$(b).e.forEach(function(c){B.appendChild(c)})})});return this},
        appendTo:function(b){this.e.forEach(function(el){$(b).append(el)});return this},
        css:function(b,bb){u===bb?this.e[0].style[b]:this.e.forEach(function(B){B.style[b]=bb});return this},
        each:function(b){this.e.forEach(function(B,BB){b.call(B,BB,B)});return this},
        first:function(){return $(this.e[0])},
        get:function(b){return u===b?this.e:this.e[b]},
        hide:function(){this.css('display','none')},
        next:function(selector){return $(this.e.map(function(b){return a['nextElementSibling']}))},
        on:function(b,bb){this.e.forEach(function(B){B.addEventListener(b,bb,!1)});return this},
        parent:function(selector){return $(this.e.map(function(b){return b['parentElement']}))},
        ready:function(b){/^u|ng/.test(d.readyState)?this.on("DOMContentLoaded",function(){b($)}):b($);return this},
        removeClass:function(b){this.e.forEach(function(B){B.className=B.className.replace(new RegExp("\b"+b.replace(" ","\b|\b")+"\b","g")," ")});return this},
        trigger:function(b){this.e.forEach(function(B){z=d.createEvent('HTMLEvents');z.initEvent(b,!0,!1);B.dispatchEvent(z)});return this}
      }

      // Standard events
      ;['click', 'focus', 'keyup'].forEach(function(b) {
        $.fn[b] = function(B){
          return B ? this.on(b,B) : this.trigger(b)
        }
      });

    }        
  }
  else {
    // jQuery fallback
    d.write('<scrip' + 't src="http://code.jquery.com/jquery-1.9.1.min.js"><' + '/script>');
  }
})(window,document)
