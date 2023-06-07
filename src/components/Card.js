import React, { useState, useEffect } from "react"

const Pokedex = require("pokeapi-js-wrapper");
const P = new Pokedex.Pokedex();


export default function Card({ name, onCardClick }) {

    const [pokemon, setPokemon] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPokemonByName = async () => {
            try {
                const pokemon = await P.getPokemonByName(name);
                setPokemon(pokemon);
            } catch (error) {
                setError(error);
            }
        }

        getPokemonByName();

    }, [name])

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="card text-white bg-dark" onClick={onCardClick}>
            <h5 className="card-title d-flex justify-content-center mt-3">{pokemon.name}</h5>
            {pokemon.sprites &&
                <img
                    src={pokemon.sprites.back_default}
                    alt="pokemon sprite"
                    style={{ width: "150px", height: "150px" }}
                />
            }
        </div>
    )
}
