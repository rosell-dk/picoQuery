window.complianceTests = [
  {
    name: '.add()',
    tests: [
      {
        name: '.add( selector )',
        tests: [
          ['$("li#item2_1").add("li#item3_1")', ""],
          ['$("li#item3_1").add("li#item2_1")', "jQuery sorts it in Document order. picoQuery does not do any sorting (it will perhaps in future release)", "document_order"],
          ['$("li#item3_1").add("li#item3_1")', "Remove duplicates"],
          ['$("li#item2_1").add("li#item3_1").end()', "pushStack"],
        ]
      },
      {
        name: '.add( element )',
        tests: [
          ['$("li#item2_1").add(document.getElementById("item3_1"))', ""],
          //[makeTextNode("text"), makeElement("<i>italic</i>")]
        ]
      },
      {
        name: '.add( elements )',
        tests: [
          ['$("li#item2_1").add([document.getElementById("item3_1"), document.getElementById("item3_2")])', ""],
          //[makeTextNode("text"), makeElement("<i>italic</i>")]
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
          ['$("#ul3").children().addBack()', "jQuery sorts the result in Document order, picoQuery doesnt yet (because .add() doesnt yet)", "document_order"],
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
          ['$("<p></p>").addClass("test ")', "Trailing space", "trailing_space"],
          ['$("<p></p>").addClass("test2 test2")', "Adding same class twice", "same_class_twice"],
          ['$("<p></p>").addClass("test2").addClass("test2")', "Adding same class twice in another way"],
          ['$("<p class=\'one two\'></p>").addClass("two")', "Adding same class in yet another way"],
          ['$("<p class=\ttest></p>").addClass("t2")', "HTML contains tab character"],
          ['$("<p class=\'one\\ttwo\'></p>").addClass("three")', "HTML contains tab character between class names", "tab_between_classnames"],
          ['$("<p class=\'one\\ntwo\'></p>").addClass("three")', "HTML contains newline character between class names", "newline_between_classnames"],
//          ['s="\t";', ""],
//          ['$("<p class=one\ntwo></p>").addClass("three")', "HTML contains newline character between class names"],
//          ['$("<div><p class=\'one\\ttwo\'></p></div>").html()', ""],
        ]
      },
      {
        name: '.addClass( function )',
        tests: [
          ['$("<div class=\'a b\'/>").addClass(function(a,b){return "b"+a+b})', "", "function"],
        ]
      },
      {
        name: 'Edge cases',
        tests: [
          ['$("<p></p>").addClass("")', "Adding empty string", "empty_string"],
          ['$("<p></p>").addClass(" ")', "Adding just a space", "space"],
          ['$("<p></p>").addClass("\t")', "Adding just a tab", "tab"],
          ['$("<p></p>").addClass()', "No arguments", "noargs"],
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
          ['$("<div><b></b></div>").children().after("hello").parent()', "Text", "text"],
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
          ['$("<div><b></b></div>").children().after("<i></i>", "<p></p>").parent()', "content_content"],
          ['$("<ul><li>1</li><li>2</li></ul>").children().after("<i></i><b></b>", "<p></p>").parent()', ""],
        ]
      },
      {
        name: '.after( function )',
        tests: [
          ['$("<div><b></b><p></p></div>").children().after(function(index){return "<i>" + index + "</i>"}).parent()', "function receives index", "function"],
          ['$("<div><b></b><p></p></div>").children().after(function(index){return "<i>" + this + "</i>"}).parent()', "value of this"],
          ['$("<div><b></b><p></p></div>").children().after(function(index){return "hello"}).parent()', "return string"],
          // todo: return element, jquery
        ]
      },
      {
        name: '.after( function-html ) (jQuery 1.10+)',
        tests: [
          ['$("<div><p>hello</p></div>").children().after(function(index, oldHtml){return "<i>" + oldHtml + "</i>"}).parent()', "get old html", "function_html"],
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
          ['$("#ul3").children().andSelf()', "jQuery sorts the result in Document order, picoQuery doesnt yet (because .add() doesnt yet)", "document_order"],
        ]
      },
    ]
  },
  {
    name: '.append()',
    tests: [
      {
        name: '.append( content )',
        tests: [
          ['$("<p></p>").append("<b></b>")', "[ htmlString ]"],
          ['$("<div><p></p></div>").append($("<b></b>"))', "[ jQuery ]"],
          ['$("<div><p></p></div>").append(makeElement("<b></b>"))', "[ Element ]"],
          ['$("<div></div>").append("text")', "[ String ]"],
          ['$("<div><p></p></div>").append(makeTextNode("text"))', "[ Text Node ]", "text_node"],
          ['$("<div><p></p></div>").append(makeTextNode("text"))', "[ Array of text nodes]"],
          ['$("<div><p></p></div>").append([makeTextNode("text"), makeElement("<i>italic</i>")])', "[ Array of text nodes / elements ]"],
          ['$("<div><p></p></div>").append([makeElement("<i>italic</i><b>bold</b>")])', "[ Array of elements ]"],
          ['$("<div><p></p><p></p></div>").children().append("hello").parent()', "Append text multiple targets"],
//          ['$("<div><p></p><p></p></div>").children().append($(tempEl).text("node")).parent()', "Append same node to multiple targets"],
//          ['function(){var $appendThis = $(tempEl).html("<b>appended</b>"); var $appendToNodes = $("body").append("<div id=tempContainerABD><one></one><two></two></div>").children(); $appendToNodes.append($appendThis); var result = $("#tempContainerABD").html(); $("#tempContainerABD").remove(); return result }()', "Append same node to multiple targets"],
          ['function(){var $appendThis = $(tempEl).html("<b class=banana>test</b>"); $("body").append("<div id=eCUbo><one></one><two></two></div>"); $("#eCUbo *").append($appendThis); var result = $("#eCUbo").clone(); $("#eCUbo").remove(); return result }()', "Append same attached node to multiple targets"],

          ['function(){$("body").append("<div id=aBeN><banana></banana></div>"); $("body").append("<div id=eCUbola><one></one><two></two></div>"); $("#eCUbola *").append($("#aBeN")); var result = $("#eCUbola").clone(); $("#eCUbola").remove(); $("#aBeN").remove(); return result }()', "Append same attached node to multiple targets"],

          ['function(){$("body").append("<div class=aBeN><banana></banana></div>"); $("body").append("<div id=eCUbola><one></one><two></two></div>"); $("#eCUbola *").append($(".aBeN")); var result = $(".aBeN").parent(); $("#eCUbola").remove(); $(".aBeN").remove(); return result }()', "Is appended node detached from previous position in DOM?", "weird"],

//          ['function(){var $appendThis = $(tempEl).html("<b class=banana>test</b>"); $("body").append("<div id=eCUbo><one></one><two></two></div>"); $("#eCUbo *").append($appendThis); var result = $("#eCUbo").clone(); $("#eCUbo").remove(); return result }()', "Is appended node removed from previous position?"],
//          ['$(tempEl)', "Append same node to multiple targets"],
          ['$("<div><p></p></div>").append("<b></b>").append("<i></i>")', "Chaining"],


        ]
      },
      {
        name: '.append( content [,content] )',
        tests: [
          ['$("<p></p>").append("<one></one>", "<two></two>")', "","content_content"],

        ]
      },
      {
        name: '.append( function )',
        tests: [
//          ['function(){$("body").append("<p id=temp></p>");res=$("#temp").append(function(){return makeElement("<b></b>")}).html(); $("#temp").remove(); return res}()', ""],
          ['$(tempEl).append(function(){return makeElement("<b></b>")})', "", "function"],
          ['$(tempEl).append(function(idx,oldHtml){return makeElement("<b>" + idx + oldHtml + "</b>")})', ""],

//          ['function(){$("body").append("<p id=temp></p>");res=$("#temp").append(function(idx,html){return makeElement("<b>" + idx + html + "</b>")}).html(); $("#temp").remove(); return res}()', ""],
//          ['function(){$("body").append("<p id=temp></p>");res=$("#temp").append(function(){return "test"}).html(); $("#temp").remove(); return res}()', ""],
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
          ['$("<p>hello</p>").appendTo($("<div></div>"))', ""],
          ['$("<one>1</one><two>2</two>").appendTo($("<div></div>"))', "Append two elements"],
          ['$("<i>hello</i>").appendTo($("<a></a><b>b</b>"))', "Append to multiple targets", "multiple_targets"],
          ['$("<p>hello</p>").appendTo($("<div></div>")).parent()', "Parent"],
          ['$("<i>hello</i>").appendTo($("<a></a><b>b</b>")).parent()', "Parent, when appended to several targets. For some reason, Zepto 1.2.0 fails completely here..."],
//          ['$("<i>hello</i>").appendTo($("<a></a><b>b</b>")).length', ""],
//          ['$("<a></a><b>b</b>").parent()', ""],
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
          ['$("<div></div>").attr(new String("class"))', "name is String class instead of string literal", "string_class1"],
        ]
      },
      {
        name: '.attr( attributeName, value )',
        tests: [
          ['$("<div></div>").attr("class", "italic")', "Standard functionality"],
//          ['$("<div data-tooltip=\'hi\'></div>").attr("tooltip", null)', "value=null removes attribute"],
          ['$(tempEl).append("<div class=\'hi\'></div>").children().attr("class", null)', "value=null removes attribute", "null_removes"],
//          ['$(tempEl).append("<div data-banana=\'hi\'></div>").children().attr("data-banana", null)', "value=null removes attribute"],
//          ['$("<div/>").attr("data-tooltip", "line1\\nline2")', "Value is multi-line"],
          ['$("<div/>").attr("data-tooltip", "line1\\nline2").attr("data-tooltip")', "Value is multi-line"],
//          ['$("<div/>").attr("data-tooltip", "line1<br>line2")', "Value contains tag"],
          ['$("<div/>").attr("data-tooltip", "line1<br>line2").attr("data-tooltip")', "Value contains tag"],
          ['$("<div></div>").attr(new String("class"), "italic")', "name is [String class] instead of literal", "string_class"],

/*          ['jQuery.type(10)', ""],
          ['jQuery.type(new Number(10))', ""],
          ['typeof "10"', ""],
          ['typeof new String("10")', ""],*/
        ]
      },
      {
        name: '.attr( attributes )',
        tests: [
          ['$("<div></div>").attr({class:"italic"})', "", "Plain object"],
          ['function() {var obj=new Object(); obj.class="italic"; return $("<div></div>").attr(obj)}()', "", "Constructed object"],
        ]
      },
      {
        name: '.attr( attributeName, function )',
        tests: [
          ['$("<div/>").attr("class", function(){return "test"})', "", "function"],
          ['$("<div class=val></div>").attr("class", function(i,oldVal){return \'index\'+i})', "argument 1: index"],
          ['$("<div class=val></div>").attr("class", function(i,oldVal){return \'changed-\' + oldVal})', "argument 2: old value"],
          ['$("<div></div>").attr("class", function(i,oldVal){return \'changed-\' + oldVal})', "argument 2: old value, when there are none", "function_arg2_noclass"],
//          ['$("<div class=val></div><div class=test></div><div></div>").attr("class", function(i,oldVal){return oldVal+i})', " "],
        ]
      },
      {
        name: 'Edge cases',
        tests: [
          ['$("<div/>").attr("class", null)', "null"],
          ['$("<div/>").attr("class", undefined)', "undefined", "undefined"],
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
          ['$("<div><b></b></div>").children().before("hello").parent()', "Text", "text"],
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
          ['$("<div><b></b></div>").children().before("<i></i>", "<p></p>").parent()', "content_content"],
          ['$("<ul><li>1</li><li>2</li></ul>").children().before("<i></i><b></b>", "<p></p>").parent()', ""],
        ]
      },
      {
        name: '.before( function )',
        tests: [
          ['$("<div><b></b><p></p></div>").children().before(function(index){return "<i>" + index + "</i>"}).parent()', "function receives index", "function"],
          ['$("<div><b></b><p></p></div>").children().before(function(index){return "<i>" + this + "</i>"}).parent()', "value of this"],
          ['$("<div><b></b><p></p></div>").children().before(function(index){return "hello"}).parent()', "return string"],
          // todo: return element, jquery
        ]
      },
      {
        name: '.before( function-html ) (jQuery 1.10+)',
        tests: [
          ['$("<div><p>hello</p></div>").children().before(function(index, oldHtml){return "<i>" + oldHtml + "</i>"}).parent()', "get old html", "function_html"],
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
          ['$("#ul3").children()', ""],
          ['$("#ul3").children(".odd")', "Filtering"],
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
          ['$("li#item2_1").closest("ul", $("#ul2").get(0))', "context"],
          ['$("li").closest("ul", $("#ul0").get(0))', ""],
          ['$("li").closest("#ul0", $("#ul2").get(0))', ""], // Old comment (removed, because I do not see that problem now): Selection isnt in context. The jQuery result may be somewhat surprising. The doc says about context: A DOM element within which a matching element may be found. Yet, the element returned by jQuery is not found in the context
          ['$("li").closest("li#item2_1", $("body").get(0))', ""],
          ['function() {var doc = document.getElementById("testiframe").contentWindow.document; var el=doc.createElement("list"); el.appendChild(doc.createElement("item")); doc.documentElement.appendChild(el); return $("item", doc).first().closest("list", doc)}()', "Selection and context is another document"],
          ['function() {var doc = document.getElementById("testiframe").contentWindow.document; var el=doc.createElement("list"); el.appendChild(doc.createElement("item")); doc.documentElement.appendChild(el); return $("item", doc).first().closest("list")}()', "This test shows that context per default is the context of the selection"],
          ['$("li").closest("ul", document.getElementById("testiframe").contentWindow.document)', "Setting another document as context has no effect in jQuery, it seems..."],
          ['$("li").closest("notfound", document.getElementById("testiframe").contentWindow.document)', ""],
// $(} $("<ul><li>truck<li></truck>", ).find("li").closest("ul")
        ]
      },
      {
        name: '.closest( selection )',
        tests: [
          ['$("li").closest($("ul"))', "", "selection"],
        ]
      },
      {
        name: '.closest( element )',
        tests: [
          ['$("li").closest($("ul").get(0))', "", "element"],
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
          ['$("ul ul li:odd")', "<i>selector</i> is a special jQuery selector. Currently unsupported", "jquery_selectors"],
        ]
      },
      {
        name: 'jQuery( selector, context [ Element ] )',
        tests: [
          ['$("li", jq$("#item3").get(0))', "Standard"],
          ['$("body li", document.getElementById("item3"))', "selector begins with something outside of context. This requires special handling when finding is based on Element.querySelecorAll (which it is in picoQuery, Zepto and Cash). In newer browsers, you can will get the compliant behaviour with the :scope pseudo-class. picoQuery handles this - the solution is based on this shim: <a href='https://github.com/lazd/scopedQuerySelectorShim'>shim</a>. Zepto and Cash does not handle it (yet). Mere info: <a href='https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector'>the entire hierarchy counts</a>. <a href='https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll'>even more info</a>", "scoped_search"],
          ['$("li#item1", jq$("ul#ul2").get(0))', "selector is not in the decendant tree"],
          ['$("#item3", jq$("#item3").get(0))', "selector matches root of context", "selector_matches_context_root"],
          ['$(":scope body li", jq$("#item3").get(0))', "Applying the :scope pseudo-class."],
          ['$("#item3 li", jq$("#item3").get(0))', "selector begins with something outside of context"],
          ['$("#item3", document)', "jQuery( selector, [HTMLDocument]"],
        ]
      },
      {
        name: 'jQuery( selector, context [ jQuery ] )',
        tests: [
          ['$("#item3", $("body"))', "Standard"],
          ['$("li#item1", $("ul#ul2"))', "selector is not in the decendant tree (no match)", "no_match_in_context"],
          ['$("#item3", $("#item3"))', "selector matches root of context"],
          ['$("#item3_1", $("#item2, #item3"))', "context has several 'roots', selector matches the second of them"],
          ['$("#item3_1", $("#item1, #item2"))', "context has several 'roots', but selector does not match in any of them"],
          ['$("li", $("<ul></ul><ul><li></li></ul>"))', "context has several 'roots'"],

          ['$("#item3 li", $("#item3"))', "Selector begins with something outside of context"],
          ['$("body", $("body"))', "Selector begins with something outside of context"],
          ['$("li.odd", $("ul"))', "Selector matches in several contexts. jQuery removes duplicates, but Zepto 2.1.4 does not.", "match_in_several_contexts"],
        ]
      },
      {
        name: 'jQuery( selector, context [ Array ] ) (outside specification)',
        tests: [
          ['$("li", [document.getElementById("item3")])', "One element in standard array", "context_is_array"],
          ['$("li", [$("#item3").get(0), $("#item2").get(0)])', "Two elements in array. <br><br>Whoopsidasie, the order is different in picoQuery. It seems to get the order right, picoQuery must first do an unscoped search and then filter the results such that items outside the context are removed", "wrong_order"],
          ['$("li", document.getElementById("ul0").childNodes)', "[ NodeList ]", "edgecase3"],
          ['$("li", document.getElementById("ul0").getElementsByTagName("ul"))', "[ HTMLCollection ]", "edgecase4"],


        ]
      },
      {
        name: 'jQuery( element )',
        tests: [
          ['$(jq$("#item3").get(0))', "Standard - <i>element</i> is an Element node"],
          ['$(makeTextNode("text"))', "[ Text Node ]"],
          ['$(makeElement("<i>italic</i>"))', "[ Element ]"],


        ]
      },
      {
        name: 'jQuery( elementArray )',
        tests: [
          ['$([document.getElementById("item3")])', "Standard Array"],
          ['$($("#item3").get())', "Standard Array (exact same as above)"],
          ['$(makeNodeList())', "[ NodeList ]", "nodelist"],
          ['$(makeHTMLCollection())', "[ HTMLCollection ]", "html_collection"],
          ['$("#item3").get()', ""],
//          ['console.log("hm",$("#item3").get())', ""],

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
          ['$("<hr/>")', "Self-closing tag on void element (valid in HTML5, but <a href='http://stackoverflow.com/questions/3558119/are-self-closing-tags-valid-in-html5'>syntactic sugar</a>). Btw, this document has <a href='http://www.w3schools.com/html/html5_intro.asp'>HTML5 doctype</a>"],
          ['$("<div/>")', "Self-closing tag on container element. According to the link above, this is actually an error in HTML5. If such invalid self-closing tags appear in the string used to set el.innerHTML, the browser will treat them as start tags. In this case we end up with missing an end tag. The browser detects a missing tag and adds it."],
          ['$("<div/><p></p>")', "If this string is used to set el.innerHTML, the invalid self-closing tag will be converted to a start tag, and we get a valid div. But jQuery expands all such self-closed container tags before setting el.innerHTML. Here, the results will differ", "invalid_html"],
          ['$("<div>inside container</div>outside<div>inside</div>")', "Text nodes are preserved", "preserve_text_nodes"],
          ['$("<div>inside</div>outside")', "But text nodes after last ending tag are thrown away", "ending_text_dismissed"],
          ['$("outside<div>inside</div>")', "And starting with text is no-go", ""],
          ['$("<div/>a")', "", ""],
          ['$("<div class=div1/>")', "Self-closing tag with unquoted attribute (unvalid in HTML5)", "invalid_html2"],
          ['$("<hr class=hr/>")', "Self-closing tag (void element) with unquoted attribute (valid in HTML5)"],
          ['$("<div class=\'div1\'/>")', "Self-closing tag with quoted attribute"],
          ['$("<div class=div1></div>")', ""],
          ['$("<p></p>").parent()', "The element has no parent.", "no_parent"],
          ['$("<p/>").parent()', ""],

        ]
      },
      {
        name: 'jQuery( html, ownerDocument )',
        tests: [
          ['$("<b>some html</b>", document.getElementById("testiframe").contentWindow.document).get(0).ownerDocument', "Is signature supported at all?", "owner_document"],
//          ['document.getElementById("testiframe").contentWindow.document', ""],
        ]
      },
      {
        name: 'jQuery( html, attributes )',
        tests: [
          ['$("<div></div>", {"class": "mydiv"})', "A string defining a single, standalone, HTML element (e.g. <div/> or <div></div>) - just like the spec says", "attributes"],
          ['$("<hr/>", {"class": "my-hr"})', "variant of above"],
          ['$("<div/>", {"class": "my-div"})', "variant of above (but illegal syntax in HTML5)"],
          ['$("<div>non-empty</div>", {"class": "mydiv"})', "A string defining a non-empty element (outside spec)", "attributes_non_empty"],
          ['$("<div><b>non-empty</b></div>", {"class": "mydiv"})', "A string defining a non-empty element (outside spec)"],
          ['$("<div></div>", {"class": function(idx,oldAttr){return "mydiv2"}})', "Set an attribute with a function"],
          ['$("<div></div>", {"class": function(idx,oldAttr){return "my-" + idx + "-" + oldAttr}})', "Test if function arguments are correct"],
          ['$("<div></div>", {"text": "some text"})', "text()"],
          ['$("<div></div>", {"html": "<b>hello</b>"})', "html()"],
//          ['$("<input></input>", {"val": "14"}).val()', "val()"],
//          ['$("<input></input>", {"val": function(){return "fourteen"}}).val()', "val(), as function"],

//          ['$("<div></div>", {"html": "<b>hello</b><i></i>", "append": "<append>me</append>"})', "append()"],
          ['$("<div></div>", {"append": "<append>me</append>"})', "append(). This fails in zepto. In jQuery 1.4-1.7 only certain methods were allowed, but in jQuery 1.8 allows all instance methods are allowed. Zepto 1.2.0 only support the original methods ('val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset' and events)", "jq1_8methods_as_attributes"],

          ['$("<input></input>", {"napoleon": "14"})', "Neather name of a method nor standard attribute name"],

          ['$("<div></div>", {"ready": function(){console.log("jQuery( html, attributes ) - ready")}})', "Event (check console)"],
          ['$("<div></div>", {on:{ready: function(){console.log("ready")}}})', "Strange. This should work in jQuery, according to doc, but it does not"],
          ['$("<div></div><div></div>", {"text": "some text"})', "two elements"],
          ['$("<my-div></my-div>", {"text": "some text"})', "dashes in tag names are accepted in jquery"],
        ]
      },
      {
        name: 'jQuery( callback )',
        tests: [
          ['$(function(dollar){console.log("jQuery( callback ) called. Arguments:", arguments)})', "The callback should receive a reference to jQuery. It does not in Cash 1.3.0 (see console output)"],

        ]
      },
      {
        name: 'Misc',
        tests: [
          ['$("<div class=div1/><div class=div2/>")', "Invalid self-closing tag (http://stackoverflow.com/questions/3558119/are-self-closing-tags-valid-in-html5)"],
          ['$("<hr />")', "Valid self-closing tag"],
          ['$({length:1,0:document.getElementById("item3_1")})', "Array-like", "array_like"],
          ['$({0:document.getElementById("item3_1")})', "Object, not so array-like"],
          ['$({zero:document.getElementById("item3_1")})', "Object, not array-like at all"],
          ['$($("<div>text</div>"))', "Wrapping a jQuery object"],
          ['$(jq$("<div>text</div>"))', "Wrapping a jQuery 1.12.4 object", "edgecase2"],
//          ['$("<li><a></a></li>").children("a").end()', "pushstack. Every traversal method creates a new jQuery set and builds a stack. Use .end() to get at the previous set. Not supported in picoQuery yet"],
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
          ['$(null).get(0)', ""],
          ['$(0)', ""],
          ['$(0).get(0)', ""],
          ['$(1)', "", "edgecase5"],
          ['$(2)', ""],
          ['$(2).get(0)', ""],
          ['$(undefined)', ""],
          ['$("li", undefined)', ""],
          ['$("li", [undefined])', "", "edgecase1"],
          ['$([document, null])', "", "edgecase6"],
          ['$(false)', ""],
          ['$(false).get(0)', ""],
          ['$("")', ""],
          ['$("").get(0)', ""],
          ['$([])', ""],
          ['$([]).get(0)', ""],
          ['$("a string")', ""],
          ['$("a string").get(0)', ""],
          ['$(true)', "", "edgecase7"],
          ['$(true).get(0)', ""],
          ['$([3,4])', ""],
          ['$([3,4]).get(0)', ""],
          ['$(":scopepy body li", jq$("#item3").get(0))', "Applying non-existant pseudy-class."],
          ['$(":scopydoodlydoo body li", jq$("#item3"))', "Applying non-existant pseudy-class.", "edgecase8"],
        ]
      },
    ]
  },

  {
    name: '.constructor2()',
    tests: [
      {
        name: 'testing...',
        tests: [
//          ['$("li", jq$("#item3").get(0))', "Standard"],
//          ['$("#item3", document)', "jQuery( selector, [HTMLDocument]"],
//          ['jq$("<b>hej</b>").get(0)', ""],
//          ['$(jq$("<b>hej</b>"))', ""],
//            ['$("#item3").get()', ""],
//          ['$(makeNodeList())', "[ NodeList ]"],
        ]
      },
      {
        name: 'jQuery( html )',
        tests: [
          ['$("<li id=one>1</li><li id=two>2</li>")', ""],
          ['$("<hr/>")', "Self-closing tag on void element (valid in HTML5, but <a href='http://stackoverflow.com/questions/3558119/are-self-closing-tags-valid-in-html5'>syntactic sugar</a>). Btw, this document has <a href='http://www.w3schools.com/html/html5_intro.asp'>HTML5 doctype</a>"],
          ['$("<div/>")', "Self-closing tag on container element. According to the link above, this is actually an error in HTML5. It will be treated as a starting tag, and problem arises, because there will be no ending tag"],
          ['$("<div/>a</div>")', "Internally, picoQuery uses innerHtml. As explained above, first tag is illegal but treated as a starting tag (in HTML5). jQuery on the other hand does some parsing, and converts the invalid self-closing tag to &lt;div>&lt;/div>", "invalid_html"],
          ['$("<div/><p></p>")', "", ""],
          ['$("<div>inside container</div>outside<div>inside</div>")', "Text nodes are preserved", ""],
          ['$("<div>inside</div>outside")', "But text nodes after last ending tag are thrown away", ""],
          ['$("outside<div>inside</div>")', "And starting with text is no-go", ""],
          ['$("<div class=div1/>")', "Self-closing tag with unquoted attribute (unvalid in HTML5)", "invalid_html2"],
          ['$("<hr class=hr/>")', "Self-closing tag (void element) with unquoted attribute (valid in HTML5)"],
          ['$("<div class=\'div1\'/>")', "Self-closing tag with quoted attribute"],
          ['$("<div class=div1></div>")', ""],
          ['$("<p></p>").parent()', ""],
          ['$("<p/>").parent()', ""],

        ]
      },
    ]
  },


  {
    name: '.css()',
    tests: [
      {
        name: '.css( property ) - attached nodes',
        tests: [
          ['$(tempEl).append("<li class=\'italic\'></li>").children().css("font-style")', "CSS set with class, get css using dasherized form", "dashes"],
          ['$(tempEl).append("<li class=\'italic\'></li>").children().css("fontStyle")', "CSS set with class, get css using camelCase form", "camelcase"],
          ['$(tempEl).append("<li style=\'font-style:italic\'></li>").children().css("font-style")', "CSS set with inline style, get css using dasherized form"],
          ['$(tempEl).append("<li style=\'font-style:italic\'></li>").children().css("fontStyle")', "CSS set with inline style, get css using camelCased form"],
          ['$(tempEl).append("<li class=\'italic\' style=\'font-style:normal\'></li>").children().css("fontStyle")', "CSS set both with class and inline style, get css using camelCased form"],
          ['$(tempEl).append("<li class=\'italic-important\' style=\'font-style:normal\'></li>").children().css("font-style")', "CSS set both with class and inline style. But in class, it is !important. Get css using dasherized form", "important"],
          ['$(tempEl).append("<li class=\'italic-important\' style=\'font-style:normal\'></li>").children().css("fontStyle")', "CSS set both with class and inline style. But in class, it is !important. Get css using camelCased form"],
          ['$(tempEl).append("<li style=\'float:left\'></li>").children().css("float")', "float is a special case, because getComputedStyle(el).getPropertyValue() needs to access it with cssFloat"],
          ['$(tempEl).append("<li style=\'float:left\'></li>").children().css("cssFloat")', "float is a special case, because getComputedStyle(el).getPropertyValue() needs to access it with cssFloat"],
          ['$(tempEl).append("<i class=\'tablecell\'></i>").children().css("display")', ""],
          ['$(tempEl).append("<tablecell></tablecell>").children().css("display")', ""],
          ['$("#auto_margin").css("margin-left")', "margin:auto", "automargin"],
          ['$("#auto_margin").css("marginLeft")', "margin:auto", "automargin2"],
          ['$("#nomargin").css("margin-left")', "no margin:auto"],


//.italic-important
/*
          ['$("li.odd").css("font-style")', "dasherized", "dashes"],
          ['$("li.odd").css("fontStyle")', "camelCase", "camelcase"],
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
          ['$("<i class=\'tablecell\'></i>").css("display")', "An element does not get its styles from class with jQuery, until its appended to the document. NOTE: jQuery does NOT return the same on FF and Chrome (tested in FF 49.0.2 and Chromium 53). jQuery returns 'block' in FF, but empty string in Chrome"], // My guess is that its due to that jQuery creates a DocumentFragment. picoQuery on the other hand create a real element right away.
          ['$("<tablecell></tablecell>").css("display")', "In picoquery 0.4.0, the result is different in Firefox and Chromium (in Firefox, picoQuery return table-cell). NOTE: jQuery does NOT return the same on FF and Chrome. It returns 'block' in FF, but empty string in Chrome"],
          ['function () {var $el = $("<tablecell></tablecell>").appendTo("body"), res = $el.css("display"); $el.remove(); return res}()', "Once the node has been added to the document, jQuery and picoQuery agrees again"],*/
        ]
      },
      {
        name: '.css( property ) - unattached nodes',
        tests: [

          ['getComputedStyle(document.createElement("li"))["display"]', "Returns 'block' in FF, but empty string in Chrome"],
//          ['function() {var container=document.createElement("div"); container.innerHTML="<li></li>"; return container.children[0]}()', ""],
          ['function() {var container=document.createElement("div"); container.innerHTML="<li></li>"; return getComputedStyle(container.children[0])["display"]}()', "Returns 'list-item' in FF - so FF behaves differently when element is created with innerHTML than with createElement"],

          ['$("<li class=\'italic\'></li>").css("font-style")', "CSS set with class, get css using dasherized form. NOTE: jQuery does NOT return the same on FF and Chrome (tested in FF 49.0.2 and Chromium 53). jQuery returns 'italic' in FF, but empty string in Chrome"],
          ['$("<li class=\'italic\'></li>").css("fontStyle")', "CSS set with class, get css using camelCase form"],
          ['$("<li style=\'font-style:italic\'></li>").css("font-style")', "CSS set with inline style, get css using dasherized form"],
          ['$("<li style=\'font-style:italic\'></li>").css("fontStyle")', "CSS set with inline style, get css using camelCased form"],
          ['$("<li class=\'italic\' style=\'font-style:normal\'></li>").css("fontStyle")', "CSS set both with class and inline style, get css using camelCased form"],
          ['$("<li class=\'italic-important\' style=\'font-style:normal\'></li>").css("font-style")', "CSS set both with class and inline style. But in class, it is !important. Get css using dasherized form"],
          ['$("<li class=\'italic-important\' style=\'font-style:normal\'></li>").css("fontStyle")', "CSS set both with class and inline style. But in class, it is !important. Get css using camelCased form"],
          ['$("<li style=\'float:left\'></li>").css("float")', "float is a special case, because getComputedStyle(el).getPropertyValue() needs to access it with cssFloat"],
          ['$("<li style=\'float:left\'></li>").css("cssFloat")', "float is a special case, because getComputedStyle(el).getPropertyValue() needs to access it with cssFloat"],
          ['$("<div></div>").css("height")', "if css height is auto, return calculated height", "auto"],
          ['$("<i></i>").css("display")', ""],
          ['$("<li></li>").css("display")', ""],
          ['$("<li/>").css("display")', ""],
          ['$("<i class=\'inline-block\'></i>").css("display")', ""],
          ['$("<i class=\'tablecell\'></i>").css("display")', ""],
          ['$("<tablecell></tablecell>").css("display")', ""],
          ['console.log($("<tablecell></tablecell>").get(0).constructor)', ""],
          ['console.log($("<i></i>").get(0).constructor)', ""],
        ]
      },
      {
        name: '.css( property, value )',
        tests: [

          ['$(tempEl).css("font-style", "italic").css("font-style")', "Set dasherized, get dasherized"],
          ['$(tempEl).css("font-style", "italic").css("fontStyle")', "Set dasherized, get camelCased"],
          ['$(tempEl).css("fontStyle", "italic").css("font-style")', "Set camelCased, get dasherized"],
          ['$(tempEl).css("fontStyle", "italic").css("fontStyle")', "Set camelCased, get camelCased"],
          ['$(tempEl).css("user-select", "none")', "Set user-select, which isnt standard (yet), but supported with vendor prefixes in most browsers", "vendor_prefix"],
          ['$(tempEl).css("user-select", "none").css("user-select")', "Set user-select, which isnt standard (yet), but supported with vendor prefixes in most browsers", "user_select"],
          ['$(tempEl).css("nonexistingProp", "none").css("nonexistingProp")', "nonexisting property", "nonexisting_property"],
          ['$(tempEl).css("fontSize", "10").css("fontSize")', "Setting font size as a string without unit has no effect","unitless_string"],
//          ['$(tempEl).css("font-size", "10").css("font-size")', "Setting font size as a string without unit has no effect","numeral_property_1"],
          ['$(tempEl).css("fontSize")', "(see, its the same)"],
          ['$(tempEl).css("fontSize", 10).css("fontSize")', "But setting font size as a number has an effect - jQuery adds px to it automatically", "add_px"],

          ['$(tempEl).css("width", "123").css("width")', "Now, this may be surprising. Setting width as a string without unit HAS an effect - px is automatically added. But then the system is different for width than for font size. It is because jQuery has added a special cssHook for width and height (there are many special css hooks defined, doing special things...)"],
          ['$(tempEl).css("width", 123).css("width")', "width_height_exception"],
          ['$(tempEl).css("width", "12em").css("width")', "Set width in em", "width_in_em"],

          ['$(tempEl).css("margin-left", "14").css("margin-left")', "For margin-left, we have same system as with font-size"],
          ['$(tempEl).css("margin-left", 14).css("margin-left")', ""],

          ['$(tempEl).css("margin-left", "-14").css("margin-left")', "Negative number is also ignored, when it is a string"],
          ['$(tempEl).css("margin-left", -14).css("margin-left")', "Negative number"],

          ['$(tempEl).css("line-height", 1.2).css("line-height")', "jQuery does not add px to certain properties, such as line-height"],
          ['$(tempEl).css("line-height", "1.4").css("line-height")', "jQuery does not add px to certain properties, such as line-height"],
//          ['$(tempEl).css("width", "+=10").css("width")', "Relative"],
//          ['$(tempEl).append("<div style=\'width:+=10px\'></div>").children().css("width")', ""],
          ['$(tempEl).css("font-size", "+=10px").css("font-size")', "jQuery allows special syntax to add/substract from current value", "adjust_css"],
          ['$(tempEl).css("font-size", "+=10").css("font-size")', "jQuery allows special syntax to add/substract from current value"],
          ['$(tempEl).append("<div style=\'font-size:+=10px\'></div>").children().css("font-size")', "(it is not standard css)"],
//          ['$(tempEl).css("width", 123).css("width")', "Set width without px (as number))", "px2"],
          ['$("<div class=italic/>").css("fontStyle", "normal").css("fontStyle")', ""],
          ['$("<div class=italic/>").css("fontStyle", "normal").css("fontStyle")', ""],
          ['$("<div/>").css("cssText", "color:blue;font-size:16px").css("fontSize")', ""],
          ['$("<one>1</one><two>2</two>").css("color", "blue")', "Multiple"],
          ['$("<div><b></b></div>").appendTo(tempEl).css("cssText", "color:black;padding-left:2px;margin-left:20px;margin-right:20;line-height:2;position:relative")', "cssText", "css_text"],



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
        name: '.css( propertyNames [Array])',
        tests: [
          ['$("#item2_1").css(["fontStyle", "textDecoration"])', "camelCased", "property_names"],
          ['$("#item2_1").css(["font-style", "text-decoration"])', "dasherized"],
          ['$("#item2_1").css(new Array("font-style", "text-decoration"))', "Array"],
        ]
      },
      {
        name: '.css( propertyName, function )',
        tests: [
          ['$(tempEl).css("fontStyle", function(idx,value){return "italic"})', "Basic", "function"],
          ['$(tempEl).css("font-style", function(idx,value){return "italic"})', ""],
          ['$(tempEl).css("fontSize", function(idx,value){return 10})', "px are also added automatically here", ""],
          ['$(tempEl).css("fontSize", function(idx,value){return "11px"})', "px are only added when needed", ""],
          ['$(tempEl).css("line-height", function(idx,value){return 1.2})', "px are only added when needed", ""],
          ['function(){var arr=[];$("<one>1</one><two>2</two>").css("height", function(i,el) {arr.push(i); return "20px"});return arr}()', "First argument to callback is the index"],
          ['function(){var arr=[];$("<one style=\'color:blue\'>1</one><two style=\'color:#000\'>2</two>").css("color", function(i,val) {arr.push(val); return "20px"});return arr}()', "Second argument to callback is the old value"],
          ['function(){var arr=[];$("<one>1</one><two>2</two>").css("height", function(i,val) {arr.push(this); return "20px"});return arr}()', "This points to current element"],


        ]
      },
      {
        name: '.css( properties )',
        tests: [
          ['$(tempEl).css({ "background-color": "#ffe", "border-left": "5px solid #ccc" })', "dasherized", "properties"],
          ['$(tempEl).css({ "backgroundColor": "#ffe", "borderLeft": "5px solid #ccc" })', "camelCased"],
        ]
      },
      {
        name: 'Edge cases',
        tests: [
          ['$("li#item2").css()', ".css() is not defined in documentation"],
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
          ['$("<div></div>").data("obj", {a:42}).data("obj")', "Set data (and get it)", "key_value"],
          ['$("<div></div>").data("obj", {a:42}).data("obj")[\'a\']', "Set and get data"],
          ['$("<div></div>").data("obj", {a:42}).get(0)', ""],
          ['$("<div></div>").data("obj2", {"a":"42"}).data("obj2")', ""],
          ['$("<div data-monkey=\'chimpanse\' ></div>").data("a",42).data("a")', "Set data on a node that has a data-attribute"],
          ['$("<div data-monkey=\'chimpanse\' ></div>").data("monkey", "gibbon").data("monkey")', "Update data that was set with data-attribute"],
          ['$(tempEl).data("monkey", "gibbon")', "Does setting data add a data-attribute? (it should not)"],
          ['$("<div data-monkey=\'chimpanse\' ></div>").data("monkey", "gibbon")', "Does setting this data affect the data-attribute? (it should not)", "data_attr_not_affected"],
        ]
      },
      {
        name: '.data( obj )',
        tests: [
          ['$("<div></div>").data({a:42,b:[]}).get(0)', "obj"],
          ['$("<div></div>").data({a:42,b:[]}).data("a")', ""],
          ['$("<div></div>").data({a:42,b:[0,1]}).data("b")', ""],
          ['$("<div data-monkey=\'chimpanse\' ></div>").data({b:42,c:[0,1]}).data()', "Called when html contains data-attributes", "obj_has_data_attr"],
//          ['$("<div data-monkey=\'chimpanse\' ></div>").data("a",42).data({b:42,c:[0,1]}).data()', "Existing removed? - no!"],
          ['$("<div data-monkey=\'chimpanse\' ></div>").data("a",42).data({a:12,chimpanse:[0,1]}).data()', "Existing updated? - yes of course"],
        ]
      },
      {
        name: '.data( )',
        tests: [
          ['$("<div data-monkey=\'chimpanse\' ></div>").data()', "noargs"],
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
    name: '.detach()',
    tests: [
      {
        name: '.detach()',
        tests: [
          ['$("<div><b></b><i></i></div>").children("b").detach()', "Basic: detach an element (returns the element)"],
          ['function() {$(tempEl).append("<p><b></b><i></i></p>").find("b").detach(); return $(tempEl)}()', "Basic: detach an element (parent no longer contains it)"],
          ['function() {$(tempEl).append("<p><b></b><i></i></p>").children().children().detach(); return $(tempEl)}()', "detach two elements"],
        ]
      },
      {
        name: '.detach( selector )',
        tests: [
          ['function() {$(tempEl).append("<p><b></b><i></i></p>").children().children().detach("b"); return $(tempEl)}()', "Basic: detach an element (parent no longer contains it)", "selector"],
          ['function() {$(tempEl).append("<p><b></b><i></i><strong></strong></p>").children().children().detach("b, strong"); return $(tempEl)}()', "detach two elements"],
          ['function() {$(tempEl).append("<p><b></b><i></i></p>").children().children().detach("* > b"); return $(tempEl)}()', "Match a 'b' element against '* > b'. In jQuery, this yields a match", "selector_nested"],
          ['function() {$(tempEl).append("<p><b></b><i></i></p>").children().detach("* > b"); return $(tempEl)}()', "Try a selector that selects deep"],
        ]
      },
      {
        name: 'Edge cases',
        tests: [
          ['$("<div><b></b><i></i></div>").children("b").detach().parent()', "Get parent of detachd item"],
          ['$("<div><b></b><i></i></div>").children().detach("b").parent()', "Get parent of detachd item"],
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
//          ['function(){var els=[];$("li").each(function(i) {els.push(this)});return els}()', ""],
          ['$("<ul><li></li><li></li></ul>").children().each(function(idx,el) {$(this).text(\'item\')})', "Basic"],
//          ['$("<ul><li></li><li></li></ul>").children().each(function(idx,el) {$(this).text(\'item\' + idx)})', "First argument is the index"],
          ['function(){var arr=[];$("#item3 li").each(function(i,el) {arr.push(i)});return arr}()', "First argument to callback is the index", "first_cb_arg"],
          ['function(){var arr=[];$("#item3 li").each(function(i,el) {arr.push(el)});return arr}()', "Second argument to callback is the element", "second_cb_arg"],
          ['function(){var arr=[];$("#item3 li").each(function(i,el) {arr.push(this)});return arr}()', "this is the element"],
//          ['function(){var sum=0;$("li").each(function(i) {sum+=i});return sum}()', ""],
          ['function(){var els=[];$([3,4]).each(function(i,el) {els.push(el)});return els}()', "Iterate plain array", "iterate_plain_array"],
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
          ['$("ul").end()', "jQuery( selector ) adds the document to the pushstack", "document_added_to_pushstack"],
          ['$("<ul></ul>").end()', "jQuery( html ) does not add anything to the pushstack"],
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
        name: '.filter( selector ) - attached node',
        tests: [
          ['$("#item3 *").filter(".odd")', ""],
        ]
      },
      {
        name: '.filter( selector ) - unattached node',
        tests: [
          ['$("<li></li><b></b>").filter("b")', "Filter by tag-name"],
          ['$("<li></li><b></b><li></li>").filter("li")', "Filter, multiple results"],
          ['$("<li></li><b></b>").filter("*")', "Filter *"],          
        ]
      },
      {
        name: '.filter( element )',
        tests: [
          ['$("#item3 li").filter(document.getElementById("item3_1"))', "", "element"],
        ]
      },
      {
        name: '.filter( elements )',
        tests: [
          ['$("#item3 li").filter([document.getElementById("item3_1")])', "Array of elements", "array"],
          ['$("#item3 li").filter({length:1, 0:document.getElementById("item3_1")})', "Array-like", "array_like"],
          ['$("#item3 li").filter(document.getElementsByTagName("li"))', "HTMLCollection"],
        ]
      },
      {
        name: '.filter( selection )',
        tests: [
          ['$("#item3 li").filter($("#item3_1"))', "Single item", "selection"],
          ['$("#item3 li").filter($("li"))', "Multiple items"],
        ]
      },
      {
        name: '.filter( function )',
        tests: [
          ['$("#item3 li").filter(function(idx,el){return true})', "Return all elements", "function"],
          ['$("#item3 li").filter(function(idx,el){return false})', "Return no elements"],
          ['function(){var arr=[];$("#item3 li").filter(function(i,el) {arr.push(i);return true});return arr}()', "First argument to callback is the index", "first_cb_arg"],
          ['function(){var arr=[];$("#item3 li").filter(function(i,el) {arr.push(el);return true});return arr}()', "Second argument to callback is the element", "second_cb_arg"],
          ['function(){var arr=[];$("#item3 li").filter(function(i,el) {arr.push(this);return true});return arr}()', "This is the element", "this"],
//          ['$("#item3 li").filter(function(idx,el){return (idx==0)})', "Test first argument (index)"],
//          ['$("#item3 li").filter(function(idx,el){return (el.id=="item3_1")})', "Test second argument (element)"],
//          ['$("#item3 li").filter(function(idx,el){return (this.id=="item3_1")})', "Test this"],
        ]
      },
    ]
  },
  {
    name: '.filter2()',
    tests: [
      {
        name: '.filter( function )',
        tests: [
          ['$("#item3 li").filter(function(idx,el){return true})', "Return all elements", "function"],
          ['$("#item3 li").filter(function(idx,el){return false})', "Return no elements"],
          ['function(){var arr=[];$("#item3 li").filter(function(i,el) {arr.push(i);return true});return arr}()', "First argument to callback is the index", "first_cb_arg"],
          ['function(){var arr=[];$("#item3 li").filter(function(i,el) {arr.push(el);return true});return arr}()', "Second argument to callback is the element", "second_cb_arg"],
          ['function(){var arr=[];$("#item3 li").filter(function(i,el) {arr.push(this);return true});return arr}()', "This is the element", "this"],
//          ['$("#item3 li").filter(function(idx,el){return (idx==0)})', "Test first argument (index)"],
//          ['$("#item3 li").filter(function(idx,el){return (el.id=="item3_1")})', "Test second argument (element)"],
//          ['$("#item3 li").filter(function(idx,el){return (this.id=="item3_1")})', "Test this"],
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
          ['$("ul#ul2").find("li")', "Standard"],
          ['$("ul#ul2,ul#ul3").find("li")', "Search several trees"],
          ['$("#ul0,#ul2").find("li")', "An element is matched in more than one of the searched trees. But only one match is returned - no duplicates!", "no_duplicates"],
//          ['$("ul").find("li")', " "],
          ['$("#item3").find("body li")', "selector begins with something outside of context. Zepto and Cash errorsly returns matches here (they have same issue in constructor. The issue is described more in detail there)", "scoped_search"],
          ['$("#item3").find("#item3")', ""],
//          ['$("ul#ul0").find("li")', " "],

          ['$("ul#ul2").find("li#item1")', "selector is not in the decendant tree"],
        ]
      },
      {
        name: '.find( selector [jQuery] )',
        tests: [
          ['$("ul").find($("li.odd"))', "selector is jQuery object", "selection"],
          ['$("ul#ul2,ul#ul3").find($("li"))', " "],
          ['$("ul#ul2").find($("li#item1"))', "selector is a jQuery object NOT in the decendant tree"],
        ]
      },
      {
        name: '.find( selector [Element] )',
        tests: [
          ['$("#ul2,#ul3").find(document.getElementById("item3_1"))', "", "element"],
          ['$("ul#ul2").find($("li#item1").get(0))', "selector is an Element NOT in the decendant tree"],
        ]
      },
      {
        name: '.find( selector [Elements] )',
        tests: [
          ['$("#ul3").find([document.getElementById("item3_1")])', ""],
          ['$("ul#ul2,ul#ul3").find($("li").get())', ""],
          ['$("#ul3").find({length:1, 0:document.getElementById("item3_1")})', "Array-like", "array_like"],
          ['$("#ul3").find(document.getElementsByTagName("li"))', "HTMLCollection"],
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
          ['$("ul li").first()', ".first() called on a selection of nodes"],
          ['$([3,4]).first()', "Plain array", "array"],
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
          ['$("<b class=\'a b c\\n\'>").hasClass("b")', "Newlines in HTML", "newline"],
          ['$("<b class=\'a b c\'>").hasClass("a c")', "Multiple class names specified. And no, you cannot do that"],
          ['$("<b class=\'a b c\'>").hasClass("a b")', "Multiple class names specified in same order as they appear in html. Oh, you can do that. But this must be a bug in jQuery"],

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
          ['$(tempEl).css("display", "table-cell").hide().show().css("display")', "Element made table-cell, hidden with hide(), and shown again", "store_original_display_value"],

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
          ['$("#ul3").html()', "Get innerHtml of single element"],
          ['$("li").html()', "Only get innerHtml of first match"],
          ['$("#testhtml form").html()', ""],
        ]
      },
      {
        name: '.html( htmlString )',
        tests: [
          ['$("<ul></ul><ul><b></b></ul>").html("<li>item</li>").html()', " "],
        ]
      },
      {
        name: '.html( function )',
        tests: [
          ['$("<div>old</div>").html(function(i,oldVal){return "oldval:"+oldVal+",index:"+i}).html()', "function"],
        ]
      },
      {
        name: 'Edge cases',
        tests: [
          ['$().html()', "empty selection", "empty_selection"],
        ]
      }
    ]
  },
  {
    name: '.insertAfter()',
    tests: [
      {
        name: '.insertAfter( [ Selector ] )',
        tests: [
          ['function(){$("body").append("<div id=hetu><b></b></div>");$("#item3_1").clone().insertAfter("#hetu b"); var res=$("#hetu").html(); $("#hetu").remove(); return res}()', ""],
          ['function(){$("body").append("<div id=hetu><one></one><two></two></div>");$("#item3_1").clone().insertAfter("#hetu *"); var res=$("#hetu").html(); $("#hetu").remove(); return res}()', "Multiple targets"],
          ['function(){$("body").append("<div id=hetu><b></b></div>");$("#item3 li").clone().insertAfter("#hetu b"); var res=$("#hetu").html(); $("#hetu").remove(); return res}()', "Multiple nodes"],
 //         ['$("<one>1</one><two>2</two>").insertBefore($("<a></a><b></b>"))', ""],
        ]
      },
      {
        name: '.insertAfter( [ htmlString ] )',
        tests: [
          ['$("<apple></apple>").insertAfter("<banana></banana>").parent()', "Does this signature even make sense? ", "html_string"],
          ['$("<apple></apple>").insertAfter("<banana></banana>")', "We can get the apple"],
          ['$("<apple></apple>").insertAfter("<banana></banana>").prev()', "- but where is the banana?"],
//          ['$("#item3_1").clone().insertAfter("<div></div>").parent()', ""],
          ['$("#item3_1").clone().insertAfter("<div></div>").parent()', ""],
        ]
      },
      {
        name: '.insertAfter( [ Element ] )',
        tests: [
          ['$("<apple></apple>").insertAfter($(tempEl).append("<b></b>").children()).parent()', ""],
          ['$("#item3 li").clone().insertAfter($(tempEl).append("<b></b>").children().get(0)).parent()', "Multiple"],
        ]
      },
      {
        name: '.insertAfter( [ Array of elements ] )',
        tests: [
          ['$("#item3 li").clone().insertAfter($(tempEl).append("<one></one><two></two>").children().get()).parent()', "Plain Array of elements", "array"],
          ['$("#item3 li").clone().insertAfter($(tempEl).append("<one></one><two></two>").children().get())', "Plain Array of elements", "array"],
//          ['$("#item3 li").clone().insertAfter($(tempEl).append("<one></one><two></two>").children().toArray()).parent()', "Array"],
          ['$("#item3 li").clone().insertAfter(makeNodeList()).parent()', "NodeList"],
          ['$("#item3 li").clone().insertAfter(makeHTMLCollection()).parent()', "HTMLCollection", "html_collection"],
//          ['console.log($(tempEl).append("<one></one><two></two>").get(0).getElementsByTagName("*"))', ""],
//          ['console.log(makeNodeList())', ""],

//          ['console.log($("<one></one><two></two>").get(0).constructor)', ""],
        ]
      },
      {
        name: '.insertAfter( [ jQuery ] )',
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
        name: '.insertBefore( [ Selector ] )',
        tests: [
          ['function(){$("body").append("<div id=hetu><b></b></div>");$("#item3_1").clone().insertBefore("#hetu b"); var res=$("#hetu").html(); $("#hetu").remove(); return res}()', ""],
          ['function(){$("body").append("<div id=hetu><one></one><two></two></div>");$("#item3_1").clone().insertBefore("#hetu *"); var res=$("#hetu").html(); $("#hetu").remove(); return res}()', "Multiple targets"],
          ['function(){$("body").append("<div id=hetu><b></b></div>");$("#item3 li").clone().insertBefore("#hetu b"); var res=$("#hetu").html(); $("#hetu").remove(); return res}()', "Multiple nodes"],
 //         ['$("<one>1</one><two>2</two>").insertBefore($("<a></a><b></b>"))', ""],
        ]
      },
      {
        name: '.insertBefore( [ htmlString ] )',
        tests: [
          ['$("<apple></apple>").insertBefore("<banana></banana>").parent()', "Does this signature even make sense? ", "html_string"],
          ['$("<apple></apple>").insertBefore("<banana></banana>")', "We can get the apple"],
          ['$("<apple></apple>").insertBefore("<banana></banana>").prev()', "- but where is the banana?"],
//          ['$("#item3_1").clone().insertBefore("<div></div>").parent()', ""],
          ['$("#item3_1").clone().insertBefore("<div></div>").parent()', ""],
        ]
      },
      {
        name: '.insertBefore( [ Element ] )',
        tests: [
          ['$("<apple></apple>").insertBefore($(tempEl).append("<b></b>").children()).parent()', ""],
          ['$("#item3 li").clone().insertBefore($(tempEl).append("<b></b>").children().get(0)).parent()', "Multiple"],
        ]
      },
      {
        name: '.insertBefore( [ Array of elements ] )',
        tests: [
          ['$("#item3 li").clone().insertBefore($(tempEl).append("<one></one><two></two>").children().get()).parent()', "Plain Array", "array"],
//          ['$("#item3 li").clone().insertBefore($(tempEl).append("<one></one><two></two>").children().toArray()).parent()', "Array"],
          ['$("#item3 li").clone().insertBefore(makeNodeList()).parent()', "NodeList"],
          ['$("#item3 li").clone().insertBefore(makeHTMLCollection()).parent()', "HTMLCollection", "html_collection"],
//          ['console.log($(tempEl).append("<one></one><two></two>").get(0).getElementsByTagName("*"))', ""],
//          ['console.log(makeNodeList())', ""],

//          ['console.log($("<one></one><two></two>").get(0).constructor)', ""],
        ]
      },
      {
        name: '.insertBefore( [ jQuery ] )',
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
          ['$([3,4]).last()', "Last array member", "array"],
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
          ['$("li").map(function(i) {return this})', "This points to the element"],
          ['$("li").map(function(i) {return i})', "First argument to callback is the index", "first_cb_arg"],
          ['$("li").map(function(i,elm) {return elm})', "Second argument to callback is the element", "second_cb_arg"],
          ['$([3,4]).map(function(i) {return i})', ""],
          ['$([3,4]).map(function(i,elm) {return elm})', "array"],
        ]
      },
      {
        name: 'Edge cases',
        tests: [
          ['$("li").map()', "No arguments"],
          ['$({a:"apple", b:"banana"}).map(function(i,elm) {return i + ":" + JSON.stringify(elm)})', "An object is treated like if it was the only element in an array"],
          ['$([{a:"apple", b:"banana"}]).map(function(i,elm) {return i + ":" + JSON.stringify(elm)})', "(proof of the statement above)"],
          ['$(14).map(function(i,elm) {return i + ":" + JSON.stringify(elm)})', "a number"],
        ]
      },
    ]
  },
  {
    name: '.next()',
    tests: [
      {
        name: '.next( )',
        tests: [
          ['$($("<div><one></one><two></two></div>").get(0).children[0]).next()', "Basic. One->Two"],
          ['$($("<div><one></one><two></two></div>").get(0).children[1]).next()', "Next on last child"],
          ['$($("<div><one></one><two></two></div>").get(0).children).next()', "Next on two siblings"],
          ['$($("<div><one></one><two></two></div>").get(0).children)', "Here is the explanation that the above doesnt work in Zepto 1.2.0: Its constructor does not support HTMLCollection"],
          ['$("<div><one></one><two></two></div>").children().next()', "Next on two siblings, take two"],
          ['$("<div><one></one><two></two><three></three></div>").children().next()', "Next on three siblings"],
          ['$("#item1,#item3_1").next()', "Next on two elements", "multiple_elements"],
          ['$("li:first-child")', ""],
          ['$("li:first-child").next()', ""],
          ['$("li:last-child").next()', ""],
          ['$("li").next().length', ""],
        ]
      },
      {
        name: '.next( selector )',
        tests: [
          ['$("li:first-child").next(".odd")', "", "filtering"],
          ['$("li:first-child").next(".even")', ""],
        ]
      }
    ]
  },
  {
    name: '.offset()',
    tests: [
      {
        name: '.offset( ) - attached nodes',
        tests: [
          ['$("#item2_1").offset()', "Get offset of an element", "get"],
          ['$("#item3_1,#item3_1").offset()', "Only get offset of first element in set"],
          ['$(tempEl).css({position:"absolute", top:"20px", left:"30px"}).offset()', "absolutely positioned element"],
          ['$(tempEl).css({position:"absolute", top:20, left:30}).offset()', "absolutely positioned element"],
          ['$(tempEl).css({position:"fixed", top:20, left:30}).offset()', "position:fixed"],
          ['$(tempEl).css({position:"relative", top:20, left:30}).offset()', "position:relative"],
          ['$(tempEl.ownerDocument.documentElement).offset()', "HTML"],
//          ['$("#testiframe").offset()', "iframe"],
//          ['$("<iframe></iframe>").appendTo(tempEl).get(0).contentWindow.document.body', "iframe"],
          ['$($("<iframe></iframe>").appendTo(tempEl).get(0).contentWindow.document.body).offset()', "iframe"],
          ['$("<div></div>").appendTo(tempEl).css("cssText", "color:black;margin:auto;position:relative;width:50px").offset()', "margin:auto"],
          ['$("#auto_margin").offset()', "margin:auto"],
          ['$("#nomargin").offset()', "no margin:auto"],

        ]
      },
      {
        name: '.offset( ) - unattached nodes',
        tests: [
          ['$("<div></div>").css({position:"absolute", top:"20px", left:"30px"}).offset()', "absolutely positioned element"],
        ]
      },
      {
        name: '.offset( coordinates )',
        tests: [
//          ['$(tempEl).css("top", "20").css("position", "absolute").css("top")', ""],
//          ['$(tempEl).offsetParent()', ""],
          ['$(tempEl).offset({top:20,left:30}).offset()', "position: static", "set"],
          ['$(tempEl).offset({top:20,left:30})', "position: static",],
//          ['$(tempEl).offset({top:20,left:30}).html()', "static positioned element", "set"],
          ['$(tempEl).css({position:"absolute", top:10, left:20}).offset({top:3,left:13}).offset()', "absolutely positioned element"],
          ['$(tempEl).css({position:"absolute", top:"auto", left:"auto"}).offset({top:20,left:15}).offset()', "position:absolute, top: auto"],
          ['$(tempEl).css({position:"absolute", top:"auto", left:"auto"}).offset({top:20,left:15}).offset()', "position:fixeded element"],
//          ['$(tempEl).offset({top:20,left:30}).css(\'position\')', "Set offset"],
        ]
      },
      {
        name: '.offset( function )',
        tests: [
          ['$(tempEl).offset(function(index,coords){return {top:20,left:15}}).offset()', "Set offset", "function"],
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
//          ['$("<div style=\'position:relative\'><p></p></div>").children().offsetParent()', " "],
          ['$(tempEl).html("<div style=\'position:relative\'><p><i></i></p></div>").find("i").offsetParent()', "Closest positioned element has position:relative"],
          ['$(tempEl).html("<div style=\'position:absolute\'><p><i></i></p></div>").find("i").offsetParent()', "Closest positioned element has position:absolute"],
          ['$(tempEl).html("<div style=\'position:fixed\'><p><i></i></p></div>").find("i").offsetParent()', "Closest positioned element has position:fixed"],
//          ['$(tempEl).html("<div style=\'position:static\'><p><i></i></p></div>").find("i").offsetParent()', "No parents are positioned (position:static is not positioned)"],
          ['$(tempEl).offsetParent()', "No parents are positioned", "no_parents_positioned"],
//          ['$(tempEl).html("<div style=\'position:static\'><p><i></i></p></div>").find("i").offsetParent().css("position")', "hm"],
          ['function() {$("body").css("position","absolute"); var res=$(tempEl).offsetParent(); $("body").css("position","static");return res}()', "Body is absolutely positioned"],
          ['$().offsetParent()', "No elements", "no_elements"],
          ['$("input").offsetParent()', "An element on this page..."],
          ['$("#item3_1, input").offsetParent()', "Two", "multiple_elements"],
          ['$("#hidden_li").offsetParent()', "Element is hidden", "hidden_element"],
//          ['$("h1").offsetParent()', " "],
// TODO: Read: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
          ['$("#valignmiddle").offsetParent()', "Skip table. jQuery skips tables (the DOM offsetParent does not, even though it has position:static)", "skiptable"],
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
//          ['function(){var $el = $("<div></div>"); $el.on("click", function(){alert()}); $el.remove(); }()', "View console..."],

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
        ]
      },
      {
        name: '.parent( selector )',
        tests: [
          ['$("li").parent(".level1")', "", "selector"],
        ]
      },
      {
        name: 'Edge cases',
        tests: [
          ['$("<div><b></b></div>").parent()', "parent of a jQuery( html ), which has not been appended to the document", "html_parent"],
          ['$(document).parent()', "document_parent"],
          ['$(document).parent().parent()', ""],
          ['$(1).parent()', ""],
          ['$([3,4]).parent()', ""],
        ]
      }
    ]
  },
  {
    name: '.position()',
    tests: [
      {
        name: '.position( ) - attached nodes',
        tests: [
          ['$("#item2_1").position()', "Get position of an element", "get"],
          ['$("#item3_1,#item3_1").position()', "Only get position of first element in set"],
          ['$(tempEl).position()', "position: static"],
          ['$(tempEl).css("margin-left", "20px").position()', "margin"],
//          ['$("<div><b></b></div>").appendTo(tempEl).css("cssText", "color:black;margin-left:20px;position:relative")', "Check to see if framework gets this right, which is needed for some of the following tests"],
          ['$("<div><b></b></div>").appendTo(tempEl).css("cssText", "color:black;margin-left:20px;position:relative").children().position()', "static within relative"],  // We added "color:black" as a dummy, because zepto ignores the first
//          ['$("<div><b></b></div>").appendTo(tempEl).css("cssText", "color:black;margin-left:20px;border-left:4px;position:relative")', "static within relative with border"],
          ['$("<div><b></b></div>").appendTo(tempEl).css("cssText", "color:black;margin-left:20px;border-left:4px;position:relative").children().position()', "static within relative with border", "border"],
          ['$(tempEl).css({position:"absolute", top:"20px", left:"30px"}).position()', "absolutely positioned element"],
          ['$(tempEl).css({position:"absolute", top:20, left:30}).position()', "absolutely positioned element"],
          ['$(tempEl).css({position:"fixed", top:20, left:30}).position()', "position:fixed", "fixed"],
          ['$(tempEl).css({position:"relative", top:20, left:30}).position()', "position:relative"],
          ['$("body").position()', "body"],
          ['$("html").position()', "html", "html"],
          ['$(tempEl).css({position:"absolute", top:"20.5px", left:"33.3px"}).position()', "decimal points", "decimal_points"],

//          ['$("<div><b></b></div>").appendTo(tempEl).css("cssText", "color:black;margin:auto;position:absolute;width:800px").children().css("cssText", "color:black;margin:auto;position:absolute;width:200px").position()', "margin:auto"],
          ['$("<div></div>").appendTo(tempEl).css("cssText", "color:black;margin:auto;position:relative;width:50px").position()', "margin:auto"],
//          ['$("<div></div>").appendTo(tempEl).css("cssText", "color:black;margin:auto;position:relative;width:50px")', "margin:auto"],

//          ['$("<div></div>").appendTo(tempEl).css("cssText", "color:black;margin:auto;position:relative;width:50px").position()', "margin:auto"],
//          ['$(tempEl).append("<div></div>").children().css("cssText", "color:black;margin:auto;position:relative;width:50px").position()', "margin:auto"],
          ['$("#auto_margin").position()', "margin:auto", "automargin"],
          ['$("#nomargin").position()', "no margin:auto"],


          ['$(tempEl).css("margin-left", "0px").css("margin-left")', ""],
          ['$(tempEl).css("margin-left", "auto").css("margin-left")', ""],
          ['parseFloat($(tempEl).css("margin-left", "auto").css("margin-left"))', ""],
        ]
      },
      {
        name: '.position( ) - unattached nodes',
        tests: [
          ['$("<div></div>").position()', ""],
          ['$("<div></div>").css({position:"absolute", top:20, left:30}).position()', "absolutely positioned element"],

        ]
      },
    ]
  },
  {
    name: '.position2()',
    tests: [
      {
        name: '.css( )',
        tests: [
          ['$("#auto_margin").css("margin-left")', "margin:auto", "automargin"],
          ['$("#auto_margin").css("marginLeft")', "margin:auto", "automargin2"],
          ['jQuery.support.reliableMarginLeft()', ""],
          ['$("#valignmiddle").position()', ""],


        ]
      },/*
      {
        name: '.position( )',
        tests: [
//          ['$("#item2_1").position()', "Get position of an element", "get"],

//          ['$("<div><b></b></div>").appendTo(tempEl).css("cssText", "color:black;margin:auto;position:absolute;width:800px").children().css("cssText", "color:black;margin:auto;position:absolute;width:200px").position()', "margin:auto"],
//          ['$("<div></div>").appendTo(tempEl).css("cssText", "color:black;margin:auto;position:relative;width:50px").position()', "margin:auto"],
//          ['$(tempEl).append("<div></div>").children().css("cssText", "color:black;margin:auto;position:relative;width:50px").position()', "margin:auto"],
          ['$("#auto_margin").position()', "margin:auto", "automargin"],
          ['$("#nomargin").position()', "no margin:auto"],

//          ['$("<div></div>").appendTo(tempEl).css("cssText", "color:black;margin:auto;position:relative;width:50px")', "margin:auto"],

        ]
      },
      {
        name: '.offset( )',
        tests: [
          ['$("#auto_margin").offset()', "margin:auto"],
          ['$("#nomargin").offset()', "no margin:auto"],
        ]
      },*/
    ]
  },
  {
    name: '.prepend()',
    tests: [
      {
        name: '.prepend( content )',
        tests: [
          ['$("<p></p>").prepend("<b></b>")', "[ htmlString ]"],
          ['$("<div><p></p></div>").prepend($("<b></b>"))', "[ jQuery ]"],
          ['$("<div><p></p></div>").prepend(makeElement("<b></b>"))', "[ Element ]"],
          ['$("<div></div>").prepend("text")', "[ String ]"],
          ['$("<div><p></p></div>").prepend(makeTextNode("text"))', "[ Text Node ]", "text_node"],
          ['$("<div><p></p></div>").prepend(makeTextNode("text"))', "[ Array of text nodes]"],
          ['$("<div><p></p></div>").prepend([makeTextNode("text"), makeElement("<i>italic</i>")])', "[ Array of text nodes / elements ]"],
          ['$("<div><p></p></div>").prepend([makeElement("<i>italic</i><b>bold</b>")])', "[ Array of elements ]"],
          ['$("<div><p></p><p></p></div>").children().prepend("hello").parent()', "prepend text multiple targets"],
//          ['$("<div><p></p><p></p></div>").children().prepend($(tempEl).text("node")).parent()', "prepend same node to multiple targets"],
//          ['function(){var $prependThis = $(tempEl).html("<b>prepended</b>"); var $prependToNodes = $("body").prepend("<div id=tempContainerABD><one></one><two></two></div>").children(); $prependToNodes.prepend($prependThis); var result = $("#tempContainerABD").html(); $("#tempContainerABD").remove(); return result }()', "prepend same node to multiple targets"],
          ['function(){var $prependThis = $(tempEl).html("<b class=banana>test</b>"); $("body").prepend("<div id=eCUbo><one></one><two></two></div>"); $("#eCUbo *").prepend($prependThis); var result = $("#eCUbo").clone(); $("#eCUbo").remove(); return result }()', "prepend same attached node to multiple targets"],

          ['function(){$("body").prepend("<div id=aBeN><banana></banana></div>"); $("body").prepend("<div id=eCUbola><one></one><two></two></div>"); $("#eCUbola *").prepend($("#aBeN")); var result = $("#eCUbola").clone(); $("#eCUbola").remove(); $("#aBeN").remove(); return result }()', "prepend same attached node to multiple targets"],

          ['function(){$("body").prepend("<div class=aBeN><banana></banana></div>"); $("body").prepend("<div id=eCUbola><one></one><two></two></div>"); $("#eCUbola *").prepend($(".aBeN")); var result = $(".aBeN").parent(); $("#eCUbola").remove(); $(".aBeN").remove(); return result }()', "Is prepended node detached from previous position in DOM?", "weird"],

//          ['function(){var $prependThis = $(tempEl).html("<b class=banana>test</b>"); $("body").prepend("<div id=eCUbo><one></one><two></two></div>"); $("#eCUbo *").prepend($prependThis); var result = $("#eCUbo").clone(); $("#eCUbo").remove(); return result }()', "Is prepended node removed from previous position?"],
//          ['$(tempEl)', "prepend same node to multiple targets"],
          ['$("<div><p></p></div>").prepend("<b></b>").prepend("<i></i>")', "Chaining"],


        ]
      },
      {
        name: '.prepend( content [,content] )',
        tests: [
          ['$("<p></p>").prepend("<one></one>", "<two></two>")', "","content_content"],

        ]
      },
      {
        name: '.prepend( function )',
        tests: [
//          ['function(){$("body").prepend("<p id=temp></p>");res=$("#temp").prepend(function(){return makeElement("<b></b>")}).html(); $("#temp").remove(); return res}()', ""],
          ['$(tempEl).prepend(function(){return makeElement("<b></b>")})', "", "function"],
          ['$(tempEl).prepend(function(idx,oldHtml){return makeElement("<b>" + idx + oldHtml + "</b>")})', ""],

//          ['function(){$("body").prepend("<p id=temp></p>");res=$("#temp").prepend(function(idx,html){return makeElement("<b>" + idx + html + "</b>")}).html(); $("#temp").remove(); return res}()', ""],
//          ['function(){$("body").prepend("<p id=temp></p>");res=$("#temp").prepend(function(){return "test"}).html(); $("#temp").remove(); return res}()', ""],
        ]
      },
      {
        name: 'Unspecified cases',
        tests: [
          ['$("<div><p></p></div>").prepend([$("<i>italic</i>")])', "[ Array of jQuery objects ]"],
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
          ['$("<p>hello</p>").prependTo($("<div></div>"))', ""],
          ['$("<one>1</one><two>2</two>").prependTo($("<div></div>"))', "prepend two elements"],
          ['$("<i>hello</i>").prependTo($("<a></a><b>b</b>"))', "prepend to multiple targets", "multiple_targets"],
          ['$("<p>hello</p>").prependTo($("<div></div>")).parent()', "Parent"],
          ['$("<i>hello</i>").prependTo($("<a></a><b>b</b>")).parent()', "Parent, when prepended to several targets. For some reason, Zepto 1.2.0 fails completely here..."],
//          ['$("<i>hello</i>").prependTo($("<a></a><b>b</b>")).length', ""],
//          ['$("<a></a><b>b</b>").parent()', ""],
          ['(function(){$("<i class=hello>hello</i>").prependTo($("#item3 li")); var clone=$("#item3").clone();$("#item3 .hello").remove(); return clone})()', "In the jQuery implementation, the actual operation is a side effect. This test inspects the side effect"],
 //         ['$("<one>1</one><two>2</two>").prependTo($("<a></a><b></b>"))', ""],
        ]
      },
    ]
  },
  {
    name: '.prev1()',
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
    name: '.prev()',
    tests: [
      {
        name: '.prev( )',
        tests: [
          ['$($("<div><one></one><two></two></div>").get(0).children[0]).prev()', "Basic. One->Two"],
          ['$($("<div><one></one><two></two></div>").get(0).children[1]).prev()', "prev on last child"],
          ['$($("<div><one></one><two></two></div>").get(0).children).prev()', "prev on two siblings"],
          ['$($("<div><one></one><two></two></div>").get(0).children)', "Here is the explanation that the above doesnt work in Zepto 1.2.0: Its constructor does not support HTMLCollection"],
          ['$("<div><one></one><two></two></div>").children().prev()', "prev on two siblings, take two"],
          ['$("<div><one></one><two></two><three></three></div>").children().prev()', "prev on three siblings"],
          ['$("#item2,#item3_2").prev()', "prev on two elements", "multiple_elements"],
          ['$("li:first-child")', ""],
          ['$("li:first-child").prev()', ""],
          ['$("li:last-child").prev()', ""],
          ['$("li").prev().length', ""],
        ]
      },
      {
        name: '.prev( selector )',
        tests: [
          ['$("li:last-child").prev(".odd")', "", "filtering"],
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
          ['$([]).pushStack([$("ul").find("li").get(0)], "find", "li").selector', "Looking at the code, it seems this signature is removed in jQuery 1.9.1. This line of code confirms that. What the signature did was it set the 'selector' property on the returned object. In jQuery 1.8.1, this line of code returns 'li', but on jQuery 1.9.1, it returns an empty string. "],
          ['$([]).pushStack([$("li").get(0)]).selector', ""],
//          ['$("ul").find("li").selector', "Zepto fails here"],
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
//          ['$("<div></div>", {"ready": function(){console.log("jQuery( html, attributes ) - ready")}})', "Event (check console)"],
          ['$("<div></div>").ready(function(){console.log("ready", arguments, framework[1])})', "Event (check console)", "arguments"],
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
          ['$("<div><b></b><i></i></div>").children("b").remove()', "Basic: Remove an element (returns the element)"],
          ['function() {$(tempEl).append("<p><b></b><i></i></p>").find("b").remove(); return $(tempEl)}()', "Basic: Remove an element (parent no longer contains it)"],
          ['function() {$(tempEl).append("<p><b></b><i></i></p>").children().children().remove(); return $(tempEl)}()', "Remove two elements"],
          ['function() {var $temp = $(tempEl); $temp.remove(); return $temp[0]}()', "References in [0], [1] etc are not removed. So the DOM nodes won't be freed until $temp is"],
          ['function() {var $temp = $(tempEl); $temp.remove(); return $temp.length}()', "- and length is not 0"],
          ['function() {var $temp = $(tempEl); $temp.remove(); return $temp.get()}()', "- and get() also returns them"],

        ]
      },
      {
        name: '.remove( selector )',
        tests: [
          ['function() {$(tempEl).append("<p><b></b><i></i></p>").children().children().remove("b"); return $(tempEl)}()', "Basic: Remove an element (parent no longer contains it)", "selector"],
          ['function() {$(tempEl).append("<p><b></b><i></i><strong></strong></p>").children().children().remove("b, strong"); return $(tempEl)}()', "Remove two elements"],
          ['function() {$(tempEl).append("<p><b></b><i></i></p>").children().children().remove("* > b"); return $(tempEl)}()', "Match a 'b' element against '* > b'. In jQuery, this yields a match", "selector_nested"],
          ['function() {$(tempEl).append("<p><b></b><i></i></p>").children().remove("* > b"); return $(tempEl)}()', "Try a selector that selects deep"],
        ]
      },
      {
        name: 'Edge cases',
        tests: [
          ['$("<div><b></b><i></i></div>").children("b").remove().parent()', "Get parent of removed item"],
          ['$("<div><b></b><i></i></div>").children().remove("b").parent()', "Get parent of removed item"],
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
          ['$("<div class=test></div>").removeAttr("class")', "Basic functionality: Remove an attribute"],
          ['$("<div class=\'test\' data-test=\'test\' id=test></div>").removeAttr("class id")', "Space seperated list of attributes", "space_separated"],
          ['$("<div></div>").removeAttr("id")', "Try to remove an attribute that is not present"],
          ['$("<div class=test></div><p class=test></p>").removeAttr("class")', "Remove an attribute on several nodes"],
        ]
      },
      {
        name: 'Edge cases',
        tests: [
          ['$("<div class=test></div>").removeAttr()', "No args", "no_args"],
          ['$("<div class=test></div>").removeAttr(null)', "Null", "null"],
          ['$("<div class=test></div>").removeAttr(undefined)', "Undefined", "undefined"],
          ['$("<div class=test></div>").removeAttr("")', "Empty string"],
          ['$().removeAttr("class")', ""],
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
          ['$("<div class=\'a a b\'/>").removeClass("a").get(0).className', "Remove a classname that is defined twice", "classname_defined_more_than_once"],
          ['$("<div class=\'a b c d e f g h i\'/>").removeClass("a c d f g i").get(0).className', "Remove a lot of class names"],
          ['$("<div class=\'a b a a e a a h a\'/>").removeClass("a c d f g i").get(0).className', "Remove a classname that is defined lots of times"],
          ['$("<div class=\'a\tb\tc\'/>").removeClass("b").get(0).className', "HTML contains tab char instead of space"],
          ['$("<div class=\'a\nb c\'/>").removeClass("b").get(0).className', "HTML contains newline"],
          ['$("<div class=\' a  b    c \'/>").removeClass("b").get(0).className', "Extra spaces in HTML", "extra_spaces_in_html"],
          ['$("<p class=\'a b\'></p><p class=\'a b\'></p>").removeClass("b")', "Multiple elements"],
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
          ['$("<p class=\'a b\'></p>").removeClass(function(index,currentClassName){return "b"})', "", "function"],
          ['function(){var arr=[];$("<p class=\'a b\'></p><p class=\'a b\'></p>").removeClass(function(index,currentClassName) {arr.push(index);return "b"});return arr}()', "First argument to callback is the index"],
          ['function(){var arr=[];$("<p class=\'a b\'></p><p class=\'a b\'></p>").removeClass(function(index,currentClassName) {arr.push(currentClassName);return "b"});return arr}()', "Second argument to callback is the current class name"],
          ['function(){var arr=[];$("<p class=\'a b\'></p><p class=\'a b\'></p>").removeClass(function(index,currentClassName) {arr.push(this);return "b"});return arr}()', "This points to the element", "this"],
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
          ['function(){$(tempEl).append("<div id=test2><h1>text</h1></div>").children().children().replaceWith("<h2>new heading</h2>");return $(tempEl)}()', "Basic functionality"],
          ['function(){$(tempEl).append("<h1>text</h1>").children().replaceWith("<h2>new heading</h2>");return $(tempEl)}()', "Basic functionality"],
          ['$("<div><h1>text</h1></div>").children().replaceWith("<h2>new heading</h2>")', "As of jQuery 1.9.1, .replaceWith always returns the original unmodified set"],
          ['$(tempEl).append("<div id=test2><h1>text</h1></div>").replaceWith("<h2>new heading</h2>")', ""],
          ['$(tempEl).append("<div id=test2><h1>text</h1></div>").replaceWith("<h2>new heading</h2>").parent()', ""],
          ['function(){$("body").append("<div id=test2><h1>text</h1></div>");$("#test2").children().replaceWith("<h2>new heading</h2>");return $("#test2").remove()}()', ""],
// ; 
        ]
      },
      {
        name: '.replaceWith( function )',
        tests: [
          ['function(){$(tempEl).append("<h1>text</h1>").children().replaceWith(function(){return "<h2>new heading</h2>"});return $(tempEl)}()', "Basic functionality", "function"],
//          ['function(){$(tempEl).append("<h1>text</h1>").children().replaceWith(function(index){return "<h2>new heading" + a.toString() + this.toString() + "</h2>"});return $(tempEl)}()', "Arguments"],
          ['function(){var arr=[];$(tempEl).append("<h1>text</h1><h1>more text</h1>").children().replaceWith(function(index,currentClassName) {arr.push(index);return "b"});return arr}()', "First argument to callback is the index"],
          ['function(){var arr=[];$(tempEl).append("<h1>text</h1><p><b>more text</b></p>").children().replaceWith(function(index,oldHtml) {arr.push(oldHtml);return "b"});return arr}()', "Second argument to callback is the old html"],
          ['function(){var arr=[];$(tempEl).append("<h1>text</h1><p><b>more text</b></p>").children().replaceWith(function(index,oldHtml) {arr.push(this);return "b"});return arr}()', "This points to the node about to be replaced"],

//          ['$("<div><h1>text</h1></div>").children().replaceWith(function() {return "<h2>new heading</h2>"})', ""],
//          ['$("<div><h1>text</h1></div>").children().replaceWith(function() {return $("<h2>new heading</h2>")})', ""],
//          ['$(tempEl).append("<div><h1>text</h1></div>").children().replaceWith(function() {return "<h2>new heading</h2>"})', ""],
        ]
      },
    ]
  },
  {
    name: '.show()',
    tests: [
      {
        name: '.show(  ) - attached',
        tests: [
          ['$(tempEl).append("<p class=\'display-none\'></p>").children().show()', "Attached block element, hidden with css (class), then shown"],
          ['$(tempEl).append("<p style=\'display:none\'></p>").children().show()', "Attached block element, hidden with css (style attr), then shown"],
          ['$("<p style=\'display:none\'></p>").appendTo("body").show()', "block element, hidden with css (inline style), attached to document and then shown"],
          ['$("<p style=\'display:none\'></p>").appendTo("body").hide().show()', "Hide it again!"],
        ]
      },
      {
        name: '.show(  ) - attached - hide() followed by show()',
        tests: [
          ['$(tempEl).append("<i></i>").children().hide().show()', ""],
          ['$(tempEl).append("<i class=\'tablecell\'></i>").children().hide().show()', ""],
          ['$(tempEl).append("<i style=\'display:table-cell\'></i>").children().hide().show()', ""],
          ['$(tempEl).append("<i></i>").children().css("display", "table-cell").hide().show()', ""],
          ['$(tempEl).append("<i></i>").children().css("display", "table-cell").hide().hide().show()', "Double-hide"],

//          ['function () {var $el = $("<i class=\'tablecell\'></i>").appendTo("body"); $el.hide(); $el.show(); var res = $el.css("display"); $el.remove(); return res}()', ""],
//          ['function () {var $el = $("<tablecell></tablecell>").appendTo("body"); $el.hide(); $el.show(); var res = $el.css("display"); $el.remove(); return res}()', "Once the node has been added to the document, jQuery and picoQuery agrees again"],
//          ['function () {var $el = $("<i class=\'tablecell\'></i>").appendTo("body"); $el.hide(); $el.show(); var res = $el.css("display"); $el.remove(); return res}()', "- as above"],

        ]
      },
      {
        name: '.show(  ) - unattached',
        tests: [

          ['$("<p style=\'display:none\'></p>").show()', "hidden with inline style, then shown"],
          ['$("<p class=\'display-none\'></p>").show()', "hidden with stylesheet, then shown", "unattached1"],

          ['$("<p style=\'display:none\'></p>").appendTo("body").show()', "block element, hidden with css (inline style), attached to document and then shown"],

          ['$("<i style=\'display:none\'></i>").show()', "Inline element, hidden with css"],
          ['$("<i></i>").css("display", "none").show()', "Inline element, hidden by setting css display to none"],

          ['$("<i class=\'tablecell\'></i>").css("display")', "An element does not get its styles from class with jQuery, until its appended to the document. My guess is that its due to that jQuery creates a DocumentFragment. picoQuery on the other hand create a real element right away."],
          ['$("<i></i>").css("display", "").show()', "Edge case. jQuery treats empty display as hidden - even though its not", "empty_display_hidden"],
          ['$("<i style=\'display:\'></i>").show()', "Edge case. jQuery treats empty display as hidden - even though its not"],
          ['$("<p></p>").show()', "Edge case: Even though an element is already visible, css will be altered on an unattached jQuery object", "alter_css_on_already_visible_unattached"],
          ['$("<i></i>").appendTo("body").show()', "Edge case: On an attached jQuery object, css will not be altered when element is already visible"],
          ['$("<p style=\'display:none\'></p>").hide().show()', "double-hide"],

        ]
      },
      {
        name: '.show(  ) - unattached - hide() followed by show()',
        tests: [
          ['$("<i></i>").hide().show()', "Inline element, hidden by hide(), and shown again"],
          ['$("<i style=\'display:block\'></i>").hide().show()', "Inline element by default, but made block element with css, then hidden with hide(), and shown again", "restore_display"],
          ['$("<i></i>").css("display", "table-cell").hide().show()', "Element made table-cell, hidden with hide(), and shown again"],
          ['$("<i class=\'tablecell\'></i>").hide().show()', "Same issue as above", "unattached2"],
          ['$("<tablecell></tablecell>").hide().show()', ""],
          ['$("<p class=\'display-none\'></p>").toggle()', ""],
          ['$("<p class=\'display-none\'></p>").show()', ""],

        ]
      },
      {
        name: '.show(  ) - unattached - hide() - attached - show()',
        tests: [
          ['$(tempEl.appendChild($("<i></i>").hide().get(0))).show()', "Inline element"],
          ['$(tempEl.appendChild($("<i style=\'display:block\'></i>").hide().get(0))).show()', "style=display:block"],
          ['$(tempEl.appendChild($("<i></i>").css("display", "table-cell").hide().get(0))).show()', "css()"],
          ['$(tempEl.appendChild($("<i class=\'tablecell\'></i>").hide().get(0))).show()', "class"],
          ['$("<i style=\'display:block\'></i>").hide().appendTo(tempEl).show()', "Internal data regarding old display value survives append", "data_survives"],
        ]
      },
      {
        name: '.show(  ) - unattached - hide() - attached - show()',
        tests: [
          // We have problems here...
          // - but the problem is that data does not survive an appendTo. Maybe due to not being copied during cloning?

/*          ['$("<i style=\'display:block\'></i>").hide().get(0).__picoquerydata', ""],
//          ['$("<i style=\'display:block\'></i>").hide().appendTo(tempEl).get(0).__picoquerydata', ""],
//          ['tempEl.appendChild($("<i style=\'display:block\'></i>").hide().get(0)).__picoquerydata', ""],
          ['$(tempEl.appendChild($("<i style=\'display:block\'></i>").hide().get(0))).get(0).__picoquerydata', ""],
          ['$(tempEl.appendChild($("<i style=\'display:block\'></i>").hide().get(0))).show()', ""],


          ['$("<i></i>").hide().appendTo(tempEl).show()', "Inline element, hidden by hide(), and shown again"],
          ['$("<i style=\'display:block\'></i>").hide().appendTo(tempEl).show()', "Inline element by default, but made block element with css, then hidden with hide(), and shown again", "restore_display"],
          ['$("<i></i>").css("display", "table-cell").hide().appendTo(tempEl).show()', "Element made table-cell, hidden with hide(), and shown again"],
          ['$("<i class=\'tablecell\'></i>").hide().appendTo(tempEl).show()', "Same issue as above", "unattached2"],
          ['$("<tablecell></tablecell>").hide().appendTo(tempEl).show()', ""],


//          ['tempEl.appendChild($("<i style=\'display:block\'></i>").hide().get(0))', ""],
//          ['$(tempEl.appendChild($("<i style=\'display:block\'></i>").hide().get(0))).show()', ""],
*/
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
          ['$().text()', "Empty", "jquery_empty"],
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
          ['$("<div></div><li></li>").text("test")', "Multiple items", "multiple"],
        ]
      },
      {
        name: '.text( function )',
        tests: [
          ['$("<one>One</one><two><i>Two</i></two>").text(function(idx,oldVal){return oldVal + idx})', "First argument is index, second is old text value", "function"],
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
          ['$("<p style=\'display:none\'></p>").toggle()', "Unattached block element, hidden with inline style, then toggled"],
          ['$("<p class=\'display-none\'></p>").toggle()', "Unattached block element, hidden with css (class), then toggled", "unattached1"],
          ['$(tempEl).append("<p class=\'display-none\'></p>").children().toggle()', "Attached block element, hidden with css (class), then toggled"],

          ['$("<i style=\'display:none\'></i>").toggle()', "Inline element, hidden with css"],
          ['$("<i></i>").css("display", "none").toggle()', "Inline element, hidden by setting css display to none"],
          ['$("<i></i>").hide().toggle()', "Inline element, hidden by hide(), and toggled again"],
          ['$("<i style=\'display:block\'></i>").hide().toggle()', "Inline element by default, but made block element with css, then hidden with hide(), and toggled again", "restore_display"],
          ['$("<p style=\'display:none\'></p>").appendTo("body").toggle()', "Unattached block element, hidden with inline css and then toggled"],
          ['$("<i></i>").toggle()', "Seems jQuery has a bug here!", "bug"],
          ['$("<i></i>").toggle().toggle()', "jQuery behaves really strange here..."],
          ['$("<i></i>").toggle().toggle().toggle()', "keep on toggling, I wont care!"],
          ['$("<i></i>").appendTo("body").toggle()', "Ok, I see, the strange behaviour above is because element isnt added yet. But .hide() *does* work in jQuery, before element is added"],
          ['$("<i></i>").toggle().appendTo("body")', "So, does jQuery 'remember'? - no, toggles are lost"],
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
          ['$("<p style=\'display:none\'></p>").appendTo("body").show()', ".toggle(false) is the same as .show()"],
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
      {
        name: '.toggle(  ) - attached',
        tests: [
          ['$(tempEl).append("<p class=\'display-none\'></p>").children().toggle()', "Attached block element, hidden with css (class), then toggled"],
          ['$(tempEl).append("<p style=\'display:none\'></p>").children().toggle()', "Attached block element, hidden with css (style attr), then toggled"],
          ['$("<p style=\'display:none\'></p>").appendTo("body").toggle()', "block element, hidden with css (inline style), attached to document and then toggled"],
          ['$("<p style=\'display:none\'></p>").appendTo("body").toggle().toggle()', "Hide it again!"],
        ]
      },
      {
        name: '.toggle(  ) - attached - toggle() followed by toggle()',
        tests: [
          ['$(tempEl).append("<i></i>").children().toggle().toggle()', ""],
          ['$(tempEl).append("<i class=\'tablecell\'></i>").children().toggle().toggle()', ""],
          ['$(tempEl).append("<i style=\'display:table-cell\'></i>").children().toggle().toggle()', ""],
          ['$(tempEl).append("<i></i>").children().css("display", "table-cell").toggle().toggle()', ""],
          ['$(tempEl).append("<i></i>").children().css("display", "table-cell").toggle().toggle().toggle()', "Double-hide"],

//          ['function () {var $el = $("<i class=\'tablecell\'></i>").appendTo("body"); $el.toggle(); $el.toggle(); var res = $el.css("display"); $el.remove(); return res}()', ""],
//          ['function () {var $el = $("<tablecell></tablecell>").appendTo("body"); $el.toggle(); $el.toggle(); var res = $el.css("display"); $el.remove(); return res}()', "Once the node has been added to the document, jQuery and picoQuery agrees again"],
//          ['function () {var $el = $("<i class=\'tablecell\'></i>").appendTo("body"); $el.toggle(); $el.toggle(); var res = $el.css("display"); $el.remove(); return res}()', "- as above"],

        ]
      },
      {
        name: '.toggle(  ) - unattached',
        tests: [

          ['$("<p style=\'display:none\'></p>").toggle()', "hidden with inline style, then toggled"],
          ['$("<p class=\'display-none\'></p>").toggle()', "hidden with stylesheet, then toggled", "unattached1"],

          ['$("<p style=\'display:none\'></p>").appendTo("body").toggle()', "block element, hidden with css (inline style), attached to document and then toggled"],

          ['$("<i style=\'display:none\'></i>").toggle()', "Inline element, hidden with css"],
          ['$("<i></i>").css("display", "none").toggle()', "Inline element, hidden by setting css display to none"],

          ['$("<i class=\'tablecell\'></i>").css("display")', "An element does not get its styles from class with jQuery, until its appended to the document. My guess is that its due to that jQuery creates a DocumentFragment. picoQuery on the other hand create a real element right away."],
          ['$("<i></i>").css("display", "").toggle()', "Edge case. jQuery treats empty display as hidden - even though its not", "empty_display_hidden"],
          ['$("<i style=\'display:\'></i>").toggle()', "Edge case. jQuery treats empty display as hidden - even though its not"],
          ['$("<p></p>").toggle()', "Edge case: Even though an element is already visible, css will be altered on an unattached jQuery object", "alter_css_on_already_visible_unattached"],
          ['$("<i></i>").appendTo("body").toggle()', "Edge case: On an attached jQuery object, css will not be altered when element is already visible"],
          ['$("<p style=\'display:none\'></p>").toggle().toggle()', "double-hide"],

        ]
      },
      {
        name: '.toggle(  ) - unattached - toggle() followed by toggle()',
        tests: [
          ['$("<i></i>").toggle().toggle()', "Inline element, hidden by toggle(), and toggled again"],
          ['$("<i style=\'display:block\'></i>").toggle().toggle()', "Inline element by default, but made block element with css, then hidden with toggle(), and toggled again", "restore_display"],
          ['$("<i></i>").css("display", "table-cell").toggle().toggle()', "Element made table-cell, hidden with toggle(), and toggled again"],
          ['$("<i class=\'tablecell\'></i>").toggle().toggle()', "Same issue as above", "unattached2"],
          ['$("<tablecell></tablecell>").toggle().toggle()', ""],
          ['$("<p class=\'display-none\'></p>").toggle()', ""],
          ['$("<p class=\'display-none\'></p>").toggle()', ""],

        ]
      },
      {
        name: '.toggle(  ) - unattached - toggle() - attached - toggle()',
        tests: [
          ['$(tempEl.appendChild($("<i></i>").toggle().get(0))).toggle()', "Inline element"],
          ['$(tempEl.appendChild($("<i style=\'display:block\'></i>").toggle().get(0))).toggle()', "style=display:block"],
          ['$(tempEl.appendChild($("<i></i>").css("display", "table-cell").toggle().get(0))).toggle()', "css()"],
          ['$(tempEl.appendChild($("<i class=\'tablecell\'></i>").toggle().get(0))).toggle()', "class"],
          ['$("<i style=\'display:block\'></i>").toggle().appendTo(tempEl).toggle()', "Internal data regarding old display value survives append", "data_survives"],
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

