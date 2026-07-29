let tasks = [
    { id: '1', title: 'Devjoint 1', desc: 'Frontend', priority: 'high', status: 'todo', date: 'M07 15' },
    { id: '2', title: 'DEVJOINT', desc: '', priority: 'low', status: 'done', date: 'M07 15' }
];

const modal = document.getElementById('taskModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const taskForm = document.getElementById('taskForm');

document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    setupDragAndDrop();
});

function renderTasks() {
    const todoList = document.getElementById('todo-list');
    const doingList = document.getElementById('doing-list');
    const doneList = document.getElementById('done-list');

    todoList.innerHTML = '';
    doingList.innerHTML = '';
    doneList.innerHTML = '';

    const counts = { todo: 0, doing: 0, done: 0 };

    tasks.forEach(task => {
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

    card.innerHTML = `
        <span class="badge ${task.priority}">${priorityLabel}</span>
        <h4>${task.title}</h4>
        ${task.desc ? `<p>${task.desc}</p>` : ''}
        <div class="task-footer">
            <span>⏱️ ${task.date}</span>
            <div class="task-actions">
                <button onclick="editTask('${task.id}')">✏️</button>
                <button onclick="deleteTask('${task.id}')">🗑️</button>
            </div>
        </div>
    `;

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
        container.innerHTML = `<div class="empty-msg">Burada tapşırıq yoxdur</div>`;
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
                renderTasks();
            }
        });
    });
}

openModalBtn.addEventListener('click', () => {
    taskForm.reset();
    document.getElementById('taskId').value = '';
    document.getElementById('modalTitle').textContent = 'Yeni Tapşırıq Yarat';
    modal.classList.add('active');
});

closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('taskId').value;
    const title = document.getElementById('taskTitle').value.trim();
    const desc = document.getElementById('taskDesc').value.trim();
    const priority = document.getElementById('taskPriority').value;

    if (!title) return;

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

    renderTasks();
    modal.classList.remove('active');
});

window.editTask = function(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    document.getElementById('taskId').value = task.id;
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDesc').value = task.desc;
    document.getElementById('taskPriority').value = task.priority;
    document.getElementById('modalTitle').textContent = 'Tapşırığı Redaktə Et';

    modal.classList.add('active');
};

window.deleteTask = function(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
};