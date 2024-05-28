// DOM ELEMENTS
const addBtn = document.getElementById("addBtn");
const overlay = document.getElementById("overlay");
const modal = document.querySelector(".modal");
const todoSubmit = document.getElementById("todoSubmit");
const todoInput = document.getElementById("todoInput");
const closeModalBtn = document.querySelector(".close-modal");
const todoColumn = document.getElementById("noStatus");
const addTodoForm = document.getElementById("addTodoForm");
const todos = document.querySelectorAll(".todo");
const columns = document.querySelectorAll(".status");

//Dragstart and Dragend

let draggedElement = null;
let draggables;

function onDragStart(event) {
  draggedElement = event.target;
}

function onDragEnd(event) {
  draggedElement = null;
}

//Dragenter and Dragleave

columns.forEach(function (column) {
  column.addEventListener("dragenter", onDragEnter);
  column.addEventListener("dragleave", onDragLeave);
  column.addEventListener("drop", onDrop);
  column.addEventListener("dragover", onDragOver);
});

function onDragEnter(event) {
  event.target.style.borderColor = "grey"

}
function onDragLeave(event) {
  event.target.style.borderColor = "transparent"

}

function onDrop(event) {
  if (event.target.className==("todo")) {
    event.target.parentElement.append(draggedElement);
  } else {
    event.target.append(draggedElement);
  }
  event.target.style.borderColor = "transparent"
}

function onDragOver(event) {
  event.preventDefault();
}

// Open and Close modal functions!

function openModal() {
  overlay.classList.add("active");
  modal.classList.add("active");
}
function closeModal() {
  overlay.classList.remove("active");
  modal.classList.remove("active");
}

// ADD Todo

addBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
todoSubmit.addEventListener("click", addTodo);

function addTodo(event) {
  event.preventDefault();
  const trimTodoInput = todoInput.value.trim();
  if (trimTodoInput !== "") {
    const todoItem = `
        <div class="todo" draggable="true">
          ${todoInput.value}
          <button class="close">&times;</button>
        </div>
        `;

    todoColumn.insertAdjacentHTML("beforeend", todoItem);
    todoInput.value = "";
    closeModal();

    draggables = document.querySelectorAll(".todo");
    draggables.forEach((item) => {
      item.addEventListener("dragstart", onDragStart);
      item.addEventListener("dragend", onDragEnd);
    });
  }
}

// Remove TodoItem

todoColumn.addEventListener("click", deleteTodo);
function deleteTodo(event) {
  if (event.target.matches("button.close")) {
    event.target.parentElement.remove();
  }
}
