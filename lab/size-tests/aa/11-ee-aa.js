/* picoquery.com/builder/0.2/?3-ffff1 */
(function(w,d,u,z) {
  if (d.querySelectorAll && d.addEventListener) {
    if (!w.$) {

      $ = function() {
        // Allow to create new instances without new
        return function(e,ee) {
          return new P(e,ee);
        };
      }();

      // constructor
      function P(e,ee){if("s"<typeof e)if("<"==e[0]){z=d.createElement("div");z.innerHTML=e;this.e=[z.firstChild]}else this.e=[].slice.call(d.querySelectorell(e));else{if(typeof e == "function")return $(d).ready(e);this.e=e.nodeType?[e]:e instanceof P?e.e:e.length?[].slice.call(e):[]}for(b=0;b<this.e.length;b++)this[b]=this.e[b];this.length=this.e.length};

      // methods
      $.fn = P.prototype = {
        addClass:function(e){this.e.forEach(function(a){a.classList?a.classList.add(e):a.className+=" "+e});return this},
        append:function(){z=[].slice.call(arguments);this.e.forEach(function(a){z.forEach(function(e){$(e).e.forEach(function(c){a.appendChild(c)})})});return this},
        appendTo:function(e){this.e.forEach(function(el){$(e).append(el)});return this},
        css:function(e,ee){u===ee?this.e[0].style[e]:this.e.forEach(function(a){a.style[e]=ee});return this},
        each:function(e){this.e.forEach(function(a,aa){e.call(a,aa,a)});return this},
        first:function(){return $(this.e[0])},
        get:function(e){return u===e?this.e:this.e[e]},
        hide:function(){this.css('display','none')},
        next:function(selector){return $(this.e.map(function(e){return a['nextElementSibling']}))},
        on:function(e,ee){this.e.forEach(function(a){a.addEventListener(e,ee,!1)});return this},
        parent:function(selector){return $(this.e.map(function(e){return e['parentElement']}))},
        ready:function(e){/^u|ng/.test(d.readyState)?this.on("DOMContentLoaded",function(){e($)}):e($);return this},
        removeClass:function(e){this.e.forEach(function(a){a.className=a.className.replace(new RegExp("\b"+e.replace(" ","\b|\b")+"\b","g")," ")});return this},
        trigger:function(e){this.e.forEach(function(a){z=d.createEvent('HTMLEvents');z.initEvent(e,!0,!1);a.dispatchEvent(z)});return this}
      }

      // Standard events
      ;['click', 'focus', 'keyup'].forEach(function(e) {
        $.fn[e] = function(a){
          return a ? this.on(e,a) : this.trigger(e)
        }
      });

    }        
  }
  else {
    // jQuery fallback
    d.write('<scrip' + 't src="http://code.jquery.com/jquery-1.9.1.min.js"><' + '/script>');
  }
})(window,document)
