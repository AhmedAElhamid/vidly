import React, {Component} from 'react';
import {getMovies, getMovie, addMovie, updateMovie, deleteMovie} from "../services/movieService"
import Pagination from "./common/pagination";
import {paginate} from "../utils/paginate";
import ListGroup from "./common/listGroup";
import {getGenres} from "../services/genreService";
import MoviesTable from "./moviesTable";
import _ from 'lodash'
import {Redirect, Route, Switch} from "react-router-dom";
import MovieForm from "./movieForm";
import Input from "./common/input";
import SearchInput from "./common/searchInput";
import {search} from "../utils/search";
import {toast} from "react-toastify";
import ProtectedRoute from "./common/protectedRoute";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        genresInDb: [],
        searchQuery: "",
        pageSize: 4,
        currentPage: 1,
        currentGenre: "All Genres",
        sortColumn: {path: "title", asc: true}
    }

    async componentDidMount() {
        const {data: movies} = await getMovies();
        const {data: genresInDb} = await getGenres();
        const genres = [this.state.currentGenre, ...genresInDb.map(g => g.name)]
        this.setState({
            movies, genres, genresInDb
        })
    }

    handleDelete = async (movie) => {
        const originalMovies = this.state.movies
        this.setState({movies: this.state.movies.filter(m => m._id !== movie._id)})

        try {
            await deleteMovie(movie._id)
        } catch (ex) {
            if (ex.status === 400) {
                toast.error("Movie already deleted")
            }
            this.setState({movies: originalMovies})
        }
    }
    handleLike = (movie) => {
        const movies = this.state.movies.map(m => {
            if (m._id === movie._id) m.isLiked = !m.isLiked
            return m
        })
        this.setState({movies})
    }
    handlePageChange = (pageNumber) => {
        this.setState({currentPage: pageNumber})
    }
    handleGenreSelected = (genre) => {
        this.setState({currentGenre: genre, currentPage: 1, searchQuery: ""});
    }
    handleSort = sortColumn => {
        this.setState({sortColumn})
    }
    handleNewMovie = () => {
        this.props.history.push("/movies/new")
    }
    handleSearchInput = ({currentTarget: input}) => {
        input.value ? this.setState({currentGenre: ""}) : this.setState({currentGenre: "All Genres"})
        this.setState({searchQuery: input.value})
    }


    getPagedData = () => {
        const {pageSize, currentPage, movies: allMovies, currentGenre, sortColumn, genres, searchQuery} = this.state

        let movies;
        if (searchQuery) movies = search(allMovies, "title", searchQuery)
        else {
            movies = currentGenre === genres[0]
                ? allMovies
                : allMovies.filter(m => m.genre.name === currentGenre)
        }

        const order = sortColumn.asc ? "asc" : "desc"
        movies = _.orderBy(movies, [sortColumn.path], [order]);

        const totalCount = movies.length
        movies = paginate(movies, currentPage, pageSize)

        return {totalCount, data: movies}
    }
    handleSaveMovieForm = async (movie) => {
        movie.genreId = this.state.genresInDb.find(g => g.name === movie.genre)._id
        delete movie.genre
        let {movies} = this.state

        const movieInDb = movies.find(m => m.title === movie.title)

        if (movieInDb) {
            try {
                const movieId = movie._id
                delete movie._id
                const {data: updatedMovie} = await updateMovie(movieId, movie)
                movies = movies.filter(m => m.title !== movie.title)
                movies.push(updatedMovie)
            } catch (ex) {
                if (ex.response && ex.response.status === 401)
                    toast.error("please login to do this action")
            }
        } else {
            try {
                delete movie._id
                const {data: newMovie} = await addMovie(movie)
                movies.push(newMovie)
            } catch (ex) {
                if (ex.response && ex.response.status === 401)
                    toast.error("please login to do this action")
            }
        }

        this.setState({movies})
    }


    render() {
        const {pageSize, currentPage, movies: allMovies, currentGenre, sortColumn, genres} = this.state

        const {totalCount, data: movies} = this.getPagedData()

        const {user} = this.props

        if (!allMovies.length) {
            return <p>There are no movies in the database</p>
        }
        return <div>

            <Switch>
                <ProtectedRoute path="/movies/:_id"
                       render={props => <MovieForm onSubmit={this.handleSaveMovieForm} {...props}/>}/>

                <div className="row">
                    <div className="col-3">
                        <ListGroup listItems={genres} selectedItem={currentGenre}
                                   onItemSelected={this.handleGenreSelected}/>
                    </div>
                    <div className="col">
                        {user &&
                            <button onClick={this.handleNewMovie} className="btn btn-primary">New Movie</button>}
                        <p style={{marginTop: 10}}>Showing {totalCount} movies in the database</p>
                        <SearchInput onChange={this.handleSearchInput} value={this.state.searchQuery}/>
                        <MoviesTable
                            movies={movies}
                            onLiked={this.handleLike}
                            onDelete={this.handleDelete}
                            onSort={this.handleSort}
                            sortColumn={sortColumn}
                        />
                        <Pagination
                            itemsCount={totalCount}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                        />
                    </div>
                </div>
            </Switch>
        </div>
    }
}

export default Movies;