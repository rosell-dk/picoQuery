<?php

$filename = 'inc/methods/' . $_GET['method'] . '.inc';

$html = FALSE;
if ($html) {
  header('Content-Type: text/html');
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
</head>
<body>
 
<pre>
<?php
include($filename);
?>
</pre> 
</body>
</html>
<?php
}
else {
include($filename);
}
