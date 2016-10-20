<!DOCTYPE html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>compliance test - removeClass</title>
<style>
body {padding: 1%}
body > h1, body > h3 {text-align: center;}
.candidate-code {text-align: left; margin-bottom: 50px}
.candidate-code > pre {background-color: #eee; display: inline-block; text-align: left; padding: 10px; margin-bottom: 40px}

pre.printed-code {
  font-size: 11px; font-weight: normal; white-space: pre-line;
  background-color: red;
}

h1 {font-size: 30px;font-weight: normal}
table.testresults {border-collapse: collapse; width:100%;}
th {font-style: italic; font-weight: normal}
td,th {vertical-align:top; border: 1px solid #999; padding: 4px 6px}
td:first-child, th:first-child {
  width: 300px;
}
td:first-child, th:first-child {
  border-left: none;
}
td:last-child, th:last-child {
  border-right: none;
}
/*td.result {background-color:#bbffbb}*/
td.result.failed {background-color: #ffbbbb}
td.result.passed {background-color:#bbffbb}
td.expected-result {background-color: #eee}

table.testresults {table-layout: fixed}
table.testresults.summary {width: auto}
table.testresults.summary th {font-size: 12px; font-weight: bold; text-align: left;vertical-align: bottom; border: 0 none;}
table.testresults.summary th, table.testresults.summary td {}
table.testresults.summary th:first-child, table.testresults.summary td:first-child {}
table.testresults.summary td pre {font-size: 11px; font-weight: normal; white-space: pre-line}
table.testresults.summary td p {font-size: 13px;white-space: pre-line}
table.testresults.summary th.group {text-align: center}
table.testresults.summary th.group div{width: 98%; background-color: #666; color: white; padding: 3px}
table.testresults.summary td .col1 {min-width: 300px}
table.testresults.summary td .col1 a.internal_anchor {color: black; text-decoration: none}
table.testresults.summary td .col1 a.internal_anchor:hover {text-decoration: underline}
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
#infobox {
  position: absolute;
  z-index: 10;
  background-color: #ffffbb;
  border: 1px solid #666;
  padding: 10px 10px 5px 10px;
  font-size: 12px;
  max-width: 350px;
}
#infobox pre {
  margin: 2px 0 2px;
}
#infobox b {
  font-weight: normal;
/*  text-decoration: underline;*/
  font-style: italic;
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
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="candidates.js"></script>
<script src="tests.js"></script>
<script src="evaluator.js"></script>
<script src="../compliance-test.js"></script>
</head>

<body>
<?php 
include($_GET['method'] . '/description.inc');
?>

</body>
</html>
