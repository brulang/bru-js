const parse = require('../../src/parse')

describe('bru parse()', () => {
  it('should parse a simple dictionary with one key and value', () => {
    const input = `name: 'Bruno'`;
    const expected = [{
      key: 'name',
      value: 'Bruno'
    }];

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a simple dictionary with multiple keys and values', () => {
    const input = `
name: 'Bruno'
age: 28
`;

    const expected = [{
      key: 'name',
      value: 'Bruno'
    }, {
      key: 'age',
      value: 28
    }];

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a dictionary 1 level deep', () => {
    const input = `
person: {
  name: 'Antony'
}
created: '2018-01-01'
`;

    const expected = [{
      key: 'person',
      value: [{
        key: 'name',
        value: 'Antony'
      }]
    }, {
      key: 'created',
      value: '2018-01-01'
    }];

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a dictionary 2 levels deep', () => {
    const input = `
person: {
  name: 'Antony'
  address: {
    city: 'London'
  }
}
created: '2018-01-01'
`;

    const expected = [{
      key: 'person',
      value: [{
        key: 'name',
        value: 'Antony'
      }, {
        key: 'address',
        value: [{
          key: 'city',
          value: 'London'
        }]
      }]
    }, {
      key: 'created',
      value: '2018-01-01'
    }];

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a dictionary 3 levels deep', () => {
    const input = `
person: {
  name: 'Antony'
  address: {
    city: 'London'
    country: 'UK'
  }
  links: {
    twitter: {
      url: 'twitter.com/antony'
      username: '@antony'
    }
  }
}
created: '2018-01-01'
`;

    const expected = [{
      key: 'person',
      value: [{
        key: 'name',
        value: 'Antony'
      }, {
        key: 'address',
        value: [{
          key: 'city',
          value: 'London'
        }, {
          key: 'country',
          value: 'UK'
        }]
      }, {
        key: 'links',
        value: [{
          key: 'twitter',
          value: [{
            key: 'url',
            value: 'twitter.com/antony'
          }, {
            key: 'username',
            value: '@antony'
          }]
        }]
      }]
    }, {
      key: 'created',
      value: '2018-01-01'
    }];

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

});