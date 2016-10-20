// https://github.com/HubSpot/youmightnotneedjquery/issues/170#issuecomment-253961268

window.candidates = [
  {
    title: 'jQuery',
    shortname: 'jquery',
    description: 'The result of this function is what the other candidates are meassured againts',
    implementation: 
function addClass(el, className) {
  $(el).addClass(className);
}
  },
  {
    title: 'el.classList.add()',
    shortname: 'classlist',
    description: 'This is <a href="http://caniuse.com/#search=classList">IE10+</a>!',
    implementation: 
function addClass(el, className) {
  el.classList.add(className);
}
  },
  {
    title: 'picoquery-based',
    shortname: 'picoquery',
    description: 'Based on picoquery, but with support for custom function removed. It first concatenates the classnames to existing classname, then it cleans the string for tabs, newlines etc and finally it removes duplicates',
    implementation: 
function addClass(el, className) {
  if (el.nodeType === 1) {
    var a = [];
    (el.className + ' ' + className).replace( /[\t\r\n\f]/g, " " ).split(' ').forEach(function(cname) {
      if (cname && a.indexOf(cname)<0) {
        a.push(cname);
      } 
    });
    el.className = a.join(' ');
  }
}
  },
  {
    title: 'youmightnotneedjquery.com (the fallback part when el.classList isnt supported)',
    shortname: 'youmightnotneedjquery',
    description: 'Simply concatenates the classname',
    implementation: 
function addClass(el, className) {
  el.className += ' ' + className;
}
  },
/*  {
    title: 'picoquery-based, minified',
    shortname: 'picoquery.min',
    description: 'Minified version of above',
    implementation: 
function addClass(el,className){
  if (1 === el.nodeType) {
    var a = [];
    (el.className + " " + className).replace(/[\t\r\n\f]/g, " ").split(" ").forEach(function(b) {
      "" != b && 0 > a.indexOf(b) && a.push(b);
    });
    el.className = a.join(" ");
  }
}
  },*/
]
;


