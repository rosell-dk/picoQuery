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
    title: 'el.classList.remove()',
    shortname: 'classlist',
    description: 'This is <a href="http://caniuse.com/#search=classList">IE10+</a>!',
    implementation: 
function removeClass(el, className) {
  el.classList.remove(className);
}
  },
  {
//  el.className=el.className.replace(/(?:^|\s)CLASSNAME(?!\S)/g,"");
    title: 'Extra spaces are removed, IE8+',
    shortname: 'extra_spaces_removed_ie8_v1',
    author: 'Bjørn Rosell (derived from Peter Boughton)',
    description: 'Modified the version by Peter Boughton a bit. 1) I made it more compact by removing the "?:". 2) I added trim(), which makes it overcome the shortcoming that it only almost removes all extra spaces',
    implementation: 
function removeClass(el, className) {
  el.className=el.className.replace(new RegExp("(\\s|^)"+className+"(?!\\S)","g"),"").trim()
}
  },
  {
    title: 'Extra spaces are removed, IE9+',
    shortname: 'rosell_spaces_removed_ie9',
    description: 'More compact and more elegant than IE8+ version, but requires EcmaScript 5. This version is used in <a href="http://picoquery.com">picoQuery</a>, which by design sends older browsers to jQuery. Browser support: <a href="http://kangax.github.io/compat-table/es5/">IE9+</a>',
    author: 'Bjørn Rosell (picoquery.com)',
    implementation: 
function removeClass(el, className) {
  el.className=el.className.split(/\s/).filter(function(c){return c!=className;}).join(" ");
}
  },
  {
    title: 'Extra spaces are removed, IE8+ (v2)',
    shortname: 'extra_spaces_removed_ie8_v2',
    description: 'Modified the version by Andrew Orsich in order to overcome the shortcoming that it only almost removes all extra spaces. Its about as compact as the candidate above, but not as good, because it does not remove classes that apears several times in the class list',
    author: 'Bjørn Rosell',
    implementation: 
function removeClass(el, className) {
  el.className=el.className.replace(new RegExp("(\\s|^)"+className+"(\\s|$)","g")," ").trim()
}
  },
  {
//  el.className=el.className.replace(/(?:^|\s)CLASSNAME(?!\S)/g,"");
    title: 'Extra spaces are *almost* removed, IE8+ (v1)',
    shortname: 'almost_removed_ie8',
    author: 'Peter Boughton',
    description: 'Got this <a href="http://stackoverflow.com/questions/195951/change-an-elements-class-with-javascript">here</a>. Removes most spaces, except the leading space when the first class name is removed.',
    implementation: 
function removeClass(el, className) {
  el.className=el.className.replace(new RegExp("(?:^|\\s)"+className+"(?!\\S)","g"),"")
}
  },
  {
    title: 'Extra spaces are *almost* removed, IE8+ (v2)',
    shortname: 'alt_v3',
    description: 'Got this <a href="http://stackoverflow.com/questions/195951/change-an-elements-class-with-javascript">here</a>',
    author: 'Andrew Orsich',
    implementation: 
function removeClass(el, className) {
  el.className=el.className.replace(new RegExp("(\\s|^)"+className+"(\\s|$)","g")," ")
}
  },
  {
    title: 'Buggy: Part of current implementation on youmightnotneedjquery.com',
    shortname: 'youmightnotneedjquery',
    description: '(removed the el.classList.remove() part of their implementation). Buggy - it removes parts of classnames with dashes',
    implementation:
function removeClass(el, className) {
  el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');    
}
  },
/*  {
    title: 'Buggy: Extra spaces are left as is, IE8+',
    shortname: 'rosell_spaces_left_ie8',
    description: 'Buggy - it removes parts of classnames with dashes. This is the most compact IE8+ version among the candidates. It can be made even smaller by removing the "g" flag. But its in there in case some script added the same class twice (it might happen if a function simply adds the classname without testing if its already there)',
    author: 'Bjørn Rosell (picoquery.com)',
    implementation: 
function removeClass(el, className) {
  el.className=el.className.replace(new RegExp("\\b"+className+"\\b","g"),"");
}
  },
  {
    title: 'Buggy: Extra spaces are removed, IE8+',
    shortname: 'rosell_spaces_removed_ie8',
    description: 'Buggy - it removes parts of classnames with dashes. This is the most compact IE8+ version among the candidates, which succeeds in removing extra spaces in all tests. Like jQuery, it does not remove extra spaces that were there already. Unlike jQuery, it does not convert tabs already to spaces. It can be made even smaller by removing the "g" flag. But its in there in case some script added the same class twice (it might happen if a function simply adds the classname without testing if its already there)',
    author: 'Bjørn Rosell (picoquery.com)',
    implementation: 
function removeClass(el, className) {
  el.className=el.className.replace(new RegExp("\\b"+className+"\\b\\s?","g"),"").trim();
}
  },
  {
    title: 'Buggy: Extra spaces are removed, IE8+ (alternative implementation)',
    shortname: 'rosell_spaces_removed_ie8_2',
    description: 'Buggy - it removes parts of classnames with dashes. Similar to the above. Not as compact. Unlike jQuery, it also replaces extra spaces that where there already. Like jQuery, it converts tabs to spaces',
    author: 'Bjørn Rosell (picoquery.com)',
    implementation: 
function removeClass(el, className) {
  el.className=el.className.replace(new RegExp("\\b"+className+"\\b","g"),"").replace(/\s+/g,' ').trim();
}
  },
*/
  {
    title: 'Extra spaces are *almost* removed, IE8+ (v3)',
    shortname: 'almost_removed_ie8_v3',
    description: 'Got this <a href="http://stackoverflow.com/questions/195951/change-an-elements-class-with-javascript">here</a> and <a href="https://gist.github.com/Maksims/5356227">here</a>',
    author: '',
    implementation: 
function removeClass(el, className) {
  el.className=el.className.replace(new RegExp("(\\s+|^)"+className+"(\\s+|$)","g")," ")
}
  },

  {
    title: 'Alternative version #4 found on the net',
    shortname: 'alt_v4',
    description: 'Got this <a href="http://stackoverflow.com/questions/195951/change-an-elements-class-with-javascript">here</a>',
    implementation: 
function removeClass(el, className) {
  var c0 = (" " + el.className + " ").replace(/\s+/g, " "), c1 = (" " + className + " ").replace(/\s+/g, " ");
  if (c0.indexOf(c1) >= 0) {
      el.className = c0.replace(c1, " ").replace(/\s+/g, " ").replace(/^ | $/g, "");
  }
}
  },
  {
    title: 'IE6+ version found on the net',
    shortname: 'ie6_version',
    description: 'Got this <a href="http://stackoverflow.com/questions/195951/change-an-elements-class-with-javascript">here</a>. Its buggy the respect that it does not work when tab character are used as a space in the HTML. But that is easy to fix (but is it then IE6 compatible?)',
    implementation: 
function removeClass(el, className) {
  function getClassNode(element) {
    for (var i = element.attributes.length; i--;)
      if (element.attributes[i].nodeName === 'class')
        return element.attributes[i];
  }
  var classNode = getClassNode(el), index, classList = classNode.value.split(' ');
  if ((index = classList.indexOf(className)) > -1) {
    classList.splice(index, 1);
    classNode.value = classList.join(' ');
  }
}
  },
  {
    title: 'Buggy version found on the net',
    shortname: 'buggy_version',
    description: 'Do not use this version! It may remove parts of class names. Saw it <a href="http://stackoverflow.com/questions/195951/change-an-elements-class-with-javascript">here</a>',
    implementation: 
function removeClass(el, className) {
  var classes = ""+el.className;
  while (classes.indexOf(className)>-1) {
    classes = classes.replace(className, "");
  }
  el.className = classes;
}
  },
  {
    title: 'angularjs',
    shortname: 'angularjs',
    description: 'Based on angularjs implementation. Not exactly compact, but might turn out to be more reliable in some circumstances yet to discover. Does not remove classnames defined multiple times',
    implementation:
function removeClass(el, className) {
  if (className && el.setAttribute) {
    el.setAttribute('class', 
      (' ' + (el.getAttribute('class') || '') + ' ')
      .replace(/[\n\t]/g, ' ')
      .replace(' ' + className.trim() + ' ', ' ').trim()
    );
  }
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


