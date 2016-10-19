// https://github.com/HubSpot/youmightnotneedjquery/issues/170#issuecomment-253961268

window.candidates = [
  // jQuery
  function (el, className) {
    $(el).removeClass(className);
  },

  // Current implementation on http://youmightnotneedjquery.com/
  function (el, className) {
    if (el.classList)
      el.classList.remove(className);
    else
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');    
  },

  // Remove multiple classnames, No unwanted spaces-version, IE9+ (alternative 2)
  function(el, className) {
    el.className=el.className.split(" ").filter(function(c){return 0>className.split(" ").indexOf(c)}).join(" ");
  },

  // Remove multiple classnames-version, IE8+
  function (el, className) {
    el.className=el.className.replace(new RegExp("\\b"+className.replace(" ","\\b|\\b")+"\\b","g")," ");
  },

  // Remove multiple classnames, No unwanted spaces-version, IE8+
  function (el, className) {
    el.className = el.className.replace( new RegExp( "\\b" + className.replace( " " , "\\b|\\b" ) + "\\b" , "g" ) , " " ).replace( /\s+/g, " " ).trim();
  },


]
;


