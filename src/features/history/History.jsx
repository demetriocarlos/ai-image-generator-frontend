 import { Clock, Sparkles, Maximize2, SlidersHorizontal, Trash2 } from "lucide-react";
import { useHistory } from "../../hooks/useHistory";
import { useDeleteImg, useImgPublic } from "../../hooks/useHistory";
import { Loader2, Check, Globe } from "lucide-react";
import { Spinner } from "../../Components/Spinner";
import { ErrorMessage } from "../../Components/ErrorMessage";

 

export const History = () => {
    //const [history, setHistory] = useState(INITIAL_HISTORY);
     
    const {data:history, isLoading, error} = useHistory();
    const deleteImg = useDeleteImg()
    const imgPublicMutation = useImgPublic()

    const formatDate = (dateStr ) => {
    return new Date(dateStr).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  
  const deleteMutation = (id) => {
    if(window.confirm("Quiere eliminar esta Imagen?")){
         
        deleteImg.mutate(id)
    }
  }


  if(error) return <div><ErrorMessage message={error.message} text={"Ha ocurrido un error"} /></div>

  if(isLoading) return <div><Spinner /> </div>
  
   
  const handleImgPublic = (id, isPublic) => {
    imgPublicMutation.mutate({id, isPublic})
  }
  
 
  return (
    <div className="p-6 flex flex-col gap-6">
        {/* Header */}
        <div>
            <h1 className="text-white text-xl font-bold">
                Historial de Generaciones
            </h1>
            <p className="text-sm text-gray-400">
                {history && history.length > 0
                    ? `${history.length} ${history.length === 1 ? "imagen generada" : "imagenes generadas"}`
                    : "Tu historial esta vacio"
                }
            </p>
        </div> 

        {/* Lista de items del historial */}
        {history && history.length > 0 ? (
            <div className="flex flex-col gap-4">
                {history.map((item) => ( 
                    <div 
                        key={item.id}
                        className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all "
                    >
                        <div className="flex flex-col sm:flex-row">
                            {/* Imagen thumbnail */}
                            <img
                                src={item.url}
                                className="w-full sm:w-40 h-full sm:h-auto flex-shrink-0"
                                 
                            /> 

                             {/* Info */}
                            <div className="flex-1 p-5 flex flex-col gap-3 ">

                                {/* Prompt */}
                                <p className="tex-sm text-gray-200  leading-relaxed  line-clamp-2">
                                    {item.prompt}
                                </p>
                                     
                                
                                {/* Detalles en fila */}
                                <div className="flex flex-wrap items-center gap-3">
                                    {/* Fecha */}
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <Clock className="w-3.5 h-3.5" />
                                        {formatDate(item.createdAt)}
                                    </div>

                                    {/**Separador */}
                                    <div className="w-1 h-1 rounded-full bg-gray-700"/>  

                                     {/* Resolucion */}
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <Maximize2 className="w-3.5 h-3.5"/>
                                        {`${item.width}  x ${item.height}`}
                                    </div>

                                    {/**Separador */}
                                    <div className="w-1 h-1 rounded-full bg-gray-700"/>

                                     {/* Guidance */}
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 "> 
                                        <SlidersHorizontal className="w-3.5 h-3.5" />
                                        {item.guidance_scale}
                                    </div>

                                    {/**Separador */}
                                    <div className="w-1 h-1 rounded-full bg-gray-700"/>


                                    {/**color */}
                                    <div className="flex  items-center gap-1.5 text-xs text-gray-500">
                                        <div  
                                            className={`  w-3 h-3 rounded-full border border-gray-600`}
                                            style={{backgroundColor: item.dominantColor}}
                                        />
                                        {item.dominantColor}
                                    </div>

                                    {/**Separador */}
                                    <div className="w-1 h-1 rounded-full bg-gray-700"/>

                                    {/* Seed */}
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                                        <p>Seed:</p>
                                        {item.seed}
                                    </div>
                                </div>

                                {/* Botones de accion */}
                                <div className="flex items-center gap-4">
                                    

                                    {/**publicar imagen */}
                                    <button 
                                        onClick={() => handleImgPublic(item.id, !item.isPublic)}
                                        className={`flex items-center gap-1.5 h-8 px-3 rounded-lg
                                            border text-xs font-medium transition-all cursor-pointer ${
                                                item.isPublic
                                                    ? "bg-emerald-600/20 border-emerald-500/30 text-emerald-400 hover:bg-emerald-600-30"
                                                    : "bg-cyan-600/20 border-cyan-500/30  text-cyan-400  hover:bg-cyan-600/30"

                                            }
                                        `}
                                    >
                                        {item.isPublic ? (
                                            <> 
                                                {imgPublicMutation.isPending && imgPublicMutation.variables?.id === item.id
                                                    ?  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                    :  <Check className="w-3.5 h-3.5" />
                                                }
                                                Publicada
                                            </>
                                        ) : (
                                            <> 
                                                { imgPublicMutation.isPending && imgPublicMutation.variables?.id === item.id
                                                    ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                    : <Globe className="w-3.5 h-3.5" />
                                                }
                                                Publicar
                                            </>
                                        ) }
                                        
                                    </button>

                                    {/**eliminar imagen */}
                                    <button 
                                        onClick={() => deleteMutation(item.id)}     
                                        className="flex items-center gap-1.5 text-xs rounded-lg px-3 py-1.5 
                                        bg-gray-800 font-medium  text-gray-400 border border-gray-700 
                                        hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 
                                        transition-all"
                                    >
                                        {deleteImg.isPending && deleteImg.variables === item.id ? (   
                                            <>
                                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                Eliminando...
                                            </>
                                        ) : (
                                            <>
                                                <Trash2 className="w-3.5 h-3.5" />
                                                Eliminar
                                            </>
                                        )
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ): (
            /* Estado vacio */
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-800/50 border border-gray-800 flex items-center justify-center mb-4">
                    <Clock className="w-8 h-8 text-gray-700" />
                </div>
                <p className="text-gray-400 font-medium">
                    No hay generaciones aun
                </p>
                <p className="text-sm text-gray-600 mt-1 max-w-xs">
                    Las imagenes que generes apareceran en tu historial
                </p>
            </div>
        )

        }
    </div>
  )
}
