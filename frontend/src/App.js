import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/common/login/Login";
import Homepage from "./pages/common/homepage/Homepage";
import Layout from "./pages/common/layout/Layout";
import Connect from "./pages/common/connect/Connect";
import FAQ from "./pages/common/faq/FAQ";
import Forms from "./pages/common/forms/Forms";
import ScholarForms from "./pages/scholars/forms/Forms";
import Courses from "./pages/common/courses/Courses";
import FormBuilder from "./pages/common/forms/formbuilder/FormBuilder";
import Accounts from "./pages/common/accounts/Accounts";
import SetPassword from "./pages/common/set-password/SetPassword";
import FillForm from "./pages/scholars/forms/fillForm/FillForm";
import Events from "./pages/common/events/EventsPage";
import "react-big-calendar/lib/css/react-big-calendar.css"
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/events" element={<Events />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/forms/scholar" element={<ScholarForms />} />
            <Route path="/forms/fill-form/:formId" element={<FillForm />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/forms/form-builder/:formId" element={<FormBuilder />} />
            <Route path="/faq" element={<FAQ />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/set-password" element={<SetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
