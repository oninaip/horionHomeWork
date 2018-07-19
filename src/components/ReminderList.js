import React from 'react';
import {getReminder,addReminder} from './store/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {Reminder} from './Reminder'

class ReminderList2 extends React.Component{
     constructor(props){
       super(props);
       this.state={
           title:"",
           remindDate:"",
           message:"",
           send:false,
           open: false,
           titleError:"",
           remindDateError:"",
           messageError:"",
           update:false,
           filterDate:"",
           userRem:false
           
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
       this.changeFilterDate=this.changeFilterDate.bind(this);
       this.clickFilter=this.clickFilter.bind(this);
       this.seeAll=this.seeAll.bind(this);
   }
    backClick(){
        this.setState({open:!this.state.open})
    }
   seeAll(){
       this.setState({
          userRem: false
       })
       
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
    changeFilterDate(e){
         this.setState({
           filterDate:e.target.value
       })
    }
    clickFilter(){
        this.setState({
        userRem:true
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
    
    render(){
        var userRem=this.props.reminder.filter(rem => rem.userId===this.props.userId);
        var userRemFilter=this.props.reminder.filter(rem => rem.userId===this.props.userId && rem.remindAt===this.state.filterDate);
        if(!this.props.userId){
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
            
                   <div className="container">
                    <div className="reminderList">
                         {(this.state.open)? 
                        <div><h2>Add new reminder </h2>
                                <p  className="back" onClick={this.backClick}>Back</p>
                                <form className="newReminder">

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
                                        <label>
                                            <input type="checkbox" 
                                                    value={this.state.send}  
                                                    onChange={this.changeSend}/>Do you want to send the reminder email?
                                        </label>
                                    <button  onClick={(e)=>{
                                        if(this.validation()=== true){this.props.addReminder(this.state.title,this.state.message,this.state.remindDate,this.state.send,this.props.userId);
                                            this.setState({title:"", 
                                                   message:"",
                                                   remindDate:"",
                                                   send:false,
                                                   open:false})}else return}}>Ok</button> 
                                    </form>
                                </div> : <div className="column">
                                            <div className="remList">
                                                <h2>My reminder list</h2> 
                                                    <div className="filt">
                                                        <div>
                                                            <p>filter by date:</p>
                                                            <p className="seeAll" onClick={this.seeAll}>See all</p>
                                                        </div>
                                                        <div>
                                                            <input type="date" onChange={this.changeFilterDate} value={this.state.filterDate}/>
                                                            <input type="button" value="ok" onClick={this.clickFilter}/>
                                                        </div>
                                                    </div>
                                            </div>
                                            <div className="list">
                                                {(this.state.userRem)? userRemFilter.map((rem)=>{
                                                return <Reminder data={rem} key={rem.id} />}):
                                                 userRem.map((rem)=>{
                                                return <Reminder data={rem} key={rem.id} /> } )}
                                            </div>
                                            <Link to="/">
                                                <p onClick={this.clickReg} className="back">LogOut</p>
                                            </Link>
                                            <button className="button" onClick={this.addArticle}>Add new reminder</button>
                                        </div> }
                    </div>
                        
            </div>
        );

    }
    

}
                            
const MapStateToProps=(state)=>{
    return {
        reminder:state.reminderReducer,
        userId:state.loginReducer
    }
}
const matchDispatchToProps = (dispatch) =>{
    return{
        getReminder:bindActionCreators(getReminder,dispatch),
        addReminder:bindActionCreators(addReminder,dispatch)
    }
}
export const ReminderList= connect(MapStateToProps,matchDispatchToProps)(ReminderList2);



