const stringify = require('../../../src/stringify')

describe('bru stringify()', () => {
  // Basics
  it('should stringify a string', () => {
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

  // Whitespaces
  it('should stringify quoted strings with whitespaces', () => {
    const expected = `name: 'Bruno API Client'`;
    const input = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'name',
        value: 'Bruno API Client'
      }]
    }

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  // Escaping
  it('should stringify a string with escaped quotes', () => {
    const expected = `name: 'Bruno\'s API Client'`;
    const input = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'name',
        value: 'Bruno\'s API Client'
      }]
    }

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  it('should stringify a string with a backslash', () => {
    const expected = `name: Bruno\\API\\Client`;
    const input = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'name',
        value: `Bruno\\API\\Client`
      }]
    }

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });
});