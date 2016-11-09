<?php 
$hasPrivData0 = isFeatureEnabled('data');
$hasPrivData1 = isFeatureEnabled('toggle') || (isFeatureEnabled('hide') && isFeatureEnabled('show'));
$hasPublicData = isFeatureEnabled('data') || isFeatureEnabled('jQuery.data');
$hasPrivateData = $hasPrivData0 || $hasPrivData1;
?>
(a) {
<?php if ($hasPrivateData || $hasPublicData): ?>
//    var elems = [[ARG1]].getElementsByTagName("*");
    var elems = [a];
    Array.prototype.push.apply(elems,a.getElementsByTagName("*"));
    for (z=0; elems[z] != null; z++ ) {
//      console.log('cleaning data:', elems[z]);
      elems[z].__picoquerydata = <?php if ($hasPublicData): ?>elems[z]._picoquerydata = <?php endif; ?>void 0;
    }
<?php endif; ?>
}

[[INLINE_VERSION]]
<?php if ($hasPrivateData || $hasPublicData): ?>
    var elems = [[[ARG1]]];
    Array.prototype.push.apply(elems,[[ARG1]].getElementsByTagName("*"));
    for (z=0; elems[z] != null; z++ ) {
//      console.log('cleaning data:', elems[z]);
      elems[z].__picoquerydata = <?php if ($hasPublicData): ?>elems[z]._picoquerydata = <?php endif; ?>void 0;
    }
<?php endif; ?>


