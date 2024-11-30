import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux"
import { addTodo, deleteTodo, getAllTodos } from '../redux/actions/TodoActions/TodoAction';

export default function App() {
  const dispatch = useDispatch();
  const [todos, setTodos] = useState([]);
  const { loading, getTodos } = useSelector(state => state.todosReducer)

  const handleSubmit = async (values, { resetForm }) => {
    try {
      dispatch(addTodo({ ...values }));
      resetForm();
      // const data = await axios.post("http://localhost:3000/todos", { title: values.title, description: values.description })
      // setTodos((todo) => [...todo, data.data.todos])
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (id) => {
    try {
      dispatch(deleteTodo({ id }))
      // const data = await axios.delete(`http://localhost:3000/todos/${id}`)
      // const newTodo = todos.filter((todo) => todo.id !== data.data.todos.id)
      // setTodos(newTodo)
    } catch (error) {
      console.log(error);
    }
  }

  // const getAllTodos = async () => {
  //   try {
  //     const data = await axios.get("http://localhost:3000/todos")
  //     console.log("data:", data)
  //     setTodos(data.data.todos)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    // getAllTodos()
    dispatch(getAllTodos());
  }, [dispatch])

  return (
    <div className=' bg-gray-800 w-full min-h-screen flex flex-col justify-center items-center'>
      <Formik
        initialValues={{ title: "", description: "" }}
        enableReinitialize
        validate={""}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit }) => (
          <div className="grid gap-6 mb-6 grid-cols-3">
            <input type="text" id="title" name="title" value={values.title} onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Title" required
            />
            <input type="text" id="description" name="description" value={values.description} onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Description" required
            />
            <button type="button" onClick={handleSubmit}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Submit
            </button>
          </div>
        )}
      </Formik>
      {JSON.stringify(getTodos)}
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flow-root">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              {getTodos?.todos?.map((todo) =>
                <li key={todo.id} className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {todo?.title}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {todo?.description}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <button type="button" onClick={() => handleDelete(todo?.id)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        delete
                      </button>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
