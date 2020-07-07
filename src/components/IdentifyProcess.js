import React, {useEffect, useState} from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import Webcam from "react-webcam";
import Slide from '@material-ui/core/Slide';
import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations';
import { store } from 'react-notifications-component';
import iconCar from "../static/iconCar.png";
import carroceria from "../static/carroceria.png";
import { fade, makeStyles } from '@material-ui/core/styles';

import DataList from './dataList/dataList';
const useStyles = makeStyles(theme => ({
  
  box: {
    
    width: "100%", 
    height: "100%",  
    minHeight: "200px",   
    border: "4px solid white", 
    textAlign:"center", 
    cursor: "pointer", 
    '&:hover': {
      backgroundColor: "white", color:"black",
    
    
    },
  }}));
const bounceAnimation = keyframes`${bounce}`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function IdentifyProcess(props) {
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
  const classes = useStyles();
  
  
  return (
    <div className="col-12">
      <div className="row" style={{color:"white"}}>
        <div className="col-8" style={{textAlign: "left"}}>
        
        <div className="row">
            <div className="col-4" style={{padding: "0.5%"}}>
                <div  className={classes.box} onClick={()=>{props.next()}}>
                <h3 style={{marginTop:"20%", marginBottom: "20%"}}>MATRICULA / REGISTRO</h3>
                </div>
                </div>
                <div className="col-4" style={{padding: "0.5%"}}>
                <div   className={classes.box} onClick={()=>{props.next()}}>
                <h3 style={{marginTop:"20%", marginBottom: "20%"}}>TRASPASO</h3>
                </div>
                </div>
                <div className="col-4" style={{padding: "0.5%"}}>
                <div   className={classes.box} onClick={()=>{props.next()}}>
                <h3 style={{marginTop:"20%", marginBottom: "20%"}}>TRANSLADO MATRICULA / REGISTRO</h3>
                </div>
                </div>
                </div>
                <div className="row">
                <div className="col-4" style={{padding: "0.5%"}}>
                <div   className={classes.box} onClick={()=>{props.next()}}>
                <h3 style={{marginTop:"20%", marginBottom: "20%"}}>RADICADO MATRICULA / REGISTRO</h3>
                </div>
                </div>
                <div className="col-4" style={{padding: "0.5%"}}>
                <div   className={classes.box} onClick={()=>{props.next()}}>
                <h3 style={{marginTop:"20%", marginBottom: "20%"}}>CAMBIO DE COLOR</h3>
              </div>
              </div>
              <div className="col-4" style={{padding: "0.5%"}}>
                <div   className={classes.box} onClick={()=>{props.next()}}>
                <h3 style={{marginTop:"20%", marginBottom: "20%"}}>CAMBIO DE SERVICIO</h3>
              </div>
              </div>
              </div>
                <div className="row">
              <div className="col-4" style={{padding: "0.5%"}}>
                <div   className={classes.box} onClick={()=>{props.next()}}>
                <h3 style={{marginTop:"20%", marginBottom: "20%"}}>REGRABAR MOTOR</h3>
              </div>
              </div>
              <div className="col-4" style={{padding: "0.5%"}}>
                <div   className={classes.box} onClick={()=>{props.next()}}>
                <h3 style={{marginTop:"20%", marginBottom: "20%"}}>REGRABAR CHASIS</h3>
              </div>
              </div>
              <div className="col-4" style={{padding: "0.5%"}}>
                <div   className={classes.box} onClick={()=>{props.next()}}>
                <h3 style={{marginTop:"20%", marginBottom: "20%"}}>TRANSFORMACION</h3>
                </div>
                </div>
              </div>
              
            </div>
        
        
        <div className="col-4">
        <div className="row">
        <Webcam height="20%" width="100%"  />
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

export default IdentifyProcess;
