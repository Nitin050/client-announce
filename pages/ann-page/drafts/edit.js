import {useState, useEffect} from 'react';
// import { Editor } from 'react-draft-wysiwyg';
import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  {ssr: false});
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
// import {stateToHTML} from 'draft-js-export-html'; 
import {useRouter} from "next/router";
import useRequest from '../../../hooks/use-request';
import Router from 'next/router';
import axios from 'axios';
import {appURL} from '../../../static/dist/static';


const AddPost = ({userEmail}) => {

  const [data, setData] = useState(EditorState.createEmpty());

  const [title, setTitle] = useState('');
  const [errors2, setErrors2] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading_draft, setLoadingDraft] = useState(false);
  const router = useRouter()

  const {doRequest , errors} = useRequest({
    url: `${appURL}/create_note/${router.query.id}`,
    method: 'get',
    body: {
      content: convertToRaw(data.getCurrentContent()), title 
    },
    onSuccess: async(data) => {
      console.log(data);
      setLoading(false);
      Router.push('/ann-page/'+router.query.url)
    }
  });

  useEffect( async() => {
    await doRequest();
  }, []);
  
  // const onEditorChange = ( evt ) => {
  //   setData(evt.editor.getData());
  // }
  // convertToRaw(this.state.editorState.getCurrentContent())

  const handleChange = ( changed_data ) => {
    setData(changed_data);
    // setData(convertToRaw(changed_data.getCurrentContent()));
  }

  const onSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    await doRequest();
  };

  const saveDraft = async event => {
    event.preventDefault();
    setLoadingDraft(true);
    try {
      var draft = await axios.post(`${appURL}/create_draft/${router.query.id}`, { content: convertToRaw(data.getCurrentContent()), title }, {withCredentials: true});
      console.log(draft);
      setLoadingDraft(false);
      // Router.push('/ann-page/'+router.query.url)
    } catch(err){
      setErrors2(JSON.stringify(err));
      console.log(err)
    }
  };

  // const convertCommentFromJSONToHTML = (text) => {                     
  //   return stateToHTML(convertFromRaw(JSON.parse(text))) 
  // }

    
    return (
        <div className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-3 sm:p-6 bg-white border-b border-gray-200">
              <div className="text-xl text-gray-800 pb-4 font-bold">{router.query.url}</div>
              <form onSubmit={onSubmit}>
                <div className="mb-4">
                  <label className="text-xl text-gray-600">Title <span className="text-red-500">*</span></label><br />
                  <input 
                    type="text" 
                    className="border-2 border-gray-300 p-2 w-full" 
                    required 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>
                {/* <div className="mb-4">
                  <label className="text-xl text-gray-600">Description</label><br />
                  <input type="text" className="border-2 border-gray-300 p-2 w-full" name="description" id="description" placeholder="(Optional)" />
                </div> */}
                <div className="mb-8">
                  <label className="text-xl text-gray-600">Content <span className="text-red-500">*</span></label><br />
                  <div>

                      <Editor
                        editorState={data}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={handleChange}
                        // onEditorStateChange={onEditorChange}
                      />

                          {/* <div className="editor-preview">
                              <h2>Rendered content</h2>
                              <div dangerouslySetInnerHTML={ { __html: convertCommentFromJSONToHTML(dat) } }></div>
                          </div> */}
                  </div>
                </div>
                <div className="flex p-1">
                  {/* <select className="border-2 border-gray-300 p-2" name="action">
                    <option>Save Only</option>
                    <option>Save and View</option>
                  </select> */}
                  
                  <button 
                    className="p-3 mr-2 border-2 border-gray-600 bg-gray-300 hover:bg-gray-500 w-32" 
                    onClick={saveDraft}
                  >
                    {loading_draft ? 
                      <i className="fa fa-spin fa-spinner fa-lg"></i>
                    :
                      'Save as Draft'
                    }
                  </button>

                  <button 
                    role="submit" 
                    className="p-3 bg-blue-500 text-white hover:bg-blue-400 w-20" 
                  >
                    {loading ? 
                      <i className="fa fa-spin fa-spinner fa-lg"></i>
                    :
                      'Post'
                    }
                  </button>
                </div>
                  <span className="text-red-600">{errors}{errors2}</span>
              </form>
            </div>
          </div>
        </div>
      </div>
   
    )
};


export default AddPost;