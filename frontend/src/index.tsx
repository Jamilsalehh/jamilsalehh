import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import StartUpScreen from "./Components/StartUpScreen/StartUpScreen";
import { Provider } from 'react-redux';
import {store} from './redux/store'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

function RootComponent(){
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Event listener to detect when the entire page has loaded
    const handleLoad = () => {
      setTimeout(()=>{
        setIsLoading(false); // Update state to indicate that loading has finished
      },1000)
     
    };

    window.addEventListener("load", handleLoad);

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <React.StrictMode>
      {isLoading ? <StartUpScreen /> : <App />}
    </React.StrictMode>
  );
};

root.render(<Provider store={store}> <RootComponent /> </Provider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
