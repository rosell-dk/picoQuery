/* picoQuery.com/builder/ */
(function(w,d) {

  // helpers
  function e($,f){$.e.forEach(f);return $}
  function u(a,b){return b===a}
  function t(a){return[].slice.call(a)}

  // constructor
  function P(a,c){if("string"===typeof a)if("<"==a.charAt(0)){var b=d.createElement("div");b.innerHTML=a;this.e=[b.firstChild]}else this.e=t(d.querySelectorAll(a));else{if(typeof a == "function")return $(d).ready(a);this.e=a.nodeType?[a]:a instanceof P?a.e:a.length?t(a):[]}};

  // methods
  P.prototype = {
    addClass:function(a){return e(this,function(b){b.classList?b.classList.add(a):b.className+=" "+a})},
    append:function(){var a=arguments;e(this,function(el){for(var i=0;i<a.length;i++){e($(a[i]),function(el2){el.appendChild(el2)})}})},
    appendTo:function(t){e(this,function(el){t.append(el)})},
    click:function(fn){this.on('click',fn);return this},
    css:function(a,b){return u(b)?this.e[0].style[a]:e(this,function(c){c.style[a]=b})},
    each:function(fn){e(this,function(el,i){fn.call(el,i,el)});return this},
    first:function(){return $(this.e[0])},
    get:function(a){return u(a)?this.e:this.e[a]},
    hide:function(fn){this.css('display','none')},
    on:function(a,b){return e(this,function(c){c.addEventListener(a,b,!1)})},
    ready:function(a){if(/^u|ng/.test(document.readyState))this.on("DOMContentLoaded",function(){a($)});else a($);return this},
    removeClass:function(b){return e(this,function(a){a.className=a.className.replace(new RegExp("\b"+b.replace(" ","\b|\b")+"\b","g")," ")})},

    _ev: function(type,fn) {
      if (fn === undefined) {
          return this.trigger(type);
        } 
      else {
        return this.on(type,fn);
      }
    }

  }
  [].forEach.call(['click', 'focus', 'dut'], function(type) {
    P$.prototype[type] = function(fn){
      return this._ev(type, fn);
    }
  });

  if (!w.$) {
    w.$ = function() {
      // Allow to create new instances without new
      return function(a,b) {
        return new P(a,b);
      };
    }();

    // Fallback to jQuery
    if ((!d.querySelectorAll) || (!d.addEventListener)) {
      document.write('<scrip' + 't src="https://code.jquery.com/jquery-1.9.1.min.js"><' + '/script>');
    }
  }
})(window,document)


