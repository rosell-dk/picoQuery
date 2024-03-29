# picoQuery
picoQuery implements a subset of jQuery. The full version currently supports 55 methods. You can however choose exactly which methods you need in the online builder. The full version is *very light* - only 3kb gzipped. Selecting a subset gets you further down.

picoQuery is written for modern browsers (IE9+), but automatically detects if the browser is unsupported and falls back to jQuery 1.12.4, if so. So actually you get IE6+ compatibility with picoQuery.

### How to use

1. Build your subset here: http://picoquery.little-b.it/builder/<br>
2. Simply include that custom script instead of jQuery.

For more information, visit the [picoquery website](http://picoquery.little-b.it/)

### v.0.5.0 done
Focus has been to improve compliance with jQuery. No new methods, but compliance went from being better than Zepto (within the supported subset!) to being way better. Check out the updated [Compliance Chart](http://picoquery.little-b.it/compliance_chart), or the [Roadmap](http://picoquery.little-b.it/roadmap) to see whats new.


### Comparison
<table>
<tr>
  <td></td>
  <th><a href="http://jquery.com" title="jQuery 1.12.4">jQuery 1.12</a></th>
  <th><a href="http://picoquery.little-b.it" title="FULL VERSION">picoQuery 0.5</a></th>
  <th><a href="https://github.com/madrobby/zepto" title="Click to go to github page. There is also a webpage zeptojs.com" title="Zepto 1.2.0">Zepto 1.2</a></th>
  <th><a href="https://github.com/kenwheeler/cash" title="Click to go to github page" title="Cash 1.3.0">Cash 1.3</a></th>
</tr>
<tr>
  <td>size (uncompressed)</td>
  <td title="98.1 kb minified without compression, 33.8 kb gzipped">98 kB</td>
  <td title="14 kB minified without compression, 4.3 kB gzipped">14 kB</td>
  <td title="26.6 kB minified without compression, 9.8 kB gzipped">27 kB</td>
  <td title="9.7 kB minified without compression, 3.6 kB gzipped">10 kB</td>
</tr>
<tr>
  <td>size (compressed)</td>
  <td title="98.1 kb minified without compression, 33.8 kb gzipped">34 kB</td>
  <td title="14 kB minified without compression, 4.3 kB gzipped">4 kB</td>
  <td title="26.6 kB minified without compression, 9.8 kB gzipped">10 kB</td>
  <td title="9.7 kB minified without compression, 3.6 kB gzipped">4 kB</td>
</tr>
<tr>
  <td>#methods</td>
  <td><a href="http://picoquery.little-b.it/subsets" title="148 instance methods + 94 class methods. Click to see which">242</a></td>
  <td><a href="http://picoquery.little-b.it/subsets" title="52 instance methods + 5 class methods. Click to see which">57</a></td>
  <td><a href="http://picoquery.little-b.it/subsets" title="112 instance methods + 33 class methods. Click to see which">145</a></td>
  <td><a href="http://picoquery.little-b.it/subsets" title="67 instance methods + 13 class methods. Click to see which">80</a></td>
</tr>
<tr>
  <td>Compliance within subset</td>
  <td title="Perfect, by definition">Perfect</td>
  <td><a href="http://picoquery.little-b.it/compliance_chart" title="78% of the methods are fully or approximately implemented. 22% are only partially implemented. Click to see compliance chart">Decent</a></td>
  <td><a href="http://picoquery.little-b.it/compliance_chart" title="39% of the methods we have examined are fully or approximately implemented. 61% are only partially implemented. Click to see compliance chart">Rough</a></td>
  <td><a href="http://picoquery.little-b.it/compliance_chart" title="17% of the methods we have examined are fully or approximately implemented. 83% are only partially implemented. Click for details">Poor</a></td>
</tr>
</table>

### Mantis-ware
If you enjoy this software, feel free to find your mate, mate him and eat him (if such thing is allowed in the country of your residence). If you are a male, feel free to do the opposite.
