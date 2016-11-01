window.complianceTests = [
  {
    name: '.add()',
    tests: [
      {
        name: '.add( selector )',
        tests: [
          ['$("li#item2_1").add("li#item3_1")', ""],
          ['$("li#item3_1").add("li#item2_1")', "jQuery sorts it in Document order. picoQuery does not do any sorting (it will in future release)"],
          ['$("li#item3_1").add("li#item3_1")', "Remove duplicates"],
          ['$("li#item2_1").add("li#item3_1").end()', "pushStack"],
        ]
      },
      {
        name: '.add( elements )',
        tests: [
        ]
      },
      {
        name: '.add( html )',
        tests: [
          ['$("<p></p>").add("<i></i>")', ""],
        ]
      },
      {
        name: '.add( selection )',
        tests: [
          ['$("li#item2_1").add($("li#item3_1"))', ""],
        ]
      },
      {
        name: '.add( selection, context )',
        tests: [
//          ['$("li#item2_1").add($("li#item3_1"), $("body").get(0))', ""],
//          ['$("li", document.getElementById("item3"))', "Refreshing our memory of what $(selection, context) does. Here, it selects all li elements descending the item#3"],
          ['$().add("li", document.getElementById("item3"))', ""],
//          ['$("li#item2_1").add($("li#item3_1"), $("#item1").get(0))', ""],
        ]
      },
    ]
  },
  {
    name: '.addBack()',
    tests: [
      {
        name: '.addBack( )',
        tests: [
          ['$("li#item2_1").parent().addBack()', ""],
          ['$("#ul3").children().addBack()', "jQuery sorts the result in Document order, picoQuery doesnt yet (because .add() doesnt yet)"],
        ]
      },
      {
        name: '.addBack( selector )',
        tests: [
          ['$("#ul3").children().addBack(".odd")', ""],
        ]
      },
    ]
  },
  {
    name: '.addClass()',
    tests: [
      {
        name: '.addClass( className )',
        tests: [
          ['$("<p></p>").addClass("test")', "Add a single class name"],
          ['$("<p></p>").addClass("one two")', "Addding two class names in one go"],
          ['$("<p></p>").addClass("test").addClass("test2")', "Chaining"],
          ['$("<p></p>").addClass("test ")', "Trailing space"],
          ['$("<p></p>").addClass("test2 test2")', "Adding same class twice"],
          ['$("<p></p>").addClass("test2").addClass("test2")', "Adding same class twice in another way"],
          ['$("<p class=\'one two\'></p>").addClass("two")', "Adding same class in yet another way"],
          ['$("<p class=\ttest></p>").addClass("t2")', "HTML contains tab character"],
          ['$("<p class=one\ttwo></p>").addClass("three")', "HTML contains tab character between class names"],
        ]
      },
      {
        name: '.addClass( function )',
        tests: [
          ['$("<div class=\'a b\'/>").addClass(function(a,b){return "b"+a+b})', ""],
        ]
      },
      {
        name: 'Edge cases',
        tests: [
          ['$("<p></p>").addClass("")', "Adding empty string"],
          ['$("<p></p>").addClass(" ")', "Adding just a space"],
          ['$("<p></p>").addClass("\t")', "Adding just a tab"],
          ['$("<p></p>").addClass()', "Adding nothing"],
        ]
      }
    ]
  },
  {
    name: '.after()',
    tests: [
      {
        name: '.after( content )',
        tests: [
          ['$("<div><b></b></div>").children().after("<i></i>").parent()', "[ HTML string ]"],
          ['$("<div><b></b></div>").children().after($("<one></one><two></two>")).parent()', "[ HTML string with several elements]"],
          ['$("<div><b></b></div>").children().after($("<i></i>")).parent()', "[ jQuery ]"],
          ['$("<div><b></b></div>").children().after($("<i></i>").get(0)).parent()', "[ Element ]"],
          ['$("<div><b></b><p></p></div>").children().after("<i></i>").parent()', "multiple targets"],
          ['$("<div><b></b></div>").children().after("hello").parent()', "Text"],
          ['$("<div><b></b></div>").children().after($("<b>text</b>").get(0).childNodes[0]).parent()', "[ Text Node ]"],
          ['$("<div><p></p></div>").children().after("<b></b>").after("<i></i>").parent()', "Chaining"],

//          ['$("<ul><li>1</li><li>2</li></ul>").children().after("<i></i><p></p>").parent()', "[ HTML string with several elements]"],
          ['$("<ul><li>1</li><li>2</li></ul>").children().after($("<i></i>")).parent()', "[ jQuery with several elements]"],
          ['$("<div><b></b><i></i></div>").children("b").after($("<one></one><two></two>")).parent()', ""],
          ['$("<div><b></b><i></i></div>").children("b").after("<one></one>", "<two></two>").parent()', ""],
//          ['$("<ul><li>1</li></ul>").children().after("<i></i><p></p>").parent()', "[ jQuery with several elements]"],
//          ['$("<ul><li>1</li><li>2</li></ul>").children().after("<i></i><p></p>").parent()', "[ jQuery with several"],
        ]
      },
      {
        name: '.after( content, content, ... )',
        tests: [
          ['$("<div><b></b></div>").children().after("<i></i>", "<p></p>").parent()', ""],
          ['$("<ul><li>1</li><li>2</li></ul>").children().after("<i></i><b></b>", "<p></p>").parent()', ""],
        ]
      },
      {
        name: '.after( function )',
        tests: [
          ['$("<div><b></b><p></p></div>").children().after(function(index){return "<i>" + index + "</i>"}).parent()', "function receives index"],
          ['$("<div><b></b><p></p></div>").children().after(function(index){return "<i>" + this + "</i>"}).parent()', "value of this"],
          ['$("<div><b></b><p></p></div>").children().after(function(index){return "hello"}).parent()', "return string"],
          // todo: return element, jquery
        ]
      },
      {
        name: '.after( function-html ) (jQuery 1.10+)',
        tests: [
          ['$("<div><p>hello</p></div>").children().after(function(index, oldHtml){return "<i>" + oldHtml + "</i>"}).parent()', "get old html"],
        ]
      }
    ]
  },
  {
    name: '.andSelf()',
    tests: [
      {
        name: '.andSelf( )',
        tests: [
          ['$("li#item2_1").parent().andSelf()', ""],
          ['$("#ul3").children().andSelf()', "jQuery sorts the result in Document order, picoQuery doesnt yet (because .add() doesnt yet)"],
        ]
      },
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
          ['$("<a></a><b>b</b>")', ""],
          ['$("<p>hello</p>").appendTo($("<div></div>"))', ""],
          ['$("<one>1</one><two>2</two>").appendTo($("<div></div>"))', ""],
          ['$("<i>hello</i>").appendTo($("<a></a><b>b</b>"))', ""],
          ['$("<i>hello</i>").appendTo($("<a></a><b>b</b>")).parent()', ""],
          ['(function(){$("<i class=hello>hello</i>").appendTo($("#item3 li")); var clone=$("#item3").clone();$("#item3 .hello").remove(); return clone})()', "In the jQuery implementation, the actual operation is a side effect. This test inspects the side effect"],
 //         ['$("<one>1</one><two>2</two>").appendTo($("<a></a><b></b>"))', ""],
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
    name: '.before()',
    tests: [
      {
        name: '.before( content )',
        tests: [
          ['$("<div><b></b></div>").children().before("<i></i>").parent()', "[ HTML string ]"],
          ['$("<div><b></b></div>").children().before($("<one></one><two></two>")).parent()', "[ HTML string with several elements]"],
          ['$("<div><b></b></div>").children().before($("<i></i>")).parent()', "[ jQuery ]"],
          ['$("<div><b></b></div>").children().before($("<i></i>").get(0)).parent()', "[ Element ]"],
          ['$("<div><b></b><p></p></div>").children().before("<i></i>").parent()', "multiple targets"],
          ['$("<div><b></b></div>").children().before("hello").parent()', "Text"],
          ['$("<div><b></b></div>").children().before($("<b>text</b>").get(0).childNodes[0]).parent()', "[ Text Node ]"],
          ['$("<div><p></p></div>").children().before("<b></b>").before("<i></i>").parent()', "Chaining"],

//          ['$("<ul><li>1</li><li>2</li></ul>").children().before("<i></i><p></p>").parent()', "[ HTML string with several elements]"],
          ['$("<ul><li>1</li><li>2</li></ul>").children().before($("<i></i>")).parent()', "[ jQuery with several elements]"],
//          ['$("<ul><li>1</li></ul>").children().before("<i></i><p></p>").parent()', "[ jQuery with several elements]"],
//          ['$("<ul><li>1</li><li>2</li></ul>").children().before("<i></i><p></p>").parent()', "[ jQuery with several"],
        ]
      },
      {
        name: '.before( content, content, ... )',
        tests: [
          ['$("<div><b></b></div>").children().before("<i></i>", "<p></p>").parent()', ""],
          ['$("<ul><li>1</li><li>2</li></ul>").children().before("<i></i><b></b>", "<p></p>").parent()', ""],
        ]
      },
      {
        name: '.before( function )',
        tests: [
          ['$("<div><b></b><p></p></div>").children().before(function(index){return "<i>" + index + "</i>"}).parent()', "function receives index"],
          ['$("<div><b></b><p></p></div>").children().before(function(index){return "<i>" + this + "</i>"}).parent()', "value of this"],
          ['$("<div><b></b><p></p></div>").children().before(function(index){return "hello"}).parent()', "return string"],
          // todo: return element, jquery
        ]
      },
      {
        name: '.before( function-html ) (jQuery 1.10+)',
        tests: [
          ['$("<div><p>hello</p></div>").children().before(function(index, oldHtml){return "<i>" + oldHtml + "</i>"}).parent()', "get old html"],
        ]
      }
    ]
  },
/*
  {
    name: '.before2()',
    tests: [
      {
        name: '.before( content )',
        tests: [
//          ['$("hello dolly")', "Text"],
//          ['$("<div><b></b></div>").children().before("<i></i>").parent()', "[ HTML string ]"],
          ['$("<div><b></b></div>").children().before("hello").parent()', "Text"],
        ]
      },
    ]
  },*/
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
    name: '.clone()',
    tests: [
      {
        name: '.clone( )',
        tests: [
          ['$("#item2_1").clone()', ""],
        ]
      },
      {
        name: '.clone( withDataAndEvents )',
        tests: [
        ]
      },
      {
        name: '.clone( withDataAndEvents, deepWithDataAndEvents )',
        tests: [
        ]
      },
    ]
  },
  {
    name: '.closest()',
    tests: [
      {
        name: '.closest( selector )',
        tests: [
          ['$("li#item2_1").closest("ul")', "Closest is direct parent"],
          ['$("li#item2_1").parent().closest("ul")', "Closests is the element itself"],
          ['$("li#item2_1").closest("div")', "Closest is a distant anchestor"],
          ['$("li#item2_1, li#item3_1").closest("ul")', "Get closest of several items"],
        ]
      },
      {
        name: '.closest( selector, context )',
        tests: [
          ['$("li#item2_1").closest("ul", $("#ul0").get(0))', ""],
          ['$("li#item2_1").closest("ul", $("#ul2").get(0))', "Context is selection"],
          ['$("li").closest("ul", $("#ul0").get(0))', ""],
          ['$("li").closest("#ul0", $("#ul2").get(0))', "Selection isnt in context. The jQuery result may be somewhat surprising. The doc says about context: A DOM element within which a matching element may be found. Yet, the element returned by jQuery is not found in the context"],
          ['$("li").closest("li#item2_1", $("body").get(0))', ""],
        ]
      },
      {
        name: '.closest( selection )',
        tests: [
          ['$("li").closest($("ul"))', ""],
        ]
      },
      {
        name: '.closest( element )',
        tests: [
          ['$("li").closest($("ul").get(0))', ""],
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
          ['$("ul ul li:odd")', "<i>selector</i> is a special jQuery selector. Currently unsupported"],
        ]
      },
      {
        name: 'jQuery( selector, context [ Element ] )',
        tests: [
          ['$("li", jq$("#item3").get(0))', "Standard"],
          ['$("li#item1", jq$("ul#ul2").get(0))', "selector is not in the decendant tree"],
          ['$("#item3", jq$("#item3").get(0))', "selector matches root of context"],
          ['$("body li", jq$("#item3").get(0))', "selector begins with something outside of context. Its different in picoQuery because picoQuery uses Element.querySelecorAll, and here <a href='https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector'>the entire hierarchy counts</a>. In newer browsers, you can will get the compliant behaviour with the :scope pseudo-class.<a href='https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll'>[1]</a> - but this probably causes syntax error in other browsers (havent tested yet). Btw, here is a <a href='https://github.com/lazd/scopedQuerySelectorShim'>shim</a>, and btw: picoQuery has same problem with find()"],
          ['$(":scope body li", jq$("#item3").get(0))', "Applying the :scope pseudo-class."],
          ['$("#item3 li", jq$("#item3").get(0))', "selector begins with something outside of context"],
          ['$("#item3", document)', "jQuery( selector, [HTMLDocument]"],
        ]
      },
      {
        name: 'jQuery( selector, context [ jQuery ] )',
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
        name: 'jQuery( selector, context [ Array ] )',
        tests: [
          ['$("li", $("#item3").get())', "jQuery( selector, [ Array ] )"],
          ['$("li", [$("#item3").get(0), $("#item2").get(0)])', "jQuery( selector, [ Array of [Element]] ).<br><br>Whoopsidasie, the order is different in picoQuery. It seems to get the order right, picoQuery must first do an unscoped search and then filter the results such that items outside the context are removed"],
        ]
      },
      {
        name: 'jQuery( element )',
        tests: [
          ['$(jq$("#item3").get(0))', "Standard - <i>element</i> is an Element node"],
          ['$(makeTextNode("text"))', "[ Text Node ]"],
          ['$(makeElement("<i>italic</i>"))', "[ Element ]"],
          ['$(makeNodeList())', "[ NodeList ]"],

        ]
      },
      {
        name: 'jQuery( elementArray )',
        tests: [
          ['$([$("#item3").get()])', ""],
        ]
      },
      {
        name: 'jQuery( object [PlainObject] )',
        tests: [
        ]
      },
      {
        name: 'jQuery( selection [jQuery] )',
        tests: [
          ['$($("li"))', "Cloning"],
        ]
      },
      {
        name: 'jQuery( )',
        tests: [
          ['$()', ""],
        ]
      },
      {
        name: 'jQuery( html )',
        tests: [
          ['$("<li id=one>1</li><li id=two>2</li>")', ""],
        ]
      },
      {
        name: 'jQuery( html, ownerDocument )',
        tests: [
        ]
      },
      {
        name: 'jQuery( html, attributes )',
        tests: [
        ]
      },
      {
        name: 'jQuery( callback )',
        tests: [
        ]
      },
      {
        name: 'Misc',
        tests: [
          ['$("<div class=div1/><div class=div2/>")', "Invalid self-closing tag (http://stackoverflow.com/questions/3558119/are-self-closing-tags-valid-in-html5)"],
          ['$("<hr />")', "Valid self-closing tag"],
          ['$(jq$("<div>text</div>"))', ""],
          ['$(jq$("<div>text</div>").get(0))', ""],
          ['$(jq$("<div>text</div>").get(0).childNodes)', ""],
          ['jq$("<div>text</div>").get(0)', ""],
          ['jq$("<div>text</div>").get(0).childNodes', ""],
          ['makeNodeList()', ""],
          ['$(jq$("<span>text<p>node</p></span>").get(0).childNodes)', ""],
          ['$("li", $("ul").get(0))', ""],
          ['$([$("#item3").get(0)])', ""],
          ['$("#item3").get()', ""],
          ['$("#item3").get(0)', ""],
          ['$("li", $("#item3").get())', ""],
//          ['$("<li><a></a></li>").children("a").end()', "pushstack. Every traversal method creates a new jQuery set and builds a stack. Use .end() to get at the previous set. Not supported in picoQuery yet"],
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
          ['$("li", undefined)', ""],
          ['$("li", [undefined])', ""],
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
/*
  {
    name: '.constructor2()',
    tests: [
      {
        name: 'testing...',
        tests: [
          ['$("li", jq$("#item3").get(0))', "Standard"],
          ['$("#item3", document)', "jQuery( selector, [HTMLDocument]"],
//          ['jq$("<b>hej</b>").get(0)', ""],
//          ['$(jq$("<b>hej</b>"))', ""],
//            ['$("#item3").get()', ""],
//          ['$(makeNodeList())', "[ NodeList ]"],
        ]
      }
    ]
  },*/


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
          ['$("<i class=\'tablecell\'></i>").css("display")', "An element does not get its styles from class with jQuery, until its appended to the document. My guess is that its due to that jQuery creates a DocumentFragment. picoQuery on the other hand create a real element right away."],
          ['$("<tablecell></tablecell>").css("display")', ""],
          ['function () {var $el = $("<tablecell></tablecell>").appendTo("body"), res = $el.css("display"); $el.remove(); return res}()', "Once the node has been added to the document, jQuery and picoQuery agrees again"],
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
    name: '.data()',
    tests: [
      {
        name: '.data( key )',
        tests: [
          ['$("<div data-monkey=\'chimpanse\' ></div>").data("monkey")', ""],
          ['$("<div data-options=\'{number:42}\'></div>").data("options")', ""],
          ['$("<div></div>").data("non-existing-data")', "Try to get unset data"],


        ]
      },
      {
        name: '.data( key, value )',
        tests: [
          ['$("<div></div>").data("obj", {a:42}).get(0)', ""],
          ['$("<div></div>").data("obj", {a:42}).data("obj")', ""],
          ['$("<div></div>").data("obj2", {"a":"42"}).data("obj2")', ""],
        ]
      },
      {
        name: '.data( obj )',
        tests: [
          ['$("<div></div>").data({a:42,b:[]}).get(0)', ""],
          ['$("<div></div>").data({a:42,b:[]}).data("a")', ""],
          ['$("<div></div>").data({a:42,b:[0,1]}).data("b")', ""],
          ['$("<div data-monkey=\'chimpanse\' ></div>").data("a",42).data({b:42,c:[0,1]}).data()', "Existing removed? - no!"],
          ['$("<div data-monkey=\'chimpanse\' ></div>").data("a",42).data({a:12,chimpanse:[0,1]}).data()', "Existing updated? - yes of course"],
        ]
      },
      {
        name: '.data( )',
        tests: [
          ['$("<div></div>").data({a:42,b:[0,1]}).data()', ""],
          ['$("<div data-monkey=\'chimpanse\' ></div>").data("b",43).data("a", 42).data()', "Order"],
          ['$("<div data-monkey=\'chimpanse\' ></div>").data({b:42,a:[0,1]}).data()', "Order"],
          ['function(){var $div = $("<div data-monkey=\'chimpanse\' ></div>").data("a", 42);$div.data();$div.data("b",43);return $div.data()}();', "Order. The attribute data is added to data object the moment data() is called the first time."],
          ['function(){var $div = $("<div></div>").attr("data-monkey", "chimpanse");$div.data("a", 42);$div.data();$div.data("b",43);return $div.data()}();', "(alse when attribute is set)"],
          ['function(){var $div = $("<div></div>");$div.data("a",42);$div.data();$div.attr("data-monkey", "chimpanse").data("b",43);return $div.data()}();', "Data-attributes set after first call to data() will not be counted in"],
          ['$("<div></div>").data()', "Try to get data, though none is set"],
        ]
      },
      {
        name: 'jQuery.data( )',
        tests: [
          ['function(){var $div = $("<div data-monkey=\'chimpanse\'></div>");$div.data("a",42);return jQuery.data($div.get(0))}();', "jQuery.data does *not* retrieve the data-* attributes unless the more convenient .data() method has already retrieved them (in this case: NOT)"],
          ['function(){var $div = $("<div data-monkey=\'chimpanse\'></div>");$div.data("a",42);$div.data();return jQuery.data($div.get(0))}();', "jQuery.data does *not* retrieve the data-* attributes unless the more convenient .data() method has already retrieved them (in this case, it has)"],
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
    name: '.end()',
    tests: [
      {
        name: '.end(  )',
        tests: [

//          ['$("<p></p>").addClass("test").end()', ".addClass()"],
//          ['$("<div><b></b></div>").after("<i></i>").end()', ".after()"],
          ['$("<div><b></b></div>").children().after("<i></i>").end()', ".after()"],
//          ['$("<p></p>").append("<i></i>").end()', ".append()"],
          ['$("<p></p>").appendTo("<i></i>").end()', ".appendTo()"],
//          ['$("<p></p>").attr("test", "test").end()', ".attr()"],
          // 'before' needs no testing
          ['$("#ul3").children()', ".children()"],
          ['$("#ul3").children().end()', ".children()"],
          ['$("<div><b></b></div>").children()', ".children()"],
          ['$("<div><b><i></i></b></div>").children().end()', ".children()"],
          ['$("<div><b><i></i></b></div>").children().children().end()', ".children()"],
          ['$("<p></p>").clone().end()', ".clone()"],
          ['$("<p></p>").clone().end().end()', ".clone()"],
          ['$("li#item2_1").closest("ul").end()', ".closest()"],
          ['$("<p></p>").css("color", "red").end()', ".css()"],
          ['$("li#item2_1").css("color", "red")', ".css()"],
          ['$("li#item2_1").css("color", "red").end()', ".css() - This is a surprising result from jQuery..."],
          ['$("li#item2_1").parent().css("color", "red").end()', ".css() - Here is an explanation - css doesnt touch the pushStack"],
          ['$("li#item2_1").end()', ".css() - more explanation..."],
          ['$("li#item2_1").data("a", "b").end()', ".data()"],
          ['$("li#item2_1").each(function(){}).end()', ".each()"],
          ['$("<p><b></b></p>").empty().end()', ".empty()"],
          ['$("#ul3 .odd, #ul2 .odd").eq(2).end()', ".eq()"],
          ['$("li").filter("#item2_1")', ".filter()"],
          ['$("#ul3 .odd, #ul2 .odd").filter("#item2_1").end()', ".filter()"],
          ['$("#ul3 .odd, #ul2 .odd").filter("*").end()', ".filter()"],
          ['$("#ul3 > li").find("#item_3_1").end()', ".find()"],
          ['$("#ul3, #ul2").find($(".odd")).find("#item_3_1").end()', ".find( jQuery )"],
          ['$("#ul3 .odd, #ul2 .odd").first().end()', ".first()"],
          ['$("#ul3 .odd, #ul2 .odd").get().end()', ".get()"],
//          ['$("li#item2_1").hasClass("odd").end()', ".hasClass()"],
          ['$("<p></p>").hide().end()', ".hide()"],
          ['$("<p></p>").html("<i>hello</i>").end()', ".html()"],
          ['$("<p></p>").insertAfter("<i>hello</i>").end()', "insertAfter()"],
          ['$("<p></p>").insertBefore("<i>hello</i>").end()', "insertBefore()"],
          ['$("<one></one><two></two>").last().end()', "last()"],
          ['$("#ul3 .odd, #ul2 .odd").last().end()', ".last()"],
          ['$("li#item2_1").map(function(){return this.parentNode}).end()', ".map()"],
          ['$("li#item2_1").map(function(){return this.parentNode})', ".map()"],
          ['$("li#item3_1").next().end()', ".next()"],
          ['$("#item3_1, input").offsetParent().end()', ".offsetParent()"],
          ['$("#item3_1").on("ready", function(){})', ".on()"],
          ['$("#item3_1").on("ready", function(){}).end()', ".on()"],
          ['$("#item3_1").parent().end()', ".parent()"],
          ['$("<p></p>").prepend("<i></i>").end()', ".prepend()"],
          ['$("<p></p>").prependTo("<i></i>").end()', ".prependTo()"],
          ['$("li#item3_2").prev().end()', ".prev()"],
          ['$([]).pushStack([$("li.odd").get(0)]).pushStack([$("li.even").get(0)]).end()', ".pushStack()"],
          ['$("#item3_1").ready(function(){}).end()', ".ready()"],
          ['$("<p></p>").remove().end()', ".remove()"],
          ['$("<table cellpadding=2></table>").removeAttr("cellpadding").end()', ".removeAttr()"],
          ['$("<p class=upper></p>").removeClass("upper").end()', ".removeClass()"],
          ['$("<p class=upper></p>").replaceWith("upper").end()', ".removeClass()"],
          ['$("<div><h1>text</h1></div>").children().replaceWith("<h2>new heading</h2>").end()', ".replaceWith()"],
          ['$("<p style=\'display:none\'></p>").show().end()', ".show()"],
          ['$("<p style=\'display:none\'></p>").show().end()', ".show()"],
//          ['function(){$("body").append("<div id=test2><h1>text</h1></div>");$("#test2").children().replaceWith("<h2>new heading</h2>");return $("#test2").remove()}()', ""],
//          ['$("#item2_1").text().end()', ".text()"],
          ['$("<div></div>").text("test").end()', ".text( text )"],
          ['$("<div></div>").trigger("click").end()', ".trigger( )"],
        ]
      },
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
          ['$("<ul><li>1</li><li>2</li></ul>").empty()', ""],
          ['$("<ul><li><b>1</b></li><li>2</li></ul>").empty()', ""],
        ]
      }
    ]
  },
  {
    name: '.eq()',
    tests: [
      {
        name: '.eq( index )',
        tests: [
          ['$("<li>1</li><li>2</li><li>3</li>").eq(0)', " "],
          ['$("<li>1</li><li>2</li><li>3</li>").eq(1)', " "],
          ['$("<li>1</li><li>2</li><li>3</li>").eq(2)', " "],
          ['$("<li>1</li><li>2</li><li>3</li>").eq(3)', " "],
        ]
      },
      {
        name: '.eq( indexFromEnd )',
        tests: [
          ['$("<li>1</li><li>2</li><li>3</li>").eq(-1)', " "],
          ['$("<li>1</li><li>2</li><li>3</li>").eq(-2)', " "],
          ['$("<li>1</li><li>2</li><li>3</li>").eq(-3)', " "],
          ['$("<li>1</li><li>2</li><li>3</li>").eq(-4)', " "],
        ]
      },
      {
        name: 'Edge cases',
        tests: [
          ['$("ul.notexist").eq(-1)', "Last on an empty set"],
          ['$(null).eq(2)', "Second on null"],
          ['$(true).eq(1)', "Nonsense"],
        ]
      },
    ]
  },
  {
    name: '.filter()',
    tests: [
      {
        name: '.filter( selector )',
        tests: [
          ['$("<li></li><b></b>").filter("b")', " "],
          ['$("<li></li><b></b>").filter("*")', " "],
          
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
          ['$("ul li").first()', "First element"],
          ['$([3,4]).first()', "First array member"],
        ]
      },
      {
        name: 'Edge cases',
        tests: [
          ['$("ul.notexist").first()', "First on an empty set"],
          ['$(null).first()', "Null"],
          ['$(true).first()', "Nonsense"],
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
    name: '.hasClass()',
    tests: [
      {
        name: '.hasClass( className )',
        tests: [
          ['$("<div class=\'a\'></div>").hasClass("a")', ""],
//          ['$("#item1").hasClass("odd")', ""],
          ['$("<b class=\'a\'></b><b class=\'b\'></b>").hasClass("b")', "Test multiple elements"],
          ['$("<b class=\'elephant ele-phant\'>").hasClass("phant")', "Test part of classname"],
          ['$("<b class=\'banana\'>").hasClass("bAnAnA")', "iGnOrE case?"],
          ['$("<b class=\'a\\tb\\tc\'>").hasClass("b")', "HTML contains tab char instead of space"],
          ['$("<b class=\'a  b    c\'>").hasClass("b")', "Extra spaces in HTML"],
          ['$("<b class=\'a b c\\n\'>").hasClass("b")', "Newlines in HTML"],

        ]
      },
    ]
  },
  {
    name: '.hide()',
    tests: [
      {
        name: 'hide()',
        tests: [
          ['$("<i></i>").hide()', "Inline element, hidden by hide()"],
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
    name: '.insertAfter()',
    tests: [
      {
        name: '.insertAfter( target )',
        tests: [
          ['(function(){$("<i class=hello>hello</i>").insertAfter($("#item3 li")); var clone=$("#item3").clone();$("#item3 .hello").remove(); return clone})()', "In the jQuery implementation, the actual operation is a side effect. This test inspects the side effect"],
 //         ['$("<one>1</one><two>2</two>").insertBefore($("<a></a><b></b>"))', ""],
        ]
      },
    ]
  },
  {
    name: '.insertBefore()',
    tests: [
      {
        name: '.insertBefore( target )',
        tests: [
          ['(function(){$("<i class=hello>hello</i>").insertBefore($("#item3 li")); var clone=$("#item3").clone();$("#item3 .hello").remove(); return clone})()', "In the jQuery implementation, the actual operation is a side effect. This test inspects the side effect"],
 //         ['$("<one>1</one><two>2</two>").insertBefore($("<a></a><b></b>"))', ""],
        ]
      },
    ]
  },
  {
    name: 'jQuery.merge()',
    tests: [
      {
        name: 'jQuery.merge( first, second )',
        tests: [
          ['jQuery.merge([1,2],[3,4])', ""],
          ['jQuery.merge(jQuery.merge([],[1,2]),[3,4])', ""],
          ['function() {var a=[1,2], b=[3,4], c=jQuery.merge(a,b); a.pop(); return c}()', ""],
          ['function() {var a=[1,2], b=[3,4], c=jQuery.merge(jQuery.merge([],a),b); a.pop(); return c}()', ""],
          ['jQuery.merge($(".odd"),$(".even"))', "Merge jQuery objects"],
          ['jQuery.merge($(".odd").get(),$(".even"))', "Merge jQuery objects"],
        ]
      },
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
    name: '.last()',
    tests: [
      {
        name: 'last()',
        tests: [
          ['$("ul li").last()', "Last element"],
          ['$([3,4]).last()', "Last array member"],
        ]
      },
      {
        name: 'Edge cases',
        tests: [
          ['$("ul.notexist").last()', "Last on an empty set"],
          ['$(null).last()', "Null"],
          ['$(true).last()', "Nonsense"],
        ]
      },
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
          ['$({a:"apple", b:"banana"}).map(function(propertyOfObject, key) {return key + " is for " + propertyOfObject})', ""],
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
    name: '.offset()',
    tests: [
      {
        name: '.offset( )',
        tests: [
          ['$("#item2_1").offset()', " "],
        ]
      },
      {
        name: '.offset( coordinates )',
        tests: [
        ]
      },
      {
        name: '.offset( function )',
        tests: [
        ]
      },
    ]
  },
  {
    name: '.offsetParent()',
    tests: [
      {
        name: '.offsetParent()',
        tests: [
//          ['$("<div><p></p></div>").children().offsetParent()', " "],
//          ['$("<div style=\'position:static\'><p></p></div>").children().offsetParent()', " "],
          ['$("input").offsetParent()', " "],
          ['$("#item3_1, input").offsetParent()', "Two"],
          ['typeof $("#hidden_li").offsetParent()', "Element is hidden"]
//          ['$("h1").offsetParent()', " "],
// TODO: Read: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
        ]
      },
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
      },
      {
        name: 'Edge cases',
        tests: [
          ['$("<div><b></b></div>").parent()', ""],
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
    name: '.prependTo()',
    tests: [
      {
        name: '.prependTo( target )',
        tests: [
          ['$("<a></a><b>b</b>")', ""],
          ['$("<p>hello</p>").prependTo($("<div></div>"))', ""],
          ['$("<one>1</one><two>2</two>").prependTo($("<div></div>"))', ""],
          ['$("<i>hello</i>").prependTo($("<a></a><b>b</b>"))', ""],
          ['$("<i>hello</i>").prependTo($("<a></a><b>b</b>")).parent()', ""],
          ['(function(){$("<i class=hello>hello</i>").prependTo($("#item3 li")); var clone=$("#item3").clone();$("#item3 .hello").remove(); return clone})()', "In the jQuery implementation, the actual operation is a side effect. This test inspects the side effect"],
 //         ['$("<one>1</one><two>2</two>").prependTo($("<a></a><b></b>"))', ""],
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
    name: '.pushStack()',
    tests: [
      {
        name: '.pushStack( elements )',
        tests: [
//          ['$("<p></p>").pushStack(document.getElementsByTagName( "li" ))', ""],
          ['$([]).pushStack([$("li").get(0)])', ""],
        ]
      },
      {
        name: '.pushStack( elements, name, arguments )',
        tests: [
        ]
      },
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
    name: '.remove()',
    tests: [
      {
        name: '.remove()',
        tests: [
          ['$("<div><b></b><i></i></div>").children("b").remove()', ""],
          ['$("<div><b></b><i></i></div>").children("b").remove().parent()', ""],
          ['function(){$("body").append("<div id=testing><b>test</b><i></i></div>"); $("#testing b").remove();var els = $("#testing").get(); $("#testing").remove(); return els}()', ""],
        ]
      },
      {
        name: '.remove( selector )',
        tests: [
          ['$("<div><b></b><i></i></div>").children().remove("b")', ""],
          ['$("<div><b></b><i></i></div>").children().remove("b").parent()', ""],
          ['$("<div><b></b><i></i></div>").children().remove("b i")', ""],
          ['$("<div><b></b><i></i></div>").children().remove("b i").parent()', ""],
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
          ['$("<div class=\'test\'/>").removeClass("test").get(0).className', "Remove the only class name defined"],
          ['$("<div class=\'a b c\'/>").removeClass("a").get(0).className', "Remove first classname"],
          ['$("<div class=\'a b c\'/>").removeClass("b").get(0).className', "Remove middle classname"],
          ['$("<div class=\'a b c\'/>").removeClass("c").get(0).className', "Remove last classname"],
          ['$("<div class=\'my-class\'/>").removeClass("my-class").get(0).className', "Remove hyhened classname"],
          ['$("<div class=\'banana\'/>").removeClass("BANANA").get(0).className', "iGnOrE case?"],
          ['$("<div class=\'elephant ele-phant\'/>").removeClass("phant").get(0).className', "Remove a classname that does not exist (but there is another classname which contains the string)"],
          ['$("<div class=\'a a b\'/>").removeClass("a").get(0).className', "Remove a classname that is defined twice"],
          ['$("<div class=\'a b c d e f g h i\'/>").removeClass("a c d f g i").get(0).className', "Remove a lot of class names"],
          ['$("<div class=\'a b a a e a a h a\'/>").removeClass("a c d f g i").get(0).className', "Remove a classname that is defined lots of times"],
          ['$("<div class=\'a\tb\tc\'/>").removeClass("b").get(0).className', "HTML contains tab char instead of space"],
          ['$("<div class=\'a\nb c\'/>").removeClass("b").get(0).className', "HTML contains newline"],
          ['$("<div class=\' a  b    c \'/>").removeClass("b").get(0).className', "Extra spaces in HTML"],
        ]
      },
      {
        name: '.removeClass( multipleClassNames )',
        tests: [
          ['$("<div class=\'a b c\'/>").removeClass("a c").get(0).className', "Remove first and last class names"],
          ['$("<div class=\'a b c d e f g h i\'/>").removeClass("a c d f g i").get(0).className', "Remove a lot of class names #1"],
          ['$("<div class=\'abel banana car d e f g h i\'/>").removeClass("b banana car abel f g").get(0).className', "Remove a lot of class names #2"],
          ['$("<div class=\'test elephant ele-phant\'/>").removeClass("test phant").get(0).className', "Remove a classname that does not exist (but there exists a classname which contains the string)"],
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
  {
    name: '.replaceWith()',
    tests: [
      {
        name: '.replaceWith( newContent )',
        tests: [
          ['$("<div><h1>text</h1></div>").children().replaceWith("<h2>new heading</h2>")', ""],
          ['function(){$("body").append("<div id=test2><h1>text</h1></div>");$("#test2").children().replaceWith("<h2>new heading</h2>");return $("#test2").remove()}()', ""],
// ; 
        ]
      },
      {
        name: '.replaceWith( function )',
        tests: [
        ]
      },
    ]
  },
  {
    name: '.show()',
    tests: [
      {
        name: '.show(  )',
        tests: [
          ['$("<p style=\'display:none\'></p>").show()', "Block element, hidden with css"],
          ['$("<i style=\'display:none\'></i>").show()', "Inline element, hidden with css"],
          ['$("<i></i>").css("display", "none").show()', "Inline element, hidden by setting css display to none"],
          ['$("<i></i>").hide().show()', "Inline element, hidden by hide(), and shown again"],
          ['$("<i style=\'display:block\'></i>").hide().show()', "Inline element by default, but made block element with css, then hidden with hide(), and shown again"],
          ['$("<i></i>").css("display", "table-cell").hide().show()', "Element made table-cell, hidden with hide(), and shown again"],
          ['$("<i class=\'tablecell\'></i>").css("display")', "An element does not get its styles from class with jQuery, until its appended to the document. My guess is that its due to that jQuery creates a DocumentFragment. picoQuery on the other hand create a real element right away."],
          ['$("<i class=\'tablecell\'></i>").hide().show()', "Same issue as above"],
          ['$("<tablecell></tablecell>").hide().show()', ""],
          ['function () {var $el = $("<i class=\'tablecell\'></i>").appendTo("body"); $el.hide(); $el.show(); var res = $el.css("display"); $el.remove(); return res}()', ""],
          ['function () {var $el = $("<tablecell></tablecell>").appendTo("body"); $el.hide(); $el.show(); var res = $el.css("display"); $el.remove(); return res}()', "Once the node has been added to the document, jQuery and picoQuery agrees again"],
          ['function () {var $el = $("<i class=\'tablecell\'></i>").appendTo("body"); $el.hide(); $el.show(); var res = $el.css("display"); $el.remove(); return res}()', "- as above"],
          ['$("<i></i>").css("display", "").show()', "Edge case. jQuery treats empty display as hidden - even though its not"],
          ['$("<i style=\'display:\'></i>").show()', "Edge case. jQuery treats empty display as hidden - even though its not"],
          ['$("<p></p>").show()', "Edge case: Already visible - will it alter css? #1"],
          ['$("<i></i>").appendTo("body").show()', "Edge case: Already visible - will it alter css? #2"],

        ]
      },
      {
        name: '.show( duration, complete )',
        tests: [
        ]
      },
      {
        name: '.show( options )',
        tests: [
        ]
      },
    ]
  },
  {
    name: '.text()',
    tests: [
      {
        name: '.text(  )',
        tests: [
          ['$("#item2_1").text()', "Single item"],
          ['$("#item2").text()', "Parent item"],
          ['$("#testhtml").text()', "Parent item"],
          ['$("li").text()', "Multiple items"],
          ['$(makeTextNode("text")).text()', "[ Text Node ]"],
          ['$([makeTextNode("text"), makeElement("<i>italic</i>")]).text()', "[ Array of mixed content ]"],
          ['$().text()', "Empty"],
/*          ['$("<div><p></p></div>").append(makeElement("<b></b>"))', "[ Element ]"],
          ['$("<div><p></p></div>").append(makeTextNode("text"))', "[ Text Node ]"],
          ['$("<div><p></p></div>").append(makeTextNode("text"))', "[ Array of text nodes]"],
          ['$("<div><p></p></div>").append([makeTextNode("text"), makeElement("<i>italic</i>")])', "[ Array of text nodes / elements ]"],*/
        ]
      },
      {
        name: '.text( text )',
        tests: [
          ['$("<div></div>").text("test")', "Single item"],
          ['$("<div></div><li></li>").text("test")', "Multiple items"],
        ]
      },
      {
        name: '.text( function )',
        tests: [
          ['$("<one>One</one><two>Two</two>").text(function(idx,oldVal){return oldVal + idx})', ""],
          ['$("<one>One</one>").text(function(idx,oldVal){return this})', "Value of this"],
        ]
      },
    ]
  },
  {
    name: '.toArray',
    tests: [
      {
        name: 'toArray( )',
        tests: [
          ['$("<div></div><li></li>").toArray()', "Two elements"],
        ]
      }
    ]
  },
  {
    name: '.toggle()',
    tests: [
      {
        name: '.toggle(  )',
        tests: [
          ['$("<i></i>").toggle()', "Seems jQuery has a bug here!"],
          ['$("<i></i>").toggle().toggle()', "jQuery behaves really strange here..."],
          ['$("<i></i>").toggle().toggle().toggle()', "keep on toggling, I wont care!"],
          ['$("<i></i>").appendTo("body").toggle()', "Ok, I see, the strange behaviour above is because element isnt added yet. But .hide() *does* work in jQuery, before element is added"],
          ['$("<i></i>").toggle().appendTo("body")', "So, does jQuery 'remember'? - no, toggles are lost"],
          ['$("<p style=\'display:none\'></p>").appendTo("body").toggle()', "Block element, hidden with css"],
          ['$("<p style=\'display:inline-block\'></p>").appendTo("body").toggle().toggle()', ""],
        ]
      },
      {
        name: '.toggle( display )',
        tests: [
          ['$("<p></p>").appendTo("body").toggle(false)', ".toggle(false) is the same as .hide()"],
          ['$("<p style=\'display:none\'></p>").appendTo("body").toggle(false)', ".toggle(false) is the same as .hide()"],
          ['$("<p></p>").appendTo("body").toggle(true)', ".toggle(true) is the same as .show()"],
          ['$("<p style=\'display:none\'></p>").appendTo("body").toggle(true)', ".toggle(false) is the same as .show()"],
        ]
      },
      {
        name: '.toggle( duration, complete )',
        tests: [
        ]
      },
      {
        name: '.toggle( options )',
        tests: [
        ]
      },
    ]
  },
  {
    name: '.trigger()',
    tests: [
      {
        name: 'trigger( )',
        tests: [
        ]
      }
    ]
  },
/*  {
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

