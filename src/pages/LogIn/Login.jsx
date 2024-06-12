import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"

const validationSchema = () =>
	Yup.object().shape({
		email: Yup.string()
			.email("Debe ser un email válido")
			.required("* Campo obligatorio"),
		password: Yup.string().required("* Campo obligatorio"),
	});

const initialValues = {
	email: "",
	password: "",
};

export const getUsuario = async (email, password) => {
	const response = await axios.post(
		`${import.meta.env.VITE_SERVER_URI}/api/login`,
		{
			email,
			password,
		}
	);

	return response.data;
}

export const Login = () => {
	const navigate = useNavigate();

	const onSubmit = () => {
		getUsuario(formik.values.email, formik.values.password)
			.then(data => {
				localStorage.setItem("user", JSON.stringify(data.user))
				localStorage.setItem("role", data.user.role)
				localStorage.setItem("token", data.token)
				navigate("/")
			})
			.catch(err => {
				if (err.response.status === 401) alert("credenciales inválidas")
			})
	};

	const formik = useFormik({
		initialValues,
		enableReinitialize: true,
		validationSchema,
		onSubmit,
	});

	return (
		<Container className="mt-4">
			<Form
				style={{ width: 500, margin: "auto" }}
				onSubmit={formik.handleSubmit}
			>
				<h1>Iniciar sesión</h1>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<div><Form.Label>Email</Form.Label></div>
					<Form.Control
						type="email"
						className={
							formik.errors.email && formik.touched.email && "error"
						}
						placeholder="Enter email"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						name="email"
						value={formik.values.email}
					/>
					{formik.errors.email && (
						<div className="errorMessage">{formik.errors.email}</div>
					)}
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<div><Form.Label>Contraseña</Form.Label></div>
					<Form.Control
						name="password"
						className={
							formik.errors.password &&
							formik.touched.password &&
							"error"
						}
						type="password"
						placeholder="Password"
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.errors.password && (
						<div className="errorMessage">{formik.errors.password}</div>
					)}
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</Container>
	)
};