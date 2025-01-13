import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/common/login/Login";

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
