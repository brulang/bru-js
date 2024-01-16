const lint = require('../../src/lint')

describe('bru lint()', () => {
  it('should catch errors due to not closing the composite types correctly', () => {
    const input = `
person: {
  name: 'Bruno'
`
    const expected = {
      error: {
        type: 'syntax',
        message: 'Expected } but found end of file',
        line: 4
      }
    };

    const result = lint(input);
    expect(result).toEqual(expected);
  });

  it('should catch errors due to mismatched closing brackets', () => {
    const input = `
person: {
  name: 'Bruno'
]`
    const expected = {
      error: {
        type: 'syntax',
        message: 'Expected } but found ]',
        line: 4
      }
    };

    const result = lint(input);
    expect(result).toEqual(expected);
  });
});