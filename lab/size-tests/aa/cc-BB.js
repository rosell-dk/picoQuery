/* picoquery.com/builder/0.2/?3-ffff1 */
(function(w,d,u,z) {
  if (d.querySelectorAll && d.addEventListener) {
    if (!w.$) {

      $ = function() {
        // Allow to create new instances without new
        return function(c,cc) {
          return new P(c,cc);
        };
      }();

      // constructor
      function P(c,cc){if("s"<typeof c)if("<"==c[0]){z=d.createElement("div");z.innerHTML=c;this.e=[z.firstChild]}else this.e=[].slice.call(d.querySelectorAll(c));else{if(typeof c == "function")return $(d).ready(c);this.e=c.nodeType?[c]:c instanceof P?c.e:c.length?[].slice.call(c):[]}for(b=0;b<this.e.length;b++)this[b]=this.e[b];this.length=this.e.length};

      // methods
      $.fn = P.prototype = {
        addClass:function(c){this.e.forEach(function(B){B.classList?B.classList.add(c):B.className+=" "+c});return this},
        append:function(){z=[].slice.call(arguments);this.e.forEach(function(B){z.forEach(function(c){$(c).e.forEach(function(c){B.appendChild(c)})})});return this},
        appendTo:function(c){this.e.forEach(function(el){$(c).append(el)});return this},
        css:function(c,cc){u===cc?this.e[0].style[c]:this.e.forEach(function(B){B.style[c]=cc});return this},
        each:function(c){this.e.forEach(function(B,BB){c.call(B,BB,B)});return this},
        first:function(){return $(this.e[0])},
        get:function(c){return u===c?this.e:this.e[c]},
        hide:function(){this.css('display','none')},
        next:function(selector){return $(this.e.map(function(c){return a['nextElementSibling']}))},
        on:function(c,cc){this.e.forEach(function(B){B.addEventListener(c,cc,!1)});return this},
        parent:function(selector){return $(this.e.map(function(c){return c['parentElement']}))},
        ready:function(c){/^u|ng/.test(d.readyState)?this.on("DOMContentLoaded",function(){c($)}):c($);return this},
        removeClass:function(c){this.e.forEach(function(B){B.className=B.className.replace(new RegExp("\b"+c.replace(" ","\b|\b")+"\b","g")," ")});return this},
        trigger:function(c){this.e.forEach(function(B){z=d.createEvent('HTMLEvents');z.initEvent(c,!0,!1);B.dispatchEvent(z)});return this}
      }

      // Standard events
      ;['click', 'focus', 'keyup'].forEach(function(c) {
        $.fn[c] = function(B){
          return B ? this.on(c,B) : this.trigger(c)
        }
      });

    }        
  }
  else {
    // jQuery fallback
    d.write('<scrip' + 't src="http://code.jquery.com/jquery-1.9.1.min.js"><' + '/script>');
  }
})(window,document)
