import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const Infoprofile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Comprueba si existe un token en localStorage
    const token = localStorage.getItem("token");

    // Si no hay token, redirige al usuario a la página de inicio de sesión
    if (!token) {
      navigate("/Login");
    }
  }, [navigate]);
    return (
      <div className="formu">
        <h1>Datos Usuario</h1>
        <DataPerson />
      </div>
    );

};

function DataPerson() {
  const [datos, setDatos] = useState([]);
  const nomuser = localStorage.getItem("user");
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/person/" + nomuser)
      .then((response) => response.json())
      .then((data) => {
        setDatos(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section>
      <article>
        <label className="n1">Nombre completo: </label>
        <label>{datos.nombre}</label>
      </article>
      <article>
        <label className="n1">Correo electronico: </label>
        <label>{datos.email}</label>
      </article>
      <article>
        <label className="n1">Dirección: </label>
        <label>{datos.direccion}</label>
      </article>
      <article>
        <label className="n1">Teléfono: </label>
        <label>{datos.telefono}</label>
      </article>
      <article>
        <label className="n1">Fecha de nacimiento: </label>
        <label>{datos.fecha_nac}</label>
      </article>
      <article>
        <label className="n1">Tipo documento: </label>
        <label>{datos.tipo_doc}</label>
      </article>
      <article>
        <label className="n1">Numero documento: </label>
        <label> {datos.cedula}</label>
      </article>
    </section>
  );
}
export default Infoprofile;
