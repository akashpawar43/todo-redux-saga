import { all } from "redux-saga/effects";
import todoSaga from "../sagas/TodoSagas/TodoSaga";


export default function* rootSaga() {
    yield all([
        todoSaga(),
    ])
}