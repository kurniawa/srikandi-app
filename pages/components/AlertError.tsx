import { Dispatch, SetStateAction } from "react";

interface AlertErrorProps {
    ErrorMessage: string,
    setErrorMessage: Dispatch<SetStateAction<string>>
}

const AlertError = ({ErrorMessage, setErrorMessage}: AlertErrorProps) => {
    return ( 
        <>
        {ErrorMessage && 
            <div role="alert" className="w-3/4 flex justify-between bg-primary p-3 rounded fixed bottom-9 text-white animate-pulse">
              <div className="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>{ErrorMessage}</span>
              </div>
              <button type='button' className='text-white' onClick={()=>setErrorMessage('')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
        }
        </>
     );
}
 
export default AlertError;