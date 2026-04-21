import api from "./api";
import { toast } from "react-toastify";

const getCollection = async () => {
    try{
        const response = await api.get('/collections')
        return response.data;
    }catch(error) {
        console.error('Error al cargar las colecciones',error)
    }
}



const getCollectionPreview = async () => {
    try{
        const response = await api.get('/collections/preview')
        return response.data;
    }catch(error) {
        console.error('Error al cargar las colecciones',error)
    }
}



const getCollectionImg = async (collectionId) => {
    try{
        const response = await api.get(`/collections/full/${collectionId}`)
        return response.data;
    }catch(error) {
        console.error('error al cargar las imagenes de la collecion', error)
    }
}



const createCollection = async (name) => {
     
    try{
        const response = await api.post("/collections",name)
        toast.success(`se guardo en ${name.name}`)
        return response.data; 
    }catch(error) {
        toast.error(error.response?.data?.error || 'Error desconocido', {
            autoClose: 10000
        })
        console.error('Error al crear la colleccion', error)
    }
}


const updatedCollection= async (collectionId, imageId) => {
    try{
        const response = await api.put(`/collections/${collectionId}/image/${imageId}`)
        //console.log('response', response)
        toast.success(response.data.message)
        return response.data.updatedCollection;
    } catch (error){
        toast.error(error.response?.data?.error || "Error desconocido")
        console.error("Error al actualizar coleccion", error)
    }
}



 

export default {
    getCollection,
    createCollection,
    updatedCollection,
    getCollectionPreview, 
    getCollectionImg
}