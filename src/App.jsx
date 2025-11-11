import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      className="w-24 h-24 border-2 border-indigo-400 flex justify-center items-center text-4xl font-bold 
                 hover:bg-indigo-100 transition rounded-lg shadow-sm"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);

  function handleClick(i) {
    const nextSquares = squares.slice();

    // Jangan ubah kotak kalau sudah diisi atau sudah ada pemenang
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXisNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);

 let status = '';
if (winner) {
  status = " Winner: " + winner;
} else if (isDraw) {
  status = " seri";
} else {
  status = "Next Player: " + (xIsNext ? "X" : "O");
}


  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-indigo-100 to-white">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6 drop-shadow">
        Tic-Tac-Toe
      </h1>

      <div
  className={`text-lg font-semibold mb-4 px-4 py-2 rounded-lg shadow-sm ${
    winner
      ? "bg-green-200 text-green-800"
      : isDraw
      ? "bg-white-500 text-yellow-800"
      : "bg-indigo-100 text-indigo-800"
  }`}
>
  {status}
</div>

      <div className="grid grid-cols-3 gap-3">
        {squares.map((value, i) => (
          <Square key={i} value={value} onSquareClick={() => handleClick(i)} />
        ))}
      </div>

      <button
        onClick={() => {
          setSquares(Array(9).fill(null));
          setXisNext(true);
        }}
        className="mt-8 bg-indigo-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-600 transition"
      >
         Reset Game
      </button>
    </div>
  );
}

// === Hitung Pemenang ===
function calculateWinner(squares) {
  const rules = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of rules) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
