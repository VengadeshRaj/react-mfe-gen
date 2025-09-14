import { Spinner } from "cli-spinner";
import { execa } from "execa";
import {
  INFO_MESSAGE,
  LIBRARY_PAIR,
  DEFAULT_DEPENDENCIES,
  DEFAULT_DEV_DEPENDENCIES,
} from "./constants.js";
import {
  getHeartContent,
  getAppContent,
  getMfeCompContent,
  getContainerCompContent,
  getEnvContent,
} from "./templates/container/index.js";
import { writeFile, unlink, mkdir, readFile, rm } from "fs/promises";
import {
  getConfigOverridesContent,
  getMfeAppContent,
  getmfeIndexContent,
} from "./templates/mfe/index.js";
class utils {
  static async runTask(logMessage, task) {
    const spinner = new Spinner(logMessage + "%s");
    spinner.setSpinnerString("⠋⠙⠹⠸⠼⠴⠦⠧⠏");
    spinner.setSpinnerDelay(40);
    spinner.start();
    try {
      await task();
      spinner.stop(true);
    } catch (err) {
      spinner.stop(true);
      throw err;
    }
  }
  static async cleanupProject(dirs) {
    try {
      for (let i = 0; i < dirs.length; i++) {
        console.log(`Cleaning up the project directory: ${dirs[i]}`);
        await rm(dirs[i], { recursive: true });
      }
    } catch (err) {
      console.log(`Failed to clean project directory\n Error:${err}`);
    }
  }
  static async createReactApp(appCommand) {
    try {
      await utils.runTask(INFO_MESSAGE.APP_CREATION, () =>
        execa("npx", ["create-react-app", ...appCommand])
      );
    } catch (err) {
      throw err;
    }
  }
  static async installPackages(packages, isDev = false) {
    try {
      let message = INFO_MESSAGE.i_DEPENDENCIES;
      if (isDev) {
        message = INFO_MESSAGE.i_DEV_DEPENDENCIES;
        packages = [...packages, "--save-dev"];
      }
      await utils.runTask(message, () =>
        execa("npm", ["install", ...packages])
      );
    } catch (err) {
      throw err;
    }
  }
  static getLanguageTemplate(appName, isTs) {
    return isTs ? [appName, "--template", "typescript"] : [appName];
  }

  static withExt(name, isTs) {
    return isTs ? `${name}.tsx` : `${name}.jsx`;
  }
  static withScript(name, isTs) {
    return isTs ? `${name}.ts` : `${name}.js`;
  }
  static toCompName(AppName) {
    return AppName.replace(/[-\s]+/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("");
  }
  static async updateScripts(dir, newScripts) {
    const rawPackageJson = await readFile(dir);
    const packageJSON = JSON.parse(rawPackageJson, "utf8");

    packageJSON.scripts = newScripts;

    await writeFile(dir, JSON.stringify(packageJSON, null, 2), "utf8");
  }
  static async configureContainer(info, mfeNames) {
    // Destructure inputs
    const {
      projectName,
      projectDescription,
      isTypeScript,
      styling,
      stateManagement,
    } = info;

    // Go inside src
    process.chdir(`${process.cwd()}\\${projectName}\\src`);

    // Create heart of container
    await utils.runTask(INFO_MESSAGE.CONFIGURE_CONTAINER, () =>
      writeFile("MicroFrontend.js", getHeartContent(projectName))
    );

    // Convert project name into component name format
    const containerCompName = utils.toCompName(projectName);

    // Create container component
    await utils.runTask(INFO_MESSAGE.CONFIGURE_CONTAINER, () =>
      writeFile(
        utils.withExt(containerCompName, isTypeScript),
        getContainerCompContent(containerCompName, mfeNames)
      )
    );

    // Modify App.jsx or .tsx file
    await utils.runTask(INFO_MESSAGE.CONFIGURE_CONTAINER, () =>
      writeFile(
        utils.withExt("App", isTypeScript),
        getAppContent(containerCompName)
      )
    );

    // Drop unnecessary files
    await unlink("App.css");
    await unlink("logo.svg");

    // Create MFE folders
    await mkdir("microfrontends");

    // Go inside MFE folder
    process.chdir(`${process.cwd()}\\microfrontends`);

    // Run loop and create number of mfe components
    for (let i = 0; i < mfeNames.length; i++) {
      const mfeCompName = utils.toCompName(mfeNames[i]);
      await writeFile(
        utils.withExt(mfeCompName, isTypeScript),
        getMfeCompContent(mfeCompName, isTypeScript)
      );
    }

    // Go to root
    process.chdir("../../");
    // Create env file with specified MFE default ports
    await writeFile(".env", getEnvContent(mfeNames));

    // Install common and user defined packages
    const packagesList = [
      ...DEFAULT_DEPENDENCIES,
      ...LIBRARY_PAIR.STYLING[styling],
      ...LIBRARY_PAIR.STATE_MANAGEMENT[stateManagement],
    ];
    await utils.installPackages(packagesList);

    // Create readme
    await writeFile("README.md", `# ${projectName}\n${projectDescription}`);

    console.log(`${projectName} created ✅\n`);
  }
  static async configureMfe(info, mfeName, index) {
    // Destructure inputs
    const {
      projectName,
      formManagement,
      styling,
      stateManagement,
      isTypeScript,
    } = info;
    // Go inside src
    process.chdir(`${process.cwd()}\\${mfeName}\\src`);

    // Modify App.jsx or .tsx file
    await writeFile(
      utils.withExt("App", isTypeScript),
      getMfeAppContent(utils.toCompName(mfeName), isTypeScript)
    );

    // Modify index.jsx or .tsx file
    await writeFile(
      utils.withExt("index", isTypeScript),
      getmfeIndexContent(utils.toCompName(mfeName), projectName, isTypeScript)
    );

    // Drop unnecessary files
    await unlink("App.css");
    await unlink("logo.svg");
    await unlink("index.css");

    // Go to root
    process.chdir("../");

    // add config override file
    await writeFile("config-overrides.js", getConfigOverridesContent());

    const updatedScript = {
      start: `cross-env PORT=900${index} react-app-rewired start`,
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

    await utils.installPackages(DEFAULT_DEV_DEPENDENCIES, true);

    // Create readme
    await writeFile("README.md", `# ${mfeName}`);

    console.log(`${mfeName} created ✅`);
  }
}

export default utils;
