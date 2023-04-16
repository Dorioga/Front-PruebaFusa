import { Registerform } from "../Page/Register";
import LoginForm from "../Page/Login";
import Infoprofile from "../Page/Profile";
import Publish from "../Page/Publish";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Menu from "../Page/Menu";

const Ruta = () => {
  return (
    <Routes>
      <Route path="/" element={<Menu/>}>
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/Register" element={<Registerform />} />
        <Route path="/Userinfo" element={<Infoprofile />} />
        <Route path="/Publish" element={<Publish />} />
      </Route>
    </Routes>
  );
};


export default Ruta;
