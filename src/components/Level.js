import { useEffect, useState } from "react"

import Card from "./Card"
import { shuffle, getRandomInt } from "../utils";

const Pokedex = require("pokeapi-js-wrapper");
const P = new Pokedex.Pokedex();

export default function Level({ size, increaseStore, looseHandling, increaseDifficulty }) {

    const [pokemonNames, setPokemonNames] = useState([]);
    const [remainingPokemon, setRemainingPokemon] = useState([]);
    const [version, setVersion] = useState(0);


    // check for level up
    useEffect(() => {
        if (remainingPokemon.length === 0 && pokemonNames.length > 0) {
            increaseDifficulty();
        }
    }, [remainingPokemon]);


    useEffect(() => {
        async function getAllPokemenons() {
            const result = [];
            const pokemons = await P.getPokemonsList();
    
            for (let i = 0; i < size; i++) {
                // 500 since im not getting images for every pokemon (1281 is the size of the pokemons.results - array)
                result.push(pokemons.results[getRandomInt(500)].name);
            }
            return result;
        }


        getAllPokemenons().then(result => {
            setPokemonNames([...result])
            setRemainingPokemon([...result]);
        });

    }, []);



    function handleCardClick(name) {
        !remainingPokemon.includes(name)
            ? handleLoose()
            : handleCorrectTurn(name);
    }



    function handleCorrectTurn(name) {
        setRemainingPokemon(remainingPokemon.filter((element) => element !== name))
        increaseStore();
        setPokemonNames([...shuffle(pokemonNames)])
        setVersion(version + 1);
    }


    function handleLoose() {
        looseHandling();
        setRemainingPokemon([...pokemonNames])
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