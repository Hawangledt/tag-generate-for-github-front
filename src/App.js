import React from "react"
import { ToastContainer } from "react-toastify";
import { TagsGitHubProvider } from "./hooks";
import Routes from "./routes";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <TagsGitHubProvider>
      <Routes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </TagsGitHubProvider>
  );
}

export default App;
