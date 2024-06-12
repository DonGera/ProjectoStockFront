import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const IsNotLogged = ({ children }) => {
	const navigate = useNavigate()

	useEffect(() => {
		if (!localStorage.getItem("usuario")) navigate("/login")
	})

	return children
}