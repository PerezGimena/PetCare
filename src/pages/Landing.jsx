import { Link } from "react-router-dom";
import useFadeUp from "../hook/useFadeUp";
import "../styles/landing.css";

export default function Landing() {
  useFadeUp(); 

const scrollCarousel = (direction) => {
  const carousel = document.getElementById("carrusel");
  if (carousel) {
    const scrollAmount = carousel.offsetWidth * 0.7; 
    carousel.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  }
};


  return (
    <div className="landing">
      {/* Sección de bienvenida */}
      <section className="hero fade-up">
        <h1 className="titulo">🐾 PetCare</h1>
        <h2 className="subtitulo">Gestiona las tareas de tu Mascota</h2>
        <p className="descripcion">
          Recordá vacunas, alimentaciones y paseos de tus mascotas en un solo lugar.
        </p>
        <div className="botones">
          <Link to="/login" className="btn">
            Inicia Sesión / Registrate
          </Link>
        </div>
      </section>

      {/* Sección Tareas */}
      <section className="tareas fade-up">
        <h2>El cuidado completo de tu mejor amigo, en un solo lugar.</h2>
        <div className="tareas-grid">
          <div className="tarea-card">
            <img src="vacuna.png" alt="Vacunas" className="icon-img" />
            <h3>Control de Vacunas</h3>
            <p>Llevá un registro digital de cada vacuna y desparasitación.</p>
          </div>
          <div className="tarea-card">
            <img src="/Alimentación.png" alt="Alimentación" className="icon-img" />
            <h3>Horarios de Alimentación</h3>
            <p>
              ¿Dieta especial? ¿Horarios fijos? Organizá su alimentación para que siempre esté sano y con energía.
            </p>
          </div>
          <div className="tarea-card">
            <img src="/Medicamentos.png" alt="Medicamentos" className="icon-img" />
            <h3>Gestión de Medicamentos</h3>
            <p>
              Ideal para recordar su pastilla de la alergia o el antipulgas. 
            </p>
          </div>
          <div className="tarea-card">
            <img src="/correa.png" alt="Paseos" className="icon-img" />
            <h3>Agenda de Paseos</h3>
            <p>
              Asegurate de que tenga su dosis diaria de felicidad. Agendá sus paseos y horas de juego.
            </p>
          </div>
        </div>
      </section>

      {/* Sección Cómo funciona */}
      <section className="como-funciona fade-up">
        <h2>Así de fácil, Así de lindo</h2>
        <div className="pasos">
          <div className="paso fade-up">
            <div className="texto">
              <h3>Un perfil único para cada uno</h3>
              <p>
                Creá un perfil adorable para cada miembro de tu familia. Subí su mejor foto, contanos su especie y su edad.
                Tendrás toda su información personal en un vistazo.
              </p>
            </div>
            <div className="imagen">
              <img src="/mis-mascotas.png" alt="Mockup Mis Mascotas" />
            </div>
          </div>

          <div className="paso invertido fade-up">
            <div className="imagen">
              <img src="/gestor-tareas.png" alt="Gestor de Tareas" />
            </div>
            <div className="texto">
              <h3>Un gestor de tareas que te entiende</h3>
              <p>
                Creá tareas en segundos. Asigná un título, una fecha y elegí el tipo. ¿Es una vacuna para tu gato? ¿Un paseo para tu cachorro?
                Lo tendrás todo bajo control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Filtros */}
      <section className="filtros fade-up">
        <h2>Encontrá lo que buscás, al instante</h2>
        <p>
          No importa cuántas mascotas o tareas tengas. Nuestro filtro inteligente te permite encontrar lo que necesitás en segundos.
        </p>
        <div className="filtros-demo">
          <div className="mini-tarjeta">Filtrar por Mascota: Gato </div>
          <div className="mini-tarjeta">Filtrar por Tipo: Vacunas</div>
          <div className="mini-tarjeta">Buscar por Título: Antipulgas</div>
        </div>
        <img src="/detective.png" alt="Perrito detective" className="imagen-filtro" />
      </section>

      {/* Sección Galería */}
<section className="galeria fade-up">
  <h2>Conocé a la familia PetCare</h2>
  <p>Fotos de los compañeros de nuestros usuarios.</p>
  <div className="carrusel-wrapper">
    <div className="carrusel" id="carrusel">
      <img src="/imgcarrusel.png" alt="Mascota 1" />
      <img src="/imgcarrusel2.png" alt="Mascota 2" />
      <img src="/imgcarrusel3.png" alt="Mascota 3" />
      <img src="/imgcarrusel4.png" alt="Mascota 4" />
      <img src="/imgcarrusel5.png" alt="Mascota 5" />
      <img src="/imgcarrusel6.png" alt="Mascota 6" />
     
    </div>
  </div>
</section>



      {/* Sección final */}
      <section className="cta fade-up">
        <h2>¿Listo para ser el héroe de tu mascota?</h2>
        <p>
          Organización es otra forma de decir 'te quiero'. Dale a tu mejor amigo el cuidado que se merece.
        </p>
        <Link to="/register" className="btn btn-cta">
          Registrarme Gratis
        </Link>
      </section>

   <footer className="footer fade-up">
  <hr className="footer-line" />
  <div className="footer-redes">
    <a href="https://www.instagram.com/gimeeperez.ok/" target="_blank" rel="noopener noreferrer">
      <img src="/instagram-icon.png" alt="Instagram" />
    </a>
    <a href="https://www.facebook.com/profile.php?id=100008849832666" target="_blank" rel="noopener noreferrer">
      <img src="/facebook-icon.png" alt="Facebook" />
    </a>
  </div>
  <hr className="footer-line" />
  <p>© Gimena Perez 2025</p>
</footer>

    </div>
    
  );
}
