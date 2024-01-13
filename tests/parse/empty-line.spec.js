const parse = require('../../src/parse')

describe('bru parse()', () => {
  it('should ignore empty lines', () => {
    const input = `
  name: 'Bruno'

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