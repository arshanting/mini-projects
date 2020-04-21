// Selectors
const inputTask = document.getElementById('inputTask');
const formAddTask = document.getElementById('addTask');
const taskHolder = document.getElementById('taskList');
const doneHolder = document.getElementById('doneList');

let taskItems = [];

addTask = () => {
  formAddTask.addEventListener('submit', function(e) {
    const taskVal = inputTask.value;
    
    e.preventDefault(); // prevent form submission

    if (taskVal == null || taskVal == undefined || taskVal <= taskVal.length) { // if #inputTask is empty
      alert('Please enter your task');
    } else { // if taskItems/localStorage has value
      taskItems.push({'id': taskItems.length + 10, 'task': taskVal, 'status': false});
      // taskHolder.innerHTML += toDoTemplate(taskItems);
    }
    
    localStorage.setItem('tasks', JSON.stringify(taskItems));
    
    console.log('taskItems', taskItems);
    console.log(taskVal);
    
    inputTask.value = '';
  });
}

toDoTemplate = (object) => {
  return `<li id="${object.id}" data-status="${object.status}">
            <label><input type="checkbox"></label>${object.task}
            <button type="button" class="btn-delete">Delete</button>
          </li>`;
}

checkLocalStorage = () => {
  if (localStorage.getItem('tasks') === null) { // if localStorage is empty, set the taskItems into blank array
    taskItems = [];
  } else { // if localStorage has value, set the taskItems into it.
    taskItems = JSON.parse(localStorage.getItem('tasks'));
  }
}

updateTaskItems = (object) => {
  if (localStorage.getItem('tasks') === null) { // if localStorage is empty, set the taskItems into blank array
    taskItems = [];
  } else { // if localStorage has value, set the taskItems into it.
    taskItems = JSON.parse(localStorage.getItem('tasks'));
  }
  
  taskItems.forEach(task => { // display all the taskItems from the 'tasks' array (localStorage)
    taskHolder.innerHTML += toDoTemplate(task);
    // console.log(task.id);
  });
}

// init functions
document.addEventListener('DOMContentLoaded', function() {
  checkLocalStorage();
  updateTaskItems();
  addTask();
  // console.log(taskItems);
});