<?php
header("Content-type: text/javascript;charset=UTF-8");
require_once('inc/picoquery-features.inc');

$build = $_GET['build'];
if (!isset($build)) {
  $build = '0';
}

//global $features_obj;
$features_obj = array();
foreach ($features as $i => $feature_id) {
  $features_obj[$feature_id] = array('enabled' => 0);
}


$build_chars = str_split($build);
array_shift($build_chars);
foreach ($build_chars as $i => $char) {
  $four_flags = hexdec($char);
//  echo $four_flags . '<br>';
  for ($j=0; $j<4; $j++) {
    if (($four_flags & pow(2,$j)) > 0) {
      $features_obj[$features[$i * 4 + $j]]['enabled'] = 1;
    }
  }
}


function feat($feature_id) {
  global $features_obj;
//print_r($features_obj);
  return $features_obj[$feature_id]['enabled'];
} 

//echo feat('.addClass()');
//echo feat('.css()');
?>
/* picoQuery build: <?php echo $build ?> */
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
  // internal "each"-function (has different signature than .each(), which results in less code)
  _e: function(fn) {
    [].forEach.call(this._v, fn);
    return this;
  },

<?php if (feat('.each()')): ?>
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
<?php endif; ?>
<?php if (feat('.get()')): ?>
  get: function(i) {
    return this._v[i];
  },
<?php endif; ?>
<?php if (feat('.css()')): ?>
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
<?php endif; ?>
<?php if (feat('.addClass()')): ?>
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
<?php endif; ?>
<?php if (feat('.append()')): ?>

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
<?php endif; ?>
<?php if (feat('.appendTo()')): ?>
  // Insert every element in the set of matched elements to the end of the target.
  // @param target: Type: Selector or htmlString or Element or Array or jQuery. A selector, element, HTML string, array of elements, or jQuery object; the matched set of elements will be inserted at the end of the element(s) specified by this parameter.
  // http://api.jquery.com/appendTo/
  appendTo: function(t) {
    this._e(function(el) {
      t.append(el);
    });    
    
  },
<?php endif; ?>

<?php if (feat('.hide()')): ?>

  // Partial implementation of jQuery hide. No effects, and initial display value is not remembered
  hide: function(fn) {
    this.css('display','none');
  },
<?php endif; ?>
<?php if (feat('.first()')): ?>
  first: function(fn) {
    return p$(this._v[0]);
  },
<?php endif; ?>
<?php if (feat('.removeClass()')): ?>
  removeClass: function(className) {
    return this._e(function(el) {
      if (el.classList)
        el.classList.remove(className);
      else
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    });
  },
<?php endif; ?>
<?php
  // Events. Probably not needed for above-the-fold scripting
  // TODO: read this: http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
  // (this will answer this question: http://stackoverflow.com/questions/18094334/feature-detect-support-for-domcontentloaded-event)
  // ========================================================
?>
<?php if (feat('.on()')): ?>
  on: function(type,fn) {
    return this._e(function(el) {
      el.addEventListener(type,fn,false);
    });
  },
<?php endif; ?>
<?php if (feat('.trigger()')): ?>
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
<?php endif; ?>
  // Trigger DOM element events.
  _ev: function(type,fn) {
    if (fn === undefined) {
  <?php if (feat('.trigger()')): ?>
      return this.trigger(type);
  <?php else: ?>
      var ev = document.createEvent('HTMLEvents');
      ev.initEvent(type,true,false);
      this._v[0].dispatchEvent(ev);
      return this;
  <?php endif; ?>
    } 
    else {
      return this.on(type,fn);
    }
  },

<?php if (feat('.click()')): ?>
  click: function(fn){return this._ev('click', fn);},
<?php endif; ?>
<?php if (feat('.focus()')): ?>
  focus: function(fn){return this._ev('focus', fn);},
<?php endif; ?>
<?php if (feat('.keyup()')): ?>
  keyup: function(fn){return this._ev('keyup', fn);},
<?php endif; ?>
}


