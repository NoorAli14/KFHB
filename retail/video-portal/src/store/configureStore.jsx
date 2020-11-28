import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { loginReducer }  from "../reducers/login";
import { makeCallReducer }  from "../reducers/makeCall";
import { receiveCallReducer }  from "../reducers/receiveCall";
import { receiverReducer } from "../reducers/receiverReducer";
import { callReducer } from "../reducers/callReducer";
import {requestPermission} from '../reducers/requestPermissionReducer';
import {loginTokenReducer} from '../reducers/loginToken';
import {muteReducer} from '../reducers/muteReducer';
import {videoErrorReducer} from '../reducers/videoErrorReducer';

export const rootReducer = combineReducers({
  login : loginReducer, //Agents login Reducer
  call : makeCallReducer, //Make call reducer
  receiveCall : receiveCallReducer, //to handle incoming call notification
  receiverAction : receiverReducer, //to handle attend or decline call
  callAction  : callReducer, //handles call actions like Mute, Unmute, End
  devicePermission : requestPermission,
  loginToken : loginTokenReducer,
  muteReducer : muteReducer,
  videoErrorReducer: videoErrorReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));