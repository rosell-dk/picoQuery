<?php 
$hasPrivData0 = isFeatureEnabled('data');
$hasPrivData1 = isFeatureEnabled('toggle') || (isFeatureEnabled('hide') && isFeatureEnabled('show'));
$hasPrivData2 = isFeatureEnabled('on');
$hasPublicData = isFeatureEnabled('data') || isFeatureEnabled('jQuery.data');
$hasPrivateData = $hasPrivData0 || $hasPrivData1 || $hasPrivData2;
?>
(a) {
<?php if ($hasPrivateData || $hasPublicData): ?>
//    var elems = [[ARG1]].getElementsByTagName("*");
    var elems = [a];
    Array.prototype.push.apply(elems,a.getElementsByTagName("*"));
    for (z=0; elems[z] != null; z++ ) {
//      console.log('cleaning data:', elems[z]);
      if (elems[z]['__picoquerydata'] && elems[z]['__picoquerydata'][2]) {
        elems[z]['__picoquerydata'][2].forEach(function(obj) {
          elems[z].removeEventListener(obj.t, obj.h);
        });
      }
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
      if (elems[z]['__picoquerydata'] && elems[z]['__picoquerydata'][2]) {
//        console.log('removing event handlers...');
        elems[z]['__picoquerydata'][2].forEach(function(obj) {
//          console.log('removing ' + obj.type + ' handler', obj.handler);
          elems[z].removeEventListener(obj.t, obj.h);
        });
      }

      elems[z].__picoquerydata = <?php if ($hasPublicData): ?>elems[z]._picoquerydata = <?php endif; ?>void 0;
    }
<?php endif; ?>


