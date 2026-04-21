import { useState } from "react"
import { CreateCollection } from "./CreateCollection"
import { useGetCollection } from "../hooks/useCollection"
import { Bookmark  } from "lucide-react"
import { useUpdatedCollection } from "../hooks/useCollection"
 
export const SaveCollection = ({handleBookMark, imagenId}) => {
    const [showCreateCollection, setShowCreateCollection] = useState(false)
    const {data:collection, isLoading} = useGetCollection()
    const updatedCollection = useUpdatedCollection()

    const handleShowCreate = () => {
        setShowCreateCollection(true)
    }

    /*const handleBackToSave = () => {
    setShowCreateCollection(false); // ✅ Vuelve al modal de guardar
  };*/
 
  if(isLoading) return <div></div>

    const handleCloseAll = () => {
        setShowCreateCollection(false)
        handleBookMark()
    }   

    const handleUpdatedCollection = (collectionId) => {
        updatedCollection.mutate({collectionId,imageId: imagenId})
        handleBookMark()
    }
 
    if(showCreateCollection) {
        return (
            <CreateCollection
                imagen={imagenId}
                onClose={handleCloseAll}
            />
        )
    }

   

  return (
    <div 
        className=" fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20"
        onClick={handleBookMark}
    >
        <div 
            className="md:ml-64   relative w-full max-w-md bg-gray-900 p-4 overflow-y-auto rounded-2xl border border-gray-800 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
        >
            <h3 className="text-white font-medium mb-2">Guardar en...</h3>

            
            <div className="max-h-60 overflow-y-auto">
                {/* Lista de colecciones existentes */}
        
                { collection && collection.map((collection) => (
                    <div key={collection.id} className="text-white   text-md py-1 px-1">
                        
                        <button 
                            
                            onClick={() => handleUpdatedCollection(collection.id)}
                            className="flex items-center justify-between bg-gray-800/50 w-full border border-gray-700/50 py-2 px-3 hover:bg-gray-700 rounded-xl transition-all " 
                        >
                            <p className="  ">
                                 {collection.name}
                            </p>
                            <Bookmark
                                className={` ${collection.images.includes(imagenId) 
                                    ? "fill-violet-600 text-violet-500"
                                    : "text-white"
                                }

                                    `}
                            />
                        </button>  
                    </div>
                ))

                }
            </div>


            <div>
                <div className="border border-gray-800 mt-3 mb-3 w-full z-50"/> 
                <button 
                    onClick={handleShowCreate}
                    
                    className="w-full rounded-full p-1 text-center  bg-gray-800 hover:bg-gray-700/50"
                >
                    
                    <p  >
                        + Nueva Collection
                    </p>
                </button>
            </div>
            
        </div>
        {/*
            showCreateCollection ? (
                <CreateCollection />
            ):("")
        */}
    </div>
  )
}
