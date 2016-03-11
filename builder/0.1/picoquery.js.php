<?php
header("Content-type: text/javascript;charset=UTF-8");
require_once('features.inc');

if (!isset($_GET['build'])) {
  echo '// no build string supplied!';
}

$build = $_GET['build'];
$tokens = explode('-', $build);


function hexstr2binstr($hexstr) {
  $binstr = '';
  foreach (str_split($hexstr) as $i => $char) {
    $four_flags = hexdec($char);
  //  echo $four_flags . '<br>';
    for ($j=0; $j<4; $j++) {
      if (($four_flags & pow(2,$j)) > 0) {
        $binstr .= '1';
      }
      else {
        $binstr .= '0';
      }
    }
  }
  return $binstr;
}

function hexstr2flagsarray($hexstr, $min_length = 0) {
  $flags = array();
  foreach (str_split($hexstr) as $i => $char) {
    $four_flags = hexdec($char);
  //  echo $four_flags . '<br>';
    for ($j=0; $j<4; $j++) {
      if (($four_flags & pow(2,$j)) > 0) {
        $flags[] = TRUE;
      }
      else {
        $flags[] = FALSE;
      }
    }
  }
  while (count($flags) < $min_length) {
    $flags[] = 0;
  }
//  print_r($flags);
  return $flags;
}

list($v, $comments, $min, $features_to_include) = $tokens;
$features_to_include = hexstr2flagsarray($features_to_include);

list($comments_build_id, $comments_method_signatures, $comments_method_description, $comments_code_notes, $comments_devel_notes) = hexstr2flagsarray($comments, 5);

list($minify_functions, $minify_all) = hexstr2flagsarray($min, 2);

if ($minify_functions || $minify_all) {
  include('lib/JShrink.php');
}

if ($minify_all) {
  ob_start(); 
}

function funcBegin() {
  global $minify_functions;
  if ($minify_functions) {
    ob_start();
  }
}

function funcEnd($indent = '') {
  global $minify_functions;
  if ($minify_functions) {
    $js = ob_get_clean();
    $js = \JShrink\Minifier::minify($js, array('flaggedComments' => false));
    $js = str_replace(array("\n","\r"),"", $js);
    echo $indent . $js;
  }
}

function featBegin($feat_id) {
  global $features_by_id;
  global $comments_method_description;
  global $comments_method_signatures;

  $feature = $features_by_id[$feat_id];
  echo "\n";
  if ($comments_method_description && isset($feature['description'])) {
    echo "\n  // " . $feature['description'] . "\n";
  }
  funcBegin();
}

function featEnd() {
  funcEnd("  ");
}
//$js = \JShrink\Minifier::minify($js, array('flaggedComments' => false));


//global $features_by_id;
$features_by_id = array();
foreach ($features as $i => $feature_obj) {
  $enabled = (isset($features_to_include[$i]) && $features_to_include[$i]);
//  $features_by_id[$feature_id] = array('enabled' => $enabled);

  $feature_obj['enabled'] = $enabled;
  $features_by_id[$feature_obj['id']] = $feature_obj;

//  $features_by_id[$feature_obj['id']]['enabled'] = $enabled;
}

function feat($feature_id) {
  global $features_by_id;
  return $features_by_id[$feature_id]['enabled'];
} 

function include_feature($feat_id) {
  if (!feat($feat_id)) return;
  featBegin($feat_id);

  global $comments_code_notes;
  global $comments_devel_notes;

  $filename = 'inc/' . preg_replace('/[\.\(\)]/', '', $feat_id) . '.inc';
  include($filename);
  featEnd();
}

?><?php if ($comments_build_id): ?>/* picoQuery, build: <?php echo $build ?> */
<?php endif; ?>
<?php funcBegin(); ?>
function p$(sel) {
  return new P$(sel);
}
<?php funcEnd(); ?>

<?php if ($comments_devel_notes): ?>
// TODO: also use second argument, because of this syntax:
//          http://stackoverflow.com/questions/10619445/the-prefered-way-of-creating-a-new-element-with-jquery
// api: http://api.jquery.com/jQuery/

// TODO: Make this._v accessible with array selector []
// http://stackoverflow.com/questions/21077408/how-is-jquery-object-able-to-behave-like-an-array-even-though-it-isnt-one
<?php endif; ?>
<?php funcBegin(); ?>
function P$(a,b) {
  if (typeof a === 'string') {
    if (a.charAt(0) == '<') {
      var el = document.createElement('div');
      el.innerHTML = a;
      this._v = [el.firstChild];
    }
    else {
<?php if ($comments_devel_notes): ?>
      // TODO:
      // Is it actually neccesary to turn the NodeList into a simple array?
      // TODO: Check out "Browser compatibility" section here: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection
<?php endif; ?>
      this._v = Array.prototype.slice.call(document.querySelectorAll(a));
    }
  }
<?php if ($comments_code_notes): ?>
  // DOM Element
<?php endif; ?>
  else if (a.nodeType) {
    this._v = [a];
  } 
<?php if ($comments_code_notes): ?>
  // picoQuery object (clone it)
<?php endif; ?>
  else if (a instanceof P$) {
    this._v = a._v;
  }
<?php if ($comments_code_notes): ?>
  // Array (or DOM List)
<?php endif; ?>
  else if (a.length) {
    this._v = Array.prototype.slice.call(a);
  }
  else {
    this._v = [];
  }
}
<?php funcEnd(); ?>


P$.fn = P$.prototype = {
<?php if ($comments_code_notes): ?>
  // internal "each"-function (has different signature than .each(), which results in less code)
<?php endif; ?>
  <?php funcBegin(); ?>
  _e: function(fn) {
    [].forEach.call(this._v, fn);
    return this;
  },
  <?php funcEnd(); ?>

  <?php funcBegin(); ?>
  <?php if ($comments_code_notes): ?>
  // Trigger DOM element events.
  <?php endif; ?>
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
<?php funcEnd(); ?>
<?php
include_feature('.each()');
include_feature('.addClass()');
include_feature('.append()');
include_feature('.get()');
include_feature('.css()');
include_feature('.appendTo()');
include_feature('.hide()');
include_feature('.first()');
include_feature('.removeClass()');
include_feature('.on()');
include_feature('.trigger()');
include_feature('.click()');
include_feature('.focus()');
include_feature('.keyup()');

?>
<?php
  // Events. Probably not needed for above-the-fold scripting
  // TODO: read this: http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
  // (this will answer this question: http://stackoverflow.com/questions/18094334/feature-detect-support-for-domcontentloaded-event)
  // ========================================================
?>

}
<?php

if ($minify_all) {
  $js = ob_get_clean();
  $js = \JShrink\Minifier::minify($js, array('flaggedComments' => false));
  echo $js;
}
?>
