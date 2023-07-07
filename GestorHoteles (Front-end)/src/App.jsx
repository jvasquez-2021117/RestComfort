import 'bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js' 
import { Outlet } from 'react-router-dom'
import { Navbar } from "./components/NavBar/Navbar.jsx"
import './App.css'
import { FooterPage } from './components/Footer/FooterPage.jsx'


function App() {

  return (
    <>
    <Navbar></Navbar>
    <Outlet></Outlet>
    <FooterPage></FooterPage>
    </>
  )
}

export default App
