# picoQuery
picoQuery implements a subset of jQuery. The full version currently supports 55 methods. You can however choose exactly which methods you need in the online builder. The full version is *very light* - only 3kb gzipped. Selecting a subset gets you further down.

picoQuery is written for modern browsers (IE9+), but automatically detects if the browser is unsupported and falls back to jQuery 1.12.4 if so. So actually, you get IE6+ compatibility with picoQuery.

### How to use

1. Build your subset in the [online builder](/builder/)<br>
2. Simply include the generated script instead of jQuery.

### Comparison
<table class="comparison">
<tr>
<th>framework</th>
<th>gzip</th>
<th>#methods</th>
<th>Compliance within subset</th>
<th>Activity</th>
</tr>
<tr>
<td>jQuery 1.12.4</td>
<td title="98.1 kb minified without compression, 33.8 kb gzipped">34 kB</td>
<td><a href="/subsets" title="148 instance methods + 94 class methods. Click to see which">242</a></td>
<td>Perfect, by definition</td>
<td></td>
</tr>
<tr>
<td><a href="http://picoquery.com">picoQuery 0.5.0</a> (full)</td>
<td title="11.7 kB minified without compression, 3.7 kB gzipped">4 kB</td>
<td><a href="/subsets" title="52 instance methods + 5 class methods. Click to see which">57</a></td>
<td><a href="/compliance_chart" title="81% of the methods are fully or approximately implemented. 19% are only partially implemented. Click to see compliance chart">Decent</a></td>
<td><a href="https://github.com/rosell-dk/picoQuery/graphs/commit-activity">Very active</a></td>
</tr>
<tr>
<td><a href="https://github.com/madrobby/zepto" title="Click to go to github page. There is also a webpage zeptojs.com">Zepto 1.2.0</a></td>
<td title="26.6 kB minified without compression, 9.8 kB gzipped">10 kB</td>
<td><a href="/subsets" title="112 instance methods + 33 class methods. Click to see which">145</a></td>
<td><a href="/compliance_chart" title="36% of the methods we have examined are fully or approximately implemented. 64% are only partially implemented. Click to see compliance chart">Rough</a></td>
<td><a href="https://github.com/madrobby/zepto/graphs/commit-activity">Not much</a></td>
</tr>
<tr>
<td><a href="https://github.com/kenwheeler/cash" title="Click to go to github page">Cash 1.3.0</a></td>
<td title="9.7 kB minified without compression, 3.6 kB gzipped">4 kB</td>
<td><a href="/subsets" title="67 instance methods + 13 class methods. Click to see which">80</a></td>
<td><a href="/compliance_chart" title="18% of the methods we have examined are fully or approximately implemented. 82% are only partially implemented. Click for details">Poor</a></td>
<td><a href="https://github.com/kenwheeler/cash/graphs/commit-activity">Not much</a></td>
</tr>
</table>


### Please help spreading the word!
Post on facebook or twitter, mention it to your colleagues. Mention it on [coding forums](http://stackoverflow.com/search?tab=active&q=zepto). Or your blog. Thanks!




