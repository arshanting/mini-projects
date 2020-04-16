(function() {
  // Forms
  const inputToDo = document.getElementById('inputToDo');
  const formToDo = document.getElementById('addToDo');

  // Elements
  const toDoHolder = document.getElementById('toDoHolder');
  const doneHolder = document.getElementById('doneHolder');

  formSubmit = () => {
    formToDo.addEventListener('submit', function(e) {
      e.preventDefault(); // prevent form submission

      toDoHolder.innerHTML += addToDo(inputToDo.value);

      console.log(inputToDo.value);
    });
  }

  addToDo = (object) => {
    return `<div>${object}</div>`;
  }

  // init functions
  formSubmit();
})();