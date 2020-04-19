(function() {
  // Selectors
  const inputTask = document.getElementById('inputTask');
  const formAddTask = document.getElementById('addTask');
  const taskHolder = document.getElementById('taskList');
  const doneHolder = document.getElementById('doneList');

  // Functions
  document.addEventListener('DOMContentLoaded', function() {
    // init functions
    updateTaskItems();
    addTask();
  });
  let taskItems = [];

  addTask = () => {

    formAddTask.addEventListener('submit', function(e) {
      const taskVal = inputTask.value;
      
      e.preventDefault(); // prevent form submission

      if (taskVal == null || taskVal == undefined || taskVal <= taskVal.length) { // if #inputTask is empty
        alert('Please enter your task');
      } else { // if taskItems/localStorage has value
        taskItems.push({'id': Date.now(), 'task': taskVal, 'status': 'pending'});
        taskHolder.innerHTML += toDoTemplate(taskItems);
      }
      
      localStorage.setItem('tasks', JSON.stringify(taskItems));
      
      console.log('taskItems', taskItems);
      console.log(taskVal);
      
      inputTask.value = '';
    });
  }

  toDoTemplate = (object) => {
    // // Create LI element
    // const todoLi = document.createElement('li');
    // todoLi.id = object.id;
    // todoLi.innerText = object.task;

    // // Create LABEL element
    // const label = document.createElement('label');
    // todoLi.appendChild(label);

    // // Create CHECKBOX element
    // const checkbox = document.createElement('input');
    // checkbox.type = 'checkbox';
    // label.appendChild(checkbox);

    // // Create TRASH button
    // const btnDelete = document.createElement('button');
    // btnDelete.innerText = 'Delete';
    // btnDelete.type = 'button';
    // btnDelete.classList.add('btn-delete');
    // todoLi.appendChild(btnDelete);

    // // APPEND THE CREATED LI ELEMENT
    // taskHolder.appendChild(todoLi);

    return `<li id="${object.id}" data-status="${object.status}">
              <label><input type="checkbox"></label>${object.task}
              <button type="button" class="btn-delete">Delete</button>
            </li>`;
  }

  checkLocalStorage = (object) => {
    let taskItems;

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
    });
  }
})();