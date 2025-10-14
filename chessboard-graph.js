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
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.edges = new Array(); 
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

class Chessboard {
  constructor(){
    this.squares = this.createBoard();
  }

  createBoard() {
    const boardArray = new Array(8);
    for (let i = 0; i < 8; i++) {
      boardArray[i] = new Array(8);
      for (let j = 0; j < 8; j++) {
        boardArray[i][j] = new Square(i, j);
      }
    }
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.addEdges(boardArray[i][j], boardArray)
      }
    }
    return boardArray;
  }

  addEdges(square, boardArray) {
    //-2, -1 | -2, +1  | -1, -2  | -1, +2| +1, -2  | +1, +2| +2, -1  | +2, +1
    // i = 2 and j = 1:
    // -i -j, -i + j, +i -j, +i +j,
    // -j -i, -j + i, +j -i, +j +i, 
    const validMoves = [
      [2, 1], [2, -1],
      [1, 2], [1, -2],
      [-1, 2], [-1, -2],
      [-2, 1], [-2, -1]
    ];

    // Check the coordinate for invalid values
    function checkCoord(coord) {
      if (coord >= 0 && coord <= 7) {
        return true;
      }
      return false;
    }
    validMoves.forEach(move => {
      // Calculate the edge vertex x and y based on moves
      const edgeX = square.x + move[0];
      const edgeY = square.y + move[1];
      // If the coordinates check out, add the square to edges
      if (checkCoord(edgeX) && checkCoord(edgeY)) {
        const toAdd = boardArray[edgeX][edgeY];
        square.addEdge(toAdd);
      }
    });
  }

  logEdges() {
    // Log an array of all edges coordinates
    const edgesArray = new Array();
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const square = this.squares[i][j];
        square.edges.forEach(edge => {
          // Create both moves between the squares as strings
          const move = `[${square.x},${square.y} -> ${edge.x},${edge.y}]`;
          const moveBackwards = `[${edge.x},${edge.y} -> ${square.x},${square.y}]`;
          // If the move had not been added, push it now
          if (!edgesArray.includes(move) && !edgesArray.includes(moveBackwards)) {
            edgesArray.push(move);
          }
        });
      }
    }
    return edgesArray;
  }

  knightMoves(start, goal) {
    const startSquare = this.squares[start[0]][start[1]];
    const goalSquare = this.squares[goal[0]][goal[1]];
    const queue = [startSquare];
    const path = new Array();
    let found = false;
    while (queue.length > 0) {
      if (found === true) {
        break;
      }
      const square = queue.shift();
      path.push(`[${square.x}, ${square.y}]`);
      for (const edge of square.edges) {
        // Add additional checks here
        if (edge === goalSquare) {
          console.log("FOUND IT!");
          found = true;
          break;
        } else if (!path.includes(`[${edge.x}, ${edge.y}]`)) {
          // Calculate the best one to try here for example: which x and y is closest
          
          queue.push(edge);
        };
      };
    }
    return path;
  }
}

export { Chessboard }