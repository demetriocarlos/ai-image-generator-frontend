import { useQuery, } from "@tanstack/react-query"
import feedServices from "../services/feedServices"
import collectionServices from "../services/collectionServices"
//import { useAuth } from "./useAuth"

export const useFeedImg = () => {
    return useQuery({
        queryKey:["feed"],
        queryFn: feedServices.getFeedImg,
        onError:(error) =>{
            console.error("Error al gargar las imagenes de feed", error)
        }
    })
}


export const useFeedImgId = (id) => {
    return useQuery({
        queryKey:["feed",id],
        queryFn:() => feedServices.getFeedImgId(id),
        enabled: !! id, //solo ejecutar si el id es valido
        onError: (error) => {
            console.error("Error al cargar   imagen id", error)
        }
    })
}


export const useFeedSearch = (query) => {
    return useQuery({
        queryKey:["feedSearch", query],
        queryFn:() => feedServices.getFeedSearch(query),
        enabled: !!query
    })
}




export const useGetCollectionFeed = () => {
    return useQuery({
        queryKey:["feedonis"],
        queryFn: collectionServices.getCollection,
         onError:(error) =>{
            console.error("Error al cargar las colecciones", error)
        }
    })
}
 

