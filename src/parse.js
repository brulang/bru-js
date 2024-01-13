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
  const result = [];
  const stack = [];
  let currentPair = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue;
    }

    if (trimmedLine.endsWith('{')) {
      const parts = trimmedLine.split(':', 2);
      const newPair = {
        key: parts[0].trim(),
        value: [],
      };

      if (currentPair) {
        currentPair.value.push(newPair);
        stack.push(currentPair);
      } else {
        result.push(newPair);
      }

      currentPair = newPair;
    } else if (trimmedLine.startsWith('}')) {
      if (stack.length > 0) {
        currentPair = stack.pop();
      } else {
        currentPair = null;
      }
    } else {
      const [key, value] = trimmedLine.split(':', 2);

      if (currentPair) {
        currentPair.value.push({
          key: key.trim(),
          value: parseValue(value.trim()),
        });
      } else {
        result.push({
          key: key.trim(),
          value: parseValue(value.trim()),
        });
      }
    }
  }

  if (stack.length > 0) {
    throw new Error('Mismatched curly braces');
  }

  return result;
};


module.exports = parse;