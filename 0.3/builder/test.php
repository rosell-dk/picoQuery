<?php
header("Content-type: application/javascript;charset=UTF-8");

function isFeatureEnabled() {
return TRUE;
}
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


  ob_start();
  include('inc/methods-instance/removeClass.inc');
  $js = trim(ob_get_clean());
  $optimized_version = trim(preg_replace('/(.*\/\/\\s*OPTIMIZED_VERSION\\s*\/\/\\s*)/ms', '', $js));
  $js = $optimized_version;
$js = indent($js, 3);
  echo $js;

?>
