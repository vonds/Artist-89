import React from 'react'
import { Field, reduxForm } from 'redux-form'

class StreamForm extends React.Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    renderInput = ({ input, label, meta, type, checked }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        type = type ? type : "text";
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" type={type} checked={checked} />
                {this.renderError(meta)}
            </div>

        )
    }

    renderTextArea = ({ input, meta, placeholder }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <textarea {...input} autoComplete="off" placeholder={placeholder}></textarea>
                {this.renderError(meta)}
            </div>
        )
    }


    onSubmit = formValues => {
        this.props.onSubmit(formValues)
    }

    render() {
        return (

            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error" >
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <Field name="color" component={this.renderInput} type="radio" value="blue" label="Blue" />
                <Field name="color" component={this.renderInput} type="radio" value="red" label="Red" />
                <Field name="color" component={this.renderInput} type="radio" value="green" label="Green" />
                <Field name="color" component={this.renderInput} type="radio" value="purple" label="Purple" />
                <Field name="color " component={this.renderInput} type="radio" value="yellow" label="Yellow" />
                <Field name="abstract" component={this.renderTextArea} placeholder="Enter abstract here" />

                <button className="ui btn btn-sm btn-primary">Submit</button>
            </form>
        )
    }
}

const validate = formValues => {
    console.log('form values: ', formValues)
    const errors = {}

    if (!formValues.title) {
        errors.title = 'You must enter a title'
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description'
    }

    if (!formValues.color) {
        errors.color = 'Please select an image'
    }

    if (!formValues.abstract) {
        errors.abstract = "Please provide an abstract"
    }

    return errors
}

export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm)

