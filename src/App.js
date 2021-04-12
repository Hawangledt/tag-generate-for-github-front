import React from "react"
import { TagsGitHubProvider } from "./hooks";
import Routes from "./routes";


function App() {
  return (
    <TagsGitHubProvider>
      <Routes />
    </TagsGitHubProvider>
  );
}

export default App;
