// class App {
//     constructor() {
//       this.tasks = JSON.parse(localStorage.getItem('Tasklist')) || [];
//       this.name = "";
//       this.desc = "";
//       this.id = "";
  
//       this.$Tasklist = document.querySelector("#Tasklist");
//       this.$form = document.querySelector("#form");
//       this.$Tasks = document.querySelector("#Tasklist");
//       this.$taskname = document.querySelector("#taskname");
//       this.$taskdes = document.querySelector("#taskdes");
//       this.$formBtn = document.querySelector("#form-buttons");
//     //   this.$formCloseButton = document.querySelector("#form-close-button");
//     //   this.$modal = document.querySelector(".modal");
//     //   this.$modalTitle = document.querySelector(".modal-title");
//     //   this.$modalText = document.querySelector(".modal-text");
//     //   this.$modalCloseButton = document.querySelector(".modal-close-button");
//     //   this.$colorTooltip = document.querySelector("#color-tooltip");
  
//       this.render();
//       this.addEventListeners();
//     }
class App {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('Tasklist')) || [];

    // Remove all items from localstorage
    // localStorage.clear();
    // const isEmpty = localStorage.getItem('anyKey') === null;
    // console.log(isEmpty);

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
        // this.openModal(event);
        // this.deleteNote(event);
      });
  
    //   document.body.addEventListener("mouseover", event => {
    //     this.openTooltip(event);
    //   });
  
    //   document.body.addEventListener("mouseout", event => {
    //     this.closeTooltip(event);
    //   });
  
    //   this.$colorTooltip.addEventListener("mouseover", function() {
    //     this.style.display = "flex";
    //   });
  
    //   this.$colorTooltip.addEventListener("mouseout", function() {
    //     this.style.display = "none";
    //   });
      
  
    //   this.$colorTooltip.addEventListener("click", event => {
    //     const color = event.target.dataset.color;
    //     if (color) {
    //       this.editNoteColor(color);
    //     }
    //   });
  
      this.$form.addEventListener("SUBMIT", event => {
        event.preventDefault();
        const name = this.$taskname.value;
        const desc = this.$taskdes.value;
        const hasTask = name || desc;
        if (hasTask) 
          // add note
          this.addTask({ name, desc });
        
      });
  
    //   this.$formCloseButton.addEventListener("click", event => {
    //     event.stopPropagation();
    //     this.closeForm();
    //   });
    }
  
    handleFormClick(event) {
      const isFormClicked = this.$form.contains(event.target);
  
      const name = this.$taskname.value;
      const desc = this.$taskdes.value;
      const hasTask = name || desc;
  
      if (isFormClicked) {
        // this.openForm();
        this.addTask({ name, desc });
      } 
      // else if (hasTask) {
      // } else {
      //   // this.closeForm();
      // }
    }
  
    // openForm() {
    //   this.$form.classList.add("form-open");
    //   this.$taskname.style.display = "block";
    //   this.$formBtn.style.display = "block";
    // }
  
    // closeForm() {
    //   this.$form.classList.remove("form-open");
    //   this.$noteTitle.style.display = "none";
    //   this.$formButtons.style.display = "none";
    //   this.$noteTitle.value = "";
    //   this.$noteText.value = "";
    // }
  
    // openModal(event) {
    //   if (event.target.matches('.toolbar-delete')) return;  
        
    //   if (event.target.closest(".note")) {
    //     this.$modal.classList.toggle("open-modal");
    //     this.$modalTitle.value = this.title;
    //     this.$modalText.value = this.text;
    //   }
    // }
  
    // closeModal(event) {
    //   this.editNote();
    //   this.$modal.classList.toggle("open-modal");
    // }
  
    // openTooltip(event) {
    // if (!event.target.matches(".toolbar-color")) return;
    // this.id = event.target.nextElementSibling.dataset.id;
    // const noteCoords = event.target.getBoundingClientRect();
    // const horizontal = noteCoords.left;
    // const vertical = window.scrollY - 20;
    // this.$colorTooltip.style.transform = `translate(${horizontal}px, ${vertical}px)`;
    // this.$colorTooltip.style.display = "flex";
    // }
  
    // closeTooltip(event) {
    // if (!event.target.matches(".toolbar-color")) return;
    // this.$colorTooltip.style.display = "none";
    // }

    addTask({ name, desc }) {
      const newTask = {
        name,
        desc,
        id: this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1
      };
      this.tasks = [...this.tasks, newTask];
      this.render();
    }
    
  
    // editTask() {
    //   const title = this.$modalTitle.value;
    //   const text = this.$modalText.value;
    //   this.notes = this.notes.map(note =>
    //     note.id === Number(this.id) ? { ...note, title, text } : note
    //   );
    //   this.render();
    // }
  
  
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
  
  //   displayTasks() {
  //     const hasTask = this.Tasks.length > 0;
  //     this.$Tasklist.style.display = hasTask ? "none" : "flex";
  
  //     this.$Tasklist.innerHTML = this.tasks
  //       .map(
  //         task => `
  //         <div style="background: ${task.color};" class="task" data-id="${
  //           task.id
  //         }">
  //           <div class="${task.title && "note-title"}">${task.title}</div>
  //           <div class="note-text">${task.text}</div>
  //           <div class="toolbar-container">
  //             <div class="toolbar">
  //             <i style="font-size: 19px;margin:4px;" class="toolbar-delete fas fa-trash-alt" data-id="${task.id}"></i>
  //             </div>
  //           </div>
  //         </div>
  //      `
  //       )
  //       .join("");
  //   }
  // }
  
  // new App();
 displayTasks() {
  const hasTask = this.tasks.length > 0; // Fix: Use this.tasks instead of this.Tasks
  this.$Tasklist.style.display = hasTask ? "flex" : "none"; // Fix: Show or hide the task list based on whether there are tasks or not

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

/*
<div style="background: ${task.id};" class="task" data-id="${
        task.id
      }">
        <div class="${task.name && "note-title"}">${task.desc}</div>
        <div class="note-text">${task.name}</div>
        <div class="toolbar-container">
          <div class="toolbar">
            <i style="font-size: 19px;margin:4px;" class="toolbar-delete fas fa-trash-alt" data-id="${task.desc}"></i>
          </div>
        </div>
      </div>
*/