export const getEnvContent = (mfes:string[]) => {
  let envTemplate = "";

  for (let i = 0; i < mfes.length; i++) {
    envTemplate += `REACT_APP_${mfes[i].toUpperCase()} = 900${i}\n`
  }
  return envTemplate;
};