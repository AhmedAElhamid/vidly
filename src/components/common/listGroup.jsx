import React from 'react';

const ListGroup = ({listItems, onItemSelected, selectedItem}) => {
    return (
        <ul className="list-group">
            {listItems.map(item => <li
                                       onClick={() => onItemSelected(item)}
                                       key={item}
                                       className={item === selectedItem ? "clickable list-group-item active" : "clickable list-group-item"}
            >{item}</li>)}
        </ul>
    );
}

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
}

export default ListGroup;