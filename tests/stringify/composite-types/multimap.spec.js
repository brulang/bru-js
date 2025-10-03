const stringify = require('../../../src/stringify')

describe('bru stringify()', () => {
  it('should parse a simple multimap', () => {
    const expected = `name: Bruno
name: Anoop`
    const input = {
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

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a simple multimap inside a nested multimap', () => {
    const expected = `name: Bruno
name: Anoop
address: {
  city: 'New York'
  city: 'San Francisco'
}`
    const input = {
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

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });
});