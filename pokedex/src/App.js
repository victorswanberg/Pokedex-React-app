import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {

  // Setting my variable fields
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase())
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon()
  }

  //Getting the api
  const getPokemon = async () => {
    const toArray = [];
    try {
      // URL for the poke api using literals to seperate individual data
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray);
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  };

  // useEffect(() => {
  //   getPokemon();
  // }, [])


  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label
          type="text"
          onChange={handleChange}
          placeholder="What is that pokemon?">
        </label>
      </form>
    </div>
  );
}

export default App;
