import path from "path";
import { Spinner } from "cli-spinner";
import { execa } from "execa";
import {
  INFO_MESSAGE,
  LIBRARY_PAIR,
  DEFAULT_DEPENDENCIES,
  DEFAULT_DEV_DEPENDENCIES,
} from "../constants/constants";
import {
  getHeartContent,
  getAppContent,
  getMfeCompContent,
  getContainerCompContent,
  getEnvContent,
} from "../templates/container";
import { writeFile, unlink, mkdir, readFile, rm } from "fs/promises";
import {
  getConfigOverridesContent,
  getMfeAppContent,
  getmfeIndexContent,
} from "../templates/mfe";

class utils {
  static async runTask(logMessage:string, task:()=> void) {
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

  static async cleanupProject(dirs:string[]) {
    try {
      for (let i = 0; i < dirs.length; i++) {
        mfeGenLogger.notifyLog(`Cleaning up the project directory: ${dirs[i]}`);
        await rm(dirs[i], { recursive: true });
      }
    } catch (err) {
      mfeGenLogger.ErrorLog(`Failed to clean project directory\n Error:${err}`);
    }
  }

  static async createReactApp(appCommand:string[]) {
    try {
      await utils.runTask(INFO_MESSAGE.APP_CREATION, () =>
        execa("npx", ["create-react-app", ...appCommand])
      );
    } catch (err) {
      throw err;
    }
  }

  static async installPackages(packages:string [], isDev = false) {
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

  static getLanguageTemplate(appName:string, isTs:boolean) {
    return isTs ? [appName, "--template", "typescript"] : [appName];
  }

  static withExt(name:string, isTs:boolean) {
    return isTs ? `${name}.tsx` : `${name}.jsx`;
  }

  static withScript(name:string, isTs:boolean) {
    return isTs ? `${name}.ts` : `${name}.js`;
  }

  static toCompName(AppName:string) {
    return AppName.replace(/[-\s]+/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("");
  }

  static async updateScripts(dir:string, newScripts:any) {
    const rawPackageJson:any = await readFile(dir);
    const packageJSON = JSON.parse(rawPackageJson);

    packageJSON.scripts = newScripts;

    await writeFile(dir, JSON.stringify(packageJSON, null, 2), "utf8");
  }

  static async configureContainer(info:any, mfeNames:string[]) {
    const {
      projectName,
      projectDescription,
      isTypeScript,
      styling,
      stateManagement,
    } = info;

    // Go inside src
    const srcPath = path.join(process.cwd(), projectName, "src");
    process.chdir(srcPath);

    await utils.runTask(INFO_MESSAGE.CONFIGURE_CONTAINER, () =>
      writeFile("MicroFrontend.js", getHeartContent(projectName))
    );

    const containerCompName = utils.toCompName(projectName);

    await utils.runTask(INFO_MESSAGE.CONFIGURE_CONTAINER, () =>
      writeFile(
        utils.withExt(containerCompName, isTypeScript),
        getContainerCompContent(containerCompName, mfeNames)
      )
    );

    await utils.runTask(INFO_MESSAGE.CONFIGURE_CONTAINER, () =>
      writeFile(
        utils.withExt("App", isTypeScript),
        getAppContent(containerCompName)
      )
    );

    await unlink("App.css");
    await unlink("logo.svg");

    await mkdir("microfrontends");

    const mfeFolderPath = path.join(process.cwd(), "microfrontends");
    process.chdir(mfeFolderPath);

    for (let i = 0; i < mfeNames.length; i++) {
      const mfeCompName = utils.toCompName(mfeNames[i]);
      await writeFile(
        utils.withExt(mfeCompName, isTypeScript),
        getMfeCompContent(mfeCompName, isTypeScript)
      );
    }

    process.chdir(path.resolve(srcPath, ".."));

    await writeFile(".env", getEnvContent(mfeNames));

    const packagesList = [
      ...DEFAULT_DEPENDENCIES,
      ...LIBRARY_PAIR.STYLING[styling],
      ...LIBRARY_PAIR.STATE_MANAGEMENT[stateManagement],
    ];
    await utils.installPackages(packagesList);

    await writeFile("README.md", `# ${projectName}\n${projectDescription}`);

    console.log(`${projectName} created ✅\n`);
  }

  static async configureMfe(info:any, mfeName:string, index:number) {
    const {
      projectName,
      formManagement,
      styling,
      stateManagement,
      mfeDescription = "",
      isTypeScript,
    } = info;

    const mfeSrcPath = path.join(process.cwd(), mfeName, "src");
    process.chdir(mfeSrcPath);

    await writeFile(
      utils.withExt("App", isTypeScript),
      getMfeAppContent(utils.toCompName(mfeName), isTypeScript)
    );

    await writeFile(
      utils.withExt("index", isTypeScript),
      getmfeIndexContent(utils.toCompName(mfeName), projectName, isTypeScript)
    );

    await unlink("App.css");
    await unlink("logo.svg");
    await unlink("index.css");

    process.chdir(path.resolve(mfeSrcPath, ".."));

    await writeFile("config-overrides.js", getConfigOverridesContent());

    const updatedScript = {
      start: `cross-env PORT=900${index} react-app-rewired start`,
      build: "react-app-rewired build",
      test: "react-app-rewired test",
      eject: "react-app-rewired eject",
    };

    await utils.updateScripts(
      path.join(process.cwd(), "package.json"),
      updatedScript
    );

    const packagesList = [
      ...DEFAULT_DEPENDENCIES,
      ...LIBRARY_PAIR.STYLING[styling],
      ...LIBRARY_PAIR.STATE_MANAGEMENT[stateManagement],
      ...LIBRARY_PAIR.FORM_MANAGEMENT[formManagement],
    ];

    await utils.installPackages(packagesList);
    await utils.installPackages(DEFAULT_DEV_DEPENDENCIES, true);

    await writeFile("README.md", `# ${mfeName}\n##${mfeDescription}`);

    console.log(`${mfeName} created ✅`);
  }
}

class mfeGenLogger {
  static successLog(message:string) {
    console.log(`\x1b[32m${message}\x1b[0m`);
  }
  static ErrorLog(message:string) {
    console.log(`\x1b[31m${message}\x1b[0m`);
  }
  static notifyLog(message:string) {
    console.log(`\x1b[33m${message}\x1b[0m`);
  }
}

export { utils, mfeGenLogger };
