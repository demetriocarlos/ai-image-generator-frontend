import { AuthFormStyles } from "./AuthFormStyles"
import { useCreateUser } from "../../hooks/useUser"
import { useState } from "react"


export const SignUpForm = () => {
  const createUserMutation= useCreateUser()
  const [error, setError] = useState('')
  const [credentials, setCredential] = useState({
    userName: "",
    email: "",
    password: ""
  })

  
  const handleChange = (e) => {
    const {name, value} = e.target;
    //   Aplicar trim() según el campo
    let cleanedValue = value;

    if(name === 'email') {
        // Para email: trim y lowercase
        cleanedValue = value.trim().toLowerCase();
    }else if (name === 'password'){
      cleanedValue = value

      if(value !== value.trim()) {
        setError('La contraseña no debe tener espacios al inicio o final');
      }else {
        setError("")
      }
    }else {
      // eslint-disable-next-line no-unused-vars
      cleanedValue = value.trim();
    }


    setCredential({...credentials, [name] : value})
  }


  const handleSubmit = (event) => {
    event.preventDefault();

     //  VALIDAR antes de enviar
    const trimmedCredentials = {
      userName: credentials.userName.trim(),
      email: credentials.email.trim().toLowerCase(),
      password: credentials.password.trim() // Trim aquí también por seguridad
    }

      // Validar longitud mínima de contraseña
    if (trimmedCredentials.password.length < 7) {
      setError('La contraseña debe tener al menos 7 caracteres, incluyendo almenos una letra mayúscula, una letra minúscula y un número.');
      return;
    }

    // Limpiar errores
    setError('');

    
    setCredential({
      userName:'',
      email:'',
      password:''
    })
    createUserMutation.mutate(trimmedCredentials)
  }

  return (
    <div> 
      <AuthFormStyles
        subTitle={"crea una  cuenta hoy mismo"}
        buttonForm={createUserMutation.isPending ? "Creando ..." : "Crear cuenta"}
        login={false}
        linkName={"Iniciar sesion"}
        linkDescription={"Ya tienes una cuenta?"}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        credential={credentials}
       />
    </div>
  )
}
       