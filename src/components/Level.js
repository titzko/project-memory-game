import { useEffect } from "react"
import { useState } from "react";

import Card from "./Card"
import {shuffle} from "../utils";

export default function Level() {

    const LEVEL_SIZE = 5;
    const [pokemonNames, setPokemonNames] = useState([]);
    const [remainingPokemon, setRemainingPokemon] = useState([]);
    const [version, setVersion] = useState(0); // new state


    useEffect(() => {
        async function getAllPokemenons() {
            const result = [];
            const Pokedex = require("pokeapi-js-wrapper");
            const P = new Pokedex.Pokedex();
            const pokemons = await P.getPokemonsList();

            for (let i = 0; i < LEVEL_SIZE; i++) {
                result.push(pokemons.results[getRandomInt(500)].name);
            }
            return result;
        }


        getAllPokemenons().then(result => {
            setPokemonNames([...result])
            setRemainingPokemon([...result]);
        });

    }, []);


    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }



    function handleCardClick(name) {
        !remainingPokemon.includes(name) 
        ? handleLoose()
        : setRemainingPokemon(remainingPokemon.filter((element) => element !== name))

        setPokemonNames([...shuffle(pokemonNames)])
        setVersion(version + 1); // increment version to force a re-render
    }


    function handleLoose() {
        setRemainingPokemon([...pokemonNames])
        alert("YOU LOST");
    }


    return (
        <div className="row" style={{ "width": "75%", "margin": "auto" }} key={version}>
            {pokemonNames.map((name, index) =>
            <div className="col-3 mt-3" key={index}>
                <Card name={name} onCardClick={() => handleCardClick(name)} />
            </div>
            )}

        </div>
    )
}