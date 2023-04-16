import { useEffect, useState } from "react";
import { FaLongArrowAltLeft, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");

//Componente principal de la vista de publicaciones
const Publish = () => {
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
    <section id="publish">
      <section id="newpub">
        <article id="crear" onClick={OpenMenu}>
          <FaPlus />
          <h2>Crear Publicacion</h2>
        </article>
        <Formpublish></Formpublish>
      </section>
      <Publishs />
    </section>
  );
};

//Formulario de Crear Publicaciones
const Formpublish = () => {
  const autor=localStorage.getItem("user");
  return (
    <div id="formpub" onSubmit={CrearPubliacion}>
      <form>
        <article>
          <label>Titulo Publicacion </label>
          <input type="text" id="nompub"></input>
        </article>
        <article>
          <label>Autor </label>
          <input type="text" id="autor" value={autor}></input>
        </article>
        <article>
          <label>Descripción </label>
          <textarea id="desc"></textarea>
        </article>
        <article>
          <input type="submit" value="Guardar Publicación"></input>
        </article>
      </form>
    </div>
  );
};
//Abrir Menu
function OpenMenu() {
  const butt = document.getElementById("formpub");
  butt.classList.toggle("active");
}

//Funcion para enviar los datos a la apí para crear la publicacion
function CrearPubliacion(e) {
  e.preventDefault();
  var datos = new FormData();
  datos.append("titulo", document.getElementById("nompub").value);
  datos.append("autor", document.getElementById("autor").value);
  datos.append("descripcion", document.getElementById("desc").value);
  datos.append("estado", "true");

  fetch("http://127.0.0.1:8000/api/publish/add", {
    method: "POST",
    body: datos,
  })
    .then((response) => {
      // Manejar la respuesta del servidor
      alert("Publicacion Creada");
      window.location.reload();
    })
    .catch((error) => {
      console.log("error " + error);
    });
}

//Traer todas las publicaciones
function Publishs() {
  const [publicaciones, setPublicaciones] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/publish")
      .then((response) => response.json())
      .then((data) => {
        setPublicaciones(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <section id="wall">
      {publicaciones.map((publicacion) => (
        <article className="publicacion">
          <section>
            <h2>{publicacion.titulo}</h2>
            <p>{publicacion.autor}</p>
            <p>{publicacion.descripcion}</p>
          </section>
          <section className="menu" id={publicacion.id_publicacion}>
            <h2>Titulo a Editar</h2>
            <input
              type="text"
              id={`edittitle${publicacion.id_publicacion}`}
              placeholder={publicacion.titulo}
            ></input>
            <h2>Descripción a Editar</h2>
            <textarea
              type="text"
              id={`edit${publicacion.id_publicacion}`}
              placeholder={publicacion.descripcion}
            ></textarea>
            <input
              type="submit"
              className={publicacion.id_publicacion}
              onClick={Updatepublish}
            ></input>
          </section>
          <section className="opciones">
            <article>Ver</article>
            <article className={publicacion.id_publicacion} onClick={MenuEdit}>
              Editar
            </article>
            <article
              className={publicacion.id_publicacion}
              onClick={Deletepublish}
            >
              Eliminar
            </article>
          </section>
        </article>
      ))}
    </section>
  );
}

function MenuEdit(e) {
  const vmenu = document.getElementById(e.target.classList);
  vmenu.classList.toggle("active");
}
function Updatepublish(e) {
  const title = "edittitle" + e.target.classList;
  const desc = "edit" + e.target.classList;
  console.log(title + "   " + desc);
  const data = new FormData();
  data.append("id", e.target.classList);
  data.append("titulo", document.getElementById(title).value);
  data.append("descripcion", document.getElementById(desc).value);

  fetch("http://127.0.0.1:8000/api/publish/update", {
    method: "POST",
    body: data,
  })
    .then((response) => {
      // Manejar la respuesta del servidor
      alert("Publicacion actualizada");
    })
    .catch((error) => {
      console.log("error " + error);
    });
}
function Deletepublish(e) {
  fetch("http://127.0.0.1:8000/api/publish/delete/" + e.target.classList, {
    method: "POST",
  })
    .then((response) => {
      // Manejar la respuesta del servidor
      alert("Publicacion eliminada");
    })
    .catch((error) => {
      console.log("error " + error);
    });
}

export default Publish;
