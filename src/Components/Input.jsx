
    

export const Input = ({icon: Icon, type, id, placeholder, label , handleChange, credential, name , className}) => {

   
  return (
    <div className="flex flex-col gap-2" >
        {label && <label htmlFor={id} className="text-sm font-medium text-gray-300">
             {label}
        </label>}
        <div className="relative">
            {Icon && (
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5  text-gray-500"/>
            )}
            <input 
                type={type}
                id={id}
                value={credential}
                name={name}
                onChange={handleChange}
                placeholder={placeholder}
                required
                className={`${className}     rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500  outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all`}
                />
            </div> 
    </div>
  )
}
