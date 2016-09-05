/* picoquery.com/builder/0.2/?3-ffff1 */
(function(w,d,u,z) {
  if (d.querySelectorAll && d.addEventListener) {
    if (!w.$) {

      $ = function() {
        // Allow to create new instances without new
        return function(a,aa) {
          return new P(a,aa);
        };
      }();

      // constructor
      function P(a,aa){if("s"<typeof a)if("<"==a[0]){z=d.createElement("div");z.innerHTML=a;this.e=[z.firstChild]}else this.e=[].slice.call(d.querySelectorAll(a));else{if(typeof a == "function")return $(d).ready(a);this.e=a.nodeType?[a]:a instanceof P?a.e:a.length?[].slice.call(a):[]}for(b=0;b<this.e.length;b++)this[b]=this.e[b];this.length=this.e.length};

      // methods
      $.fn = P.prototype = {
        hide:function(a,aa){return this.css('display','none')},
        on:function(a,aa){this.e.forEach(function(b){b.addEventListener(a,aa,!1)});return this},
        ready:function(a,aa){/^u|ng/.test(d.readyState)?this.on("DOMContentLoaded",function(){a($)}):a($);return this}
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
