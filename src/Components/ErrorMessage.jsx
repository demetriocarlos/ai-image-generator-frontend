import { AlertCircle } from "lucide-react"
 

export const ErrorMessage = ({message, text}) => {
  return (
    <div className="max-w-md mx-auto mt-8  bg-red-50 border-1-4  border-red-500  rounded-md shadow-md overflow-hidden"> 
        <div className='p-4 flex items-start'>
            <div className='flex-shrink-0'>
                <AlertCircle className='h-5 w-5 text-red-500 ' aria-hidden="true" />
            </div>
            <div className='ml-3'>
                <h3 className='text-sm font-medium text-red-800'>{text}</h3>
                <div className='mt-2 text-sm text-red-700'> 
                    <p>{message}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
