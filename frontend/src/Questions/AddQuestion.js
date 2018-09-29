import React,{Component} from 'react'
import {withRouter} from 'react-router-dom';
import Cookies from 'universal-cookie';
import logo from './colloquium.svg';
import {Link} from "react-router-dom";

class AddQuestion extends Component{ 
    cookies= new Cookies();
    state={
        isLoggedin:this.props.isLoggedin,
        token:this.props.token,
        askquestion_url:'https://ramyareddy-colloquium.herokuapp.com/forum/api/questions/addquestion/',
        auth_url : 'https://ramyareddy-colloquium.herokuapp.com/api-basictoken-auth/',
        jwt_url : 'https://ramyareddy-colloquium.herokuapp.com/api-jwttoken-auth/',
        // askquestion_url:'http://127.0.0.1:8000/forum/api/questions/addquestion/',
        // auth_url : 'http://127.0.0.1:8000/api-basictoken-auth/',
        // jwt_url : 'http://127.0.0.1:8000/api-jwttoken-auth/',
        title:null,
        description:null,
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

    saveTitle=(event)=>{
        const {target:{value}}=event;
        this.setState({
            title:value
        });
    }

    saveDescription=(event)=>{
        const {target:{value}}=event;
        this.setState({
            description:value
        });
    }

    submit = (e) =>{
        var title=this.state.title;
        var description=this.state.description;
        var data=JSON.stringify({
            title:title,
            description:description,
        })
        console.log(data.title);
        console.log(data.description);
        console.log(data);
        console.log(this.state.askquestion_url);
        fetch(this.state.askquestion_url,{
            method:'POST',
            headers: new Headers({
             'Authorization': 'JWT '+ this.cookies.get('userJwtToken').token, 
             'Content-Type': 'application/json',
             'Accept': 'application/json',
                    }),
            body:data,
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                            
                    var error = new Error(response.statusText);
                    error.response = response;
                    console.log(response.statusText);
                    alert(error,response.statusText);
                    throw error
                  }
            })
        .then(responseJson => {
            this.props.history.push('/forum/templateview');
        })
        .catch(e => {console.log (e);});
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
                </div>
            </nav>
            </div>
            <div class="main">
                <label for="title"><b> Title </b></label>
                <input type="text" onChange={this.saveTitle} placeholder="Enter Title" name="title" required/>
                <br/>
                <label for="description"><b> Description </b></label>
                <textarea rows="20" cols="150" onChange={this.saveDescription} placeholder="Enter Description" name="desc" required/>
                <br/>
                <button type="submit" onClick={this.submit} className={"btn btn-primary"} value="add_question">Add Question</button>
            </div>
        </div>
        )
    }
}

export default withRouter(AddQuestion);