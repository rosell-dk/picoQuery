window.complianceTests = [
  {
    name: '.addClass()',
    tests: [
      {
        name: '.addClass( className )',
        tests: [
          ['$("<div/>").addClass("test").get(0).className', ""],
          ['$("<div/>").addClass("test").addClass("test2").get(0).className', ""],
          ['$("<div/>").addClass("test ").get(0).className', ""],
          ['$("<div/>").addClass("test2 test2").get(0).className', ""],
          ['$("<div/>").addClass("test2").addClass("test2").get(0).className', ""],
          ['$("<div/>").addClass(" ").get(0).className', ""],
          ['$("<div/>").addClass("\t").get(0).className', ""],
          ['$("<div class=\ttest/>").addClass("t2").get(0).className', ""],
          ['$($("<div>text</div>").get(0).childNodes[0]).addClass("t").get(0).className', ""],
        ]
      },
      {
        name: '.addClass( function )',
        tests: [
          ['$("<div class=\'a b\'/>").addClass(function(a,b){return "b"+a+b}).get(0).className', ""],
        ]
      }
    ]
  },
  {
    name: '.append()',
    tests: [
      {
        name: '.append( content [,content] )',
        tests: [
        ]
      },
      {
        name: '.append( function )',
        tests: [
        ]
      },
    ]
  },
  {
    name: '.appendTo()',
    tests: [
      {
        name: '.appendTo( target )',
        tests: [
        ]
      },
    ]
  },
  {
    name: '.attr()',
    tests: [
      {
        name: '.attr( attributeName )',
        tests: [
          ['$("li:first-child").attr("class")', ""],
        ]
      },
      {
        name: '.attr( attributeName, value )',
        tests: [
          ['$("<div/>").attr("class", "italic")', " "],
        ]
      },
      {
        name: '.attr( attributes )',
        tests: [
        ]
      },
      {
        name: '.attr( attributeName, function )',
        tests: [
          ['$("<div/>").attr("class", function(){return "test"})', " "],
          ['$("<div class=oldval></div><div class=test></div><div></div>").attr("class", function(i,oldVal){return oldVal+i})', " "],
        ]
      },
      {
        name: 'Edge cases',
        tests: [
          ['$("<div/>").attr("class", null)', " "],
          ['$("<div/>").attr("class", "italic").attr("class", null)', " "],
          ['$("li:first-child").attr("class2")', "Try to get attr on a Text node"],
          ['$($("li:first-child").get(0).firstChild).attr("class")', "Try to get attr on a Document node"],
          ['$(document).attr("class")', "Try to get attr on a Document node"],
          ['function(){document.setAttribute("class", "test"); return $(document).attr("class")}()', "Try to get attr on a node created in a document fragment"],
          ['function() {var li=document.createElement("li");li.setAttribute("class","odd"); var frag=document.createDocumentFragment();frag.appendChild(li);return $(frag.firstChild)}().attr("class")', "Try to get attr on a document fragment"],
          ['function() {var frag=document.createDocumentFragment();frag.setAttribute("class","odd");return $(frag)}().attr("class")', " "],
        ]
      }
    ]
  },
  {
    name: '.children()',
    tests: [
      {
        name: '.children( [selector] )',
        tests: [
          ['$("ul").children()', ""],
          ['$("ul").children(".odd")', ""],
        ]
      }
    ]
  },
  {
    name: '.click()',
    tests: [
      {
        name: '.click( handler )',
        tests: [
        ]
      },
      {
        name: '.click( eventData, handler )',
        tests: [
        ]
      },
      {
        name: '.click()',
        tests: [
        ]
      }
    ]
  },
  {
    name: 'constructor',
    tests: [
      {
        name: '',
        tests: [
          ['$([document, null])', ""],
          ['$(null)', ""],
          ['$(0)', ""],
          ['$(1)', ""],
          ['$(false)', ""],
          ['$("")', ""],
          ['$(undefined)', ""],
          ['$([])', ""],
          ['$("a string")', ""],
          ['$(true)', ""],
          ['$([3,4])', ""],
          ['$("<div class=div1/><div class=div2/>")', ""],
          ['$($("<div>text</div>").get(0).childNodes)', ""],
          ['$($("<div>text</div>").get(0).childNodes[0])', ""],
          ['$("<div/>")', ""],
          ['$("<li id=one>1</li><li id=two>2</li>")', ""],
          ['$("li", $("ul"))', ""],
          ['$("li", $("ul").get())', ""],
          ['$("li", $("ul").get(0))', ""],
          ['$("ul > li:first-child")', ""],
          ['$([$("#item3").get()])', ""],
          ['$([$("#item3").get(0)])', ""],
          ['$("#item3").get()', ""],
          ['$("#item3").get(0)', ""],
          ['$("li", $("#item3").get())', ""],
          ['$("li", $("#item3").get(0))', ""],
          ['$("ul li:odd")', ""],
          ['$("<li><a></a></li>").children("a").end()', "pushstack. Every traversal method creates a new jQuery set and builds a stack. Use .end() to get at the previous set."],
          ['function() {var li=document.createElement("li", "var frag=document.createDocumentFragment();frag.appendChild(li);return $(frag)}()', "Document Fragment"],
          ['$($("li"))', "selector is a jQuery object"],
          ['$("li#item1", $("ul#ul2").get(0))', "selector is not in the decendant tree"],
          ['$("li#item1", $("ul#ul2"))', "selector is not in the decendant tree"],
          ['$($("li#item1").get(0), $("ul#ul2").get(0))', "selector is Element, and we have context (which is ignored)"],
          ['$($("li#item1"), $("ul#ul2").get(0))', "selector is jQuery, and we have context (which is ignored)"],
        ]
      }
    ]
  },
  {
    name: '.css()',
    tests: [
      {
        name: '.css( property )',
        tests: [
          ['$("li.odd").css("font-style")', ""],
          ['$("li.odd").css("fontStyle")', ""],
          ['$("li#item2").css("font-style")', ""],
          ['$("li#item2").css("fontStyle")', ""],
          ['$("li#item2_1").css("font-style")', ""],
          ['$("li#item2_1").css("fontStyle")', ""],
          ['$("li#item4").css("font-style")', ""],
          ['$("li#item4").css("fontStyle")', ""],
          ['$("<div style=\'float:left\'/>").css("float")', ""],
          ['$("<div style=\'float:left\'/>").css("cssFloat")', ""],
          ['$().css("fontStyle")', ""],
          ['$("li#item4").css("font-size")', ""],
          ['$("li#item4").css("width")', ""],
        ]
      },
      {
        name: '.css( property, value )',
        tests: [
          ['$("<div/>").css("font-style", "italic").css("font-style")', ""],
          ['$("<div/>").css("fontStyle", "italic").css("font-style")', ""],
          ['$("<div/>").css("user-select", "none").css("user-select")', ""],
          ['$("<div/>").css("font-size", "10").css("font-size")', ""],
          ['$("<div/>").css("width", "123").css("width")', ""],
          ['$("<div class=italic/>").css("font-style", "normal").css("font-style")', ""],
          ['$("<div class=italic/>").css("fontStyle", "normal").css("font-style")', ""],
          ['$("<div/>").css("cssText", "color:blue;font-size:16px").css("font-size")', ""],


          // TODO: add testing of cssHooks
            // Visual insection:
            //p$("li").css("text-decoration", "underline"); //  - ok
            // p$("li").css("textDecoration", "underline"); - ok
            // p$("li").css("cssText", "color:blue; text-decoration:underline"); // ok

          //  p$("li").css("-moz-user-select", "none");
          //  p$("li").css("width", 124);
        ]
      },
      {
        name: '.css( propertyNames )',
        tests: [
        ]
      },
      {
        name: '.css( propertyName, function )',
        tests: [
        ]
      },
      {
        name: '.css( properties )',
        tests: [
        ]
      },
      {
        name: '.css(  )',
        tests: [
        ]
      },

    ]
  },
  {
    name: '.each()',
    tests: [
      {
        name: '.each( function )',
        tests: [
          ['function(){var sum=0;$("li").each(function(i) {sum+=i});return sum}()', ""],
          ['function(){var els=[];$("li").each(function(i) {els.push(this)});return els}()', ""],
          ['function(){var els=[];$("li").each(function(i,el) {els.push(el)});return els}()', ""],
          ['function(){var els=[];$([3,4]).each(function(i,el) {els.push(el)});return els}()', ""],
        ]
      }
    ]
  },
  {
    name: '.empty()',
    tests: [
      {
        name: '.empty()',
        tests: [
          ['$("<li>1</li><li>2</li>").empty()', " "],
          ['$("<li>1</li><li>2</li>").empty().children()', ""],
        ]
      }
    ]
  },
  {
    name: '.filter()',
    tests: [
      {
        name: '.filter( selector )',
        tests: [
        ]
      },
      {
        name: '.filter( elements )',
        tests: [
        ]
      },
      {
        name: '.filter( selection )',
        tests: [
        ]
      },
      {
        name: '.filter( function )',
        tests: [
        ]
      },
    ]
  },
  {
    name: '.find()',
    tests: [
      {
        name: '.find( selector [String] )',
        tests: [
          ['$("ul").find("li")', " "],
          ['$("ul#ul0").find("li")', " "],
          ['$("ul#ul2").find("li")', " "],
          ['$("ul#ul2,ul#ul3").find("li")', " "],

          ['$("ul#ul2").find("li#item1")', "selector is not in the decendant tree"],
        ]
      },
      {
        name: '.find( selector [jQuery] )',
        tests: [
          ['$("ul").find($("li.odd"))', "selector is jQuery object"],
          ['$("ul#ul2,ul#ul3").find($("li"))', " "],
          ['$("ul#ul2").find($("li#item1"))', "selector is a jQuery object NOT in the decendant tree"],
        ]
      },
      {
        name: '.find( selector [Element] )',
        tests: [
          ['$("ul#ul2").find($("li#item1").get(0))', "selector is an Element NOT in the decendant tree"],
          ['$("ul#ul2,ul#ul3").find($("li").get())', ""],
        ]
      }
    ]
  },
  {
    name: '.first()',
    tests: [
      {
        name: 'first()',
        tests: [
          ['$("ul li").first()', ""],
          ['$([3,4]).first()', ""],
          ['$([3,4]).first()', ""],
          ['$("ul.notexist").first()', ""],
          ['$(null).first()', ""],
          ['$(true).first()', ""],
        ]
      },
    ]
  },
  {
    name: '.focus()',
    tests: [
      {
        name: '.focus( handler )',
        tests: [
        ]
      },
      {
        name: '.focus( eventData, handler )',
        tests: [
        ]
      },
      {
        name: '.focus()',
        tests: [
        ]
      }
    ]
  },
  {
    name: '.get()',
    tests: [
      {
        name: '.get( index )',
        tests: [
          ['$("li").get(0)', ""],
          ['$("li.noexist").get(0)', ""],
          ['$([0,1]).get(0)', ""],
          ['$(14).get(0)', ""],
          ['$("<div></div><p></p>").get(1)', ""],
        ]
      },
      {
        name: '.get( )',
        tests: [
          ['$("li").get()', ""],
          ['$("li.noexist").get()', ""],
          ['$("<div></div><p></p>").get()', ""],
        ]
      }
    ]
  },
  {
    name: '.hide()',
    tests: [
      {
        name: 'hide()',
        tests: [
        ]
      },
      {
        name: 'hide( [ duration ][, complete ] )',
        tests: [
        ]
      },
      {
        name: 'hide( options )',
        tests: [
        ]
      },
      {
        name: 'hide( [ duration ][, easing][, complete ] )',
        tests: [
        ]
      },
    ]
  },
  {
    name: '.html()',
    tests: [
      {
        name: '.html()',
        tests: [
          ['$("li").html()', " "],
          ['$().html()', " "],
        ]
      },
      {
        name: '.html( htmlString )',
        tests: [
          ['$("<ul></ul><ul></ul>").html("<li>item</li>").html()', " "],
        ]
      },
      {
        name: '.html( function )',
        tests: [
          ['$("<div>old</div>").html(function(i,oldVal){return "oldval:"+oldVal+",index:"+i}).html()', ""],
        ]
      }
    ]
  },
  {
    name: '.keyup()',
    tests: [
      {
        name: '.keyup( handler )',
        tests: [
        ]
      },
      {
        name: '.keyup( eventData, handler )',
        tests: [
        ]
      },
      {
        name: '.keyup()',
        tests: [
        ]
      }
    ]
  },  
  {
    name: '.map()',
    tests: [
      {
        name: '.map( callback )',
        tests: [
          ['$("li").map(function(i,elm) {return elm})', ""],
          ['$("li").map(function(i) {return i})', ""],
          ['$("li").map(function(i) {return this})', ""],
          ['$([3,4]).map(function(i) {return i})', ""],
          ['$([3,4]).map(function(i,elm) {return elm})', ""],
          ['$("li").map()', ""],
        ]
      }
    ]
  },
  {
    name: '.next()',
    tests: [
      {
        name: '.next( )',
        tests: [
          ['$("li:first-child").next()', ""],
          ['$("li:last-child").next()', ""],
        ]
      },
      {
        name: '.next( selector )',
        tests: [
          ['$("li:first-child").next(".odd")', ""],
          ['$("li:first-child").next(".even")', ""],
        ]
      }
    ]
  },
  {
    name: '.on()',
    tests: [
      {
        name: '.on( events, handler )',
        tests: [
        ]
      },
      {
        name: '.on( events )',
        tests: [
        ]
      },
      {
        name: '.on( events [,selector] [,data], handler )',
        tests: [
        ]
      },
      {
        name: '.on( events [,selector] [,data] )',
        tests: [
        ]
      },
    ]
  },
  {
    name: '.parent()',
    tests: [
      {
        name: '.parent()',
        tests: [
          ['$("li#item3_2").parent()', ""],
          ['$("li").parent()', ""],
          ['$(document).parent()', ""],
          ['$(document).parent().parent()', ""],
          ['$(1).parent()', ""],
          ['$([3,4]).parent()', ""],
        ]
      },
      {
        name: '.parent( selector )',
        tests: [
          ['$("li").parent(".level1")', ""],
        ]
      }
    ]
  },
  {
    name: '.prev()',
    tests: [
      {
        name: '.prev()',
        tests: [
          ['$("li:last-child").prev()', ""],
          ['$("li:first-child").prev()', ""],
        ]
      },
      {
        name: '.prev( selector )',
        tests: [
          ['$("li:last-child").prev(".odd")', ""],
          ['$("li:last-child").prev(".even")', ""],
        ]
      }
    ]
  },
  {
    name: '.ready()',
    tests: [
      {
        name: '.ready()',
        tests: [
        ]
      },
    ]
  },
  {
    name: '.removeAttr()',
    tests: [
      {
        name: '.removeAttr( className )',
        tests: [
          ['$("<div class=test></div>").removeAttr("class")', ""],
          ['$("<div class=test id=test></div>").removeAttr("class id")', ""],
          ['$().removeAttr("class")', ""],
        ]
      },
      {
        name: '.removeAttr()',
        tests: [
          ['$("<div class=test></div>").removeAttr()', ""],
        ]
      },
      {
        name: '.removeAttr( function )',
        tests: [
        ]
      },
      {
        name: 'Edge cases',
        tests: [
          ['$("<div class=test></div>").removeAttr(null)', ""],
        ]
      }

    ]
  },
  {
    name: '.removeClass()',
    tests: [
      {
        name: '.removeClass( className )',
        tests: [
          ['$("<div class=\'test\'/>").removeClass("test").get(0).className', ""],
          ['$("<div class=\'a b\'/>").removeClass("b").get(0).className', ""],
          ['$("<div class=\'a b c\'/>").removeClass("b").get(0).className', ""],
          ['$("<div class=\'b b c\'/>").removeClass("b").get(0).className', "remove multiple classes"],
          ['$("<div class=\'a b c\'/>").removeClass("a b").get(0).className', ""],
          ['$("<div class=\'a b c\'/>").removeClass("a c").get(0).className', ""],
          ['$("<div class=\'a b c d\'/>").removeClass("b c").get(0).className', ""],
          ['$("<div class=\'a elephant\'/>").removeClass("phant").get(0).className', ""],
        ]
      },
      {
        name: '.removeClass()',
        tests: [
          ['$("<div class=\'test test2\'/>").removeClass()', ""],
          ['$("<div class=\'test test2\'></div><div class=\'test test2\'></div>").removeClass()', ""],
        ]
      },
      {
        name: '.removeClass( function )',
        tests: [
          ['$("<div class=\'a b c\'></div>").removeClass(function(index,currentClassName){return "b"})', " "],
        ]
      }
    ]
  },
/*
  {
    name: '.children',
    tests: [
      {
        name: '',
        tests: [
        ]
      }
    ]
  },*/
];




//elephant


//  testInAllFrameworks('$("ul#ul0").find($("li"))');  // selector is a jQuery object
//  testInAllFrameworks('$("ul#ul0").find($("li#item1"))');  // selector is a jQuery object
//  testInAllFrameworks('$("ul#ul0").find($("li#item1").get(0))');  // selector is an Element

