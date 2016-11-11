# Compliance Chart

*Note: The chart is under construction. I'm starting with the methods supported by picoQuery, which has the effect that the summary is biased in favor of picoquery. However, it does show that the methods which are supported by picoQuery are more compliant than the respective methods in Zepto and Cash*<br><br>

Compliance summary:<br>

<table class="summary">
  <tr>
    <td>picoQuery 0.4.0</td>
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
    <th>picoQuery 0.4.0</th>
    <th>Zepto 1.2.0</th>
    <th>Cash 1.3.0</th>
  </tr>
  <tr>
    <td>constructor</td>
    <td class="partial">
      <ol>
        <li data-proof="jquery_selectors">Special jQuery selectors such as :odd are not supported</li>
        <li data-proof="wrong_order">jQuery( selector, context [ Array of elements ] ) does not get the order right.</li>
        <li data-proof="invalid_html,invalid_html2">jQuery( html ) does not parse some invalid HTML the same way as jQuery does.</li>
        <li data-proof="html_collection,array_like">Array-like structures are not supported, ie jQuery( [HTMLCollection] ) (Will be fixed in v0.5.0)</li>
        <li>Does not strictly comply in a few edge cases</li>
      </ol>
    </td>
    <td class="partial">
      <ol>
        <li data-proof="jquery_selectors">Special jQuery selectors such as :odd are not supported</li>
        <li>jQuery( selector, context [ Element ] ) is buggy: It finds elements that are parent to the selection. Ie $​("body li", document.&#8203;getElementById&#8203;("item3")) returns unexpected matches. The bug is because with the querySelector method, <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector">the entire hierarchy counts</a>. To fix this shortcoming, the library has to do something similar to <a href="https://github.com/lazd/scopedQuerySelectorShim">this shim</a></li>
</li>
        <li data-proof="wrong_order">jQuery( selector, context [ Array of elements ] ) does not get the order right.</li>
        <li>jQuery( selector, context [ Element ] ) does not fully comply, when Element is a NodeList</li>
        <li>Array-like structures are not supported, ie jQuery( [HTMLCollection] ) and jQuery( [NodeList] )</li>
        <li>Does not strictly comply in a few edge cases</li>
      </ol>
    </td>
    <td class="partial">
      <ol>
        <li data-proof="jquery_selectors">Special jQuery selectors such as :odd are not supported</li>
        <li>jQuery( selector, context [ Element ] ) is buggy: It finds elements that are parent to the selection. Ie $​("body li", document.&#8203;getElementById&#8203;("item3")) returns unexpected matches. The bug is because with the querySelector method, <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector">the entire hierarchy counts</a>. To fix this shortcoming, the library has to do something similar to <a href="https://github.com/lazd/scopedQuerySelectorShim">this shim</a></li>
</li>
        <li>jQuery( selector, context [ jQuery ] ) does not work. - You cannot pass a jQuery object as context</li>
        <li>jQuery( selector, context [ Array of elements ] ) does not work. - You cannot pass an array of elements as context</li>
        <li>jQuery( selector, context [ Element ] ) returns matches root element of context, though it should not. Ie $​("#item3", document.&#8203;getElementById&#8203;("item3"​)​) returns a match</li>
        <li>jQuery( html ) does not clean up invalid self-closing tags.</li>
        <li>Does not strictly comply in more than a few edge cases</li>
      </ol>
    </td>
  </tr>
  <tr>
    <td>.add()</td>
    <td class="approximate">jQuery sorts in Document order. picoQuery does not sort</td>
    <td class="approximate">jQuery sorts in Document order. zepto does not sort</td>
    <td class="approximate">jQuery sorts in Document order. Cash does not sort</td>
  </tr>
  <tr>
    <td>.addBack()</td>
    <td class="approximate">jQuery sorts in Document order. picoQuery does not sort</td>
    <td class="none"></td>
    <td class="none"></td>
  </tr>
  <tr>
    <td>.addClass()</td>
    <td class="approximate">Does not comply in some edge cases</td>
    <td class="approximate">Does not comply in some edge cases</td>
    <td class="partial">
      <ol class="unsupported-signatures">
        <li>.addClass( function )</li>
      </ol>
    </td>
  </tr>
  <tr>
    <td>.after()</td>
    <td class="approximate">Does not comply in some edge cases</td>
    <td class="partial">
      <ol class="unsupported-signatures">
        <li>.after( function )</li>
        <li>.after( function-html )</li>
      </ol>
    </td>
    <td class="partial">
      <ol>
        <li>.after( [Text] ) signature is unsupported. Ie you cannot do: $(el).after("some text")</li>
        <li>.after( content [,content] ) only supports one piece of content</li>
        <li>.after( function ) is unsupported</li>
        <li>.after( function-html ) is unsupported</li>
      </ol>
      <ol>
        <li></li>
      </ol>
    </td>
  </tr>
  <tr>
    <td>.andSelf()</td>
    <td class="approximate">jQuery sorts in Document order. picoQuery does not sort</td>
    <td class="none"></td>
    <td class="none"></td>
  </tr>
  <tr>
    <td>.append()</td>
    <td class="approximate">
      When a node is appended to multiple targets, the node is cloned behind the scenes. As the .clone() method doesnt support copying data and event listeners yet, these clones will erroursly not get these
    </td>
    <td class="partial">
      <ol>
        <li>.append( function ) signature is unsupported</li>
        <li>weird result in the test "Is appended node detached from previous position in DOM?"</li>
        <li>When a node is appended to multiple targets, the node is cloned behind the scenes. As the .clone() method doesnt support copying data and event listeners, these clones will erroursly not get these</li>
      </ol>
    </td>
    <td class="partial">
      <ol>
        <li>.append( content [,content] ) only supports one piece of content</li>
        <li>.append( function ) signature is unsupported</li>
        <li>.append( [ Text Node ] ) signature is unsupported</li>
        <li>.append( [ Array of Text nodes ] ) signature is unsupported</li>
        <li>When a node is appended to multiple targets, the node is cloned behind the scenes. As the .clone() method doesnt support copying data and event listeners, these clones will erroursly not get these</li>
      </ol>
    </td>
  </tr>
  <tr>
    <td>.appendTo()</td>
    <td class="full"></td>
    <td class="partial">
      <ol>
        <li>Does not support appending to multiple targets</li>
      </ol>
    </td>
    <td class="partial">
      <ol>
        <li>Does not support appending to multiple targets</li>
      </ol>
    </td>
  </tr>
  <tr>
    <td>.attr()</td>
    <td class="partial">
      <ol class="unsupported-signatures">
        <li>.attr( attributes )</li>
      </ol>
    </td>
    <td class="approximate">
      <ol>
        <li>Does not comply in some edge cases</li>
      </ol>
    </td>
    <td class="partial">
      <ol class="unsupported-signatures">
        <li>.attr( attributeName, function )</li>
      </ol>
      <ol>
        <li>Does not comply in some edge cases</li>
      </ol>
    </td>
  </tr>
  <tr>
    <td>.before()</td>
    <td class="approximate">Does not comply in some edge cases</td>
    <td class="partial">
      <ol class="unsupported-signatures">
        <li>.before( function )</li>
        <li>.before( function-html )</li>
      </ol>
    </td>
    <td class="partial">
      <ol class="unsupported-signatures">
        <li>.before( [Text] )</li>
        <li>.before( content, content, ... )</li>
        <li>.before( function )</li>
        <li>.before( function-html )</li>
      </ol>
      <ol>
        <li></li>
      </ol>
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
    <td class="partial">See .on()</td>
    <td>See .on()</td>
    <td>See .on()</td>
  </tr>
  <tr>
    <td>.clone()</td>
    <td class="partial">Does not copy data and events</td>
    <td class="partial">Does not copy data and events</td>
    <td class="partial">Does not copy data and events</td>
  </tr>
  <tr>
    <td>.closest()</td>
    <td class="full"></td>
    <td class="partial">
      <ol>
        <li>.closest( selector, context ) is buggy</li>
      </ol>
    </td>
    <td class="partial">
      <ol>
        <li>.closest( selector, context ) is buggy</li>
        <li>.closest( selection ) is unsupported</li>
        <li>.closest( element ) is unsupported</li>
      </ol>
    </td>
  </tr>
  <tr>
    <td>.css()</td>
    <td class="partial">
      <ol>
        <li>jQuery has quite a few "cssHooks" which handles certain css properties in specific ways. These are not supported.</li>
        <li>Automatic using vendor prefixed version when available is not supported.</li>
        <li>Does not support omitting "px" for widths etc. Ie. .css("width", "123") sets width to 123px in jQuery, but not in picoQuery</li>
        <li>Does not support setting a numeral property like this: .css​("fontSize", 10​) (but does support setting it like this: .css​("fontSize", "10​")</li>
        <li>.css( properties) signature is not supported. That is: does not support getting several properties in one call</li>
        <li>.css( propertyName, function ) is not supported</li>
        <li>.css( properties ) is not supported. That is, it is not possible to set multiple properties in one go</li>
      </ol>
    </td>
    <td class="partial">
      <ol>
        <li>jQuery has quite a few "cssHooks" which handles certain css properties in specific ways. These are not supported.</li>
        <li>Does not support getting property in camelCased form, unless it has been set with .css( property, value )</li>
        <li>Does not support setting a numeral property like this: .css​("fontSize", "10"​) (but does support setting it like this: .css​("fontSize", 10​))</li>
      </ol>
    </td>
    <td class="partial">
      <ol>
        <li>jQuery has quite a few "cssHooks" which handles certain css properties in specific ways. These are not supported.</li>
        <li>Does not support getting or setting property in dasherized form. Only supports camelCased form. Ie $​("li​​)​.css​("font-style"​) does not work</li>
        <li>Does not support setting a numeral property like this: .css​("fontSize", 10​)</li>
        <li>.css( properties) signature is not supported. That is: does not support getting several properties in one call</li>
        <li>.css( propertyName, function ) is not supported</li>
      </ol>
    </td>
  </tr>
  <tr>
    <td>.data()</td>
    <td class="full"></td>
    <td class="partial">
      <ol>
        <li>.data( key, value ) is not implemented. </li>
        <li>.data( object ) is not implemented either. So you can not set data, only read those set in "data-xxx" attributes</li>
        <li>.data( ) is not implemented</li>
        <li>Setting data changes the "data-xxx" attribute of the node. It should not</li>
      </ol>
    </td>
    <td class="partial">
      <ol>
        <li>Memory-leaking. Data is not deleted from nodes when .empty(), .remove(), .html() and .replaceWith() methods are called.</li>
        <li>.data( ) is not implemented</li>
      </ol>
    </td>
  </tr>
  <tr>
    <td>.each()</td>
    <td class="full"></td>
    <td class="full"></td>
    <td class="partial">
      <ol>
        <li>Does not support iterating normal arrays</li>
      </ol>
    </td>
  </tr>
  <tr>
    <td>.empty()</td>
    <td class="full"></td>
    <td class="full"></td>
    <td class="full"></td>
  </tr>
  <tr>
    <td>.end()</td>
    <td class="approximate">
      <ol>
        <li>Does not comply in some edge cases</li>
      </ol>
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
    <td class="partial">
      <ol>
        <li>.filter( elements [Array] ) signature does not support when elements is merely array-like</li>
        <li>.filter( function ) signature is not supported</li>
      </ol>
    </td>
    <td class="partial">
      <ol>
        <li>.filter( element ) signature is not supported</li>
        <li>.filter( elements [Array] ) signature is not supported</li>
        <li>.filter( selection ) signature is not supported</li>
        <li>.filter( filter ) signature is buggy - the function does not receive the second argument</li>
      </ol>
    </td>
    <td class="partial">
      <ol>
        <li>.filter( element ) signature is not supported</li>
        <li>.filter( elements [Array] ) signature is not supported</li>
        <li>.filter( selection ) signature is not supported</li>
        <li>.filter( filter ) signature is not supported</li>
      </ol>
    </td>
  </tr>
  <tr>
    <td>.find()</td>
    <td class="partial">
      <ol>
        <li>.find( selector [Array of Elements] ) does not support when selector is merely array-like (ie a HTMLCollection). (Will be fixed in 0.5.0)</li>
      </ol>
    </td>
    <td class="partial">
      <ol>
        <li>.find( selector ) signature is buggy: Duplicates are not removed</li>
        <li>.find( selector ) is buggy: It finds elements that are parent to the selection. Ie $​("#item3"​)​.find​("body li"​) can give a result. The bug is because with the querySelector method, <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector">the entire hierarchy counts</a>. To fix this shortcoming, the library has to do something similar to <a href="https://github.com/lazd/scopedQuerySelectorShim">this shim</a></li>
        <li>.find( selector [Array of Elements] ) does not support when selector is merely array-like (ie a HTMLCollection)</li>
      </ol>
    </td>
    <td class="partial">
      <ol>
        <li>.find( selector ) is buggy: It finds elements that are parent to the selection. Ie $​("#item3"​)​.find​("body li"​) can give a result. The bug is because with the querySelector method, <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector">the entire hierarchy counts</a>. To fix this shortcoming, the library has to do something similar to <a href="https://github.com/lazd/scopedQuerySelectorShim">this shim</a></li>
        <li>.find( selector [jQuery] ) is not supported</li>
        <li>.find( selector [Element] ) is not supported</li>
      </ol>
    </td>
  </tr>
  <tr>
    <td>.first()</td>
    <td class="full"></td>
    <td class="partial">
      <ol>
        <li>Does not work with ordinary arrays. Ie, $​([3,4]​)​.first​(​) does not return 3</li>
      </ol>
    </td>
    <td class="partial">
      <ol>
        <li>Does not work with ordinary arrays. Ie, $​([3,4]​)​.first​(​) does not return 3</li>
      </ol>
    </td>
  </tr>
  <tr>
    <td>.focus()</td>
    <td class="partial">See .on() and .trigger()</td>
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
    <td>.on()</td>
    <td class="partial">
      <ol>
        <li>Multiple events are NOT SUPPORTED - only one event name may be specified</li>
        <li>Namespaces such as "keydown.myPlugin" are not supported</li>
        <li>Event propagation may not be correct</li>
      </ol>
    </td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>.hasClass()</td>
    <td class="full"></td>
    <td class="full"></td>
    <td class="full"></td>
  </tr>
  <tr>
    <td>.hide()</td>
    <td class="partial">
      <ol>
        <li>Animation is not supported</li>
      </ol>
    </td>
    <td class="partial">
      <ol>
        <li>Does not store display value before setting it to "none", so .show() cannot restore it correctly. Ie. $(tempEl).css("display", "table-cell").hide().show().css("display") returns "block", but should return "table-cell"</li>
        <li>Animation is not supported</li>
      </ol>
    </td>
    <td class="none"></td>
  </tr>
  <tr>
    <td>.html()</td>
    <td class="full"></td>
    <td class="partial">
      <ol>
        <li>Event listeners on the old HTML are not removed, which can cause memory leak</li>
        <li>Does not comply in an edge case</li>
      </ol>
    </td>
    <td class="partial">
      <ol>
        <li>Event listeners on the old HTML are not removed, which can cause memory leak</li>
        <li>html( function ) signature is not implemented</li>
      </ol>
    </td>
  </tr>
  <tr>
    <td>.insertAfter()</td>
    <td class="approximate">
      <ol>
        <li>.insertAfter( [ htmlString ] ) does not comply. But that signature hardly makes sense, and if it did, the picoQuery result makes more sense than the jQuery result</li>
      </ol>
    </td>
    <td class="partial">
      <ol>
        <li>.insertAfter( [ Array of elements ] ) signature is not supported</li>
      </ol>
    </td>
    <td class="approximate">
      <ol>
        <li>.insertAfter( [ htmlString ] ) does not comply. But that signature hardly makes sense, and if it did, the picoQuery result makes more sense than the jQuery result</li>
      </ol>
    </td>
  </tr>
  <tr>
    <td>.insertBefore()</td>
    <td class="approximate">
      <ol>
        <li>.insertBefore( [ htmlString ] ) does not comply. But that signature hardly makes sense, and if it did, the picoQuery result makes more sense than the jQuery result</li>
      </ol>
    </td>
    <td class="partial">
      <ol>
        <li>.insertBefore( [ Array of elements ] ) signature is not supported</li>
      </ol>
    </td>
    <td class="approximate">
      <ol>
        <li>.insertBefore( [ htmlString ] ) does not comply. But that signature hardly makes sense, and if it did, the picoQuery result makes more sense than the jQuery result</li>
      </ol>
    </td>
  </tr>
  <tr>
    <td>.keyup()</td>
  </tr>
  <tr>
    <td>.last()</td>
    <td class="full"></td>
    <td class="partial">
      <ol>
        <li>Does not work with ordinary arrays. Ie, $​([3,4]​)​.last​(​) does not return 3</li>
      </ol>
    </td>
    <td class="partial">
      <ol>
        <li>Does not work with ordinary arrays. Ie, $​([3,4]​)​.last​(​) does not return 3</li>
      </ol>
    </td>
  </tr>
  <tr>
    <td>.map()</td>
    <td class="full"></td>
    <td class="full"></td>
    <td class="partial">
      <ol>
        <li>Very buggy. The function retrieves arguments (element, index) instead of (index, element).</li>
        <li>The 'this' does not point to the element, but to window</li>
      </ol>
    </td>
  </tr>
  <tr>
    <td>.next()</td>
    <td class="full"></td>
    <td class="full"></td>
    <td class="partial">
      <ol>
        <li>Only works on one element (the rest is dropped)</li>
      </ol>
    </td>
  </tr>
  <tr>
    <td>.offset()</td>
  </tr>
  <tr>
    <td>.offsetParent()</td>
  </tr>
  <tr>
    <td>.on()</td>
  </tr>
  <tr>
    <td>.parent()</td>
  </tr>
  <tr>
    <td>.prepend()</td>
  </tr>
  <tr>
    <td>.prependTo()</td>
  </tr>
  <tr>
    <td>.prev()</td>
  </tr>
  <tr>
    <td>.pushStack()</td>
  </tr>
  <tr>
    <td>.ready()</td>
  </tr>
  <tr>
    <td>.remove()</td>
  </tr>
  <tr>
    <td>.removeAttr()</td>
  </tr>
  <tr>
    <td>.removeClass()</td>
  </tr>
  <tr>
    <td>.replaceWith()</td>
  </tr>
  <tr>
    <td>.show()</td>
  </tr>
  <tr>
    <td>.text()</td>
  </tr>
  <tr>
    <td>.toArray()</td>
  </tr>
  <tr>
    <td>.toggle()</td>
  </tr>
  <tr>
    <td>.trigger()</td>
  </tr>


</tbody>
</table>

