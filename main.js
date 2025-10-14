import { Chessboard } from './chessboard-graph.js';

const board = new Chessboard();

const edges = board.logEdges();
//console.log(edges);
//console.log(edges.length); // 168 unique moves (in both directions from squares)

const solutions = board.knightMoves([3,3],[4,3]);

console.log(solutions.length);