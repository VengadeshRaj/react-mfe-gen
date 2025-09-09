import utils from "../../utility.js";

export const getContainerCompContent = (containerCompName, mfes) => {
  let containerComp = `import React from "react";\n`;

  for (let i = 0; i < mfes.length; i++) {
    containerComp += `import {${utils.toCompName(mfes[i])}} from "./microfrontends/${utils.toCompName(mfes[i])}";\n`;
  }

  containerComp += `\n\nfunction ${containerCompName}() {
  const getMfeOrigin =(port:string|undefined='')=> \`\${window.location.protocol}//\${window.location.hostname}:\${port}\`;

  return (
    <div>
      <h1>Hello from ${containerCompName}</h1>\n`;

  for (let i = 0; i < mfes.length; i++) {
    containerComp += `      <${utils.toCompName(mfes[i]) } name={"${utils.toCompName(mfes[i])}"} host={getMfeOrigin(process.env.REACT_APP_${mfes[i].toUpperCase()})} />\n`;
  }

  containerComp += `</div>
  );
};

export default ${containerCompName};`;

  return containerComp;
};
