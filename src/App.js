import React, {useState} from 'react'
import Chess from 'chess.js'
import Header from './components/Header'
import NotationBox from './components/NotationBox'
import OpeningList from './components/OpeningList'
import DefaultData from './components/DefaultData.json'
const App = () => {
  const [fen, setFEN] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
  const [pgnSan, setPGNSan] = useState(DefaultData);
  const [pgnUci, setPGNUci] = useState(DefaultData);
  const [fromBox, setFromBox] = useState(false);
  const chess = new Chess()
  const options = {sloppy:true}
  
  //converts PGN notation into FEN which is used by the lichess API.
  const convertPGN = (pgn, isFromBox) => {
    if(!chess.load_pgn(pgn, options)){
    alert("Invalid notation. Please try again.") 
    return}
    setPGNSan(pgn)
    if(isFromBox){
      setPGNUci(pgn)
    }
    setFromBox(isFromBox);
    chess.load_pgn(pgn.toString())
    setFEN(chess.fen())
}

  //adjoins a move chosen with the "Go to" button into the sequence.
  const concatPGN = (newMoveSan, newMoveUci) => {
    var newPGNSan, newPGNUci,inter=false;
    if(typeof pgnSan === 'string' && typeof pgnUci==='string' && !pgnUci.includes(" ")){
    newPGNSan = pgnSan.concat(' ', newMoveSan)
    newPGNUci = pgnUci.concat(',', newMoveUci)
    }
    else if (typeof pgnSan === 'string')
    {
      newPGNSan = pgnSan.concat(' ', newMoveSan)
      newPGNUci = newPGNSan
      inter=true;
    }
    else
    {
      newPGNSan = newMoveSan
      newPGNUci = newMoveUci
    }
    /*setPGNSan(prevPGNSan => 
      {return{...prevPGNSan, ...newPGNSan};
    });*/
    /*setPGNUci(prevPGNUci => 
      {return{...prevPGNUci, ...newPGNUci};
    });*/
    chess.load_pgn(newPGNSan)
    setPGNUci(newPGNUci)
    console.log(newPGNUci)
    convertPGN(newPGNSan, inter)
  } 

  return (
    <div className="App">
      <Header />
      <NotationBox 
      fen={fen} onConvert={convertPGN}/>
      <OpeningList fen={fen} pgnSan={pgnSan} pgnUci={pgnUci} onGo={concatPGN} fromBox={fromBox}/>
    </div>
  )
}

export default App;
