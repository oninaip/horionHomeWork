import React from 'react';
import {getReminder,deleteReminder,editReminder} from './store/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';

class Reminder2 extends React.Component{
  
    constructor(props){
       super(props);
       this.state={
           title:this.props.data.title,
           remindDate:this.props.data.remindAt,
           message:this.props.data.message,
           send:false,
           open: false,
           titleError:"",
           remindDateError:"",
           messageError:"",
           update:false,
           onClick:false,
            editClick:false
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

handleClick(){ 
    this.setState({onClick:!this.state.onClick})
}
deleteReminder(){
    this.setState({deleteClick:!this.state.deleteClick});
    
}
editReminder(){
    this.setState({editClick:!this.state.editClick})
}
    render(){
        
            return(
                    <div className="reminder">
                        <div className="reminderList" onClick={this.handleClick.bind(this)}>
                            {this.props.data.title}
                        </div>
                            {(this.state.onClick)?
                                <div className="reminderText">
                                    <div className="close">
                                        <button type="button" onClick={this.handleClick.bind(this)}>&times;</button>
                                    </div>
                                    <h3>{this.props.data.title}</h3>
                                    <div className="delEdit">
                                        <p onClick={()=>this.props.deleteReminder(this.props.data.id)}>delete</p>
                                        <Link to='/Edit' onClick={()=>this.props.editReminder(this.props.data.id,this.props.data.title,this.props.data.message,this.props.data.remindAt,this.props.data.emailSend,this.props.data.userId)}><p>edit</p></Link>
                                    </div>
                                    <div className="created">                       
                                        {this.props.data.created.substr(0,10)}
                                    </div>
                                    <div className="message">       
                                        {this.props.data.remindAt+ " "}
                                        {this.props.data.message}
                                    </div>
                                    
                                </div>:null
                            } 
                           
                    </div>
                );
        }    
}
                            
                            
const MapStateToProps=(state)=>{
    return {
        user:state.reminderReducer
    }
}
const matchDispatchToProps = (dispatch) =>{
    return{
        getReminder:bindActionCreators(getReminder,dispatch),
        deleteReminder:bindActionCreators(deleteReminder,dispatch),
        editReminder:bindActionCreators(editReminder,dispatch)
    }
}
export const Reminder= connect(MapStateToProps,matchDispatchToProps)(Reminder2);