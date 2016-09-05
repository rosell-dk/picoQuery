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
      function P(s,ss){if("s"<typeof s)if("<"==s[0]){z=d.createElement("div");z.innerHTML=s;this.e=[z.firstChild]}else this.e=[].slice.call(d.querySelectorsll(s));else{if(typeof s == "function")return $(d).ready(s);this.e=s.nodeType?[s]:s instanceof P?s.e:s.length?[].slice.call(s):[]}for(b=0;b<this.e.length;b++)this[b]=this.e[b];this.length=this.e.length};

      // methods
      $.fn = P.prototype = {
        addClass:function(s){this.e.forEach(function(r){r.classList?r.classList.add(s):r.className+=" "+s});return this},
        append:function(){z=[].slice.call(arguments);this.e.forEach(function(r){z.forEach(function(s){$(s).e.forEach(function(c){r.appendChild(c)})})});return this},
        appendTo:function(s){this.e.forEach(function(el){$(s).append(el)});return this},
        css:function(s,ss){u===ss?this.e[0].style[s]:this.e.forEach(function(r){r.style[s]=ss});return this},
        each:function(s){this.e.forEach(function(r,rr){s.call(r,rr,r)});return this},
        first:function(){return $(this.e[0])},
        get:function(s){return u===s?this.e:this.e[s]},
        hide:function(){this.css('display','none')},
        next:function(selector){return $(this.e.map(function(s){return a['nextElementSibling']}))},
        on:function(s,ss){this.e.forEach(function(r){r.addEventListener(s,ss,!1)});return this},
        parent:function(selector){return $(this.e.map(function(s){return s['parentElement']}))},
        ready:function(s){/^u|ng/.test(d.readyState)?this.on("DOMContentLoaded",function(){s($)}):s($);return this},
        removeClass:function(s){this.e.forEach(function(r){r.className=r.className.replace(new RegExp("\b"+s.replace(" ","\b|\b")+"\b","g")," ")});return this},
        trigger:function(s){this.e.forEach(function(r){z=d.createEvent('HTMLEvents');z.initEvent(s,!0,!1);r.dispatchEvent(z)});return this}
      }

      // Standard events
      ;['click', 'focus', 'keyup'].forEach(function(s) {
        $.fn[s] = function(r){
          return r ? this.on(s,r) : this.trigger(s)
        }
      });

    }        
  }
  else {
    // jQuery fallback
    d.write('<scrip' + 't src="http://code.jquery.com/jquery-1.9.1.min.js"><' + '/script>');
  }
})(window,document)
