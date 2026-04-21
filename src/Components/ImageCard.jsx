import { Bookmark } from "lucide-react";
import { useState,} from "react";
import { SaveCollection } from "./SaveCollection";
import { useGetCollection } from "../hooks/useCollection";
 

export const ImageCard = ({image, onSelect}) => {
    const {data:collections} = useGetCollection();

    const [bookMark, setBookMark] = useState(null)
    

    const handleBookMark = () => {
    setBookMark(!bookMark)
   }
 
     const isImageInAnyCollection = collections?.some(collection => 
        collection.images?.includes(image.id || image._id)
    );
 
    const bookmarkColor = isImageInAnyCollection
        ? "fill-white text-gray-200" 
        : "text-gray-500";

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all group "> 
        {/* Imagen (simulada con gradiente) */}
        <img
             
            className={`w-full aspect-square cursor-pointer`}
            src= {image.url}
            onClick={() => onSelect?.(image)}
        />
  
         {/* Info */}
        <div className="p-4 flex flex-col gap-3">
            {/* Prompt truncado */}
            <button 
                type="button"
                className="text-left cursor-pointer"
                onClick={() => onSelect?.(image)}
            >
                <p className="text-sm text-gray-300 line-clamp-2 leading-relaxed hover:text-white transition-colors">
                    {image.prompt}
                </p>
            </button>
            

            {/* Autor y bookmark */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Avatar del autor */}
                    <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-300">
                        {image.user.userName[0]}
                    </div>
                    <div>
                        <p className="text-xs font-medium text-white">
                            {image.user.userName}
                        </p>
                        <p className="text-xs text-gray-500">
                             
                            {new Date(image.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {/* Boton bookmark */}
                <div>
                    <button 
                        onClick={handleBookMark}
                        className={`
                            p-2 rounded-lg transition-all hover:text-gray-500
                            
                        `}
                    >
                        <Bookmark className={` w-5 h-5 ${bookmarkColor}`} />
                    </button>
                </div>
            </div>
        </div>
        <div  > 
            {
                bookMark ? (
                    <SaveCollection
                        handleBookMark={handleBookMark}
                        imagenId ={image.id || image._id}

                    />
                ):(
                    ""
                )
            }
        </div>
    </div>
  )
}



{/*
                             bookMark
                                ? "bg-violet-600/20 text-violet-400"
                                : "text-gray-500 hover:text-white hover:bg-gray-800"
                            */}