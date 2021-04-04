import React from 'react';

const DropDownInput = ({name, label, error,options = [],...rest}) => {
    options = ["",...options];
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>

            <select {...rest}  name={name} className="form-control" id={name}>
                <option disabled>Choose {label}</option>
                {options.map(i => <option key={i}>{i}</option>)}
            </select>

            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );

}

export default DropDownInput;