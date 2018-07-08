import React, { Component } from 'react';
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import { getCandidateExpertiseById, updateReviewStatus } from '../../services/candidate';
class DecisionModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            expertises: [],
            id: props.id,
            resume: props.resume,
            status: 'pending',
            remark: ''
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCandidateExpertise = this.handleCandidateExpertise.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.handleSuccessSubmit = this.handleSuccessSubmit.bind(this)
        this.handleFailureSubmit = this.handleFailureSubmit.bind(this)
    }

    componentWillMount() {
        getCandidateExpertiseById(this.state.id, this.handleCandidateExpertise);
    }

    handleCandidateExpertise(expertise) {
        console.log(expertise)
        if (expertise) {
            this.setState({
                expertises: expertise
            })
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleSuccessSubmit(event) {
        this.setState({
            status: 'accepted'
        }, () => updateReviewStatus(this.state))

    }

    handleFailureSubmit(event) {
        this.setState({
            status: 'rejected'
        }, () => updateReviewStatus(this.state))
    }

    handleOpen() {
        this.setState({ open: true });
    };

    handleClose() {
        this.setState({ open: false });
    };

    render() {
        const { open, resume } = this.state
        const { expertises } = this.state

        return (

            <div>
                <Button onClick={this.handleOpen} className="statusButton">
                    View Details
        </Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={this.handleClose}
                >
                    <div className="statusModal">
                        <Typography variant="title" id="modal-title" className="tableCell">
                            Expertise
                        </Typography>
                        <div>{
                            expertises.map(expertise =>
                                <Chip key={expertise.id} label={expertise.expertiseField} />
                            )}
                        </div>
                        <Typography variant="title" id="modal-title" className="tableCell">
                            <a href={resume} target="_black">Resume</a>
                        </Typography>
                        <form>
                            <TextField
                                id="multiline-flexible"
                                label="Remarks"
                                multiline
                                rowsMax="4"
                                value={this.state.remark}
                                onChange={this.handleChange("remark")}
                                margin="normal"
                                required
                            />
                            <div className="buttons">
                                <Button variant="outlined" color="primary" className="btn" onClick={this.handleSuccessSubmit}>
                                    Select
                                </Button>
                                <Button variant="outlined" color="secondary" className="btn" onClick={this.handleFailureSubmit}>
                                    Reject
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default DecisionModel;
