var bid = '';

var FULL=0, PARTIAL=1, NONE=2;
var onLiveServer = (location.host == 'picoquery.com');
var useCDN = onLiveServer;

var general_meta = {
  'arraylike': [
    'Array-like',
    'Make our picoQuery object array-like, in the sense that it is accessible with [], and it has a "length" property'
  ],
  'builderurl': [
    'Add builder url',
    'Adds comment in top of the code with an url to this builder PLUS a string which uniquely describes the selected build options. This enables you to easily change the build in the future, where you may need to extend the selection of methods. Just follow the link, and the builder will initialize with those build options, which was selected for that build'
  ],
  'fallback': [
    'Fallback to jQuery',
    'Make picoQuery automatically fall back to jQuery for unsupported browsers'
  ],
}

var methods_meta = {
  'add': [
    'http://api.jquery.com/add/',
    [
      ['.add( selector ) => jQuery', PARTIAL, 'jQuery sorts it in Document order. picoQuery does not do any sorting (it will in future release)'],
      ['.add( elements ) => jQuery', PARTIAL, 'see above'],
      ['.add( html ) => jQuery', PARTIAL, 'see above'],
      ['.add( selection ) => jQuery', PARTIAL, 'see above'],
      ['.add( html ) => jQuery', PARTIAL, 'see above'],
      ['.add( selection, context ) => jQuery', PARTIAL, 'see above'],
    ]
  ],
  'addClass': [
    'http://api.jquery.com/addClass/',
    [
      ['.addClass( className ) => jQuery', FULL],
      ['.addClass( function ) => jQuery', FULL],
    ]
  ],
  'after': [
    'http://api.jquery.com/after/',
    [
      ['.after( content ) => jQuery', FULL],
      ['.after( content, content, ... ) => jQuery', FULL],
      ['.after( function ) => jQuery', FULL],
      ['.after( function-html ) => jQuery', FULL],
    ]
  ],
  'append': [
    'http://api.jquery.com/append/',
    [
      ['.append( content ) => jQuery', FULL],
      ['.append( content, content, ... ) => jQuery', FULL],
      ['.append( function ) => jQuery', FULL],
    ]
  ],
  'appendTo': [
    'http://api.jquery.com/appendTo/',
    [
      ['.appendTo( target ) => jQuery', FULL],
    ]
  ],
  'attr': [
    'http://api.jquery.com/attr/',
    [
      ['.attr( attributeName ) => String', FULL],
      ['.attr( attributeName, value ) => jQuery', FULL],
      ['.attr( attributes ) => jQuery', FULL],
      ['.attr( attributeName, function ) => jQuery', FULL],
    ]
  ],
  'before': [
    'http://api.jquery.com/before/',
    [
      ['.before( content ) => jQuery', FULL],
      ['.before( content, content, ... ) => jQuery', FULL],
      ['.before( function ) => jQuery', FULL],
      ['.before( function-html ) => jQuery', FULL],
    ]
  ],
  'children': [
    'http://api.jquery.com/children/',
    [
      ['.children( [selector] ) => jQuery', FULL],
    ]
  ],
  'click': [
    'http://api.jquery.com/click/',
    [
      ['.click( handler ) => jQuery', PARTIAL, 'See .on() method for compliance notes'],
      ['.click( eventData, handler ) => jQuery', PARTIAL, 'See .on() method for compliance notes'],
      ['.click() => jQuery', PARTIAL, 'See .on() method for compliance notes'],
    ]
  ],
  'closest': [
    'http://api.jquery.com/closest/',
    [
      ['.closest( selector ) => jQuery', FULL],
      ['.closest( selector, context ) => jQuery', FULL],
      ['.closest( selection ) => jQuery', FULL],
      ['.closest( element ) => jQuery', FULL],
    ]
  ],
  'clone': [
    'http://api.jquery.com/clone/',
    [
      ['.clone( [withDataAndEvents], [deepWithDataAndEvents] ) => jQuery', PARTIAL, 'Data and events are not cloned'],
    ]
  ],
  'css': [
    'http://api.jquery.com/css/',
    [
      ['.css( propertyName ) => String', PARTIAL, 'jQuery has quite a few "cssHooks" which handles certain css properties in specific ways. These are not supported. Also, automatic using vendor prefixed version when available is not supported.' ],
      ['.css( propertyNames ) => String', NONE],
      ['.css( propertyName, value ) => jQuery', PARTIAL, 'No cssHooks or automaticly using vendor prefixes. Also, we do not add "px" to any numbers .css("width", "123") sets width to 123px in jQuery, but not in picoQuery'],
      ['.css( propertyName, function ) => jQuery', NONE],
      ['.css( properties ) => jQuery', NONE],
    ]
  ],
  'data': [
    'http://api.jquery.com/data/',
    [
      ['.data( key, value ) => jQuery', PARTIAL, 'Complies, but risk for memoryleak'],
      ['.data( obj ) => jQuery', PARTIAL, 'Complies, but risk for memoryleak'],
      ['.data( key ) => Object', FULL],
      ['.data( ) => Object', FULL],
    ]
  ],
  'each': [
    'http://api.jquery.com/each/',
    [
      ['.each( function ) => jQuery', FULL],
    ]
  ],
  'empty': [
    'http://api.jquery.com/empty/',
    [
      ['.empty() => jQuery', FULL],
    ]
  ],
  'eq': [
    'http://api.jquery.com/eq/',
    [
      ['.eq( index ) => jQuery', FULL],
      ['.eq( indexFromEnd ) => jQuery', FULL],
    ]
  ],
  'filter': [
    'http://api.jquery.com/filter/',
    [
      ['.filter(selector) => jQuery', FULL, 'Note though, as with all selectors in picoQuery, only standard CSS3 selectors are supported. The special JQuery selectors, such as ":button", etc are not supported'],
      ['.filter(elements) => jQuery', FULL],
      ['.filter(selection) => jQuery', FULL],
      ['.filter(function) => jQuery', NONE],
    ],
  ],
  'find': [
    'http://api.jquery.com/find/',
    [
      ['.find( selector [String] ) => jQuery', FULL],
      ['.find( selector [jQuery] ) => jQuery', FULL],
      ['.find( selector [Element] ) => jQuery', FULL],
    ],
  ],
  'first': [
    'http://api.jquery.com/first/',
    [
      ['.first() => jQuery', FULL],
    ],
  ],
  'focus': [
    'http://api.jquery.com/focus/',
    [
      ['.focus( handler ) => jQuery', PARTIAL, 'See .on() method for compliance notes'],
      ['.focus( eventData, handler ) => jQuery', PARTIAL, 'See .on() method for compliance notes'],
      ['.focus() => jQuery', PARTIAL, 'See .on() method for compliance notes'],
    ]
  ],
  'get': [
    'http://api.jquery.com/get/',
    [
      ['.get( index ) => Element', FULL],
      ['.get( ) => Elements', FULL],
    ],
  ],
  'hasClass': [
    'http://api.jquery.com/hasClass/',
    [
      ['.hasClass( className ) => Boolean', FULL],
    ],
  ],
  'hide': [
    'http://api.jquery.com/hide/',
    [
      ['.hide( ) => jQuery', FULL],
      ['.hide( [ duration ][, complete ] ) => jQuery', NONE],
      ['.hide( options ) => jQuery', NONE],
      ['.hide( [ duration ][, easing][, complete ] ) => jQuery', NONE],
    ],
  ],
  'html': [
    'http://api.jquery.com/html/',
    [
      ['.html() => String', FULL],
      ['.html( htmlString ) => jQuery', FULL],
      ['.html( function) => jQuery', FULL],
    ]
  ],
  'insertAfter': [
    'http://api.jquery.com/insertAfter/',
    [
      ['.insertAfter( target ) => jQuery', FULL],
    ]
  ],
  'insertBefore': [
    'http://api.jquery.com/insertBefore/',
    [
      ['.insertAfter( target ) => jQuery', FULL],
    ]
  ],
  'jQuery.camelCase': [
    '',
    [
      ['jQuery.camelCase( string ) => String', FULL],
    ]
  ],
  'jQuery.data': [
    'http://api.jquery.com/jQuery.data/',
    [
      ['jQuery.data( element, key, value ) => jQuery', PARTIAL, 'Complies, but risk for memoryleak'],
      ['jQuery.data( element, obj ) => jQuery', PARTIAL, 'Complies, but risk for memoryleak'],
      ['jQuery.data( element, key ) => Object', FULL],
      ['jQuery.data( element ) => Object', FULL],
    ]
  ],
  'jQuery.merge': [
    'http://api.jquery.com/jQuery.merge/',
    [
      ['jQuery.merge( first, second ) => Array', FULL],
    ]
  ],
  'jQuery.noConflict': [
    'http://api.jquery.com/jQuery.noConflict/',
    [
      ['jQuery.noConflict() => jQuery', FULL],
      ['jQuery.noConflict( removeAll ) => jQuery', NONE],
    ]
  ],
  'keyup': [
    'http://api.jquery.com/keyup/',
    [
      ['.keyup( handler ) => jQuery', PARTIAL, 'See .on() method for compliance notes'],
      ['.keyup( [eventData], handler ) => jQuery', PARTIAL, 'See .on() method for compliance notes'],
      ['.keyup() => jQuery', PARTIAL, 'See .on() method for compliance notes'],
    ]
  ],
  'last': [
    'http://api.jquery.com/last/',
    [
      ['.last( ) => jQuery', FULL],
    ]
  ],
  'map': [
    'http://api.jquery.com/map/',
    [
      ['.map( callback ) => jQuery', FULL],
    ]
  ],
  'next': [
    'http://api.jquery.com/next/',
    [
      ['.next( [selector] ) => jQuery', FULL, 'Note though, as with all selectors in picoQuery, only standard CSS3 selectors are supported. The special JQuery selectors, such as ":button", etc are not supported'],
    ]
  ],
  'on': [
    'http://api.jquery.com/on/',
    [
      ['.on( events, handler ) => jQuery', PARTIAL, 'Multiple events are NOT SUPPORTED - only one event name may be specified. Namespaces such as "keydown.myPlugin" are not supported. Event propagation may not be correct'],
      ['.on( events ) => jQuery', PARTIAL, 'Same restrictions as above apply'],
      ['.on( events, data, handler ) => jQuery', PARTIAL, 'Same restrictions as above apply'],
      ['.on( events, selector, data , handler ) => jQuery', NONE],
      ['.on( events, selector, handler ) => jQuery', NONE],
      ['.on( events, selector, data ) => jQuery', NONE],
    ]
  ],
  'offset': [
    'http://api.jquery.com/offset/',
    [
      ['.offset( ) => Object', FULL, ''],
      ['.offset( coordinates ) => jQuery', NONE, ''],
      ['.offset( function ) => jQuery', NONE, ''],
    ]
  ],
  'offsetParent': [
    'http://api.jquery.com/offsetParent/',
    [
      ['.offsetParent( ) => jQuery', FULL, ''],
    ]
  ],
  'parent': [
    'http://api.jquery.com/parent/',
    [
      ['.parent( [selector] ) => jQuery', FULL, 'Note though, as with all selectors in picoQuery, only standard CSS3 selectors are supported. The special JQuery selectors, such as ":button", etc are not supported'],
    ]
  ],
  'prepend': [
    'http://api.jquery.com/prepend/',
    [
      ['.prepend( content [,content] ) => jQuery', FULL],
      ['.prepend( function ) => jQuery', FULL],
    ]
  ],
  'prependTo': [
    'http://api.jquery.com/prependTo/',
    [
      ['.prependTo( target ) => jQuery', FULL],
    ]
  ],
  'prev': [
    'http://api.jquery.com/prev/',
    [
      ['.prev( [selector] ) => jQuery', FULL, 'Note though, as with all selectors in picoQuery, only standard CSS3 selectors are supported. The special JQuery selectors, such as ":button", etc are not supported'],
    ]
  ],
  'ready': [
    'http://api.jquery.com/ready/',
    [
      ['.ready( handler ) => jQuery', FULL, ],
    ],
  'This is not just an alias for .on("DOMContentLoaded"). As in jQuery, handler is also called in cases where the DOMContentLoaded event has already fired at the time this method is called'
  ],
  'remove': [
    'http://api.jquery.com/remove/',
    [
      ['.remove( ) => jQuery', FULL, ],
      ['.remove( selector ) => jQuery', FULL, ],
    ],
  'This is not just an alias for .on("DOMContentLoaded"). As in jQuery, handler is also called in cases where the DOMContentLoaded event has already fired at the time this method is called'
  ],
  'removeAttr': [
    'http://api.jquery.com/removeAttr/',
    [
      ['.removeAttr( attributeName ) => jQuery', FULL],
    ]
  ],
  'removeClass': [
    'http://api.jquery.com/removeClass/',
    [
      ['.removeClass( className ) => jQuery', FULL],
      ['.removeClass( ) => jQuery', FULL],
      ['.removeClass( function ) => jQuery', FULL],
    ]
  ],
  'replaceWith': [
    'http://api.jquery.com/replaceWith/',
    [
      ['.replaceWith( newContent ) => jQuery', FULL],
      ['.replaceWith( function ) => jQuery', FULL],
    ]
  ],
  'show': [
    'http://api.jquery.com/show/',
    [
      ['.show( ) => jQuery', FULL],
      ['.show( [ duration ][, complete ] ) => jQuery', NONE],
      ['.show( options ) => jQuery', NONE],
      ['.show( [ duration ][, easing][, complete ] ) => jQuery', NONE],
    ],
  ],
  'text': [
    'http://api.jquery.com/text/',
    [
      ['.text( ) => String', FULL],
      ['.text( text ) => jQuery', FULL],
      ['.text( function ) => jQuery', FULL],
    ]
  ],
  'trigger': [
    'http://api.jquery.com/trigger/',
    [
      ['.trigger( eventType ) => jQuery', FULL],
      ['.trigger( eventType, extraParameters ) => jQuery', NONE],
    ]
  ],


}


/*
function versionChanged() {
//TODO  loadBuildOptions();
  $('#buildoptions').empty();

  var tokens = bid.split('-');
  tokens[0] = $('#version_selector').val();

  setBuildId(tokens.join('-'));
}*/

var version = location.pathname.match(/builder\/(\d\.\d\.\d)/)[1];

function populateOptionsPanel(buildoptions) {
//alert(JSON.stringify(buildoptions));
//console.log(buildoptions);
  buildoptions.sort(function (a, b) {
    if (a.nameid < b.nameid) {
      return -1;
    }
    if (a.nameid > b.nameid) {
      return 1;
    }
    return 0;
  });

  // General options
  for (var i=0; i<buildoptions.length; i++) {
    var buildoption = buildoptions[i];
    if (buildoption['is_method']) continue;
    var index = buildoption['index']+1;
    var label = buildoption['nameid'];
    var meta = general_meta[buildoption['nameid']];
    if (meta) {
      label = meta[0];
    }
    
    var html = '<div class="buildoption" nameid=""><input id="buildoption_' + index + '" type="checkbox" value="' + index + '" default_enabled="true"></input><label for="buildoption_' + index + '">' + label + '</label>';

    if (meta && meta[1]) {
      var helpicon = '<span class="icon-info"></span>';
      html += '<div class="help-icon">' + helpicon + '</div><div class="helptext">' + meta[1] + '</div></div>'
    }

    $('#general').append(html);
  }

  // Methods
  for (var i=0; i<buildoptions.length; i++) {
    var buildoption = buildoptions[i];
    if (!buildoption['is_method']) continue;

    var index = buildoption['index']+1;
//alert(name);
//    $('#buildoptions').append('<div class="buildoption"><input name="buildoption-' + i + '" type="checkbox"/>' + buildoption['id'] + '</div>');
//    $('#buildoptions').append('<div class="buildoption"><input id="buildoption_' + (buildoption['index']+1) + '" type="checkbox" value="' + (buildoption['index']+1) + '"></input><label for="buildoption_' + (i+1) + '">' + buildoption['nameid'] + '</label><div class="help-icon">?</div></div>');
    var helptext = '';
    meta = methods_meta[buildoption['nameid']];
    if (meta) {
      var signatures = meta[1];
    }
    if (signatures) {
//      helptext += meta[0];
      var sigmap = [];
      for (var j=0; j<signatures.length; j++) { 
        var signature = signatures[j];
        if (!sigmap[signature[1]]) {
          sigmap[signature[1]] = [];
        }
        sigmap[signature[1]].push(signature);
      }
      for (var j=0; j<sigmap.length; j++) {
        if (!sigmap[j]) continue;
        helptext += '<div class="signatures">';
        helptext += '<h4>';
        switch (j) {
          case FULL:
            helptext += 'Fully supported signatures:';
            break;
          case PARTIAL:
            helptext += 'Partially supported signatures:';
            break;
          case NONE:
            helptext += 'Unsupported signatures:';
            break;        
        }
        helptext += '</h4>';
        for (var k=0; k<sigmap[j].length; k++) {
          var signature = sigmap[j][k];
          helptext += '<span class="signature">';
          helptext += signature[0];
          if (j == PARTIAL) {
//            helptext += '<img src="ui/help.svg" width="15" height="15"/>';
          }
          helptext += '</span>';
          if (signature[2]) {
            helptext += '<span class="note">' + signature[2] + '</span>';
          }
        }
        helptext += '</div>';
      }
      if (meta && meta[2]) {
        helptext += '<div class="notes">' + meta[2] + '</div>';
      }
    }
    var label = buildoption['nameid'] + '()';
    if (label.indexOf('jQuery') != 0) {
      label = '.' + label;
    }

    var html = '<div class="buildoption" nameid=""><input id="buildoption_' + index + '" type="checkbox" value="' + index + '"></input><label for="buildoption_' + index + '">' + label + '</label>';
    if (meta) {

      var warn = (sigmap[PARTIAL] || sigmap[NONE]);
      var helpicon;
      if (warn) {
//        helpicon = '<img src="ui/warn.svg"/>';
        helpicon = '<span class="icon-warning"></span>';
//        helpicon = '<span class="icon-warning2"></span>';
//        helpicon = '<span class="incomplete">info</span>';
      }
      else {
//        helpicon = '<span class="complete">info</span>';
//        helpicon = '<img src="ui/help.svg"/>';
        helpicon = '<span class="icon-info"></span>';
//        helpicon = '<span class="icon-info"></span>';
      }
      helpicon = '<a href="' + meta[0] + '" target="_blank">' + helpicon + '</a>';

      html += '<div class="help-icon' + (warn?' warning':'') + '">' + helpicon + '</div><div class="helptext">' + helptext + '</div></div>'
    }
    $('#methods').append(html);
  }
//  $('.buildoption:first-child > input').attr('checked', 'checked');

//  $('#popup').css('top', $(this).offset().top);

  $('.buildoption').change(generateCode);

  $('.buildoption .help-icon').hover(function() {
    $(this).parent('div').find('.helptext').show();
  }, function() {
    $(this).parent('div').find('.helptext').hide();
  });

/*
  $('.buildoption .help-icon').hover(function(e) {
    $buildoption = $(this).parent('div');
    $('#popup h4').text($buildoption.find('label').text());
    $('#popup pre').text('');
    $('#popup').show();
    var filename = $buildoption.find('label').text().replace(/\.|\(|\)/g, '');
    var jqXHR = $.ajax( $('#version_selector').val() + '/api.php?method=' + filename, {'dataType': 'text'} )
    .done(function() {
      $('#popup pre').text(jqXHR.responseText);
    })
    .fail(function() {
    })


  }, function () {
  });*/
//alert($('.buildoption')[0]);
}


function buildBuildId() {

  // Version
//  var v = $('#version_selector').val();


/*
  This is commented out, because it does not fill in gaps,
  if for example a build option will be removed, we would have a problem

  function calculateHexFromCheckboxes($checkboxes) {
    var flags = '';
    $checkboxes.each(function() {
      flags += ($(this).is(':checked') ? '1' : '0');
    });
    // convert flags to hex
    var hex = '';
    for (var i=0; i<flags.length; i+=4) {
      var fourflags = flags.substr(i, 4).split('').reverse().join('');
      hex += parseInt(fourflags, 2).toString(16);
    }
    return hex;
  }*/
  function calculateHexFromCheckboxes($checkboxes) {
    var flags = [];
    var maxI = 0;
    $checkboxes.each(function() {
      var i = $(this).val() - 1;
      maxI = Math.max(i, maxI);

      var invertFlag = ($(this).attr('default_enabled') == 'true');
      if (invertFlag^$(this).is(':checked')) {
        flags[i] = '1';
      }
//      flags += ($(this).is(':checked') ? '1' : '0');
    });
    for (var i=0; i<maxI; i++) {
      if (flags[i] != '1') {
        flags[i] = '0';
      }
    }


    // convert flags to hex string
    var hex = '';
    for (var i=0; i<flags.length; i+=4) {
      var fourflags = flags.slice(i, i+4).reverse().join('');
      hex += parseInt(fourflags, 2).toString(16);
    }
    return hex;
  }

  function dec2base64(dec) {
    function chr(charCode) {
      return String.fromCharCode(charCode);
    }
    function charCode(char) {
      return char.charCodeAt(0);
    }

    if (dec <= 9) {
      return chr(charCode('0') + dec);
    }
    if (dec <= 35) {
      return chr(charCode('a') + dec-10);
    }
    if (dec <= 61) {
      return chr(charCode('A') + dec-36);
    }
    if (dec == 62) {
      return '_';
    }
    if (dec == 63) {
      return '*';
    }
    return '?';
  }
  function calculateBase64FromCheckboxes($checkboxes) {
    var flags = [];
    var maxI = 0;
    $checkboxes.each(function() {
      var i = $(this).val() - 1;
      maxI = Math.max(i, maxI);

      var invertFlag = ($(this).attr('default_enabled') == 'true');
      if (invertFlag^$(this).is(':checked')) {
        flags[i] = '1';
      }
//      flags += ($(this).is(':checked') ? '1' : '0');
    });
    for (var i=0; i<maxI; i++) {
      if (flags[i] != '1') {
        flags[i] = '0';
      }
    }

    // convert flags to base64 string
    var result = '';
    for (var i=0; i<flags.length; i+=6) {
      var sixflags = flags.slice(i, i+6).reverse().join('');
      result += dec2base64(parseInt(sixflags, 2));
    }
    result = result.replace(/0*$/g,"")
    return result;
  }

  // Comments
//  var commentFlagsHex = calculateHexFromCheckboxes($('#commenting_panel .checkbox-list input'));
  
  // Minimizer
//  var minFlagsHex = calculateHexFromCheckboxes($('#minify_panel .checkbox-list input'));

  // Compactness
  var compactnessFlagsHex = '';

/*
  switch ($('input[name="compactness"]:checked').attr('value')) {
    case 'min':
      compactnessFlagsHex = '0';
      break;
    case 'optimized':
      compactnessFlagsHex = '3';
      break;
    case 'default':
      compactnessFlagsHex = '5';
      break;
    case 'devel':
      compactnessFlagsHex = '9';
      break;
  }
*/
  var ext = $('input[name="compactness"]:checked').attr('value');

  // buildoptions
//  var buildoptionsHex = calculateHexFromCheckboxes($('.buildoption > input'));
//  bid = compactnessFlagsHex + '-A' + buildoptionsHex;

  var buildoptions64 = calculateBase64FromCheckboxes($('.buildoption > input'));
  bid = 'B' + buildoptions64 + '.' + ext;

  

//  bid = v + '-' + commentFlagsHex + '-' + minFlagsHex + '-' + buildoptionsHex;
  return bid;
}

function setBuildId(buildId) {
  bid = buildId;

  function hexstr2flagsarray(hexstr, minLength) {
    var flags = [];
    var chars = hexstr
    for (var i=0; i<hexstr.length; i++) {
      var four_flags = parseInt(hexstr.charAt(i),16);
      for (var j=0; j<4; j++) {
        if ((four_flags & Math.pow(2, j)) > 0) {
          flags.push(true);
        }
        else {
          flags.push(false);
        }
      }
    }
    while (flags.length < minLength) {
      flags.push(false);
    }
    return flags;
  }

  function base64dec(char) {
    function charCode(char) {
      return char.charCodeAt(0);
    }
    var cc = char.charCodeAt(0);

    if ((cc >= charCode('0')) && (cc <= charCode('9'))) {
      return cc - charCode('0');
    }
    if ((cc >= charCode('a')) && (cc <= charCode('z'))) {
      return 10 + cc - charCode('a');
    }
    if ((cc >= charCode('A')) && (cc <= charCode('Z'))) {
      return 36 + cc - charCode('A');
    }
    if (char == '_') {
      return 62;
    }
    if (char == '*') {
      return 63;
    }
    return 0;
  }

  function base64str2flagsarray(str,minLength) {
    var flags = [];
    var chars = str
    for (var i=0; i<str.length; i++) {
      var six_flags = base64dec(str.charAt(i));
      for (var j=0; j<6; j++) {
        if ((six_flags & Math.pow(2, j)) > 0) {
          flags.push(true);
        }
        else {
          flags.push(false);
        }
      }
    }
    while (flags.length < minLength) {
      flags.push(false);
    }
    return flags;
  }

  /* Requires that the checkboxes has the "value" attributes set to 1, 2, 3, etc */
  function setCheckboxesByFlags($checkboxes, flags) {
    $checkboxes.each(function() {
      var i = parseInt($(this).val()) - 1;

      // If option is "default enabled", it means that the flag for this option
      // must be inverted
      var default_enabled = ($(this).attr('default_enabled') == 'true')
      $(this).prop('checked', default_enabled^(i<flags.length && flags[i]));
    });
  }

//  var tokens = buildId.split('-');
  var re = /(.*)\.(.*)/g
  var result = re.exec(buildId);
  var encodedOptionString = result[1];
  var ext = result[2];


  // Version
//  var version = tokens[0];
//  $('#version_selector').val(version);

  // Comments
//  var commentsFlags = hexstr2flagsarray(tokens[0], 2);
//  setCheckboxesByFlags($('#commenting_panel .checkbox-list input'), commentsFlags);

  // compactness
  $('input[name="compactness"][value="' + ext + '"]').prop("checked", true);


  // Minify
/*
  var minify = tokens[1];
  var minifyFlags = hexstr2flagsarray(minify, 1);
  setCheckboxesByFlags($('#minify_panel .checkbox-list input'), minifyFlags);*/

  // buildoptions

  var encoding = encodedOptionString[0];
  var code = encodedOptionString.substr(1);

  switch (encoding) {
    case 'A':
      var buildOptionFlags = hexstr2flagsarray(code, 0);
      break;
    case 'B':
      var buildOptionFlags = base64str2flagsarray(code, 0);
      break;
  }

//  function loadBuildOptions(v, cb) {
  function loadBuildOptions(cb) {
    var jqXHR = $.ajax('build-options-json.php', {'dataType': 'json'} )
    .done(function() {
      cb.call({}, jqXHR.responseJSON);
    })
    .fail(function() {
      alert('failed loading buildoptions for specified version');
    })
  }

//  loadBuildOptions(version, function(responseJSON) {
  loadBuildOptions(function(responseJSON) {
    populateOptionsPanel(responseJSON);
    setCheckboxesByFlags($('.buildoption input'), buildOptionFlags);
    generateCode();
  });
}

function getSizeString(sizeInBytes) {
  return sizeInBytes + ' bytes';
//  return (sizeInBytes > 1024 ? '<span title="' + sizeInBytes +' bytes">' + (Math.round(sizeInBytes / 1024 * 10) / 10) + ' kb</span>' : sizeInBytes + ' bytes');
}

function generateCode() {
//alert('generating code...');
  var buildId = buildBuildId();

  var filename = 'picoquery-' + version + '-' + buildBuildId();

  var localBuildUrl = 'build.php?bid=' + buildId;
  var localBuildUrlSrc = '/src/' + filename;
  var cdnUrl = 'http://cdn.picoquery.com/' + filename;
  var cdnUrlProxy = 'get-build-from-cdn.php?filename=' + filename;

  var urlLink = (useCDN ? cdnUrl : localBuildUrlSrc);
  var buildUrl = (useCDN ? cdnUrlProxy : localBuildUrl);


  $('#code').html('...building...');
  $('#code-link').attr('href', urlLink);
  $('#code-url').val(urlLink);
  $('#compliancetest-link').attr('href', '/lab/compliance-test/?frameworks=jquery-1.12.4.min.js,' + filename);


  var jqXHR = $.ajax({
    url: buildUrl,
    dataType: "text"
  })
  .done(function() {

    $('#code').html(jqXHR.responseText);

    var compressedSize = parseInt(jqXHR.getResponseHeader('Content-Length'),10);
    var uncompressedSize = jqXHR.responseText.length;
    $('#code_size').html('(' + getSizeString(compressedSize) + ' gzipped) <span style="font-size:9px;">(' + getSizeString(uncompressedSize) + ' uncompressed - but remember, <a style="color:black" href="https://www.tjvantoll.com/2014/01/27/only-the-gzip-size-matters/">only the gzip size matters</a>)</span>');

    $('#code-warning').html('');

  })
  .fail(function( jqXHR, textStatus, errorThrown) {
//    alert('failed generating picoquery.js');
    $('#code-warning').html(textStatus + ': ' + errorThrown);
    $('#code').html(jqXHR.responseText);
  })
}

function positionElements() {
  var h = $(window).height() - $('#methods').offset().top - 30;
  console.log(h);
  $('#methods').css('height', h);
}
$(document).ready(function() {

  $('body > h1').text('picoQuery builder v'+ version);
  if (!useCDN) {
    $('#url_panel > h3:first-child').text('Url');
  }
/*
  $('#compactness_slider').slider({
    range: "max",
    min: 1,
    max: 4,
    value: 2,
    slide: function(event, ui) {
      alert(ui.value);
    }
  });
*/

/*
  $('<div id="popup"><h4>Bla</h4><pre></pre></div>').appendTo($('body'));

  $('#popup').hover(function() {}, function (){
    $('#popup').hide();
  }); 
  $('.buildoption label').hover(function() {
    $('#popup').hide();
    }, function (){
  }); 

  $(document).keyup(function (e) {
    if (e.keyCode === 27) { // Esc
      $('#popup').hide();
    }
  });
  $(document).click(function(e) {
    if ($(e.target).parents('#popup').length == 0) {
      $('#popup').hide();
    }
  });

  $('#version_selector').on('change', versionChanged);
*/

  $('[name="compactness"]').on('change', function() {
//    alert('t');
//    $('.buildoption input').prop('checked', $(this).is(':checked'));
    generateCode();
  });

  $('#commenting_panel .checkbox-list input').on('change', generateCode);
  $('#minify_panel .checkbox-list input').on('change', generateCode);

  $('#select_all_methods').on('change', function() {
//    alert('t');
    $('#methods .buildoption input').prop('checked', $(this).is(':checked'));
    generateCode();
  }).prop('checked', false);  // http://api.jquery.com/prop/ */


  // Builder URL, format #1: http://picoquery.com/builder/0.2/?5-2fa0
  // Builder URL, format #2: http://picoquery.com/builder/0.2/?addClass-css.min.js

  if ((location.search) && (location.search.indexOf('?') == 0)) {
//      alert(location.search.charAt(1));
    setBuildId(location.search.substr(1));
  }
  else {
    setBuildId('B0.js');
  }


//  positionElements();
//  $(window).on('resize', positionElements)

});
