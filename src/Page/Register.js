import { useNavigate } from "react-router-dom";


export function Registerform() {
  function handleSubmit(e) {
    e.preventDefault();
    var datos = new FormData();
    datos.append("nombres", document.getElementById("nombres").value);
    datos.append("apellidos", document.getElementById("apellidos").value);
    datos.append("email", document.getElementById("email").value);
    datos.append("dir", document.getElementById("direccion").value);
    datos.append("tel", document.getElementById("tel").value);
    datos.append("fecha", document.getElementById("date").value);
    datos.append("tdoc", document.getElementById("t_doc").value);
    datos.append("numdoc", document.getElementById("numdoc").value);
    datos.append("pass", document.getElementById("pass").value);

    fetch("http://127.0.0.1:8000/api/person/add", {
      method: "POST",
      body: datos,
    })
      .then((response) => {
        // Manejar la respuesta del servidor
        redirigir();
      })
      .catch((error) => {
        console.log("error " + error);
      });
  }
  const navigate = useNavigate();

  function redirigir() {
    navigate("/Login");
  }
  return (
    <div className="formu" id="reg">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <article>
          <label>Nombres </label>
          <input type="text" id="nombres"></input>
        </article>

        <article>
          <label>Apellidos</label>
          <input type="text" id="apellidos"></input>
        </article>

        <article>
          <label>Correo Electronico</label>
          <input type="email" id="email"></input>
        </article>

        <article>
          <label>Dirección</label>
          <input type="text" id="direccion"></input>
        </article>

        <article>
          <label>Teléfono</label>
          <input type="tel" id="tel"></input>
        </article>

        <article>
          <label>Fecha de Nacimiento</label>
          <input type="date" id="date"></input>
        </article>

        <article>
          <label>Tipo Documento</label>
          <select id="t_doc">
            <option value="default"></option>
            <option value="ti">T.I.</option>
            <option value="cc">C.C.</option>
          </select>
        </article>

        <article>
          <label>Numero Documento</label>
          <input type="text" id="numdoc"></input>
        </article>

        <article>
          <label>Contraseña</label>
          <input type="password" id="pass"></input>
        </article>

        <input type="submit" value="Guardar"></input>
      </form>
    </div>
  );
}
