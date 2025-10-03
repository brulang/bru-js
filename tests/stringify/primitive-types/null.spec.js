const stringify = require('../../../src/stringify')

describe('bru stringify()', () => {
  it('should stringify null', () => {
    const expected = `nothing: null`;
    const input = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'nothing',
        value: null
      }]
    }

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  // NOTE: skipped since quote data isn't stored right now
  it.skip('should stringify null as a string if it is quoted', () => {
    const expected = `nothing: 'null'`;
    const input = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'nothing',
        value: 'null'
      }]
    }

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });
});