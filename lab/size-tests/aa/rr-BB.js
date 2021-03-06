/* picoquery.com/builder/0.2/?3-ffff1 */
(function(w,d,u,z) {
  if (d.querySelectorAll && d.addEventListener) {
    if (!w.$) {

      $ = function() {
        // Allow to create new instances without new
        return function(r,rr) {
          return new P(r,rr);
        };
      }();

      // constructor
      function P(r,rr){if("s"<typeof r)if("<"==r[0]){z=d.createElement("div");z.innerHTML=r;this.e=[z.firstChild]}else this.e=[].slice.call(d.querySelectorAll(r));else{if(typeof r == "function")return $(d).ready(r);this.e=r.nodeType?[r]:r instanceof P?r.e:r.length?[].slice.call(r):[]}for(b=0;b<this.e.length;b++)this[b]=this.e[b];this.length=this.e.length};

      // methods
      $.fn = P.prototype = {
        addClass:function(r){this.e.forEach(function(B){B.classList?B.classList.add(r):B.className+=" "+r});return this},
        append:function(){z=[].slice.call(arguments);this.e.forEach(function(B){z.forEach(function(r){$(r).e.forEach(function(c){B.appendChild(c)})})});return this},
        appendTo:function(r){this.e.forEach(function(el){$(r).append(el)});return this},
        css:function(r,rr){u===rr?this.e[0].style[r]:this.e.forEach(function(B){B.style[r]=rr});return this},
        each:function(r){this.e.forEach(function(B,BB){r.call(B,BB,B)});return this},
        first:function(){return $(this.e[0])},
        get:function(r){return u===r?this.e:this.e[r]},
        hide:function(){this.css('display','none')},
        next:function(selector){return $(this.e.map(function(r){return a['nextElementSibling']}))},
        on:function(r,rr){this.e.forEach(function(B){B.addEventListener(r,rr,!1)});return this},
        parent:function(selector){return $(this.e.map(function(r){return r['parentElement']}))},
        ready:function(r){/^u|ng/.test(d.readyState)?this.on("DOMContentLoaded",function(){r($)}):r($);return this},
        removeClass:function(r){this.e.forEach(function(B){B.className=B.className.replace(new RegExp("\b"+r.replace(" ","\b|\b")+"\b","g")," ")});return this},
        trigger:function(r){this.e.forEach(function(B){z=d.createEvent('HTMLEvents');z.initEvent(r,!0,!1);B.dispatchEvent(z)});return this}
      }

      // Standard events
      ;['click', 'focus', 'keyup'].forEach(function(r) {
        $.fn[r] = function(B){
          return r ? this.on(r,B) : this.trigger(r)
        }
      });

    }        
  }
  else {
    // jQuery fallback
    d.write('<scrip' + 't src="http://code.jquery.com/jquery-1.9.1.min.js"><' + '/script>');
  }
})(window,document)
