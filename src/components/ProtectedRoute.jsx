import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context"



const ProtectedRoute = ({ children, onlyBiz = false }) => {
const { user } = useAuth();

    if(!user || onlyBiz && !user.isBusiness){
        return <Navigate to="/" />
    }

    return children;
}

export default ProtectedRoute;