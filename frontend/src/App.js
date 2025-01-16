import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/common/login/Login";
import Homepage from "./pages/common/homepage/Homepage";

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
