import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import pic1 from '../../images/pic1.jpg';

const DataTable = ({profile}) =>
    <Paper>
        <div>
            <div className="tableWrapper">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="tableHeader">
                                Avtar
                            </TableCell>
                            <TableCell className="tableHeader">
                                Name
                            </TableCell>
                            <TableCell className="tableHeader">
                                Code
                            </TableCell>
                            <TableCell className="tableHeader">
                                Role
                            </TableCell>
                            <TableCell className="tableHeader">
                                Experience
                                {' '}
                            </TableCell>
                            <TableCell className="tableHeader">
                                Email
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {profile.map(emp => (
                            <TableRow key={emp.employeeId} className="tableCell">
                                <TableCell>
                                    <Avatar
                                        alt="Adelle Charles"
                                        src={pic1}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {emp.firstname} {emp.lastname}
                                </TableCell>
                                <TableCell>{emp.code}</TableCell>
                                <TableCell>{emp.role}</TableCell>
                                <TableCell>{emp.experience} yr</TableCell>
                                <TableCell>{emp.email}</TableCell>
                            </TableRow>
                        )
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    </Paper>


export default  DataTable
