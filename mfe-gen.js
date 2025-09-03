import inquirer from "inquirer";
import { PROMPT, INFO_MESSAGE } from "./constants.js";
import {newProjectCreation} from "./creation/index.js";

const mfeGen = async () => {
  console.log(INFO_MESSAGE.DISCLAIMER);

  const { typeOfAction, language } = await inquirer.prompt(PROMPT.USER_NEED);
  switch (typeOfAction) {
    case "Create a new project":
      newProjectCreation(language);
      break;
    case "Create only a container":
      containerCreation(language);
      break;
    case "Create a single micro-frontend":
      singleMfeCreation(language);
      break;
  }
};

export default mfeGen;
