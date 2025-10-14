import { Chessboard } from './chessboard-graph.js';

const board = new Chessboard();

const edges = board.logEdges();
console.log(edges);
console.log(edges.length); // 168 unique moves (in both directions from squares)