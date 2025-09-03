import inquirer from "inquirer";
import { PROMPT, getInfoMessage } from "./constants.js";
import utils from "./utility.js";

const mfeGen = async () => {
  console.log(getInfoMessage().disclaimer);

  const { typeOfAction, language } = await inquirer.prompt(PROMPT.USER_NEED);
  switch (typeOfAction) {
    case "Create a new project":
      newProjectCreation(language);
      break;
    case "Create only a container":
      conatinerCreation(language);
      break;
    case "Create a single micro-frontend":
      singleMfeCreation(language);
      break;
  }
};

const newProjectCreation = async(language) => {
    const { projectName, projectDescription,numberOfMfes } = await inquirer.prompt(PROMPT.ENTIRE_PROJECT);

    const { styling, stateManagement,formManagement } = await inquirer.prompt(PROMPT.COMMON);
    await utils.runTask(getInfoMessage());

};
const conatinerCreation = (language) => {};
const singleMfeCreation = (language) => {};

export default mfeGen;
