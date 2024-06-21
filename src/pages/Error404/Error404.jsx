import React from "react";
import Container from "react-bootstrap/Container";

export const Error404 = () => {
    return (
      <>
        <style>
          {`
            .navbar {
              display: none;
            }
          `}
        </style>
          <Container>
                    <h1 className="text-center ">404</h1>
  
                  <div className="contant_box_404">
                    <h3 className="h2">Error</h3>
  
                    <p>Pagina no encontrada</p>
  
                    <a href="/" className="link_404">
                      Volver
                    </a>
            </div>
            </Container>
      </>
    );
  };