import React from 'react';
import { Formulario } from '../../General';

import './dataList.css';


class DataList extends React.Component {
    constructor(props){
        super(props)
        this.form = props.form;
    }

    updateComponent(pForm) {
        this.form = pForm;
    }

    componentDidUpdate() {
        console.log('DATALIST: Update');
    }

    renderLine(key) {
        return (
            <div className="row lefty justify-content-around">
                <div className='col-6'>
                    {key}:
            </div>
                <div className='col-6'>
                    {this.props.form[key] === ''? '-' : this.props.form[key]}
            </div>
            </div>
        );
    }

    renderAll() {
        const fields = Object.keys(this.props.form);

        return fields.map(field => (
            <div>{this.renderLine(field)}</div>
        ));
    }

    render() {
        return (
            <div className="whiteText test">
                {this.renderAll()}
            </div>
        );
    }
}



export default DataList;