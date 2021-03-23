import {useState, useEffect} from 'react';
import axios from 'axios';

const LandingPage = ({userEmail}) => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const onSubmit = async event => {
        event.preventDefault();
    };
    // useEffect( async() => {
    //     const {use} = await axios.get('http://localhost:5000/api/users/currentuser');
    //     console.log(use);
    //   }, []);
    
    
    return (
      <>
        <form onSubmit={onSubmit}>
            <h1>Make an update {userEmail}</h1>
            <div className="form-group">
                <label>Title</label>
                <input 
                    className="form-content"
                    value = {title}
                    onChange = {e => setTitle(e.target.value)} 
                />
            </div>
            <div className="form-group flex justify-center items-center w-screen h-screen">
                <label>Content</label>
                <input 
                    className="form-content"
                    value = {content}
                    onChange = {e => setContent(e.target.value)} 
                />
            </div>
            <button>Submit</button>
        </form>

      </>
    )
};

// LandingPage.getInitialProps = async (req) => {
//     const use = await axios.get('http://localhost:5000/api/users/currentuser', {withCredentials: true});
//     console.log(JSON.stringify(use.data));
//     return {user: JSON.stringify(use.data)};
// }

export default LandingPage;