// @ts-nocheck
import * as React from "react";
import { useStorageHook } from "./hooks/useStorageHook";
const init: [] = Array(9).fill(null);
function Board() {
  // 🐨 squares is the state for this component. Add useState for squares
  // const [squares, setSquares] = React.useState(init);
  const [squares, setSquares] = useStorageHook("squares", init);

  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  function selectSquare(square) {
    if (winner || squares[square]) {
      return;
    }
    const squaresCopy = [...squares];
    squaresCopy[square] = nextValue;
    setSquares(squaresCopy);
  }

  function restart() {
    // 🐨 reset the squares
    setSquares(init);
  }

  function renderSquare(i) {
    return (
      <button
        className="-mr-1 -mt-1 p-0 w-10 border-purple-800 border-2 border-solid bg-purple-50 h-10 text-lg focus:outline-none focus:bg-purple-200"
        onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center w-fit">
      {/* 🐨 put the status in the div below */}
      <div className="mb-5">{status}</div>
      <div className="">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="mt-10" onClick={restart}>
        restart
      </button>
    </div>
  );
}

function Game() {
  return (
    <div className="m-20 min-h-fit">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
