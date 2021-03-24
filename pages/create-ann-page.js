import {useState} from 'react';
import axios from 'axios';
import Router from 'next/router';
import useRequest from '../hooks/use-request'
import TagsInput from '../components/TagsInput';
import {appURL} from '../static/dist/static';


const CreateAnn_page = ({userEmail}) => {
    const [emails, setEmails] = useState(null);
    const [visibility, setVisibility] = useState('public');
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    var ann_pageId = '';
    const selectedTags = tags => {
      setEmails(tags);
    }

    
    // const {doRequestSubscribe, errors2} = useRequest({
    //   url: `http://localhost:4000/ann_pages/subscribe/${ann_pageId}`,
    //   method: 'post',
    //   body: {
    //     emails
    //   },
    //   onSuccess: (data) => {console.log(data)}
    // });

    const {doRequest, errors} = useRequest({
      url: `${appURL}/ann_pages`,
      method: 'post',
      body: {
        title, visibility, url, email: userEmail
      },
      onSuccess: async(data) => {
        ann_pageId = data._id;
        console.log(data);
        console.log(data._id);
      }
    });


    const onSubmit = async event => {
        event.preventDefault();
            await doRequest();
        if(visibility === 'private'){
          try{
            const response = await axios({
              method: 'post',
              url: `${appURL}/ann_pages/subscribe/` + ann_pageId,
              headers: {}, 
              data: {
                emails, // This is the body part
              },
              withCredentials: true
            });

            // console.log(JSON.stringify(response));
          } catch(err){
            console.log(err)
          }
        }
        Router.push('/my-pages')
      };

    // useEffect( async() => {
    //     const notes = await axios.get('http://localhost:4000/notes', {});
    //     console.log(notes);
    // }, []);

    return (
      <>
      
      <div className="min-h-screen bg-gray-100 py-0 flex flex-col justify-center sm:py-0">
        <div className="relative py-8 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white mx-3 md:mx-4 shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div className="flex items-center space-x-5">
                <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">i</div>
                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                  <h2 className="leading-relaxed">Create an Announcement Page</h2>
                  <p className="text-sm text-gray-500 font-normal leading-relaxed">and start making announcements</p>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
              <form 
                onSubmit={onSubmit} 
                onKeyPress={event => {
                  if(event.key === "Enter"){
                    event.preventDefault();
                  }
              }}>

                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:leading-7">
                  <div className="flex flex-col">
                    <label className="leading-loose">Title*</label>
                    <input 
                      type="text" 
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" 
                      value={title}
                      required
                      onChange={e => setTitle(e.target.value)}
                      placeholder="Page title"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Unique URL*</label>
                    <input 
                      type="text" 
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" 
                      required
                      value={url}
                      onChange={e => setUrl(e.target.value)}
                      placeholder="eg. my-page" 
                    />
                    <p className="text-sm text-gray-500 font-normal leading-relaxed">https://announce.com/my-page</p>
                  </div>

                  <div>
                    <div className="">Visibility</div>
                    <label className="inline-flex items-center mt-3">
                      <input 
                        type="radio" 
                        name="visibility" 
                        value="public" 
                        className="form-radio h-4 w-4 text-indigo-600" 
                        onClick={() => setVisibility('public')} 
                        defaultChecked 
                      />
                        <span className="ml-2 text-gray-700">Public</span>
                    </label><br/>
                    <label className="inline-flex items-center mt-3">
                    <input 
                        type="radio" 
                        name="visibility" 
                        value="private" 
                        className="form-radio h-4 w-4 text-indigo-600" 
                        onClick={() => setVisibility('private')} 
                      />
                        <span className="ml-2 text-gray-700">Private</span>
                    </label>
                  </div>


                  <div className="flex items-center space-x-4">

                    {(visibility !== 'public') &&
                      <TagsInput selectedTags={selectedTags}/>
                    }

                  </div>
                  {/* <div className="flex flex-col">
                    <label className="leading-loose">Event Description</label>
                    <input type="text" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Optional" />
                  </div> */}
                </div> 
                <span className="text-red-600">{errors}</span>
                <div id='l' className="pt-4 flex items-center space-x-4">
                  <button 
                    className="bg-blue-400 hover:bg-blue-500 flex justify-center items-center w-1/2 text-white px-4 py-3 rounded-md focus:outline-none" 
                    style={{marginLeft: '50%'}}
                    type="submit"
                  >
                    Create
                  </button>
                </div>

              </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      </>
    )
};

export default CreateAnn_page;