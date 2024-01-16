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

  const isValueQuoted = (value) => {
    if(!value || typeof value !== 'string') {
      return false;
    }
   
    value = value.trim();
    if (!value.length) {
      return false;
    }

    return value.startsWith("'") && value.endsWith("'") || value.startsWith('"') && value.endsWith('"');
  };

  const isLineDelimiterEndChar = (line) => {
    if(!line || typeof line !== 'string') {
      return false;
    }

    line = line.trim();
    if (!line.length) {
      return false;
    }

    // delimiters end chars are } ] '''
    return line.endsWith('}') || line.endsWith(']') || line.endsWith("'''");
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

    // if we are inside a multimap
    let insideMultimap = openBrackets.length === 0 || (openBrackets.length > 0 && openBrackets[openBrackets.length - 1] === '{');
    if (insideMultimap) {
      const parts = currentLine.trim().split(':');
      const isDelimiterEndChar = isLineDelimiterEndChar(currentLine);
      const isAnnotation = currentLine.trim().startsWith('@');

      if (!isDelimiterEndChar && !isAnnotation) {
        // ensure : is present
        if(parts.length === 1) {
          return {
            type: 'syntax',
            message: `Missing : in multimap`,
            line: lineNum
          };
        }

        let key = parts.shift().trim();
        // ensure key is not empty
        if(!key.length) {
          return {
            type: 'syntax',
            message: `Key cannot be empty`,
            line: lineNum
          };
        }

        // ensure key must not contain special characters
        let keyHasQuotes = isValueQuoted(key);
        if(!keyHasQuotes) {
          let validKeyChars = /^[a-zA-Z0-9\-_]+$/;
          if(!validKeyChars.test(key)) {
            return {
              type: 'syntax',
              message: `Key cannot characters other than a-z, A-Z, 0-9 and - and _`,
              line: lineNum
            };
          }
        }

        let value = parts.join(':').trim();
        let valueNotEmpty = value.length > 0;
        let valueNotMultimapBegin = value.length === 1 && value === '{';
        let valueNotArrayBegin = value.length === 1 && value === '[';

        // ensure unqouted values must not contain special characters
        if(valueNotEmpty && !valueNotMultimapBegin && !valueNotArrayBegin) {
          let valueHasQuotes = isValueQuoted(value);
          let specialChars = /[{}[\],]/;

          if(!valueHasQuotes && specialChars.test(value)) {
            return {
              type: 'syntax',
              message: `Unquoted value cannot contain special characters such as { } [ ] ,`,
              line: lineNum
            };
          }
        }
      }
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

