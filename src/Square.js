import React from "react"

import "./Square.css"

const Square = (props) => {
  return (
    <button className={`square ${props.winner ? 'winner' : ''}`} onClick={() => props.click(props.id)} disabled={props.val}>{props.val}</button>
  )
}

export default Square