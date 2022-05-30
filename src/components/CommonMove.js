import React from 'react'

const CommonMove = ( {move, onGo, id} ) => {

    return (
        <div className="commonMove" id={id}>
            <h3 className="listNotation">{move.san}</h3>
            <h3 className="timesPlayed">Times played - {move.white+move.black+move.draws}</h3>
            <button className="goTo" id={id} onClick={() => onGo(move.san, move.uci)}>Go to</button>
        </div>
    )
}

export default CommonMove
