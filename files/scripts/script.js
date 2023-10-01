document.addEventListener('DOMContentLoaded', ()=>{
 let tasks = document.querySelectorAll('.task')
 tasks.forEach(task => {
  let checkbox = task.querySelector('input[type=checkbox]')
  let taskTitle = task.querySelector('h2')
  checkbox.checked
      ? taskTitle.classList.add('completed')
      : taskTitle.classList.remove('completed');
 })



  document.addEventListener('click', async (event) => {
  if (event.target.classList.contains('delete')) {
    event.preventDefault();
    let taskID = event.target.getAttribute('data-task-id');
    console.log(taskID);
    try {
      let response = await fetch(`/api/tasks/${taskID}`, { method: 'delete' });
      if (response.status === 204) {
        event.target.parentElement.remove();
      } else {
        console / log('error deleting task');
      }
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }
});

document.addEventListener('change', async (event) => {
  if (event.target.type === 'checkbox') {
    const isChecked = event.target.checked;
    isChecked
      ? event.target.nextElementSibling.classList.add('completed')
      : event.target.nextElementSibling.classList.remove('completed');
    let parentElement = event.target.parentNode;
    let button = parentElement.querySelector('.delete');
    taskID = button.getAttribute('data-task-id');
    try {
      let response = await fetch(
        `/api/tasks/${taskID}?isCompleted=${isChecked}`,
        { method: 'PATCH' }
      );
      console.log(response)
      response.status === 200
        ? console.log('task status updated')
        : console.log('task status: unable to update');
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }
});
})



