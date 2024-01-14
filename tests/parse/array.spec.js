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
});