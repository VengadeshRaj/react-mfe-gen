export const getMfeCompContent = (mfeName, isTypeScript) => {
  return `import MicroFrontend from "../MicroFrontend";

export const ${mfeName} = (props${isTypeScript ? ": any" : ""}) => {
  return <MicroFrontend name={props.name} host={props.host} />;
};
`;
};
