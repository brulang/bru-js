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

  const parse = (ast, lines, endChar) => {
    if (!lines.length) {
      return ast;
    }

    const currentLine = lines.shift().trim();

    // if the line starts with a #, it's a comment
    if (currentLine.startsWith('#')) {
      return parse(ast, lines, endChar, ast.type);
    }

    // ignore empty lines
    if (currentLine === '') {
      return parse(ast, lines, endChar, ast.type);
    }

    // if the line ends with the specified character, it's the end of the current structure
    if (currentLine.startsWith(endChar)) {
      return ast;
    }

    const parts = currentLine.split(':', 2);
    let key = parts[0].trim();
    let value;

    // if the line ends with { or [ or (, it's a composite data type
    if ([ '{', '[', '(' ].includes(currentLine.slice(-1))) {
      if (currentLine.endsWith('{')) {
        value = parse({ type: 'multimap', value: [] }, lines, '}');
      }

      if (currentLine.endsWith('[')) {
        value = parse({ type: 'array', value: [] }, lines, ']');
      }

      if (currentLine.endsWith('(')) {
        value = parse({ type: 'multistring', value: [] }, lines, ')');
      }

      if (ast.type === 'multimap') {
        ast.value.push({
          type: 'pair',
          key,
          value
        });
      }

      if (ast.type === 'array') {
        ast.value.push(value);
      }

      if (ast.type === 'multistring') {
        ast.value.push(value);
      }

      return parse(ast, lines, endChar, ast.type);
    }

    if (ast.type === 'multimap') {
      value = parseValue(parts[1].trim());

      ast.value.push({
        type: 'pair',
        key,
        value,
      });
    }

    if (ast.type === 'array') {
      value = parseValue(currentLine);

      ast.value.push(value);
    }

    if (ast.type === 'multistring') {
      ast.value.push(currentLine);
    }

    return parse(ast, lines, endChar, ast.type);
  };

  const lines = bruText.split('\n');
  const ast = {
    type: 'multimap',
    value: []
  };

  return parse(ast, lines, null);
};

module.exports = parseBru;