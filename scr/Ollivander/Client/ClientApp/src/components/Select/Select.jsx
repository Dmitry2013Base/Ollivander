import '../../styles/select.css'


const Select = ({ array, current, getValue }) => {

    return (
        <select onChange={(e) => getValue(e.currentTarget.value)} value={current}>
            {
                array.map(item => <option key={item} value={item}>{item}</option>)
            }
        </select>
    );
}

export default Select;