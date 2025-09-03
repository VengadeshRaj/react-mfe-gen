import inquirer from "inquirer";
import { PROMPT, INFO_MESSAGE } from "./constants.js";
import utils from "./utility.js";
import { execa } from "execa";

const mfeGen = async () => {
  console.log(INFO_MESSAGE.DISCLAIMER);

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

const newProjectCreation = async (language) => {
  let appCommand = ["create-react-app"];
  const { projectName, projectDescription, numberOfMfes } =
    await inquirer.prompt(PROMPT.ENTIRE_PROJECT);

  appCommand = [...appCommand, projectName];

  console.log(
    `${INFO_MESSAGE.START_CONTAINER_CREATION}${projectName} as container`
  );

  const { containerPath, styling, stateManagement } = await inquirer.prompt([
    PROMPT.CONDITIONAL.CONTAINER_PATH,
    ...PROMPT.COMMON,
  ]);

  process.chdir(containerPath);

  if (language === "TypeScript") appCommand = [...appCommand, "--template", "typescript"];
  
  utils.createReactApp(appCommand);

  console.log("Done");
};
const conatinerCreation = (language) => {};
const singleMfeCreation = (language) => {};

export default mfeGen;
