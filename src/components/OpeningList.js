import React, {useState, useEffect} from 'react'
import CommonMoves from './CommonMoves';
import DefaultData from './DefaultData'

const OpeningList = ({fen, pgn, onGo}) => {
    const [data, setData] = useState(DefaultData);
    useEffect(() => {
        const fetchOpening = async (fen) => {
            const res = await fetch(`https://explorer.lichess.ovh/lichess?variant=standard&speeds[]=bullet&speeds[]=blitz&speeds[]=rapid&speeds[]=classical&ratings[]=1600&ratings[]=2500&fen=${fen}`)
            const data = await res.json()
            setData(data)
          }

          fetchOpening(fen)
    }, [fen]) 
    return (
        <div className='list'>
            {console.log(data)}
            <div className='opTitle'>
            {(data.opening !== null ? <h1>This is the {data.opening.name}!</h1>
            : (<h1>{pgn}</h1>))}
            <a href={`https://lichess.org/analysis/standard/${fen}`} className="lichLink" target="_blank" rel="noreferrer">Check out on lichess.org</a>
            </div>
            <h1>Most common moves in the position:</h1>
            <div className="moves">
            {data.moves.length > 0 && <CommonMoves moves={data.moves} onGo={onGo}/>}
            </div>
        </div>
    );

    
}

export default OpeningList
