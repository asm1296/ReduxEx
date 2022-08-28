const redux = require('redux');

const sweets = {
    gulabJamun : 150,
    anjeerBarfi : 250,
    kajuKatli : 200
}

const sweetReducer=(newstate=sweets,action)=>{
    switch(action.type){

        case 'gulabJamun':return{
            ...newstate,
            gulabJamun : newstate.gulabJamun - action.quantity
        }
        default : return{
            ...newstate
        }
    }
}

const sweetStore = redux.createStore(sweetReducer);
sweetStore.subscribe(()=>console.log('new state',sweetStore.getState()));
sweetStore.dispatch({
    type : 'gulabJamun',
    quantity : 10
})


