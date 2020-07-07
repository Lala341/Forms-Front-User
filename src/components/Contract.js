import React, { useEffect, useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import Webcam from "react-webcam";
import Slide from '@material-ui/core/Slide';
import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations';
import { store } from 'react-notifications-component';
import VideoPlayer from './videoPlayer';


const bounceAnimation = keyframes`${bounce}`;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function ContraparteContrato(props) {
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

    const contrato = (
        <div>
            <p>El señor <u>{props.formulario.nombres} {props.formulario.apellidos}</u> mayor de edad con domicilio en esta ciudad,
            identificado como aparece en su firma, quien en adelante se denominará <b>EL VENDEDOR</b> y, <u>{props.formulario.nombresContraparte} {props.formulario.apellidosContraparte}</u> mayor
            de edad y vecino de esta ciudad, quien se identifica como aparece en su firma y en adelante se denominará <b>EL COMPRADOR</b>, hemos acordado celebrar un contrato
            de <b>COMPRAVENTA</b> que se regirá por las normas civiles y comerciales que regulan la materia, según las siguientes clausulas: </p>
            <br></br>
            <p><b>Primera. Objeto: EL VENDEDOR</b> por medio del presente instrumento transfiere a título a continuación se identifica:</p>
            <p>Placa: <u>{props.formulario.placa}</u></p>
            <p>Marca: <u>{props.formulario.marca}</u> Modelo: <u>{props.formulario.modelo} </u> Línea: <u>{props.formulario.linea} </u></p>
            <p>Serie: <u>{props.formulario.numSerie}</u> Chasis: <u>{props.formulario.numCarroceria}</u></p>
            <p>Motor: <u>{props.formulario.numMotor}</u> Color: <u>{props.formulario.colores}</u></p>
        </div>
    )


    return (
        <div className="App" style={{ color: "white" }}>
            <div className="row">
                <div className="col-3">
                    <VideoPlayer />

                </div>
                <div className="col-6" style={{ padding: "10%", textAlign: "left", paddingTop: "10%" }}>
                    {contrato}

                </div>
                <div className="col-3">
                    <Webcam height="50%" width="100%" style={{ padding: "0%" }} />
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

export default ContraparteContrato;
