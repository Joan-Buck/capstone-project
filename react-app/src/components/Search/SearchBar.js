import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';

const SearchBar = ({className}) => {
    const [searchItem, setSearchItem] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const submitSearch = (e) => {
        e.preventDefault();

        // TO DO: add in dispatch search thunk

        // redirectto results page
        // return <Redirect to='/search' />
        history.push('/search')
    }

    return (
        <div className={className}>
            <form className={'search-bar'} onSubmit={submitSearch}>
                <input
                placeholder='Search for food trucks...'
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}>
                </input>
                <button type='submit'>
                    Search
                </button>
            </form>
        </div>
    )
}

export default SearchBar;
