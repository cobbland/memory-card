export default function Card({ name, image, cry, onClick}) {
    const pokeCry = new Audio(cry);

    function handleClick(target) {
        pokeCry.play();
        onClick(target);
    }

    return (
        <div className="card" onClick={() => handleClick(name)}>
            <img src={image} alt="" />
            <h2>{name}</h2>
        </div>
    )
}