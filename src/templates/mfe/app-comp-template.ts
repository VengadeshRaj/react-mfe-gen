export const getMfeAppContent=(mfeName='mfe',isTs:boolean)=>{
    return`import React from 'react';

function App(prop${isTs ? ": any" : ""}) {
  return (
   <div>
    <h1>Hello from ${mfeName}</h1>
   </div>
  );
}

export default App;
`
}