import { Bookmark ,  GalleryVerticalEnd } from "lucide-react";
import { useGetCollectionPreview } from "../../hooks/useCollection";
import { Spinner } from "../../Components/Spinner";
import { Link } from "react-router-dom";


export const Collection = () => {
  const {data:collection, isLoading, error} = useGetCollectionPreview()
 
 
    if(error) return <div><ErrorMessage message={error.message} text={"Ha ocurrido un error"} /></div>
    

    if(isLoading)return <Spinner />
 
    //console.log('collection', collection)
   
  return (
    <div className="p-6 flex flex-col gap-6">  
     {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Mi Coleccion</h1>
        <p className="text-sm text-gray-400">
          {collection.length > 0 
            ? `${collection.length} ${collection.length === 1 ?
            "coleccion guardada" : "coleccions guardadas"}`
            : "Las imagenes que guardes apareceran aqui"
          }
        </p>
      </div>

       {/* Grid o estado vacio */}
      {collection && collection.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {collection.map((collection) => (
            <div key={collection._id}>  
              <Link to={`/collectionImg/${collection._id}`}>
              <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all group ">
                <div className="relative">
                  <img 
                    src={collection?.previewImage?.url } alt="" 
                    className="w-full aspect-square cursor-pointer"
                  />
                  <div className="absolute right-3  bottom-5    text-gray-500">
                      
                      <div className=" flex items-center gap-1 p-1 px-2 rounded-xl font-semibold text-gray-300 bg-black/40 w-full  ">
                        <GalleryVerticalEnd 
                          className="text-white"
                          size={20}
                        />
                        <p>{collection.totalImages}</p>
                        <p>{ collection.totalImages > 1 ? "imagenes" : "imagen"}</p>
                      </div>
                  </div>
                </div>
                  
              </div>
              </Link>
                <h2 className="text-center font-semibold mt-4 text-cyan-400">
                    { collection.name }
                </h2>
              
            </div>

          ) )}
        </div>

      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-800/50 border border-gray-800 flex items-center justify-center mb-4">
            <Bookmark className="w-8 h-8 text-gray-700" />
          </div>
          <p className="text-gray-400 font-medium">
            Tu coleccion esta vacia
          </p>
          <p className="text-sm text-gray-600 mt-1 max-w-xs">
            Explora el Feed y guarda las imagenes que te gusten presionando el icono de bookmark
          </p>  
        </div>
      )} 
    </div>
  )
}
       