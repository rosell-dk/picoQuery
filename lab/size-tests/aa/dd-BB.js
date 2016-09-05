/* picoquery.com/builder/0.2/?3-ffff1 */
(function(w,d,u,z) {
  if (d.querySelectorAll && d.addEventListener) {
    if (!w.$) {

      $ = function() {
        // allow to create new instances without new
        return function(d,dd) {
          return new P(d,dd);
        };
      }();

      // constructor
      function P(d,dd){if("s"<typeof d)if("<"==d[0]){z=d.createElement("div");z.innerHTML=d;this.e=[z.firstChild]}else this.e=[].slice.call(d.querySelectorAll(d));else{if(typeof d == "function")return $(d).ready(d);this.e=d.nodeType?[d]:d instanceof P?d.e:d.length?[].slice.call(d):[]}for(b=0;b<this.e.length;b++)this[b]=this.e[b];this.length=this.e.length};

      // methods
      $.fn = P.prototype = {
        addClass:function(d){this.e.forEach(function(B){B.classList?B.classList.add(d):B.className+=" "+d});return this},
        append:function(){z=[].slice.call(arguments);this.e.forEach(function(B){z.forEach(function(d){$(d).e.forEach(function(c){B.appendChild(c)})})});return this},
        appendTo:function(d){this.e.forEach(function(el){$(d).append(el)});return this},
        css:function(d,dd){u===dd?this.e[0].style[d]:this.e.forEach(function(B){B.style[d]=dd});return this},
        each:function(d){this.e.forEach(function(B,BB){d.call(B,BB,B)});return this},
        first:function(){return $(this.e[0])},
        get:function(d){return u===d?this.e:this.e[d]},
        hide:function(){this.css('display','none')},
        next:function(selector){return $(this.e.map(function(d){return a['nextElementSibling']}))},
        on:function(d,dd){this.e.forEach(function(B){B.addEventListener(d,dd,!1)});return this},
        parent:function(selector){return $(this.e.map(function(d){return d['parentElement']}))},
        ready:function(d){/^u|ng/.test(d.readyState)?this.on("DOMContentLoaded",function(){d($)}):d($);return this},
        removeClass:function(d){this.e.forEach(function(B){B.className=B.className.replace(new RegExp("\b"+d.replace(" ","\b|\b")+"\b","g")," ")});return this},
        trigger:function(d){this.e.forEach(function(B){z=d.createEvent('HTMLEvents');z.initEvent(d,!0,!1);B.dispatchEvent(z)});return this}
      }

      // Standard events
      ;['click', 'focus', 'keyup'].forEach(function(d) {
        $.fn[d] = function(B){
          return B ? this.on(d,B) : this.trigger(d)
        }
      });

    }        
  }
  else {
    // jQuery fallback
    d.write('<scrip' + 't src="http://code.jquery.com/jquery-1.9.1.min.js"><' + '/script>');
  }
})(window,document)
