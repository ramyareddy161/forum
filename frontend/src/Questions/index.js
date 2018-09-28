import React,{Component} from 'react';
import {Link} from "react-router-dom";
import Cookies from 'universal-cookie';
import { Button } from 'reactstrap';
import logo from './colloquium.svg';

// import {ButtonToolbar} from 'react-bootstrap';


class Questions extends Component{
    cookies = new Cookies();
    constructor(){
    super();
    this.state={
        // auth_url : 'https://ramyareddy16.herokuapp.com/api-basictoken-auth/',
        // jwt_url : 'https://ramyareddy16.herokuapp.com/api-jwttoken-auth/',
        auth_url : 'http://127.0.0.1:8000/api-basictoken-auth/',
        jwt_url : 'http://127.0.0.1:8000/api-jwttoken-auth/',
        QuestionsList:[],
        search : '',
    }
    }   


    logout = (props) =>
    {
        <a href="/forum/templateview"></a>
        // this.cookies.remove('userJwtToken');
        // this.cookies.remove('username');
        // console.log(this.cookies.get('userJwtToken'));
        // this.props.updateUsername('');
        // this.props.updateStatus(false);
        // this.setState(prev => ( {buttonName : 'Login'}));
    }
    
    componentDidMount() {
        fetch('http://127.0.0.1:8000/forum/api/questions/', {
                method: 'get', 
               
                }).then(function(response) {
                    return response.json();
                })
                .then((myJson) => {
                    this.setState(prev => ( {QuestionsList : myJson}));
                })
                .catch(e => {console.log("Error occured in fetching..")});
    }

    updateSearch(event){
        this.setState({search:event.target.value.substr(0,20)});
    }
    
    render(){
        let filteredQuestions = this.state.QuestionsList.filter(
            (currentObj)=>{
                return currentObj.title.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1;
            }
        );
        return(
            <div>
                <div>
                <nav className="navbar navbar-inverse" style={{backgroundcolor: "darkred",fontSize:'25px'}}>
                    <div className="container-fluid">
                    <div className="navbar-header">
                        <img style={{float:"left",align: "left",padding: "10px"}} src={logo} alt="logo" className={"App-logo"} />
                        <Link style={{fontSize:'25px'}} className="navbar-brand" to={'/forum/templateview'}>COLLOQUIUM</Link>
                        <input type="text" style={{width:"40%"}} className="form-control" placeholder="&#xF002; Search...." 
                        value={this.state.search} name=" search" onChange={this.updateSearch.bind(this)}/>
                    </div>
        
                    <ul className="nav navbar-nav navbar-right">
                    <li><Link to={'/forum/templateview/addquestion'}><span className="glyphicon glyphicon-plus"></span>Add Question</Link></li>
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

                <div class="sidebar">
                    <Link to={'/forum/templateview'}><i class="fa fa-fw fa-home"></i> All Questions </Link>
                    <a href="/forum/users"><i class="fa fa-fw fa-user"></i> Users </a>
                </div>

                <div className="main" align= "center" style={{width:"15%"}}>
                <h2 > Questions List </h2>
                </div>
                <br/>
                <br/>
                {filteredQuestions.map((currentObj) =>
                    <div className="card bg-light"  style={{border:"1px groove",width:"50%",height:"200px",position:'relative'}}>
                        <div className = "card-body">
                        <p className="card-title" align="left"><h3><Link  to={'/forum/templateview/questions/'+currentObj.id +'/'}>{currentObj.title}</Link></h3></p>
                        <p className="card-text" align="left">{currentObj.description}</p>
                        <h5 className="card-footer" style={{position:'absolute',bottom:'0',right:'1px'}}>
                        Asked By : {currentObj.user_profile.user.first_name} </h5>
                        </div>
                    </div>
                    )
                }
                
            </div>
        );
        }
    }

export default Questions;