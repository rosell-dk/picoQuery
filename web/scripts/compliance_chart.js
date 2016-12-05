var frameworks;
switch (page) {
  case 'compliance_chart':
  case 'compliance_chart_0.4.0':
    frameworks = 'picoquery-0.4.0-full.js,zepto,cash1.3.0.min.js';
    break;
  case 'compliance_chart_0.5.0':
    frameworks = 'picoquery-0.5.0-full.js,zepto,cash1.3.0.min.js';
    break;
}
frameworks = 'jquery-1.12.4.min.js,' + frameworks;
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

/*
  $('ul.unsupported-signatures issue').each(function() {
    $(this).append(' is unsupported');
  });*/

/*  $('.chart tr td:not(:first-child)').each(function() {
    $(this).html('<div class="text">' + $(this).html() + '</div>');
  });*/


  // Create summary

  var states = ['full', 'approximate', 'partial', 'none'];

  for (var i=1; i<4; i++) {
    var result = [];
    var total = $('.chart td:nth-child(' + (i+1) + ')[class]').length;
    var $td = $('<td></td>');

    states.forEach(function(state) {
      var tds = $('.chart tr td.' + state + ':nth-child(' + (i+1) + ')');
      var count = tds.length;

      // Get method names
      var methods = [];
      tds.each(function() {
        methods.push($(this).parent().children(':first-child').html());
      });

      // Get issues
      var num_issues = 0;
      tds.find('issue[proof]').each(function() {
        var proofs = $(this).attr('proof').split(',');
        num_issues += proofs.length;
      });

      $div = $('<div>&nbsp;</div>');
      $div.addClass(state);

      var title = methods.length + ' ';
      title += {full:'fully supported',approximate:'approximately supported',partial:'partially supported',none:'unsupported'}[state];
      title += ' methods:\n';
      title += methods.join(', ');
      if ((state == 'partial') || (state == 'approximate')) {
        title += '\n';
        title += num_issues + (state=='approximate'?' minor':'') + ' issues discovered.\n';
//        title += '(' + Math.round(num_issues/methods.length *100)/100 + ' issues/method)';
      }
      $div.attr('title', title);
      $div.css('cssText', 'display:inline-block;overflow:hidden;width:' + (count/total * 100) + '%');
      $td.append($div);
    });

    result.forEach(function(count, idx) {
    });
    $('.summary tr:nth-child(' + i + ')').append($td);
  };

  // Link to compliance test
  $('.chart tr td:first-child').each(function() {
    var html = $(this).html();
    var method = html;
    if (method.indexOf('()') > 0) {
      method = html.replace("()", "").split('.').join('');
    }
    var html = '<a href="/lab/compliance-test/?frameworks=' + frameworks + '&group=' + method + '" target="_blank">' + html + '</a>';
    $(this).html(html);
  });

  // Link to proofs
  $('issue[proof]').each(function() {
    var proofs = $(this).attr('proof').split(',');
    var $this = $(this);
    proofs.forEach(function(proof) {
      if (proof == "") return;
      $a = $('<a href="' + $this.closest('tr').children(':first-child').children('a').attr('href') + '#' + proof + '">proof</a>');
//      $a.css('cssText', 'margin:0 4px');
      $this.append('<span> </span>');
      $this.append($a);
    });
  });

  // Tooltips
  $('[title]').each(function() {
    $(this).attr('data-tip', $(this).attr('title'));
  });
  $('[data-tip]').tipr({
    'speed': 100,
    'mode': 'bottom'
   });
});

// tipr.min
// http://www.tipue.com/tipr/
(function($){$.fn.tipr=function(options){var set=$.extend({'speed':200,'mode':'bottom'},options);return this.each(function(){var tipr_cont='.tipr_container_'+set.mode;$(this).hover(function()
{var d_m=set.mode;if($(this).attr('data-mode'))
{d_m=$(this).attr('data-mode')
tipr_cont='.tipr_container_'+d_m;}
var out='<div class="tipr_container_'+d_m+'"><div class="tipr_point_'+d_m+'"><div class="tipr_content">'+$(this).attr('data-tip')+'</div></div></div>';$(this).append(out);var w_t=$(tipr_cont).outerWidth();var w_e=$(this).width();var m_l=(w_e / 2)-(w_t / 2);$(tipr_cont).css('margin-left',m_l+'px');$(this).removeAttr('title alt');$(tipr_cont).fadeIn(set.speed);},function()
{$(tipr_cont).remove();});});};})(jQuery);

