import React, { Component } from 'react';
import { employeeData } from '../../services/employee';
import DataTable from '../dataTable/dataTable';
import TextField from '@material-ui/core/TextField';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import './employeeDir.css';

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // employees: [],
      selectedEmp: [],
      loading: true,
    };
    this.handleEmployees = this.handleEmployees.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentWillMount() {
    employeeData(this.handleEmployees);
  }

  // setting fetch data in states
  handleEmployees(response) {
    this.setState({
      employees: response,
      selectedEmp: response,
      loading: false,
    });
  }

  // search by firstname, lastname, role & employee code
  handleSearch(event) {
    event.preventDefault();
    const search = event.target.value;
    const filempfirst = this.state.employees.filter(
      employee =>
        (employee.firstname.toLowerCase().indexOf(search.toLowerCase())
          && employee.lastname.toLowerCase().indexOf(search.toLowerCase())
          && employee.role.toLowerCase().indexOf(search.toLowerCase())
          && employee.code.toLowerCase().indexOf(search.toLowerCase())) > -1,
    );
    this.setState({
      selectedEmp: filempfirst,
    });
  }

  render() {
    const { selectedEmp } = this.state;
    const { loading } = this.state;

    return (
      <div>
        <div className="autoSuggest">
          <TextField
            id="full-width"
            label="Search"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.handleSearch}
            placeholder="Search here..."
            helperText="Don't Think TOO Much"
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <Fade in={loading} unmountOnExit>
            <CircularProgress />
          </Fade>
        </div>
        {(selectedEmp === [])
          ? <div>
            <p>
No data
</p>
          </div>
          : <div>
            <DataTable profile={selectedEmp} />
          </div>
        }
      </div>
    );
  }
}

export default Employee;
