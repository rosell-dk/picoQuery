(a) {
  // Not implemented...
  // This helper is supposed to always be inlined
}

[[INLINE_VERSION]]
<?php if (isFeatureEnabled('pushStack')): ?>
this.pushStack(this.e)
<?php else: ?>
this
<?php endif; ?>

