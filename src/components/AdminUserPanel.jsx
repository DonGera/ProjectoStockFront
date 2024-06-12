import { Form, Button, Table } from "react-bootstrap";
import { useRef, useEffect, useState } from "react";
import axios from "axios"


const PanelAdmin = () => {
  const [data, setData] = useState([]);
  const [editarId, setEditarId] = useState(false);
  const [formData, setFormData] = useState({ usuario: "", contraseña: "", email: ""});
  const [busquedaFiltro, setBusquedaFiltro] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const clickExterno = useRef(false);
  const usuariosPagina = 10;
  const indexUltimo = paginaActual * usuariosPagina;
  const indexPrimero = indexUltimo - usuariosPagina;
  let usuariosFiltrados = data.filter((item) =>
    item.usuario.toLowerCase().includes(busquedaFiltro.toLowerCase())
  );
  const dataFiltrada = usuariosFiltrados.slice(indexPrimero, indexUltimo);

  useEffect(() => {
    setPaginaActual(1);
  }, [busquedaFiltro]);

  useEffect(() => {
    if (!editarId) return;

    let selectedItem = document.querySelectorAll(`[id='${editarId}']`);
    selectedItem[0].focus();
  }, [editarId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        clickExterno.current &&
        !clickExterno.current.contains(event.target)
      ) {
        setEditarId(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const paginas = (numpaginas) => setPaginaActual(numpaginas);

  const handleSearch = (event) => {
    setBusquedaFiltro(event.target.value);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddClick = () => {
    if (formData.usuario && formData.contraseña) {
      const newItem = {
        id: Date.now(),
        usuario: formData.usuario,
        contraseña: formData.contraseña,
        email: formData.email
      };
      setData([...data, newItem]);
      setFormData({ usuario: "", contraseña: "", email: ""});
    }
  };

  const editar = (id, dataActualizada) => {
    if (!editarId || editarId !== id) {
      return;
    }

    const listaActualizada = data.map((item) =>
      item.id === id ? { ...item, ...dataActualizada } : item
    );
    setData(listaActualizada);
  };

  const borrar = (id) => {
    if (dataFiltrada.length === 1 && paginaActual !== 1) {
      setPaginaActual((ant) => ant - 1);
    }
    const listaActualizada = data.filter((item) => item.id !== id);
    setData(listaActualizada);
  };

  const postUsuario = async () => {
    const resp = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}/api/create-user`
    )

    const { status } = resp

    if (status === 201) {
        alert("Working")
    }
}

const handleSubmit = () => {
    handleAddClick()
    postUsuario()
}
   
  return (
        <div>
        <Form>
      <div className="add-container">
        <div className="info-container">
        <Form.Group>
            <Form.Control
            type="text"
            placeholder="usuario"
            name="usuario"
            value={formData.usuario}
            onChange={handleInputChange} />
          </Form.Group>
        <Form.Group>
            <Form.Control
            type="email"
            placeholder="Email de contacto"
            name="email"
            value={formData.email}
            onChange={handleInputChange} />
        </Form.Group>
        </div>
        <Button className="add" variant="primary" onClick={handleSubmit}>
              Añadir usuario
        </Button>
        </div>
        </Form>
<div>
      <Form className="search-table-container">
      <Form.Group>
      <Form.Control
          className="search-input"
          type="text"
          placeholder="Buscar por usuario"
          value={busquedaFiltro}
          onChange={handleSearch}/>
          </Form.Group>
       </Form>
        <Table responsive striped bordered hover variant="dark" ref={clickExterno}>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email de contacto</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {dataFiltrada.map((item) => (
              <tr key={item.id}>
                <td
                  id={item.id}
                  contentEditable={editarId === item.id}
                  onBlur={(e) =>
                    editar(item.id, { usuario: e.target.innerText })
                  }
                >
                  {item.usuario}
                </td>
                <td
                  id={item.id}
                  contentEditable={editarId === item.id}
                  onBlur={(e) =>
                    editar(item.id, { email: parseInt(e.target.innerText) })
                  }
                >
                  {item.email}
                </td>
                <td className="actions">
                  <Button
                    className="edit"
                    onClick={() => {
                      setEditarId(item.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    className="delete"
                    onClick={() => borrar(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          </Table>
        <div className="paginas">
          {Array.from(
            { length: Math.ceil(usuariosFiltrados.length / usuariosPagina) },
            (_, index) => (
              <Button
                key={index + 1}
                style={{
                  backgroundColor: paginaActual === index + 1 && "lightgreen",
                }}
                onClick={() => paginas(index + 1)}
              >
                {index + 1}
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PanelAdmin;