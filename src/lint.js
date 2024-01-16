const linter = (input) => {
  const getClosingBracket = (openBracket) => {
    switch (openBracket) {
      case '{': return '}';
      case '[': return ']';
      case "'''": return "'''";
      default: return '';
    }
  };

  const isMatchingBracket = (openBracket, closeBracket) => {
    return getClosingBracket(openBracket) === closeBracket;
  };

  const lint = (lines, parsedLines, depth, lineNum, openBrackets) => {
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
    if (currentLine.trim().startsWith('#')) {
      parsedLines.push(currentLine);
      return lint(lines, parsedLines, depth, lineNum + 1, openBrackets);
    }

    // ignore empty lines
    if (currentLine.trim() === '') {
      parsedLines.push(currentLine);
      return lint(lines, parsedLines, depth, lineNum + 1, openBrackets);
    }

    // if we are in a multistring, just add the line to the value
    let insideMultistring = openBrackets.length > 0 && openBrackets[openBrackets.length - 1] === "'''";
    let multistringEndReached = currentLine.trim().startsWith("'''") && currentLine.trim().length === 3;

    if (insideMultistring && !multistringEndReached) {
      // check indentation
      const expectedIndentation = depth * 2;
      const actualIndentation = currentLine.search(/\S/);
      if (expectedIndentation > actualIndentation) {
        return {
          type: 'indentation',
          message: `Expected indentation of ${expectedIndentation} spaces but found ${actualIndentation}`,
          line: lineNum
        };
      }
      parsedLines.push(currentLine.slice(expectedIndentation));

      return lint(lines, parsedLines, depth, lineNum + 1, openBrackets);
    }

    // if the line ends with { or [ or (, it's a composite data type
    let isMultiMapBegin = currentLine.trim().endsWith('{');
    let isMultiArrayBegin = currentLine.trim().endsWith('[');
    let isMultiStringBegin = currentLine.trim().endsWith("'''") && currentLine.trim().length > 3;
    if (isMultiMapBegin || isMultiArrayBegin || isMultiStringBegin) {
      if (isMultiMapBegin) {
        openBrackets.push('{');
      } else if (isMultiArrayBegin) {
        openBrackets.push('[');
      } else if (isMultiStringBegin) {
        openBrackets.push("'''");
      }

      parsedLines.push(currentLine.trim());

      return lint(lines, parsedLines, depth + 1, lineNum + 1, openBrackets);
    }

    let isMultiMapEnd = currentLine.trim().startsWith('}');
    let isMultiArrayEnd = currentLine.trim().startsWith(']');
    let isMultiStringEnd = currentLine.trim().startsWith("'''") && currentLine.trim().length === 3;

    if (isMultiMapEnd || isMultiArrayEnd || isMultiStringEnd) {
      const lastOpenBracket = openBrackets.pop();
      let isMatching;

      if (isMultiMapEnd) {
        isMatching = isMatchingBracket(lastOpenBracket, '}');
      } else if (isMultiArrayEnd) {
        isMatching = isMatchingBracket(lastOpenBracket, ']');
      } else if (isMultiStringEnd) {
        isMatching = isMatchingBracket(lastOpenBracket, "'''");
      }

      if (!isMatching) {
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
    parsedLines.push(currentLine.slice(actualIndentation));

    return lint(lines, parsedLines, depth, lineNum + 1, openBrackets);
  };

  const lines = input.split(/\r?\n/);
  const depth = 0;
  const lineNum = 1;
  const openBrackets = [];
  const parsedLines = [];

  const error = lint(lines, parsedLines, depth, lineNum, openBrackets);

  return error ? { error } : {
    error: null,
    lines: parsedLines
  }
};

module.exports = linter;

