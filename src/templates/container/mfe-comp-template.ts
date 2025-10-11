export const getMfeCompContent = (mfeName:string, isTypeScript:boolean) => {
  return `import MicroFrontend from "../MicroFrontend";

export const ${mfeName} = (props${isTypeScript ? ": any" : ""}) => {
  return <MicroFrontend name={props.name} host={props.host} />;
};
`;
};
