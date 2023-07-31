class App {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('Tasklist')) || [];
    console.log("Retrieve Tasks : ",this.tasks);
    this.name = "";
    this.desc = "";
    this.id = "";

    this.$Tasklist = document.querySelector("#Tasklist");
    this.$form = document.querySelector("#form");
    this.$Tasks = document.querySelector("#Tasklist");
    this.$delete = document.querySelector(".task-delete")
    this.$taskname = document.querySelector("#taskname");
    this.$taskdes = document.querySelector("#taskdes");
    this.$formBtn = document.querySelector("#form-buttons");

    this.saveTasks();
    this.render();
    this.addEventListeners();
  }
    addEventListeners() {
      document.body.addEventListener("click", event => {
        this.handleFormClick(event);
        this.selectTask(event);
        this.deleteTask(event);
      });
      this.$form.addEventListener("SUBMIT", event => {
        event.preventDefault();
        const name = this.$taskname.value;
        const desc = this.$taskdes.value;
        const hasTask = name || desc;
        if (hasTask) 
          // add tasks
          this.addTask({ name, desc });
        
      });
    }
  
    handleFormClick(event) {
      const isFormClicked = this.$form.contains(event.target);
  
      const name = this.$taskname.value;
      const desc = this.$taskdes.value;
      const hasTask = name || desc;
  
      if (isFormClicked) {
        this.addTask({ name, desc });
      } 
    }
  addTask({ name, desc }) {
      const newTask = {
        name,
        desc,
        id: this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1
      };
      this.tasks = [...this.tasks, newTask];
      this.render();
    }
    selectTask(event) {
      const $selectedTask = event.target.closest(".task");
      if (!$selectedTask) return;
      const [$taskname, $taskdes] = $selectedTask.children;
      this.name = $taskname.innerText;
      this.desc = $taskdes.innerText;
      this.id = $selectedTask.dataset.id;
    }
    
    deleteTask(event) {
      event.stopPropagation();
      if (!event.target.matches('.task-delete')) return;
      const id = event.target.dataset.id;
      this.tasks = this.tasks.filter(task => task.id !== Number(id));
      this.render();
    }
    
    render() {
      this.saveTasks();
      this.displayTasks();  
    }
    
    saveTasks() {
      localStorage.setItem('Tasklist', JSON.stringify(this.tasks))  
    }
 displayTasks() {
  const hasTask = this.tasks.length > 0;
  this.$Tasklist.style.display = hasTask ? "flex" : "none";

  this.$Tasklist.innerHTML = this.tasks
    .map(
      task => `
      <div class="task-list">
        <div class="task-name">
        ${task.name}
        </div>
        <div class="task-desc">
        ${task.desc}
        <div class="tools">
        <i style="font-size: 15px;margin:4px;align-items: center;justify-content: center;display:flex;" class="task-delete fas fa-trash-alt" data-id="${task.id}"></i>
        </div>
        </div>
      </div>
    `
    )
    .join("");
}
}

new App();
