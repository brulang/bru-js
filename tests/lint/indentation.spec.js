const lint = require('../../src/lint')

describe('bru lint()', () => {
  it('should catch indentation errors', () => {
    const input = `
  name: 'Bruno'
`
    const expected = {
      type: 'indentation',
      message: 'Expected indentation of 0 spaces but found 2',
      line: 2
    };

    const error = lint(input);
    expect(error).toEqual(expected);
  });

it('should catch indentation errors due to spaces before the key', () => {
    const input = `
person: {
   name: 'Bruno'
}
`
    const expected = {
      type: 'indentation',
      message: 'Expected indentation of 2 spaces but found 3',
      line: 3
    };

    const errors = lint(input);
    expect(errors).toEqual(expected);
  });

  it('should catch errors due to not closing the composite types correctly', () => {
    const input = `
person: {
  name: 'Bruno'
`
    const expected = {
      type: 'syntax',
      message: 'Expected } but found end of file',
      line: 4
    };

    const errors = lint(input);
    expect(errors).toEqual(expected);
  });

  it('should catch errors due to mismatched closing brackets', () => {
    const input = `
person: {
  name: 'Bruno'
]`
    const expected = {
      type: 'syntax',
      message: 'Expected } but found ]',
      line: 4
    };

    const errors = lint(input);
    expect(errors).toEqual(expected);
  });

  it('should pass when there are no errors', () => {
    const input = `
person: {
  name: 'Bruno'
  age: 21
  hobbies: [
    programming
    gaming
  ]
  links: [
    {
      name: 'GitHub'
      url: 'github.com/usebruno/bruno'
    }
    {
      name: 'Twitter'
      url: 'twitter.com/use_bruno'
    }
  ]
  projects: [
    {
      name: 'Bruno'
      url: 'github.com/usebruno/bruno'
      description: '''
        Opensource API Client!
      '''
    }
  ]
}
`
    const expected = null;

    const errors = lint(input);
    expect(errors).toEqual(expected);
  });
});
