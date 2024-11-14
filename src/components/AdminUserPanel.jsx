import { Container, Col, Row, Form, Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from '../config/constants';
import { capitalizeFirstLetter } from '../utils/stringUtils';

export const PanelAdmin = () => {
  const [sourceData, setSourceData] = useState([]);
  const [busquedaFiltro, setBusquedaFiltro] = useState("");
  const [dataFiltrada, setDataFiltrada] = useState(sourceData);
  const [isToAdduser, setIsToAdduser] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${BACKEND_URL}/user`);
      const allusers = response.data.map((user) => ({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
      }));

      setSourceData(allusers);
      setDataFiltrada(allusers);
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
      const filteredProds = sourceData.filter((user) => {
        return user.email?.toLowerCase().includes(busquedaFiltro.toLowerCase());
      });
      setDataFiltrada(filteredProds);
    } else {
      setDataFiltrada(sourceData);
    }

  }, [busquedaFiltro]);

  const handleNewuserClick = () => {
    setIsToAdduser(true);
  };

  const handleEdituserClick = (usuario) => {
    setIsToUpdateuser(true);
    setuserToUpdate(usuario);
  };

  const handleDeleteuserClick = (id) => {
    axios.delete(`${BACKEND_URL}/users/${id}`)
      .then(res => {
        const newusersArray = sourceData.filter((user) => user._id !== id);
        setSourceData(newusersArray);

      })
      .catch((err) => {
        console.log('Algo ocurrio: ', err);
      });
  };

  const handleAdduser = (userInfo) => {

    axios.post(`${BACKEND_URL}/users`, userInfo)
      .then(res => {
        userInfo._id = res.data._id;
        setSourceData([...sourceData, userInfo]);
      })
      .catch((err) => {
        console.log('Algo ocurrio: ', err);
      });


    setIsToAdduser(false);

  };

  const handleUpdateuser = (userInfo) => {

    axios.put(`${BACKEND_URL}/users/${userInfo._id}`, userInfo)
      .then(res => {
        setSourceData(
          sourceData.map((user) =>
            user._id === userInfo._id
              ? { ...user, ...userInfo }
              : { ...user }
          )
        )
      })
      .catch((err) => {
        console.log('Algo ocurrio: ', err);
      });

    setIsToUpdateuser(false);
    setuserToUpdate({});

  };

  const handleCancel = () => {
    setIsToAdduser(false);
    setIsToUpdateuser(false);
    setuserToUpdate({});

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
                  placeholder="Buscar por email"
                  value={busquedaFiltro}
                  onChange={handleSearch} />
              </Form.Group>
            </Form>
          </Col>
          <Col sm={2}>
            <div className="add-container">
              <Button className="add" variant="primary" onClick={handleNewuserClick}>
                Añadir usuario
              </Button>
            </div>
          </Col>
        </Row>


        <Table responsive striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {dataFiltrada.map((usuario) => (
              <tr
                key={usuario._id}
              >
                <td
                  id={usuario._id}
                >
                  {capitalizeFirstLetter(usuario.name)}
                </td>
                <td
                  id={usuario._id}
                >
                  {(usuario.email)}
                </td>
                <td
                  id={usuario._id}
                >
                  {(usuario.role)}
                </td>
                
                <td className="actions">
                  <Button
                    className="edit"
                    onClick={(e) => {
                      handleEdituserClick(usuario);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    className="delete"
                    variant="danger"
                    onClick={() => handleDeleteuserClick(usuario._id)}
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

