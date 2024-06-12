import { NavLink, useNavigate } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
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
		<Navbar bg="white">
			<Container>
			<Navbar.Brand><img src={logo} /></Navbar.Brand>
				<Navbar.Brand>DP Lista de Stock</Navbar.Brand>
				<Nav className="me-auto">
					<NavLink to="/">Home</NavLink>
					{!localStorage.getItem("user") && (
						<>
							<NavLink to="/login">Login</NavLink>
							<NavLink to="/adminPrueba">AdminPrueba</NavLink>
						</>
					)}
				</Nav>
				{localStorage.getItem("user") && (
					<>
						{localStorage.getItem("role") === "admin" && (
							<Nav>
								<NavLink to="/admin">Admin</NavLink>
							</Nav>
						)}
						<Button onClick={handleClick} variant="light">
							Log Out
						</Button>
					</>
				)}
			</Container>
		</Navbar>
	)
}