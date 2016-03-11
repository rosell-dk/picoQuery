function populateVersions(cb) {
  // TODO: Get avalailable versions with ajax call
  var versions = ['0.1'];
  for (var i=0; i<versions.length; i++) {
    var key, value
    key = value = versions[i];
    $option = $("<option></option>").attr("value",key).text(value);
    $('#version_selector').append($option); 
  }
  cb.apply()
}


function versionChanged() {
//TODO  loadFeatures();
}

function populateFeaturesPanel(features) {
//alert(JSON.stringify(features));
  for (var i=0; i<features.length; i++) {
    var feature = features[i];
//alert(name);
    $('#features').append('<div class="feature"><input name="feature-' + i + '" type="checkbox"/>' + feature['id'] + '</div>');
  }
//  $('.feature:first-child > input').attr('checked', 'checked');
  $('.feature').change(generateCode);
//alert($('.feature')[0]);
}

function loadFeatures(v, cb) {
  var jqXHR = $.ajax( '../' + v + '/features.php', {'dataType': 'json'} )
  .done(function() {
//    alert( "success" );
    cb.call({}, jqXHR.responseJSON);
  })
  .fail(function() {
    alert('failed loading features for specified version');
  })
}

function buildBuildId() {

  // Version
  var v = $('#version_selector').val();

  // Features
  $checkboxes = $('.feature > input');
  var flags = '';
  for (var i=0; i<$checkboxes.length; i++) {
    if ($('.feature [name="feature-' + i + '"]:checked').length == 1) {
      flags += '1';
    }
    else {
      flags += '0';
    }
  }
  // convert flags to hex
  var hex = '';
  for (var i=0; i<flags.length; i+=4) {
    var fourflags = flags.substr(i, 4).split('').reverse().join('');
    hex += parseInt(fourflags, 2).toString(16);
  }

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
      if ($(this).is(':checked')) {
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

  // Comments
  var commentFlagsHex = calculateHexFromCheckboxes($('#commenting_panel .checkbox-list input'));

  // Minimizer
  var minFlagsHex = calculateHexFromCheckboxes($('#minify_panel .checkbox-list input'));


  return v + '-' + commentFlagsHex + '-' + minFlagsHex + '-' + hex;
}

function setBuildId(buildId) {
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

  /* Requires that the checkboxes has the "value" attributes set to 1, 2, 4, etc */
  function setCheckboxesByFlags($checkboxes, flags) {
    $checkboxes.each(function() {
      var i = parseInt($(this).val()) - 1;
      $(this).prop('checked', (i<flags.length && flags[i]));
    });
  }

  var tokens = buildId.split('-');

  // Version
  var version = tokens[0];
  $('#version_selector').val(version);

  // Comments
  var commentsFlags = hexstr2flagsarray(tokens[1], 2);
  setCheckboxesByFlags($('#commenting_panel .checkbox-list input'), commentsFlags);

  // Minify
  var minify = tokens[2];
  var minifyFlags = hexstr2flagsarray(minify, 1);
  setCheckboxesByFlags($('#minify_panel .checkbox-list input'), minifyFlags);

  // Features
  var features = tokens[3];
  var featureFlags = hexstr2flagsarray(features, 0);

  loadFeatures(version, function(responseJSON) {
    populateFeaturesPanel(responseJSON);

    $('.feature > input').each(function() {
      var i = parseInt($(this).attr('name').substr(8), 10);
      $(this).prop('checked', (i<featureFlags.length && featureFlags[i]));
    });

    generateCode();

  });
}

function generateCode() {
//alert('generating code...');
  var jqXHR = $.ajax( '../picoquery.js.php?build=' + buildBuildId())
  .done(function() {
    $('#code').html(jqXHR.responseText);

    var sizeInBytes = jqXHR.responseText.length;
    var sizeInKb = Math.round(sizeInBytes / 1024 * 10) / 10;
    $('#code_size').html('(' + sizeInKb + ' kb)');
  })
  .fail(function() {
    alert('failed generating picoquery.js');
  })  
}


$(document).ready(function() {


  $('#version_selector').on('change', versionChanged);

  $('#commenting_panel .checkbox-list input').on('change', generateCode);
  $('#minify_panel .checkbox-list input').on('change', generateCode);

  $('#select_all_features').on('change', function() {
//    alert('t');
    $('.feature input').prop('checked', $(this).is(':checked'));
    generateCode();
  }).prop('checked', false);  // http://api.jquery.com/prop/ */


  populateVersions(function() {
    if ((location.search) && (location.search.indexOf('?build=') == 0)) {
      setBuildId(location.search.substr(7));   
    }
    else {
      setBuildId('0.1-5-0-8100');
    }
  });



});
