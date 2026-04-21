
import { ImageCard } from "./ImageCard"
import { Spinner } from "./Spinner"
import { Search } from "lucide-react";

export const ImgGrid = ({imagenes,setSelectedImage, isLoading}) => {

    if(isLoading) return <div><Spinner/></div>

  return (
    <div> 
     {imagenes && imagenes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            imagenes.map((image) => (
              <ImageCard 
                key={image.id || image._id}
                image={image && image}  
                onSelect={setSelectedImage} 
              />
            ))
          }
        </div>
      ) : (
          /* Estado vacio */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Search className="w-12 h-12 text-gray-700 mb-4" />
          <p className="text-gray-400 font-medium">
            No se encontraron resultados
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {`Intenta buscar con otras palabras clave`}
          </p>
        </div>
      )}

    </div>
  )
}
