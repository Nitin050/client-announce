import {useState, useEffect} from 'react';
import Router from 'next/router';
// import axios from 'axios';
import Link from "next/link";
import useRequest from '../hooks/use-request';

const YourPages = ({userEmail}) => {
    const [pages, setPages] = useState(['']);

    const onSubmit = async event => {
        event.preventDefault();
    };

    const {doRequest, errors} = useRequest({
        url: `${appURL}/ann_pages/findAll`,
        method: 'post',
        onSuccess: async(data) => {
            // console.log(data);
            setPages(data);
        }
    });

    useEffect( async() => {
      // if(!userEmail){
      //   Router.push('/signin')
      // }
      await doRequest();
      console.log(errors)
    }, []);
    
    
    return (
      <>
        <div className="container px-4 sm:px-10 pt-5 pb-24 mx-auto bg-gray-100">
          
          <div className="flex flex-col w-full mb-5">
            <h1 className="text-2xl font-bold mb-2 text-gray-500">
              Your Pages{errors}
            </h1>
          </div>
          
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
                    
                {/* <div className="py-2 flex space-x-3 justify-center ">
                    <button className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  focus:border-blue-300 rounded max-w-max border bg-transparent border-purple-700 text-purple-700 hover:border-purple-800 hover:border-purple-800 px-4 py-1 flex items-center hover:shadow-lg">
                        <span className="mr-2" />
                            FOLLOW
                        <span className="ml-2" />
                    </button>
                    <button className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  focus:border-blue-300 rounded max-w-max text-gray-100 bg-green-500 hover:bg-green-600 px-4 py-1 flex items-center hover:shadow-lg">
                        <span className="mr-2" />
                            SPONSOR 
                        <span className="ml-2" />
                    </button>
                </div> */}

                <div className="pt-2 flex justify-center items-center w-full divide-x divide-gray-400 divide-solid">
                    <span className="text-center px-2">
                        <span className="font-bold text-gray-700">{page.subscribers && `${page.subscribers.length}`}</span>
                        <span className="text-gray-600"> Subscriber{page.subscribers && (page.subscribers.length>1 && `s`)}</span>
                    </span>
                    <span className="text-center px-2">
                        <span className="font-bold text-gray-700">{page.notes && `${page.notes.length}`}</span>
                        <span className="text-gray-600"> Post{page.notes && (page.notes.length>1 && `s`)}</span>
                    </span>
                    <span className="text-center px-2">
                        <span className="font-bold text-gray-700">{page.drafts && `${page.drafts.length}`}</span>
                        <span className="text-gray-600"> Draft{page.drafts && (page.drafts.length>1 && `s`)}</span>
                    </span>
                </div>

              </div>
            </div>

          ))}

          </div>
        </div>

      
      </>
    )
};


export default YourPages;