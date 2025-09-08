import { Spinner } from "cli-spinner";
import { execa } from "execa";
import {
  INFO_MESSAGE,
  LIBRARY_PAIR,
  DEFAULT_DEPENDENCIES,
} from "./constants.js";
import {
  getHeartContent,
  getAppContent,
  getMfeCompContent,
  getContainerCompContent,
  getEnvContent,
} from "./templates/container/index.js";
import { writeFile, unlink, mkdir, readFile } from "fs/promises";

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
  static async createReactApp(appCommand) {
    try {
      await utils.runTask(INFO_MESSAGE.APP_CREATION, () =>
        execa("npx", ["create-react-app", ...appCommand])
      );
    } catch (err) {
      throw err;
    }
  }
  static async installPackages(packages) {
    try {
      await utils.runTask(INFO_MESSAGE.i_DEPENDENCIES, () =>
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
    const rawPackageJson = await readFile(proDir);
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
    await writeFile("MicroFrontend.js", getHeartContent(projectName));

    // Convert project name into component name format
    const containerCompName = utils.toCompName(projectName);

    // Create container component
    await writeFile(
      utils.withExt(containerCompName, isTypeScript),
      getContainerCompContent(containerCompName, mfeNames)
    );

    // Modify App.jsx or .tsx file
    await writeFile(
      utils.withExt("App", isTypeScript),
      getAppContent(containerCompName)
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
      await writeFile(
        utils.withExt(mfeNames[i], isTypeScript),
        getMfeCompContent(mfeNames[i], isTypeScript)
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
  }
  static async configureMfe(info, mfeNames) {
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
    await writeFile("MicroFrontend.js", getHeartContent(projectName));

    // Convert project name into component name format
    const containerCompName = utils.toCompName(projectName);

    // Create container component
    await writeFile(
      utils.withExt(containerCompName, isTypeScript),
      getContainerCompContent(containerCompName, mfeNames)
    );

    // Modify App.jsx or .tsx file
    await writeFile(
      utils.withExt("App", isTypeScript),
      getAppContent(containerCompName)
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
      await writeFile(
        utils.withExt(mfeNames[i], isTypeScript),
        getMfeCompContent(mfeNames[i], isTypeScript)
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
  }
}

export default utils;
