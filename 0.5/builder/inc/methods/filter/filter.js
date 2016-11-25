<?php if (isFeatureEnabled('append') && isFeatureEnabled('detach')): ?>
filter: function(selector) {
  var match;
  return (selector=='*') ? __PUSH_STACK_THIS__() : __PUSH_STACK__(<@ this.e.filter(function(el, idx){
    if (__IS_FUNCTION__(<@ selector @>)) {
      return selector.call(el, idx, el);
    }
    if (!el.parentNode) {
      $("<div/>").append(el),
      match = ~$(selector, $(el).parent().e[0]).e.indexOf(el);
      $(el).detach();
      return match;
    }
    return ~$(selector, $(el).parent().e[0]).e.indexOf(el);
  }) @>);
}
<?php elseif (isFeatureEnabled('append')): ?>
filter: function(selector) {
  var match;
  return (selector=='*') ? __PUSH_STACK_THIS__() : __PUSH_STACK__(<@ this.e.filter(function(el, idx){
    if (__IS_FUNCTION__(<@ selector @>)) {
      return selector.call(el, idx, el);
    }
    if (!el.parentNode) {
      $("<div/>").append(el),
      match = ~$(selector, $(el).parent().e[0]).e.indexOf(el);
      $(el).parent().e[0].removeChild(el);
      return match;
    }
    return ~$(selector, $(el).parent().e[0]).e.indexOf(el);
  }) @>);
}
<?php else: ?>
filter: function(selector) {
  var match, tempParent;
  
  return (selector=='*') ? __PUSH_STACK_THIS__() : __PUSH_STACK__(<@ this.e.filter(function(el, idx){
    if (__IS_FUNCTION__(<@ selector @>)) {
      return selector.call(el, idx, el);
    }
    if (!el.parentNode) {
      tempParent = d.createElement("div");   // maybe tempParent = $("<div/>").e[0]; is shorter?
      tempParent.appendChild(el),
      match = ~$(selector, $(el).parent().e[0]).e.indexOf(el);
      tempParent.removeChild(el);
      return match;
    }
    return ~$(selector, $(el).parent().e[0]).e.indexOf(el);
  }) @>);
}
<?php endif; ?>
