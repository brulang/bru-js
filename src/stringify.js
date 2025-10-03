function astToBru(ast) {
  function indent(str, depth = 0, trim = true) {
    let content = str;
    if (trim) {
      content = content.trim();
    }
    return " ".repeat(2 * depth) + content;
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
    const lines = [];
    if ("annotations" in node && Array.isArray(node.annotations)) {
      for (let an of node.annotations) {
        let annotationLine = `@${an.name}`;
        if (an.args.length) {
          annotationLine += `(${an.args.join(",")})`;
        }
        lines.push(indent(annotationLine, depth));
      }
    }
    return lines
      .concat(indent(`${node.key}: ` + stringify(node.value, depth + 1), depth))
      .join("\n");
  }

  function stringifyArray(node, depth = 0) {
    if (node.type !== "array") {
      return "";
    }
    return (
      `[\n` +
      node.value
        .map((childNode) => indent(stringify(childNode, depth + 1), depth))
        .join("\n") +
      `\n${indent("]", depth - 1)}`
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
      node.value.map((childNode) => stringify(childNode, depth)).join("\n")
    );
  }

  function stringifyMultistring(node, depth = 0) {
    return (
      "'''\n" +
      node.value
        .map((childNode) => {
          return indent(childNode, depth, false);
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
