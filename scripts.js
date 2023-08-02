class App {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('Tasklist')) || [];
        this.$Tasklist = document.querySelector("#Tasklist");
        this.$form = document.querySelector("#form");
        this.$taskname = document.querySelector("#taskname");
        this.$taskdes = document.querySelector("#taskdes");

        this.render();
        this.addEventListeners();
    }

    addEventListeners() {
        this.$form.addEventListener("submit", event => {
            event.preventDefault();
            const name = this.$taskname.value;
            const desc = this.$taskdes.value;
            const hasTask = name || desc;
            if (hasTask) {
                this.addTask({ name, desc });
            }
        });

        this.$Tasklist.addEventListener("click", event => {
            this.handleTaskClick(event);
        });
    }

    handleTaskClick(event) {
        const $task = event.target.closest(".task-list");
        if ($task) {
            const taskId = $task.dataset.id;
            this.deleteTask(taskId);
        }
    }

    addTask({ name, desc }) {
        const newTask = {
            name,
            desc,
            id: this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1,
        };
        this.tasks.push(newTask);
        this.saveTasks();
        this.render();
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== Number(taskId));
        this.saveTasks();
        this.render();
    }

    saveTasks() {
        localStorage.setItem('Tasklist', JSON.stringify(this.tasks));
    }

    render() {
        this.displayTasks();
    }

    displayTasks() {
        if (!this.$Tasklist) {
            return;
        }

        const hasTask = this.tasks.length > 0;
        this.$Tasklist.style.display = hasTask ? "flex" : "none";

        this.$Tasklist.innerHTML = this.tasks
            .map(
                task => `
                <div class="task-list" data-id="${task.id}">
                    <div class="task-name">${task.name}</div>
                    <div class="task-desc">${task.desc}</div>
                    <div class="tools">
                        <i style="font-size: 15px;margin:4px;align-items: center;justify-content: center;display:flex;" class="task-delete fas fa-trash-alt" data-id="${task.id}"></i>
                    </div>
                </div>
            `
            )
            .join("");
    }
}

new App();
