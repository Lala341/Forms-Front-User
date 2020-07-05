import React, { useEffect, useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import Webcam from "react-webcam";
import Slide from '@material-ui/core/Slide';
import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations';
import { store } from 'react-notifications-component';


const bounceAnimation = keyframes`${bounce}`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function RecolectData(props) {
  const formulario = props.formulario
  const [message, setMessage] = useState("");
  const [value, setValue] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [openMic, setOpenMic] = useState(false);
  const [animation, setAnimation] = useState(false);
  // const [formulario, setFormulario] = useState(new Formulario());

  // const { speak } = useSpeechSynthesis();
  const maxNumber = 69;
  const onChange = imageList => {
    // data for submit
    console.log(imageList);
    store.addNotification({
      title: "Imagen",
      message: "Imagen recibida.",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 3000,
      }
    });

  };
  const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;
  const handleClose = () => {
    setOpenMic(false);


  };

  const triggerAnimation = () => {

    setAnimation(!animation);
  }


  return (
    <div className="App" style={{ color: "white" }}>
      <div className="row">
        <div className="col-6">
          <div className="row">
            <Webcam height="50%" width="100%" style={{ padding: "10%" }} />
          </div>

        </div>
        <div className="col-6" style={{ padding: "10%", textAlign: "left", paddingTop: "10%" }}>
          <h5 style={{ textAlign: "center" }}>ACCESO DE VOZ</h5>
          <h5>-Di nombre completo.</h5>
          <h5>-Di numero de placa.</h5>
          {/* <h5>-Di xxxxxxxxxxxxxxxxxxxxxx.</h5> */}
          <div style={{ padding: "10%", paddingTop: "20%" }}>
            <h4>Nombres y Apellidos</h4>
            <h2 style={{ color: "grey", backgroundColor: "white", borderRadius: "10px", padding: "2%" }}>{props.formulario.nombres} {props.formulario.apellidos}</h2>
            <h4>Placa del carro</h4>
            <h2 style={{ color: "grey", backgroundColor: "white", borderRadius: "10px", padding: "2%" }}>{props.formulario.placa}</h2>

          </div>
          <div style={{ paddingTop: "10%" }}>
            <h6 style={{ color: "white" }}>{message}</h6>
          </div>
        </div>
      </div>



    </div>
  );
}

// function Formulario(){
//   this.nombres = 'Cristian Forero';
//   this.apellidos = '';
//   this.cedula = '';
//   this.placa = '';
//   this.numCarroceria = '';
//   this.tipoCarroceria = '';
//   this.numMotor = '';
//   this.numSerie = '';
//   this.combustible = '';
//   this.colores = '';
//   this.cilindrada = '';
//   this.potencia = '';
//   this.capacidad = '';
//   this.clase = '';
//   this.vin = '';
//   this.marca = '';
//   this.linea = '';
//   this.modelo = '';
//   this.blindaje = '';
//   this.desmonteBlindaje = '';
// }

export default RecolectData;
