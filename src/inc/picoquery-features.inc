<?php

$features = array(
  '.addClass()',
  '.css()',
  '.get()',
  '.each()',
  '.append()',
  '.appendTo()',
  '.first()',
  '.on()',
  '.removeClass()',
  '.trigger()',
  '.click()',
  '.focus()',
  '.keyup()',
  '.hide()',
);

$partial_compliance_optimizations = array(
  '.append()' => array(
    array(
      'signature_affected' => array('.append( content [, content ] )'),
      'title' => 'Disable support for multiple content arguments.',
      'description' => 'With this optimization, .append( content [, content ] ) will only support one argument. The signature will be: .append( content )',
    ),
    array(
      'signatures_affected' => array('append (function)'),
      'title' => 'Disable support for append (function)',
      'description' => 'With this optimization, .append( function ) will not be supported',
    ),    
  ),
  '.on()' => array(
    array(
      'signatures_affected' => array(
        '.on( events [, selector ] [, data ], handler )',
        '.on( events [, selector ] [, data ] )',
      ),
      'title' => 'Disable support for the optional [selector] argument',
      'description' => '',
    ),
    array(
      'signatures_affected' => array(
        '.on( events [, selector ] [, data ], handler )',
        '.on( events [, selector ] [, data ] )',
      ),
      'title' => 'Disable support for the optional [data] argument',
      'description' => '',
    ),
  ) 
);

$feature_list_internal = array(
  '_ev',
  '_e'
);

$dependencies = array(
  'appendTo' => array('append'),
  'click' => array('on', '_ev')
);

?>

