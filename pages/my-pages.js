import {useState, useEffect} from 'react';
import Router from 'next/router';
// import axios from 'axios';
import Link from "next/link";
import useRequest from '../hooks/use-request';
import {annURL} from '../static/dist/static';
import PagesList from '../components/pagesList';


const YourPages = ({userEmail}) => {
    const [pages, setPages] = useState(['']);

    const onSubmit = async event => {
        event.preventDefault();
    };

    const {doRequest, errors} = useRequest({
        url: `${annURL}/ann_pages/findAll`,
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
              {!pages.length ?
                 (<div className="mb-44">You don't have any pages</div>)
                :
                (<span>Your Pages</span>)
              }
              {errors}
            </h1>
          </div>
          
          <PagesList pages={pages} userEmail={userEmail} drafts={true} />
          
        </div>

      
      </>
    )
};


export default YourPages;