import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import TextInput from '../textInput/textInput';
import './editEmployeeDetails.css';
import DropDown from '../dropDown/dropDown';
import Button from "@material-ui/core/Button";
import {getExpertise} from "../../services/expertise";
import {getDesignation} from '../../services/designation';
import {getDepartments} from '../../services/department';
import {validateEmail, validatePhone} from '../../services/validation';
import TextField from '@material-ui/core/TextField';
import MultipleSelectDropDown from "../multiSelectDropDown/multiSelectDropDown";
import FileUpload from "../fileUpload/fileUpload";
import {getSignedUrl} from "../../services/candidate";
import {updateEmployee} from "../../services/employee";
import  {getEmployeeById} from '../../services/employee';


class editEmployeeDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            middlename: '',
            lastname: '',
            email: '',
            mobile: '',
            picture: '',
            pictureFile: null,
            password: '',
            department: '',
            designation: '',
            departments: [],
            designations: [],
            expertise: [],
            expertises: [],
            emailError: false,
            phoneError: false,
            passwordError: false,
            vertical: "top",
            horizontal: "center",
            open: false,
            msg: false,
            helperText: '',
            employeeId: '',
            employeeData: []

        };

        this.handleDepartmentData = this.handleDepartmentData.bind(this);
        this.handleDesignationData = this.handleDesignationData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleExpertise = this.handleExpertise.bind(this);
        this.handleMultipleInputChange = this.handleMultipleInputChange.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.employeeCallback = this.employeeCallback.bind(this);
        this.handleEmployees = this.handleEmployees.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    componentWillMount() {
        getDepartments(this.handleDepartmentData);
        getExpertise(this.handleExpertise);
        getDesignation(this.handleDesignationData);
        getEmployeeById(this.handleEmployees);
    }

    ///////getEmployeeData////
    handleEmployees(data){
        this.setState({
            employeeData: data
        })
    }

    //setting fetched data in state//
    ////////////////////////////////
    handleDepartmentData(data) {
        this.setState({
            departments: data
        })
    }

    handleExpertise(data) {
        this.setState({
            expertises: data
        });
    }

    handleDesignationData(data) {
        this.setState({
            designations: data
        })
    }

    //////////////////////////////////

    //set state for multiple dropdown
    handleMultipleInputChange(name, value) {
        this.setState({
            [name]: value.map(data => data.key)
        });
    }

    //handle file data and name
    handleFile(name, value) {
        getSignedUrl(name, value, this.handleUrls)
    }

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

    employeeCallback(response) {
        if (response.status === 200) {
            this.setState({
                msg: true,
                open: true,
                employeeId: this.state
            })

        }
        else {
            this.setState({
                msg: false,
                open: true
            })
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        updateEmployee(this.state, this.employeeCallback)
    };


    render() {
        const {departments, designations} = this.state
        const {expertises} = this.state;

        return (
            <div className="container">
                <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12 editEmployeeHeader">
                    <Typography variant="display3" gutterBottom className="editEmployeeHeaderText">
                        EDIT EMPLOYEE DETAILS
                    </Typography>
                </div>
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
                        <TextInput id="first-name"
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
                        <TextField
                            required
                            id="birthdate"
                            label="Birthdate"
                            className="date tableCell"
                            type="date"
                            name="birthdate"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                    </div>
                    <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
                        <TextInput id="phone-number"
                                   label="Phone number"
                                   type="number"
                                   name="mobile"
                            // error={(phoneError) ? true : false}
                                   handleInputChange={this.handleInputChange}
                        />
                    </div>
                    <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12 profilePicture">
                        <FileUpload
                            handleFile={this.handleFile}
                            id="picture"
                            name="picture"
                            label="Picture"
                            helperText="Select a Profile Picture"
                            margin="normal"

                        />
                    </div>
                    <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
                        <TextInput
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            //error={(emailError) ? true : false}
                            handleInputChange={this.handleInputChange}
                        />
                    </div>
                    <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
                        <TextInput
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            //error={(passwordError) ? true : false}
                            handleInputChange={this.handleInputChange}
                        />
                    </div>
                    <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
                        <TextInput
                            id="experience"
                            label="Experience in Year"
                            type="number"
                            name="experience"
                            handleInputChange={this.handleInputChange}
                        />
                    </div>
                    <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12 multiSelect">
                        <MultipleSelectDropDown
                            id="expertise"
                            label="Expertise"
                            name="expertise"
                            title="Expertise"
                            data={expertises}
                            handleMultipleInputChange={this.handleMultipleInputChange}
                        />
                    </div>
                    <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
                        <DropDown handleInputChange={this.handleInputChange} name="designation" title="Designation"
                                  data={designations}/>
                    </div>
                    <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
                        <DropDown handleInputChange={this.handleInputChange} name="department" title="Department"
                                  data={departments}/>
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
        );
    }
}

export default editEmployeeDetails