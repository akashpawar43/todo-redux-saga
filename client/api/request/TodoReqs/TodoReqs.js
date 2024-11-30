import axios from "axios";

export async function getAllTodosReq(action) {
    return axios.get("http://localhost:3000/todos")
        .then(response => {
            return response;
        }).catch((errors) => {
            console.log("errors", errors);
            return errors
        })
}

export async function addTodosReq(action) {
    const BODY = {
        title: action?.data?.title,
        description: action?.data?.description,
    }
    return axios.post("http://localhost:3000/todos", { ...BODY })
        .then(response => {
            return response;
        }).catch((errors) => {
            console.log("errors", errors);
            return errors
        })
}

export async function deletTodoReq(action) {
    return axios.delete(`http://localhost:3000/todos/${action?.data?.id}`)
        .then(response => {
            return response;
        }).catch((errors) => {
            console.log("errors", errors);
            return errors
        })
}