/*
.removeClass() 

Description:
  Remove a single class, multiple classes, or all classes from each element in the set of matched elements.
  https://api.jquery.com/removeclass/

Supported signatures:

  .removeClass( className ) => jQuery
     className [String]: 
        One or more space-separated classes to be removed to the class attribute of each matched element.

  .removeClass( ) => jQuery
     Removes all classes in the set of matched elements

  .removeClass( function ) => jQuery
     function [Function( Integer index, String currentClassName ) => String]:
       A function returning one or more space-separated class names to be removed. 
       Receives the index position of the element in the set and the old class value as arguments.


    In version 0.1, we tested for el.classList support, and used that feature if available
    Like this:
     if (el.classList)
       el.classList.remove(className);

    - and we used the regexp below in order to support the browsers that have no ".classList" support.
    HOWEVER,
      This is problematic, because el.classList is only partially supported in some browsers
      - for example IE10 and IE11. (http://caniuse.com/#feat=classlist)
      In these browsers, classList does not work on SVG elements and MathML elements.
    ALSO
      IE10/11 and Firefox < 26 only supports removing ONE element at a time
      (according to: https://developer.mozilla.org/en/docs/Web/API/Element/classList)

    To circumvent this, we use the previous fallback for ALL browsers
    This also produces less code (which is reason enough)
    And we cannot rely on solely on el.classList support, as IE9 doesn't support it (as well as other
    browsers that we are supporting)
    Youmightnotneedjquery uses this code: http://youmightnotneedjquery.com/
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');

    But this has a serious flaw.
    When multiple classes are replaced, it will ie change the class "elephant" to "ele", if you call removeClass("test phant")
     /(^|\b)MyClass|phant(\b|$)/gi does that
    Also jQuery does not ignore case (and neither does classList.remove), so we should not ignore case
    Also, className.split(' ').join('|') can be shortened to: className.replace(' ', '|')
    In order to circumvent the elephant problem, we need a regex pattern like this: 
    (^|\b)classname1(\b|$))|((^|\b)classname2(\b|$)
    resulting in code:
    el.className=el.className.replace(new RegExp('(^|\\b)'+className.replace(' ','(\\b|$)|(^|\\b)')+'(\\b|$)','g'),' ');
    We can however make the code a bit smaller with a little trick:
    el.className=(' '+el.className+' ').replace(new RegExp('\\b'+className.replace(' ','\\b|\\b')+'\\b','g'),' ');
    Optimized regex-version:
    removeClass: function(b){return __EACH__(this,function(a){a.className=(" "+a.className+" ").replace(new RegExp("\\b"+b.replace(" ","\\b|\\b")+"\\b","g")," ")})}
    The code above can produce strings that start or end with space.
    We could remove it with .trim() (http://www.w3schools.com/jsref/jsref_trim_string.asp)
    - But we take the chance that the extra space does not pose problems in any browser
    alternative idea: Use array.filter
    Browser support: (IE9+), so good enough (according to http://www.w3schools.com/jsref/jsref_filter.asp)
    this way of doing it seems less prone to error than the regex above, and it does not add spaces 
    However, it is a few bytes longer (actually just five bytes longer, when optimized)

    el.className=el.className.split(" ").filter(function(v){
      // v is a classname currently in the element.
      // now, determine if it should be kept.
      // we must return true if it should be kept and false, if it should be removed
      // if its not in the list of classnames that are going to be removed, we keep it
      return(" "+className+" ").search(' '+v+' ')<0
    }).join(" ");

    short version:    
    el.className=el.className.split(" ").filter(function(v){return(" "+className+" ").search(' '+v+' ')<0}).join(" ");

    actually, the callback need not return a boolean, just a 'truthy' value (a value that coerces to true)
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    https://developer.mozilla.org/en-US/docs/Glossary/Truthy
    but that cannot be exploited in this case. And neither can this:
    x>=0 can be expressed as ~x
    x<0 can be expressed as !~x (no win)


    But well well. Found a way to make it shorter, by using "match" instead of "search".
    Now, its just two bytes longer than the regex version! (optimized)

    el.className=el.className.split(" ").filter(function(v){return!(" "+className+" ").match(' '+v+' ')}).join(" ");

    Does defining the space string (" ") in a var makes it smaller? No, exactly the same length:
    var s=' ';el.className=el.className.split(s).filter(function(v){return!(s+className+s).match(s+v+s)}).join(s);

    However, the space-string might get useful in other methods as well. So perhaps its worth defining on the same level 
    as the helper functions (__EACH__, etc).
    Defining it here costs 6 bytes (",s=' '"). Defining it locally above costs 10 bytes (because of the "var" keyword).
    So totally this version will then be cheaper! (two bytes).
    Only thing is that it occupies one of the short variable names. 
    Also, we need some intelligence. 
    Defining the space string costs 6 bytes. Using the defined space string instead of inlining it
    saves 2 bytes each time. So it is only worth defining a space string, if it is used at least 4 times.
    We want to get this general logic in place before using a space string.
    Once its in place, the filter-version will result in picoQuery being 2 bytes shorter than the regex-version

    Then we will be able to write something like this:
    el.className=el.className.split(__SPACE_STRING__).filter(function(v){return!(__SPACE_STRING__+className+__SPACE_STRING__).match(__SPACE_STRING__+v+__SPACE_STRING__)}).join(__SPACE_STRING__);

    We could also concider adding a helper function _SPACE_WRAP_ that wraps a string in spaces
    It will however cost 27 bytes ("function(a) {return s+a+s},"), but only spare 1 byte each time its used ("s+v+s" versus "S(v)")
    Its unlikely that it will be used 27+ times

    Alternatively, we could define a general junk-variable in the helper-section. It costs 2 bytes: ",j"
    With that in place, there is no need for the "var " - 4 bytes are saved
    j=' ';el.className=el.className.split(j).filter(function(v){return!(j+className+j).match(j+v+j)}).join(j);


    We could of course also aply these tricks on the regex-version:

    original:
    el.className=(' '+el.className+' ').replace(new RegExp('\\b'+className.replace(' ','\\b|\\b')+'\\b','g'),' ');

    Utilizing junk-variable (costs 2 bytes - so its break even, but if junk variable is used other places we gained)
    j='\\b';el.className=(' '+el.className+' ').replace(new RegExp(j+className.replace(' ',j+'|'+j)+j,'g'),' ');

    Utilizing junk-variable (2 bytes) and __SPACE_STRING__ (6 bytes).
    j='\\b';el.className=(s+el.className+s).replace(new RegExp(j+className.replace(s,j+'|'+j)+j,'g'),s);


    But wait... I now realize that we did not even need the ^ and $ in the original regex in the first place! - \b catches these!
    This means we do not need the trick with padding the string with ' '.

    So the new "original" is this:
    el.className=el.className.replace(new RegExp('\\b'+className.replace(' ','\\b|\\b')+'\\b','g'),' ');

    with junk-variable:
    j='\\b';el.className=el.className.replace(new RegExp(j+className.replace(' ',j+'|'+j)+j,'g'),' ');

    the "filter"-variation now seems knocked out.


    Another issue is that we use a lot of characters with the assignment:
    el.className=el.className[...]
    - we need the long "className" twice.

    To avoid this, we could provide a helper function that does the assignment:

    // modify property of an object to return value of callback
    function m(obj, name, cb) {
      obj[name] = cb.call(null, obj[name]);
    }

    then instead of ie writing:
    el.className = el.className + 'hello';

    we can write:
    m(el,'className',function(v){return v + 'hello'});

    no gain. UNLESS, of cause, that the function is used several places
    with a helper function like this:
    function h() {return return v + 'hello'}

    - we can write:
    m(el,'className',h);

    in our case, we may find some reuse...

    DONE: fiddle with Array.indexOf. It may result in shorter code overall, because it may be 
    more friendly to reuse array helper functions

    it requires ECMAScript 5. Check if that is ok requirement here:
    http://caniuse.com/#feat=es5

    Here somebody made a array_intersect in javascript:
    http://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript


    When and if builder supports custom browser-support, we can use this for very modern browsers:
      el.classList.remove(className)
    When builder supports custom tweaking, we can have these tweaks:
      - Only support one classname (with IE10/11, we can use classList - with default support, we can get smaller code)
      - Accept that it does not work on SVG / MathML elments


    What is the shortest possible function when we do not need to support multiple classnames?

    Lets try modifying the regex-variant

    it was:    
      el.className=el.className.replace(new RegExp('\\b'+className.replace(' ','\\b|\\b')+'\\b','g'),' ');

    we no longer need the "className.replace(' ','\\b|\\b')" part. So it becomes:
      el.className=el.className.replace(new RegExp('\\b'+className+'\\b','g'),' ');

    (no gain using junk-variable here.)

    TODO: Tell youmightnotneedjquery.com about our improved functions.
    - but wait till picoQuery is more mature, so they may be impressed and help promote picoQuery

    We could consider removing the 'g' flag, as we only expect the class name to apear once in the class-list
    but its not quite safe. If for example we have <body class="no-js no-js">, removeClass('no-js'), will only
    remove one of them. The same classname can also accidently be added twice with javascript

    We could consider moving regex object creation to helper (cost: 49 chars)
    R:function(a,b) {return new RegExp(a, b || 'g')},

    It then becomes (9 chars smaller):
      el.className=el.className.replace(R('\\b'+className+'\\b'),' ');

    Or, we can move the entire regex replacement to helper (cost: 63 chars)
    R:function(a,b,c){return a.replace(new RegExp(a, b || 'g'),c)},

    It then becomes (18 chars smaller):
      el.className=R(el.className,'\\b'+className+'\\b',' ');

    - So it only makes sense, if its used at least 4 times.
    When the framework is there, we can make a helper, and mark that the treshold between inline or not is 4
    That is - if we find this can ever be the case.

    Or even combine with the "m"-function:

    function m(obj, name, cb) {
      obj[name] = cb.call(null, obj[name]);
    }

    // Reg-ex replace
    function R(a,b,c) {
      return a.replace(new RegExp(b,'g'),c)
    }

    m(el,'className',R,'\\b'+className+'\\b');

    minified:
    m(a,'className',R,'\\b'+b+'\\b', ' ');


    However, lets wait with this until we have the builder ready for
    selecting partial support
    el.className=el.className.split(" ").filter(function(v){return (" "+className+" ").indexOf(v)==-1}).join(" ");
    el.className = el.className.split(" ").filter(function(v){return (" " + className + " ").indexOf(v) >= 0}).join(" ");
    j='\\b';el.className=el.className.replace(new RegExp(j+className.replace(' ',j+'|'+j)+j,'g'),' ');
    el.className=el.className.replace(new RegExp('\\b'+className.replace(' ','\\b|\\b')+'\\b','g'),' ');
    el.className=el.className.replace;
    el.className=el.className.replace(new RegExp("\\b"+className.replace(" ","\\b|\\b")+"\\b","g")," ");
    Very barebone version:
    - only one class name may be removed at at time
    - only allows one class name to be specified
    - may result in unwanted spaces
    - does not remove several instances (only removes one of the "a"'s in class="a a b")
    el.className=el.className.replace(new RegExp("\\b"+className+"\\b"),"");
    Barebone version:
    - only one class name may be removed at at time
    - only allows one class name to be specified
    - may result in unwanted spaces
    + removes several instances (removes both "a"'s in class="a a b")
    el.className=el.className.replace(new RegExp("\\b"+className+"\\b","g"),"");
    Less barebone version:
    - only one class name may be removed at at time
    + there will be no unwanted spaces
    + removes several instances (removes both "a"'s in class="a a b")
    (trim() is not enough, if we dont want to risk double spaces between class names)
    el.className=el.className.replace(new RegExp("\\b"+a+"\\b","g"),"").replace(/\s\s/,' ').trim();
    el.className=el.className.split(" ").filter(function(c){return c!=className;}).join(" ");
    Alternative version:
    + several class names can be removed in one go (space seperated)
    - may result in unwanted spaces
    + removes several instances (removes both "a"'s in class="a a b")
    el.className=el.className.replace(new RegExp("\\b"+className.replace(" ","\\b|\\b")+"\\b","g")," ");
    Deluxe version:
    + several class names can be removed in one go (space seperated)
    + there will be no unwanted spaces
    + removes several instances (removes both "a"'s in class="a a b")
    el.className=el.className.split(" ").filter(function(c){return!(" "+className+" ").match(' '+c+' ')}).join(" ");
    el.className=el.className.split(" ").filter(function(c){return 0>className.split(" ").indexOf(c);}).join(" ");





    //console.log(className.replace(' ','\\b|\\b')+'\\b');
//el.className=el.className.replace(new RegExp('(^|\\b)'+className.replace(' ','(\\b|$)|(^|\\b)')+'(\\b|$)','g'),' ');
/*
    el.className=el.className.split(" ").filter(function(v){
      // v is a classname currently in the element.
      // now, determine if it should be kept.
      // we must return true if it should be kept and false, if it should be removed
      // if its not in the list of classnames that are going to be removed, we keep it

      return className.split(" ").indexOf(v) < 0;

//      return!(" "+className+" ").match(' '+v+' ')
//      return(" "+className+" ").search(' '+v+' ')<0
    }).join(" ");

//    el.className=(' '+el.className+' ').replace(new RegExp('\\b'+className.replace(' ','\\b|\\b')+'\\b','g'),' ');

  });
  return this*/

removeClass: function(a) {
  __ITERATE__(<@ this.e @>, <@ function(el, index){
    if (!a) {
      // remove all classes
//      el.setAttribute("class", "");
      el.className = "";
    }
    else {
      var z = __IS_FUNCTION__(<@ a @>) ? a.call(null, index, el.className) : a;

      el.className=el.className.split(/\s/).filter(function(c){
    //    return!(" "+a+" ").match(' '+c+' ')  // 9 bytes longer in gzip
          return 0 > z.split(" ").indexOf(c);
      }).join(" ");

    }
  } @>);
  return this
}

