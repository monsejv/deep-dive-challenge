import React from 'react'

function AnswerWrapper(props) {

    const { question, answer, score } = props.data

    return (

        <div className="answer-wrapper" style={answer ? {display: 'block'}: {display:'none'}}>
            <p className="question-format">{question}</p>
            <p className="answer-format">{answer}</p>
            <hr />
            <p className="answer-format">Score: {score}</p>
        </div>
    )
}

export default AnswerWrapper