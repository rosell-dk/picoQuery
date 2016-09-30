<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Performance test</title>
  
<?php
echo '<script>';
$filenames = array(
  'jquery-1.9.1.min.js',
  'jquery-2.2.4.min.js',
  'zepto1.2.0.min.js',
  'picoquery0.2-full.js',
  'jquery-1.9.1.min.js',
);
if (isset($_GET['index'])) {
  $filenames = array($filenames[intval($_GET['index'])]);
}
foreach ($filenames as $filename) {
  include($filename);
}

?>
</script>
<body>
<?php
foreach ($filenames as $filename) {
  echo $filename;
}

?>
</body>
</html>
