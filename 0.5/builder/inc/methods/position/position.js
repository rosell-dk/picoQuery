position: function(a) {

	if ( !this.e[ 0 ] ) {
		return;
	}

	var offsetParent, offset,
		parentOffset = { top: 0, left: 0 },
		elem = this.e[0];

	if ( $(elem).css("position") == "fixed" ) {

		offset = elem.getBoundingClientRect();
	} 
  else {
		offsetParent = this.offsetParent();

		offset = this.offset();
    if (offsetParent.e[0].nodeName.toLowerCase() != "html") {
//    if (offsetParent.e[0] != offsetParent.e[0].ownerDocument.documentElement) {
			parentOffset = offsetParent.offset();
		}

		parentOffset.top  += parseFloat( $(offsetParent).css("border-top-width") ) || 0;
		parentOffset.left  += parseFloat( $(offsetParent).css("border-left-width") ) || 0;
	}

	return {
		top:  offset.top  - parentOffset.top - parseFloat( $(elem).css("margin-top") ) || 0,
		left: offset.left - parentOffset.left - parseFloat( $(elem).css("margin-left") ) || 0
	}
}


