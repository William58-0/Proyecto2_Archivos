import { React, useState } from 'react';
import NavBarAdminSistema from './NavBarAdminSistema';
import { cargamasiva } from '../../utils/api';

function CargaMasiva() {
  var texto=""
  const [myValue, setMyValue] = useState('')

  const readFile = (e) => {
    const file = e.target.files[0];
    texto=""
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
      //console.log(fileReader.result);
      setMyValue(fileReader.result);
      texto=fileReader.result
      console.log(texto)
    }
    fileReader.onerror = () => {
      console.log(fileReader.error);
    }
  }
  
  const limpiar = (e) => {
      setMyValue("");
      texto=""
  }

  const GuardarEnBase = (e) => {
    console.log(myValue)
    cargamasiva(myValue)
                .then(res => {
                    console.log(res)
                    //this.setState({ salida: res.data.salida });
                    //Salida=res.data.salida;
                    //console.log(res.data.salida);
                })
                .catch((err) => console.log(err));
        //setMyValue("");
        //texto=""
}

  return (
    <div style={{ color: "white" }}>
      <NavBarAdminSistema />
      <br />
      <h1 style={{ textAlign: "center" }}>Carga Masiva </h1>
      <br />
      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        <textarea
          cols="100"
          rows="10"
          readOnly = {true}
          value={myValue}
          onChange={(e) => setMyValue(e.target.value)}
        ></textarea>
      </div>
      <br />
      <div style={{textAlign:"center"}}>
      <input
        type="file"
        multiple={false}
        onChange={readFile}
      />
       <button class="btn btn-info" onClick={() => {limpiar() }}>Limpiar</button>
       <button  style={{marginLeft:"2%"}} class="btn btn-success" onClick={() => {GuardarEnBase() }}>Gurdar en Base de Datos</button>
      </div>
      <br />
      <br />
    </div>
  );

}

export default CargaMasiva;