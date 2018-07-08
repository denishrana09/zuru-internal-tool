import React, { Component } from 'react';
import DropDown from '../dropDown/dropDown';
import Paper from '@material-ui/core/Paper';
import Chip from "@material-ui/core/Chip";

class MultipleSelectDropDown extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            selected: [],
            name: this.props.name,
            title: this.props.title
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentWillReceiveProps(props) {
        this.setState({
            data: props.data
        })
    }

    //DropDown Select event sends the name of event generator
    //sneds array of selected properties
    handleInputChange = (name, value) => {
        if (value > 0) {
            const interview = this.state.data.filter(data => (data.id || data.employeeId) === value)
            if (this.state.selected.map(data => data.key).indexOf(interview[0].id || interview[0].employeeId) === -1) {
                this.setState({
                    selected: [...this.state.selected, { key: value, label: (interview[0].name || interview[0].firstname || interview[0].expertiseField) }]
                }, () => this.props.handleMultipleInputChange(this.state.name, this.state.selected))
            }
        }
    };

    //Delete Chips
    handleDelete = data => () => {
        const chipData = [...this.state.selected];
        const chipToDelete = chipData.indexOf(data);
        chipData.splice(chipToDelete, 1);
        this.setState({
            selected: chipData
        }, () => this.props.handleMultipleInputChange(this.state.name, this.state.selected));
    };

    render() {
        const { name, title, data } = this.state

        return (
            <div>
                <DropDown data={data} handleInputChange={this.handleInputChange} name={name} title={title} />
                <Paper>
                    {this.state.selected.map(data =>
                        <Chip
                            key={data.key}
                            label={data.label}
                            onDelete={this.handleDelete(data)}
                            onChange={this.handleChange}
                        />
                    )}
                </Paper>
            </div>
        )
    }
}

export default MultipleSelectDropDown