import Link from "next/link";
import { useState, useEffect } from 'react';

const Alert = ({message, showAlert}) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  
  useEffect( async() => {
    if (!showAlert){
      document.getElementById("alert").style.visibility = "hidden";
    }
    else{
      document.getElementById("alert").style.visibility = "unset";
    }
  });

  return(
    <>
    {/* {showAlert && */}
      {/* <div id="l" className='flex transition-all items-center justify-center'> */}
        <div id="alert" className="flex transition-all w-4/5 sm:w-96 left-1/2 justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-green-100 bg-green-700 border border-green-700 ">
          <div slot="avatar">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-circle w-5 h-5 mx-2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="text-xl font-normal  max-w-full flex-initial">
            <div className="py-2">{message}
              {/* <div className="text-sm font-base">More information about the message can be found <a href="/#">here</a></div> */}
            </div>
          </div>
          <div className="flex flex-auto flex-row-reverse">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-x cursor-pointer hover:text-green-400 rounded-full w-5 h-5 ml-2">
                <line x1={18} y1={6} x2={6} y2={18} />
                <line x1={6} y1={6} x2={18} y2={18} />
              </svg>
            </div>
          </div>
        </div>
      {/* </div> */}
    {/* } */}
    </>
  );
};


export default Alert;