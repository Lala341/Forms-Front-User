import React, { useEffect, useState, useRef } from 'react';
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
import DataList from './components/dataList/dataList';
import RecolectData from './components/RecolectData';
import rtc_connection from './components/webrtc_connection/userTest';
import RecolectDataCC from './components/RecolectDataCC';
import { ButtonGroup } from '@material-ui/core';
import RecolectDataFormat from './components/RecolectDataFormat';
import IdentifyProcess from './components/IdentifyProcess';
import IdentifyParts from './components/IdentifyParts';


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
  const [formulario, setFormulario] = useState({
    nombres: ' ',
    apellidos: ' ',
    cedula: ' ',
    placa: ' ',
    numCarroceria: ' ',
    tipoCarroceria: ' ',
    numMotor: ' ',
    numSerie: ' ',
    combustible: ' ',
    colores: ' ',
    cilindrada: ' ',
    potencia: ' ',
    capacidad: ' ',
    clase: ' ',
    vin: ' ',
    marca: ' ',
    linea: ' ',
    modelo: ' ',
    blindaje: ' ',
    desmonteBlindaje: ' '
  });
  const currentIdRef = useRef(0);



  const gotoRecolectData = () => {
    currentIdRef.current = 1
    setCurrentPage(
      <RecolectData id='recolect1' rtc={props.rtc} formulario={formulario} />
    )
  }

  const gotoRecolectData2 = () => {
    currentIdRef.current = 2
    setCurrentPage(
      <RecolectDataCC rtc={props.rtc} formulario={formulario} />
    )
  }
  const gotoIdentifyProcess = () => {
    currentIdRef.current = 3
    setCurrentPage(
      <IdentifyProcess next={nextPage} rtc={props.rtc} formulario={formulario} />
    )
  }
  const gotoIdentifyParts = () => {
    currentIdRef.current = 4
    setCurrentPage(
      <IdentifyParts rtc={props.rtc} formulario={formulario} />
    )
  }


  const entrar =
    (
      <div className="row justify-content-center">
        <button type="button" class="btn btn-default"
          onClick={gotoRecolectData}
          style={{ width: "300px", height: "300px", borderRadius: "150px", backgroundColor: "black", border: "solid white", color: "white", marginTop: "15%" }}>
          <h1>Entrar</h1>
        </button>
      </div>
    )

  const [currentPage, setCurrentPage] = useState(entrar);
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

  let handleDataMSG = (e) => {
    let msg = String(e.data);
    //Ignora los mensajes que no son de daots.
    console.log('Mensaje:' + msg);
    if (msg.startsWith('control:::')) {
      //Control
      
      let control = msg.split(':::')[1];
      console.log('control msg: ' + control);
      switch (control) {
        case 'previousScreen':
          prevPage();
          break;
        case 'nextScreen':
          nextPage();
          break;
        default:
          break;
      }
      return;
    }
    if (!msg.startsWith('data:::')) {
      // speak({ text: msg });
      setMessage(msg);
      document.getElementById("play").click();
      return;
    }
    let data = msg.split(":::")[1];
    let key = data.split(':')[0];
    let value = data.split(':')[1];
    var form = formulario;
    form[key] = value;
    console.log(value);
    console.log(key);
    console.log(data);
    setFormulario(form);
    setMessage(value);
    updatePage(currentIdRef.current);
  }

  var updatePage = (id) => {
    // console.log(id);
    switch (id) {
      case 0:
        console.log("updatePage: Entrar");
        setCurrentPage(entrar);
        break;
      case 1:
        console.log("updatePage: recolect");
        gotoRecolectData();
        break;
      case 2:
        console.log('updatePage: recolectCC')
        gotoRecolectData2();
        break;
      case 3:
        console.log('updatePage: process')
        gotoIdentifyProcess();
        break;
      case 4:
        console.log('updatePage: parts')
        gotoIdentifyParts();
        break;
      
      default:
        break;
    }
  }

  const nextPage = () => {
    switch (currentIdRef.current) {
      case 0:
        gotoRecolectData();
        break;
      case 1:
        gotoRecolectData2();
        break;
      case 2:
        console.log('updatePage: process')
        gotoIdentifyProcess();
        break;
      case 3:
        console.log('updatePage: parts')
        gotoIdentifyParts();
        break;
      default:
        break;
    }
  }

  const prevPage = () => {
    switch (currentIdRef.current) {
      
      case 2:
        gotoRecolectData();
        break;
      case 4:
        gotoRecolectData2();
        break;
      default:
        break;
    }
  }



  const handleClose2 = (e) => {
    let msg = String(e.data);
    //Ignora los mensajes que son de datos.
    if (msg.startsWith('data:::')) { return; }
    setMessage(e.data);
    setValue(true);
    // document.getElementById("play").click();
    triggerAnimation();
  }
  const triggerAnimation = () => {

    setAnimation(!animation);
  }
  useEffect(() => props.rtc.registrarCallbackMensajesID(handleDataMSG, "data"), [])
  // props.rtc.registrarCallbackMensajesID(handleDataMSG, "data")

  return (
    <div className="App">
      {currentPage}
      <IconButton id="play" onClick={() => speak({ text: message })} type="button" style={{ margin: "0.5%", backgroundColor: "black" }}></IconButton>
      <div>
        Último mensaje: {message}
      </div>
      <div>
        <ButtonGroup>
          <IconButton id="previous" onClick={prevPage}
            style={{ width: "60px", height: "60px", borderRadius: "150px", backgroundColor: "black", border: "grey", color: "grey", marginTop: "50%" }}>
            {'<-'}
          </IconButton>
          <IconButton id="next" onClick={nextPage}
            style={{ width: "60px", height: "60px", borderRadius: "150px", backgroundColor: "black", border: "grey", color: "grey", marginTop: "50%" }}>
            {'->'}
          </IconButton>

        </ButtonGroup>
      </div>
    </div>
  );
}


export default General;
