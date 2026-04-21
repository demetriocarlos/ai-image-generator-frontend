import api from "./api";
import { toast } from "react-toastify";


const createImage =  async (data) => {
    
    try{
        const response = await api.post('/generate', data);
         toast.success(response.data.message ? response.data.message : "Imagen creada con exito")
        return response.data;
    }catch(error) {
         toast.error(error.response?.data?.error || 'Error desconocido', {
             autoClose: 10000
        })
        console.error("Error al generar la imagen", error)
         
    }
}


const saveImagen = async (data) => {
    try{
        const response = await api.post('/images/save', data);
        toast.success("Imagen guardada")
        return response.data;
    }catch (error){
        console.error('Error al guardar la imagen',error)
    }
}


export default {
    createImage,
    saveImagen
}

