const parse = require('../../../src/parse')

describe('bru parse()', () => {
  it('should parse a boolean', () => {
    const input = `isTrue: true`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'isTrue',
        value: true
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a boolean', () => {
    const input = `isFalse: false`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'isFalse',
        value: false
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse as a string if it is quoted', () => {
    const input = `isTrue: 'true'`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'isTrue',
        value: 'true'
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse as a string if it is quoted', () => {
    const input = `isFalse: 'false'`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'isFalse',
        value: 'false'
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });
});