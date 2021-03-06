# Compliance Chart

*Note: I have only examined the compliance of the methods supported by picoQuery. This has has the effect that the summary is biased in favor of picoquery. However, it does show that the methods which are supported by picoQuery are significantly more compliant than the respective methods in Zepto and Cash*<br><br>

Compliance summary:<br>

<table class="summary">
  <tr>
    <td>picoQuery 0.5.0</td>
  </tr>
  <tr>
    <td>Zepto 1.2.0</td>
  </tr>
  <tr>
    <td>Cash 1.3.0</td>
  </tr>
</table>

<table class="color-legend">
  <tr>
    <td>
      <table><tr><td class="full">&nbsp;</td><td>= Full compliance</td></tr></table>
      <table><tr><td class="approximate">&nbsp;</td><td>= Almost full compliance</td></tr></table>
    </td>
    <td>
      <table><tr><td class="partial">&nbsp;</td><td>= Partial compliance</td></tr></table>
      <table><tr><td class="none">&nbsp;</td><td>= Not supported</td></tr></table>
    </td>
  </tr>
</table>

<br style="clear:both">
<table class="chart">
<colgroup>
  <col width="19%">
  <col width="27%">
  <col width="27%">
  <col width="27%">
</colgroup>

<tbody>
  <tr>
    <th></th>
    <th>picoQuery 0.5.0</th>
    <th>Zepto 1.2.0</th>
    <th>Cash 1.3.0</th>
  </tr>
  <tr>
    <td>constructor</td>
    <td class="partial">
      <issues>
        <issue severity="highest" proof="jquery_selectors">Special jQuery selectors such as :odd are not supported</issue>
        <issue severity="low" proof="wrong_order">jQuery( selector, context [ Array of elements ] ) does not get the order right.</issue>
        <issue severity="edgecase" proof="edgecase1,edgecase3,ending_text_dismissed">Does not strictly comply in a few edge cases</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="highest" proof="jquery_selectors">Special jQuery selectors such as :odd are not supported</issue>
        <issue severity="highest" proof="scoped_search">jQuery( selector, context [ Element ] ) is buggy: It finds elements that are parent to the selection. Ie $​("body li", document.&#8203;getElementById&#8203;("item3")) returns unexpected matches. The bug is because with the querySelector method, <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector">the entire hierarchy counts</a>. To fix this shortcoming, the library has to do something similar to <a href="https://github.com/lazd/scopedQuerySelectorShim">this shim</a></issue>
        <!--<issue severity="" proof="">jQuery( selector, context [ Element ] ) does not fully comply, when Element is a NodeList</issue>-->
        <issue severity="high" proof="match_in_several_contexts">jQuery( selector, context [ jQuery ] ) does not remove duplicates, when there is a match in several contexts</issue>
        <issue severity="high" proof="html_collection,array_like,nodelist">Array-like structures are not supported, ie jQuery( [HTMLCollection] ) and jQuery( [NodeList] )</issue>
        <issue severity="high" proof="owner_document">jQuery( html, ownerDocument) is not supported - behaves as jQuery( html )</issue>
        <issue severity="normal" proof="jq1_8methods_as_attributes">jQuery( html, attributes) does not support all instance methods. Actually zepto complies with jQuery 1.4-1.7, where only the following instance methods were supported: ('val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset' and events). In jQuery 1.8, all instance methods are supported</issue>
        <issue severity="low" proof="wrong_order">jQuery( selector, context [ Array of elements ] ) does not get the order right.</issue>
        <issue severity="edgecase" proof="edgecase1,edgecase2,edgecase3,edgecase4,edgecase5,edgecase6,edgecase7,edgecase8,attributes_non_empty,ending_text_dismissed">Does not strictly comply in some edge cases</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="highest" proof="jquery_selectors">Special jQuery selectors such as :odd are not supported</issue>
        <issue severity="highest" proof="scoped_search">jQuery( selector, context [ Element ] ) is buggy: It finds elements that are parent to the selection. Ie $​("body li", document.&#8203;getElementById&#8203;("item3")) returns unexpected matches. The bug is because with the querySelector method, <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector">the entire hierarchy counts</a>. To fix this shortcoming, the library has to do something similar to <a href="https://github.com/lazd/scopedQuerySelectorShim">this shim</a></issue>
        <issue severity="high" proof="no_match_in_context">jQuery( selector, context [ jQuery ] ) is not supported. Doing gives various results.</issue>
        <issue severity="high" proof="owner_document">jQuery( html, ownerDocument) is not supported - behaves as jQuery( html )</issue>
        <issue severity="normal" proof="no_match_in_context">jQuery( callback ) is buggy: Callback does not receive a reference to $ which can be used to write failsafe jQuery code</issue>
        <issue severity="low" proof="selector_matches_context_root">jQuery( selector, context [ Element ] ) returns matches root element of context, though it should not. Ie $​("#item3", document.&#8203;getElementById&#8203;("item3"​)​) returns a match</issue>
        <issue severity="low" proof="invalid_html,invalid_html2">jQuery( html ) does not handle self-containing container-tags in HTML5, such as &lt;div/&gt;. These are actually invalid in HTML5, but jQuery uses them in several examples</issue>
        <issue severity="low" proof="no_parent">The elements have a parent, in jQuery they dont.</issue>
        <issue severity="edgecase" proof="edgecase1,context_is_array,edgecase7,ending_text_dismissed">Does not strictly comply in a few edge cases</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.add()</td>
    <td class="approximate">
      <issues>
        <issue severity="low" proof="document_order">jQuery sorts in Document order. picoQuery does not sort</issue>
      </issues>
    </td>
    <td class="approximate">
      <issues>
        <issue severity="low" proof="document_order">jQuery sorts in Document order. Zepto 1.2.0 does not sort</issue>
      </issues>
    </td>
    <td class="approximate">
      <issues>
        <issue severity="low" proof="document_order">jQuery sorts in Document order. Cash 1.3.0 does not sort</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.addBack()</td>
    <td class="approximate">
      <issues>
        <issue severity="low" proof="document_order">jQuery sorts in Document order. picoQuery does not sort</issue>
      </issues>
    </td>
    <td class="none"></td>
    <td class="none"></td>
  </tr>
  <tr>
    <td>.addClass()</td>
    <td class="approximate">
      <issues>
        <issue severity="edgecase" proof="empty_string,space,tab,noargs">Does not comply in some edge cases</issue>
      </issues>
    </td>
    <td class="approximate">
      <issues>
        <issue severity="edgecase" proof="tab_between_classnames,newline_between_classnames,trailing_space,same_class_twice,space,tab">Does not comply in some edge cases</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="function">.addClass( function ) signature is unsupported</issue>
        <issue severity="edgecase" proof="tab_between_classnames,newline_between_classnames">Does not comply in some edge cases</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.after()</td>
    <td class="full"></td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="function">.after( function ) signature is unsupported</issue>
        <issue severity="normal" proof="function_html">.after( function-html ) signature is unsupported</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="high" proof="text">.after( [Text] ) signature is unsupported. Ie you cannot do: $(el).after("some text")</issue>
        <issue severity="normal" proof="content_content">.after( content [,content] ) only supports one piece of content</issue>
        <issue severity="normal" proof="function">.after( function ) signature is unsupported</issue>
        <issue severity="normal" proof="function_html">.after( function-html ) signature is unsupported</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.andSelf()</td>
    <td class="approximate">
      <issues>
        <issue severity="low" proof="document_order">jQuery sorts in Document order. picoQuery does not sort</issue>
      </issues>
    </td>
    <td class="none"></td>
    <td class="none"></td>
  </tr>
  <tr>
    <td>.append()</td>
    <td class="approximate">
      <issues>
        <issue severity="normal" proof="">When a node is appended to multiple targets, the node is cloned behind the scenes. As the .clone() method doesnt support copying data and event listeners yet, these clones will erroursly not get these</issue>
      </issues>
    </td>
    </td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="function">.append( function ) signature is unsupported</issue>
        <issue severity="edgecase" proof="weird">weird result in the test "Is appended node detached from previous position in DOM?"</issue>
        <issue severity="normal" proof="">When a node is appended to multiple targets, the node is cloned behind the scenes. As the .clone() method doesnt support copying data and event listeners, these clones will erroursly not get these</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="content_content">.append( content [,content] ) only supports one piece of content</issue>
        <issue severity="normal" proof="function">.append( function ) signature is unsupported</issue>
        <issue severity="normal" proof="">When a node is appended to multiple targets, the node is cloned behind the scenes. As the .clone() method doesnt support copying data and event listeners, these clones will erroursly not get these</issue>
        <issue severity="low" proof="text_node">.append( [ Text Node ] ) signature is unsupported (and array of text nodes)</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.appendTo()</td>
    <td class="full"></td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="multiple_targets">Does not support appending to multiple targets</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="multiple_targets">Does not support appending to multiple targets</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.attr()</td>
    <td class="partial">
      <issues>
        <issue severity="low" proof="">Does not implement any attrHooks</issue>
        <issue severity="low" proof="">Most notably attrHook is the one dealing with a problem in IE<=11+, which is that an input loses its value after becoming a radio</issue>
        <issue severity="edgecase" proof="undefined,string_class1">Does not comply in some edge cases</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="low" proof="">Does not implement attrHooks</issue>
        <issue severity="low" proof="">Most notably attrHook is the one dealing with a problem in IE<=11+, which is that an input loses its value after becoming a radio</issue>
        <issue severity="edgecase" proof="function_arg2_noclass,string_class1">Does not comply in an edge case</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="function">.attr( attributeName, function ) signature is unsupported</issue>
        <issue severity="normal" proof="null_removes">Does not support removing attributes with null</issue>
        <issue severity="low" proof="">Does not implement attrHooks</issue>
        <issue severity="low" proof="">Most notably attrHook is the one dealing with a problem in IE<=11+, which is that an input loses its value after becoming a radio</issue>
        <issue severity="edgecase" proof="null,undefined,string_class,string_class1">Does not comply in some edge cases</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.before()</td>
    <td class="full"></td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="function">.before( function ) signature is unsupported</issue>
        <issue severity="normal" proof="function_html">.before( function-html ) signature is unsupported</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="high" proof="text">.before( [Text] ) signature is unsupported. Ie you cannot do: $(el).before("some text")</issue>
        <issue severity="normal" proof="content_content">.before( content [,content] ) only supports one piece of content</issue>
        <issue severity="normal" proof="function">.before( function ) signature is unsupported</issue>
        <issue severity="normal" proof="function_html">.before( function-html ) signature is unsupported</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.children()</td>
    <td class="full"></td>
    <td class="full"></td>
    <td class="full"></td>
  </tr>
  <tr>
    <td>.click()</td>
    <td>See .on() and .trigger()</td>
    <td>See .on() and .trigger()</td>
    <td>See .on() and .trigger()</td>
  </tr>
  <tr>
    <td>.clone()</td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="">Does not copy data and events</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="">Does not copy data and events</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="">Does not copy data and events</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.closest()</td>
    <td class="full"></td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="context">.closest( selector, context ) is non-compliant or buggy. Its probably the non-compliance in the constructor that comes into play</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="context">.closest( selector, context ) is non-compliant or buggy. Its probably the non-compliance in the constructor that comes into play</issue>
        <issue severity="normal" proof="selection">.closest( selection ) is unsupported</issue>
        <issue severity="normal" proof="element">.closest( element ) is unsupported</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.css()</td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="">jQuery has quite a few "cssHooks" which handles certain css properties in specific ways. These are not supported (the hook that handles marginLeft is supported, though)</issue>
        <issue severity="low" proof="vendor_prefix">Automatic using vendor prefixed version when available is not supported.</issue>
        <issue severity="low" proof="auto">When height or width is set to auto, picoQuery returns "0px", but should return the correctly calculated number of pixels</issue>
        <issue severity="edgecase" proof="nonexisting_property,adjust_css">Does not comply in a few edge cases</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="high" proof="camelcase">Does not support getting property in camelCased form, unless it has been set with .css( property, value ) or inline style</issue>
        <issue severity="normal" proof="">jQuery has quite a few "cssHooks" which handles certain css properties in specific ways. These are not supported.</issue>
        <issue severity="normal" proof="unitless_string">Setting a property to a unitless string generally has no effect in jQuery. But Zepto sets the property to empty string</issue>
        <issue severity="normal" proof="px1">Does not support omitting "px" for widths etc. Ie. .css("width", "123") (but does support it, when type is number, ie .css("width", 123))</issue>
        <issue severity="normal" proof="function">.css( propertyName, function ) is not supported</issue>
        <issue severity="low" proof="css_text">cssText is buggy - first property is ignored when trying to set cssText</issue>
        <issue severity="low" proof="important">Fails complying when a external style overrides style attribute with !important</issue>
        <issue severity="low" proof="width_height_exception">Sets width and height wrong, when given as a unitless string (as an exception to the general rule of ignoring unitless strings, jQuery allows to set width and height with unitless strings)</issue>
        <issue severity="low" proof="vendor_prefix">Automatic using vendor prefixed version when available is not supported.</issue>
        <issue severity="low" proof="automargin,auto">When height, margin-left etc is set to "auto", Zepto returns "auto", but should return calculated pixels value. This error causes position() not to work on auto either (because it relies on css('margin-left') and css('margin-top') to return pixel values)</issue>
        <issue severity="edgecase" proof="nonexisting_property,user_select,adjust_css,width_in_em">Does not comply in a few edge cases</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="high" proof="dashes">Does not support getting or setting property in dasherized form. Only supports camelCased form. Ie $​("li​​)​.css​("font-style"​) does not work</issue>
        <issue severity="normal" proof="">jQuery has quite a few "cssHooks" which handles certain css properties in specific ways. These are not supported.</issue>
        <issue severity="normal" proof="add_px">Does not support setting a numeral property like this: .css​("fontSize", 10​)</issue>

        <issue severity="normal" proof="properties">.css( properties) signature is not supported. That is: does not support getting several properties in one call</issue>
        <issue severity="normal" proof="function">.css( propertyName, function ) is not supported</issue>
        <issue severity="normal" proof="property_names">.css( propertyNames [Array] ) signature is not supported.</issue>
        <issue severity="low" proof="width_height_exception">Sets width and height wrong, when given as a unitless string (as an exception to the general rule of ignoring unitless strings, jQuery allows to set width and height with unitless strings)</issue>
        <issue severity="low" proof="vendor_prefix">Automatic using vendor prefixed version when available is not supported.</issue>
        <issue severity="low" proof="auto">When height is "auto", .css( "height" ) must return the height in pixels, not "auto"</issue>
        <issue severity="low" proof="automargin">When margin-left is set to auto, Cash returns "0px" in some browsers (ie FF), but should return the number of pixels it is indented</issue>
        <issue severity="edgecase" proof="user_select,adjust_css">Does not comply in a few edge cases</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.data()</td>
    <td class="full"></td>
    <td class="partial">
      <issues>
        <issue severity="high" proof="key_value">.data( key, value ) is not implemented. </issue>
        <issue severity="high" proof="obj">.data( object ) is not implemented either. So you can not set data, only read those set in "data-xxx" attributes</issue>
        <issue severity="normal" proof="noargs">.data( ) is not implemented</issue>
        <issue severity="normal" proof="data_attr_not_affected">Setting data changes the "data-xxx" attribute of the node. It should not</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="high" proof="">Memory-leaking. Data is not deleted from nodes when .empty(), .remove(), .html() and .replaceWith() methods are called.</issue>
        <issue severity="normal" proof="obj_has_data_attr">.data( obj ) has no effect, when the element has data-attributes</issue>
        <issue severity="normal" proof="noargs">.data( ) is not implemented</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.detach()</td>
    <td class="partial">
      <issues>
        <issue severity="low" proof="selector_nested">.detach( selector ) does not support nested selectors. For example "* > b" does not match when performed on a "b" element</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="selector">.detach( selector ) signature is not supported (all elements are detachd)</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="selector">.detach( selector ) signature is not supported (all elements are detachd)</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.each()</td>
    <td class="full"></td>
    <td class="full"></td>
    <td class="partial">
      <issues>
        <issue severity="high" proof="first_cb_arg,second_cb_arg">Callback receives the two arguments in wrong order</issue>
        <issue severity="low" proof="iterate_plain_array">Does not support iterating normal arrays</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.empty()</td>
    <td class="full"></td>
    <td class="full"></td>
    <td class="partial">
      <issues>
        <issue severity="low" proof="">Event listeners on the old HTML are not removed. It is concidered best practise to remove event listeners, but according to <a href="https://auth0.com/blog/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/">this article</a>, it is not strictly required for modern browsers:</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.end()</td>
    <td class="approximate">
      <issues>
        <issue severity="low" proof="document_added_to_pushstack">$( selector ) does not add the document to the pushstack</issue>
      </issues>
    </td>
    <td class="none"></td>
    <td class="none"></td>
  </tr>
  <tr>
    <td>.eq()</td>
    <td class="full"></td>
    <td class="full"></td>
    <td class="full"></td>
  </tr>
  <tr>
    <td>.filter()</td>
    <td class="full"></td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="element">.filter( element ) signature is not supported</issue>
        <issue severity="normal" proof="array">.filter( elements [Array] ) signature is not supported</issue>
        <issue severity="normal" proof="selection">.filter( selection ) signature is not supported</issue>
        <issue severity="low" proof="second_cb_arg">.filter( function ) signature is buggy - the function does not receive the second argument</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="element">.filter( element ) signature is not supported</issue>
        <issue severity="normal" proof="array">.filter( elements [Array] ) signature is not supported</issue>
        <issue severity="normal" proof="selection">.filter( selection ) signature is not supported</issue>
        <issue severity="normal" proof="first_cb_arg,second_cb_arg">.filter( function ) signature is buggy: The callback receives the arguments in wrong order</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.find()</td>
    <td class="full"></td>
    <td class="partial">
      <issues>
        <issue severity="high" proof="no_duplicates">.find( selector ) signature is buggy: In some circumstances it returns duplicates</issue>
        <issue severity="high" proof="scoped_search">.find( selector ) is buggy: It finds elements that are parent to the selection. Ie $​("#item3"​)​.find​("body li"​) can give a result. The bug is because with the querySelector method, <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector">the entire hierarchy counts</a>. To fix this shortcoming, the library has to do something similar to <a href="https://github.com/lazd/scopedQuerySelectorShim">this shim</a></issue>
        <issue severity="low" proof="array_like">.find( selector [Array of Elements] ) does not support when selector is merely array-like (ie a HTMLCollection)</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="high" proof="scoped_search">.find( selector ) is buggy: It finds elements that are parent to the selection. Ie $​("#item3"​)​.find​("body li"​) can give a result. The bug is because with the querySelector method, <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector">the entire hierarchy counts</a>. To fix this shortcoming, the library has to do something similar to <a href="https://github.com/lazd/scopedQuerySelectorShim">this shim</a></issue>
        <issue severity="normal" proof="selection">.find( selector [jQuery] ) is not supported</issue>
        <issue severity="normal" proof="element">.find( selector [Element] ) is not supported</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.first()</td>
    <td class="full"></td>
    <td class="partial">
      <issues>
        <issue severity="low" proof="array">Does not work with ordinary arrays. Ie, $​([3,4]​)​.first​(​) does not return 3</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="low" proof="array">Does not work with ordinary arrays. Ie, $​([3,4]​)​.first​(​) does not return 3</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.focus()</td>
    <td>See .on() and .trigger()</td>
    <td>See .on() and .trigger()</td>
    <td>See .on() and .trigger()</td>
  </tr>
  <tr>
    <td>.get()</td>
    <td class="full"></td>
    <td class="full"></td>
    <td class="full"></td>
  </tr>
  <tr>
    <td>.hasClass()</td>
    <td class="full"></td>
    <td class="full"></td>
    <td class="approximate">
      <issues>
        <issue severity="edgecase" proof="newline">HTML may not contain newline</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.hide()</td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="">Animation is not supported</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="high" proof="store_original_display_value">Does not store display value before setting it to "none", so .show() cannot restore it correctly. Ie. $(tempEl).css("display", "table-cell").hide().show().css("display") returns "block", but should return "table-cell"</issue>
        <issue severity="normal" proof="">Animation is not supported</issue>
      </issues>
    </td>
    <td class="none"></td>
  </tr>
  <tr>
    <td>.html()</td>
    <td class="full"></td>
    <td class="approximate">
      <issues>
        <issue severity="edgecase" proof="empty_selection">Does not comply in an edge case</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="function">html( function ) signature is not implemented</issue>
        <issue severity="edgecase" proof="empty_selection">Does not comply in an edge case</issue>
        <issue severity="low" proof="">Event listeners on the old HTML are not removed. It is concidered best practise to remove event listeners, but according to <a href="https://auth0.com/blog/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/">this article</a>, it is not strictly required for modern browsers:</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.insertAfter()</td>
    <td class="approximate">
      <issues>
        <issue severity="edgecase" proof="html_string">.insertAfter( [ htmlString ] ) does not comply. But that signature hardly makes sense.</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="array">.insertAfter( [ Array of elements ] ) signature is not supported</issue>
      </issues>
    </td>
    <td class="approximate">
      <issues>
        <issue severity="edgecase" proof="html_string">.insertAfter( [ htmlString ] ) does not comply. But that signature hardly makes sense.</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.insertBefore()</td>
    <td class="approximate">
      <issues>
        <issue severity="edgecase" proof="html_string">.insertBefore( [ htmlString ] ) does not comply. But that signature hardly makes sense</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="array">.insertBefore( [ Array of elements ] ) signature is not supported</issue>
      </issues>
    </td>
    <td class="approximate">
      <issues>
        <issue severity="edgecase" proof="html_string">.insertBefore( [ htmlString ] ) does not comply. But that signature hardly makes sense</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.keyup()</td>
  </tr>
  <tr>
    <td>.last()</td>
    <td class="full"></td>
    <td class="partial">
      <issues>
        <issue severity="low" proof="array">Does not work with ordinary arrays. Ie, $​([3,4]​)​.last​(​) does not return 3</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="low" proof="array">Does not work with ordinary arrays. Ie, $​([3,4]​)​.last​(​) does not return 3</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.map()</td>
    <td class="full"></td>
    <td class="full"></td>
    <td class="partial">
      <issues>
        <issue severity="high" proof="first_cb_arg,second_cb_arg">Very buggy. The function retrieves arguments (element, index) instead of (index, element).</issue>
        <issue severity="high" proof="this">The 'this' does not point to the element, but to window</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.next()</td>
    <td class="full"></td>
    <td class="full"></td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="multiple_elements">Only works on one element (the rest is dropped)</issue>
        <issue severity="normal" proof="filtering">.next( selector ) is not supported, that is: no filtering</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.offset()</td>
    <td class="full"></td>
    <td class="partial">
      <issues>
        <issue severity="high" proof="get">.offset( ) returns wrong coordinates</issue>
        <issue severity="high" proof="set">.offset( coordinates ) sets wrong coordinates</issue>
        <issue severity="low" proof="iframe">.offset( ) always uses current window, also for iframes etc</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="high" proof="get">.offset( ) in many cases returns wrong coordinates</issue>
        <issue severity="high" proof="set">.offset( coordinates ) is not supported. So setting coordinates is not supported, only getting</issue>
        <issue severity="normal" proof="function">.offset( function ) is not supported</issue>
        <issue severity="low" proof="iframe">.offset( ) always uses current window, also for iframes etc</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.offsetParent()</td>
    <td class="full"></td>
    <td class="partial">
      <issues>
        <issue severity="low" proof="no_parents_positioned">When no parents are positioned, the body element is returned, but jQuery returns the document element</issue>
        <issue severity="low" proof="hidden_element">When element is hidden, the body element is returned, but jQuery returns the document element</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="skiptable">Does not skip table elements with position:static</issue>
        <issue severity="low" proof="no_parents_positioned">When no parents are positioned, the body element is returned, but jQuery returns the document element</issue>
        <issue severity="low" proof="hidden_element">When element is hidden, an empty selection is returned, but jQuery returns the document element</issue>
        <issue severity="low" proof="no_elements">When no elements are in set, we get an error</issue>
        <issue severity="low" proof="multiple_elements">Does not handle operating on multiple elements</issue>

      </issues>
    </td>
  </tr>
  <tr>
    <td>.on()</td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="">Multiple events are NOT SUPPORTED - only one event name may be specified</issue>
        <issue severity="high" proof="">Event propagation may not be correct</issue>
        <issue severity="normal" proof="">Custom events are not supported</issue>
        <issue severity="low" proof="">Namespaces such as "keydown.myPlugin" are not supported</issue>
      </issues>
    </td>
    <td>Has not been investigated. But it seems events are very well supported</td>
    <td>Has not been investigated</td>
  </tr>
  <tr>
    <td>.parent()</td>
    <td class="approximate">
      <issues>
        <issue severity="edgecase" proof="html_parent">If you try to get the parent of a jQuery selection which hasnt been appended to document, you will get a containing div - in jQuery you get an empty selection</issue>
      </issues>
    </td>
    <td class="full"></td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="selector">.parent( selector ) signature is not supported - so no filtering</issue>
        <issue severity="edgecase" proof="document_parent">parent of a document returns the documentElement, but in jQuery, it returns an empty selection</issue>
        <issue severity="edgecase" proof="html_parent">If you try to get the parent of a jQuery selection which hasnt been appended to document, you will get a containing div - in jQuery you get an empty selection</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.position()</td>
    <td class="full"></td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="border">Does not get it right, when there is border</issue>
        <issue severity="normal" proof="fixed">Does not get it right, when position is fixed</issue>
        <issue severity="normal" proof="automargin">margin:auto fails in some browsers (it ie fails in FF 49, but not in Chromium 53)</issue>
        <issue severity="edgecase" proof="html">Does not get html node quite right (it must always return (0,0)</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="automargin">margin:auto fails in some browsers (it ie fails in FF 49, but not in Chromium 53)</issue>
        <issue severity="low" proof="decimal_points">Decimal precision is lost</issue>
        <issue severity="edgecase" proof="get">Coordinates are returned in opposite order</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.prepend()</td>
    <td class="approximate">
      <issues>
        <issue severity="normal" proof="">When a node is prepended to multiple targets, the node is cloned behind the scenes. As the .clone() method doesnt support copying data and event listeners yet, these clones will erroursly not get these</issue>
      </issues>
    </td>
    </td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="function">.prepend( function ) signature is unsupported</issue>
        <issue severity="edgecase" proof="weird">weird result in the test "Is prepended node detached from previous position in DOM?"</issue>
        <issue severity="normal" proof="">When a node is prepended to multiple targets, the node is cloned behind the scenes. As the .clone() method doesnt support copying data and event listeners, these clones will erroursly not get these</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="content_content">.prepend( content [,content] ) only supports one piece of content</issue>
        <issue severity="normal" proof="function">.prepend( function ) signature is unsupported</issue>
        <issue severity="normal" proof="">When a node is prepended to multiple targets, the node is cloned behind the scenes. As the .clone() method doesnt support copying data and event listeners, these clones will erroursly not get these</issue>
        <issue severity="low" proof="text_node">.prepend( [ Text Node ] ) signature is unsupported (and array of text nodes)</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.prependTo()</td>
    <td class="full"></td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="multiple_targets">Does not support prepending to multiple targets</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="multiple_targets">Does not support prepending to multiple targets</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.prev()</td>
    <td class="full"></td>
    <td class="full"></td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="multiple_elements">Only works on one element (the rest is dropped)</issue>
        <issue severity="normal" proof="filtering">.prev( selector ) is not supported, that is: no filtering</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.pushStack()</td>
    <td class="full"></td>
    <td class="none"></td>
    <td class="none"></td>
  </tr>
  <tr>
    <td>.ready()</td>
    <td class="full"></td>
    <td class="full"></td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="arguments">The ready handler should be passed a reference to the jQuery object that called the method, but no arguments is passed</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.remove()</td>
    <td class="partial">
      <issues>
        <issue severity="low" proof="selector_nested">.remove( selector ) does not support nested selectors. For example "* > b" does not match when performed on a "b" element</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="selector">.remove( selector ) signature is not supported (all elements are removed)</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="selector">.remove( selector ) signature is not supported (all elements are removed)</issue>
        <issue severity="low" proof="">Event listeners on the old HTML are not removed. It is concidered best practise to remove event listeners, but according to <a href="https://auth0.com/blog/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/">this article</a>, it is not strictly required for modern browsers:</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.removeAttr()</td>
    <td class="full"></td>
    <td class="approximate">
      <issues>
        <issue severity="low" proof="no_args,null,undefined">Does not handle when argument is null or undefined</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="space_separated">Can only remove one attribute at a time (space separated list of attribute names is not supported)</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.removeClass()</td>
    <td class="full"></td>
    <td class="approximate">
      <issues>
        <issue severity="edgecase" proof="classname_defined_more_than_once">Does not remove a class name defined more than once</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="function">.removeClass( function ) is not supported</issue>
        <issue severity="edgecase" proof="extra_spaces_in_html">Does not remove extra spaces in HTML (fixed in 0.5.0)</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.replaceWith()</td>
    <td class="full"></td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="function">.replaceWith( function ) is not supported</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="function">.replaceWith( function ) is not supported</issue>
        <issue severity="low" proof="">Event listeners on the old HTML are not removed. It is concidered best practise to remove event listeners, but according to <a href="https://auth0.com/blog/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/">this article</a>, it is not strictly required for modern browsers:</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.show()</td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="">Animation is not supported</issue>
        <issue severity="low" proof="data_survives">Data regarding old display value does not survive all jQuery operations.</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="high" proof="restore_display">Doesnt restore display value to the value before .hide() or .toggle() has been called. Ie. $(tempEl).css("display", "table-cell").show().show().css("display") returns "block", but should return "table-cell"</issue>
        <issue severity="normal" proof="">Animation is not supported</issue>
        <issue severity="edgecase" proof="empty_display_hidden,alter_css_on_already_visible_unattached">Does not comply in some edgecases</issue>
      </issues>
    </td>
    <td class="none"></td>
  </tr>
  <tr>
    <td>.text()</td>
    <td class="full"></td>
    <td class="approximate">
      <issues>
        <issue severity="edgecase" proof="jquery_empty">Does not comply when jQuery set is empty</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="jquery_empty">.text( function ) signature is not supported</issue>
        <issue severity="normal" proof="multiple">Does not work on a set larger than one</issue>
        <issue severity="edgecase" proof="jquery_empty">Throws error when jQuery set is empty</issue>
      </issues>
    </td>
  </tr>
  <tr>
    <td>.toArray()</td>
    <td class="full"></td>
    <td class="full"></td>
    <td class="none"></td>
  </tr>
  <tr>
    <td>.toggle()</td>
    <td class="partial">
      <issues>
        <issue severity="normal" proof="">Animation is not supported</issue>
        <issue severity="low" proof="data_survives">Data regarding old display value does not survive all jQuery operations.</issue>
        <issue severity="edgecase" proof="bug">Does not comply in some edge cases, but to do so, we would have to recreate a buggy behaviour in jQuery</issue>
      </issues>
    </td>
    <td class="partial">
      <issues>
        <issue severity="high" proof="restore_display">Doesnt restore display value to the value before .hide() or .toggle() has been called. Ie. $(tempEl).css("display", "table-cell").show().show().css("display") returns "block", but should return "table-cell"</issue>
        <issue severity="normal" proof="">Animation is not supported</issue>
        <issue severity="edgecase" proof="bug">Does not comply in some edge cases, but to do so, we would have to recreate a buggy behaviour in jQuery</issue>
      </issues>
    </td>
    <td class="none"></td>
  </tr>
  <tr>
    <td>.trigger()</td>
    <td class="partial">
      <issues>
        <issue severity="high" proof="">Might not be compatible with all target browsers</issue>
        <issue severity="high" proof="">Event propagation may not be correct</issue>
        <issue severity="normal" proof="">.trigger( event, [extraParameters] ): extraParameters are not supported</issue>
        <issue severity="low" proof="">Relies on .initEvent, which has been removed from the web standards. So we cannot rely on it to be supported by future (or even current?) browsers. However, initEvent is probably going to be supported quite a while.</issue>
      </issues>
    </td>
    <td class="partial">
      Has not been investigated. But it seems events are very well supported
      <issues>
        <issue severity="low" proof="">Relies on .initEvent, which has been removed from the web standards. So we cannot rely on it to be supported by future (or even current?) browsers. However, initEvent is probably going to be supported quite a while.</issue>
      </issues>
    </td>
    <td>Has not been investigated</td>
  </tr>


</tbody>
</table>

