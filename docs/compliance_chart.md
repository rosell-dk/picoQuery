# Compliance Chart

Color legend:
<table class="color-legend">
  <tr><td class="full">Full compliance</td></tr>
  <tr><td class="approximate">Almost full compliance</td></tr>
  <tr><td class="partial">Partial compliance</td></tr>
  <tr><td class="none">Not supported</td></tr>
</table>

*Note: The chart is under construction*
<table class="chart">
  <tr>
    <th></th>
    <th>picoQuery 0.4.0</th>
    <th>Zepto 1.2.0</th>
    <th>Cash 1.3.0</th>
  </tr>
  <tr>
    <td>constructor</td>
    <td class="partial">
      <ul>
        <li>Special jQuery selectors such as :odd are not supported</li>
        <li>jQuery( selector, context [ Array of elements ] ) does not get the order right.</li>
        <li>jQuery( html ) does not clean up invalid self-closing tags.</li>
        <li>Does not strictly comply in a few edge cases</li>
      </ul>
    </td>
    <td class="partial">
      <ul>
        <li>jQuery( selector, context [ Element ] ) does not comply when selector begins with something outside of context.</li>
        <li>jQuery( selector, context [ Array of elements ] ) does not get the order right.</li>
        <li>jQuery( selector, context [ Element ] ) does not fully comply, when Element is a NodeList</li>
        <li>Does not strictly comply in a few edge cases</li>
      </ul>
    </td>
    <td class="partial">
      <ul>
        <li>jQuery( selector, context [ Element ] ) does not comply when selector begins with something outside of context.</li>
        <li>jQuery( selector, context [ jQuery ] ) does not work. - You cannot pass a jQuery object as context</li>
        <li>jQuery( selector, context [ Array of elements ] ) does not work. - You cannot pass an array of elements as context</li>
        <li>jQuery( selector, context [ Element ] ) does not comply when selector matches root of context</li>
        <li>jQuery( html ) does not clean up invalid self-closing tags.</li>
        <li>Does not strictly comply in more than a few edge cases</li>
      </ul>
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
      <ul class="unsupported-signatures">
        <li>.addClass( function )</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>.after()</td>
    <td class="approximate">Does not comply in some edge cases</td>
    <td class="partial">
      <ul class="unsupported-signatures">
        <li>.after( function )</li>
        <li>.after( function-html )</li>
      </ul>
    </td>
    <td class="partial">
      <ul class="unsupported-signatures">
        <li>.after( [Text] )</li>
        <li>.after( content, content, ... )</li>
        <li>.after( function )</li>
        <li>.after( function-html )</li>
      </ul>
      <ul>
        <li></li>
      </ul>
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
    <td class="full"></td>
    <td class="partial">
      <ul class="unsupported-signatures">
        <li>.append( function )</li>
      </ul>
    </td>
    <td class="partial">
      <ul class="unsupported-signatures">
        <li>.append( [Text] )</li>
        <li>.append( [ Array of Text nodes ] )</li>
        <li>.append( function )</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>.appendTo()</td>
    <td class="full"></td>
    <td class="partial">
      <ul>
        <li>Does not support appending to multiple targets</li>
      </ul>
    </td>
    <td class="partial">
      <ul>
        <li>Does not support appending to multiple targets</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>.attr()</td>
    <td class="partial">
      <ul class="unsupported-signatures">
        <li>.attr( attributes )</li>
      </ul>
    </td>
    <td class="approximate">
      <ul>
        <li>Does not comply in some edge cases</li>
      </ul>
    </td>
    <td class="partial">
      <ul class="unsupported-signatures">
        <li>.attr( attributeName, function )</li>
      </ul>
      <ul>
        <li>Does not comply in some edge cases</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>.before()</td>
    <td class="approximate">Does not comply in some edge cases</td>
    <td class="partial">
      <ul class="unsupported-signatures">
        <li>.before( function )</li>
        <li>.before( function-html )</li>
      </ul>
    </td>
    <td class="partial">
      <ul class="unsupported-signatures">
        <li>.before( [Text] )</li>
        <li>.before( content, content, ... )</li>
        <li>.before( function )</li>
        <li>.before( function-html )</li>
      </ul>
      <ul>
        <li></li>
      </ul>
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
    <td class="">not tested</td>
    <td class="">not tested</td>
    <td class="">not tested</td>
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
      <ul>
        <li>.closest( selector, context ) is buggy</li>
      </ul>
    </td>
    <td class="partial">
      <ul>
        <li>.closest( selector, context ) is buggy</li>
        <li>.closest( selection ) is unsupported</li>
        <li>.closest( element ) is unsupported</li>
      </ul>
    </td>
  </tr>

</table>

