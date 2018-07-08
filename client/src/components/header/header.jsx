import React, { Component } from 'react';
import logo from '../../images/zurulogo.png';
import user from '../../images/pic2.jpg';
import logout from '../../images/logout.png';
import './header.css';
import {getEmployeeById} from '../../services/employee';
import { Redirect } from "react-router-dom";


class Header extends Component {
    constructor(props){
        super(props);
            this.state = {
                firstname : '',
                lastname: '',
                employeeId: '',
                employeeData: []
            };
        this.handleEmployees = this.handleEmployees.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    componentWillMount()
    {
        getEmployeeById(this.handleEmployees);
    }

    handleEmployees(data){
         this.setState({
            employeeData: data
        })
    }

    handleLogOut(){
        localStorage.clear();
        this.setState({
            state: ''
        })
        console.log('mystate', this.state)
    }

    render() {
        const {employeeData} = this.state;

        if(localStorage.length === 0)
        {
            return (
                <Redirect
                    to={{
                        pathname: "/",
                        state: { auth: '', role: '' }
                    }}
                />
            );
        }

        return (

            <div className="container-fluid">
                <div className="row bgHeader">
                    <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6">
                        <div className="companyLogo">
                            <img className="logoImage text-center" src={logo} alt="zurulogo"/>
                        </div>
                    </div>
                    <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6 loggedInUserOuter">
                        <label id="loggedUser"
                        > {employeeData.firstname + ' ' + employeeData.lastname} <a onClick={this.handleLogOut} > <img src={logout} alt="logout" className="logout"  /> </a> </label>
                        <div className="loggedInUser">
                            <img src={user} alt="username" className="loggedInUserPhoto" />
                        </div>
                    </div>
                </div>
            </div>


    );
  }
}
export default Header;
