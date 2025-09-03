export const QUESTION = {
  ACTION: "Select an action:",
  LANGUAGE: "Choose your preferred language:",
  PROJECT_NAME: "Enter your project name:",
  PROJECT_DESCRIPTION: "Enter your project description:",
  NUMBER_OF_MFES: "How many micro-frontends do you plan to include?",
  MFE_NAME:
    "Enter your micro-frontend name:\n**Note:** This will be used as a prefix in window functions.",
  MFE_DESCRIPTION: "Enter a description for your micro-frontend:",
  CONTAINER_NAME:
    "Enter your container app name:\n**Note:** This will be used as a prefix in window functions.",
  CONTAINER_DESCRIPTION: "Enter a description for your container app:",
  STYLING: "Select a styling solution:",
  STATE_MANAGEMENT: "Select a state management library:",
  FORM_MANAGEMENT: "Select a form management library:",
  CONDITIONAL_MFE_NAME: "Enter your micro-frontend name:",
};

export const PROMPT = {
  USER_NEED: [
    {
      message: QUESTION.ACTION,
      type: "list",
      name: "typeOfAction",
      choices: [
        "Create a new project",
        "Create only a container",
        "Create a single micro-frontend",
      ],
    },
    {
      message: QUESTION.LANGUAGE,
      type: "list",
      name: "language",
      choices: ["JavaScript", "TypeScript"],
    },
  ],
  ENTIRE_PROJECT: [
    {
      message: QUESTION.PROJECT_NAME,
      type: "input",
      name: "projectName",
    },
    {
      message: QUESTION.PROJECT_DESCRIPTION,
      type: "input",
      name: "projectDescription",
    },
    {
      type: "input",
      name: "numberOfMfes",
      message: QUESTION.NUMBER_OF_MFES,
      validate(value) {
        const isNumber = !Number.isNaN(Number.parseFloat(value));
        return isNumber || "Please enter a valid number";
      },
      filter: Number,
    },
  ],
  ONE_MFE: [
    {
      message: QUESTION.MFE_NAME,
      type: "input",
      name: "mfeName",
    },
    {
      message: QUESTION.MFE_DESCRIPTION,
      type: "input",
      name: "mfeDescription",
    },
  ],
  CONTAINER: [
    {
      message: QUESTION.CONTAINER_NAME,
      type: "input",
      name: "containerName",
    },
    {
      message: QUESTION.CONTAINER_DESCRIPTION,
      type: "input",
      name: "containerDescription",
    },
  ],
  COMMON: [
    {
      message: QUESTION.STYLING,
      type: "list",
      name: "styling",
      choices: [
        "None",
        "Tailwind",
        "Material UI",
        "Bootstrap",
        "Styled Components",
      ],
    },
    {
      message: QUESTION.STATE_MANAGEMENT,
      type: "list",
      name: "stateManagement",
      choices: ["None", "Redux", "Zustand"],
    },
    {
      message: QUESTION.FORM_MANAGEMENT,
      type: "list",
      name: "formManagement",
      choices: ["None", "React Hook Form", "Formik"],
    },
  ],
  CONDITIONAL: {
    MICROFRONT_END_NAME: {
      message: QUESTION.CONDITIONAL_MFE_NAME,
      type: "input",
      name: "projectName",
    },
  },
};

export const getInfoMessage = (value) => ({
  disclaimer:
    "👋 Hi there!\n\n⚙️ This tool currently supports micro-frontend creation with runtime integration through custom script injection.\n📌 Please consider this limitation when developing your MFE applications using this tool.\n",
  appCreation: `Creating react app ${value}`,
  installDependencies: "Installing dependencies...",
  installDevDependencies: "Installing dependencies...",
});
