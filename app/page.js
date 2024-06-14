"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const initialState = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const initialMoves = {
    X: {
      1: {},
      2: {},
      3: {},
    },
    O: {
      1: {},
      2: {},
      3: {},
    },
  };

  const [ticTacToe, setTicTacToe] = useState(initialState);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [matchWon, setMatchWon] = useState(false);
  const [previousMoves, setPreviousMoves] = useState(initialMoves);

  useEffect(() => {
    let pointTable = {};
    for (let i = 0; i < ticTacToe.length; i++) {
      for (let j = 0; j < ticTacToe[i].length; j++) {
        if (!ticTacToe[i][j]) continue;
        if (!pointTable[`row${i}`]) {
          pointTable[`row${i}`] = {
            prevEl: ticTacToe[i][j],
            points: 1,
          };
        } else if (pointTable[`row${i}`].prevEl === ticTacToe[i][j]) {
          pointTable[`row${i}`].points++;
        }
        if (!pointTable[`col${j}`]) {
          pointTable[`col${j}`] = {
            prevEl: ticTacToe[i][j],
            points: 1,
          };
        } else if (pointTable[`col${j}`].prevEl === ticTacToe[i][j]) {
          pointTable[`col${j}`].points++;
        }
        if (i === j) {
          if (!pointTable[`dia1`]) {
            pointTable[`dia1`] = {
              prevEl: ticTacToe[i][j],
              points: 1,
            };
          } else if (pointTable[`dia1`].prevEl === ticTacToe[i][j]) {
            pointTable[`dia1`].points++;
          }
        }
        if (ticTacToe[i].length - 1 - i === j) {
          if (!pointTable[`dia2`]) {
            pointTable[`dia2`] = {
              prevEl: ticTacToe[i][j],
              points: 1,
            };
          } else if (pointTable[`dia2`].prevEl === ticTacToe[i][j]) {
            pointTable[`dia2`].points++;
          }
        }
      }
    }
    Object.keys(pointTable).forEach((item) => {
      if (pointTable[item].points === 3) setMatchWon(true);
    });
  }, [ticTacToe]);

  const handleCellClick = (rowIndex, colIndex) => {
    if (ticTacToe[rowIndex][colIndex]) {
      return;
    }

    setTicTacToe((prevState) => {
      prevState[rowIndex][colIndex] = currentPlayer;
      if (previousMoves[currentPlayer]["3"].rowIndex !== undefined) {
        prevState[previousMoves[currentPlayer]["3"].rowIndex][
          previousMoves[currentPlayer]["3"].colIndex
        ] = "";
      }
      return [...prevState];
    });
    setPreviousMoves((prevState) => {
      prevState[currentPlayer]["3"] = prevState[currentPlayer]["2"];
      prevState[currentPlayer]["2"] = prevState[currentPlayer]["1"];
      prevState[currentPlayer]["1"] = {
        rowIndex,
        colIndex,
      };
      return { ...prevState };
    });
    setCurrentPlayer((prevState) => (prevState === "X" ? "O" : "X"));
  };

  const resetGame = () => {
    setTicTacToe(initialState);
    setMatchWon(false);
    setCurrentPlayer("X");
    setPreviousMoves(initialMoves);
  };

  return (
    <main className="flex flex-col justify-center w-screen h-screen bg-gray-600 text-white text-center">
      <div className="fixed top-0 left-0 right-0 h-24 flex justify-center items-center">
        <h1 className="font-bold text-3xl font-mono">Super TicTacToe</h1>
      </div>
      {matchWon && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="backdrop-blur-sm p-20 rounded-lg w-full h-full flex justify-between items-center flex-col">
            <p className="font-bold text-lg">
              {currentPlayer === "X" ? "O" : "X"} won the match!
            </p>
            <button
              className=" rounded bg-green-500 text-white font-semibold p-3 mt-5"
              onClick={resetGame}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
      {ticTacToe.map((item, rowIndex) => {
        return (
          <div className="flex justify-center items-center" key={rowIndex}>
            <div
              className={`flex justify-center items-center w-72 ${
                rowIndex === 0 ? "" : "border-t-2 border-t-white"
              }`}
            >
              {item.map((el, colIndex) => {
                return (
                  <div
                    className={`w-24 h-24 p-2 flex-shrink-0 flex justify-center items-center cursor-pointer font-semibold text-lg ${
                      colIndex === 0 ? "" : "border-l-2 border-l-white"
                    } ${
                      previousMoves[currentPlayer]["3"]?.rowIndex == rowIndex &&
                      previousMoves[currentPlayer]["3"]?.colIndex === colIndex
                        ? "text-gray-400"
                        : ""
                    }`}
                    key={`${rowIndex}${colIndex}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {el}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </main>
  );
}
