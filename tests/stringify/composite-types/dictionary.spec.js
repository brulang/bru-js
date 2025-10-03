const stringify = require('../../../src/stringify')

describe('bru stringify()', () => {
  it('should parse a simple dictionary with one key and value', () => {
    const expected = `name: Bruno`;
    const input = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'name',
        value: 'Bruno'
      }]
    }

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a simple dictionary with multiple keys and values', () => {
    const expected = `name: Bruno
age: 28`;

    const input = {
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

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a dictionary 1 level deep', () => {
    const expected = `person: {
  name: Antony
}
created: 2018-01-01`;

    const input = {
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

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a dictionary 2 levels deep', () => {
    const expected = `person: {
  name: Antony
  address: {
    city: London
  }
}
created: 2018-01-01`;

    const input = {
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

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a dictionary 3 levels deep', () => {
    const expected = `person: {
  name: Antony
  address: {
    city: London
    country: UK
  }
  links: {
    twitter: {
      url: twitter.com/antony
      username: @antony
    }
  }
}
created: 2018-01-01`;

    const input = {
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

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });
});