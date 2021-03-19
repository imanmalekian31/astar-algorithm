class Graph {
  constructor(grid) {
    this.nodes = [];
    this.grid = [];

    for (let x = 0; x < grid.length; x++) {
      this.grid[x] = [];
      const row = grid[x];

      for (let y = 0; y < row.length; y++) {
        const node = new GridNode(x, y, row[y]);
        this.grid[x][y] = node;
        this.nodes.push(node);
      }
    }
    this.init();
  }
  init() {
    this.dirtyNodes = [];
    for (let i = 0; i < this.nodes.length; i++) {
      this.cleanNode(this.nodes[i]);
    }
  }
  getGraphDimension() {
    const x = this.grid[0].length;
    const y = this.grid.length;
    return { x, y };
  }
  cleanDirty() {
    for (let i = 0; i < this.dirtyNodes.length; i++) {
      this.cleanNode(this.dirtyNodes[i]);
    }
    this.dirtyNodes = [];
  }
  markDirty(node) {
    this.dirtyNodes.push(node);
  }
  cleanNode(node) {
    node.f = 0;
    node.g = 0;
    node.h = 0;
    node.visited = false;
    node.closed = false;
    node.parent = null;
  }
  neighbors(node) {
    const neighbors = [];
    const x = node.x;
    const y = node.y;
    const grid = this.grid;

    // West
    if (grid[x - 1] && grid[x - 1][y]) {
      neighbors.push(grid[x - 1][y]);
    }

    // East
    if (grid[x + 1] && grid[x + 1][y]) {
      neighbors.push(grid[x + 1][y]);
    }

    // South
    if (grid[x] && grid[x][y - 1]) {
      neighbors.push(grid[x][y - 1]);
    }

    // North
    if (grid[x] && grid[x][y + 1]) {
      neighbors.push(grid[x][y + 1]);
    }

    return neighbors;
  }
}

class GridNode {
  constructor(x, y, weight) {
    this.x = x;
    this.y = y;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.weight = weight;
    this.visited = false;
    this.closed = false;
    this.parent = null;
  }
  getCost() {
    return this.weight;
  }
  isWall() {
    return this.weight === 0;
  }
}
