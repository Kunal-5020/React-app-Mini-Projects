import './App.css'
import React, { useState, useEffect } from 'react';
import SingleCard from './components/SingleCards';
import Modal from './Modal';

const cardImages = [
  {"src": "/img/helmet-1.png", matched: false },
  {"src": "/img/potion-1.png", matched: false },
  {"src": "/img/ring-1.png", matched: false },
  {"src": "/img/scroll-1.png", matched: false },
  {"src": "/img/shield-1.png", matched: false },
  {"src": "/img/sword-1.png", matched: false }
]


function App() {
  const[cards, setCards] = useState([])
  const[turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [showModal, setShowModal] = useState(false);


  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card,id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
    setShowModal(false);
  }

//handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

//checking if the cards matches
useEffect(() => {
  
  if (choiceOne && choiceTwo){
    setDisabled(true)
    if (choiceOne.src === choiceTwo.src) {
      setCards(prevCards => {
        return prevCards.map(card => {
          if(card.src === choiceOne.src) {
            return {...card, matched: true}
          } else {
            return card
          }
        })
      })
      resetTurn()
    }
    else{
      setTimeout(() => resetTurn(),1000)
    }
  }
}, [choiceOne, choiceTwo])

//congratulations pop up
useEffect(() => {
  if (cards.length && cards.every(card => card.matched)) {
    setShowModal(true);
  }
}, [cards]);



  //reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // auto start the game 
useEffect(() => {
  shuffleCards()
},[])

  return (
    <div className="App">
      <h1>Memory Card Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard
          key={card.id} 
          card={card}  
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
      <p> Turns : {turns} </p>
      <Modal show={showModal} handleClose={() => setShowModal(false)} message={"Congratulations! You won the game!"} />
    </div>
  );
}

export default App