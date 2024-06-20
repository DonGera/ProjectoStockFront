import { Container, Col, Row, Form, Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from '../config/constants';
import ProductModal from './ProductModal'
import { capitalizeFirstLetter, formatDate } from '../utils/stringUtils';

const Inventario = () => {
  const [sourceData, setSourceData] = useState([]);
  const [busquedaFiltro, setBusquedaFiltro] = useState("");
  const [dataFiltrada, setDataFiltrada] = useState(sourceData);
  const [isToAddProduct, setIsToAddProduct] = useState(false);
  const [isToUpdateProduct, setIsToUpdateProduct] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${BACKEND_URL}/products`);
      const allProducts = response.data.map((prod) => ({
        _id: prod._id,
        name: prod.name,
        category: prod.category,
        quantity: prod.quantity,
        unitPrice: prod.unitPrice,
        description: prod.description,
        lastCheckDate: prod.lastCheckDate
      }));

      setSourceData(allProducts);
      setDataFiltrada(allProducts);
    }

    fetchData();

  }, []);

  useEffect(() => {
    setBusquedaFiltro('');
    setDataFiltrada(sourceData);
  }, [sourceData]);

  const handleSearch = (event) => {
    setBusquedaFiltro(event.target.value);
  };

  useEffect(() => {
    if (busquedaFiltro) {
      const filteredProds = sourceData.filter((prod) => {
        return prod.category?.toLowerCase().includes(busquedaFiltro.toLowerCase());
      });
      setDataFiltrada(filteredProds);
    } else {
      setDataFiltrada(sourceData);
    }

  }, [busquedaFiltro]);

  const handleNewProductClick = () => {
    setIsToAddProduct(true);
  };

  const handleEditProductClick = (producto) => {
    setIsToUpdateProduct(true);
    setProductToUpdate(producto);
  };

  const handleDeleteProductClick = (id) => {
    axios.delete(`${BACKEND_URL}/products/${id}`)
      .then(res => {
        const newProductsArray = sourceData.filter((prod) => prod._id !== id);
        setSourceData(newProductsArray);

      })
      .catch((err) => {
        console.log('Algo ocurrio: ', err);
      });
  };

  const handleAddProduct = (productInfo) => {
    const currentDate = new Date();
    productInfo.lastCheckDate = currentDate.toISOString();

    axios.post(`${BACKEND_URL}/products`, productInfo)
      .then(res => {
        productInfo._id = res.data._id;
        setSourceData([...sourceData, productInfo]);
      })
      .catch((err) => {
        console.log('Algo ocurrio: ', err);
      });


    setIsToAddProduct(false);

  };

  const handleUpdateProduct = (productInfo) => {

    const currentDate = new Date();
    productInfo.lastCheckDate = currentDate.toISOString();

    axios.put(`${BACKEND_URL}/products/${productInfo._id}`, productInfo)
      .then(res => {
        setSourceData(
          sourceData.map((product) =>
            product._id === productInfo._id
              ? { ...product, ...productInfo }
              : { ...product }
          )
        )
      })
      .catch((err) => {
        console.log('Algo ocurrio: ', err);
      });

    setIsToUpdateProduct(false);
    setProductToUpdate({});

  };

  const handleCancel = () => {
    setIsToAddProduct(false);
    setIsToUpdateProduct(false);
    setProductToUpdate({});

  };

  return (
    <div>

      <Container>
        <Row>
          <Col sm={6}>
            <Form className="search-table-container">
              <Form.Group>
                <Form.Control
                  className="search-input"
                  type="text"
                  placeholder="Buscar por categoria"
                  value={busquedaFiltro}
                  onChange={handleSearch} />
              </Form.Group>
            </Form>
          </Col>
          <Col sm={2}>
            <div className="add-container">
              <Button className="add" variant="primary" onClick={handleNewProductClick}>
                Añadir producto
              </Button>
            </div>
          </Col>
        </Row>

        <ProductModal
          show={isToAddProduct || isToUpdateProduct}
          productToUpdateInfo={productToUpdate}
          isCreate={isToAddProduct}
          handleAddProductClick={handleAddProduct}
          handleUpdateProductClick={handleUpdateProduct}
          handleCancelClick={handleCancel}
        />

        <Table responsive striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Stock</th>
              <th>Precio Unitario</th>
              <th>Descripcion</th>
              <th>Fecha Ultimo Control</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {dataFiltrada.map((producto) => (
              <tr
                key={producto._id}
              >
                <td
                  id={producto._id}
                >
                  {capitalizeFirstLetter(producto.name)}
                </td>
                <td
                  id={producto._id}
                >
                  {capitalizeFirstLetter(producto.category)}
                </td>
                <td
                  id={producto._id}
                >
                  {(producto.quantity)}
                </td>
                <td
                  id={producto._id}
                >
                  {producto.unitPrice}
                </td>
                <td
                  id={producto._id}
                >
                  {capitalizeFirstLetter(producto.description)}
                </td>
                <td
                  id={producto._id}
                >
                  {formatDate(producto.lastCheckDate)}
                </td>

                <td className="actions">
                  <Button
                    className="edit"
                    onClick={(e) => {
                      handleEditProductClick(producto);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    className="delete"
                    variant="danger"
                    onClick={() => handleDeleteProductClick(producto._id)}
                  >
                    X
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

      </Container>

    </div>
  );
};

export default Inventario;