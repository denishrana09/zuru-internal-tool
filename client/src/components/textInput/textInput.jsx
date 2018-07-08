import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';


class TextInput extends Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange=(event)=>{
        this.props.handleInputChange(event.target.name, event.target.value)
    }

    render() {
        return (
            <TextField
                id={this.props.id}
                label={this.props.label}
                name={this.props.name}
                type={this.props.type}
                value={this.props.value}
                onChange={this.handleChange}
                margin="normal"
                error={this.props.error}
                fullWidth
                required
            />
        )
    }
}    

export default TextInput

