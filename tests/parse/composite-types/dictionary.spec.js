const parse = require('../../../src/parse')

describe('bru parse()', () => {
  it('should parse a simple dictionary with one key and value', () => {
    const input = `name: Bruno`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'name',
        value: 'Bruno'
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a simple dictionary with multiple keys and values', () => {
    const input = `
name: Bruno
age: 28
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
      }]
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a dictionary 1 level deep', () => {
    const input = `
person: {
  name: Antony
}
created: 2018-01-01
`;

    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'person',
        value: {
          type: 'multimap',
          value: [{
            type: 'pair',
            key: 'name',
            value: 'Antony'
          }]
        }
      }, {
        type: 'pair',
        key: 'created',
        value: '2018-01-01'
      }]
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a dictionary 2 levels deep', () => {
    const input = `
person: {
  name: Antony
  address: {
    city: London
  }
}
created: 2018-01-01
`;

    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'person',
        value: {
          type: 'multimap',
          value: [{
            type: 'pair',
            key: 'name',
            value: 'Antony'
          }, {
            type: 'pair',
            key: 'address',
            value: {
              type: 'multimap',
              value: [{
                type: 'pair',
                key: 'city',
                value: 'London'
              }]
            }
          }]
        }
      }, {
        type: 'pair',
        key: 'created',
        value: '2018-01-01'
      }]
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a dictionary 3 levels deep', () => {
    const input = `
person: {
  name: Antony
  address: {
    city: London
    country: UK
  }
  links: {
    twitter: {
      url: twitter.com/antony
      username: '@antony'
    }
  }
}
created: 2018-01-01
`;

    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'person',
        value: {
          type: 'multimap',
          value: [{
            type: 'pair',
            key: 'name',
            value: 'Antony'
          }, {
            type: 'pair',
            key: 'address',
            value: {
              type: 'multimap',
              value: [{
                type: 'pair',
                key: 'city',
                value: 'London'
              }, {
                type: 'pair',
                key: 'country',
                value: 'UK'
              }]
            }
          }, {
            type: 'pair',
            key: 'links',
            value: {
              type: 'multimap',
              value: [{
                type: 'pair',
                key: 'twitter',
                value: {
                  type: 'multimap',
                  value: [{
                    type: 'pair',
                    key: 'url',
                    value: 'twitter.com/antony'
                  }, {
                    type: 'pair',
                    key: 'username',
                    value: '@antony'
                  }]
                }
              }]
            }
          }]
        }
      }, {
        type: 'pair',
        key: 'created',
        value: '2018-01-01'
      }]
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });
});