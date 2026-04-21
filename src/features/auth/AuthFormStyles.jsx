 
 import { Sparkles, Eye, EyeOff, Mail, Lock, Github, CircleUserRound , Image, Cpu} from "lucide-react"
import { Input } from "../../Components/Input"
import { Link } from "react-router-dom"
 
import { AiImageIcon } from "../../Components/AiImageIcon"
 
export const AuthFormStyles = ({subTitle, buttonForm, login, linkName, linkDescription, handleChange,  handleSubmit, credential}) => {

   
  const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const VITE_URL= import.meta.env.VITE_URL

  const handleLoginGithub = () => {
    const redirectUri = `${VITE_URL}/github-callback`;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirectUri}&scope=user:email`;
  }

   
  return (
    <div className="min-h-screen w-full bg-gray-950 flex items-center justify-center p-4 "> 

      {/* Fondo con efectos decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Orbe violeta - esquina superior izquierda */}
        <div
          className="absolute  top-0 left-0 w-96 h-96  blur-3xl opacity-20 bg-violet-600"
        />
           {/* Orbe cyan - esquina inferior derecha */}
        <div
          className=" absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl  opacity-20  bg-cyan-600"
        />
      </div>   

      {/* Tarjeta de login */}
      <div 
        className="relative w-full max-w-md rounded-2xl p-8 bg-gray-900/80 border border-gray-800"
        style={{backdropFilter:"blur(16px)"}}
      >

        
         
        {/* Logo & Title */}
        <div className="text-center  mb-8">
          {/* Icono con gradiente */}
          <div className="inline-flex items-center justify-center   w-16 h-16 rounded-2xl bg-gradient-to-br  from-violet-500 to-cyan-500 mb-4">
                <AiImageIcon 
              className="relative h-10 w-10 "
            /> 
          </div>
          
          <h1 className="text-2xl font-bold  text-white mb-2">
            Bienvenido de  PixelAI
          </h1>
          <p className="text-gray-400 text-sm">
             {subTitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {!login ? (
            <>
              {/*User Name */}
              <Input
                icon={CircleUserRound}
                label={"Usuario"}
                type={"text"}
                placeholder={"tu nombre de usuario"}
                id={"user"}
                name={'userName'}
                handleChange={handleChange}
                credential={credential.userName}
                className={"w-full h-12 p-6 pl-11"}
              />
            </>
            ) : (
             " "
          )}

            {/* Email */}
            <Input
              icon={Mail}
              label={"Correo electrónico"}
              type="email"
              placeholder="tu@email.com"
              id="email"
              name={'email'}
              handleChange={handleChange}
              credential={credential.email}
              className={"w-full h-12 p-6 pl-11"}
            />

            {/**password */}
            <Input 
              icon={Lock}
              label={"password"}
              type={"password"}
              placeholder={"Tu contrasena"}
              id={"password"}
              name={'password'}
              handleChange={handleChange}
              credential={credential.password}
              className={"w-full h-12 p-6 pl-11"}
            />

             {/* Boton de submit con gradiente */}
             <button 
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold hover:from-violet-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all "
             >
               {buttonForm}
               
             </button>
        </form>
        {login ? ( 
          <>
            {/* Separador con texto */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-700"/>
              <span className="text-sm text-gray-500">O Continuar con</span>
              <div className="flex-1 h-px bg-gray-700"/>
            </div>
            {/* Botones de login social */}
            <div className="flex gap-4">
              <button 
                type="button"
                className="flex-1 h-12 rounded-xl  bg-gray-800 border border-gray-700 text-white font-medium hover:bg-gray-700 transition-all flex items-center justify-center gap-2"
                onClick={handleLoginGithub}
              >
                  <Github /> GitHub
              </button>
            </div>
           </>
        ):(
          " "
        )}

        {/* Link de registro */}
        <div className="text-center text-gray-400 text-sm mt-6">
          {linkDescription}{" "}
          <Link
            to={`${login ? "/signup" : "/login" } `}
            className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
          >
            {linkName}
          </Link>
        </div>
      </div>
    </div>
  )
}
