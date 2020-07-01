import React, {useEffect} from 'react';

import './dataList.css';


function DataList(props){

  
   const renderLine=(key)=> {
        return (
            <div className="row lefty justify-content-around">
                <div className='col-6'>
                    {key}:
            </div>
                <div className='col-6'>
                    {props.formulario[key] === ''? '-' : props.formulario[key]}
            </div>
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
                {renderAll()}
            </div>
        );
    
}



export default DataList;