import { AuthFormStyles } from "./AuthFormStyles"
import { useLogin } from "../../hooks/useAuth"
import { useState } from "react"


export const AuthForm = () => {
  const loginMutation = useLogin();
  const [credentials, setcredentials] = useState({
    email:"",
    password:""
  })

  const handleChange = (e) => {
    const{name, value} = e.target;
    setcredentials({...credentials, [name]:value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setcredentials({
      email:"",
      password:"",
    })

    loginMutation.mutate(credentials)
  }

   
  return (
    <div>
       <AuthFormStyles 
        subTitle={"Inicia sesión para crear imágenes increíbles con IA"}
        buttonForm={ loginMutation.isPending ? "Iniciando ..." : "Iniciar sesion "}
        login={true}
        linkName={"Registrate gratis"}
        linkDescription={"No tienes una cuenta?"}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        credential={credentials}
        
       />
    </div>      
  )
}
