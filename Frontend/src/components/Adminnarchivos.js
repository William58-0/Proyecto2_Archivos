import { useState } from 'react';
import { saveAs } from 'file-saver'
import NavBarAdminSistema from './NavBarAdminSistema';

function CargaMasiva() {

  const [myValue, setMyValue] = useState('')

  const createFile = () => {

    const blob = new Blob([ myValue ], { type: 'text/plain;charset=utf-8' });
    saveAs( blob, 'mi-archivo.txt' );
  }

  const readFile = ( e ) => {

    const file = e.target.files[0];
    if ( !file ) return;

    const fileReader = new FileReader();

    fileReader.readAsText( file );

    fileReader.onload = () => {
      console.log( fileReader.result );
      setMyValue( fileReader.result );
    }

    fileReader.onerror = () => {
      console.log( fileReader.error );
    }

  }

  return (
    
    <div>
      <NavBarAdminSistema />
        <h1>Carga Masiva </h1>
        <textarea
          cols="30"
          rows="10"
          placeholder="Ingrese lo que desea grabar"
          value={ myValue }
          onChange={ ( e ) => setMyValue( e.target.value ) }
        ></textarea>

        <br />
        <input 
          type="file"
          multiple={ false }
          onChange={ readFile }
        />

        <br />

        <button
          onClick={ createFile }
        >
          Guardar archivo
        </button>

    </div>
  );
}

export default CargaMasiva;