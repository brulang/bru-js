const parse = require('../../src/parse')

describe('bru parse()', () => {
  it('should ignore comments', () => {
    const input = `
  name: 'Bruno'

  # this is a comment
  age: 28

  `;

    const expected = [{
      key: 'name',
      value: 'Bruno'
    }, {
      key: 'age',
      value: 28
    }];

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });
});