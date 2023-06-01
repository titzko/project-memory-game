import { useState } from "react";


export default function Card({ name }) {

    const [counter, setCounter] = useState(0);
    const [pokemons, setPokemons] = useState([]);
    const Pokedex = require("pokeapi-js-wrapper")
    const P = new Pokedex.Pokedex()

    function increaseCount() {
        setCounter(counter + 1)
    }


    async function addPokemon() {
        const golduck = await P.getPokemonByName("golduck");
        setPokemons([...pokemons,golduck])
    }





    return (
        <div>
            <div>hello from my card with the name {name}</div>
            <button onClick={increaseCount} >Count {counter}</button>
            <button onClick={addPokemon}>Get Pokemon</button>

            {pokemons.map((pokemon,index) => 
                <div key={index}>
                    <div>{pokemon.name}</div>
                    <img
                        src={pokemon.sprites["back_default"]}
                        alt={'Photo of ' + pokemon.name}
                    />
                </div>
            )}
        </div>
    )
}
