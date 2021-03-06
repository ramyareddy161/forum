import React, { Component } from 'react'
import Cookies from 'universal-cookie';
import {Link} from "react-router-dom";
import {Redirect} from 'react-router-dom'
import logo from './colloquium.svg';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


export class Header extends Component{

    cookies = new Cookies();

    state = {
        // auth_url : 'https://ramyareddy16.herokuapp.com/api-basictoken-auth/',
        // jwt_url : 'https://ramyareddy16.herokuapp.com/api-jwttoken-auth/',
        auth_url : 'http://127.0.0.1:8000/api-basictoken-auth/',
        jwt_url : 'http://127.0.0.1:8000/api-jwttoken-auth/',
        buttonName : 'Login'
    }

    logout = (props) =>
    {
        this.cookies.remove('userJwtToken');
        this.cookies.remove('username');
        console.log(this.cookies.get('userJwtToken'));
        this.props.updateUsername('');
        this.props.updateStatus(false);
        this.setState(prev => ( {buttonName : 'Login'}));
    }

    login = (props) =>
    {
        <Redirect to= "/forum/templateview/login"/>
    }
    
    render(){
        return (
                <div >
                    {/* className={"App-header"} */}
                
{/* <img style={{float:"left",align: "left",padding: "10px"}} src={logo} alt="logo" className={"App-logo"} />
                    <h2 style={{float:"left",align: "left",padding: "10px"}} className={"App-name"}>
                    { this.props.isAuthenticated ? "Welcome to "+ this.props.title + " , " + this.props.username 
                    : "Explore Here At - " + this.props.title  } </h2>
                    {this.props.isAuthenticated ? <div style={{float:"right",align: "right",padding: "0 10px"}}><button className={"btn btn-primary login-button"}
                             onClick={
                                    this.props.isAuthenticated?
                                    this.logout : this.login
                                }
                             >
                            { this.props.isAuthenticated? "Logout" : "Login Page"}
                        </button></div>
                    : <div></div>} */}
                </div>
        )
    }
}
