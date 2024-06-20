import { NavLink, useNavigate } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Button from "react-bootstrap/Button"
import "../../css/NavBar.css"
import logo from "../../images/logo.png";


export const NavBar = () => {
	const navigate = useNavigate()

	const handleClick = () => {
		localStorage.clear()
		navigate("/login")
	}

	return (
		<Navbar collapseOnSelect expand="lg" bg="white">
			<Container>
			<Navbar.Brand><img src={logo} /></Navbar.Brand>
				<Navbar.Brand>DP Lista de Stock</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="me-auto">
					<NavLink to="/">Home</NavLink>
					
							<NavLink to="/login">Login</NavLink>
							<NavLink to="/admin">Admin</NavLink>
							<NavLink to="/AboutUs">Quienes somos?</NavLink>
							<Button onClick={handleClick} variant="light">
							Log Out
							</Button>
							</Nav>	
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}