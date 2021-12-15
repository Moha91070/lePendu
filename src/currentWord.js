
 export default function CurrentWord({currentWord, usedLetter, win}){
    return (
        <div className="wrapper_current_word">
            {currentWord}<br></br>
           {currentWord.split('').map(
               (letter,key) => {
                  let status = "finded"

                  if(!usedLetter.includes(letter)){
                    if (win === -1 ){
                        status = "lost"
                    } else {
                        status = "not-finded"
                    }
                  }

                  

                  return <span key={key} className={status}>
                            {status === 'finded' ? letter : 
                            (win === -1  ? letter : " __ ")  }
                        </span>
           }
           )}
        </div>
    )
} 