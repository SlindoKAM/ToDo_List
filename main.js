// console.log('Slindo_55') for logging messeges
// console.warn('This is a warning') for warning messages in orange. 
// console.error('When you a=have errors') for error messages in red.


//Constant variables of buttons (DOM ELEMENTS)
const addBtn = document.getElementById('addBtn');
// const searchBtn = document.getElementById('searchBtn');
const editBtn = document.getElementById('editBtn');
const delBtn = document.getElementById('delBtn');

//Constant variables of input and unordered list (DOM ELEMENTS)
const taskToDo = document.getElementById('taskToDo');
const listToDos = document.getElementById('listToDos');

// let makes the variable dynamic
//storing tasks into local storage and being able to get it back.
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

//Initialize selected task from the localStorage (for editing or deleting) using the task indexing
// let selectedTask = null;
let selectedTaskIndex = -1;

//Render tasks to the DOM
function renderTask(filteredTasks = tasks)
{
    //Clearing the list
    listToDos.innerHTML = '';
    
    filteredTasks.forEach((task, index) => 
    {
        //Creates HTML list element in DOM to represent a task item(task to be added)
        const li = document.createElement('li');
        li.innerHTML = `<span class='task'>${task}</span>`;

        //Select the task by clicking it
        li.addEventListener('click', () => selectedTask(index));
        listToDos.appendChild(li);
    });

    //Disable buttons when no task is selected
    editBtn.disabled = true;
    delBtn.disabled = true;
}

//Select a task that your want to be edited or to delete.
function selectedTask(index)
{
    selectedTaskIndex = index;

    //Clear the previous highlighted task
    document.querySelectorAll('#listToDo li').forEach(li => li.classList.remove('selected'));

    //Hightlight the task that the user select.
    const selectedLi = listToDos.children[index];
    selectedLi.classList.add('selected');

    //Now after selecting task enable the edit and delete button
    taskToDo.value = tasks[index];
    editBtn.disabled = false;
    delBtn.disabled = false;
}

//Display an Error message 
function showError(msg)
{
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.textContent = msg;

    // Automatically clear the error message after 3 seconds
    setTimeout(() =>
    {
        errorMsg.textContent = '';
    }, 3000);
}

//Save the task to localStorage
function saveTasks()
{
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Add a new task using the add button.
addBtn.addEventListener('click', () =>
{
    const task = taskToDo.value.trim();

    //Checking if the input by the user is empty.
    if(!task)
    {
        showError('Task you are adding can not be empty!!');
        return;
    }

    //Checking if the task already exists in the list.
    if(tasks.includes(task))
    {
        showError('Task is already on the list enter new task!!');
        return;
    }

    //adding task to the list of tasks in localStorage using push.
    tasks.push(task);

    //Clearing the input field
    taskToDo.value = '';
    saveTasks();
    renderTask();
});

//search functionality (doing a live search)
taskToDo.addEventListener('keyup', () =>
{
    const searchTerm = taskToDo.value.trim().toLowerCase();
    const filteredTasks = tasks.filter(task => task.toLowerCase().includes(searchTerm));
    renderTask(filteredTasks);
    
    //Enable even when the search is happening(underway).
    editBtn.disabled = false;
    delBtn.disabled = false;
});

//Edit the task being selected through the edit button after it is enabling it.
editBtn.addEventListener('click', () =>
{
    //Check if a task is selected.
    if(selectedTaskIndex >= 0)
    {
        const updatedTask = taskToDo.value.trim();

        if(!updatedTask)
        {
            showError('You made your task empty, that is not allowed!!');
            return;
        }

        //Updating the task itself, overwriting it, in that index.
        tasks[selectedTaskIndex] = updatedTask;

        taskToDo.value = '';
        saveTasks();
        renderTask();
    }
});

//Delete the selected task.
delBtn.addEventListener('click', () =>
{
    if(selectedTaskIndex >=0)
    {
        //splice() is a JavaScript Array method that is used to remove, replace or insert items starting at a chosen index, here from the task array.
        tasks.splice(selectedTaskIndex, 1);

        taskToDo.value = '';
        saveTasks();
        renderTask();
    }
});

//Initial render of tasks
renderTask();
// function renderTask (filter = "")
// {
//     //Adding tasks to the list of To-Dos or modifying the list coz the list is empty it will just add.
//     listToDos.innerHTML = "";
//     // const filteredTasks = tasks.filter(task => task.toLowerCase().includes(filter.toLowerCase()));
//     // filteredTasks.forEach((task, index) =>
//     // {
//     //     //Creates HTML list element in DOM to represent a task item(task to be added)
//     //     const li = document.createElement('li');

//     //     //Assigns a class name calling it task-item to the list element(basicly for styling purposes.)
//     //     li.className = 'task-item';
//     //     li.textContent = task;
//     // });

// }