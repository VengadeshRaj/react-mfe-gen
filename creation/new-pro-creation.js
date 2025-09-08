import inquirer from "inquirer";
import {
  PROMPT,
  INFO_MESSAGE,
  DEFAULT_DEPENDENCIES,
  LIBRARY_PAIR,
} from "../constants.js";
import utils from "../utility.js";
import {
  getConfigOverridesContent,
  getMfeAppContent,
  getmfeIndexContent,
} from "../templates/mfe/index.js";

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

  console.log(
    `${INFO_MESSAGE.CREATE_APP}${projectInfo.projectName} as container`
  );

  // Get container path and app requirements
  const commonInfo = await inquirer.prompt([
    PROMPT.CONDITIONAL.CONTAINER_PATH,
    ...PROMPT.COMMON,
  ]);

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
  await utils.runTask(INFO_MESSAGE.CONFIGURE_CONTAINER, () =>
    utils.configureContainer(
      { ...projectInfo, ...commonInfo, isTypeScript },
      mfeNames
    )
  );
  // Let user know container created status
  console.log(INFO_MESSAGE.COMPLETE_CONTAINER);

  // Get mfe requirements for each mfe
  for (let i = 0; i < mfeNames.length; i++) {
    const mfeName = mfeNames[i];

    console.log(`${INFO_MESSAGE.CREATE_APP}${mfeName}\n`);

    const { path, formManagement, styling, stateManagement } =
      await inquirer.prompt([
        {
          message: `${PROMPT.CONDITIONAL.PATH}${mfeName} as microfront end\ne.g: G:\\workspace\\sample-mfe\n:`,
          type: "input",
          name: "path",
        },
        PROMPT.CONDITIONAL.FORM_MANAGEMENT,
        PROMPT.COMMON,
      ]);
    // Go inside user specified mfe dir
    process.chdir(path);
    const mfeAppCommand = utils.getLanguageTemplate(mfeName, isTypeScript);

    // Create mfe react app
    await utils.createReactApp(mfeAppCommand);

    // Go inside src
    process.chdir(`${process.cwd()}\\${mfeName}\\src`);

    // Modify App.jsx or .tsx file
    await writeFile(
      utils.withExt("App", isTypeScript),
      getMfeAppContent(mfeName, isTypeScript)
    );

    // Modify index.jsx or .tsx file
    await writeFile(
      utils.withExt("index", isTypeScript),
      getmfeIndexContent(mfeName, isTypeScript)
    );

    // Drop unnecessary files
    await unlink("App.css");
    await unlink("logo.svg");
    await unlink("index.css");

    // Go to root
    process.chdir("../");

    // add config override file
    await writeFile(
      utils.withExt("config-overrides.js"),
      getConfigOverridesContent()
    );

    const updatedScript = {
      start: `cross-env PORT=900${i} react-app-rewired start`,
      build: "react-app-rewired build",
      test: "react-app-rewired test",
      eject: "react-app-rewired eject",
    };

    // modify package.json scripts
    utils.updateScripts(`${process.cwd()}\\package.json`, updatedScript);

    // Install common and user defined packages
    const packagesList = [
      ...DEFAULT_DEPENDENCIES,
      ...LIBRARY_PAIR.STYLING[styling],
      ...LIBRARY_PAIR.STATE_MANAGEMENT[stateManagement],
      ...LIBRARY_PAIR.FORM_MANAGEMENT[formManagement],
    ];

    await utils.installPackages(packagesList);

    // Create readme
    await writeFile("README.md", `# ${mfeName}`);

    console.log("done!");
  }
};

export default newProjectCreation;
