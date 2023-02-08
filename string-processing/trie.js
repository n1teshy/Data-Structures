class Vertex {
  constructor() {
    this.children = {};
    this.word = null;
    this.links = {
      failure: null,
      output: null,
    };
  }

  isLeaf() {
    return this.word !== null;
  }
}

class Trie {
  constructor() {
    this.root = new Vertex();
  }

  addWord(str) {
    let node = this.root;
    for (let character of str) {
      if (node.children[character] === undefined) {
        node.children[character] = new Vertex();
      }
      node = node.children[character];
    }
  }

  print() {
    console.log(this.root);
  }
}

const trie = new Trie();
trie.print();
