import React, {Component} from 'react';

class TableHeader extends Component {
    raiseSort = (path) => {
        let {sortColumn, onSort} = this.props
        sortColumn = path === sortColumn.path ? {path, asc: !sortColumn.asc} : {path, asc: true}
        onSort(sortColumn)
    }
    renderSortingIcon = (column) => {
        const {sortColumn} = this.props
        if (column.path !== sortColumn.path) return null;
        if (sortColumn.asc) return <i className="fa fa-sort-asc"/>
        return <i className="fa fa-sort-desc"/>
    }

    render() {
        const {columns} = this.props
        return (
            <thead>
            <tr>
                {columns.map(column => <th className="clickable" key={column.path || column.key}
                                           onClick={() => column.path ? this.raiseSort(column.path) : null}
                                           scope="col">{column.label}
                    {this.renderSortingIcon(column)}
                </th>)}

            </tr>
            </thead>
        );
    }
}

export default TableHeader;