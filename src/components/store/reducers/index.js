import {combineReducers} from 'redux';
import {reminderReducer} from './reminderReducer';
import {userReducer} from './userReducer';
import {loginReducer} from './loginReducer';
import {editReducer} from './editReducer';


export const reducer=combineReducers({
   reminderReducer,
    userReducer,
    loginReducer,
    editReducer
})