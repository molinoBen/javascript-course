const todoList = [];

renderTodoList();

console.log(document.querySelector('.js-name-input'));

function handleKeydown(event) {
  if (event.key === 'Enter') {
    addTodo();
  }
}

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;

    const html = `<div>
    ${name}</div> 
    <div>${dueDate}</div>
    <button onclick = "todoList.splice(${index}, 1); renderTodoList();" class="delete-todo-button"
    >Delete</button>
    
    `;
    todoListHTML += html;
  });
  console.log(todoListHTML);

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;
  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  todoList.push({
    // name: name,
    // dueDate: dueDate
    name,
    dueDate,
  });
  console.log(todoList);

  inputElement.value = '';

  renderTodoList();
}
