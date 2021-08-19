import React, {useState} from 'react'
import Chess from 'chess.js'
import Header from './components/Header'
import NotationBox from './components/NotationBox'
import OpeningList from './components/OpeningList'
const App = () => {
  const [fen, setFEN] = useState([]);
  const [pgn, setPGN] = useState([]);
  const [showOpeningList, setShowOpeningList] = useState(false)
  const chess = new Chess()
  const options = {sloppy:true}
  
  //converts PGN notation into FEN which is used by the lichess API.
  const convertPGN = (pgn) => {
    if(!chess.load_pgn(pgn, options)){
    alert("Invalid notation. Please try again.") 
    return}
    setPGN(pgn)
    chess.load_pgn(pgn.toString())
    setFEN(chess.fen())
    setShowOpeningList(true)
}

  //adjoins a move chosen with the "Go to" button into the sequence.
  const concatPGN = (newMove) => {
    var newPGN = pgn.concat(' ', newMove)
    setPGN(prevPGN => 
      {return{...prevPGN, ...newPGN};
    });
    chess.load_pgn(newPGN)
    console.log(newPGN)
    convertPGN(newPGN)
  } 

  return (
    <div className="App">
      <Header />
      <NotationBox 
      onConvert={convertPGN}/>
      {showOpeningList && <OpeningList fen={fen} pgn={pgn} onGo={concatPGN}/>}
    </div>
  )
}

export default App;
