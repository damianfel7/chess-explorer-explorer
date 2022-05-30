import React, {useState, useEffect} from 'react'
import CommonMoves from './CommonMoves';
const OpeningList = ({fen, pgnSan, pgnUci, onGo, fromBox}) => {
    const [data, setData] = useState(pgnSan);
    const [isFirstPosition, setIsFirstPosition] = useState(true);
    useEffect(() => {
        const fetchOpening = async (fen) => {
            if(!isFirstPosition){
                if(!fromBox){
                    const res = await fetch(`https://explorer.lichess.ovh/lichess?variant=standard&speeds[]=bullet&speeds[]=blitz&speeds[]=rapid&speeds[]=classical&ratings[]=1600&ratings[]=2500&play=${pgnUci}`)
                    const data = await res.json()
                    setData(data)
                }
                else if (fromBox){
                    const res = await fetch(`https://explorer.lichess.ovh/lichess?variant=standard&speeds[]=bullet&speeds[]=blitz&speeds[]=rapid&speeds[]=classical&ratings[]=1600&ratings[]=2500&fen=${fen}`)
                    const data = await res.json()
                    setData(data)
                }
            }
            else{
                setIsFirstPosition(false)
            }
          }

          fetchOpening(fen)
    }, [fen])
    
    
    const openAnalysis = () => {
        window.open(
            `https://lichess.org/analysis/standard/${fen}`,
            '_blank'
            );
    }     

    var openingName
    if(data.opening)
    {
        openingName =`This is the ${data.opening.name}!`;
    }
    else if(fen==='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'){
        openingName = "This is the Starting Position!";
    }
    else{
        openingName=pgnSan;
    }

    return (
        <div className='list'>
            {console.log(data)}
            <button className='opTitle' onClick={() => openAnalysis()}>
            {
            /*(data.opening !== null ? */<h1>{openingName}</h1>/*
            : <h1>{pgn}</h1>)*/}
            <p style={{color:"#717370"}}>Click for lichess.org analysis</p>
            </button>
            <h1 className="commonColon">Most common moves in the position:</h1>
            <div className="moves">
            {data.moves.length > 0 && <CommonMoves moves={data.moves} onGo={onGo}/>}
            </div>
        </div>
    );

    
}

export default OpeningList
