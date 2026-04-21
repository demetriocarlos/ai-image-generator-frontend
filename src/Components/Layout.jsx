import { useState } from "react"
 
import {
  Sparkles,
  Image,
  Rss,
  Bookmark,
  LogOut,
  Menu,
  X,
  Clock 
} from "lucide-react";
import { NavLink , Outlet} from "react-router-dom";
 
import { AiImageIcon } from "./AiImageIcon";
import { useAuth } from "../hooks/useAuth";

//generate
const navLinks = [
  { to: "/", label: "Generar Imagen", icon: Image },
  { to: "/feed", label: "Feed", icon: Rss },
  { to: "/collection", label: "Mi Coleccion", icon: Bookmark },
  { to: "/history", label: "Historial", icon:  Clock  },

];

export const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const {logout,state} = useAuth()
    
    const handleLogout = () => {
        if(window.confirm('¿Desea cerrar sesión?')) {
            logout()
        }
    }

    
  return (
    <div className="flex h-screen bg-gray-950 text-white"> 
        {/* Overlay para mobile - aparece cuando el sidebar esta abierto */}
        {sidebarOpen && (
            <div
                className="fixed inset-0 bg-black/60 z-30 lg:hidden"
                onClick={() => setSidebarOpen(false)}
            />  
        )}

        {/* Sidebar */}

        <aside
            className={`
                fixed top-0 left-0 z-40 h-full w-64 bg-gray-900 border-r 
                border-gray-800 flex flex-col transition-transform duration-300
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0 lg:static lg:z-auto
            `}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-800">
                <div className="flex items-center  justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 ">
                    <AiImageIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">PixelAI</span>
            </div>

            {/* Navegacion */}
            <nav className="flex-1 flex flex-col gap-1 p-4">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <NavLink 
                            key={link.to}
                            to={link.to}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                                ${
                                    isActive
                                        ? "bg-violet-600/20 text-violet-400"
                                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                                }
                            `}
                        >
                            <Icon className="w-5 h-5" />
                            {link.label}
                        </NavLink>
                    )
                })}
            </nav>

            {/* Usuario y logout */}
            <div className="p-4 border-t border-gray-800">
                <div className="flex items-center gap-3 px-4 py-3">
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-sm font-bold text-white">
                        {state && state.userName[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                            {state && state.userName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                            {state && state.email}
                        </p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="text-gray-500 hover:text-white  transition-colors"
                        aria-label="Cerrar sesion"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </aside>  

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col min-w-0">
            {/* Header mobile con boton de menu */}
            <header className="flex items-center gap-3 px-4 py-3 border-b border-gray-800 lg:hidden">
                <button 
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
                    aria-label="Abrir menu"
                >
                    {sidebarOpen ? (
                        <X className="w-5 h-5" />
                    ):(
                       <Menu className="w-5 h-5" /> 
                    )}
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center ">
                        < AiImageIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-bold text-white">PixelAI</span>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-6">
                <Outlet />
            </main>
        </div>
    </div>
  )
}
