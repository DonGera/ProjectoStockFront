import { BrowserRouter } from "react-router-dom"
import { Component } from "react"
import { NavBar } from "./components/NavBar"
import { Router } from "./router"

class App extends Component {
    render() {
        return (
           <div>
                <BrowserRouter>
			            <NavBar />
			            <Router />
		        </BrowserRouter>
           </div>
        )
    }
};

export default App;