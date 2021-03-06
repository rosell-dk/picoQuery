window.testsGrouped = [
  {
    name: 'Remove single class name',
    tests: [
      {
        description: 'Remove the only class name defined',
        html: '<div class="test"></div>',
        code: 'removeClass(el, "test")',
      },
      {
        description: 'Remove first classname',
        html: '<div class="a b c"></div>',
        code: 'removeClass(el, "a")',
      },
      {
        description: 'Remove middle classname',
        html: '<div class="a b c"></div>',
        code: 'removeClass(el, "b")',
      },
      {
        description: 'Remove last classname',
        html: '<div class="a b c"></div>',
        code: 'removeClass(el, "c")',
      },
      {
        description: 'Remove hyhened classname',
        html: '<div class="my-class"></div>',
        code: 'removeClass(el, "my-class")',
      },
      {
        description: 'iGnOrE case?',
        html: '<div class="banana"></div>',
        code: 'removeClass(el, "BANANA")',
      },
      {
        description: 'Remove a classname that does not exist (but there is another classname which contains the string)',
        html: '<div class="elephant ele-phant"></div>',
        code: 'removeClass(el, "phant")',
      },
      {
        description: 'Remove a classname that is defined twice',
        html: '<div class="a a b"></div>',
        code: 'removeClass(el, "a")',
      },
/*      {
        description: 'Remove a lot of class names',
        html: '<div class="a b c d e f g h i"></div>',
        code: 'removeClass(el, "a c d f g i")',
      },*/
      {
        description: 'Remove a classname that is defined lots of times',
        html: '<div class="a b a a e a a h a"></div>',
        code: 'removeClass(el, "a")',
      },
      {
        description: 'Remove a classname that does not exist (but there is another classname which contains the string) #2',
        html: '<div class="monkey elephant tiger"></div>',
        code: 'removeClass(el, "phant")',
      },
      {
        description: 'HTML contains tab char instead of space',
        html: '<div class="a\tb\tc"></div>',
        code: 'removeClass(el, "b")',
      },
      {
        description: 'Extra spaces in HTML',
        html: '<div class="a  b    c"></div>',
        code: 'removeClass(el, "b")',
      },
      {
        description: 'HTML contains newline',
        html: '<div class="a b\n c"></div>',
        code: 'removeClass(el, "b")',
      },
    ]
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
];

