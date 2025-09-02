export const PROMPTS = [
  {
    message: "Please enter your project name :",
    type: "input",
    name: "projectName",
  },
  {
    message: "Please enter your project description :",
    type: "input",
    name: "projectDescription",
  },
  {
    message: "Language preference :",
    type: "list",
    name: "language",
    choices: ["JavaScript", "TypeScript"],
  },
    {
    type: 'input',
    name: 'numberOfMfes',
    message: 'How many microfront ends planning to have ?',
    validate(value) {
      const notaNumber = !Number.isNaN(Number.parseFloat(value));
      return notaNumber || 'Please enter a number';
    },
    filter: Number,
  },
];
