import { Spinner } from "cli-spinner";

class utils {
  static async runTask(logMessage, task) {
    const spinner = new Spinner(logMessage + " %s");
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
}

export default utils;
