import React, { useState } from 'react';
import Board from './Components/Board';
import { calculateWinner } from './helper.jsx';
import './styles/root.scss';
import History from './Components/History';

const App = () => {
  const [history, setHistory] = useState([
    { board: Array(9).fill(null), isXNext: true },
  ]);

  const [currentMove, setCurrentmove] = useState(0);
  const [isXNext, setIsXNext] = useState(false);
  const current = history[currentMove];
  const winner = calculateWinner(current.board);

  const message = winner
    ? `Winner is ${winner}`
    : `Next player is ${current.isXNext ? 'X' : 'O'}`;
  const handleSquareClick = position => {
    if (current.board[position] || winner) return;
    setHistory(prev => {
      const last = prev[prev.length - 1];
      const newBoard = last.board.map((square, pos) => {
        if (pos === position) return last.isXNext ? 'X' : 'O';
        return square;
      });
      return prev.concat({ board: newBoard, isXNext: !last.isXNext });
    });
    setCurrentmove(prev => prev + 1);
  };
  return (
    <div className="app">
      <h1>Tic Tack Toe</h1>
      <h2>{message}</h2>
      <Board board={current.board} handleSquareClick={handleSquareClick} />
      <History history={history} />
    </div>
  );
};
export default App;
