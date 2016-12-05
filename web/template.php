<?php
include('../lib/Parsedown.php');
$Parsedown = new Parsedown();
$md_path = '../docs/';

$page = $_GET['page'];
if ($page == '') {
  $page = 'index';
}
$page_filename_no_ext = $md_path . $page;
if (is_dir($page_filename_no_ext)) {
  $page_filename_no_ext .= '/index';
}
//echo $page_filename;

if (!is_file($page_filename_no_ext . '.md')) {
  header("HTTP/1.0 404 Not Found");
  $page_filename_no_ext = $md_path . '404';
}

$page_md = file_get_contents($page_filename_no_ext . '.md');

// TODO: grab first line, insert it as <title>
?>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?php 
// If first line in md-file is a heading, use that as the title
preg_match('/#\s*(.*)/', $page_md, $matches);
$title = 'picoQuery';
if (count($matches) == 2) {
  $title = $matches[1];
}
echo $title;

// By the way, should you want to support other metadata, such as keywords for search engines, you could
// consider using the same syntax for metadata as MultiMarkdown does: http://fletcher.github.io/MultiMarkdown-4/metadata
?></title>

  <link rel="stylesheet" href="/css/style.css" type="text/css" media="all">
<?php
if (is_file($page_filename_no_ext . '-HEAD.html')) {
  echo file_get_contents($page_filename_no_ext . '-HEAD.html');
}
if ($page == 'compliance_chart') {
}
?>
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-85714014-1', 'auto');
    ga('send', 'pageview');

  </script>
<?php
if (($page == 'compliance_chart') || ($page == 'compliance_chart_0.5.0')) {
  echo '<link rel="stylesheet" href="/css/compliance_chart.css" type="text/css" media="all">';
  echo '<link rel="stylesheet" href="/css/tipr.css" type="text/css" media="all">';
//  echo '<script src="http://cdn.picoquery.com/picoquery-0.4.0-full.min.js"></script>';
  echo '<script src=https://code.jquery.com/jquery-1.12.4.min.js></script>';
  echo '<script>var page="' . $page . '";</script>';
  echo '<script src="/scripts/compliance_chart.js"></script>';
}
else {
  if (($page != 'index') && ($page != 'subsets')) {
    echo '<script src="http://cdn.picoquery.com/picoquery-0.4.0-full.min.js"></script>';
  }
}

?>
<script>
window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"));</script>
<!-- Place this tag in your head or just before your close body tag. -->
<!--<script async defer src="https://buttons.github.io/buttons.js"></script>-->
<script>
$(function() {
  var path = location.pathname;
  $('nav a').each(function() {
    var href = $(this).attr('href');
    if (href == path) {
      $(this).parent().addClass('current');
      $(this).parent().parent().addClass('current-trail');
    }
  })
})
</script>
<!-- Piwik -->
<script type="text/javascript">
  var _paq = _paq || [];
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//picoquery.com/piwik/";
    _paq.push(['setTrackerUrl', u+'piwik.php']);
    _paq.push(['setSiteId', '1']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
  })();
</script>
<noscript><p><img src="//picoquery.com/piwik/piwik.php?idsite=1" style="border:0;" alt="" /></p></noscript>
<!-- End Piwik Code -->

</head>
<body class="<?php 
echo str_replace("/", "-", $page);
?>">
<!-- https://buttons.github.io/ -->
<!--<a class="github-button" href="https://github.com/rosell-dk/picoquery" data-icon="octicon-star" data-style="mega" data-count-href="/rosell-dk/picoquery/stargazers" data-count-api="/repos/rosell-dk/picoquery#stargazers_count" data-count-aria-label="# stargazers on GitHub" aria-label="Star rosell-dk/picoquery on GitHub">Star on github</a>
-->

<sidebar>
  <a href="/" id="logo"><img src="/img/logo-featherQ.png"></a>
  <nav>
  <?php
  // Insert menu
  $menu_md = file_get_contents('nav.md');
  echo $Parsedown->text($menu_md);
  ?>
  </nav>
</sidebar>

<main>
  <article>
  <?php
/*  if ($page == 'index') {
    echo '<intro>';
    echo '<p>picoQuery implements a subset of jQuery.<br>&ndash; A subset *you* get to choose.</p>';
//    echo '<p><small>(And its light. <small>Very <small>very <small>very light</small></small></small>)</small></p>';
    echo '<p><small>Its IE9+, but automatically falls back to jQuery<br> (so actually, it is IE6+)</small></p>';
    echo '</intro>';

  }*/
  //$array = explode("\n", ;
  echo $Parsedown->text($page_md);

  if ($page == 'index') {
    echo '<div class="twitter-btn"><a href="https://twitter.com/intent/tweet?text=http%3A%2F%2Fpicoquery.com - A%20down%20to%201k%20replacement%20of%20jQuery"><i></i><span>Tweet</span></a></div>';
  }

  ?>
  </article>
</main>
</body>
</html>
