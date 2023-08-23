import "./Results.scss"

function Results ({data,loading}) {

    return (

      
      <section>
        {loading?(
        <pre>{data ? JSON.stringify(data, undefined, 2) : null}</pre>
      ):"loading...."}
        
      </section>
    );
}

export default Results;
