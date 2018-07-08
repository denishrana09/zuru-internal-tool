import React from "react";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import { getCandidateExpertiseById, getEmployeeByCandidate, calenedarDate } from "../../services/candidate";
import "./statusModal.css";
import { Chip } from "@material-ui/core";
import { rejectCandidate } from '../../services/candidate';
import { reactLocalStorage } from "reactjs-localstorage";

class SimpleModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            id: props.id,
            expertises: [],
            interviewers: [],
            resumeUrl: props.resume,
            refreshUrl: ''
        };
        this.handleCandidateData = this.handleCandidateData.bind(this)
        this.handleInterviewerData = this.handleInterviewerData.bind(this)
        this.handleSuccessSubmit = this.handleSuccessSubmit.bind(this)
        this.handleFailureSubmit = this.handleFailureSubmit.bind(this)
        this.handleCalendarAPI = this.handleCalendarAPI.bind(this)
    }

    componentWillMount() {
        getEmployeeByCandidate(this.state.id, this.handleInterviewerData)
        getCandidateExpertiseById(this.state.id, this.handleCandidateData);
    }

    //get data from API
    //////////////////////////////////////////////
    handleCandidateData(expertise) {
        if (!!expertise) {
            this.setState({
                expertises: expertise
            })
        }
    }

    handleInterviewerData(employee) {
        if (!!employee) {
            this.setState({
                interviewers: employee
            })
        }
    }
    ///////////////////////////////////////////////

    //handling Google Calendar API
    //////////////////////////////////////////////
    handleCalendarAPI(response) {
        if (response.status === 200) {
            reactLocalStorage.setObject("candidate", { 'id': this.state.id })
            this.setState({
                refreshUrl: response.data.data
            }, () => window.location = this.state.refreshUrl)
        }
    }

    //Submit handling
    /////////////////////////////////////////////
    handleSuccessSubmit(event) {
        event.preventDefault();
        calenedarDate(this.handleCalendarAPI)
    }

    handleFailureSubmit(event) {
        event.preventDefault()
        rejectCandidate(this.state.id)
    }
    //////////////////////////////////////////////

    //Open/Close model
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { expertises, interviewers, resumeUrl } = this.state

        return (
            <div>
                <Button onClick={this.handleOpen} className="statusButton">
                    View Details
                </Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div className="statusModal">
                        <Typography variant="title" id="modal-title" className="tableCell typoSpace">
                            Expertise
                        </Typography>
                        <div>{
                            expertises.map(expertise =>
                                <Chip key={expertise.id} label={expertise.expertiseField} className="chip" />
                            )}
                        </div>
                        <Typography variant="title" id="modal-title" className="tableCell typoSpace">
                            <a href={resumeUrl} target="_black"> Download Resume</a>
                        </Typography>
                        <Typography variant="title" id="modal-title" className="tableCell typoSpace">
                            Reviews
                        </Typography>
                        <div className="tableWrapper">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="tableCell">Reviewed By</TableCell>
                                        <TableCell className="tableCell">Remark</TableCell>
                                        <TableCell className="tableCell">Review</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {interviewers.map(employee => {
                                        return (
                                            <TableRow key={employee.employeeId}>
                                                <TableCell
                                                    className="tableCell"
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {employee.firstname} {employee.lastname}
                                                </TableCell>
                                                <TableCell className="tableCell">{employee.remarks}</TableCell>
                                                <TableCell className="tableCell">{employee.status}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                            <div className="buttons">
                                <Button variant="outlined" color="primary" className="btn" onClick={this.handleSuccessSubmit}>
                                    Select
                                </Button>
                                <Button variant="outlined" color="secondary" className="btn" onClick={this.handleFailureSubmit}>
                                    Reject
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div >
        );
    }
}

export default SimpleModal;
