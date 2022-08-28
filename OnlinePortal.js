// const redux = require('redux');
// const reduxLogger = require ('redux-logger');
// const createStore = redux.createStore;
// const combineReducer = redux.combineReducers
// const applyMiddleWare = redux.applyMiddleware
// const logger = reduxLogger.createLogger();

// const BUY_MOBILE = 'BUY_MOBILE'
// const BUY_LAPTOP = 'BUY_LAPTOP'

// function onlineMobileActionCreater(){
//     return{
//         type : BUY_MOBILE,
//         info : 'Onlline Portal for new mobile'
//     }
// }

// function onlineLaptopActionCreater(){
//     return{
//         type : BUY_LAPTOP,
//         info : 'Onlline Portal for new laptop'
//     }
// }

// const mobileInventory = {
//     noOfMobiles : 10
// }

// const laptopInventory = {
//     noOfLaptop : 20
// }

// const mobileReducer = (afterSale = mobileInventory,action)=>{
//     switch(action.type){
//         case 'BUY_MOBILE' : return {
//             ...afterSale,
//             noOfMobiles : afterSale.noOfMobiles - 1
//         }
//         default : return {
//             ...afterSale
//         }
//     }
// }

// const laptopReducer = (afterSale = laptopInventory,action)=>{
//     switch (action.type){
//         case 'BUY_LAPTOP' : return {
//             ...afterSale,
//             noOfLaptop : afterSale.noOfLaptop - 1
//         }
//         default : return {
//             ...afterSale
//         }
//     }

// }

// const rootReducer = combineReducer({
//     mobile : mobileReducer,
//     laptop : laptopReducer
// })

// const onlineStore = createStore(rootReducer,applyMiddleWare(logger));


// console.log('Initial State : ',onlineStore.getState())
// const unsubscribe = onlineStore.subscribe(()=>{})
// onlineStore.dispatch(onlineMobileActionCreater());
// onlineStore.dispatch(onlineMobileActionCreater());
// onlineStore.dispatch(onlineMobileActionCreater());
// onlineStore.dispatch(onlineLaptopActionCreater());
// onlineStore.dispatch(onlineLaptopActionCreater());
// unsubscribe();

// ---------------------------------------------------------------------------------------------- //

// REDUX TOOLKIT IMPLEMENTATION

const {configureStore, createSlice} = require('@reduxjs/toolkit');

const mobileInventory = {
    noOfMobiles : 10
}

const laptopInventory = {
    noOfLaptop : 20
}

const mobileSlice = createSlice({
    name:'mobile',
    initialState:mobileInventory,
    reducers:{
        buyMobile(state,action){
            state.noOfMobiles = state.noOfMobiles - action.payload;
        }
    }
})

const laptopSlice = createSlice({
    name:'laptop',
    initialState:laptopInventory,
    reducers:{
        buyLaptop(state,action){
            state.noOfLaptop = state.noOfLaptop - action.payload;
        }
    }
})

const { buyMobile } = mobileSlice.actions;
const mobileReducer = mobileSlice.reducer;
const { buyLaptop } = laptopSlice.actions;
const laptopReducer = laptopSlice.reducer;

const electricStore = configureStore({
    reducer:{
        mobile:mobileReducer,
        laptop:laptopReducer
    }
})

console.log('Initial State : ',electricStore.getState())
const unsubscribe = electricStore.subscribe(()=>{console.log('current state:',electricStore.getState())});
electricStore.dispatch(buyMobile(2));
electricStore.dispatch(buyMobile(1));
electricStore.dispatch(buyMobile(1));
electricStore.dispatch(buyLaptop(2));
electricStore.dispatch(buyLaptop(2));
unsubscribe();
