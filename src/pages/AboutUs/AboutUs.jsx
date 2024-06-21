import Container from "react-bootstrap/Container";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import Card from 'react-bootstrap/Card';
import { CardGroup } from "react-bootstrap";
export const AboutUs = () => (
	
<Container>
<CardGroup>
    <Card>
        <Card.Body>
          <Card.Title>Quienes somos?</Card.Title>
          <Card.Text>
          Bienvenido a la pagina de control de stock de DP™
          Esta pagina es usada por miembros del staff para 
          organizar el stock de los productos que ofrecemos. 
          Nuevos miembros o aplicantes deben ir a la pagina de 
          contacto para enviar sus datos y solicitar una cuenta
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Contacto</Card.Title>
          <Card.Text>
            Puede contactar con el administrador usando los siguientes 
            enlaces o contactar a la direccion ger_hamid@hotmail.com
                    <li>
                      <a href="*" className="twitter">
                        Twitter <FaTwitter />
                      </a>
                    </li>
                    <li>
                      <a href="*" className="facebook">
                        Facebook <FaFacebook />
                      </a>
                    </li>
                    <li>
                      <a href="*" className="linkedin">
                        Likedin <FaLinkedin />
                      </a>
                    </li>
          </Card.Text>
        </Card.Body>
      </Card>
    </CardGroup>
</Container>
);
