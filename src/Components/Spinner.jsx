
 import {PulseLoader} from "react-spinners"
 import { Loader2 } from "lucide-react"
 

export const Spinner = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center"> 
        <div className="mb-24">
            <Loader2 className="w-16 h-16 animate-spin" />
        </div>
    </div>
  )
}
