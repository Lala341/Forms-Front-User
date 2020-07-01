import React, {useEffect, useState} from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import Webcam from "react-webcam";
import Slide from '@material-ui/core/Slide';
import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations';
import { store } from 'react-notifications-component';
import iconCar from "../static/iconCar.png";

const bounceAnimation = keyframes`${bounce}`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function RecolectDataFormat(props) {
  const [message, setMessage] = useState("");
  const [value, setValue] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [openMic, setOpenMic] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [formulario, setFormulario] = useState(new Formulario());

  const { speak } = useSpeechSynthesis();
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
  
  const handleDataMSG = (e) => {
    let msg = String(e.data);
    //Ignora los mensajes que no son de daots.
    if(!msg.startsWith('data:::')){return;}
    let data = msg.split(":::")[1];
    let key = data.split(':')[0];
    let value = data.split(':')[1];
    let form = formulario;
    form[key] = value;
    setFormulario(form);
    console.log("data received: " + data);
    console.log(formulario);
  }

  const handleClose2 = (e) => {
    let msg = String(e.data);
    //Ignora los mensajes que son de datos.
    if(msg.startsWith('data:::')) {return;}
    setMessage(e.data);
    setValue(true);
    document.getElementById("play").click();
    triggerAnimation();
  }
  const triggerAnimation=() =>{
    
    setAnimation(!animation);
  }
  useEffect (() => props.rtc.registrarCallbackMensajesID(handleClose2, 'mensajes'), []);

  props.rtc.registrarCallbackMensajesID(handleDataMSG, "data");
 
  
  return (
      <div className="row" style={{color:"white"}}>
        <div className="col-4">
       <img src={iconCar}></img>
        
        </div>
        <div className="col-4">
          <h1>CARROCERÍA</h1>
        <div style={{padding: "20%", paddingTop: "5%"}}>
          <h2 style={{color: "grey", backgroundColor:"white", borderRadius:"10px", padding:"2%"}}>{formulario.nombres}</h2>
          <h2 style={{color: "grey", backgroundColor:"white", borderRadius:"10px", padding:"2%"}}>{formulario.placa}</h2>
         
          </div>
        
        </div>
        <div className="col-4">
       
        
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

export default RecolectDataFormat;
