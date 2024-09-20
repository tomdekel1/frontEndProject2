import { deleteCard, getMyCards } from "../../services/cardsService"
import { useEffect, useState } from "react";
import Card from "../card";


function MyCards() {
    const [cardDetails, setCardDetails] = useState([])

    useEffect(() => {
        async function getData() {
            const res = await getMyCards()
            setCardDetails(res.data)
            console.log(res.data)
        }
        getData();


    }, [])
    return (
        <div style={{ background: "var(--background-color)", color: "var(--text-color)", }}>

            <h1>my cards</h1>
            {cardDetails.map(card => (
                <div key={card._id}>
                    <Card style={{}} className="card"

                        title={card.title}
                        subtitle={card.subtitle}
                        src={card.image.url}
                        alt={card.image.alt}
                        id={card._id}
                        btn={<button onClick={() => deleteCard(card._id)}>delete card</button>} />
                </div>
            ))}

        </div>

    )
}

export default MyCards;