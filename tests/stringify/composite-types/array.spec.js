const stringify = require('../../../src/stringify')

describe('bru stringify()', () => {
  it('should stringify a simple array', () => {
    const expected = `fruits: [
  apple
  banana
  orange
]`;
    const input = {
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

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  it('should stringify array with multiple types', () => {
    const expected = `fruits: [
  {
    name: apple
    color: red
  }
  {
    name: banana
    color: yellow
  }
  [
    orange
  ]
]`;

    const input = {
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

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });
});