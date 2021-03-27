import Link from "next/link";
import { useState, useEffect } from 'react';

const Subscribers = ({authors, userEmail}) => {

  return(
    <>
      <div className="px-8">
        <h1 className="mb-4 text-xl font-bold text-gray-700">Authors</h1>
        <div className="flex flex-col bg-white max-w-sm px-6 py-4 mx-auto rounded-lg shadow-md">
          <ul className="-mx-4">
            <li className="flex items-center">
              {/* <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80" alt="avatar" className="w-10 h-10 object-cover rounded-full mx-4" /> */}
              <p>
                {authors && (
                  authors.map(author =>(
                    <div>
                      <a className="text-gray-700 font-bold mx-1">
                        {author}&nbsp;&nbsp;
                        {author === userEmail &&
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


export default Subscribers;