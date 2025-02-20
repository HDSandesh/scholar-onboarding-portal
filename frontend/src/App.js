import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/common/login/Login";
import Homepage from "./pages/common/homepage/Homepage";
import Layout from "./pages/common/layout/Layout";
import Connect from "./pages/common/connect/Connect";
import FAQ from "./pages/common/faq/FAQ";
import Forms from "./pages/common/forms/Forms";
import Courses from "./pages/common/courses/Courses";
import FormBuilder from "./pages/common/forms/formbuilder/FormBuilder";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/forms/form-builder" element={<FormBuilder />} />
            <Route path="/faq" element={<FAQ />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
