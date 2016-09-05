/* picoquery.com/builder/0.2/?3-ffff1 */
(function(w,d,u,z) {
  if (d.querySelectorAll && d.addEventListener) {
    if (!w.$) {

      $ = function() {
        // Allow to create new instances without new
        return function(t,tt) {
          return new P(t,tt);
        };
      }();

      // constructor
      function P(t,tt){if("s"<typeof t)if("<"==t[0]){z=d.createElement("div");z.innerHTML=t;this.e=[z.firstChild]}else this.e=[].slice.call(d.querySelectorAll(t));else{if(typeof t == "function")return $(d).ready(t);this.e=t.nodeType?[t]:t instanceof P?t.e:t.length?[].slice.call(t):[]}for(b=0;b<this.e.length;b++)this[b]=this.e[b];this.length=this.e.length};

      // methods
      $.fn = P.prototype = {
        addClass:function(t){this.e.forEach(function(B){B.classList?B.classList.add(t):B.className+=" "+t});return this},
        append:function(){z=[].slice.call(arguments);this.e.forEach(function(B){z.forEach(function(t){$(t).e.forEach(function(c){B.appendChild(c)})})});return this},
        appendTo:function(t){this.e.forEach(function(el){$(t).append(el)});return this},
        css:function(t,tt){u===tt?this.e[0].style[t]:this.e.forEach(function(B){B.style[t]=tt});return this},
        each:function(t){this.e.forEach(function(B,BB){t.call(B,BB,B)});return this},
        first:function(){return $(this.e[0])},
        get:function(t){return u===t?this.e:this.e[t]},
        hide:function(){this.css('display','none')},
        next:function(selector){return $(this.e.map(function(t){return a['nextElementSibling']}))},
        on:function(t,tt){this.e.forEach(function(B){B.addEventListener(t,tt,!1)});return this},
        parent:function(selector){return $(this.e.map(function(t){return t['parentElement']}))},
        ready:function(t){/^u|ng/.test(d.readyState)?this.on("DOMContentLoaded",function(){t($)}):t($);return this},
        removeClass:function(t){this.e.forEach(function(B){B.className=B.className.replace(new RegExp("\b"+t.replace(" ","\b|\b")+"\b","g")," ")});return this},
        trigger:function(t){this.e.forEach(function(B){z=d.createEvent('HTMLEvents');z.initEvent(t,!0,!1);B.dispatchEvent(z)});return this}
      }

      // Standard events
      ;['click', 'focus', 'keyup'].forEach(function(t) {
        $.fn[t] = function(B){
          return B ? this.on(t,B) : this.trigger(t)
        }
      });

    }        
  }
  else {
    // jQuery fallback
    d.write('<scrip' + 't src="http://code.jquery.com/jquery-1.9.1.min.js"><' + '/script>');
  }
})(window,document)
