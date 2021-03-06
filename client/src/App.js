import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import DataProvider from "./context/context";
import SelfProfile from "./components/UserProfile/profile/selfprofile";
import Userprofile from "./components/UserProfile/profile/userprofile";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/google" element={<Login />} />
            <Route path="/userprofile/:id" element={<Userprofile />} />
            <Route path="/profile" element={<SelfProfile />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </DataProvider>
    </div>
  );
}

export default App;
