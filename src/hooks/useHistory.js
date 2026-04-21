import { useMutation, useQuery, useQueryClient,  } from "@tanstack/react-query";
import historyServices from "../services/historyServices";




export const useHistory = () => {
    
    const newMutation = useQuery({
        queryKey:["history"],
        queryFn: historyServices.getHistory,
        onSuccess: () => {},
        onError:(error) =>{
            console.error('Error al obtener  el historial', error)
        },
    })

    return newMutation;
}



export const useImgPublic = () => {
    const queryClient = useQueryClient()
    const newMutation = useMutation({
        mutationFn:({id, isPublic}) => historyServices.publicFeed(id, isPublic),
        onSuccess: (updatedImg) => {
            queryClient.setQueryData(["history"], (oldData) => {
                if(!oldData) return []

                 
                return  oldData.map((img) => 
                    img.id === updatedImg.id ? updatedImg : img
                )
            })

        },
        onError:(error) => {
            console.error("Error al actualizar la propiedad isPublic", error)
        }
    })
    return newMutation;
}



export const useDeleteImg = () => {
    const queryClient = useQueryClient();
    
    const newMutation = useMutation({
        mutationFn: (id) => historyServices.deleteImagen(id),
        onSuccess : (_, id)=>{
            queryClient.setQueryData(["history"], (oldData) => {
                if(!oldData) return []
                return oldData.filter((img)=> img.id !==  id)
            })
        },
        onError: (error) => {
            console.error("Error al eliminar la imagen", error)
        }
    })

    return newMutation;
}