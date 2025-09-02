import inquirer from "inquirer";
import { PROMPTS } from "./constants.js";

const mfeGen = async()=>{
    
   const result =  await inquirer.prompt(PROMPTS);

    console.log('result',result)
    
}
export default mfeGen;