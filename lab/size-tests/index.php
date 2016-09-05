<html>
<head>
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>

<script>
$(function() {
  $('li[filename]').each(function () {
    var $li = $(this);
    var filename = $li.attr('filename');
//    filename = filename.replace('.js', '.min.js');
//    alert(filename)
    var jqXHR = $.ajax(filename)
    .done(function() {
      var compressedSize = parseInt(jqXHR.getResponseHeader('Content-Length'),10);
      var uncompressedSize = jqXHR.responseText.length;
      $li.append(compressedSize + ' bytes <span style="font-size:11px;color:#666">(' + uncompressedSize + ' bytes uncompressed)</span>');
    })
    .fail(function( jqXHR, textStatus, errorThrown) {
      alert('failed to load');
    })  
  });
});
/*

*/
</script>
<style>
ul {list-style-type: none;margin:0;padding:5px 0px 25px 25px}
li {margin:0;padding:0}
a {color:0; text-decoration:none}
.filename {display:inline-block;width: 150px;}
</style>
</head>
<body>
<h1>Minified file sizes (gzipped)</h1>
<?php
/*
include('../../../lib/JShrink.php');
function getMinifiedSize($filename) {
  ob_start(); 

  include($filename);
  //echo $_GET['file'];

  $js = ob_get_clean();
  $js = \JShrink\Minifier::minify($js, array('flaggedComments' => false));
  return strlen($js);
}*/

function isDir($filename) {
  if ($filename == '.') return false;
  if ($filename == '..') return false;
  return is_dir($filename);
}
function isJsFile($filename) {
  if ($filename == '.') return false;
  if ($filename == '..') return false;
  return !is_dir($filename) && preg_match('/.js$/', $filename);
}
$dirs = array_filter(scandir('.'), "isDir");

echo '<ul>';
foreach($dirs as $i => $dir) {
  echo '<li><a href="' . $dir . '/">' . $dir . '/</a><ul>';
  $jsfiles = array_filter(scandir($dir), "isJsFile");
  foreach($jsfiles as $i => $jsfile) {
    $jsfile = preg_replace('/.js$/', '.min.js', $jsfile);
    echo '<li filename="' . $dir . '/' . $jsfile . '"><div class="filename">' . $jsfile . '</div></li>';
  }
  echo '</ul></li>';
}
echo '</ul>';
?>

</body>
</html>
