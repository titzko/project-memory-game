import React, { useState, useEffect } from 'react';
import { BallTriangle } from 'react-loader-spinner';

const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

export default function Card({ name, onCardClick }) {
    const [pokemon, setPokemon] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getPokemonByName() {
            return await P.getPokemonByName(name);
        }

        getPokemonByName().then(p => {
            setPokemon(p);
            setTimeout(()=> {
                setIsLoading(false);
            }, 400)
        });

    }, []);

    return (
        <div className="card text-white bg-dark" onClick={onCardClick} style={{ "height": "200px" }}>
            <h5 className="card-title d-flex justify-content-center mt-3">{pokemon.name}</h5>
            {isLoading ? (
                <div className='d-flex justify-content-center align-items-center h-100'>
                    <BallTriangle
                        color="#00BFFF"
                        height={50}
                        width={50}
                        timeout={3000}
                    />
                </div>
            ) : (
                pokemon.sprites && (
                    <img
                        src={pokemon.sprites.back_default}
                        alt="pokemon sprite"
                        style={{ width: "150px", height: "150px" }}
                    />
                )
            )}
        </div>
    );
}
