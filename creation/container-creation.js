import inquirer from "inquirer";
import { PROMPT, INFO_MESSAGE, CHOICE_CONSTANTS } from "../constants.js";
import utils from "../utility.js";

const containerCreation = async (language) => {
  // Get typescript flag
  const isTypeScript = language === CHOICE_CONSTANTS.LANGUAGE.TYPE_SCRIPT;
  // Declare array to store list of mfe names
  const mfeNames = [];

  const { containerName, containerDescription,numberOfMfes } = await inquirer.prompt(
    PROMPT.CONTAINER
  );

    // Interate to get each mfe name
  for (let i = 0; i < numberOfMfes; i++) {
    const { mfeName } = await inquirer.prompt([
      {
        message: `Enter your name of Microfront end ${i + 1}:`,
        type: "input",
        name: "mfeName",
        validate(value) {
          if (!/^[a-z-]+$/.test(value)) {
            return "Please use only lowercase letters and '-' (numbers, capital letters, and other symbols are not allowed).";
          }
          return true;
        },
      },
    ]);
    mfeNames.push(mfeName);
  }

  console.log(`${INFO_MESSAGE.CREATE_APP}${containerName} as container`);

  // Get container path and app requirements
  const commonInfo = await inquirer.prompt([
    PROMPT.CONDITIONAL.CONTAINER_PATH,
    ...PROMPT.COMMON,
  ]);

  // Go inside user specified dir
  process.chdir(commonInfo.containerPath);

  // Array to store CRA command
  const appCommand = utils.getLanguageTemplate(containerName, isTypeScript);

  // Create container react app
  await utils.createReactApp(appCommand);

  // Make normal react app into MFE container
  await utils.configureContainer(
    {
      projectName: containerName,
      projectDescription: containerDescription,
      ...commonInfo,
      isTypeScript,
    },
    mfeNames
  );

  // Let user know container created status
  console.log(`${INFO_MESSAGE.SUCCESS.CONTAINER}\n${INFO_MESSAGE.HAPPY_CODING}`);
};

export default containerCreation;
