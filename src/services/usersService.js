import httpservice, { setDefaultCommonHeaders } from './httpservice'
import { jwtDecode } from 'jwt-decode'
const TOKEN_KEY = 'token'

function getJWT(){
    return localStorage.getItem(TOKEN_KEY);
}

refreshToken();

function setToken(token){
    localStorage.setItem(TOKEN_KEY, token)
    refreshToken()
}

function refreshToken(){

    setDefaultCommonHeaders('x-auth-token', getJWT())
}

export function createUser(user){
    return httpservice.post('/users', user);
}

export async function loginUser(loginDetails){
   const response = await httpservice.post('/users/login', loginDetails)
   setToken(response.data);

   return response; 
}

export function logout(){
    setToken(null);
}

export function getUser(){
    try{
        const token = getJWT();
        return jwtDecode(token);
    }     
    catch(err){
        return null;
    }
}


const usersService = {
    createUser,
    loginUser,
    logout,
    getUser,
    refreshToken,

}

export default usersService;