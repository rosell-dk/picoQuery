<?php


$feature_nameids = array('addClass', 'css', 'get', 'each', 'append', 'appendTo', 'first', 'on', 'removeClass', 'trigger', 'click', 'focus', 'keyup', 'hide', 'ready');

$event_methods_standard = array('click', 'focus', 'keyup');

function getFeatureNameIdByIndex($feature_index) {
  global $feature_nameids;
  return $feature_nameids[$feature_index];
}

$features_by_nameid = array();
foreach ($feature_nameids as $index => $feature_nameid) {
  $features_by_nameid[$feature_nameid] = array(
    'index' => $index,
    'nameid' => $feature_nameid,
    'enabled' => FALSE
  );
}

function enableFeatureByNameId($feature_nameid) {
  global $features_by_nameid;
  $features_by_nameid[$feature_nameid]['enabled'] = TRUE;
}

function enableFeatureByIndex($feature_index) {
  enableFeatureByNameId(getFeatureNameIdByIndex($feature_index));
}

function isFeatureEnabled($feature_nameid) {
  global $features_by_nameid;
//print_r($features_by_nameid);
  return $features_by_nameid[$feature_nameid]['enabled'];
}

/*
$features = array();
foreach ($feature_names as $i=>$feature_name) {
  $features[] = array('index'=> $i, 'id'=>$feature_name);
}

$features_by_id = array();
foreach ($features as $i => $feature_obj) {
  $enabled = (isset($features_to_include[$i]) && $features_to_include[$i]);
//  $features_by_id[$feature_id] = array('enabled' => $enabled);

  $feature_obj['enabled'] = $enabled;
  $features_by_id[$feature_obj['id']] = $feature_obj;

//  $features_by_id[$feature_obj['id']]['enabled'] = $enabled;
}

function feat($feature_id) {
  global $features_by_id;
  return $features_by_id[$feature_id]['enabled'];
}
*/



/*
$features = array(
  array(
    'id' => '.addClass()',
    'description' => 'Adds the specified class(es) to each element in the set of matched elements.',
    'jquery_link' => 'http://api.jquery.com/addClass/',
  ),
  array(
    'id' => '.css()',
    'description' => 'Get the value of a computed style property for the first element in the set of matched elements or set one or more CSS properties for every matched element.',
    'jquery_link' => 'http://api.jquery.com/css/',
  ),
  array(
    'id' => '.get()',
    'description' => 'Retrieve the DOM elements matched by the jQuery object.',
    'jquery_link' => 'http://api.jquery.com/get/',
  ),
  array(
    'id' => '.each()',
    'description' => 'Iterate over a jQuery object, executing a function for each matched element.',
    'jquery_link' => 'http://api.jquery.com/each/',
  // .each( function )
  //  function
  //  Type: Function( Integer index, Element element )
  //  A function to execute for each matched element.
  //  

  ),
  array(
    'id' => '.append()',
    'description' => 'Insert content, specified by the parameter, to the end of each element in the set of matched elements.',
    'jquery_link' => 'http://api.jquery.com/append/',
  /* .append( content [, content ] )
        content
        Type: htmlString or Element or Array or jQuery
        DOM element, array of elements, HTML string, or jQuery object to insert at the end of each element in the set of matched elements.
     http://api.jquery.com/append/#append-content-content

     http://api.jquery.com/append/#append-function

     Dependencies: 
  *//*
  ),
  array(
    'id' => '.appendTo()',
    'description' => 'Insert every element in the set of matched elements to the end of the target.',
    'jquery_link' => 'http://api.jquery.com/appendTo/',
    'signatures' => array(
      array(
        'signature' => '.appendTo( target )',
        'return' => 'picoQuery',
        'params' => array(
          array(
            'target' => array(
              'type' => 'Selector or htmlString or Element or Array or jQuery',
              'description' => 'A selector, element, HTML string, array of elements, or jQuery object; the matched set of elements will be inserted at the end of the element(s) specified by this parameter.',
            )
          )
        )
      )
    ),
  ),
  array(
    'id' => '.first()',
    'description' => 'Reduce the set of matched elements to the first in the set.',
    'jquery_link' => 'http://api.jquery.com/first/',
  ),
  array(
    'id' => '.on()',
    'description' => 'Attach an event handler function for one or more events to the selected elements',
    'jquery_link' => 'http://api.jquery.com/on/',
  ),
  array(
    'id' => '.removeClass()',
    'description' => 'Remove a single class, multiple classes, or all classes from each element in the set of matched elements.',
    'jquery_link' => 'http://api.jquery.com/removeClass/',
  ),
  array(
    'id' => '.trigger()',
    'description' => 'Execute all handlers and behaviors attached to the matched elements for the given e',
    'jquery_link' => 'http://api.jquery.com/trigger/',
  ),
  array(
    'id' => '.click()',
    'description' => 'Bind an event handler to the "click" JavaScript event, or trigger that event on an element.',
    'jquery_link' => 'http://api.jquery.com/click/',
  ),
  array(
    'id' => '.focus()',
    'description' => 'Bind an event handler to the "focus" JavaScript event, or trigger that event on an element.',
    'jquery_link' => 'http://api.jquery.com/focus/',
  ),
  array(
    'id' => '.keyup()',
    'description' => 'Bind an event handler to the "keyup" JavaScript event, or trigger that event on an element.',
    'jquery_link' => 'http://api.jquery.com/keyup/',
  ),
  array(
    'id' => '.hide()',
    'description' => 'Hide the matched elements.',
    'jquery_link' => 'http://api.jquery.com/hide/',
    'notes' => 'Partial implementation of jQuery hide. No effects, and initial display value is not remembered',
  ),
  array(
    'id' => '.ready()',
  ),
);
/*
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
*/
?>
