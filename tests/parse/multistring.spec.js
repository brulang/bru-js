const parse = require('../../src/parse')

describe('bru parse()', () => {
  it('should parse a simple multistring', () => {
    const input = `
script.pre-request: (
  line 1
)
`
    const expected = {
      type: 'multimap',
      value: [
        {
          type: 'pair',
          key: 'script.pre-request',
          value: {
            type: 'multistring',
            value: ['line 1']
          }
        }
      ]
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a simple multistring with 2 lines', () => {
    const input = `
script.pre-request: (
  line 1
  line 2
)
`
    const expected = {
      type: 'multimap',
      value: [
        {
          type: 'pair',
          key: 'script.pre-request',
          value: {
            type: 'multistring',
            value: ['line 1', 'line 2']
          }
        }
      ]
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });
});