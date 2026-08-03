let tasks = [];

try {
    const storedTasks = localStorage.getItem('kanban_tasks');
    tasks = storedTasks ? JSON.parse(storedTasks) : [
        { id: '1', title: 'Devjoint 1', desc: 'Frontend', priority: 'high', status: 'todo', date: 'M07 15' },
        { id: '2', title: 'DEVJOINT', desc: '', priority: 'low', status: 'done', date: 'M07 15' }
    ];
} catch (error) {
    console.error('localStorage error:', error);
    tasks = [];
}

const modal = document.getElementById('taskModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const taskForm = document.getElementById('taskForm');
const searchInput = document.getElementById('searchInput');
const priorityFilter = document.getElementById('priorityFilter');
const taskTitleInput = document.getElementById('taskTitle');

const errorMsg = document.createElement('small');
errorMsg.style.color = '#ef4444';
errorMsg.style.fontSize = '12px';
errorMsg.style.marginTop = '4px';
errorMsg.style.display = 'none';
taskTitleInput.parentElement.appendChild(errorMsg);

document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    setupDragAndDrop();
});

function saveToLocalStorage() {
    try {
        localStorage.setItem('kanban_tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('localStorage error:', error);
    }
}

function renderTasks() {
    const todoList = document.getElementById('todo-list');
    const doingList = document.getElementById('doing-list');
    const doneList = document.getElementById('done-list');

    todoList.innerHTML = '';
    doingList.innerHTML = '';
    doneList.innerHTML = '';

    const filterText = searchInput.value.toLowerCase().trim();
    const filterPriority = priorityFilter.value;

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(filterText) || task.desc.toLowerCase().includes(filterText);
        const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
        return matchesSearch && matchesPriority;
    });

    const counts = { todo: 0, doing: 0, done: 0 };
    filteredTasks.forEach(task => {
        counts[task.status]++;
        const card = createTaskElement(task);
        
        if (task.status === 'todo') todoList.appendChild(card);
        else if (task.status === 'doing') doingList.appendChild(card);
        else if (task.status === 'done') doneList.appendChild(card);
    });

    document.getElementById('todo-count').textContent = counts.todo;
    document.getElementById('doing-count').textContent = counts.doing;
    document.getElementById('done-count').textContent = counts.done;

    checkEmptyState(todoList);
    checkEmptyState(doingList);
    checkEmptyState(doneList);
}

function createTaskElement(task) {
    const card = document.createElement('div');
    card.classList.add('task-card');
    card.setAttribute('draggable', 'true');
    card.dataset.id = task.id;

    const priorityLabel = task.priority === 'low' ? 'AŞAĞI' : task.priority === 'medium' ? 'ORTA' : 'YÜKSƏK';

    const badge = document.createElement('span');
    badge.className = `badge ${task.priority}`;
    badge.textContent = priorityLabel;

    const h4 = document.createElement('h4');
    h4.textContent = task.title;

    card.appendChild(badge);
    card.appendChild(h4);

    if (task.desc) {
        const p = document.createElement('p');
        p.textContent = task.desc;
        card.appendChild(p);
    }

    const footer = document.createElement('div');
    footer.className = 'task-footer';

    const dateSpan = document.createElement('span');
    dateSpan.textContent = `⏱️ ${task.date}`;

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'task-actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = '✏️';
    editBtn.addEventListener('click', () => editTask(task.id));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    footer.appendChild(dateSpan);
    footer.appendChild(actionsDiv);

    card.appendChild(footer);

    card.addEventListener('dragstart', (e) => {
        card.classList.add('dragging');
        e.dataTransfer.setData('text/plain', task.id);
    });

    card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
    });

    return card;
}

function checkEmptyState(container) {
    if (container.children.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'empty-msg';
        emptyDiv.textContent = 'Burada tapşırıq yoxdur';
        container.appendChild(emptyDiv);
    }
}

function setupDragAndDrop() {
    const lists = document.querySelectorAll('.task-list');

    lists.forEach(list => {
        list.addEventListener('dragover', (e) => {
            e.preventDefault();
            list.classList.add('drag-over');
        });

        list.addEventListener('dragleave', () => {
            list.classList.remove('drag-over');
        });

        list.addEventListener('drop', (e) => {
            e.preventDefault();
            list.classList.remove('drag-over');
            
            const taskId = e.dataTransfer.getData('text/plain');
            const targetStatus = list.parentElement.dataset.status;

            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.status = targetStatus;
                saveToLocalStorage();
                renderTasks();
            }
        });
    });
}

function clearError() {
    errorMsg.textContent = '';
    errorMsg.style.display = 'none';
    taskTitleInput.style.borderColor = '';
}

openModalBtn.addEventListener('click', () => {
    taskForm.reset();
    clearError();
    document.getElementById('taskId').value = '';
    document.getElementById('modalTitle').textContent = 'Yeni Tapşırıq Yarat';
    modal.classList.add('active');
});

closeModalBtn.addEventListener('click', () => {
    clearError();
    modal.classList.remove('active');
});

taskTitleInput.addEventListener('input', clearError);

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('taskId').value;
    const title = taskTitleInput.value.trim();
    const desc = document.getElementById('taskDesc').value.trim();
    const priority = document.getElementById('taskPriority').value;

    if (!title) return;

    const isDuplicate = tasks.some(t => t.title.toLowerCase() === title.toLowerCase() && t.id !== id);
    if (isDuplicate) {
        errorMsg.textContent = 'Bu başlıqda tapşırıq artıq mövcuddur!';
        errorMsg.style.display = 'block';
        taskTitleInput.style.borderColor = '#ef4444';
        return;
    }

    if (id) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.title = title;
            task.desc = desc;
            task.priority = priority;
        }
    } else {
        const newTask = {
            id: Date.now().toString(),
            title,
            desc,
            priority,
            status: 'todo',
            date: 'M07 15'
        };
        tasks.push(newTask);
    }

    saveToLocalStorage();
    renderTasks();
    clearError();
    modal.classList.remove('active');
});

window.editTask = function(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    clearError();
    document.getElementById('taskId').value = task.id;
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDesc').value = task.desc;
    document.getElementById('taskPriority').value = task.priority;
    document.getElementById('modalTitle').textContent = 'Tapşırığı Redaktə Et';

    modal.classList.add('active');
};

window.deleteTask = function(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveToLocalStorage();
    renderTasks();
};

searchInput.addEventListener('input', renderTasks);
priorityFilter.addEventListener('change', renderTasks);