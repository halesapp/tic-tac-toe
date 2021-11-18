import React, {useEffect, useState} from 'react'

import './Board.css';
import Square from "./Square";

function Board() {
  const [boardState, setBoardState] = useState(Array(9).fill(null))
  const [winState, setWinState] = useState({winner: false, triple: []})
  const [turn, setTurn] = useState(true)

  const winStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const clickSquare = (square) => {
    if (winState.winner) return
    setTurn(currentTurn => !currentTurn)
    setBoardState(lastState => {
      let newState = Array(...lastState)
      newState[square] = turnToChar(turn)
      return newState
    })
  }

  const turnToChar = (turn) => turn ? 'O' : 'X'

  const reset = () => {
    setBoardState(Array(9).fill(null))
    setWinState({winner: false, triple: []})
    setTurn(true)
  }

  useEffect(() => {
    for (const triple of winStates) {
      if (boardState[triple[0]] && boardState[triple[0]] === boardState[triple[1]] && boardState[triple[1]] === boardState[triple[2]]) {
        setWinState({
          winner: boardState[triple[0]],
          triple: triple
        })
        break
      }
    }
  }, [boardState])

  const squares = boardState.map((i, idx) => <Square key={idx} id={idx} val={i} winner={winState.triple.includes(idx)} click={clickSquare}/>)
  const message = winState.winner ? `${turnToChar(turn)} Wins` : `It is ${turnToChar(turn)}'s Turn`

  return (
    <div className={"board-wrapper"}>
      <h1>Tic-Tac-Toe</h1>
      <div>{message}</div>
      <div className={"board"}>
        <div className={"board-row"}>{squares.slice(0, 3)}</div>
        <div className={"board-row"}>{squares.slice(3, 6)}</div>
        <div className={"board-row"}>{squares.slice(6, 9)}</div>
      </div>
      <div className={'restart-button'} onClick={() => reset()}>RESTART</div>
    </div>
  )
}

export default Board;
