const {
  showMainMenu,
  pause,
  readInput,
  showListTasksToDelete,
  confirmDeletion,
  showListTasksToComplete,
} = require("./helpers/inquirerMenus");
const { saveData, readDataFromDB } = require("./helpers/dataManage");
const Tasks = require("./models/tasks");

let option = "";

const main = async () => {
  const tasks = new Tasks();

  const data = readDataFromDB();
  if (data) {
    tasks.loadTasksFromData(data);
  }

  do {
    option = await showMainMenu();

    switch (option) {
      case 1:
        const userInput = await readInput();
        tasks.createTask(userInput);
        break;

      case 2:
        // console.log(tasks.listArray);
        tasks.showAllTasks();
        break;

      case 3:
        tasks.showTasksCompletedOrPending(true);
        break;

      case 4:
        tasks.showTasksCompletedOrPending(false);
        break;

      case 5:
        const ids = await showListTasksToComplete(tasks.listArray);
        // console.log(ids);
        tasks.toogleTasksCompleted(ids);
        break;

      case 6:
        const id = await showListTasksToDelete(tasks.listArray);
        if (id !== 0) {
          const response = await confirmDeletion();
          if (response) {
            tasks.deleteTask(id);
            console.log("Tarea borrada correctamente");
          }
        }
        break;

      default:
        break;
    }

    saveData(tasks.listArray); //guardo el array

    await pause();
  } while (option !== 0);
};

main();
