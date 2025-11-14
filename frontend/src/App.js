import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Account from "./components/Account";
import ForgotPassword from "./components/Password";
import Nav from "./components/Nav";
import Home from "./components/Home";
import About from "./components/About";
import AddSubjects from "./components/AddSubject";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Nav user={user} setUser={setUser} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Account />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/add-subjects"
            element={<AddSubjects {...(user ? { userId: user.id } : {})} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
