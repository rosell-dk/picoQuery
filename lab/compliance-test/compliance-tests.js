window.complianceTests = [
  {
    name: '.addClass()',
    tests: [
      {
        name: '.addClass( className )',
        tests: [
          ['$("<div/>").addClass("test")', ""],
          ['$("<div/>").addClass("test").addClass("test2")', ""],
          ['$("<div/>").addClass("test ")', ""],
          ['$("<div/>").addClass("test2 test2")', ""],
          ['$("<div/>").addClass("test2").addClass("test2")', ""],
          ['$("<div/>").addClass(" ")', ""],
          ['$("<div/>").addClass("\t")', ""],
          ['$("<div class=\ttest/>").addClass("t2")', ""],
        ]
      },
      {
        name: '.addClass( function )',
        tests: [
          ['$("<div class=\'a b\'/>").addClass(function(a,b){return "b"+a+b})', ""],
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
          ['$("<p></p>").append("<b></b>")', "[ htmlString ]"],
          ['$("<p>text</p>").append("<b></b>")', "[ htmlString ]"],
          ['$("<div><p></p></div>").append($("<b></b>"))', "[ jQuery ]"],
          ['$("<div><p></p></div>").append(makeElement("<b></b>"))', "[ Element ]"],
          ['$("<div><p></p></div>").append(makeTextNode("text"))', "[ Text Node ]"],
          ['$("<div><p></p></div>").append(makeTextNode("text"))', "[ Array of text nodes]"],
          ['$("<div><p></p></div>").append([makeTextNode("text"), makeElement("<i>italic</i>")])', "[ Array of text nodes / elements ]"],
          ['$("<div><p></p></div>").append("<b></b>").append("<i></i>")', "Chaining"],
          ['$("<div><p></p></div>").append([makeElement("<i>italic</i><b>bold</b>")])', "[ Array of elements ]"],
        ]
      },
      {
        name: '.append( function )',
        tests: [
        ]
      },
      {
        name: 'Unspecified cases',
        tests: [
          ['$("<div><p></p></div>").append([$("<i>italic</i>")])', "[ Array of jQuery objects ]"],
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
        name: 'jQuery( selector )',
        tests: [
          ['$("#item3")', "Standard"],
          ['$("ul ul li:nth-child(odd)")', "<i>selector</i> is a CSS3 selector"],
          ['$("ul ul li:odd")', "<i>selector</i> is a special jQuery selector"],
        ]
      },
      {
        name: '.jQuery( selector, context [ Element ] )',
        tests: [
          ['$("li", jq$("#item3").get(0))', "Standard"],
          ['$("li#item1", jq$("ul#ul2").get(0))', "selector is not in the decendant tree"],
          ['$("#item3", jq$("#item3").get(0))', "selector matches root of context"],
          ['$("body li", jq$("#item3").get(0))', "selector begins with something outside of context. Its different in picoQuery because picoQuery uses Element.querySelecorAll, and here <a href='https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector'>the entire hierarchy counts</a>. In newer browsers, you can will get the compliant behaviour with the :scope pseudo-class.<a href='https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll'>[1]</a> - but this probably causes syntax error in other browsers (havent tested yet). Btw, here is a <a href='https://github.com/lazd/scopedQuerySelectorShim'>shim</a>, and btw: picoQuery has same problem with find()"],
          ['$(":scope body li", jq$("#item3").get(0))', "Applying the :scope pseudo-class."],
          ['$("#item3 li", jq$("#item3").get(0))', "selector begins with something outside of context"],
        ]
      },
      {
        name: '.jQuery( selector, context [ jQuery ] )',
        tests: [
          ['$("#item3", $("body"))', "Standard"],
          ['$("li#item1", $("ul#ul2"))', "selector is not in the decendant tree"],
          ['$("#item3", $("#item3"))', "selector matches root of context"],
          ['$("#item3_1", $("ul ul"))', "context has several 'roots'"],
          ['$("li", $("<ul></ul><ul><li></li></ul>"))', "context has several 'roots'"],

          ['$("#item3 li", $("#item3"))', ""],
          ['$("body", $("body"))', ""],
          ['$("body li.odd", $("body"))', ""],
          ['$("ul ul li.odd", $("ul"))', ""],
          ['$("li.odd", $("ul"))', ""],
        ]
      },
      {
        name: '.jQuery( element )',
        tests: [
          ['$(jq$("#item3").get(0))', "Standard - <i>element</i> is an Element node"],
        ]
      },
      {
        name: '.jQuery( elementArray )',
        tests: [
          ['$([$("#item3").get()])', ""],
        ]
      },
      {
        name: '.jQuery( object [PlainObject] )',
        tests: [
        ]
      },
      {
        name: '.jQuery( selection [jQuery] )',
        tests: [
          ['$($("li"))', "Cloning"],
        ]
      },
      {
        name: '.jQuery( )',
        tests: [
          ['$()', ""],
        ]
      },
      {
        name: '.jQuery( html )',
        tests: [
          ['$("<li id=one>1</li><li id=two>2</li>")', ""],
        ]
      },
      {
        name: '.jQuery( html, ownerDocument )',
        tests: [
        ]
      },
      {
        name: '.jQuery( html, attributes )',
        tests: [
        ]
      },
      {
        name: '.jQuery( callback )',
        tests: [
        ]
      },
      {
        name: 'Misc',
        tests: [
          ['$("<div class=div1/><div class=div2/>")', ""],
          ['$(jq$("<div>text</div>").get(0).childNodes)', ""],
          ['$("li", $("ul").get(0))', ""],
          ['$([$("#item3").get(0)])', ""],
          ['$("#item3").get()', ""],
          ['$("#item3").get(0)', ""],
          ['$("li", $("#item3").get())', ""],
          ['$("<li><a></a></li>").children("a").end()', "pushstack. Every traversal method creates a new jQuery set and builds a stack. Use .end() to get at the previous set."],
        ]
      },
      {
        name: 'Edge cases',
        tests: [
          ['$("li", $("ul").get())', ""],
          ['$("<div/>")', "Invalid tag syntax?"],
        ]
      },
      {
        name: 'Outside specification',
        tests: [
          ['$(jq$("<div>text</div>").get(0).childNodes[0])', "jQuery([Text Node])"],
          ['$("#item3", document)', "jQuery( selector, [HTMLDocument]"],
          ['$(document)', "jQuery( [HTMLDocument] )"],
          ['$($("li#item1").get(0), $("ul#ul2"))', "selector is Element, and we provide a second argument"],
          ['function() {var li=document.createElement("li"),frag=document.createDocumentFragment();frag.appendChild(li);return $(frag)}()', "jQuery( [DocumentFragment] )"],
          ['$(null)', ""],
          ['$(0)', ""],
          ['$(1)', ""],
          ['$(undefined)', ""],
          ['$([document, null])', ""],
          ['$(false)', ""],
          ['$("")', ""],
          ['$([])', ""],
          ['$("a string")', ""],
          ['$(true)', ""],
          ['$([3,4])', ""],
          ['$(":scopepy body li", jq$("#item3").get(0))', "Applying non-existant pseudy-class."],
          ['$(":scopydoodlydoo body li", jq$("#item3"))', "Applying non-existant pseudy-class."],
        ]
      },
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
          ['$("ul").find("li")', " "],
          ['$("ul#ul0").find("li")', " "],
          ['$("ul#ul2").find("li")', " "],
          ['$("ul#ul2,ul#ul3").find("li")', " "],

          ['$("ul#ul2").find("li#item1")', "selector is not in the decendant tree"],
          ['$("#item3").find("body li")', "selector begins with something outside of context."],
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
          ['$("#testhtml form").html()', " "],
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
    name: '.prepend()',
    tests: [
      {
        name: '.prepend( content [,content] )',
        tests: [
          ['$("<p></p>").prepend("<b></b>").children()', "[ htmlString ]"],
          ['$("<div><p></p></div>").prepend($("<b></b>")).children()', "[ jQuery ]"],
          ['$("<div><p></p></div>").prepend($("<b></b>").get(0)).children()', "[ Element ]"],
          ['$("<div><p></p></div>").prepend($("<b>text</b>").get(0).childNodes[0]).get(0).innerHTML', "[ Text Node ]"],
          ['$("<div><p></p></div>").prepend([$("<b>text</b>").get(0).childNodes[0], $("<i>italic</i>")]).get(0).innerHTML', "[ Array of text nodes / elements ]"],
          ['$("<div><p></p></div>").prepend("<b></b>").prepend("<i></i>").children()', "Chaining"],
        ]
      },
      {
        name: '.prepend( function )',
        tests: [
        ]
      },
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

