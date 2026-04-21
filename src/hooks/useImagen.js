 
import imagenServices from "../services/imagenServices";
import { useMutation, useQueryClient,  } from "@tanstack/react-query"





export const useCreateImagen = () => {
    const queryClient = useQueryClient()

    const newMutation = useMutation({
        
        mutationFn: imagenServices.createImage,
        onSuccess: () => {
             queryClient.invalidateQueries({queryKey:['imagen']})
        },
        onError:(error) => {
            console.error('Error al generar la imagen', error)
        }
    })

    return newMutation
}


export const useSaveImagen = () => {

    const queryClient = useQueryClient()

    const newMutation = useMutation({
        mutationFn:imagenServices.saveImagen,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['imagen']})
        }, onError: (error) => {
            console.error("Error al guardar la imagen", error)
        }
    })

    return newMutation
}





