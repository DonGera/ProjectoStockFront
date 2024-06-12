import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const IsAdmin = ({children}) => {
    const navigate = useNavigate()
    useEffect(() => {
        if(localStorageStorage.getItem("role") !== "admin") navigate ("/")
    });
    return children
};