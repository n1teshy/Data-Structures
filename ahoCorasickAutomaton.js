const words = ["this", "is", "a", "sentence", "his", "sent", "ten"];

class Vertex {
  constructor() {
    this.children = {};
    this.word = null;
    this.links = {
      failure: null,
      outputs: [],
    };
  }

  isFinal() {
    return this.word !== null;
  }
}

class Trie {
  constructor() {
    this.root = new Vertex();
  }

  addWord(str) {
    let node = this.root;
    for (let i = 0; i < str.length; i++) {
      const character = str[i];
      if (node.children[character] === undefined) {
        node.children[character] = new Vertex();
      }
      node = node.children[character];
      if (i === str.length - 1) {
        node.word = str;
      }
    }
  }

  getProperSuffixes(word) {
    const suffixes = [];
    if (!word) {
      return suffixes;
    }
    for (let index = 1; index < word.length; index++) {
      suffixes.push(word.substr(index, word.length - 1));
    }
    suffixes.push("");
    return suffixes;
  }

  setLinks() {
    this.root.links.failure = this.root;
    for (let childLetter in this.root.children) {
      this._setLinks(childLetter, this.root.children[childLetter]);
    }
  }

  _setLinks(str, node) {
    const suffixes = this.getProperSuffixes(str);
    let failureNode = null;
    let outputNodes = [];
    for (let suffix of suffixes) {
      if (failureNode === null) {
        const foundFailureNode = this.getFailureNode(suffix);
        if (foundFailureNode !== null) {
          failureNode = foundFailureNode;
        }
      }
      const output = this.getOutputNode(suffix);
      if (output !== null) {
        outputNodes.push(output);
      }
    }
    node.links.failure = failureNode === null ? this.root : failureNode;
    node.links.outputs = outputNodes;

    for (let childLetter in node.children) {
      this._setLinks(str + childLetter, node.children[childLetter]);
    }
  }

  getFailureNode(word) {
    let node = this.root;
    let root = this.root;
    if (word) {
      for (let i = 0; i < word.length; i++) {
        const character = word[i];
        if (root.children[character] !== undefined) {
          root = root.children[character];
          if (i === word.length - 1) {
            node = root;
          }
        }
      }
    }
    return node;
  }

  getOutputNode(word) {
    let node = null;
    let root = this.root;

    if (word) {
      for (let i = 0; i < word.length; i++) {
        const character = word[i];
        if (root.children[character] === undefined) {
          break;
        }
        root = root.children[character];
        if (i === word.length - 1) {
          node = root;
        }
      }
    }
    return node && node.isFinal() ? node : null;
  }

  getWords() {
    const container = [];
    this._getWords(this.root, container);
    return container;
  }

  _getWords(node, arr) {
    if (node.isFinal()) {
      arr.push(node.word);
    }

    for (let character in node.children) {
      this._getWords(node.children[character], arr);
    }
  }

  sequenceExists(word) {
    let index = 0;
    let node = this.root;
    while (index < word.length) {
      if (node.children[word[index]] !== undefined) {
        node = node.children[word[index]];
        index++;
      } else {
        break;
      }
    }
    return word.substr(0, index);
  }

  wordExists(word) {
    let index = 0;
    let node = this.root;
    while (index < word.length) {
      if (node.children[word[index]] !== undefined) {
        node = node.children[word[index]];
        index++;
      }
    }
    return index === word.length && node.isFinal();
  }
}

const trie = new Trie();
for (let word of words) {
  trie.addWord(word);
}
trie.setLinks();
const text = "thisisasentence";
trie
  .getMatches(text)
  .forEach((indices) => console.log(text.substring(indices[0], indices[1])));
