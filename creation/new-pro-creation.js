import inquirer from "inquirer";
import { PROMPT, INFO_MESSAGE } from "../constants.js";
import utils from "../utility.js";

const newProjectCreation = async (language) => {  
  const { projectName, projectDescription, numberOfMfes } =
    await inquirer.prompt(PROMPT.ENTIRE_PROJECT);

  let appCommand = [ projectName];

  console.log(
    `${INFO_MESSAGE.START_CONTAINER_CREATION}${projectName} as container`
  );

  const { containerPath, styling, stateManagement } = await inquirer.prompt([
    PROMPT.CONDITIONAL.CONTAINER_PATH,
    ...PROMPT.COMMON,
  ]);

  process.chdir(containerPath);

  if (language === "TypeScript")
    appCommand = [...appCommand, "--template", "typescript"];

  await utils.createReactApp(appCommand);

  console.log("appCommand",appCommand);
};

export default newProjectCreation;
