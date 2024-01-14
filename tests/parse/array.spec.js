const parse = require('../../src/parse')

describe('bru parse()', () => {
  it('should parse a simple array', () => {
    const input = `
fruits: [
  'apple'
  'banana'
  'orange'
]
`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'fruits',
        value: {
          type: 'array',
          value: [
            'apple',
            'banana',
            'orange'
          ]
        }
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse array with multiple types', () => {
    const input = `
fruits: [
  {
    name: 'apple'
    color: 'red'
  }
  {
    name: 'banana'
    color: 'yellow'
  }
  [
    'orange'
  ]
]
`;

    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'fruits',
        value: {
          type: 'array',
          value: [{
            type: 'multimap',
            value: [{
              type: 'pair',
              key: 'name',
              value: 'apple'
            }, {
              type: 'pair',
              key: 'color',
              value: 'red'
            }]
          }, {
            type: 'multimap',
            value: [{
              type: 'pair',
              key: 'name',
              value: 'banana'
            }, {
              type: 'pair',
              key: 'color',
              value: 'yellow'
            }]
          }, {
            type: 'array',
            value: [
              'orange'
            ]
          }]
        }
      }]
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });
});