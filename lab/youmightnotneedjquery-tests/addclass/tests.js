window.testsGrouped = [
  {
    name: 'Add a single class name',
    tests: [
      {
        description: 'Add a class to an element without any classes',
        html: '<div></div>',
        code: 'addClass(el, "a")',
      },
      {
        description: 'Add class name that already exists',
        html: '<div class="a"></div>',
        code: 'addClass(el, "a")',
      },
      {
        description: 'Add hyhened classname',
        html: '<div class="first-class"></div>',
        code: 'addClass(el, "second-class")',
      },
      {
        description: 'tabs',
        html: '<div class="\tone\ttwo\t"></div>',
        code: 'addClass(el, "three")',
      },
      {
        description: 'Add empty string',
        html: '<div class="a"></div>',
        code: 'addClass(el, "")',
      },
      {
        description: 'Add space',
        html: '<div class="a"></div>',
        code: 'addClass(el, " ")',
      },
      {
        description: 'Add nothing',
        html: '<div class="a"></div>',
        code: 'addClass(el, undefined)',
      },
      {
        description: 'Add empty string to an element without any classes',
        html: '<div></div>',
        code: 'addClass(el, "")',
      },
      {
        description: 'Add invalid class name',
        html: '<div></div>',
        code: 'addClass(el, "0")',
      },
      {
        description: 'Add very invalid class name!',
        html: '<div></div>',
        code: 'addClass(el, ".0~!@$%^&*()")',
      },
    ]
  }
];

