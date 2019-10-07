import React from 'react';

export default function Card(props) {

  return (
    <>
        <div className="card">
            <div className="cardIcon" style={{backgroundColor: props.cor}}>
                <i className={props.icone}></i>
            </div>
            <div className="cardValor" style={{fontSize: props.tamanhoFonte}}>
                <p style={{color: props.cor}}>{props.valor}</p>
            </div>
            <div className="cardTexto">
                <p>{props.texto}</p>
            </div>
        </div>
    </>
  );
}