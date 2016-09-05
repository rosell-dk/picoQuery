/* picoquery.com/builder/0.2/?3-ffff1 */
(function(w,d,u,z) {
  if (d.querySelectorAll && d.addEventListener) {
    if (!w.$) {

      $ = function() {
        // allow to create new instances without new
        return function(a,b) {
          return new P(a,b);
        };
      }();

      // constructor
      function P(a,b){if("s"<typeof a)if("<"==a[0]){z=d.createElement("div");z.innerHTML=a;this.e=[z.firstChild]}else this.e=[].slice.call(d.querySelectorAll(a));else{if(typeof a == "function")return $(d).ready(a);this.e=a.nodeType?[a]:a instanceof P?a.e:a.length?[].slice.call(a):[]}for(b=0;b<this.e.length;b++)this[b]=this.e[b];this.length=this.e.length};

      // methods
      $.fn = P.prototype = {
        addClass:function(a){this.e.forEach(function(aa){aa.classList?aa.classList.add(a):aa.className+=" "+a});return this},
        append:function(){z=[].slice.call(arguments);this.e.forEach(function(aa){z.forEach(function(a){$(a).e.forEach(function(c){aa.appendChild(c)})})});return this},
        appendTo:function(a){this.e.forEach(function(el){$(a).append(el)});return this},
        css:function(a,b){u===b?this.e[0].style[a]:this.e.forEach(function(aa){aa.style[a]=b});return this},
        each:function(a){this.e.forEach(function(aa,bb){a.call(aa,bb,aa)});return this},
        first:function(){return $(this.e[0])},
        get:function(a){return u===a?this.e:this.e[a]},
        hide:function(){this.css('display','none')},
        next:function(selector){return $(this.e.map(function(a){return a['nextElementSibling']}))},
        on:function(a,b){this.e.forEach(function(aa){aa.addEventListener(a,b,!1)});return this},
        parent:function(selector){return $(this.e.map(function(a){return a['parentElement']}))},
        ready:function(a){/^u|ng/.test(d.readyState)?this.on("DOMContentLoaded",function(){a($)}):a($);return this},
        removeClass:function(a){this.e.forEach(function(aa){aa.className=aa.className.replace(new RegExp("\b"+a.replace(" ","\b|\b")+"\b","g")," ")});return this},
        trigger:function(a){this.e.forEach(function(aa){z=d.createEvent('HTMLEvents');z.initEvent(a,!0,!1);aa.dispatchEvent(z)});return this}
      }

      // Standard events
      ;['click', 'focus', 'keyup'].forEach(function(a) {
        $.fn[a] = function(aa){
          return aa ? this.on(a,aa) : this.trigger(a)
        }
      });

    }        
  }
  else {
    // jQuery fallback
    d.write('<scrip' + 't src="http://code.jquery.com/jquery-1.9.1.min.js"><' + '/script>');
  }
})(window,document)
