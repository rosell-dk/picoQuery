(a) {
  // Not implemented...
  // This helper is supposed to always be inlined
}

[[INLINE_VERSION]]
<?php if (isFeatureEnabled('pushStack')): ?>
this.pushStack([[ARG1]])
<?php else: ?>
$([[ARG1]])
<?php endif; ?>

