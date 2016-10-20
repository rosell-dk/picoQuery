// https://github.com/HubSpot/youmightnotneedjquery/issues/170#issuecomment-253961268

window.candidates = [
  // jQuery
  {
    title: 'jQuery',
    shortname: 'jquery',
    description: 'The result of this function is what the other candidates are meassured againts',
    implementation: 
function toggleClass(el, className) {
  $(el).toggleClass(className);
}
  },
  {
    title: 'el.classList.toggle()',
    shortname: 'classlist',
    description: 'This is <a href="http://caniuse.com/#search=classList">IE10+</a>!',
    implementation: 
function toggleClass(el, className) {
  el.classList.toggle(className);
}
  },
  {
    title: 'All browsers (no multi-toggle)',
    shortname: 'allbrowsers',
    author: 'Bjørn Rosell (picoquery.com)',
    description: 'Simply embeds the hasClass, removeClass and addClass implementations. Do you also use the other methods, and does it itch in your fingers to reuse that code instead? Well, go ahead. But concider that your server probably gzips the script, and that gzipped version will not be smaller with reusage.',
    implementation: 
function toggleClass(el, className) {
  if (new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className)) {
    el.className=el.className.replace(new RegExp("(\\s|^)"+className+"(?!\\S)","g"),"").trim();
  }
  else {
    el.className = (el.className + ' ' + className).trim();
  }
  
}
  },
  {
    title: 'IE9+ (no multi-toggle)',
    shortname: 'ie9',
    author: 'Bjørn Rosell (picoquery.com)',
    description: '',
    implementation: 
function toggleClass(el, className) {
  if (el.className.split(/\s/).some(function(c){return c==className;})) {
    el.className=el.className.split(/\s/).filter(function(c){return c!=className;}).join(" ");
  }
  else {
    el.className = (el.className + ' ' + className).trim();
  }
  
}
  },
  {
    title: 'IE9+ (multi-toggle)',
    shortname: 'ie9_multi',
    author: 'Bjørn Rosell (picoquery.com)',
    description: '',
    implementation: 
function toggleClass(el, className) {
  className.split(/\s/).forEach(function(className) {
    if (el.className.split(/\s/).some(function(c){return c==className;})) {
      el.className=el.className.split(/\s/).filter(function(c){return c!=className;}).join(" ");
    }
    else {
      el.className = (el.className + ' ' + className).trim();
    }
  });
}
  },

]
;


