class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  push(data) {
    const node = new Node(data);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      const previousTail = this.tail;
      this.tail = node;
      previousTail.next = this.tail;
    }
    this.length++;
  }

  pop() {
    let node = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else if (this.length > 1) {
      let next = node.next;
      while (next.next !== null) {
        node = next;
        next = next.next;
      }
      node.next = null;
      this.tail = node;
      node = next;
    }
    if (node !== null) {
      node = node.data;
      this.length--;
    }
    return node;
  }

  unshift(data) {
    const node = new Node(data);
    node.next = this.head;
    this.head = node;
    this.length++;
  }

  shift() {
    const node = this.head;
    this.head = node !== null ? node.next : node;
    if (node !== null) {
      this.length--;
      if (this.length === 0) {
        this.tail = null;
      }
    }
    return node;
  }

  insertNthNode(position, data) {
    if (position === 0) {
      this.unshift(data);
    } else if (position > 0) {
      let node = this.head;
      for (
        let currentPosition = 0;
        currentPosition < position - 1;
        currentPosition++
      ) {
        if (node.next === null) {
          this.push(null);
        }
        node = node.next;
      }
      const newNode = new Node(data);
      newNode.next = node.next;
      node.next = newNode;
      this.length++;
      if (position === this.length - 1) {
        this.tail = newNode;
      }
    }
  }

  getNthNode(position) {
    let node = undefined;
    if (position === 0) {
      node = this.shift();
    } else if (position > 0) {
      node = this.head;
      for (
        let currentPosition = 1;
        currentPosition <= position;
        currentPosition++
      ) {
        node = node.next;
        if (node === null) {
          break;
        }
      }
    }
    return node === null ? node : node.data;
  }

  deleteNthNode(position) {
    if (position === 0) {
      this.shift();
    } else if (position > 0 && position < this.length) {
      let node = this.head;
      for (
        let currentPosition = 0;
        currentPosition < position - 1;
        currentPosition++
      ) {
        node = node.next;
      }
      node.next = node.next.next;
      this.length--;
      if (position === this.length) {
        this.tail = node;
      }
    }
  }

  revserse(){
    this.tail = this.head;
    let previous = this.head;
    let next = previous !== null ? previous.next : null;
    // the head is going to become the new tail, set its 'next' to null
    previous.next = null;
    while(previous !== null && next !== null){
      const prevNext = next.next;
      next.next = previous;
      previous = next;
      next = prevNext;
    }
    this.head = previous;
  }

  print(delimiter) {
    const arr = [this.head === null ? null : this.head.data];
    let node = this.head === null ? null : this.head.next;
    while (node !== null) {
      arr.push(node.data);
      node = node.next;
    }
    console.log(arr.join(delimiter ? delimiter : " -->  "));
  }
}

const list = new SinglyLinkedList();
list.push(1);
list.push(3);
list.push(5);
list.push(6);
list.revserse();
list.print()
