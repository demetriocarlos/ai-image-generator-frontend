import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_API_URL;



const login = async (credentials)  => {
    try{
        const response = await axios.post(`${baseUrl}/login`, credentials)
        toast.success('¡Bienvenido de nuevo!')
        return response.data;
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido', {
            autoClose: 10000
        })
        console.error('Error al iniciar sesion', error)
    }
}


const loginGithub = async (code) =>{
    try{
         
        const response = await axios.post(`${baseUrl}/login/github`, {code})
        toast.success('¡Bienvenido de nuevo!')
        return response.data;
    }catch(error) {
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error('Error al iniciar sesion con github', error)
    }
}


export default{
    login,
    loginGithub
}

      