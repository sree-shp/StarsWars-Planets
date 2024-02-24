import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import PlanetDetails from "./Components/PlanetDetails";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Planet Details" element={<PlanetDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
