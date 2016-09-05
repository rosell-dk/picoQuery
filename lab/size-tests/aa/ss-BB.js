/* picoquery.com/builder/0.2/?3-ffff1 */
(function(w,d,u,z) {
  if (d.querySelectorAll && d.addEventListener) {
    if (!w.$) {

      $ = function() {
        // Allow to create new instances without new
        return function(s,ss) {
          return new P(s,ss);
        };
      }();

      // constructor
      function P(s,ss){if("s"<typeof s)if("<"==s[0]){z=d.createElement("div");z.innerHTML=s;this.e=[z.firstChild]}else this.e=[].slice.call(d.querySelectorAll(s));else{if(typeof s == "function")return $(d).ready(s);this.e=s.nodeType?[s]:s instanceof P?s.e:s.length?[].slice.call(s):[]}for(b=0;b<this.e.length;b++)this[b]=this.e[b];this.length=this.e.length};

      // methods
      $.fn = P.prototype = {
        addClass:function(s){this.e.forEach(function(B){B.classList?B.classList.add(s):B.className+=" "+s});return this},
        append:function(){z=[].slice.call(arguments);this.e.forEach(function(B){z.forEach(function(s){$(s).e.forEach(function(c){B.appendChild(c)})})});return this},
        appendTo:function(s){this.e.forEach(function(el){$(s).append(el)});return this},
        css:function(s,ss){u===ss?this.e[0].style[s]:this.e.forEach(function(B){B.style[s]=ss});return this},
        each:function(s){this.e.forEach(function(B,BB){s.call(B,BB,B)});return this},
        first:function(){return $(this.e[0])},
        get:function(s){return u===s?this.e:this.e[s]},
        hide:function(){this.css('display','none')},
        next:function(selector){return $(this.e.map(function(s){return a['nextElementSibling']}))},
        on:function(s,ss){this.e.forEach(function(B){B.addEventListener(s,ss,!1)});return this},
        parent:function(selector){return $(this.e.map(function(s){return s['parentElement']}))},
        ready:function(s){/^u|ng/.test(d.readyState)?this.on("DOMContentLoaded",function(){s($)}):s($);return this},
        removeClass:function(s){this.e.forEach(function(B){B.className=B.className.replace(new RegExp("\b"+s.replace(" ","\b|\b")+"\b","g")," ")});return this},
        trigger:function(s){this.e.forEach(function(B){z=d.createEvent('HTMLEvents');z.initEvent(s,!0,!1);B.dispatchEvent(z)});return this}
      }

      // Standard events
      ;['click', 'focus', 'keyup'].forEach(function(s) {
        $.fn[s] = function(B){
          return B ? this.on(s,B) : this.trigger(s)
        }
      });

    }        
  }
  else {
    // jQuery fallback
    d.write('<scrip' + 't src="http://code.jquery.com/jquery-1.9.1.min.js"><' + '/script>');
  }
})(window,document)
