const redux = require('redux');
const axios = require('axios');
const reduxthunk = require('redux-thunk').default
const applymiddleware = redux.applyMiddleware
const reduxlogger = require('redux-logger');
const logger = reduxlogger.createLogger();
import {configureStore, createSlice} from '@reduxjs/toolkit';

//const GET_USERS = 'GET_USERS'

const userInfoState={
    users:[]
}

// function userAction(userDetails){
//     return{
//         type : GET_USERS,
//         userData : userDetails
//     }
// }

// const userReducer = (userState=userInfoState,action)=>{
//     switch(action.type){
//         case 'GET_USERS' : return{
//             users : action.userData
//         }
//         default : return{
//             ...userState
//         }
//     }
// }
const userReducer = createSlice({
    name:'users',
    userInfoState,
    reducers:{
        assignUserList(state,action){
            state.users=action.payload;
        }
    }
})

const { assignUserList } = userReducer.actions;
const userReducerRTK = userReducer.reducer;

//const userStore = redux.createStore(userReducer,applymiddleware(reduxthunk,logger));
const userStore = configureStore({
    reducer:{
        userReducer:userReducerRTK
    }
})
console.log('Initial State: ',userStore.getState());
userStore.subscribe=()=>(console.log('New State',userStore.getState()));

// invalid with redux toolkit
// const getUserFromAPI = ()=>{
//     return function(dispatch){
//         axios.get('https://jsonplaceholder.typicode.com/users')
//         .then((result)=>{
//             console.log('Details loading')
//             dispatch(userAction(result.data));
//         })
//         .catch((err)=>{
//             console.log('Error Found')
//         })
//     }
// }

// userStore.dispatch(getUserFromAPI());

// function sampleText(text){
//     return  async function (dispatch, getState){
//         let response = await axios.post('somelink',{text:text});
//         dispatch({type:"set data", payload:response.data});
//     }
// }
// userStore.dispatch(sampleText());
