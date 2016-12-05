<!DOCTYPE html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>picoQuery compliance test</title>
<style>
body {padding: 1%}
body > h1, body > h3 {text-align: center;}
h1 {font-size: 30px;font-weight: normal}
h3.fighters {}
h3.fighters > span {display: inline-block;font-size: 20px; border:2px dashed black; padding: 10px 20px} 
h3.fighters .vs {font-weight: normal; padding:0 30px; font-size:18px; border}
#groups {margin-bottom:20px; width: 70%; margin: 0 auto 40px; padding: 10px}
#groups * {padding: 0 10px}
#groups a {color: black; text-decoration: none; display: inline-block;}
#groups a.active {text-decoration: underline; font-size: 140%}
table#testresults {border-collapse: collapse; width:100%; table-layout:fixed}
tr.group {background-color:#aaaaee; line-height:2.4em;}
tr.group th {font-style: normal; font-weight: bold; letter-spacing: 2px; text-align: center; padding-left: 0px} /*  text-transform: uppercase; */
tr.endgroup td {padding-top:30px; border-top: none;}
tr.subgroup {background-color:#fff; line-height:1.4em;}
tr.subgroup th {text-align: left; padding-left: 0px;font-style: normal; font-weight: bold;padding-top: 15px; border-bottom: none;border-top: none;}
tr.subgroup.empty {border:0}
tr.endsubgroup td {padding-top:30px; border-top: none; border-bottom: none}
th.no_tests_available_yet {text-align: left; border-top: none; border-bottom: none}
tr.frameworks {background-color:#fff;}
tr.frameworks th {border-top: none; border-bottom: none; padding: 3px 15px; color: #222; vertical-align: bottom; border-color: white;}
tr.frameworks th.subgroup {text-align: left; padding-left: 5px;font-style: normal; font-weight: bold;padding-top: 25px; border-bottom: none; white-space: nowrap}

tr th {font-style: italic; font-weight: normal}
td,th {vertical-align:top; border: 1px solid #999; padding: 4px 6px}
td.test {background-color:#eee}
td:first-child, th:first-child {
  width: 300px;
}
td,th {
  width: 25%;
}
td:first-child, th:first-child {
  border-left: none;
}
td:last-child, th:last-child {
  border-right: none;
}
td:nth-child(n+4) {background-color:#bbffbb}
td.mismatch {background-color: #ffbbbb}
/*.code {max-width:20%;overflow:hidden;text-overflow: ellipsis; white-space:nowrap;}*/
.code {padding-left:25px;text-indent:-25px;}  /* in order to get second+ line indented*/
.array {}
.comma {padding:0 10px; font-weight: bold}
.tagname {color: blue;}
.element-html {color: blue;}
.error-description {font-size:12px;display: block; padding-top:3px}
.tagid {color: darkblue;}
.value {color: blue;}
/*.error {color: red;}*/
.italic {
  font-style: italic;  
}
.zero-width-space {
  font-size: 22px;
}
.italic-important {
  font-style: italic!important;
}
.display-none {
  display: none;
}
.inline-block {
  display: inline-block;
}
.tablecell, tablecell { /* used for testing show() method */
  display: table-cell;
}



#testhtml {
  border: 1px solid #ccc;
  padding: 10px;
  float: right;
  font-size: 10px;
}

li.odd {
  font-style: italic;
}
</style>
<script src="compliance-tests.js"></script>
<script>
var frameworks = [];
</script>

<?php
//$frameworks = isset($_GET['frameworks']) ? explode(',', $_GET['frameworks']) : array('jquery-1.9.1.min.js', 'picoquery-0.2.1-ffff1fff.min.js', 'picoquery-0.2.1-ffff1fff.js');

//$frameworks = isset($_GET['frameworks']) ? explode(',', $_GET['frameworks']) : array('jquery-1.12.4.min.js', 'picoquery-0.4.0-full.min.js', 'picoquery-0.4.0-full.js');
$frameworks = isset($_GET['frameworks']) ? explode(',', $_GET['frameworks']) : array('jquery-1.12.4.min.js', 'picoquery', 'zepto', 'cash');

//$frameworks = isset($_GET['frameworks']) ? explode(',', $_GET['frameworks']) : array('jquery-2.2.4.js');
// frameworks=picoquery-0.2-1100.js,zepto1.2.0

if (isset($_GET['group'])) {
  echo '<script>var groupsToShow = "' . $_GET['group'] . '"</script>' . "\n";
}
else {
  echo '<script>var groupsToShow = "all"</script>' . "\n";
}

function pushFramework($framework) {
  echo '<script>frameworks.push([window.$, "' . $framework . '", window.jQuery || window.$]); window.$=undefined; window.jQuery=undefined;</script>' . "\n";
}

// Angular needs to be included before jQuery / picoQuery
foreach ($frameworks as $index => $framework) {
  if (strpos($framework, "angularjs") === 0 ) {

    $found = preg_match('/angularjs-([0-9.]*)\.(.*)/i', $framework, $matches);
    $version = $matches[1];
    $ext = $matches[2];

    echo '<script src="https://ajax.googleapis.com/ajax/libs/angularjs/' . $version . '/angular.' . $ext . '"></script>' . "\n";
//    echo '<script src="jqLite1.5.7.js"></script>' . "\n";
    echo '<script>window.$ = window.jQuery = angular.element</script>';
    echo '<script>console.log("angular", window.$);</script>';


//    $framework = 'jqLite 1.5.7';
    $frameworks[$index] = $framework;
    pushFramework($framework);

    // article about jqLite:
    // https://docs.angularjs.org/api/ng/function/angular.element
    // http://www.informit.com/articles/article.aspx?p=2271482&seqNum=10
  }
}

foreach ($frameworks as $index => $framework) {
  if (strpos($framework, "jquery") === 0 ) {
//    jQuery's CDN didn't seem quite stable (21 SEP 2016), so we use Google's instead
//    echo '<script src="https://code.jquery.com/' . $framework . '"></script>';
    $found = preg_match('/jquery-([0-9.]*)\.(.*)/i', $framework, $matches);
    $version = $matches[1];
    $ext = $matches[2];
    
//    echo '<script src="https://ajax.googleapis.com/ajax/libs/jquery/' . $version . '/jquery.' . $ext . '"></script>' . "\n";
    echo '<script src="jquery-1.12.4.js"></script>' . "\n";

//    echo '<script src="../feature-detect/feature-detect.js"></script>';

//    echo '<script>j$ = window.$</script>';
    pushFramework($framework);
  }
  if (strpos($framework, "pico") === 0 ) {
    if ($framework == "picoquery") {
      $framework = "picoquery-0.4.0-full.min.js";
      $frameworks[$index] = $framework;
    }
    if ($_SERVER['HTTP_HOST'] == 'picoquery.com') {
      // Use CDN when on live server
      echo '<script src="http://cdn.picoquery.com/' . $framework . '"></script>' . "\n";
    }
    else {
      echo '<script src="/src/' . $framework . '"></script>' . "\n";
    }    
    pushFramework($framework);
  }

  if ($framework == "zepto") {
    $framework = "zepto1.2.0.min.js";
    $frameworks[$index] = $framework;
  }
  if ($framework == "zepto1.2.0.min.js") {
    echo '<script src="zepto.min.js"></script>' . "\n";
    pushFramework($framework);
  }
  if ($framework == "zepto1.2.0.js") {
    echo '<script src="zepto.js"></script>' . "\n";
    pushFramework($framework);
  }
  if ($framework == "cash") {
    $framework = "cash1.3.0.min.js";
    $frameworks[$index] = $framework;
  }
  if ($framework == "cash1.3.0.min.js") {
//    echo '<script src="https://cdn.jsdelivr.net/cash/1.3.0/cash.min.js"></script>' . "\n";
      echo '<script src="cash1.3.0.min.js"></script>' . "\n";
    pushFramework($framework);
  }

  if (strpos($framework, "angularjs") === 0 ) {
    continue;
  }


}
?>



<?php
// include jQuery, if it isn't
if (strpos($frameworks[0], 'jquery') === FALSE) {
  echo '<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>' . "\n";
  echo '<script>var j$ = $;console.log("jq", $)</script>';
//  pushFramework('jQuery-1.12.4.min.js');
//  echo '<script>$ = j$</script>';
}
else {
  echo '<script>var j$ = frameworks[0][0];var $=j$;</script>';
}
?>
<!--
<script src="chosen_v1.6.2/chosen.jquery.min.js"></script>
<link rel="stylesheet" href="chosen_v1.6.2/chosen.css">-->

<script src="compliance-test.js"></script>

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

<body>

<h1>Compliance test</h1>
<?php //print_r($frameworks); echo implode(',', array_slice($frameworks,1)); ?>
<h3 class="fighters"><span><span class="framework-selector"><?php echo implode('</span><span class="vs">and</span><span class="framework-selector">', array_slice($frameworks,1)) ?></span><span class="vs">tested against</span><?php echo $frameworks[0] ?></span></h3>
<div id="groups"></div>
<p>Each line in the table below represents a test. First column is the test code. Second column is the result of the test code evaluated in <?php echo $frameworks[0] ?>. Third column is the result of the test code evalaluated in <?php echo $frameworks[1] ?><?php if (count($frameworks) > 2) echo ' etc' ?>. If the results are the same, the background will be green, otherwise red.</p>
<p>When the test code is evaluated, <i>$</i> points to the framework that is tested. <i>jq$</i> always points to jQuery 1.9.1. Its used to facilitate making tests that does not rely on other methods than the test in question</p> 

<table id="testresults">
  <colgroup>
<?php
for ($i = count($frameworks)+2; $i>0; $i--) {
  echo '<col width="' . (100/(count($frameworks)+1)) . '%"></col>';
}
?>
  </colgroup>
  <tbody>
  </tbody>
</table>
<!--<p>You can also view the console for the same output</p>-->

<div id="testhtml" style="position:relative">
  <b>This HTML is here for the tests:</b>
  <div id="auto_margin" style="width:50px;margin:0 auto">automargin</div>
  <div id="nomargin" style="width:50px;">nomargin</div>
  <div id="test" >
    <ul id="ul0" class="level0">
      <li id="item1" class="odd">item 1</li>
      <li id="item2" class="even" style="font-style:italic">item 2
        <ul id="ul2" class="level1">
          <li id="item2_1" class="odd">item 2.1</li>
        </ul>
      </li>
      <li id="item3" class="odd" style="position:relative">item 3
        <ul id="ul3" class="level1">
          <li id="item3_1" class="odd">item 3.1</li>
          <li id="item3_2" class="even">item 3.2</li>
        </ul>
      </li>
      <li id="item4" class="even">item 4</li>
      <li id="hidden_li" class="odd" style="display:none">hidden item</li>
    </ul>
  </div>
  <form style="position:absolute">
    <b>test</b>
    <input id="submitbtn" name="Submit" value="Submit" type="button">
  </form>
  <i class="tablecell">tablecell</i>
  <iframe id="testiframe" src="about:blank" style="width:100px; height: 60px"></iframe>
  <table><tr>
    <td id="valignmiddle" style="vertical-align:middle">
      <p>Vertically centered content</p>
    </td></tr>
  </table>
</div>

</body>
</html>
