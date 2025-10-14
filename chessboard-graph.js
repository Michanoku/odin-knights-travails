// Graph that has a vertex for each square on a chessboard ( from 0,0 to 7,7)
// A field is traversible by the Knight if its either +-1,+-2 or +-2,+-1 away.
// Examples: From 3,3 -> 
// 1, 2   | 2, 1    | 1, 4    | 2, 5  | 4, 1    | 5, 2    | 4, 5  | 5, 4
// -2, -1 | -1, -2  | -2, +1  | -1, +2| +1, -2  | +2, -1  | +1, +2| +2, +1

// Things to consider: How to represent a vertex class? What values?
// location? are the edges saved as an array on the vertex? or are edges
// saved within a different class? 
// If using a matrix, 8*8 fields on a chessboard would mean a 64*64 matrix 

class Square {
  // Construct the square class with its location coordinates and empty array for edges
  constructur(x, y, edges = new Array()) {
    this.x = x;
    this.y = y;
    this.edges = edges; 
  }

  // Check validity of the edge to be added by calculating from coordinates
  checkValidity(x, y) {
    // Calculate difference between this.x/y and x/y
    const diffX = Math.abs(x - this.x)
    const diffY = Math.abs(y - this.y)
    // If the square is too far away (if any coordinate exceeds -2/+2)
    if (diffX > 2 || diffY > 2) {
      throw new Error("Invalid edge. Too far.");
    }
    // If the square is not reachable by the knights moves
    if (!((diffX === 2 && diffY === 1) || (diffX === 1 && diffY === 2))) {
      throw new Error("Invalid edge. Not a valid move.");
    }
  }

  // Add an edge by adding a square object to the edges array
  addEdge(square) {
    // Try adding the square but check its validity first
    try {
      this.checkValidity(square.x, square.y)
      // Add the square to edges
      this.edges.push(square);
    } catch (err) {
      console.error(err.message);
    }
  }
}
