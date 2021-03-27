import Router from 'next/router';
import axios from 'axios';
import Link from "next/link";
import {annURL} from '../static/dist/static';

const PagesList = ({userEmail, pages, drafts=false}) => {
  
    const Subscribe = async (id) => {
        if (userEmail){
            var response = await axios.post(
                `${annURL}/ann_pages/subscribe/${id}`, 
                {emails: [`${userEmail}`]}, 
                {withCredentials: true}
            );
            Router.reload();
        }
        else {
            Router.push('/signin')
        }
    }
    
    return (
      <>
          
          <div className="flex flex-wrap">

          {pages.map(page  => (
            
            <div className="p-2 xl:w-1/5 md:w-1/2 w-11/12 mb-2 mx-auto sm:mx-0">
              <div className="bg-white h-full rounded-lg mb-3 flex flex-col relative overflow-hidden shadow-xl px-0 pt-2">
                <Link href="/ann-page/[page]" as={`/ann-page/${page.url}`}>
                  <a><span className="text-md whitespace-nowrap text-gray-800 pl-8 font-semibold">{page.title}</span></a>
                </Link>
                <span className="absolute right-4 top-2">
                  {page.visibility==='private' && 
                    <i className="fa fa-lock"></i>
                  }
                  </span>
                <Link href="/ann-page/[page]" as={`/ann-page/${page.url}`}>
                  <a><span className="text-md whitespace-nowrap text-gray-600 pl-8">{page.url}</span></a>
                </Link>
                {/* <p className="text-sm text-gray-500">
                    I can't start my day without a coffee cup
                </p> */}
                    
                <div className="py-2 flex space-x-3 justify-center ">
                {page.subscribers && page.subscribers.includes(userEmail) ?
                    <button className="flex justify-center cursor-not-allowed max-h-max whitespace-nowrap focus:outline-none  focus:ring  focus:border-blue-300 rounded max-w-max border bg-transparent border-purple-700 text-purple-700 px-4 py-1 flex items-center">
                        <span className="mr-2" />
                            <span>SUBSCRIBED</span> 
                        <span className="ml-2" />
                    </button>
                :
                    <button onClick={() => Subscribe(page._id)} className="flex font-bold justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  focus:border-blue-300 rounded max-w-max text-gray-100 bg-green-500 hover:bg-green-600 px-4 py-1 flex items-center hover:shadow-lg">
                        <span className="mr-2" />
                            <span>SUBSCRIBE</span> 
                        <span className="ml-2" />
                    </button>
                }
                    
                    {/* <button className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  focus:border-blue-300 rounded max-w-max text-gray-100 bg-green-500 hover:bg-green-600 px-4 py-1 flex items-center hover:shadow-lg">
                        <span className="mr-2" />
                            - 
                        <span className="ml-2" />
                    </button> */}
                </div>

                <div className="pt-2 flex justify-center items-center w-full divide-x divide-gray-400 divide-solid">
                    <span className="text-center px-2">
                        <span className="font-bold text-gray-700">{page.subscribers && `${page.subscribers.length}`}</span>
                        <span className="text-gray-600"> Subscriber{page.subscribers && (page.subscribers.length>1 && `s`)}</span>
                    </span>
                    <span className="text-center px-2">
                        <span className="font-bold text-gray-700">{page.notes && `${page.notes.length}`}</span>
                        <span className="text-gray-600"> Post{page.notes && (page.notes.length>1 && `s`)}</span>
                    </span>
                    {drafts && 
                    <span className="text-center px-2">
                        <span className="font-bold text-gray-700">{page.drafts && `${page.drafts.length}`}</span>
                        <span className="text-gray-600"> Draft{page.drafts && (page.drafts.length>1 && `s`)}</span>
                    </span>
                    }
                </div>

              </div>
            </div>

          ))}

          </div>
      
      </>
    )
};


export default PagesList;