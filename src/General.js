import React, {useEffect, useState} from 'react';
import RecordAudio from "./components/recordAudio/recordAudio";
import Button from '@material-ui/core/Button';
import { useSpeechSynthesis } from 'react-speech-kit';
import ImageUploading from "react-images-uploading";
import ReplayIcon from '@material-ui/icons/Replay';
import IconButton from '@material-ui/core/IconButton';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import MicIcon from '@material-ui/icons/Mic';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import Webcam from "react-webcam";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ContactlessIcon from '@material-ui/icons/Contactless';
import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations';
import { store } from 'react-notifications-component';


const bounceAnimation = keyframes`${bounce}`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function General(props) {
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
    <div className="App">
      <div className="row">
      {(!(openVideo))&&(animation)&&(<BouncyDiv><ContactlessIcon style={{ fontSize: 400, color : "white", paddingTop: "10%" }}/></BouncyDiv>)}
      {(!(openVideo))&&(!animation)&&(<BouncyDiv><ContactlessIcon style={{ fontSize: 400, color : "white", paddingTop: "10%" }}/></BouncyDiv>)}

      {(openMic)&&(
      <Dialog
      open={openMic}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{"Audio"}</DialogTitle>
      <DialogContent 
          style={{paddingRight: "5%"}}>
      <RecordAudio/>
      </DialogContent>
      <DialogActions>
        
        <Button onClick={handleClose} color="primary">
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
      
      
      
      
      )}
      {(openVideo)&&(<Webcam height="50%" width="60%" style={{paddingTop: "10%"}}/>)}
      </div>
      {(value)&&(
        <div className="row">
         <h6 style={{color: "white"}}>{message}</h6>
      </div>)}
      <div className="row">
      <IconButton id="video"   onClick={() => {setOpenVideo(!openVideo)}} type="button" style={{margin: "0.5%", backgroundColor:"white"}}><VideoLabelIcon /></IconButton>

      <IconButton id="audio"   onClick={() => {setOpenMic(!openMic)}} type="button" style={{margin: "0.5%", backgroundColor:"white"}}><MicIcon /></IconButton>

      <ImageUploading multiple onChange={onChange} maxNumber={maxNumber}>
        {({ imageList, onImageUpload, onImageRemoveAll }) => (
          // write your building UI
        <IconButton id="image"   onClick={()=>{onImageUpload( ()=> onChange())}} type="button" style={{margin: "0.5%", backgroundColor:"white"}}><InsertPhotoIcon /></IconButton>

        )}

      </ImageUploading>

      {(value)&&(<IconButton id="play"   onClick={() => speak({ text: message })} type="button" style={{ margin: "0.5%", backgroundColor:"white"}}><ReplayIcon /></IconButton>)}
      </div>
    </div>
  );
}

export function Formulario(){
  this.nombres = '';
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

export default General;
