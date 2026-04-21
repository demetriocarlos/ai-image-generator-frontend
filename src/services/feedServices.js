import api from "./api";
import { toast } from "react-toastify";



const getFeedImg = async () => {
    try{
        const response = await api.get("/feed");
        return response.data;
    }catch (error){
        toast.error(error.response?.data?.error || 'Error desconocido', {
            autoClose: 10000
        })
        console.error("Error al cargar los datos de feed", error)
    }
}


const getFeedImgId = async (id) => {
    try {
        const response = await api.get(`/feed/image/${id}`)
        return response.data;
    }catch(error) {
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error("Error al cargar la imagen por id", error)
    }
}


const getFeedSearch = async (query) => {
    try{
        const response = await api.get(`/feed/search?query=${query}`)
        return response.data;
    }catch(error) {
        toast.error(error.response?.data?.error || "Error desconocido")
        console.error("Error al realizar la busqueda", error)
    }
}






export default {
    getFeedImg,
    getFeedImgId,
    getFeedSearch,
}