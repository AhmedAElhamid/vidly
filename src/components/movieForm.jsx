import React, {Component} from 'react';
import Form from "./common/form";
import Joi from "joi-browser"
import {getGenres} from "../services/genreService";
import {getMovie} from "../services/movieService";

class MovieForm extends Form {
    state = {
        data: {
            _id: "",
            title: "",
            genre: "",
            numberInStock: "",
            dailyRentalRate: ""
        },
        errors: {},
        genres: []
    }

    async populateGenres(){
        let {data: genres} = await getGenres()
        genres = genres.map(g => g.name);
        this.setState({genres})
    }
    async populateMovie(){
        try {
            const id = this.props.match.params._id
            if (id === "new") return;

            let {data} = await getMovie(id)
            data.genre = data.genre.name
            this.setState({data})
        } catch (ex) {
            console.log(ex)
            if (ex.response && ex.response.status === 404) return this.props.history.replace("/not-found")
        }
    }

    async componentDidMount() {
        await this.populateGenres()

        await this.populateMovie()
    }

// getMovie = id =>{
//     return [...this.props.movies].find(m =>m._id === id);
// }

    schema = {
        _id: Joi.string().allow('').optional(),
        title: Joi.string().required().label("Title"),
        genre: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().min(0).max(100).required().label("Number In Stock"),
        dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
    }

    joiSchema = Joi.object(this.schema)

    doSubmit = () => {
        const movie = this.state.data
        const id = movie._id !== "new" ? movie._id : movie.title
        this.props.onSubmit({...movie, _id: id});
        this.props.history.push("/movies")
    }

    render() {
        const {genres} = this.state
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title")}
                    {this.renderDropdownInput("genre", "Genre", genres)}
                    {this.renderInput("numberInStock", "Number In Stock")}
                    {this.renderInput("dailyRentalRate", "Rate")}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}

export default MovieForm;