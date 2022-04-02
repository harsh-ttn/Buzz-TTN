import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import DataProvider from "./context/context";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header />
        <Home />
      </DataProvider>
    </div>
  );
}

export default App;
