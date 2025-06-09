import { useState } from 'react';
import Score from './components/Score.jsx';
import Card from './components/Card.jsx';

export default function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pokemon, setPokemon] = useState([]);
  
  const getPokemon = async () => {
    const twelvePokemon = [];
    while (twelvePokemon.length < 12) {
      const pokemonNum = Math.floor(Math.random() * 152) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNum}`);
      const result = await response.json();
      const poke = {
        name: result.name,
        img: result.sprites.front_default,
      };
      // Todo: Check for and discard duplicates.
      twelvePokemon.push(poke);
    }
    setPokemon(twelvePokemon);
    console.log(twelvePokemon);
  }

  return (
    <>
      <h1>Memory Card</h1>
      <p className="instructions">Click on each card only once!</p>
      <Score score={score} bestScore = {bestScore} />
      <Card />
      <button onClick={getPokemon}>Start</button>
    </>
  )
}