import { Login } from "../pages/LogIn"
import { Home } from "../pages/Home"
import { AdminPrueba } from "../pages/adminPrueba"
import { Admin } from "../pages/Admin"
import { IsLogged } from "../components/isLogged"
import { IsAdmin } from "../components/isAdmin"

export const routes = [
	{ path: "/", element: <Home /> },
	{
		path: "/login",
		element: (
			<IsLogged>
				<Login />
			</IsLogged>
		),
	},
	{ path: "/adminPrueba", element: <AdminPrueba /> },	{
		path: "admin",
		element: (
			<IsAdmin>
				<Admin />
			</IsAdmin>
		),
	},
	{
		path: "*",
		element: 404,
	},
]