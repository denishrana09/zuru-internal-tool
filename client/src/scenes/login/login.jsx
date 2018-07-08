import React, { Component } from "react";
import { loginAuth } from "../../services/login";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import FormControl from "@material-ui/core/FormControl";
import IconButton from '@material-ui/core/IconButton';
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from "@material-ui/core/TextField";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {validateEmail} from '../../services/validation'; 
import logo from '../../images/zurulogo.png';
import "./login.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            auth: false,
            loading: false,
            emailError:false,
            passwordError: false,
            type: "password",
            showPassword: false,
            role: null,
            open: false,
            vertical: "top",
            horizontal: "center",
            errMsg: ''
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loginCallback = this.loginCallback.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this)
    }

    //validating email
    handleEmailChange(event) {
        if (!validateEmail(event.target.value)) {
            this.setState({
                email: event.target.value,
                emailError: true
            })
        }
        else {
            this.setState({
                email: event.target.value,
                emailError: false
            })
        }
    }

    //password hide/show state change
    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    //callback checking the status of response
    loginCallback(value) {
        if (value.code === 200) {
            this.setState({
                auth: true,
                loading: false,
                role: value.role
            });
        }
        else {
            this.setState({
                auth: false,
                loading: false,
                errors: true,
                open: true,
                errMsg: value.data.message
            });
        }
    }

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    //validating password
    handlePasswordChange(event) {
        if (event.target.value === "") {
            this.setState({
                password: event.target.value,
                passwordError: true
            })
        }
        else {
            this.setState({
                password: event.target.value,
                passwordError: false
            })
        }
    }

    //handling submit and request to auth API
    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            loading: true
        });
        loginAuth(this.state, this.loginCallback);
    }

    render() {
        const { auth } = this.state;
        const { passwordError, emailError } = this.state;
        const { role } = this.state;
        const { errMsg } = this.state
        const { vertical, horizontal, open } = this.state;
        const { loading } = this.state

        if (auth && role === "361958317526614017") {
            return (
                <Redirect
                    to={{
                        pathname: "/adminHome",
                        state: { auth: this.state.auth, role: this.state.role }
                    }}
                />
            );
        }
        else if(auth && role === "361959454258954241"){
            return (
                <Redirect
                    to={{
                        pathname: "/hrHome",
                        state: { auth: this.state.auth, role: this.state.role }
                    }}
                />
            );
        }
        else if(auth && role === "361959476645593089"){
            return (
                <Redirect
                    to={{
                        pathname: "/userHome",
                        state: { auth: this.state.auth, role: this.state.role }
                    }}
                />
            );
        }

        return (
            <div className="container-fluid login">
                <div className="login-container">
                    <div className="container text-center mx-auto my-auto align-middle">
                        <div>
                            <Snackbar
                                anchorOrigin={{ vertical, horizontal }}
                                open={open}
                                ContentProps={{
                                    'aria-describedby': 'message-id',
                                }}
                                message={<span id="message-id">{errMsg}</span>}
                            />
                        </div>
                        <div className="row text-center">
                            <div className="col-md-12 ">
                                <h3> Welcome</h3>
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col-md-12">
                                <img src={logo} alt="logo" className="img-responsive"/>
                            </div>
                        </div>
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
                        <form name="login" id="login" onSubmit={this.handleSubmit}>
                            <div className="row text-center">
                                <div className="col-md-12 login-group">
                                    <TextField
                                        id="email"
                                        label="Email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleEmailChange}
                                        className="textField"
                                        type="email"
                                        margin="normal"
                                        error={(emailError) ? true : false}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row text-center">
                                <div className="col-md-12 login-group">
                                    <FormControl className="login-password" required>
                                        <InputLabel htmlFor="adornment-password" error={(passwordError) ? true : false}  >Password</InputLabel>
                                        <Input
                                            id="adornment-password"
                                            type={this.state.showPassword ? "text" : "password"}
                                            value={this.state.password}
                                            onChange={this.handlePasswordChange}
                                            error={passwordError ? true : false}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="Toggle password visibility"
                                                        onClick={this.handleClickShowPassword}
                                                        onMouseDown={this.handleMouseDownPassword}
                                                    >
                                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 text-center login-btn-cointainer">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disableRipple
                                        className="login-btn"
                                    >
                                        Login
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
