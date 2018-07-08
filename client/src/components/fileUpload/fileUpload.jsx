import React, { Component } from 'react';
import { TextField } from '@material-ui/core';

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.handleFile(event.target.name, event.target.files[0]);
  }

    // handleChange(event) {
    //     this.props.handleFile(event.target.name, event.target.files[0])
    // }

    render() {

        return (
            <TextField
                id={this.props.id}
                label={this.props.label}
                type="file"
                name={this.props.name}
                onChange={this.handleChange}
                helperText={this.props.helperText}
                fullWidth
            />
        )
    }
}

export default FileUpload;
