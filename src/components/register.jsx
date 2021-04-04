import React from 'react';
import Joi from 'joi-browser'
import Form from "./common/form";
import {register} from '../services/userService'

class Register extends Form {
    state = {
        data: {
            email: "",
            password: "",
            name: ""
        },
        errors: {}
    }

    schema = {
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().min(5).required().label("Password"),
        name: Joi.string().min(3).required().label("Name")
    }

    joiSchema = Joi.object(this.schema)

    doSubmit = async () => {
        try {
            const {data} = this.state
            await register(data)
            window.location = '/'
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = {...this.state.errors}
                errors.email = ex.response.data
                this.setState({errors})
            }
        }
    }

    render() {
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("email", "Email")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("name", "Name")}
                    {this.renderButton("Register")}
                </form>

            </div>
        );
    }
}

export default Register;