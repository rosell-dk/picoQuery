// https://github.com/HubSpot/youmightnotneedjquery/issues/170#issuecomment-253961268

window.candidates = [
  {
    title: 'jQuery',
    shortname: 'jquery',
    description: 'The result of this function is what the other candidates are meassured againts',
    implementation: 
function hasClass(el, className) {
  return $(el).hasClass(className);
}
  },
  {
    title: 'el.classList.contains()',
    shortname: 'classlist',
    description: 'This is <a href="http://caniuse.com/#search=classList">IE10+</a>!',
    implementation: 
function hasClass(el, className) {
  return el.classList.contains(className);
}
  },
  {
    title: 'All browsers',
    shortname: 'ie8',
    author: 'Bjørn Rosell (and probably many more)',
    description: '',
    implementation: 
function hasClass(el, className) {
  return new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className);
}
  },
  {
    title: 'IE9+',
    shortname: 'ie9',
    author: 'Bjørn Rosell (picoquery.com)',
    description: 'Browser support: <a href="http://kangax.github.io/compat-table/es5/">IE9+</a>',
    implementation: 
function hasClass(el, className) {
  return el.className.split(/\s+/).some(function(c){return c==className;});
}
  },
  {
    title: 'Buggy: youmightnotneedjquery.com (the fallback part when el.classList isnt supported)',
    shortname: 'youmightnotneedjquery',
    description: 'Buggy, because it ignores case and doesnt handles other space characters than ordinary space. Also, there really is no need for a global search (the "g" modifier)',
    implementation: 
function hasClass(el, className) {
  return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}
  },
  {
    title: 'zepto-based',
    shortname: 'zepto',
    description: 'Based on zepto, but with support for custom function removed.',
    implementation: 
function hasClass(el, className) {
  if (!classCache) {
    var classCache = {}
  }
  function classRE(name) {
    return name in classCache ?
      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
  }
  // access className property while respecting SVGAnimatedString
  function cName(node, value){
    var klass = node.className || '',
        svg   = klass && klass.baseVal !== undefined
    return svg ? klass.baseVal : klass
  }
  if (!className) return false
  return classRE(className).test(cName(el));
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


