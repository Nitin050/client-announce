import {useState, useEffect} from 'react';
import Router from 'next/router';
import axios from 'axios';
import Link from "next/link";
import useRequest from '../hooks/use-request';
import {annURL} from '../static/dist/static';
import PagesList from '../components/pagesList';

const LandingPage = ({userEmail}) => {
    const [pages, setPages] = useState(['']);
    const [subscribedPages, setSubscribedPages] = useState([""]);


    const {doRequest, errors} = useRequest({
        url: `${annURL}/ann_pages/findAllPublic`,
        method: 'post',
        onSuccess: async(data) => {
            console.log(data);
            setPages(data);
        }
    });

    useEffect( async() => {
      await doRequest();
      if(userEmail){
        await SubscribedPages();
      }
      console.log(errors)
    }, [userEmail]);
    
    const SubscribedPages = async () => {
        var response = await axios.post(
            `${annURL}/ann_pages/findAllSubscribed`, 
            {withCredentials: true}
        );
        setSubscribedPages(response.data);
//         console.log((response.data));
// console.log(pages)
    }
    
    return (
      <>
        <div className="container px-4 sm:px-10 pt-5 pb-24 mx-auto bg-gray-100">

          {(userEmail && (subscribedPages.length>0) && (subscribedPages[0]!=="")) ?
          <>
          <div className="flex flex-col w-full mb-5">
            <h1 className="text-2xl font-bold mb-2 text-gray-500">
              <span>Subscribed Pages</span>
              {errors}
            </h1>
          </div>

          <PagesList pages={subscribedPages} userEmail={userEmail} />
          </>
          :
          <></>
          }

          <div className="flex flex-col w-full mb-5">
            <h1 className="text-2xl font-bold mb-2 text-gray-500">
              <span>All Public Pages</span>
            </h1>
          </div>

          <PagesList pages={pages} userEmail={userEmail} />
          
        </div>

      
      </>
    )
};



export default LandingPage;