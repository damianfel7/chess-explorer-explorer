import React, {useState} from 'react'

const NotationBox = ({onConvert}) => {
    const [text, setText] = useState('')
    const submitPGN = (e) => {
        e.preventDefault()
    
          if (!text){
              alert('Please put in a notation.')
              return
          }
          onConvert(text)
          setText('')
          
      }
    return(
        <div className='notation'>
            <textarea className='textbox' form='notationForm' placeholder="Type in a PGN chess notation (eg. 1. e4 e5 2. Ke2)" value={text} onChange={(e) => setText(e.target.value)}></textarea>
            <form id='notationForm' onSubmit={submitPGN}>
                <input type="submit" value="Submit Notation" className='btn'></input>
            </form>
        </div>
    )
}

export default NotationBox
