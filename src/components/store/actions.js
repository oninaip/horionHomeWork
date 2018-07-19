export function getReminder(id){
    return{
        type:"GET_REMINDER",
        payload: id
    }
}

export function deleteReminder(id){
    return{
        type:"DELETE_REMINDER",
        payload: id
    }
}
export function updateReminder(id,title,message,remindAt,emailSent,userId){
    var date= new Date();
    var year = date.toLocaleDateString('ko-KR');
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var second = date.getSeconds();
    var time =  hour + ":" + minutes + ":" + second;
    
    return{
        type:"UPDATE_REMINDER",
        payload: {
            id:id,
            title:title,
            message:message,
            userId:userId,
            created:year + time,
            remindAt:remindAt,
            emailSent:emailSent
        }
    }
}

export function loginUser(id){
    return{
        type:"LOGIN_USER",
        payload: id
    }
}


export function addUser(name,email,password){
    return{
        type:"ADD_USER",
        payload: {
        name:name,
        email:email,
        password:password
        }
    }
}

export function editReminder(id,title,message,remindAt,emailSend,userId){
    var date= new Date();
    var year = date.toLocaleDateString('ko-KR');
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var second = date.getSeconds();
    var time =  hour + ":" + minutes + ":" + second;
    return{
        type:"EDIT_REMINDER",
        payload: {
            id:id,
            title:title,
            created:year + time ,
            message:message,
            remindAt:remindAt,
            emailSend:emailSend,
            userId:userId
            
        }
    }
}
export function addReminder(title,message,remindAt,emailSend,userId){
    var date= new Date();
   var id=new Date().getTime();
    var year = date.toLocaleDateString('ko-KR');
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var second = date.getSeconds();
    var time =  hour + ":" + minutes + ":" + second;
    return{
        type:"ADD_REMINDER",
        payload: {
            id:id,
            title:title,
            created:year + time ,
            message:message,
            remindAt:remindAt,
            emailSend:emailSend,
            userId:userId
            
        }
    }
}