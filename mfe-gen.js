import inquirer from "inquirer";
import { PROMPTS } from "./constants.js";

const mfeGen = async () => {
  console.log(
    "👋 Hi there!\n\n⚙️ This tool currently supports micro-frontend creation with runtime integration through custom script injection.\n📌 Please consider this limitation when developing your MFE applications using this tool.\n"
  );
  const result = await inquirer.prompt(PROMPTS);

  console.log("result", result);
};
export default mfeGen;
