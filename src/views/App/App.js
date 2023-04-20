import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WebsiteView from "views/WebsiteView/WebsiteView";
import LoginView from "views/LoginView/LoginView";
import styles from "views/App/App.module.scss";

class App extends React.Component {
    state = {
    
  }
  render() {
    return (
      <>
        <BrowserRouter>
        <>
          <Routes>
            <Route path="/" element={<WebsiteView />}></Route>
            <Route path="/login" element={<LoginView />}></Route>
          </Routes>
        </>
        </BrowserRouter>
      </>
    );
  }
}

export default App;