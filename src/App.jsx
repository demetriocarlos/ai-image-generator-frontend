import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react"
import { useAuth } from "./hooks/useAuth";
import { ToastContainer } from "react-toastify";
import { ScrollToTop } from "./utils/ScrollToTop";
import { AuthForm } from "./features/auth/AuthForm";
import { Feed } from "./features/feed/Feed";
import { SignUpForm } from "./features/auth/SignUpForm";
import { GithubCallback } from "./pages/GithubCallback";
import { Layout } from "./Components/Layout";
import { CreateImg } from "./features/generateImage/CreateImg";
import { Collection } from "./features/Collection/Collection";
import { History } from "./features/history/History";
import { CollectionImg } from "./features/Collection/CollectionImg";

function App() {
    const {state, dispatch} = useAuth()
    const [authChecked, setAuthChecked] = useState(false)
   
    useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedInUser');
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      dispatch({type:'LOGIN', payload:user})
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAuthChecked(true)
  }, [dispatch])

  if (!authChecked) {
    return <div>Cargando...</div>;
  }


  if (!state) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div>
        {
          <Router>
             <ScrollToTop/>
             <ToastContainer/>
             
            <Routes>
              <Route element={state.userName ? <Layout/> : <Navigate to="/login" /> }> 
                <Route path="/" element={state.userName ?  <CreateImg /> : <Navigate to="/login" />  }/> 
                <Route path="/feed" element={state.userName ?  <Feed /> : <Navigate to="/login" />  }/> 
                <Route path="/collection" element={state.userName ?  <Collection /> : <Navigate to="/login" />  }/> 
                <Route path="/history" element={state.userName ?  <History /> : <Navigate to="/login" />  }/> 
                <Route path="/collectionImg/:id" element={state.userName ?  <CollectionImg /> : <Navigate to="/login" />  }/>
              </Route>

              <Route path="/login" element={state.userName ? <Navigate to="/" /> : <AuthForm /> }/> 
              <Route path="/signup" element={state.userName ? <Navigate to="/" /> : <SignUpForm /> }/> 
              <Route path="/github-callback" element={state.userName ? <Navigate to="/" /> : < GithubCallback /> }/> 

            </Routes>
          </Router>
        }
      </div> 
    </>
  )
}

export default App
