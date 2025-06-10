export default function Score({ score, bestScore }) {

    return (
        <div className="scores">
            <p>Caught: {score}</p>
            <p>Most Caught: {bestScore}</p>
        </div>
    )
}