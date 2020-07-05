import React, {useEffect, useState} from 'react';
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
function RecolectDataCC(props) {
  
  const [message, setMessage] = useState("");
  const [value, setValue] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [openMic, setOpenMic] = useState(false);
  const [animation, setAnimation] = useState(false);

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
  
  // const handleDataMSG = (e) => {
  //   let msg = String(e.data);
  //   //Ignora los mensajes que no son de daots.
  //   if(!msg.startsWith('data:::')){return;}
  //   let data = msg.split(":::")[1];
  //   let key = data.split(':')[0];
  //   let value = data.split(':')[1];
  //   let form = formulario;
  //   form[key] = value;
  //   setFormulario(form);
  //   console.log("data received: " + data);
  //   console.log(formulario);
  // }

  // const handleClose2 = (e) => {
  //   let msg = String(e.data);
  //   //Ignora los mensajes que son de datos.
  //   if(msg.startsWith('data:::')) {return;}
  //   setMessage(e.data);
  //   setValue(true);
  //   document.getElementById("play").click();
  //   triggerAnimation();
  // }
  const triggerAnimation=() =>{
    
    setAnimation(!animation);
  }
  // useEffect (() => props.rtc.registrarCallbackMensajesID(handleClose2, 'mensajes'), []);

  // props.rtc.registrarCallbackMensajesID(handleDataMSG, "data");
 
  
  return (
    <div className="App" style={{color:"white"}}>
      <div className="row">
        <div className="col-6">
        <div className="row">
        <Webcam height="50%" width="100%" style={{padding: "10%"}}/>
        </div>
        
        </div>
        <div className="col-6" style={{padding: "10%", textAlign: "left", paddingTop: "10%"}}>
          <h5 style={{textAlign: "center"}}>ACCESO DE VOZ</h5>
          <h5>-Muestra la cédula a la cámara.</h5>
          <h5>-Ahora por detrás.</h5>
          <div style={{padding: "10%", paddingTop: "20%"}}>
          <h2 style={{color: "grey", backgroundColor:"white", borderRadius:"10px", padding:"2%"}}>C.C: {props.formulario.cedula}</h2>
          {/* <h2 style={{color: "grey", backgroundColor:"white", borderRadius:"10px", padding:"2%"}}>{props.formulario.placa}</h2> */}
         
          </div>
          <div style={{paddingTop: "10%"}}>
          <h6 style={{color: "white"}}>{message}</h6>
          </div>
        </div>
            </div>
      
      
      
    </div>
  );
}

function Formulario(){
  this.nombres = 'Cristian Forero';
  this.apellidos = '';
  this.cedula = '';
  this.placa = '';
  this.numCarroceria = '';
  this.tipoCarroceria = '';
  this.numMotor = '';
  this.numSerie = '';
  this.combustible = '';
  this.colores = '';
  this.cilindrada = '';
  this.potencia = '';
  this.capacidad = '';
  this.clase = '';
  this.vin = '';
  this.marca = '';
  this.linea = '';
  this.modelo = '';
  this.blindaje = '';
  this.desmonteBlindaje = '';
}

export default RecolectDataCC;
