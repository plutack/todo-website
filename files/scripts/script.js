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

document.addEventListener('change', (event) => {
  if (event.target.type === 'checkbox') {
    const isChecked = event.target.checked;
    isChecked
      ? event.target.nextElementSibling.classList.add('completed')
      : event.target.nextElementSibling.classList.remove('completed');
  }
});
