function astToBru(ast) {
  function indent(str, depth = 0) {
    return "  ".repeat(depth) + str;
  }

  function stringifyComposite(node, depth = 0) {
    switch (node.type) {
      case "pair": {
        return stringifyPair(node, depth);
      }
      case "multimap": {
        return stringifyMultimap(node, depth);
      }
      case "array": {
        return stringifyArray(node, depth);
      }
      default:
        if (typeof node === "string") {
          return `"${node}"`;
        }
        if (["number", "boolean"].includes(typeof node)) {
          return node;
        }
    }
  }

  function stringifyPair(node, depth = 0) {
    if (node.type !== "pair") {
      return "";
    }
    return indent(
      `${node.key}: ` + stringifyComposite(node.value, depth + 1),
      depth
    );
  }

  function stringifyArray(node, depth = 0) {
    if (node.type !== "array") {
      return "";
    }
    return (
      `[\n` +
      node.value
        .map((d) => indent(stringifyComposite(d, depth + 1), depth + 1))
        .join("\n") +
      `\n${indent("]", depth)}`
    );
  }

  function stringifyMultimap(node, depth = 0) {
    if (node.type !== "multimap") {
      return "";
    }
    return (
      "{\n" +
      node.value
        .map((d) => {
          return indent(stringifyComposite(d, depth + 1), depth + 1);
        })
        .join("\n") +
      `\n${indent("}", depth)}`
    );
  }

  return stringifyMultimap(ast);
}

module.exports = astToBru;
