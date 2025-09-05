export const getContainerCompContent = (containerCompName, mfes) => {
  let containerComp = `import React from "react";\n`;

  for (let i = 0; i < mfes.length; i++) {
    containerComp += `import {${mfes[i]}} from "./microfrontends/${mfes[i]}";\n`;
  }

  containerComp += `\n\nfunction ${containerCompName}() {
  const getMfeOrigin =(port:string|undefined='')=> \`\${window.location.protocol}//\${window.location.hostname}:\${port}\`;

  return (
    <div>
      <h1>Hello from ${containerCompName}</h1>\n`;

  for (let i = 0; i < mfes.length; i++) {
    containerComp += `      <${mfes[i]} name={"${mfes[i]}"} host={getMfeOrigin(process.env.REACT_APP_${mfes[i].toUpperCase()})} />\n`;
  }

  containerComp += `</div>
  );
};

export default ${containerCompName};`;

  return containerComp;
};
