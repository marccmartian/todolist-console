/**
 * El objeto "_list" va a tener esta forma; es decir que,
 * cada propiedad es el id de cada tarea y cada valor es el objeto tarea en si: *
 *  {
 *    uuid-43-1: {id: 'uuid-43-1', description: 'text', completed: '2022'},
 *    uuid-54-3: {id: 'uuid-54-3', description: 'text', completed: '2022'},
 *  }
 *
 * El getter "listArray", convierte el objeto "_list", a una matriz de solo los valores.
 * Esto se hizo para manipular solo las tareas como un array (raro para mi, pero asi fue el enfoque):
 * [
 *  {id: 'uuid-43-1', description: 'text', completed: '2022'},
 *  {id: 'uuid-54-3', description: 'text', completed: '2022'},
 * ]
 *
 * En mi opinion mucho se ha complicado Fernando herrera
 */

const Task = require("./task");

class Tasks {
  _list = {};

  constructor() {
    this._list = {};
  }

  get listArray() {
    const tasksArray = [];
    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      tasksArray.push(task);
    });

    return tasksArray;
  }

  createTask(description = "") {
    const task = new Task(description);

    this._list[task.id] = task;
  }

  // carga la data del archivo data.json
  // ese decir convierte la info de ese archivo al fomato del objeto "_list"
  loadTasksFromData(tasksArray = []) {
    tasksArray.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  showAllTasks() {
    console.log("");
    this.listArray.forEach((task, index) => {
      const item = `${index + 1}.`.green;
      const { description, completedAt } = task;
      const status = !completedAt ? "Pendiente".red : "Completada".green;
      console.log(`${item} ${description} :: ${status}`);
    });
  }

  showTasksCompletedOrPending(completed = true) {
    let item = 0;
    console.log();

    this.listArray.forEach((task) => {
      const { description, completedAt } = task;
      const status = !completedAt ? "Pendiente".red : `${completedAt}`.green;

      if (completed) {
        if (completedAt) {
          console.log(`${(item + 1 + ".").green} ${description} :: ${status}`);
          item++;
        }
      } else {
        if (!completedAt) {
          console.log(`${(item + 1 + ".").green} ${description} :: ${status}`);
          item++;
        }
      }
    });
  }

  deleteTask(id = "") {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  // el argumento que recibe es el array de las tareas seleccionadas por el usurio,
  // es decir las tareas que quiero completar, setear a la fecha actual.
  // Las que no estan seleccionadas son las que hay que setear en null
  toogleTasksCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completedAt) {
        task.completedAt = new Date().toISOString();
      }
    });

    this.listArray.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedAt = null;
      }
    });
  }
}

module.exports = Tasks;
