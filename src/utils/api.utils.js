import Axios from 'axios';
import{useState, useEffect} from 'react';



export const LoginRequest = async ({...props})=>{
    console.log(props)
    const response = await Axios.post('http://localhost:5000/auth/login',props);
    return response;
}