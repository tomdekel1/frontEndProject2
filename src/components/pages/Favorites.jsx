import Card from '../card'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../contexts/auth.context'


function Favorites(props) {
    const [cards, setCards] = useState([])
    const { user } = useAuth()

    useEffect(() => {
        (async () => {
            const res = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards');
            const filteredCards = res.data.filter((card) => card.title.includes(props.searchValue))
            setCards(filteredCards)

        })()
    }, [props.searchValue]);

    return (

        <div className='cards-container' >
            <h1 style={{ fontSize: "150px", fontWeight: "600", }} className='intro'>Favorite Cards</h1>
            < div className='all-cards' style={{ minHeight: "75vh" }
            }>
                {
                    cards.map(card => {
                        const favoriteFilter = card.likes;
                        if (favoriteFilter.includes(user._id))
                            return (
                                <Card style={{ width: "800px" }} className="card"
                                    key={card._id}
                                    title={card.title}
                                    subtitle={card.subtitle}
                                    src={card.image.url}
                                    alt={card.image.alt}
                                    id={card._id} />
                            )
                    })

                }
            </div >
        </div >

    )
}

export default Favorites;