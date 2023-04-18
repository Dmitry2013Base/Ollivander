import React from 'react'

const FeedbackPoint = (props) => {

    return (
        <div className="feedback-point">
            <p className="point-header">{props.title}</p>
            <p className="point-description">{props.value}</p>
        </div>
    );
}

export default FeedbackPoint;