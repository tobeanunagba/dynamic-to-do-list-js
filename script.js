// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Get tasks from Local Storage
        storedTasks.forEach(taskText => addTask(taskText, false)); // Load each task to the DOM
    }

    // Function to add a new task (optionally save to Local Storage)
    function addTask(taskText, save = true) {
        if (!taskText.trim()) return; // Ignore empty tasks

        const listItem = document.createElement('li'); // Create a new list item
        listItem.textContent = taskText; // Set the task text
        listItem.classList.add('task-item'); // Add class to list item for styling

        // Create the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove'; // Set the button text
        removeButton.classList.add('remove-btn'); // Add class for styling

        // Remove the task when the button is clicked
        removeButton.onclick = function () {
            taskList.removeChild(listItem); // Remove the task from the DOM
            removeTaskFromLocalStorage(taskText); // Remove the task from Local Storage
        };

        listItem.appendChild(removeButton); // Add the remove button to the list item
        taskList.appendChild(listItem); // Add the list item to the task list

        // Save the task to Local Storage if `save` is true
        if (save) {
            saveTaskToLocalStorage(taskText);
        }

        taskInput.value = ''; // Clear the input field
    }

    // Function to save a task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Get the current tasks from Local Storage
        storedTasks.push(taskText); // Add the new task to the array
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Save the updated tasks back to Local Storage
    }

    // Function to remove a task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Get the current tasks from Local Storage
        const updatedTasks = storedTasks.filter(task => task !== taskText); // Filter out the task to be removed
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save the updated tasks back to Local Storage
    }

    // Event listener for the 'Add Task' button
    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim(); // Get and trim the input value
        if (taskText === "") {
            alert("Please enter a task."); // Alert if the input is empty
            return;
        }
        addTask(taskText); // Add the task
    });

    // Event listener for the 'Enter' key press in the task input
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') { // If the 'Enter' key is pressed
            const taskText = taskInput.value.trim(); // Get and trim the input value
            if (taskText === "") {
                alert("Please enter a task."); // Alert if the input is empty
                return;
            }
            addTask(taskText); // Add the task
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});
