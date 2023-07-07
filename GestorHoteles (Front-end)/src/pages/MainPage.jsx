import { React, useState } from 'react'
import backgrHead from '../assets/av2.png';
import logo from '../assets/logo.png';
import AboutU from '../assets/Au2.png'
import '../components/CSS/style.css'
import { Map } from '../components/Map/Map';
import { SideBarMini } from '../components/Sidebar/SideBarMini';
import backgrAubot from '../assets/fondx.jpg'
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

export const MainPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  }
  return (
    <>

      <main>
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9999
            },
            content: {
              width: '70%',
              height: '70%',
              margin: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)'

            }
          }}
        >
          <div className="two-box-modal">
            <div className="box left-box">
              <h2 className='hh'>Iniciar Sesión</h2>
              <p className='pp'>¿Ya tienes una cuenta? Haz clic aquí para iniciar sesión.</p>
              <Link to={'/login'} id='btnn' className='btn'>Log in</Link>
            </div>
            <div className="box right-box">
              <h2 className='hh'>Registrarse</h2>
              <p className='pp'>¿Eres nuevo? Haz clic aquí para crear una cuenta.</p>
              <Link to={'/register'} id='btnn' className='btn'>Register</Link>
            </div>
          </div>
        </Modal>
        <div style={{ backgroundImage: `url(${backgrHead})`, backgroundSize: "cover", backgroundPosition: "center", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <h1 id='aXD' style={{ color: "#fff", fontSize: "5rem", marginBottom: "1rem" }}>
            Rest Comfort <img id='aXD' src={logo} height='80em'></img>
          </h1>
          <h2 style={{ color: "#fff", fontSize: "2rem", marginBottom: "2rem" }}>
            Más cerca del Paraíso
          </h2>
          <div className="containerLog">
            <div>
              <Link to={'/login'} id='buttonn' className="btn log">Login</Link>
              <Link to={'/register'} id='buttonn' className="btn reg">Sign up</Link>
            </div>
          </div>
        </div>
        <br></br>
      </main>
      <section id="about" className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="mb-4 ">¿Quiénes somos?</h2>
              <p className="lead mb-4">Somos un motor de búsqueda de hoteles comprometido con encontrar las mejores opciones de hospedaje para nuestros usuarios. Trabajamos arduamente para ofrecer una amplia selección de hoteles y proporcionar información detallada y precisa para ayudar a nuestros usuarios a tomar decisiones informadas de hospedaje.</p>
              <p className="lead mb-4">Nuestro motor de búsqueda de hoteles está dedicado a encontrar las mejores opciones de hospedaje para nuestros usuarios, ofreciendo información precisa y confiable para que puedan tomar decisiones informadas y disfrutar de una experiencia de hospedaje agradable y sin problemas.</p>
            </div>
            <div className="col-md-6">
              <img src={AboutU} alt="Imagen de nosotros" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
      <section style={{ backgroundImage: `url(${backgrAubot})`, backgroundSize: 'cover', paddingTop: '5%', marginTop: '-3%', paddingBottom: '5%' }}>
        <div className="row">
          <div className="col-md">
            <Map />
          </div>
          <div className="col-md-4" style={{ marginLeft: '20px' }}>
            <h2 className="mb-4" >¿A dónde quieres viajar?</h2>
            <p className="lead mb-4" style={{ width: "90%" }}>Selecciona el destino al cual deseas viajar para tener las mejores ofertas y los hoteles con mayor calificación </p>
            <SideBarMini />
            <div className="row mt-3">
              <div className="text-center">
                <button onClick={openModal} className="btn btn-primary" id='buscar'>Buscar</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
