import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'http://localhost:5000/',
});

export const LoginRequest= async(props)=>{
    
    try {

        const {data} = await axios.post('auth/login',props)
        
        return data
        
    } catch (error) {
        
        return error.response.data

    }
}

export const NewAccountRequest = async (props)=>{
        
        try {
            const{ data } = await axios.post('auth/signup',props)
            return data
        } catch (error) {
            return error.response.data
        }
        
}