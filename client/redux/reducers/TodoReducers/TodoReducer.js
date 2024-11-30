import * as type from "../../actions/index.types"


export function todosReducer(
    state = {
        loading: false,
        getTodos: null,
        addTodo: null,
        deleteTodo: null,
        error: null,
    },
    action
) {
    switch (action.type) {
        case type.GET_TODOS:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case type.GET_TODOS_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                getTodos: action.payload,
            }
        case type.GET_TODOS_FAILURE:
            return {
                ...state,
                loading: false,
                getTodos: null,
                error: action?.message || "Somthing went wrong.",
            }

        case type.ADD_TODOS:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case type.ADD_TODOS_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                addTodo: action.payload,
            }
        case type.ADD_TODOS_FAILURE:
            return {
                ...state,
                loading: true,
                addTodo: null,
                error: action?.message || "Somthing went wrong.",
            }

        case type.DELETE_TODOS:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case type.DELETE_TODOS_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                deleteTodo: action.payload,
            }
        case type.DELETE_TODOS_FAILURE:
            return {
                ...state,
                loading: false,
                deleteTodo: null,
                error: action?.message || "Somthing went wrong.",
            }

        default:
            return state;
    }
}