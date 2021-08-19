import React from 'react'
import CommonMove from './CommonMove'

const CommonMoves = ({ moves, onGo }) => {
    
    return (
        <>
            {moves.map((move, index) => (
                <CommonMove key={index} move={move} onGo={onGo} />
            ))}
        </>
    )
}

export default CommonMoves
