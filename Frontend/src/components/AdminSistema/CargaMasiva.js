import { React, useState } from 'react';
import NavBarAdminSistema from './NavBarAdminSistema';
import { cargamasiva } from '../../utils/api';

function CargaMasiva() {
  var texto = ""
  const [myValue, setMyValue] = useState('')
  const [respuesta, setResp] = useState('')

  const readFile = (e) => {
    const file = e.target.files[0];
    texto = ""
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
      setMyValue(fileReader.result);
      texto = fileReader.result
    }
    fileReader.onerror = () => {
      console.log(fileReader.error);
    }
  }

  const limpiar = (e) => {
    window.location.reload();
  }

  const GuardarEnBase = (e) => {
    if (myValue === "") {
      alert("No hay archivo cargado")
    } else {
      cargamasiva(myValue)
        .then(res => {
          console.log(res)
          alert("Datos Guardados!")
          setResp(JSON.stringify(res.data), null, '\t')
        })
        .catch((err) => {
          console.log(err)
          alert("Algo salio mal :(")
        });
    }
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
          readOnly={true}
          value={myValue}
          onChange={(e) => setMyValue(e.target.value)}
        ></textarea>
      </div>
      <br />
      <div style={{ textAlign: "center" }}>
        <input
          type="file"
          multiple={false}
          onChange={readFile}
        />
        <button class="btn btn-info" onClick={() => { limpiar() }}>Limpiar</button>
        <button style={{ marginLeft: "2%" }} class="btn btn-success" onClick={() => { GuardarEnBase() }}>Gurdar en Base de Datos</button>
      </div>
      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        <textarea
          cols="100"
          rows="10"
          readOnly={true}
          value={respuesta}
        ></textarea>
      </div>
    </div>
  );

}

export default CargaMasiva;