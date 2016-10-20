window.testsGrouped = [
  {
    name: 'Test for class name',
    tests: [
      {
        description: 'Test the only class name defined',
        html: '<div class="test"></div>',
        code: 'hasClass(el, "test")',
      },
      {
        description: 'Test first classname',
        html: '<div class="a b c"></div>',
        code: 'hasClass(el, "a")',
      },
      {
        description: 'Test middle classname',
        html: '<div class="a b c"></div>',
        code: 'hasClass(el, "b")',
      },
      {
        description: 'Test last classname',
        html: '<div class="a b c"></div>',
        code: 'hasClass(el, "c")',
      },
      {
        description: 'Test hyhened classname',
        html: '<div class="my-class"></div>',
        code: 'hasClass(el, "my-class")',
      },
      {
        description: 'Test part of classname',
        html: '<div class="elephant ele-phant"></div>',
        code: 'hasClass(el, "phant")',
      },
      {
        description: 'iGnOrE case?',
        html: '<div class="banana"></div>',
        code: 'hasClass(el, "BANANA")',
      },
      {
        description: 'Test a classname that is defined twice',
        html: '<div class="a a b"></div>',
        code: 'hasClass(el, "a")',
      },
      {
        description: 'HTML contains tab char instead of space',
        html: '<div class="a\tb\tc"></div>',
        code: 'hasClass(el, "b")',
      },
      {
        description: 'Extra spaces in HTML',
        html: '<div class="a  b    c"></div>',
        code: 'hasClass(el, "b")',
      },
      {
        description: 'HTML contains newlines',
        html: '<div class="a\n b\n c"></div>',
        code: 'hasClass(el, "b")',
      },
    ]
  }
];

