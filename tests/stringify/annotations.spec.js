const stringify = require('../../src/stringify')

describe('bru stringify()', () => {
  it('should stringify a annotation with no args', () => {
    const expected = `@ignore
name: Bruno`;

    const input = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'name',
        value: 'Bruno',
        annotations: [{
          name: 'ignore',
          args: []
        }]
      }]
    }

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  })

  it('should stringify a annotation on a key value pair', () => {
    const expected = `@description(Name)
name: Bruno`;

    const input = {
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

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  it('should stringify multiple annotations on a key value pair', () => {
    const expected = `@description(Name)
@location(Bangalore)
name: Bruno`;

    const input = {
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

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  it('should stringify multiple annotations on multiple key value pair', () => {
    const expected = `@description(Name)
@location(Bangalore)
name: Bruno
@description(Age)
@birthyear(2019)
age: 4`;
    const input = {
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

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  it('should stringify multiple annotations on multiple nested structure', () => {
    const expected = `@description(Name)
@location(Bangalore)
name: Bruno
@description(Github)
github: {
  @description(Url)
  url: github.com/usebruno/bruno
}`
    const input = {
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

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });
});
