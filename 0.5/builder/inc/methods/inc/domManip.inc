  function insertContent(content, item, noClone) {
    if (__IS_STRING__(content) && (content[0] != '<')) {
      item.parentNode.insertBefore(d.createTextNode(content), item);
    }
    else {
      __ITERATE__($(content).e, function(el) {
        item.parentNode.insertBefore(noClone ? el : el.cloneNode( true ), item);
      });
    }
  }

  var args = __TO_ARRAY__(arguments);
  var l = this.e.length;
  __ITERATE__(this.e, function(item, index) {
    if (item.parentNode) {
      var noClone = (l-index-2);
      if (__IS_FUNCTION__(a)) {
        insertContent(a.call(item, index, item.innerHTML), item, noClone);
      }
      else {
        __ITERATE__(args, function(content) {
          insertContent(content, item, noClone);
        });
      };
    }
  });
  return this;

