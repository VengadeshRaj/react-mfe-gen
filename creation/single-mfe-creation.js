import inquirer from "inquirer";
import { PROMPT, INFO_MESSAGE, CHOICE_CONSTANTS } from "../constants.js";
import utils from "../utility.js";

const singleMfeCreation = async (language) => {
  // To store different working dir
  const wrokingDirectories = [];
  try {
    // Get typescript flag
    const isTypeScript = language === CHOICE_CONSTANTS.LANGUAGE.TYPE_SCRIPT;

    const { mfeName, mfeDescription } = await inquirer.prompt(PROMPT.ONE_MFE);

    console.log(`${INFO_MESSAGE.CREATE_APP}${mfeName} as microfront end`);

    const mfeInfo = await inquirer.prompt([
      PROMPT.CONDITIONAL.MFE_PATH,
      ...PROMPT.COMMON,
      PROMPT.CONDITIONAL.FORM_MANAGEMENT,
    ]);

        // store working dir
    wrokingDirectories.push(
      `${mfeInfo.mfePath}\\${mfeName}`
    );

    // Go inside user specified dir
    process.chdir(mfeInfo.mfePath);

    // Array to store CRA command
    const appCommand = utils.getLanguageTemplate(mfeName, isTypeScript);

    // Create container react app
    await utils.createReactApp(appCommand);

    // Make normal react app into MFE container
    await utils.configureMfe(
      { ...mfeInfo, projectName: mfeName, isTypeScript },
      mfeName,
      0
    );

    console.log(
      `${INFO_MESSAGE.SUCCESS.ONE_MFE}\n${INFO_MESSAGE.HAPPY_CODING}`
    );
  } catch {
    utils.cleanupProject(wrokingDirectories)
  }
};

export default singleMfeCreation;
