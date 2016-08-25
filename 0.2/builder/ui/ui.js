var bid = '';

function populateVersions(cb) {
  // TODO: Get avalailable versions with ajax call
  var versions = ['0.1', '0.2'];
  for (var i=0; i<versions.length; i++) {
    var key, value
    key = value = versions[i];
    $option = $("<option></option>").attr("value",key).text(value);
    $('#version_selector').append($option); 
  }
  cb.apply()
}


/*
function versionChanged() {
//TODO  loadFeatures();
  $('#features').empty();

  var tokens = bid.split('-');
  tokens[0] = $('#version_selector').val();

  setBuildId(tokens.join('-'));
}*/

function populateFeaturesPanel(features) {
//alert(JSON.stringify(features));
  features.sort(function (a, b) {
    if (a.nameid < b.nameid) {
      return -1;
    }
    if (a.nameid > b.nameid) {
      return 1;
    }
    return 0;
  });

  for (var i=0; i<features.length; i++) {
    var feature = features[i];
    var index = feature['index']+1;
//alert(name);
//    $('#features').append('<div class="feature"><input name="feature-' + i + '" type="checkbox"/>' + feature['id'] + '</div>');
//    $('#features').append('<div class="feature"><input id="feature_' + (feature['index']+1) + '" type="checkbox" value="' + (feature['index']+1) + '"></input><label for="feature_' + (i+1) + '">' + feature['nameid'] + '</label><div class="help-icon">?</div></div>');
    $('#features').append('<div class="feature"><input id="feature_' + index + '" type="checkbox" value="' + index + '"></input><label for="feature_' + index + '">.' + feature['nameid'] + '()</label></div>');
  }
//  $('.feature:first-child > input').attr('checked', 'checked');

//  $('#popup').css('top', $(this).offset().top);

  $('.feature').change(generateCode);
/*
  $('.feature .help-icon').hover(function(e) {
    $feature = $(this).parent('div');
    $('#popup h4').text($feature.find('label').text());
    $('#popup pre').text('');
    $('#popup').show();
    var filename = $feature.find('label').text().replace(/\.|\(|\)/g, '');
    var jqXHR = $.ajax( $('#version_selector').val() + '/api.php?method=' + filename, {'dataType': 'text'} )
    .done(function() {
      $('#popup pre').text(jqXHR.responseText);
    })
    .fail(function() {
    })


  }, function () {
  });*/
//alert($('.feature')[0]);
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
//  var commentFlagsHex = calculateHexFromCheckboxes($('#commenting_panel .checkbox-list input'));
  
  // Minimizer
//  var minFlagsHex = calculateHexFromCheckboxes($('#minify_panel .checkbox-list input'));

  // Compactness
  var compactnessFlagsHex = '';

  switch ($('input[name="compactness"]:checked').attr('value')) {
    case 'min':
      compactnessFlagsHex = '0';
      break;
    case 'cmpct':
      compactnessFlagsHex = '3';
      break;
    case 'compact':
      compactnessFlagsHex = '5';
      break;
    case 'devel':
      compactnessFlagsHex = '9';
      break;
  }

  // Features
  var featuresHex = calculateHexFromCheckboxes($('.feature > input'));

//  bid = v + '-' + commentFlagsHex + '-' + minFlagsHex + '-' + featuresHex;
  bid = compactnessFlagsHex + '-' + featuresHex;
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

  /* Requires that the checkboxes has the "value" attributes set to 1, 2, 3, etc */
  function setCheckboxesByFlags($checkboxes, flags) {
    $checkboxes.each(function() {
      var i = parseInt($(this).val()) - 1;
      $(this).prop('checked', (i<flags.length && flags[i]));
    });
  }

  var tokens = buildId.split('-');

  // Version
//  var version = tokens[0];
//  $('#version_selector').val(version);

  // Comments
//  var commentsFlags = hexstr2flagsarray(tokens[0], 2);
//  setCheckboxesByFlags($('#commenting_panel .checkbox-list input'), commentsFlags);

  // compactness
  switch (tokens[0]) {
    case '0':
      $('input[name="compactness"][value="min"]').prop("checked", true);
      break;
    case '3':
      $('input[name="compactness"][value="cmpct"]').prop("checked", true);
      break;
    case '5':
      $('input[name="compactness"][value="compact"]').prop("checked", true);
      break;
    case '9':
      $('input[name="compactness"][value="devel"]').prop("checked", true);
      break;
  }

  // Minify
/*
  var minify = tokens[1];
  var minifyFlags = hexstr2flagsarray(minify, 1);
  setCheckboxesByFlags($('#minify_panel .checkbox-list input'), minifyFlags);*/

  // Features
  var features = tokens[2];
  var featureFlags = hexstr2flagsarray(features, 0);

//  function loadFeatures(v, cb) {
  function loadFeatures(cb) {
    var jqXHR = $.ajax('features.php', {'dataType': 'json'} )
    .done(function() {
  //    alert( "success" );
      cb.call({}, jqXHR.responseJSON);
    })
    .fail(function() {
      alert('failed loading features for specified version');
    })
  }

//  loadFeatures(version, function(responseJSON) {
  loadFeatures(function(responseJSON) {
    populateFeaturesPanel(responseJSON);
    setCheckboxesByFlags($('.feature input'), featureFlags);
    generateCode();
  });
}

function getSizeString(sizeInBytes) {
  return (sizeInBytes > 1024 ? (Math.round(sizeInBytes / 1024 * 10) / 10) + ' kb' : sizeInBytes + ' bytes');
}

function generateCode() {
//alert('generating code...');
  var url = 'picoquery.js.php?build=' + buildBuildId();
  var jqXHR = $.ajax(url)
  .done(function() {
    $('#code').html(jqXHR.responseText);

    var compressedSize = parseInt(jqXHR.getResponseHeader('Content-Length'),10);
    var uncompressedSize = jqXHR.responseText.length;
    $('#code_size').html('(' + getSizeString(compressedSize) + ' gzipped) <span style="font-size:9px;">(' + getSizeString(uncompressedSize) + ' uncompressed - but remember, <a style="color:black" href="https://www.tjvantoll.com/2014/01/27/only-the-gzip-size-matters/">only the gzip size matters</a>)</span>');

    $('#code-link').attr('href', url);
    $('#code-url').val(url);
    $('#code-warning').html('');

  })
  .fail(function( jqXHR, textStatus, errorThrown) {
//    alert('failed generating picoquery.js');
    $('#code-url').val(url);
    $('#code-warning').html(textStatus + ': ' + errorThrown);
    $('#code-link').attr('href', url);
    $('#code').html(jqXHR.responseText);
  })  
}


$(document).ready(function() {

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
  $('.feature label').hover(function() {
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
//    $('.feature input').prop('checked', $(this).is(':checked'));
    generateCode();
  });

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
      setBuildId('0.2-5-0-1000');
    }
  });



});
