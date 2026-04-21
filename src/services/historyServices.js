import api from "./api";
import { toast } from "react-toastify";




const getHistory = async () => {
    try{
        const response= await api.get('/history');
        return response.data;
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido', {
             autoClose: 10000
        })
        console.error('Error al cargar el historial', error)
        throw error
    }
}


const publicFeed = async (id, isPublic) =>{
     
    try{
        const response = await api.put(`/isPublic/${id}`, {isPublic} )
        return response.data;
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido', {
             autoClose: 10000
        })
        console.error("Error al publicar la imagen", error)

        throw error
    }
}



const deleteImagen = async (id) => {
    try{
        const response = await api.delete(`/deleteImg/${id}`);
        return response.data;
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido', {
             autoClose: 10000
        })
        console.error('Error al eliminar la imagen', error)
        throw error
    }

    
}

export default {
    getHistory,
    publicFeed,
    deleteImagen
}

