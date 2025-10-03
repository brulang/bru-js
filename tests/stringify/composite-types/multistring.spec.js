const parse = require('../../../src/parse')

describe('bru parse()', () => {
  it('should parse a simple multistring', () => {
    const input = `
script.pre-request: '''
  line 1
'''
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
script.pre-request: '''
  line 1
  line 2
'''
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

  it('should correctly parse indentation', () => {
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
      type: 'multimap',
      value: [
        {
          type: 'pair',
          key: 'http',
          value: {
            type: 'multimap',
            value: [
              {
                type: 'pair',
                key: 'method',
                value: 'POST'
              },
              {
                type: 'pair',
                key: 'url',
                value: 'https://usebruno.com/echo'
              },
              {
                type: 'pair',
                key: 'headers',
                value: {
                  type: 'multimap',
                  value: [
                    {
                      type: 'pair',
                      key: 'Content-Type',
                      value: 'application/json'
                    }
                  ]
                }
              },
              {
                type: 'pair',
                key: 'body',
                value: {
                  type: 'multistring',
                  value: [
                    '{',
                    '  "hello": "world"',
                    '}'
                  ]
                }
              }
            ]
          }
        }
      ]
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });
});
