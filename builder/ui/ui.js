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

  // Comments
  var commentFlagsDec = 0;  
  $('#comment_selector option:selected').each(function() {
    commentFlagsDec += parseInt($(this).val(), 10);
  });
  commentFlagsHex = commentFlagsDec.toString(16);

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

  // Minimizer
  var minFlagsDec = 0;  
  $('#minify_selector option:selected').each(function() {
    minFlagsDec += parseInt($(this).val(), 10);
  });
  minFlagsHex = minFlagsDec.toString(16);

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

  var tokens = buildId.split('-');

  var version = tokens[0];
  $('#version_selector').val(version);

  var features = tokens[3];
  var featureFlags = hexstr2flagsarray(features);

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
  $('#comment_selector').on('change', generateCode);
  $('#minify_selector').on('change', generateCode);
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
