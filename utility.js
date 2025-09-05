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
import { writeFile, unlink, mkdir } from "fs/promises";

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
  static async configureContainer(info, mfeNames) {
    const {
      projectName,
      projectDescription,
      isTypeScript,
      styling,
      stateManagement,
    } = info;
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

    const packagesList = [
      ...DEFAULT_DEPENDENCIES,
      ...LIBRARY_PAIR.STYLING[styling],
      ...LIBRARY_PAIR.STATE_MANAGEMENT[stateManagement],
    ];
    await utils.installPackages(packagesList);
  }
}

export default utils;
