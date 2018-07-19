import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {ReminderList} from './ReminderList';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginUser} from './store/actions';

class Login2 extends Component {
 
constructor(props){
        super(props);
        this.state={
            nameValue:"",
            passwordValue :"",
            nameError:"",
            passwordError:"",
            clickButton:false
        }
        this.nameInput=this.nameInput.bind(this);
        this.passwordInput=this.passwordInput.bind(this);
        this.onClickButton=this.onClickButton.bind(this);
        this.nameValid=this.nameValid.bind(this);
        this.formValid=this.formValid.bind(this);
        
    }
    nameInput(e){
        this.setState({nameValue:e.target.value});
    }
    
    passwordInput(e){
         this.setState({passwordValue:e.target.value})
    }
    
    onClickButton(e){
        e.preventDefault();
        this.setState({nameError:"",
                       passwordError:""});
        if (!this.formValid()){return }
        else{
             this.setState({clickButton:!this.state.clickButton});
        };  
    }
    formValid(){
        return  this.nameValid(this.state.nameValue,this.state.passwordValue) ;
    }
   
    nameValid(name,password){
        var searchName= this.props.user.filter(word=>word.name.includes(name));
        var nameError="";
        var sName="";
        var userId="";
        searchName.forEach(user=>{sName=user.name; userId=user.id});
        var userIdpass ="";
        var searchPass= this.props.user.filter(word=>word.password.includes(password));
        searchPass.forEach(user=>{userIdpass=user.id});
        var passwordError="";
  
        if(name === ''){
           nameError='Can not be empty';
            this.setState({nameError:nameError});
            return false;
        }else if(name!==sName){
                    nameError='User not exist';
                    this.setState({nameError:nameError});
                    return false;
        }else if(name === "Name"){
                    nameError='Must be your name';
                    this.setState({nameError:nameError});
                    return false;
        }else if(password === ''){
                    passwordError='Can not be empty';
                    this.setState({passwordError:passwordError});
                    return false;
        }else if(userIdpass !== userId){
                    passwordError='Incorrect password';
                    this.setState({passwordError:passwordError});
                    return false;
        }else{  this.setState({nameError:nameError,
                                      passwordError:passwordError});
                            this.props.loginUser(userId);
                           return true;
                       }
    }
   
    
  render() {
    if(this.state.clickButton === false ){
    return (
    <div className="container">
        <form>
            {this.nameValid? <span className="error">{this.state.nameError}</span> :  null  }
            <input type="text" 
                    placeholder="Your Name" 
                    name="name" 
                    value={this.state.nameValue} 
                    onChange={this.nameInput} />
            {this.passwordValid? <span className="error">{this.state.passwordError}</span> :  null  }
            <input type="password" 
                    placeholder="password" 
                    name="password" 
                    value={this.state.passwordValue} 
                    onChange={this.passwordInput} />
            <button type="submit" onClick={this.onClickButton}>Login</button>
        </form>
        
        <Link to="/">
            <p  className="back">Back</p>
        </Link>
    </div>
        
    );}
      else{
          return(
              <ReminderList userId={this.props.loginUser.uderId} />
          );
      }
  }
}
const MapStateToProps=(state)=>{
    return {
        user:state.userReducer
    }
}
const matchDispatchToProps = (dispatch) =>{
    return{
        loginUser:bindActionCreators(loginUser,dispatch)
    }
}
export  const Login= connect(MapStateToProps,matchDispatchToProps)(Login2);
