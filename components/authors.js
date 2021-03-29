import { useState, useEffect } from 'react';
import TagsInput from '../components/TagsInput';
import useRequest from '../hooks/use-request';
import {annURL} from '../static/dist/static';
import Router from 'next/router';


const Authors = ({authors, annPageOwner, userEmail, ann_pageId}) => {

  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors2, setErrors2] = useState([]);
  const selectedTags = tags => {
    setEmails(tags);
  }

    
  const {doRequest, errors} = useRequest({
    url: `${annURL}/ann_pages/addAuthors/${ann_pageId}`,
    method: 'post',
    body: {
      emails
    },
    onSuccess: () => {
      Router.reload('/');
    }
  });
  
  const onSubmit = async event => {
    event.preventDefault();
    if(emails.length === 0){
      setErrors2('Press enter after writing an email');
    }
    else{
      setLoading(true);
      await doRequest();
      console.log(errors);
    }
  };

  return(
    <>
      <div className="px-0 lg:px-8">
        <h1 className="mb-4 text-xl font-bold text-gray-700">Authors</h1>
        <div className="flex flex-col bg-white max-w-sm px-6 pt-2 pb-4 mx-auto rounded-lg shadow-md">

        {annPageOwner === userEmail &&
        <div className="relative">
          <TagsInput selectedTags={selectedTags}/>
          <span className="text-red-600">{errors2}</span>
          <button 
            className="bg-blue-400 hover:bg-blue-500 absolute right-0 flex justify-center z-10 items-center w-20 text-white px-0 py-1 --4 rounded-md focus:outline-none" 
            type="submit"
            disabled={loading}
            onClick={onSubmit}
          >
            {loading ? 
              <i className="fa fa-spin fa-spinner fa-lg py-1"></i>
            :
              'Submit'
            }
          </button>
        </div>
        }

          <ul className="-mx-2 pt-2">
            <li className="flex items-center">
              {/* <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80" alt="avatar" className="w-10 h-10 object-cover rounded-full mx-4" /> */}
              <p>
                {authors && (
                  authors.map(author =>(
                    <div>
                      <a className="text-gray-700 font-bold mx-1">
                        {author}&nbsp;&nbsp;
                        {author === annPageOwner &&
                          <i className="fas fa-crown text-yellow-600"></i>
                        }
                      </a>
                    </div>
                  ))
                )}
                {/* <span className="text-gray-700 text-sm font-light">
                  Created 23 Posts
                </span> */}
              </p>
            </li>
          </ul>
        </div>
      </div>
    
    </>
  );
};


export default Authors;