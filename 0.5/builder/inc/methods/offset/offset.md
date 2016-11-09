/* youmightnotneedjquery.com proposed this solution:
   it however does not comply, when document is scrolled
var rect = this.e[0].getBoundingClientRect();
return {
  top: rect.top + document.body.scrollTop,
  left: rect.left + document.body.scrollLeft
}*/

