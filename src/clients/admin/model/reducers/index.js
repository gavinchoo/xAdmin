import {combineReducers} from 'redux'

let reducers = combineReducers({
    listData: function (state = {}, action) {
        if (action && action.type == "listData"){
            return action.listData
        }else {
            return null
        }
    },
})

export default reducers