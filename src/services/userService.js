import http from './httpService'
import config from '../config/config.json'
import jwtDecode from "jwt-decode";

const userEndPoint = config.apiEndPoint

http.setJwt(getToken());

export async function register(user){
    const response = await http.post(userEndPoint+'users',user)
    localStorage.setItem("token",response.headers['x-auth-token']);
}

export async function login(user){
    const {data: jwt} = await http.post(userEndPoint+'auth',user)
    localStorage.setItem("token", jwt)
}

export function logout(){
    localStorage.removeItem("token")
}

export function getCurrentUser(){
    try{
        const token = localStorage.getItem("token")
        return jwtDecode(token)
    }catch(ex){
        return null;
    }
}

export function getToken(){
    return localStorage.getItem("token");
}