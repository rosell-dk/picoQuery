<?php
header("Content-type: application/javascript;charset=UTF-8");
$code = file_get_contents('http://cdn.picoquery.com/' . $_GET['filename']);
echo $code;
?>
