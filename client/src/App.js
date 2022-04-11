import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import DataProvider from "./context/context";
import GLogin from "./components/GLogin";
import DetailUser from "./pages/DetailUser";
import SelfProfile  from "./components/UserProfile/profile/selfprofile";
import Userprofile from "./components/UserProfile/profile/userprofile";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Router>
          <Routes>
            {/* <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/google" element={<Login />} />
            <Route path="/userprofile/:id" element={<Userprofile />} />
            <Route path="/profile" element={<SelfProfile />} />
          </Routes>
        </Router>
      </DataProvider>
    </div>
  );
}

export default App;
