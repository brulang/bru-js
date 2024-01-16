const lint = require('../../src/lint')

describe('bru lint()', () => {
  it('should return the parsed lines', () => {
    const input = `
http: {
  method: POST
  url: https://usebruno.com/echo
  headers: {
    Content-Type: application/json
  }
  body: '''
    {
      "hello": "world"
    }
  '''
}`;
    const expected = {
      error: null,
      lines: [
        '',
        'http: {',
        'method: POST',
        'url: https://usebruno.com/echo',
        'headers: {',
        'Content-Type: application/json',
        '}',
        'body: \'\'\'',
        '{',
        '  "hello": "world"',
        '}',
        '\'\'\'',
        '}'
      ]
    };

    const result = lint(input);
    expect(result).toEqual(expected);
  });
});