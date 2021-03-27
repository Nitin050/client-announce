import '../static/dist/add-post.css';
import '../static/dist/tailwind.css';
import 'font-awesome/css/font-awesome.min.css';
import Header from '../components/header';
import { useState, useEffect } from 'react';
// import useRequest from '../hooks/use-request';
import axios from 'axios';
import Footer from '../components/footer';
import {annURL} from '../static/dist/static';
import Head from 'next/head';

const App = ({Component, pageProps}) => {
    const [userEmail, setUserEmail] = useState(null);
    useEffect( async() => {
        const use = await axios.get(`${annURL}/api/users/currentuser`, {withCredentials: true});
        if(use.data.currentUser){
            setUserEmail(use.data.currentUser.email);
            // console.log(JSON.stringify(use))
        }
        // console.log(use.data);
    });

    
    // Page.getInitialProps = async () => {
    //     return {};
    // };

    return (
        <div>
            <Head>
                <script src="https://kit.fontawesome.com/750d92f92d.js" crossorigin="anonymous"></script>
            </Head>
            <Header userEmail= {userEmail}/>
            <Component userEmail= {userEmail} />
            <Footer />
        </div>
    )
};


export default App;