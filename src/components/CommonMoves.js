import React from 'react'
import CommonMove from './CommonMove'

const CommonMoves = ({ moves, onGo }) => {
    
    return (
        <>
            {moves.map((move, index) => (
                <CommonMove move={move} onGo={onGo} key={index} id={index} />
            ))}
        </>
    )
}

export default CommonMoves
