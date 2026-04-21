import { useState} from "react"
import { Search } from "lucide-react";
 
import { Input } from "../../Components/Input";
import { ImageDetailModal } from "../../Components/ImageDetailModal";
import { useFeedImg } from "../../hooks/useFeed";
import { Spinner } from "../../Components/Spinner";
import { ErrorMessage } from "../../Components/ErrorMessage";
import { useFeedSearch } from "../../hooks/useFeed";
import { ImgGrid } from "../../Components/ImgGrid";


export const Feed = () => {
  const {data:feedImg, isLoading, error} = useFeedImg()
   

  const [searchQuery, setSearchQuery] = useState("");
  const {data:searchImg, isLoading:searchLogin} = useFeedSearch(searchQuery)
  const [selectedImage, setSelectedImage] = useState(/*FEED_IMAGES ||*/ null);
  
  
  if(isLoading) return <div><Spinner/></div>
 
  if (error) return <div><ErrorMessage  message={error.message} text={"Ha ocurrido un error"} /></div>
   

   
  const handleChange = (e) => {
    e.preventDefault()
    setSearchQuery(e.target.value)
  }
 
  
  const imagenes = searchQuery && searchImg ? searchImg: feedImg
  
  return (
    <div className=" md:p-6 flex flex-col gap-6"> 
      {/* Header con titulo y barra de busqueda */}
      <div className="flex flex-col gap-4  sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold  text-white">Feed</h1>
          <p className="text-sm text-gray-400">
            Descubre imagenes creadas por la comunidad
          </p>
        </div>

        {/* Barra de busqueda */}
        <div className="w-full sm:w-72">
          <Input
            type={"text"}
            placeholder={"Buscar por palabras clave..."}
            icon={Search}
            className={"w-full h-10 pl-10 pr-4"}
            credential={searchQuery}
            handleChange={handleChange}
          />
        </div>
      </div>

        {/* Grid de tarjetas */}
      
        <ImgGrid
          imagenes={imagenes && imagenes}
          setSelectedImage={setSelectedImage}
          isLoading={searchLogin}
        /> 


      {/* Modal de detalles */}
      {
        selectedImage && (
          <ImageDetailModal
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )
      }
    </div>

  )
}
