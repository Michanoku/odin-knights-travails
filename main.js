import { Chessboard } from './chessboard-graph.js';

const board = new Chessboard();

// Old Testing during development
// const edges = board.logEdges();
// console.log(edges);
// console.log(edges.length); // 168 unique moves (in both directions from squares)

// Do the knight moves
board.knightMoves([3,3],[4,3]);