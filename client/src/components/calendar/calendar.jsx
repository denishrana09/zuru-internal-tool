import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import querystring from 'query-string';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Header from '../header/header'
import { reactLocalStorage } from 'reactjs-localstorage';
import { getCandidateDataById } from '../../services/candidate';
import { sendCode } from '../../services/calendar';
import { setEvent } from '../../services/calendar';
import './calendar.css';

class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            code: '',
            loading: false,
            open: false,
            vertical: "top",
            horizontal: "center",
            errMsg: '',
            datetime: '',
            candidate: null,
            id: '',
            setEvent: false
        }
        this.handleToken = this.handleToken.bind(this)
        this.handleDateTime = this.handleDateTime.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCandidate = this.handleCandidate.bind(this)
        this.handleSetEvent = this.handleSetEvent.bind(this)
    }

    componentWillMount() {
        this.setState({
            id: reactLocalStorage.getObject("candidate", {'id': 'id'}).id
        }, () => {
            getCandidateDataById(this.state.id, this.handleCandidate)
        })
    }


  // Calender set event callback
  handleSetEvent(response) {
      console.log(response)
    if (response.status === 200) {
      this.setState({
        setEvent: true,
      });
    } else {
      this.setState({
        setEvent: false,
      });
    }
  }

  // Submitiing the interview date
  handleSubmit(event) {
    event.preventDefault();
    setEvent(this.state.candidate, this.state.datetime, this.handleSetEvent);
  }

  // handlig candidate date
  handleCandidate(candidate) {
    this.setState({
      candidate,
    });
    reactLocalStorage.setObject('candidate', { id: '' });
  }

  // response after event set
  handleToken(response) {
    console.log('hello')
  }

  // handling datetime changes
  handleDateTime(event) {
    this.setState({
      datetime: event.target.value,
    });
  }

  componentDidMount() {
    const code = querystring.parse(this.props.location.search).code;
    this.setState({
      code,
    }, () => sendCode(this.state.code, this.handleToken));
  }

  render() {
    const {
      loading, open, vertical, horizontal, errMsg,
    } = this.state;
    const { datetime, setEvent } = this.state;
    const { candidate } = this.state;

    if (setEvent) {
      return <Redirect to="/hrHome" />;
    }

        return (
            (!!candidate) ? (
                <div>
                    <Header/>
                    <div className="container-fluid calendar">
                        <div className="calendar-container">
                            <div className="container text-center mx-auto my-auto align-middle">
                                <div>
                                    <Snackbar
                                        anchorOrigin={{vertical, horizontal}}
                                        open={open}
                                        ContentProps={{
                                            'aria-describedby': 'message-id',
                                        }}
                                        message={<span id="message-id">{errMsg}</span>}
                                    />
                                </div>
                                <div className="tableWrapper">
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="tableCell">Id</TableCell>
                                                <TableCell className="tableCell">{candidate.candidateId}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="tableCell">Name</TableCell>
                                                <TableCell
                                                    className="tableCell"
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {candidate.firstname} {candidate.lastname}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="tableCell">Email</TableCell>
                                                <TableCell className="tableCell">{candidate.email}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="tableCell">Position</TableCell>
                                                <TableCell className="tableCell">{candidate.designationName}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="tableCell">Experience</TableCell>
                                                <TableCell className="tableCell">{candidate.experience} yr</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                                <form name="login" id="login" onSubmit={this.handleSubmit}>
                                    <TextField
                                        id="datetime-local"
                                        label="Schedule Interview On"
                                        className="date tableCell"
                                        type="datetime-local"
                                        value={datetime}
                                        onChange={this.handleDateTime}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                    <div className="row">
                                        <div className="col-md-12 text-center calendar-btn-container">
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                disableRipple
                                                className="calendar-btn"
                                            >
                                                Schedule Interview
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                </div>
                    ) : (
                    <div>
                        <Fade
                            in={loading}
                            style={{
                                transitionDelay: loading ? '800ms' : '0ms',
                            }}
                            unmountOnExit
                        >
                            <CircularProgress />
                        </Fade>
                    </div>
                    )
                    )
                    }
                    }

export default Calendar;
