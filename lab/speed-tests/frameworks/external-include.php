<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Performance test</title>
  
<?php
$filenames = array(
  'jquery-1.9.1.min.js',
  'jquery-2.2.4.min.js',
  'zepto1.2.0.min.js',
  'picoquery0.2-full.js',
  'https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js',
  'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js',
);
if (isset($_GET['index'])) {
  $filenames = array($filenames[intval($_GET['index'])]);
}
foreach ($filenames as $filename) {
  echo '<script src="' . $filename . '"></script>';
//  include($filename);
}

?>
<body>
<?php
foreach ($filenames as $filename) {
  echo $filename . '<br>';
}

?>
</body>
</html>
