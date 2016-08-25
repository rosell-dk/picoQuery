<?php
header('Content-Type: application/json');
require_once('features.inc');

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

$features = array();
foreach ($feature_nameids as $index => $feature_nameid) {
  $features[] = array(
    'index' => $index,
    'nameid' => $feature_nameid,
  );
}
//sort($feature_nameids);
echo json_encode($features);


?>
