<?php
header("Content-type: application/javascript;charset=UTF-8");
require_once('features.inc');


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

function flagnames2flagsarray($flag_names, $selected_flags) {
  /* usage: 
    $comment_flags = array('build_id', 'method_signatures');
    $comment_tokens = explode(',', $comments)
    list($comments_build_id, $comments_method_signatures, $comments_method_description, $comments_inline, $comments_devel_notes) = flagnames2flagsarray($comment_flags, $comment_tokens);
*/
  $flagsarray = [];
  foreach ($flag_names as $flag_name) {
//echo isset($selected_flags[$flag_name]) ? 0 : 1;
    $flagsarray[] = in_array($flag_name, $selected_flags) ? TRUE : FALSE;
  }
  return $flagsarray;
}

$use_real_small_function_names_for_helpers = TRUE;
$use_optimized_methods = TRUE;
$include_helpers_as_var = FALSE;
$inline_all_helpers = FALSE;


if (isset($_GET['build'])) {
  $tokens = explode('-', $_GET['build']);
//  list($compactness, $min, $features_to_include) = $tokens;
  list($compactness, $features_to_include) = $tokens;

  $features_to_include = hexstr2flagsarray($features_to_include);

//global $features_by_id;
  foreach ($features_to_include as $index => $flag) {
    if ($flag == TRUE) {
      enableFeatureByIndex($index);
    }
  }

//  list($comments_build_id, $comments_method_signatures, $comments_method_description, $comments_inline, $comments_devel_notes) = hexstr2flagsarray($comments, 5);

//  list($minify_functions, $minify_all) = hexstr2flagsarray($min, 2);

}

elseif (isset($_GET['file'])) {
  print_r($_GET);
}
elseif (isset($_GET['v'])) {
//  print_r($_GET);

  // CDN URL, format #1:     https://cdn.picoquery.com/picoquery0.2-A2fa0.min.js
  // CDN URL, format #2:     https://cdn.picoquery.com/picoquery0.2-addClass-css.min.js
  // Note that build id starts with "A"

  // Builder URL, format #1: http://picoquery.com/builder/0.2/?5-2fa0
  // Builder URL, format #2: http://picoquery.com/builder/0.2/?addClass-css.min.js


  //         http://picoquery.com/build?v=0.2&features=addclass-css-each
  // Builder URL: http://picoquery.com/builder/0.2/basic-click-nofallback.min.js

  // Alternative code URLs
  // https://picoquery.com/code?v=0.2&comments=none&minify=functions,all&fallback=jquery&methods=addclass,css,each
  // or...        https://picoquery.com/code?v=0.2&compactness=8&methods=addclass,css,each
  // or...        https://picoquery.com/src/picoquery0.2-addclass-css-each.min.js [min.js | max.js | readable.js]
  // or...        https://picoquery.com/src/picoquery0.2-full.min.js [min.js | max.js | readable.js]
  // or...        https://picoquery.com/src/picoquery0.2-full-nofallback.min.js [min.js | max.js | readable.js]
  // or...        https://picoquery.com/src/picoquery0.2-basic-click.min.js [min.js | compact.js | .js | max.js]
  // or...        https://picoquery.com/build?v=0.2&features=addclass-css-each

  // http://github.e-sites.nl/zeptobuilder/
  // maybe uglify ?

  // Builder URL: https://picoquery.com/builder/0.2/basic-click-nofallback.min.js

  // or...https://picoquery.com/builder?v=0.2&comments=none&minify=functions,all&fallback=jquery&methods=addclass,css,each
  // CDN URL:     https://cdn.picoquery.com/picoquery0.2.5-0-2000.min.js

  // comments: none | build_id | builder_url | compact_builder_url...
  // minify: none | functions | all
  // fallback: jquery | url to cdn?
  // methods: addclass | css | each | ...  ()

  $v = $_GET['v'];

  
  if (isset($_GET['compactness'])) {
    $compactness = $_GET['compactness'];
    if ($compactness == 'max') {
      $compactness = 10;
    }
    else {
      $compactness = intval($_GET['compactness']);
    }
  }
  else {
/*
    $comments = isset($_GET['comments']) ? $_GET['comments'] : '';
    if ($comments == 'none') {
      $comments = '';
    }
    list($comments_build_id, $comments_method_signatures, $comments_method_description, $comments_inline, $comments_devel_notes) = flagnames2flagsarray(array('build_id', 'method_signatures', 'method_description', 'inline', 'devel_notes'), explode(',', $comments));

    $minify = isset($_GET['minify']) ? $_GET['minify'] : 'functions,all';
    if ($minify == 'none') {
      $minify = '';
    }

    list($minify_functions, $minify_all) = flagnames2flagsarray(array('functions', 'all'), explode(',', $minify));
    */
  }

  $features = $_GET['features'];
  if (isset($features)) {
    $features = explode('-', $features);
//    print_r($features);
    foreach ($features as $index => $feature_nameid) {
      enableFeatureByNameId($feature_nameid);
    }
  }
}

if (isset($compactness)) {
  $comments_devel_notes = $compactness <= 9;
  $comments_inline = $compactness <= 8;
  $comments_method_signatures = $compactness <= 7;

  $minify_functions = $compactness <= 6;
  $comments_method_description = $compactness <= 5;
  $use_optimized_methods = $compactness <= 4;
  $use_real_small_function_names_for_helpers = $compactness <= 3;

  $minify_all = $compactness <= 2;
  $comments_build_id = $compactness <= 1;
}

// Calculate feature flags.
// This variable used in the end of this file for the builder url comment
$feature_flags = array();
foreach ($feature_nameids as $i => $feat) {
  $feature_flags[] = isFeatureEnabled($feat)?1:0;
}

// Dependencies
enableFeatureByNameId('ready'); // Constructor is dependent on this
enableFeatureByNameId('on');
if (isFeatureEnabled('appendTo')) {
  enableFeatureByNameId('append');
}

$enabled_event_methods = array();
foreach ($event_methods_standard as $i => $method_nameid) {
  if (isFeatureEnabled($method_nameid)) {
    $enabled_event_methods[] = $method_nameid;
  }
}
if (count($enabled_event_methods) > 0) {
  enableFeatureByNameId('on');
  enableFeatureByNameId('trigger');
}



if ($minify_functions || $minify_all) {
  include('lib/JShrink.php');
}

ob_start(); 

function funcBegin() {
  global $minify_functions;

  ob_start();
}

function funcEnd($indent = '') {
  global $minify_functions;
  global $comments_inline;

  $js = ob_get_clean();

  if ($minify_functions) {
    $js = \JShrink\Minifier::minify($js, array('flaggedComments' => false));
    $js = str_replace(array("\n","\r"),"", $js);
    $js = str_replace(array(";}"),"}", $js);
  }
  else if (!$comments_inline) {
    $js = str_replace(array(";}"),"}", $js);
    $js = preg_replace('/^/m', '  ', $js);
  }

  echo $indent . $js;

}


//$js = \JShrink\Minifier::minify($js, array('flaggedComments' => false));




/* indents all lines, except first) */
function indent($js, $indent_levels = 0, $indent_first_line = FALSE) {
  $indent = '';
  while ($indent_levels > 0) {
    $indent_levels--;
    $indent .= '  ';
  }
  $js = preg_replace('/^/m', $indent, $js);
  if (!$indent_first_line) {
    $js = preg_replace('/^' . $indent . '/', '', $js);
  }
  return $js;
}


function include_javascript($filename) {
  ob_start();
  include($filename);
  $js = trim(ob_get_clean());

  $readable_version = preg_replace('/\/\/\\s*OPTIMIZED_VERSION\\s*\/\/.*/ms', '', $js);
  $optimized_version = trim(preg_replace('/(.*\/\/\\s*OPTIMIZED_VERSION\\s*\/\/\\s*)/ms', '', $js));

  global $use_optimized_methods;
  if ($use_optimized_methods) {
    $js = $optimized_version;
  }
  else {
    $js = $readable_version;
  }


  global $minify_functions;
  global $comments_inline;

  if ($minify_functions) {
    $js = \JShrink\Minifier::minify($js, array('flaggedComments' => false));
    $js = str_replace(array("\n","\r"),"", $js);
    $js = str_replace(array(";}"),"}", $js);
  }
  else if (!$comments_inline) {
//    $js = str_replace(array(";}"),"}", $js);
//    $js = preg_replace('/^/m', '  ', $js);
  }
  $js .= '[[END-INCLUDE]]';
  return $js;
}


function include_method($feat_nameid) {
  $js = include_javascript('inc/methods/' . $feat_nameid . '.inc');
  $js = indent($js, 4, TRUE);
  echo $js;
}

function include_methods() {
  $files = scandir(getcwd() . '/inc/methods');

  $methods = array();

  foreach ($files as $i => $filename) {
    $m = array();

    // Only include inc files
    if (!preg_match('/(.*).inc$/', $filename, $m)) continue;

    // Only include method if feature is enabled
    $feat_nameid = $m[1];
    if (!isFeatureEnabled($feat_nameid)) continue;

    // Do not include standard event methods
    // - we include them after the prototype declaration
    global $enabled_event_methods;
    if (in_array($feat_nameid, $enabled_event_methods)) continue;

    $methods[] = $feat_nameid;
//    echo $feat_id;
    

  }

  foreach ($methods as $i => $feat_nameid) {
    include_method($feat_nameid);
    if ($i < count($methods) - 1) {
      echo ",\n";
    }
  }


}


function include_constructor() {
  $js = include_javascript('inc/constructor.js');
  $js = indent($js, 3, TRUE);
  echo $js;
}

$helpers = array(
  array('EACH', 'each', 'e'),
  array('IS_FUNCTION', 'isFunction', 'i'),
  array('IS_UNDEFINED', 'isUndefined', 'u'),
  array('TO_ARRAY', 'toArray', 't'),
  array('ITERATE', 'iterate', 'I'),   // Iterate normal array. Use instead of "for (var i=0; ..."
);
$helpers_output = array();
$helpers_inline = array();

// jparser-1-0-0 http://timwhitlock.info/blog/2009/11/jparser-and-jtokenizer-released/
// alternative parsers, tokenizers: http://stackoverflow.com/questions/3571303/is-there-a-javascript-lexer-tokenizer-in-php/36030252#36030252
require 'lib/jtokenizer.php';
// parse javascript arguments - even multiline.
// ie: "value, 'tejst', function(el) {}" => ['args'=>['value', "'text'", 'function(el) {}']]
// If input string has extra code after the last argument, it will be returned in "extra"
function parseArgs($js) {

  /**
   * Get the tokens as an array, just like the php tokenizer token_get_all function
   */
  $tokens = j_token_get_all( $js );
  $numOpenP = 0;

  $args = [''];

  $pushToken = function($t) use (&$args) {
    $args[count($args) - 1] .= $t[1];
  };

  for ($i=0; $i<count($tokens); $i++) {
    $token = $tokens[$i];

    switch ($token[0]) {
      case J_FUNCTION:
        // Skip to first {
        $pushToken($tokens[$i]);
        while (($tokens[$i][1] != '{') && ($i<count($tokens))) {
          $i++;
          $pushToken($tokens[$i]);
        }
        $numOpenBrackets = 1;
        while (($numOpenBrackets>0) && ($i<count($tokens))) {
          $i++;
          $pushToken($tokens[$i]);

          if ($tokens[$i][1] == '{') {
            $numOpenBrackets++;
          }
          if ($tokens[$i][1] == '}') {
            $numOpenBrackets--;
          }
        }
//        $i--;
        break;
      case ',':
        $args[] = '';
        break;
      case '(':
        $numOpenP++;
        $pushToken($token);
        break;
      case ')':
        $numOpenP--;

        if ($numOpenP == -1) {
          // premature end
          $extra = '';
          while ($i<count($tokens)-1) {
            $extra .= $tokens[$i][1];
            $i++;
          }

          return array('args' => $args, 'extra' => $extra);
        }
      default:
//        $args[count($args) - 1] .= $token[1];
//          if ($tokens[$i][1] == ')') $args[count($args) - 1] .= '!!!';
        $pushToken($token);
    }
  }
  return array('args' => $args, 'extra' => '');
}

function include_helpers() {
  global $helpers;
  echo '[[HELPERS]]';

  foreach ($helpers as $i => $helper) {
//    echo '[[HELPER:' . $helper[0] . ']]';

//    funcBegin();

    // Start output buffer so we can indent
    ob_start(); 
    include('inc/helpers/' . $helper[0] . '.inc');
    $js = ob_get_clean();

    global $helpers_output;
    global $helpers_inline;

    // Strip [[INLINE_VERSION]] and below
    $normal_version = preg_replace('/\[\[INLINE_VERSION\]\].*/ms', '', $js);
    $helpers_output[$helper[0]] = $normal_version;

    $inline_version = trim(preg_replace('/(.*\[\[INLINE_VERSION\]\]\\s*)/ms', '', $js));
    $helpers_inline[$i] = $inline_version;


//    echo ',';
//    funcEnd();
//    echo '[[/HELPER]]';
  }
}

function remove_unused_helpers($js) {
  global $helpers;
  global $helpers_output;
  global $helpers_inline;

  $helpers_needed = [];
//echo $js;

  foreach ($helpers as $i => $helper) {

    // Find out if a call to the helper is in the sourcecode
    $numCallsToHelper = preg_match_all('/__' . $helper[0] . '__\\s*\(/', $js);

    // HACK to make ITERATE useable in helpers
/*
    if ($helper == 'ITERATE') {
      numCallsToHelper = 2;
    }*/
    global $inline_all_helpers;
//$inline_all_helpers = TRUE;
// ($helper[0] == 'EACH') || 
    $treshold = 100;
    if (($inline_all_helpers) || (($numCallsToHelper > 0) && ($numCallsToHelper <= $treshold))) {
      // Inline the helper
      // Ie. "if(__IS_FUNCTION__(value))" will become: "if(typeof value == "function")

      /* Multiline:
      return __EACH__(this, function(el) {
        if (el.classList) {
          el.classList.add(value);
        } 
        else {
          el.className += ' ' + value;
        }
      });

      will become:
      return [].forEach.call(this.e, function(el) {
        if (el.classList) {
          el.classList.add(value);
        } 
        else {
          el.className += ' ' + value;
        }
      }););

      */

      for ($x = 0; $x < $numCallsToHelper; $x++) {

        // Get the inline code, ie "typeof [[ARG1]] == "function""
        $inline_code = $helpers_inline[$i];

        // Next, we substitute "[[ARG1]]" with the name of the first argument, ect.

        // The hardest part of doing this is finding the values supplied to the function call.
        // But we have a helper for this, which is lenient enough that it works even though 
        // the string it gets has more code than the list of arguments.
        preg_match('/__' . $helper[0] . '__\\s*\((.*)\[\[END-INCLUDE\]\]/ms', $js, $matches);
        if (count($matches) == 0) {
          echo 'Whoops:' . '/__' . $helper[0] . '__\\s*\((.*)\[\[END-INCLUDE\]\]/ms did not find anything in this string:' . $js;
          continue;
        }
  // if ($helper[0] == 'EACH') {echo $matches[1]; return;}

        // A little quirk: We add ' ', because otherwise an ending "}" is eaten (when methods are minimized)
        $parseResult = parseArgs($matches[1] . ' ');
        $args = $parseResult['args'];
        
        for ($j=0; $j<count($args); $j++) {
          // Do the actual substitution of "[[ARG1]]" etc in the inline code
          $inline_code = preg_replace('/\[\[ARG' . ($j + 1) . '\]\]/', $args[$j], $inline_code);
        }

        // A little quirk: first char of extra is a ")", which we want removed.
        // TODO: It could also be something else, because we do not test.
        // For now, make sure that calls to helpers etc ends immidiately with a ")"
        // That is: Correct usage: "if (__IS_FUNCTION__(a))"
        //          Incorrect usage: if (__IS_FUNCTION__(a) // comment [newline])
  //if ($helper[0] == 'EACH') {echo $parseResult['extra']; return;}

        $extra = ltrim($parseResult['extra']);
  //if ($helper[0] == 'EACH') {echo $extra; return;}
        if (strlen($extra) > 0) $extra = substr($extra, 1);

        //$js = 'EXTRA' . $extra . 'EXTRA';

        $js = preg_replace('/__' . $helper[0] . '__\\s*\(.*\[\[END-INCLUDE\]\]/ms', $inline_code . $extra . '[[END-INCLUDE]]', $js);

  //      $js = preg_replace('/__' . $helper[0] . '__\\s*\(([^,)]+)\)/', $inline_code, $js);

        // First, find the values of arguments. matches[1] will be name of the first argument (ie "value" or "function(el){return el}"), etc
  /*      preg_match('/__' . $helper[0] . '__\\s*\(([^,)]*),?([^,)]*)\\)/', $js, $matches);*/

      }
    }
    else if ($numCallsToHelper >= $treshold) {
      $helpers_needed[] = $i;

      // Fix function calls ("__EACH__(" => "each(", etc)
      global $use_real_small_function_names_for_helpers;
      $js = preg_replace('/__' . $helper[0] . '__\\s*\(/', $helper[$use_real_small_function_names_for_helpers ? 2 : 1] . '(', $js);
    }

  }

  $helper_js = '';
  global $include_helpers_as_var;
  if ($include_helpers_as_var) {
    if (count($helpers_needed) > 0) {
      $helper_js = '  var ';
    }
  }
  foreach ($helpers_needed as $i => $helper_index) {
    $helper = $helpers[$helper_index];
    global $use_real_small_function_names_for_helpers;
    if ($include_helpers_as_var) {
      $helper_js .= $helper[$use_real_small_function_names_for_helpers ? 2 : 1] . ' = ';
      $helper_js .= indent($helpers_output[$helper[0]],1);
    }
    else {
      $js_function = 'function ' . $helper[$use_real_small_function_names_for_helpers ? 2 : 1] . $helpers_output[$helper[0]];
      global $minify_functions;
      if ($minify_functions) {
        $js_function = \JShrink\Minifier::minify($js_function, array('flaggedComments' => false));
        $js_function = str_replace(array("\n","\r"),"", $js_function);
        $js_function = str_replace(array(";}"),"}", $js_function);
        $helper_js .= indent($js_function . "\n", 1, TRUE);
      }
      else {
        $helper_js .= indent($js_function, 1, TRUE);
      }
    }

    if ($include_helpers_as_var) {
      if ($i < count($helpers_needed) - 1) {
        $helper_js .= ',';
      }
    }
  }
  if ($helper_js != '') {
    $helper_js = "\n  // helpers\n" . $helper_js;
  }
  $js = preg_replace('/\[\[HELPERS]\]/', $helper_js, $js);
  $js = preg_replace('/\[\[END-INCLUDE]\]/', '', $js);

  return $js;
}

?>
(function(w,d,u<?php if ($use_optimized_methods) {echo ',z';} // TODO: Detect if u and z are used. u can be tested For example with the javascript parser ?>) {
  if (d.querySelectorAll && d.addEventListener) {
    if (!w.$) {

<?php
include_helpers();
?>
      $ = function() {
        // Allow to create new instances without new
        return function(a,b) {
          return new P(a,b);
        };
      }();

      // constructor
<?php
include_constructor();
?>


      // methods
      $.fn = P.prototype = {
<?php
  include_methods();
?>

      }
<?php if (count($enabled_event_methods) > 0):?>

      // Standard events
<?php
  // TODO: Make ITERATE work here
  // like this: __ITERATE__(['<?php echo implode("', '", $enabled_event_methods) ? >'], function(a) {
  // ;['<?php echo implode("', '", $enabled_event_methods) ? >'].forEach(function(a) {
  // I(['<?php echo implode("', '", $enabled_event_methods) ? >'], function(a) {

  /* TODO: If there are only few events, its probably cheaper to create them at the prototype object
    click: function(b) {
      return b ? this.on('click',b) : this.trigger('click')
    }
  */
?>
      ;['<?php echo implode("', '", $enabled_event_methods) ?>'].forEach(function(a) {
        $.fn[a] = function(b){
          return b ? this.on(a,b) : this.trigger(a)
        }
      });

<?php endif;?>
    }        
  }
  else {
    // jQuery fallback
    d.write('<scrip' + 't src="http://code.jquery.com/jquery-1.9.1.min.js"><' + '/script>');
  }
})(window,document)


    <?php
/*    The browser must support both "querySelectorAll" and "addEventListener". This mounts to the following browsers:

    - IE9+
    - Edge 12+
    - Firefox 3.5+
    - Chrome 4+
    - Safari 3.1+
    - IOS Safari 3.2+
    - Opera 10.1+
    - iOS Safari 3.2+
    - Opera Mini 8+
    - Android Browser 2.1+
    - Blackberry browser 7+
    - Chrome for Android 51+
    - Firefox for Android 47+
    - IE mobile 10+
    - UC Browser for Android 9.9+

    But also "createEvent", if .trigger() is selected. (It has almost same browser support as addEventListener.
                             but: IE mobile 11+ )
    http://caniuse.com/#feat=dispatchevent

    (source: http://caniuse.com/#feat=queryselector and http://caniuse.com/#feat=addeventlistener)
    According to caniuse.com, this collection of browsers are currently used for about 96% of all visits globally. 

    Note that IE8 is treated as an "old" browser here, as it does not support "addEventListener". As a happy coincidence, IE8 is the only browser where querySelectorAll does not support CSS3 selectors. The criteria thus ensures that querySelectorAll is only used on browsers that supports CSS3 selectors.
    */
    ?>

<?php

$js = ob_get_clean();

$js = remove_unused_helpers($js);

if ($minify_all) {
  $js = \JShrink\Minifier::minify($js, array('flaggedComments' => false));
  $js = str_replace(array(";}", ",}"),"}", $js);

}
//if ($comments_build_id) {
if (TRUE) {
  // Builder URL, format #1: http://picoquery.com/builder/0.2/?5-2fa0
  // Builder URL, format #2: http://picoquery.com/builder/0.2/?addClass-css.min.js

  $hex = '';
  $length = count($feature_flags);
  for ($i=0; $i<$length; $i+=4) {
    $fourflags = implode('', array_reverse(array_slice($feature_flags, $i, 4)));
//print_r(array_slice($flags, $i, 4));
    $hex .= dechex(intval($fourflags, 2));
  }

  echo "/* picoquery.com/builder/0.2/?" . $compactness . "-" . $hex . " */\n";
}
echo $js;
?>
