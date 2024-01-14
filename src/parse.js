const parseBru = (bruText) => {
  if (!bruText || typeof bruText !== 'string') {
    return {};
  }

  if (bruText.trim() === '') {
    return {};
  }

  const parseValue = (valueText) => {
    if (/^-?\d+$/.test(valueText)) {
      return parseInt(valueText, 10);
    } else if (valueText[0] === "'" && valueText.slice(-1) === "'") {
      return valueText.slice(1, -1);
    } else {
      throw new Error(`Invalid value: ${valueText}`);
    }
  }

  const lines = bruText.split('\n');
  const ast = {
    type: 'multimap',
    value: []
  };

  const parse = (ast, lines, endChar, currentType) => {
    if (!lines.length) {
      return ast;
    }

    const currentLine = lines.shift().trim();

    // if the line starts with a #, it's a comment
    if (currentLine.startsWith('#')) {
      return parse(ast, lines, endChar, currentType);
    }

    // ignore empty lines
    if (currentLine === '') {
      return parse(ast, lines, endChar, currentType);
    }

    // if the line ends with the specified character, it's the end of the current structure
    if (currentLine.startsWith(endChar)) {
      return ast;
    }

    const parts = currentLine.split(':', 2);
    let key = parts[0].trim();
    let value;

    // if the line ends with a {, it's a new Multimap
    if (currentLine.endsWith('{')) {
      value = parse({
        type: 'multimap',
        value: []
      }, lines, '}', 'multimap');

      if (currentType === 'multimap') {
        ast.value.push({
          type: 'pair',
          key,
          value
        });
      }

      if (currentType === 'array') {
        ast.value.push(value);
      }

      return parse(ast, lines, endChar, currentType);
    }

    // if the line ends with a [, it's a new Array
    if (currentLine.endsWith('[')) {
      value = parse({
        type: 'array',
        value: []
      }, lines, ']', 'array');

      if (currentType === 'multimap') {
        ast.value.push({
          type: 'pair',
          key,
          value
        });
      }

      if (currentType === 'array') {
        ast.value.push(value);
      }

      return parse(ast, lines, endChar, currentType);
    }

    if (currentType === 'multimap') {
      value = parseValue(parts[1].trim());

      ast.value.push({
        type: 'pair',
        key,
        value,
      });
    }

    if (currentType === 'array') {
      value = parseValue(currentLine);

      ast.value.push(value);
    }

    return parse(ast, lines, endChar, currentType);
  };

  // The bru file is an implicit Multimap
  return parse(ast, lines, null, 'multimap');
};

module.exports = parseBru;