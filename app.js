
let tasks = [
    { id: '1', title: 'Devjoint 1', desc: 'Frontend', priority: 'high', status: 'todo', date: 'M07 15' },
    { id: '2', title: 'DEVJOINT', desc: '', priority: 'low', status: 'done', date: 'M07 15' }
];

document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
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

    const priorityLabel = task.priority === 'low' ? 'AŞAĞI' : task.priority === 'medium' ? 'ORTA' : 'YÜKSƏK';

    card.innerHTML = `
        <span class="badge ${task.priority}">${priorityLabel}</span>
        <h4>${task.title}</h4>
        ${task.desc ? `<p>${task.desc}</p>` : ''}
        <div class="task-footer">
            <span>⏱️ ${task.date}</span>
        </div>
    `;

    return card;
}

function checkEmptyState(container) {
    if (container.children.length === 0) {
        container.innerHTML = `<div class="empty-msg">Burada tapşırıq yoxdur</div>`;
    }
}