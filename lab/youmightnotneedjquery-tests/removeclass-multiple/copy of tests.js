window.tests = [
  {
    name: '.removeClass()',
    tests: [
      {
        description: 'removeClass',
        tests: [
          {
            description: 'Remove only class name',
            html: '<div class="test"></div>',
            script: 'removeClass(el, "test")',
          }
/*['function() {var el=$("<div class=\'test\'/>").get(0); fn(el, "test"); return $(el).get(0).className}()', "Remove only class name"],
          ['function() {var el=$("<div class=\'a b\'/>").get(0); fn(el, "b"); return $(el).get(0).className}()', "Remove one class name out of two"],
          ['function() {var el=$("<div class=\'a b c\'/>").get(0); fn(el, "b"); return $(el).get(0).className}()', "Remove one class name out of three"],
          ['function() {var el=$("<div class=\'a elephant\'/>").get(0); fn(el, "phant"); return $(el).get(0).className}()', "Remove a classname that does not exist (but there is another classname which contains the string)"],
          ['function() {var el=$("<div class=\'a b c\'/>").get(0); fn(el, "a c"); return $(el).get(0).className}()', "Remove multiple classes"],
          ['function() {var el=$("<div class=\'a b c d e f g h i\'/>").get(0); fn(el, "a c d f g i"); return $(el).get(0).className}()', "Remove a lot of classes"],*/
          
/*
          ['$("<div class=\'b b c\'/>").removeClass("b").get(0).className', "remove multiple classes"],
          ['$("<div class=\'a b c\'/>").removeClass("a b").get(0).className', ""],
          ['$("<div class=\'a b c\'/>").removeClass("a c").get(0).className', ""],
          ['$("<div class=\'a b c d\'/>").removeClass("b c").get(0).className', ""],
          ['$("<div class=\'a elephant\'/>").removeClass("phant").get(0).className', ""],*/
        ]
      },
    ]
  },
];


