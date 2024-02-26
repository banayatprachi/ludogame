import React, { useState } from 'react';
import './App.css';
import Heading from './Heading';

const DiceGame = () => {
  const [scores, setScores] = useState([0, 0]);
  const [currentScore, setCurrentScore] = useState(0);
  const [activePlayer, setActivePlayer] = useState(0);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    if (!rolling) {
      setRolling(true);

      const diceResult = Math.floor(Math.random() * 6) + 1;

      setTimeout(() => {
        setRolling(false);

        if (diceResult !== 1) {
          setCurrentScore(diceResult);
          setScores((prevScores)=>{
            const newScores = [...prevScores];
            newScores[activePlayer] += diceResult;
            return newScores;
          });

        } else {
          switchPlayer();
        }

      }, 1000);
    }
  };

  const switchPlayer = () => {
    setCurrentScore(0);
    setActivePlayer((prevPlayer) => (prevPlayer === 0 ? 1 : 0));
  };
  
  const holdPoints = () => {
    setScores((prevScores) => {
      const newScores = [...prevScores];
      newScores[activePlayer] += currentScore;

      if (newScores[activePlayer] >= 50) {
        alert(`Player ${activePlayer + 1} wins!`);
        resetGame();
      } 
      return newScores;
    });
    
      switchPlayer();
    
  };

  const resetGame = () => {
    setScores([0, 0]);
    setCurrentScore(0);
    setActivePlayer(0);
  };
 
  return (
    <div className="dice-game">
      <Heading/> 
      <div className="player-container">
        <div className={`player ${activePlayer === 0 ? 'active' : ''}`}>
          <div className="score">
            <h2>Louis</h2>
            <p>Total Score: {scores[0]}</p>
          </div>
        </div>

         <div className='dimg'>
         <img src={`dice-${rolling ? 'rolling' : currentScore === 0 ? '1' : currentScore}.png`} alt={`Dice Result: ${rolling ? 'Rolling' : currentScore}`}  className="dice centered"/>
          <p>Current Score: {rolling && currentScore !== 1 ? currentScore : 0}</p>
         
                  </div>

        <div className={`player ${activePlayer === 1 ? 'active' : ''}`}>
          <div className="score">
            <h2>Harry</h2>
            <p>Total Score: {scores[1]}</p>
          </div>
  
        </div>
      </div>
       
      <div className="buttons">
            <button className='btn' onClick={rollDice} >
              Roll Dice
            </button>
            <button className='btn' onClick={holdPoints} disabled={rolling || currentScore === 0}>
              Hold
            </button>
          </div>

      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};
 
export default DiceGame;
