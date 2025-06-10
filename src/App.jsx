import { useState } from 'react';
import Score from './components/Score.jsx';
import Card from './components/Card.jsx';
import logo from './assets/memory-card.png';

export default function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pokemon, setPokemon] = useState([]);
  const [clicked, setClicked] = useState([]);
  
  const getPokemon = async () => {
    const twelvePokemon = [];
    while (twelvePokemon.length < 12) {
      const pokemonNum = Math.floor(Math.random() * 252) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNum}`);
      const result = await response.json();
      const poke = {
        name: result.name,
        img: result.sprites.front_default,
        cry: result.cries.legacy,
      };
      let isDouble = false;
      for (const object of twelvePokemon) {
        if (object.name == poke.name) {
          isDouble = true;
        }
      }
      if (!isDouble) {
        twelvePokemon.push(poke);
      }
    }
    setPokemon(twelvePokemon);
  }

  function handleClick(target) {
    if (!clicked.includes(target)) {
      setClicked([...clicked, target]);
      const newScore = score + 1;
      const newPoke = shuffleArray(pokemon);
      setPokemon(newPoke);
      setScore(newScore);
      if (clicked.length === 11) {
        console.log("You win!");
      }
    } else {
      setBestScore(score);
      setClicked([]);
      setScore(0);
      setPokemon([]);
    }
  }

  function shuffleArray(oldArr) {
    const array = oldArr;
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  } 

  return (
    <>
      <h1>Memory Card</h1>
      <p className="instructions">Click on each Pokémon card only once to catch 'em all and win!</p>
      <Score score={score} bestScore = {bestScore} />
      <div className="cards">
        {pokemon.map((each) => (
          <Card 
            key={each.name} 
            name={each.name} 
            image={each.img} 
            cry={each.cry}
            onClick={handleClick} 
          />
        ))}
      </div>
      <button onClick={getPokemon}>Start</button>
    </>
  )
}