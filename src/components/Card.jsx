import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toggleFavoriteCard } from "../services/cardsService";



function Card(props) {
  const [favorite, setFavorite] = useState(false)
  const handleFavorite = async () => {
    setFavorite(!favorite);
    const res = await toggleFavoriteCard(props.id)

  }
  const navigate = useNavigate()
  function moveToCardPage() {
    navigate(`/cardPage/${props.id}`)
  }

  return (
    <div className="card" style={{ width: "18rem", borderRadius: "10px", marginBottom: "100px", border: "none", background: "var(--card-bg)", color: "var(--text-color)", width: "90vw", display: "flex", flexDirection: "row", maxHeight: "60vh", marginLeft: "100px", padding: "3%", }} >
      <img src={props.src} className="card-img-top" alt={props.alt} />
      <div className="card-body" style={{ marginTop: "-2%" }} >
        <h5 className="card-title fs-2">{props.title}</h5>
        <p className="card-text">{props.subtitle}</p>
        <p className="card-text">{props.description}</p>
        <p className="card-text">{props.phone}</p>

        <div onClick={handleFavorite} style={{ color: "white" }}
          className={["bi bi-suit-heart-fill", favorite && "text-danger"]
            .filter(Boolean)
            .join(" ")}></div>

        <button style={{ borderRadius: "20px", border: "none", padding: "18px", marginTop: "3%", background: "linear-gradient(0.25turn, #ae7feb, #BDE8CA, #1ce4d3)", border: "1px,solid, aqua", boxShadow: " 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)", }} onClick={moveToCardPage}>show card</button>
        {props.btn}
      </div>
    </div>
  )
}

export default Card;