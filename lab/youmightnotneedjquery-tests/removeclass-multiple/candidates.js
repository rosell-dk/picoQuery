// https://github.com/HubSpot/youmightnotneedjquery/issues/170#issuecomment-253961268

window.candidates = [
  // jQuery
  {
    title: 'jQuery',
    shortname: 'jquery',
    description: 'The result of this function is what the other candidates are meassured againts',
    implementation: 
function removeClass(el, className) {
  $(el).removeClass(className);
}
  },
  {
    title: 'Extra spaces removed, IE8+',
    shortname: 'rosell_spaces_removed_ie8',
    description: '',
    author: 'Bjørn Rosell (derived from Peter Boughton)',
    implementation: 
function removeClass(el, className) {
  el.className = el.className.replace(new RegExp("(^|\\s+)" + className.replace(/\s/g,"(?!\\S)|(^|\\s+)") + "(?!\\S)","g"),"").trim();
}
  },
  {
    title: 'Buggy: Extra spaces removed, IE8+',
    shortname: 'rosell_spaces_removed_ie8_buggy',
    description: 'This version is buggy: A classname with dash in may be partly removed. The reason is because the backslash b used for matching word boundaries also matches dashes. So do never use a RegEx based on backslash b in a RegEx used for matching class names!',
    author: 'Bjørn Rosell (picoquery.com)',
    implementation: 
//   el.className = el.className.replace(new RegExp("\\b\\s*" + className.replace(/\s/g,"\\b|\\b\\s*") + "\\b","g"),"").trim();
function removeClass(el, className) {
  el.className = el.className.replace(new RegExp("\\b" + className.replace(/\s/g,"\\b|\\b")+"\\b", "g")," ").replace(/\s+/g," ").trim();
}
  },
  {
    title: 'Extra spaces removed, IE9+ (alternative #1)',
    shortname: 'rosell_spaces_removed_ie9',
    description: 'Browser support: <a href="http://kangax.github.io/compat-table/es5/">IE9+</a>',
    author: 'Bjørn Rosell (picoquery.com)',
    implementation: 
function removeClass(el, className) {
  el.className = el.className.split(/\s/).filter(function(c){return 0>className.split(" ").indexOf(c);}).join(" ");
}
  },
  {
    title: 'Extra spaces removed, IE9+ (alternative #2)',
    shortname: 'rosell_spaces_removed_ie9_v2',
    description: 'Browser support: <a href="http://kangax.github.io/compat-table/es5/">IE9+</a>',
    author: 'Bjørn Rosell (picoquery.com)',
    implementation: 
function removeClass(el, className) {
  el.className = el.className.split(/\s/).filter(function(c){return!(" "+className+" ").match(' '+c+' ')}).join(" ");
}
  },
  {
    title: 'Part of current implementation on youmightnotneedjquery.com',
    shortname: 'youmightnotneedjquery',
    description: 'The implementation on youmightnotneedjquery.com is strange. If classlist is supported, it uses classlist - but classlist does not support removal of multiple class names. Otherwise this code is run - which does. Only, as this test shows, the implemention is buggy, because it removes parts of classnames. See issue <a href="https://github.com/HubSpot/youmightnotneedjquery/issues/170#issuecomment-253961268">here</a>. Never use backslash b in a RegEx used for matching classnames!',
    implementation:
function removeClass(el, className) {
  el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');    
}
  },


/*
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

*/
]
;


