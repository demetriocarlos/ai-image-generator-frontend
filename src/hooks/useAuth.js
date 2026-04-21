import { useContext } from "react";
import { useMutation,  } from "@tanstack/react-query"
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import loginServices from "../services/loginServices";
import { handleAuthSuccess } from "../utils/authStorage";


export const useAuth = () =>{
    return useContext(AuthContext)
}
    

export const useLogin = () => {
    const {login:loginContext}= useAuth();// Obtener la función de login del contexto
    const navigate= useNavigate();
    const newMutation = useMutation ({
        mutationFn: loginServices.login,
        onSuccess: (data) => {
            handleAuthSuccess(data, loginContext)
            navigate('/')
        },onError:(error) => {
            console.error('Error al inicio de sesion', error)
        }
    })

    return newMutation
}

     

export const useLoginGithub = () => {
    const {login: loginContext} = useAuth();// Obtener la función de login del contexto
    const navigate = useNavigate();
    const newMutation = useMutation({
        mutationFn: loginServices.loginGithub,
        onSuccess: (data) => {

            handleAuthSuccess(data, loginContext)

            navigate('/')

        }, onError: (error) => {
            console.error('Error al iniciar sesion con github', error)
        }
    })

    return newMutation;
}







