/* picoquery.com/builder/0.2/?3-fff7 */
(function(w,d,u,z) {

  if (d.querySelectorAll && d.addEventListener) {
    if (!w.$) {

      $ = function() {
        // Allow to create new instances without new
        return function(a,b) {
          return new P(a,b);
        };
      }();

      // constructor
      function P(a,c){if(typeof a>"s")if("<"==a[0]){z=d.createElement("div");z.innerHTML=a;this.e=[z.firstChild]}else this.e=[].slice.call(d.querySelectorAll(a));else{if(typeof a == "function")return $(d).ready(a);this.e=a.nodeType?[a]:a instanceof P?a.e:a.length?[].slice.call(a):[]}};

      // static methods
      $.grep = function(elems, callback, inv) {
        return [].filter.call(elems, callback);
      }

      // prototype methods
      $.fn = P.prototype = {
//      var o = {
//        addClass:function(a){this.e.forEach(function(b){b.classList?b.classList.add(a):b.className+=" "+a});return this},
        append:function(){z=[].slice.call(arguments);this.e.forEach(function(b){z.forEach(function(a){$(a).e.forEach(function(c){b.appendChild(c)})})});return this},
        appendTo:function(t){this.e.forEach(function(el){$(t).append(el)});return this},
        css:function(a,b){u===b?this.e[0].style[a]:this.e.forEach(function(c){c.style[a]=b});return this},
//        each:function(a){this.e.forEach(function(b,c){a.call(b,c,b)});return this},
        first:function(){return $(this.e[0])},
        filter:function(selector){var match,parent=element.parentNode,temp=!parent;if(temp)(parent=tempParent).appendChild(element);match=~parent.querySelectorAll(selector).indexOf(element);temp&&tempParent.removeChild(element);return match},
        each:function(a){this.e.forEach(function(b,c){a.call(b,c,b)});return this},
        get:function(a){return u===a?this.e:this.e[a]},
        hide:function(fn){this.css('display','none')},
        on:function(a,b){this.e.forEach(function(c){c.addEventListener(a,b,!1)});return this},
        ready:function(a){if(/^u|ng/.test(document.readyState))this.on("DOMContentLoaded",function(){a($)});else a($);return this},
        removeClass:function(b){this.e.forEach(function(a){a.className=a.className.replace(new RegExp("\b"+b.replace(" ","\b|\b")+"\b","g")," ")});return this},
        trigger:function(a){this.e.forEach(function(b){z=d.createEvent('HTMLEvents');z.initEvent(a,!0,!1);b.dispatchEvent(z)});return this}
      }

      var fns = [
        // addClass(className) (no foreach! - its provided for)
        function(el,className){el.classList?el.classList.add(className):el.className+=" "+className},
      ];
      ;['addClass','each'].forEach(function(a,i) {
        P.prototype[a] = function() {
          // The first functions are those, which has to be
          // wrapped in a forEach
          if (i<2) {
            var args = arguments;
            this.e.forEach(function(el) {
              fns[i].call(null, el, args[0], args[1]);
            });
            return this;
          }
          // For the rest of the functions, we return this,
          // unless the function returns something else
          var v = fns[i].apply(this, arguments);
          return (v==u?this:v);
        }
      });


/*
      for (var pp in o) {
        P.prototype[pp] = function() {
//          alert(pp);
          o[pp].apply(this, arguments);
        }
      }
console.log(P.prototype);
*/
      $.fn = P.prototype;
      jQuery = $;
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
    document.write('<scrip' + 't src="http://code.jquery.com/jquery-1.9.1.min.js"><' + '/script>');
  }
})(window,document)


