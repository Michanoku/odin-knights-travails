# odin-knights-travails
The Odin Project Knights Travails

This project implements a Breadth-First Search (BFS) traversal algorithm to find the shortest sequence of moves a knight can make on a standard 8×8 chessboard from a given start position to a goal position.

It builds a graph representation of the board, where each square is a vertex connected to all other reachable squares by valid knight moves.

## Features

- **Object-Oriented Design**
  - `Square` class represents individual board squares (vertices).
  - `Chessboard` class builds the full graph and performs traversal.

- **Automatic Edge Generation**
  - Each square automatically connects to all valid knight move destinations.

- **Breadth-First Search**
  - Ensures the knight’s route found is always the shortest possible path.
  - Prevents re-visiting squares by tracking visited nodes.

- **Path Reconstruction**
  - The algorithm keeps a record of each square’s parent to retrace the exact path from goal back to start.

## How It Works

1. The `Chessboard` class initializes an 8×8 matrix of `Square` objects.  
2. Each square computes and stores edges to reachable squares via knight moves:
   ```
   [±2, ±1], [±1, ±2]
   ```
3. When `knightMoves(start, goal)` is called:
   - A BFS begins at the start square.
   - Each visited square is stored in an object with a reference to its parent.
   - Once the goal square is found, the algorithm reconstructs the shortest path by following parent references backward.

## Example Output

When running:
```js
const board = new Chessboard();
board.knightMoves([0, 0], [7, 7]);
```

Example console output:
```
You made it in 6 moves! Here's your path:
[0,0]
[2,1]
[4,2]
[6,3]
[7,5]
[5,6]
[7,7]
```

## Class Overview

### `Square`
Represents one vertex (square) on the chessboard.

| Method | Description |
|--------|--------------|
| `checkValidity(x, y)` | Validates if another square can be connected via a knight’s move. |
| `addEdge(square)` | Adds a valid neighboring square as an edge. |

### `Chessboard`
Handles board creation and BFS traversal.

| Method | Description |
|--------|--------------|
| `createBoard()` | Generates all 64 squares and their valid edges. |
| `addEdges(square, boardArray)` | Adds all valid knight-move edges for a square. |
| `logEdges()` | Returns a readable array of all unique edges. |
| `knightMoves(start, goal)` | Performs BFS to find and log the shortest path between two squares. |

## Usage

1. Import and initialize the board:
   ```js
   import { Chessboard } from './Chessboard.js';

   const board = new Chessboard();
   ```
2. Call the traversal method:
   ```js
   board.knightMoves([0, 0], [7, 7]);
   ```

## Thoughts

I struggled for a long time with the implementation of knightMoves. I wanted to initialize
the Chessboard and Squares so that all valid moves are already present, and knightMoves
doesn't have to check for move validity at all. This was helpful, but I had trouble 
implementing the BFS algorithm on this graph and the vertices with the edge adjacent lists.
(As one can easily see from the commits...)

In the end, I had to search articles and descriptions of how to implement BFS on a graph.
The description helped me put together pseudocode that explained the algorithm and I 
was finally able to implement a BFS traversal. This [article](https://www.geeksforgeeks.org/dsa/breadth-first-search-or-bfs-for-a-graph/) helped me a lot, but I also read several others.

With the traversal implemented, I could find the note, but I couldn't understand how to get the 
shortest route. When looking for answers, I found that the best possible solution would be to log 
the parents of each location visited so that I could find my way back from the goal to the start.

All in all this was very challenging and I almost gave up at one point. But reading the articles
explaining the problem helped. Especially one reddit post on The Odin Project subreddit, where an
experienced user suggested asking for help in the first place. This made me realize I could just
read other articles than the ones provided to understand the problem better. 