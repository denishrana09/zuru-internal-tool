import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DropDown from '../dropDown/dropDown';
import Snackbar from '@material-ui/core/Snackbar';
import TextInput from '../textInput/textInput';
import { validateEmail, validatePhone } from '../../services/validation';
import { sendEmployeeInfo } from '../../services/employee';
import { getDesignation } from '../../services/designation';
import { getDepartments } from '../../services/department';
import { getRoles } from '../../services/role';
import './addEmployee.css';

class AddEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            middlename: '',
            lastname: '',
            codeno: '',
            email: '',
            mobile: '',
            password: '',
            role: '',
            department: '',
            designation: '',
            departments: [],
            designations: [],
            roles: [],
            emailError: false,
            phoneError: false,
            passwordError: false,
            vertical: "top",
            horizontal: "center",
            open:false,
            msg: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleDepartmentData = this.handleDepartmentData.bind(this)
        this.handleDesignationData = this.handleDesignationData.bind(this)
        this.handleRoleData = this.handleRoleData.bind(this)
        this.employeeCallback = this.employeeCallback.bind(this)
    }

    //fetching data from API
    componentWillMount() {
        getDepartments(this.handleDepartmentData)
        getRoles(this.handleRoleData)
        getDesignation(this.handleDesignationData)
    }

    //setting fetched data in state//
    ////////////////////////////////
    handleDepartmentData(data) {
        this.setState({
            departments: data
        })
    }

    handleRoleData(data) {
        this.setState({
            roles: data
        })
    }

    handleDesignationData(data) {
        this.setState({
            designations: data
        })
    }
    //////////////////////////////////

    //setting the value of states for json body with validation
    handleInputChange(name, value) {
        if (name === "email") {
            if (!validateEmail(value)) {
                this.setState({
                    emailError: true
                })
            }
            else {
                this.setState({
                    emailError: false
                })
            }
        }
        else if (name === "mobile") {
            if (!validatePhone(value)) {
                this.setState({
                    phoneError: true
                })
            }
            else {
                this.setState({
                    phoneError: false
                })
            }
        }
        else if (name === "password") {
            if (value === "") {
                this.setState({
                    passwordError: true
                })
            }
            else {
                this.setState({
                    passwordError: false
                })
            }
        }
        else {
            this.setState({
                phoneError: false,
                emailError: false
            })
        }
        this.setState({
            [name]: value
        })
    }

    //checking the API response of employee insertion using callback
    employeeCallback(response) {
        if (response.status === 200) {
            this.setState({
                msg: true,
                open: true
            })
        }
        else {
            this.setState({
                msg: false,
                open: true
            })
        }
    }

    //sending the json body to API
    handleSubmit = event => {
        event.preventDefault();
        sendEmployeeInfo(this.state, this.employeeCallback)
    };

    render() {
        const { vertical, horizontal, msg, open } = this.state;
        const { emailError, phoneError, passwordError } = this.state
        const { departments, designations, roles } = this.state

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 col-xs-12">
                        <div className="container text-center ">
                            <div className="addNewEmployee">
                                <div>
                                    <Snackbar
                                        anchorOrigin={{ vertical, horizontal }}
                                        open={open}
                                        ContentProps={{
                                            'aria-describedby': 'message-id',
                                        }}
                                        message={<span id="message-id">{msg ? 'Employee Added' : 'Failed!!'}</span>}
                                    />
                                </div>
                                <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12 addNewEmployeeHeader">
                                    <Typography variant="display3" gutterBottom className="addNewEmployeeHeaderText">
                                        ADD NEW EMPLOYEE
                                    </Typography>
                                </div>
                                <form autoComplete="off" onSubmit={this.handleSubmit} >
                                    <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
                                        <TextInput
                                            required
                                            id="first-name"
                                            label="First Name"
                                            type="text"
                                            name="firstname"

                                            handleInputChange={this.handleInputChange}
                                        />
                                    </div>
                                    <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
                                        <TextInput
                                            id="middle-name"
                                            label="Middle Name"
                                            name="middlename"
                                            type="text"
                                            handleInputChange={this.handleInputChange}
                                        />
                                    </div>
                                    <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
                                        <TextInput
                                            id="last-name"
                                            label="Last Name"
                                            name="lastname"
                                            type="text"
                                            handleInputChange={this.handleInputChange}
                                        />
                                    </div>
                                    <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
                                        <TextInput
                                            id="emp-code"
                                            name="codeno"
                                            label="Employee Code"
                                            type="text"
                                            handleInputChange={this.handleInputChange}
                                        />
                                    </div>
                                    <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
                                        <TextInput id="phone-number"
                                            label="Phone number"
                                            type="number"
                                            name="mobile"
                                            error={(phoneError) ? true : false}
                                            handleInputChange={this.handleInputChange}
                                        />
                                    </div>
                                    <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
                                        <TextInput
                                            id="email"
                                            name="email"
                                            label="Email"
                                            type="email"
                                            error={(emailError) ? true : false}
                                            handleInputChange={this.handleInputChange}
                                        />
                                    </div>
                                    <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
                                        <TextInput
                                            id="password"
                                            name="password"
                                            label="Password"
                                            type="password"
                                            error={(passwordError) ? true : false}
                                            handleInputChange={this.handleInputChange}
                                        />
                                    </div>
                                    <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
                                        <DropDown handleInputChange={this.handleInputChange} name="role" title="Role" data={roles} />
                                    </div>
                                    <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
                                        <DropDown handleInputChange={this.handleInputChange} name="designation" title="Designation" data={designations} />
                                    </div>
                                    <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
                                        <DropDown handleInputChange={this.handleInputChange} name="department" title="Department" data={departments} />
                                    </div>
                                    <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12 addEmployeeButtonWrapper">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            type="submit"
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddEmployee