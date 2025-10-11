export const getAppContent=(containerName='container')=>{
    return`import ${containerName} from "./${containerName}";

function App() {
  return <${containerName} />;
}

export default App;
`
}