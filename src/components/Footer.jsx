import React from "react";

const footerStyle = {
  //ESTILO GENERAL DEL FOOTER.
  backgroundColor: "#000", //NEGRO, SE PUEDE REVISAR PERO PARECE QUE OFRECE BUEN CONTRASTE.
  color: "#fff",
  textAlign: "center",
  padding: "1rem",
  width: "100%",
  position: "relative",
  top: 235,
  bottom: 0,
  left: 0,
  marginTop: "auto",
};

/*ESTILOS PARA QUE LOS BOTONES DE ABAJO ("POLÍTICA DE PRIVACIDAD"...) NO TENGAN SUBRAYADO Y EL TEXTO ESTÉ EN BLANCO.*/
const textStyle = {
  textDecoration: "none",
  color: "white",
  margin: 0,
  fontFamily: "Roboto", //PARA QUE QUEDE BIEN "DeI" ES MEJOR CON SERIFA (Y SEPARADO EN CASO NO QUE NO CARGUE LA FUENTE).
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div className="container">
   
        <div className="row text-center">
      
          <div className="col">
            <div className="d-flex flex-column align-items-center">
              <button type="button" className="btn btn-link mb-5" style={textStyle}>
                Política de privacidad
              </button>
              <button type="button" className="btn btn-link" style={textStyle}>
                Aviso legal
              </button>
            </div>
          </div>

        
          <div className="col mb-3">
            <img src="/logoDEI.jpg" alt="Logo" style={{ width: "50%" }} />
          </div>

        
          <div className="col">
            <div className="d-flex flex-column align-items-center">
              <button type="button" className="btn btn-link mb-5" style={textStyle}>
                Protección de datos y política de cookies
              </button>
              <button type="button" className="btn btn-link" style={textStyle}>
                Contacto
              </button>
            </div>
          </div>
        </div>

        
        <div>
          <p style={textStyle}>
            © David Rojas e Iñaki Monzón (D e I Enterprises) 2025. Práctica del
            Bootcamp Web Development Full Stack de Iron Hack.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

