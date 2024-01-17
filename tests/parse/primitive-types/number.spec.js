const parse = require('../../../src/parse')

describe('bru parse()', () => {
  it('should parse an integer', () => {
    const input = `age: 42`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'age',
        value: 42
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a negative integer', () => {
    const input = `age: -42`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'age',
        value: -42
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a float', () => {
    const input = `pi: 3.14`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: 3.14
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a negative float', () => {
    const input = `pi: -3.14`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: -3.14
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a float with a leading decimal', () => {
    const input = `pi: .14`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: 0.14
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a negative float with a leading decimal', () => {
    const input = `pi: -.14`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: -0.14
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a float with a leading zero', () => {
    const input = `pi: 0.14`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: 0.14
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a negative float with a leading zero', () => {
    const input = `pi: -0.14`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: -0.14
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a float with an exponent', () => {
    const input = `pi: 3.14e2`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: 314
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a negative float with an exponent', () => {
    const input = `pi: -3.14e2`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: -314
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a float with a negative exponent', () => {
    const input = `pi: 3.14e-2`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: 0.0314
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a negative float with a negative exponent', () => {
    const input = `pi: -3.14e-2`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: -0.0314
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a float with a positive exponent', () => {
    const input = `pi: 3.14e+2`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: 314
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a negative float with a positive exponent', () => {
    const input = `pi: -3.14e+2`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: -314
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a float with a positive exponent and a leading decimal', () => {
    const input = `pi: .14e+2`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: 14
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a negative float with a positive exponent and a leading decimal', () => {
    const input = `pi: -.14e+2`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: -14
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should not parse a number if it is in single quotes', () => {
    const input = `pi: '3.14'`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: '3.14'
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should not parse a number if it is in double quotes', () => {
    const input = `pi: "3.14"`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: '3.14'
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  // Number.MAX_SAFE_INTEGER is 9007199254740991
  it('should parse number as string if it is out of bounds of MAX_SAFE_INTEGER', () => {
    const input = `pi: 9007199254740992`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: '9007199254740992'
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse number as string if it is out of bounds of MIN_SAFE_INTEGER', () => {
    const input = `pi: -9007199254740992`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: '-9007199254740992'
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse number as string if it is out of bounds of MAX_SAFE_INTEGER and has a decimal', () => {
    const input = `pi: 9007199254740992.1`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: '9007199254740992.1'
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse number as string if it is out of bounds of MIN_SAFE_INTEGER and has a decimal', () => {
    const input = `pi: -9007199254740992.1`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: '-9007199254740992.1'
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse semantic version as string', () => {
    const input = `version: 1.0.0`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'version',
        value: '1.0.0'
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });
});