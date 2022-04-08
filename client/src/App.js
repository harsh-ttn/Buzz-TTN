import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import DataProvider from "./context/context";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Router>
          <Routes>
            {/* <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} /> */}
            <Route path="" element={<Home />} />
          </Routes>
        </Router>
      </DataProvider>
    </div>
  );
}

export default App;
