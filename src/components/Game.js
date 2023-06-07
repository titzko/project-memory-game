import Level from "./Level"
import { useEffect, useState } from "react";


export default function Game() {

    const STARTING_DIFFICULTY = 4;
    let [score, setScore] = useState(0);
    let [highscore, setHighscore] = useState(0);
    let [difficulty, setDifficulty] = useState(STARTING_DIFFICULTY);


    useEffect(() => {
        if (score > highscore) {
            setHighscore(score);
        }
    }, [score])


    function handleLoose() {
        setScore(0);
        setDifficulty(STARTING_DIFFICULTY);
        alert("YOU LOST");
    }


    function increaseDifficulty() {
        setDifficulty(difficulty => difficulty + 1);
        alert("Level done. Well played")
    }

    return (
        <div key={difficulty}>
            <h2 className="d-flex justify-content-around pt-3" >
                <div>Score: {score}</div>
                <div>Highscore: {highscore}</div>
            </h2>

            <Level size={difficulty}
                increaseStore={() => setScore(score => score + 1)}
                looseHandling={handleLoose}
                increaseDifficulty={increaseDifficulty}
            />
        </div>
    )
}