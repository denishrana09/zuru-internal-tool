import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import TabContainer from '../../components/tabContainer/tabContainer';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddEmployee from '../../components/addEmplyee/addEmployee';
import Employee from '../../components/employee/employeeDir';
import Header from '../../components/header/header'
import Interviews from '../../components/interviewSchedule/interviewSchedule';
import './adminHome.css';
import 'typeface-roboto';


class adminHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: false,
            role: '',
            tabValue: 0
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (event, value) => {
        this.setState({ tabValue: value });
    };

    componentWillMount() {
        if (this.props.location.state !== undefined) {
            this.setState({
                auth: this.props.location.state.auth,
                role: this.props.location.state.role
            })
        }
    }

    render() {

        const { tabValue } = this.state;
        const { auth } = this.state
        const { role } = this.state

        if (!auth || role !== "361958317526614017") {
            return <Redirect to='/' />
        }

        return (
            <div>
                <Header />
                <div className="container-fluid text-center bg-light">
                    <div className="row">
                        <div className="col-md-12 col-xs-12 text-center">
                            <div className="itemTabs">
                                <AppBar position="static" color="default" className="" >
                                    <Tabs value={this.state.tabValue} onChange={this.handleChange}
                                        indicatorColor="primary"
                                        textColor="primary" centered>
                                        <Tab className="appBarTab" label="Employee Directory" />
                                        <Tab className="appBarTab" label="Interview Schedules" />
                                        <Tab className="appBarTab" label="Add New Employee" />
                                    </Tabs>
                                </AppBar>
                                {tabValue === 0 && <TabContainer >
                                    <Employee />
                                </TabContainer>}
                                {tabValue === 1 && <TabContainer >
                                    <Interviews />
                                </TabContainer>}
                                {tabValue === 2 && <TabContainer >
                                    <AddEmployee />
                                </TabContainer>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
            ;
    }
}

export default adminHome