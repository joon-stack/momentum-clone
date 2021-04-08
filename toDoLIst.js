const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

let toDos = [];
let idx = 0;

function removeToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return String(toDo.id) !== li.id;
  });
  saveToDos();
  toDos = cleanToDos;
  const test = localStorage.getItem("toDos");
  console.log(test);
}

function saveToDos() {
  localStorage.setItem("toDos", JSON.stringify(toDos));
}

function paintToDos(toDo) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  span.innerText = toDo.data;
  delBtn.innerText = "X";
  toDoList.appendChild(li);
  li.id = toDo.id;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.querySelector("span").style.padding = "0 10px 0 0";
  delBtn.addEventListener("click", removeToDo);
}

function handleSubmit(event) {
  event.preventDefault();
  const toDoObj = { data: toDoInput.value, id: idx };
  toDos.push(toDoObj);
  idx += 1;
  toDoInput.value = "";
  saveToDos();
  paintToDos(toDoObj);
}

function init() {
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
