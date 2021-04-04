import React from 'react';

const SearchInput = ({...rest}) =>{
        return (
            <div className="input-group mb-3">
                <input {...rest} type="text" className="form-control" placeholder="Search"
                       aria-label="search" />
            </div>
        );
}

export default SearchInput;