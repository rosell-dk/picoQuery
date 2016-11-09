(a) {
  // Not implemented...
  // This helper is supposed to always be inlined
}

[[INLINE_VERSION]]
<?php if (isFeatureEnabled('pushStack')): ?>
z = [[ARG1]];z.prevObject = this;return z;

<?php else: ?>
return [[ARG1]]
<?php endif; ?>

