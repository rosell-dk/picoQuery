<?php

include('../../lib/JShrink.php');
ob_start(); 

include($_GET['file']);
//echo $_GET['file'];

$js = ob_get_clean();
$js = \JShrink\Minifier::minify($js, array('flaggedComments' => false));
echo $js
?>

