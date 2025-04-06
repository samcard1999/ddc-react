import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals.js";
import { BrowserRouter, Routes, Route } from "react-router";
import Project from "./components/Projects/Project.jsx";
import Home from "./components/Home.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { ContactForm } from "./components/Projects/ContactForm";
import { Toaster } from "sonner";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Toaster position="bottom-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/contact" element={<ContactForm />} />
          <Route path="projects/:projectId" element={<Project />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
