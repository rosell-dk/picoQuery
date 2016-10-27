<?php
header("Content-type: application/javascript;charset=UTF-8");
require_once('build-options.inc');


if (preg_match('/.*builder\/((\d)\.(\d)(\.(\d))?).*/', $_SERVER['REQUEST_URI'], $matches)) {
}
else if (preg_match('/\/src\/picoquery-((\d)\.(\d)(\.(\d))?).*/', $_SERVER['REQUEST_URI'], $matches)) {
//  /src/picoquery-0.2-addclass.js
}
$major_version = $matches[2];
$minor_version = $matches[3];
if (count($matches) >= 5) {
  $bugfix_version = $matches[5];
}
else {
  $bugfix_version = '0';
}

$version = $matches[1];


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

/*
convert a base64 char to dec
Our base64 table is made such that it is URL-friendly https://en.wikipedia.org/wiki/Query_string
   0-9 (10 chars)
   a-z (26 chars) (10-35)
   A-Z (26 chars) (36-61)
   _*   (2 chars) (62-63)    */
function base64dec($char) {
  $cc = ord($char);

  if (($cc >= ord('0')) && ($cc <= ord('9'))) {
    return $cc - ord('0');
  }
  if (($cc >= ord('a')) && ($cc <= ord('z'))) {
    return 10 + $cc - ord('a');
  }
  if (($cc >= ord('A')) && ($cc <= ord('Z'))) {
    return 36 + $cc - ord('A');
  }
  if ($char == '_') {
    return 62;
  }
  if ($char == '*') {
    return 63;
  }
  return 0;
}

function decbase64($dec) {
  if ($dec <= 9) {
    return chr(ord('0') + $dec);
  }
  if ($dec <= 35) {
    return chr(ord('a') + $dec-10);
  }
  if ($dec <= 61) {
    return chr(ord('A') + $dec-36);
  }
  if ($dec == 62) {
    return '_';
  }
  if ($dec == 63) {
    return '*';
  }
  return '?';
}

function base64str2flagsarray($str, $min_length = 0) {
  $flags = array();
  foreach (str_split($str) as $i => $char) {
    $six_flags = base64dec($char);
//    echo $six_flags . '<br>';
    for ($j=0; $j<6; $j++) {
      if (($six_flags & pow(2,$j)) > 0) {
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

function decodeOptions($encodeOptionsString) {

  $firstChar = substr($encodeOptionsString, 0, 1);

  // ie 'addClass-css'  (/src/picoquery-0.3.0-addClass-css.min.js)
  if (($firstChar >= 'a') && ($firstChar <= 'a')) {
    $features = explode('-', $encodeOptionsString);
    foreach ($features as $index => $feature_nameid) {
      enableFeatureByNameId($feature_nameid);
    }
  }
  else {
    $code = substr($encodeOptionsString, 1);

    switch ($firstChar) {
      case 'A':
        $features_to_include = hexstr2flagsarray($code);
        break;
      case 'B':
        $features_to_include = base64str2flagsarray($code);
        break;
    }

    global $buildoptions_nameids;
    foreach ($buildoptions_nameids as $index => $nameid) {
      $nameid = getFeatureNameIdByIndex($index);
      if (!isset($features_to_include[$index])) {
        $features_to_include[$index] = FALSE;
      }
      if (isFeatureDefaultEnabled($nameid)) {
        if ($features_to_include[$index] == TRUE) {
          disableFeatureByNameId($nameid);
        }
      }
      else {
        if ($features_to_include[$index] == TRUE) {
          enableFeatureByNameId($nameid);
        }
      }
    }
  }
}

/*
CDN URL, format #1:     http://cdn.picoquery.com/picoquery0.3.0-A2fa0.min.js
CDN URL, format #2:     http://cdn.picoquery.com/picoquery0.3.0-addClass-css.min.js
Note that build id starts with on uppercase letter, which specifyes the encoding
Encodings currently available:
"A": 
   16 bit encoding of options.
   One bit per option, the option order is the one specified in build-options.inc
   The last trail of 0's can be omitted. Ie "A3" is an encoding for "addClass" and "css"
"B": 
   64 bit encoding of options.
   Same rules as "A" encoding

*/
// Builder URL, format #1: http://picoquery.com/builder/0.3.0/?A2fa0.min.js
// Builder URL, format #2: http://picoquery.com/builder/0.3.0/?addClass-css.min.js

// When sub-features arrives:
// CDN URL, format #1:     https://cdn.picoquery.com/picoquery0.2-A2fa0-0112.min.js

// First 3 bits
//    tells how many bits [n+1] that should be used for referencing methods
//    when building a build id, the builder will try out all bit sizes,
//    and select the one that results in the most compact build id.
//    As zero bits hardly makes sense, 000 means n=1, 001 means n=2, etc
//    If for example every method 
// 
// For each method/build-option that has sub-functionality disabled:
//   First [n] bits
//     Tells how many items to skip in the list of build options included in the build.
//     This list is ordered by the index-id of the build-option (.addClass()=0, .css()=1, .get()=2, etc)
//     If for example only .addClass(), get() and .each() are included in the build,
//     the list will be: ['addClass', 'get', 'each']
//     Say that n=4 and that these methods had 4 subfeatures each, and we were encoding with 1 bit
//     build id would be this (no dashes): 
//     010 (to set n=4) 
//     0001 (skip one in the list - skips to "get"
//     1111 (all subfeatures of get is deselected)
//     0000 (skips to each. As each is right after 'get' in the list, the skip is 0)
//     1111 (all subfeatures of each is deselected)

//     All 1-bits has a special meaning. It means that the value of the next n bits
//     will be added as well.
//     for n=1, 0 will for example mean skip 0, 10 means skip 1, 111110 means skip 5
//     for n=8, 5 will for example mean skip 5, f0 means skip 15, f7 means skip (15+7)=22
//     By the way, jQuery has 314 methods

//  Next x bits
//     determines which of the subfeatures that are deselected
//     build.php knows how many bits that each method needs
//     Fun fact: Cannot be 0, as it would then mean that no sub-features where deselected
//               and then it should not be listed
//     To decide: Should subfeatures be selected or deselected?
//                This only matters, if a user upgrades to next picoQuery by simply changing the url
//                Ie, in 0.2 he has this URL: https://cdn.picoquery.com/picoquery0.2.0-A2fa0.min.js
//                When 0.3 arrives, he changes it to: https://cdn.picoquery.com/picoquery0.3.0-A2fa0.min.js
//                Should we support this? - ie must old build ID's work in new versions?
//                It is possible. The "A" in "picoquery0.2.0-A2fa0.min.js" can designate the encoding
//                of the build id. (A = picoQuery 0.2.x, B=picoQuery 0.3.x)
//                It will however require some work. This new "subfeature" encoding relies on build.php to
//                know how many bits a method needs. So build.php will have to know how many bits each method
//                requires FOR EACH version of picoQuery.
//
//                What does the user hope to gain by changing the URL directly? (instead of upgrading through
//                the builder). The user will not gain access to new build options this way.
//                He certainly will expect code optimizations and bug fixes (though bugfixes must also be
//                available in 0.2.x).
//
//                The important question is: Does he expect/want methods to be improved in terms of compliance?
//                PRO YES:  - The next version will be better in terms of compliance
//                PRO NO:   - The next version will not bring larger codebase
//                I guess no - because compliance was probably good enough for his project in 0.2.
//                If we choose "no", we will ensure that the upgrade will only bring good things - optimization
//                and not bad things (larger code).
//                However, if we choose "no", we will have to take meassures that no existing features go away
//                ALL the stuff our methods currently does must be made into sub features.
//
//                So, its "NO" then. That means subfeatures are selected. New subfeatures are default unselected

// The subfeatures can be part of the CDN URL like this:
// https://cdn.picoquery.com/picoquery0.3-addClass0010-css100.fast.min.js
// or base 8: https://cdn.picoquery.com/picoquery0.3-addClass2-css8-each17.small.min.js
// But few people are used to base 8, and do not want to go base 16, because it contains letters. So base 2 is
// best, I guess.

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

if (isset($_GET['bid'])) {
  $bid = $_GET['bid'];
  $parts = explode('.', $bid, 2);
  $features_to_include = $parts[0];
  $ext = $parts[1];
  decodeOptions($features_to_include);

  switch ($ext) {
    case 'small.min.js':
    case 'min.js':
      $compactness = 0;
      break;
    case 'small.js':
      $compactness = 3;
      break;
    case 'js':
      $compactness = 5;
      break;
    case 'devel.js':
      $compactness = 9;
      break;
  }

}
/*
elseif (isset($_GET['file'])) {
  print_r($_GET);
}*/
elseif (isset($_GET['v'])) {
//  print_r($_GET);


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


if (isFeatureEnabled('builderurl')) {
  // Calculate builder url
  // This variable used in the end of this file for the builder url comment

  $feature_flags = array();
  foreach ($buildoptions_nameids as $i => $feat) {
    $feature_flags[] = (isFeatureEnabled($feat) xor isFeatureDefaultEnabled($feat))?1:0;
  }

  // Builder URL, format #1: http://picoquery.com/builder/0.2/?5-2fa0
  // Builder URL, format #2: http://picoquery.com/builder/0.2/?addClass-css.min.js

  $code = 'B';
  $length = count($feature_flags);
  for ($i=0; $i<$length; $i+=6) {
    $sixflags = implode('', array_reverse(array_slice($feature_flags, $i, 6)));
//print_r(array_slice($flags, $i, 4));
    $code .= decbase64(intval($sixflags, 2));
  }
  $code = rtrim($code, '0');

  $ext = 'js';
  switch ($compactness) {
    case 0:
      $ext = 'min.js';
      break;
    case 3:
      $ext = 'small.js';
      break;
    case 5:
      $ext = 'js';
      break;
  }
    
  $bid = $code . '.' . $ext;
  $builder_url = "picoquery.com/builder/" . $version . "/?" . $bid;
}


// Dependencies
enableFeatureByNameId('ready'); // Constructor is dependent on this
enableFeatureByNameId('on');
if (isFeatureEnabled('appendTo')) {
  enableFeatureByNameId('append');
}
if (isFeatureEnabled('prependTo')) {
  enableFeatureByNameId('prepend');
}
if (isFeatureEnabled('insertBefore')) {
  enableFeatureByNameId('before');
}
if (isFeatureEnabled('insertAfter')) {
  enableFeatureByNameId('after');
}
if (isFeatureEnabled('prepend') || isFeatureEnabled('append') || isFeatureEnabled('after')  || isFeatureEnabled('before')) {
  enableFeatureByNameId('clone');
}

if (isFeatureEnabled('hide')) {
  enableFeatureByNameId('css');
}
if (isFeatureEnabled('filter') || isFeatureEnabled('closest')) {
  enableFeatureByNameId('parent');
}
if (isFeatureEnabled('next') || 
    isFeatureEnabled('prev') ||
    isFeatureEnabled('children') ||
    isFeatureEnabled('parent') ||
    isFeatureEnabled('remove')) {
  enableFeatureByNameId('filter');
}
if (isFeatureEnabled('replaceWith')) {
  enableFeatureByNameId('before');
  enableFeatureByNameId('remove');
}
if (isFeatureEnabled('last')) {
  enableFeatureByNameId('eq');
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

/*if (isFeatureEnabled('show')) {
  enableFeatureByNameId('data');
}*/

if (isFeatureEnabled('data')) {
  enableFeatureByNameId('attr');
  enableFeatureByNameId('jQuery.camelCase');
}

if (isFeatureEnabled('end')) {
  enableFeatureByNameId('pushStack');
}
if (isFeatureEnabled('add')) {
  enableFeatureByNameId('jQuery.merge');
}


if ($minify_functions || $minify_all) {
  include('../../lib/JShrink.php');
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
  global $bugfix_version;
  
/*  $bugfixes = [
    'constructor.js' => array(
      'version' => 1,
      'filename' => 'constructor-bugfix-scoped.js'
    )
  ]*/
/*
  if (($bugfix_version=='1') && (file_exists($filename . '.bugfix1'))) {
    include($filename . '.bugfix1');
  }
  else {
    include($filename);
  }*/
  include($filename);

  $js = trim(ob_get_clean());


//  $readable_version = preg_replace('/\/\/\\s*OPTIMIZED_VERSION\\s*\/\/.*/ms', '', $js);
//  $optimized_version = trim(preg_replace('/(.*\/\/\\s*OPTIMIZED_VERSION\\s*\/\/\\s*)/ms', '', $js));
/*
//  $readable_version = $optimized_version = $js;

  global $use_optimized_methods;
  if ($use_optimized_methods) {
    $js = $optimized_version;
  }
  else {
    $js = $readable_version;
  }
*/

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


function include_method($feat_nameid, $type = 'instance') {
  global $use_optimized_methods;
  
  if ($use_optimized_methods) {
    $js = include_javascript('inc/methods/' . $feat_nameid . '/' . $feat_nameid . '.min.js');
  }
  else {
    $js = include_javascript('inc/methods/' . $feat_nameid . '/' . $feat_nameid . '.js');
  }

  // If "array-like" feature isn't disabled, substitute "this.e[...]" with "this[...]"
  // TODO: Create the feature, and check it.
//  $js = str_replace('this.e[', 'this[', $js);


  $js = indent($js, ($type == 'instance' ? 2 : 1), TRUE);
  echo $js;
}

function include_methods($type = 'instance') {

  $methods = array();

  global $buildoptions_nameids;
  foreach ($buildoptions_nameids as $feat_nameid) {
//    if (!isFeatureEnabledMethod($feat_nameid)) continue;
    if ($type == 'instance') {
      if (!isFeatureEnabledInstanceMethod($feat_nameid)) continue;
    }
    if ($type == 'static') {
      if (!isFeatureEnabledStaticMethod($feat_nameid)) continue;
    }

    // Do not include standard event methods
    // - we include them after the prototype declaration
    global $enabled_event_methods;
    if (in_array($feat_nameid, $enabled_event_methods)) continue;
    $methods[] = $feat_nameid;
  }

/*
  $files = scandir(getcwd() . '/inc/methods-' . $type);
  foreach ($files as $i => $filename) {
    $m = array();
    // Only include inc files
    if (!preg_match('/(.*).inc$/', $filename, $m)) continue;

    // Only include method if feature is enabled, and its a method
    $feat_nameid = $m[1];
    if ($type == 'instance') {
      if (!isFeatureEnabledInstanceMethod($feat_nameid)) continue;
    }
    if ($type == 'static') {
      if (!isFeatureEnabledStaticMethod($feat_nameid)) continue;
    }

    // Do not include standard event methods
    // - we include them after the prototype declaration
    global $enabled_event_methods;
    if (in_array($feat_nameid, $enabled_event_methods)) continue;

    $methods[] = $feat_nameid;
//    echo $feat_id;
  }
*/
  if (count($methods) > 0) {
    if ($type == 'instance') {
      echo "\n\n  // methods\n";
      echo "  $.fn = P.prototype = {\n";

      foreach ($methods as $i => $feat_nameid) {
        include_method($feat_nameid, $type);
        if ($i < count($methods) - 1) {
          echo ",";
        }
        echo "\n";
      }
      echo "  }\n";
    }
    elseif ($type == 'static') {
      echo "\n\n  // static methods\n";
      foreach ($methods as $i => $feat_nameid) {
        include_method($feat_nameid, $type);
        echo "\n";
      }
    }
  }
}


function include_constructor() {
  global $use_optimized_methods;
  
  if ($use_optimized_methods) {
    $js = include_javascript('inc/constructor.min.js');
    $js = indent($js, 1, TRUE);
  }
  else {
    $js = include_javascript('inc/constructor.js');
    $js = indent($js, 1, TRUE);
  }

  echo $js;
}

$helpers = array(
  // A note for choosing short names:
  // Google Closure compiler uses a,b,c,... up to g (currently)
  // We reserve [a-h] for Closure Compiler
  // We reserve i,j,k for loops
  // We reserve l for length
  // We reserve u for undefined
  // We reserve z for junk
  // We reserve d for document (its no problem that CC used 'd' - CC avoids 'd', when its used)
  // We reserve w for window
  // We reserve P for picoQuery class

  // Try to use common characters (gzip)
  // Use the most common characters for the most used functions.
  // Below, I put most used functions on top
  array('ITERATE', 'forEach', 's'),     // Iterate normal array. Use instead of "for (var i=0; ...". TODO: rename to "FOREACH"
  array('TO_ARRAY', 'toArray', 't'),
  array('IS_FUNCTION', 'isFunction', 'f'),
  array('DOM_MANIP', 'domManip', 'm'),  // used in .before(), .prepend(), etc
  array('IS_UNDEFINED', 'isUndefined', 'u'),
  array('IS_STRING', 'isString', 's'),
  array('FLATTEN', 'flatten', 'v'),
  array('REMOVE_DUPLICATES', 'rmDuplicates', 'D'),
  array('REMOVE_DUPLICATES_AND_NULLS', 'rmDuplicatesAndNulls', 'F'),
  array('MAP', 'map', 'M'),             // Map normal array
  array('PROPERTY_FUNC', 'prop', 'p'),  // Used with map.
  array('EACH', 'each', 'E'),   // DEPRECATED - use ITERATE(this.e)
  array('PUSH_STACK', 'pushStack', ''),                // Expects array
  array('PUSH_STACK_SINGLE', 'pushStackSingle', ''),   // Expects single element
  array('PUSH_STACK_THIS', 'pushStackThis', ''),       // Expects no arguments.
  array('PUSH_STACK_JQ', 'pushStackJQ', ''),         // Expects jQuery object
  array('RETURN_PUSH_STACK_JQ', 'retPushStackJQ', ''),         // Expects jQuery object

);
$helpers_output = array();
$helpers_inline = array();

// parse javascript arguments - even multiline.
// ie: "<@ value @>, <@ 'tejst' @>, <@ function(el) {} @>" => ['args'=>['value', "'text'", 'function(el) {}']]
// If input string has extra code after the last argument, it will be returned in "extra"
/*
  And it also works with nested
  return __ITERATE__(<@ this.e @>, <@ function(el) {
    return __ITERATE__(<@ el.parentNode @>, <@ function(el) {
      // do something
    } @>);
  } @>);
*/
function parseArgs($helper, $js) {
  if (substr($js, 0, 1) == ')') {
    return array('args' => array(), 'extra' => $js);
  }
  if (substr($js, 0, 2) != '<@') {
    echo 'Could not parse args for ' . $helper . $js;
    print_r($js);
//    return $js;
    return parseArgsOld($js);
    print_r($helper);
    return $js;
  }

  $args = array();
  $pos = 0;
  $inArg = FALSE;

  $maxIt = 100;
  $it = 0;
  while (TRUE) {
    if ($it++ > $maxIt) {
      echo 'MAXED OUT!' . $helper . $js;
      return;
    }
    // We are before first argument, between arguments, or after last argument
    // So we expect: new argument, comma or end parenthesis
    if (substr($js, $pos, 2) == '<@') {
//      echo 'PARSING ARGUMENT';
      // Start parsing an argument.
      // We are looking for an @>. But as functions can be nested, its not
      // neccesarily the first one.
      // If we meet a <@, we must skip to next @>

      $pos = $pos+2;
      $argPos = $pos;

      $depth = 1;
      while ($depth > 0) {
        $posEnd = strpos(substr($js, $pos), '@>');
        $posBegin = strpos(substr($js, $pos), '<@');

        if (($posBegin === FALSE) || ($posEnd < $posBegin)) {
          // We found @>
          $depth--;

          $pos = $pos + $posEnd + 2;
//  echo 'FOUND endtag' . $pos . ':' . substr($js, $pos);

          if ($depth == 0) {
            $args[] = substr($js, $argPos, $pos - $argPos - 2);
//            echo 'FOUND:' . substr($js, $argPos, $pos - $argPos ) . '!!';
            $depth = 0;
//            $pos += $argPos;
//            echo 'REST:' . substr($js, $pos);
          }

//          $pos += $posEnd+2;
  //        echo 'left:' . substr($js, $pos);
        }
        else if ($posBegin !== FALSE) {
          // We found <@
          $depth++;
          $pos = $pos + $posBegin + 2;
//  echo 'FOUND beginning. skip' . $pos . ':' . substr($js, $pos) . '/skip';
        }
      }
    }
    else if (substr($js, $pos, 1) == ')') {
      // done
//      echo 'DONE';
//      print_r(array('args' => $args, 'extra' => substr($js, $pos)));
      return array('args' => $args, 'extra' => substr($js, $pos));
    }
    else if (substr($js, $pos, 1) == ',') {
//      echo 'FOUND COMMA';
      $pos++;
    }
    else if (substr($js, $pos, 1) == ' ') {
      $pos++;
    }
  }
//  echo 'PARSEARGS' . $js;
}


// jparser-1-0-0 http://timwhitlock.info/blog/2009/11/jparser-and-jtokenizer-released/
// alternative parsers, tokenizers: http://stackoverflow.com/questions/3571303/is-there-a-javascript-lexer-tokenizer-in-php/36030252#36030252
require '../../lib/jtokenizer1.0.0.php';

// parse javascript arguments - even multiline.
// ie: "value, 'tejst', function(el) {}" => ['args'=>['value', "'text'", 'function(el) {}']]
// If input string has extra code after the last argument, it will be returned in "extra"
function parseArgsOld($js) {

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

          // We have this weird problems with backslash
          $extra = preg_replace('/\\\\/', '__BACKSLASH__', $extra);

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

function prepare_helpers() {
//  echo '[[HELPERS]]';

  global $helpers;
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

function process_helpers($js) {
//  return $js;

  $js = _process_helpers($js, 1);
//  $js = '[[HELPERS]]' . $js;
  $js = _process_helpers($js, 2);

  $js = preg_replace('/\[\[END-INCLUDE]\]/', '', $js);

  $js = preg_replace('/__BACKSLASH__/', '\\\\', $js);

  // Those helper calls that were not inlined still have special markings around the arguments
  // - remove them!
  $js = preg_replace('/<@/', '', $js);
  $js = preg_replace('/@>/', '', $js);

  return $js;
}

function _process_helpers($js, $step) {
  global $helpers;
  global $helpers_output;
  global $helpers_inline;

  $helpers_needed = [];
//echo $js;
//$js = 'STEP:' . $step . "\n" . $js;

  foreach ($helpers as $i => $helper) {

    // Find out if a call to the helper is in the sourcecode
    $numCallsToHelper = preg_match_all('/__' . $helper[0] . '__\\s*\(/', $js);
//echo $helper[0] . ':' . $numCallsToHelper . '\n';
    // HACK to make ITERATE useable in helpers
/*
    if ($helper == 'ITERATE') {
      numCallsToHelper = 2;
    }*/
    global $inline_all_helpers;
//$inline_all_helpers = TRUE;
// ($helper[0] == 'EACH') || 
    $treshold = 8;
    if (($helper[0] == 'REMOVE_DUPLICATES') ||
      ($helper[0] == 'REMOVE_DUPLICATES_AND_NULLS')) {
        if (isFeatureEnabled('jQuery.noConflict')) {
          // We are running with variant #2, and it doesn't pay off to inline variant #2
          // (see REMOVE_DUPLICATES_AND_NULLS.md)
          $treshold = 1;
        }
    }
    if ($helper[0] == 'DOM_MANIP') {
      $treshold = 1;
    }
    if (($helper[0] == 'PUSH_STACK') ||
      ($helper[0] == 'PUSH_STACK_SINGLE') ||
      ($helper[0] == 'PUSH_STACK_THIS') ||
      ($helper[0] == 'PUSH_STACK_JQ') ||
      ($helper[0] == 'RETURN_PUSH_STACK_JQ')) {
      // These must always be inlined
        $treshold = 9999;
    }

//      $treshold = 0;
    if ($step == 2) {
      // we currently only do inlining in step 2 (easier)
//      $inline_all_helpers = TRUE;
    }
    if (($inline_all_helpers) || (($numCallsToHelper > 0) && ($numCallsToHelper <= $treshold))) {

      /* 

      Inline the helper

      This isn't easy-peasy, and its this process that takes most of the build time

      What we do here is transform ie:
      before: if(__IS_FUNCTION__(value))
      after:  if(typeof value == "function")
      
      And it also works with multiline, and with multiple arguments:

      return __ITERATE__(this.e, function(el) {
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

      And it also works with nested
      return __ITERATE__(this.e, function(el) {
        return __ITERATE__(el.parentNode, function(el) {
          // do something
        }
      }

      */

      for ($x = 0; $x < $numCallsToHelper; $x++) {

        // Get the inline code, ie "typeof [[ARG1]] == "function""
        $inline_code = $helpers_inline[$i];

        // Next, we substitute "[[ARG1]]" with the name of the first argument, ect.

        // The hardest part of doing this is finding the values supplied to the function call.
        // This hard part is handled by the "parseArgs" helper (which uses jtokenizer)
        // Even finding out where the arguments stop is hard. But parseArgs also does this for us,
        // by returning the code after the arguments in an "extra" property
        preg_match('/__' . $helper[0] . '__\\s*\((.*)\[\[END-INCLUDE\]\]/ms', $js, $matches);
        if (count($matches) == 0) {
          echo 'Whoops:' . '/__' . $helper[0] . '__\\s*\((.*)\[\[END-INCLUDE\]\]/ms did not find anything in this string:' . $js;
          continue;
        }
  // if ($helper[0] == 'EACH') {echo $matches[1]; return;}

        // A little quirk: We add ' ', because otherwise an ending "}" is eaten (when methods are minimized)
        $parseResult = parseArgs($helper[0], $matches[1] . ' ');
//echo $helper[0] . '\n';
//print_r($matches[1]);
//print_r($parseResult);
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

      // Fix function calls ("__ITERATE__(" => "forEach(", etc)
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

  return $js;
}

?>
<?php if (isFeatureEnabled('fallback')):?>
(Array.isArray ? 
<?php endif;?>
(function(w,d,u,$<?php if ($use_optimized_methods) {echo ',z';} // TODO: Detect if u and z are used. u can be tested For example with the javascript parser ?>) {
<?php if (isFeatureEnabled('jQuery.noConflict')) {
  echo '  var _$ = window.$;';
}
?>

<?php
prepare_helpers();
?>
[[HELPERS]]
  w.$ = w.jQuery = $ = function() {
    // Allow to create new instances without new
    return function(a,b) {
      return new P(a,b);
    };
  }();

  // constructor
<?php
include_constructor();
include_methods('static');
include_methods('instance');
?>
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
    $.fn[a] = function(b,bb){
      return b ? this.on(a,null,b,bb) : this.trigger(a)
    }
  });

<?php endif;?>
})(window,document)<?php if (isFeatureEnabled('fallback')):?> : document.write('<scrip' + 't src=https://code.jquery.com/jquery-1.12.4.min.js><' + '/script>'));

<?php endif;?>
<?php
/*
We could save a few bytes by hosting jQuery on picoQuery.com or "hosting" a 301 redirect
ie src="https://picoquery.com/j"
(the string "picoquery.com" is already in the src, as it starts with a comment like this:
"picoquery.com/builder/0.2.1/?5-ff")
As we also later will have the string "jQuery" in the src, it wont cost much more to do this:
src="https://picoquery.com/jQuery"
We could also consider this
ie src="https://picoquery.com/jquery1.9.1.min.js"
CON: If one day I should become a bad guy, I could change the file to contain malicious code.
(joke aside, if someone should gain access to my webserver, they could change the file)


We could also save a few bytes by changing to protocol-relative url. (src=//code.jquery..)
But then it will not work on local files (the file:// protocol).
Also, according to paul irish, its now an anti-pattern; https should always be used.
1) for the security, 2) even when website is in http, its better security, 3) there are no
problems loading https resources on a http website 4) its not true anymore, that https is slower
(if server is set up correctly - which it presumably is on jquery.com)

If http content really is trivial intercepted, then I imagine that popular libraries like
jQuery will be on the target list. It will be trivial to serve a modified version of jQuery,
that includes malicious code.

http://stackoverflow.com/questions/4978235/absolute-urls-omitting-the-protocol-scheme-in-order-to-preserve-the-one-of-the
http://www.paulirish.com/2010/the-protocol-relative-url/

Note: We should definitely not use src=http://, because on IE8, it triggers an annoying 
warning about the page containing insecure content, when web page is on https

Tips on how to set up https with good performance:
https://istlsfastyet.com/
*/
/*
  We do not need quotes around attribute values: https://mathiasbynens.be/notes/unquoted-attribute-values

  Requirements:
    - querySelectorAll (core)   http://caniuse.com/#feat=queryselector
    - addEventListener (core)   http://caniuse.com/#feat=addeventlistener
    - dispatchevent (trigger)   http://caniuse.com/#feat=dispatchevent
    - [].indexOf (filter, etc)  http://kangax.github.io/compat-table/es5/
    - [].some (find)            http://kangax.github.io/compat-table/es5/
    - Element.children          https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children

    Right now, if above tables are correct, a single test is enough.
    Any browser that supports Array.isArray also supports the other requirements

    Browser support for isArray is: FF4+, IE9+, Safari 5+, Opera 10.5+, Konq 4.9+, Chrome 5+ and all modern browsers.
    (https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)

    (except maybe Chrome 1-3 - this must be investigated)


    As a happy coincidence, IE8 is the only browser where querySelectorAll does not support CSS3 selectors. The criteria thus ensures that querySelectorAll is only used on browsers that supports CSS3 selectors.
    */
    ?>
<?php

$js = ob_get_clean();

$js = process_helpers($js);

if ($minify_all) {
  $js = \JShrink\Minifier::minify($js, array('flaggedComments' => false));
  $js = str_replace(array(";}", ",}"),"}", $js);

}
//if ($comments_build_id) {
if (isFeatureEnabled('builderurl')) {
  echo '/* ' . $builder_url . " */\n";
}
echo $js;
?>
