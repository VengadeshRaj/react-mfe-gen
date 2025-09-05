import { Spinner } from "cli-spinner";
import { execa } from "execa";
import { INFO_MESSAGE } from "./constants.js";

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
  static withExt(name,isTs) {
    return isTs ? `${name}.tsx` : `${name}.jsx`;
  }
  static withScript(name,isTs) {
    return isTs ? `${name}.ts` : `${name}.js`;
  }
  static toCompName(AppName) {
  return AppName
    .replace(/[-\s]+/g, " ")                
    .split(" ")                             
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}
}

export default utils;
