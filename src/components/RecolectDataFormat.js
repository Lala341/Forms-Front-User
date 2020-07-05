import React, {useEffect, useState} from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import Webcam from "react-webcam";
import Slide from '@material-ui/core/Slide';
import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations';
import { store } from 'react-notifications-component';
import iconCar from "../static/iconCar.png";
import carroceria from "../static/carroceria.png";

import DataList from './dataList/dataList';

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

  // const handleClose2 = (e) => {
  //   let msg = String(e.data);
  //   //Ignora los mensajes que son de datos.
  //   if(msg.startsWith('data:::')) {return;}
  //   setMessage(e.data);
  //   setValue(true);
  //   document.getElementById("play").click();
  //   triggerAnimation();
  // }
  // const triggerAnimation=() =>{
    
  //   setAnimation(!animation);
  // }
  // useEffect (() => props.rtc.registrarCallbackMensajesID(handleClose2, 'mensajes'), []);

  // props.rtc.registrarCallbackMensajesID(handleDataMSG, "data");
 
  
  return (
      <div className="row" style={{color:"white"}}>
        <div className="col-4" style={{textAlign: "left"}}>
          <h2>{props.formulario.placa}</h2>
          <h6>BOG</h6>
       <img src={iconCar}></img>
        <DataList formulario={props.formulario}/>
        </div>
        <div className="col-4" style={{paddingTop: "10%"}}>
          <h2>CARROCERÍA</h2>
        <div style={{padding: "20%", paddingTop: "5%"}}>
          <h5 style={{color: "grey", backgroundColor:"white", borderRadius:"10px", padding:"2%"}}>{props.formulario.nombres}</h5>
          <h5 style={{color: "grey", backgroundColor:"white", borderRadius:"10px", padding:"2%"}}>{props.formulario.placa}</h5>
         
          </div>
          <img src={carroceria} width="100%"></img>
       
        </div>
        <div className="col-4">
        <div className="row">
        <Webcam height="50%" width="100%" style={{padding: "10%"}} />
        </div>
        
        </div>
        
            </div>
      
      
  );
}

export default RecolectDataFormat;
