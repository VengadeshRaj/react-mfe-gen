import inquirer from "inquirer";
import { PROMPT, INFO_MESSAGE, CHOICE_CONSTANTS } from "./constants.js";
import {
  newProjectCreation,
  containerCreation,
  singleMfeCreation,
} from "./creation/index.js";
import { mfeGenLogger } from "./utility.js";

const mfeGen = async () => {
  mfeGenLogger.notifyLog(INFO_MESSAGE.DISCLAIMER);

  const { typeOfAction, language } = await inquirer.prompt(PROMPT.USER_NEED);
  switch (typeOfAction) {
    case CHOICE_CONSTANTS.ACTION.NEW_PROJECT:
      newProjectCreation(language);
      break;
    case CHOICE_CONSTANTS.ACTION.CONTAINER:
      containerCreation(language);
      break;
    case CHOICE_CONSTANTS.ACTION.SINGLE_MFE:
      singleMfeCreation(language);
      break;
  }
};

export default mfeGen;
