/* picoquery.com/builder/0.2/?3-ffff1 */
(function(w,d,u,z) {
  if (d.querySelectorAll && d.addEventListener) {
    if (!w.$) {

      $ = function() {
        // allow to create new instances without new
        return function(A,AA) {
          return new P(A,AA);
        };
      }();

      // constructor
      function P(A,AA){if("s"<typeof A)if("<"==A[0]){z=d.createElement("div");z.innerHTML=A;this.e=[z.firstChild]}else this.e=[].slice.call(d.querySelectorAll(A));else{if(typeof A == "function")return $(d).ready(A);this.e=A.nodeType?[A]:A instanceof P?A.e:A.length?[].slice.call(A):[]}for(b=0;b<this.e.length;b++)this[b]=this.e[b];this.length=this.e.length};

      // methods
      $.fn = P.prototype = {
        addClass:function(A){this.e.forEach(function(B){B.classList?B.classList.add(A):B.className+=" "+A});return this},
        append:function(){z=[].slice.call(arguments);this.e.forEach(function(B){z.forEach(function(A){$(A).e.forEach(function(c){B.appendChild(c)})})});return this},
        appendTo:function(A){this.e.forEach(function(el){$(A).append(el)});return this},
        css:function(A,AA){u===AA?this.e[0].style[A]:this.e.forEach(function(B){B.style[A]=AA});return this},
        each:function(A){this.e.forEach(function(B,BB){A.call(B,BB,B)});return this},
        first:function(){return $(this.e[0])},
        get:function(A){return u===A?this.e:this.e[A]},
        hide:function(){this.css('display','none')},
        next:function(selector){return $(this.e.map(function(A){return a['nextElementSibling']}))},
        on:function(A,AA){this.e.forEach(function(B){B.addEventListener(A,AA,!1)});return this},
        parent:function(selector){return $(this.e.map(function(A){return A['parentElement']}))},
        ready:function(A){/^u|ng/.test(d.readyState)?this.on("DOMContentLoaded",function(){A($)}):A($);return this},
        removeClass:function(A){this.e.forEach(function(B){B.className=B.className.replace(new RegExp("\b"+A.replace(" ","\b|\b")+"\b","g")," ")});return this},
        trigger:function(A){this.e.forEach(function(B){z=d.createEvent('HTMLEvents');z.initEvent(A,!0,!1);B.dispatchEvent(z)});return this}
      }

      // Standard events
      ;['click', 'focus', 'keyup'].forEach(function(A) {
        $.fn[A] = function(B){
          return B ? this.on(A,B) : this.trigger(A)
        }
      });

    }        
  }
  else {
    // jQuery fallback
    d.write('<scrip' + 't src="http://code.jquery.com/jquery-1.9.1.min.js"><' + '/script>');
  }
})(window,document)
