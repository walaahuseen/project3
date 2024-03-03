document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const clearAllBtn = document.getElementById('clearAllBtn');

    loadTasks();

    addTaskBtn.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    clearAllBtn.addEventListener('click', clearAllTasks);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            if (!isDuplicate(taskText)) {
                const taskItem = createTaskItem(taskText);
                taskList.appendChild(taskItem);
                saveTasks();
                taskInput.value = '';
            } else {
                alert('Task already exists!');
            }
        }
    }

    function createTaskItem(taskText) {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox">
            <span>${taskText}</span>
            <button class="delete-btn">Delete</button>
        `;
        li.querySelector('input[type="checkbox"]').addEventListener('change', function() {
            li.querySelector('span').classList.toggle('complete');
            saveTasks();
        });
        li.querySelector('.delete-btn').addEventListener('click', function() {
            li.remove();
            saveTasks();
        });
        return li;
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(function(taskItem) {
            tasks.push({
                text: taskItem.querySelector('span').textContent,
                completed: taskItem.querySelector('input[type="checkbox"]').checked
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(function(task) {
            const taskItem = createTaskItem(task.text);
            if (task.completed) {
                taskItem.querySelector('input[type="checkbox"]').checked = true;
                taskItem.querySelector('span').classList.add('complete');
            }
            taskList.appendChild(taskItem);
        });
    }

    function clearAllTasks() {
        taskList.innerHTML = '';
        localStorage.removeItem('tasks');
    }

    function isDuplicate(taskText) {
        let isDuplicate = false;
        taskList.querySelectorAll('li').forEach(function(taskItem) {
            if (taskItem.querySelector('span').textContent === taskText) {
                isDuplicate = true;
            }
        });
        return isDuplicate;
    }
});
