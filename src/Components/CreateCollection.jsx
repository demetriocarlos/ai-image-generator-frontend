import { useState } from "react"
import { useCreateCollection } from "../hooks/useCollection";

export const CreateCollection = ({ imagen, onClose }) => {
    const [ name, setname] = useState("");
    const createMutation = useCreateCollection()

     
    const handleCreate = () => {
        if(!name.trim()) return;
            createMutation.mutate({
                name,
                images: imagen
            })
        onClose();
    }

  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
        onClick={onClose}
    > 
        <div className="relative w-full max-w-xs  bg-gray-900 p-4 overflow-y-auto rounded-2xl border border-gray-800 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
        >
            <h1 className="mb-2">Nueva coleccion</h1>
            <div>
                <input 
                    type="text" 
                    value={name}
                    name="name"
                    onChange={(e) => setname(e.target.value)}
                    className="w-full rounded-lg py-2  p-3 bg-gray-900 text-white border border-gray-700"
                    placeholder="Elige un titulo"
                />

                <div className="flex items-center gap-3 mt-6">
                    <button 
                        className="w-full rounded-full p-1   border border-1 hover:bg-gray-800" 
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleCreate} 
                        disabled={!name.trim()}
                        className={`w-full rounded-full p-1  transition-all 
                                ${
                                    name.trim()
                                        ? "bg-violet-600  text-white hover:bg-violet-500"
                                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                                }
                            `}
                    
                    >
                        Crear
                    </button>
                </div>
            </div>
        </div>

    </div>
  )
}
