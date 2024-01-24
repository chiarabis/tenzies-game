import React from 'react'
import Die from './components/Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(()=> {
    const allHeld = dice.every(n => n.isHeld);
    const allSameValue = dice.every(
      n => n.value === dice[0].value
    );

    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log('You won!');
    } else {
      setTenzies(false);
    }
  }, [dice])

  function generateNewDie(){
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }
  
  function allNewDice(){
    const newDice = []

    for(let i = 0; i < 10; i++){
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice(){
    if(!tenzies){
      setDice(oldDice => oldDice.map(n => {
        return n.isHeld ?
        n :
        generateNewDie()
      }))
    }else{
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(n => {
      return n.id === id ? 
      {...n, isHeld: ! n.isHeld} :
      n
    }))
  }

  const diceElements = dice.map(n => (
      <Die 
        key={n.id} 
        value={n.value} 
        isHeld={n.isHeld}
        holdDice={()=> holdDice(n.id)}
      />
    ))

  return (
    <main>
      {tenzies && <Confetti/>}
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>Roll untill all dice are the same. Click each die to freeze it at its current value beetween rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button className='roll-dice' onClick={rollDice}>{tenzies ? "New game" : "Roll"}</button>
    </main>
  )
}
