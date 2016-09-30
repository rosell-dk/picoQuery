<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Performance test</title>
  
<?php
echo '<script>';
echo 'var a = [];' . "\n";
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
  echo 'var t0 = performance.now();' . "\n";
  include($filename);
  echo 'var t1 = performance.now();' . "\n";
  echo 'a.push(["' . $filename . '", (t1 - t0).toFixed(4) + "ms"]);' . "\n";
}

?>
$(function() {
  var msg = '<table><tbody>' + a.map(function(item, index) {
    return '<tr><td><a href="index.php?index=' + index + '">' + item[0] + '</a></td><td>' + item[1] + '</td></tr>';
  }) + '</tbody></table>';
  $('body').html(msg);
});

//alert(a.join('\n'));
</script>


<body>

<!--

-->
</body>
</html>
