export  function loginReducer(state="", action){
    switch(action.type){
        case "LOGIN_USER":return action.payload;
        default: return state;
    }
    
}