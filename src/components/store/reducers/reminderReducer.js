var reminder=[
    {id:1,
    title:"nupirkti",
    message:"rytoj nupirkti piena",
     userId:1,
     created:"2018-07-15",
    remindAt:"2018-12-08",
    emailSent:false
    },
    {id:2,
    title:"atnesti",
    message:"rytoj atnesti piena",
     userId:2,
     created:"2018-07-16",
    remindAt:"2018-08-01",
    emailSent:false
    },
    {id:3,
    title:"atnesti",
    message:"rytoj atnesti piena",
     userId:1,
     created:"2018-07-16",
    remindAt:"2018-10-01",
    emailSent:false
    },
    {id:4,
    title:"nupdfdfkd",
    message:"rytoj atnesti piena",
    userId:2,
    created:"2018-07-16",
    remindAt:"2018-11-01",
    emailSent:false
    }
]
export  function reminderReducer(state=reminder, action){
    switch(action.type){
        case "ADD_REMINDER": 
            return  [...state,{
            id: action.payload.id,
            title:action.payload.title,
            created:action.payload.created,
            message:action.payload.message,
            remindAt:action.payload.remindAt,
            emailSend:action.payload.emailSend,
            userId:action.payload.userId}];
        case "DELETE_REMINDER": return state.filter(rem=>rem.id !== action.payload); 
            
        case "UPDATE_REMINDER": return [...state.filter(rem=>rem.id !== action.payload.id),  {
            id:action.payload.id,
            title:action.payload.title,
            message:action.payload.message,
            userId:action.payload.userId,
            created:action.payload.created,
            remindAt:action.payload.remindAt,
            emailSent:action.payload.emailSent,
        }];
        
        default: return state;
    }
    
}
