import * as types from "../index.types"

export function getAllTodos() {
    return {
        type: types.GET_TODOS,
    }
}

export function addTodo(data) {
    return {
        type: types.ADD_TODOS,
        data
    }
}

export function completeTodo(data) {
    return {
        type: types.COMPLETE_TODOS,
        data
    }
}

export function deleteTodo(data) {
    return {
        type: types.DELETE_TODOS,
        data
    }
}