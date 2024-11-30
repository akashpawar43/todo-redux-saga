import { combineReducers } from "redux";
import { todosReducer } from "./TodoReducers/TodoReducer";

const rootReducer = combineReducers({
    todosReducer
})

export default rootReducer;