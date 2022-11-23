import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const authContext = useAuth();
    if(!authContext) return null;
    const {setAuth,auth} = authContext;
    const {email,message,userTodos} = auth
    
    const refresh = async () => {
        const response = await axios.get("/refresh",{
            withCredentials:true
        })
        setAuth({...response.data,email,message,userTodos})

        return response.data.accessToken;
    }

    return refresh

}

export default useRefreshToken