const lint = require('./lint');

const parseBru = (bruText) => {
  if (!bruText || typeof bruText !== 'string') {
    return {};
  }

  if (bruText.trim() === '') {
    return {};
  }

  const parseKey = (keyText) => {
    if (!keyText || typeof keyText !== 'string') {
      return '';
    }

    keyText = keyText.trim();

    if (!keyText.length) {
      return '';
    }

    if (
      keyText[0] === "'" && keyText.slice(-1) === "'" || 
      keyText[0] === '"' && keyText.slice(-1) === '"'
    ) {
      return keyText.slice(1, -1);
    }

    return keyText;
  }

  const parseValue = (valueText) => {
    valueText = valueText.trim();

    // boolean
    if (valueText === 'true') {
      return true;
    }
    if (valueText === 'false') {
      return false;
    }

    // null
    if (valueText === 'null') {
      return null;
    }

    // integer
    if (/^-?\d+$/.test(valueText)) {
      const intValue = parseInt(valueText, 10);
      if (Math.abs(intValue) <= Number.MAX_SAFE_INTEGER) {
        return intValue;
      }
    }
  
    // floating-point number with optional sign and exponent
    const floatMatch = /^[+\-]?\d*(\.\d+)?([eE][+\-]?\d+)?$/.exec(valueText);
    if (floatMatch) {
      const floatValue = parseFloat(valueText);
      if (Math.abs(floatValue) <= Number.MAX_SAFE_INTEGER) {
        return floatValue;
      }
    }

    // numbers with optional signs
    const signedNumberMatch = /^[+\-]?\d+(\.\d+)?$/.exec(valueText);
    if (signedNumberMatch) {
      const parsedNumber = parseFloat(valueText);
      if (Math.abs(parsedNumber) <= Number.MAX_SAFE_INTEGER) {
        return parsedNumber;
      }
    }

    // strings enclosed in single or double quotes
    if (
      (valueText[0] === "'" && valueText.slice(-1) === "'") ||
      (valueText[0] === '"' && valueText.slice(-1) === '"')
    ) {
      return valueText.slice(1, -1);
    }

    return valueText;
  };
  

  const parse = (ast, lines, endChar) => {
    if (!lines.length) {
      return ast;
    }

    const currentLine = lines.shift();

    // if the line starts with a #, it's a comment
    if (currentLine.trim().startsWith('#')) {
      return parse(ast, lines, endChar, ast.type);
    }

    // ignore empty lines
    if (currentLine.trim() === '') {
      return parse(ast, lines, endChar, ast.type);
    }

    // if the line ends with the specified character, it's the end of the current structure
    if (currentLine.startsWith(endChar)) {
      return ast;
    }

    // if we are in a multistring, just add the line to the value
    if (ast.type === 'multistring') {
      ast.value.push(currentLine);

      return parse(ast, lines, endChar, ast.type);
    }

    const isAnnotation = currentLine.startsWith('@');
    if (isAnnotation) {
      const parts = currentLine.split('(', 2);
      const annotationName = parts[0].slice(1);
      const annotationArgs = parts[1].slice(0, -1).split(',').map(arg => arg.trim());

      if (ast.type === 'multimap') {
        ast.annotations = ast.annotations || [];
        ast.annotations.push({
          name: annotationName,
          args: annotationArgs
        });
      }

      return parse(ast, lines, endChar, ast.type);
    }

    // split the currentLine by the first colon
    const parts = currentLine.split(':');
    let key = parts.shift().trim();
    let value;

    let isMultiMapBegin = currentLine.trim().endsWith('{');
    let isMultiArrayBegin = currentLine.trim().endsWith('[');
    let isMultiStringBegin = currentLine.trim().endsWith("'''") && currentLine.trim().length > 3;

    if (isMultiMapBegin || isMultiArrayBegin || isMultiStringBegin) {
      if (isMultiMapBegin) {
        value = parse({ type: 'multimap', value: [] }, lines, '}');
      }

      if (isMultiArrayBegin) {
        value = parse({ type: 'array', value: [] }, lines, ']');
      }

      if (isMultiStringBegin) {
        value = parse({ type: 'multistring', value: [] }, lines, "'''");
      }

      if (ast.type === 'multimap') {
        let pair = {
          type: 'pair',
          key: parseKey(key),
          value
        };

        // if the pair has annotations, move them to the pair
        if (ast.annotations && ast.annotations.length) {
          pair.annotations = ast.annotations;
          delete ast.annotations;
        }

        ast.value.push(pair);
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
      value = parseValue(parts.join(':').trim());
      let pair = {
        type: 'pair',
        key: parseKey(key),
        value,
      };

      // if the pair has annotations, move them to the pair
      if (ast.annotations && ast.annotations.length) {
        pair.annotations = ast.annotations;
        delete ast.annotations;
      }

      ast.value.push(pair);
    }

    if (ast.type === 'array') {
      value = parseValue(currentLine.trim());

      ast.value.push(value);
    }

    return parse(ast, lines, endChar, ast.type);
  };

  const lintResult = lint(bruText);

  if (lintResult.error) {
    return {
      error: lintResult.error
    };
  }

  const lines = lintResult.lines;
  const ast = {
    type: 'multimap',
    value: []
  };

  return parse(ast, lines, null);
};

module.exports = parseBru;