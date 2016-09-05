/* picoquery.com/builder/0.2/?3-ffff1 */
(function(w,d,u,z) {
  if (d.querySelectorAll && d.addEventListener) {
    if (!w.$) {

      $ = function() {
        // allow to create new instances without new
        return function(f,ff) {
          return new P(f,ff);
        };
      }();

      // constructor
      function P(f,ff){if("s"<typeof f)if("<"==f[0]){z=d.createElement("div");z.innerHTML=f;this.e=[z.firstChild]}else this.e=[].slice.call(d.querySelectorAll(f));else{if(typeof f == "function")return $(d).ready(f);this.e=f.nodeType?[f]:f instanceof P?f.e:f.length?[].slice.call(f):[]}for(b=0;b<this.e.length;b++)this[b]=this.e[b];this.length=this.e.length};

      // methods
      $.fn = P.prototype = {
        addClass:function(f){this.e.forEach(function(B){B.classList?B.classList.add(f):B.className+=" "+f});return this},
        append:function(){z=[].slice.call(arguments);this.e.forEach(function(B){z.forEach(function(f){$(f).e.forEach(function(c){B.appendChild(c)})})});return this},
        appendTo:function(f){this.e.forEach(function(el){$(f).append(el)});return this},
        css:function(f,ff){u===ff?this.e[0].style[f]:this.e.forEach(function(B){B.style[f]=ff});return this},
        each:function(f){this.e.forEach(function(B,BB){f.call(B,BB,B)});return this},
        first:function(){return $(this.e[0])},
        get:function(f){return u===f?this.e:this.e[f]},
        hide:function(){this.css('display','none')},
        next:function(selector){return $(this.e.map(function(f){return a['nextElementSibling']}))},
        on:function(f,ff){this.e.forEach(function(B){B.addEventListener(f,ff,!1)});return this},
        parent:function(selector){return $(this.e.map(function(f){return f['parentElement']}))},
        ready:function(f){/^u|ng/.test(d.readyState)?this.on("DOMContentLoaded",function(){f($)}):f($);return this},
        removeClass:function(f){this.e.forEach(function(B){B.className=B.className.replace(new RegExp("\b"+f.replace(" ","\b|\b")+"\b","g")," ")});return this},
        trigger:function(f){this.e.forEach(function(B){z=d.createEvent('HTMLEvents');z.initEvent(f,!0,!1);B.dispatchEvent(z)});return this}
      }

      // Standard events
      ;['click', 'focus', 'keyup'].forEach(function(f) {
        $.fn[f] = function(B){
          return B ? this.on(f,B) : this.trigger(f)
        }
      });

    }        
  }
  else {
    // jQuery fallback
    d.write('<scrip' + 't src="http://code.jquery.com/jquery-1.9.1.min.js"><' + '/script>');
  }
})(window,document)
