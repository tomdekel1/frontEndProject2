import { useParams } from "react-router-dom";
import { getCardById } from "../../services/cardsService";
import { useEffect, useState } from "react";
import Card from "../card";


function CardPage(){
    const { id } = useParams()
    const [cardDetails, setCardDetails] = useState("")

    console.log(id)
    useEffect(() =>{
        async function getData(){

            const res =  await getCardById(id)
            console.log(res)
            setCardDetails(res.data)
            console.log(res.data)
        }
        getData()
    },[])
    
    return (
        <div style={{background:"linear-gradient(0.25turn, #D7C3F1, #BDE8CA, #BDE8CA)",height:"100vh"}}>
            <div style={{display:"flex",justifyContent:"center",paddingTop:"5%",}}>
                <Card style={{ width: "800px",}} className="card"
                    key={cardDetails._id} 
                    title={cardDetails.title} 
                    subtitle={cardDetails.subtitle}
                    description={cardDetails.description}
                    src={cardDetails.image?.url} 
                    alt={cardDetails.image?.alt}
                    id={cardDetails._id}/>
            </div>
        </div>
    )
}

export default CardPage;