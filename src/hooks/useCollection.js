import { useQuery, useMutation,useQueryClient } from "@tanstack/react-query";
import collectionServices from "../services/collectionServices";




export const useGetCollection = () => {
    return useQuery({
        queryKey:["collections"],
        queryFn: collectionServices.getCollection,
         onError:(error) =>{
            console.error("Error al cargar las colecciones", error)
        }
    })
}


export const useGetCollectionPreview = () => {
    return useQuery({
        queryKey:["collection"],
        queryFn: collectionServices.getCollectionPreview,
         onError:(error) =>{
            console.error("Error al cargar las colecciones", error)
        }
    })
}


export const useGetCollectionImg = (collectionId) => {
     return useQuery({
        queryKey:["collection", collectionId],
        queryFn:() => collectionServices.getCollectionImg(collectionId),
        enabled: !! collectionId, //solo ejecutar si el id es valido
        onError: (error) => {
            console.error("Error al cargar collection id", error)
        }
     })
}

export const useCreateCollection = () => {
     const queryClient = useQueryClient()

    return useMutation({
        mutationFn:collectionServices.createCollection,
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey:['collections']})
        },
        onError:(error) => {
            console.error("Error al realizar la creacion de la coleccion", error)
        }
    })
}




export const useUpdatedCollection = () => {
    const queryClient = useQueryClient();
    //const {state} = useAuth();

    const newMutation = useMutation({
        mutationFn:({collectionId, imageId}) =>  collectionServices.updatedCollection(collectionId, imageId),

        /*onMutate: async ({id}) => {

            await queryClient.cancelQueries(
                {predicate: (query) => 
                    query.queryKey[0] === 'feed'
                }
            );

            const snapshot = new Map();

            queryClient.getQueriesData({predicate: (query)  => 
                query.queryKey[0] === 'feed'
            }).forEach(([queryKey, data]) => {
                snapshot.set(queryKey, data);
                

                if(Array.isArray(data)) {

                    queryClient.setQueriesData(queryKey, data.map(feed => {

                        if(feed.id === id){
                            const isCollection = feed.images.includes(id)

                            return {
                                ...feed,
                                images:isCollection
                                    ? feed.images.filter(coll => coll !== id)
                                    : [...feed.images, id]
                            };
                        }

                        return feed;
                    }));
                }
            });

            return {snapshot}
        },*/
        onSuccess: () => {

            queryClient.invalidateQueries({ 
                queryKey: ["collections"]
            })

        },onError: (error ) => {
             console.error("Error al actualizar colección", error);
        }
    })

    return newMutation;
};
