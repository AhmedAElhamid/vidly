import React, {Component} from 'react';
import Like from "./common/like";
import Table from "./common/table";
import _ from "lodash";
import {Link} from "react-router-dom";
import {getCurrentUser, getToken} from "../services/userService";


class MoviesTable extends Component {

    columns = [
        {path: "title", label: "Title", content: movie => <Link to={"/movies/" + movie._id}>{movie.title}</Link>},
        {path: "genre.name", label: "Genre"},
        {path: "numberInStock", label: "Stock"},
        {path: "dailyRentalRate", label: "Rate"},
        {key: "like", content: movie => <Like movie={movie} onLiked={() => this.props.onLiked(movie)}/>},

    ]
    deleteColumn = {
        key: "delete", content: movie => {
            return <button onClick={() => {
                this.props.onDelete(movie)
            }} className="btn btn-outline-danger btn-sm">Delete</button>
        }
    }

    constructor() {
        super();
        const user = getCurrentUser()
        if (user && user.isAdmin) this.columns.push(this.deleteColumn)
    }

    render() {

        const {movies, onDelete, onLike, onSort, sortColumn} = this.props
        return (
            <Table
                data={movies}
                columns={this.columns}
                sortColumn={sortColumn}
                onSort={onSort}
                onDelete={onDelete}
                onLike={onLike}
            />
        );
    }
}

export default MoviesTable;