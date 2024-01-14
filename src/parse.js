const parse = (bruText) => {
  if (!bruText || typeof bruText !== 'string') {
    return {};
  }

  if (bruText.trim() === '') {
    return {};
  }

  function parseValue(valueText) {
    if (/^-?\d+$/.test(valueText)) {
      return parseInt(valueText, 10);
    } else if (valueText[0] === "'" && valueText.slice(-1) === "'") {
      return valueText.slice(1, -1);
    } else {
      throw new Error(`Invalid value: ${valueText}`);
    }
  }

  const lines = bruText.split('\n');
  const ast = [];

  const parseMultimap = (ast, lines) => {
    if(!lines.length) {
      return ast;
    }

    const currentLine = lines.shift().trim();

    // if the line starts with a #, it's a comment
    if (currentLine.startsWith('#')) {
      return parseMultimap(ast, lines);
    }

    // ignore empty lines
    if (currentLine === '') {
      return parseMultimap(ast, lines);
    }
    const parts = currentLine.split(':', 2);

    let key = parts[0].trim();
    let value;

    // if the line ends with a {, it's a new Multimap
    if (currentLine.endsWith('{')) {
      value = parseMultimap([], lines);

      ast.push({
        key,
        value,
      });

      return parseMultimap(ast, lines);
    }

    // if the line starts with a }, it's the end of the current Multimap
    if (currentLine.startsWith('}')) {
      return ast;
    }

    value = parseValue(parts[1].trim());

    ast.push({
      key,
      value,
    });

    return parseMultimap(ast, lines);
  }

  // The bru file is an implicit Multimap
  return parseMultimap(ast, lines);
};


module.exports = parse;