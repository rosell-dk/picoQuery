/*
IE9 plus-version

Or more specific: 
This library works on browsers that support the following features:
- querySelectorAll  http://caniuse.com/#feat=queryselector
- addEventListener  http://caniuse.com/#feat=addeventlistener

This mounts to support for these browsers:
- IE9+
- Edge 12+
- Firefox 3.5+
- Chrome 4+
- Safari 3.1+
- IOS Safari 3.2+
- Opera Mini 8+
- Android Browser 2.1+
- Blackberry browser 10+
- Chrome for Android 47+
- Firefox for Android 44+
- IE mobile 10+
- UC Browser for Android 9.9+



This file contains easy to read scripts with comments.
You will turn to this file if you are interested in the inner mechanisms.
*/

function p$(sel) {
  return new P$(sel);
}

// TODO: also use second argument, because of this syntax:
//          http://stackoverflow.com/questions/10619445/the-prefered-way-of-creating-a-new-element-with-jquery
// api: http://api.jquery.com/jQuery/
function P$(a,b) {
  if (typeof a === 'string') {
    if (a.charAt(0) == '<') {
      var el = document.createElement('div');
      el.innerHTML = a;
      this._v = [el.firstChild];
    }
    else {
      // TODO:
      // Is it actually neccesary to turn the NodeList into a simple array?
      // TODO: Check out "Browser compatibility" section here: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection
      this._v = Array.prototype.slice.call(document.querySelectorAll(a));
    }
  } 
  // DOM Element
  else if (a.nodeType) {
    this._v = [a];
  } 
  // picoQuery object (clone it)
  else if (a instanceof P$) {
    this._v = a._v;
  }
  // Array (or DOM List)
  else if (a.length) {
    this._v = Array.prototype.slice.call(a);
  }
  else {
    this._v = [];
  }
}

P$.fn = P$.prototype = {

  // Core
  // ====

  // Each (but function is only passed the element, unlike jquery's each)
  _e: function(fn) {
    [].forEach.call(this._v, fn);
    return this;
  },


  // Basic (commonly needed in above-the-fold scripts)
  // =================================================

  // Iterate over a jQuery object, executing a function for each matched element. 
  // .each( function )
  //  function
  //  Type: Function( Integer index, Element element )
  //  A function to execute for each matched element.
  //  http://api.jquery.com/each/
  each: function(fn) {    
    this._e(function(el, i) {
      fn.call(el, i, el);
    });
    return this;
  },

  get: function(i) {
    return this._v[i];
  },

  css: function(n,v) {
    if (v === undefined) {
      return this._v[0].style[n];
    } 
    else {
      return this._e(function(el) {
        el.style[n] = v;
      });
    }
  },

  addClass: function(v) {
    return this._e(function(el) {
      // http://caniuse.com/#feat=classlist
      if (el.classList) {
        el.classList.add(v);
      } 
      else {
        el.className+=' '+v;
      }
    });
  },

  /* Insert content, specified by the parameter, to the end of each element in the set of matched elements.
     http://api.jquery.com/append/

     .append( content [, content ] )
        content
        Type: htmlString or Element or Array or jQuery
        DOM element, array of elements, HTML string, or jQuery object to insert at the end of each element in the set of matched elements.
     http://api.jquery.com/append/#append-content-content

     http://api.jquery.com/append/#append-function

     Dependencies: 
  */
  append: function() {
    var args = arguments;
    this._e(function(el) {
      for (var i=0; i<args.length; i++) {
        p$(args[i])._e(function(el2) {
          el.appendChild(el2);
        });
      }
    });    
  },

  // Insert every element in the set of matched elements to the end of the target.
  // @param target: Type: Selector or htmlString or Element or Array or jQuery. A selector, element, HTML string, array of elements, or jQuery object; the matched set of elements will be inserted at the end of the element(s) specified by this parameter.
  // http://api.jquery.com/appendTo/
  appendTo: function(t) {
    this._e(function(el) {
      t.append(el);
    });    
    
  },

  // Convenience (nice-to-haves in above-the-fold scripts)
  // =====================================================

  // Partial implementation of jQuery hide. No effects, and initial display value is not remembered
  hide: function(fn) {
    this.css('display','none');
  },

  first: function(fn) {
    return p$(this._v[0]);
  },

  removeClass: function(className) {
    return this._e(function(el) {
      if (el.classList)
        el.classList.remove(className);
      else
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    });
  },


  // Events. Probably not needed for above-the-fold scripting
  // TODO: read this: http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
  // (this will answer this question: http://stackoverflow.com/questions/18094334/feature-detect-support-for-domcontentloaded-event)
  // ========================================================

  on: function(type,fn) {
    return this._e(function(el) {
      el.addEventListener(type,fn,false);
    });
  },

  // Execute all handlers and behaviors attached to the matched elements for the given event type.
  //
  // http://api.jquery.com/trigger/
  // http://api.jquery.com/trigger/#trigger-eventType-extraParameters
  // http://api.jquery.com/trigger/#trigger-event-extraParameters
    
  trigger: function(type) {
    // TODO: This might not be compatible with all target browsers
    // Go look here: https://gist.github.com/dciccale/6226151
    // and here: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
    // http://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
    // https://www.google.dk/search?q=cross+browser+trigger+event&oq=cross+browser+trigger&aqs=chrome.1.69i57j0l2.3983j0j7&client=ubuntu&sourceid=chrome&es_sm=93&ie=UTF-8
    // https://gist.github.com/dciccale/6226151

    this._e(function(el) {
      
    });

    var ev = document.createEvent('HTMLEvents');
    ev.initEvent(type,true,false);
    this._v[0].dispatchEvent(ev);
    return this;
  },

  // Trigger DOM element events.
  _ev: function(type,fn) {

    if (fn === undefined) {
      /* TODO: Include directly, if no 'trigger' feature. Otherwise call this.trigger */
      /*
      var ev = document.createEvent('HTMLEvents');
      ev.initEvent(type,true,false);
      this._v[0].dispatchEvent(ev);
      return this;
      */
      return this.trigger(type);
    } 
    else {
      return this.on(type,fn);
    }
  },

  // Individual events
  // Note: You need the first two methods ("on" and "_ev") for these to work
  click: function(fn){return this._ev('click', fn);},
  focus: function(fn){return this._ev('focus', fn);},
  keyup: function(fn){return this._ev('keyup', fn);},

}


