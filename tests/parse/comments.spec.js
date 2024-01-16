const parse = require('../../src/parse')

describe('bru parse()', () => {
  it('should ignore comments', () => {
    const input = `
name: Bruno

# this is a comment
age: 28

address: {
  # this is another comment
  city: Berlin
}

  `;

    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'name',
        value: 'Bruno'
      }, {
        type: 'pair',
        key: 'age',
        value: 28
      }, {
        type: 'pair',
        key: 'address',
        value: {
          type: 'multimap',
          value: [{
            type: 'pair',
            key: 'city',
            value: 'Berlin'
          }]
        }
      }]
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });
});