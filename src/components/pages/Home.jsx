import Card from '../card'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../contexts/auth.context'

function Home(props) {
    const [cards, setCards] = useState([])
    const { user } = useAuth()
    useEffect(() => {
        (async () => {
            const res = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards');
            const filteredCards = res.data.filter((card) => card.title.includes(props.searchValue))
            setCards(filteredCards)

        })()
    }, [props.searchValue]);

    return (<>
        <div className='cards-container' >
            <div style={{ fontWeight: "600", marginBottom: "100px" }} className='intro'>welcome to the website of your dreams</div>
            <div className='all-cards'>
                {cards.map(card => (
                    <Card style={{ width: "800px" }} className="card"
                        key={card._id}
                        title={card.title}
                        subtitle={card.subtitle}
                        description={card.description}
                        src={card.image.url}
                        alt={card.image.alt}
                        id={card._id}
                        phone={card.phone}
                    />
                ))}
            </div>
        </div >
    </>
    )
}

export default Home;