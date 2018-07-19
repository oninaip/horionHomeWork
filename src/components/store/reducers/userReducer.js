var user=[
    {id:1,
     name:"Katia",
     email:"jek@gmail.com",
     password:"123"
    },
    {id:2,
     name:"Medi",
     email:"juju@gmail.com",
     password:"456"
    }
]
export  function userReducer(state=user, action){
    switch(action.type){
        case "ADD_USER": 
            var num=state.length-1;
            var id=state[num].id+1;
            return  [...state,{
            id:id,
            name:action.payload.name,
            email:action.payload.email,
            password:action.payload.password}];
        
        default: return state;
    }
    
}