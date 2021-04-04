import React from 'react';
import Joi from 'joi-browser'
import {Redirect} from "react-router-dom";
import Form from "./common/form";
import {getToken, login} from "../services/userService";

class Login extends Form {
    state = {
        data: {
            email: "",
            password: ""
        },
        errors: {}
    }

    schema = {
        email: Joi.string()
            .min(3)
            .max(50)
            .required()
            .label("Email"),
        password: Joi.string()
            .required().label("Password")
    }
    joiSchema = Joi.object(this.schema)

    doSubmit = async () => {
        try {
            await login(this.state.data)
            const {state} = this.props.location
            window.location = state ? state.from.pathname : '/'
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = {...this.state.errors}
                errors.email = ex.response.data
                this.setState({errors})
            }
        }
    }


    render() {
        if(getToken()) return <Redirect to="/"/>
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("email", "Email")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Login")}
                </form>
            </div>
        );
    }
}

export default Login;