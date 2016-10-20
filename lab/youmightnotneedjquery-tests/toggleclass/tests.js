window.testsGrouped = [
  {
    name: 'Toogle for class name',
    tests: [
      {
        description: 'Toogle the only class name defined',
        html: '<div class="test"></div>',
        code: 'toggleClass(el, "test")',
      },
      {
        description: 'Toggle non-existant classname',
        html: '<div></div>',
        code: 'toggleClass(el, "a")',
      },
      {
        description: 'Multi-toggle',
        html: '<div class="b"></div>',
        code: 'toggleClass(el, "a b c")',
      },
      {
        description: 'Toggle first classname',
        html: '<div class="a b c"></div>',
        code: 'toggleClass(el, "a")',
      },
      {
        description: 'Toogle middle classname',
        html: '<div class="a b c"></div>',
        code: 'toggleClass(el, "b")',
      },
      {
        description: 'Toogle last classname',
        html: '<div class="a b c"></div>',
        code: 'toggleClass(el, "c")',
      },
      {
        description: 'Toogle hyhened classname',
        html: '<div class="my-class"></div>',
        code: 'toggleClass(el, "my-class")',
      },
      {
        description: 'Toogle part of classname',
        html: '<div class="elephant ele-phant"></div>',
        code: 'toggleClass(el, "phant")',
      },
      {
        description: 'iGnOrE case?',
        html: '<div class="banana"></div>',
        code: 'toggleClass(el, "BANANA")',
      },
      {
        description: 'Toogle a classname that is defined twice',
        html: '<div class="a a b"></div>',
        code: 'toggleClass(el, "a")',
      },
      {
        description: 'HTML contains tab char instead of space',
        html: '<div class="a\tb\tc"></div>',
        code: 'toggleClass(el, "b")',
      },
      {
        description: 'Extra spaces in HTML',
        html: '<div class="a  b    c"></div>',
        code: 'toggleClass(el, "b")',
      },
      {
        description: 'HTML contains newlines',
        html: '<div class="a\n b\n c"></div>',
        code: 'toggleClass(el, "b")',
      },
    ]
  }
];

