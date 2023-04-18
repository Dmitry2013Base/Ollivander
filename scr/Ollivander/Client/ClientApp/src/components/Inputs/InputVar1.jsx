import { useState } from 'react'
import '../../styles/input.css'

const InputVar1 = ({ type, placeholder, getValue, val, ...props }) => {

    const [value, setValue] = useState(val)

    return (
        <div className="input-item">
            <input type={type} className="input-value" value={value} onChange={e => { setValue(e.target.value); getValue(e.target.value) }} {...props} required />
            <label className="input-label">{placeholder}</label>
        </div>
    );
}

export default InputVar1;