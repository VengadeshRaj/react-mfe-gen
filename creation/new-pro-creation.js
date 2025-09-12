import inquirer from "inquirer";
import {
  PROMPT,
  INFO_MESSAGE,
  QUESTION,
  CHOICE_CONSTANTS,
} from "../constants.js";
import utils from "../utility.js";

const newProjectCreation = async (language) => {
  // To store different working dir
  const wrokingDirectories = [];
  try {
    // Get typescript flag
    const isTypeScript = language === CHOICE_CONSTANTS.LANGUAGE.TYPE_SCRIPT;
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

    console.log(
      `${INFO_MESSAGE.CREATE_APP}${projectInfo.projectName} as container`
    );

    // Get container path and app requirements
    const commonInfo = await inquirer.prompt([
      PROMPT.CONDITIONAL.CONTAINER_PATH,
      ...PROMPT.COMMON,
    ]);

    // store working dir
    wrokingDirectories.push(
      `${commonInfo.containerPath}\\${projectInfo.projectName}`
    );
    // Go inside user specified dir
    process.chdir(commonInfo.containerPath);

    // Array to store CRA command
    const appCommand = utils.getLanguageTemplate(
      projectInfo.projectName,
      isTypeScript
    );

    // Create container react app
    await utils.createReactApp(appCommand);

    // Make normal react app into MFE container
    await utils.configureContainer(
      { ...projectInfo, ...commonInfo, isTypeScript },
      mfeNames
    );

    // Get mfe requirements for each mfe
    for (let i = 0; i < mfeNames.length; i++) {
      const mfeName = mfeNames[i];

      console.log(`${INFO_MESSAGE.CREATE_APP}${mfeName}\n`);

      const mfeInfo = await inquirer.prompt([
        {
          message: `${QUESTION.PATH}${mfeName} as microfront end\ne.g: G:\\workspace\\sample-mfe\n:`,
          type: "input",
          name: "path",
        },
        PROMPT.CONDITIONAL.FORM_MANAGEMENT,
        ...PROMPT.COMMON,
      ]);
      // store working dir
      wrokingDirectories.push(
        `${mfeInfo.path}\\${mfeName}`
      );
      // Go inside user specified mfe dir
      process.chdir(mfeInfo.path);
      const mfeAppCommand = utils.getLanguageTemplate(mfeName, isTypeScript);

      // Create mfe react app
      await utils.createReactApp(mfeAppCommand);

      // Make normal react app into MFE container
      await utils.configureMfe(
        { ...mfeInfo, projectName: projectInfo.projectName, isTypeScript },
        mfeName,
        i
      );
    }

    console.log(
      `${INFO_MESSAGE.SUCCESS.NEW_PRO}\n${INFO_MESSAGE.HAPPY_CODING}`
    );
  } catch {
    utils.cleanupProject(wrokingDirectories);
  }
};

export default newProjectCreation;
