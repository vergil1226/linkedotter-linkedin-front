import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./Components/Pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./Components/Pages/RegisterPage";
import UserDashBoard from "./Components/User/UserDashBoard";
import AdminDashBoard from "./Components/Admin/AdminDashBoard";
import AdminLayout from "./Components/Admin/AdminLayout";
import UserLayout from "./Components/User/UserLayout";
import Page404 from "./Components/Pages/Page404";
import Public from "./Components/User/Public";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route exact path="/" element={<UserDashBoard />} />
        </Route>
        <Route path="/" element={<AdminLayout />}>
          <Route exact path="/admin" element={<AdminDashBoard />} />
        </Route>
        <Route path="/" element={<Public />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
