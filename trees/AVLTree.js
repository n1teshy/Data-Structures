class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  getHeight(root) {
    if (root === null) {
      return 0;
    }
    return root.height;
  }

  getBalanceFactor(root) {
    if (root === null) {
      return 0;
    }
    return this.getHeight(root.left) - this.getHeight(root.right);
  }

  leftRotate(root) {
    const x = root.right;
    const y = x.left;
    x.left = root;
    root.right = y;
    root.height =
      1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));
    x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
    return x;
  }

  rightRotate(root) {
    const x = root.left;
    const y = x.right;
    x.right = root;
    root.left = y;
    root.height =
      1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));
    x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
    return x;
  }

  _insert(root, node) {
    if (root === null) {
      this.size++;
      return node;
    } else if (node.key < root.key) {
      root.left = this._insert(root.left, node);
    } else {
      root.right = this._insert(root.right, node);
    }
    // TODO: determine if the number of calls for the heights of these nodes can be reduced
    root.height =
      1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));
    const balance = this.getBalanceFactor(root);
    if (balance > 1) {
      if (this.getBalanceFactor(root.left) < 0) {
        root.left = this.leftRotate(root.left);
      }
      return this.rightRotate(root);
    }
    if (balance < -1) {
      if (this.getBalanceFactor(root.right) > 0) {
        root.right = this.rightRotate(root.right);
      }
      return this.leftRotate(root);
    }
    return root;
  }

  insert(node) {
    this.root = this._insert(this.root, node);
  }

  getMinimum(root) {
    if (root !== null) {
      while (root.left !== null) {
        root = root.left;
      }
    }
    return root;
  }

  _delete(root, key) {
    if (root === null) {
      return root;
    } else if (key < root.key) {
      root.left = this._delete(root.left, key);
    } else if (key > root.key) {
      root.right = this._delete(root.right, key);
    } else {
      this.size--;
      if (root.left === null || root.right === null) {
        const temp = root.left === null ? root.right : root.left;
        root = null;
        return temp;
      }
      const temp = this.getMinimum(root.right);
      root.key = temp.key;
      root.right = this._delete(root.right, temp.key);
    }
    if (root === null) {
      return root;
    }
    root.height =
      1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));
    const balance = this.getBalanceFactor(root);
    if (balance > 1) {
      if (this.getBalanceFactor(root.left) < 0) {
        root.left = this.leftRotate(root.left);
      }
      return this.rightRotate(root);
    }
    if (balance < -1) {
      if (this.getBalanceFactor(root.right > 0)) {
        root.right = this.rightRotate(root.right);
      }
      return this.leftRotate(root);
    }
    return root;
  }

  delete(key) {
    if (this.size === 0) {
      return;
    }
    this.root = this._delete(this.root, key);
  }

  search(key) {
    let root = this.root;
    while (root !== null) {
      if (key < root.key) {
        root = root.left;
      } else if (key > root.key) {
        root = root.right;
      } else {
        break;
      }
    }
    return root;
  }
}

const tree = new AVLTree();
for(let i = 0; i < 100; i++){
  tree.insert(new Node(i));
}
console.log(tree.search(99));