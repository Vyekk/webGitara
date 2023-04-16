import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WebsiteView from "views/WebsiteView/WebsiteView";
import styles from "views/App/App.module.scss";

class App extends React.Component {
    state = {
    
  }
  render() {
    return (
      <>
        <h1>Hello world!</h1>
        <BrowserRouter>
        <>
          <Routes>
            <Route path="/" element={<WebsiteView />}></Route>
          </Routes>
        </>
        </BrowserRouter>
      </>
    );
  }
}

export default App;