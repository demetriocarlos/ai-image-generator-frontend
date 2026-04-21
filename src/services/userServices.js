import axios from "axios";
import { toast } from "react-toastify";


const baseUrl = import.meta.env.VITE_API_URL;

       


const createUser = async (credentials) => {
    try{
        const response = await axios.post(`${baseUrl}/signup`, credentials)
        toast.success("cuenta creada exitosamente!");
        return response.data;
    }catch (error) {
        toast.error(error.response?.data?.error || 'Error desconocido', {
             autoClose: 10000
        })
        console.error('Error al crear el usuario', error)
    }
}



export default {
    createUser
}
