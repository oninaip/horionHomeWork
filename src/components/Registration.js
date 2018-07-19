import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import is from 'is_js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addUser} from './store/actions';

class Registration2 extends Component {

constructor(props){
        super(props);
        this.state={
            nameValue:"",
            emailValue: "",
            passwordValue :"",
            emailError:"",
            nameError:"",
            passwordError:"",
            clickButton:false
        }
        this.nameInput=this.nameInput.bind(this);
        this.emailInput=this.emailInput.bind(this);
        this.passwordInput=this.passwordInput.bind(this);
        this.onClickButton=this.onClickButton.bind(this);
        this.emailValid=this.emailValid.bind(this);
        this.nameValid=this.nameValid.bind(this);
        this.formValid=this.formValid.bind(this);
        this.passwordValid=this.passwordValid.bind(this);     
    }
    nameInput(e){
        this.setState({nameValue:e.target.value});
    }
    
    emailInput(e){
         this.setState({emailValue:e.target.value})
    }
    
    passwordInput(e){
         this.setState({passwordValue:e.target.value})
    }
    
    onClickButton(e){
        if (!this.formValid()){ return e.preventDefault();}
        else{
            this.props.addUser(this.state.nameValue,this.state.emailValue,this.state.passwordValue);
            this.setState({clickButton:!this.state.clickButton})
        };
        
    }
    formValid(){
        return  this.nameValid(this.state.nameValue) && 
             this.emailValid(this.state.emailValue) && this.passwordValid(this.state.passwordValue);
    }
   
    nameValid(name){
        var searchName= this.props.user.filter(word=>word.name.includes(name));
        var sName="";
        searchName.forEach(user=>{sName=user.name});
        var nameError="";
        if(name === ''){
           nameError='Can not be empty';
            this.setState({nameError:nameError});
            return false;
           }else if(name.length<3){
                   nameError='Must be more 3 letters';
                    this.setState({nameError:nameError});
                    return false;
               }else if(name === "Name"){
                    nameError='Must be your name';
                    this.setState({nameError:nameError});
                    return false;
               }else if(name === sName){
                    nameError='This Name is already in use';
                    this.setState({nameError:nameError});
                    return false;
               }
                else{
                   this.setState({nameError:nameError});
                   return true;
               } 
           }
   

    emailValid(email){
        var emailError="";
        if(email === ''){
           emailError='Can not be empty';
            this.setState({emailError:emailError});
            return false;
           }else if(!is.email(email)){
                   emailError='Must be email';
                    this.setState({emailError:emailError});
               return false;
               }else{
                   this.setState({emailError:emailError});
                   return true;
               } 
           }
     passwordValid(password){
        var passwordError="";
        if(password === ''){
           passwordError='Can not be empty';
            this.setState({passwordError:passwordError});
            return false;
           }else{
                   this.setState({passwordError:passwordError});
                   return true;
               } 
           }
    
    
  render() {
    if(this.state.clickButton === false ){
    return (
        <div className="container">
            <form >        
                {this.nameValid? <span className="error">{this.state.nameError}</span> :  null  }
                <input  type="text" 
                        placeholder="Your Name" 
                        name="name" 
                        value={this.state.nameValue} 
                        onChange={this.nameInput} />

                {this.emailValid ?   <span className="error">{this.state.emailError}</span>:   null }

                <input  type="text" 
                        placeholder="Email Address" 
                        name="email" 
                        value={this.state.emailValue} 
                        onChange={this.emailInput} />

                {this.passwordValid? <span className="error">{this.state.passwordError}</span> :  null  }
                <input  type="password" 
                        placeholder="password" 
                        name="password" 
                        value={this.state.passwordValue} 
                        onChange={this.passwordInput} />

                <button type="button" onClick={this.onClickButton}>Ok</button>
            </form>
        
        <Link to="/">
            <p  className="back">Back</p>
        </Link>
    </div>
        
    );}
      else{
          return(
              <div className="container">
                    <div className="column">
                      <h2>Thank You!</h2>
                          <Link to="/Login">
                             <button className="button" onClick={this.clickLog}>Login</button>
                          </Link>
                          <Link to="/">
                             <p  className="back">Back</p>
                          </Link>
                  </div>
              </div>
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
        addUser:bindActionCreators(addUser,dispatch)
    }
}
export const Registration= connect(MapStateToProps,matchDispatchToProps)(Registration2);

