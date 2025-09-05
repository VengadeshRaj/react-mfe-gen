import inquirer from "inquirer";
import { PROMPT, INFO_MESSAGE } from "../constants.js";
import utils from "../utility.js";
import { writeFile, unlink, mkdir } from "fs/promises";
import {
  getHeartContent,
  getAppContent,
  getMfeCompContent,
  getContainerCompContent,
  getEnvContent
} from "../templates/container/index.js";

const newProjectCreation = async (language) => {
  const isTypeScript = language === "TypeScript";
  const mfeNames = [];
  const { projectName, projectDescription, numberOfMfes } =
    await inquirer.prompt(PROMPT.ENTIRE_PROJECT);

  for (let i = 0; i < numberOfMfes; i++) {
    const { mfeName } = await inquirer.prompt([
      {
        message: `Enter your name of Microfront end ${i + 1}`,
        type: "input",
        name: "mfeName",
      },
    ]);
    mfeNames.push(mfeName);
  }

  let appCommand = [projectName];

  console.log(
    `${INFO_MESSAGE.START_CONTAINER_CREATION}${projectName} as container`
  );

  const { containerPath, styling, stateManagement } = await inquirer.prompt([
    PROMPT.CONDITIONAL.CONTAINER_PATH,
    ...PROMPT.COMMON,
  ]);

  process.chdir(containerPath);

  if (isTypeScript) appCommand = [...appCommand, "--template", "typescript"];

  await utils.createReactApp(appCommand);

  process.chdir(`${process.cwd()}\\${projectName}\\src`);

  await writeFile("MicroFrontend.js", getHeartContent(projectName));

  const containerCompName = utils.toCompName(projectName);

  await writeFile(
    utils.withExt(containerCompName, isTypeScript),
    getContainerCompContent(containerCompName, mfeNames)
  );

  await writeFile(
    utils.withExt("App", isTypeScript),
    getAppContent(containerCompName)
  );

  await unlink("App.css");
  await unlink("logo.svg");

  await mkdir("microfrontends");

  process.chdir(`${process.cwd()}\\microfrontends`);

  for (let i = 0; i < mfeNames.length; i++) {
    await writeFile(
      utils.withExt(mfeNames[i], isTypeScript),
      getMfeCompContent(mfeNames[i], isTypeScript)
    );
  }

  process.chdir("../../");
  await writeFile(".env", getEnvContent(mfeNames));
};

export default newProjectCreation;
