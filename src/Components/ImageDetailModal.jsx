import { useEffect,useState } from "react"
import { DetallesTecnicos } from "./DetallesTecnicos";
import {
  X,
  Download,
  Copy,
  Sparkles,
  Calendar,
  Maximize2,
  Hash,
  Bookmark,
  Palette,
  SlidersHorizontal,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { SaveCollection } from "./SaveCollection";

export const ImageDetailModal = ({image, onClose}) => {
    const navigate = useNavigate();
     
    const [bookMark, setBookMark] = useState(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    // Bloquear scroll del body
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);


  const handleGenerateWithConfig = () =>{
    const params = new URLSearchParams({
        prompt: image.prompt,
        negativePrompt: image.negativePrompt || "",
        resolution: `${image.height} x ${image.width}`,
        color: image.dominantColor,
        guidance: image.guidance_scale 
    })
    onClose()
    navigate(`/?${params.toString()}`)
  }
    
 
    const handleDownload = async () => {

        if (!image?.url) return;

        try {

            // 1. Obtener la imagen como blob
            const response = await fetch(image.url);
            const blob = await response.blob();

            // 2. Crear URL local del blob
            const blobUrl = window.URL.createObjectURL(blob);

            const promptText = image.prompt || 'imagen-sin-titulo';

            // Crear nombre basado en el prompt (primeras palabras)
            const promptPreview = promptText
                .split(' ')
                .slice(0, 3)
                .join('-')
                .replace(/[^a-zA-Z0-9-]/g, '')
                .toLowerCase();

            const timestamp = new Date().toISOString().slice(0, 19).replace(/[:]/g, '-');
            const fileName = `ia-${promptPreview || 'imagen'}-${timestamp}.png`;
    
            // Descargar
            const link = document.createElement('a')
            link.href = blobUrl;
            link.download = fileName;   
            //link.target = '_blank';
            document.body.appendChild(link); // Añadir temporalmente al DOM
            link.click();
            document.body.removeChild(link);  

            // Limpiar memoria
            window.URL.revokeObjectURL(blobUrl);
        }catch(error){
            console.error('Error al descargar:', error);
            alert('No se pudo descargar la imagen');
        }
   }

   const handleBookMark = () => {
    setBookMark(!bookMark)
   }

   

  return (
     /* Overlay oscuro */
    <div 
        className="fixed inset-0  z-50 flex items-center justify-center p-4 bg-black/80"
        onClick={onClose}
    > 
        {/* Contenedor del modal */}
        <div 
            className="relative w-full max-w-3xl max-h-[90vh] bg-gray-900   overflow-y-auto   rounded-2xl  border border-gray-800 overflow-hidden flex flex-col"
             onClick={(e) => e.stopPropagation()}
        >
            {/* Header del modal */}
            <div className="flex items-center justify-between  border-b border-gray-800 px-6 py-4">
                <h2 className="text-lg font-bold text-white"> 
                    Detalles de la imagen 
                </h2>
                <button 
                    onClick={onClose}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Contenido scrolleable */}
            <div className="flex-1 sm:overflow-y-auto p-6 flex flex-col gap-6">
                {/* Imagen y autor */}
                <div className="flex flex-col sm:flex-row gap-6">
                    {/* Imagen (simulada con gradiente) */}
                    <img
                        src={image.url}
                        className="w-full sm:w-72 aspect-square rounded-xl overflow-hidden flex-shrink-0 border border-gray-800"
                    />

                    {/* Info del autor y prompt */}
                    <div className="flex flex-col gap-6">
                        {/* Autor */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center  justify-center w-10 h-10 rounded-full text-sm font-bold bg-gray-700">
                                {image && image.user.userName[0]}
                            </div>
                            <div>
                                <p className="text-sm text-white font-semibold">
                                    {image.user.userName}
                                </p>
                                <p className="flex items-center gap-2 text-xs text-gray-500">
                                    <Calendar className="h-3 w-3"/> {image.createdAt}
                                </p>
                            </div>
                        </div>

                        {/* Prompt */}
                        <div className=" flex flex-col gap-2">
                            <label className="text-gray-500 text-sm font-medium  uppercase tracking-wider">
                                Prompt
                            </label>
                            <p className="bg-gray-800 rounded-xl text-gray-300 text-sm   px-5 py-4 leading-relaxed border border-gray-700 ">
                                {image.prompt}
                            </p>
                        </div>

                        {/**prompt negativo */}
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-500 text-sm   uppercase tracking-wider"> 
                                Prompt negativo
                            </label>
                            <p className="bg-gray-800 p-4 rounded-xl text-sm text-gray-400 leading-relaxed border border-gray-700">
                                {image.negativePrompt}
                            </p>
                        </div>
                    </div> 
                </div>

                {/* Detalles tecnicos en grid */}
                <div className="grid grid-cols-2  md:grid-cols-4 gap-4">
                     
                     {/* Resolucion */}
                    <DetallesTecnicos
                        config={`${image.height} x ${image.width}`}
                        span={" Resolucion"}
                        icon={Maximize2}
                    />

                    {/* Seed */}
                    <DetallesTecnicos
                        config={image.seed}
                        span={"Seed"}
                        icon={Hash}
                    />

                    {/* Color */}
                    <DetallesTecnicos
                        config={image.dominantColor}
                        span={"Color"}
                        icon={Palette}
                        color={image.dominantColor}
                    />

                     {/* Guidance */}
                    <DetallesTecnicos
                        config={image.guidance_scale}
                        span={"Guia"}
                        icon={SlidersHorizontal}
                    />
                </div>
            </div>
            {/* Footer con botones de accion */}
            <div className="flex flex-col sm:flex-row items-stretch  sm:items-center gap-3   px-6 py-4 border-t border-gray-800">
                
                {/* Bookmark */}
                <button 
                    onClick={handleBookMark}
                    className="flex items-center gap-2 text-sm px-6 py-3 rounded-xl font-medium transition-all border     text-gray-400 border-gray-700 bg-gray-800   hover:text-white hover:border-gray-600" 
                >
                   <Bookmark className="h-4 w-4"/> 
                   Guardar
                </button>

                   {/* Spacer en desktop */}
                 <div className="hidden sm:block flex-1"/>

                     {/* Descargar */}
                   <button 
                        onClick={handleDownload}
                        className="flex items-center  px-6 py-3  gap-2 text-sm rounded-xl border tex-white   border-gray-700  font-medium bg-gray-800 hover:bg-gray-700 transition-all" 
                    >
                        <Download className="h-4 w-4" /> 
                        Descargar
                   </button>

                   {/* Generar con esta config */}
                   <button 
                        onClick={handleGenerateWithConfig}
                        className="flex items-center px-6 py-3   gap-2  text-sm rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 font-semibold text-white hover:from-violet-500 hover:to-cyan-500 transition-all"
                    >
                      {/*<Sparkles  className="h-4 w-4"/>*/}  Generar con esta configuracion
                   </button>
            </div>

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
