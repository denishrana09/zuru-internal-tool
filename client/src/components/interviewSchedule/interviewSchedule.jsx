import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SimpleModal from '../statusModal/statusModal';
import { getCandidates } from '../../services/candidate';
import './interviewSchedule.css';

class Interviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: [],
    };
    this.handleCandidate = this.handleCandidate.bind(this);
  }

  componentWillMount() {
    getCandidates(this.handleCandidate);
  }

  handleCandidate(candidate) {
    this.setState({
      candidates: candidate,
    });
  }

  render() {
    const { candidates } = this.state;

    return (
      <div>
        <Paper>
          <div>
            <div className="tableWrapper">
              <Table className="interviewTable">
                <TableHead>
                  <TableRow>
                    <TableCell className="tableHeader">
Sr No.
                    </TableCell>
                    <TableCell className="tableHeader">
                                            Candidate Name
                    </TableCell>
                    <TableCell className="tableHeader">
                                            Post Applied For
                    </TableCell>
                    <TableCell className="tableHeader">
Experience
                    </TableCell>
                    <TableCell className="tableHeader">
Date
                    </TableCell>
                    <TableCell className="tableHeader">
Time
                    </TableCell>
                    <TableCell className="tableHeader">
Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {candidates.map(candidate => (
                    <TableRow
                      key={candidate.candidateId}
                      className="tableCell"
                    >
                      <TableCell>
                        {candidate.candidateId}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {candidate.firstname}
                        {' '}
                        {candidate.lastname}
                      </TableCell>
                      <TableCell>
                        {candidate.designationName}
                      </TableCell>
                      <TableCell>
                        {candidate.experience}
                      </TableCell>
                      <TableCell>
                        {new Date(candidate.interviewDatetime).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(candidate.interviewDatetime).toLocaleTimeString()}
                      </TableCell>
                      <TableCell>
                        <a>
                          <SimpleModal id={candidate.candidateId} resume={candidate.resumeUrl} />
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default Interviews;
