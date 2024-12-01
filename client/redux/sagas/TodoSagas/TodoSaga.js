import * as types from "../../actions/index.types"
import { call, put, takeLatest } from "redux-saga/effects"
import * as req from "../../../api/request/TodoReqs/TodoReqs"

function* getAllTodos() {
    try {
        const result = yield call(req.getAllTodosReq);
        if (result.status == 200) {
            yield put({ type: types.GET_TODOS_SUCCESS, payload: result.data })
        } else {
            yield put({ type: types.GET_TODOS_FAILURE, payload: result?.response?.data?.message })
        }
    } catch (e) {
        console.log(e)
    }
}

function* addTodo(action) {
    try {
        const result = yield call(req.addTodosReq, action);
        if (result.status == 200) {
            yield put({ type: types.ADD_TODOS_SUCCESS, payload: result.data })
        } else {
            yield put({ type: types.ADD_TODOS_FAILURE, payload: result?.response?.data?.message })
        }
    } catch (e) {
        console.log(e)
    }
}

function* completeTodo(action) {
    try {
        const result = yield call(req.completeTodoReq, action);
        if (result.status == 200) {
            yield put({ type: types.COMPLETE_TODOS_SUCCESS, payload: result.data })
        } else {
            yield put({ type: types.COMPLETE_TODOS_FAILURE, payload: result?.response?.data?.message })
        }
    } catch (e) {
        console.log(e)
    }
}

function* deleteTodo(action) {
    try {
        const result = yield call(req.deletTodoReq, action);
        if (result.status == 200) {
            yield put({ type: types.DELETE_TODOS_SUCCESS, payload: result.data })
            // const getTodo = yield call(req.getAllTodosReq)
            // if (getTodo.status == 200) {
            //     yield put({ type: types.GET_TODOS_SUCCESS, payload: getTodo.data })
            // }
        } else {
            yield put({ type: types.DELETE_TODOS_FAILURE, payload: result?.response?.data?.message })
        }
    } catch (e) {
        console.log(e)
    }
}

export default function* todoSaga() {
    yield takeLatest(types.GET_TODOS, getAllTodos);
    yield takeLatest(types.ADD_TODOS, addTodo);
    yield takeLatest(types.COMPLETE_TODOS, completeTodo);
    yield takeLatest(types.DELETE_TODOS, deleteTodo);
}