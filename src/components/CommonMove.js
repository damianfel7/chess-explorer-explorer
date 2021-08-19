import React from 'react'

const CommonMove = ( {move, onGo} ) => {

    return (
        <div className="commonMove">
            <h3 className="listNotation">{move.san}</h3>
            <button className="goTo" onClick={() => onGo(move.san)}>Go to</button>
        </div>
    )
}

export default CommonMove
