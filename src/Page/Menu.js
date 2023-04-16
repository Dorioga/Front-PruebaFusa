import { Outlet, Link } from "react-router-dom";

import { FaHome, FaDoorOpen, FaSave, FaUserAlt,FaBook } from "react-icons/fa";

const Menu = () => {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
            share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <FaHome />
            <Link to="/">Home</Link>
          </li>

          <li>
            <FaSave />
            <Link to="/Register">Registro</Link>
          </li>
          <li>
            <FaUserAlt />
            <Link to="/UserInfo">Informacion del usuario</Link>
          </li>
          <li>
            <FaDoorOpen />
            <Link to="/Login">Iniciar Sesión</Link>
          </li>
          <li>
            <FaBook/>
            <Link to="/Publish">Publicaciones</Link>
          </li>
        </ul>
      </nav>

      {/* An <Outlet> renders whatever child route is currently active,
            so you can think about this <Outlet> as a placeholder for
            the child routes we defined above. */}
      <Outlet />
    </div>
  );
};
export default Menu;
