
$(function() {
  // Set backgrounds
/*
  $('table td').each(function() {
    switch ($(this).html()) {
      case 'Partial':
      case 'Approximate':
      case 'Full':
      case 'None':
        $(this).addClass($(this).html().toLowerCase());
        break;
    }
  });

  // Move help texts into title tag
  $('table tr').each(function() {
    $children = $(this).children();
    if ($children.length == 0) {
      return;
    }
    if ($children.eq(0).html() != '-') {
      return;
    }
    var prevTds = $(this).prev().children();
    for (var i=1; i<$children.length; i++) {
//      console.log($children.eq(i).html());
//      prevTds.eq(i).attr('title', $children.eq(i).find('em').html()).addClass('has-title');
      prevTds.eq(i).empty();
      prevTds.eq(i).append($children.eq(i));
//      prevTds.eq(i).replaceWith($children.eq(i));
    }

    $(this).remove();
  });

*/
  $('.chart tr td.none').each(function() {
    $(this).html('Not supported');
  });
  $('.chart tr td.full').each(function() {
    $(this).html('Full compliance');
  });

  $('ul.unsupported-signatures li').each(function() {
    $(this).append(' is unsupported');
  });

/*  $('.chart tr td:not(:first-child)').each(function() {
    $(this).html('<div class="text">' + $(this).html() + '</div>');
  });*/


  // Link to compliance test
  $('.chart tr td:first-child').each(function() {
    var html = $(this).html();
    var method = html;
    if (method.indexOf('()') > 0) {
      method = html.replace("()", "").split('.').join('');
    }
    var html = '<a href="http://picoquery/lab/compliance-test/?frameworks=jquery-1.9.1.min.js,picoquery,zepto,cash&group=' + method + '" target="_blank">' + html + '</a>';
    $(this).html(html);
  });

});


