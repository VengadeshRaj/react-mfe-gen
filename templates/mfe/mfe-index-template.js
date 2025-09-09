export const getmfeIndexContent=(mfeName='mfe',container='',isTs)=>{
    return`import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

declare global {
  interface Window {
    render${mfeName}: (containerId${isTs?": string":""}, history${isTs?"?: any":""}) => void;
    unmount${mfeName}: (containerId${isTs?": string":""}) => void;
  }
}

window.render${mfeName} = (containerId${isTs?": string":""}, history${isTs?"?: any":""}) => {
  const container${isTs?": any":""} = document.getElementById(containerId);
  if (container) {
    const root = createRoot(container);
    root.render(<App history={history} />);
  }
};

window.unmount${mfeName} = (containerId${isTs?": string":""}) => {
  const container = document.getElementById(containerId);
  if (container) {
    const root = createRoot(container);
    root.unmount();
  }
};

const rootContainer = document.getElementById("root");
if (rootContainer && !document.getElementById("${mfeName}-${container}")) {
  createRoot(rootContainer).render(<App />);
}


`
}