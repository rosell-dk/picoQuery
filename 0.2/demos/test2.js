/* picoQuery.com/builder/ */
// if (void 0===window.$) {window.$ = window.jQuery = function(){

if (!window.$) {
  window.$ = function(){
  }
  document.write('<script src="https://code.jquery.com/jquery-1.9.1.min.js"><' + '/script>');
}
//document.writeln('<script src="https://code.jquery.com/jquery-1.9.1.min.js"><' + '/script>');

function loadScriptSync (src) {
    var s = document.createElement('script');
    s.src = src;
    s.type = "text/javascript";
    s.async = false;                                 // <-- this is important
    document.getElementsByTagName('head')[0].appendChild(s);
}
//loadScriptSync("https://code.jquery.com/jquery-1.9.1.min.js");

/*
var xhrObj = createXMLHTTPObject();
// open and send a synchronous request
xhrObj.open('GET', "https://code.jquery.com/jquery-1.9.1.min.js", false);
xhrObj.send('');
// add the returned content to a newly created script tag
var se = document.createElement('script');
se.type = "text/javascript";
se.text = xhrObj.responseText;
document.getElementsByTagName('head')[0].appendChild(se);
*/
alert($);

