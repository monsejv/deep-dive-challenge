import React, { useState, useEffect } from 'react'

import { Container, Row, Col, Spinner } from 'reactstrap'

import List from '../components/List/Index'
import AnswerWrapper from '../components/AnswerWrapper/Index'
import BubbleChartComponent from "../components/BubbleChart/Index";

import { questions } from '../lib/preguntas'
import api from '../lib/api'


function Home (){

    const [state, setState] = useState({
        question: '',
        answer: ''
    })

    const onChange = (param) => {
        setState(param)
    }

    const [dataGraph, setData] = useState({
        questions: [],
        hasError: false,
        filled: false
    })


    const colors = ["#FA8258", "#BFFF00", "#088A68", "#8258FA", "#FA58AC", "#FFBF00", "#B40431", "#A9F5E1", "#E3CEF6", "#81BEF7"]

    useEffect( () => {
        const getData = async () => {
          try {          
            const promises = questions.map(async (list, index) => {
                questions[index].color = colors[index]
               let info = await api.getAnswer(list.pregunta, list.contexto)
               let structure = {label: `¿${list.pregunta}?`, value: info.score, answer: info.answer, color: list.color}
               return structure
            });

            const results = await Promise.all(promises);
            setData({ ...dataGraph, questions: results, filled: true})
            
          } catch (error) {
            if(!dataGraph.hasError){
              setData({ ...dataGraph, hasError: true})
            }
          }
        }

        getData()
        
      }, [])
      

    return(
        <Container className="p-relative">
            {
                dataGraph.filled === false
                ?  <div className="justify-content-center d-flex align-items-center w-100 h-vh">
                        <Spinner type="grow" color="danger" />
                        <Spinner type="grow" color="warning" />
                        <Spinner type="grow" color="info" />
                    </div>
                : (<>
                    <p className="title">FAQ De Ciencia de Datos</p>
                        <Row>
                            <Col sm="12">
                                { dataGraph.questions.length !== 0 ? (
                                    <BubbleChartComponent data={dataGraph.questions} handler={onChange} />
                                ): (
                                    <div className="mt-4 mb-4">Ocurrió un error</div>
                                ) }
                            </Col>
                        </Row>
                        <AnswerWrapper data={state}/> 
                        <Row className="mb-3">
                            <Col sm="6">
                                {questions.map( (list, index) => index < 5 ? <List list={list} number={index+1} handler={onChange} color={colors[index]} /> : false )}
                            </Col>
                            <Col sm="6">
                                {questions.map( (list, index) => index >= 5 ? <List list={list} number={index+1} handler={onChange} color={colors[index]} /> : false )}
                            </Col>
                        </Row>
                        </>
                )
            }
        </Container>
        
    )
}

export default Home;