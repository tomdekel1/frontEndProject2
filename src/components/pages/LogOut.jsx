import { Link, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/auth.context"

function LogOut(){
const { logout } = useAuth()
const navigate = useNavigate()
const handleLogout = () => {
    logout();
    navigate('/');
}
    return(<div style={{background:"var(--background-color)", color:"var(--text-color)",minHeight:"100vw", textAlign:"center",paddingTop:"10%"}}>
<h1>Are you sure you want to sign out?</h1>
<Link to="/" className="btn mx-2" style={{background:"linear-gradient(0.25turn,#b018c4, #BDE8CA, #1ce4d3)", border:"none"}} >
       heck no 
 </Link>
<button className={"btn btn-outline-light mx-5 text-dark"} onClick={handleLogout}>yes</button>
</div>
    )
}

export default LogOut