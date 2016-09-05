<?php
header('Content-Type: application/json');
require_once('build-options.inc');

// Output javascript array
/*
$features = array();
foreach ($feature_nameids as $index => $feature_nameid) {
  $features[] = array(
    'id' => '.' . $feature_nameid . '()'
  );
}

echo json_encode($feature_nameids);
*/
//echo json_encode($features_by_nameid);

$buildoptions = array();
foreach ($buildoptions_nameids as $index => $option_nameid) {
/*
  $buildoptions[] = array(
    'index' => $index,
    'nameid' => $option_nameid,
  );
*/
  $buildoptions[] = $features_by_nameid[$option_nameid];
}
//sort($feature_nameids);
echo json_encode($buildoptions);


?>
