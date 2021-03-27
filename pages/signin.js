import {useState} from 'react';
import Router from 'next/router';
import useRequest from '../hooks/use-request'
import {annURL} from '../static/dist/static'


export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {doRequest, errors} = useRequest({
      url: `${annURL}/api/users/signin`,
      method: 'post',
      body: {
        email, password
      },
      onSuccess: () => Router.push('/')
    })
    const onSubmit = async event => {
        event.preventDefault();
        await doRequest();
    };

    return (
      <>
      
      <div className="font-sans antialiased bg-gray-100">
        {/* Content */}
        <div className="w-full bg-gray-100">
          <div className="container mx-auto py-8 bg-gray-100">
            <div className="w-11/12 lg:w-1/3 mx-auto bg-white rounded shadow">
              <div className="py-4 px-8 text-black text-xl border-b border-gray-lighter">Log In</div>
              <form onSubmit={onSubmit}>
                <div className="py-4 px-8">
                  <div className="mb-4">
                    <label className="block text-gray-darker text-sm font-bold mb-2" htmlFor="email">Email Address</label>
                    <input 
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-darker" 
                      id="email" 
                      type="email" 
                      placeholder="Your email address" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-darker text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input 
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-darker" 
                      id="password" 
                      type="password" 
                      placeholder="Your secure password" 
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    {/* <p className="text-gray text-xs mt-1">At least 6 characters</p> */}
                  </div>
                  <span className="text-red-600">{errors}</span>
                  <div className="flex items-center justify-between mt-8">
                    <button 
                      className="relative bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full float-right ml-auto" 
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <p className="text-center my-4">
              <a href="/signup" className="text-blue-500 text-sm no-underline hover:text-blue-600">Don't have an account? Sign up</a>
            </p>
          </div>
        </div>
        {/* Footer */}
        <footer className="w-full bg-gray-100 py-8">
          <div className="container mx-auto text-center px-8">
            {/* <p className="text-gray-dark mb-2 text-sm">This is a product of <span className="font-bold">Your Company</span></p> */}
          </div>
        </footer>
      </div>
    
      </>
    )
};