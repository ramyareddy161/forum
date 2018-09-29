import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import AddAnswer from './AddAnswer';
import logo from './colloquium.svg';
import Cookies from 'universal-cookie';
import {Link} from "react-router-dom";

class Answers extends Component{
    cookies = new Cookies();
    state={
        isAuthenticated:this.props.isAuthenticated,
        answersList:[],
        questionsList:[],
        question_title : "",
        question_description : "",
        first_name :"",
        // auth_url : 'http://127.0.0.1:8000/api-basictoken-auth/',
        // jwt_url : 'http://127.0.0.1:8000/api-jwttoken-auth/',
        auth_url : 'https://ramyareddy-colloquium.herokuapp.com/api-basictoken-auth/',
        jwt_url : 'https://ramyareddy-colloquium.herokuapp.com/api-jwttoken-auth/',
    }

    componentDidMount(){
        fetch('https://ramyareddy-colloquium.herokuapp.com/forum/api/questions/'+this.props.match.params.id+'/')
        .then(response => response.json())
        .then(responseJson => {
            this.setState({answersList:responseJson});
        })
        .catch (e => {
            console.log(e);
            console.log("Error occured in second catch");
        });
        fetch('https://ramyareddy-colloquium.herokuapp.com/forum/api/questions/', {
                method: 'get', 
                }).then(function(response) {
                    return response.json();
                })
                .then((myJson) => {
                    this.setState(prev => ( {questionsList: myJson}));
                    console.log(this.state.questionsList);
                    this.setState({
                        question_title:this.state.questionsList[(this.props.match.params.id)-1].title,            
                        question_description:this.state.questionsList[(this.props.match.params.id)-1].description,
                        first_name:this.state.questionsList[(this.props.match.params.id)-1].user_profile.user.first_name,
                    });
                })
                .catch(e => {console.log("Error occured in fetching..")});
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
    

    render(){
        return(
            <div>
             <div class="sidebar">
                <Link to={'/forum/templateview'}><i class="fa fa-fw fa-home"></i> All Questions </Link>
                <Link to={'/forum/users'}><i class="fa fa-fw fa-user"></i> Users </Link>
            </div>
            <div>
            <nav className="navbar navbar-inverse" style={{backgroundcolor: "darkred",fontSize:'25px'}}>
                <div className="container-fluid">
                <div className="navbar-header">
                    <img style={{float:"left",align: "left",padding: "10px"}} src={logo} alt="logo" className={"App-logo"} />
                    <Link style={{fontSize:'25px'}} className="navbar-brand" to={'/forum/templateview'}>COLLOQUIUM</Link>
                </div>
    
                <ul className="nav navbar-nav navbar-right">
                {this.props.isAuthenticated?<div></div>:
                <li><Link to={'/forum/templateview/register'}><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>}
                {this.props.isAuthenticated?<li><a href='/forum/templateview'><span className="glyphicon glyphicon-log-in"></span> Logout</a>
                    {/* <button 
                         onClick={
                                this.props.isAuthenticated?
                                this.logout : this.login
                            }
                         >
                        { this.props.isAuthenticated? "Logout" : "Login Page"}
                    </button> */}
                    </li>:
                <li><Link to={'/forum/templateview/login'}><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>}
                </ul>
                </div>
            </nav>
            </div>

            <div className = "answer main" align="left">
                <div style={{position:'relative',}}>
                <h1>{this.state.question_title}</h1>
                <hr/>
                <p> {this.state.question_description} <br/> </p>
                <h5 style={{position:'absolute',bottom:'0',right:'10px'}}>
                        Asked By : {this.state.first_name}</h5>
                <br/><br/></div><br/>
                <strong>Answer</strong> <hr/>
                {this.state.answersList.map((current)=>
                <div>
                    <div style={{position:'relative',}}>
                    <p> {current.description} <br/> </p>
                    <h5 style={{position:'absolute',bottom:'0',right:'10px'}}>
                        Answered By : {current.user_profile.user.first_name}</h5>
                    <br/><br/></div><br/>
                    <strong>Answer</strong> <hr/>
                </div>
                )}
                <AddAnswer isLoggedIn={this.state.isAuthenticated}/>
                }
            </div>
            </div>
        );
        }
    }

export default Answers;
