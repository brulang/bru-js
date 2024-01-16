const parse = require('../../../src/parse')

describe('bru parse()', () => {
  it('should parse null', () => {
    const input = `nothing: null`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'nothing',
        value: null
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse null as a string if it is quoted', () => {
    const input = `nothing: 'null'`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'nothing',
        value: 'null'
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });
});