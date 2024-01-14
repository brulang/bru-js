const linter = (input) => {

  const lint = (lines, depth, lineNum, errors) => {
    if (!lines.length) {
      return errors;
    }

    const currentLine = lines.shift();

    // if the line starts with a #, it's a comment
    if (currentLine.startsWith('#')) {
      return lint(lines, depth, lineNum + 1, errors);
    }

    // ignore empty lines
    if (currentLine === '') {
      return lint(lines, depth, lineNum + 1, errors);
    }

    // check indentation
    const expectedIndentation = depth * 2;
    const actualIndentation = currentLine.search(/\S/);
    if (expectedIndentation !== actualIndentation) {
      errors.push({
        type: 'indentation',
        line: lineNum
      });
    }

    return lint(lines, depth, lineNum + 1, errors);
  };

  const lines = input.split('\n');
  const errors = [];
  const depth = 0;
  const lineNum = 1;

  return lint(lines, depth, lineNum, errors);
};

module.exports = linter;

