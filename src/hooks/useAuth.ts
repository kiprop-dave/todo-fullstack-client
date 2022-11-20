import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAuth = () => {
    const authContext = useContext(AuthContext);
    if(!authContext) return null;

    const {auth,setAuth} = authContext

    return {auth,setAuth}
}

export default useAuth