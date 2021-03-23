import {useState, useEffect} from 'react';
import axios from 'axios';

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async() => {
    try{
      setErrors(null);
      const response = await axios[method](url, body, {withCredentials: true});
      if(onSuccess){
        onSuccess(response.data);
      }
      return response.data;
    } catch(err) {
      setErrors(
        <div className="alert">
          {err.response.data.errors.map((err) => (
            <span>* &nbsp; {err.message}<br/></span>
          ))} 
        </div>
      )
    }
  }
  return {doRequest, errors};
}
