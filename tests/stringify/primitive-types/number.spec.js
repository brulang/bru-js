const stringify = require('../../../src/stringify')

describe('bru stringify()', () => {
  it('should stringify an integer', () => {
    const expected = `age: 42`;
    const input = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'age',
        value: 42
      }]
    }

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  it('should stringify a negative integer', () => {
    const expected = `age: -42`;
    const input = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'age',
        value: -42
      }]
    }

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  it('should stringify a float', () => {
    const expected = `pi: 3.14`;
    const input = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: 3.14
      }]
    }

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  it('should stringify a negative float', () => {
    const expected = `pi: -3.14`;
    const input = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: -3.14
      }]
    }

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  it('should stringify a float with a leading zero', () => {
    const expected = `pi: 0.14`;
    const input = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: 0.14
      }]
    }

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  it('should stringify a negative float with a leading zero', () => {
    const expected = `pi: -0.14`;
    const input = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: -0.14
      }]
    }

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  it.skip('should stringify a float with a positive exponent', () => {
    const expected = `pi: 3.14e+2`;
    const input = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: 314
      }]
    }

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  it.skip('should stringify a negative float with a positive exponent', () => {
    const expected = `pi: -3.14e+2`;
    const input = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: -314
      }]
    }

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  // NOTE: skipped till parser supports passing down quote info
  it.skip('should not parse a number if it is in single quotes', () => {
    const expected = `pi: 3.14`;
    const input = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: '3.14'
      }]
    }

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  // Number.MAX_SAFE_INTEGER is 9007199254740991
  // NOTE: skipped till parser supports passing down quote info
  it.skip('should stringify number as string if it is out of bounds of MAX_SAFE_INTEGER', () => {
    const expected = `pi: 9007199254740992`;
    const input = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: '9007199254740992'
      }]
    }

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  // NOTE: skipped till parser supports passing down quote info
  it.skip('should stringify number as string if it is out of bounds of MIN_SAFE_INTEGER', () => {
    const expected = `pi: '-9007199254740992'`;
    const input = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: '-9007199254740992'
      }]
    }

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  // NOTE: skipped till parser supports passing down quote info
  it.skip('should stringify number as string if it is out of bounds of MAX_SAFE_INTEGER and has a decimal', () => {
    const expected = `pi: 9007199254740992.1`;
    const input = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: '9007199254740992.1'
      }]
    }

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  // NOTE: skipped till parser supports passing down quote info
  it.skip('should stringify number as string if it is out of bounds of MIN_SAFE_INTEGER and has a decimal', () => {
    const expected = `pi: -9007199254740992.1`;
    const input = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'pi',
        value: '-9007199254740992.1'
      }]
    }

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });

  // NOTE: skipped till parser supports passing down quote info
  it.skip('should stringify semantic version as string', () => {
    const expected = `version: 1.0.0`;
    const input = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'version',
        value: '1.0.0'
      }]
    }

    const actual = stringify(input);
    expect(actual).toEqual(expected);
  });
});