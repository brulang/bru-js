const stringify = require('../../../src/stringify')

describe('bru parse()', () => {
  it('should stringify a simple multistring', () => {
    const expected = `script.pre-request: '''
  line 1
'''`
    const input = {
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

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  it('should stringify a simple multistring with 2 lines', () => {
    const expected = `script.pre-request: '''
  line 1
  line 2
'''`
    const input = {
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

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  it('should correctly stringify indentation', () => {
    const expected = `http: {
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
    const input = {
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

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });
});
