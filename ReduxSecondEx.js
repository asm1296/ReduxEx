const redux = require('redux');
const reduxlogger = require('redux-logger');

const applyMiddleWareToBank = redux.applyMiddleware;
const logger = reduxlogger.createLogger();

// actionCreater for bankBalanceReducer
const WITHDRAW_SAVING = 'withdrawSaving'
function savingAction(SAVING_QUANTITY){
    return{
    type : WITHDRAW_SAVING,
    quantity : SAVING_QUANTITY
    }
}
const DEPOSIT_CURRENT = 'depositCurrent'
function currentAction(CURRENT_QUANTITY){
    return{
        type : DEPOSIT_CURRENT,
        quantity : CURRENT_QUANTITY
    }
}

// state - bankbalance within store
const bankBalance = {
    savingAccount : 20000,
    currentAccount : 25000
}

// actionCreater for loanAmountReducer
const PAY_HOMELOAN = 'payHomeLoan'
function homeloanAction(HOMELOAN_QUANTITY){
    return{
    type:PAY_HOMELOAN,
    quantity : HOMELOAN_QUANTITY
    }
}
// state - loanamount within store 
const loanAmount = {
    homeLoan : 1200000,
    carLoan : 300000
}

// actionCreater for lockerReducer
const WITHDRAW_GOLD = 'withdrawGold'
function goldAction(GOLD_QUANTITY){
    return{
        type : WITHDRAW_GOLD,
        quantity : GOLD_QUANTITY
    }
}
// state - locker within store 
const locker = {
    gold : 10,
    silver : 55
}

// reducer for bankbalance state
const bankBalanceReducer=(balState=bankBalance,action)=>{
    switch(action.type){
        case 'depositSaving':return{
            ...balState,
            savingAccount : balState.savingAccount+action.quantity
        }
        case 'withdrawSaving':return{
            ...balState,
            savingAccount : balState.savingAccount-action.quantity
        }
        case 'depositCurrent':return{
            ...balState,
            currentAccount : balState.currentAccount+action.quantity
        }
        case 'withdrawCurrent': return{
            ...balState,
            currentAccount : balState.currentAccount-action.quantity
        }
        default : return{
            ...balState
        }
    }
}

// reducer for loanAmount state
const loanAmountReducer=(myLoan=loanAmount,action)=>{
    switch (action.type){
        case 'payHomeLoan' : return{
            ...myLoan,
            homeLoan : myLoan.homeLoan-action.quantity
        }
        case 'takeHomeLoan' : return{
            ...myLoan,
            homeLoan : myLoan.homeLoan+action.quantity
        }
        default : return{
            ...myLoan
        }
    }

}

// reducer for locker state
const lockerReducer =(myLocker=locker,action)=>{
    switch (action.type){
        case 'depositGold':return{
            ...myLocker,
            gold : myLocker.gold+action.quantity
        }
        case 'withdrawGold':return{
            ...myLocker,
            gold : myLocker.gold-action.quantity
        }
        default : return{
            ...locker
        }
    }

}

// combine multiple reducer in rootreducer 
const rootReducer = redux.combineReducers({
    bankBalance : bankBalanceReducer,
    loanAmount : loanAmountReducer,
    locker : lockerReducer
})

// creation of store with combined reducer - rootreducer and Logger MiddleWare
const bankStore = redux.createStore(rootReducer,applyMiddleWareToBank(logger));
console.log('Initial State:',bankStore.getState());

// subscribe method - giving new state after every change in state
bankStore.subscribe(()=>{console.log('new balance',bankStore.getState())});   

// Dispatch methods for reducer 
bankStore.dispatch(savingAction(500));
bankStore.dispatch(currentAction(600));
bankStore.dispatch(homeloanAction(75000));
bankStore.dispatch(goldAction(3));