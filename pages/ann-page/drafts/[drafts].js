import {useState, useEffect} from 'react';
import axios from 'axios';
import Link from "next/link";
import useRequest from '../../../hooks/use-request';
import {useRouter} from "next/router";
import draftToHtml from 'draftjs-to-html';
import {annURL} from '../../../static/dist/static';

const DraftPage = ({userEmail}) => {

    const [annPage, setAnnPage] = useState([{}]);
    const [drafts, setDrafts] = useState([]);
    const [j, setj] = useState(0);
    const router = useRouter()
    const [slug, setSlug] = useState(router.query.drafts);
    var i = 0;
    var current_time = new Date();

    
    DraftPage.getInitialProps = async () => {
      return {};
    };

    const {doRequest, errors} = useRequest({
      url: `${annURL}/ann_pages/` + router.query.drafts,
      method: 'post',
      onSuccess: async(data) => {
        console.log(data);
        setAnnPage(data[0]);
      }
    });

    const loadDrafts = async(start, end) => {
        // for(; i<10; i++){
        var draftsData = await axios.post(`${annURL}/drafts/${start}/${end}`, {url: slug}, {withCredentials: true});
        // console.log(JSON.stringify(notesData))
        // setNotes(notesData.data);
        setDrafts(prevDrafts => {
              return [...prevDrafts, ...draftsData.data]
            });
      // }
    }

    useEffect( async() => {
      setSlug(router.query.drafts);
      await doRequest();
      await loadDrafts(1,10);
    }, []);
    
    const convertCommentFromJSONToHTML = (text) => {                     
      return (draftToHtml(text)) 
    }

    const LoadMore = async () => {
      i++;
      setj(i);
      await loadDrafts(i*10+1, i*10+10);
      // var notesData = await axios.post(`http://localhost:4000/notes/${i*10+1}/${i*10+10}`, {url: slug}, {withCredentials: true});
      //   console.log(JSON.stringify(notesData.data))
      //   setNotes(prevNotes => {
      //     return [...prevNotes, ...notesData.data]
      //   });
    }


    return (
      
            <div className="bg-gray-100 overflow-x-hidden">
              <div className="px-2 sm:px-11 py-8">
              {errors ? 
                <span className="text-red-600">{errors}</span>
              :
                <div className="flex justify-between container mx-auto">
                  <div className="w-full lg:w-8/12">
                    <div className="flex items-center justify-between">
                      <h1 className="text-xl ml-2 font-bold text-gray-700 md:text-2xl">
                        {annPage.title}
                        <span className="ml-3">
                          {annPage.visibility==='private' && 
                            <i className="fa fa-lock"></i>
                          }
                        </span>
                      {annPage.userEmail===userEmail &&
                        <Link 
                          href={{
                            pathname: "/add-post",
                            query: {id: annPage._id, url: slug},
                          }}
                        >
                          <button 
                            className="ml-3 text-lg bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded-full" 
                            type="submit"
                          >
                            Add Post
                          </button>
                        </Link>
                      }
                      </h1>
                      <div>
                        {/* <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                          <option>Latest</option>
                          <option>Last Week</option>
                        </select> */}
                        <Link href="/ann-page/[page]" as={`/ann-page/${slug}`}>
                          <a className="text-blue-500 font-bold mr-4 hover:underline">Back to page</a>
                        </Link>
                      </div>
                    </div>

                    {drafts.map(draft => (
                    <div className="mt-6">
                      <div className="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
                        <div className="flex justify-between items-center">
                          <span className="font-light text-gray-600">
                          {current_time.toDateString() === new Date(draft.createdAt).toDateString() ?
                              new Date(draft.createdAt).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})+', Today'
                            :
                              new Date(draft.createdAt).toDateString()
                            }
                          </span>
                          <Link 
                            href={{
                              pathname: "/ann-page/drafts/edit",
                              query: {id: draft._id},
                            }}
                          >
                            <a className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500">
                              Edit
                            </a>
                          </Link>
                        </div>
                        <div className="mt-2">
                            <a href="#" className="text-2xl text-gray-700 font-bold hover:underline">
                              {draft.title}
                            </a>
                          <p className="mt-2 text-gray-600">
                            <div 
                              dangerouslySetInnerHTML={{ __html: convertCommentFromJSONToHTML(JSON.parse(draft.content))}}> 
                            </div>
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <a href="#" className="text-blue-500 hover:underline">Read more</a>
                          <div><a href="#" className="flex items-center">
                              <h1 className="text-gray-700 font-bold hover:underline">{draft.userEmail}</h1>
                            </a></div>
                        </div>
                      </div>
                    </div>
                    ))}

                    <div className="mt-8">
                      <div className="flex">
                        {/* <a href="#" className="mx-1 px-3 py-2 bg-white text-gray-500 font-medium rounded-md cursor-not-allowed">
                          previous
                        </a>
                        <a href="#" className="mx-1 px-3 py-2 bg-white text-gray-700 font-medium hover:bg-blue-500 hover:text-white rounded-md">
                          1
                        </a>
                        <a href="#" className="mx-1 px-3 py-2 bg-white text-gray-700 font-medium hover:bg-blue-500 hover:text-white rounded-md">
                          2
                        </a>
                        <a href="#" className="mx-1 px-3 py-2 bg-white text-gray-700 font-medium hover:bg-blue-500 hover:text-white rounded-md">
                          3
                        </a> */}
                        {annPage.drafts && ((annPage.drafts.length-j*10)>10 &&
                          <a 
                            onClick={LoadMore}
                            className="mx-1 px-3 py-2 bg-white text-blue-600 bg-blue-100 font-medium hover:bg-blue-500 hover:text-white rounded-md"
                          >
                            Load more{annPage.drafts && ((annPage.drafts.length-j*10)>10 && `(${annPage.drafts.length-10-j*10})`)}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="-mx-8 w-4/12 hidden lg:block">
                    <div className="px-8">
                      <h1 className="mb-4 text-xl font-bold text-gray-700">Authors</h1>
                      <div className="flex flex-col bg-white max-w-sm px-6 py-4 mx-auto rounded-lg shadow-md">
                        <ul className="-mx-4">
                          <li className="flex items-center">
                            {/* <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80" alt="avatar" className="w-10 h-10 object-cover rounded-full mx-4" /> */}
                            <p>
                              <span className="text-gray-700 font-bold mx-1">
                                {annPage.userEmail}
                              </span>
                              {/* <span className="text-gray-700 text-sm font-light">
                                Created 23 Posts
                              </span> */}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-10 px-8">
                      <h1 className="mb-4 text-xl font-bold text-gray-700">Subscribers</h1>
                      <div className="flex flex-col bg-white px-4 py-6 max-w-sm mx-auto rounded-lg shadow-md">
                        <ul>
                          {annPage.subscribers && (
                            annPage.subscribers.map(subscriber =>(
                              <li>
                                <a className="text-gray-700 font-bold mx-1">
                                  {subscriber}
                                </a>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-10 px-8">
                      <h1 className="mb-4 text-xl font-bold text-gray-700">not working Recent Post</h1>
                      <div className="flex flex-col bg-white px-8 py-6 max-w-sm mx-auto rounded-lg shadow-md">
                        <div className="flex justify-center items-center"><a href="#" className="px-2 py-1 bg-gray-600 text-sm text-green-100 rounded hover:bg-gray-500">Laravel</a>
                        </div>
                        <div className="mt-4"><a href="#" className="text-lg text-gray-700 font-medium hover:underline">Build
                            Your New Idea with Laravel Freamwork.</a></div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center"><img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80" alt="avatar" className="w-8 h-8 object-cover rounded-full" /><a href="#" className="text-gray-700 text-sm mx-3 hover:underline">Alex John</a></div><span className="font-light text-sm text-gray-600">Jun 1, 2020</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
              </div>
            </div>
         
    )
};



export default DraftPage;