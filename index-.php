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
  article > h1:first-child {
    display: none;
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

/* Pretty printing styles. Used with prettify.js. */
/* Other themes available here: https://rawgit.com/google/code-prettify/master/styles/index.html */

/* SPAN elements with the classes below are added by prettyprint. */
.pln { color: #000 }  /* plain text */

@media screen {
  .str { color: #080 }  /* string content */
  .kwd { color: #008 }  /* a keyword */
  .com { color: #800 }  /* a comment */
  .typ { color: #606 }  /* a type name */
  .lit { color: #066 }  /* a literal value */
  /* punctuation, lisp open bracket, lisp close bracket */
  .pun, .opn, .clo { color: #660 }
  .tag { color: #008 }  /* a markup tag name */
  .atn { color: #606 }  /* a markup attribute name */
  .atv { color: #080 }  /* a markup attribute value */
  .dec, .var { color: #606 }  /* a declaration; a variable name */
  .fun { color: red }  /* a function name */
}

/* Use higher contrast and text-weight for printable form. */
@media print, projection {
  .str { color: #060 }
  .kwd { color: #006; font-weight: bold }
  .com { color: #600; font-style: italic }
  .typ { color: #404; font-weight: bold }
  .lit { color: #044 }
  .pun, .opn, .clo { color: #440 }
  .tag { color: #006; font-weight: bold }
  .atn { color: #404 }
  .atv { color: #060 }
}

pre.prettyprint { padding: 10px 15px; border: 1px solid #888 }

  </style>

<!-- Place this tag in your head or just before your close body tag. -->
<!-- <script async defer src="https://buttons.github.io/buttons.js"></script>-->

  <script src="/scripts/script.js"></script>

</head>
<body>
  <intro>    
    <p>picoQuery is a subset of jQuery. - A subset <i>you</i> get to choose.<br>Its written for modern browsers and automatically falls back to jQuery on older browsers.<br><br>And its light. <small>Very <small>very <small>very light</small></small></small></p>
<!--     <p>picoQuery is a customizable subset of jQuery written for modern browsers<br> with fallback to jQuery on older browsers.</p>

    <a href="builder/" class="biglink">Go to the builder</a>-->
  </intro>
<!-- https://buttons.github.io/ -->
<!--
<a class="github-button" href="https://github.com/rosell-dk/picoquery" data-icon="octicon-star" data-style="mega" data-count-href="/rosell-dk/picoquery/stargazers" data-count-api="/repos/rosell-dk/picoquery#stargazers_count" data-count-aria-label="# stargazers on GitHub" aria-label="Star rosell-dk/picoquery on GitHub">Star on github</a>
-->
<!-- https://dev.twitter.com/web/tweet-button , https://dev.twitter.com/cards/overview-->
<!--
<a class="twitter-share-button"
  href="https://twitter.com/intent/tweet?text=Check out http://picoQuery.com - A down to 1k replacement of jQuery&via=picoQuery"
  data-size="large" target="_blank">
Tweet</a>-->

<article>
<?php
include('lib/Parsedown.php');
$Parsedown = new Parsedown();
//$array = explode("\n", ;

echo $Parsedown->text(file_get_contents('README.md'));
?>
</article>
</body>
</html>
