export const getMfeCompContent = (mfeName, isTypeScript) => {
  return `
import MicroFrontend from "../Microfrontend";

export const ${mfeName} = (props${isTypeScript ? ": any" : ""}) => {
  return <${mfeName} name={props.name} host={props.host} />;
};
`;
};
