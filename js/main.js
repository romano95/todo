//Находимо елемент
const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

tasks.forEach(function (task) {
  renderTask(task);
});

checkEmptyList();

form.addEventListener("submit", addTask);

function addTask(event) {
  //відміняємо відправку форми
  event.preventDefault();
  //додаємо текст із поля вводу
  const taskText = taskInput.value;
  //LocalStorege
  //Описуємо задачу у вигляді об'єкта
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  //Додаємо задачу у вигляді масив з задачами
  tasks.push(newTask);

  renderTask(newTask);
  //очищаємо поле для вооду після додавання задачі
  taskInput.value = "";
  taskInput.focus();
  //прибираємо розділ "список справ пустий".
  //Якщо немає нових задач, то розмітка буде, якщо ні, то через умову додоємо клас, який приховує рохмітку.
  // if (tasksList.children.length > 1) {
  //   emptyList.classList.add("none");
  // }

  // saveHtmlToLS();
  checkEmptyList();
  saveToLocalStorage();
}

//Формуємо видалення задач
tasksList.addEventListener("click", deleteTask);

function deleteTask(event) {
  if (event.target.dataset.action !== "delete") return;

  const parenNode = event.target.closest(".list-group-item");

  const id = Number(parenNode.id);

  //находимо індекс значення в масиві
  // const index = tasks.findIndex((task) => task.id === id);
  //видаляємо задачу з масива із задачами
  // tasks.splice(index, 1);

  //видаляємо задачу через фільтрацію масива
  tasks = tasks.filter((task) => task.id !== id);

  parenNode.remove();

  //якщо в списку задач один елемент, то показуємо 'список задач' пустий
  // if (tasksList.children.length === 1) {
  //   emptyList.classList.remove("none");
  // }

  // saveHtmlToLS();
  checkEmptyList();
  saveToLocalStorage();
}

//Виконуємо виконання задач для кнопки "спсиок задач виконано"
tasksList.addEventListener("click", doneTAsk);

function doneTAsk(event) {
  if (event.target.dataset.action !== "done") return;

  const parentNode = event.target.closest(".list-group-item");

  //визначаємо айді задачі
  const id = Number(parentNode.id);

  const task = tasks.find(function (task) {
    if (task.id === id) {
      return true;
    }
  });

  task.done = !task.done;

  const taskTitle = parentNode.querySelector(".task-title");
  taskTitle.classList.toggle("task-title--done");
}

function checkEmptyList() {
  if (tasks.length === 0) {
    const emptyListElement = `<li id="emptyList" class="list-group-item empty-list">
    <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
    <div class="empty-list__title">Список справ пустий</div>
  </li>`;
    tasksList.insertAdjacentHTML("afterbegin", emptyListElement);
  }

  if (tasks.length > 0) {
    const emptyListEl = document.querySelector("#emptyList");
    emptyListEl ? emptyListEl.remove() : null;
  }
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(task) {
  const sccClass = task.done ? "task-title task-title--done" : "task-title";

  const taskHtml = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
 <span class="${sccClass}">${task.text}</span>
 <div class="task-item__buttons">
     <button type="button" data-action="done" class="btn-action">
         <img src="./img/tick.svg" alt="Done" width="18" height="18">
     </button>
     <button type="button" data-action="delete" class="btn-action">
         <img src="./img/cross.svg" alt="Done" width="18" height="18">
     </button>
 </div>
</li>`;

  tasksList.insertAdjacentHTML("beforeend", taskHtml);
}

// saveHtmlToLS();

// //Перший спосіб, як зберігати дані в розмітці - спосіб швидкий, але так варто не робити

// //Збереження розмітки в LocalStorege
// //створюємо функцію, яка буде добавляти те, що ми додали в розмітку
// function saveHtmlToLS () {
//   localStorage.setItem('taskHtml', tasksList.innerHTML)
// };

// //Перевіряємо, якщо ми записали розмітку і отримали її черех умову,
// //то ми залишаємо її в браузері
// if (localStorage.getItem('taskHtml')) {
//   tasksList.innerHTML = localStorage.getItem('taskHtml');
// };

//Правельний спосіб і кращий
