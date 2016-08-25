<?php

if (isset($_GET['build'])) {
  $build = $_GET['build'];
  $tokens = explode('-', $build);
  $v = $tokens[0];

  switch ($v) {
    case '0.1':    
      include_once($v . '/picoquery.js.php');
      break;
    default:
      // 'Version does not exist';
  //    header("HTTP/1.0 404 Not Found");
  //    http_response_code(501);
      break;  
  }
}

