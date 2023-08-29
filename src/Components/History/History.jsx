import React from 'react'
import "./History.scss"
import JSONPretty from 'react-json-pretty'

export default function History({ history }) {
    // console.log(history)
    return (
        <section className="historySection" data-testid='history-test'>
            {history.map(record => (
                <div>
                    <p>Method: {record.params.method}   url: {record.params.url}</p>
                    <p>results: <JSONPretty id="json-pretty" data={record.data} /></p>
                    <hr />

                </div>
            ))}
        </section>
    )
}
