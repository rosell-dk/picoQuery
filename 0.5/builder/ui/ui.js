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
    
    var html = '<div class="buildoption"><input id="buildoption_' + index + '" type="checkbox" value="' + index + '" default_enabled="true" data-name-id="' + buildoption['nameid'] + '"></input><label for="buildoption_' + index + '">' + label + '</label>';

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
    var label = buildoption['nameid'] + '()';
    if (label.indexOf('jQuery') != 0) {
      label = '.' + label;
    }

    var html = '<div class="buildoption"><input id="buildoption_' + index + '" type="checkbox" value="' + index + '" data-name-id="' + buildoption['nameid'] + '"></input><label for="buildoption_' + index + '">' + label + '</label>';

    $('#methods').append(html);
  }
//  $('.buildoption:first-child > input').attr('checked', 'checked');

//  $('#popup').css('top', $(this).offset().top);

  $('.buildoption').change(generateCode);

  $('.help-icon').hover(function() {
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

function buildBuildExt() {
  var readability = $('input[name="readability"]:checked').attr('value');
  var optimizeFor = $('input[name="optimizefor"]:checked').attr('value');
  var inlining = $('input[name="inlining"]:checked').attr('value');

  var ext = '';
  if (inlining != 'inline-optimal') {
    ext = inlining + '.';
  }
  if (optimizeFor == 'speed') {
    ext += 'speed.';
  }
  if (readability == 'production') {
    ext += 'min.';
  }
  ext += 'js';
  return ext;
}

function buildFlagsFromCheckboxes($checkboxes) {
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
  return flags;
}
function buildBuildId() {

  // Version
//  var v = $('#version_selector').val();

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
    var flags = buildFlagsFromCheckboxes($checkboxes);

    // convert flags to base64 string
    var result = '';
    for (var i=0; i<flags.length; i+=6) {
      var sixflags = flags.slice(i, i+6).reverse().join('');
      result += dec2base64(parseInt(sixflags, 2));
    }
    result = result.replace(/0*$/g,"")
    return result;
  }

  var $checkboxes = $('.buildoption > input');

  // buildoptions
  var buildoptions64 = calculateBase64FromCheckboxes($checkboxes);
  bid = 'B' + buildoptions64 + '.' + buildBuildExt();
  

//  bid = v + '-' + commentFlagsHex + '-' + minFlagsHex + '-' + buildoptionsHex;
  return bid;
}

function buildBuildIdAlt() {
//  console.log(window.buildoptions)

  var $checkboxes = $('.buildoption > input');

  // If all checkboxes are checked, return full
  if ($checkboxes.toArray().every(function(el) {
    return $(el).is(':checked');
  })) {
    return 'full.' + buildBuildExt();
  }


  var nameIds = [];
  $checkboxes.each(function() {
    var invert = ($(this).attr('default_enabled') == 'true');
    var checked = $(this).is(':checked');
    var nameIdEncoded = $(this).attr('data-name-id').replace('jQuery.', '~');
    if (checked && !invert) {
      nameIds.push(nameIdEncoded);
    }
    else if (!checked && invert) {
      nameIds.push('no' + nameIdEncoded);
    }
  });

  return nameIds.join('-') + '.' + buildBuildExt();
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

  var parts = buildId.split('.');
  var encodedOptionString = parts.shift();

  var inlining;
  switch (parts[0]) {
    case 'inline-all':
    case 'inline-once':
    case 'inline-never':
      inlining = parts[0]
      break;
    default:
      inlining = 'inline-optimal';
      parts.unshift('');
  }
  var optimizeFor;
  if (parts[1] == 'speed') {
    optimizeFor = 'speed';      
  }
  else {
    optimizeFor = 'size';
    parts.unshift('');
  }
  
  var readability;
  if (parts[2] == 'min') {
    readability = 'production';      
  }
  else {
    readability = 'human';
    parts.unshift('');
  }
  
  // inlining
  $('input[name="inlining"][value="' + inlining + '"]').prop("checked", true);

  // optimizefor
  $('input[name="optimizefor"][value="' + optimizeFor + '"]').prop("checked", true);

  // readability
  $('input[name="readability"][value="' + readability + '"]').prop("checked", true);


/*
  var re = /([^.]*)\.(.*)/g
  var result = re.exec(buildId);
  var encodedOptionString = result[1];
  var ext = result[2];

console.log(buildId);
console.log(ext);

  var re = /([^.]*)\.(.*)/g
  var ext_parts = re.exec(ext);
  var optimize_ext;
  if (ext_parts) {
    var inlining = ext_parts[1];
    switch (inlining) {
      case 'inline-all':
      case 'inline-once':
      case 'inline-never':
        optimize_ext = ext_parts[2];
        break;
      default:
        inlining = 'inline-optimal';
    }
  }
  else {
    optimize_ext = 'js';
    inlining = 'inline-optimal';
  }*/

  // Version
//  var version = tokens[0];
//  $('#version_selector').val(version);

  // Comments
//  var commentsFlags = hexstr2flagsarray(tokens[0], 2);
//  setCheckboxesByFlags($('#commenting_panel .checkbox-list input'), commentsFlags);



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
  var filenameAlt = 'picoquery-' + version + '-' + buildBuildIdAlt();

  var localBuildUrl = 'build.php?bid=' + buildId;
  var localBuildUrlSrc = '/src/' + filename;
  var localBuildUrlSrcAlt = '/src/' + filenameAlt;
  var cdnUrl = 'http://cdn.picoquery.com/' + filename;
  var cdnUrlAlt = 'http://cdn.picoquery.com/' + filenameAlt;

  var cdnUrlProxy = 'get-build-from-cdn.php?filename=' + filename;

  var urlLink = (useCDN ? cdnUrl : localBuildUrlSrc);
  var urlLinkAlt = (useCDN ? cdnUrlAlt : localBuildUrlSrcAlt);
  var buildUrl = (useCDN ? cdnUrlProxy : localBuildUrl);


  $('#code').html('...building...');
  $('#code-link').attr('href', urlLink);
  $('#code-url').val(urlLink);

  $('#code-link-alt').attr('href', urlLinkAlt);
  $('#code-url-alt').val(urlLinkAlt);

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

  $('[name="readability"],[name="optimizefor"],[name="inlining"]').on('change', function() {
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
    setBuildId('B0.min.js');
  }


//  positionElements();
//  $(window).on('resize', positionElements)

});
