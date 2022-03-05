const newTaskForm = document.getElementById('new-task-form');
const tasksList = document.getElementById('tasks-list');

let tasks = [];

const clearListView = () => {
  const children = [...tasksList.children]; // "..." = spread ECS6 converter array de children
  children.forEach((child) => {
    tasksList.removeChild(child);
  });
}

const updateListView = () => {
  console.log('updateListView', tasks);
  clearListView();

  //appendChild
  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.textContent = task.title;

    const buttonDelete = document.createElement('button');
    buttonDelete.innerHTML = 'Delete'; // não usar inner!!! fácil de hackear
    buttonDelete.onclick = () => {
      handleDeleteClick(task)
    };
    listItem.appendChild(buttonDelete);

    const checkBoxIsDone = document.createElement('input');
    checkBoxIsDone.setAttribute('type', 'checkbox');
    checkBoxIsDone.checked = task.isDone;
    checkBoxIsDone.onchange = () => {
      handleCheckBoxChange(task) //atualiza lista
    }
    listItem.appendChild(checkBoxIsDone);

    tasksList.appendChild(listItem);
  })



const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem('tasks');

    if(savedData === null){
    return;
  }

  const parsedData = JSON.parse(savedData);
    tasks = parsedData;
  }

loadFromLocalStorage();

const saveToLocalStorage = () => {
  const parsedData = JSON.stringify(tasks); //transforma array em JSON
  localStorage.setItem('tasks', parsedData);
}

const handleDeleteClick = (targetTask) => {
  const filtered = tasks.filter((task) => {
  return task != targetTask;
  });
  tasks = filtered;

  saveToLocalStorage();
  updateListView();
  }

  const handleCheckBoxChange = (targetTask) => {
    targetTask.isDone = !targetTask.isDone;

    saveToLocalStorage();
    updateListView();
  }

}

//constante para callback
const handleSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData(newTaskForm);
  const formEntries = Object.fromEntries(formData);

  const newTask = {
    id: tasks.length,
    title: formEntries.title,
    description: formEntries.description,
    isDone: false
  }

  tasks.push(newTask);
  saveToLocalStorage();

  updateListView();
}

//escuntando o formulario
newTaskForm.addEventListener('submit', handleSubmit)//callback, segundo parametro//
