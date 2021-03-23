import '../static/dist/add-post.css';
import '../static/dist/tailwind.css';
import 'font-awesome/css/font-awesome.min.css';
import Header from '../components/header';
import { useState, useEffect } from 'react';
// import useRequest from '../hooks/use-request';
import axios from 'axios';
import Footer from '../components/footer';

const App = ({Component, pageProps}) => {
    const [userEmail, setUserEmail] = useState(null);
    useEffect( async() => {
        const use = await axios.get('http://localhost:5000/api/users/currentuser', {withCredentials: true});
        if(use.data.currentUser){
            setUserEmail(use.data.currentUser.email);
        }
        // console.log(use.data.currentUser.email);
    });

    
    // Page.getInitialProps = async () => {
    //     return {};
    // };

    return (
        <div>
            <Header userEmail= {userEmail}/>
            <Component userEmail= {userEmail} />
            <Footer />
        </div>
    )
};


export default App;