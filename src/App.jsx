import React, { useState } from 'react';
import axios from 'axios';


import './App.scss';

// Let's talk about using index.js and some other name in the component folder.
// There's pros and cons for each way of doing this...
// OFFICIALLY, we have chosen to use the Airbnb style guide naming convention. 
// Why is this source of truth beneficial when spread across a global organization?
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';


 function  App() {

  const  [data, setData] = useState(null)
  const  [reqparams, setReqparams] = useState({})
  const  [loading, setLoading] = useState([])

  const handleApiCall = async (requestParams) => {
    setReqparams(requestParams);
    if(requestParams.method !== "") setLoading(false)
    
    try{
      let fetchedData;
    
      if (requestParams.method === 'get') {
        fetchedData = await axios.get(requestParams.url);
      } else if (requestParams.method === 'post') {
        fetchedData = await axios.post(requestParams.url, requestParams.obj);
      } else if (requestParams.method === 'put') {
        fetchedData = await axios.put(requestParams.url, requestParams.obj);
      } else if (requestParams.method === 'delete') {
        fetchedData = await axios.delete(requestParams.url);
      }
      
      let object = {
        results:fetchedData.data.results,
        headers:fetchedData.headers
      }
      
      setData(object);

      setLoading(true)
      
    }catch(err){
      console.log(err)
    }
  };

 

    return (
      <>
        <Header />
        <div className='req-info' data-testid="Request_Method">Request Method: {reqparams.method}</div>
        <div className='req-info' data-testid="url">URL: {reqparams.url}</div>
        <Form handleApiCall={handleApiCall} />
        
        <Results data={data} loading={loading} />
        <Footer />
      </>
    );

}

export default App;
