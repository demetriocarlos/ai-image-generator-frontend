import { createContext, useReducer } from "react";
 
 
const initialState = {
    userName:null,
    token: null,
    email:null,
    id:null
}



const authReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN' :
            return{
                ...state,
                userName: action.payload.userName,
                token: action.payload.token,
                email: action.payload.email,
                id: action.payload.id,
            }

        case 'LOGOUT':
            return {
                ...state,
                userName: null,
                token: null,
                email:null,
                id:null,
            }
        default:
            return state
    }
}



// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()

  

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    const login = (userName, token, email, id) => {
        const userData = {userName, token, email, id,};
        dispatch({type: 'LOGIN', payload:userData})
    }

    // Función para manejar el cierre de sesión
    const logout = () => {
        localStorage.removeItem('loggedInUser'); // Eliminar usuario de localStorage
        localStorage.removeItem('token'); // Eliminar token de localStorage
        dispatch({type: 'LOGOUT'});
        window.location.replace('/login')
    }



    return(
        <AuthContext.Provider value={{state, login, logout, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
    
    
    

}


