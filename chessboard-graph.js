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
  constructur(coord, edges = new Array()) {
    this.coord = coord;
    this.edges = edges; 
  }

  // Add an edge by adding a square object to the edges array
  addEdge(square) {
    this.edges.push(square);
  }
}