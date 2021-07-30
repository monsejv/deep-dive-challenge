import React from "react";
import BubbleChart from '@weknow/react-bubble-chart-d3';

function BubbleChartComponent(props) {

    const { data, handler } = props

    const bubbleClick = (answer, score, question) => {
        let answers = {
            question: question,
            answer: answer,
            score: score
        }
        handler(answers)
    }

    return (
        <div className="buuble-wrapper">
            <BubbleChart
                graph={{
                    zoom: 0.8,
                    offsetX: 0,
                    offsetY: 0,
                }}
                width={800}
                height={650}
                padding={2} 
                showLegend={false} 
                valueFont={{size: 0}}
                labelFont={{
                    size: 8,
                    color: "#fff",
                    weight: 'normal',
                  }}
                bubbleClickFun={bubbleClick}
                data={data}
            />
        </div>
    )
}

export default BubbleChartComponent