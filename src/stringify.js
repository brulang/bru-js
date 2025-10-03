function astToBru(ast) {
  function indent(str, depth = 0) {
    return " ".repeat(2 * depth) + str.trim();
  }

  function stringify(node, depth = 0) {
    if (node == null) {
      return "null";
    }

    // stringify primitives types
    if (typeof node === "string") {
      // Force quote boolean values if they were parsed in as string
      if (node === "true" || node === "false") {
        return `'${node}'`;
      }

      // If there's white spaces, add in quotes
      // TODO: reaper, might be easier to just keep everything quoted
      return node.split(/\s+/).length > 1 ? `'${node}'` : node;
    }

    if (["number", "boolean"].includes(typeof node)) {
      return node;
    }

    // stringify composite types
    if (typeof node === "object" && node !== null && "type" in node) {
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
        case "multistring":
          return stringifyMultistring(node, depth);
      }
    }
  }

  function stringifyPair(node, depth = 0) {
    if (node.type !== "pair") {
      return "";
    }
    return indent(`${node.key}: ` + stringify(node.value, depth), depth);
  }

  function stringifyArray(node, depth = 0) {
    if (node.type !== "array") {
      return "";
    }
    return (
      `[\n` +
      node.value.map((d) => indent(stringify(d, depth), depth)).join("\n") +
      `\n${indent("]", depth)}`
    );
  }

  function stringifyMultimap(node, depth = 0) {
    if (node.type !== "multimap") {
      return "";
    }
    const wrap = (content) => {
      if (depth === 0) {
        return content;
      }
      return "{\n" + content + `\n${indent("}", depth - 1)}`;
    };
    return wrap(
      node.value
        .map((d) => {
          return indent(stringify(d, depth + 1), depth);
        })
        .join("\n")
    );
  }

  function stringifyMultistring(node, depth = 0) {
    return (
      "'''\n" +
      node.value
        .map((d) => {
          return indent(d, depth);
        })
        .join("\n") +
      `\n${indent("'''", depth - 1)}
    `
    );
  }

  // Considering the root is always a multimap
  return stringifyMultimap(ast);
}

module.exports = astToBru;
