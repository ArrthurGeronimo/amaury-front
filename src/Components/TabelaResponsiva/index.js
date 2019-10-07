import React from 'react';
import './style.css';

export default function TabelaResponsiva(props) {

  return (
    <>
        <table className="tabelaResponsiva">
          <thead className="tabelaResponsiva-head">
            <tr>
                {props.head.map((item, index) => 
                    <th key={index}>{item}</th>
                )}
            </tr>
          </thead>
          <tbody className="tabelaResponsiva-body">
              
            {props.registros}

          </tbody>
        </table>
    </>
  );
}