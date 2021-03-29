import {useState, useEffect} from 'react';
import axios from 'axios';
import Link from "next/link";
import useRequest from '../../hooks/use-request';
import {Router, useRouter} from "next/router";
import draftToHtml from 'draftjs-to-html';
import {annURL} from '../../static/dist/static';
import Authors from '../../components/authors';

const Page = ({userEmail, page}) => {

    const [annPage, setAnnPage] = useState([{}]);
    const [notes, setNotes] = useState([]);
    const [j, setj] = useState(0);
    const router = useRouter()
    const [slug, setSlug] = useState(router.query.page);
    var i = 0;
    var current_time = new Date();

    

    const {doRequest, errors} = useRequest({
      url: `${annURL}/ann_pages/` + router.query.page,
      // url: `${annURL}/ann_pages/` + router.asPath.slice(10,),
      method: 'post',
      onSuccess: async(data) => {
        console.log(data);
        setAnnPage(data[0]);
      }
    });

    const loadNotes = async(start, end) => {
        // for(; i<10; i++){
        var notesData = await axios.post(`${annURL}/notes/${start}/${end}`, {url: slug}, {withCredentials: true});
        // console.log(JSON.stringify(notesData))
        // setNotes(notesData.data);
        setNotes(prevNotes => {
              return [...prevNotes, ...notesData.data]
            });
      // }
    }

    useEffect( async() => {
      setSlug(router.query.page);
      await doRequest();
      await loadNotes(1,10);
    }, [router.query.page]);
    
    const convertCommentFromJSONToHTML = (text) => {                     
      return (draftToHtml(text)) 
    }

    const LoadMore = async () => {
      i++;
      setj(i);
      await loadNotes(i*10+1, i*10+10);
      // var notesData = await axios.post(`${appURL}/notes/${i*10+1}/${i*10+10}`, {url: slug}, {withCredentials: true});
      //   console.log(JSON.stringify(notesData.data))
      //   setNotes(prevNotes => {
      //     return [...prevNotes, ...notesData.data]
      //   });
    }

    const Subscribe = async () => {
      var response = await axios.post(
        `${annURL}/ann_pages/subscribe/${annPage._id}`, 
        {emails: [`${userEmail}`]}, 
        {withCredentials: true}
      );
      // console.log(JSON.stringify(response.data))
      Router.reload();
    }

    const ReadMore = async (id) => {
      if (document.getElementById(id).style.maxHeight === 'none'){
        document.getElementById(id).style.maxHeight = '7rem'
      }
      else {
        document.getElementById(id).style.maxHeight = 'none'
      }
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
                            className="ml-3 text-lg bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded-md" 
                            type="submit"
                          >
                            Add Post
                          </button>
                        </Link>
                      }
                      
                      <span className=" text-sm text-gray-500 mx-2">
                        {annPage.subscribers && annPage.subscribers.length} subscriber
                        {annPage.subscribers && annPage.subscribers.length>1 && 's'}
                      </span>

                      {(userEmail && annPage.subscribers) &&
                      (!(annPage.subscribers.includes(userEmail)) ?
                          <button 
                            className="mx-3 text-lg bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded-md" 
                            type="submit"
                            onClick={Subscribe}
                          >
                            Subscribe
                          </button>
                        :
                        <div className="text-sm text-blue-500 mr-3 mt-2" >Subscribed</div>
                      ) 
                      }
                      {!userEmail &&
                        <Link 
                          href='/signin'
                        >
                          <button 
                            className="mx-3 text-lg bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded-md" 
                            type="submit"
                          >
                            Subscribe
                          </button>
                        </Link>
                      }
                      </h1>
                      <div>
                        {/* <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                          <option>Latest</option>
                          <option>Last Week</option>
                        </select> */}
                      {(annPage.userEmail===userEmail) &&
                      annPage.drafts.length ?
                        <Link href="/ann-page/drafts/[drafts]" as={`/ann-page/drafts/${slug}`}>
                          <a className="w-full bg-gray-300 px-3 py-2 rounded-md border-2 border-gray-500 shadow-sm focus:border-indigo-300 focus:ring ">
                            Drafts({annPage.drafts.length})
                          </a>
                        </Link>
                        :
                        (<></>)
                      }
                      </div>
                    </div>

                    {notes.map(note => (
                    <div className="mt-6">
                      <div className="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
                        <div className="flex justify-between items-center">
                          <span className="font-light text-gray-600">
                            {current_time.toDateString() === new Date(note.createdAt).toDateString() ?
                              new Date(note.createdAt).toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})+', Today'
                            :
                              new Date(note.createdAt).toDateString()
                            }
                          </span>
                          {/* <a href="#" className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500">Laravel</a> */}
                        </div>
                        <div className="mt-2">
                            <a href="#" className="text-2xl text-gray-700 font-bold hover:underline">
                              {note.title}
                            </a>
                          <p className="mt-2 text-gray-600">
                            <div 
                              id={note._id}
                              className="max-h-28 overflow-y-hidden transition-all"
                              dangerouslySetInnerHTML={{ __html: convertCommentFromJSONToHTML(JSON.parse(note.content))}}
                            > 
                            </div>
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <a onClick={() => ReadMore(note._id)} className="text-blue-500 cursor-pointer hover:underline">Read more</a>
                          <div>
                            <a className="flex items-center">
                              <h1 className="text-gray-700 font-bold hover:underline">{note.userEmail}</h1>
                            </a>
                          </div>
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
                        {annPage.notes && ((annPage.notes.length-j*10)>10 &&
                          <a 
                            onClick={LoadMore}
                            className="mx-1 px-3 py-2 bg-white text-blue-600 bg-blue-100 font-medium hover:bg-blue-500 hover:text-white rounded-md"
                          >
                            Load more{annPage.notes && ((annPage.notes.length-j*10)>10 && `(${annPage.notes.length-10-j*10})`)}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="-mx-8 w-4/12 hidden lg:block">
                    {/* <div className="px-8">
                      <h1 className="mb-4 text-xl font-bold text-gray-700">Authors</h1>
                      <div className="flex flex-col bg-white max-w-sm px-6 py-4 mx-auto rounded-lg shadow-md">
                        <ul className="-mx-4">
                          <li className="flex items-center">
                            <p>
                              {annPage.authors && (
                                annPage.authors.map(author =>(
                                  <div>
                                    <a className="text-gray-700 font-bold mx-1">
                                      {author}&nbsp;&nbsp;
                                      {author === annPage.userEmail &&
                                        <i className="fas fa-crown text-yellow-600"></i>
                                      }
                                    </a>
                                  </div>
                                ))
                              )}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div> */}

                    <Authors 
                      authors={annPage.authors} 
                      annPageOwner={annPage.userEmail} 
                      userEmail={userEmail}
                      ann_pageId={annPage._id}
                    />

                    <div className="mt-10 px-8">
                      <h1 className="mb-4 text-xl font-bold text-gray-700">Subscribers</h1>
                      <div className="flex flex-col bg-white px-4 py-6 max-w-sm mx-auto rounded-lg shadow-md">
                        <ul>
                          {annPage.subscribers && (
                            annPage.subscribers.map(subscriber =>(
                              <li>
                                <a className="text-gray-700 font-bold mx-1">
                                  {subscriber}&nbsp;&nbsp;
                                  {subscriber === annPage.userEmail &&
                                    <i className="fas fa-crown text-yellow-600"></i>
                                  }
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

Page.getInitialProps = async () => {
  return {page: ''};
};

export default Page;