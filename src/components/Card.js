import { useState } from "react"
import { useEffect } from "react"



export default function Card({name, onCardClick}) {

    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        const Pokedex = require("pokeapi-js-wrapper");
        const P = new Pokedex.Pokedex();

        async function getPokemonByName() {
            return await P.getPokemonByName(name);
        }

        getPokemonByName().then(p => setPokemon(p));

    }, [])

    return (
        
            <div className="card text-white bg-dark" onClick={onCardClick}>
                <h5 className="card-title d-flex justify-content-center mt-3">{pokemon.name}</h5>
                {pokemon.sprites &&
                    <img
                        src={pokemon.sprites.back_default}
                        alt="pokemon sprite"
                        style={{ width: "150px", height: "150px"}}
                    />
                }
            </div>
    )
}