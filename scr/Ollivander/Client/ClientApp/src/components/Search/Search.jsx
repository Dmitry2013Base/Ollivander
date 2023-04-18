import { useState } from 'react'
import { useDispatch } from 'react-redux'
import InputVar1 from '../Inputs/InputVar1'
import { searchInArray } from '../Redux/Actions'

const Search = ({ param }) => {

    const dispatch = useDispatch()
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="create-role">
            <InputVar1 type="search" value={searchQuery} onChange={e => { setSearchQuery(e.target.value); dispatch(searchInArray(param, e.target.value)) }} placeholder="Поиск" />
        </div>
    );
}

export default Search;
