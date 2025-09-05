import inquirer from "inquirer";
import { PROMPT, INFO_MESSAGE } from "../constants.js";
import utils from "../utility.js";

const newProjectCreation = async (language) => {
  const isTypeScript = language === "TypeScript";
  const mfeNames = [];
  const projectInfo = await inquirer.prompt(PROMPT.ENTIRE_PROJECT);

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

  let appCommand = [projectInfo.projectName];

  console.log(
    `${INFO_MESSAGE.START_CONTAINER_CREATION}${projectInfo.projectName} as container`
  );

  const commonInfo = await inquirer.prompt([
    PROMPT.CONDITIONAL.CONTAINER_PATH,
    ...PROMPT.COMMON,
  ]);

  process.chdir(commonInfo.containerPath);

  if (isTypeScript) appCommand = [...appCommand, "--template", "typescript"];

  await utils.createReactApp(appCommand);

  await utils.configureContainer(
    { ...projectInfo, ...commonInfo, isTypeScript },
    mfeNames
  );
};

export default newProjectCreation;
