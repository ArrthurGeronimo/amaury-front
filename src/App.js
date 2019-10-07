import React, { useState, useEffect } from "react";
import './App.css';
import Chart from './Components/Chart';
import Card from './Components/Card';
import Tabela from './Components/TabelaResponsiva';
import axios from "axios";
import Moment from 'react-moment';
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/pt-br';

// Sets the moment instance to use.
Moment.globalMoment = moment;
 
// Set the locale for every react-moment instance to French.
Moment.globalLocale = 'pt-br';
 
// Set the output format for every react-moment instance.
//Moment.globalFormat = 'DD/MMM/YYYY';

export default function App() {
  const [values, setValues] = useState({
    consultouAPI: false,
    registros: [],
    totalDeRegistros: 0,
    totalDeRegistrosDeHoje: 0,
    ultimoDiaDeRegistro: '00/00',
    ultimoHoraDeRegistro: '00:00'
  });
//HANDLE CHANGE
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
//PEGA DADOS DA PESSOA DA API
useEffect(() => {
  axios.get(`http://localhost:3000/api/dados_da_estacao`)
  .then(res => {
    console.log(res.data);
    let ultimoIndex = res.data.length-1;
    let dataUltimo = res.data[ultimoIndex].data;
    let totalDeHoje = 0;
    //console.log(dataUltimo);
    for(let i = 0; i < res.data.length; i++){
      if(res.data[i].data === dataUltimo){
        totalDeHoje++;
      }
    }
    setValues({ ...values, 
      registros: res.data,
      consultouAPI: true,
      totalDeRegistros: res.data.length,
      ultimoDiaDeRegistro: <Moment format="DD/MM">{res.data[ultimoIndex].data}</Moment>,
      ultimoHoraDeRegistro: <Moment fromNow>{res.data[ultimoIndex].data}</Moment>,
      totalDeRegistrosDeHoje: totalDeHoje
    });
  })
  .catch(function (error) {
      console.log(error);
  })
}, []);
//MONTANDO A TABELA
const valoresParaPreencherHeadDaTabela = [
  "Data", "Hora", "TemperaturaAr", "Precipitação", "UmidadeAr", "PressãoAr", "TemperaturaSolo", "UmidadeSolo", "Vento", "NívelUv", "MédiaUv"
]
const preencherNaTabela = () => {
  return(
      values.registros.map((item, index) => 
      <tr key={index}>
        <td><Moment format="DD/MM/YYYY">{item.data}</Moment></td>
        <td>{item.horario}</td> 
        <td>{item.temperaturaAr}</td>
        <td>{item.precipitacao}</td>
        <td>{item.umidadeAr}</td>
        <td>{item.pressaoAr}</td>
        <td>{item.temperaturaSolo}</td>
        <td>{item.umidadeSolo}</td>
        <td>{item.vento}</td>
        <td>{item.nivelUv}</td>
        <td>{item.mediaUv}</td>
      </tr>
    )
  )
}

const dataDoGrafico1 = () => {
  if(values.consultouAPI){
    let tamanhoTotal = values.registros.length;
    let tamanhoEscolhido = 8;
    let array = [];
    let dataDoRegistro = '';
    let novaDataDoRegistro = '';
    let count = 0;
    let soma = 0;
    let arrayDosRegistros = values.registros;
    
    for(let i = tamanhoTotal-1; i > 1; i--){
      
      return console.log(<Moment format="DD/MM/YYYY">{arrayDosRegistros[i].data}</Moment>)

      dataDoRegistro = <Moment format="DD/MM/YYYY">{arrayDosRegistros[i].data}</Moment>
      if(novaDataDoRegistro === ''){
        novaDataDoRegistro = dataDoRegistro
      }else if(novaDataDoRegistro === dataDoRegistro){
        console.log('mesmo dia')
      }

    }

    
  }
}
  return (
    <>
      <div className="containerGeral">
        <div className="container">
          {/* LINHA DOS CARDS */}
          <div className="row">
            <div className="col-md-3">
              <Card 
                icone="fas fa-chart-line" 
                valor={values.totalDeRegistros}
                texto={"Total de Registros"}
                cor={"#ffa726"}
                tamanhoFonte={"50pt"}
              />
            </div>
            <div className="col-md-3">
              <Card 
                icone="far fa-calendar-check" 
                valor={values.totalDeRegistrosDeHoje}
                texto={"Registros de Hoje"}
                cor={"#43a047"}
                tamanhoFonte={"50pt"}
              />
            </div>
            <div className="col-md-3">
              <Card 
                icone="far fa-calendar-alt" 
                valor={values.ultimoDiaDeRegistro}
                texto={"Último dia"}
                cor={"#e53935"}
                tamanhoFonte={"40pt"}
              />
            </div>
            <div className="col-md-3">
              <Card 
                icone="far fa-clock" 
                valor={values.ultimoHoraDeRegistro}
                texto={"Deste o último registro"}
                cor={"#00acc1"}
                tamanhoFonte={"20pt"}
              />
            </div>
          </div>
          {/* 
          <div className="row">
            <div className="col-md-6">
              <Chart dados={dataDoGrafico1()} />
            </div>
            <div className="col-md-6">
              <Chart />
            </div>
          </div>
          */}
          <div className="row">
            <div className="col-md-12">
              <Tabela
                head={valoresParaPreencherHeadDaTabela}
                registros={preencherNaTabela()}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}