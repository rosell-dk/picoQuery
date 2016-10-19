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
      .replace(/ZWS/g, '&#8203;')
//      .replace(/ZWS/g, '<span class="zero-width-space"> !!! </span>')
  return str;
}


window.testNumber = 0;
function testInAllCandidates(code, description) {

  var testResults = [];

  window.candidates.forEach(function (fn) {
    console.log(fn, code);
    try {
//      result = fn.call();
      eval("result = " + code);
    }
    catch (e) {
//      console.log(e);
      result = e;
    }
    testResults.push(result);
  });

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

  tr += '<td>' + description + '</td>';

  tr += '<td><div class="code" title="' + description + '">' + htmlEscapeEtc(code) + '</div></td>';
  for (var i=0; i<tdContent.length; i++) {
    if (tdContent[0] == tdContent[i]) {
      tr += '<td class="test">' + tdContent[i] + '</td>';
    }
    else {
      var j=0;
      while (tdContent[i].charAt(j) == tdContent[0].charAt(j)) {
        j++;
      }
      if (j==0) {
        tr += '<td class="test mismatch">' + tdContent[i] + '</span></td>';
      }
      else {
        // Skip stuff
        var oneMoreRound = true;
        while (oneMoreRound) {
          oneMoreRound = false;

          // skip zero-width-spaces      
          while (tdContent[i].substr(j,7) == '&#8203;') {
            j+=7;
            oneMoreRound = true;
          }

          // skip tags
          while (tdContent[i].charAt(j) == '<') {
            j = tdContent[i].indexOf('>', j+1) + 1;
            oneMoreRound = true;
          }

        }

        var l=1;
        if (tdContent[i].charAt(j) == '&') {
          l = tdContent[i].indexOf(';', j+1) - j + 1;
        }
//        tr += '<td class="test mismatch">' + tdContent[i] + '</span></td>';

        tr += '<td class="test mismatch">' + tdContent[i].substr(0,j) + '<span style="display:inline-block;min-width:10px;border-bottom:2px solid red;">' + tdContent[i].substr(j,l) + '</span>' + tdContent[i].substr(j+l) + '</td>';
      }
    }
  }
  tr += '</tr>';
  // TODO: red backgrounds if td[2] != td[1]    
  $('#testresults tbody').append(tr);
//  console.log('Test #' + window.testNumber);
//  console.log(testResults);
}

var colspan = 'colspan=' + (window.candidates.length + 2);

function group(caption) {
  $('#testresults tbody').append('<tr class="group"><th ' + colspan + '>' + caption + '</th></tr>');  
}

function endgroup() {
  $('#testresults tbody').append('<tr class="endgroup"><td ' + colspan + '></td></tr>');  
}

function subgroup(caption) {
//  $('#testresults tbody').append('<tr class="subgroup"><th colspan=5>' + caption + '</th></tr>');  
//  $('#testresults tbody').append('<tr class="frameworks"><th></th><th>jQuery 1.9.1 (ref)</th><th>zepto 1.2.0</th><th>picoQuery 0.2</th><th>picoQuery.min</th></tr>');

//  $('#testresults tbody').append('<tr class="frameworks"><th class="subgroup">' + caption + '</th><th>jQuery 1.9.1 (ref)</th><th>zepto 1.2.0</th><th>picoQuery 0.2</th><th>picoQuery.min</th></tr>');

  var html = '';
  html += '<tr class="subgroup"><th ' + colspan + '>' + caption + '</th></tr>';

  html += '<tr class="candidates">';
//  html += '<th class="subgroup">' + caption + '</th>';
  html += '<th>Description</th>';
  html += '<th>Code</th>';
  window.candidates.forEach(function(candidate) {
    html += '<th>' + candidate[1] + '</th>';
  });
  html += '</tr>';
  $('#testresults tbody').append(html);
}

function subgroup_empty(caption) {
  $('#testresults tbody').append('<tr class="subgroup empty"><th ' + colspan + '>' + caption + '</th></tr>');  
  $('#testresults tbody').append('<tr><th colspan=' + (window.candidates.length + 1) + ' class="no_tests_available_yet">No tests available yet</th></tr>');
}

function endsubgroup() {
  $('#testresults tbody').append('<tr class="endsubgroup"><td ' + colspan + '></td></tr>');  
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
}


$(function($) {
  runTests();
});

