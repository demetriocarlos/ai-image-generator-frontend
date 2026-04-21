 
export const  handleAuthSuccess = (data, loginContext) => {
     
        const userData = {
            userName:data.userName, 
            token: data.token,
            id: data.id,
            email: data.email
        }

            // Almacenar el token y los datos del usuario en localStorage
            localStorage.setItem('token', data.token)
            localStorage.setItem('loggedInUser', JSON.stringify(userData))

            loginContext(
                userData.userName, 
                userData.token, 
                userData.email, 
                userData.id
            )
}
