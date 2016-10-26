(a) {
  return a.filter(function(b,c){return a.indexOf(b) == c && b});
}

[[INLINE_VERSION]]
<?php if (isFeatureEnabled('jQuery.noConflict')): ?>
(function(a) {return a.filter(function(b,c){return a.indexOf(b) == c && b})})([[ARG1]])
<?php else: ?>
[[ARG1]].filter(function(b,c,d){return d.indexOf(b) == c && b})
<?php endif; ?>

