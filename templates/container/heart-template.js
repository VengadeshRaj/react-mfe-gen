export const getHeartContent=(containerName='container')=>{
    return `
import React from "react";

class MicroFrontend extends React.Component {
  componentDidMount() {
    const { name, host, document } = this.props;
    const scriptId = \`micro-frontend-script-\${name}\`;

    if (document.getElementById(scriptId)) {
      this.renderMicroFrontend();
      return;
    }

    fetch(\`\${host}/asset-manifest.json\`)
      .then((res) => res.json())
      .then((manifest) => {
        const script = document.createElement("script");
        script.id = scriptId;
        script.crossOrigin = "";
        script.src = \`\${host}\${manifest["files"]["main.js"]}\`;
        script.onload = this.renderMicroFrontend;
        document.head.appendChild(script);
        const link = document.createElement("link");
        link.id = scriptId;
        link.href = \`\${host}\${manifest["files"]["main.css"]}\`;
        link.onload = this.renderMicroFrontend;
        link.rel = "stylesheet";
        document.head.appendChild(link);
      });
  }

  componentWillUnmount() {
    const { name, window } = this.props;

    window[\`unmount\${name}\`] && window[\`unmount\${name}\`](
      \`\${name}-${containerName}\`
    );
  }

  renderMicroFrontend = () => {
    const { name, window, history } = this.props;

    window[\`render\${name}\`] &&
      window[\`render\${name}\`](\`\${name}-${containerName}\`, history);
  };

  render() {
    return <main id={\`\${this.props.name}-${containerName}\`} />;
  }
}

MicroFrontend.defaultProps = {
  document,
  window,
};

export default MicroFrontend;
`
}