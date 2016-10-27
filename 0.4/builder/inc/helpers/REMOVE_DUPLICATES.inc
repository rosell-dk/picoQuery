(a) {
  return a.filter(function(b,c){return a.indexOf(b) == c});
}

[[INLINE_VERSION]]
<?php if (isFeatureEnabled('jQuery.noConflict')): ?>
(function(a) {return a.filter(function(b,c){return a.indexOf(b) == c})})([[ARG1]])
<?php else: ?>
[[ARG1]].filter(function(b,c,d){return d.indexOf(b) == c})
<?php endif; ?>

