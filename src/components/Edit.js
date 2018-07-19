import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {updateReminder} from './store/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

export class Edit2 extends Component {
         constructor(props){
       super(props);
       this.state={
           title:this.props.reminder.title,
           remindDate:this.props.reminder.remindAt,
           message:this.props.reminder.message,
           id:this.props.reminder.id,
           userId:this.props.reminder.userId,
           send:false,
           open: false,
           titleError:"",
           remindDateError:"",
           messageError:"",
           update:false
       }
       this.changeTitle=this.changeTitle.bind(this);
       this.changeRemindDate=this.changeRemindDate.bind(this);
       this.changeMessage=this.changeMessage.bind(this);
       this.addArticle=this.addArticle.bind(this);
       this.validation = this.validation.bind(this);
       this.titleValid=this.titleValid.bind(this);
       this.remindDateValid=this.remindDateValid.bind(this);
       this.messageValid=this.messageValid.bind(this);
       this.changeSend=this.changeSend.bind(this);
       this.backClick=this.backClick.bind(this);
   }
    backClick(){
        this.setState({open:!this.state.open})
    }
   
    addArticle(e){
        e.preventDefault();
        this.setState({open:!this.state.open})
        
    }
   changeTitle(e){
       this.setState({
           title:e.target.value
       })
   }
   changeRemindDate(e){
       this.setState({
           remindDate:e.target.value
       })
   }
   changeMessage(e){
        this.setState({
           message:e.target.value
       })
    }
    changeSend(){
        this.setState({
           send:!this.state.send
       })
    }
    validation(){ 
    return this.titleValid(this.state.title) && this.remindDateValid(this.state.remindDate) && this.messageValid(this.state.message) ;
        
}
    titleValid(title){
        var titleError="";
        if(title === "" ){
            titleError="Can't be empty";
            this.setState({titleError:titleError});
            return false
        }
        this.setState({titleError:titleError});
        return true;
    }
    remindDateValid(remindDate){
        var remindDateError="";
        if(remindDate === "" ){
            remindDateError="Can't be empty";
            this.setState({remindDateError:remindDateError});
            return false
        }
        this.setState({remindDateError:remindDateError});
        return true;
    }
    messageValid(message){
        var messageError="";
        if(message === "" ){
            messageError="Can't be empty";
            this.setState({messageError:messageError});
            return false
        }
        this.setState({messageError:messageError});
        return true;
    }
  render() {
      if(!this.state.userId){
            return (<div className="container">
                        <div className="column">
                            <h2>Please Login</h2>
                            <Link to="/Login">
                                <button className="button">Login</button>
                            </Link>
                         </div> 
                    </div>
                   );
        }
    return (
    <div className="containerEdit">
        <div className="column">
            <h2>Edit reminder</h2>
             <Link to="/ReminderList">
                <p  className="back">Back</p>
            </Link>
                <form className="editReminder">
                    {(this.titleValid)?<span className="error">{this.state.titleError}</span>: null}
                    <input 
                        type="text" 
                        value={this.state.title} 
                        placeholder="Title" 
                        onChange={this.changeTitle}/>
                    {(this.remindDateValid)?<span className="error">{this.state.remindDateError}</span>: null}
                    <input 
                        type="date" 
                        value={this.state.remindDate} 
                        placeholder="remindDate" 
                        onChange={this.changeRemindDate}/>
                    {(this.messageValid)?<span className="error">{this.state.messageError}</span>: null}
                    <textarea  
                        placeholder="message" 
                        value={this.state.message} 
                        onChange={this.changeMessage}/>
                        <label><input type="checkbox"   />Do you want to send the reminder email?</label>
                    <Link to='/ReminderList'><button  onClick={(e)=>{
                        if(this.validation()=== true){this.props.updateReminder(this.state.id,this.state.title,this.state.message,this.state.remindDate,this.state.send,this.state.userId);
                            this.setState({title:"", 
                                   message:"",
                                   remindDate:"",
                                   send:false,
                                   open:false})}else return}}>Ok</button> </Link>
                </form>
                            
        </div>
    </div>
        
    );
  }
}
                        
                            
const MapStateToProps=(state)=>{
    return {
        reminder:state.editReducer
    }
}
const matchDispatchToProps = (dispatch) =>{
    return{
        updateReminder:bindActionCreators(updateReminder,dispatch)  
    }
}
export const Edit= connect(MapStateToProps,matchDispatchToProps)(Edit2);

