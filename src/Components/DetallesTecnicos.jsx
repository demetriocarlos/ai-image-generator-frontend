
 

// eslint-disable-next-line no-unused-vars
export const DetallesTecnicos = ({color, config, span, icon: Icon}) => {
  return (
    <div className="flex flex-col gap-2 bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center gap-2   text-gray-500  ">
            <Icon className="w-4 h-4" />
            <span className="text-xs font-medium uppercase">
                {span}
            </span>
         </div>
          <div className="flex  items-center gap-2">
            {color && <div 
                className="w-5 h-5 rounded-full border border-gray-600"
                style={{ backgroundColor:color }}
            />}  
            <p className="text-white">{config}</p>
          </div>
        
    </div>
  )
}
