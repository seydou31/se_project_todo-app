import FormValidation from "../components/FormValidation.js";
import Todo from "../components/Todo.js";
import { initialTodos, validationConfig } from "../utils/Constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCompleted(completed) {
  todoCounter.updateCompleted(completed);
}

function handleTotal(item) {
  todoCounter.updateTotal(item);
}
const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

const addToDoPopupForm = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleSubmitForm: (values) => {
    const todoElement = generateTodo(values);
    section.addItem(todoElement);
    addTodoPopup.classList.remove("popup_visible");
    newValidationForm.resetValidation();
    todoCounter.updateTotal(true);
  },
});

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCompleted, handleTotal);
  const todoElement = todo.getView();
  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  addToDoPopupForm.open();
});
addToDoPopupForm.setEventListener();

const newValidationForm = new FormValidation(validationConfig, addTodoForm);
section.renderItems();
newValidationForm.enableValidation();
