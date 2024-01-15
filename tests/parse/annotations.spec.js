const parse = require('../../src/parse')

describe('bru parse()', () => {
  it('should parse a annotation on a key value pair', () => {
    const input = `
@description(Name)
name: Bruno
`;

    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'name',
        value: 'Bruno',
        annotations: [{
          name: 'description',
          args: ['Name']
        }]
      }]
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse multiple annotations on a key value pair', () => {
    const input = `
@description(Name)
@location(Bangalore)
name: Bruno
`;

    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'name',
        value: 'Bruno',
        annotations: [{
          name: 'description',
          args: ['Name']
        }, {
          name: 'location',
          args: ['Bangalore']
        }]
      }]
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse multiple annotations on multiple key value pair', () => {
    const input = `
@description(Name)
@location(Bangalore)
name: Bruno

@description(Age)
@birthyear(2019)
age: 4
`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'name',
        value: 'Bruno',
        annotations: [{
          name: 'description',
          args: ['Name']
        }, {
          name: 'location',
          args: ['Bangalore']
        }]
      }, {
        type: 'pair',
        key: 'age',
        value: 4,
        annotations: [{
          name: 'description',
          args: ['Age']
        }, {
          name: 'birthyear',
          args: ['2019']
        }]
      }]
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse multiple annotations on multiple nested structure', () => {
    const input = `
@description(Name)
@location(Bangalore)
name: Bruno

@description(Github)
github: {
  @description(Url)
  url: 'github.com/usebruno/bruno'
}
`
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'name',
        value: 'Bruno',
        annotations: [{
          name: 'description',
          args: ['Name']
        }, {
          name: 'location',
          args: ['Bangalore']
        }]
      }, {
        type: 'pair',
        key: 'github',
        value: {
          type: 'multimap',
          value: [{
            type: 'pair',
            key: 'url',
            value: 'github.com/usebruno/bruno',
            annotations: [{
              name: 'description',
              args: ['Url']
            }]
          }]
        },
        annotations: [{
          name: 'description',
          args: ['Github']
        }]
      }]
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });
});
