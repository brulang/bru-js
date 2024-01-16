const parse = require('../../src/parse')

describe('bru line()', () => {


  it('should not confuse a key that starts with @ as an annotation', () => {
    const input = `
@description(Name)
@location(Bangalore)
'@name': Bruno
`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: '@name',
        value: 'Bruno',
        annotations: [{
          name: 'description',
          args: ['Name']
        }, {
          name: 'location',
          args: ['Bangalore']
        }]
      }]
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });
});