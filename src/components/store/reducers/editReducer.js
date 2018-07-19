export  function editReducer(state={}, action){
    switch(action.type){
        case "EDIT_REMINDER":
            return  {
            id:action.payload.id,
            title:action.payload.title,
            created:action.payload.created,
            message:action.payload.message,
            remindAt:action.payload.remindAt,
            emailSend:action.payload.emailSend,
            userId:action.payload.userId};
        default: return state;
    }
    
}
