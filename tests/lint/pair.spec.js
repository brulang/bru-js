const parse = require('../../src/parse')

describe('bru line()', () => {
  // Missing key in pair
  it('should throw error if key is missing in pair', () => {
    const input = `: Bruno`;
    const expected = {
      "error": {
        "type": "syntax",
        "message": "Key cannot be empty",
        "line": 1
      }
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should throw error if key is missing in nested pair', () => {
    const input = `person: {
  : Bruno
}`;
    const expected = {
      "error": {
        "type": "syntax",
        "message": "Key cannot be empty",
        "line": 2
      }
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  // Special characters in Key
  it('should throw error if key has Special chars', () => {
    const input = `na me: Bruno`;
    const expected = {
      "error": {
        "type": "syntax",
        "message": "Key cannot characters other than a-z, A-Z, 0-9 and - and _",
        "line": 1
      }
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should throw error if key has Special chars (nested)', () => {
    const input = `person: {
  na me: Bruno
}`;
    const expected = {
      "error": {
        "type": "syntax",
        "message": "Key cannot characters other than a-z, A-Z, 0-9 and - and _",
        "line": 2
      }
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should not throw error if key has Special chars and is quoted', () => {
    const input = `"na me": Bruno`;
    const expected = {
      "type": "multimap",
      "value": [
        {
          "type": "pair",
          "key": "na me",
          "value": "Bruno"
        }
      ]
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should not throw error if key has Special chars and is quoted (nested)', () => {
    const input = `person: {
  "na me": Bruno
}`;
    const expected = {
      "type": "multimap",
      "value": [
        {
          "type": "pair",
          "key": "person",
          "value": {
            "type": "multimap",
            "value": [
              {
                "type": "pair",
                "key": "na me",
                "value": "Bruno"
              }
            ]
          }
        }
      ]
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  // Special characters in Value
  it('should throw error if value is unquoted and has Special chars', () => {
    const input = `name: Bruno{`;
    const expected = {
      "error": {
        "type": "syntax",
        "message": "Unquoted value cannot contain special characters such as { } [ ] ,",
        "line": 1
      }
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should not throw error if value is quoted and has Special chars', () => {
    const input = `name: "{}[],"`;
    const expected = {
      "type": "multimap",
      "value": [
        {
          "type": "pair",
          "key": "name",
          "value": "{}[],"
        }
      ]
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  // Missing : in pair
  it('should throw error if key is missing : in multimap', () => {
    const input = `
name
age: 5`;
    const expected = {
      "error": {
        "type": "syntax",
        "message": "Missing : in multimap",
        "line": 2
      }
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should throw error if key is missing : in nested multimap', () => {
    const input = `
person: {
  name
  age: 5
}`;
    const expected = {
      "error": {
        "type": "syntax",
        "message": "Missing : in multimap",
        "line": 3
      }
    };

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });
});