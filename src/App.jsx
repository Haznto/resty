import React, { useEffect, useReducer, } from 'react';
// import React, { useEffect, , useState } from 'react'; // before reducer
import axios from 'axios';


import './App.scss';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import { initialState, stateReducer } from './reducer/reducer';
import History from './Components/History/History';


function App() {
  const [state, dispatch] = useReducer(stateReducer, initialState)
  // const [data, setData] = useState(null)
  // const [reqparams, setReqparams] = useState({})
  // const [loading, setLoading] = useState([])
  // console.log(initialState)

  const handleApiCall = async (requestParams) => {
    // setReqparams(requestParams);
    dispatch({ type: 'reqParamsStatus', payload: requestParams });
    // if (requestParams.method !== "") setLoading(false)
    if (requestParams.method !== "") dispatch({ type: 'loadingStatus', payload: false });
  };

  const handleHistoryRenderStatus = () => {
    dispatch({ type: 'historyRenderStatus', payload: !state.historyRender })
  }

  useEffect(() => {

    updatePage()
    async function updatePage() {

      try {
        let fetchedData;

        if (state.reqparams && state.reqparams.method === 'get') {
          fetchedData = await axios.get(state.reqparams.url);
        } else if (state.reqparams && state.reqparams.method === 'post') {
          fetchedData = await axios.post(state.reqparams.url, state.reqparams.obj);
        } else if (state.reqparams && state.reqparams.method === 'put') {
          fetchedData = await axios.put(state.reqparams.url, state.reqparams.obj);
        } else if (state.reqparams && state.reqparams.method === 'delete') {
          fetchedData = await axios.delete(state.reqparams.url);
        }

        if (fetchedData) {

          // console.log(fetchedData)
          dispatch({ type: 'historyStatus', payload: { data: { results: fetchedData.data.results, headers: fetchedData.headers }, params: state.reqparams } })
          // setData(fetchedData);
          dispatch({ type: 'dataStatus', payload: fetchedData })
          // setLoading(true)
          dispatch({ type: 'loadingStatus', payload: true })
        }

      } catch (err) {
        console.log(err)
      }
    }


    // }, [reqparams])
  }, [state.reqparams])

  // console.log(state.loading)
  // console.log(loading)
  return (
    <React.Fragment>
      <Header />
      <button data-testid = 'history-btn'className="history-btn" onClick={handleHistoryRenderStatus}>Go to History</button>
      {state.historyRender ?
        <>
          <div className='req-info' data-testid="Request_Method">Request Method: {state.reqparams && state.reqparams.method}</div>
          <div className='req-info' data-testid="url">URL: {state.reqparams && state.reqparams.url}</div>
          <Form handleApiCall={handleApiCall} />
          {/* <Results data={data} loading={loading} setReqparams={setReqparams} reqparams={reqparams} setLoading={setLoading} /> */}
          <Results data={state.data} loading={state.loading} dispatch={dispatch} reqparams={state.reqparams} />

        </>
        :
        <History history={state.history} />
      }
      <Footer />
    </React.Fragment>
  );

}

export default App;
