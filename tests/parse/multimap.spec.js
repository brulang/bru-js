const parse = require('../../src/parse')

describe('bru parse()', () => {
  it('should parse a simple multimap', () => {
    const input = `
name: Bruno
name: Anoop
`
    const expected = {
      type: 'multimap',
      value: [
        {
          type: 'pair',
          key: 'name',
          value: 'Bruno'
        },
        {
          type: 'pair',
          key: 'name',
          value: 'Anoop'
        }
      ]
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a simple multimap inside a nested multimap', () => {
    const input = `
name: Bruno
name: Anoop
address: {
  city: 'New York'
  city: 'San Francisco'
}
`
    const expected = {
      type: 'multimap',
      value: [
        {
          type: 'pair',
          key: 'name',
          value: 'Bruno'
        },
        {
          type: 'pair',
          key: 'name',
          value: 'Anoop'
        },
        {
          type: 'pair',
          key: 'address',
          value: {
            type: 'multimap',
            value: [
              {
                type: 'pair',
                key: 'city',
                value: 'New York'
              },
              {
                type: 'pair',
                key: 'city',
                value: 'San Francisco'
              }
            ]
          }
        }
      ]
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });
});