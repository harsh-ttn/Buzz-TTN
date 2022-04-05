import "./App.css";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import DataProvider from "./context/context";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header />
        <Router>
          
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/home" element={<Home />} />
          
          </Routes>
        
        </Router>
      </DataProvider>
     
    </div>
  );
}

export default App;
