import { useNavigate} from "react-router-dom";
import { useEffect, useState  } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const [tokenExists, setTokenExists] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setTokenExists(true);
    } else {
      setTokenExists(false);
    }
  }, []);
 
  //'Authorization': `Bearer ${localStorage.getItem('token')}`,
  if (tokenExists) {
    return (
      <div>
        <input
          type="submit"
          onClick={CerrarSesion}
          value="Cerrar Sesion"
        ></input>
      </div>
    );
  } else {
    return (
      <div className="formu">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={iniciar_sesion}>
          <article>
            <label>Usuario</label>
            <input type="text" id="iuser"></input>
          </article>
          <article>
            <label>Contraseña</label>
            <input type="password" id="ipass"></input>
          </article>
          <input type="submit" value="Ingresar"></input>
        </form>
      </div>
    );
    //Si no esta Logeado formulario para iniciar Sesion
  }
  function CerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();

  }
  function iniciar_sesion(e) {
    e.preventDefault();
    const usuario = document.getElementById("iuser").value;
    const pass = document.getElementById("ipass").value;

    var datos = new FormData();
    datos.append("cedula", usuario);
    datos.append("password", pass);

    fetch("http://127.0.0.1:8000/api/person/login", {
      method: "POST",
      body: datos,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.valor) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", usuario);
          navigate("/UserInfo");
        }
      })
      .catch((error) => console.log(error));
  }
};

export default LoginForm;
