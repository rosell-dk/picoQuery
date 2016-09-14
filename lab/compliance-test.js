function runInAllFrameworks(fn) {
//  console.log('jQuery / zepto / picoQuery / picoQuery.min');

  // Swap to jQuery
  $ = j$;
  console.log('jQuery');
  fn.call();

  // Swap to zepto
  $ = z$;
  console.log('zepto');
  fn.call();

  // Swap to picoQuery
  $ = p$;
  console.log('picoQuery');
  fn.call();

  // Swap to picoQuery optimized and minified
  $ = pmin$;
  console.log('picoQuery min');
  fn.call();

}

window.testNumber = 0;
function testInAllFrameworks(code,fn) {
//  console.log('jQuery / zepto / picoQuery / picoQuery.min');

  var testResults = [];
  var frameworks = [j$, z$, p$, pmin$];

  frameworks.forEach(function (framework) {
    var result;
    $ = framework;

    try {
//      result = fn.call();
      eval("result = " + code);
    }
    catch (e) {
      result = e;
      console.log(e);
    }
    testResults.push(result);
  });

  $ = j$;

  function toPrint(obj) {
    switch (typeof obj) {
      case 'object':
        var html = '';
        if (obj === null) {
          return 'null';
        }
        var className = obj.constructor.toString().match(/function (\w*)/)[1];
        if ((className == 'DOMException') || (className == 'TypeError')) {
          html = '<span class="error" title="' + (obj['message'] ? obj.message : '') + '">' + obj.name + '<span>';
        }
        else if (className.match('^HTML[^E]*Element')) {
          // Its an HTML Element
          html = '<span class="tagname" title="' + className + '">' + obj.tagName.toLowerCase() + '</span>';
          if (obj.id) {
            html += '<span class="tagid">#' + obj.id + '</span>';
          }
          else if (obj.className) {
            html += '<span class="tagclassname">.' + obj.className + '</span>';
          }
        }
        else if (obj.splice) {
          // Its an array (this is the same test as console.log performs)
          var content = [];
          for (var i=0; i<obj.length; i++) {
            content.push(toPrint(obj[i]));
          }
          html = '<span class="array">[ ' + content.join(', ') + ' ]</span>';
          if (obj.ready) {
            
          }
          html = '$' + html;
        }
        else {
          html = className;
        }
        return html;
      default:
        return '<span class="value">' + JSON.stringify(obj) + '</span>';
    }
  }
  var tdContent = testResults.map(function(item) {
//    return '';
    var output = '';
    for (var p in item) {
      output += p + ': ' + item[p]+'; ';
    }

//    return '<td>' + output + '</td>';
//    console.log(item);
    return toPrint(item);
  });

  window.testNumber++;
  var tr = '<tr>';
//  tr += '<td>' + window.testNumber + '</td>';

  // html escape and insert zero width spaces in code
  code = code
      .replace(/&/g, '&amp;', 'g')
      .replace('.', '&#8203;.', 'g')
      .replace('(', '&#8203;(', 'g')
      .replace(')', '&#8203;)', 'g')
      .replace(/"/g, '&quot;', 'g')
      .replace(/'/g, '&#39;', 'g')
      .replace(/</g, '&lt;', 'g')
      .replace(/>/g, '&gt;', 'g');

  tr += '<td><div class="code" title="' + '">' + code + '</div></td>';
  for (var i=0; i<tdContent.length; i++) {
    tr += '<td class="test ' + (tdContent[0] != tdContent[i] ? 'mismatch' : '') + '">' + tdContent[i] + '</td>';
  }
  tr += '</tr>';
  // TODO: red backgrounds if td[2] != td[1]    
  $('#testresults tbody').append(tr);
//  console.log('Test #' + window.testNumber);
//  console.log(testResults);
}

function group(caption) {
  $('#testresults tbody').append('<tr class="group"><th colspan=5>' + caption + '</th></tr>');  
}

function endgroup() {
  $('#testresults tbody').append('<tr class="endgroup"><td colspan=5></td></tr>');  
}

function subgroup(caption) {
//  $('#testresults tbody').append('<tr class="subgroup"><th colspan=5>' + caption + '</th></tr>');  
//  $('#testresults tbody').append('<tr class="frameworks"><th></th><th>jQuery 1.9.1 (ref)</th><th>zepto 1.2.0</th><th>picoQuery 0.2</th><th>picoQuery.min</th></tr>');

  $('#testresults tbody').append('<tr class="frameworks"><th class="subgroup">' + caption + '</th><th>jQuery 1.9.1 (ref)</th><th>zepto 1.2.0</th><th>picoQuery 0.2</th><th>picoQuery.min</th></tr>');
}

function subgroup_empty(caption) {
  $('#testresults tbody').append('<tr class="subgroup empty"><th colspan=5>' + caption + '</th></tr>');  
  $('#testresults tbody').append('<tr><th colspan=5 class="no_tests_available_yet">No tests available yet</th></tr>');
}

function endsubgroup() {
  $('#testresults tbody').append('<tr class="endsubgroup"><td colspan=5></td></tr>');  
}

function displayTestGroupLinks(groupsToShow) {

  if (groupsToShow == "none") {
    $('#groups').append('<h3>Choose what to test:</h3>');
  }

  var html = [];
  window.complianceTests.forEach(function(method) {
    html.push(method['id']);
  });
  html.sort();
  html = html.map(function (item) {
    return '<a href="?' + item + '"' + ((item == groupsToShow) ? ' class="active"': '') + '>' + item + '</a>';
  });
  html.unshift('<a href="compliance-test.html?all"' + (groupsToShow == 'all' ? ' class="active"': '') + '>All tests (slow!)</a>');
  $('#groups').append(html.join(''));

  
}

function runTests(groupsToShow) {
/* structure:
  [{
    name: 'constructor',
    tests: [
      [
        {
          name: '',
          tests: [
            ['$([document, null])', ""],
*/


  window.complianceTests.forEach(function(method) {
    if ((groupsToShow != "all") && (method['id'] != groupsToShow)) {
      return;
    }
    group(method['name']);
    method['tests'].forEach(function (sg) {
      if (sg['tests'].length == 0) {
        subgroup_empty(sg['name']);
      }
      else {
        subgroup(sg['name']);
        sg['tests'].forEach(function (test) {
          testInAllFrameworks(test[0]);
        });
        endsubgroup();
      }
    });
    endgroup();
  })
}

function runTest(id) {
}

j$(function() {
  // Create "id" for each method
  window.complianceTests.forEach(function(method) {
    method['id'] = method['name'].replace(/\./, '').replace(/\(/, '').replace(/\)/, '')
  });


  var groupsToShow = (location.search ? location.search.substr(1) : "none");

  displayTestGroupLinks(groupsToShow);

  runTests(groupsToShow);
});

