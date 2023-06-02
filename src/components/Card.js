

export default function Card({name}) {


    return (
        <div className="col-3 mt-3">
                <div className="card text-white bg-dark">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <img
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/365.png"
                            alt="Some picture"
                            style={{ width: "100px", height: "100px" }}

                        />
                    </div>
                </div>
            </div>
    )
}