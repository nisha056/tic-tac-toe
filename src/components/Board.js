import { useState } from "react";

const Square = ({ value, onSquareClick }) => {
  //Removing the self stateful tracking of value and the onClick prop as
  // the state will be maintained by the parent

  return (
    <button className="button" onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default function Board() {
  const [xnext, setXnext] = useState(true);
  //parent maintaining the state of all children
  const [square, setSquare] = useState(Array(9).fill(null));
  const handleClick = (i) => {
    // if the square already has the X or 0 nothing should be rnder so simply return
    if (square[i] || CalculateWinner(square)) {
      return;
    }

    const nextSquare = square.slice();
    if (xnext) {
      nextSquare[i] = "X";
    } else {
      nextSquare[i] = "0";
    }
    setSquare(nextSquare);
    setXnext(!xnext);
  };

  const winner = CalculateWinner(square);
  let status;
  if (winner) {
    status = "Winner is :" + winner;
  } else {
    status = "Next player :" + (xnext ? "X" : "0");
  }

  return (
    <>
      <div className="status"> {status}</div>

      <div className="Main">
        <div className="Board">
          <Square value={square[0]} onSquareClick={() => handleClick(0)} />
          <Square value={square[1]} onSquareClick={() => handleClick(1)} />
          <Square value={square[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="Board">
          <Square value={square[3]} onSquareClick={() => handleClick(3)} />
          <Square value={square[4]} onSquareClick={() => handleClick(4)} />
          <Square value={square[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="Board">
          <Square value={square[6]} onSquareClick={() => handleClick(6)} />
          <Square value={square[7]} onSquareClick={() => handleClick(7)} />
          <Square value={square[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  );
}

const CalculateWinner = (square) => {
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
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return square[a];
    }
  }
  return null;
};
