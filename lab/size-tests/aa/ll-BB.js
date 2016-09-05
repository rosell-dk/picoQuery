/* picoquery.com/builder/0.2/?3-ffff1 */
(function(w,d,u,z) {
  if (d.querySelectorAll && d.addEventListener) {
    if (!w.$) {

      $ = function() {
        // allow to create new instances without new
        return function(l,ll) {
          return new P(l,ll);
        };
      }();

      // constructor
      function P(l,ll){if("s"<typeof l)if("<"==l[0]){z=d.createElement("div");z.innerHTML=l;this.e=[z.firstChild]}else this.e=[].slice.call(d.querySelectorAll(l));else{if(typeof l == "function")return $(d).ready(l);this.e=l.nodeType?[l]:l instanceof P?l.e:l.length?[].slice.call(l):[]}for(b=0;b<this.e.length;b++)this[b]=this.e[b];this.length=this.e.length};

      // methods
      $.fn = P.prototype = {
        addClass:function(l){this.e.forEach(function(B){B.classList?B.classList.add(l):B.className+=" "+l});return this},
        append:function(){z=[].slice.call(arguments);this.e.forEach(function(B){z.forEach(function(l){$(l).e.forEach(function(c){B.appendChild(c)})})});return this},
        appendTo:function(l){this.e.forEach(function(el){$(l).append(el)});return this},
        css:function(l,ll){u===ll?this.e[0].style[l]:this.e.forEach(function(B){B.style[l]=ll});return this},
        each:function(l){this.e.forEach(function(B,BB){l.call(B,BB,B)});return this},
        first:function(){return $(this.e[0])},
        get:function(l){return u===l?this.e:this.e[l]},
        hide:function(){this.css('display','none')},
        next:function(selector){return $(this.e.map(function(l){return a['nextElementSibling']}))},
        on:function(l,ll){this.e.forEach(function(B){B.addEventListener(l,ll,!1)});return this},
        parent:function(selector){return $(this.e.map(function(l){return l['parentElement']}))},
        ready:function(l){/^u|ng/.test(d.readyState)?this.on("DOMContentLoaded",function(){l($)}):l($);return this},
        removeClass:function(l){this.e.forEach(function(B){B.className=B.className.replace(new RegExp("\b"+l.replace(" ","\b|\b")+"\b","g")," ")});return this},
        trigger:function(l){this.e.forEach(function(B){z=d.createEvent('HTMLEvents');z.initEvent(l,!0,!1);B.dispatchEvent(z)});return this}
      }

      // Standard events
      ;['click', 'focus', 'keyup'].forEach(function(l) {
        $.fn[l] = function(B){
          return B ? this.on(l,B) : this.trigger(l)
        }
      });

    }        
  }
  else {
    // jQuery fallback
    d.write('<scrip' + 't src="http://code.jquery.com/jquery-1.9.1.min.js"><' + '/script>');
  }
})(window,document)
