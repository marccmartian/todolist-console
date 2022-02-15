require("colors");
const inquirer = require("inquirer");

const mainMenuQuestions = [
  {
    type: "list",
    name: "option",
    message: "¿Qué quieres hacer?",
    choices: [
      {
        value: 1,
        name: `${"1.".green} Crear tarea`,
      },
      {
        value: 2,
        name: `${"2.".green} Listar tareas`,
      },
      {
        value: 3,
        name: `${"3.".green} Listar tareas completadas`,
      },
      {
        value: 4,
        name: `${"4.".green} Listar tareas pendientes`,
      },
      {
        value: 5,
        name: `${"5.".green} Completar tarea(s)`,
      },
      {
        value: 6,
        name: `${"6.".green} Borrar tarea`,
      },
      {
        value: 0,
        name: `${"0.".green} Salir\n`,
      },
    ],
  },
];

const showMainMenu = async () => {
  console.clear();
  console.log("=========================".green);
  console.log("  Selecciona una opción:");
  console.log("=========================\n".green);

  const { option } = await inquirer.prompt(mainMenuQuestions);
  return option;
};

const pause = async () => {
  const pauseQuestion = {
    type: "input",
    name: "pause",
    message: `Presiona ${"enter".blue} para continuar`,
  };

  console.log("\n");
  await inquirer.prompt(pauseQuestion);
};

const readInput = async () => {
  const inputQuestion = {
    type: "input",
    name: "input",
    message: "Descripción:",
    validate(value) {
      if (value.length === 0) return "Por favor ingresa un valor";
      return true;
    },
  };

  const { input } = await inquirer.prompt(inputQuestion);
  return input;
};

const showListTasksToDelete = async (tasks = []) => {
  const choices = tasks.map((task, index) => {
    const { id, description } = task;
    const item = `${index + 1}.`.green;
    return {
      value: id,
      name: `${item} ${description}`,
    };
  });

  choices.unshift({
    value: 0,
    name: `${"0.".green} Cancelar`,
  });

  const deleteTaskQuestions = [
    {
      type: "list",
      name: "id",
      message: "¿Cuál deseas borrar?",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(deleteTaskQuestions);
  return id;
};

const confirmDeletion = async () => {
  const confirmQuestion = [
    {
      type: "confirm",
      name: "ok",
      message: "¿Estás seguro de borrar esta tarea?",
    },
  ];

  const { ok } = await inquirer.prompt(confirmQuestion);
  return ok;
};

const showListTasksToComplete = async (tasks = []) => {
  const choices = tasks.map((task, index) => {
    const { id, description, completedAt } = task;
    const item = `${index + 1}.`.green;
    return {
      value: id,
      name: `${item} ${description}`,
      checked: completedAt ? true : false,
    };
  });

  const completeTaskQuestions = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccionar",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(completeTaskQuestions);
  return ids;
};

module.exports = {
  showMainMenu,
  pause,
  readInput,
  showListTasksToDelete,
  confirmDeletion,
  showListTasksToComplete,
};
