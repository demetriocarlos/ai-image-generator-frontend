/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom";
import { Sparkles, Loader2, ImageIcon,Download } from "lucide-react";
import { useCreateImagen } from "../../hooks/useImagen";
import { useSaveImagen } from "../../hooks/useImagen";

 const COLORS = [
  { name: "Violeta", value: "#8b5cf6", tw: "bg-violet-500" },
  { name: "Cyan", value: "#06b6d4", tw: "bg-cyan-500" },
  { name: "Azul", value: "#3b82f6", tw: "bg-blue-500" },
  { name: "Verde", value: "#22c55e", tw: "bg-green-500" },
  { name: "Amarillo", value: "#eab308", tw: "bg-yellow-500" },
  { name: "Naranja", value: "#f97316", tw: "bg-orange-500" },
  { name: "Rojo", value: "#ef4444", tw: "bg-red-500" },
  { name: "Blanco", value: "#ffffff", tw: "bg-white" },
];

const RESOLUTIONS = ["512 x 512", "768 x 768", "1024 x 1024"];

export const CreateImg = () => {
    const [searchParams] = useSearchParams();

    const [prompt, setPrompt] = useState("");
    const [negativePrompt, setNegativePrompt] = useState("")
    const [selectedColor, setSelectedColor] = useState(COLORS[0].value);
    const [resolution, setResolution] = useState(RESOLUTIONS[0]);
    const [guidance, setGuidance] = useState(7);
    const [configLoaded, setConfigLoaded] = useState(false);

    const generateImageMutation = useCreateImagen()
    const saveImagenMutation = useSaveImagen()

    // 🎯 Cargar configuración desde los parámetros de URL
    useEffect(() => {
        if(configLoaded) return;

        const urlPrompt = searchParams.get("prompt");
        if (urlPrompt) {
            
      setPrompt(urlPrompt);
      
      // Prompt negativo
      const urlNegativePrompt = searchParams.get("negativePrompt");
      if (urlNegativePrompt) setNegativePrompt(urlNegativePrompt);
      
      // Color
      const urlColor = searchParams.get("color");
      if (urlColor && COLORS.some(c => c.value === urlColor)) {
        setSelectedColor(urlColor);
      }
      
      // Resolución
      const urlRes = searchParams.get("resolution");
      if (urlRes && RESOLUTIONS.includes(urlRes)) {
        setResolution(urlRes);
      }
      
      // Guidance
      const urlGuidance = searchParams.get("guidance");
      if (urlGuidance) {
        const g = Number(urlGuidance);
        if (g >= 1 && g <= 20) setGuidance(g);
      }
      
      setConfigLoaded(true);
      
      // Opcional: mostrar feedback visual
      //console.log("✅ Configuración cargada desde URL");
    }
    },[searchParams, configLoaded])
 
    const handleGenerate = async () => {
        const [width, height] = resolution.split(" x ").map(Number)

        const payload = {
            prompt,
            negativePrompt,
            width,
            height,
            creativityLevel: guidance,
            dominantColor: selectedColor
        }

        await generateImageMutation.mutate(payload)
    }


   const handleSaveImage = async () => {
        const saveImagen = {
            imageBase64:generateImageMutation.data.imageBase64 ||  generateImageMutation.data.image,
            creativityLevel: generateImageMutation.data.metadata.creativityLevel,
            dominantColor:  generateImageMutation.data.metadata.dominantColor,
            height: generateImageMutation.data.metadata.height,
            negativePrompt: generateImageMutation.data.metadata.negativePrompt,
            prompt:  generateImageMutation.data.metadata.prompt,
            width: generateImageMutation.data.metadata.width
        }
        
        await saveImagenMutation.mutate(saveImagen)
   }

    
   const handleDownload = async () => {

         
        const imageUrl = generateImageMutation.data?.imageBase64 || generateImageMutation.data?.image;
        if (!imageUrl) return;


        // Crear nombre basado en el prompt (primeras palabras)
        const promptPreview = prompt
            .split(' ')
            .slice(0, 3)
            .join('-')
            .replace(/[^a-zA-Z0-9-]/g, '')
            .toLowerCase();

        const timestamp = new Date().toISOString().slice(0, 19).replace(/[:]/g, '-');

        const fileName = `ia-${promptPreview || 'imagen'}-${timestamp}.png`;
    
        try{
            //   CASO 1 — BASE64  
            if (imageUrl.startsWith("data:image")) {
                const link = document.createElement("a");
                link.href = imageUrl;
                link.download = fileName;
                link.click();
                return;
            }

 
            //  CASO 2 — URL externa (Picsum / Replicate / etc)
            const response = await fetch(imageUrl, { mode: "cors" });
            const blob = await response.blob();

            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = fileName;
            link.click();

            // limpiar memoria
            window.URL.revokeObjectURL(blobUrl);

        }catch (error){
            console.error("Error descargando imagen:", error);
            alert("No se pudo descargar la imagen 😢");
        }

 
   }



  return (         
    <div className="h-full flex flex-col   overflow-y-auto    lg:flex-row" > 
        {/* Panel de controles - lado izquierdo */}                                    
      <div className="w-full lg:w-96  border-b lg:border-b-0 lg:border-r border-gray-800 md:overflow-y-auto p-6 flex flex-col gap-6 ">
        {/* Titulo */}
        <div>
            <h1 className="text-xl font-bold  text-white mb-1">Generar Imagen</h1>
            <p className="text-sm text-gray-400">Describe lo que quieres crear y ajusta los parametros</p>
        </div>

         
        {/* Prompt principal */}
        <div className="flex flex-col gap-2">
            <label 
                htmlFor="prompt"
                className="text-sm font-medium text-gray-300"
            >
                Prompt
            </label>
            <textarea 
                name="prompt" 
                value={prompt}
                id="prompt"
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ej: Un castillo flotante en las nubes al atardecer, estilo fantastico..."
                rows={4}
                className="w-full rounded-xl bg-gray-800 border border-gray-700 
                text-white placeholder-gray-500 p-4 text-sm  outline-none 
                focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 
                transition-all resize-none "
            /> 
        </div> 

         {/* Prompt negativo */}
        <div className="flex flex-col gap-2">
            <label htmlFor="negative" className="text-sm font-medium text-gray-300">Prompt negativo</label>
            <textarea 
                name="negative" 
                id="negative" 
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="Ej: borroso, baja calidad, texto, marcas de agua..."
                rows={2}
                className="w-full text-sm rounded-xl bg-gray-800 p-4 border 
                border-gray-700 text-white placeholder-gray-500  outline-none
                focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20
                transition-all resize-none"
            />  
        </div>

        {/* Selector de color */}
        <div className="flex flex-col gap-3">
            <label className="text-sm font-medium  text-gray-300">
                Color dominante
            </label>
            <div>
                {COLORS.map((color) => (
                    <button 
                        key={color.value}
                        onClick={() => setSelectedColor(color.value)}
                        className={` w-9 h-9 rounded-full  transition-all
                            ${color.tw}
                            ${
                                selectedColor === color.value
                                  ? "ring-2 ring-white ring-offset-2 ring-offset-gray-900 scale-110"
                                  :"hover:scale-110" 
                            }
                        `}
                        aria-label={`Seleccionar color ${color.name}`}
                        title={color.name}
                    />
                ))}
            </div>
        </div>

         {/* Selector de resolucion */}
        <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-gray-300" >
                Resolucion
            </label>
            <div className="flex gap-2">
                {RESOLUTIONS.map((res) => (
                    <button 
                       key={res}
                       onClick={() => setResolution(res)}
                       className={`
                        flex-1 py-2.5 px-3 rounded-xl text-sm font-medium transition-all  border 
                        ${
                            resolution === res 
                            ? "bg-violet-600/20 border-violet-500 text-violet-400"
                            : "bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white"
                        }
                       `}
                    >
                        {res}
                    </button>
                ))}
            </div>
        </div>
         
        {/* Slider de guia */}
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <label htmlFor="guidance" className="text-sm font-medium  text-gray-300" >
                    Guia (Guidance)
                </label>
                <span className="text-sm font-bold text-violet-400">
                    {guidance}
                </span>
            </div>
            <input 
                id="guidance"
                type="range" 
                min={1}
                max={20}
                value={guidance}
                onChange={(e) => setGuidance(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-700"
                style={{
                    accentColor: "#8b5cf6",
                }}
            />
            <div className="flex justify-between text-xs text-gray-500 ">
                <span>1 - Mas creativo</span>
                <span>20 - Mas preciso</span>
            </div>
        </div>

        {/* Boton de generar */}
        <button 
            disabled={!prompt.trim()}
            onClick={handleGenerate}
            className="w-full rounded-xl h-12  bg-gradient-to-r from-violet-600 
            to-cyan-600 text-white font-semibold hover:from-violet-500 
            hover:to-cyan-500  disabled:opacity-40  disabled:cursor-not-allowed 
            transition-all flex items-center justify-center gap-2 p-2 "
        >
            {generateImageMutation.isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generando...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generar Imagen
            </>
          )}
        </button>
       </div>

          {/* Area de preview - lado derecho */}
        <div className="flex-1 flex items-center justify-center p-6 bg-gray-950">
            {generateImageMutation.isPending ? (
                /* Estado de carga */
                <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-gray-800 flex items-center justify-center">
                        <Loader2 className="w-10 h-10 text-violet-400 animate-spin" />
                    </div>
                    <div className="text-center">
                        <p className="text-white font-medium">
                           Creando tu imagen... 
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            Esto puede tomar unos segundos
                        </p>
                    </div>
                </div>
            ) : generateImageMutation.data ? (
                /* Imagen generada (simulada con gradiente) */
                <div className="w-full max-w-lg flex flex-col items-center gap-4">
                    <div    
                        className="w-full aspect-square rounded-2xl border border-gray-800 overflow-hidden"
                        style={{
                            background:  `linear-gradient(135deg, ${selectedColor}44, ${selectedColor}22, #1f2937)`,
                        }}
                    >


                        
                        {
                            generateImageMutation.data.demo 
                                ? <img src={generateImageMutation.data.image } alt="" />
                                : <img src={generateImageMutation.data.imageBase64 } alt="" />
                        }
                        
                        <div className="w-full h-full  flex items-center justify-center">
                            <div className="text-center p-6">
                                <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-3" />
                                <p className="text-sm text-gray-400">
                                  Imagen generada (preview simulado)  
                                </p>
                                <p className="text-xs text-gray-600 mt-2 max-w-xs mx-auto truncate">
                                    {`"${prompt}"`}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 w-full">
                        <button 
                            onClick={handleDownload}
                            className="flex-1 h-10 rounded-xl bg-gray-800 border border-gray-700 
                            text-sm text-white  font-medium hover:bg-gray-700 transition-all 
                            flex items-center justify-center gap-3
                            "
                        >
                            
                             
                            <Download className="w-4 h-4" />
                            Descargar
                                
                        </button>

                        <button 
                            onClick={handleSaveImage}
                            className="flex-1 h-10 rounded-xl bg-gray-800 border 
                            border-gray-700 text-sm text-white font-medium 
                            hover:bg-gray-700 transition-all flex items-center justify-center gap-2 " 
                        >
                             
                            {saveImagenMutation.isPending ? (
                                <>
                                     <Loader2 className="w-5 h-5 animate-spin" />
                                    Guardando...
                                </>
                            ):(
                                <>
                                    Guardar 
                                </>
                            )

                            }
                        </button>
                    </div>
                </div>
            ) : (
                /* Estado vacio */
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-gray-800/50 border border-gray-800 flex items-center justify-center">
                        <ImageIcon className="w-10 h-10 text-gray-700" />
                    </div>
                    <div>
                        <p className="text-gray-400 font-medium">
                            Tu imagen aparecera aqui
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                           Escribe un prompt y presiona Generar Imagen 
                        </p>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
} 
