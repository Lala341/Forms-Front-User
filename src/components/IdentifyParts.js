import React, {useEffect, useState} from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import Webcam from "react-webcam";
import Slide from '@material-ui/core/Slide';
import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations';
import { store } from 'react-notifications-component';
import iconCar from "../static/iconCar.png";
import carroceria from "../static/carroceria.png";
import icon1 from "../static/icon1.png";
import icon2 from "../static/icon2.png";
import icon3 from "../static/icon3.png";
import icon4 from "../static/icon4.png";
import icon5 from "../static/icon5.png";

import DataList from './dataList/dataList';

const bounceAnimation = keyframes`${bounce}`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function IdentifyParts(props) {
  const [message, setMessage] = useState("");
  const [value, setValue] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [openMic, setOpenMic] = useState(false);
  const [animation, setAnimation] = useState(false);
  // const [formulario, setFormulario] = useState(new Formulario());

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
  // useEffect (() => props.rtc.registrarCallbackMensajesID(handleClose2, 'mensajes'), []);

  // props.rtc.registrarCallbackMensajesID(handleDataMSG, "data");
 
  
  return (
    <div className="col-12">
      <div className="row" style={{color:"white"}}>
        <div className="col-3" style={{textAlign: "left"}}>
          
        <DataList formulario={props.formulario}/>
        </div>
        <div className="col-5" style={{paddingTop: "2%"}}>
        <img src={iconCar} width="100%"></img>

        </div>
        <div className="col-4">
        <div className="row">
        <Webcam height="50%" width="100%" style={{padding: "10%"}} />
        </div>
        
        </div>
        
            </div>
            <div className="row">
              <div style={{widht: "300px", overflowX: "scroll", overflowY: "hidden", whiteSpace: "nowrap"}}>
              
                <div style={{display: "inline-flex", minHeight: "210px", margin:"1%", border: "4px solid white", textAlign:"center"}}>
                <img src={icon1} height="200px" ></img>
                </div>
                <div style={{display: "inline-flex", minHeight: "210px", margin:"1%",  border: "4px solid white", textAlign:"center"}}>
                <img src={icon2} width="200px"></img>
                </div>
                <div style={{display: "inline-flex", minHeight: "210px", margin:"1%",  border: "4px solid white", textAlign:"center"}}>
                <img src={icon3} width="200px"></img>
                </div>
                <div style={{display: "inline-flex", minHeight: "210px", margin:"1%",  border: "4px solid white", textAlign:"center"}}>
                <img src={icon4} width="200px"></img>
                </div>
                <div style={{display: "inline-flex", minHeight: "210px", margin:"1%",  border: "4px solid white", textAlign:"center"}}>
                <img src={icon5} width="200px"></img>
                
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

export default IdentifyParts;
