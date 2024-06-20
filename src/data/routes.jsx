import { Login } from "../pages/LogIn"
import { Home } from "../pages/Home"
import { AdminPrueba } from "../pages/adminPrueba"
import { Admin } from "../pages/Admin"
import { AboutUs } from "../pages/AboutUs"
import { Error404 } from "../pages/Error404"
import { Navigate } from "react-router-dom";

const USER_TYPES = {
	PUBLIC: 'NotLogged',
	NORMAL_USER: "User",
	ADMIN_USER: "AdminUser",
};

const CURRENT_USER_TYPE = USER_TYPES.ADMIN_USER;


export const routes = [
	{ path: "/", element: <Home /> },
	{ path: "/AboutUs", element: <AboutUs /> },
	{
		path: "/login",
		element: (
			<NotLoggedElement>
				<Login />
			</NotLoggedElement>
		),
	},
	{ path: "/adminPrueba", element: <AdminPrueba /> },	{
		path: "admin",
		element: (
			<AdminUserElement>
				<Admin />
			</AdminUserElement>
		),
	},
	{ path:"*", element:<Error404 />},
]

function NotLoggedElement ({ children }) {
	return <>{children}</>;
}
function UserElement ({ children }) {
	if(CURRENT_USER_TYPE === USER_TYPES.NORMAL_USER || CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER)
	{return <>{children}</>;
}else{
	return <Navigate to={"/login"}/>}
}
function AdminUserElement ({ children }) {
	if(CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER)
	{return <>{children}</>;
}else{
	return <Navigate to={"*"}/>}
}