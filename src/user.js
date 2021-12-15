import React from 'react';
import {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Classement from './classement';

export default function User() {
  
  const [myInputValue, setMyInputValue] = useState("");
  const getUser = async () => {
    const dataJson = await fetch(`https://animalfinderapi.herokuapp.com/user/${myInputValue}`);
    const user = await dataJson.json();
    
    if(user){
      localStorage.setItem('user', user);
      toast.success('Vous pouvez maintenant jouez en tant qu\'utilisateur: ' + myInputValue);
    }
  };

    return (
      <div className='App'>
          <div className='App'>
            <input type="text" name="username" value={myInputValue} onChange={e => setMyInputValue(e.target.value)}/>
            <button className="ml-3 btn btn-light" onClick={getUser}>Enregister</button>
          </div>
          <div className='App'>
          <ToastContainer />
          <Classement/>        
          </div>
      </div>
    );
  }
  
