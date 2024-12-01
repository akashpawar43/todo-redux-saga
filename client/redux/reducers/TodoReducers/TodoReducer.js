import * as type from "../../actions/index.types"


export function todosReducer(
    state = {
        loading: false,
        getTodos: null,
        addTodo: null,
        completeTodo: null,
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
                getTodos: {
                    ...state.getTodos,
                    todos: state?.getTodos?.todos ? [...state?.getTodos?.todos, action?.payload?.todos] : action?.payload
                }
            }
        case type.ADD_TODOS_FAILURE:
            return {
                ...state,
                loading: true,
                addTodo: null,
                error: action?.message || "Somthing went wrong.",
            }

        case type.COMPLETE_TODOS:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case type.COMPLETE_TODOS_SUCCESS:
            console.log("state:", state)
            return {
                ...state,
                error: null,
                loading: false,
                completeTodo: action.payload,
                getTodos: {
                    ...state.getTodos,
                    todos: state?.getTodos?.todos ?
                        state?.getTodos?.todos.map((todo) =>
                            todo.id == action?.payload?.todos?.id ? {...todo, isComplete: true} : todo
                        )
                        : action?.payload
                }
            }
        case type.COMPLETE_TODOS_FAILURE:
            return {
                ...state,
                loading: true,
                completeTodo: null,
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
                getTodos: {
                    ...state.getTodos,
                    todos: state?.getTodos?.todos ? state?.getTodos?.todos.filter((todo) => todo.id !== action?.payload?.todos?.id) : null
                }
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