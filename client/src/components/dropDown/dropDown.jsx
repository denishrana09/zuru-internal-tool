import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

class DropDown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            name: this.props.name,
            title: this.props.title,
            select: "",
            role: "",
            department: "",
            designation: "",
            expertise: "",
            interviewer: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    //setting state from props
    componentWillReceiveProps(props) {
        if (!!props.data) {
            this.setState({
                data: props.data
            })
        }
    }

    //setting state as per event
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
            select: event.target.value
        });
        this.props.handleInputChange(event.target.name, event.target.value)
    };

    render() {
        let { data, title, name } = this.state

        return (
            <FormControl className="dropdownControl" fullWidth>
                <InputLabel htmlFor="controlled-open-select">{title}</InputLabel>
                <Select
                    name={name}
                    value={this.state.select}
                    onChange={this.handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {data.map(_data =>
                        <MenuItem key={_data.id || _data.employeeId} value={_data.id || _data.employeeId}>{_data.firstname || _data.name || _data.role || _data.expertiseField}</MenuItem>
                    )}
                </Select>
            </FormControl>
        )
    }
}

export default DropDown