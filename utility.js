import { Spinner } from "cli-spinner";
import { execa } from "execa";

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
  static async createReactApp(command) {
    try {
        await utils.runTask(INFO_MESSAGE.APP_CREATION, () =>
          execa("npx", ["create-react-app", ...command])
        );
    } catch (err) {
      throw err;
    }
  }
}

export default utils;
