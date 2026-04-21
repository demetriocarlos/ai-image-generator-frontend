import userServices from "../services/userServices";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import {  useNavigate } from "react-router-dom";
//import { toast } from "react-toastify";
import { handleAuthSuccess } from "../utils/authStorage";
import { useAuth } from "./useAuth";

export const useCreateUser = () => {
    const {login :loginContext} = useAuth()
    const navigate = useNavigate()

    const newUserMutation = useMutation({
        mutationFn:userServices.createUser,
        onSuccess:(data) => {
            if(data !== undefined) {

                handleAuthSuccess(data, loginContext)
                 navigate('/')
                
            }
        },
        onError:(error) => {
            console.error('Error al crear la cuenta', error)
        }
    })

    return newUserMutation;
}






