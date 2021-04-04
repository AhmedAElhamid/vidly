import React, {Component} from 'react';
import Joi from "joi-browser";
import Input from "./input";
import DropDownInput from "./dropDownInput";

class Form extends Component {
    state = {
        data: {},
        errors: {}
    }

    validate = () => {
        const errors = {}
        const {data} = this.state

        const {error} = this.joiSchema.validate(data, {abortEarly: false})

        if (!error) return null;

        error.details.map(e => {
            if(!errors[e.path[0]]) errors[e.path[0]] = e.message
        })


        return errors
    }
    validateProperty = ({name, value}) => {
        const obj = {[name]:value}

        const schema = {[name]:this.schema[name]}
        const {error} = Joi.object(schema).validate(obj)

        return error ? error.details[0].message : null

    }

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate()
        this.setState({errors: errors || {}})
        if (errors) return;

        this.doSubmit()
    }
    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input)
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name]

        const data = {...this.state.data}
        data[input.name] = input.value;
        this.setState({data, errors})
    }

    renderButton =label=>{
        return <button disabled={this.validate()} className="btn btn-primary">{label}</button>
    }
    renderInput =(name,label,type="text")=>{
        const {data,errors} = this.state
        return (<Input
            name={name}
            type={type}
            value={data[name]}
            label={label}
            error={errors[name]}
            onChange={this.handleChange}/>)
    }
    renderDropdownInput =(name,label,options)=>{
        const {data,errors} = this.state
        return (<DropDownInput
            options={options}
            name={name}
            value={data[name]}
            label={label}
            error={errors[name]}
            onChange={this.handleChange}/>)
    }
}

export default Form;