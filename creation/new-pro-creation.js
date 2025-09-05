import inquirer from "inquirer";
import { PROMPT, INFO_MESSAGE } from "../constants.js";
import utils from "../utility.js";

const newProjectCreation = async (language) => {
  // Get typescript flag
  const isTypeScript = language === "TypeScript";
  // Declare array to store list of mfe names
  const mfeNames = [];
  // Get basic project info
  const projectInfo = await inquirer.prompt(PROMPT.ENTIRE_PROJECT);

  // Interate to get each mfe name
  for (let i = 0; i < projectInfo.numberOfMfes; i++) {
    const { mfeName } = await inquirer.prompt([
      {
        message: `Enter your name of Microfront end ${i + 1}:`,
        type: "input",
        name: "mfeName",
      },
    ]);
    mfeNames.push(mfeName);
  }

  // Array to store CRA command
  let appCommand = [projectInfo.projectName];

  console.log(
    `${INFO_MESSAGE.START_CONTAINER_CREATION}${projectInfo.projectName} as container`
  );

  // Get container path and app requirements
  const commonInfo = await inquirer.prompt([
    PROMPT.CONDITIONAL.CONTAINER_PATH,
    ...PROMPT.COMMON,
  ]);

  // Go inside user specified dir
  process.chdir(commonInfo.containerPath);

  // Modify CRA array based on ts requirement
  if (isTypeScript) appCommand = [...appCommand, "--template", "typescript"];

  // Create container react app
  await utils.createReactApp(appCommand);

  // Make normal react app into MFE container
  await utils.configureContainer(
    { ...projectInfo, ...commonInfo, isTypeScript },
    mfeNames
  );
};

export default newProjectCreation;
