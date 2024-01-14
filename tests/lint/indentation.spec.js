const lint = require('../../src/lint')

describe('bru lint()', () => {
  it('should catch indentation errors', () => {
    const input = `
  name: 'Bruno'
`
    const expected = [{
      type: 'indentation',
      line: 2
    }]

    const errors = lint(input);
    expect(errors).toEqual(expected);
  });
});
