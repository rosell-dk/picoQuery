<!DOCTYPE html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Compliance tests, detailed</title>

<h1>Choose test</h1>
<?php


function isDir($filename) {
  if ($filename == '.') return false;
  if ($filename == '..') return false;
  return is_dir($filename);
}
$dirs = array_filter(scandir('.'), "isDir");

echo '<ul>';
foreach($dirs as $i => $dir) {
  echo '<li><a href="' . $dir . '/">' . $dir . '/</a></li>';
}
echo '</ul>';
?>
</body>
</html>
