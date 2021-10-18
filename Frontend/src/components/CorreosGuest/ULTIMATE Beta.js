import React, { useState, useEffect } from 'react'
import { getUsuarios } from '../../utils/api';

const users = [
  { NOMBRE: "william" },
  { NOMBRE: "Cindy" },
  { NOMBRE: "Roxana" },
  { NOMBRE: "Estrada" },
  { NOMBRE: "Hernández" }
]

const Table = () => {
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const response = await getUsuarios()
    setUsuarios(response.data)
  }

  const renderBody1 = () => {
    return usuarios && usuarios.map(({ NOMBRE }) => {
      return (
        <tr key={NOMBRE}>
          <td> <img style={{ borderRadius: '50%' }}
            src={'https://www.madd.org/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png'}
            width={30}
            alt='Player'
          /></td>
          <td>{NOMBRE}</td>
          <td className='opration'>
            <button className='button'>Ver Mensajes</button>
          </td>
        </tr>
      )
    })
  }

  return (
    <>
      <table id='employee' style={{ float: "left", marginLeft:"2%" }}>
        <tbody style={{ 'height': '100%', 'overflow-y': 'auto', 'display': 'block' }}>
          {renderBody1()}
        </tbody>
      </table>
    </>
  )
}

export default class DynamicTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      items: [],
      usuarios: this.cargarUsuarios()
    }
    this.cargarUsuarios();
  }

  updateMessage(event) {
    this.setState({
      message: event.target.value
    });
  }

  cargarUsuarios(){
    getUsuarios()
            .then(res => {
                console.log(res)
                this.setState({
                  usuarios: res.data
                });
                return res.data
            })
            .catch((err) => console.log(err));
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
    items[i]  = event.target.value;

    this.setState({
      items: items
    });
  }

  renderRows() {
    var context = this;
    return  this.state.items.map(function(o, i) {
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

  render() {
    return (
      <div>
        <table style={{ float: "left", marginLeft: "2%" }}>
        <tbody style={{ 'height': '100%', 'overflow-y': 'auto', 'display': 'block' }}>
        <Table/>
        </tbody>
      </table>
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
        <hr/>
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
      </div>
    );
  }
}