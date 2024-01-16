const parse = require('../../../src/parse')

describe('bru parse()', () => {
  // Basics
  it('should parse a string', () => {
    const input = `name: Bruno`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'name',
        value: 'Bruno'
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  // Quotes
  it('should parse a string with quotes', () => {
    const input = `name: 'Bruno'`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'name',
        value: 'Bruno'
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a string with double quotes', () => {
    const input = `name: "Bruno"`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'name',
        value: 'Bruno'
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  // Whitespaces
  it('should parse quoted strings with whitespaces', () => {
    const input = `name: 'Bruno API Client'`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'name',
        value: 'Bruno API Client'
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse double quoted strings with whitespaces', () => {
    const input = `name: "Bruno API Client"`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'name',
        value: 'Bruno API Client'
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should ignore whitespaces around the unquoted string', () => {
    const input = `name:    Bruno  `;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'name',
        value: 'Bruno'
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  // Escaping
  it('should parse a string with escaped quotes', () => {
    const input = `name: 'Bruno\'s API Client'`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'name',
        value: `Bruno's API Client`
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a string with escaped double quotes', () => {
    const input = `name: "Bruno\"s API Client"`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'name',
        value: `Bruno"s API Client`
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  it('should parse a string with a backslash', () => {
    const input = `name: Bruno\\API\\Client`;
    const expected = {
      type: 'multimap',
      value: [{
        type: 'pair',
        key: 'name',
        value: `Bruno\\API\\Client`
      }]
    }

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });
});