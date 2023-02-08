class Node {
  constructor(key, data = null) {
    this.key = key;
    this.data = data;
    this.parent = null;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  push(key, data) {
    const node = new Node(key, data);
    if (this.root === null) {
      this.root = node;
      this.size++;
      return;
    }
    let previous = null;
    let current = this.root;
    while (current !== null) {
      previous = current;
      if (key < current.key) {
        current = current.left;
      } else if (key > current.key) {
        current = current.right;
      } else {
        console.log(`node with key ${key} already exists`);
        return;
      }
    }
    if (key < previous.key) {
      previous.left = node;
    } else {
      previous.right = node;
    }
    node.parent = previous;
    this.size++;
  }

  search(key) {
    let node = this.root;
    while (node !== null) {
      if (node.key === key) {
        break;
      }
      node = key < node.key ? node.left : node.right;
    }
    return node;
  }

  delete(key) {
    const nodeToReplace = this.search(key);
    if (nodeToReplace === null) {
      return;
    }
    if (nodeToReplace.left === null) {
      this.transplant(nodeToReplace, nodeToReplace.right);
    } else if (nodeToReplace.right === null) {
      this.transplant(nodeToReplace, nodeToReplace.left);
    } else {
      // When the node being deleted has both children, the successor(the smallest child in the right subtree
      // or the greatest child in the left subtree) of the node takes its place
      const successor = this.getMinimum(nodeToReplace.right);
      if (successor.parent !== nodeToReplace) {
        this.transplant(successor, successor.right);
        successor.right = nodeToReplace.right;
        successor.right.parent = successor;
      }
      this.transplant(nodeToReplace, successor);
      successor.left = nodeToReplace.left;
      successor.left.parent = successor;
    }
    this.size--;
  }

  getMinimum(root) {
    while (root.left !== null) {
      root = root.left;
    }
    return root;
  }

  static transplant(tree, node1, node2) {
    if (node1.parent === null) {
      tree.root = node2;
    } else if (node1 === node1.parent.left) {
      node1.parent.left = node2;
    } else {
      node1.parent.right = node2;
    }
    if (node2 !== null) {
      node2.parent = node1.parent;
    }
  }

  static isValid(root) {
    if (root === null) {
      return true;
    }
    const isLineageValid =
      this.isValid(root.left) && this.isValid(root.right);
    // console.log("i am ", root.key, ", left is ", root.left?root.left.key:null, " and right is ", root.right?root.right.key:null)
    return isLineageValid && (root.left === null || root.left.key < root.key) && (root.right === null || root.right.key >= root.key);
  }
}

const tree = new BST();
tree.push(7);
tree.push(5);
tree.push(10);
tree.push(9);
tree.push(2);
tree.push(1);
tree.push(3);
console.log(tree.size);
tree.delete(5);
console.log(tree.size);
tree.delete(7);
tree.delete(1);
console.log(BST.isValid(tree.root))
