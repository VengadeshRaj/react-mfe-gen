import { Constant } from "../types/type";

export const QUESTION:Constant = {
  ACTION: "Select an action:",
  LANGUAGE: "Choose your preferred language:",
  PROJECT_NAME: "Enter your project name:",
  PROJECT_DESCRIPTION: "Enter your project description:",
  NUMBER_OF_MFES: "How many micro-frontends do you plan to include?",
  MFE_NAME:
    "Enter your micro-frontend name:\n**Note:** This will be used as a prefix in window functions.\n:",
  MFE_DESCRIPTION: "Enter a description for your micro-frontend:",
  CONTAINER_NAME:
    "Enter your container app name:\n**Note:** This should be prefix word in your microfrontends window functions.\n:",
  CONTAINER_DESCRIPTION: "Enter a description for your container app:",
  STYLING: "Select a styling solution:",
  STATE_MANAGEMENT: "Select a state management library:",
  FORM_MANAGEMENT: "Select a form management library:",
  CONDITIONAL_MFE_NAME: "Enter your micro-frontend name:",
  CONTAINER_PATH:
    "Please enter a path to create container:\ne.g:\n for windows os: G:\\workspace\\sample-mfe ,\n for macOS/Linux: /Users/Me/workspace/sample-mfe\n:",
  MFE_PATH:
    "Please enter a path to create microfront end:\ne.g:\n for windows os: G:\\workspace\\sample-mfe ,\n for macOS/Linux: /Users/Me/workspace/sample-mfe\n:",
  PATH: "Please enter a path to create ",
};
export const CHOICE_CONSTANTS:Constant = {
  ACTION: {
    NEW_PROJECT: "Create a new project 🚀",
    CONTAINER: "Create only a container 📦",
    SINGLE_MFE: "Create a single micro-frontend 🌐",
  },
  STYLING: {
    SASS: "Sass 🎨",
    TAILWIND: "Tailwind 🌊",
    MATERIAL_UI: "Material UI 🧩",
    BOOTSTRAP: "Bootstrap 🥾",
    STYLED_COMPONENTS: "Styled Components ✍️",
  },
  LANGUAGE: {
    JAVA_SCRIPT: "JavaScript 🟨",
    TYPE_SCRIPT: "TypeScript 🔷",
  },
  STATE_MANAGEMENT: {
    REDUX: "Redux 🔄",
    ZUSTAND: "Zustand 🐻",
  },
  FORM_MANAGEMENT: {
    REACT_HOOK_FORM: "React-hook-form 🪝",
    FORMIK: "Formik 📝",
  },
  NONE: "None ❌",
};

export const CHOICES:Constant = {
  ACTION: [
    CHOICE_CONSTANTS.ACTION.NEW_PROJECT,
    CHOICE_CONSTANTS.ACTION.CONTAINER,
    CHOICE_CONSTANTS.ACTION.SINGLE_MFE,
  ],
  STYLING: [
    CHOICE_CONSTANTS.NONE,
    CHOICE_CONSTANTS.STYLING.SASS,
    CHOICE_CONSTANTS.STYLING.BOOTSTRAP,
    CHOICE_CONSTANTS.STYLING.MATERIAL_UI,
    CHOICE_CONSTANTS.STYLING.TAILWIND,
    CHOICE_CONSTANTS.STYLING.STYLED_COMPONENTS,
  ],
  LANGUAGE: [
    CHOICE_CONSTANTS.LANGUAGE.JAVA_SCRIPT,
    CHOICE_CONSTANTS.LANGUAGE.TYPE_SCRIPT,
  ],
  STATE_MANAGEMENT: [
    CHOICE_CONSTANTS.NONE,
    CHOICE_CONSTANTS.STATE_MANAGEMENT.REDUX,
    CHOICE_CONSTANTS.STATE_MANAGEMENT.ZUSTAND,
  ],
  FORM_MANAGEMENT: [
    CHOICE_CONSTANTS.NONE,
    CHOICE_CONSTANTS.FORM_MANAGEMENT.REACT_HOOK_FORM,
    CHOICE_CONSTANTS.FORM_MANAGEMENT.FORMIK,
  ],
};

export const PROMPT:Constant = {
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
      validate(value: string) {
        if (!/^[a-z-]+$/.test(value)) {
          return "Please use only lowercase letters and '-' (numbers, capital letters, and other symbols are not allowed).";
        }
        return true;
      },
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
      validate(value: string) {
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
      validate(value: string) {
        if (!/^[a-z-]+$/.test(value)) {
          return "Please use only lowercase letters and '-' (numbers, capital letters, and other symbols are not allowed).";
        }
        return true;
      },
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
      validate(value: string) {
        if (!/^[a-z-]+$/.test(value)) {
          return "Please use only lowercase letters and '-' (numbers, capital letters, and other symbols are not allowed).";
        }
        return true;
      },
    },
    {
      message: QUESTION.CONTAINER_DESCRIPTION,
      type: "input",
      name: "containerDescription",
    },
    {
      type: "input",
      name: "numberOfMfes",
      message: QUESTION.NUMBER_OF_MFES,
      validate(value: string) {
        const isNumber = !Number.isNaN(Number.parseFloat(value));
        return isNumber || "Please enter a valid number";
      },
      filter: Number,
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
      validate(value: string) {
        if (!/^[a-z-]+$/.test(value)) {
          return "Please use only lowercase letters and '-' (numbers, capital letters, and other symbols are not allowed).";
        }
        return true;
      },
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
    PATH: {
      message: QUESTION.PATH,
      type: "input",
      name: "path",
    },
    FORM_MANAGEMENT: {
      message: QUESTION.FORM_MANAGEMENT,
      type: "list",
      name: "formManagement",
      choices: CHOICES.FORM_MANAGEMENT,
    },
  },
};

export const INFO_MESSAGE:Constant = {
  DISCLAIMER:
    "Hello there! 👋\n\nThis tool currently supports micro-frontend creation using runtime integration via custom script injection ⚙️.\nPlease keep this limitation in mind when developing your MFE applications 📌.\n",
  CREATE_APP: "Let's create ",
  CONFIGURE_CONTAINER: "Configuring the container... 🛠️",
  APP_CREATION: "Creating your React app... ⚛️  ",
  i_DEPENDENCIES: "Installing dependencies... 📦  ",
  i_DEV_DEPENDENCIES: "Installing dev dependencies... 🧩  ",
  SUCCESS: {
    NEW_PRO: "New project created successfully! 🎉",
    CONTAINER: "Container created successfully! 📦",
    ONE_MFE: "Microfront end created successfully! 🌐",
  },
  HAPPY_CODING: "Happy coding! 💻✨",
};

export const LIBRARY_PAIR:Constant = {
  STYLING: {
    [CHOICE_CONSTANTS.STYLING.TAILWIND]: [
      "tailwindcss",
      "postcss",
      "autoprefixer",
    ],
    [CHOICE_CONSTANTS.STYLING.SASS]: ["sass"],
    [CHOICE_CONSTANTS.STYLING.MATERIAL_UI]: [
      "@mui/material",
      "@emotion/react",
      "@emotion/styled",
      "@mui/icons-material",
    ],
    [CHOICE_CONSTANTS.STYLING.BOOTSTRAP]: ["bootstrap"],
    [CHOICE_CONSTANTS.STYLING.STYLED_COMPONENTS]: ["styled-components"],
    [CHOICE_CONSTANTS.NONE]: [],
  },
  STATE_MANAGEMENT: {
    [CHOICE_CONSTANTS.NONE]: [],
    [CHOICE_CONSTANTS.STATE_MANAGEMENT.REDUX]: [
      "@reduxjs/toolkit",
      "react-redux",
    ],
    [CHOICE_CONSTANTS.STATE_MANAGEMENT.ZUSTAND]: ["zustand"],
  },
  FORM_MANAGEMENT: {
    [CHOICE_CONSTANTS.NONE]: [],
    [CHOICE_CONSTANTS.FORM_MANAGEMENT.REACT_HOOK_FORM]: [
      "react-hook-form",
      "@hookform/resolvers",
      "yup",
    ],
    [CHOICE_CONSTANTS.FORM_MANAGEMENT.FORMIK]: ["formik", "yup"],
  },
};

export const DEFAULT_DEPENDENCIES = ["axios", "react-router-dom"];

export const DEFAULT_DEV_DEPENDENCIES = ["cross-env", "react-app-rewired"];
