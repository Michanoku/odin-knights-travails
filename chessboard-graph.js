// Square class used for vertices
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

// The class that saves all the squares in a board and has functions to traverse
class Chessboard {
  constructor(){
    this.squares = this.createBoard();
  }

  // Creation of the board
  createBoard() {
    // The overall array of the board (also considered the rows)
    const boardArray = new Array(8);
    for (let i = 0; i < 8; i++) {
      // Create the column array of the current row
      boardArray[i] = new Array(8);
      // Add a new square for each item in the array
      for (let j = 0; j < 8; j++) {
        boardArray[i][j] = new Square(i, j);
      }
    }
    // Traverse the created matrix and add all possible edges to squares
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.addEdges(boardArray[i][j], boardArray)
      }
    }
    return boardArray;
  }

  addEdges(square, boardArray) {
    // -2, -1 | -2, +1  | -1, -2  | -1, +2| +1, -2  | +1, +2| +2, -1  | +2, +1
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
    // Add each valid move as an edge
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
    // Save starting square
    const startSquare = this.squares[start[0]][start[1]];
    // Save goal square
    const goalSquare = this.squares[goal[0]][goal[1]];
    // Create empty queue
    const queue = new Array();
    // Create empty array for visited squares
    const visited = new Object();
    // Add starting square to queue
    queue.push(startSquare);
    // Get the string
    const startString = getCoordString(startSquare)
    // Mark it as visited (it has no parent so the value is null)
    visited[startString] = null;

    // While the queue is not empty:
    while (queue.length > 0) {
      // Dequeue square from start of queue to visit it
      const square = queue.shift();
      const squareString = getCoordString(square);
      // For each unvisited edge:
      for (const edge of square.edges) {
        const coordString = getCoordString(edge);
        if (!(coordString in visited)) {
          // Mark edge as visited
          visited[coordString] = squareString;
          // If this edge is the goal, enter final results calculation
          if (edge === goalSquare) {
            // Get the path to the start from the edge using visited 
            const path = shortestPath(coordString, new Array());
            // Show results and end
            console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
            for (const coord of path) {
              console.log(coord);
            }
            return;
          }
          // Enqueue the edge
          queue.push(edge);
        }     
      }
    }
  
    // The function to find the shortest path at the end
    function shortestPath(squareString, path) {
      // Since we are retracing steps, add the current coordinate at the start
      path.unshift(squareString);
      // If the current coordinate has no parent, this is the end, return path
      if (visited[squareString] === null) {
        return path;
      }
      // Otherwise find parent in the visited object and call recursion
      const parent = visited[squareString];
      return shortestPath(parent, path);
    }

    // Get a string of the squares coordinates
    function getCoordString(square) {
      return `[${square.x},${square.y}]`;
    }
  }
}

export { Chessboard }