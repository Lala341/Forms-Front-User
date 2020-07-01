import React, {useEffect} from 'react';

import './dataList.css';


function DataList(props){
    useEffect(() => console.log("update"), []);

  
   const renderLine=(key, title)=> {
        return (
            <div className="row lefty justify-content-around">
                <div className='col-6'>
                    {title}:
            </div>
                <div className='col-6'>
                    {props.formulario[key] === ''? '-' : props.formulario[key]}
            </div>
            </div>
        );
    }

    const renderSlected = () => {
        return(
            <div>
                <div>{renderLine('marca', 'Marca')}</div>
                <div>{renderLine('linea', 'Línea')}</div>
                <div>{renderLine('combustible', 'Combustible')}</div>
                <div>{renderLine('colores', 'Colores')}</div>
                <div>{renderLine('modelo', 'Modelo')}</div>
                <div>{renderLine('cilindrada', 'Cilindrada')}</div>
                <div>{renderLine('capacidad', 'Capacidad')}</div>
                <div>{renderLine('blindaje', 'Blindaje')}</div>
                <div>{renderLine('desmonteBlindaje', 'Desmonte Blindaje')}</div>
                <div>{renderLine('potencia', 'Potencia/HP')}</div>
                <div>{renderLine('numCarroceria', 'Carrocería')}</div>
                <div>{renderLine('vin', 'ID. Intera del vehiculo')}</div>
            </div>
        );
    }

    const renderAll=() => {
        var fields = Object.keys(props.formulario);

        return fields.map(field => (
            <div>{renderLine(field)}</div>
        ));
    }

    
        return (
            <div className="whiteText test">
                {/* {renderAll()} */}
                {renderSlected()}
            </div>
        );
    
}



export default DataList;