<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>picoQuery</title>
  <style>
  /* TODO: get fancy styling on markdown code as here: http://parsedown.org/demo */
  body {font-size: 1.2em; margin:0; padding:4% 7%; }
  a {color: black}
  a.biglink {font-size: 1.5em; line-height: 150px;}

  intro {
    display: block;
    margin:0 auto;
    text-align: center;
    max-width: 700px;
    font-size: 1.2em;
  }
  center {
    text-align: center;
  }

  article {
    margin: 0 auto;
    max-width: 820px;
  }
  pre {
    padding: 16px;
    overflow: auto;
    line-height: 2.45;
    word-wrap: normal;
    background-color: #f7f7f7;
    border-radius: 3px;
    word-wrap: normal;
    margin-top: 0;
    font: 12px monospace;
    color: #333;
    line-height:20px;
  }
  h3 {
    font-weight: normal;
    margin: 35px 0 10px;
    font-family: sans-serif; 
  }
  p {
    margin: 10px 0;
  }
  .github-link {
    text-align: center;
    margin-bottom: 90px;
  }

.pl-mb,.pl-mdr,.pl-sr .pl-cce{font-weight:700}.pl-c{color:#969896}.pl-c1,.pl-s .pl-v{color:#0086b3}.pl-e,.pl-en{color:#795da3}.pl-s .pl-s1,.pl-smi{color:#333}.pl-ent{color:#63a35c}.pl-k{color:#a71d5d}.pl-pds,.pl-s,.pl-s .pl-pse .pl-s1,.pl-sr,.pl-sr .pl-cce,.pl-sr .pl-sra,.pl-sr .pl-sre{color:#183691}.pl-v{color:#ed6a43}.pl-id{color:#b52a1d}.pl-ii{color:#f8f8f8;background-color:#b52a1d}.pl-sr .pl-cce{color:#63a35c}.pl-ml{color:#693a17}.pl-mh,.pl-mh .pl-en,.pl-ms{font-weight:700;color:#1d3e81}.pl-mq{color:teal}.pl-mi{font-style:italic;color:#333}.pl-mb{color:#333}.pl-md{color:#bd2c00;background-color:#ffecec}.pl-mi1{color:#55a532;background-color:#eaffea}.pl-mdr{color:#795da3}.pl-mo{color:#1d3e81}


  </style>

  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-85714014-1', 'auto');
    ga('send', 'pageview');

  </script>
</head>
<body>
  <intro>    
    <p>picoQuery is a customizable subset of jQuery.<br>Its written for modern browsers and automatically falls back to jQuery on older browsers.</p>
<!--     <p>picoQuery is a customizable subset of jQuery written for modern browsers<br> with fallback to jQuery on older browsers.</p>-->

    <a href="builder/" class="biglink">Go to the builder</a>
  </intro>
<article>
<?php
include('Parsedown.php');
$Parsedown = new Parsedown();
//$array = explode("\n", ;

echo $Parsedown->text(file_get_contents('README.md'));
?>
</article>
</body>
</html>
