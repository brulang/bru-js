const stringify = require('../../../src/stringify')

describe('bru stringify()', () => {
  it('should stringify a boolean', () => {
    const input = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'isTrue',
        value: true
      }]
    }
    const expected = `isTrue: true`;
    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  it('should stringify a boolean', () => {
    const expected = `isFalse: false`;
    const input = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'isFalse',
        value: false
      }]
    }

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  it('should stringify as a string if it is quoted', () => {
    const expected = `isTrue: 'true'`;
    const input = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'isTrue',
        value: 'true'
      }]
    }

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  it('should stringify as a string if it is quoted', () => {
    const expected = `isFalse: 'false'`;
    const input = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'isFalse',
        value: 'false'
      }]
    }

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });
});