const linter = (input) => {
  const getClosingBracket = (openBracket) => {
    switch (openBracket) {
      case '{': return '}';
      case '[': return ']';
      case '(': return ')';
      default: return '';
    }
  };

  const isMatchingBracket = (openBracket, closeBracket) => {
    return getClosingBracket(openBracket) === closeBracket;
  };

  const lint = (lines, depth, lineNum, openBrackets) => {
    if (!lines.length) {
      if (openBrackets.length > 0) {
        const lastOpenBracket = openBrackets.pop();
        return {
          type: 'syntax',
          message: `Expected ${getClosingBracket(lastOpenBracket)} but found end of file`,
          line: lineNum - 1 // lineNum is already incremented
        };
      }
      return null;
    }

    const currentLine = lines.shift();

    // if the line starts with a #, it's a comment
    if (currentLine.startsWith('#')) {
      return lint(lines, depth, lineNum + 1, openBrackets);
    }

    // ignore empty lines
    if (currentLine === '') {
      return lint(lines, depth, lineNum + 1, openBrackets);
    }

    // if the line ends with { or [ or (, it's a composite data type
    if ([ '{', '[', '(' ].includes(currentLine.slice(-1))) {
      openBrackets.push(currentLine.trim().slice(-1));

      return lint(lines, depth + 1, lineNum + 1, openBrackets);
    }

    // if the line starts with } or ] or ), it's the closing bracket
    if ([ '}', ']', ')' ].includes(currentLine.trim())) {
      const lastOpenBracket = openBrackets.pop();
      if (!lastOpenBracket || !isMatchingBracket(lastOpenBracket, currentLine.trim())) {
        return {
          type: 'syntax',
          message: `Expected ${getClosingBracket(lastOpenBracket)} but found ${currentLine.trim()}`,
          line: lineNum
        };
      }

      depth -= 1;
    }

    // check indentation
    const expectedIndentation = depth * 2;
    const actualIndentation = currentLine.search(/\S/);
    if (expectedIndentation !== actualIndentation) {
      return {
        type: 'indentation',
        message: `Expected indentation of ${expectedIndentation} spaces but found ${actualIndentation}`,
        line: lineNum
      };
    }

    return lint(lines, depth, lineNum + 1, openBrackets);
  };

  const lines = input.split('\n');
  const depth = 0;
  const lineNum = 1;
  const openBrackets = [];

  return lint(lines, depth, lineNum, openBrackets);
};

module.exports = linter;

