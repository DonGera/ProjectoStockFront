import { Form, Button, Table } from "react-bootstrap";
import { useRef, useEffect, useState } from "react";

const Inventario = () => {
  const [data, setData] = useState([]);
  const [editarId, setEditarId] = useState(false);
  const [formData, setFormData] = useState({ categoria: "", nombre: "", descripcion: "", dia: "", mes: "", año: "", stock: "" });
  const [busquedaFiltro, setBusquedaFiltro] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const clickExterno = useRef(false);
  const productosPagina = 5;
  const indexUltimo = paginaActual * productosPagina;
  const indexPrimero = indexUltimo - productosPagina;
  let productosFiltrados = data.filter((item) =>
    item.categoria.toLowerCase().includes(busquedaFiltro.toLowerCase())
  );
  const dataFiltrada = productosFiltrados.slice(indexPrimero, indexUltimo);

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
    if (formData.categoria && formData.nombre && formData.descripcion && formData.dia && formData.mes && formData.año && formData.stock) {
      const newItem = {
        id: Date.now(),
        categoria: formData.categoria,
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        dia: formData.dia,
        mes : formData.mes,
        año : formData.año,
        stock: Number(formData.stock)
      };
      setData([...data, newItem]);
      setFormData({ categoria: "", nombre: "", descripcion: "", dia: "", mes: "", año: "", stock: "" });
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
   
  return (
        <div>
        <Form>
      <div className="add-container">
        <div className="info-container">
        <Form.Group>
            <Form.Control
            type="text"
            placeholder="Categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleInputChange} />
          </Form.Group>
        <Form.Group>
            <Form.Control
            type="text"
            placeholder="Nombre del producto"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange} />
        </Form.Group>
        <Form.Group>
            <Form.Control
            type="text"
            placeholder="Descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
            <Form.Control
            type="number"
            placeholder="dia"
            name="dia"
            value={formData.dia}
            onChange={handleInputChange}
          />
          <Form.Control
            type="number"
            placeholder="mes"
            name="mes"
            value={formData.mes}
            onChange={handleInputChange}
          />
          <Form.Control
            type="number"
            placeholder="año"
            name="año"
            value={formData.año}
            onChange={handleInputChange}
          />
          </Form.Group>
          <Form.Group>
            <Form.Control
            type="number"
            placeholder="stock"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
          />
          </Form.Group>
        </div>
        <Button className="add" variant="primary" onClick={handleAddClick}>
              Añadir producto
        </Button>
        </div>
        </Form>
<div>
      <Form className="search-table-container">
      <Form.Group>
      <Form.Control
          className="search-input"
          type="text"
          placeholder="Buscar por categoria"
          value={busquedaFiltro}
          onChange={handleSearch}/>
          </Form.Group>
       </Form>
        <Table responsive striped bordered hover variant="dark" ref={clickExterno}>
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Nombre del producto</th>
              <th>Descripcion</th>
              <th>Fecha de ultimo control</th>
              <th>Stock</th>
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
                    editar(item.id, { categoria: e.target.innerText })
                  }
                >
                  {item.categoria}
                </td>
                <td
                  id={item.id}
                  contentEditable={editarId === item.id}
                  onBlur={(e) =>
                    editar(item.id, { nombre: e.target.innerText })
                  }
                >
                  {item.nombre}
                </td>
                <td
                  id={item.id}
                  contentEditable={editarId === item.id}
                  onBlur={(e) =>
                    editar(item.id, { descripcion: parseInt(e.target.innerText) })
                  }
                >
                  {item.descripcion}
                </td>
                <td
                  id={item.id}
                  contentEditable={editarId === item.id}
                  onBlur={(e) =>
                    editar(item.id, { fecha: parseInt(e.target.innerText) })
                  }
                >
                  {item.dia}/{item.mes}/{item.año}
                </td>
                <td
                  id={item.id}
                  contentEditable={editarId === item.id}
                  onBlur={(e) =>
                    editar(item.id, { stock: parseInt(e.target.innerText) })
                  }
                >
                  {item.stock}
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
            { length: Math.ceil(productosFiltrados.length / productosPagina) },
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

export default Inventario;