import React, { useState, useEffect } from 'react'
import { getUsuarios } from '../../utils/api';
import { MDBTable, MDBTableBody, MDBTableEditable } from 'mdbreact';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const users = [
  { NOMBRE: "william" },
  { NOMBRE: "Cindy" },
  { NOMBRE: "Roxana" },
  { NOMBRE: "Estrada" },
  { NOMBRE: "Hernández" }
]

function UsersTable ({childToParent}) {
  const [usuarios, setUsuarios] = useState([])
  const [seleccion, setSeleccion] = useState("")
  var palabra="hola"
  useEffect(() => {
    getUsers()
  }, [])
  const getUsers = async () => {
    const response = await getUsuarios()
    setUsuarios(response.data)
  }
  function mostrar(msg) {
       alert(msg)
       setSeleccion(msg)
  }
  return (
    
    <>
      <table style={{ float: "left", marginLeft: "2%" }}>
        <tbody style={{ 'height': '100%', 'overflow-y': 'auto', 'display': 'block' }}>
          {usuarios.map(usuario => (
            <tr key={usuario.autor}>
              <td style={{ paddingLeft: "5%" }} >{usuario.NOMBRE}</td>
              <td ><button onClick={() => mostrar(usuario.NOMBRE)}>Ver Mensajes</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button primary onClick={() => childToParent(seleccion)}>Click Child</Button>
    </>
  )
}

export default class DynamicTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      items: []
    }
  }

  updateMessage(event) {
    this.setState({
      message: event.target.value
    });
  }

  Enviar() {
    var items = this.state.items;

    items.push(this.state.message);

    this.setState({
      items: items,
      message: ""
    });
  }

  handleItemChanged(i, event) {
    var items = this.state.items;
    items[i] = event.target.value;

    this.setState({
      items: items
    });
  }

  renderRows() {
    var context = this;
    return this.state.items.map(function (o, i) {
      return (
        <tr key={"item-" + i}>
          <td>
            <input
              type="text"
              value={o}
              onChange={context.handleItemChanged.bind(context, i)}
            />
          </td>
        </tr>
      );
    });
  }

  childToParent = (palabra) => {
    alert(palabra)
  }

  render() {
    return (

      <div>
        <br />
        <Link to="/adminsistema/adminusershome/adminusers">
          <button style={{ marginLeft: "2%" }} class="btn btn-success">
            Regresar
          </button>
        </Link>
        <UsersTable childToParent={this.childToParent}/>
        <br />
        <h1 style={{ textAlign: "center", color: "white" }}>Mensajes</h1>
        <br />
        <table className="">
          <thead>
            <tr>
              <th>
                Item
              </th>
              <th>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
        <hr />
        <input
          type="text"
          value={this.state.message}
          onChange={this.updateMessage.bind(this)}
        />
        <button
          onClick={this.Enviar.bind(this)}
        >
          Add Item
        </button>
        <button
          
        ></button>
      </div>
    );
  }
}