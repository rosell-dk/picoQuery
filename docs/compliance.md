# Compliance
Generally all signatures of the methods are implemented, but there are a few exceptions. In the builder, you can learn more about these exceptions by hovering the small warning icon next to partially supported methods.

picoQuery does not support the special [jQuery-selectors](http://api.jquery.com/category/selectors/jquery-selector-extensions/), such as :visible. It does however support all CSS selectors, including [CSS3 selectors](http://www.456bereastreet.com/archive/200601/css_3_selectors_explained/), such as :enabled

When nodes are cloned, event handlers are not copied. Beware that cloning can happen behind the scene if you for example .append() the same content to several nodes.

The jQuery() constructor supports all signatures, except [jQuery(html, attributes)](http://api.jquery.com/jQuery/#jQuery-html-attributes).

You can learn more about compliance by running our [online compliance test](http://picoquery.com/lab/compliance-test/). As a side note, you can also test jquery compliance of other jQuery reimplementations with this tool.

picoquery/lab/compliance-test/?frameworks=jquery-1.12.4.min.js,picoquery,cash,zepto&group=add

method        | picoQuery 0.4.0 | zepto 1.2.0 | cash 1.3.0 |
-|-|-
.add()        | Partial | Partial | Partial | 
-             | *jQuery sorts in Document order. picoQuery does not sort.* | *jQuery sorts in Document order. zepto does not sort.* | *jQuery sorts in Document order. cash does not sort.* 
.addBack()    | Approximate | None | None |
-             | *jQuery sorts in Document order. picoQuery does not sort.* |
.addClass     | Approximate | Approximate | Partial
-             | *Differs in a few edge-cases*|*Differs in a few edge-cases*| *does not accept function*

