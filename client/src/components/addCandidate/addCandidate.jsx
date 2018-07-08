import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextInput from '../textInput/textInput';
import DropDown from '../dropDown/dropDown';
import { validateEmail, validatePhone } from '../../services/validation';
import MultipleSelectDropDown from '../multiSelectDropDown/multiSelectDropDown';
import { getDesignation } from '../../services/designation';
import { getExpertise } from '../../services/expertise';
import { sendCandidateInfo, getSignedUrl } from '../../services/candidate';
import { employeeData } from '../../services/employee';
import FileUpload from '../fileUpload/fileUpload';
import './addCandidate.css';

class AddCandidate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vertical: 'top',
      horizontal: 'center',
      open: false,
      msg: false,
      tabValue: 0,
      firstname: '',
      middlename: '',
      lastname: '',
      emailError: false,
      phoneError: false,
      expertises: [],
      reference: '',
      position: '',
      interviewers: [],
      picture: '',
      pictureFile: null,
      resumeFile: null,
      resume: '',
        signedPictureLink: '',
        signedResumeLink: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMultipleInputChange = this.handleMultipleInputChange.bind(this);
    this.handleDesignationData = this.handleDesignationData.bind(this);
    this.handleExpertise = this.handleExpertise.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.responseCallback = this.responseCallback.bind(this);
    this.handleEmployees = this.handleEmployees.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleUrls = this.handleUrls.bind(this);
  }

  // get data from API request
  componentWillMount() {
    getDesignation(this.handleDesignationData);
    employeeData(this.handleEmployees);
    getExpertise(this.handleExpertise);

  }

  // set data in dropdown
  // ///////////////////////////
  handleEmployees(data) {
    this.setState({
      interviewers: data,
    });
  }

  handleExpertise(data) {
    this.setState({
      expertises: data,
    });
  }

  handleDesignationData(data) {
    this.setState({
      positions: data,
    });
  }
  // //////////////////////////////

  // recived data in states
  // //////////////////////////////////////////

  // set state for multiple dropdown
  handleMultipleInputChange(name, value) {
    this.setState({
      [name]: value.map(data => data.key),
    });
  }

  // set state for text and file input with validation
  handleInputChange(name, value) {
    if (name === 'email') {
      if (!validateEmail(value)) {
        this.setState({
          emailError: true,
        });
      } else {
        this.setState({
          emailError: false,
        });
      }
    } else if (name === 'mobile') {
      if (!validatePhone(value)) {
        this.setState({
          phoneError: true,
        });
      } else {
        this.setState({
          phoneError: false,
        });
      }
    } else {
      this.setState({
        phoneError: false,
        emailError: false,
      });
    }
    this.setState({
      [name]: value,
    });
  }
  // //////////////////////////////////////////

  // sessionUri for resumable upload for picture and resume


  // handle file data and name
  handleFile(name, value) {
    getSignedUrl(name, value, this.handleUrls);
  }

  handleUrls(name, file, sessionUri,publicLink) {
        if (name === 'picture') {
            this.setState({
                [name]: sessionUri,
                pictureFile: file,
                picture: publicLink,
                signedPictureLink : sessionUri

            });
        } else {
            this.setState({
                [name]: sessionUri,
                resumeFile: file,
                resume : publicLink,
                signedResumeLink : sessionUri,
            });
        }
    }

  // candidate input response callback
  responseCallback(response) {
    if (response.status === 200) {
      this.setState({
        msg: true,
        open: true,
      });
    } else {
      this.setState({
        msg: false,
        open: true,
      });
    }
  }

  // handling submit request
  handleSubmit(event) {
    event.preventDefault();
    sendCandidateInfo(this.state, this.responseCallback);
  }

  render() {
    const {
      vertical, horizontal, msg, open,
    } = this.state;
    const { positions, expertises, interviewers } = this.state;
    const { phoneError, emailError } = this.state;

    return (
      <div className="container text-center ">
        <div className="addNewEmployee">
          <div>
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              ContentProps={{
							  'aria-describedby': 'message-id',
              }}
              message={(
                <span id="message-id">
                  {msg ? 'Candidate Added' : 'Failed!!'}
                </span>
)}
            />
          </div>
          <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12 addNewEmployeeHeader">
            <Typography
              variant="display3"
              gutterBottom
              className="addNewEmployeeHeaderText"
            >
							ADD NEW CANDIDATE
            </Typography>
          </div>
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
              <TextInput
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
                type="text"
                name="middlename"
                handleInputChange={this.handleInputChange}
              />
            </div>
            <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
              <TextInput
                id="last-name"
                label="Last Name"
                type="text"
                name="lastname"
                handleInputChange={this.handleInputChange}
              />
            </div>
            <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
              <TextInput
                id="phone-number"
                label="Phone number"
                type="number"
                name="mobile"
                error={!!phoneError}
                handleInputChange={this.handleInputChange}
              />
            </div>
            <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
              <TextInput
                id="email"
                name="email"
                label="Email"
                type="email"
                error={!!emailError}
                handleInputChange={this.handleInputChange}
              />
            </div>
            <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
              <TextInput
                id="reference"
                label="Reference"
                type="text"
                name="reference"
                handleInputChange={this.handleInputChange}
              />
            </div>
            <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
              <TextInput
                id="experience"
                label="Experience"
                type="number"
                name="experience"
                handleInputChange={this.handleInputChange}
              />
            </div>
            <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
              <TextInput
                id="current-compeny"
                label="Current Compeny"
                type="text"
                name="currentCompeny"
                handleInputChange={this.handleInputChange}
              />
            </div>

						<div className="col-xs-12 col-lg-12 col-sm-12 col-md-12 fileUpload ">
							<FileUpload
								handleFile={this.handleFile}
								id="picture"
								name="picture"
								label="Picture"
							/>
						</div>
						<div className="col-xs-12 col-lg-12 col-sm-12 col-md-12 fileUpload">
							<FileUpload
								handleFile={this.handleFile}
								id="resume"
								name="resume"
								label="Resume"
							/>
						</div>
						<div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
							<DropDown
								handleInputChange={this.handleInputChange}
								name="position"
								title="Position"
								data={positions}
							/>
						</div>
						<div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
							<MultipleSelectDropDown
								id="interviewer"
								label="Interviewer"
								name="interviewer"
								title="Interviewer"
								data={interviewers}
								handleMultipleInputChange={this.handleMultipleInputChange}
							/>
						</div>
						<div className="col-xs-12 col-lg-12 col-sm-12 col-md-12">
							<MultipleSelectDropDown
								id="expertise"
								label="Expertise"
								name="expertise"
								title="Expertise"
								data={expertises}
								handleMultipleInputChange={this.handleMultipleInputChange}
							/>
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
		);
	}
}

export default AddCandidate;
