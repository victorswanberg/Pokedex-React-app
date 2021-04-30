import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {

  // Setting my variable fields
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");

  // Need to convert the input data string to lowercase.
  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase())
  };

  //Submit button handler
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
      //console.log(res)

    } catch (e) {
      console.log(e)
      alert("This is not a valid poke'mon")
    }
  };
  console.log(pokemonData);

  return (
    <div className="App">
      
        <form onSubmit={handleSubmit}>
          <label>
            <input
            type="text"
            onChange={handleChange}
            placeholder="Who's that pokemon!??"
            />
          </label>
        </form>  
          {pokemonData.map((data) => {
            return(
              <div className="container">
                <img src={data.sprites["front_default"]} alt={data.sprites}/>
                <div className="divTable">
                  <div className="divTableBody">
                    <div className="divTableRow">
                      <div className="divTableCell">Type</div>
                      <div className="divTableCell">{pokemonType}</div>
                    </div>
                    <div className="divTableRow">
                      <div className="divTableCell">Height</div>
                      <div className="divTableCell">{" "}
                      {/* Reference the poke api docs because height is converted in an odd way */}
                      {Math.round(data.height + 3.9)}"
                      </div>
                    </div>
                    <div className="divTableRow">
                      <div className="divTableCell">Weight</div>
                      <div className="divTableCell">{" "}
                      {/* WHY is the weight measure like this...I had to look this up in the doucmentation */}
                      {Math.round(data.height / 4.3)} lbs
                      </div>
                    </div>
                    <div className="divTableRow">
                      <div className="divTableCell">Battles</div>
                      <div className="divTableCell">{data.game_indices.length}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
        })}
      </div>  
   
  );
}

export default App;
