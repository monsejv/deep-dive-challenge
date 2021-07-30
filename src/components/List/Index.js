import React from 'react'

import api from '../../lib/api'

import { Button } from 'reactstrap'

function List (props){

    const { list, number, handler, color } = props

    const getAnswer = async () => {
        const selectedData = await api.getAnswer(list.pregunta, list.contexto)
        let answers = {
            question: `¿${list.pregunta}?`,
            answer: selectedData.answer,
            score: selectedData.score
        }

        handler(answers)
    }

    const styles = {
        borderBottom: `2px solid ${color}`, 
    }

    return(
        <div className="d-flex justify-content-between mb-2 question-item" style={styles}>
            <p className="text-left"><b>{number}.</b> ¿{list.pregunta}?</p>
            <Button onClick={getAnswer} >Ver más</Button>
        </div>
    )
}

export default List