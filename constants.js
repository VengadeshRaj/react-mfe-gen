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
  CONDITIONAL_MFE_NAME: "Enter your micro-frontend name:",
  CONTAINER_PATH:
    "Please enter a path to create container:\ne.g: G:\\workspace\\sample-container\n:",
  MFE_PATH:
    "Please enter a path to create container:\ne.g: G:\\workspace\\sample-mfe",
  PATH: "Please enter a path to create ",
};

export const CHOICES = {
  ACTION: [
    "Create a new project",
    "Create only a container",
    "Create a single micro-frontend",
  ],
  STYLING: [
    "None",
    "Sass",
    "Tailwind",
    "Material UI",
    "Bootstrap",
    "Styled Components",
  ],
  LANGUAGE: ["JavaScript", "TypeScript"],
  STATE_MANAGEMENT: ["None", "Redux", "Zustand"],
};

export const PROMPT = {
  USER_NEED: [
    {
      message: QUESTION.ACTION,
      type: "list",
      name: "typeOfAction",
      choices: CHOICES.ACTION,
    },
    {
      message: QUESTION.LANGUAGE,
      type: "list",
      name: "language",
      choices: CHOICES.LANGUAGE,
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
      choices: CHOICES.STYLING,
    },
    {
      message: QUESTION.STATE_MANAGEMENT,
      type: "list",
      name: "stateManagement",
      choices: CHOICES.STATE_MANAGEMENT,
    },
  ],
  CONDITIONAL: {
    MICROFRONT_END_NAME: {
      message: QUESTION.CONDITIONAL_MFE_NAME,
      type: "input",
      name: "mfeName",
    },
    CONTAINER_PATH: {
      message: QUESTION.CONTAINER_PATH,
      type: "input",
      name: "containerPath",
    },
    MFE_PATH: {
      message: QUESTION.MFE_PATH,
      type: "input",
      name: "mfePath",
    },
  },
};

export const INFO_MESSAGE = {
  DISCLAIMER:
    "👋 Hi there!\n\n⚙️ This tool currently supports micro-frontend creation with runtime integration through custom script injection.\n📌 Please consider this limitation when developing your MFE applications using this tool.\n",
  START_CONTAINER_CREATION: "Let's create ",
  START_MFE_CREATION: "Let's start creating each MFE's",
  APP_CREATION: "Creating react app ",
  i_DEPENDENCIES: "Installing dependencies...",
  i_DEV_DEPENDENCIES: "Installing dependencies...",
};

export const LIBRARY_PAIR = {
  STYLING: {
    Tailwind: ["tailwindcss", "postcss", "autoprefixer"],
    Sass: ["sass"],
    "Material UI": [
      "@mui/material",
      "@emotion/react",
      "@emotion/styled",
      "@mui/icons-material",
    ],
    Bootstrap: ["bootstrap"],
    "Styled Components": ["styled-components"],
    None: [],
  },
  STATE_MANAGEMENT: {
    None: [],
    Redux: ["@reduxjs/toolkit", "react-redux"],
    Zustand: ["zustand"],
  },
};

export const DEFAULT_DEPENDENCIES = ["axios", "react-router-dom"];
