import React from 'react';
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({data, columns, onDelete, onLike, onSort, sortColumn}) => {
    return (
        <table className="table">
            <TableHeader
                onSort={onSort}
                sortColumn={sortColumn}
                columns={columns}
            />

            <TableBody
                columns={columns}
                data={data}
                onDelete={onDelete}
                onLiked={onLike}
            />

        </table>
    );
}

export default Table;