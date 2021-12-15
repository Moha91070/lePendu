import {useState, useEffect} from 'react';

export default function Classement({darkMode}) {
    const getScore = async () => {
        const dataJson = await fetch(`https://animalfinderapi.herokuapp.com/score`)
        const {data} = await dataJson.json();
        return data;
      };
      const [score, setScore] = useState('');
    
    useEffect(() => {
        (async ()=>{
          const score = await getScore();
          setScore(score);
        })()
        return () => {}
      }, []); 

    return (
        <div>
            <h1>Classement</h1>
            <hr/>
            <div className={`contenair ${darkMode ? "text-light" : "text-dark"}`}>
            <div className='row'>
             {Array.from(score).map(x => (
                 <div className='col-sm-3 mt-5 '>
                 <div className='card h-100 bg-grey' style={{width: "20rem"}}>
                <div key={x.username} className='card-body'>
                  <img className='ard-img-top' src={`https://avatars.dicebear.com/api/adventurer-neutral/${x.username}.svg`}
                  alt="logo"
                  style={{ width: "100px", height: "100px", borderRadius:"50%", marginBottom: 20 }}
                  />
                  <hr/>
                  <div className='card-body'>
                    <span className='card-text' style={{color:"black"}}>utilisateur : {x.username}</span>
                    <hr/>
                    <span className='card-text' style={{color:"black"}}>score : {x.score}</span>
                    </div>
                  </div>
                  </div>
                  </div>
             ))
             
            }
            </div>
            </div>
        </div>
       
    )
}