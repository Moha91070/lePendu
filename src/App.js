import './App.css';
import {useState, useEffect} from 'react';
import User from './user';
import CurrentWord from './currentWord';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Classement from './classement';
import { ThemeContext } from "./ThemeContext";
import SwitchButton from "./button";
import React, { useContext } from "react";


function App() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const [data, setData] = useState(undefined);
  const [usedLetter, setUsedLetter] = useState([]);
  const [win, setWin] = useState(0);
  const [attempt, setAttempt] = useState(10);

  const initGame = async () =>{
    const newWord = createNewWord();
    setData(newWord);
    setUsedLetter([]);
    setAttempt(10);

  }

  const createNewWord = async () =>{
    const newData = await getData()
    localStorage.setItem('myData', data);

    return newData;
  };

// génération du nouveau mot
  useEffect(() => {
    (async ()=>{
      const newData = await getData()
      if(newData.data){
        setData(newData.data.word);
      }
    })()
    return () => {}
  }, []);

  // Traitement du clavier
  const GOOD_LETTER = "azertyuiopmlkjhgfdsqwxcvbnAZERTYUIOPMLKJHGFDSQNBVCXWèùàçéïëä"
  const handleKeyDown = (event) =>{
    if(GOOD_LETTER.includes(event.key)){
      if(!usedLetter.includes(event.key)){
        setUsedLetter([event.key, ...usedLetter]);

        if(!data.includes(event.key)){
          setAttempt(attempt-1);
        }

        let result = 0
        console.log(usedLetter);
        for(let i = 0; i < data.length ; i++) {
          if(usedLetter.includes(data[i])){
            result += 1
            console.log(result+'-'+data.length)
          }
          if(result === data.length-1 && attempt > 0){
            setWin(1);
            window.alert('Félicitation vous avez gagner');
          }
        }

        if(attempt === 0  && win != 1) {
          result = -1
          toast.error("Vous avez perdu")
        }

      } else {
        toast.error('La lettre ' + event.key +' à déja été traitée');
      }
    }
  }

  useEffect(() =>{
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      
        window.removeEventListener('keydown', handleKeyDown);
      
    };
  }, [usedLetter, attempt])

  
  const getData = async () => {
    const dataJson = await fetch("https://animalfinderapi.herokuapp.com/word")
    return await dataJson.json();
  };  

if (!data){
  return <p>Awaiting....</p>
}
const user = localStorage.getItem('user')



    return (
        <div className={`bg ${darkMode ? "bg-dark" : "bg-light"}`}>
        <div className='ml-auto'>
        <SwitchButton/>
        </div>
      <div className='App' >
      <div className={`${darkMode ? "text-light" : "text-dark"}`}>
          <h1 className='App'>Word Finder</h1>
          <p>Trouvez le mot pour gagner des points</p>
          <div className='App'><br/>
          <ToastContainer />
            {(user === null) && <User />}  
            <a className='btn btn-primary' href=''>Relancer le jeu</a>  <br/>
            win = {win}
            <br/> 
            attempt = {attempt}     
            {(data) && 
              <CurrentWord currentWord = {data} usedLetter={usedLetter} win={win}/>
             }
             <br/>
             <br/>
          <Classement darkMode={darkMode}/>

          </div>

      </div>
      </div>
      </div>
      
    )
}

export default App;
