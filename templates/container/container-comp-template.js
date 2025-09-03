export const getContainerCompContent = (containerName, mfes) => {
  let containerComp = `
import React from "react";
import MicroFrontend from "./Microfrontend";

function Container() {
  const getMfeOrigin =(port:string|undefined='')=> \`\${window.location.protocol}//\${window.location.hostname}:\${port}\`;

  return (
    <div>
      <h1>Hello from ${containerName}</h1>\n`;

  for (let i = 0; i < mfes.length; i++) {
    containerComp += `<MicroFrontend name={"${
      mfes[i]
    }"} host={getMfeOrigin(process.env.REACT_APP_${mfes[i].toUpperCase()} />\n`;
  }

  containerComp += `</div>
  );
};

export default ${containerName};`;

  return containerComp;
};


console.log(getContainerCompContent("dashboard",['form','table','login']))