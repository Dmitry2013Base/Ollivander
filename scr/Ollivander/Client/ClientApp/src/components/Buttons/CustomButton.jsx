import React from 'react'
import '../../styles/button.css'


const CustomButton = ({ children, ...props }) => {

    return (

        <button className="button-base" onClick={props.onClick} { ...props }>{children}</button>
    );
}

export default CustomButton;