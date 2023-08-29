import "./Results.scss"
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css'

function Results({ data, loading, reqparams, dispatch }) {
  // function Results({ data, loading, setReqparams, reqparams, setLoading, }) {

  // console.log(reqparams, loading, data, 'Hasan Tomm')
  function handleNext() {

    let obj = {
      method: data.config.method,
      url: data.data.next,
      obj: reqparams.obj
    }

    if (reqparams.method !== "") dispatch({ type: 'loadingStatus', payload: false })
    // if (reqparams.method !== "") setLoading(false)
    data && dispatch({ type: 'reqParamsStatus', payload: obj })

  }
  function handlePrevious() {

    let obj = {
      method: data.config.method,
      url: data.data.previous,
      obj: reqparams.obj
    }
    if (reqparams.method !== "") dispatch({ type: 'loadingStatus', payload: false })

    data && dispatch({ type: 'reqParamsStatus', payload: obj })
  }

  // console.log(loading)
  return (
    <div className="results-body">
      <div>
        {data && data.data.next && <button onClick={handleNext}>Next</button>}
        {data && data.data.previous && <button onClick={handlePrevious}>Previous</button>}
      </div>
      {loading ? (
        // <section data-testid="testing-count">
        //   <pre ><span>Count:</span> {data ? JSON.stringify(data.data.count, undefined, 2) : null}</pre>
        //   <pre><span>Results:</span> {data ? JSON.stringify(data.data.results, undefined, 2) : null}</pre>
        //   <pre><span>Headers:</span> {data ? JSON.stringify(data.headers, undefined, 2) : null}</pre>
        // </section>
        <section className="result-sec"data-testid="section-of-data">
          <pre data-testid="testing-count" ><span>Count:</span> {data ? <JSONPretty id="json-pretty" data={data.data.count} /> : null}</pre>
          <pre><span>Results:</span> {data ? <JSONPretty id="json-pretty" data={data.data.results} /> : null}</pre>
          <pre><span>Headers:</span> {data ? <JSONPretty id="json-pretty" data={data.headers} /> : null}</pre>
        </section>
      ) : (
        <section className="result-sec">"loading...."</section>
      )}
    </div>
  );
}

export default Results;
