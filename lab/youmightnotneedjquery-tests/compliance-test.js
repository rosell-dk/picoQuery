// html escape and insert zero width spaces in code
//  var zws = '&#8203;';
function htmlEscapeEtc(str) {
  var zws = 'ZWS';
  str = str
      .replace(/&/g, '&amp;')
      .replace(/\./g, zws + '.')
      .replace(/\(/g, zws + '(')
      .replace(/\)/g, zws + ')')
      .replace(/\</g, zws + '<')
      .replace(/\>/g, '>' + zws)
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/ /g, zws + '&nbsp;')
      .replace(/ZWS/g, '&#8203;')
//      .replace(/ZWS/g, '<span class="zero-width-space"> !!! </span>')
  return str;
}


function toPrint(obj) {
  switch (typeof obj) {
    case 'object':
      var html = '';
      if (obj === null) {
        return 'null';
      }
      if (!obj.constructor) {
        console.log('object without constructor?', obj);
        return 'object without constructor?';

      }
      var className = obj.constructor.toString().match(/function (\w*)/)[1];
      if ((className == 'DOMException') || (className == 'TypeError') || (className == 'ReferenceError') || (className == 'Error')) {
        html = '<span class="error">' + obj.name + (obj['message'] ? '<span class="error-description">' + obj.message + '</span>' : '') + '</span>';
      }
      else if (className.match('^HTML[^E]*Element')) {
        // Its an HTML Element
//          html = '<span class="tagname" title="' + className + '">' + obj.tagName.toLowerCase() + '</span>';
        // html = htmlEscapeEtc(j$(obj).html()); // nah, this creates innerHTML
        // http://stackoverflow.com/questions/5744207/jquery-outer-html
//          html = '<span class="element-html">' + htmlEscapeEtc($(obj).wrapAll('<parent>').parent().html()) + '</span>';
        html = '<span class="element-html">' + htmlEscapeEtc(obj.outerHTML) + '</span>';

/*
        if (obj.id) {
          html += '<span class="tagid">#' + obj.id + '</span>';
        }
        else if (obj.className) {
          html += '<span class="tagclassname">.' + obj.className + '</span>';
        }*/
      }
      else if (obj.splice) {  // (this is the same test as console.log performs)
        // Its an array 
        // - or a jQuery object, or something array-like 
        var content = [];
        for (var i=0; i<obj.length; i++) {
          content.push(toPrint(obj[i]));
        }
        html = '<span class="array">[ ' + content.join('<span class="comma">,</span>') + ' ]</span>';
        if (obj.ready) {
          
        }
        var isJquery = obj instanceof jQuery;
        if (isJquery) {
          html = '$' + html;
        }
        else {
          html = className + html;
        }
      }
      else if ((Object.getPrototypeOf(obj) == Object.prototype ) ||
        (className == 'NodeList2')
      ) {
        var content = [];
        for (var prop in obj) {
          content.push(prop + ':' + toPrint(obj[prop]));
        }
        html = '<span class="obj">{ ' + content.join('<span class="comma">,</span>') + ' }</span></span>';
//          html = className;
      }
      else if (className == 'Text') {
//          html = className + '{' + toPrint(obj.childNodes) + '}';
        html = className + '{"' + obj.wholeText + '"}';

      }
      else if (className == 'NodeList') {
//          html = className + '{' + toPrint(obj.childNodes) + '}';
        html = className + '{' + toPrint([].slice.call(obj)) + '}';

      }
      else {
        // Some kind of object, ie 'HTMLDocument', 'DocumentFragment', 'Text', 'NodeList', etc
        // we only show the class name for unknown objects
        html = className;
      }
      return html;
    case 'string':
      return '<span class="value">"' + htmlEscapeEtc(obj) + '"</span>';
    default:
      return '<span class="value">' + JSON.stringify(obj) + '</span>';
  }
}
function toPrint2(obj) {
  return '<pre class="printed_code">' + toPrint(obj).replace(/\t/g, '[tab]') + '</pre>';
}


function runTests() {
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

  window.tests = [];
  window.testsGrouped.forEach(function(group, i) {
    group.tests.forEach(function(test, i) {
      window.tests.push(test);
    });
  });


  // Run all tests and store results in a two-dimensional array
  var testResults = [];
  window.candidates.forEach(function(candidate, i) {
    testResults[i] = [];
    // Evaluate the candidate code, to make the function available
//    eval(candidate.code);
//    var removeClass = candidate.implementation;

    window.tests.forEach(function(test, j) {
      try {
        testResults[i][j] = window.evaluator.call(null, candidate, test);
/*
        var el=$(test.html).get(0);
        eval("result = " + test.code);
        testResults[i][j] = $(el).get(0).className;*/
      }
      catch (e) {
        testResults[i][j] = e;
      }
    });
  });
 
/*
  // Create summary
  var html = '';
  html += '<h1>Summary</h1>';
  html += '<table class="testresults summary">';
  html += '<tr>';
  html += '<th>Test description</th>';
  html += '<th>Test HTML</th>';
  html += '<th>Test code</th>';
  window.candidates.forEach(function(candidate,i) {
    html += '<th>' + htmlEscapeEtc(candidate.title) + '<pre>' + htmlEscapeEtc(candidate.implementation.toString()) + '</pre></th>';
  });
  html += '</tr>';

  window.tests.forEach(function(test,j) {
    html += '<tr>';
    html += '<td>' + test.description + '<br><pre>' + test.code + '</pre></td>';
    window.candidates.forEach(function(candidate,i) {
    });
    html += '</tr>';
  });
  html += '</table>';

  $('body').append($(html));
*/

  // Create summary
  var html = '';
  html += '<h2>Summary</h2>';
  html += '<table class="testresults summary">';
  if (window.testsGrouped.length > 1) {
    html +='<tr><th>&nbsp;</th>';
    window.testsGrouped.forEach(function(group, i) {
      html +='<th class="group" colspan="' + group.tests.length + '"><div>' + group.name + '</div></th>';
    });
    html +='</tr>';
  }
  html += '<tr>';
  html += '<th><h2>Candidates</h2></th>';
  window.tests.forEach(function(test,i) {
    html += '<th>' + test.description + '</th>';
  });
  html += '</tr>';

  window.candidates.forEach(function(candidate,i) {
// (candidate.author ? '<p>Author: ' + candidate.author + '</p>':'')
    html += '<tr>';
    html += '<td><div class="col1">';
    html += '<a class="internal_anchor" href="#' + candidate.shortname + '">' + htmlEscapeEtc(candidate.title) + '</a>';
    html += '<p class="description">' + candidate.description + '</p><pre>' + (candidate.author ? '// @author ' + candidate.author + '\n':'') + htmlEscapeEtc(candidate.implementation.toString()).replace(/ /g, '&nbsp;') + '</pre></div></td>';
    window.tests.forEach(function(test,j) {
      var passed = (testResults[0][j] == testResults[i][j]);
      html += '<td data-candidate="' + i + '" data-test="' + j + '" class="result ' + (i == 0 ? ' expected-result' : passed ? 'passed' : 'failed') + '"><pre>' + toPrint2(testResults[i][j]).replace(/\t/g, '[tab]') + '</pre></td>';
// .replace(/ /g, '&nbsp;')
//      html += '<td data-candidate="' + i + '" data-test="' + j + '" class="result ' + (passed ? 'passed' : 'failed') + '"></td>';
    });
    html += '</tr>';
  });
  html += '</table>';

  $('body').append($(html));

  $('td[data-candidate]').hover(
    function(e) {
      var i = parseInt($(this).attr('data-candidate'), 10);
      var j = parseInt($(this).attr('data-test'), 10);
      var candidate = window.candidates[i];
      var test = window.tests[j];
    
      html = ''
      html += '<b>Test:</b> ' + test.description + '<br><br>';
      html += '<b>Test HTML:</b><br><pre>' + htmlEscapeEtc(test.html) + '</pre><br>';
      html += '<b>Test code:</b><br><pre>' + htmlEscapeEtc(test.code) + '</pre><br>';
//      html += '<b>jQuery result:</b><br><pre>' + toPrint(testResults[0][j]) + '</pre>';
//      html += '<b>This result:</b><br><pre>' + toPrint(testResults[i][j]) + '</pre>';
      html += '<b>jQuery result:</b> ' + toPrint2(testResults[0][j]) + '<br>';
      html += '<b>This result:</b> ' + toPrint2(testResults[i][j]) + '<br>';
      html += '<b>' + (testResults[0][j] == testResults[i][j] ? 'Compliant!' : 'Not compliant!') + '</b><br><br>';
//      html += 'Result: ' + toPrint(testResults[i][j]);
//      html += 'Result: ' + toPrint(testResults[i][j]);

      $('body').append('<div id="infobox">' + html + '</div>');

      var coord = {top: e.pageY, left:e.pageX};
      if (e.pageX > $(document).width() - $('#infobox').outerWidth() - 50) {
        coord.left = e.pageX - $('#infobox').width() - 50;
      }
      if (e.clientY > $(window).height() - $('#infobox').outerHeight() - 20) {
        coord.top = e.pageY - $('#infobox').height() - 20;
      }
//      console.log(e.pageX, $(document).width() - $(this).outerWidth());
//      coord.left = Math.min(e.pageX, $(document).width() - $(this).outerWidth());

//      $('#infobox').offset($(this).offset());
      

      console.log(e);
      $('#infobox').offset(coord);
//      $('#infobox').css('cssText', 'top:' + 0px;left:0px');
    },
    function() {
      $('#infobox').remove();
    }
  )


  // Create detailed report for each candidate
  window.candidates.forEach(function(candidate,i) {
    var html = '';
    html += '<a name="' + candidate.shortname + '"></a>';
    html += '<h2>' + candidate.title + '</h2>';
    html += '<p>' + candidate.description + '</p>';
    html += '<div class="candidate-code"><pre>' + candidate.implementation + '</pre></code>';
    html += '<table class="testresults individual">'
  //<!--  <colgroup><col width="20%"></col></colgroup>-->

    html += '<tr><th>description</th><th>HTML</th><th>Code</th><th>Result with jQuery</th><th>Result with this candidate</th></tr>';


//console.log(candidate.implementation);
//eval('function removeClass() {}');
//    console.log(removeClass);

    window.tests.forEach(function(test,j) {
      html += '<tr>';
      html += '<td>' + test.description + '</td>';
      html += '<td>' + htmlEscapeEtc(test.html) + '</td>';
      html += '<td>' + htmlEscapeEtc(test.code) + '</td>';

    
//      html += '<td>' + toPrint(result) + '</td>';
      
      var passed = (testResults[0][j] == testResults[i][j]);
      html += '<td class="expected-result">' + toPrint2(testResults[0][j]) + '</td>';
      html += '<td class="result ' + (passed ? 'passed' : 'failed') + '">' + toPrint2(testResults[i][j]) + '</td>';



      html += '</tr>';
    });

    html += '<tbody>';
    html += '</tbody></table>';
    $('body').append($(html));
//    group(candidate.description);
    
  });

/*
  window.complianceTests.forEach(function(method) {
    group(method['name']);
    method['tests'].forEach(function (sg) {
      if (sg['tests'].length == 0) {
        subgroup_empty(sg['name']);
      }
      else {
        subgroup(sg['name']);
        sg['tests'].forEach(function (test) {
          testInAllCandidates(test[0], test[1]);
        });
        endsubgroup();
      }
    });
    endgroup();
  })
*/
}


$(function($) {
  runTests();
});

