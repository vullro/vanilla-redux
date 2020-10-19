import { createStore } from "redux";

const input = document.querySelector("input");
const form = document.querySelector("form");
const ul = document.querySelector("ul");

const ACTION_ADD = "ADD",
  ACTION_DEL = "DEL";

const store = createStore(reducer);

function reducer(state = [], action) {
  console.log(state, action);

  switch (action.type) {
    case ACTION_ADD:
      return [{ text: action.text, id: action.id }, ...state];
    case ACTION_DEL:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
}
const addToDo = (text) => {
  return {
    type: ACTION_ADD,
    text: text,
    id: Date.now()
  };
};
const delToDo = (id) => {
  return {
    type: ACTION_DEL,
    id: id
  };
};
const dispatchDelToDo = (e) => {
  e.preventDefault();
  const id = parseInt(e.target.parentNode.id, 10);
  store.dispatch(delToDo(id));
};

const dispatchAddTodo = (text) => {
  store.dispatch(addToDo(text));
};

const createTodos = () => {
  const todos = store.getState();
  ul.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.innerText = "DEL";
    button.addEventListener("click", dispatchDelToDo);

    li.innerText = todo.text;
    li.id = todo.id;
    li.appendChild(button);
    ul.appendChild(li);
  });
};

store.subscribe(createTodos);

const handleSubmit = (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = "";
  dispatchAddTodo(text);
};

form.addEventListener("submit", handleSubmit);
