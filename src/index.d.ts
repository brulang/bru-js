export type Primitive = number | string | boolean;

export type ArrayNode = {
  type: "array";
  value: Array<Primitive>;
};

export type MultistringNode = {
  type: "multistring";
  value: string[];
};

export type PairNode = {
  type: "pair";
  key: string | undefined;
  value: BruNode;
};

export type MultimapNode = {
  type: "multimap";
  value: Array<ArrayNode | PairNode | Primitive>;
};

export type BruNode = MultimapNode  |ArrayNode | PairNode | MultistringNode;

export type BruRoot = {
  type: "multimap";
  value: BruNode;
};

export type Error = {
  error: { type: string, message: string, line: number}
}

export type BruAST = BruRoot | Error;

export declare function parse(source: string): BruAST;
export declare function stringify(ast: BruAST): string;
