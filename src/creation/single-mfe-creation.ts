import inquirer from "inquirer";
import { PROMPT, INFO_MESSAGE, CHOICE_CONSTANTS } from "../constants/constants";
import { mfeGenLogger, utils } from "../utils/utility";
import path from "path";

const singleMfeCreation = async (language:string) => {
  // To store different working dir
  const workingDirectories = [];
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
    const mfepPath = path.join(mfeInfo.mfePath, mfeName);
    workingDirectories.push(mfepPath);

    // Go inside user specified dir
    process.chdir(mfeInfo.mfePath);

    // Array to store CRA command
    const appCommand = utils.getLanguageTemplate(mfeName, isTypeScript);

    // Create container react app
    await utils.createReactApp(appCommand);

    // Make normal react app into MFE container
    await utils.configureMfe(
      { ...mfeInfo, projectName: mfeName, mfeDescription, isTypeScript },
      mfeName,
      0
    );

    mfeGenLogger.successLog(
      `${INFO_MESSAGE.SUCCESS.ONE_MFE}\n${INFO_MESSAGE.HAPPY_CODING}`
    );
  } catch (e) {
    mfeGenLogger.ErrorLog(`Error: ${e}`);
    utils.cleanupProject(workingDirectories);
  }
};

export default singleMfeCreation;
