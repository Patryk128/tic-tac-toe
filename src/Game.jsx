import { useState } from "react";
import "./Game.css";

function Square({ value, onClick }) {
  return (
    <button
      className={`square ${value === "X" ? "x" : value === "O" ? "o" : ""}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = (i) => {
    if (squares[i] || winner || isGameOver) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const calculatedWinner = calculateWinner(newSquares);
    if (calculatedWinner) {
      setWinner(calculatedWinner);
      setIsGameOver(true);
      setShowPopup(true);
      if (calculatedWinner === "X") {
        setScoreX(scoreX + 1);
      } else if (calculatedWinner === "O") {
        setScoreO(scoreO + 1);
      }
    } else if (!newSquares.includes(null)) {
      setIsGameOver(true);
      setShowPopup(true);
      setWinner("Remis");
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsGameOver(false);
    setWinner(null);
    setXIsNext(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    resetGame();
  };

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  let status;
  if (!isGameOver) {
    status = `Kolejny gracz: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="scoreboard">
        <p>X Score: {scoreX}</p>
        <p>O Score: {scoreO}</p>
      </div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>{winner === "Remis" ? "Remis!" : `Zwycięzca: ${winner}`}</h2>
            <button onClick={closePopup}>Nowa gra</button>
          </div>
        </div>
      )}
    </div>
  );
}

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

export default function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}
