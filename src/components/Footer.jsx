import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div className="d-flex justify-content-around mb-5">
        <a>
          <p style={textStyle}>Política de privacidad</p>
        </a>
        <a>
          <p style={textStyle}>Protección de datos y política de cookies</p>
        </a>
        <a>
          <p style={textStyle}>Aviso legal</p>
        </a>
        <a>
          <p style={textStyle}>Contacto</p>
        </a>
      </div>
      <div>
      <p style={textStyle}>
        © David Rojas e Iñaki Monzón (DeI Enterprises) 2025. Práctica del
        Bootcamp Web Development Full Stack de Iron Hack.
      </p>
      </div>
    </footer>
  );
};

const footerStyle = {  //ESTILO GENERAL DEL FOOTER
  backgroundColor: "#000", //NEGRO, SE PUEDE REVISAR PERO PARECE QUE OFRECE BUEN CONTRASTE
  color: "#fff",
  textAlign: "center",
  padding: "1rem",
  position: "fixed",
  bottom: 0,
  width: "100%",
};

const textStyle = {
  margin: 0,
  fontFamily: "Roboto", //PARA QUE QUEDE BIEN "DeI" ES MEJOR CON SERIFA.
};


export default Footer;
