import { put, takeEvery, call } from "redux-saga/effects";
import {
  LOAD_TODOS,
  setTodos,
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
  CLEAR_TODOS,
} from "../actions/todoActions";

const fetchTodosFromAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "task 1", completed: false },
        { id: 2, title: "task 2", completed: true },
      ]);
    }, 1000);
  });
};

function* loadTodosSaga() {
  const todos = yield call(fetchTodosFromAPI);
  yield put(setTodos(todos));
}

function* addTodoSaga(action) {
  console.log("Add Task:", action.title);
}

function* removeTodoSaga(action) {
  console.log("Delete with Id:", action.id);
}

function* toggleTodoSaga(action) {
  console.log("Is close", action.id);
}

function* editTodoSaga(action) {
  console.log("Edit Your Task", action.id, "New Title", action.title);
}

export default function* rootSaga() {
  yield takeEvery(LOAD_TODOS, loadTodosSaga);
  yield takeEvery(ADD_TODO, addTodoSaga);
  yield takeEvery(REMOVE_TODO, removeTodoSaga);
  yield takeEvery(TOGGLE_TODO, toggleTodoSaga);
  yield takeEvery(EDIT_TODO, editTodoSaga);
}
