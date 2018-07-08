import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import TabContainer from '../../components/tabContainer/tabContainer';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Header from '../../components/header/header';
import AddCandidate from '../../components/addCandidate/addCandidate';
import Employee from '../../components/employee/employeeDir';
import Interviews from '../../components/interviewSchedule/interviewSchedule';
import InterviewDetails from '../../components/interviewDetails/interviewDetails';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabValue: 0
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillMount() {
        if (this.props.location.state !== undefined) {
            this.setState({
                auth: this.props.location.state.auth,
                role: this.props.location.state.role
            })
        }
    }

    handleChange = (event, value) => {
        this.setState({ tabValue: value });
    };

    render() {
        const { tabValue } = this.state
        const { auth } = this.state
        const { role } = this.state

        if (!auth || role !== "361959454258954241") {
            return <Redirect to='/' />
        }
        return (
            <div>
                <Header />
                <div className="container-fluid text-center bg-light">
                    <div className="row">
                        <div className="col-md-12 col-xs-12 text-center">
                            <AppBar position="static" color="default" className="" >
                                <Tabs value={this.state.tabValue} onChange={this.handleChange}
                                    indicatorColor="primary"
                                    textColor="primary" centered>
                                    <Tab className="appBarTab" label="Employee Directory" />
                                    <Tab className="appBarTab" label="Add Candidate" />
                                    <Tab className="appBarTab" label="Interview Schedules" />
                                </Tabs>
                            </AppBar>
                            {tabValue === 0 && <TabContainer >
                                <Employee />
                            </TabContainer>}
                            {tabValue === 1 && <TabContainer >
                                <AddCandidate />
                            </TabContainer>}
                            {tabValue === 2 && <TabContainer >
                                <Interviews />
                            </TabContainer>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home